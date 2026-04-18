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

// ── Local JWT decoding (avoids calling InsForge /sessions/current which rejects our self-signed JWT) ──
function base64UrlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4)
    return Buffer.from(padded, 'base64').toString('utf-8')
  } catch {
    return ''
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    return null
  }
}

function isJwtExpired(payload: Record<string, unknown>): boolean {
  const exp = payload.exp as number | undefined
  if (!exp) return false
  return Date.now() / 1000 > exp
}

// ── Session from insforge_session JWT cookie (local decode — no InsForge validation needed) ──
export async function getSession() {
  let token: string | undefined

  try {
    const cookieStore = await cookies()
    token = cookieStore.get('insforge_session')?.value
  } catch {
    // cookies() may not be available in some contexts
  }

  if (!token) {
    return { data: { session: null } }
  }

  const payload = decodeJwtPayload(token)
  if (!payload) {
    return { data: { session: null } }
  }

  if (isJwtExpired(payload)) {
    return { data: { session: null } }
  }

  return {
    data: {
      session: {
        user: {
          id: payload.sub as string,
          email: payload.email as string,
          name: payload.name as string | undefined,
        },
        accessToken: token,
      },
    },
  }
}

// ── Session from incoming request (for API routes with request object) ──
export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get('insforge_session')?.value

  if (!token) {
    return { data: { session: null } }
  }

  const payload = decodeJwtPayload(token)
  if (!payload) {
    return { data: { session: null } }
  }

  if (isJwtExpired(payload)) {
    return { data: { session: null } }
  }

  return {
    data: {
      session: {
        user: {
          id: payload.sub as string,
          email: payload.email as string,
          name: payload.name as string | undefined,
        },
        accessToken: token,
      },
    },
  }
}

// Get user ID from session
export async function getUserId(): Promise<string> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('insforge_session')?.value
    if (!token) return ''

    const payload = decodeJwtPayload(token)
    if (!payload || isJwtExpired(payload)) return ''
    return payload.sub as string
  } catch {
    return ''
  }
}

// Update user profile via InsForge profiles table
export async function updateUserProfile(profile: Record<string, unknown>) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('insforge_session')?.value
    if (!token) return { success: false, error: 'No session' }

    const payload = decodeJwtPayload(token)
    if (!payload) return { success: false, error: 'Invalid session' }

    const userId = payload.sub as string
    if (!userId) return { success: false, error: 'No user ID' }

    const res = await fetch(`${INSFORGE_BASE}/api/database/records/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${INSFORGE_KEY}`,
        'apikey': INSFORGE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(profile),
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
