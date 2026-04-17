import { NextResponse } from 'next/server'

// VPS gateway URL - the OpenClaw gateway on the Contabo VPS
// This should be set to the Cloudflare tunnel URL or the public VPS IP
const VPS_GATEWAY_URL = process.env.VPS_GATEWAY_URL || 'http://localhost:18789'
const TIMEOUT_MS = 8000

export async function GET() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const response = await fetch(VPS_GATEWAY_URL, {
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      return NextResponse.json(
        { error: `VPS gateway returned ${response.status}`, status: response.status },
        { status: 502 }
      )
    }

    const data = await response.json()
    return NextResponse.json({ ...data, source: 'vps_gateway' })
  } catch (err: any) {
    const isAbort = err?.name === 'AbortError'
    console.error('[/api/openclaw-status] Error:', isAbort ? 'TIMEOUT' : err)
    return NextResponse.json(
      { error: isAbort ? 'VPS gateway timeout' : 'VPS gateway unreachable' },
      { status: isAbort ? 504 : 500 }
    )
  }
}
