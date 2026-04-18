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

export async function GET(request: NextRequest) {
  const token = request.cookies.get('insforge_session')?.value

  if (!token) {
    return NextResponse.json({ user: null })
  }

  const payload = decodeJwtPayload(token)
  if (!payload) {
    return NextResponse.json({ user: null })
  }

  // Check expiry
  const exp = payload.exp as number | undefined
  if (exp && Date.now() / 1000 > exp) {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({
    user: {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string | undefined,
    },
  })
}
