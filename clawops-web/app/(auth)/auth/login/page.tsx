// @ts-nocheck
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
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

      // Save token and redirect
      if (data.token) {
        document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`
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
            fontSize: 28,
            fontWeight: 700,
            marginTop: 16,
            background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ClawOps Studio
          </h1>
          <p style={{ color: '#9ca3af', marginTop: 8 }}>Sign in to your account</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: 32,
        }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 20,
                color: '#fca5a5',
                fontSize: 14,
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#e5e7eb', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 16,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', color: '#e5e7eb', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: 16,
                  outline: 'none',
                }}
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
                fontSize: 16,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign in'}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            Don't have an account?{' '}
            <a href="/auth/signup" style={{ color: '#818cf8', textDecoration: 'none' }}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <LoginForm />
}