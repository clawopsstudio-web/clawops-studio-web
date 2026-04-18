// Shared auth helper for Next.js API routes
// Decodes insforge_session JWT cookie locally — no external API call needed

import { NextRequest, NextResponse } from 'next/server'

function base64UrlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4)
    return Buffer.from(padded, 'base64').toString('utf-8')
  } catch {
    return ''
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    return null
  }
}

function isJwtExpired(payload: Record<string, unknown>): boolean {
  const exp = payload.exp as number | undefined
  if (!exp) return false
  return Date.now() / 1000 > exp
}

/**
 * Get userId from the insforge_session JWT cookie.
 * Returns empty string if not authenticated.
 */
export function getUserId(request: NextRequest): string {
  const token = request.cookies.get('insforge_session')?.value
  if (!token) return ''

  const payload = decodeJwtPayload(token)
  if (!payload || isJwtExpired(payload)) return ''

  return payload.sub as string
}

/**
 * Require authentication — returns 401 response if not authenticated.
 * Use this at the top of API route handlers.
 */
export function requireAuth(request: NextRequest): { userId: string } | NextResponse {
  const userId = getUserId(request)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return { userId }
}
