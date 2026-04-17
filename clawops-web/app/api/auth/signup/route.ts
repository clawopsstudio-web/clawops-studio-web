import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Register user with InsForge
    const res = await fetch(`${INSFORGE_BASE}/api/auth/users?client_type=web`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': INSFORGE_KEY,
      },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || 'Registration failed', details: data },
        { status: res.status }
      )
    }

    // If email verification is required, return that info
    if (data.requireEmailVerification) {
      return NextResponse.json({
        requireEmailVerification: true,
        message: 'Please check your email for a verification code',
        email,
      })
    }

    // No verification needed — user is registered and session token was returned
    // InsForge returns camelCase: accessToken
    const access_token = data.accessToken || data.access_token
    const user = data.user

    if (!access_token) {
      return NextResponse.json(
        { error: 'Registration succeeded but no access token returned' },
        { status: 500 }
      )
    }

    // Create response with session cookie
    const response = NextResponse.json({
      ok: true,
      user: {
        id: user?.id || user?.profile?.id,
        email: user?.email,
        name: user?.profile?.name || user?.full_name || name,
        role: user?.role || 'authenticated',
      },
    })

    response.cookies.set('insforge_session', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
