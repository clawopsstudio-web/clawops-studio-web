import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard',
    '/((?!auth/login|auth/signup|auth/google/callback|auth/github/callback|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
