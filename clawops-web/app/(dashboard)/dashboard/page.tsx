'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    const decoded = Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Read session from insforge_session cookie (set by both Google OAuth and email login)
        const token = getCookie('insforge_session')

        if (!token) {
          window.location.href = '/auth/login?redirectTo=/dashboard'
          return
        }

        const payload = decodeJwtPayload(token)
        if (!payload) {
          window.location.href = '/auth/login?redirectTo=/dashboard'
          return
        }

        // Check expiry
        const exp = payload.exp as number | undefined
        if (exp && Date.now() / 1000 > exp) {
          window.location.href = '/auth/login?redirectTo=/dashboard'
          return
        }

        const userId = payload.sub as string
        if (!userId) {
          setError('No user ID in session')
          setStatus('error')
          return
        }

        setStatus('redirecting')
        window.location.href = `/dashboard/${userId}`
      } catch (err) {
        console.error('Auth check error:', err)
        window.location.href = '/auth/login?redirectTo=/dashboard'
      }
    }

    checkAuth()
  }, [router])

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#04040c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: '3px solid rgba(91,108,255,0.3)',
            borderTopColor: '#5b6cff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }} />
          <p style={{ color: '#888' }}>Loading dashboard...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#04040c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', color: '#ff4444' }}>
          <p>{error || 'Authentication error'}</p>
          <a href="/auth/login" style={{ color: '#5b6cff', marginTop: 16, display: 'block' }}>
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return null
}
