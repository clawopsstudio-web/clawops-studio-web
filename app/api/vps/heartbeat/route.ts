import { NextResponse } from 'next/server'
import { insforgeAdmin } from '@/lib/insforge/admin'

// Heartbeat — VPS calls this every 30 seconds to update its status
// Uses the InsForge anon key for auth (VPS registers with API key stored in its config)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tunnel_url, status, openclaw_version, agent_count, specs } = body

    if (!tunnel_url) {
      return NextResponse.json({ error: 'tunnel_url required' }, { status: 400 })
    }

    // Update the VPS instance by tunnel_url
    const { data, error } = await insforgeAdmin.database
      .from('vps_instances')
      .update({
        status: status || 'online',
        last_heartbeat: new Date().toISOString(),
        openclaw_version: openclaw_version || null,
        agent_count: agent_count || 0,
        specs: specs || null,
      })
      .eq('tunnel_url', tunnel_url)
      .select('id, status')
      .single()

    if (error) {
      return NextResponse.json({
        ok: false,
        error: error.message,
        note: 'Instance may not be registered yet',
      }, { status: 200 })
    }

    return NextResponse.json({ ok: true, vps_id: data.id, status: data.status })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 200 })
  }
}
