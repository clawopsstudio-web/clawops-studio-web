'use client';

import { useState } from 'react';
import DocsLayout from '../docs-layout';
import {
  Zap, Cpu, Share2, ExternalLink, CheckCircle2, AlertTriangle,
  ChevronDown, ChevronUp, ArrowRight, Info, Send, MessageCircle, Hash, Bot, Smartphone, Key,
} from 'lucide-react';

// ── Accordion ──────────────────────────────────────────────────────────────────
function StepGroup({ title, steps, defaultOpen = true }: {
  title: string;
  steps: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: '1px solid var(--separator)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', background: 'var(--fill-secondary)', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'left',
        }}
      >
        {title}
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {open && (
        <ol style={{ margin: 0, padding: '12px 16px 12px 40px', background: 'var(--material-thin)' }}>
          {steps.map((step, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: i < steps.length - 1 ? 6 : 0 }}>
              {step}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ── Integration Card ────────────────────────────────────────────────────────────
function IntegrationCard({
  icon: Icon, iconColor, title, badge, badgeColor, description, steps,
  tips, important,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  steps: React.ReactNode;
  tips?: string[];
  important?: string[];
}) {
  return (
    <div style={{
      background: 'var(--material-regular)',
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 32,
    }}>
      {/* Card Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'var(--accent-fill)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={20} color={iconColor} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h2>
            {badge && (
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '2px 10px', borderRadius: 99,
                fontSize: 11, fontWeight: 600,
                background: badgeColor === 'green' ? 'rgba(34,197,94,0.12)' : badgeColor === 'blue' ? 'rgba(0,209,255,0.12)' : 'var(--accent-fill)',
                color: badgeColor === 'green' ? '#22c55e' : badgeColor === 'blue' ? 'var(--accent-secondary)' : 'var(--accent)',
              }}>
                {badge}
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{description}</p>
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-quaternary)', marginBottom: 14 }}>
          Setup Guide
        </div>
        {steps}
      </div>

      {/* Tips */}
      {tips && tips.length > 0 && (
        <div style={{ padding: '0 24px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tips.map((tip, i) => (
              <div key={i} className="doc-tip" style={{ marginBottom: 0 }}>
                <Info size={13} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Important Notes */}
      {important && important.length > 0 && (
        <div style={{ padding: '0 24px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {important.map((note, i) => (
              <div key={i} className="doc-warning" style={{ marginBottom: 0 }}>
                <AlertTriangle size={13} />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── n8n Section ─────────────────────────────────────────────────────────────────
function N8nSection() {
  return (
    <IntegrationCard
      icon={Zap}
      iconColor="var(--accent)"
      title="n8n Workflow Automation"
      badge="Popular"
      badgeColor="blue"
      description="Connect your AI agents to 400+ apps via n8n's visual workflow editor. Automate complex sequences, run tasks on schedules, and let AI agents control workflows end-to-end."
      steps={
        <ol style={{ margin: 0, padding: '4px 0 4px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            <><strong>Open n8n</strong> — click <span className="doc-inline-code">Open N8n</span> in the Integrations page. It opens at <span className="doc-inline-code">app.clawops.studio/{'{userId}'}/n8n</span></>,
            <><strong>No login needed</strong> — you're already authenticated via your ClawOps session. Jump straight into building.</>,
            <><strong>Build your first workflow</strong> — use the visual drag-and-drop editor. Start with a simple two-node flow and expand from there.</>,
            <><strong>Add triggers</strong> — configure a starting node: choose <span className="doc-inline-code">Webhook</span> (for API calls), <span className="doc-inline-code">Schedule</span> (recurring time-based), or <span className="doc-inline-code">AI Agent</span> (triggered by your ClawOps worker).</>,
            <><strong>Connect to AI agents</strong> — copy the Webhook URL from your n8n node and paste it into the AI agent task configuration. The agent calls this URL to trigger the workflow.</>,
            <><strong>Run manually or auto</strong> — click <span className="doc-inline-code">Test Workflow</span> to run it right now, or leave it running in the background. It executes on every trigger event.</>,
            <><strong>AI agents trigger workflows</strong> — your ClawOps worker can POST data to the webhook, passing context (contact info, social post content, task results) into your n8n flow automatically.</>,
          ].map((step, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{step}</span>
            </li>
          ))}
        </ol>
      }
      tips={[
        'n8n ships with 400+ pre-built app integrations — Salesforce, HubSpot, Google Sheets, Slack, and more.',
        'Use the AI Agent node to let Claude or OpenAI make decisions within your workflow.',
        'Workflows run on schedules even when you\'re offline. Set it and forget it.',
        'n8n supports error workflows — route failures to a notification channel automatically.',
      ]}
      important={[
        'If your workflow accesses external APIs (e.g. Notion, Google), make sure those credentials are stored in n8n Credentials, not hardcoded.',
        'For production workflows, use a persistent activation (turned on by default) rather than manual triggers.',
      ]}
    />
  );
}

// ── GHL Section ─────────────────────────────────────────────────────────────────
function GhlSection() {
  return (
    <IntegrationCard
      icon={Cpu}
      iconColor="#ff6b35"
      title="GoHighLevel CRM"
      badge="CRM"
      badgeColor="green"
      description="Sync your GHL account to let AI agents manage contacts, deals, pipeline stages, tasks, and email campaigns — directly from the ClawOps dashboard."
      steps={
        <>
          <StepGroup
            title="Step 1 — Get Your GHL Credentials"
            steps={[
              'Log into your GoHighLevel account at app.gohighlevel.com',
              'Navigate to Settings → API → API Keys',
              'Copy your Location ID from Settings → Business Info (each location has its own ID)',
              'Click Create New API Key — name it "ClawOps" and grant Read/Write permissions',
              'Copy the generated API Key — you\'ll paste it into the ClawOps dashboard next',
            ]}
          />
          <StepGroup
            title="Step 2 — Connect in ClawOps Dashboard"
            steps={[
              'Go to Integrations → GHL in the sidebar',
              'Paste your Location ID into the Location ID field',
              'Paste your API Key into the API Key field',
              'Click Save & Test Connection',
              'A success banner confirms your GHL account is live and authenticated',
            ]}
            defaultOpen={true}
          />
          <StepGroup
            title="Step 3 — Let Your AI Agent Go to Work"
            steps={[
              'Add contacts — "Add this lead to GHL CRM with their name, email, and source"',
              'Move deals — "Update the Acme deal to Won in pipeline Stage 3"',
              'Send emails — "Send a follow-up sequence email to everyone in the Hot lead stage"',
              'Create tasks — "Log a task to follow up with the Smith contact in 2 days"',
              'Manage pipeline — "Show me all deals stuck in the Negotiation stage"',
            ]}
            defaultOpen={false}
          />
        </>
      }
      tips={[
        'Each GHL location has a unique Location ID — if you manage multiple locations, connect each one separately.',
        'Start with sandbox/test mode credentials before connecting your production GHL account.',
        'The AI agent can run bulk operations — import 100 contacts from a CSV, update 50 deal statuses in one go.',
        'GHL\'s Tags and Custom Fields are fully accessible — reference them in natural language prompts.',
      ]}
      important={[
        'Your API Key must have Read/Write permissions. Keys with read-only access cannot create contacts or update deals.',
        'Always test in sandbox mode first — API writes to your live CRM are permanent unless undone manually.',
        'GHL rate limits apply: avoid triggering more than 60 API calls per minute in automations.',
      ]}
    />
  );
}

// ── Composio Section ───────────────────────────────────────────────────────────
function ComposioSection() {
  return (
    <IntegrationCard
      icon={Share2}
      iconColor="#7c3aed"
      title="Composio — Social Media Automation"
      badge="Free Tier"
      badgeColor="blue"
      description="Connect Twitter/X, LinkedIn, and Instagram via Composio. Your AI agent gains the ability to post, reply, schedule, and track engagement — all from simple chat commands."
      steps={
        <>
          <StepGroup
            title="Step 1 — Set Up Your Composio Account"
            steps={[
              'Visit composio.dev and sign up for free using your Gmail account',
              'In the Composio dashboard, click Connect App',
              'Search for Twitter/X — click Authorize and complete the OAuth flow',
              'Search for LinkedIn — click Authorize and grant page/profile permissions',
              'Search for Instagram — click Authorize (Instagram requires a Business or Creator account)',
              'Go to Settings → API Keys → copy your Composio API key',
            ]}
          />
          <StepGroup
            title="Step 2 — Connect Composio to ClawOps"
            steps={[
              'Back in the ClawOps dashboard, go to Social → Composio Settings',
              'Paste your Composio API Key into the API Key field',
              'Click Connect — the status indicator turns green on success',
              'Select which social accounts you want the AI agent to have access to',
              'Click Save — your agent is now authorized to post on your behalf',
            ]}
            defaultOpen={true}
          />
          <StepGroup
            title="Step 3 — Use It in Plain English"
            steps={[
              '"Post this to Twitter: Our new AI workflow automation is live — link in bio 🚀"',
              '"Schedule this LinkedIn post for tomorrow at 10 AM IST"',
              '"Reply to all comments on our latest Instagram post with a thank you DM"',
              '"Generate an engagement report for the last 7 days on Twitter"',
              '"Delete any comments containing spam on our Instagram post"',
            ]}
            defaultOpen={false}
          />
        </>
      }
      tips={[
        'Composio has a generous free tier — up to 100 API calls/month free, enough for moderate posting.',
        'AI-generated posts are drafted by the agent first. You can set an approval mode to review before publishing.',
        'Connect all three platforms to run cross-posting campaigns with platform-specific formatting.',
        'Composio also supports YouTube, Facebook, Reddit, and Google Business Profile.',
      ]}
      important={[
        'Instagram integration requires an Business or Creator account — personal accounts are not supported by Composio.',
        'AI posting with auto-reply is powerful but monitor it closely in the first week to ensure tone and content are correct.',
        'Composio API keys are scoped to your workspace — rotate them from composio.dev if you suspect exposure.',
      ]}
    />
  );
}

// ── Comparison Table ───────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows = [
    { feature: 'Workflow builder', n8n: '✅ Visual drag & drop', ghl: '❌ Native only', composio: '❌ External' },
    { feature: 'CRM contact sync', n8n: '✅ Via integrations', ghl: '✅ Native', composio: '❌ No' },
    { feature: 'Social posting', n8n: '✅ Via integrations', ghl: '✅ Built-in', composio: '✅ Native' },
    { feature: 'AI agent trigger', n8n: '✅ Webhook + AI Agent node', ghl: '✅ API + agent commands', composio: '✅ Agent commands' },
    { feature: 'Schedule automation', n8n: '✅ Cron/schedule nodes', ghl: '✅ Workflow triggers', composio: '✅ Via agent scheduling' },
    { feature: 'Offline execution', n8n: '✅ Runs 24/7', ghl: '✅ Cloud-only', composio: '✅ Cloud-only' },
    { feature: 'Cost', n8n: 'Free (self-hosted) / $20/mo cloud', ghl: '$39/mo starter', composio: 'Free tier available' },
  ];

  return (
    <div style={{ overflowX: 'auto', marginBottom: 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--separator)' }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--text-quaternary)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Feature</th>
            {['n8n', 'GoHighLevel', 'Composio'].map((h) => (
              <th key={h} style={{ textAlign: 'center', padding: '10px 14px', color: 'var(--text-quaternary)', fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--separator)' }}>
              <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{row.feature}</td>
              <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--text-primary)', fontSize: 12 }}>{row.n8n}</td>
              <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--text-primary)', fontSize: 12 }}>{row.ghl}</td>
              <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--text-primary)', fontSize: 12 }}>{row.composio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────────
export default function IntegrationsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Zap size={12} />
        <span>Platform</span>
        <ArrowRight size={10} style={{ color: 'var(--text-tertiary)' }} />
        <span>Integrations</span>
      </div>

      <h1 className="doc-h1">Integrations</h1>
      <p className="doc-lead">
        Connect ClawOps to the tools your business already runs. Each integration is set up once and
        unlocked across all AI agents — no code required.
      </p>

      {/* Integration Cards */}
      <N8nSection />
      <GhlSection />
      <ComposioSection />

      <div className="doc-divider" />

      {/* ── Channels & API Keys ── */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-quaternary)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--separator)' }}>
          Channels & API Keys
        </div>
      </div>

      {/* API Keys */}
      <div style={{ background: 'var(--material-regular)', border: '1px solid var(--separator)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'var(--accent-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Key size={17} color="var(--accent)" />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>API Keys</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Connect any external API — OpenAI, Gemini, Twitter, LinkedIn, ElevenLabs, and more.</p>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              <><strong>Get your API key</strong> from the provider's developer portal (OpenAI, Twitter/X, LinkedIn, etc.)</>,
              <><strong>Go to Settings → API Keys</strong> in the ClawOps dashboard</>,
              <><strong>Paste the key</strong> and give it a label (e.g., "Production – OpenAI")</>,
              <><strong>Click Save</strong> — the agent can now call that API directly via plain English prompts</>,
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>
        </div>
        <div style={{ padding: '0 24px 16px' }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'var(--accent-secondary-fill)', border: '1px solid rgba(0,209,255,0.2)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <Info size={13} style={{ color: 'var(--accent-secondary)', flexShrink: 0, marginTop: 1 }} />
            <span>API keys are encrypted at rest and never exposed in logs. Rotate keys from the provider's portal and update them in ClawOps Settings.</span>
          </div>
        </div>
      </div>

      {/* Telegram */}
      <div style={{ background: 'var(--material-regular)', border: '1px solid var(--separator)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(91,158,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={17} color="#229ED9" />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>Telegram Bot</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Fastest setup. Create a bot, paste the token, done — your agent is live 24/7.</p>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              <>Search <strong>@BotFather</strong> in Telegram → send <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>/newbot</code> → copy the bot token (e.g. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>123456789:ABCdef...</code>)</>,
              <><strong>Add to OpenClaw:</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>openclaw channels add telegram --token YOUR_BOT_TOKEN</code></>,
              <>Search your bot in Telegram → send <strong>/start</strong> → your AI agent responds instantly</>,
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>
        </div>
        <div style={{ padding: '0 24px 16px' }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'rgba(255,179,64,0.08)', border: '1px solid rgba(255,179,64,0.2)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <AlertTriangle size={13} style={{ color: '#ffb340', flexShrink: 0, marginTop: 1 }} />
            <span>Telegram bots cannot initiate conversations — users must message them first.</span>
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <div style={{ background: 'var(--material-regular)', border: '1px solid var(--separator)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(37,211,102,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Smartphone size={17} color="#25D366" />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>WhatsApp Business</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Connect WhatsApp Business API for reliable, branded customer messaging.</p>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              <><strong>Option A (recommended):</strong> Sign up at <strong>business.whatsapp.com</strong> → get Phone Number ID + Access Token from Meta Developer Console</>,
              <><strong>Add to OpenClaw:</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>openclaw channels add whatsapp --token ACCESS_TOKEN --phone-id PHONE_ID</code></>,
              <><strong>Option B:</strong> WhatsApp Web via Camoufox — unofficial but fast to set up for personal/business use</>,
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>
        </div>
        <div style={{ padding: '0 24px 16px' }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'rgba(255,179,64,0.08)', border: '1px solid rgba(255,179,64,0.2)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <AlertTriangle size={13} style={{ color: '#ffb340', flexShrink: 0, marginTop: 1 }} />
            <span>WhatsApp Business API requires Meta business verification (1-3 business days). Plan ahead for production deployments.</span>
          </div>
        </div>
      </div>

      {/* Discord */}
      <div style={{ background: 'var(--material-regular)', border: '1px solid var(--separator)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(88,101,242,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Hash size={17} color="#5865F2" />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>Discord Bot</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Add your AI agent as a Discord bot — responds to slash commands and channel mentions.</p>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              <>Go to <strong>discord.com/developers/applications</strong> → create app → Bot → copy the bot token</>,
              <>OAuth2 URL Generator → select scopes: <strong>bot + applications.commands</strong> → permissions: Send Messages + Read Message History → authorize in your server</>,
              <><strong>Add to OpenClaw:</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>openclaw channels add discord --token BOT_TOKEN --guild GUILD_ID</code></>,
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* n8n MCP */}
      <div style={{ background: 'var(--material-regular)', border: '1px solid var(--separator)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={17} color="#22c55e" />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>n8n MCP Server</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Expose n8n workflows as MCP tools — the AI agent calls them like native functions.</p>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              <><strong>Option A — MCP Server (recommended):</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>npm install -g @n8n/mcp</code> then <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>openclaw mcp add n8n --command n8n-mcp --args &quot;--url https://app.clawops.studio/n8n&quot;</code></>,
              <><strong>Option B — Webhooks:</strong> Add a Webhook trigger node in your n8n workflow → copy the URL → paste into ClawOps agent config</>,
              <><strong>Restart gateway:</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>openclaw gateway restart</code> → agent can now trigger any workflow via plain English</>,
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>
        </div>
        <div style={{ padding: '0 24px 16px' }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'var(--accent-secondary-fill)', border: '1px solid rgba(0,209,255,0.2)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <Info size={13} style={{ color: 'var(--accent-secondary)', flexShrink: 0, marginTop: 1 }} />
            <span>See the full step-by-step guide at <strong>Channels & API Keys</strong> documentation page for detailed n8n MCP setup with screenshots.</span>
          </div>
        </div>
      </div>

      {/* GHL MCP Skill */}
      <div style={{ background: 'var(--material-regular)', border: '1px solid var(--separator)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(255,107,53,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={17} color="#ff6b35" />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px' }}>GHL MCP Skill</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>The ghl-crm skill is pre-installed. Set your API key to unlock full CRM automation.</p>
          </div>
        </div>
        <div style={{ padding: '16px 24px' }}>
          <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              <><strong>Get credentials:</strong> GHL → Settings → API → create a Private Integration API key. Copy your Location ID from Settings → Business Info</>,
              <><strong>Set environment variables:</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>export GHL_API_KEY=&quot;your-private-integration-token&quot;</code> and <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 3, padding: '1px 5px', color: 'var(--accent-secondary)' }}>export GHL_LOCATION_ID=&quot;your-location-id&quot;</code></>,
              <><strong>Use from the agent:</strong> &quot;Search for contact john@example.com in GHL&quot; → &quot;Move the Acme deal to Won in pipeline Stage 3&quot; → &quot;Send an SMS to +15551234567&quot;</>,
            ].map((step, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</li>
            ))}
          </ol>
        </div>
        <div style={{ padding: '0 24px 16px' }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'rgba(255,179,64,0.08)', border: '1px solid rgba(255,179,64,0.2)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <AlertTriangle size={13} style={{ color: '#ffb340', flexShrink: 0, marginTop: 1 }} />
            <span>GHL API keys must have <strong>Read/Write permissions</strong>. Read-only keys cannot create contacts or update deals. Test in sandbox mode first.</span>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Comparison Table */}
      <div className="doc-section">
        <div className="doc-section-title">Integration Comparison</div>
        <div style={{
          background: 'var(--material-regular)',
          border: '1px solid var(--separator)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          <ComparisonTable />
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        {[
          {
            q: 'Can I use multiple integrations at the same time?',
            a: 'Absolutely. There\'s no conflict between n8n, GoHighLevel, and Composio — they complement each other. For example: Composio handles social posting, GHL manages the CRM, and n8n orchestrates the data flow between them.',
          },
          {
            q: 'Do I need paid accounts for these tools?',
            a: 'n8n has a free self-hosted option (you\'re already running it via ClawOps) and a free cloud tier with 100 executions. GHL requires a paid account ($39/mo starter). Composio has a free tier with 100 API calls/month.',
          },
          {
            q: 'How do I disconnect an integration?',
            a: 'Go to Integrations → [Service Name] → click Disconnect. This revokes API access immediately. Your data in the connected service (contacts in GHL, workflows in n8n) is unaffected.',
          },
          {
            q: 'Can I build custom integrations?',
            a: 'Yes. Use the n8n HTTP Request node to call any REST API. If you need a native ClawOps integration built, contact the team via the dashboard.',
          },
          {
            q: 'Where can I find my n8n webhook URL?',
            a: 'In n8n, open any workflow → click the starting node → copy the Webhook URL shown in the node panel. Paste this URL in the AI agent task configuration under Webhook Trigger.',
          },
        ].map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 10 }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--material-thin)',
              border: '1px solid var(--separator)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
              marginBottom: 0,
            }}>
              {q}
            </div>
            <div style={{
              padding: '10px 16px 12px',
              background: 'var(--material-regular)',
              border: '1px solid var(--separator)',
              borderTop: 'none',
              borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
              fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6,
            }}>
              {a}
            </div>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
}
