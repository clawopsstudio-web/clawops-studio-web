import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MCP_CONFIG_PATH = path.join(process.cwd(), 'data', 'mc-servers.json')

export async function GET() {
  try {
    let servers: Record<string, unknown> = {}
    if (fs.existsSync(MCP_CONFIG_PATH)) {
      servers = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf8'))
    }
    return NextResponse.json({ servers })
  } catch {
    return NextResponse.json({ servers: {} })
  }
}
