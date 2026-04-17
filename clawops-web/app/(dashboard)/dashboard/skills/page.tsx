'use client';

import { useState } from 'react';
import {
  BookOpen, Download, Check, Star, Tag, Search, Filter,
  ChevronDown, Loader, ExternalLink, Zap, Code, Globe, BarChart3,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SkillCategory = 'all' | 'social' | 'coding' | 'research' | 'sales' | 'ops' | 'analytics';

interface Skill {
  id: string;
  name: string;
  description: string;
  author: string;
  stars: number;
  category: Exclude<SkillCategory, 'all'>;
  installed: boolean;
  icon: string;
  skills: string[];
  inputs: string[];
}

interface CategoryMeta {
  id: SkillCategory;
  label: string;
  icon: typeof BookOpen;
  color: string;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const CATEGORIES: CategoryMeta[] = [
  { id: 'all',       label: 'All',        icon: BookOpen,  color: 'var(--text-secondary)' },
  { id: 'social',    label: 'Social',     icon: Globe,     color: '#1DA1F2' },
  { id: 'coding',    label: 'Coding',     icon: Code,      color: '#6B7280' },
  { id: 'research',  label: 'Research',   icon: Search,    color: 'var(--accent-secondary)' },
  { id: 'sales',     label: 'Sales',      icon: BarChart3, color: 'var(--system-green)' },
  { id: 'ops',       label: 'Operations',  icon: Zap,       color: 'var(--accent)' },
  { id: 'analytics', label: 'Analytics',  icon: BarChart3, color: 'var(--system-purple)' },
];

const SKILLS: Skill[] = [
  {
    id: 'cold-email', name: 'Cold Email Sequence', description: 'Generate personalized cold email sequences with A/B testing, follow-up timing, and delivery optimization.', author: 'clawops-studio', stars: 47, category: 'sales', installed: true, icon: '📧',
    skills: ['Personalization', 'A/B variants', 'Follow-up timing', 'Spintax support'], inputs: ['Prospect data', 'Product context', 'Offer details'],
  },
  {
    id: 'seo-audit', name: 'SEO Audit & Content', description: 'Run full SEO audits, analyze competitors, and generate optimized content briefs automatically.', author: 'clawops-studio', stars: 83, category: 'research', installed: true, icon: '🔍',
    skills: ['Site audit', 'Keyword research', 'Competitor analysis', 'Content briefs'], inputs: ['Target URL', 'Seed keywords', 'Competitor URLs'],
  },
  {
    id: 'ad-creative', name: 'Ad Creative Generator', description: 'Generate high-converting ad copy for Google, Facebook, and LinkedIn with performance predictions.', author: 'clawops-studio', stars: 62, category: 'social', installed: false, icon: '🎨',
    skills: ['Multi-platform', 'A/B copy', 'CTA optimization', 'Audience targeting'], inputs: ['Product details', 'Target audience', 'Platform'],
  },
  {
    id: 'linkedin-outreach', name: 'LinkedIn Outreach', description: 'Automated LinkedIn connection requests, follow-ups, and message sequences with personalization.', author: 'clawops-studio', stars: 91, category: 'sales', installed: false, icon: '💼',
    skills: ['Personalization', 'InMail sequences', 'Profile enrichment', 'CRM sync'], inputs: ['Target criteria', 'Message template', 'Sequence steps'],
  },
  {
    id: 'market-research', name: 'Market Research Agent', description: 'Conduct deep market research: TAM analysis, competitor intelligence, trend identification.', author: 'clawops-studio', stars: 115, category: 'research', installed: false, icon: '📊',
    skills: ['TAM/SAM analysis', 'Competitor intel', 'Trend detection', 'Report generation'], inputs: ['Industry', 'Target market', 'Report depth'],
  },
  {
    id: 'onboarding-cro', name: 'Onboarding CRO', description: 'Analyze onboarding flows and generate conversion optimization recommendations with A/B test ideas.', author: 'clawops-studio', stars: 34, category: 'analytics', installed: false, icon: '🚀',
    skills: ['Funnel analysis', 'Drop-off detection', 'A/B ideas', 'UX suggestions'], inputs: ['Onboarding URL', 'User events', 'Goal events'],
  },
  {
    id: 'ghl-automation', name: 'GHL Workflow Builder', description: 'Build and optimize Go High Level workflows, automations, and pipelines programmatically.', author: 'clawops-studio', stars: 58, category: 'ops', installed: true, icon: '⚡',
    skills: ['Pipeline setup', 'Trigger config', 'Multi-step automations', 'GHL API'], inputs: ['Location ID', 'Workflow goal', 'Trigger events'],
  },
  {
    id: 'deepl-translate', name: 'DeepL Translation', description: 'Translate content across 30+ languages using DeepL API with context preservation.', author: 'community', stars: 28, category: 'social', installed: false, icon: '🌍',
    skills: ['30+ languages', 'Context preservation', 'Formal/informal', 'Batch mode'], inputs: ['Source text', 'Target language', 'Formality level'],
  },
  {
    id: 'code-reviewer', name: 'Code Reviewer', description: 'AI-powered code reviews with security scanning, performance analysis, and best-practice suggestions.', author: 'clawops-studio', stars: 76, category: 'coding', installed: false, icon: '👀',
    skills: ['Security scan', 'Perf analysis', 'Style check', 'PR summary'], inputs: ['Code diff', 'Language', 'Framework'],
  },
  {
    id: 'revenue-ops', name: 'Revenue Operations', description: 'Full RevOps toolkit: pipeline analytics, forecasting, rep coaching, and quota management.', author: 'clawops-studio', stars: 44, category: 'analytics', installed: false, icon: '💰',
    skills: ['Pipeline analytics', 'Forecasting', 'Rep coaching', 'Quota tracking'], inputs: ['CRM data', 'Time period', 'Team structure'],
  },
];

// ---------------------------------------------------------------------------
// Skill card
// ---------------------------------------------------------------------------

function SkillCard({ skill, onInstall, onUninstall }: { skill: Skill; onInstall: () => void; onUninstall: () => void }) {
  const [installing, setInstalling] = useState(false);
  const cat = CATEGORIES.find(c => c.id === skill.category)!;

  const handleInstall = () => {
    setInstalling(true);
    setTimeout(() => { setInstalling(false); onInstall(); }, 1200);
  };

  return (
    <div className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 9,
          background: 'var(--material-regular)',
          border: '1px solid var(--separator)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
        }}>
          {skill.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{skill.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>by {skill.author}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <Star size={10} style={{ color: 'var(--accent-energy)' }} />
          <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{skill.stars}</span>
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{skill.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {skill.skills.slice(0, 3).map(s => (
          <span key={s} className="badge badge-gray" style={{ fontSize: 10 }}>{s}</span>
        ))}
        {skill.skills.length > 3 && (
          <span className="badge badge-gray" style={{ fontSize: 10 }}>+{skill.skills.length - 3}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 10, color: cat.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {cat.label}
        </span>
        {skill.installed ? (
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="badge badge-green">
              <Check size={9} /> Installed
            </span>
            <button onClick={onUninstall} className="hover-bg" style={{ padding: '2px 6px', borderRadius: 4, border: 'none', background: 'none', color: 'var(--system-red)', fontSize: 10, cursor: 'pointer' }}>
              Remove
            </button>
          </div>
        ) : (
          <button
            className="btn-primary btn-scale"
            onClick={handleInstall}
            disabled={installing}
            style={{ fontSize: 11, padding: '5px 12px' }}
          >
            {installing ? <><Loader size={11} className="spin" /> Installing...</> : <><Download size={11} /> Install</>}
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SkillsPage() {
  const [skills, setSkills] = useState(SKILLS);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'available' | 'installed'>('available');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const filtered = skills.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === 'installed' ? s.installed : true;
    return matchCat && matchSearch && matchTab;
  });

  const installCount = skills.filter(s => s.installed).length;
  const availableCount = skills.filter(s => !s.installed).length;

  const install = (id: string) => setSkills(s => s.map(sk => sk.id === id ? { ...sk, installed: true } : sk));
  const uninstall = (id: string) => setSkills(s => s.map(sk => sk.id === id ? { ...sk, installed: false } : sk));

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1>Skills Library</h1>
          <p>Browse and install AI agent capabilities from the ClawOps skill marketplace.</p>
        </div>
        <a
          href="https://github.com/clawopsstudio-web/agent-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost btn-scale"
          style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
        >
          <ExternalLink size={13} /> GitHub Repo
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div className="card" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Check size={13} style={{ color: 'var(--system-green)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{installCount} installed</span>
        </div>
        <div className="card" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Download size={13} style={{ color: 'var(--accent)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{availableCount} available</span>
        </div>
      </div>

      {/* Search + Tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
          <input
            className="input"
            placeholder="Search skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </div>
        <div className="tabs">
          <button className={`tab-item ${tab === 'available' ? 'active' : ''}`} onClick={() => setTab('available')}>
            Available
          </button>
          <button className={`tab-item ${tab === 'installed' ? 'active' : ''}`} onClick={() => setTab('installed')}>
            Installed ({installCount})
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="btn-ghost btn-scale"
              style={{
                fontSize: 11, padding: '5px 12px',
                background: activeCategory === cat.id ? 'var(--accent-fill)' : 'transparent',
                border: activeCategory === cat.id ? '1px solid var(--accent)' : '1px solid var(--separator)',
                color: activeCategory === cat.id ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {cat.id !== 'all' && <Icon size={11} />}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skill grid */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {filtered.map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onInstall={() => install(skill.id)}
              onUninstall={() => uninstall(skill.id)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <BookOpen size={32} />
          <p>No skills found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}
