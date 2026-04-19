import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/providers'

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }

  const user = session.user as any
  return NextResponse.json({
    ok: true,
    userId: user.id,
    email: user.email,
    role: 'authenticated',
  })
}
