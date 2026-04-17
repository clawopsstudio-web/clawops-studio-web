import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getUserId } from '@/lib/insforge/server'

export async function GET(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const insforge = await createServerClient()
  const { data, error } = await insforge.database
    .from('onboarding_configs')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'No onboarding data found' }, { status: 404 })

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, company, role, industry, use_case, integrations, goals } = body

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }

  const insforge = await createServerClient()

  // Check if exists
  const { data: existing } = await insforge.database
    .from('onboarding_configs')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle()

  let result
  if (existing) {
    const { data, error } = await insforge.database
      .from('onboarding_configs')
      .update({
        name,
        company: company || null,
        role: role || null,
        industry: industry || null,
        use_case: use_case || null,
        integrations: integrations || null,
        goals: goals || null,
        step_completed: 1,
        completed: false,
      })
      .eq('id', existing.id)
      .select()
      .single()
    result = { data, error }
  } else {
    const { data, error } = await insforge.database
      .from('onboarding_configs')
      .insert([{
        user_id: userId,
        name,
        company: company || null,
        role: role || null,
        industry: industry || null,
        use_case: use_case || null,
        integrations: integrations || null,
        goals: goals || null,
        step_completed: 1,
        completed: false,
      }])
      .select()
      .single()
    result = { data, error }
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })
  return NextResponse.json({ success: true, data: result.data })
}
