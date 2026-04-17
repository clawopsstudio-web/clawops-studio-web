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

  // ── Landing domain: clawops.studio ──────────────────────────────────
  if (!hostname.startsWith('app.')) {
    // Redirect /dashboard → app.clawops.studio/dashboard/
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      return NextResponse.redirect(
        new URL('/dashboard/', 'https://app.clawops.studio'),
        307
      )
    }
    // Let everything else pass through (landing page)
    return NextResponse.next()
  }

  // ── Dashboard domain: app.clawops.studio ───────────────────────────────
  // Public auth paths
  if (
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/signup') ||
    pathname.startsWith('/auth/google/callback') ||
    pathname.startsWith('/auth/github/callback') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next()
  }

  // API routes have their own auth
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Dashboard routes: require InsForge session
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

export const config = {
  matcher: [
    // Dashboard subdomain (app.clawops.studio)
    '/dashboard',
    '/dashboard/:path*',
    // Landing domain redirects
    '/dashboard/',
  ],
}
