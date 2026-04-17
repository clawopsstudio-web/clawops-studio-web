'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen, Rocket, Users, Share2, Bot, Wrench, Plug, Monitor, FolderOpen,
  ChevronRight, Search, ArrowLeft, Server, Workflow,
} from 'lucide-react';

const DOCS_NAV = [
  {
    section: 'Getting Started',
    icon: Rocket,
    items: [
      { label: 'Introduction', href: '/dashboard/docs' },
      { label: 'Setup & Onboarding', href: '/dashboard/docs/getting-started' },
    ],
  },
  {
    section: 'Platform',
    icon: Server,
    items: [
      { label: 'OpenClaw Agent OS', href: '/dashboard/docs/openclaw' },
      { label: 'Gateway', href: '/dashboard/docs/gateway' },
    ],
  },
  {
    section: 'AI Agents',
    icon: Bot,
    items: [
      { label: 'AI Agent Teams', href: '/dashboard/docs/agent-team' },
      { label: 'Spawning Workers', href: '/dashboard/docs/spawning' },
    ],
  },
  {
    section: 'Core Features',
    icon: Users,
    items: [
      { label: 'CRM', href: '/dashboard/docs/crm' },
      { label: 'Social Media', href: '/dashboard/docs/social' },
      { label: 'AI Agents', href: '/dashboard/docs/agents' },
    ],
  },
  {
    section: 'Browser & Tools',
    icon: Monitor,
    items: [
      { label: 'Browser Automation', href: '/dashboard/docs/browser' },
      { label: 'Skills', href: '/dashboard/docs/skills' },
      { label: 'MCP Servers & Plugins', href: '/dashboard/docs/tools' },
    ],
  },
  {
    section: 'Integrations',
    icon: Plug,
    items: [
      { label: 'All Integrations', href: '/dashboard/docs/integrations' },
      { label: 'Channels & API Keys', href: '/dashboard/docs/channels' },
      { label: 'n8n MCP', href: '/dashboard/docs/n8n-mcp' },
      { label: 'Browser Automation', href: '/dashboard/docs/browser' },
      { label: 'Workspace', href: '/dashboard/docs/workspace' },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const filteredNav = DOCS_NAV.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      !search || item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="docs-shell">
      {/* Docs sidebar */}
      <aside className={`docs-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="docs-sidebar-header">
          <Link href="/dashboard/docs" className="docs-logo-link">
            <div className="docs-logo">
              <BookOpen size={14} />
              {!collapsed && <span>Docs</span>}
            </div>
          </Link>
          <button
            className="docs-collapse-btn hover-bg"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronRight size={13} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 200ms' }} />
          </button>
        </div>

        {!collapsed && (
          <div className="docs-search-wrap">
            <Search size={12} className="docs-search-icon" />
            <input
              className="docs-search"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        <nav className="docs-nav">
          {filteredNav.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.section} className="docs-nav-section">
                <div className="docs-nav-section-label">
                  <SectionIcon size={12} />
                  {!collapsed && <span>{section.section}</span>}
                </div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`docs-nav-item ${pathname === item.href ? 'active' : ''}`}
                  >
                    {!collapsed && item.label}
                    {collapsed && <SectionIcon size={13} />}
                  </Link>
                ))}
              </div>
            );
          })}
        </nav>

        <div className="docs-sidebar-footer">
          <Link href="/dashboard" className="docs-back-link hover-bg">
            <ArrowLeft size={12} />
            {!collapsed && <span>Back to Dashboard</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="docs-content">
        {children}
      </main>

      <style>{`
        .docs-shell {
          display: flex;
          height: calc(100vh - 52px);
          overflow: hidden;
        }
        .docs-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--separator);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width 200ms ease-out;
        }
        .docs-sidebar.collapsed {
          width: 48px;
        }
        .docs-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 10px 8px;
          border-bottom: 1px solid var(--separator);
          min-height: 44px;
        }
        .docs-logo-link { text-decoration: none; }
        .docs-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .docs-logo svg { color: var(--accent); }
        .docs-collapse-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 4px;
          border: none;
          background: transparent;
          color: var(--text-quaternary);
          cursor: pointer;
          flex-shrink: 0;
        }
        .docs-search-wrap {
          position: relative;
          padding: 8px 10px;
        }
        .docs-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-quaternary);
          pointer-events: none;
        }
        .docs-search {
          width: 100%;
          padding: 6px 8px 6px 28px;
          background: var(--fill-quaternary);
          border: 1px solid var(--separator);
          border-radius: var(--radius-xs);
          color: var(--text-primary);
          font-size: 12px;
          outline: none;
          transition: border-color 150ms;
        }
        .docs-search:focus { border-color: var(--accent); }
        .docs-search::placeholder { color: var(--text-tertiary); }
        .docs-nav {
          flex: 1;
          overflow-y: auto;
          padding: 6px 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .docs-nav-section { display: flex; flex-direction: column; gap: 1px; }
        .docs-nav-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 6px 3px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--text-quaternary);
        }
        .docs-sidebar.collapsed .docs-nav-section-label {
          justify-content: center;
          padding: 6px 0 3px;
        }
        .docs-nav-item {
          display: block;
          padding: 6px 8px;
          border-radius: var(--radius-xs);
          font-size: 12px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: background 120ms, color 120ms;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .docs-sidebar.collapsed .docs-nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7px 0;
          font-size: 13px;
        }
        .docs-nav-item:hover { background: var(--fill-secondary); color: var(--text-primary); }
        .docs-nav-item.active { background: var(--accent-fill); color: var(--accent); font-weight: 500; }
        .docs-sidebar-footer {
          padding: 8px 6px;
          border-top: 1px solid var(--separator);
        }
        .docs-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          border-radius: var(--radius-xs);
          font-size: 11px;
          color: var(--text-tertiary);
          text-decoration: none;
          transition: background 120ms, color 120ms;
        }
        .docs-sidebar.collapsed .docs-back-link { justify-content: center; padding: 6px 0; }
        .docs-sidebar.collapsed .docs-back-link span { display: none; }
        .docs-back-link:hover { color: var(--text-secondary); }
        .docs-content {
          flex: 1;
          overflow-y: auto;
          padding: 32px 48px;
          max-width: 860px;
        }
        @media (max-width: 768px) {
          .docs-sidebar { display: none; }
          .docs-content { padding: 24px 20px; }
        }
        /* ── Doc page typography ── */
        .doc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-tertiary);
          margin-bottom: 24px;
        }
        .doc-breadcrumb a { color: var(--text-tertiary); text-decoration: none; }
        .doc-breadcrumb a:hover { color: var(--accent); }
        .doc-h1 { font-size: 26px; font-weight: 600; letter-spacing: -0.3px; color: var(--text-primary); margin-bottom: 8px; }
        .doc-lead { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 32px; }
        .doc-section { margin-bottom: 36px; }
        .doc-section-title { font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-quaternary); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--separator); }
        .doc-step { display: flex; gap: 16px; margin-bottom: 20px; }
        .doc-step-num {
          flex-shrink: 0;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--accent-fill);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          margin-top: 2px;
        }
        .doc-step-body { flex: 1; }
        .doc-step-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
        .doc-step-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 10px; }
        .doc-tip {
          display: flex; gap: 10px;
          padding: 10px 14px;
          background: var(--accent-secondary-fill);
          border: 1px solid rgba(0,209,255,0.2);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .doc-tip svg { color: var(--accent-secondary); flex-shrink: 0; margin-top: 1px; }
        .doc-warning {
          display: flex; gap: 10px;
          padding: 10px 14px;
          background: rgba(255,179,64,0.08);
          border: 1px solid rgba(255,179,64,0.2);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .doc-warning svg { color: var(--accent-energy); flex-shrink: 0; margin-top: 1px; }
        .doc-faq-item { border: 1px solid var(--separator); border-radius: var(--radius-sm); margin-bottom: 8px; overflow: hidden; }
        .doc-faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px;
          background: var(--material-thin);
          font-size: 13px; font-weight: 500; color: var(--text-primary);
          cursor: pointer;
          border: none; width: 100%; text-align: left;
          font-family: inherit;
          transition: background 120ms;
        }
        .doc-faq-q:hover { background: var(--fill-secondary); }
        .doc-faq-a { padding: 0 14px 12px; font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
        .doc-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
        .doc-card {
          display: flex; flex-direction: column; gap: 8px;
          padding: 16px;
          background: var(--material-regular);
          border: 1px solid var(--separator);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: border-color 150ms, transform 150ms, box-shadow 150ms;
        }
        .doc-card:hover { border-color: var(--accent); transform: translateY(-1px); box-shadow: var(--shadow-card); }
        .doc-card-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--accent-fill); display: flex; align-items: center; justify-content: center; color: var(--accent); }
        .doc-card-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .doc-card-desc { font-size: 11px; color: var(--text-tertiary); line-height: 1.5; }
        .doc-card-arrow { margin-top: auto; color: var(--text-quaternary); }
        .doc-divider { height: 1px; background: var(--separator); margin: 28px 0; }
        .doc-inline-code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: var(--code-bg);
          border: 1px solid var(--separator);
          border-radius: 3px;
          padding: 1px 6px;
          color: var(--accent-secondary);
        }
        .doc-badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600; background: var(--accent-fill); color: var(--accent); }
      `}</style>
    </div>
  );
}
