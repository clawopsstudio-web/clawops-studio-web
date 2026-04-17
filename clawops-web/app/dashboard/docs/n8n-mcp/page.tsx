'use client';

import { useState } from 'react';
import DocsLayout from '../docs-layout';
import {
  Zap, Play, ArrowRight, Info, AlertTriangle, CheckCircle2,
  ChevronDown, ChevronUp, Terminal, Globe, Webhook,
} from 'lucide-react';

// ── Step Group Accordion ───────────────────────────────────────────────────────
function StepGroup({ title, steps, defaultOpen = true }: {
  title: string;
  steps: React.ReactNode[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      marginBottom: 12,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'var(--fill-secondary)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-primary)',
          textAlign: 'left',
        }}
      >
        {title}
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {open && (
        <ol style={{ margin: 0, padding: '12px 16px 12px 40px', background: 'var(--material-thin)' }}>
          {steps.map((step, i) => (
            <li key={i} style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: i < steps.length - 1 ? 8 : 0,
            }}>
              {step}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ── Inline Code ────────────────────────────────────────────────────────────────
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      background: 'var(--code-bg)',
      border: '1px solid var(--separator)',
      borderRadius: 3,
      padding: '1px 6px',
      color: 'var(--accent-secondary)',
    }}>
      {children}
    </code>
  );
}

// ── Code Block ────────────────────────────────────────────────────────────────
function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      marginTop: 8,
      padding: '12px 16px',
      background: 'var(--code-bg)',
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--accent-secondary)',
      lineHeight: 1.6,
      overflowX: 'auto',
    }}>
      {children}
    </div>
  );
}

// ── Tip ────────────────────────────────────────────────────────────────────────
function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', gap: 10,
      padding: '10px 14px',
      background: 'var(--accent-secondary-fill)',
      border: '1px solid rgba(0,209,255,0.2)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 12,
      color: 'var(--text-secondary)',
      lineHeight: 1.5,
      marginTop: 12,
    }}>
      <Info size={13} style={{ color: 'var(--accent-secondary)', flexShrink: 0, marginTop: 1 }} />
      <span>{children}</span>
    </div>
  );
}

// ── Warning ───────────────────────────────────────────────────────────────────
function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', gap: 10,
      padding: '10px 14px',
      background: 'rgba(255,179,64,0.08)',
      border: '1px solid rgba(255,179,64,0.2)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 12,
      color: 'var(--text-secondary)',
      lineHeight: 1.5,
      marginTop: 12,
    }}>
      <AlertTriangle size={13} style={{ color: '#ffb340', flexShrink: 0, marginTop: 1 }} />
      <span>{children}</span>
    </div>
  );
}

// ── Flow Diagram ───────────────────────────────────────────────────────────────
function FlowDiagram() {
  const nodes = [
    { label: 'AI Agent', sub: 'OpenClaw', color: 'var(--accent)' },
    { label: 'MCP Request', sub: 'workflow trigger', color: 'var(--text-tertiary)' },
    { label: 'n8n Workflow', sub: 'automation', color: '#22c55e' },
    { label: '300+ Apps', sub: 'CRM, email, social...', color: '#a855f7' },
  ];

  return (
    <div style={{
      padding: '20px 24px',
      background: 'var(--material-thin)',
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-md)',
      marginBottom: 24,
      marginTop: 8,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-quaternary)', marginBottom: 16 }}>
        Architecture Flow
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
        {nodes.map((node, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '12px 16px',
              background: 'var(--material-regular)',
              border: `1px solid var(--separator)`,
              borderRadius: 'var(--radius-sm)',
              minWidth: 100,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: node.color }}>{node.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{node.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px', color: 'var(--text-quaternary)' }}>
                <ArrowRight size={14} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Workflow Option Card ───────────────────────────────────────────────────────
function WorkflowOptionCard({
  num,
  title,
  description,
  children,
}: {
  num: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      display: 'flex',
      gap: 16,
      marginBottom: 16,
      padding: '16px',
      background: 'var(--material-thin)',
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-sm)',
    }}>
      <div style={{
        flexShrink: 0,
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'var(--accent-fill)',
        color: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
      }}>
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>{description}</div>
        {children}
      </div>
    </div>
  );
}

// ── Example Workflow ────────────────────────────────────────────────────────────
function ExampleWorkflow({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div style={{
      padding: '14px 16px',
      background: 'var(--material-regular)',
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-sm)',
      marginTop: 8,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-quaternary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Example: {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--accent-fill)',
                color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
              }}>
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 16, background: 'var(--separator)', margin: '2px 0' }} />
              )}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', paddingBottom: i < steps.length - 1 ? 10 : 0, lineHeight: 1.5 }}>
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────────
export default function N8nMcpPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Zap size={12} />
        <span>Platform</span>
        <ArrowRight size={10} style={{ color: 'var(--text-tertiary)' }} />
        <span>n8n MCP</span>
      </div>

      <h1 className="doc-h1">n8n MCP Integration</h1>
      <p className="doc-lead">
        Connect your AI agents to n8n's visual workflow builder via the Model Context Protocol (MCP).
        Agents can trigger any n8n workflow on demand — enabling complex automations across 300+ apps
        without leaving the chat.
      </p>

      <FlowDiagram />

      {/* ── Two Integration Paths ── */}
      <div style={{
        background: 'var(--material-regular)',
        border: '1px solid var(--separator)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: 32,
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--separator)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
            Two Ways to Connect
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            Choose the option that fits your setup. Both routes give your AI agent full control over n8n workflows.
          </p>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <WorkflowOptionCard
            num="A"
            title="MCP Server (Recommended)"
            description="Install the @n8n/mcp npm package to expose n8n workflows as MCP tools. This gives OpenClaw native, structured access to all your workflows — no webhooks needed."
          >
            <CodeBlock>
              npm install -g @n8n/mcp
            </CodeBlock>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>
              Then register in OpenClaw: <Code>openclaw mcp add n8n --command n8n-mcp</Code>
            </div>
          </WorkflowOptionCard>

          <WorkflowOptionCard
            num="B"
            title="Webhook Trigger"
            description="If you prefer not to install MCP, use n8n's Webhook node as the bridge. Your AI agent calls the webhook URL to trigger any workflow. Works with any n8n instance — cloud or self-hosted."
          >
            <CodeBlock>
              POST https://your-n8n.com/webhook/your-workflow-id
            </CodeBlock>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8 }}>
              The AI agent sends a POST request with JSON payload. n8n receives it and executes the workflow.
            </div>
          </WorkflowOptionCard>
        </div>
      </div>

      {/* ── Step-by-Step Setup ── */}
      <div style={{
        background: 'var(--material-regular)',
        border: '1px solid var(--separator)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: 32,
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--separator)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Step-by-Step Setup
          </h2>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <StepGroup
            title="Step 1 — Enable HTTP Request Node in n8n"
            steps={[
              <>
                Open n8n and go to <strong>Settings → Nodes → HTTP Request</strong>.
                Make sure the node is enabled.
              </>,
              <>
                Enable the <strong>Webhook</strong> trigger node in your workflow
                (comes pre-installed in n8n).
              </>,
              <>
                Ensure your n8n instance is accessible from OpenClaw's server.
                For cloud n8n: webhooks work out of the box.
                For self-hosted: ensure the server is reachable via the configured URL.
              </>,
            ]}
          />

          <StepGroup
            title="Step 2 — Set Up Your n8n Workflow"
            defaultOpen={true}
            steps={[
              <>
                In n8n, create a new workflow or open an existing one.
              </>,
              <>
                Add a <strong>Webhook</strong> node as the first node (trigger).
                Set the HTTP method to <Code>POST</Code> and note the webhook path
                (e.g., <Code>/new-contact</Code>).
              </>,
              <>
                Add your automation steps — e.g., an HTTP Request to an external API,
                a Google Sheets node to write data, an email node to send a message.
              </>,
              <>
                Connect the nodes and save the workflow.
              </>,
              <>
                Copy the <strong>Webhook URL</strong> shown in the webhook node panel.
                It looks like:{' '}
                <Code>https://your-n8n.com/webhook/new-contact</Code>
              </>,
            ]}
          />

          <StepGroup
            title="Step 3 — Add to OpenClaw MCP Config"
            defaultOpen={true}
            steps={[
              <>
                <strong>Option A — MCP Server (recommended):</strong>
                <CodeBlock>
                  openclaw mcp add n8n --command n8n-mcp --args &quot;--url https://app.clawops.studio/n8n&quot;
                </CodeBlock>
                Or add to <Code>~/.config/openclaw/settings.json</Code>:
                <CodeBlock>
                  {`{
  &quot;mcpServers&quot;: {
    &quot;n8n&quot;: {
      &quot;command&quot;: &quot;n8n-mcp&quot;,
      &quot;args&quot;: [&quot;--url&quot;, &quot;https://app.clawops.studio/n8n&quot;]
    }
  }
}`}
                </CodeBlock>
              </>,
              <>
                <strong>Option B — Webhook URL in agent config:</strong>
                Add the webhook URL to your AI agent's task configuration
                in the ClawOps dashboard under <strong>Settings → MCP → n8n</strong>.
              </>,
              <>
                Restart the OpenClaw gateway to pick up the new MCP configuration:
                <CodeBlock>openclaw gateway restart</CodeBlock>
              </>,
            ]}
          />

          <StepGroup
            title="Step 4 — Verify the Connection"
            defaultOpen={false}
            steps={[
              <>
                Run a quick test from the OpenClaw CLI:
                <CodeBlock>
                  python3 ~/clawd/skills/n8n/scripts/n8n_api.py list-workflows --active true --pretty
                </CodeBlock>
                If your n8n workflows appear, the connection is working.
              </>,
              <>
                Alternatively, trigger a test workflow manually from n8n
                and check the execution history to confirm the AI agent's calls are arriving.
              </>,
              <>
                In the ClawOps dashboard, go to <strong>Integrations → n8n</strong>.
                You should see your workflow list and execution status.
              </>,
            ]}
          />

          <StepGroup
            title="Step 5 — Let Your AI Agent Run the Workflows"
            defaultOpen={false}
            steps={[
              <>
                Once connected, your AI agent can trigger any workflow on demand.
                Just describe it in plain English:
                <div style={{
                  marginTop: 8,
                  padding: '10px 14px',
                  background: 'var(--material-thin)',
                  border: '1px solid var(--separator)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                }}>
                  "Run the new-lead-workflow with this contact's name, email, and phone number"
                </div>
              </>,
              <>
                The agent formats the input as JSON and sends it to the n8n webhook URL.
                n8n executes the full automation chain.
              </>,
              <>
                Results (output from n8n) are returned to the AI agent as context for the next step.
              </>,
            ]}
          />
        </div>
      </div>

      {/* ── Example Workflows ── */}
      <div style={{
        background: 'var(--material-regular)',
        border: '1px solid var(--separator)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: 32,
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--separator)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
            Example Workflows
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            Popular workflows to trigger from your AI agent.
          </p>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <ExampleWorkflow
            title="New Contact → CRM + Email"
            steps={[
              'Webhook receives contact data (name, email, phone)',
              'HTTP Request creates contact in GoHighLevel',
              'Email node sends a welcome sequence email',
              'Slack node notifies the sales team',
            ]}
          />

          <ExampleWorkflow
            title="Social Post → Create Content + Schedule"
            steps={[
              'Webhook receives post content and target platform (Twitter/LinkedIn)',
              'AI agent generates post copy (via OpenAI)',
              'LinkedIn node posts the content',
              'Notion node logs the post to a content calendar',
            ]}
          />

          <ExampleWorkflow
            title="Lead Qualification → Score + Route"
            steps={[
              'Webhook receives lead data from website form',
              'Code node calculates lead score based on rules',
              'If score > 80: HTTP Request adds to High-Ticket pipeline in GHL',
              'If score < 80: adds to Nurture pipeline and schedules follow-up email',
            ]}
          />
        </div>
      </div>

      {/* ── Tips & Warnings ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        <Tip>
          <strong>n8n's free tier</strong> includes 100 workflow executions/month on the cloud plan.
          Your OpenClaw VPS can run a self-hosted n8n instance with unlimited executions — that's what
          ClawOps Studio uses.
        </Tip>
        <Warning>
          <strong>Webhook security:</strong> n8n webhook URLs are public by default. Use the
          <Code>&quot;Response: Node.js&quot;</Code> authentication option or add a shared secret header
          to prevent unauthorized calls.
        </Warning>
        <Tip>
          <strong>Error handling:</strong> In n8n, add an <Code>Error Trigger</Code> workflow to catch
          failures from your main workflows. Connect it to a Slack or email node so you're alerted
          immediately when an automation breaks.
        </Tip>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        {[
          {
            q: 'Does n8n have a native MCP server?',
            a: "n8n does not ship a native MCP server, but the @n8n/mcp npm package (community-built) provides one. It exposes your workflows as MCP tools that OpenClaw can call directly. Alternatively, webhook triggers work for any n8n setup without installing anything extra.",
          },
          {
            q: 'What is the difference between the MCP approach and webhooks?',
            a: "MCP gives your AI agent structured, tool-like access to n8n — the agent sees available workflows as callable functions and can pass typed parameters. Webhooks are simpler: the agent sends an HTTP POST to a URL and gets back a response. Both work; MCP is more robust for complex use cases.",
          },
          {
            q: 'Can I trigger n8n workflows on a schedule?',
            a: "Yes. Use n8n's Schedule Trigger node (instead of Webhook) to run workflows on cron. You can also combine both — a Schedule node runs nightly, and a Webhook node lets the AI agent trigger it on demand.",
          },
          {
            q: 'How do I pass data from my AI agent to n8n?',
            a: "The AI agent formats a JSON payload (matching your webhook's expected body) and sends it via POST. In n8n, the Webhook node's body is available as an object in subsequent nodes — access fields with expressions like {{ $json.email }}.",
          },
          {
            q: 'My webhook URL is not reachable. What do I check?',
            a: "1) Make sure n8n is running and the webhook is active (workflow must be turned on). 2) For self-hosted: check the webhook URL in n8n settings matches your public-facing domain. 3) For cloud n8n: ensure the webhook is in 'Production' mode (not 'Test'). 4) Check firewall/security groups allow inbound traffic on the webhook port.",
          },
          {
            q: 'Can multiple AI agents share the same n8n instance?',
            a: "Yes. Each workflow can have its own webhook URL. Different AI agents (or the same agent with different configs) can trigger different workflows independently.",
          },
        ].map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 10 }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--material-thin)',
              border: '1px solid var(--separator)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>
              {q}
            </div>
            <div style={{
              padding: '10px 16px 12px',
              background: 'var(--material-regular)',
              border: '1px solid var(--separator)',
              borderTop: 'none',
              borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              {a}
            </div>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
}
