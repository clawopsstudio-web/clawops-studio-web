import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

// Get user from InsForge auth session
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

  // Fetch dashboard data from database (may be empty initially)
  let profile = null
  let tasks: any[] = []
  let instances: any[] = []
  let activeAgents: number = 0

  try {
    // Query profiles
    const profileRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/profiles?select=*&id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${userId}`, 'apikey': INSFORGE_KEY } }
    )
    if (profileRes.ok) {
      const profiles = await profileRes.json()
      profile = profiles[0] || null
    }
  } catch { /* profiles table may be empty */ }

  try {
    // Query tasks
    const tasksRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/tasks?select=id,status,priority,title,created_at&user_id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${userId}`, 'apikey': INSFORGE_KEY } }
    )
    if (tasksRes.ok) {
      tasks = (await tasksRes.json()) || []
    }
  } catch { /* tasks table may be empty */ }

  try {
    // Query VPS instances
    const instancesRes = await fetch(
      `${INSFORGE_BASE}/api/database/records/vps_instances?select=*&user_id=eq.${userId}`,
      { headers: { 'Authorization': `Bearer ${userId}`, 'apikey': INSFORGE_KEY } }
    )
    if (instancesRes.ok) {
      instances = (await instancesRes.json()) || []
    }
  } catch { /* instances table may be empty */ }

  const pendingTasks = tasks.filter((t: any) => t.status === 'pending').length
  const completedTasks = tasks.filter((t: any) => t.status === 'completed').length

  return NextResponse.json({
    profile: profile || { id: userId, email: userEmail, name: userName },
    tasks: tasks.slice(0, 5),
    tasksTotal: tasks.length,
    pendingTasks,
    completedTasks,
    instances,
    activeAgents,
    user: { id: userId, email: userEmail, name: userName },
  })
}
