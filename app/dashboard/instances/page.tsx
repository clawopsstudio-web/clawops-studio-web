'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function InstancesPage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(4,4,12,0.8)] backdrop-blur-xl px-8 py-6">
        <h1 className="text-2xl font-bold text-white">VPS Instances</h1>
        <p className="mt-1 text-sm text-[rgba(255,255,255,0.4)]">Manage your Contabo VPS instances</p>
      </div>
      <div className="px-8 py-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-12 text-center">
          <p className="text-4xl mb-3">&#x1F5A5;&#xFE0F;</p>
          <h3 className="text-lg font-semibold text-white mb-1">No Instances Yet</h3>
          <p className="text-sm text-[rgba(255,255,255,0.35)] mb-4">Connect your Contabo account to sync VPS instances.</p>
          <Link href="/dashboard/mission-control"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #6600FF)' }}>
            Go to Mission Control
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
