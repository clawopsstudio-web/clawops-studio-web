// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app'
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'ik_f11da2bf3d1087cfb816f76748ebfe93'

function hashPassword(password: string): string {
  const data = Buffer.from(password + 'clawops-salt-2024')
  return crypto.createHash('sha256').update(data).digest('hex')
}

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

  const data = `${header}.${payload}`
  const signature = crypto.createHmac('sha256', INSFORGE_KEY).update(data).digest('base64url')
  return `${data}.${signature}`
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Check if user already exists
    const checkRes = await fetch(
      `${INSFORGE_BASE}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=id`,
      {
        headers: {
          apikey: INSFORGE_KEY,
          Authorization: `Bearer ${INSFORGE_KEY}`,
        },
      }
    )

    const existing = await checkRes.json()
    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    // Create user
    const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    const hashedPassword = hashPassword(password)

    const createRes = await fetch(`${INSFORGE_BASE}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        apikey: INSFORGE_KEY,
        Authorization: `Bearer ${INSFORGE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        id: userId,
        email,
        full_name: full_name || email.split('@')[0],
        password_hash: hashedPassword,
        role: 'user',
      }),
    })

    if (!createRes.ok) {
      const err = await createRes.text()
      console.error('Create error:', err)
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    const created = await createRes.json()
    const user = Array.isArray(created) ? created[0] : created

    // Create InsForge-format JWT session token
    const token = createSessionToken({
      id: user.id,
      email: user.email,
      name: user.full_name,
    })

    const response = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
      },
    })

    // Set insforge_session cookie (consistent with login and OAuth flows)
    response.cookies.set('insforge_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
