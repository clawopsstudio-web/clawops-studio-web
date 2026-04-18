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
    const { email, password, full_name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Use InsForge's built-in email/password signup endpoint
    const res = await fetch(`${INSFORGE_BASE}/api/auth/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': INSFORGE_KEY,
      },
      body: JSON.stringify({
        email,
        password,
        options: {
          data: {
            full_name: full_name || email.split('@')[0],
          },
        },
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      // Pass through InsForge error messages
      if (data.code === 'USER_ALREADY_EXISTS' || data.statusCode === 409) {
        return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
      }
      return NextResponse.json({ error: data.message || 'Signup failed' }, { status: res.status })
    }

    // InsForge sends a verification email. Return success without logging in.
    // User must verify email before they can log in.
    return NextResponse.json({
      ok: true,
      message: 'Account created. Please check your email to verify your account before signing in.',
      email,
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
