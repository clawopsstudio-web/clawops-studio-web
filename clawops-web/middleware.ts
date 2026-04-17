import { NextRequest, NextResponse } from 'next/server'

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

// Landing page paths (no auth required, no SmoothScroll)
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

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl
  const isAppDomain = hostname.startsWith('app.')

  // ── Landing domain: clawops.studio ──────────────────────────────────
  if (!isAppDomain) {
    // Redirect /dashboard → app subdomain
    if (pathname.startsWith('/dashboard')) {
      const redirectTo = pathname.endsWith('/') ? pathname : `${pathname}/`
      return NextResponse.redirect(
        new URL(`https://app.clawops.studio${redirectTo}`, request.url),
        307
      )
    }
    // Redirect /auth → app subdomain
    if (pathname.startsWith('/auth')) {
      return NextResponse.redirect(
        new URL(`https://app.clawops.studio${pathname}`, request.url),
        307
      )
    }
    // Serve landing page
    return NextResponse.next()
  }

  // ── App domain: app.clawops.studio ───────────────────────────────────
  // Landing paths → serve without auth check (smooth scroll layout)
  if (isLandingPath(pathname)) {
    return NextResponse.next()
  }

  // Auth paths → let through (no auth required)
  if (
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/api/auth/') ||
    pathname === '/api/health'
  ) {
    return NextResponse.next()
  }

  // API routes → let through (individual routes handle auth)
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Dashboard paths → require auth
  if (pathname.startsWith('/dashboard/') || pathname === '/dashboard') {
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
        secure: true,
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      })
      return response
    }

    return NextResponse.next()
  }

  // Unknown paths on app domain → redirect to landing
  return NextResponse.redirect(new URL('/', 'https://clawops.studio'), 307)
}

export const config = {
  matcher: [
    '/:path*',
  ],
}
