'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function GitHubCallback() {
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

        // The SDK auto-detects insforge_code in the URL during initialization
        // and exchanges it for tokens. getCurrentUser() automatically waits for
        // any pending OAuth callback to complete before returning.
        const { data, error } = await insforge.auth.getCurrentUser()

        if (error || !data?.user) {
          console.error('[GitHub Callback] Session error:', error)
          router.push('/auth/login?error=session_failed')
          return
        }

        // Persist the session as a cookie so middleware can read it
        const session = (insforge.auth as any).getSession()
        const persistRes = await fetch('/api/auth/oauth/persist-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken: session?.accessToken,
            provider: 'github',
          }),
        })

        if (!persistRes.ok) {
          console.error('[GitHub Callback] persist-session failed:', persistRes.status)
          router.push('/auth/login?error=persist_failed')
          return
        }

        router.push('/dashboard')
      } catch (err: any) {
        console.error('[GitHub Callback] Fatal error:', err)
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
