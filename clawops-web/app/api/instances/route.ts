import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getUserId } from '@/lib/insforge/server'

export async function GET(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: instances, error } = await insforge.database
    .from('vps_instances')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ instances: instances || [] })
}

export async function POST(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { instance_id, name, ip_v4, ip_v6, product_id, region, tunnel_url, specs } = body

  if (!instance_id || !name) {
    return NextResponse.json({ error: 'instance_id and name are required' }, { status: 400 })
  }

  const { data: instance, error } = await insforge.database
    .from('vps_instances')
    .insert([{
      user_id: userId,
      instance_id,
      name,
      ip_v4: ip_v4 || null,
      ip_v6: ip_v6 || null,
      product_id: product_id || null,
      region: region || null,
      tunnel_url: tunnel_url || null,
      specs: specs || null,
      status: 'online',
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ instance }, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Instance ID required' }, { status: 400 })

  const { error } = await insforge.database
    .from('vps_instances')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
