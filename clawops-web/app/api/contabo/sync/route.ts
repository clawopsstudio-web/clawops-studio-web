import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getUserId } from '@/lib/insforge/server'

export async function POST(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const insforge = await createServerClient()
  const body = await request.json()
  const { action } = body

  if (action === 'fetch_from_contabo') {
    try {
      const { data: contaboToken } = await insforge.database
        .from('user_integrations')
        .select('credentials')
        .eq('user_id', userId)
        .eq('provider', 'contabo')
        .maybeSingle()

      if (!contaboToken) {
        return NextResponse.json({ error: 'Contabo not connected' }, { status: 400 })
      }

      const creds = contaboToken.credentials || {}
      const tokenRes = await fetch('https://auth.contabo.com/auth/realms/contabo/protocol/openid-connect/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: creds.client_id,
          client_secret: creds.client_secret,
          grant_type: 'client_credentials',
        }),
      })

      const tokenData = await tokenRes.json()
      if (!tokenData.access_token) {
        return NextResponse.json({ error: 'Contabo auth failed' }, { status: 401 })
      }

      const instancesRes = await fetch('https://api.contabo.com/v1/compute/instances', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'x-request-id': crypto.randomUUID(),
        },
      })

      const raw = await instancesRes.json()
      const instances = Array.isArray(raw.data) ? raw.data : []

      // Upsert each instance into vps_instances for this user
      for (const inst of instances) {
        const { data: existing } = await insforge.database
          .from('vps_instances')
          .select('id')
          .eq('user_id', userId)
          .eq('instance_id', String(inst.instanceId))
          .maybeSingle()

        if (existing) {
          await insforge.database
            .from('vps_instances')
            .update({
              name: inst.name || inst.displayName || `vmi${inst.instanceId}`,
              ip_v4: inst.ipConfig?.v4?.ip || null,
              ip_v6: inst.ipConfig?.v6?.ip || null,
              product_id: inst.productId,
              status: inst.status,
              region: inst.region,
              ram_mb: inst.ramMb,
              cpu_cores: inst.cpuCores,
              disk_mb: inst.diskMb,
            })
            .eq('id', existing.id)
        } else {
          await insforge.database
            .from('vps_instances')
            .insert([{
              user_id: userId,
              instance_id: String(inst.instanceId),
              name: inst.name || inst.displayName || `vmi${inst.instanceId}`,
              ip_v4: inst.ipConfig?.v4?.ip || null,
              ip_v6: inst.ipConfig?.v6?.ip || null,
              product_id: inst.productId,
              status: inst.status,
              region: inst.region,
              ram_mb: inst.ramMb,
              cpu_cores: inst.cpuCores,
              disk_mb: inst.diskMb,
            }])
        }
      }

      return NextResponse.json({ synced: instances.length, instances })
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  if (action === 'register_instance') {
    const { instance_id, name, ip_v4, product_id, region } = body

    if (!instance_id) {
      return NextResponse.json({ error: 'instance_id required' }, { status: 400 })
    }

    const { data: existing } = await insforge.database
      .from('vps_instances')
      .select('id')
      .eq('user_id', userId)
      .eq('instance_id', String(instance_id))
      .maybeSingle()

    let result
    if (existing) {
      result = await insforge.database
        .from('vps_instances')
        .update({ name: name || `vmi${instance_id}`, ip_v4: ip_v4 || null, product_id: product_id || null, region: region || null })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      result = await insforge.database
        .from('vps_instances')
        .insert([{ user_id: userId, instance_id: String(instance_id), name: name || `vmi${instance_id}`, ip_v4: ip_v4 || null, product_id: product_id || null, region: region || null, status: 'tracked' }])
        .select()
        .single()
    }

    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })
    return NextResponse.json({ instance: result.data })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
