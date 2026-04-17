import { NextRequest, NextResponse } from 'next/server'
import { insforgeAdmin } from '@/lib/insforge/admin'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const platform = searchParams.get('platform')
  const search = searchParams.get('search')?.toLowerCase()
  const featured = searchParams.get('featured') === 'true'

  const { data: skills, error } = await insforgeAdmin.database
    .from('skills_catalog')
    .select('*')

  if (error || !skills) {
    // Graceful fallback — return empty catalog
    return NextResponse.json({ skills: [], categories: [], total: 0 })
  }

  let filtered = [...skills]

  if (featured) {
    filtered = filtered.filter(s => s.featured === true)
  }

  if (category && category !== 'all') {
    filtered = filtered.filter(s => s.category?.toLowerCase() === category.toLowerCase())
  }

  if (platform) {
    filtered = filtered.filter(s =>
      (s.platforms || []).some((p: string) => p.toLowerCase().includes(platform.toLowerCase()))
    )
  }

  if (search) {
    filtered = filtered.filter(s =>
      s.name?.toLowerCase().includes(search) ||
      s.description?.toLowerCase().includes(search) ||
      s.tagline?.toLowerCase().includes(search)
    )
  }

  // Extract unique categories
  const categories = [...new Set((skills || []).map((s: any) => s.category).filter(Boolean))]

  return NextResponse.json({
    skills: filtered,
    categories,
    total: filtered.length,
  })
}
