import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Create the response object FIRST — we pass it to createServerClient
  // so that setAll mutates THIS SAME reference (Bug #2 fix)
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Mutate the SAME supabaseResponse object that we'll return
          // This is critical — without this, cookies are lost
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options ?? {})
          })
        },
      },
    }
  )

  // getUser() validates JWT server-side — never check raw cookie names
  // Never use getSession() in middleware — doesn't revalidate the token
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/settings')

  const isAuthRoute =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/signup')

  // Redirect unauthenticated users away from protected routes
  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages (no login loops)
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Return the SAME supabaseResponse that had cookies set on it
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
