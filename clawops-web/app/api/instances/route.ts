import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?select=*&limit=50`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (!res.ok) return NextResponse.json({ instances: [] })
    const allInstances = (await res.json()) || []
    const instances = allInstances.filter((i: any) => i.id === userId)
    return NextResponse.json({ instances })
  } catch {
    return NextResponse.json({ instances: [] })
  }
}

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { instance_id, name, ip_v4, ip_v6, product_id, region, tunnel_url, specs } = body

  if (!instance_id || !name) {
    return NextResponse.json({ error: 'instance_id and name are required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${INSFORGE_KEY}`,
          'apikey': INSFORGE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'representation',
        },
        body: JSON.stringify([{
          id: userId,
          instance_id,
          name,
          ip_v4: ip_v4 || null,
          ip_v6: ip_v6 || null,
          product_id: product_id || null,
          region: region || null,
          tunnel_url: tunnel_url || null,
          specs: specs || null,
          status: 'online',
        }]),
      }
    )
    if (!res.ok) {
      const error = await res.json()
      return NextResponse.json({ error: error.message || 'Insert failed' }, { status: 500 })
    }
    const instance = await res.json()
    return NextResponse.json({ instance }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Instance ID required' }, { status: 400 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?id=eq.${id}&id=eq.${userId}`,
      {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY },
      }
    )
    if (!res.ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
