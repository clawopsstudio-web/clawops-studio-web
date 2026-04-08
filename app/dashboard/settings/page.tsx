'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    full_name: 'Pulkit',
    company: 'ClawOps Studio',
    email: 'pulkit@example.com',
    timezone: 'Asia/Kolkata',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(4,4,12,0.8)] backdrop-blur-xl px-8 py-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-[rgba(255,255,255,0.4)]">Manage your account and preferences</p>
      </div>

      <div className="px-8 py-6 max-w-2xl space-y-6">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] overflow-hidden">
          <div className="border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Profile</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[rgba(255,255,255,0.4)] mb-1">Full Name</label>
                <input value={profile.full_name} onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[rgba(0,212,255,0.4)]" />
              </div>
              <div>
                <label className="block text-xs text-[rgba(255,255,255,0.4)] mb-1">Company</label>
                <input value={profile.company} onChange={(e) => setProfile({...profile, company: e.target.value})}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[rgba(0,212,255,0.4)]" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[rgba(255,255,255,0.4)] mb-1">Email</label>
              <input value={profile.email} type="email"
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[rgba(0,212,255,0.4)]" />
            </div>
            <div>
              <label className="block text-xs text-[rgba(255,255,255,0.4)] mb-1">Timezone</label>
              <select value={profile.timezone}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[rgba(0,212,255,0.4)]">
                <option>Asia/Kolkata</option>
                <option>UTC</option>
                <option>America/New_York</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] overflow-hidden">
          <div className="border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Notifications</h2>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: 'Agent activity alerts', desc: 'Get notified when agents complete tasks', enabled: true },
              { label: 'VPS status updates', desc: 'Notifications for instance health changes', enabled: true },
              { label: 'Weekly summary', desc: 'Digest of your AI team activity', enabled: false },
              { label: 'Marketing emails', desc: 'Product updates and tips', enabled: false },
            ].map((notif) => (
              <div key={notif.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">{notif.label}</p>
                  <p className="text-xs text-[rgba(255,255,255,0.35)]">{notif.desc}</p>
                </div>
                <button className={`relative h-6 w-11 rounded-full transition-colors ${notif.enabled ? 'bg-[#00D4FF]' : 'bg-[rgba(255,255,255,0.1)]'}`}>
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notif.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Save */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #6600FF)' }}
          >
            {saved ? '\u2713 Saved' : 'Save Changes'}
          </button>
        </div>
      </div>
    </main>
  )
}
