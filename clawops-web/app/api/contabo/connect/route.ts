import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getUserId } from '@/lib/insforge/server'

export async function POST(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { client_id, client_secret } = await request.json()

  if (!client_id || !client_secret) {
    return NextResponse.json({ error: 'client_id and client_secret required' }, { status: 400 })
  }

  // Test the credentials first with client_credentials grant
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

  const insforge = await createServerClient()

  // Check if exists
  const { data: existing } = await insforge.database
    .from('user_integrations')
    .select('id')
    .eq('user_id', userId)
    .eq('provider', 'contabo')
    .maybeSingle()

  let result
  if (existing) {
    result = await insforge.database
      .from('user_integrations')
      .update({
        credentials: { client_id, client_secret },
        status: 'connected',
      })
      .eq('id', existing.id)
      .select()
      .single()
  } else {
    result = await insforge.database
      .from('user_integrations')
      .insert([{
        user_id: userId,
        provider: 'contabo',
        credentials: { client_id, client_secret },
        status: 'connected',
      }])
      .select()
      .single()
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
