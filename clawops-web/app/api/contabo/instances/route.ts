import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'
import { decrypt } from '@/lib/crypto'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Get encrypted Contabo credentials for this user
  const checkRes = await fetch(
    `${INSFORGE_BASE}/api/database/records/user_integrations?id=eq.${userId}&provider=eq.contabo`,
    {
      headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY },
    }
  )
  const integrations = await checkRes.json()
  const integration = integrations?.[0]

  if (!integration) {
    return NextResponse.json({ connected: false, instances: [] })
  }

  // Decrypt credentials
  let creds: { client_id: string; client_secret: string } = { client_id: '', client_secret: '' }
  if (integration.credentials_encrypted) {
    try {
      creds = JSON.parse(decrypt(integration.credentials_encrypted))
    } catch {
      return NextResponse.json({ connected: false, error: 'Failed to decrypt credentials' }, { status: 500 })
    }
  }

  // Get OAuth token from Contabo
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
    return NextResponse.json({ connected: false, error: 'Auth failed' }, { status: 401 })
  }

  // Fetch instances from Contabo
  const instancesRes = await fetch('https://api.contabo.com/v1/compute/instances', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'x-request-id': crypto.randomUUID(),
    },
  })

  if (!instancesRes.ok) {
    return NextResponse.json({ connected: true, error: 'Failed to fetch instances' }, { status: 502 })
  }

  const raw = await instancesRes.json()
  const instances = Array.isArray(raw.data) ? raw.data : []

  return NextResponse.json({
    connected: true,
    instances: instances.map((inst: any) => ({
      instance_id: String(inst.instanceId),
      name: inst.name || `vmi${inst.instanceId}`,
      ip_v4: inst.ipConfig?.v4?.ip || null,
      product_id: inst.productId,
      product_name: inst.productName,
      status: inst.status,
      region: inst.region,
      ram_mb: inst.ramMb,
      cpu_cores: inst.cpuCores,
      disk_mb: inst.diskMb,
      created_date: inst.createdDate,
    })),
  })
}
