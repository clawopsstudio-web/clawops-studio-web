import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const WORKSPACE_BASE = '/root/.openclaw/workspace'

// Sensitive directories that must NEVER be accessible to any user
const BLOCKED_PATTERNS = [
  'credentials',
  'memory',
  '.env',
  '.git',
  'node_modules',
  '.next',
  '.vercel',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  '.secrets',
  '.claude',
  '.openclaw/workspace-state.json',
  '.aws',
  '.config',
]

const BLOCKED_PREFIXES = [
  '/root/.openclaw/agents',
  '/root/.openclaw/openclaw',
  '/root/.openclaw/config',
]

function base64UrlDecode(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4)
    return Buffer.from(padded, 'base64').toString('utf-8')
  } catch {
    return ''
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(base64UrlDecode(parts[1]))
  } catch {
    return null
  }
}

function getUserIdFromRequest(request: NextRequest): string {
  const token = request.cookies.get('insforge_session')?.value
  if (!token) return ''
  const payload = decodeJwtPayload(token)
  if (!payload) return ''
  const exp = payload.exp as number | undefined
  if (exp && Date.now() / 1000 > exp) return ''
  return payload.sub as string
}

function isPathAllowed(targetPath: string): boolean {
  const normalized = targetPath.replace(/\\/g, '/').toLowerCase()

  // Check blocked patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (normalized.includes(`/${pattern}/`) || normalized.endsWith(`/${pattern}`)) {
      return false
    }
  }

  // Check blocked prefixes (global system directories)
  for (const prefix of BLOCKED_PREFIXES) {
    if (normalized.startsWith(prefix.toLowerCase())) {
      return false
    }
  }

  return true
}

function resolveUserPath(userId: string, segments: string[]): string | null {
  // User files go to /root/.openclaw/workspace/{userId}/...
  const userDir = path.join(WORKSPACE_BASE, userId)
  const resolved = path.join(userDir, ...segments)
  const normalized = resolved.replace(/\\/g, '/')

  // Ensure the resolved path is within the user's workspace directory
  if (!normalized.startsWith(userDir.replace(/\\/g, '/'))) {
    return null
  }

  return resolved
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserIdFromRequest(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const targetPath = resolveUserPath(userId, segments)

    if (!targetPath || !isPathAllowed(targetPath)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const stat = fs.statSync(targetPath)
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(targetPath, { withFileTypes: true })
      return NextResponse.json({
        type: 'directory',
        entries: entries.map(e => ({ name: e.name, type: e.isDirectory() ? 'directory' : 'file' })),
      })
    }

    // Limit file reads to 500KB to prevent memory issues
    const statSize = stat.size
    if (statSize > 500 * 1024) {
      return NextResponse.json({ error: 'File too large (max 500KB)' }, { status: 413 })
    }

    const content = fs.readFileSync(targetPath, 'utf-8')
    return NextResponse.json({ type: 'file', content })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserIdFromRequest(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const targetPath = resolveUserPath(userId, segments)

    if (!targetPath || !isPathAllowed(targetPath)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const stat = fs.statSync(targetPath)
    if (stat.isDirectory()) {
      return NextResponse.json({ error: 'Cannot write to directory' }, { status: 400 })
    }

    // Limit file writes to 500KB
    const body = await request.json()
    const content = (body.content ?? '').slice(0, 500 * 1024)
    fs.writeFileSync(targetPath, content, 'utf-8')
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserIdFromRequest(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const targetPath = resolveUserPath(userId, segments)

    if (!targetPath || !isPathAllowed(targetPath)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const stat = fs.statSync(targetPath)
    if (stat.isDirectory()) {
      fs.rmSync(targetPath, { recursive: true })
    } else {
      fs.unlinkSync(targetPath)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserIdFromRequest(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const body = await request.json()
    const isDirectory = body.isDirectory ?? false
    const targetPath = resolveUserPath(userId, segments)

    if (!targetPath || !isPathAllowed(targetPath)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Already exists' }, { status: 409 })
    }

    if (isDirectory) {
      fs.mkdirSync(targetPath, { recursive: true })
    } else {
      const parent = path.dirname(targetPath)
      if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true })
      }
      fs.writeFileSync(targetPath, '', 'utf-8')
    }

    return NextResponse.json({ success: true, path: targetPath })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
