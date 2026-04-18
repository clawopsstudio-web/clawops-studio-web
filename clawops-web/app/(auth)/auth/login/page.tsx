'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'
  const errorParam = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(errorParam ? decodeURIComponent(errorParam) : '')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setOauthLoading(true)
    try {
      const { insforge } = await import('@/lib/insforge/client')

      // Get the OAuth URL without redirecting
      const { data, error: oauthError } = await insforge.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: `${window.location.origin}/auth/google/callback`,
        skipBrowserRedirect: true,
      })

      if (oauthError || !data?.url) {
        setError(oauthError?.message || 'Google sign-in failed')
        setOauthLoading(false)
        return
      }

      // Extract PKCE verifier from sessionStorage (set by SDK) and store in localStorage
      // localStorage is more reliable than sessionStorage for cross-origin OAuth redirects
      const verifier = sessionStorage.getItem('insforge_pkce_verifier')
      if (verifier) {
        localStorage.setItem('insforge_pkce_verifier', verifier)
      }

      // Redirect to Google OAuth
      window.location.href = data.url
    } catch (err: any) {
      setError(err?.message || 'Google sign-in failed')
      setOauthLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || 'Invalid credentials')
        setLoading(false)
        return
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      router.push(redirectTo)
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04040c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(91,108,255,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #5b6cff 0%, #8b5cf6 100%)',
          }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>C</span>
          </div>
          <h1 style={{
            fontSize: 24,
            fontWeight: 600,
            color: '#fff',
            marginTop: 16,
            marginBottom: 4,
          }}>
            Welcome back
          </h1>
          <p style={{ color: '#888', fontSize: 14 }}>
            Sign in to your account
          </p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 16,
        }}>
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={oauthLoading}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: oauthLoading ? 'rgba(255,255,255,0.05)' : '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              color: '#333',
              fontSize: 15,
              fontWeight: 500,
              cursor: oauthLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 16,
              transition: 'background 0.2s',
            }}
          >
            {oauthLoading ? (
              <span style={{ fontSize: 13, color: '#888' }}>Redirecting...</span>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ color: '#555', fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 16,
                color: '#ef4444',
                fontSize: 14,
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block',
                color: '#aaa',
                fontSize: 13,
                marginBottom: 6,
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                color: '#aaa',
                fontSize: 13,
                marginBottom: 6,
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? 'rgba(91,108,255,0.5)' : 'linear-gradient(135deg, #5b6cff 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: 20,
            color: '#666',
            fontSize: 13,
          }}>
            Don't have an account?{' '}
            <a href="/auth/signup" style={{ color: '#818cf8', textDecoration: 'none' }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#5b6cff', fontSize: 14 }}>Loading...</div>
      </div>
    }>
      <LoginPageInner />
    </Suspense>
  )
}
