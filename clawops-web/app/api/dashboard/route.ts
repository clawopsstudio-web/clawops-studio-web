import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, getSession, getUserId } from '@/lib/insforge/server'

export async function GET(request: NextRequest) {
  const insforge = await createServerClient()
  const userId = await getUserId()
  const session = await getSession()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userEmail = session.data.session?.user?.email || ''

  const [profileResult, tasksResult, instancesResult, agentsResult] = await Promise.all([
    insforge.database.from('profiles').select('*').eq('id', userId).maybeSingle(),
    insforge.database.from('tasks').select('id,status,priority,title,created_at').eq('user_id', userId),
    insforge.database.from('vps_instances').select('*').eq('user_id', userId),
    insforge.database.from('agent_configs').select('*').eq('user_id', userId).eq('status', 'active'),
  ])

  const allTasks = tasksResult.data || []
  const pendingTasks = allTasks.filter((t: any) => t.status === 'pending').length
  const completedTasks = allTasks.filter((t: any) => t.status === 'completed').length

  return NextResponse.json({
    profile: profileResult.data,
    tasks: allTasks.slice(0, 5),
    tasksTotal: allTasks.length,
    pendingTasks,
    completedTasks,
    instances: instancesResult.data || [],
    activeAgents: (agentsResult.data || []).length,
    user: { id: userId, email: userEmail },
  })
}
