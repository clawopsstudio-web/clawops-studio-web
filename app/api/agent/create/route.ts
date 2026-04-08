import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, personality, purpose, agentName } = body

    if (!name || !agentName) {
      return NextResponse.json(
        { error: 'Missing required fields: name and agentName' },
        { status: 400 }
      )
    }

    // Create agent config
    const { data, error } = await supabase
      .from('agent_configs')
      .insert({
        user_id: user.id,
        name,
        agent_name: agentName,
        personality,
        purpose,
        status: 'active',
        model: 'gemma-4-2b', // Default to local Gemma
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}