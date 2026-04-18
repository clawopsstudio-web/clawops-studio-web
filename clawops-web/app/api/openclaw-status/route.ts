import { NextResponse } from 'next/server'

// Internal VPS services — only accessible from Vercel network, not exposed publicly
const VPS_IP = process.env.VPS_INTERNAL_IP || '127.0.0.1'
const VPS_MC_PORT = process.env.VPS_MC_PORT || '8082'
const VPS_N8N_PORT = process.env.VPS_N8N_PORT || '5678'
const TIMEOUT_MS = 5000

export async function GET() {
  const result: any = { status: 'mixed', services: {} as Record<string, any> }

  // Check Mission Control (most critical)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
    const mc = await fetch(`http://${VPS_IP}:${VPS_MC_PORT}/health`, { signal: controller.signal })
    clearTimeout(timeout)
    if (mc.ok) {
      const data = await mc.json()
      result.services.missionControl = { status: 'up', data }
    } else {
      result.services.missionControl = { status: 'down', code: mc.status }
    }
  } catch (err: any) {
    result.services.missionControl = { status: 'unreachable', error: err?.name === 'AbortError' ? 'timeout' : 'network_error' }
  }

  // Check n8n
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
    const n8n = await fetch(`http://${VPS_IP}:${VPS_N8N_PORT}/healthz`, { signal: controller.signal })
    clearTimeout(timeout)
    result.services.n8n = n8n.ok ? { status: 'up' } : { status: 'down', code: n8n.status }
  } catch (err: any) {
    result.services.n8n = { status: 'unreachable', error: 'network_error' }
  }

  const upCount = Object.values(result.services).filter((s: any) => s.status === 'up').length
  result.overall = upCount > 0 ? 'partial' : 'offline'
  if (upCount === Object.keys(result.services).length) result.overall = 'healthy'

  return NextResponse.json(result)
}
