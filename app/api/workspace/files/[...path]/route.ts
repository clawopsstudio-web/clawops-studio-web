import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const WORKSPACE = '/root/.openclaw/workspace';

function safeJoin(base: string, ...paths: string[]): string {
  const full = path.join(base, ...paths);
  if (!full.startsWith(WORKSPACE)) {
    throw new Error('Access denied: path outside workspace');
  }
  return full;
}

// GET /api/workspace/files/[...path] — read file or list directory
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    const targetPath = safeJoin(WORKSPACE, ...segments);

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(targetPath, { withFileTypes: true });
      return NextResponse.json({
        type: 'directory',
        entries: entries.map(e => ({ name: e.name, type: e.isDirectory() ? 'directory' : 'file' })),
      });
    }

    const content = fs.readFileSync(targetPath, 'utf-8');
    return NextResponse.json({ type: 'file', content });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// PUT /api/workspace/files/[...path] — update file content
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    const targetPath = safeJoin(WORKSPACE, ...segments);

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      return NextResponse.json({ error: 'Cannot write to directory' }, { status: 400 });
    }

    const body = await req.json();
    const content = body.content ?? '';
    fs.writeFileSync(targetPath, content, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// DELETE /api/workspace/files/[...path] — delete file or folder
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    const targetPath = safeJoin(WORKSPACE, ...segments);

    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      fs.rmSync(targetPath, { recursive: true });
    } else {
      fs.unlinkSync(targetPath);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// POST /api/workspace/files/[...path] — create file or folder
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    // The segments already include the name, so we use the parent as target
    const body = await req.json();
    const isDirectory = body.isDirectory ?? false;

    const targetPath = safeJoin(WORKSPACE, ...segments);

    if (fs.existsSync(targetPath)) {
      return NextResponse.json({ error: 'Already exists' }, { status: 409 });
    }

    if (isDirectory) {
      fs.mkdirSync(targetPath, { recursive: true });
    } else {
      // Ensure parent dir exists
      const parent = path.dirname(targetPath);
      if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true });
      }
      fs.writeFileSync(targetPath, '', 'utf-8');
    }

    return NextResponse.json({ success: true, path: targetPath });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
