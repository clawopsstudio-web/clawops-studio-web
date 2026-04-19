/**
 * InsForge Self-Hosted Auth API client
 *
 * Uses InsForge's native auth endpoints:
 *   POST /api/auth/users     → signup (create user)
 *   POST /api/auth/sessions  → login  (verify credentials + get session)
 *   GET  /api/auth/users/me  → get current user (from access token)
 *
 * User data lives in InsForge's PostgreSQL (auth schema) — no VPS data stored elsewhere.
 */

const INSFORGE_BASE_URL =
  process.env.NEXT_PUBLIC_INSFORGE_API_URL || 'http://localhost:7130'

export interface InsForgeUser {
  id: string
  email: string
  name: string
  emailVerified: boolean
}

export interface InsForgeAuthResult {
  user: InsForgeUser
  accessToken: string
}

/**
 * Create a new user account via InsForge auth API.
 */
export async function insforgeSignup({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}): Promise<{ user?: InsForgeUser; error?: string }> {
  try {
    const res = await fetch(`${INSFORGE_BASE_URL}/api/auth/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || data.error || 'Signup failed' }
    }

    return { user: { id: data.user.id, email, name, emailVerified: data.user.emailVerified } }
  } catch (err: any) {
    return { error: err.message || 'Signup failed — is InsForge running?' }
  }
}

/**
 * Verify credentials and get session via InsForge auth API.
 */
export async function insforgeLogin({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<{ user?: InsForgeUser; error?: string }> {
  try {
    const res = await fetch(`${INSFORGE_BASE_URL}/api/auth/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      return { error: data.message || 'Invalid email or password' }
    }

    const user: InsForgeUser = {
      id: data.user?.id || (data.accessToken ? parseJwt(data.accessToken).sub : ''),
      email,
      name: data.user?.profile?.name || email.split('@')[0],
      emailVerified: data.user?.emailVerified ?? false,
    }

    return { user }
  } catch (err: any) {
    return { error: err.message || 'Login failed — is InsForge running?' }
  }
}

/**
 * Get current user from InsForge access token.
 */
export async function insforgeGetUser(accessToken: string): Promise<InsForgeUser | null> {
  try {
    const res = await fetch(`${INSFORGE_BASE_URL}/api/auth/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!res.ok) return null
    const data = await res.json()
    return { id: data.id, email: data.email, name: data.profile?.name || data.email, emailVerified: data.emailVerified }
  } catch {
    return null
  }
}

function parseJwt(token: string): { sub: string } {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(Buffer.from(base64, 'base64').toString())
  } catch {
    return { sub: '' }
  }
}
