import { redirect } from 'next/navigation'
import { createServerClient, getSession } from '@/lib/insforge/server'
import DashboardShell from '@/components/dashboard/DashboardShell'
import DashboardClient from '@/components/dashboard/DashboardClient'

interface Props {
  params: Promise<{ userId: string }>
}

export default async function UserDashboardPage({ params }: Props) {
  const { userId } = await params
  const session = await getSession()
  const insforge = await createServerClient()

  if (!session.data.session) {
    redirect('/auth/login')
  }

  const user = session.data.session.user

  // Verify the session user matches the URL userId
  if (user.id !== userId) {
    redirect('/auth/login')
  }

  // Fetch data in parallel
  const [profileResult, tasksResult, instancesResult] = await Promise.allSettled([
    insforge.database.from('profiles').select('*').eq('id', userId).maybeSingle(),
    insforge.database.from('tasks').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
    insforge.database.from('vps_instances').select('*').eq('user_id', userId),
  ])

  const profile = profileResult.status === 'fulfilled' ? profileResult.value.data : null
  const tasks = tasksResult.status === 'fulfilled' ? (tasksResult.value.data || []) : []
  const instances = instancesResult.status === 'fulfilled' ? (instancesResult.value.data || []) : []

  // Try to fetch OpenClaw status
  let openclaw: any = null
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://app.clawops.studio'}/api/openclaw-status/`,
      { next: { revalidate: 30 } }
    )
    if (res.ok) openclaw = await res.json()
  } catch {
    // Ignore
  }

  const dashboardData = {
    profile: profile ? {
      full_name: profile.full_name || '',
      company: profile.company || '',
      avatar_url: profile.avatar_url || '',
    } : { full_name: '', company: '', avatar_url: '' },
    tasksTotal: tasks.length,
    pendingTasks: tasks.filter((t: any) => t.status === 'pending').length,
    completedTasks: tasks.filter((t: any) => t.status === 'completed').length,
    tasks,
    instances,
    activeAgents: openclaw?.agents?.filter((a: any) => a.isActive).length || 0,
    openclaw: openclaw ? {
      agents: openclaw.agents || [],
      totalAgents: openclaw.totalAgents || 0,
      activeAgents: openclaw.agents?.filter((a: any) => a.isActive).length || 0,
      system: openclaw.system || {},
      cronJobs: openclaw.cronJobs || [],
      openclawVersion: openclaw.openclawVersion || '',
    } : null,
    userEmail: user.email || '',
    userId: user.id,
  }

  return (
    <DashboardShell>
      <DashboardClient data={dashboardData} />
    </DashboardShell>
  )
}
