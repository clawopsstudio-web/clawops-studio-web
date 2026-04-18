import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app'
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'ik_f11da2bf3d1087cfb816f76748ebfe93'

function createSessionToken(user: { id: string; email: string; name?: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name || '',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    aud: 'authenticated',
  })).toString('base64url')

  const secret = INSFORGE_KEY
  const data = `${header}.${payload}`
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url')

  return `${data}.${signature}`
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Use InsForge's built-in email/password auth endpoint
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
      // Pass through InsForge error messages for better UX
      if (data.statusCode === 403) {
        return NextResponse.json(
          { error: data.message || 'Email verification required' },
          { status: 403 }
        )
      }
      if (data.statusCode === 401) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }
      return NextResponse.json(
        { error: data.message || 'Login failed' },
        { status: res.status }
      )
    }

    // Extract user info from InsForge session response
    const insforgeUser = data.user || {}
    const userId = insforgeUser.id || email
    const userEmail = insforgeUser.email || email
    const userName = insforgeUser.user_metadata?.full_name || insforgeUser.user_metadata?.name || email.split('@')[0]

    // Create local JWT session (same format as OAuth flow)
    const token = createSessionToken({
      id: userId,
      email: userEmail,
      name: userName,
    })

    const response = NextResponse.json({
      ok: true,
      user: {
        id: userId,
        email: userEmail,
        name: userName,
      },
    })

    response.cookies.set('insforge_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
