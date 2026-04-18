'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

export interface AuthUser {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function useAuth() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(status === 'loading')

  useEffect(() => {
    setLoading(status === 'loading')
  }, [status])

  return {
    user: session?.user as AuthUser | null,
    loading,
    signIn: (provider?: string, options?: Record<string, unknown>) => signIn(provider, options),
    signOut: (options?: Record<string, unknown>) => signOut(options),
  }
}
