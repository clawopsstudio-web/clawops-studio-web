// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app'
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'ik_f11da2bf3d1087cfb816f76748ebfe93'

function hashPassword(password: string): string {
  const data = Buffer.from(password + 'clawops-salt-2024')
  return crypto.createHash('sha256').update(data).digest('hex')
}

function createInsForgeToken(user: { id: string; email: string; name?: string }): string {
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

    const res = await fetch(
      `${INSFORGE_BASE}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=*`,
      {
        headers: {
          apikey: INSFORGE_KEY,
          Authorization: `Bearer ${INSFORGE_KEY}`,
        },
      }
    )

    const users = await res.json()

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = users[0]

    // Check password — accept plain text or SHA-256 hash
    const inputHash = hashPassword(password)
    const valid = user.password_hash === password || user.password_hash === inputHash

    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = createInsForgeToken({
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
