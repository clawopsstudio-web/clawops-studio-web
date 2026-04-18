import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { name, agent_type, skills, config, status } = body

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }

  // Use direct fetch to /api/database/records (the working InsForge endpoint)
  const res = await fetch(`${INSFORGE_BASE}/api/database/records/agent_configs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${INSFORGE_KEY}`,
      'apikey': INSFORGE_KEY,
      'Prefer': 'representation',
    },
    body: JSON.stringify([{
      id: userId,
      agent_name: name,
      agent_type: agent_type || 'custom',
      skills: skills || null,
      config: config || null,
      status: status || 'active',
    }]),
  })

  if (!res.ok) {
    const error = await res.json()
    return NextResponse.json({ error: error.message || 'Failed to create agent' }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json({ success: true, data: Array.isArray(data) ? data[0] : data })
}
