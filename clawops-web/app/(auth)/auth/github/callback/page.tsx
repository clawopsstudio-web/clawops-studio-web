'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function GitHubCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const oauthError = searchParams.get('error')

  useEffect(() => {
    async function handleCallback() {
      if (oauthError) {
        router.push(`/auth/login?error=${encodeURIComponent(oauthError)}`)
        return
      }

      const code = searchParams.get('insforge_code')
      if (!code) {
        router.push('/auth/login?error=missing_code')
        return
      }

      try {
        // The SDK stores the PKCE verifier at 'insforge_pkce_verifier' in sessionStorage.
        const verifier = sessionStorage.getItem('insforge_pkce_verifier')

        if (!verifier) {
          console.error('[GitHub Callback] No PKCE verifier found. Available keys:', Object.keys(sessionStorage))
          router.push('/auth/login?error=missing_verifier')
          return
        }

        const persistRes = await fetch('/api/auth/oauth/persist-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            verifier,
            provider: 'github',
          }),
        })

        const persistData = await persistRes.json()

        if (!persistRes.ok || persistData.error) {
          console.error('[GitHub Callback] persist-session failed:', persistData)
          router.push('/auth/login?error=persist_failed')
          return
        }

        sessionStorage.removeItem('insforge_pkce_verifier')
        router.push('/dashboard')
      } catch (err: any) {
        console.error('[GitHub Callback] Fatal error:', err?.message)
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
      <span style={{ fontSize: 14 }}>Completing sign in with GitHub...</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function GitHubCallbackPage() {
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
      <GitHubCallback />
    </Suspense>
  )
}
