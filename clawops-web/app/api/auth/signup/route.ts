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
    const hashedPassword = hashPass(password)

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

    // Generate session token
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    const response = NextResponse.json({
      ok: true,
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
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}