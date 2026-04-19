import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// ── Hardcoded test account (works immediately, no external deps) ──
// Replace with real auth (InsForge Cloud / Supabase) after Vercel reset
const TEST_USERS = [
  { id: '1', email: 'admin@clawops.studio', name: 'Pulkit', password: 'ClawOps2024!' },
  { id: '2', email: 'test@clawops.studio', name: 'Test User', password: 'test1234' },
]

const providers = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null

      // Hardcoded test accounts — works immediately
      const user = TEST_USERS.find(
        u =>
          u.email.toLowerCase() === credentials.email.toLowerCase() &&
          u.password === credentials.password
      )
      if (user) {
        return { id: user.id, email: user.email, name: user.name }
      }

      // Try InsForge Cloud auth if env var is set
      const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_API_URL
      if (insforgeUrl) {
        try {
          const res = await fetch(`${insforgeUrl}/api/auth/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })
          if (res.ok) {
            const data = await res.json()
            return {
              id: data.user?.id || '1',
              email: credentials.email,
              name: data.user?.profile?.name || credentials.email.split('@')[0],
            }
          }
        } catch {
          // InsForge unavailable — fall through
        }
      }

      return null
    },
  }),
]

export const authOptions: AuthOptions = {
  providers: providers as any,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.provider = account?.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id
        ;(session.user as any).provider = token.provider
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-in-production',
}
