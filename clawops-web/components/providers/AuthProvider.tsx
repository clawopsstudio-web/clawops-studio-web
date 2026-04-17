'use client'

import { useState, useEffect } from 'react'

// Auth disabled — InForge will handle auth
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/auth/session')
        if (res.ok) {
          const data = await res.json()
          setUser(data.user || null)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { user, loading }
}
