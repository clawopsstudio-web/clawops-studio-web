'use client'

import { useState, useEffect, useCallback } from 'react'

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4)
  return Buffer.from(padded, 'base64').toString('utf-8')
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
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export interface InsForgeUser {
  id: string
  email: string
  role: string
  name?: string
}

export function useUserId(): string {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const token = getCookie('insforge_session')
    if (!token) {
      setUserId('')
      return
    }
    const payload = decodeJwtPayload(token)
    if (payload) {
      setUserId((payload.sub as string) || '')
    }
  }, [])

  return userId
}

export function useUserEmail(): string {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const token = getCookie('insforge_session')
    if (!token) {
      setEmail('')
      return
    }
    const payload = decodeJwtPayload(token)
    if (payload) {
      setEmail((payload.email as string) || '')
    }
  }, [])

  return email
}

export function useSession(): { userId: string; email: string; role: string } {
  const [session, setSession] = useState({ userId: '', email: '', role: 'authenticated' })

  useEffect(() => {
    async function loadSession() {
      const token = getCookie('insforge_session')
      if (!token) {
        setSession({ userId: '', email: '', role: 'authenticated' })
        return
      }

      const payload = decodeJwtPayload(token)
      if (payload) {
        // Check expiry
        const exp = payload.exp as number | undefined
        if (exp && Date.now() / 1000 > exp) {
          setSession({ userId: '', email: '', role: 'authenticated' })
          return
        }
        setSession({
          userId: (payload.sub as string) || '',
          email: (payload.email as string) || '',
          role: (payload.role as string) || 'authenticated',
        })
        return
      }

      // Fallback: validate via API
      try {
        const res = await fetch('/api/auth/session')
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            setSession({
              userId: data.user.id || '',
              email: data.user.email || '',
              role: data.user.role || 'authenticated',
            })
          }
        }
      } catch {
        setSession({ userId: '', email: '', role: 'authenticated' })
      }
    }

    loadSession()
  }, [])

  return session
}

export function useLogout() {
  return useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // clear cookie anyway
      document.cookie = 'insforge_session=; Max-Age=0; path=/'
    }
    window.location.href = '/auth/login'
  }, [])
}
