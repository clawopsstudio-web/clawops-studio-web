import DashboardSidebar from '@/components/ui/DashboardSidebar'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <DashboardSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Agent Status</h2>
            <div className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2"></div>
            <span className="text-gray-400">Online</span>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Instance Info</h2>
            <p className="text-gray-400">IP: 100.x.x.x</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Tasks Today</h2>
            <p className="text-4xl font-bold text-cyan-400">12</p>
          </div>
        </div>
        <div className="mt-8 bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <a href="http://localhost:9222" target="_blank" className="bg-cyan-600 px-6 py-3 rounded-lg hover:bg-cyan-500">Chrome DevTools</a>
            <a href="http://localhost:5678" target="_blank" className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-500">n8n</a>
          </div>
        </div>
      </main>
    </div>
  )
}
