import { createClient } from '@insforge/sdk'

const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''
})

export { insforge }

export type InsForgeUser = {
  id: string
  email: string
  role: string
  profile?: {
    name?: string
    avatar_url?: string
    [key: string]: unknown
  }
}

export type InsForgeSession = {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  user: InsForgeUser
}
