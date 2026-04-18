import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/insforge/server'
import { getUserId } from '@/lib/api-auth'
import { insforgeAdmin } from '@/lib/insforge/admin'

// GET: Get install details for a skill
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) return NextResponse.json({ error: 'slug is required' }, { status: 400 })

  const { data: skill, error } = await insforgeAdmin.database
    .from('skills_catalog')
    .select('slug, name, install_method, install_command, install_path, prerequisites, config_fields')
    .eq('slug', slug)
    .maybeSingle()

  if (error || !skill) return NextResponse.json({ error: 'Skill not found' }, { status: 404 })

  return NextResponse.json(skill)
}

// POST: Install a skill for the current user
export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { slug, status = 'installed', config_data = {} } = body

  if (!slug) return NextResponse.json({ error: 'slug is required' }, { status: 400 })

  // Get skill info
  const { data: skill, error: skillError } = await insforgeAdmin.database
    .from('skills_catalog')
    .select('slug, name, install_method, install_command, install_path, config_fields')
    .eq('slug', slug)
    .maybeSingle()

  if (skillError || !skill) return NextResponse.json({ error: 'Skill not found' }, { status: 404 })

  const insforge = await createServerClient()

  // Check if already installed
  const { data: existing } = await insforge.database
    .from('user_skills')
    .select('id')
    .eq('id', userId)
    .eq('skill_slug', slug)
    .maybeSingle()

  let result
  if (existing) {
    result = await insforge.database
      .from('user_skills')
      .update({ status, config_data })
      .eq('id', existing.id)
      .select()
      .single()
  } else {
    result = await insforge.database
      .from('user_skills')
      .insert([{ id: userId, skill_slug: slug, status, config_data }])
      .select()
      .single()
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })

  return NextResponse.json({
    success: true,
    skill: skill.slug,
    name: skill.name,
    status,
    install_command: skill.install_command,
    config_fields: skill.config_fields,
  })
}
