import { NextResponse } from 'next/server'

// OpenClaw VPS services - use Contabo public IP
const VPS_IP = '161.97.173.78'
const VPS_MC_PORT = '8082'    // Mission Control
const VPS_N8N_PORT = '5678'    // n8n
const VPS_CHROME_PORT = '5800'   // Chrome VNC
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
