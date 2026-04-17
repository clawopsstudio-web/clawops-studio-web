import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

async function getUserId(request: NextRequest): Promise<string> {
  const token = request.cookies.get('insforge_session')?.value
  if (!token) return ''
  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: { 'Authorization': `Bearer ${token}`, 'apikey': INSFORGE_KEY },
    })
    if (!res.ok) return ''
    const data = await res.json()
    return data.user?.id || ''
  } catch {
    return ''
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tunnel_url, name, vps_ip, specs } = body

    if (!tunnel_url || !name) {
      return NextResponse.json({ error: 'tunnel_url and name are required' }, { status: 400 })
    }

    const userId = await getUserId(request)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Check if instance with this tunnel_url exists
    const checkRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?tunnel_url=eq.${encodeURIComponent(tunnel_url)}`,
      { headers: { 'Authorization': `Bearer ${userId}`, 'apikey': INSFORGE_KEY } }
    )

    if (checkRes.ok) {
      const existing = await checkRes.json()
      if (existing && existing.length > 0) {
        // Update existing
        const updateRes = await fetch(
          `${INSFORGE_BASE}/api/database/records/vps_instances?id=eq.${existing[0].id}`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${userId}`,
              'apikey': INSFORGE_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, vps_ip: vps_ip || null, specs: specs || null, status: 'online' }),
          }
        )
        if (updateRes.ok) {
          return NextResponse.json({ registered: true, vps_id: existing[0].id, vps_name: name, tunnel_url })
        }
      }
    }

    // Insert new
    const insertRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userId}`,
          'apikey': INSFORGE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'representation',
        },
        body: JSON.stringify([{
          user_id: userId,
          name,
          tunnel_url,
          vps_ip: vps_ip || null,
          specs: specs || null,
          status: 'online',
        }]),
      }
    )

    if (!insertRes.ok) {
      const err = await insertRes.json()
      return NextResponse.json({ error: err.message || 'Insert failed' }, { status: 500 })
    }

    const inserted = await insertRes.json()
    return NextResponse.json({
      registered: true,
      vps_id: inserted[0]?.id || inserted?.id,
      vps_name: name,
      tunnel_url,
    })
  } catch (err: any) {
    console.error('[vps/register] Error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?user_id=eq.${userId}&order=created_at.desc`,
      { headers: { 'Authorization': `Bearer ${userId}`, 'apikey': INSFORGE_KEY } }
    )
    if (!res.ok) return NextResponse.json({ error: 'Database error', instances: [] }, { status: 500 })
    const instances = await res.json()
    return NextResponse.json({ instances })
  } catch {
    return NextResponse.json({ instances: [] })
  }
}
