'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function GoogleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('insforge_code')
  const error = searchParams.get('error')

  useEffect(() => {
    async function handleCallback() {
      if (error) {
        router.push(`/auth/login?error=${encodeURIComponent(error)}`)
        return
      }

      if (!code) {
        router.push('/auth/login?error=missing_code')
        return
      }

      try {
        const verifier = sessionStorage.getItem('insforge_pkce_verifier')

        if (!verifier) {
          const { insforge } = await import('@/lib/insforge/client')
          const { data } = await insforge.auth.exchangeOAuthCode(code)
          
          if (data?.accessToken) {
            await fetch('/api/auth/oauth/persist-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ accessToken: data.accessToken, provider: 'google' }),
            })
          }
          router.push('/dashboard')
          return
        }

        const res = await fetch('/api/auth/oauth/persist-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, verifier, provider: 'google' }),
        })

        if (!res.ok) {
          const data = await res.json()
          router.push(`/auth/login?error=${encodeURIComponent(data.error || 'OAuth failed')}`)
          return
        }

        sessionStorage.removeItem('insforge_pkce_verifier')
        router.push('/dashboard')
      } catch (err) {
        console.error('Google OAuth error:', err)
        router.push('/auth/login?error=oauth_failed')
      }
    }

    if (code || error) {
      handleCallback()
    }
  }, [code, error, router])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      flexDirection: 'column',
      color: 'var(--text-secondary)',
    }}>
      <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
      <span style={{ fontSize: 14 }}>Completing sign in with Google...</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
      </div>
    }>
      <GoogleCallback />
    </Suspense>
  )
}
