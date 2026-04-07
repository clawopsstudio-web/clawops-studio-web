'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) router.push('/dashboard')
    else alert(error.message)
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <form onSubmit={handleSignIn} className="w-full max-w-md space-y-4 rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full rounded bg-gray-800 p-2 border border-gray-700" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full rounded bg-gray-800 p-2 border border-gray-700" />
        <button disabled={loading} className="w-full rounded bg-cyan-600 p-2 font-bold hover:bg-cyan-500">Sign In</button>
        <button type="button" onClick={handleGoogleSignIn} className="w-full rounded bg-white p-2 text-black font-bold hover:bg-gray-200">Sign In with Google</button>
      </form>
    </motion.div>
  )
}
