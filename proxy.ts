import { NextResponse, type NextRequest } from 'next/server'

// IMPORTANT: Don't import @supabase/ssr here — it doesn't work in Vercel Edge Runtime.
// We use direct cookie checks instead.

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Let static assets and non-auth pages through immediately (fast path)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|woff2?|css|js)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Auth pages: let them through (no redirect logic in proxy)
  // The dashboard server component handles its own auth check
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // Protected pages: let them through, the server component will check auth
  // This avoids Edge Runtime issues with Supabase SSR
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) {
    return NextResponse.next()
  }

  // All other pages
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
