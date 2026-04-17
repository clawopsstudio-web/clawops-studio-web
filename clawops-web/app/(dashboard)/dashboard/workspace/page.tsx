'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Folder, File, FileText, ChevronRight, ChevronDown,
  Plus, Trash2, Edit3, Save, X, FolderPlus, RefreshCw,
  AlertCircle, Loader, Home,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FSNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FSNode[];
}

interface FileContent {
  path: string;
  content: string;
  loading?: boolean;
  saving?: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getFileIcon(name: string, size = 14) {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['ts', 'tsx', 'js', 'jsx', 'mjs'].includes(ext || '')) return <span style={{ fontSize: size - 2, fontFamily: 'monospace', color: '#3178C6' }}>.ts</span>;
  if (['css', 'scss'].includes(ext || '')) return <span style={{ fontSize: size - 2, fontFamily: 'monospace', color: '#563ACC' }}>.css</span>;
  if (['json'].includes(ext || '')) return <span style={{ fontSize: size - 2, fontFamily: 'monospace', color: '#F5A623' }}>.json</span>;
  if (['md', 'txt'].includes(ext || '')) return <FileText size={size} style={{ color: 'var(--text-tertiary)' }} />;
  if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext || '')) return <span style={{ fontSize: size - 2, fontFamily: 'monospace', color: '#FF6B6B' }}>.img</span>;
  return <File size={size} style={{ color: 'var(--text-tertiary)' }} />;
}

// ---------------------------------------------------------------------------
// File tree item
// ---------------------------------------------------------------------------

function TreeItem({
  node, depth, selected, onSelect, onDelete,
}: {
  node: FSNode; depth: number; selected: boolean;
  onSelect: (n: FSNode) => void; onDelete: (n: FSNode) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDir = node.type === 'directory';

  return (
    <div>
      <div
        onClick={() => { if (isDir) setOpen(o => !o); onSelect(node); }}
        style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
          paddingLeft: 8 + depth * 16,
          cursor: 'pointer', borderRadius: 5,
          background: selected ? 'var(--accent-fill)' : 'transparent',
          color: selected ? 'var(--accent)' : 'var(--text-secondary)',
          fontSize: 12, fontFamily: 'var(--font-mono)',
          transition: 'background 100ms',
          userSelect: 'none',
        }}
        className="hover-bg"
      >
        {isDir && (
          <span style={{ color: 'var(--text-quaternary)', flexShrink: 0 }}>
            {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
          </span>
        )}
        {isDir ? <Folder size={13} style={{ color: '#F5C518' }} /> : getFileIcon(node.name, 13)}
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.name}</span>
        <button
          onClick={e => { e.stopPropagation(); onDelete(node); }}
          className="hover-bg"
          style={{ marginLeft: 'auto', padding: 2, borderRadius: 3, border: 'none', background: 'none', color: 'var(--text-quaternary)', cursor: 'pointer', flexShrink: 0, opacity: 0.6 }}
          title="Delete"
        >
          <Trash2 size={10} />
        </button>
      </div>
      {isDir && open && node.children && node.children.map(child => (
        <TreeItem key={child.path} node={child} depth={depth + 1} selected={false} onSelect={onSelect} onDelete={onDelete} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// New file/folder modal
// ---------------------------------------------------------------------------

function NewItemModal({
  onClose, onCreate, defaultPath,
}: {
  onClose: () => void; onCreate: (name: string, isDir: boolean) => void;
  defaultPath: string;
}) {
  const [name, setName] = useState('');
  const [isDir, setIsDir] = useState(false);
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div className="card" style={{ width: 400, padding: 24 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Create New</span>
          <button className="hover-bg" onClick={onClose} style={{ padding: 4, borderRadius: 4, border: 'none', background: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>×</button>
        </div>
        <div className="tabs" style={{ marginBottom: 16 }}>
          <button className={`tab-item ${!isDir ? 'active' : ''}`} onClick={() => setIsDir(false)}>
            <File size={12} /> File
          </button>
          <button className={`tab-item ${isDir ? 'active' : ''}`} onClick={() => setIsDir(true)}>
            <Folder size={12} /> Folder
          </button>
        </div>
        <input
          className="input"
          placeholder={isDir ? 'folder-name' : 'filename.txt'}
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && name && onCreate(name, isDir)}
          autoFocus
          style={{ marginBottom: 16 }}
        />
        <div style={{ fontSize: 11, color: 'var(--text-quaternary)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          {defaultPath}{name || '...'}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost btn-scale" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Cancel</button>
          <button
            className="btn-primary btn-scale"
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => name && onCreate(name, isDir)}
            disabled={!name}
          >
            <Plus size={13} /> Create
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delete confirm modal
// ---------------------------------------------------------------------------

function DeleteModal({ node, onClose, onConfirm }: {
  node: FSNode | null; onClose: () => void; onConfirm: () => void;
}) {
  if (!node) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div className="card" style={{ width: 380, padding: 24 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <AlertCircle size={20} style={{ color: 'var(--system-red)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Delete {node.type}?</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{node.path}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost btn-scale" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Cancel</button>
          <button className="btn-danger btn-scale" style={{ flex: 1, justifyContent: 'center' }} onClick={onConfirm}>
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const WORKSPACE_PATH = '/root/.openclaw/workspace';

export default function WorkspacePage() {
  const [tree, setTree] = useState<FSNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FSNode | null>(null);
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPath, setNewPath] = useState(WORKSPACE_PATH + '/');
  const [deleteTarget, setDeleteTarget] = useState<FSNode | null>(null);

  // Load tree
  const loadTree = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/workspace/files');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setTree(data.tree || []);
      setError(null);
    } catch {
      setError('Could not load workspace files. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTree(); }, [loadTree]);

  // Load file content
  const loadFile = useCallback(async (node: FSNode) => {
    if (node.type === 'directory') return;
    setFileContent({ path: node.path, content: '', loading: true });
    try {
      const encoded = node.path.replace(/^\/root\/.openclaw\/workspace\//, '');
      const res = await fetch(`/api/workspace/files/${encoded}`);
      if (!res.ok) throw new Error('Failed to load file');
      const data = await res.json();
      setFileContent({ path: node.path, content: data.content || '' });
      setEditContent(data.content || '');
      setIsDirty(false);
    } catch {
      setFileContent({ path: node.path, content: '', error: 'Failed to load file' });
    }
  }, []);

  const handleSelect = (node: FSNode) => {
    if (isDirty && selectedFile) {
      if (!confirm('You have unsaved changes. Discard?')) return;
    }
    setSelectedFile(node);
    if (node.type === 'file') loadFile(node);
  };

  const handleSave = async () => {
    if (!fileContent || isDirty === false) return;
    setFileContent(f => f ? { ...f, saving: true } : null);
    try {
      const encoded = fileContent.path.replace(/^\/root\/.openclaw\/workspace\//, '');
      const res = await fetch(`/api/workspace/files/${encoded}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }),
      });
      if (!res.ok) throw new Error('Save failed');
      setFileContent(f => f ? { ...f, content: editContent, saving: false } : null);
      setIsDirty(false);
    } catch {
      setFileContent(f => f ? { ...f, saving: false, error: 'Save failed' } : null);
    }
  };

  const handleDelete = async (node: FSNode) => {
    setDeleteTarget(node);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const encoded = deleteTarget.path.replace(/^\/root\/.openclaw\/workspace\//, '');
      const res = await fetch(`/api/workspace/files/${encoded}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      if (selectedFile?.path === deleteTarget.path) { setSelectedFile(null); setFileContent(null); }
      setDeleteTarget(null);
      loadTree();
    } catch {
      setDeleteTarget(null);
    }
  };

  const handleCreate = async (name: string, isDir: boolean) => {
    const path = (newPath.endsWith('/') ? newPath : newPath + '/') + name;
    try {
      const res = await fetch(`/api/workspace/files/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDirectory: isDir }),
      });
      if (!res.ok) throw new Error('Create failed');
      setShowNewModal(false);
      loadTree();
    } catch (err) {
      console.error(err);
    }
  };

  const currentDir = selectedFile?.type === 'directory'
    ? selectedFile.path
    : selectedFile?.path.includes('/')
      ? selectedFile.path.substring(0, selectedFile.path.lastIndexOf('/'))
      : WORKSPACE_PATH;

  const fileName = selectedFile?.type === 'file'
    ? selectedFile.name
    : null;

  return (
    <div className="page-container" style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--separator)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Workspace Files</h1>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Browse, edit, and manage files in <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{WORKSPACE_PATH}</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost btn-scale" onClick={loadTree} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <RefreshCw size={13} /> Refresh
            </button>
            <button className="btn-primary btn-scale" onClick={() => { setNewPath(currentDir || WORKSPACE_PATH); setShowNewModal(true); }} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Plus size={13} /> New File/Folder
            </button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr', overflow: 'hidden' }}>
        {/* File tree */}
        <div style={{ borderRight: '1px solid var(--separator)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '10px 12px 6px', borderBottom: '1px solid var(--separator)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Home size={12} style={{ color: 'var(--text-quaternary)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{WORKSPACE_PATH}</span>
            </div>
          </div>
          <div className="scroll-area" style={{ flex: 1, padding: '8px 6px' }}>
            {loading ? (
              <div className="empty-state">
                <Loader size={20} className="spin" />
                <p>Loading...</p>
              </div>
            ) : error ? (
              <div className="empty-state">
                <AlertCircle size={20} style={{ color: 'var(--system-red)' }} />
                <p style={{ color: 'var(--system-red)' }}>{error}</p>
                <button className="btn-ghost btn-scale" onClick={loadTree} style={{ fontSize: 11 }}>Retry</button>
              </div>
            ) : tree.length === 0 ? (
              <div className="empty-state">
                <Folder size={24} />
                <p>No files yet.</p>
              </div>
            ) : tree.map(node => (
              <TreeItem key={node.path} node={node} depth={0} selected={selectedFile?.path === node.path} onSelect={handleSelect} onDelete={handleDelete} />
            ))}
          </div>
        </div>

        {/* File viewer/editor */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!selectedFile ? (
            <div className="empty-state" style={{ flex: 1 }}>
              <FileText size={40} />
              <p>Select a file from the tree to view or edit.</p>
            </div>
          ) : selectedFile.type === 'directory' ? (
            <div className="empty-state" style={{ flex: 1 }}>
              <Folder size={40} style={{ color: '#F5C518' }} />
              <p>{selectedFile.path}</p>
              <p style={{ color: 'var(--text-tertiary)', marginTop: 4 }}>Select a file inside to view its contents.</p>
            </div>
          ) : (
            <>
              {/* Editor header */}
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 10 }}>
                {getFileIcon(fileName || '', 15)}
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', flex: 1 }}>{selectedFile.path}</span>
                {isDirty && <span className="badge badge-orange" style={{ fontSize: 10 }}>Modified</span>}
                {fileContent?.saving && <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Saving...</span>}
                <button
                  className="btn-primary btn-scale"
                  onClick={handleSave}
                  disabled={!isDirty || fileContent?.saving}
                  style={{ fontSize: 11, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <Save size={12} /> Save
                </button>
              </div>

              {/* Editor */}
              <div style={{ flex: 1, overflow: 'hidden', padding: 0 }}>
                {fileContent?.loading ? (
                  <div className="empty-state" style={{ flex: 1 }}>
                    <Loader size={20} className="spin" />
                    <p>Loading file...</p>
                  </div>
                ) : fileContent?.error ? (
                  <div className="empty-state" style={{ flex: 1 }}>
                    <AlertCircle size={20} style={{ color: 'var(--system-red)' }} />
                    <p style={{ color: 'var(--system-red)' }}>{fileContent.error}</p>
                  </div>
                ) : (
                  <textarea
                    className="textarea"
                    value={editContent}
                    onChange={e => { setEditContent(e.target.value); setIsDirty(true); }}
                    style={{
                      width: '100%', height: '100%', borderRadius: 0,
                      border: 'none', resize: 'none',
                      fontSize: 12, lineHeight: 1.6,
                      background: 'var(--bg)',
                      minHeight: 0, padding: '16px 20px',
                    }}
                    spellCheck={false}
                  />
                )}
              </div>

              {/* Footer */}
              <div style={{ padding: '6px 16px', borderTop: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 10, color: 'var(--text-quaternary)' }}>
                  {editContent.split('\n').length} lines · {editContent.length} chars
                </span>
                {isDirty && (
                  <span style={{ fontSize: 10, color: 'var(--system-orange)' }}>Unsaved changes</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showNewModal && (
        <NewItemModal
          onClose={() => setShowNewModal(false)}
          onCreate={handleCreate}
          defaultPath={newPath.endsWith('/') ? newPath : newPath + '/'}
        />
      )}
      {deleteTarget && (
        <DeleteModal node={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
      )}
    </div>
  );
}
