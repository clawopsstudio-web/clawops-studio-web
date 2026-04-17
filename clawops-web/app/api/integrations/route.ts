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

export async function GET(request: NextRequest) {
  const userId = await getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const integrations: Record<string, any> = {
    ghl: { connected: false, status: 'not_configured', config: {} },
    n8n: { connected: false, status: 'not_configured', config: {} },
    'google-workspace': { connected: false, status: 'not_configured', config: {} },
    'google-docs': { connected: false, status: 'not_configured', config: {} },
  }

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/user_skills?select=skill_slug,config_data,status&user_id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (res.ok) {
      const skills = await res.json() || []
      for (const row of skills) {
        if (integrations[row.skill_slug] !== undefined) {
          const cfg = row.config_data || {}
          integrations[row.skill_slug] = {
            connected: row.status === 'installed' && Object.keys(cfg).length > 0,
            status: row.status || 'not_configured',
            config: cfg,
          }
        }
      }
    }
  } catch { /* skills table may be empty */ }

  return NextResponse.json({ integrations })
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { skill_slug, config_data, action } = body

  if (!skill_slug) return NextResponse.json({ error: 'skill_slug is required' }, { status: 400 })

  const validSlugs = ['ghl', 'n8n', 'google-workspace', 'google-docs']
  if (!validSlugs.includes(skill_slug)) return NextResponse.json({ error: 'Invalid skill_slug' }, { status: 400 })

  if (action === 'disconnect') {
    await fetch(
      `${INSFORGE_BASE}/api/database/records/user_skills?user_id=eq.${userId}&skill_slug=eq.${skill_slug}`,
      { method: 'DELETE', headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    return NextResponse.json({ success: true, message: 'Disconnected' })
  }

  if (!config_data) return NextResponse.json({ error: 'config_data is required' }, { status: 400 })

  const res = await fetch(
    `${INSFORGE_BASE}/api/database/records/user_skills`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${INSFORGE_KEY}`,
        'apikey': INSFORGE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify([{
        user_id: userId,
        skill_slug,
        config_data,
        status: 'installed',
      }]),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message || 'Failed' }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    integration: { skill_slug, connected: true, status: 'installed', config: config_data },
  })
}
