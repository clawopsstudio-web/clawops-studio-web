import { createClient } from '@insforge/sdk'
import { cookies } from 'next/headers'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app'
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''

export async function createServerClient() {
  return createClient({
    baseUrl: INSFORGE_BASE,
    anonKey: INSFORGE_KEY,
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('insforge_session')?.value

  if (!token) {
    return { data: { session: null } }
  }

  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: INSFORGE_KEY,
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

export async function getUserId(): Promise<string> {
  const { data } = await getSession()
  return (data.session?.user as any)?.id || ''
}
