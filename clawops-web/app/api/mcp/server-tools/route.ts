// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MCP_CONFIG_PATH = path.join(process.cwd(), 'data', 'mc-servers.json')

function isBlockedUrl(targetUrl) {
  try {
    const url = new URL(targetUrl)
    const hostname = url.hostname.toLowerCase()
    const blocked = ['localhost', '127.0.0.1', '0.0.0.0', '[::1]', '169.254.169.254', 'metadata.google.internal']
    if (blocked.includes(hostname)) return true
    const prefixes = ['10.', '172.16.', '172.17.', '172.18.', '172.19.', '172.20.', '172.21.', '172.22.', '172.23.', '172.24.', '172.25.', '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.', '192.168.', '100.64.', 'fc00', 'fe80']
    for (const p of prefixes) {
      if (hostname === p || hostname.startsWith(p)) return true
    }
    return false
  } catch {
    return true
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const serverName = searchParams.get('name') || ''

  if (!serverName) {
    return NextResponse.json({ tools: [], error: 'name query param required' }, { status: 400 })
  }

  // Hardcoded tools for known server
  if (serverName === 'n8n-google') {
    return NextResponse.json({ tools: [
      { name: 'gmail_list', description: 'List Gmail messages' },
      { name: 'gmail_send', description: 'Send Gmail email' },
      { name: 'calendar_events', description: 'List calendar events' },
      { name: 'drive_search', description: 'Search Drive files' },
    ]})
  }

  // Load user servers from config
  let servers = {}
  try {
    if (fs.existsSync(MCP_CONFIG_PATH)) {
      servers = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf8'))
    }
  } catch { /* ignore */ }

  const serverData = servers[serverName]
  const baseUrl = serverData && serverData.baseUrl

  if (baseUrl) {
    if (isBlockedUrl(baseUrl)) {
      return NextResponse.json({ tools: [], error: 'Blocked URL' }, { status: 400 })
    }
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
        signal: AbortSignal.timeout(5000),
      })
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({ tools: (data.result && data.result.tools) || [] })
      }
    } catch { /* timeout or network error */ }
  }

  return NextResponse.json({ tools: [], warning: `No tools available for ${serverName}` })
}
