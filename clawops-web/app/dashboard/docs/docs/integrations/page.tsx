'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import Link from 'next/link';
import {
  BookOpen, Plug, Zap, ArrowRight, ChevronDown, ChevronUp,
  Workflow, Users, Share2, Monitor, ExternalLink, Key, CheckCircle, AlertTriangle,
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

const INTEGRATIONS = [
  {
    title: 'n8n Workflows',
    desc: 'Open the visual workflow builder. Automate any process with 300+ app integrations.',
    href: '#n8n',
    color: '#CC6FF0',
    bg: 'rgba(204,111,240,0.1)',
    icon: Workflow,
    difficulty: 'Advanced',
    tags: ['Automation', 'Webhooks', '300+ Apps'],
  },
  {
    title: 'GoHighLevel (GHL)',
    desc: 'Connect your GHL CRM. Agent manages contacts, pipeline, emails, and tasks automatically.',
    href: '#ghl',
    color: '#34D058',
    bg: 'rgba(52,208,88,0.1)',
    icon: Users,
    difficulty: 'Intermediate',
    tags: ['CRM', 'Sales', 'Email', 'Pipeline'],
  },
  {
    title: 'Composio',
    desc: 'Connect Twitter, LinkedIn, and Instagram. Your agent posts, schedules, and auto-replies.',
    href: '#composio',
    color: '#5B6CFF',
    bg: 'rgba(91,108,255,0.12)',
    icon: Share2,
    difficulty: 'Easy',
    tags: ['Social Media', 'Twitter', 'LinkedIn', 'Instagram'],
  },
  {
    title: 'Browser Automation',
    desc: 'Use Chrome VNC and camoufox for visual browsing, scraping, and stealth form automation.',
    href: '/dashboard/docs/browser',
    color: '#FFC857',
    bg: 'rgba(255,200,87,0.1)',
    icon: Monitor,
    difficulty: 'Easy',
    tags: ['Scraping', 'Forms', 'Login', 'VNC'],
  },
];

export default function IntegrationsDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Integrations</span>
      </div>

      <h1 className="doc-h1">Integrations</h1>
      <p className="doc-lead">
        Connect your favorite tools and platforms to extend what your AI agent can do.
        From social media to CRMs to workflow automation — integrations unlock real-world
        capabilities for your agent. Most integrations take under 15 minutes to set up.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">All Integrations</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {INTEGRATIONS.map((int) => {
            const Icon = int.icon;
            return (
              <a key={int.href} href={int.href} className="doc-card" style={{ padding: '18px 20px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: int.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} style={{ color: int.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{int.title}</div>
                      <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 600, background: int.bg, color: int.color }}>{int.difficulty}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{int.desc}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {int.tags.map((tag) => (
                        <span key={tag} style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, background: 'var(--fill-secondary)', color: 'var(--text-tertiary)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-quaternary)', flexShrink: 0 }}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* ─────────────────────────────────────────── */}
      {/* n8n Section */}
      {/* ─────────────────────────────────────────── */}
      <div className="doc-section" id="n8n">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(204,111,240,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Workflow size={16} style={{ color: '#CC6FF0' }} />
          </div>
          <div>
            <h2 className="doc-h1" style={{ fontSize: 22, marginBottom: 0 }}>n8n Workflow Automation</h2>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Visual workflow builder — 300+ app integrations</p>
          </div>
        </div>

        {/* What is n8n */}
        <div style={{ background: 'rgba(204,111,240,0.06)', border: '1px solid rgba(204,111,240,0.2)', borderRadius: 10, padding: '16px', marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong style={{ color: 'var(--text-primary)' }}>n8n</strong> is a powerful visual workflow automation tool that connects 300+ apps and services.
            It runs on your VPS and is accessible via the dashboard. Think of it as Zapier, but self-hosted, free, and
            with full control. Your AI agent can trigger workflows via webhooks, and workflows can send data back to your agent.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Free self-hosted', '300+ integrations', 'Visual builder', 'Webhook triggers', 'AI agent connectable', 'No-code'].map((f) => (
              <span key={f} style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: 'rgba(204,111,240,0.12)', color: '#CC6FF0' }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Step-by-step */}
        <div className="doc-section-title">Step-by-Step Setup</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Open n8n from the Dashboard</div>
            <div className="doc-step-desc">
              The fastest way to open n8n is directly from the ClawOps dashboard. No login required — you're already authenticated.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Open the ClawOps dashboard at <span className="doc-inline-code">app.clawops.io</span></li>
              <li>Click <strong>Dashboard → Integrations → Open N8n</strong></li>
              <li>n8n opens in a <strong>new browser tab</strong></li>
              <li>You're already logged in — no credentials needed</li>
            </ol>
            <p className="doc-step-desc">
              Alternatively, access n8n directly at:{' '}
              <span className="doc-inline-code">http://localhost:5678</span> (on the VPS) or via Tailscale at{' '}
              <span className="doc-inline-code">https://vmi3094584-1.tailec7a72.ts.net/n8n/</span>
            </p>
            /* screenshot: integrations-n8n-open.png */
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Build Your First Workflow</div>
            <div className="doc-step-desc">
              In n8n, workflows are built visually as a graph of connected nodes. Each node does one thing (fetch data, send email, call an API).
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>+ New Workflow</strong> in the top-left of n8n</li>
              <li>Search the node panel on the left for a trigger node (e.g., "Webhook", "Schedule", "Email Trigger")</li>
              <li>Drag the node onto the canvas</li>
              <li>Click the node and configure its settings in the right panel</li>
              <li>Add more nodes by searching and dragging — connect them by dragging from one node's output arrow to another's input</li>
              <li>Click <strong>Test Workflow</strong> to run it with sample data</li>
              <li>Click <strong>Save</strong> when it works</li>
            </ol>
            <div className="doc-tip">
              <Zap size={13} />
              <span>
                <strong>Pro tip:</strong> Start with the <strong>Webhook</strong> node as your trigger. Each webhook node gives you a unique URL that the AI agent can call to trigger the workflow.
              </span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect Your AI Agent via Webhook</div>
            <div className="doc-step-desc">
              The most powerful integration: your AI agent calls a webhook URL to trigger n8n workflows, passing data as JSON.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In n8n, add a <strong>Webhook</strong> node as the trigger</li>
              <li>Set the HTTP Method to <strong>POST</strong></li>
              <li>Click <strong>Save</strong> — n8n shows you the webhook URL (e.g., <span className="doc-inline-code">https://vmi.../webhook/abc123</span>)</li>
              <li>Copy the webhook URL</li>
              <li>Tell your agent: <span className="doc-inline-code">Call the n8n onboarding workflow with contact email: user@example.com</span></li>
              <li>The agent calls the webhook, n8n processes the data, and returns a response</li>
            </ol>
            <div className="doc-tip">
              <CheckCircle size={13} />
              <span>
                <strong>Example:</strong> When a new GHL contact is created → agent calls n8n webhook → n8n sends a welcome email via SendGrid → agent confirms to you in chat.
              </span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Run Workflows from the Dashboard</div>
            <div className="doc-step-desc">
              Once workflows are saved in n8n, you can trigger them directly from the ClawOps dashboard without writing any prompts.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Open <strong>Integrations → n8n</strong> in the dashboard</li>
              <li>You'll see a list of all your saved workflows</li>
              <li>Click <strong>▶ Run</strong> next to any workflow to trigger it immediately</li>
              <li>Optionally pass parameters (e.g., email, date, contact ID)</li>
              <li>View run history and results in the n8n panel</li>
            </ol>
            <p className="doc-step-desc">
              You can also run workflows via the chat:{' '}
              <span className="doc-inline-code">@agent run the onboarding workflow for newuser@company.com</span>
            </p>
            /* screenshot: integrations-n8n-run-from-dashboard.png */
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* ─────────────────────────────────────────── */}
      {/* GHL Section */}
      {/* ─────────────────────────────────────────── */}
      <div className="doc-section" id="ghl">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(52,208,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={16} style={{ color: '#34D058' }} />
          </div>
          <div>
            <h2 className="doc-h1" style={{ fontSize: 22, marginBottom: 0 }}>GoHighLevel (GHL)</h2>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Connect your GHL CRM — contacts, deals, pipeline, and tasks</p>
          </div>
        </div>

        <div style={{ background: 'rgba(52,208,88,0.06)', border: '1px solid rgba(52,208,88,0.2)', borderRadius: 10, padding: '16px', marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong style={{ color: 'var(--text-primary)' }}>GoHighLevel</strong> is an all-in-one CRM, marketing automation, and sales platform used by agencies worldwide.
            Connecting GHL to ClawOps lets your AI agent read and write contacts, manage deals through your pipeline, send emails, create tasks,
            and sync data automatically.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['CRM Sync', 'Contact Import', 'Deal Management', 'Email Automation', 'Task Creation', 'Pipeline View'].map((f) => (
              <span key={f} style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: 'rgba(52,208,88,0.1)', color: '#34D058' }}>{f}</span>
            ))}
          </div>
        </div>

        <div className="doc-section-title">Step-by-Step Setup</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Get Your GHL Location ID</div>
            <div className="doc-step-desc">
              Your GHL <strong>Location ID</strong> identifies which GHL account/location you want to connect.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Log in to GHL at <span className="doc-inline-code">app.gohighlevel.com</span></li>
              <li>In the top bar, click <strong>Settings</strong></li>
              <li>Click <strong>Business Info</strong> in the left sidebar</li>
              <li>Copy the <strong>Location ID</strong> shown at the top (a long alphanumeric string)</li>
              <li>Keep this tab open — you'll paste this into ClawOps</li>
            </ol>
            /* screenshot: ghl-location-id.png */
            <div className="doc-warning">
              <AlertTriangle size={13} />
              <span>Make sure you're on the correct GHL location. If you manage multiple locations, each has its own Location ID — choose the one you want to sync.</span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Create Your GHL API Key</div>
            <div className="doc-step-desc">
              The API key grants ClawOps read/write access to your GHL account.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In GHL, go to <strong>Settings → API Keys</strong></li>
              <li>Click <strong>+ Create API Key</strong></li>
              <li>Give it a name: <span className="doc-inline-code">ClawOps Agent</span></li>
              <li>Set permissions to <strong>Read/Write</strong></li>
              <li>Click <strong>Save</strong> — copy the generated key immediately (it won't be shown again)</li>
            </ol>
            <div className="doc-tip">
              <Key size={13} />
              <span>If the API key doesn't show read/write options, you may need to enable API access on your GHL plan. Agency plans have full API access.</span>
            </div>
            /* screenshot: ghl-api-key-create.png */
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Paste Credentials in ClawOps</div>
            <div className="doc-step-desc">
              Now connect GHL to your ClawOps workspace.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In ClawOps, go to <strong>Integrations → GHL</strong></li>
              <li>Find the <strong>Location ID</strong> field — paste your GHL Location ID</li>
              <li>Find the <strong>API Key</strong> field — paste your GHL API key</li>
              <li>Click <strong>Save & Connect</strong></li>
            </ol>
            /* screenshot: integrations-ghl-paste-credentials.png */
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connection Auto-Tested</div>
            <div className="doc-step-desc">
              When you click Save, ClawOps immediately tests the connection by making a test API call to GHL.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>✅ Success:</strong> Green "Connected" badge appears. Your GHL data is syncing.</li>
              <li><strong>❌ Failed:</strong> Error shown. Check: correct Location ID? valid API key? GHL plan supports API?</li>
            </ul>
            <p className="doc-step-desc">
              GHL contacts start syncing immediately — you'll see them appear in your <strong>CRM → Contacts</strong> tab within 5 minutes.
              New contacts sync every 15 minutes automatically.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">AI Agent Manages Your GHL CRM</div>
            <div className="doc-step-desc">
              Once connected, your AI agent can directly manage your GHL CRM. Examples:
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '12px 16px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 10 }}>
              @agent Add John Smith (john@acme.com) as a new contact in GHL with deal value $5,000{'\n'}
              <br />
              @agent Move the "Enterprise Plan" deal to Won stage{'\n'}
              <br />
              @agent Create a follow-up task for Sarah Chen due tomorrow{'\n'}
              <br />
              @agent Send a proposal email to the Nexus Inc contact
            </div>
            <p className="doc-step-desc">
              The agent executes these tasks directly via the GHL API and confirms the results in chat.
            </p>
            <div className="doc-tip">
              <CheckCircle size={13} />
              <span>You can also connect multiple GHL locations. After connecting the first, click "Add Another Location" in the GHL integration settings.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* ─────────────────────────────────────────── */}
      {/* Composio Section */}
      {/* ─────────────────────────────────────────── */}
      <div className="doc-section" id="composio">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(91,108,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Share2 size={16} style={{ color: '#5B6CFF' }} />
          </div>
          <div>
            <h2 className="doc-h1" style={{ fontSize: 22, marginBottom: 0 }}>Composio — Social Accounts</h2>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Connect Twitter, LinkedIn, Instagram — agent can post automatically</p>
          </div>
        </div>

        <div style={{ background: 'rgba(91,108,255,0.06)', border: '1px solid rgba(91,108,255,0.2)', borderRadius: 10, padding: '16px', marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Composio</strong> is the connection layer that links your social media accounts to ClawOps.
            Once connected, your AI agent can post content, schedule updates, auto-reply to comments, and track analytics —
            all without you touching a keyboard.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Twitter/X', 'LinkedIn', 'Instagram', 'Auto-Post', 'Schedule Posts', 'Analytics', 'Auto-Reply'].map((f) => (
              <span key={f} style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: 'rgba(91,108,255,0.1)', color: '#5B6CFF' }}>{f}</span>
            ))}
          </div>
        </div>

        <div className="doc-section-title">Step-by-Step Setup</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Sign Up for Composio</div>
            <div className="doc-step-desc">
              Composio is the free connection layer that powers social posting.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Open <span className="doc-inline-code">composio.dev</span> in your browser</li>
              <li>Click <strong>Sign Up</strong> in the top-right corner</li>
              <li>Use <strong>Continue with Google</strong> — it's the fastest option (takes 30 seconds)</li>
              <li>Accept the terms and verify your email (if prompted)</li>
              <li>You're in — the free plan gives you <strong>100 API credits/month</strong></li>
            </ol>
            <div className="doc-tip">
              <CheckCircle size={13} />
              <span>100 credits is enough for ~100 social actions/month on the free plan (post, like, comment = 1 credit each). Upgrade when you scale.</span>
            </div>
            /* screenshot: composio-signup.png */
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect Twitter (X)</div>
            <div className="doc-step-desc">
              In Composio, connect your Twitter/X account so the agent can post on your behalf.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In Composio, click <strong>Connected Accounts</strong> in the left sidebar</li>
              <li>Click <strong>+ Connect App</strong></li>
              <li>Search for and select <strong>Twitter</strong> (may also be labeled "X")</li>
              <li>Click <strong>Connect</strong></li>
              <li>A Twitter OAuth popup appears — click <strong>Authorize App</strong></li>
              <li>You're redirected back to Composio — Twitter shows as <span className="badge badge-green">Connected</span></li>
            </ol>
            /* screenshot: composio-connect-twitter.png */
            <div className="doc-warning">
              <AlertTriangle size={13} />
              <span>Your Twitter account must have 2FA enabled for Composio to connect. If you get an error, check your Twitter security settings.</span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect LinkedIn</div>
            <div className="doc-step-desc">
              Same process for LinkedIn — connect your professional account.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In Composio, go back to <strong>Connected Accounts</strong></li>
              <li>Click <strong>+ Connect App</strong></li>
              <li>Search for and select <strong>LinkedIn</strong></li>
              <li>Click <strong>Connect</strong></li>
              <li>Log in to LinkedIn in the popup and click <strong>Allow</strong></li>
              <li>LinkedIn shows as <span className="badge badge-green">Connected</span></li>
            </ol>
            <p className="doc-step-desc">
              You can also connect a <strong>Company Page</strong> on LinkedIn (not just your personal profile) —
              select "LinkedIn Pages" from the connect menu.
            </p>
            /* screenshot: composio-connect-linkedin.png */
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Get Your Composio API Key</div>
            <div className="doc-step-desc">
              The API key is what ClawOps uses to talk to Composio on your behalf.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In Composio, click <strong>Settings</strong> in the left sidebar (gear icon)</li>
              <li>Click <strong>API Keys</strong></li>
              <li>Click <strong>+ Generate New Key</strong></li>
              <li>Name it: <span className="doc-inline-code">ClawOps Agent</span></li>
              <li>Click <strong>Generate</strong></li>
              <li><strong>Copy the key immediately</strong> — Composio only shows it once</li>
            </ol>
            /* screenshot: composio-api-key.png */
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Paste API Key in ClawOps</div>
            <div className="doc-step-desc">
              Now connect Composio to your ClawOps workspace.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In ClawOps, go to <strong>Social</strong> in the sidebar</li>
              <li>Click <strong>Composio Settings</strong> (or go to Account → Composio API Key)</li>
              <li>Paste your Composio API key into the field</li>
              <li>Click <strong>Save</strong></li>
              <li>ClawOps validates the key — you'll see <span className="badge badge-green">Connected</span> status</li>
            </ol>
            /* screenshot: social-composio-key-paste.png */
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">6</div>
          <div className="doc-step-body">
            <div className="doc-step-title">AI Agent Posts on Your Behalf</div>
            <div className="doc-step-desc">
              Once everything is connected, your agent can post to Twitter and LinkedIn on command.
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '12px 16px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 10 }}>
              @agent Post this to Twitter: "Just launched our new AI agent workflow feature. Automate anything. 🚀"{'\n'}
              <br />
              @agent Post the same message to LinkedIn and Twitter simultaneously{'\n'}
              <br />
              @agent Schedule a LinkedIn post for tomorrow at 10 AM IST about our Q2 results{'\n'}
              <br />
              @agent Reply to all new comments on our latest Twitter post
            </div>
            <div className="doc-tip">
              <Zap size={13} />
              <span>The agent uses Composio credits for each action. Monitor your usage at composio.dev → Settings → Usage.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Quick access links */}
      <div className="doc-section">
        <div className="doc-section-title">Quick Access Links</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {[
            { name: 'n8n', url: 'https://vmi3094584-1.tailec7a72.ts.net/n8n/', note: 'Via Tailscale — auto-logged in' },
            { name: 'Composio', url: 'composio.dev', note: 'External — sign up free' },
            { name: 'GoHighLevel', url: 'app.gohighlevel.com', note: 'External — GHL platform' },
            { name: 'Smithery MCP', url: 'smithery.ai', note: 'Browse MCP servers' },
            { name: 'Chrome VNC', url: 'https://vmi3094584-1.tailec7a72.ts.net/chrome/', note: 'Shared visual browser' },
            { name: 'Gateway', url: 'http://localhost:18789', note: 'Internal — agent hub' },
          ].map((link) => (
            <div key={link.name} className="card" style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{link.name}</div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', marginBottom: 3, wordBreak: 'break-all' }}>{link.url}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{link.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Which integrations require paid subscriptions?" a="Composio is free up to 100 credits/month. GHL requires an active GHL Agency plan for API access. n8n is 100% free on your self-hosted VPS. Platform accounts (Twitter Blue, LinkedIn Premium) may have their own costs." />
        <FaqItem q="Can I connect multiple accounts per platform?" a="Yes. For Composio, you can connect multiple Twitter and LinkedIn accounts. For GHL, you can manage multiple locations with separate credentials." />
        <FaqItem q="How do I disconnect an integration?" a="Go to Account → Integrations in the ClawOps dashboard, find the integration, and click Disconnect. This removes the API keys but doesn't affect your data in the connected platform." />
        <FaqItem q="Can my AI agent use multiple integrations in one task?" a="Absolutely. The agent can chain integrations together — e.g., pull a GHL contact, research their company via web browsing, then post a personalized LinkedIn update." />
        <FaqItem q="Can I request a new integration?" a="Yes. Contact the ClawOps team with the integration you'd like. You can also browse Smithery.ai for MCP servers that add new capabilities to your agent." />
      </div>
    </DocsLayout>
  );
}
