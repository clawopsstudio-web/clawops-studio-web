import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/auth/users'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const result = createUser({ email, password, name })

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 409 })
    }

    return NextResponse.json({
      ok: true,
      user: { id: result.id, email: result.email, name: result.name },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
