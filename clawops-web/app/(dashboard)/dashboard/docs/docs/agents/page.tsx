'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import { Bot, Plus, ChevronDown, ChevronUp, Activity, AtSign, Cpu, MessageSquare } from 'lucide-react';

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

export default function AgentsDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Bot size={12} />
        <span>AI Agents</span>
      </div>

      <h1 className="doc-h1">AI Agents</h1>
      <p className="doc-lead">
        Spawn specialized worker agents, assign tasks, monitor their activity in real time,
        and use <span className="doc-inline-code">@mention</span> syntax to delegate work
        from any chat context. Agents run asynchronously and can use tools, browse the web,
        and interact with all connected integrations.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { icon: Activity, label: 'Active Agents', desc: 'Live worker status' },
            { icon: Plus, label: 'Spawn Worker', desc: 'Launch a new agent' },
            { icon: MessageSquare, label: 'Task Queue', desc: 'Assigned & pending tasks' },
            { icon: AtSign, label: '@Mention', desc: 'Delegate in chat' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(0,209,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
                  <Icon size={14} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Guide</div>

        {/* Step 1 */}
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">View Active Agents</div>
            <div className="doc-step-desc">Go to <strong>AI Agents</strong> in the sidebar. The main view shows all running agents with their status.</div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Active (green dot)</strong> — agent is running a task</li>
              <li><strong>Idle (gray dot)</strong> — agent is online but waiting for tasks</li>
              <li><strong>Error (red dot)</strong> — agent encountered an error; check logs</li>
            </ul>
            <p className="doc-step-desc">
              Each agent card shows: name, status, current task, model being used,
              and a live activity feed of recent tool calls.
            </p>
            {/* screenshot: agents-list.png */}
          </div>
        </div>

        {/* Step 2 */}
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Spawn a New Worker Agent</div>
            <div className="doc-step-desc">
              Click <strong>+ Spawn Worker</strong> at the top of the AI Agents page.
              A spawn dialog will appear.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Give the agent a <strong>name</strong> — e.g., "Research-Bot", "Outreach-Agent"</li>
              <li>Choose a <strong>specialization</strong> (social, research, coding, sales)</li>
              <li>Select the <strong>model</strong> (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro)</li>
              <li>Optionally set <strong>tools scope</strong> — which integrations it can access</li>
              <li>Click <strong>Spawn</strong></li>
            </ol>
            <p className="doc-step-desc">
              The new agent will appear in the agents list with a status of <strong>Idle</strong>.
              It will start processing tasks as soon as they're assigned.
            </p>
            {/* screenshot: agents-spawn-dialog.png */}
            <div className="doc-tip">
              <Cpu size={13} />
              <span>Keep agent count reasonable — each running agent consumes compute. One active agent per workflow is usually enough. Use @mention for one-off tasks instead of spawning dedicated agents.</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Assign a Task to an Agent</div>
            <div className="doc-step-desc">
              Open the agent's card and click <strong>Assign Task</strong>.
              Type your task in natural language.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>Assign Task</strong> on an agent card</li>
              <li>Describe the task clearly — the more specific, the better</li>
              <li>Optionally attach files or links as context</li>
              <li>Set a <strong>priority</strong>: Low, Normal, High</li>
              <li>Click <strong>Dispatch</strong></li>
            </ol>
            <p className="doc-step-desc">
              The agent will immediately pick up the task and update its status to <strong>Active</strong>.
              You can watch the task progress in the agent's activity feed.
            </p>
            {/* screenshot: agents-assign-task.png */}
          </div>
        </div>

        {/* Step 4 */}
        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Monitor Agent Activity</div>
            <div className="doc-step-desc">
              Click any agent card to expand its detail panel. Here you'll see:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Live activity log</strong> — every tool call, API request, and decision in real time</li>
              <li><strong>Current task</strong> — what the agent is working on right now</li>
              <li><strong>Task history</strong> — past tasks with completion status</li>
              <li><strong>Token usage</strong> — approximate tokens used this session</li>
              <li><strong>Logs</strong> — full output log, expandable per step</li>
            </ul>
            {/* screenshot: agents-activity-log.png */}
            <div className="doc-warning">
              <Activity size={13} />
              <span>Agent logs can contain sensitive data. Never share log screenshots in public channels. Logs auto-rotate after 7 days.</span>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Use @Mention to Delegate from Chat</div>
            <div className="doc-step-desc">
              The fastest way to delegate: type <span className="doc-inline-code">@agent-name</span> in any chat input.
              This instantly assigns a task to the named worker agent without leaving your workflow.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In the chat input, type <span className="doc-inline-code">@</span> followed by the agent's name</li>
              <li>Autocomplete will suggest matching agents</li>
              <li>Select the agent, then type your task</li>
              <li>Press <strong>Enter</strong> or click <strong>Send</strong></li>
              <li>The agent receives the task and starts processing</li>
            </ol>
            <p className="doc-step-desc">
              For example: <span className="doc-inline-code">@Research-Bot find 10 SaaS companies in fintech and list their pricing pages</span>
            </p>
            {/* screenshot: agents-at-mention.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="How many agents can I run at once?" a="The Pro plan supports up to 5 concurrent agents. Enterprise plans support unlimited. Each agent runs independently and can process tasks in parallel." />
        <FaqItem q="What happens if an agent fails?" a="Failed agents show a red error dot. The task is marked as failed and you'll see an error message in the activity log. You can retry, adjust the task description, or spawn a new agent." />
        <FaqItem q="Can agents call each other?" a="Yes. Agents can use the @mention syntax to delegate subtasks to other agents, creating a chain. This is useful for complex multi-step workflows." />
        <FaqItem q="How do I stop an agent?" a="Click the stop button (■) on the agent card. The agent will finish its current step and then go idle. Forcible termination is available via the three-dot menu." />
        <FaqItem q="What models are supported?" a="OpenAI GPT-4o and GPT-4o-mini, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro. Model selection is per-agent and can be changed at any time." />
      </div>
    </DocsLayout>
  );
}
