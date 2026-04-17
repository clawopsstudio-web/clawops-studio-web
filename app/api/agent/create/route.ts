import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getUserId } from '@/lib/insforge/server'

export async function POST(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, agent_type, skills, config, status } = body

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }

  const insforge = await createServerClient()
  const { data, error } = await insforge.database
    .from('agent_configs')
    .insert([{
      user_id: userId,
      agent_name: name,
      agent_type: agent_type || 'custom',
      skills: skills || null,
      config: config || null,
      status: status || 'active',
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}
