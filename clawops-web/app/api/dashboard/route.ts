import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

async function getUserFromSession(request: NextRequest) {
  const token = request.cookies.get('insforge_session')?.value
  if (!token) return null
  try {
    const res = await fetch(`${INSFORGE_BASE}/api/auth/sessions/current`, {
      headers: { 'Authorization': `Bearer ${token}`, 'apikey': INSFORGE_KEY },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.user || null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const user = await getUserFromSession(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = user.id
  const userEmail = user.email || ''
  const userName = user.profile?.name || user.profile?.full_name || userEmail.split('@')[0]

  // Fetch dashboard data from InsForge database using anon key
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
      // tasks table uses id as user reference
      tasks = allTasks.filter((t: any) => t.id === userId).slice(0, 5)
    }
  } catch { /* tasks table may be empty */ }

  try {
    const instancesRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?select=*&limit=20`,
      { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
    )
    if (instancesRes.ok) {
      const allInstances = (await instancesRes.json()) || []
      // Filter by id (vps_instances uses id as user reference)
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
