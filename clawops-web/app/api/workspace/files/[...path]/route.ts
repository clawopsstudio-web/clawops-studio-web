import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'
import fs from 'fs'
import path from 'path'

const WORKSPACE = '/root/.openclaw/workspace'

function safeJoin(base: string, ...paths: string[]): string {
  const full = path.join(base, ...paths)
  if (!full.startsWith(base)) {
    throw new Error('Access denied: path outside workspace')
  }
  return full
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const targetPath = safeJoin(WORKSPACE, ...segments)

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

    const content = fs.readFileSync(targetPath, 'utf-8')
    return NextResponse.json({ type: 'file', content })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const targetPath = safeJoin(WORKSPACE, ...segments)

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const stat = fs.statSync(targetPath)
    if (stat.isDirectory()) {
      return NextResponse.json({ error: 'Cannot write to directory' }, { status: 400 })
    }

    const body = await request.json()
    const content = body.content ?? ''
    fs.writeFileSync(targetPath, content, 'utf-8')
    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const targetPath = safeJoin(WORKSPACE, ...segments)

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
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const userId = getUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { path: segments } = await params
    const body = await request.json()
    const isDirectory = body.isDirectory ?? false
    const targetPath = safeJoin(WORKSPACE, ...segments)

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
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
