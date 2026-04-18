import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

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

export async function GET(request: NextRequest) {
  const token = request.cookies.get('insforge_session')?.value

  if (!token) {
    return NextResponse.json(
      { error: 'Missing session token' },
      { status: 401, headers: { 'X-Auth-Status': 'missing' } }
    )
  }

  const payload = decodeJwtPayload(token)
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401, headers: { 'X-Auth-Status': 'invalid' } }
    )
  }

  const exp = payload.exp as number | undefined
  if (exp && Date.now() / 1000 > exp) {
    return NextResponse.json(
      { error: 'Token expired' },
      { status: 401, headers: { 'X-Auth-Status': 'expired' } }
    )
  }

  const userId = payload.sub as string
  const email = payload.email as string

  return NextResponse.json(
    {
      ok: true,
      userId,
      email,
      role: 'authenticated',
    },
    {
      status: 200,
      headers: {
        'X-Auth-Status': 'valid',
        'X-Auth-User-Id': userId || '',
        'X-Auth-User-Email': email || '',
        'X-Auth-User-Role': 'authenticated',
      },
    }
  )
}
