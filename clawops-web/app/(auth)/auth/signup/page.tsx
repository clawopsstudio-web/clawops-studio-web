'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Bot, Loader2, CheckCircle, Mail } from 'lucide-react'

type Step = 'form' | 'verifying' | 'verified'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [oAuthLoading, setOAuthLoading] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [otpSentTo, setOtpSentTo] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    const token = document.cookie.match(/insforge_session=([^;]+)/)
    if (token) {
      router.push(redirectTo)
    }
  }, [redirectTo, router])

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setInterval(() => setResendTimer((x) => x - 1), 1000)
    return () => clearInterval(t)
  }, [resendTimer])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      if (data.requireEmailVerification) {
        // Email verification required — show OTP step
        setOtpSentTo(email)
        setStep('verifying')
        setResendTimer(60) // 60 second resend cooldown
        return
      }

      // No verification — logged in directly
      router.push(redirectTo)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) {
      setError('Please enter the 6-digit code from your email')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Use the InsForge SDK to verify the OTP
      const { insforge } = await import('@/lib/insforge/client')

      const { data, error } = await insforge.auth.verifyEmail({
        email: otpSentTo,
        otp,
      })

      if (error) {
        setError(error.message || 'Invalid or expired code')
        return
      }

      setStep('verified')
      setTimeout(() => router.push(redirectTo), 1500)
    } catch {
      setError('Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    if (resendTimer > 0) return
    setLoading(true)
    setError('')

    try {
      const { insforge } = await import('@/lib/insforge/client')
      const { error } = await insforge.auth.resendVerificationEmail({ email: otpSentTo })
      if (error) {
        setError(error.message || 'Failed to resend code')
      } else {
        setResendTimer(60)
        setError('')
      }
    } catch {
      setError('Failed to resend code')
    } finally {
      setLoading(false)
    }
  }

  async function handleOAuth(provider: 'google' | 'github') {
    setOAuthLoading(provider)
    try {
      const { insforge } = await import('@/lib/insforge/client')
      const redirectUri = `${window.location.origin}/auth/${provider}/callback`

      const { data, error } = await insforge.auth.signInWithOAuth({
        provider,
        redirectTo: redirectUri,
      })

      if (error) {
        setError(`Failed to start ${provider} login`)
        setOAuthLoading(null)
        return
      }

      if (data?.url) {
        window.location.href = data.url
      }
    } catch {
      setError(`Failed to start ${provider} login`)
      setOAuthLoading(null)
    }
  }

  if (step === 'verified') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(52,208,88,0.15)',
            marginBottom: 20,
          }}>
            <CheckCircle size={32} style={{ color: 'var(--system-green)' }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Email verified!
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (step === 'verifying') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
        <div style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'var(--accent-fill)',
              marginBottom: 16,
            }}>
              <Mail size={28} style={{ color: 'var(--accent)' }} />
            </div>
            <h1 style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.4px',
              marginBottom: 6,
            }}>
              Check your email
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              We sent a 6-digit code to<br />
              <strong style={{ color: 'var(--text-primary)' }}>{otpSentTo}</strong>
            </p>
          </div>

          <div style={{
            background: 'var(--material-regular)',
            border: '0.5px solid var(--separator)',
            borderRadius: 20,
            padding: 28,
            boxShadow: 'var(--shadow-card)',
          }}>
            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {error && (
                <div style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: 'rgba(255,92,87,0.12)',
                  border: '0.5px solid rgba(255,92,87,0.3)',
                  color: 'var(--system-red)',
                  fontSize: 13,
                }}>
                  {error}
                </div>
              )}

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}>
                  Verification code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  inputMode="numeric"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '0.5px solid var(--separator)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textAlign: 'center',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                style={{
                  padding: '11px 16px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'var(--accent)',
                  color: 'var(--accent-contrast)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: loading || otp.length !== 6 ? 'not-allowed' : 'pointer',
                  opacity: loading || otp.length !== 6 ? 0.6 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                {loading ? 'Verifying...' : 'Verify email'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 4 }}>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading || resendTimer > 0}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: resendTimer > 0 ? 'var(--text-tertiary)' : 'var(--accent)',
                    fontSize: 13,
                    cursor: loading || resendTimer > 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
                </button>
              </div>
            </form>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 13,
            color: 'var(--text-secondary)',
          }}>
            <button
              type="button"
              onClick={() => { setStep('form'); setOtp(''); setError('') }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                fontSize: 13,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Use a different email
            </button>
          </p>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          input:focus {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 2px var(--accent-fill);
          }
        `}</style>
      </div>
    )
  }

  // Default: show signup form
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(91,108,255,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'var(--accent-fill)',
            marginBottom: 16,
          }}>
            <Bot size={28} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.4px', marginBottom: 6 }}>
            Claw<span style={{ color: 'var(--accent)' }}>Ops</span>
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Create your Agentic OS account
          </p>
        </div>

        <div style={{
          background: 'var(--material-regular)',
          border: '0.5px solid var(--separator)',
          borderRadius: 20,
          padding: 28,
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* OAuth */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {(['google', 'github'] as const).map((provider) => (
              <button
                key={provider}
                onClick={() => handleOAuth(provider)}
                disabled={!!oAuthLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '11px 16px',
                  borderRadius: 10,
                  border: '0.5px solid var(--separator)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: oAuthLoading ? 'not-allowed' : 'pointer',
                  opacity: oAuthLoading ? 0.6 : 1,
                  transition: 'all 0.15s ease',
                }}
              >
                {oAuthLoading === provider ? (
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                ) : provider === 'google' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: '0.5px', background: 'var(--separator)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>or</span>
            <div style={{ flex: 1, height: '0.5px', background: 'var(--separator)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {error && (
              <div style={{
                padding: '10px 12px',
                borderRadius: 8,
                background: 'rgba(255,92,87,0.12)',
                border: '0.5px solid rgba(255,92,87,0.3)',
                color: 'var(--system-red)',
                fontSize: 13,
              }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '0.5px solid var(--separator)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
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
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '0.5px solid var(--separator)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                minLength={6}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '0.5px solid var(--separator)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                padding: '11px 16px',
                borderRadius: 10,
                border: 'none',
                background: 'var(--accent)',
                color: 'var(--accent-contrast)',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <a
            href={`/auth/login${redirectTo !== '/dashboard' ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}
          >
            Sign in
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 2px var(--accent-fill);
        }
        button:hover:not(:disabled) {
          filter: brightness(1.1);
        }
        button:active:not(:disabled) {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Loader2 size={24} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
      </div>
    }>
      <SignupForm />
    </Suspense>
  )
}
