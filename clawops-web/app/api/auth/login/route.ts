// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app'
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || 'ik_f11da2bf3d1087cfb816f76748ebfe93'

function hashPass(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return 'h' + Math.abs(hash).toString(16)
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Find user in InsForge
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
    const inputHash = hashPass(password)
    
    // Check password - accept both hash and raw (for testing)
    if (user.password_hash !== inputHash && user.password_hash !== password && user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate session token
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    const response = NextResponse.json({
      ok: true,
      token,  // Add token for frontend
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
      }
    })

    // Set auth cookie
    response.cookies.set('auth-session', token, {
      httpOnly: true,
      secure: true,
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
