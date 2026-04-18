import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/insforge/server'
import { getUserId } from '@/lib/api-auth'
import { insforgeAdmin } from '@/lib/insforge/admin'

// GET: List user's installed skills
export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const insforge = await createServerClient()

  const [userSkillsResult, catalogResult] = await Promise.all([
    insforge.database.from('user_skills').select('*').eq('id', userId),
    insforgeAdmin.database.from('skills_catalog').select('*'),
  ])

  const catalog = catalogResult.data || []
  const userSkills = userSkillsResult.data || []

  // Enrich user skills with catalog data
  const installed = userSkills.map((us: any) => {
    const catalogSkill = catalog.find((c: any) => c.slug === us.skill_slug)
    return {
      ...catalogSkill,
      install_status: us.status,
      config_data: us.config_data,
      installed_at: us.created_at,
    }
  }).filter(Boolean)

  return NextResponse.json({ installed, catalog })
}
