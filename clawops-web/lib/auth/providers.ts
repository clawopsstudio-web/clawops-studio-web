import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { getUserByEmail, verifyPassword } from './users'

const providers = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null

      const user = getUserByEmail(credentials.email)
      if (!user) return null
      if (!verifyPassword(user, credentials.password)) return null

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    },
  }),
]

// Add Google OAuth if env vars are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }) as any
  )
}

export const authOptions: AuthOptions = {
  providers: providers as any,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && user.email) {
        const { findOrCreateGoogleUser } = await import('./users')
        const storedUser = findOrCreateGoogleUser({
          email: user.email,
          name: user.name || user.email.split('@')[0],
          googleId: (profile as any)?.sub || user.id || '',
        })
        user.id = storedUser.id
      }
      return true
    },
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
