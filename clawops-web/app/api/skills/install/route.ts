import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

// GET: Get install details for a skill
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) return NextResponse.json({ error: 'slug is required' }, { status: 400 })

  const res = await fetch(
    `${INSFORGE_BASE}/api/database/records/skills_catalog?slug=eq.${encodeURIComponent(slug)}&select=slug,name,install_method,install_command,install_path,prerequisites,config_fields`,
    { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
  )

  if (!res.ok) return NextResponse.json({ error: 'Failed to fetch skill' }, { status: 500 })
  const skills = await res.json()
  const skill = skills?.[0]

  if (!skill) return NextResponse.json({ error: 'Skill not found' }, { status: 404 })

  return NextResponse.json(skill)
}

// POST: Install a skill for the current user
export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { slug, status = 'installed', config_data = {} } = body

  if (!slug) return NextResponse.json({ error: 'slug is required' }, { status: 400 })

  // Check if already installed
  const checkRes = await fetch(
    `${INSFORGE_BASE}/api/database/records/user_skills?id=eq.${userId}&skill_slug=eq.${encodeURIComponent(slug)}`,
    { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
  )
  const existing = await checkRes.json()

  let res
  if (existing && existing.length > 0) {
    // Update existing
    res = await fetch(
      `${INSFORGE_BASE}/api/database/records/user_skills?id=eq.${userId}&skill_slug=eq.${encodeURIComponent(slug)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${INSFORGE_KEY}`,
          'apikey': INSFORGE_KEY,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({ status, config_data }),
      }
    )
  } else {
    // Insert new
    res = await fetch(`${INSFORGE_BASE}/api/database/records/user_skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${INSFORGE_KEY}`,
        'apikey': INSFORGE_KEY,
        'Prefer': 'representation',
      },
      body: JSON.stringify([{ id: userId, skill_slug: slug, status, config_data }]),
    })
  }

  if (!res.ok) {
    const error = await res.json()
    return NextResponse.json({ error: error.message || 'Failed' }, { status: 500 })
  }

  // Get skill info for return
  const skillRes = await fetch(
    `${INSFORGE_BASE}/api/database/records/skills_catalog?slug=eq.${encodeURIComponent(slug)}&select=name,install_command,config_fields`,
    { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
  )
  const skills = await skillRes.ok ? await skillRes.json() : []
  const skill = skills?.[0] || {}

  return NextResponse.json({
    success: true,
    skill: slug,
    name: skill.name,
    status,
    install_command: skill.install_command,
    config_fields: skill.config_fields,
  })
}
