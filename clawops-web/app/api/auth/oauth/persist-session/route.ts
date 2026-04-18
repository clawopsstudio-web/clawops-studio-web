import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const { code, verifier, accessToken, provider } = await request.json()

    let insforgeAccessToken = accessToken

    // Exchange code for tokens using the verifier
    if (!insforgeAccessToken && code && verifier) {
      const res = await fetch(`${INSFORGE_BASE}/api/auth/oauth/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': INSFORGE_KEY,
        },
        body: JSON.stringify({ code, code_verifier: verifier }),
      })

      const data = await res.json()

      if (!res.ok || !data.access_token) {
        return NextResponse.json(
          { error: data.message || `OAuth exchange failed (${res.status})` },
          { status: res.status }
        )
      }

      insforgeAccessToken = data.access_token
    }

    if (!insforgeAccessToken) {
      return NextResponse.json(
        { error: 'No access token received' },
        { status: 500 }
      )
    }

    // Set httpOnly cookie for server-side auth
    const response = NextResponse.json({ ok: true, provider })

    response.cookies.set('insforge_session', insforgeAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('OAuth persist session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
