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
        // The verifier is read from sessionStorage by the SDK's exchangeOAuthCode.
        const { data, error: exchangeError } = await insforge.auth.exchangeOAuthCode(code)

        if (exchangeError) {
          console.error('[Google Callback] Exchange error:', exchangeError)
          router.push(`/auth/login?error=${encodeURIComponent(exchangeError.message || 'exchange_failed')}`)
          return
        }

        if (data?.accessToken) {
          // Clear PKCE verifier
          sessionStorage.removeItem('insforge_pkce_verifier')
          localStorage.removeItem('insforge_pkce_verifier')
          router.push('/dashboard')
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
