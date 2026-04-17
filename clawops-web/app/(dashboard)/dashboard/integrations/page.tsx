'use client';

import { useState } from 'react';
import {
  Plug, ExternalLink, Check, AlertCircle, Key, RefreshCw,
  Globe, Zap, Database, Settings, ChevronDown,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'not_connected' | 'error';
  fields: { key: string; label: string; placeholder: string; type: 'text' | 'password'; value: string }[];
  docsUrl?: string;
}

// ---------------------------------------------------------------------------
// Integration definitions
// ---------------------------------------------------------------------------

const INTEGRATIONS: Integration[] = [
  {
    id: 'ghl',
    name: 'Go High Level (GHL)',
    description: 'Connect your GHL account to enable AI-powered workflow automation, lead management, and pipeline optimization.',
    icon: '📊',
    status: 'not_connected',
    fields: [
      { key: 'location_id', label: 'Location ID', placeholder: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', type: 'text', value: '' },
      { key: 'api_key', label: 'API Key', placeholder: 'pit-...', type: 'password', value: '' },
    ],
    docsUrl: 'https://help.gohighlevel.com/support/solutions/articles/155000-xxxxxx',
  },
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Connect Gmail, Google Calendar, Drive, and Docs for AI agents to read emails, schedule events, and manage documents.',
    icon: '📧',
    status: 'not_connected',
    fields: [
      { key: 'client_id', label: 'Client ID', placeholder: 'client-id.apps.googleusercontent.com', type: 'text', value: '' },
      { key: 'client_secret', label: 'Client Secret', placeholder: 'GOCSPX-...', type: 'password', value: '' },
    ],
    docsUrl: 'https://developers.google.com/workspace/guides/create-credentials',
  },
  {
    id: 'n8n',
    name: 'n8n Workflow Automation',
    description: 'Connect n8n to trigger workflows, execute nodes, and coordinate complex automation pipelines with your AI agents.',
    icon: '⚡',
    status: 'connected',
    fields: [
      { key: 'n8n_url', label: 'n8n Instance URL', placeholder: 'https://app.clawops.studio/n8n', type: 'text', value: 'https://app.clawops.studio/n8n' },
    ],
    docsUrl: 'https://docs.n8n.io',
  },
  {
    id: 'composio',
    name: 'Composio',
    description: 'Composio enables 250+ tool integrations for AI agents. Connect your Composio API key to unlock social, CRM, and productivity tools.',
    icon: '🔌',
    status: 'not_connected',
    fields: [
      { key: 'api_key', label: 'Composio API Key', placeholder: 'sk-com-...', type: 'password', value: '' },
    ],
    docsUrl: 'https://composio.ai',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Connect your Supabase project for database operations, authentication, and real-time subscriptions.',
    icon: '🗄️',
    status: 'connected',
    fields: [
      { key: 'supabase_url', label: 'Project URL', placeholder: 'https://xxxxx.supabase.co', type: 'text', value: 'https://dyzkfmdjusdyjmytgeah.supabase.co' },
      { key: 'anon_key', label: 'Anon Key', placeholder: 'eyJ...', type: 'password', value: '' },
    ],
    docsUrl: 'https://supabase.com/docs',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Configure your OpenAI API key for GPT-4, Whisper, TTS, and image generation capabilities.',
    icon: '🤖',
    status: 'connected',
    fields: [
      { key: 'api_key', label: 'OpenAI API Key', placeholder: 'sk-...', type: 'password', value: '' },
    ],
    docsUrl: 'https://platform.openai.com/api-keys',
  },
];

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: Integration['status'] }) {
  if (status === 'connected') return (
    <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Check size={9} /> Connected
    </span>
  );
  if (status === 'error') return (
    <span className="badge badge-red" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <AlertCircle size={9} /> Error
    </span>
  );
  return (
    <span className="badge badge-gray" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      Not Connected
    </span>
  );
}

// ---------------------------------------------------------------------------
// Integration card
// ---------------------------------------------------------------------------

function IntegrationCard({ integration }: { integration: Integration }) {
  const [fields, setFields] = useState(integration.fields);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const hasValues = fields.some(f => f.value.trim());

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (key: string, value: string) => {
    setFields(f => f.map(field => field.key === key ? { ...field, value } : field));
    setSaved(false);
  };

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10,
          background: 'var(--material-regular)',
          border: '1px solid var(--separator)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0,
        }}>
          {integration.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{integration.name}</span>
            <StatusBadge status={integration.status} />
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{integration.description}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover-bg"
          style={{ padding: 5, borderRadius: 5, border: 'none', background: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', flexShrink: 0 }}
        >
          <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
        </button>
      </div>

      {expanded && (
        <div style={{ padding: '0 18px 16px', borderTop: '1px solid var(--separator)' }}>
          <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {integration.id === 'n8n' && integration.status === 'connected' && (
              <div style={{
                padding: '10px 12px', borderRadius: 7,
                background: 'var(--accent-fill)',
                border: '1px solid rgba(91,108,255,0.2)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Zap size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>n8n is running at your instance</div>
                  <a
                    href="https://app.clawops.studio/n8n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-scale"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, padding: '4px 10px', textDecoration: 'none' }}
                  >
                    <ExternalLink size={11} /> Open n8n
                  </a>
                </div>
              </div>
            )}

            {fields.map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {field.label}
                </label>
                <input
                  className="input"
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={e => updateField(field.key, e.target.value)}
                  style={{ fontFamily: field.type === 'password' ? 'var(--font-mono)' : 'inherit', fontSize: 12 }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
              {integration.docsUrl && (
                <a
                  href={integration.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost btn-scale"
                  style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, textDecoration: 'none' }}
                >
                  <ExternalLink size={11} /> Docs
                </a>
              )}
              {integration.status !== 'connected' ? (
                <button className="btn-primary btn-scale" onClick={handleSave} disabled={saving} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {saving ? <><RefreshCw size={11} className="spin" /> Connecting...</> : <><Plug size={11} /> Connect</>}
                </button>
              ) : (
                <button className="btn-primary btn-scale" onClick={handleSave} disabled={saving} style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {saving ? <><RefreshCw size={11} className="spin" /> Saving...</> : saved ? <><Check size={11} /> Saved!</> : <><Key size={11} /> Save</>}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function IntegrationsPage() {
  const [integrations] = useState(INTEGRATIONS);
  const connectedCount = integrations.filter(i => i.status === 'connected').length;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1>Integrations</h1>
          <p>Connect your tools, APIs, and services to power your AI agents and automation workflows.</p>
        </div>
        <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Check size={12} style={{ color: 'var(--system-green)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{connectedCount} / {integrations.length} connected</span>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <a
          href="https://app.clawops.studio/n8n"
          target="_blank"
          rel="noopener noreferrer"
          className="card hover-lift"
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', cursor: 'pointer' }}
        >
          <Zap size={16} style={{ color: 'var(--accent)' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Open n8n</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Workflow automation</div>
          </div>
          <ExternalLink size={12} style={{ color: 'var(--text-quaternary)', marginLeft: 'auto' }} />
        </a>
        <a
          href="https://app.clawops.studio/gateway"
          target="_blank"
          rel="noopener noreferrer"
          className="card hover-lift"
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', cursor: 'pointer' }}
        >
          <Plug size={16} style={{ color: 'var(--accent-secondary)' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>OpenClaw Gateway</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Agent control plane</div>
          </div>
          <ExternalLink size={12} style={{ color: 'var(--text-quaternary)', marginLeft: 'auto' }} />
        </a>
        <a
          href="https://app.clawops.studio/browser"
          target="_blank"
          rel="noopener noreferrer"
          className="card hover-lift"
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', cursor: 'pointer' }}
        >
          <Globe size={16} style={{ color: 'var(--system-green)' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Agent Browser</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Chrome VNC</div>
          </div>
          <ExternalLink size={12} style={{ color: 'var(--text-quaternary)', marginLeft: 'auto' }} />
        </a>
      </div>

      {/* Integration cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 14 }}>
        {integrations.map(integration => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>

      {/* Help banner */}
      <div style={{
        marginTop: 24, padding: '14px 16px',
        background: 'var(--material-thin)',
        border: '1px solid var(--separator)',
        borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Settings size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Need a different integration? Connect tools via <strong style={{ color: 'var(--text-primary)' }}>MCP servers</strong> on the Tools page, or use <strong style={{ color: 'var(--text-primary)' }}>n8n</strong> to bridge any API. Contact us to request a native integration.
        </p>
      </div>
    </div>
  );
}
