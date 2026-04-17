import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getUserId } from '@/lib/insforge/server'

export async function GET(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: tasks, error } = await insforge.database
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ tasks: tasks || [] })
}

export async function POST(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, description, priority } = body

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const { data: task, error } = await insforge.database
    .from('tasks')
    .insert([{
      user_id: userId,
      title: title.trim(),
      description: description || null,
      priority: priority || 'medium',
      status: 'pending',
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ task }, { status: 201 })
}

export async function PATCH(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, ...updates } = body

  if (!id) return NextResponse.json({ error: 'Task ID required' }, { status: 400 })

  const { data: task, error } = await insforge.database
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ task })
}

export async function DELETE(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Task ID required' }, { status: 400 })

  const { error } = await insforge.database
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
