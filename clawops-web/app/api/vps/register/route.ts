import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getSession } from '@/lib/insforge/server'

// Register or update a VPS instance for the authenticated user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tunnel_url, name, vps_ip, specs } = body

    if (!tunnel_url || !name) {
      return NextResponse.json({ error: 'tunnel_url and name are required' }, { status: 400 })
    }

    const session = await getSession()
    const userId = session.data.session?.user?.id
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const insforge = await createServerClient()

    // Check if instance with this tunnel_url exists
    const { data: existing } = await insforge.database
      .from('vps_instances')
      .select('id')
      .eq('tunnel_url', tunnel_url)
      .maybeSingle()

    let result
    if (existing) {
      result = await insforge.database
        .from('vps_instances')
        .update({
          name,
          vps_ip: vps_ip || null,
          specs: specs || null,
          status: 'online',
        })
        .eq('id', existing.id)
        .select('id, name')
        .single()
    } else {
      result = await insforge.database
        .from('vps_instances')
        .insert([{
          user_id: userId,
          name,
          tunnel_url,
          vps_ip: vps_ip || null,
          specs: specs || null,
          status: 'online',
        }])
        .select('id, name')
        .single()
    }

    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })

    return NextResponse.json({
      registered: true,
      vps_id: result.data.id,
      vps_name: name,
      tunnel_url,
    })
  } catch (err: any) {
    console.error('[vps/register] Error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const session = await getSession()
  const userId = session.data.session?.user?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const insforge = await createServerClient()
  const { data, error } = await insforge.database
    .from('vps_instances')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message, instances: [] }, { status: 500 })
  return NextResponse.json({ instances: data || [] })
}
