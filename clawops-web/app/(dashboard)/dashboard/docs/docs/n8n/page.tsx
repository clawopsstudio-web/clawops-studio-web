'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Workflow, Zap, Webhook, Play,
  ChevronDown, ChevronUp, ArrowRight, Users,
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

export default function N8nDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>N8N</span>
      </div>

      <h1 className="doc-h1">N8N Workflow Automation</h1>
      <p className="doc-lead">
        N8N is a powerful visual workflow automation tool that connects your apps and services.
        Open it directly from the dashboard, build workflows without code, and let your
        AI agent trigger automations or be part of the workflow itself.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: Workflow, label: 'Visual Builder', desc: 'Drag-and-drop workflow editor' },
            { icon: Zap, label: 'No-Code', desc: 'Build automations without writing code' },
            { icon: Webhook, label: 'Webhooks', desc: 'Trigger workflows from any app or agent' },
            { icon: Play, label: 'AI Agent Node', desc: 'Run AI tasks as part of workflows' },
            { icon: ArrowRight, label: '300+ Integrations', desc: 'Connect any app or service' },
            { icon: Users, label: 'Auto-Login', desc: 'Opens from dashboard with your credentials' },
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

      {/* What is n8n */}
      <div className="doc-section">
        <div className="doc-section-title">What is N8N?</div>
        <p className="doc-step-desc">
          <strong>N8N</strong> (pronounced "n-eight-n") is an open-source workflow automation
          platform. It lets you connect apps, run automations, and process data — all through
          a visual drag-and-drop editor with no coding required.
        </p>
        <p className="doc-step-desc">
          Think of it like Zapier or Make, but <strong>self-hosted</strong> (it runs on your VPS),
          <strong> more powerful</strong>, and with a built-in <strong>AI Agent node</strong> that
          lets you run AI tasks as part of any workflow.
        </p>
        <div className="doc-tip">
          <Zap size={13} />
          <span>
            N8N is pre-configured in your ClawOps workspace and accessible directly from the
            dashboard — no separate login needed. Your dashboard session authenticates you automatically.
          </span>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Guide</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Open N8N from the Dashboard</div>
            <div className="doc-step-desc">
              N8N is already authenticated — just open it:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Go to <strong>My Tools</strong> in the ClawOps sidebar</li>
              <li>Click <strong>N8N Workflows</strong></li>
              <li>N8N opens in a new tab with your session already active</li>
              <li>You're ready to build — no separate login required</li>
            </ol>
            <p className="doc-step-desc">
              N8N is available at{' '}
              <span className="doc-inline-code">http://localhost:5678</span>{' '}
              internally, or via Tailscale at{' '}
              <span className="doc-inline-code">https://vmi3094584-1.tailec7a72.ts.net/n8n/</span>
            </p>
            {/* screenshot: n8n-open-from-dashboard.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Build Your First Workflow</div>
            <div className="doc-step-desc">
              A workflow has three parts: <strong>Trigger</strong> → <strong>Actions</strong> →{' '}
              <strong>Output</strong>. In N8N, nodes represent each step.
            </div>
            <p className="doc-step-desc">To build a workflow:</p>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>+ New Workflow</strong></li>
              <li>Drag a <strong>Trigger node</strong> from the left panel onto the canvas</li>
              <li>Connect it to an <strong>Action node</strong> (e.g., Google Sheets, Slack, HTTP Request)</li>
              <li>Add more nodes to chain more actions</li>
              <li>Click <strong>Test Workflow</strong> to run it with sample data</li>
              <li>Click <strong>Save</strong> to save the workflow</li>
            </ol>
            {/* screenshot: n8n-workflow-builder.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Add the AI Agent Node</div>
            <div className="doc-step-desc">
              The <strong>AI Agent</strong> node lets your workflow call the AI agent as a step:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>+</strong> on the canvas to add a new node</li>
              <li>Search for <strong>"AI Agent"</strong> in the node panel</li>
              <li>Drag it onto the canvas</li>
              <li>Connect it between your trigger and action nodes</li>
              <li>Configure the AI Agent:
                <ul>
                  <li>Model: select GPT-4o, Claude, Gemini, or your default</li>
                  <li>Instructions: describe what the agent should do in this workflow step</li>
                  <li>Input data: pass data from previous nodes as context</li>
                </ul>
              </li>
              <li>Connect the AI Agent output to your next action node</li>
            </ol>
            <div className="doc-tip">
              <Zap size={13} />
              <span>
                <strong>Example:</strong> Trigger (new Typeform response) → AI Agent (analyze
                the response and decide lead score) → Update GHL contact with the score.
              </span>
            </div>
            {/* screenshot: n8n-ai-agent-node.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect a Webhook from the Dashboard</div>
            <div className="doc-step-desc">
              Create a webhook in N8N so your AI agent can trigger workflows:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In N8N, add a <strong>Webhook</strong> node as the trigger</li>
              <li>Set the HTTP method to <strong>POST</strong></li>
              <li>Copy the webhook URL</li>
              <li>In ClawOps, go to <strong>Integrations → Webhooks</strong></li>
              <li>Paste the webhook URL and give it a name</li>
              <li>Your agent can now trigger this workflow by calling the webhook</li>
            </ol>
            <p className="doc-step-desc">
              Example prompt: <em>"Trigger the lead enrichment workflow for the contact
              I just added."</em> — the agent calls the webhook with the contact data.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Run a Workflow</div>
            <div className="doc-step-desc">
              Workflows can be triggered in three ways:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
              {[
                { method: 'Manually', desc: 'Click the Run button in N8N. Good for testing.' },
                { method: 'By Trigger', desc: 'Scheduled (cron), webhook, form submission, or event-based. Runs automatically.' },
                { method: 'By AI Agent', desc: 'Ask your agent to "trigger [workflow name]" — it calls the webhook with context.' },
              ].map((run) => (
                <div key={run.method} className="card" style={{ padding: '10px 14px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{run.method}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{run.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Example workflows */}
      <div className="doc-section">
        <div className="doc-section-title">Example Workflows</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              name: 'Lead Notification Pipeline',
              flow: 'New GHL Contact → AI Agent scores lead → Slack message to sales team → Update GHL with lead score',
              trigger: 'GHL Contact Created',
              result: 'Sales team gets instant Slack notification with AI-scored lead',
            },
            {
              name: 'Email Sequence Automation',
              flow: 'New sign-up form → AI Agent writes personalized intro email → Send via Gmail/GHL → Wait 3 days → Send follow-up email',
              trigger: 'Form submission (Typeform, Calendly)',
              result: 'Fully automated email onboarding sequence, personalized per lead',
            },
            {
              name: 'Social Media Auto-Poster',
              flow: 'AI Agent writes content → Post to Twitter (via Composio) → Post to LinkedIn → Log to Google Sheets',
              trigger: 'Schedule (daily at 9 AM)',
              result: 'AI-generated, multi-platform social posting on autopilot',
            },
            {
              name: 'Competitor Alert Monitor',
              flow: 'AI Agent scrapes competitor site → Extracts pricing/features → AI Agent summarizes changes → Slack alert',
              trigger: 'Schedule (weekly)',
              result: 'Weekly competitive intelligence report delivered to your team',
            },
          ].map((wf) => (
            <div key={wf.name} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{wf.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>TRIGGER</span>
                {wf.flow.split(' → ').map((step, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{step}</span>
                    {i < wf.flow.split(' → ').length - 1 && <ArrowRight size={11} style={{ color: 'var(--text-quaternary)' }} />}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                <strong>Trigger:</strong> {wf.trigger} · <strong>Result:</strong> {wf.result}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Is N8N free?" a="N8N has a free self-hosted version. You can run it on your VPS for free indefinitely. N8N also has a cloud service with paid plans starting at $20/month for the Pro plan." />
        <FaqItem q="What's the difference between n8n and the AI agent doing the work directly?" a="N8N is better for structured, event-driven automations (when X happens, do Y). The AI agent is better for judgment-based tasks (analyzing, deciding, writing). Best used together: n8n triggers + AI agent processes + n8n routes results." />
        <FaqItem q="Can I run N8N workflows from the AI agent?" a="Yes. Once you create a webhook in N8N, your agent can trigger it with the 'trigger workflow' command. The agent can pass data (contact info, content, etc.) as the webhook payload." />
        <FaqItem q="How do I access N8N externally?" a="N8N is accessible via Tailscale at https://vmi3094584-1.tailec7a72.ts.net/n8n/. It's not exposed to the public internet. Share the Tailscale link with team members who have Tailscale access." />
        <FaqItem q="Can I use pre-built N8N workflow templates?" a={'Yes. N8N has a template library built in. Go to Templates in the N8N sidebar to browse community-created workflows. Search for "AI agent" or "CRM" for relevant templates.'} />
      </div>
    </DocsLayout>
  );
}
