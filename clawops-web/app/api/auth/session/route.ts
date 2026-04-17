import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get('insforge_session')?.value

  if (!sessionToken) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'apikey': INSFORGE_KEY,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const data = await res.json()
    return NextResponse.json({ user: data.user })
  } catch {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
