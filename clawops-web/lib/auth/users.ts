import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

export interface StoredUser {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: string
  provider: 'email' | 'google'
  googleId?: string
}

function ensureUsersFile() {
  const dir = path.dirname(USERS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]))
}

export function getUsers(): StoredUser[] {
  ensureUsersFile()
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

export function getUserByEmail(email: string): StoredUser | null {
  const users = getUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export function getUserById(id: string): StoredUser | null {
  const users = getUsers()
  return users.find(u => u.id === id) || null
}

export function createUser(data: {
  email: string
  password?: string
  name: string
  provider?: 'email' | 'google'
  googleId?: string
}): StoredUser | { error: string } {
  const users = getUsers()

  if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { error: 'An account with this email already exists' }
  }

  const passwordHash = data.provider === 'email' && data.password ? crypto.createHash('sha256').update(data.password).digest('hex') : ''
    ? crypto.createHash('sha256').update(data.password).digest('hex')
    : ''

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: data.email.toLowerCase(),
    name: data.name,
    passwordHash,
    createdAt: new Date().toISOString(),
    provider: data.provider || 'email',
    googleId: data.googleId,
  }

  users.push(user)
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  return user
}

export function verifyPassword(user: StoredUser, password: string): boolean {
  if (!user.passwordHash) return false
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash === user.passwordHash
}

export function findOrCreateGoogleUser(profile: {
  email: string
  name: string
  googleId: string
}): StoredUser {
  const existing = getUsers().find(
    u => u.googleId === profile.googleId || u.email.toLowerCase() === profile.email.toLowerCase()
  )
  if (existing) return existing

  return createUser({
    email: profile.email,
    name: profile.name,
    provider: 'google',
    googleId: profile.googleId,
  }) as StoredUser
}
