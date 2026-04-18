import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

// GET: List user's installed skills
export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Fetch user skills and catalog in parallel using direct fetch
  const [userSkillsRes, catalogRes] = await Promise.all([
    fetch(
      `${INSFORGE_BASE}/api/database/records/user_skills?id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    ),
    fetch(
      `${INSFORGE_BASE}/api/database/records/skills_catalog`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    ),
  ])

  const userSkills = userSkillsRes.ok ? await userSkillsRes.json() : []
  const catalog = catalogRes.ok ? await catalogRes.json() : []

  // Enrich user skills with catalog data
  const installed = (userSkills || []).map((us: any) => {
    const catalogSkill = (catalog || []).find((c: any) => c.slug === us.skill_slug)
    return {
      ...catalogSkill,
      install_status: us.status,
      config_data: us.config_data,
      installed_at: us.created_at,
    }
  }).filter(Boolean)

  return NextResponse.json({ installed, catalog: catalog || [] })
}
