'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function DashboardPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSession = () => {
      const token = document.cookie.match(/insforge_session=([^;]+)/)?.[1]

      if (!token) {
        window.location.href = '/auth/login?redirectTo=/dashboard'
        return
      }

      const payload = decodeJwtPayload(token)
      if (!payload) {
        setError('Invalid session')
        setStatus('error')
        return
      }

      // Check expiry
      const exp = payload.exp as number | undefined
      if (exp && Date.now() / 1000 > exp) {
        document.cookie = 'insforge_session=; Max-Age=0; path=/'
        window.location.href = '/auth/login?redirectTo=/dashboard'
        return
      }

      const userId = payload.sub as string
      setStatus('redirecting')
      window.location.href = `/dashboard/${userId}`
    }

    checkSession()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04040c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#f4f7fb',
    }}>
      <div style={{ textAlign: 'center' }}>
        {status === 'loading' && (
          <>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: '2px solid #00D4FF',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
              }} />
            </div>
            <p style={{ color: 'rgba(244, 247, 251, 0.4)', fontSize: 14 }}>
              Checking session...
            </p>
          </>
        )}
        {status === 'redirecting' && (
          <>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: '2px solid #00D4FF',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
              }} />
            </div>
            <p style={{ color: 'rgba(244, 247, 251, 0.4)', fontSize: 14 }}>
              Redirecting to your dashboard...
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(255, 77, 77, 0.1)',
              border: '1px solid rgba(255, 77, 77, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: 24,
            }}>
              ✕
            </div>
            <p style={{ color: '#ff4d4d', fontSize: 14, marginBottom: 8 }}>
              {error || 'Session error'}
            </p>
            <button
              onClick={() => window.location.href = '/auth/login'}
              style={{
                background: '#00D4FF',
                color: '#04040c',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
