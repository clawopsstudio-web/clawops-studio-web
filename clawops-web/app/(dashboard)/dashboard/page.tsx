'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for our custom auth token/cookie
        const token = document.cookie.match(/auth-session=([^;]+)/)?.[1]
        
        if (!token) {
          window.location.href = '/auth/login?redirectTo=/dashboard'
          return
        }

        // Validate token with our API
        const res = await fetch('/api/auth/validate-jwt', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          window.location.href = '/auth/login?redirectTo=/dashboard'
          return
        }

        const data = await res.json()
        
        if (!data.user?.id) {
          setError('No user ID in session')
          setStatus('error')
          return
        }

        setStatus('redirecting')
        window.location.href = `/dashboard/${data.user.id}`
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
          <p style={{ color: '#888' }}>Checking authentication...</p>
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
