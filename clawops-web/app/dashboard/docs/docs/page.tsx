import DocsLayout from '../docs-layout';
import Link from 'next/link';
import {
  Rocket, Users, Share2, Bot, Wrench, Plug, Monitor, FolderOpen,
  ArrowRight, BookOpen, Search, Zap, Code, Globe, BarChart3,
  Server, Workflow, UsersRound,
} from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Getting Started',
    icon: Rocket,
    color: '#5B6CFF',
    bg: 'rgba(91,108,255,0.12)',
    pages: [
      { label: 'Setup & Onboarding', href: '/dashboard/docs/getting-started', desc: 'Sign up, configure your profile, and take your first steps.' },
    ],
  },
  {
    title: 'Platform',
    icon: Server,
    color: '#00C2FF',
    bg: 'rgba(0,194,255,0.1)',
    pages: [
      { label: 'OpenClaw Agent OS', href: '/dashboard/docs/openclaw', desc: 'What OpenClaw is, how it runs, and how to talk to your agent.' },
      { label: 'Gateway', href: '/dashboard/docs/gateway', desc: 'How agents connect, what tools are available, and health monitoring.' },
    ],
  },
  {
    title: 'AI Agents',
    icon: Bot,
    color: '#34D058',
    bg: 'rgba(52,208,88,0.1)',
    pages: [
      { label: 'AI Agent Teams', href: '/dashboard/docs/agent-team', desc: 'Create multi-agent teams with manager and employee roles.' },
      { label: 'Spawning Workers', href: '/dashboard/docs/spawning', desc: 'Create temporary workers for parallel, task-specific work.' },
    ],
  },
  {
    title: 'Core Features',
    icon: Users,
    color: '#FFC857',
    bg: 'rgba(255,200,87,0.1)',
    pages: [
      { label: 'CRM', href: '/dashboard/docs/crm', desc: 'Manage contacts, deals, and your sales pipeline.' },
      { label: 'Social Media', href: '/dashboard/docs/social', desc: 'Connect accounts, compose, schedule, and analyze.' },
    ],
  },
  {
    title: 'Browser & Tools',
    icon: Monitor,
    color: '#CC6FF0',
    bg: 'rgba(204,111,240,0.1)',
    pages: [
      { label: 'Browser Automation', href: '/dashboard/docs/browser', desc: 'Chrome VNC, camoufox, session persistence, anti-detection.' },
      { label: 'Skills', href: '/dashboard/docs/skills', desc: 'Browse and install pre-built agent skills.' },
      { label: 'MCP Servers & Plugins', href: '/dashboard/docs/tools', desc: 'Enable MCP servers from Smithery and configure plugins.' },
    ],
  },
  {
    title: 'Integrations',
    icon: Plug,
    color: '#FF8A65',
    bg: 'rgba(255,138,101,0.1)',
    pages: [
      { label: 'Composio Setup', href: '/dashboard/docs/composio', desc: 'Connect Twitter, LinkedIn, Instagram for social automation.' },
      { label: 'GoHighLevel (GHL)', href: '/dashboard/docs/ghl', desc: 'CRM integration — contacts, pipeline, email, and tasks.' },
      { label: 'N8N Automation', href: '/dashboard/docs/n8n', desc: 'Visual workflow builder with AI agent node and webhooks.' },
      { label: 'Browser Automation', href: '/dashboard/docs/browser', desc: 'Chrome VNC, camoufox, session persistence.' },
    ],
  },
];

const QUICKSTART = [
  { label: 'What is OpenClaw?', href: '/dashboard/docs/openclaw', icon: Server },
  { label: 'Connect a social account', href: '/dashboard/docs/composio', icon: Share2 },
  { label: 'Spawn an AI worker', href: '/dashboard/docs/spawning', icon: UsersRound },
  { label: 'Install a skill', href: '/dashboard/docs/skills', icon: Zap },
  { label: 'Open Chrome VNC', href: '/dashboard/docs/browser', icon: Monitor },
  { label: 'Set up GHL integration', href: '/dashboard/docs/ghl', icon: Workflow },
];

export default function DocsLandingPage() {
  return (
    <DocsLayout>
      {/* Breadcrumb */}
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Documentation</span>
      </div>

      <h1 className="doc-h1">ClawOps Docs</h1>
      <p className="doc-lead">
        Everything you need to set up, operate, and scale your ClawOps workspace.
        From first login to advanced agent orchestration — covered here.
      </p>

      {/* Quick start */}
      <div className="doc-section">
        <div className="doc-section-title">Quick Start</div>
        <div className="doc-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {QUICKSTART.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="doc-card">
                <div className="doc-card-icon"><Icon size={16} /></div>
                <div className="doc-card-title">{item.label}</div>
                <div className="doc-card-arrow"><ArrowRight size={13} /></div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* All categories */}
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        return (
          <div key={cat.title} className="doc-section">
            <div className="doc-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={11} style={{ color: cat.color }} />
              </div>
              {cat.title}
            </div>
            <div className="doc-card-grid">
              {cat.pages.map((page) => (
                <Link key={page.href} href={page.href} className="doc-card">
                  <div className="doc-card-icon" style={{ background: cat.bg }}>
                    <Icon size={16} style={{ color: cat.color }} />
                  </div>
                  <div className="doc-card-title">{page.label}</div>
                  <div className="doc-card-desc">{page.desc}</div>
                  <div className="doc-card-arrow"><ArrowRight size={13} /></div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* Bottom tip */}
      <div className="doc-tip" style={{ marginTop: 8 }}>
        <Zap size={14} />
        <span>
          <strong>Pro tip:</strong> Each page has an FAQ at the bottom. If you still have questions, use the <span className="doc-inline-code">@agent</span> mention in the dashboard to ask your AI agent directly.
        </span>
      </div>
    </DocsLayout>
  );
}
