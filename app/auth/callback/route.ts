import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const plan = searchParams.get('plan') || 'pro'
  const next = searchParams.get('next') || '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=no_code`)
  }

  // Create redirect URL
  const redirectUrl = new URL(`${origin}${next}`, origin)
  if (plan) redirectUrl.searchParams.set('plan', plan)

  // Create the response object we'll return
  let response = NextResponse.redirect(redirectUrl)

  // Create SSR client with cookies linked to our response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, {
              httpOnly: options.httpOnly ?? true,
              secure: options.secure ?? true,
              sameSite: (options.sameSite as 'lax' | 'strict' | 'none') ?? 'lax',
              path: options.path ?? '/',
              maxAge: options.maxAge,
              domain: options.domain,
            })
          })
        },
      },
    }
  )

  // Wait for SIGNED_IN event before returning - this ensures cookies are set
  await new Promise<void>((resolve) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        subscription.unsubscribe()
        resolve()
      }
    })

    // Also timeout after 5 seconds to prevent infinite waiting
    setTimeout(resolve, 5000)
  })

  // Now exchange the code - cookies will be set by onAuthStateChange handler
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    console.error('Auth callback error:', error?.message)
    return NextResponse.redirect(`${origin}/auth/login?error=callback_error`)
  }

  return response
}
