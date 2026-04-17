'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Server, Plug, Globe, Database, Code,
  Activity, ChevronDown, ChevronUp, CheckCircle, AlertTriangle,
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

export default function GatewayDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Gateway</span>
      </div>

      <h1 className="doc-h1">OpenClaw Gateway</h1>
      <p className="doc-lead">
        The Gateway is the secure hub that connects your AI agents to their tools.
        All agents — your main employee, spawned workers, and manager agents — connect
        through the Gateway to access files, browse the web, run code, and query databases.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: Server, label: 'Central Hub', desc: 'All agents connect via one gateway' },
            { icon: Plug, label: 'Tool Routing', desc: 'Routes tool calls to the right service' },
            { icon: Globe, label: 'Web Access', desc: 'Gives agents internet browsing capability' },
            { icon: Database, label: 'Database Queries', desc: 'Connect to MySQL, PostgreSQL, MongoDB' },
            { icon: Code, label: 'Code Execution', desc: 'Run scripts and shell commands' },
            { icon: Activity, label: 'Health Monitoring', desc: 'Real-time gateway status and logs' },
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

      {/* What is the gateway */}
      <div className="doc-section">
        <div className="doc-section-title">What is the Gateway?</div>
        <p className="doc-step-desc">
          The <strong>Gateway</strong> is a local service running on your VPS at port{' '}
          <span className="doc-inline-code">18789</span>. It acts as a secure intermediary
          between your AI agents and their capabilities. Instead of each agent managing its own
          file access, browser control, and API connections, they all go through the Gateway.
        </p>
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Single Entry Point</div>
            <div className="doc-step-desc">
              All tool calls from all agents flow through{' '}
              <span className="doc-inline-code">localhost:18789</span>. This means:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>One place to monitor</strong> — see all agent activity in one dashboard</li>
              <li><strong>One place to secure</strong> — gateway access = all tool access</li>
              <li><strong>One place to debug</strong> — gateway logs show every tool call</li>
              <li><strong>Consistent permissions</strong> — skills and tools are gateway-level, not per-agent</li>
            </ul>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">How Agents Connect</div>
            <div className="doc-step-desc">
              When an agent starts up, it connects to the Gateway via WebSocket:
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', lineHeight: 1.7, marginBottom: 10 }}>
              Agent starts → Gateway:18789 → Authenticate → Load Skills → Load Tools → Ready
            </div>
            <p className="doc-step-desc">
              The agent sends tool requests to the Gateway (e.g., "read this file", "browse this URL").
              The Gateway executes the tool and returns the result. Agents never access
              tools directly — only through the Gateway.
            </p>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Gateway Tools */}
      <div className="doc-section">
        <div className="doc-section-title">Gateway Tools — What Agents Can Do</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              icon: Database,
              title: 'File Management',
              desc: 'Read, write, copy, move, and delete files on the VPS. Browse directory structures, search for files, and manage uploads/downloads.',
              examples: ['Read /workspace/data/leads.csv', 'Write report to /workspace/output/', 'Search for *.pdf files'],
            },
            {
              icon: Globe,
              title: 'Web Browsing',
              desc: 'Visit web pages, scrape content, take screenshots, fill forms, and interact with web apps. Powered by Chrome VNC and camoufox.',
              examples: ['"Go to linkedin.com and find the CEO of Acme Corp"', '"Take a screenshot of the current page"', '"Extract all email addresses from this page"'],
            },
            {
              icon: Code,
              title: 'Code Execution',
              desc: 'Run shell commands, execute scripts in any language (Python, Node.js, Bash), install packages, and manage processes.',
              examples: ['Run a Python data processing script', 'Install npm packages', 'Query a database directly with SQL'],
            },
            {
              icon: Server,
              title: 'API Calls',
              desc: 'Make HTTP requests to any REST or GraphQL API. Agents can call external services directly without a separate integration.',
              examples: ['POST to a webhook with lead data', 'GET from a CRM API', 'Send data to a spreadsheet'],
            },
            {
              icon: Database,
              title: 'Database Queries',
              desc: 'Connect to MySQL, PostgreSQL, MongoDB, or any database. Read, write, and query data. Generate reports directly from live data.',
              examples: ['"Find all leads created this week"', '"Update contact status to won"', '"Generate a pipeline revenue report"'],
            },
            {
              icon: Plug,
              title: 'Plugin Tools (MCP)',
              desc: 'MCP servers registered with the Gateway add specialized tools. Each skill or MCP server can expose multiple tools to agents.',
              examples: ['Composio: post to Twitter', 'GitHub MCP: create an issue', 'Browser MCP: take screenshot'],
            },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.title} className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    <Icon size={15} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{tool.title}</div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{tool.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {tool.examples.map((ex) => (
                    <div key={ex} style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 4, padding: '5px 10px', lineHeight: 1.4 }}>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* Monitor Health */}
      <div className="doc-section">
        <div className="doc-section-title">Monitoring Gateway Health</div>
        <p className="doc-step-desc">
          Go to <strong>My Tools → Gateway</strong> in the dashboard to monitor
          the Gateway's status, active connections, and recent activity.
        </p>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Check Gateway Status</div>
            <div className="doc-step-desc">
              The Gateway panel shows a real-time status card:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
              {[
                { label: 'Online', color: '#34D058', bg: 'rgba(52,208,88,0.12)', desc: 'Gateway is running and accepting connections' },
                { label: 'Degraded', color: '#FFC857', bg: 'rgba(255,200,87,0.12)', desc: 'Running but some tools are unavailable' },
                { label: 'Offline', color: '#FF6464', bg: 'rgba(255,100,100,0.12)', desc: 'Gateway is not responding — check service status' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 99, background: s.bg, border: '1px solid var(--separator)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.label}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>— {s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">View Active Agents</div>
            <div className="doc-step-desc">
              The <strong>Active Agents</strong> section lists every agent currently
              connected to the Gateway — including their name, role, current task,
              and how long they've been connected.
            </div>
            <p className="doc-step-desc">
              This helps you track multi-agent workloads and identify any agents
              that have gone idle or stalled.
            </p>
            {/* screenshot: gateway-active-agents.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">View Recent Tool Calls</div>
            <div className="doc-step-desc">
              The <strong>Activity Log</strong> shows every recent tool call across all agents:
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '10px 14px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 10 }}>
              14:23:01  zeroclaw@gateway  file.read  /workspace/leads.csv  ✓<br />
              14:23:03  zeroclaw@gateway  http.post  api.webhook.io/leads  ✓<br />
              14:23:05  worker-1@gateway  browser.screenshot  linkedin.com/profile  ✓<br />
              14:23:07  zeroclaw@gateway  db.query  SELECT * FROM contacts  ✗ (timeout)
            </div>
            <p className="doc-step-desc">
              Each entry shows: timestamp, agent name, tool name, parameters, and result.
              Failed calls are highlighted in red with the error message.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Restart the Gateway</div>
            <div className="doc-step-desc">
              If the Gateway is unresponsive, restart it from the VPS:
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', lineHeight: 1.7, marginBottom: 10 }}>
              sudo systemctl restart openclaw-gateway
            </div>
            <p className="doc-step-desc">
              Or from the dashboard: My Tools → Gateway → Restart.
              Agents will reconnect automatically within ~10 seconds.
            </p>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Is the Gateway accessible from the internet?" a="No. The Gateway runs on localhost only (port 18789) and is accessible via Tailscale VPN. It is not exposed to the public internet. Only you (via Tailscale or SSH) can access it directly." />
        <FaqItem q="What happens if the Gateway goes down?" a="Agents lose their tool access but continue running. They'll queue tool requests until the Gateway comes back online. When the Gateway restarts, agents reconnect automatically and resume." />
        <FaqItem q="Can I run the Gateway without a skill or tool?" a="Yes. The Gateway exposes built-in tools (file management, code execution, web browsing) without any additional setup. Skills and MCP servers add more tools on top of these." />
        <FaqItem q="How do I add a new tool to the Gateway?" a="Install a skill (Skills page) or enable an MCP server (Tools page). Both automatically register their tools with the Gateway and make them available to all agents." />
        <FaqItem q="What's the difference between a tool and a skill?" a="A tool is a runtime capability — something the agent can do (browse, query DB, post to Twitter). A skill is a knowledge/instruction layer — it tells the agent how to use tools well in a specific domain (SEO, sales, content). Tools are the means; skills are the expertise." />
      </div>
    </DocsLayout>
  );
}
