'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Download, Settings, Trash2, ChevronDown, ChevronUp,
  Search, Star, Zap, Code, Globe, BarChart3, Wrench, ExternalLink,
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

const POPULAR_SKILLS = [
  {
    name: 'seo-audit',
    desc: 'Analyze any website for SEO issues — broken links, missing meta tags, page speed, keyword gaps.',
    platforms: ['Google', 'Ahrefs API', 'PageSpeed API'],
    color: '#5B6CFF',
    bg: 'rgba(91,108,255,0.1)',
  },
  {
    name: 'competitor-analysis',
    desc: 'Research competitors automatically — pricing, product features, traffic sources, and messaging.',
    platforms: ['SimilarWeb API', 'BuiltWith', 'Clearbit'],
    color: '#34D058',
    bg: 'rgba(52,208,88,0.1)',
  },
  {
    name: 'cold-email',
    desc: 'Write and send cold email campaigns — personalization, sequencing, deliverability optimization.',
    platforms: ['GHL Email', 'SendGrid', 'Apollo.io'],
    color: '#FFC857',
    bg: 'rgba(255,200,87,0.1)',
  },
  {
    name: 'sales-enablement',
    desc: 'CRM integration skills — contact enrichment, deal updates, pipeline management, follow-ups.',
    platforms: ['GHL', 'HubSpot', 'Pipedrive'],
    color: '#CC6FF0',
    bg: 'rgba(204,111,240,0.1)',
  },
  {
    name: 'ghl',
    desc: 'GoHighLevel-specific skills — contact sync, pipeline automation, tag management, SMS campaigns.',
    platforms: ['GHL API'],
    color: '#34D058',
    bg: 'rgba(52,208,88,0.1)',
  },
  {
    name: 'google-workspace',
    desc: 'Google Drive, Gmail, and Calendar integration — read emails, create events, manage Drive files.',
    platforms: ['Google API', 'Gmail API', 'Calendar API'],
    color: '#5B6CFF',
    bg: 'rgba(91,108,255,0.1)',
  },
];

export default function SkillsDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Skills</span>
      </div>

      <h1 className="doc-h1">Skills — Extend Your AI Agent</h1>
      <p className="doc-lead">
        Skills are pre-built agent capabilities — specialized instruction sets that give your AI agent
        domain expertise without you writing a single prompt. Install skills to add SEO analysis,
        competitor research, cold email campaigns, CRM integrations, and more. Like Chrome extensions,
        but for AI agents.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ background: 'rgba(204,111,240,0.05)', border: '1px solid rgba(204,111,240,0.2)', borderRadius: 10, padding: '16px', marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            Skills work by giving your agent a <strong style={{ color: 'var(--text-primary)' }}>specialized system prompt</strong> — instructions that define
            how the agent should behave in a specific domain. When you install a skill, your agent gains:
          </p>
          <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16 }}>
            <li>Domain-specific knowledge and best practices</li>
            <li>Pre-built prompt templates for common tasks</li>
            <li>Access to relevant tools and APIs</li>
            <li>Output formats tailored to the use case</li>
          </ul>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { icon: BookOpen, label: 'Browse', desc: 'Explore the skills catalog' },
            { icon: Download, label: 'Install', desc: 'One-click skill install' },
            { icon: Settings, label: 'Configure', desc: 'Per-skill settings' },
            { icon: Trash2, label: 'Remove', desc: 'Uninstall unused skills' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(204,111,240,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--system-purple)' }}>
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

      {/* What are skills */}
      <div className="doc-section">
        <div className="doc-section-title">What Are Skills?</div>
        <p className="doc-step-desc">
          A <strong>skill</strong> is a packaged set of instructions, tools, and context that extends
          your AI agent's capabilities in a specific area. Think of it as hiring a specialist:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 12 }}>
          {[
            { label: 'Without Skills', desc: 'General-purpose AI. Good at everything, expert at nothing.', color: '#6B7280', bg: 'rgba(107,114,128,0.1)' },
            { label: 'With SEO Skill', desc: 'SEO expert. Audits sites, finds keyword gaps, writes optimized content.', color: '#5B6CFF', bg: 'rgba(91,108,255,0.1)' },
            { label: 'With Cold Email Skill', desc: 'Sales expert. Writes personalized cold emails with sequencing logic.', color: '#FFC857', bg: 'rgba(255,200,87,0.1)' },
            { label: 'With Competitor Skill', desc: 'Research expert. Finds competitors, extracts pricing, compares features.', color: '#34D058', bg: 'rgba(52,208,88,0.1)' },
          ].map((item) => (
            <div key={item.label} style={{ padding: '14px', borderRadius: 8, background: item.bg, border: `1px solid ${item.color}30` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="doc-tip">
          <Zap size={13} />
          <span>Skills are additive — you can install multiple skills and your agent uses all of them. The agent decides which skill to apply based on your request.</span>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Guide</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Browse the Skills Library</div>
            <div className="doc-step-desc">
              Go to <strong>Skills</strong> in the sidebar. The catalog is on the left side of the page.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li>Use <strong>category filters</strong>: All, Social, Coding, Research, Sales, Ops, Analytics</li>
              <li>Search by keyword using the <strong>Search</strong> bar</li>
              <li>Sort by <strong>Trending</strong>, <strong>New</strong>, or <strong>Top Rated</strong></li>
              <li>Each card shows: name, author, star count, category, and description</li>
              <li>Skills with <span className="doc-badge">Installed</span> are already active</li>
            </ul>
            {/* screenshot: skills-catalog.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Install a Skill in One Click</div>
            <div className="doc-step-desc">
              Find the skill you want and click <strong>Install</strong>. Done in under 5 seconds.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Browse or search for the skill you want</li>
              <li>Click <strong>Install</strong> on its card</li>
              <li>The button changes to <strong>Installed</strong> with a checkmark</li>
              <li>The skill appears in your <strong>Installed Skills</strong> section on the right</li>
              <li>Installed skills are immediately available to all agents</li>
            </ol>
            <div className="doc-tip">
              <Zap size={13} />
              <span>Some skills need API keys (e.g., SEO skill needs Google AI Studio key). A ⚙️ Configure icon appears next to skills needing setup.</span>
            </div>
            {/* screenshot: skills-install.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Configure Installed Skills</div>
            <div className="doc-step-desc">
              Some skills require configuration before they're fully operational.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Go to <strong>Installed Skills</strong> on the right panel</li>
              <li>Skills needing config show a <strong>⚙️ Configure</strong> button</li>
              <li>Click <strong>Configure</strong> to open the settings panel</li>
              <li>Fill in required fields: API keys, defaults, options</li>
              <li>Click <strong>Save Configuration</strong></li>
              <li>The skill is now fully operational</li>
            </ol>
            <p className="doc-step-desc">
              Common configurable fields: default tone (formal/casual), output format, max results,
              brand voice, default hashtags, and API credentials.
            </p>
            {/* screenshot: skills-configure.png */}
            <div className="doc-warning">
              <Settings size={13} />
              <span>API keys entered in skill configuration are encrypted. For shared keys used across multiple skills, add them to <strong>Account → API Keys</strong> instead.</span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Remove a Skill</div>
            <div className="doc-step-desc">
              Uninstall a skill when you no longer need it.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Go to <strong>Installed Skills</strong></li>
              <li>Click the <strong>Remove</strong> button (trash icon) on the skill</li>
              <li>A confirmation dialog appears — click <strong>Remove</strong></li>
              <li>The skill is immediately deactivated</li>
            </ol>
            <p className="doc-step-desc">
              Removing a skill does not delete associated data (posted content, scraped data, etc.). You can reinstall any skill at any time.
            </p>
            {/* screenshot: skills-remove.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Popular skills */}
      <div className="doc-section">
        <div className="doc-section-title">Popular Skills</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {POPULAR_SKILLS.map((skill) => (
            <div key={skill.name} className="card" style={{ padding: '16px', display: 'flex', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: skill.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Wrench size={18} style={{ color: skill.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{skill.name}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{skill.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {skill.platforms.map((p) => (
                    <span key={p} style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, background: skill.bg, color: skill.color }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="What's the difference between a skill and a tool?" a="A skill is a pre-built instruction set that gives an agent domain expertise. A tool (MCP server) is a runtime capability — a way for the agent to interact with external services. Skills run on top of your agents; tools give agents new capabilities. They work together." />
        <FaqItem q="Can I create my own skills?" a="Yes. Go to Skills → Create Skill. Write a name, description, instructions, and optional input schema. Custom skills are visible only in your workspace and can be shared with others." />
        <FaqItem q="How many skills can I install?" a="Unlimited on all plans. Each skill adds ~5-50KB to your agent's context, so very large skill stacks may increase token usage slightly." />
        <FaqItem q="Do skills update automatically?" a="Skills from the official catalog are auto-updated when their authors push new versions. Custom skills are managed by you and must be updated manually." />
        <FaqItem q="Can I assign a specific skill to a specific agent?" a="Yes. When spawning an agent, you can select which installed skills to enable for that agent. Agents without a skill enabled won't use it." />
        <FaqItem q="What happens if two skills conflict?" a="The agent uses context priority — the most recently installed skill's instructions take precedence in ambiguous situations. You can also specify which skill to use: '@agent use the SEO skill to audit this page'." />
      </div>
    </DocsLayout>
  );
}
