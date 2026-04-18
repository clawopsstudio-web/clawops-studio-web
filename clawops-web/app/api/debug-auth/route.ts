import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    nextauthUrl: process.env.NEXTAUTH_URL,
    nextauthSecret: process.env.NEXTAUTH_SECRET ? 'set' : 'missing',
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 'set' : 'missing',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'set' : 'missing',
    insforgeUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL,
  })
}
