import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Call InsForge auth API
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': INSFORGE_KEY,
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || 'Invalid credentials' },
        { status: res.status }
      )
    }

    const { access_token, user } = data

    if (!access_token) {
      return NextResponse.json(
        { error: 'Authentication failed - no access token returned' },
        { status: 500 }
      )
    }

    // Create response
    const response = NextResponse.json({
      ok: true,
      user: {
        id: user?.id || user?.profile?.id,
        email: user?.email,
        name: user?.profile?.name || user?.full_name,
        role: user?.role || 'authenticated',
      },
    })

    // Set httpOnly session cookie (readable by middleware)
    response.cookies.set('insforge_session', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
