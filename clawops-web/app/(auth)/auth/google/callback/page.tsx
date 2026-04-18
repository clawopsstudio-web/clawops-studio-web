'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function GoogleCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    async function handleCallback() {
      if (error) {
        router.push(`/auth/login?error=${encodeURIComponent(error)}`)
        return
      }

      const code = searchParams.get('insforge_code')
      if (!code) {
        router.push('/auth/login?error=missing_code')
        return
      }

      try {
        const { insforge } = await import('@/lib/insforge/client')

        // Exchange the code with InsForge using PKCE.
        // The SDK reads the verifier from sessionStorage automatically.
        const { data, error: exchangeError } = await insforge.auth.exchangeOAuthCode(code)

        if (exchangeError) {
          console.error('[Google Callback] Exchange error:', exchangeError)
          router.push(`/auth/login?error=${encodeURIComponent(exchangeError.message || 'exchange_failed')}`)
          return
        }

        if (data?.accessToken) {
          // SDK stores session in memory. We need to also set the insforge_session cookie
          // so that middleware can read it for server-side auth.
          const response = await fetch('/api/auth/oauth/persist-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken: data.accessToken, provider: 'google' }),
          })

          if (response.ok) {
            sessionStorage.removeItem('insforge_pkce_verifier')
            router.push('/dashboard')
          } else {
            console.error('[Google Callback] persist-session failed:', response.status)
            router.push('/auth/login?error=persist_failed')
          }
        } else {
          router.push('/auth/login?error=no_access_token')
        }
      } catch (err: any) {
        console.error('[Google Callback] Fatal error:', err)
        router.push('/auth/login?error=oauth_failed')
      }
    }

    handleCallback()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04040c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      flexDirection: 'column',
      color: '#888',
    }}>
      <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: '#5b6cff' }} />
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
        background: '#04040c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: '#5b6cff' }} />
      </div>
    }>
      <GoogleCallback />
    </Suspense>
  )
}
