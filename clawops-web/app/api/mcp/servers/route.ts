import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'
import fs from 'fs'
import path from 'path'

const MCP_CONFIG_PATH = path.join(process.cwd(), 'data', 'mc-servers.json')

// Block internal/private/Docker hostnames and IPs
function isBlockedUrl(targetUrl: string): boolean {
  try {
    const url = new URL(targetUrl)
    const hostname = url.hostname.toLowerCase()
    const blocked = [
      'localhost', '127.0.0.1', '0.0.0.0', '[::1]',
      '169.254.169.254', 'metadata.google.internal',
    ]
    if (blocked.includes(hostname)) return true
    // Block private ranges (simple string prefix check)
    const privatePrefixes = ['10.', '172.16.', '172.17.', '172.18.', '172.19.',
      '172.20.', '172.21.', '172.22.', '172.23.', '172.24.', '172.25.',
      '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.',
      '192.168.', '100.64.', 'fc00', 'fe80']
    for (const prefix of privatePrefixes) {
      if (hostname === prefix || hostname.startsWith(prefix)) return true
    }
    return false
  } catch {
    return true
  }
}

// GET: List MCP servers (public)
export async function GET() {
  try {
    let servers: Record<string, unknown> = {}
    if (fs.existsSync(MCP_CONFIG_PATH)) {
      const data = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf8'))
      servers = (data as any).servers || {}
    }

    const knownServers: Record<string, any> = {
      'n8n-google': {
        name: 'n8n-google',
        base_url: process.env.NEXT_PUBLIC_MCP_N8N_URL || '',
        tools: 44,
        status: 'healthy',
        description: 'Google Workspace via n8n MCP — Gmail, Drive, Docs, Sheets, Calendar, Tasks',
        platforms: ['Google', 'Gmail', 'Drive', 'Docs', 'n8n'],
      },
    }

    const allServers = { ...knownServers, ...servers }

    return NextResponse.json({
      servers: Object.entries(allServers).map(([name, data]) => ({
        name,
        base_url: (data as any).base_url || (data as any).url || '',
        tools: (data as any).tools || 0,
        status: (data as any).status || 'unknown',
        description: (data as any).description || '',
        platforms: (data as any).platforms || [],
      })),
    })
  } catch (err) {
    return NextResponse.json({ servers: [], error: 'Failed to load servers' }, { status: 500 })
  }
}

// POST: Add a new MCP server (auth required + SSRF protection)
export async function POST(request: NextRequest) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { name, base_url } = body

    if (!name || !base_url) {
      return NextResponse.json({ error: 'name and base_url are required' }, { status: 400 })
    }

    // SSRF check
    if (isBlockedUrl(base_url)) {
      return NextResponse.json({ error: 'Invalid or blocked URL' }, { status: 400 })
    }

    // Sanitize name: lowercase alphanumeric + dash/underscore only, max 64 chars
    const safeName = name.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 64)

    if (!safeName) {
      return NextResponse.json({ error: 'Invalid server name' }, { status: 400 })
    }

    // Load existing config
    let config: { servers: Record<string, unknown> } = { servers: {} }
    if (fs.existsSync(MCP_CONFIG_PATH)) {
      try {
        const raw = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf8'))
        config.servers = (raw as any).servers || {}
      } catch {
        config.servers = {}
      }
    }

    // Deduplicate name
    const finalName = config.servers[safeName] ? `${safeName}-${Date.now()}` : safeName

    config.servers[finalName] = {
      baseUrl: base_url,
      added_at: new Date().toISOString(),
      added_by: userId,
      status: 'unknown',
      tools: 0,
    }

    const dir = path.dirname(MCP_CONFIG_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(MCP_CONFIG_PATH, JSON.stringify(config, null, 2))

    return NextResponse.json({
      success: true,
      server: { name: finalName, base_url },
      note: 'Server added. Update mcporter.json on your VPS for it to be active.',
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add server' }, { status: 500 })
  }
}
