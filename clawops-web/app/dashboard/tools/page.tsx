'use client';

import { useState } from 'react';
import {
  Wrench, Plug, Server, Settings, Check, X, ExternalLink,
  ChevronDown, ChevronUp, Search, AlertCircle, Zap, Globe,
  Shield, Database, Code, Download, RefreshCw,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Tab = 'mcp' | 'plugins';
type MCPStatus = 'connected' | 'disconnected' | 'error';

interface MCPServer {
  id: string;
  name: string;
  description: string;
  category: string;
  status: MCPStatus;
  enabled: boolean;
  version: string;
  author: string;
}

interface Plugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  enabled: boolean;
  type: 'custom' | 'builtin';
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MCP_SERVERS: MCPServer[] = [
  { id: '1', name: 'Filesystem', description: 'Read, write, and navigate the local filesystem. Essential for workspace operations.', category: 'System', status: 'connected', enabled: true, version: '1.4.2', author: 'Smithery' },
  { id: '2', name: 'GitHub', description: 'Manage repositories, issues, pull requests, and code reviews via GitHub API.', category: 'Development', status: 'connected', enabled: true, version: '2.1.0', author: 'Smithery' },
  { id: '3', name: 'Brave Search', description: 'Web search powered by Brave Search API. Fast, privacy-respecting search results.', category: 'Research', status: 'connected', enabled: true, version: '1.8.3', author: 'Smithery' },
  { id: '4', name: 'Slack', description: 'Send messages, manage channels, and receive notifications in Slack workspaces.', category: 'Communication', status: 'disconnected', enabled: false, version: '1.2.1', author: 'Smithery' },
  { id: '5', name: 'Puppeteer', description: 'Browser automation via Puppeteer. Screenshot, scrape, and interact with web pages.', category: 'Browser', status: 'connected', enabled: true, version: '3.0.0', author: 'Smithery' },
  { id: '6', name: 'PostgreSQL', description: 'Query and manage PostgreSQL databases. Run SELECT, INSERT, UPDATE, and more.', category: 'Database', status: 'error', enabled: false, version: '1.5.7', author: 'Smithery' },
  { id: '7', name: 'Google Drive', description: 'Read, write, and share Google Drive files and folders programmatically.', category: 'Productivity', status: 'disconnected', enabled: false, version: '2.0.1', author: 'Smithery' },
  { id: '8', name: 'Stripe', description: 'Manage customers, payments, subscriptions, and invoices via Stripe API.', category: 'Finance', status: 'disconnected', enabled: false, version: '1.1.4', author: 'Smithery' },
];

const PLUGINS: Plugin[] = [
  { id: '1', name: 'Paperclip Screenshot', version: '1.3.0', author: 'clawops-studio', description: 'Capture screenshots of any URL using Paperclip rendering engine. Supports full-page, viewport, and element-specific screenshots.', enabled: true, type: 'builtin' },
  { id: '2', name: 'Firecrawl Crawler', version: '2.0.1', author: 'clawops-studio', description: 'Crawl and extract content from websites. Supports JavaScript rendering, sitemap discovery, and batch crawling.', enabled: true, type: 'builtin' },
  { id: '3', name: 'DeerFlow Research', version: '1.5.2', author: 'clawops-studio', description: 'Deep research agent that conducts multi-source research with citation tracking and structured output.', enabled: true, type: 'builtin' },
  { id: '4', name: 'Custom Parser', version: '0.9.1', author: 'community', description: 'Parse PDFs, DOCX, CSV, and other file formats. Extract structured data from unstructured documents.', enabled: false, type: 'custom' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_CONFIG = {
  connected:    { dot: 'active',   badge: 'badge-green', label: 'Connected',    color: 'var(--system-green)' },
  disconnected: { dot: 'idle',    badge: 'badge-gray',  label: 'Disconnected', color: 'var(--text-tertiary)' },
  error:        { dot: 'error',   badge: 'badge-red',   label: 'Error',        color: 'var(--system-red)'   },
};

const CATEGORY_ICONS: Record<string, typeof Database> = {
  System: Database,
  Development: Code,
  Research: Search,
  Communication: Globe,
  Browser: Globe,
  Database: Database,
  Productivity: Settings,
  Finance: Zap,
};

function MCPStatusBadge({ status }: { status: MCPStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`badge ${cfg.badge}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span className={`status-dot ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MCPServerCard({ server, onToggle }: { server: MCPServer; onToggle: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const CatIcon = CATEGORY_ICONS[server.category] || Server;

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: 'var(--material-regular)',
          border: '1px solid var(--separator)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <CatIcon size={15} style={{ color: 'var(--text-tertiary)' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{server.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>v{server.version} · {server.author}</div>
        </div>
        <MCPStatusBadge status={server.status} />
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover-bg"
          style={{ padding: 4, borderRadius: 4, border: 'none', background: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {expanded && (
        <div style={{ padding: '0 14px 12px', borderTop: '1px solid var(--separator)' }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, paddingTop: 10, marginBottom: 10 }}>
            {server.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="badge badge-gray" style={{ fontSize: 10 }}>{server.category}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href="https://smithery.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-scale"
                style={{ fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
              >
                <ExternalLink size={10} /> Registry
              </a>
              <button
                onClick={onToggle}
                className={`btn-scale ${server.enabled ? 'btn-danger' : 'btn-primary'}`}
                style={{ fontSize: 11, padding: '4px 10px' }}
              >
                {server.enabled ? <><X size={10} /> Disable</> : <><Check size={10} /> Enable</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PluginCard({ plugin, onToggle }: { plugin: Plugin; onToggle: () => void }) {
  return (
    <div className="card" style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div className="avatar avatar-sm">{plugin.name.slice(0, 2).toUpperCase()}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{plugin.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>v{plugin.version} · by {plugin.author}</div>
        </div>
        <span className={`badge ${plugin.type === 'builtin' ? 'badge-accent' : 'badge-gray'}`}>
          {plugin.type}
        </span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{plugin.description}</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onToggle}
          className={`btn-scale ${plugin.enabled ? 'btn-ghost' : 'btn-primary'}`}
          style={{ fontSize: 11, padding: '4px 10px' }}
        >
          {plugin.enabled ? <><Settings size={10} /> Configure</> : <><Download size={10} /> Enable</>}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ToolsPage() {
  const [tab, setTab] = useState<Tab>('mcp');
  const [servers, setServers] = useState(MCP_SERVERS);
  const [plugins, setPlugins] = useState(PLUGINS);
  const [search, setSearch] = useState('');

  const toggleServer = (id: string) => setServers(s => s.map(sv => sv.id === id ? { ...sv, enabled: !sv.enabled } : sv));
  const togglePlugin = (id: string) => setPlugins(p => p.map(pl => pl.id === id ? { ...pl, enabled: !pl.enabled } : pl));

  const filteredServers = servers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));
  const filteredPlugins = plugins.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

  const connectedCount = servers.filter(s => s.status === 'connected').length;
  const enabledCount = servers.filter(s => s.enabled).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Tools & Plugins</h1>
        <p>Manage MCP servers, browser plugins, and integrations that extend your AI agents' capabilities.</p>
      </div>

      {/* Tabs + Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div className="tabs">
          <button className={`tab-item ${tab === 'mcp' ? 'active' : ''}`} onClick={() => setTab('mcp')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Server size={12} /> MCP Servers
          </button>
          <button className={`tab-item ${tab === 'plugins' ? 'active' : ''}`} onClick={() => setTab('plugins')} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plug size={12} /> Plugins
          </button>
        </div>
        <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
          <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
          <input className="input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32, fontSize: 12 }} />
        </div>
        {tab === 'mcp' && (
          <a
            href="https://smithery.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost btn-scale"
            style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 12 }}
          >
            <ExternalLink size={12} /> Smithery Registry
          </a>
        )}
      </div>

      {/* Summary stats */}
      {tab === 'mcp' && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="status-dot active" />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{connectedCount} connected</span>
          </div>
          <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Check size={12} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{enabledCount} enabled</span>
          </div>
          <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Server size={12} style={{ color: 'var(--text-tertiary)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{servers.length} total servers</span>
          </div>
        </div>
      )}

      {/* MCP Servers tab */}
      {tab === 'mcp' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
          {filteredServers.map(server => (
            <MCPServerCard key={server.id} server={server} onToggle={() => toggleServer(server.id)} />
          ))}
          {filteredServers.length === 0 && (
            <div className="empty-state" style={{ gridColumn: '1/-1' }}>
              <Server size={32} />
              <p>No servers found.</p>
            </div>
          )}
        </div>
      )}

      {/* Plugins tab */}
      {tab === 'plugins' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredPlugins.map(plugin => (
            <PluginCard key={plugin.id} plugin={plugin} onToggle={() => togglePlugin(plugin.id)} />
          ))}
          {filteredPlugins.length === 0 && (
            <div className="empty-state">
              <Plug size={32} />
              <p>No plugins found.</p>
            </div>
          )}
        </div>
      )}

      {/* Smithery info banner */}
      {tab === 'mcp' && (
        <div style={{
          marginTop: 24, padding: '14px 16px',
          background: 'var(--accent-fill)',
          border: '1px solid rgba(91,108,255,0.25)',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Zap size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>Smithery MCP Registry</div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              Browse 1000+ MCP servers at smithery.ai. Click "Registry" on any server to configure its API keys and settings.
            </p>
          </div>
          <a
            href="https://smithery.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-scale"
            style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 12, flexShrink: 0 }}
          >
            <Globe size={12} /> Browse Registry
          </a>
        </div>
      )}
    </div>
  );
}
