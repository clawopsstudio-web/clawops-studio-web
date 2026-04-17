'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Server, MessageSquare, Globe, Code, FolderOpen,
  Terminal, Mail, ChevronDown, ChevronUp, Zap,
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

export default function OpenClawDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>OpenClaw</span>
      </div>

      <h1 className="doc-h1">OpenClaw AI Agent OS</h1>
      <p className="doc-lead">
        OpenClaw is the AI agent operating system that powers your ClawOps workspace.
        It runs directly on your VPS — not in the cloud, not in a sandbox — giving your agents
        persistent memory, file access, code execution, and real-world tool connectivity.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: Server, label: 'Runs on Your VPS', desc: 'Self-hosted, persistent, always-on' },
            { icon: MessageSquare, label: 'Multiple Interfaces', desc: 'Telegram, dashboard, Discord' },
            { icon: Globe, label: 'Web Browsing', desc: 'Research, scrape, interact' },
            { icon: Code, label: 'Code Execution', desc: 'Write, run, and iterate code' },
            { icon: FolderOpen, label: 'File Management', desc: 'Read, write, organize files' },
            { icon: Mail, label: 'Email & APIs', desc: 'Send emails and call APIs' },
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

      {/* What is OpenClaw */}
      <div className="doc-section">
        <div className="doc-section-title">What is OpenClaw?</div>
        <p className="doc-step-desc">
          OpenClaw is an open-source AI agent runtime. Unlike cloud-based AI services (ChatGPT API,
          Claude API, etc.) that run stateless queries, OpenClaw gives your AI agent a{' '}
          <strong>permanent home on your VPS</strong>. Think of it as installing an employee
          on your server — one who never sleeps, has full file access, and can interact with the
          internet, your code, your database, and your tools.
        </p>
        <p className="doc-step-desc">
          Your agent has long-term memory (stored in files, not session context), persistent
          sessions (stays logged into websites), and can run background tasks. It connects to
          everything via the <strong>Gateway</strong> — the secure hub all agents use to access tools.
        </p>
        <div className="doc-tip">
          <Zap size={13} />
          <span>
            <strong>Key difference:</strong> Most AI tools process a prompt and forget.
            OpenClaw agents remember everything, build knowledge over time, and operate autonomously.
          </span>
        </div>
      </div>

      <div className="doc-divider" />

      {/* How it runs */}
      <div className="doc-section">
        <div className="doc-section-title">How OpenClaw Runs on Your VPS</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">The Gateway — Central Hub</div>
            <div className="doc-step-desc">
              OpenClaw runs as a <strong>Gateway service</strong> on your VPS at port{' '}
              <span className="doc-inline-code">18789</span>. This is the secure entry point that all
              AI agents connect through. The Gateway exposes tools to agents — file management,
              web browsing, code execution, API calls, and database queries all flow through it.
            </div>
            <p className="doc-step-desc">
              The Gateway is accessible via <strong>Tailscale</strong> (secure VPN) only —
              not exposed publicly to the internet. This means only you and your authorized
              connections can reach it.
            </p>
            {/* screenshot: gateway-architecture-diagram.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">The Agent — Your AI Employee</div>
            <div className="doc-step-desc">
              Your main AI agent (called <strong>ZeroClaw</strong>) connects to the Gateway and
              waits for instructions. It's powered by a large language model (GPT-4o, Claude,
              Gemini, or OpenRouter) and has access to all Gateway tools.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Persistent memory</strong> — context and files survive restarts</li>
              <li><strong>Skill-loaded</strong> — specialized capabilities (SEO, sales, etc.)</li>
              <li><strong>Tool-connected</strong> — MCP servers, browser, email, database</li>
              <li><strong>Team-capable</strong> — can spawn temporary workers for parallel tasks</li>
            </ul>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">How to Talk to Your Agent</div>
            <div className="doc-step-desc">
              You can chat with your agent through three channels:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
              {[
                {
                  icon: MessageSquare,
                  title: 'Telegram (Recommended)',
                  desc: 'Send messages, voice notes, and photos directly to your agent via a Telegram bot. Best for mobile and quick check-ins. Set up via Account → Integrations → Telegram.',
                },
                {
                  icon: Globe,
                  title: 'Dashboard Chat',
                  desc: 'The chat panel in the ClawOps dashboard. Best for structured tasks, file management, and when you need to see tool outputs inline. Accessible at app.clawops.io.',
                },
                {
                  icon: Globe,
                  title: 'Discord',
                  desc: 'Invite your agent to a Discord server. Works like a team member — @mention the bot to give it tasks. Set up via Account → Integrations → Discord.',
                },
              ].map((ch) => {
                const Icon = ch.icon;
                return (
                  <div key={ch.title} className="card" style={{ padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{ch.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{ch.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* screenshot: agent-chat-interfaces.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* What agents can do */}
      <div className="doc-section">
        <div className="doc-section-title">What Can Your Agent Do?</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { icon: Globe, title: 'Browse & Research', items: ['Visit any website', 'Read articles and extract data', 'Fill forms and submit', 'Take screenshots'] },
            { icon: Code, title: 'Code & Build', items: ['Write code in any language', 'Run scripts and commands', 'Debug and fix errors', 'Deploy to servers'] },
            { icon: FolderOpen, title: 'Manage Files', items: ['Read and write files', 'Organize folders', 'Backup and sync', 'Upload and download'] },
            { icon: Terminal, title: 'Run Commands', items: ['Execute shell commands', 'Manage services', 'Install packages', 'Monitor system health'] },
            { icon: Mail, title: 'Email & APIs', items: ['Send emails on your behalf', 'Call REST APIs', 'Connect to webhooks', 'Automate outreach'] },
            { icon: Server, title: 'Database', items: ['Query databases', 'Update records', 'Generate reports', 'Sync data across tools'] },
          ].map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <Icon size={14} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{cap.title}</div>
                </div>
                <ul style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.9, paddingLeft: 16 }}>
                  {cap.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* Gateway explained */}
      <div className="doc-section">
        <div className="doc-section-title">The Gateway Explained</div>
        <p className="doc-step-desc">
          The <strong>Gateway</strong> (port <span className="doc-inline-code">18789</span>) is
          the secure middleware layer between your AI agents and their tools. Every agent
          connects through it — this is how the agent gets file access, browser control,
          and API capabilities.
        </p>
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Agents Connect via the Gateway</div>
            <div className="doc-step-desc">
              When your AI agent starts up, it connects to{' '}
              <span className="doc-inline-code">http://localhost:18789</span>.
              The Gateway authenticates the agent and loads its configured skills, tools, and memory.
              All tool calls from the agent go through this connection.
            </div>
          </div>
        </div>
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Gateway Tools</div>
            <div className="doc-step-desc">The Gateway exposes these tool categories to agents:</div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>File management</strong> — read, write, delete, move files on the VPS</li>
              <li><strong>Web browsing</strong> — visit pages, scrape content, interact with forms</li>
              <li><strong>Code execution</strong> — run shell commands, scripts, build tools</li>
              <li><strong>API calls</strong> — make HTTP requests to any external service</li>
              <li><strong>Database queries</strong> — connect to MySQL, PostgreSQL, MongoDB, etc.</li>
              <li><strong>Plugin tools</strong> — MCP servers add additional capabilities</li>
            </ul>
          </div>
        </div>
        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Monitor Gateway Health</div>
            <div className="doc-step-desc">
              You can monitor the Gateway from the dashboard's <strong>My Tools</strong> section.
              Click <strong>Gateway</strong> to see: active agents, tool usage stats, recent
              tool calls, error logs, and connection status.
            </div>
            <p className="doc-step-desc">
              A healthy Gateway shows <span className="doc-badge">Online</span> with all
              configured tools listed. If a tool is failing, its status will show{' '}
              <span className="doc-badge" style={{ background: 'rgba(255,100,100,0.12)', color: '#FF6464' }}>Error</span>.
            </p>
            {/* screenshot: gateway-health-dashboard.png */}
          </div>
        </div>
        <div className="doc-warning">
          <Server size={13} />
          <span>
            <strong>Security:</strong> The Gateway only accepts connections from localhost and
            your Tailscale network. Never expose port 18789 to the public internet.
          </span>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Is OpenClaw cloud-based or self-hosted?" a="OpenClaw is self-hosted. It runs as a service on your VPS (Contabo or similar). Your data stays on your server — the AI model calls go to OpenAI/Anthropic's API, but the agent runtime, memory, and tools are all on your machine." />
        <FaqItem q="What happens if my VPS restarts?" a="OpenClaw runs as a systemd service and restarts automatically after a VPS reboot. Your agents will reconnect and resume with their persistent memory intact. Tool connections (browser sessions, API keys) are also preserved." />
        <FaqItem q="Can multiple agents use the Gateway at once?" a="Yes. The Gateway supports concurrent agent connections. You can run one main agent (ZeroClaw), a manager agent (Hermes), and multiple spawned workers — all simultaneously through the same Gateway." />
        <FaqItem q="How do I know if my agent is running?" a="Check the status indicator next to your workspace name in the dashboard top bar. Green = active, yellow = idle, red = error. You can also check from My Tools → Gateway." />
        <FaqItem q="Can I use OpenClaw without Telegram?" a="Absolutely. Telegram is optional. You can use the dashboard chat exclusively, connect via Discord, or use the OpenClaw CLI directly on the VPS." />
        <FaqItem q="What's the difference between the Gateway and the agent?" a="The Gateway is the infrastructure layer — the secure hub that exposes tools. The agent is the AI brain that decides what to do and uses Gateway tools to do it. You can swap the AI model powering the agent without changing the Gateway." />
      </div>
    </DocsLayout>
  );
}
