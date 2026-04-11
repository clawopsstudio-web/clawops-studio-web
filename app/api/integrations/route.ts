import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// GET: Retrieve user's integration credentials
export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('user_skills')
      .select('skill_slug, config_data, status')
      .in('skill_slug', ['ghl', 'n8n', 'google-workspace-mcp', 'google-docs'])
      .eq('user_id', userId)

    if (error) throw error

    const integrations: Record<string, { connected: boolean; status: string; config: Record<string, string> }> = {
      ghl: { connected: false, status: 'not_configured', config: {} },
      n8n: { connected: false, status: 'not_configured', config: {} },
      'google-workspace-mcp': { connected: false, status: 'not_configured', config: {} },
      'google-docs': { connected: false, status: 'not_configured', config: {} },
    }

    for (const row of (data || [])) {
      if (integrations[row.skill_slug]) {
        integrations[row.skill_slug] = {
          connected: row.status === 'installed' && Object.keys(row.config_data || {}).length > 0,
          status: row.status || 'not_configured',
          config: row.config_data || {},
        }
      }
    }

    return NextResponse.json({ integrations })
  } catch (err) {
    console.error('[INTEGRATIONS] GET error:', err)
    return NextResponse.json({ error: 'Failed to load integrations' }, { status: 500 })
  }
}

// POST: Save integration credentials
export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { skill_slug, config_data, action } = body

    if (!skill_slug || !config_data) {
      return NextResponse.json({ error: 'skill_slug and config_data are required' }, { status: 400 })
    }

    const validSlugs = ['ghl', 'n8n', 'google-workspace-mcp', 'google-docs']
    if (!validSlugs.includes(skill_slug)) {
      return NextResponse.json({ error: 'Invalid skill_slug' }, { status: 400 })
    }

    if (action === 'disconnect') {
      // Remove the skill installation
      const { error } = await supabaseAdmin
        .from('user_skills')
        .delete()
        .eq('user_id', userId)
        .eq('skill_slug', skill_slug)

      if (error) throw error
      return NextResponse.json({ success: true, message: 'Disconnected' })
    }

    // Validate required fields
    const requiredFields: Record<string, string[]> = {
      ghl: ['GHL_PIT_TOKEN', 'GHL_LOCATION_ID'],
      n8n: ['N8N_API_URL', 'N8N_API_KEY'],
      'google-workspace-mcp': ['N8N_MCP_ENDPOINT'],
      'google-docs': ['N8N_DB_PATH'],
    }

    const missing = requiredFields[skill_slug]?.filter(
      (f) => !config_data[f] || config_data[f].trim() === ''
    )

    if (missing?.length) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // Upsert the skill with config
    const { data, error } = await supabaseAdmin
      .from('user_skills')
      .upsert(
        {
          user_id: userId,
          skill_slug,
          config_data,
          status: 'installed',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,skill_slug' }
      )
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      integration: {
        skill_slug,
        connected: true,
        status: 'installed',
        config: config_data,
      },
    })
  } catch (err) {
    console.error('[INTEGRATIONS] POST error:', err)
    return NextResponse.json({ error: 'Failed to save integration' }, { status: 500 })
  }
}
