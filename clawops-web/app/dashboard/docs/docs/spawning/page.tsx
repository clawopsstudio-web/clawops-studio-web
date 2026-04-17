'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Zap, Clock, Trash2, CheckCircle,
  ChevronDown, ChevronUp, UserPlus, Play,
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

export default function SpawningDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Spawning</span>
      </div>

      <h1 className="doc-h1">Spawning Agent Workers</h1>
      <p className="doc-lead">
        Spawned workers are temporary AI agents created on demand for specific tasks.
        Think of them as gig workers — you hire them for one job, they deliver, and they're
        cleaned up automatically. Perfect for parallel execution, batch work, and research sprints.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: UserPlus, label: 'On-Demand', desc: 'Create workers as needed, not upfront' },
            { icon: Clock, label: 'With Deadline', desc: 'Set a time limit for each worker' },
            { icon: CheckCircle, label: 'Auto-Cleanup', desc: 'Removed when task is done' },
            { icon: Zap, label: 'Parallel', desc: 'Run multiple workers simultaneously' },
            { icon: Trash2, label: 'No Waste', desc: 'No idle agents burning compute' },
            { icon: Play, label: 'Focused Task', desc: 'One job per worker = better output' },
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

      {/* What is a spawned worker */}
      <div className="doc-section">
        <div className="doc-section-title">What is a Spawned Worker?</div>
        <p className="doc-step-desc">
          A <strong>spawned worker</strong> is a temporary AI agent created by your main agent
          (ZeroClaw) or a manager agent (Hermes) to handle a specific task. Unlike persistent
          agents that run 24/7, workers are created when you need them, given a clear job,
          and automatically cleaned up when they finish or when their deadline passes.
        </p>
        <p className="doc-step-desc">
          Workers are <strong>specialized</strong> — you give each one a focused task,
          relevant skills, and context. This focused approach produces better results than
          asking a generalist agent to context-switch between many tasks.
        </p>
        <div className="doc-tip">
          <Zap size={13} />
          <span>
            <strong>Use spawned workers when:</strong> you have batch work (100 leads to enrich),
            parallel research (5 competitors at once), time-sensitive tasks with a deadline,
            or any task you want isolated from your main agent's context.
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
            <div className="doc-step-title">Go to the Agents Panel</div>
            <div className="doc-step-desc">
              Open <strong>AI Agents</strong> from the sidebar. In the{' '}
              <strong>Spawning</strong> section (or from the main agents dashboard),
              click <strong>Spawn Worker</strong>.
            </div>
            <p className="doc-step-desc">
              Alternatively, you can spawn a worker directly from the chat by saying:
            </p>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '10px 14px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', lineHeight: 1.7 }}>
              "Spawn a content writer worker named @blog-writer to write 5 SEO
              blog posts for our product. Use the SEO skill. Deadline: Friday 5 PM."
            </div>
            {/* screenshot: spawning-panel-entry.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Name the Worker</div>
            <div className="doc-step-desc">
              Give your worker a unique <strong>@handle</strong> — this is how you'll
              communicate with it directly. Choose a descriptive name:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8, marginBottom: 10 }}>
              {[
                { handle: '@researcher', use: 'Competitor and market research' },
                { handle: '@content-writer', use: 'Blog posts, emails, ad copy' },
                { handle: '@social-poster', use: 'Scheduling social media content' },
                { handle: '@leads-enricher', use: 'Appending data to lead lists' },
                { handle: '@data-analyst', use: 'CRM cleanup and reporting' },
                { handle: '@cold-emailer', use: 'Outreach email campaigns' },
              ].map((w) => (
                <div key={w.handle} className="card" style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 2 }}>{w.handle}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{w.use}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Assign the Task</div>
            <div className="doc-step-desc">
              Write a clear, specific task description. The more detailed the brief,
              the better the output. Include:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>What</strong> to do (the action)</li>
              <li><strong>Who</strong> it's for (audience or client)</li>
              <li><strong>Context</strong> (brand voice, existing materials, goals)</li>
              <li><strong>Format</strong> (email template, blog outline, spreadsheet)</li>
              <li><strong>Any constraints</strong> (word count, tone, deadline)</li>
            </ul>
            <div className="doc-tip">
              <CheckCircle size={13} />
              <span>
                Good task: <em>"Write 3 LinkedIn posts about [topic]. Tone: professional but
                conversational. Include a hook, 3 bullet points, and a CTA. Tag @brand."</em>
              </span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Set a Deadline (Optional)</div>
            <div className="doc-step-desc">
              Set a <strong>time limit</strong> for the worker. If the worker doesn't
              complete within the deadline, it will be auto-terminated. Set a deadline if:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>The task is time-sensitive</li>
              <li>You want to avoid runaway agent costs</li>
              <li>You're running a batch job with a known processing time</li>
            </ul>
            <p className="doc-step-desc">
              To set a deadline, enter a time (e.g., <span className="doc-inline-code">2 hours</span>){' '}
              or a specific datetime. Leave blank for no time limit.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Select Skills (Optional)</div>
            <div className="doc-step-desc">
              Attach specific <strong>skills</strong> to the worker so it has the right
              domain expertise. For example:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              {[
                { skill: 'seo-audit', for: 'Research & SEO writing' },
                { skill: 'cold-email', for: 'Outreach campaigns' },
                { skill: 'social-content', for: 'Social media posting' },
                { skill: 'sales-enablement', for: 'Lead qualification' },
                { skill: 'competitor-analysis', for: 'Market research' },
              ].map((s) => (
                <div key={s.skill} style={{ padding: '4px 10px', borderRadius: 99, fontSize: 12, background: 'var(--accent-fill)', color: 'var(--accent)', border: '1px solid rgba(91,108,255,0.3)' }}>
                  {s.skill} <span style={{ color: 'var(--text-tertiary)' }}>→ {s.for}</span>
                </div>
              ))}
            </div>
            <p className="doc-step-desc">
              Only installed skills appear here. If you don't select any, the worker
              uses its default general-purpose capabilities.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">6</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Spawn and Monitor</div>
            <div className="doc-step-desc">
              Click <strong>Spawn Worker</strong>. The agent starts immediately and
              appears in the <strong>Active Workers</strong> list with a status indicator.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>Spawn Worker</strong></li>
              <li>Watch the status change: <em>Starting → Active → Working...</em></li>
              <li>Click the worker card to see its <strong>activity log</strong> in real-time</li>
              <li>You can send it messages directly via <span className="doc-inline-code">@worker-name</span></li>
              <li>When done, it reports back and the status changes to <strong>Complete</strong></li>
            </ol>
            <p className="doc-step-desc">
              Workers auto-cleanup 5 minutes after completing their task.
              You can also manually stop a worker at any time.
            </p>
            {/* screenshot: spawning-active-worker.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Real examples */}
      <div className="doc-section">
        <div className="doc-section-title">Real Examples</div>

        {[
          {
            title: 'Content Writing Sprint',
            trigger: '"Spawn @blog-writer for 4 hours to write 5 SEO blog posts on [topics]"',
            steps: ['Agent named @blog-writer created', 'SEO skill loaded', 'Writes posts one by one', 'Reports completed posts in chat', 'Auto-cleaned up after reporting'],
            result: '5 blog posts in ~3 hours, zero ongoing compute cost',
          },
          {
            title: 'Competitor Research',
            trigger: '"Spawn @researcher with 2 hour deadline to analyze [5 competitor websites] and extract pricing and features"',
            steps: ['Researcher visits each competitor site', 'Extracts pricing, features, USPs', 'Compiles into a comparison spreadsheet', 'Sends report via chat', 'Auto-terminated at deadline'],
            result: 'Full competitive landscape report in under 2 hours',
          },
          {
            title: 'Social Media Batch Post',
            trigger: '"Spawn @social-poster to schedule the attached content calendar across LinkedIn, Twitter, and Instagram for the next 7 days"',
            steps: ['Worker reads content calendar', 'Formats posts for each platform', 'Connects via Composio', 'Schedules all posts', 'Confirms scheduled posts in chat'],
            result: '7 days of content scheduled across 3 platforms in ~20 minutes',
          },
        ].map((ex) => (
          <div key={ex.title} className="card" style={{ padding: '16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ex.title}</div>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 5, padding: '8px 12px', marginBottom: 10, lineHeight: 1.6 }}>
              {ex.trigger}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {ex.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--accent-fill)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{i + 1}</div>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s}</span>
                </div>
              ))}
            </div>
            <div className="doc-tip">
              <CheckCircle size={13} />
              <span><strong>Result:</strong> {ex.result}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="How is a spawned worker different from a regular agent?" a="Regular agents (ZeroClaw, Hermes) are persistent — they run 24/7 and accumulate context over time. Spawned workers are temporary, task-focused, and auto-cleaned up. Workers are created for isolation and parallelization; regular agents are for ongoing, relationship-based work." />
        <FaqItem q="What happens if a worker hits its deadline?" a="The worker is automatically terminated. Any work completed up to that point is saved, but the task is not continued. You'll see a 'Deadline exceeded' status in the activity log." />
        <FaqItem q="Can workers communicate with each other?" a="Workers don't communicate directly with each other. However, they can share results back to the manager agent (Hermes), who can then relay information between workers." />
        <FaqItem q="How many workers can I run at once?" a="This depends on your plan and VPS resources. As a guideline: 1-3 workers for light tasks, up to 5-10 for batch/parallel work. Each worker uses additional compute. Check the My Tools → Gateway panel for current load." />
        <FaqItem q="Can I stop a worker before its deadline?" a="Yes. Go to the Agents panel, find the worker, click Stop. You'll be asked to confirm. The worker's partial output is preserved." />
        <FaqItem q="Do workers remember previous conversations?" a="Workers have a focused context window for their task. They don't have long-term memory like your main agent. When done, they report back — you capture the output, not the process." />
      </div>
    </DocsLayout>
  );
}
