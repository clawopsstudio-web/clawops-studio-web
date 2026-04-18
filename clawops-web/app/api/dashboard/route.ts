import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

function base64UrlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4)
    return Buffer.from(padded, 'base64').toString('utf-8')
  } catch {
    return ''
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Get user info from JWT payload
  const token = request.cookies.get('insforge_session')?.value
  const payload = token ? decodeJwtPayload(token) : null
  const userEmail = (payload?.email as string) || ''
  const userName = (payload?.name as string) || userEmail.split('@')[0]

  let profile = null
  let tasks: any[] = []
  let instances: any[] = []
  let activeAgents = 0

  try {
    const profileRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/profiles?select=*&id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (profileRes.ok) {
      const profiles = await profileRes.json()
      profile = profiles[0] || null
    }
  } catch { /* profiles table may be empty */ }

  try {
    const tasksRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks?select=id,status,priority,title,created_at&limit=20`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (tasksRes.ok) {
      const allTasks = (await tasksRes.json()) || []
      // Note: tasks table has no user_id column — showing all for now.
      tasks = allTasks.slice(0, 5)
    }
  } catch { /* tasks table may be empty */ }

  try {
    const instancesRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?select=*&limit=20`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (instancesRes.ok) {
      const allInstances = (await instancesRes.json()) || []
      instances = allInstances.filter((i: any) => i.id === userId).slice(0, 10)
    }
  } catch { /* instances table may be empty */ }

  const pendingTasks = tasks.filter((t: any) => t.status === 'pending').length
  const completedTasks = tasks.filter((t: any) => t.status === 'completed').length

  return NextResponse.json({
    profile: profile || { id: userId, email: userEmail, name: userName },
    tasks,
    tasksTotal: tasks.length,
    pendingTasks,
    completedTasks,
    instances,
    activeAgents,
    user: { id: userId, email: userEmail, name: userName },
  })
}
