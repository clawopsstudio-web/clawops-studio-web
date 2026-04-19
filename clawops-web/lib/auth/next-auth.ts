import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Always allow sign in via Google
      return true
    },
    async jwt({ token, account, profile }) {
      // Persist OAuth access_token and provider in the JWT
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
        token.googleId = (profile as any)?.sub
      }
      return token
    },
    async session({ session, token }) {
      // Attach user info to the session
      if (session.user) {
        ;(session.user as any).id = token.sub
        ;(session.user as any).googleId = token.googleId
        ;(session.user as any).provider = token.provider
        ;(session.user as any).accessToken = token.accessToken
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET!,
})

export { handler as GET, handler as POST }
