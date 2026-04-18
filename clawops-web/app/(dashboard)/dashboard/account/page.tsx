'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, LogOut, Shield, Loader2 } from 'lucide-react'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const padded = parts[1] + '=='.slice(0, (4 - parts[1].length % 4) % 4)
    return JSON.parse(Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString())
  } catch {
    return null
  }
}

interface SessionUser {
  id: string
  email: string
  name?: string
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ full_name: '', company: '' })

  useEffect(() => {
    const token = getCookie('insforge_session')
    if (!token) {
      window.location.href = '/auth/login'
      return
    }

    const payload = decodeJwtPayload(token)
    if (!payload) {
      window.location.href = '/auth/login'
      return
    }

    const exp = payload.exp as number | undefined
    if (exp && Date.now() / 1000 > exp) {
      window.location.href = '/auth/login'
      return
    }

    const userData: SessionUser = {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string | undefined,
    }
    setUser(userData)
    setForm({ full_name: (payload.name as string) || '', company: '' })
    setLoading(false)

    // Fetch full profile from API
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setForm(prev => ({
            full_name: data.full_name || prev.full_name,
            company: data.company || '',
          }))
        }
      })
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: form.full_name, company: form.company }),
      })
      const data = await res.json()
      setSaving(false)
      setMessage(data.error ? `Error: ${data.error}` : 'Profile saved!')
    } catch {
      setSaving(false)
      setMessage('Error saving profile')
    }
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/auth/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04040c] flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-[#00D4FF] animate-spin" />
      </div>
    )
  }

  const initials = form.full_name
    ? form.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : (user?.email?.[0] || 'U').toUpperCase()

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(4,4,12,0.8)] backdrop-blur-xl px-8 py-6">
        <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        <p className="mt-1 text-sm text-[rgba(255,255,255,0.4)]">Manage your profile and preferences</p>
      </div>

      <div className="px-8 py-6 max-w-2xl space-y-6">
        {/* Profile */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#00D4FF]" />
            Profile
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6600FF] flex items-center justify-center text-xl font-bold text-white">
              {initials}
            </div>
            <div>
              <p className="text-white font-medium">{form.full_name || 'No name set'}</p>
              <p className="text-sm text-white/40">{user?.email}</p>
              <p className="text-xs text-white/25 mt-1">ID: {user?.id?.slice(0, 8)}...</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00D4FF]/50 transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#00D4FF]/50 transition-colors"
                placeholder="Your company name"
              />
            </div>

            {message && (
              <p className={`text-sm ${message.startsWith('Profile saved') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #6600FF)' }}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00D4FF]" />
            Account Info
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)]">
              <span className="text-sm text-white/50">Email</span>
              <span className="text-sm text-white">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)]">
              <span className="text-sm text-white/50">User ID</span>
              <span className="text-xs text-white/30 font-mono">{user?.id}</span>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-6">
          <h2 className="text-sm font-semibold text-red-400 mb-4 flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">Sign Out</p>
              <p className="text-xs text-white/30">Log out of your account on this device</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
