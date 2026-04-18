import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const platform = searchParams.get('platform')
  const search = searchParams.get('search')?.toLowerCase()
  const featured = searchParams.get('featured') === 'true'

  const res = await fetch(
    `${INSFORGE_BASE}/api/database/records/skills_catalog`,
    { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
  )

  if (!res.ok) {
    return NextResponse.json({ skills: [], categories: [], total: 0 })
  }

  const skills = await res.json()
  let filtered = [...(skills || [])]

  if (featured) {
    filtered = filtered.filter((s: any) => s.featured === true)
  }

  if (category && category !== 'all') {
    filtered = filtered.filter((s: any) => s.category?.toLowerCase() === category.toLowerCase())
  }

  if (platform) {
    filtered = filtered.filter((s: any) =>
      (s.platforms || []).some((p: string) => p.toLowerCase().includes(platform.toLowerCase()))
    )
  }

  if (search) {
    filtered = filtered.filter((s: any) =>
      s.name?.toLowerCase().includes(search) ||
      s.description?.toLowerCase().includes(search) ||
      s.tagline?.toLowerCase().includes(search)
    )
  }

  const categories = [...new Set((skills || []).map((s: any) => s.category).filter(Boolean))]

  return NextResponse.json({
    skills: filtered,
    categories,
    total: filtered.length,
  })
}
