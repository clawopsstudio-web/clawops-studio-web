import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const WORKSPACE = '/root/.openclaw/workspace';

interface FSNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FSNode[];
}

function buildTree(dir: string, baseDir: string): FSNode[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries
      .filter(e => !e.name.startsWith('.'))
      .map(entry => {
        const fullPath = path.join(dir, entry.name);
        const isDir = entry.isDirectory();
        const node: FSNode = {
          name: entry.name,
          path: fullPath,
          type: isDir ? 'directory' : 'file',
        };
        if (isDir) {
          node.children = buildTree(fullPath, baseDir);
        }
        return node;
      })
      .sort((a, b) => {
        if (a.type === 'directory' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'directory') return 1;
        return a.name.localeCompare(b.name);
      });
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const tree = buildTree(WORKSPACE, WORKSPACE);
    return NextResponse.json({ tree });
  } catch {
    return NextResponse.json({ error: 'Failed to read workspace' }, { status: 500 });
  }
}
