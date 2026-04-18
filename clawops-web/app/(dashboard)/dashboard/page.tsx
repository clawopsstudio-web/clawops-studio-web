'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

export default function DashboardPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession()
        
        if (!session?.user) {
          window.location.href = '/auth/login?redirectTo=/dashboard'
          return
        }

        const userId = session.user.id
        if (!userId) {
          setError('No user ID in session')
          setStatus('error')
          return
        }

        setStatus('redirecting')
        window.location.href = `/dashboard/${userId}`
      } catch (err) {
        setError('Failed to check session')
        setStatus('error')
      }
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
