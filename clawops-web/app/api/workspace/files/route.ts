import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'
import fs from 'fs'
import path from 'path'

const WORKSPACE = '/root/.openclaw/workspace'

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

interface FSNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FSNode[]
}

function buildTree(dir: string): FSNode[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    return entries
      .filter(e => !e.name.startsWith('.'))
      .map(entry => {
        const fullPath = path.join(dir, entry.name)
        const isDir = entry.isDirectory()
        const node: FSNode = {
          name: entry.name,
          path: fullPath,
          type: isDir ? 'directory' : 'file',
        }
        if (isDir) {
          node.children = buildTree(fullPath)
        }
        return node
      })
      .sort((a, b) => {
        if (a.type === 'directory' && b.type === 'file') return -1
        if (a.type === 'file' && b.type === 'directory') return 1
        return a.name.localeCompare(b.name)
      })
  } catch {
    return []
  }
}

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const tree = buildTree(WORKSPACE)
    return NextResponse.json({ tree })
  } catch {
    return NextResponse.json({ error: 'Failed to read workspace' }, { status: 500 })
  }
}
