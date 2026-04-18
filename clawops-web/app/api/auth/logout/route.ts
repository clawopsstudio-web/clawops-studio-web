import { NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app'
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'ik_f11da2bf3d1087cfb816f76748ebfe93'

export async function POST() {
  // Call InsForge logout to invalidate server-side session
  try {
    await fetch(`${INSFORGE_BASE}/api/auth/logout`, {
      method: 'POST',
      headers: { 'apikey': INSFORGE_KEY },
      credentials: 'include',
    })
  } catch {
    // Proceed with local logout even if InsForge call fails
  }

  const response = NextResponse.json({ ok: true })

  // Clear the local insforge_session JWT cookie
  response.cookies.set('insforge_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return response
}
