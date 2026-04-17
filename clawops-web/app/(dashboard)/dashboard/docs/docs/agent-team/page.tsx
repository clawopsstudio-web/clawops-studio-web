'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Users, UserCheck, Zap, AtSign, Activity,
  ChevronDown, ChevronUp, ArrowRight, Play,
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

export default function AgentTeamDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Agent Teams</span>
      </div>

      <h1 className="doc-h1">AI Agent Teams</h1>
      <p className="doc-lead">
        Agent Teams let you orchestrate multiple AI agents working together.
        Assign a manager agent to break down complex projects, delegate tasks to specialized
        agents, and monitor everything from one dashboard.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: Users, label: 'Multi-Agent Teams', desc: 'Run multiple agents simultaneously' },
            { icon: UserCheck, label: 'Role-Based', desc: 'Manager, employee, and workers' },
            { icon: AtSign, label: '@ Mentions', desc: 'Delegate tasks by naming agents' },
            { icon: Activity, label: 'Live Status', desc: 'Track Active / Idle / Error states' },
            { icon: Zap, label: 'Parallel Work', desc: 'Workers handle tasks in parallel' },
            { icon: Play, label: 'Spawn on Demand', desc: 'Create workers as needed' },
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

      {/* What is an agent team */}
      <div className="doc-section">
        <div className="doc-section-title">What is an AI Agent Team?</div>
        <p className="doc-step-desc">
          An <strong>AI Agent Team</strong> is a group of AI agents working together under a shared
          manager. Instead of one agent doing everything sequentially, a team lets you:
        </p>
        <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
          <li><strong>Divide work</strong> — separate agents for research, writing, posting, analysis</li>
          <li><strong>Parallel execution</strong> — multiple workers do tasks simultaneously</li>
          <li><strong>Specialization</strong> — each agent has specific skills loaded</li>
          <li><strong>Supervised delegation</strong> — a manager breaks down goals and assigns subtasks</li>
        </ul>
        <div className="doc-tip">
          <Zap size={13} />
          <span>
            Think of it like a small agency: you (the owner) give a brief to the{' '}
            <strong>Manager Agent</strong>, who then assigns tasks to <strong>specialist
            employees</strong>, who spawn <strong>workers</strong> to execute. You just oversee.
          </span>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Agent Roles */}
      <div className="doc-section">
        <div className="doc-section-title">Agent Roles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              role: 'Manager — Hermes',
              color: '#5B6CFF',
              bg: 'rgba(91,108,255,0.1)',
              desc: 'The orchestrator. Breaks down complex goals into actionable tasks and delegates to employees. You give Hermes a project brief; Hermes creates the plan and assigns work.',
              skills: ['Project planning', 'Task delegation', 'Quality review', 'Progress reporting'],
              icon: Activity,
            },
            {
              role: 'Main Employee — ZeroClaw',
              color: '#34D058',
              bg: 'rgba(52,208,88,0.1)',
              desc: 'Your primary AI worker. Handles the bulk of execution — research, content creation, CRM updates, social posting, emails. Always on, always ready.',
              skills: ['General execution', 'CRM management', 'Content writing', 'Social media', 'Email outreach'],
              icon: UserCheck,
            },
            {
              role: 'Spawned Workers — Task Agents',
              color: '#CC6FF0',
              bg: 'rgba(204,111,240,0.1)',
              desc: 'Temporary agents spawned for specific tasks. Created on demand, given a clear task and deadline, then cleaned up automatically when done.',
              skills: ['Specialized one-off tasks', 'Parallel execution', 'Research sprints', 'Batch operations'],
              icon: Zap,
            },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.role} className="card" style={{ padding: '16px', display: 'flex', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} style={{ color: r.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: r.color, marginBottom: 4 }}>{r.role}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{r.desc}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {r.skills.map((s) => (
                      <span key={s} style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: r.bg, color: r.color }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Guide</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Open the Agents Panel</div>
            <div className="doc-step-desc">
              Go to <strong>AI Agents</strong> in the sidebar. You'll see the main agent (ZeroClaw)
              status card at the top, followed by the <strong>Team</strong> section.
            </div>
            <p className="doc-step-desc">
              The Team section shows all currently active agents — their names, roles,
              current task, and status indicators.
            </p>
            {/* screenshot: agents-team-panel.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Create an Agent Team</div>
            <div className="doc-step-desc">
              Click <strong>New Team</strong> in the Agents panel. Give the team a name
              (e.g., "Marketing Q2" or "Client Onboarding").
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>New Team</strong></li>
              <li>Enter a <strong>team name</strong> — this is how you'll refer to the team in chat</li>
              <li>Select the <strong>Manager Agent</strong> (defaults to Hermes)</li>
              <li>Select <strong>employee agents</strong> to include (ZeroClaw is included by default)</li>
              <li>Choose <strong>skills</strong> to load for the team</li>
              <li>Click <strong>Create Team</strong></li>
            </ol>
            <div className="doc-tip">
              <Users size={13} />
              <span>Teams are persistent — they stay active until you disband them. You can have multiple teams running for different projects simultaneously.</span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Delegate with @Mentions</div>
            <div className="doc-step-desc">
              In the dashboard chat or Telegram, use <span className="doc-inline-code">@agentname</span>{' '}
              to delegate a task to a specific agent:
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 10 }}>
              @marketing-research<br />
              Find the top 5 competitors for [company] and summarize their pricing.<br /><br />
              @content-writer<br />
              Write a LinkedIn post based on the research above.<br /><br />
              @social-poster<br />
              Schedule the post for tomorrow at 10 AM.
            </div>
            <p className="doc-step-desc">
              Each agent only sees its own assigned messages. The Manager agent (Hermes)
              sees everything and can coordinate across agents.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Monitor Agent Statuses</div>
            <div className="doc-step-desc">
              Each agent has a status badge in the Team panel:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              {[
                { label: 'Active', color: '#34D058', bg: 'rgba(52,208,88,0.12)', desc: 'Working on a task right now' },
                { label: 'Idle', color: '#FFC857', bg: 'rgba(255,200,87,0.12)', desc: 'Waiting for a task' },
                { label: 'Error', color: '#FF6464', bg: 'rgba(255,100,100,0.12)', desc: 'Something went wrong — click to view log' },
                { label: 'Offline', color: 'var(--text-quaternary)', bg: 'var(--fill-quaternary)', desc: 'Not connected to the Gateway' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 99, background: s.bg, border: '1px solid var(--separator)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.label}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>— {s.desc}</span>
                </div>
              ))}
            </div>
            <p className="doc-step-desc">
              Click any agent card to see: current task, recent activity log, skills loaded,
              and tool usage statistics.
            </p>
            {/* screenshot: agent-status-panel.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Example */}
      <div className="doc-section">
        <div className="doc-section-title">Example: Creating a Marketing Campaign</div>
        <p className="doc-step-desc">
          Here's how a team works together on a full marketing campaign:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { step: '1', agent: 'You → @hermes', action: '"Launch a marketing campaign for our new SaaS product"', color: '#5B6CFF', bg: 'rgba(91,108,255,0.1)' },
            { step: '2', agent: '@hermes (Manager)', action: 'Breaks it down: research → content → social → email → analytics. Assigns tasks to employees.', color: '#34D058', bg: 'rgba(52,208,88,0.1)' },
            { step: '3', agent: '@researcher (Worker)', action: 'Scrapes competitor sites, extracts pricing, finds top messaging angles. Reports back to Hermes.', color: '#CC6FF0', bg: 'rgba(204,111,240,0.1)' },
            { step: '4', agent: '@content-writer (Worker)', action: 'Writes 3 LinkedIn posts, 1 email sequence, and 5 Twitter threads based on research.', color: '#CC6FF0', bg: 'rgba(204,111,240,0.1)' },
            { step: '5', agent: '@social-poster (Worker)', action: 'Schedules all posts across LinkedIn, Twitter, and Instagram for the campaign week.', color: '#CC6FF0', bg: 'rgba(204,111,240,0.1)' },
            { step: '6', agent: '@hermes (Manager)', action: 'Reviews all outputs, flags quality issues, requests revisions if needed.', color: '#34D058', bg: 'rgba(52,208,88,0.1)' },
            { step: '7', agent: 'Done', action: 'Campaign live. Hermes sends you a summary report with post links and engagement metrics.', color: '#5B6CFF', bg: 'rgba(91,108,255,0.1)' },
          ].map((row) => (
            <div key={row.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: row.bg, color: row.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                {row.step}
              </div>
              <div className="card" style={{ flex: 1, padding: '10px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: row.color, marginBottom: 3 }}>{row.agent}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{row.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="What's the difference between an agent and a worker?" a="An 'agent' is a persistent AI instance with a name, role, and skill set. A 'worker' is a type of agent — a temporary, spawned agent created for a specific task. Workers are auto-cleaned up when done." />
        <FaqItem q="Can I have more than one manager?" a="Yes. You can create multiple teams, each with its own manager. Or within one team, you can designate multiple supervisor-level agents. Hermes is the default manager but any agent can be assigned the manager role." />
        <FaqItem q="Do spawned workers share memory with the main agent?" a="Workers inherit the team context (goals, brand guidelines, recent history) but have isolated short-term memory for their specific task. Results are shared back to the team lead when done." />
        <FaqItem q="How do I stop a runaway agent?" a="Click the agent's card in the Team panel, then click Stop. This terminates the agent immediately. Any in-progress work is lost." />
        <FaqItem q="Can I rename agents?" a="Yes. Click the agent card → Edit. You can change the display name, @mention handle, role description, and icon color. The agent's underlying identity remains the same." />
      </div>
    </DocsLayout>
  );
}
