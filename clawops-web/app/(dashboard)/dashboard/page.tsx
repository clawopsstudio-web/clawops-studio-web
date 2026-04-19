'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
  const { status, data: session } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/auth/login?redirectTo=/dashboard'
    } else if (status === 'authenticated' && session?.user) {
      const userId = (session.user as any).id
      if (userId) {
        window.location.href = `/dashboard/${userId}`
      }
    }
  }, [status, session])

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

  if (status === 'unauthenticated') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#04040c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888' }}>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return null
}
