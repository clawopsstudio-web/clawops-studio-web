'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import { FolderOpen, FileText, Edit3, Plus, Trash2, ChevronDown, ChevronUp, FolderPlus, Download, Upload } from 'lucide-react';

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="doc-faq-item">
      <button className="doc-faq-q" onClick={() => setOpen(!open)}>
        {q}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="doc-faq-a">{a}</div>}
    </div>
  );
}

export default function WorkspaceDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <FolderOpen size={12} />
        <span>Workspace</span>
      </div>

      <h1 className="doc-h1">Workspace</h1>
      <p className="doc-lead">
        The ClawOps workspace is a persistent file system available to you and your AI agents.
        Browse files and folders, view and edit documents, create new files, and manage
        your workspace — all from the Workspace page or via agent tasks.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { icon: FolderOpen, label: 'Browse', desc: 'Navigate files & folders' },
            { icon: FileText, label: 'View', desc: 'Read file contents' },
            { icon: Edit3, label: 'Edit', desc: 'Modify existing files' },
            { icon: Plus, label: 'Create', desc: 'New files & folders' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(52,208,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--system-green)' }}>
                  <Icon size={14} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Guide</div>

        {/* Step 1 */}
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Browse Workspace Files</div>
            <div className="doc-step-desc">Go to <strong>Workspace</strong> in the sidebar. The file browser shows your workspace root directory.</div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li>The left panel shows the <strong>folder tree</strong> — click any folder to navigate into it</li>
              <li>The right panel shows the <strong>file list</strong> for the selected folder</li>
              <li>Files show: name, type (icon), size, and last modified date</li>
              <li>Click any file or folder to open/view it</li>
              <li>Use <strong>breadcrumb navigation</strong> (top of file list) to go back up</li>
            </ul>
            <p className="doc-step-desc">
              The workspace root is <span className="doc-inline-code">/workspace/</span>.
              Agent tasks that save files default to this directory.
            </p>
            {/* screenshot: workspace-browse.png */}
          </div>
        </div>

        {/* Step 2 */}
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">View a File</div>
            <div className="doc-step-desc">Click on any file in the file list to open it in the viewer pane.</div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click the file name in the file list</li>
              <li>The file opens in a <strong>read-only viewer</strong> on the right</li>
              <li>Text files (.txt, .md, .json, .py, .js, .tsx) display with syntax highlighting</li>
              <li>Images (.png, .jpg, .gif, .webp) display as thumbnails</li>
              <li>Binary files (.pdf, .zip) show a download prompt instead</li>
              <li>Use <strong>Download</strong> to save any file to your local machine</li>
            </ol>
            {/* screenshot: workspace-view-file.png */}
          </div>
        </div>

        {/* Step 3 */}
        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Edit a File</div>
            <div className="doc-step-desc">
              Click the <strong>Edit</strong> button (pencil icon) in the file viewer
              to switch to edit mode. Changes are saved explicitly.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Open the file you want to edit</li>
              <li>Click the <strong>Edit</strong> button in the viewer toolbar</li>
              <li>The file switches to a code/text editor with syntax highlighting</li>
              <li>Make your changes</li>
              <li>Click <strong>Save</strong> to commit — or <strong>Cancel</strong> to discard</li>
            </ol>
            <p className="doc-step-desc">
              Alternatively, ask an agent to edit a file directly:
              <span className="doc-inline-code">@agent update workspace/prompts/outreach.md to include a warmer greeting</span>
            </p>
            {/* screenshot: workspace-edit-file.png */}
            <div className="doc-warning">
              <Edit3 size={13} />
              <span>Edits are saved immediately to disk. There is no undo history — use Download to back up files before major edits.</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Create a New File</div>
            <div className="doc-step-desc">
              Click the <strong>+ New File</strong> button in the file list toolbar
              (top of the right panel).
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>+ New File</strong> in the toolbar</li>
              <li>A dialog appears — enter the file name (e.g., <span className="doc-inline-code">research.md</span>)</li>
              <li>Optionally select a file type (Markdown, JSON, Python, Text, etc.)</li>
              <li>Click <strong>Create</strong></li>
              <li>The file opens in edit mode — start writing</li>
              <li>Click <strong>Save</strong> when done</li>
            </ol>
            <p className="doc-step-desc">
              File names can include paths: <span className="doc-inline-code">subfolder/myfile.md</span>
              will create the file inside <span className="doc-inline-code">/workspace/subfolder/</span>,
              creating the folder if it doesn't exist.
            </p>
            {/* screenshot: workspace-create-file.png */}
          </div>
        </div>

        {/* Step 5 */}
        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Create a Folder</div>
            <div className="doc-step-desc">
              Click the <strong>+ New Folder</strong> button in the file list toolbar.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>+ New Folder</strong> in the toolbar</li>
              <li>Enter a folder name (e.g., <span className="doc-inline-code">campaigns</span>)</li>
              <li>Click <strong>Create</strong></li>
              <li>The folder appears in the file list and tree</li>
            </ol>
            <p className="doc-step-desc">
              You can also create nested folders: <span className="doc-inline-code">campaigns/q1/linkedin</span>
              creates all three levels.
            </p>
            {/* screenshot: workspace-create-folder.png */}
          </div>
        </div>

        {/* Step 6 */}
        <div className="doc-step">
          <div className="doc-step-num">6</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Delete Files</div>
            <div className="doc-step-desc">
              Select files and folders you want to delete, then use the delete action.
              Deleted files go to a trash folder (not permanently deleted immediately).
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click the checkbox next to each file/folder you want to delete</li>
              <li>Or right-click a file → <strong>Delete</strong></li>
              <li>A confirmation dialog appears showing what will be deleted</li>
              <li>Click <strong>Delete</strong> to confirm</li>
              <li>Files are moved to <span className="doc-inline-code">/workspace/.trash/</span></li>
              <li>To permanently delete: open <strong>.trash</strong> and delete from there</li>
            </ol>
            {/* screenshot: workspace-delete.png */}
            <div className="doc-warning">
              <Trash2 size={13} />
              <span>Deleting a folder also deletes all its contents. Check what's inside a folder before deleting it. Files in .trash are auto-purged after 30 days.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="How much storage do I get?" a="Free plan: 500MB. Pro plan: 10GB. Enterprise: unlimited. Storage counts are shown in Account → Storage." />
        <FaqItem q="Can I upload files from my computer?" a="Yes. Click the Upload button in the Workspace toolbar. Supports drag-and-drop. Max file size: 50MB on free plan, 500MB on Pro." />
        <FaqItem q="How do agents access the workspace?" a="Agents can read from and write to /workspace/ directly. In agent tasks, you can specify relative paths — agents resolve them to /workspace/." />
        <FaqItem q="Are workspace files private?" a="Workspace files are private to your account. Agents you invite can be given workspace access on a per-user basis from Account → Team." />
        <FaqItem q="Can I export my entire workspace?" a="Yes. Go to Workspace → Download All (three-dot menu). This creates a .zip of your entire /workspace/ folder for download." />
      </div>
    </DocsLayout>
  );
}
