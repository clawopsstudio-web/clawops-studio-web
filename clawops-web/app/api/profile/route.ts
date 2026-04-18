import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/profiles?id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (!res.ok) return NextResponse.json({})
    const data = await res.json()
    return NextResponse.json(data[0] || {})
  } catch {
    return NextResponse.json({})
  }
}

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { full_name, company } = body

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/profiles?id=eq.${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${INSFORGE_KEY}`,
          'apikey': INSFORGE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          full_name: full_name || null,
          company: company || null,
        }),
      }
    )
    if (!res.ok) return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    const data = await res.json()
    return NextResponse.json({ ok: true, data: data[0] || {} })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
