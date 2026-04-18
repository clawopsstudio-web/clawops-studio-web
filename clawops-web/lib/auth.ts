import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// User type
interface AuthUser {
  id: string
  email: string
  name?: string | null
  image?: string | null
}

// Credentials user for session
interface CredentialsUser extends AuthUser {
  password?: string
}

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'temp-secret-change-in-prod'

// Use explicit base URL - Vercel will have NEXTAUTH_URL set
function getBaseUrl() {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

// Password hashing
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'clawops-salt-2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const inputHash = await hashPassword(password)
  return inputHash === hash
}

// Create or get user from InsForge DB
async function upsertUserFromGoogle(googleUser: AuthUser): Promise<AuthUser> {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

  try {
    const checkRes = await fetch(`${baseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(googleUser.email)}&select=id`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
      },
    })

    if (checkRes.ok) {
      const existing = await checkRes.json()
      if (existing && existing.length > 0) {
        await fetch(`${baseUrl}/rest/v1/profiles?id=eq.${existing[0].id}`, {
          method: 'PATCH',
          headers: {
            'apikey': anonKey,
            'Authorization': `Bearer ${anonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            full_name: googleUser.name || googleUser.email?.split('@')[0],
            avatar_url: googleUser.image,
            email: googleUser.email,
          }),
        })
        return { ...googleUser, id: existing[0].id }
      }
    }

    const userId = `google-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const createRes = await fetch(`${baseUrl}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        id: userId,
        email: googleUser.email,
        full_name: googleUser.name || googleUser.email?.split('@')[0],
        avatar_url: googleUser.image,
        role: 'user',
      }),
    })

    if (createRes.ok) {
      const created = await createRes.json()
      return { ...googleUser, id: created?.[0]?.id || userId }
    }

    return { ...googleUser, id: userId }
  } catch (error) {
    console.error('Error upserting Google user:', error)
    return { ...googleUser, id: `google-${Date.now()}` }
  }
}

async function registerEmailUser(email: string, password: string, name?: string): Promise<AuthUser | null> {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!
  const hashedPassword = await hashPassword(password)

  try {
    const checkRes = await fetch(`${baseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=id`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
      },
    })

    if (checkRes.ok) {
      const existing = await checkRes.json()
      if (existing && existing.length > 0) {
        return null
      }
    }

    const userId = `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const createRes = await fetch(`${baseUrl}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        id: userId,
        email,
        full_name: name || email.split('@')[0],
        password_hash: hashedPassword,
        role: 'user',
      }),
    })

    if (createRes.ok) {
      const created = await createRes.json()
      return {
        id: created?.[0]?.id || userId,
        email,
        name: name || email.split('@')[0],
      }
    }

    return null
  } catch (error) {
    console.error('Error registering user:', error)
    return null
  }
}

async function loginEmailUser(email: string, password: string): Promise<AuthUser | null> {
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

  try {
    const res = await fetch(`${baseUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=*`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
      },
    })

    if (!res.ok) return null
    const users = await res.json()
    if (!users || users.length === 0) return null

    const user = users[0]
    if (!user.password_hash) return null

    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) return null

    return {
      id: user.id,
      email: user.email,
      name: user.full_name,
      image: user.avatar_url,
    }
  } catch (error) {
    console.error('Error logging in user:', error)
    return null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'missing-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'missing-client-secret',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        mode: { label: 'Mode', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email as string
        const password = credentials.password as string
        const name = credentials.name as string | undefined
        const mode = credentials.mode as string || 'login'

        if (mode === 'signup') {
          if (password.length < 6) return null
          const user = await registerEmailUser(email, password, name)
          if (!user) return null
          return user
        }

        const user = await loginEmailUser(email, password)
        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile) {
        const googleUser: AuthUser = {
          id: '',
          email: profile.email || user.email || '',
          name: profile.name || user.name,
          image: profile.picture || user.image,
        }
        const dbUser = await upsertUserFromGoogle(googleUser)
        user.id = dbUser.id
      }
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      if (account?.provider === 'google') {
        token.googleAccessToken = account.access_token
        token.googleRefreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string || token.sub as string || ''
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
      }
      return session
    },
  },
})

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
    }
  }
}
// force-fresh-1776499067
// deploy-1776501841
