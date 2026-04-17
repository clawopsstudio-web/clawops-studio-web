import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getUserId } from '@/lib/insforge/server'

export async function GET(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const insforge = await createServerClient()
  const { data, error } = await insforge.database
    .from('user_skills')
    .select('skill_slug, config_data, status')
    .eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const allSkills = data || []

  const integrations: Record<string, { connected: boolean; status: string; config: Record<string, string> }> = {
    ghl: { connected: false, status: 'not_configured', config: {} },
    n8n: { connected: false, status: 'not_configured', config: {} },
    'google-workspace-mcp': { connected: false, status: 'not_configured', config: {} },
    'google-docs': { connected: false, status: 'not_configured', config: {} },
  }

  for (const row of allSkills) {
    if (integrations[row.skill_slug]) {
      const cfg = row.config_data || {}
      integrations[row.skill_slug] = {
        connected: row.status === 'installed' && Object.keys(cfg).length > 0,
        status: row.status || 'not_configured',
        config: cfg,
      }
    }
  }

  return NextResponse.json({ integrations })
}

export async function POST(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { skill_slug, config_data, action } = body

  if (!skill_slug) {
    return NextResponse.json({ error: 'skill_slug is required' }, { status: 400 })
  }

  const validSlugs = ['ghl', 'n8n', 'google-workspace-mcp', 'google-docs']
  if (!validSlugs.includes(skill_slug)) {
    return NextResponse.json({ error: 'Invalid skill_slug' }, { status: 400 })
  }

  const insforge = await createServerClient()

  if (action === 'disconnect') {
    const { error } = await insforge.database
      .from('user_skills')
      .delete()
      .eq('user_id', userId)
      .eq('skill_slug', skill_slug)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, message: 'Disconnected' })
  }

  if (!config_data) {
    return NextResponse.json({ error: 'config_data is required' }, { status: 400 })
  }

  // Validate required fields
  const requiredFields: Record<string, string[]> = {
    ghl: ['GHL_PIT_TOKEN', 'GHL_LOCATION_ID'],
    n8n: ['N8N_API_URL', 'N8N_API_KEY'],
    'google-workspace-mcp': ['N8N_MCP_ENDPOINT'],
    'google-docs': ['N8N_DB_PATH'],
  }

  const missing = (requiredFields[skill_slug] || []).filter(
    (f) => !config_data[f] || String(config_data[f]).trim() === ''
  )

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  // Check if exists
  const { data: existing } = await insforge.database
    .from('user_skills')
    .select('id')
    .eq('user_id', userId)
    .eq('skill_slug', skill_slug)
    .maybeSingle()

  let result
  if (existing) {
    const { data, error } = await insforge.database
      .from('user_skills')
      .update({
        config_data,
        status: 'installed',
      })
      .eq('id', existing.id)
      .select()
      .single()
    result = { data, error }
  } else {
    const { data, error } = await insforge.database
      .from('user_skills')
      .insert([{
        user_id: userId,
        skill_slug,
        config_data,
        status: 'installed',
      }])
      .select()
      .single()
    result = { data, error }
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })

  return NextResponse.json({
    success: true,
    integration: {
      skill_slug,
      connected: true,
      status: 'installed',
      config: config_data,
    },
  })
}
