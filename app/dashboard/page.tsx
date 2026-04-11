import DashboardClient from '@/components/dashboard/DashboardClient'
import { MOCK_USER, MOCK_TASKS, MOCK_DASHBOARD_STATS } from '@/lib/mock-data'

export default async function DashboardPage() {
  // Use mock data for now - skip Supabase DB calls
  const dashboardData = {
    profile: MOCK_USER,
    tasks: MOCK_TASKS.slice(0, 10),
    tasksTotal: MOCK_TASKS.length,
    pendingTasks: MOCK_TASKS.filter(t => t.status === 'TODO').length,
    completedTasks: MOCK_TASKS.filter(t => t.status === 'DONE').length,
    instances: [],
    activeAgents: 3,
    userEmail: MOCK_USER.email,
  }

  return <DashboardClient data={dashboardData} />
}