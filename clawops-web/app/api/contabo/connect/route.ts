import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'
import { encrypt, decrypt } from '@/lib/crypto'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { client_id, client_secret } = await request.json()

  if (!client_id || !client_secret) {
    return NextResponse.json({ error: 'client_id and client_secret required' }, { status: 400 })
  }

  // Test credentials with Contabo OAuth
  const tokenRes = await fetch('https://auth.contabo.com/auth/realms/contabo/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id,
      client_secret,
      grant_type: 'client_credentials',
    }),
  })

  const tokenData = await tokenRes.json()

  if (!tokenData.access_token) {
    return NextResponse.json({ error: 'Invalid Contabo credentials' }, { status: 401 })
  }

  // Encrypt credentials before storing — never store raw secrets in DB
  const encrypted = encrypt(JSON.stringify({ client_id, client_secret }))

  // Check if existing integration
  const checkRes = await fetch(
    `${INSFORGE_BASE}/api/database/records/user_integrations?id=eq.${userId}&provider=eq.contabo`,
    {
      headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY },
    }
  )
  const existing = await checkRes.json()

  let result
  if (existing && existing.length > 0) {
    // Update existing
    result = await fetch(
      `${INSFORGE_BASE}/api/database/records/user_integrations?id=eq.${userId}&provider=eq.contabo`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${INSFORGE_KEY}`,
          'apikey': INSFORGE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          credentials_encrypted: encrypted,
          status: 'connected',
        }),
      }
    )
  } else {
    // Insert new
    result = await fetch(`${INSFORGE_BASE}/api/database/records/user_integrations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${INSFORGE_KEY}`,
        'apikey': INSFORGE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'representation',
      },
      body: JSON.stringify([{
        id: userId,
        provider: 'contabo',
        credentials_encrypted: encrypted,
        status: 'connected',
      }]),
    })
  }

  if (!result.ok) return NextResponse.json({ error: 'Storage failed' }, { status: 500 })
  return NextResponse.json({ success: true })
}
