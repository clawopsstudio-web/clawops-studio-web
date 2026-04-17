import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function GET(request: NextRequest) {
  const token = request.cookies.get('insforge_session')?.value

  if (!token) {
    return NextResponse.json(
      { error: 'Missing session token' },
      { status: 401, headers: { 'X-Auth-Status': 'missing' } }
    )
  }

  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': INSFORGE_KEY,
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401, headers: { 'X-Auth-Status': 'invalid' } }
      )
    }

    const data = await res.json()
    const user = data.user

    return NextResponse.json(
      {
        ok: true,
        userId: user?.id,
        email: user?.email,
        role: user?.role || 'authenticated',
      },
      {
        status: 200,
        headers: {
          'X-Auth-Status': 'valid',
          'X-Auth-User-Id': user?.id || '',
          'X-Auth-User-Email': user?.email || '',
          'X-Auth-User-Role': user?.role || 'authenticated',
        },
      }
    )
  } catch (error) {
    console.error('JWT validation error:', error)
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 401, headers: { 'X-Auth-Status': 'invalid' } }
    )
  }
}
