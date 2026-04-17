// Admin client for InsForge - uses anon key for public data operations
// For authenticated operations, use lib/insforge/server.ts instead
import { createClient } from '@insforge/sdk'

export const insforgeAdmin = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://4tn9u5bb.us-east.insforge.app',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
})
