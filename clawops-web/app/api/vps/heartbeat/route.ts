import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

// Heartbeat — VPS calls this every 30 seconds to update its status
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tunnel_url, status, openclaw_version, agent_count, specs } = body

    if (!tunnel_url) {
      return NextResponse.json({ error: 'tunnel_url required' }, { status: 400 })
    }

    // Update the VPS instance by tunnel_url using direct fetch
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?tunnel_url=eq.${encodeURIComponent(tunnel_url)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${INSFORGE_KEY}`,
          'apikey': INSFORGE_KEY,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          status: status || 'online',
          last_heartbeat: new Date().toISOString(),
          openclaw_version: openclaw_version || null,
          agent_count: agent_count || 0,
          specs: specs || null,
        }),
      }
    )

    if (!res.ok) {
      return NextResponse.json({
        ok: false,
        note: 'Instance may not be registered yet or update failed',
      }, { status: 200 })
    }

    const updated = await res.json()
    return NextResponse.json({ ok: true, vps_id: updated?.[0]?.id, status: updated?.[0]?.status })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 200 })
  }
}
