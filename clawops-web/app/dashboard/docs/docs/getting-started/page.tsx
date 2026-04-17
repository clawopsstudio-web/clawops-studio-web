'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import { Rocket, User, LayoutDashboard, ArrowRight, ChevronDown, ChevronUp, Check } from 'lucide-react';

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

export default function GettingStartedPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Rocket size={12} />
        <span>Getting Started</span>
      </div>

      <h1 className="doc-h1">Setup &amp; Onboarding</h1>
      <p className="doc-lead">
        Get your ClawOps workspace configured and ready for production.
        This guide walks you through account creation, dashboard orientation, profile setup, and your first task.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { icon: User, label: 'Sign Up', desc: 'Create your account in under 2 minutes' },
            { icon: LayoutDashboard, label: 'Dashboard', desc: 'Learn the main workspace layout' },
            { icon: User, label: 'Profile', desc: 'Set API keys, timezone, and preferences' },
            { icon: Rocket, label: 'First Steps', desc: 'Complete 3 tasks to be production-ready' },
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

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Guide</div>

        {/* Step 1 */}
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Sign Up and Log In</div>
            <div className="doc-step-desc">
              Visit <span className="doc-inline-code">app.clawops.io</span> and create an account with your email.
              If you have a referral link, use it — you'll get bonus credits.
            </div>
            <p className="doc-step-desc">After verifying your email, log in. You'll land on the main dashboard.</p>
            {/* screenshot: signup-login.png */}
            <div className="doc-tip">
              <Rocket size={13} />
              <span>Use a strong password and enable 2FA from the Account page for production workspaces.</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Dashboard Overview</div>
            <div className="doc-step-desc">
              The dashboard has 5 main zones:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Top bar</strong> — Workspace name, agent status, notifications</li>
              <li><strong>Sidebar</strong> — Navigation: CRM, Social, Tasks, Agents, Skills, Tools, Integrations</li>
              <li><strong>Main area</strong> — The active module (changes based on sidebar selection)</li>
              <li><strong>My Tools</strong> — Collapsible section with Chrome VNC, Browser, n8n, Gateway</li>
              <li><strong>Account</strong> — Profile, API keys, billing</li>
            </ul>
            {/* screenshot: dashboard-overview.png */}
          </div>
        </div>

        {/* Step 3 */}
        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Set Up Your Profile</div>
            <div className="doc-step-desc">
              Go to <strong>Account</strong> in the sidebar. Fill in:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li>Display name and timezone (used by agents for scheduling)</li>
              <li>OpenAI API key — enables chat and voice features</li>
              <li>Composio API key — required for social posting</li>
              <li>Telegram bot token — optional, for mobile notifications</li>
            </ul>
            {/* screenshot: account-profile.png */}
            <div className="doc-warning">
              <Rocket size={13} />
              <span>API keys are stored encrypted. Never share them in group chats or public contexts.</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Take Your First Steps</div>
            <div className="doc-step-desc">Complete these 3 tasks to be production-ready:</div>
            {[
              { n: 'A', task: 'Add a contact in CRM', detail: 'Go to CRM → Contacts → Add Contact. Enter name, email, company.' },
              { n: 'B', task: 'Connect a social account', detail: 'Go to Social → Connect Composio. Paste your API key from composio.dev.' },
              { n: 'C', task: 'Spawn an AI agent', detail: 'Go to AI Agents → Spawn Worker. Give it a task like "research competitors".' },
            ].map((item) => (
              <div key={item.n} className="card" style={{ padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-fill)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{item.task}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.detail}</div>
                </div>
              </div>
            ))}
            <div className="doc-tip" style={{ marginTop: 8 }}>
              <Rocket size={13} />
              <span>When all 3 are done, your workspace is live. From here you can add integrations, install skills, and scale operations.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Is there a free plan?" a="Yes. The free tier includes 3 agents, CRM (up to 50 contacts), and access to all integrations. Upgrade to unlock unlimited agents, deals, and social accounts." />
        <FaqItem q="Can I change my email or password?" a="Go to Account → Security. You can update your password there. Email changes require verification." />
        <FaqItem q="How do I invite a team member?" a="Account → Team → Invite. Enter their email and choose a role (Admin, Editor, Viewer). They'll receive an invite link." />
        <FaqItem q="What timezone does the dashboard use?" a="All timestamps use your browser's local timezone, which you can set in Account → Profile." />
        <FaqItem q="I can't log in — what do I do?" a="Check that your email is verified. If you forgot your password, use the 'Forgot Password' link on the login page. If the issue persists, contact support." />
      </div>
    </DocsLayout>
  );
}
