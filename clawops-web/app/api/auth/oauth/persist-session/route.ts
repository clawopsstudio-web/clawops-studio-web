import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(request: NextRequest) {
  console.log('[persist-session] Request received')
  console.log('[persist-session] Headers:', Object.fromEntries(request.headers.entries()))

  try {
    const body = await request.json()
    console.log('[persist-session] Body keys:', Object.keys(body))
    console.log('[persist-session] code:', body.code ? `${body.code.slice(0, 10)}...` : 'MISSING')
    console.log('[persist-session] verifier:', body.verifier ? 'PRESENT' : 'MISSING')
    console.log('[persist-session] accessToken:', body.accessToken ? 'PRESENT' : 'MISSING')
    console.log('[persist-session] provider:', body.provider)

    const { code, verifier, accessToken, provider } = body

    let insforgeAccessToken = accessToken

    // Exchange code for tokens using the verifier
    if (!insforgeAccessToken && code && verifier) {
      console.log('[persist-session] Attempting exchange with InsForge...')

      const res = await fetch(`${INSFORGE_BASE}/api/auth/oauth/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': INSFORGE_KEY,
        },
        body: JSON.stringify({ code, code_verifier: verifier }),
      })

      const data = await res.json()
      console.log('[persist-session] InsForge exchange response status:', res.status)
      console.log('[persist-session] InsForge exchange response keys:', Object.keys(data))
      console.log('[persist-session] InsForge exchange response data:', JSON.stringify(data).slice(0, 200))

      if (!res.ok || !data.access_token) {
        return NextResponse.json(
          { error: data.message || `OAuth exchange failed (${res.status})` },
          { status: res.status }
        )
      }

      insforgeAccessToken = data.access_token
      console.log('[persist-session] Exchange successful, token received')
    }

    if (!insforgeAccessToken) {
      console.log('[persist-session] ERROR: No access token received')
      return NextResponse.json(
        { error: 'No access token received' },
        { status: 500 }
      )
    }

    // Set httpOnly cookie for server-side auth
    const response = NextResponse.json({ ok: true, provider })
    console.log('[persist-session] Setting insforge_session cookie')

    response.cookies.set('insforge_session', insforgeAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    console.log('[persist-session] SUCCESS')
    return response
  } catch (error: any) {
    console.error('[persist-session] FATAL ERROR:', error?.message, error?.stack)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
