'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Mission Control', href: '/dashboard/mission-control' },
    { name: 'Instances', href: '/dashboard/instances' },
    { name: 'Billing', href: '/dashboard/billing' },
    { name: 'Settings', href: '/dashboard/settings' },
  ]

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 p-6 flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-8">ClawOps</h2>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={`p-2 rounded ${pathname === link.href ? 'bg-cyan-900/30 text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
          {link.name}
        </Link>
      ))}
    </div>
  )
}
