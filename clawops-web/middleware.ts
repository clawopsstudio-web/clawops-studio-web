export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!auth/login|auth/signup|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
