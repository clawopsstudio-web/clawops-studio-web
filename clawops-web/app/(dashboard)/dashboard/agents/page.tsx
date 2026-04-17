'use client';

import { useState } from 'react';
import {
  Bot, Plus, Pause, Play, Trash2, MessageSquare, Users,
  Activity, Zap, ChevronDown, Send, Clock, RefreshCw,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AgentStatus = 'active' | 'idle' | 'error';

interface Agent {
  id: string;
  name: string;
  type: 'primary' | 'router' | 'spawned';
  status: AgentStatus;
  activity: string;
  tasks: number;
  startedAt: string;
  model?: string;
}

interface ChatMessage {
  id: string;
  agent: string;
  role: 'agent' | 'user';
  content: string;
  time: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const INITIAL_AGENTS: Agent[] = [
  { id: '1', name: 'ZeroClaw', type: 'primary', status: 'active', activity: 'Processing 4 tasks', tasks: 4, startedAt: '2h ago', model: 'claude-sonnet-4' },
  { id: '2', name: 'Hermes', type: 'router', status: 'active', activity: 'Routing 8 incoming requests', tasks: 8, startedAt: '2h ago', model: 'gpt-4o' },
  { id: '3', name: 'Scout', type: 'spawned', status: 'idle', activity: 'Awaiting commands', tasks: 0, startedAt: '30m ago', model: 'claude-sonnet-4' },
  { id: '4', name: 'Writer-01', type: 'spawned', status: 'active', activity: 'Drafting LinkedIn post', tasks: 1, startedAt: '12m ago', model: 'gpt-4o-mini' },
];

const CHAT_MESSAGES: ChatMessage[] = [
  { id: '1', agent: 'ZeroClaw', role: 'agent', content: 'All systems operational. 4 tasks in queue. Memory usage at 34%.', time: '2m ago' },
  { id: '2', agent: 'Hermes', role: 'agent', content: 'New request from @Scout: competitor research on AI agents. Routing to Scout.', time: '4m ago' },
  { id: '3', agent: 'Scout', role: 'agent', content: 'Research started on competitor landscape. ETA 15 minutes.', time: '5m ago' },
  { id: '4', agent: 'You', role: 'user', content: '@ZeroClaw show me agent status summary', time: '8m ago' },
  { id: '5', agent: 'ZeroClaw', role: 'agent', content: 'Current status: 3 active agents, 1 idle. Total tasks: 13. Error count: 0.', time: '8m ago' },
];

const AVAILABLE_TYPES = [
  { id: 'researcher', name: 'Researcher', desc: 'Web search, competitor analysis, data gathering', icon: '🔍' },
  { id: 'writer', name: 'Writer', desc: 'Content creation, copy, social posts, emails', icon: '✍️' },
  { id: 'coder', name: 'Coder', desc: 'Code review, debugging, API integrations', icon: '💻' },
  { id: 'analyst', name: 'Analyst', desc: 'Data analysis, reporting, metrics dashboards', icon: '📊' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_COLORS = {
  active: { dot: 'active', label: 'Active', badge: 'badge-green' },
  idle:   { dot: 'idle',   label: 'Idle',   badge: 'badge-gray'  },
  error:  { dot: 'error',  label: 'Error',  badge: 'badge-red'  },
};

const TYPE_COLORS = {
  primary:  { color: '#5B6CFF', label: 'Primary'  },
  router:   { color: '#00D1FF', label: 'Router'   },
  spawned:  { color: '#CC6FF0', label: 'Spawned'  },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AgentCard({ agent, onToggle, onKill }: { agent: Agent; onToggle: () => void; onKill: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const sc = STATUS_COLORS[agent.status];
  const tc = TYPE_COLORS[agent.type];

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className={`status-dot ${sc.dot}`} style={{ marginTop: 2 }} />
        <div className="avatar" style={{ background: `${tc.color}22`, color: tc.color }}>
          {agent.name.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{agent.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{agent.activity}</div>
        </div>
        <span className={`badge ${sc.badge}`}>{sc.label}</span>
        <span style={{ fontSize: 10, color: tc.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {tc.label}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover-bg"
          style={{ padding: '4px 6px', borderRadius: 4, border: 'none', background: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
        >
          <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
        </button>
      </div>

      {expanded && (
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid var(--separator)' }}>
          <div style={{ paddingTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div className="text-label" style={{ marginBottom: 4 }}>Tasks</div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{agent.tasks}</div>
            </div>
            <div>
              <div className="text-label" style={{ marginBottom: 4 }}>Model</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{agent.model}</div>
            </div>
            <div>
              <div className="text-label" style={{ marginBottom: 4 }}>Uptime</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={11} /> {agent.startedAt}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={onToggle}
              className="btn-ghost btn-scale"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              {agent.status === 'active' ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Resume</>}
            </button>
            <button onClick={onKill} className="btn-danger btn-scale" style={{ flex: 1, justifyContent: 'center' }}>
              <Trash2 size={13} /> Kill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TeamChat({ messages }: { messages: ChatMessage[] }) {
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(messages);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, {
      id: Date.now().toString(),
      agent: 'You',
      role: 'user',
      content: input,
      time: 'just now',
    }]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 420 }}>
      {/* Header */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--separator)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <MessageSquare size={14} style={{ color: 'var(--accent)' }} />
        <span style={{ fontSize: 13, fontWeight: 500 }}>Agent Team Chat</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-quaternary)' }}>@mention agents</span>
      </div>

      {/* Messages */}
      <div className="scroll-area" style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m) => (
          <div key={m.id} style={{ display: 'flex', gap: 8 }}>
            <div
              className="avatar avatar-sm"
              style={{
                background: m.role === 'user' ? 'var(--fill-tertiary)' : 'var(--accent-fill)',
                color: m.role === 'user' ? 'var(--text-secondary)' : 'var(--accent)',
                fontSize: 9, marginTop: 2, flexShrink: 0,
              }}
            >
              {m.agent.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: m.role === 'user' ? 'var(--text-primary)' : 'var(--accent)' }}>
                  {m.agent}
                </span>
                <span style={{ fontSize: 10, color: 'var(--text-quaternary)' }}>{m.time}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, background: m.role === 'user' ? 'var(--material-thin)' : 'transparent', padding: m.role === 'user' ? '6px 10px' : '0', borderRadius: 'var(--radius-sm)' }}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--separator)', display: 'flex', gap: 8 }}>
        <input
          className="input"
          placeholder="@mention an agent..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          style={{ flex: 1, fontSize: 12 }}
        />
        <button onClick={send} className="btn-primary btn-scale" style={{ padding: '7px 12px' }}>
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AgentsPage() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [showSpawn, setShowSpawn] = useState(false);
  const [spawnType, setSpawnType] = useState('');
  const [spawnName, setSpawnName] = useState('');

  const toggleAgent = (id: string) => {
    setAgents(a => a.map(ag =>
      ag.id === id
        ? { ...ag, status: ag.status === 'active' ? 'idle' : 'active', activity: ag.status === 'active' ? 'Paused' : 'Processing tasks' }
        : ag
    ));
  };

  const killAgent = (id: string) => {
    setAgents(a => a.filter(ag => ag.id !== id));
  };

  const spawnAgent = () => {
    if (!spawnType || !spawnName) return;
    const typeInfo = AVAILABLE_TYPES.find(t => t.id === spawnType);
    setAgents(a => [...a, {
      id: Date.now().toString(),
      name: spawnName,
      type: 'spawned' as const,
      status: 'active' as const,
      activity: `Running ${typeInfo?.name} tasks`,
      tasks: 0,
      startedAt: 'Just now',
      model: 'claude-sonnet-4',
    }]);
    setShowSpawn(false);
    setSpawnType('');
    setSpawnName('');
  };

  const activeCount = agents.filter(a => a.status === 'active').length;
  const idleCount = agents.filter(a => a.status === 'idle').length;
  const errorCount = agents.filter(a => a.status === 'error').length;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1>AI Agents</h1>
          <p>Manage your AI workforce — ZeroClaw, Hermes, and spawned workers.</p>
        </div>
        <button className="btn-primary btn-scale" onClick={() => setShowSpawn(true)}>
          <Plus size={15} /> Spawn Agent
        </button>
      </div>

      {/* Summary pills */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="status-dot active" />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{activeCount} Active</span>
        </div>
        <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="status-dot idle" />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{idleCount} Idle</span>
        </div>
        {errorCount > 0 && (
          <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="status-dot error" />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{errorCount} Error</span>
          </div>
        )}
        <div className="card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Users size={12} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{agents.length} Total</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
        {/* Agent list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="section-title">Active Agents</div>
          {agents.map(a => (
            <AgentCard
              key={a.id}
              agent={a}
              onToggle={() => toggleAgent(a.id)}
              onKill={() => killAgent(a.id)}
            />
          ))}
          {agents.length === 0 && (
            <div className="empty-state">
              <Bot size={32} />
              <p>No agents running. Spawn one to get started.</p>
            </div>
          )}
        </div>

        {/* Team chat */}
        <div className="card" style={{ overflow: 'hidden', height: 'fit-content' }}>
          <TeamChat messages={CHAT_MESSAGES} />
        </div>
      </div>

      {/* OpenAgents workspace banner */}
      <div style={{
        marginTop: 20, padding: '14px 16px',
        background: 'linear-gradient(135deg, rgba(91,108,255,0.12), rgba(0,209,255,0.08))',
        border: '1px solid rgba(91,108,255,0.25)',
        borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>OpenAgents Workspace</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            Shared context window for multi-agent collaboration. Enable to let agents read each other's outputs.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="badge badge-accent">Preview</span>
          <button className="btn-ghost btn-scale" style={{ fontSize: 12, padding: '6px 12px' }}>
            Enable
          </button>
        </div>
      </div>

      {/* Spawn modal */}
      {showSpawn && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setShowSpawn(false)}>
          <div className="card" style={{ width: 480, padding: 24 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <Zap size={15} style={{ display: 'inline', marginRight: 6, color: 'var(--accent)' }} />
                Spawn New Agent
              </div>
              <button className="hover-bg" onClick={() => setShowSpawn(false)} style={{ padding: 4, borderRadius: 4, border: 'none', background: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                ×
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Agent Name</label>
              <input className="input" placeholder="e.g. Research-Bot, Writer-02" value={spawnName} onChange={e => setSpawnName(e.target.value)} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="text-label" style={{ display: 'block', marginBottom: 8 }}>Agent Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {AVAILABLE_TYPES.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setSpawnType(t.id)}
                    className="card-hover"
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      border: spawnType === t.id ? '1px solid var(--accent)' : '1px solid var(--separator)',
                      background: spawnType === t.id ? 'var(--accent-fill)' : 'var(--material-regular)',
                    }}
                  >
                    <div style={{ fontSize: 16, marginBottom: 2 }}>{t.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-tertiary)', lineHeight: 1.3 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost btn-scale" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowSpawn(false)}>
                Cancel
              </button>
              <button
                className="btn-primary btn-scale"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={spawnAgent}
                disabled={!spawnType || !spawnName}
              >
                <Zap size={13} /> Spawn Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
