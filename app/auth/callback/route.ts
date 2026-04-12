import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/auth/login?error=no_code', request.url))
  }

  // Must await in Next.js 15+
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Pass cookies through @supabase/ssr to next/headers cookie store
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options ?? {})
          })
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (!error) {
    // Handle Vercel's reverse proxy — origin may be internal
    const forwardedHost = request.headers.get('x-forwarded-host')
    const targetOrigin = forwardedHost ? `https://${forwardedHost}` : origin
    return NextResponse.redirect(`${targetOrigin}${next}`)
  }

  console.error('[AUTH] Callback error:', error?.message)
  return NextResponse.redirect(new URL('/auth/login?error=callback_error', request.url))
}
