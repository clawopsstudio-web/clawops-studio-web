import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!auth/login|auth/signup|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
