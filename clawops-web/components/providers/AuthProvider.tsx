'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name?: string
  fullName?: string
  role: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: async () => {},
  refreshUser: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

function base64UrlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4)
    return Buffer.from(padded, 'base64').toString('utf-8')
  } catch {
    return ''
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    return null
  }
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
  )
  return match ? decodeURIComponent(match[1]) : null
}

export default function InsForgeAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadUser() {
    const token = getCookie('insforge_session')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    const payload = decodeJwtPayload(token)
    if (!payload) {
      setUser(null)
      setLoading(false)
      return
    }

    // Check expiry
    const exp = payload.exp as number | undefined
    if (exp && Date.now() / 1000 > exp) {
      setUser(null)
      setLoading(false)
      return
    }

    setUser({
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string | undefined,
      role: (payload.role as string) || 'authenticated',
    })
    setLoading(false)
  }

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    document.cookie = 'insforge_session=; Max-Age=0; path=/'
    setUser(null)
    window.location.href = '/auth/login'
  }

  useEffect(() => {
    loadUser()

    // Listen for storage changes (other tabs)
    const handleStorage = () => loadUser()
    // Listen for custom auth events
    const handleAuthChange = () => loadUser()
    window.addEventListener('storage', handleStorage)
    window.addEventListener('insforge:session', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('insforge:session', handleAuthChange)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: loadUser }}>
      {children}
    </AuthContext.Provider>
  )
}
