import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'
import fs from 'fs'
import path from 'path'

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

function buildTree(userDir: string): object[] {
  try {
    const entries = fs.readdirSync(userDir, { withFileTypes: true })
    return entries
      .filter(e => !e.name.startsWith('.'))
      .map(entry => {
        const fullPath = path.join(userDir, entry.name)
        const isDir = entry.isDirectory()
        const node: any = {
          name: entry.name,
          path: fullPath,
          type: isDir ? 'directory' : 'file',
        }
        if (isDir) {
          node.children = buildTree(fullPath)
        }
        return node
      })
      .sort((a: any, b: any) => {
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

  const userDir = path.join('/root/.openclaw/workspace', userId)

  // Reject access to any user other than their own directory
  if (!userDir.startsWith('/root/.openclaw/workspace/')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Ensure the user's directory exists
  if (!fs.existsSync(userDir)) {
    try {
      fs.mkdirSync(userDir, { recursive: true })
    } catch {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  }

  try {
    const tree = buildTree(userDir)
    return NextResponse.json({ tree, userId })
  } catch {
    return NextResponse.json({ error: 'Failed to read workspace' }, { status: 500 })
  }
}
