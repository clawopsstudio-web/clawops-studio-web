import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

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
  // This is critical - API routes must pass through
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Auth pages → let through  
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // Dashboard paths → require auth
  if (pathname.startsWith('/dashboard/') || pathname === '/dashboard') {
    const session = await auth()

    if (!session?.user) {
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
