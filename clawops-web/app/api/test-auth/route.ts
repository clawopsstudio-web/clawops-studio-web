import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Auth module loads'
  })
}
