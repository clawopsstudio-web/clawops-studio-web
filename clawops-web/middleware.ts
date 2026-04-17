import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/signup',
  '/auth/google/callback',
  '/auth/github/callback',
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/logout',
  '/api/auth/oauth',
  '/_next',
  '/favicon.ico',
]

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4)
  return Buffer.from(padded, 'base64').toString('utf-8')
}

function decodeJwtExpiry(token: string): { valid: boolean; expired: boolean } {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return { valid: false, expired: false }
    const payload = JSON.parse(base64UrlDecode(parts[1]))
    if (payload.exp && typeof payload.exp === 'number') {
      if (Date.now() / 1000 > payload.exp) return { valid: true, expired: true }
    }
    return { valid: true, expired: false }
  } catch {
    return { valid: false, expired: false }
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return NextResponse.next()
  if (pathname.startsWith('/api/')) return NextResponse.next()
  if (pathname.startsWith('/auth/')) return NextResponse.next()

  const sessionToken = request.cookies.get('insforge_session')?.value

  if (!sessionToken) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const { valid, expired } = decodeJwtExpiry(sessionToken)

  if (!valid || expired) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.set('insforge_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  /*
   * Match /dashboard/:path* — this catches /dashboard/userId and all sub-paths.
   * The base /dashboard route will be handled by Next.js with trailingSlash: true
   * (redirects /dashboard → /dashboard/ automatically).
   * The /dashboard/ URL itself is matched by :path* with an empty path segment.
   */
  matcher: ['/dashboard', '/dashboard/:path*'],
}
