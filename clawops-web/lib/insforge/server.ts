import { NextRequest } from 'next/server'
import { createClient } from '@insforge/sdk'
import { cookies } from 'next/headers'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export function createServerClient() {
  return createClient({
    baseUrl: INSFORGE_BASE,
    anonKey: INSFORGE_KEY,
  })
}

export async function getSession() {
  // Try request.cookies first (more reliable in API routes)
  // Then fall back to next/headers cookies()
  let token: string | undefined

  // Note: in actual API routes, we read from request.cookies directly
  // This function is kept for compatibility with Server Components
  try {
    const cookieStore = await cookies()
    token = cookieStore.get('insforge_session')?.value
  } catch {
    // cookies() may not be available
  }

  if (!token) {
    return { data: { session: null } }
  }

  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': INSFORGE_KEY,
      },
    })

    if (!res.ok) {
      return { data: { session: null } }
    }

    const user = await res.json()
    return {
      data: {
        session: {
          user,
          accessToken: token,
        },
      },
    }
  } catch {
    return { data: { session: null } }
  }
}

// Get user ID from InsForge auth session - reads cookie from request or headers
export async function getUserIdFromRequest(request: NextRequest): Promise<string> {
  const token = request.cookies.get('insforge_session')?.value
  if (!token) return ''

  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': INSFORGE_KEY,
      },
    })
    if (!res.ok) return ''
    const data = await res.json()
    return data.user?.id || ''
  } catch {
    return ''
  }
}

export async function getUserId(): Promise<string> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('insforge_session')?.value
    if (!token) return ''

    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': INSFORGE_KEY,
      },
    })
    if (!res.ok) return ''
    const data = await res.json()
    return data.user?.id || ''
  } catch {
    return ''
  }
}

// Update user profile via InsForge auth API
export async function updateUserProfile(profile: Record<string, any>) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('insforge_session')?.value
    if (!token) return { success: false, error: 'No session' }

    const res = await fetch(`${INSFORGE_BASE}/api/auth/profiles/current`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': INSFORGE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profile }),
    })

    if (!res.ok) {
      const error = await res.json()
      return { success: false, error }
    }

    return { success: true, data: await res.json() }
  } catch (e) {
    return { success: false, error: String(e) }
  }
}
