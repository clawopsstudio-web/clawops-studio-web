import { redirect } from 'next/navigation'
import { getSession } from '@/lib/insforge/server'
import DashboardShell from '@/components/dashboard/DashboardShell'
import DashboardClient from '@/components/dashboard/DashboardClient'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

interface Props {
  params: Promise<{ userId: string }>
}

export default async function UserDashboardPage({ params }: Props) {
  const { userId } = await params
  const session = await getSession()

  if (!session.data.session) {
    redirect('/auth/login')
  }

  const user = session.data.session.user

  // Verify the session user matches the URL userId
  if (user.id !== userId) {
    redirect('/auth/login')
  }

  // Fetch data in parallel using direct fetch (SDK /rest/v1/ is broken)
  const headers = { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY }

  const [profileResult, tasksResult, instancesResult] = await Promise.allSettled([
    fetch(`${INSFORGE_BASE}/api/database/records/profiles?id=eq.${userId}`, { headers }),
    fetch(`${INSFORGE_BASE}/api/database/records/tasks?order=created_at.desc&limit=10`, { headers }),
    fetch(`${INSFORGE_BASE}/api/database/records/vps_instances?limit=20`, { headers }),
  ])

  const profile = profileResult.status === 'fulfilled' && profileResult.value.ok
    ? (await profileResult.value.json())?.[0] || null
    : null

  const tasks = tasksResult.status === 'fulfilled' && tasksResult.value.ok
    ? (await tasksResult.value.json()) || []
    : []

  const instances = instancesResult.status === 'fulfilled' && instancesResult.value.ok
    ? (await instancesResult.value.json()) || []
    : []

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
