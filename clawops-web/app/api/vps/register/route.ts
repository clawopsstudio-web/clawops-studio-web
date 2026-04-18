import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { tunnel_url, name, vps_ip, specs } = body

  if (!tunnel_url || !name) {
    return NextResponse.json({ error: 'tunnel_url and name are required' }, { status: 400 })
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
          name,
          tunnel_url,
          ip_v4: vps_ip || null,
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
    return NextResponse.json({
      registered: true,
      vps_id: instance[0]?.id || instance?.id,
      vps_name: name,
      tunnel_url,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (!res.ok) return NextResponse.json({ instances: [] })
    const instances = await res.json()
    return NextResponse.json({ instances })
  } catch {
    return NextResponse.json({ instances: [] })
  }
}
