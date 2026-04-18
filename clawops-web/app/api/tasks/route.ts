import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks?select=*&limit=20`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (!res.ok) return NextResponse.json({ tasks: [] })
    const allTasks = await res.json()
    const tasks = (allTasks || []).filter((t: any) => t.id === userId)
    return NextResponse.json({ tasks })
  } catch {
    return NextResponse.json({ tasks: [] })
  }
}

export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, description, priority } = body

  if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${INSFORGE_KEY}`,
          'apikey': INSFORGE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          id: userId,
          title,
          description: description || null,
          priority: priority || 'medium',
          status: 'pending',
        }]),
      }
    )
    if (!res.ok) return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Task ID required' }, { status: 400 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks?id=eq.${id}&id=eq.${userId}`,
      { method: 'DELETE', headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (!res.ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
