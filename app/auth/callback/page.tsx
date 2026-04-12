'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

function CallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const next = searchParams.get('next') || '/dashboard'
    const errorParam = searchParams.get('error')

    const handleCallback = async () => {
      if (errorParam) {
        setStatus('error')
        setErrorMsg(errorParam)
        return
      }

      if (!code) {
        setStatus('error')
        setErrorMsg('no_code')
        return
      }

      // Exchange OAuth code for session (client-side PKCE — safe)
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error || !data.session) {
        console.error('[AUTH] Code exchange error:', error?.message)
        setStatus('error')
        setErrorMsg(error?.message || 'callback_error')
        return
      }

      console.log('[AUTH] Session established for:', data.session.user?.email)
      // Supabase client auto-persists session via cookies (persistSession: true)
      window.location.href = next
    }

    handleCallback()
  }, [searchParams])

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#04040c] text-white">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-xl mb-3">Authentication failed</div>
          <p className="text-gray-400 text-sm mb-6">{errorMsg}</p>
          <a
            href="/auth/login"
            className="inline-block px-6 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #6600FF)' }}
          >
            Back to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#04040c] text-white">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-[#00D4FF] border-t-transparent animate-spin" />
        <p className="text-gray-400 text-sm">Signing you in...</p>
      </div>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#04040c] text-white">
        <div className="w-12 h-12 rounded-full border-2 border-[#00D4FF] border-t-transparent animate-spin" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  )
}
