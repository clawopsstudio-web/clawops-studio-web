import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

async function getUserId(request: NextRequest): Promise<string> {
  const token = request.cookies.get('insforge_session')?.value
  if (!token) return ''
  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: { 'Authorization': `Bearer ${token}`, 'apikey': INSFORGE_KEY },
    })
    if (!res.ok) return ''
    const data = await res.json()
    return data.user?.id || ''
  } catch {
    return ''
  }
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks?select=*&user_id=eq.${userId}&order=created_at.desc&limit=20`,
      { headers: { 'Authorization': `Bearer ${userId}`, 'apikey': INSFORGE_KEY } }
    )
    if (!res.ok) return NextResponse.json({ error: 'Database error' }, { status: 500 })
    const tasks = await res.json()
    return NextResponse.json({ tasks })
  } catch {
    return NextResponse.json({ tasks: [] })
  }
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, description, priority } = body

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userId}`,
          'apikey': INSFORGE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'representation',
        },
        body: JSON.stringify([{
          user_id: userId,
          title: title.trim(),
          description: description || null,
          priority: priority || 'medium',
          status: 'pending',
        }]),
      }
    )
    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ error: err.message || 'Insert failed' }, { status: 500 })
    }
    const task = await res.json()
    return NextResponse.json({ task }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const userId = await getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, ...updates } = body

  if (!id) return NextResponse.json({ error: 'Task ID required' }, { status: 400 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks?id=eq.${id}&user_id=eq.${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${userId}`,
          'apikey': INSFORGE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'representation',
        },
        body: JSON.stringify(updates),
      }
    )
    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 })
    }
    const task = await res.json()
    return NextResponse.json({ task })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const userId = await getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Task ID required' }, { status: 400 })

  try {
    const res = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks?id=eq.${id}&user_id=eq.${userId}`,
      {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${userId}`, 'apikey': INSFORGE_KEY },
      }
    )
    if (!res.ok) return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
