'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  Share2, ExternalLink, ChevronDown, ChevronUp, Calendar, BarChart3,
  Send, Clock, Check, AlertTriangle, Key, Plus, Image, Hash, Zap,
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

export default function SocialDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Share2 size={12} />
        <span>Social Media</span>
      </div>

      <h1 className="doc-h1">Social Media</h1>
      <p className="doc-lead">
        Connect Twitter, LinkedIn, and Instagram via Composio. Compose, schedule, and track
        your social presence — all from one dashboard. Your AI agent can post on your behalf,
        auto-reply to comments, and generate content from a simple chat command.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ background: 'rgba(91,108,255,0.06)', border: '1px solid rgba(91,108,255,0.2)', borderRadius: 10, padding: '16px', marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            ClawOps uses <strong style={{ color: 'var(--text-primary)' }}>Composio</strong> as the connection layer to your social accounts.
            Composio handles the OAuth authentication with each platform, and ClawOps uses your
            Composio API key to trigger posts, replies, and analytics — all server-side, no browser needed.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Twitter/X', 'LinkedIn', 'Instagram', 'Auto-Post', 'Schedule Posts', 'Analytics', 'AI Generation'].map((f) => (
              <span key={f} style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: 'rgba(91,108,255,0.1)', color: '#5B6CFF' }}>{f}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { icon: ExternalLink, label: 'Composio', desc: 'API connection layer' },
            { icon: Send, label: 'Compose', desc: 'Write posts in-app' },
            { icon: Calendar, label: 'Schedule', desc: 'Queue posts for later' },
            { icon: BarChart3, label: 'Analytics', desc: 'Track performance' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent-fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
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

      {/* ─────────────────────────────────────────── */}
      {/* Composio Setup */}
      {/* ─────────────────────────────────────────── */}
      <div className="doc-section">
        <div className="doc-section-title">Connect Composio — Full Setup Guide</div>

        <div style={{ background: 'rgba(91,108,255,0.05)', border: '1px solid rgba(91,108,255,0.15)', borderRadius: 8, padding: '12px 16px', marginBottom: 20 }}>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            <strong style={{ color: '#5B6CFF' }}>Composio</strong> is free to sign up and is the only thing you need to connect
            your social accounts to ClawOps. Takes about <strong>10 minutes</strong> total.
          </p>
        </div>

        {/* Step 1 */}
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Sign Up for Composio (Free)</div>
            <div className="doc-step-desc">
              Go to Composio and create your free account.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Open <span className="doc-inline-code">composio.dev</span> in your browser</li>
              <li>Click <strong>Sign Up</strong> in the top-right corner</li>
              <li>Choose <strong>Continue with Google</strong> — fastest option (30 seconds)</li>
              <li>Accept the terms of service</li>
              <li>Verify your email if prompted</li>
              <li>You're in — free plan gives <strong>100 API credits/month</strong></li>
            </ol>
            <div className="doc-tip">
              <Check size={13} />
              <span>100 credits = ~100 social actions (post, like, comment). Each scheduled post uses 1 credit. Upgrade when you're posting daily.</span>
            </div>
            {/* screenshot: composio-signup.png */}
          </div>
        </div>

        {/* Step 2 */}
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect Twitter (X)</div>
            <div className="doc-step-desc">
              Connect your Twitter/X account so the agent can post on your behalf.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In Composio sidebar, click <strong>Connected Accounts</strong></li>
              <li>Click the big <strong>+ Connect App</strong> button</li>
              <li>Search for <strong>Twitter</strong> (or "X") in the app list</li>
              <li>Click <strong>Connect</strong> on the Twitter card</li>
              <li>A Twitter login popup opens — log in and click <strong>Authorize App</strong></li>
              <li>You're redirected back — Twitter shows as <span className="badge badge-green">Connected</span></li>
            </ol>
            <div className="doc-warning">
              <AlertTriangle size={13} />
              <span>Your Twitter must have 2FA enabled for Composio to connect. If you see an error, go to Twitter Settings → Security and enable 2FA, then try again.</span>
            </div>
            {/* screenshot: composio-connect-twitter.png */}
          </div>
        </div>

        {/* Step 3 */}
        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect LinkedIn</div>
            <div className="doc-step-desc">
              Same process for LinkedIn — connect your personal profile or company page.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In Composio → <strong>Connected Accounts</strong></li>
              <li>Click <strong>+ Connect App</strong></li>
              <li>Search for and select <strong>LinkedIn</strong></li>
              <li>Click <strong>Connect</strong></li>
              <li>Log in to LinkedIn in the popup — click <strong>Allow</strong></li>
              <li>LinkedIn shows as <span className="badge badge-green">Connected</span></li>
            </ol>
            <p className="doc-step-desc">
              To connect a <strong>LinkedIn Company Page</strong> (not just your personal profile):
              in Composio, search for "LinkedIn Pages" in the connect menu and authorize that separately.
            </p>
            {/* screenshot: composio-connect-linkedin.png */}
          </div>
        </div>

        {/* Step 4 */}
        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Copy Your Composio API Key</div>
            <div className="doc-step-desc">
              This key tells ClawOps how to access your Composio account.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In Composio, click <strong>Settings</strong> (gear icon) in the left sidebar</li>
              <li>Click <strong>API Keys</strong></li>
              <li>Click <strong>+ Generate New Key</strong></li>
              <li>Name it: <span className="doc-inline-code">ClawOps Agent</span></li>
              <li>Click <strong>Generate</strong></li>
              <li><strong>Copy the key immediately</strong> — Composio only shows it once</li>
            </ol>
            {/* screenshot: composio-api-key.png */}
          </div>
        </div>

        {/* Step 5 */}
        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Paste API Key in ClawOps</div>
            <div className="doc-step-desc">
              Now connect Composio to your ClawOps workspace.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In ClawOps, go to <strong>Social</strong> in the sidebar</li>
              <li>Click <strong>Composio Settings</strong> at the top</li>
              <li>Paste your API key into the <strong>Composio API Key</strong> field</li>
              <li>Click <strong>Save</strong></li>
              <li>You'll see <span className="badge badge-green">Connected</span> — your social accounts are live</li>
            </ol>
            <div className="doc-tip">
              <Key size={13} />
              <span>You can also add the Composio key in <strong>Account → API Keys</strong> if you prefer to keep all keys in one place.</span>
            </div>
            {/* screenshot: social-composio-key-paste.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* ─────────────────────────────────────────── */}
      {/* Posting */}
      {/* ─────────────────────────────────────────── */}
      <div className="doc-section">
        <div className="doc-section-title">Compose and Post Content</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Open the Compose Window</div>
            <div className="doc-step-desc">
              Go to <strong>Social</strong> in the sidebar. Click <strong>New Post</strong>.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>+ New Post</strong> in the top-right</li>
              <li>A compose editor opens with platform selector at the top</li>
              <li>Toggle the platforms you want: Twitter, LinkedIn, or both</li>
            </ol>
            {/* screenshot: social-compose-open.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Write Your Content</div>
            <div className="doc-step-desc">
              The editor adapts to each platform. Character limits update live.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Twitter:</strong> 280 characters — counter turns red when exceeded</li>
              <li><strong>LinkedIn:</strong> 3,000 characters — supports longer-form posts</li>
              <li><strong>Instagram:</strong> 2,200 characters — focus on visual + short caption</li>
            </ul>
            <p className="doc-step-desc">
              <strong>Add an image:</strong> Click the image icon → select from your workspace or upload from your computer.
              <strong>Add hashtags:</strong> Click the hashtag icon → AI suggests relevant tags based on your content.
            </p>
            {/* screenshot: social-compose-editor.png */}
            <div className="doc-tip">
              <Zap size={13} />
              <span>Use the <strong>AI Assistant</strong> button in the compose window to generate 3 post variations, rewrite in a different tone, or get hashtag suggestions automatically.</span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Post Now or Schedule</div>
            <div className="doc-step-desc">
              At the bottom of the compose window, choose how to publish:
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Post Now</strong> — publishes immediately across selected platforms</li>
              <li><strong>Schedule</strong> — opens date/time picker, queues for later</li>
              <li><strong>Optimal Time</strong> — AI picks the best posting time based on your audience</li>
            </ul>
            <p className="doc-step-desc">
              Scheduled posts appear in the <strong>Scheduled</strong> tab. You can edit or cancel them any time before they go live.
            </p>
            {/* screenshot: social-compose-actions.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">AI Agent Can Post for You</div>
            <div className="doc-step-desc">
              The most powerful feature: delegate social posting to your AI agent with a single chat message.
            </div>
            <div style={{ background: 'var(--code-bg)', border: '1px solid var(--separator)', borderRadius: 6, padding: '12px 16px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 10 }}>
              @agent Post to Twitter: "Excited to announce our new AI workflow feature! 🚀{'\n'}{'\n'}
              @agent Write a LinkedIn post about our Q2 results and schedule it for tomorrow at 10 AM{'\n'}{'\n'}
              @agent Post the same content to both Twitter and LinkedIn{'\n'}{'\n'}
              @agent Reply to all new comments on our most recent LinkedIn post
            </div>
            <div className="doc-tip">
              <Zap size={13} />
              <span>The agent uses your Composio account to post — it's posting as you, with your voice and branding. Review the content before posting in the compose window if you want to approve first.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Analytics */}
      <div className="doc-section">
        <div className="doc-section-title">Analytics</div>
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">View Your Analytics</div>
            <div className="doc-step-desc">
              Click the <strong>Analytics</strong> tab in the Social section.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Impressions</strong> — total views across all posts and platforms</li>
              <li><strong>Engagements</strong> — likes, comments, shares, and link clicks combined</li>
              <li><strong>Follower growth</strong> — net new followers per day, week, and month</li>
              <li><strong>Top posts</strong> — your best-performing content ranked by engagement rate</li>
              <li><strong>Platform breakdown</strong> — Twitter vs LinkedIn vs Instagram side by side</li>
            </ul>
            <p className="doc-step-desc">
              Click <strong>Export CSV</strong> in the top-right to download your analytics as a spreadsheet for reporting.
            </p>
            {/* screenshot: social-analytics.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Which platforms are supported?" a="Twitter/X, LinkedIn, and Instagram are fully supported. Facebook and TikTok are on the roadmap for Q3 2026." />
        <FaqItem q="How do I reconnect an expired social account?" a="Go to composio.dev → Connected Accounts. Disconnect the affected account, then reconnect it from the + Connect App menu. After reconnecting, re-authorize ClawOps access when prompted." />
        <FaqItem q="Can I post to multiple platforms at once?" a="Yes. In the compose window, toggle all platforms you want. The post adapts to each platform's format — Twitter gets a short version, LinkedIn gets the full post, etc." />
        <FaqItem q="Do scheduled posts fail if I'm offline?" a="No. Scheduled posts are executed server-side by ClawOps agents. As long as your Composio account is active and has credits, posts go out on schedule automatically." />
        <FaqItem q="How many posts can I schedule?" a="Unlimited on Pro plan. Free plan allows up to 10 scheduled posts at a time." />
        <FaqItem q="How do I know if my Composio credits are running low?" a="ClawOps shows a warning badge on the Social page when you have fewer than 20 credits remaining. You can also check usage at composio.dev → Settings → Usage." />
        <FaqItem q="Can the AI agent auto-reply to comments?" a="Yes. Tell your agent: '@agent reply to all new comments on my latest Twitter post' and it will use Composio to respond to each commenter." />
      </div>
    </DocsLayout>
  );
}
