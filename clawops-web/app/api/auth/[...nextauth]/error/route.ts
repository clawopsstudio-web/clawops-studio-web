import { NextResponse } from 'next/server'
import { handlers } from '@/lib/auth'

// Forward to NextAuth handler
export const { GET, POST } = handlers
