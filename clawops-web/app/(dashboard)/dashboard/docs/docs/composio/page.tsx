'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Share2, Twitter, Linkedin, Instagram,
  ChevronDown, ChevronUp, Key, CheckCircle, Zap,
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

export default function ComposioDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Composio</span>
      </div>

      <h1 className="doc-h1">Composio — Social Media Integration</h1>
      <p className="doc-lead">
        Composio connects your AI agent to social media platforms —
        Twitter/X, LinkedIn, and Instagram — so your agent can post, schedule,
        auto-reply, and analyze without you touching the apps.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: Share2, label: 'One-Click Connect', desc: 'Connect Twitter, LinkedIn, Instagram in minutes' },
            { icon: Zap, label: 'AI-Powered Posting', desc: 'Agent posts on your behalf automatically' },
            { icon: Twitter, label: 'Twitter / X', desc: 'Post, reply, retweet, schedule' },
            { icon: Linkedin, label: 'LinkedIn', desc: 'Post articles, comment, connect' },
            { icon: Instagram, label: 'Instagram', desc: 'Schedule posts and stories' },
            { icon: CheckCircle, label: 'Auto-Reply', desc: 'Agent responds to DMs and comments' },
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

      {/* What is Composio */}
      <div className="doc-section">
        <div className="doc-section-title">What is Composio?</div>
        <p className="doc-step-desc">
          <strong>Composio</strong> (<span className="doc-inline-code">composio.dev</span>) is a
          social media and tool integration platform. It provides OAuth connections to popular
          platforms (Twitter, LinkedIn, Instagram) and exposes them as tools your AI agent
          can use via a simple API key.
        </p>
        <p className="doc-step-desc">
          Instead of building your own OAuth flows for each social platform, Composio handles
          the authentication and gives you one unified API. Your AI agent calls Composio,
          Composio posts to the right platform.
        </p>
        <div className="doc-tip">
          <Zap size={13} />
          <span>
            <strong>Free tier:</strong> Composio's free plan includes Twitter, LinkedIn, and
            Instagram connections with a generous monthly request limit. Perfect for testing
            and small businesses.
          </span>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step setup */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Setup</div>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Sign Up at composio.dev</div>
            <div className="doc-step-desc">
              Go to <span className="doc-inline-code">composio.dev</span> and create a free account.
              Use the same email you use for your social accounts if prompted.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Visit <strong>composio.dev</strong></li>
              <li>Click <strong>Sign Up</strong> (top right)</li>
              <li>Enter your email or sign up with Google/GitHub</li>
              <li>Verify your email if required</li>
              <li>You're landed on the Composio dashboard</li>
            </ol>
            {/* screenshot: composio-signup.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect Twitter</div>
            <div className="doc-step-desc">
              In Composio, connect your Twitter/X account:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In the Composio dashboard, click <strong>Connect App</strong> (left sidebar)</li>
              <li>Search for <strong>Twitter</strong> (or X)</li>
              <li>Click <strong>Connect</strong></li>
              <li>You'll be redirected to Twitter — click <strong>Authorize App</strong></li>
              <li>You'll be redirected back to Composio</li>
              <li>Twitter shows as <span className="doc-badge">Connected</span></li>
            </ol>
            {/* screenshot: composio-connect-twitter.png */}
            <div className="doc-tip">
              <Twitter size={13} />
              <span>
                <strong>Note:</strong> Twitter requires a professional account (or at minimum
                an account without age restrictions) for third-party API access. Ensure your
                Twitter account is in good standing before connecting.
              </span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect LinkedIn</div>
            <div className="doc-step-desc">
              Follow the same process for LinkedIn:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>Connect App</strong></li>
              <li>Search for <strong>LinkedIn</strong></li>
              <li>Click <strong>Connect</strong></li>
              <li>Log into LinkedIn if not already logged in</li>
              <li>Click <strong>Allow</strong> to authorize Composio</li>
              <li>LinkedIn shows as <span className="doc-badge">Connected</span></li>
            </ol>
            {/* screenshot: composio-connect-linkedin.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Connect Instagram</div>
            <div className="doc-step-desc">
              Instagram requires a <strong>Business or Creator account</strong>:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>First, convert your Instagram to a Business or Creator account in the Instagram app</li>
              <li>In Composio, click <strong>Connect App</strong></li>
              <li>Search for <strong>Instagram</strong></li>
              <li>Click <strong>Connect</strong> and log into Instagram</li>
              <li>Authorize Composio to manage your content</li>
              <li>Instagram shows as <span className="doc-badge">Connected</span></li>
            </ol>
            {/* screenshot: composio-connect-instagram.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Get Your API Key</div>
            <div className="doc-step-desc">
              Composio uses an API key to authenticate your agent:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>In Composio, go to <strong>Settings</strong> (bottom of left sidebar)</li>
              <li>Click <strong>API Keys</strong></li>
              <li>Click <strong>Create New Key</strong> (or your existing key if you have one)</li>
              <li>Give it a name like "ClawOps Agent"</li>
              <li>Copy the entire API key — it starts with <span className="doc-inline-code">cmp_...</span></li>
            </ol>
            <div className="doc-warning">
              <Key size={13} />
              <span>
                <strong>Keep it secret:</strong> Your API key gives full access to all connected accounts.
                Never share it publicly or paste it in chat. Use the dashboard's secure API key storage.
              </span>
            </div>
            {/* screenshot: composio-api-key.png */}
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">6</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Paste API Key in ClawOps Dashboard</div>
            <div className="doc-step-desc">
              Now connect Composio to your ClawOps workspace:
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Go to <strong>Social</strong> in the ClawOps sidebar</li>
              <li>Click <strong>Composio Settings</strong></li>
              <li>Paste your Composio API key into the field</li>
              <li>Click <strong>Save & Test</strong></li>
              <li>You'll see a confirmation: connected platforms listed ✓</li>
            </ol>
            <div className="doc-tip">
              <CheckCircle size={13} />
              <span>
                The test will show which platforms are successfully connected.
                If a platform shows as disconnected, go back to Composio and
                reconnect it, then test again.
              </span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">7</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Your Agent Can Now Post</div>
            <div className="doc-step-desc">
              Once connected, your agent can execute social media tasks directly:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { platform: 'Twitter/X', actions: ['Post a tweet', 'Reply to mentions', 'Retweet', 'Schedule posts', 'Auto-reply to DMs'] },
                { platform: 'LinkedIn', actions: ['Post text updates', 'Publish articles', 'Comment on posts', 'Schedule posts'] },
                { platform: 'Instagram', actions: ['Schedule posts', 'Schedule stories', 'Auto-reply to DMs'] },
              ].map((p) => (
                <div key={p.platform} className="card" style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginBottom: 6 }}>{p.platform}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.actions.map((a) => (
                      <span key={a} style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, background: 'var(--fill-secondary)', color: 'var(--text-secondary)' }}>{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Is Composio free?" a="Composio has a free tier with generous limits for Twitter, LinkedIn, and Instagram. The free tier includes up to 100 API calls/month. Paid plans start at $9/month for higher limits." />
        <FaqItem q="Can my agent post without my approval?" a="Yes — once Composio is connected, your agent can post autonomously. To prevent unwanted posts, set clear instructions (e.g., 'Only post content I've approved' or 'Send me a preview before posting')." />
        <FaqItem q="Can I connect multiple accounts per platform?" a="Yes. Composio supports multiple connected accounts per platform. In the ClawOps dashboard, you can specify which account to use for each task." />
        <FaqItem q="What happens if I revoke Composio access from Twitter/LinkedIn?" a="If you revoke access in the social platform's settings, Composio (and your agent) will lose the ability to post. Reconnect in Composio to restore access." />
        <FaqItem q="Can the agent auto-reply to comments and DMs?" a="Yes. Once Composio is connected, your agent can monitor mentions, comments, and DMs — and respond automatically based on your defined rules or AI-generated replies." />
        <FaqItem q="Does Composio support scheduling?" a="Yes. You can schedule posts in advance. Your agent can also schedule posts for specific times when you give it content and a date/time." />
      </div>
    </DocsLayout>
  );
}
