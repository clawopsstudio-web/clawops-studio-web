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

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl
  const isAppDomain = hostname.startsWith('app.')

  // ── Landing domain: clawops.studio ──────────────────────────────────
  // Serve ONLY the landing page. Redirect everything else to app domain.
  if (!isAppDomain) {
    // /dashboard → app subdomain dashboard
    if (pathname.startsWith('/dashboard')) {
      const redirectTo = pathname.endsWith('/') ? pathname : `${pathname}/`
      return NextResponse.redirect(
        new URL(`https://app.clawops.studio${redirectTo}`, request.url),
        307
      )
    }
    // All other routes → landing page (/)
    return NextResponse.next()
  }

  // ── App domain: app.clawops.studio ───────────────────────────────────
  // Serve auth pages and dashboard. Redirect everything else to landing.

  // Public auth paths — let them through
  if (
    pathname === '/' ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/dashboard/') ||
    pathname === '/dashboard'
  ) {
    return NextResponse.next()
  }

  // Everything else on app domain → landing page
  return NextResponse.redirect(new URL('/', 'https://clawops.studio'), 307)
}

export const config = {
  matcher: [
    // Match ALL routes so we can redirect at the domain level
    '/:path*',
  ],
}
