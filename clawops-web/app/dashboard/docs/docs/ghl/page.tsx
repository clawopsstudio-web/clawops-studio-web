'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Users, DollarSign, Mail, CheckSquare,
  ChevronDown, ChevronUp, Zap, ArrowRight,
} from 'lucide-react';

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

export default function GHLDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>GoHighLevel</span>
      </div>

      <h1 className="doc-h1">GoHighLevel (GHL) Setup</h1>
      <p className="doc-lead">
        Connect your GoHighLevel CRM to your AI agent so it can manage contacts,
        update pipeline stages, send emails, create tasks, and automate your
        sales workflow — all from a conversation.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: Users, label: 'Contact Management', desc: 'Add, update, and search contacts' },
            { icon: DollarSign, label: 'Pipeline Control', desc: 'Move deals through stages' },
            { icon: Mail, label: 'Email Automation', desc: 'Send emails and campaigns' },
            { icon: CheckSquare, label: 'Task Creation', desc: 'Create follow-up tasks automatically' },
            { icon: Zap, label: 'AI-Powered CRM', desc: 'Agent acts as your CRM operator' },
            { icon: ArrowRight, label: 'Full Automation', desc: 'Trigger CRM actions from any input' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Icon size={14} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* What is GHL */}
      <div className="doc-section">
        <div className="doc-section-title">What is GoHighLevel?</div>
        <p className="doc-step-desc">
          <strong>GoHighLevel (GHL)</strong> is an all-in-one CRM, sales, and marketing
          automation platform used by agencies and small businesses. It handles:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 10 }}>
          {[
            'Contact management & lead tracking',
            'Sales pipeline with custom stages',
            'Email and SMS campaigns',
            'Appointment scheduling',
            'Task and calendar management',
            'White-label client portals',
            'Reporting and analytics',
          ].map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', padding: '8px 12px', background: 'var(--fill-secondary)', borderRadius: 6 }}>
              <CheckSquare size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </div>
        <p className="doc-step-desc">
          When connected to ClawOps, your AI agent can act as a <strong>GHL operator</strong> —
          managing contacts, updating pipelines, and sending outreach without you opening GHL.
        </p>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Setup</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Get Your Location ID from GHL</div>
            <div className="doc-step-desc">
              The <strong>Location ID</strong> identifies your GHL workspace (you can have multiple).
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Log into GHL at <span className="doc-inline-code">app.gohighlevel.com</span></li>
              <li>Click the <strong>Settings</strong> icon (gear) in the left sidebar</li>
              <li>Go to <strong>Business Info</strong></li>
              <li>Find the <strong>Location ID</strong> field — it looks like a long string of letters and numbers</li>
              <li>Click <strong>Copy</strong> or manually copy the Location ID</li>
            </ol>
            {/* screenshot: ghl-location-id.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Get Your API Key from GHL</div>
            <div className="doc-step-desc">
              The API key gives your agent permission to manage your GHL data:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In GHL, go to <strong>Settings</strong></li>
              <li>Click <strong>API</strong> in the settings menu</li>
              <li>Click <strong>Create Key</strong> or <strong>Add API Key</strong></li>
              <li>Give it a name like "ClawOps Agent"</li>
              <li>Select the scopes you need:
                <ul style={{ marginTop: 4 }}>
                  <li><strong>contacts</strong> — read/write contacts</li>
                  <li><strong>opportunities</strong> — manage pipeline deals</li>
                  <li><strong>tasks</strong> — create and complete tasks</li>
                  <li><strong>email</strong> — send emails</li>
                </ul>
              </li>
              <li>Click <strong>Save</strong></li>
              <li>Copy the generated API key</li>
            </ol>
            <div className="doc-warning">
              <Users size={13} />
              <span>
                <strong>Important:</strong> API keys are shown only once. Copy and store it safely.
                If you lose it, you'll need to create a new one.
              </span>
            </div>
            {/* screenshot: ghl-api-key.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Paste Credentials in ClawOps Dashboard</div>
            <div className="doc-step-desc">
              Connect GHL to your ClawOps workspace:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Go to <strong>Integrations</strong> in the ClawOps sidebar</li>
              <li>Find <strong>GHL</strong> (GoHighLevel)</li>
              <li>Paste your <strong>Location ID</strong> in the first field</li>
              <li>Paste your <strong>API Key</strong> in the second field</li>
              <li>Click <strong>Save</strong></li>
            </ol>
            {/* screenshot: ghl-dashboard-settings.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Save & Test</div>
            <div className="doc-step-desc">
              After saving, click <strong>Test Connection</strong>:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li><span className="doc-badge">Connected ✓</span> — Your agent is ready to manage GHL</li>
              <li><span className="doc-badge" style={{ background: 'rgba(255,100,100,0.12)', color: '#FF6464' }}>Failed</span> — Check Location ID and API key, ensure they match</li>
            </ul>
            <div className="doc-tip">
              <CheckSquare size={13} />
              <span>
                A successful test will show your GHL location name and contact count.
                If you see an error, double-check the Location ID — it must match the
                location your API key was created under.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* What agent can do */}
      <div className="doc-section">
        <div className="doc-section-title">What Your Agent Can Do with GHL</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          {[
            {
              title: 'Add & Manage Contacts',
              desc: '"Add a new contact for [name] with email [email] and phone [phone]"',
              icon: Users,
            },
            {
              title: 'Update Pipeline Stages',
              desc: '"Move the Acme Corp deal to Won stage and set value to $5,000"',
              icon: DollarSign,
            },
            {
              title: 'Send Emails',
              desc: '"Send a follow-up email to all contacts in the Negotiation stage"',
              icon: Mail,
            },
            {
              title: 'Create Tasks',
              desc: '"Create a follow-up task for [contact] in 3 days"',
              icon: CheckSquare,
            },
            {
              title: 'Search & Filter',
              desc: '"Find all leads created this week in the Cold stage"',
              icon: Zap,
            },
            {
              title: 'Bulk Operations',
              desc: '"Update all contacts with tag " webinar" to stage "Hot Lead""',
              icon: ArrowRight,
            },
          ].map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="card" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--accent-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    <Icon size={13} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{cap.title}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{cap.desc}"
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Do I need a GHL account?" a="Yes. GoHighLevel is a separate SaaS product. You need an active GHL account (Agency or Starter plan) to use this integration. GHL offers a 14-day free trial if you want to test it first." />
        <FaqItem q="What's the difference between Location ID and API Key?" a="The Location ID identifies which GHL location (workspace) to use — important if you manage multiple clients. The API Key is your authentication token that grants access to that location. Both are required." />
        <FaqItem q="Can the agent access all contacts or just a specific pipeline?" a="The agent can access everything your API key scopes allow. If you scope it to specific pipelines or tags, the agent respects those boundaries." />
        <FaqItem q="Can the agent send SMS through GHL?" a="Yes, if your GHL account has SMS enabled and you include the 'sms' scope when creating the API key. SMS costs in GHL apply separately." />
        <FaqItem q="What happens if my GHL API key expires?" a="GHL API keys don't expire unless you revoke them. If your agent stops being able to access GHL, check that the key hasn't been deleted in GHL → Settings → API." />
      </div>
    </DocsLayout>
  );
}
