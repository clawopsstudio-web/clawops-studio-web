import { NextRequest, NextResponse } from 'next/server'

// Landing page paths
const LANDING_PATHS = [
  '/',
  '/company',
  '/how-it-works',
  '/integrations',
  '/legal/cookie',
  '/legal/privacy',
  '/legal/terms',
  '/pricing',
  '/quick-start',
  '/use-cases',
  '/guides',
  '/settings',
]

function isLandingPath(pathname: string): boolean {
  if (pathname === '/') return true
  return LANDING_PATHS.some(p => pathname.startsWith(p))
}

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

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('insforge_session')?.value
  if (!token) return false

  const payload = decodeJwtPayload(token)
  if (!payload) return false

  // Check expiry
  const exp = payload.exp as number | undefined
  if (exp && Date.now() / 1000 > exp) return false

  return true
}

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl
  const isAppDomain = hostname.startsWith('app.')

  // ── Landing domain: clawops.studio ──────────────────────────────────
  if (!isAppDomain) {
    if (pathname.startsWith('/dashboard')) {
      const redirectTo = pathname.endsWith('/') ? pathname : `${pathname}/`
      return NextResponse.redirect(
        new URL(`https://app.clawops.studio${redirectTo}`, request.url),
        307
      )
    }
    if (pathname.startsWith('/auth')) {
      return NextResponse.redirect(
        new URL(`https://app.clawops.studio${pathname}`, request.url),
        307
      )
    }
    return NextResponse.next()
  }

  // ── App domain: app.clawops.studio ───────────────────────────────────
  // Landing paths → serve without auth check
  if (isLandingPath(pathname)) {
    return NextResponse.next()
  }

  // ALL API routes → let through (individual routes handle auth)
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Auth pages → let through
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // Dashboard paths → require auth via InsForge session
  if (pathname.startsWith('/dashboard/') || pathname === '/dashboard') {
    if (!isAuthenticated(request)) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // Unknown paths on app domain → redirect to landing
  return NextResponse.redirect(new URL('/', 'https://clawops.studio'), 307)
}

export const config = {
  matcher: ['/:path*'],
}
