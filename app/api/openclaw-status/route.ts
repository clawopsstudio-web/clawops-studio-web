import { NextResponse } from 'next/server'

const VPS_API = 'https://vmi3094584-1.tailec7a72.ts.net/api/openclaw-status'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint') || ''

    const url = endpoint
      ? `${VPS_API}/${endpoint}`
      : VPS_API

    const response = await fetch(url, {
      next: { revalidate: 10 }, // cache for 10 seconds
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from VPS', status: response.status },
        { status: 502 }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('[/api/openclaw-status] Error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
