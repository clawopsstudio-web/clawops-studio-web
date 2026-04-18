import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'
import { decrypt } from '@/lib/crypto'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

async function getUserIntegrations(userId: string) {
  const res = await fetch(
    `${INSFORGE_BASE}/api/database/records/user_integrations?id=eq.${userId}&provider=eq.contabo`,
    { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
  )
  return res.ok ? await res.json() : []
}

async function upsertVpsInstance(instanceData: Record<string, unknown>) {
  const checkRes = await fetch(
    `${INSFORGE_BASE}/api/database/records/vps_instances?instance_id=eq.${instanceData.instance_id}`,
    { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
  )
  const existing = checkRes.ok ? await checkRes.json() : []

  if (existing && existing.length > 0) {
    await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?instance_id=eq.${instanceData.instance_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${INSFORGE_KEY}`,
          'apikey': INSFORGE_KEY,
        },
        body: JSON.stringify(instanceData),
      }
    )
    return existing[0].id
  } else {
    const insertRes = await fetch(`${INSFORGE_BASE}/api/database/records/vps_instances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${INSFORGE_KEY}`,
        'apikey': INSFORGE_KEY,
        'Prefer': 'representation',
      },
      body: JSON.stringify([instanceData]),
    })
    const inserted = insertRes.ok ? await insertRes.json() : []
    return inserted?.[0]?.id
  }
}

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { action } = body

  if (action === 'fetch_from_contabo') {
    try {
      const integrations = await getUserIntegrations(userId)
      const integration = integrations?.[0]

      if (!integration) {
        return NextResponse.json({ error: 'Contabo not connected' }, { status: 400 })
      }

      // Decrypt credentials
      let creds = { client_id: '', client_secret: '' }
      if (integration.credentials_encrypted) {
        try {
          creds = JSON.parse(decrypt(integration.credentials_encrypted))
        } catch {
          return NextResponse.json({ error: 'Failed to decrypt credentials' }, { status: 500 })
        }
      } else if (integration.credentials) {
        creds = integration.credentials
      }

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

      // Sync each instance into vps_instances
      for (const inst of instances) {
        await upsertVpsInstance({
          id: userId,
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
        })
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

    const instanceData = {
      id: userId,
      instance_id: String(instance_id),
      name: name || `vmi${instance_id}`,
      ip_v4: ip_v4 || null,
      product_id: product_id || null,
      region: region || null,
      status: 'tracked',
    }

    const res = await fetch(`${INSFORGE_BASE}/api/database/records/vps_instances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${INSFORGE_KEY}`,
        'apikey': INSFORGE_KEY,
        'Prefer': 'representation',
      },
      body: JSON.stringify([instanceData]),
    })

    if (!res.ok) {
      const error = await res.json()
      return NextResponse.json({ error: error.message || 'Failed' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ instance: Array.isArray(data) ? data[0] : data })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
