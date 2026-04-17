'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import {
  BookOpen, Monitor, Eye, Lock, Clock, Play,
  ChevronDown, ChevronUp, ExternalLink, Globe,
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

export default function BrowserAutomationDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <BookOpen size={12} />
        <span>Browser Automation</span>
      </div>

      <h1 className="doc-h1">Browser Automation</h1>
      <p className="doc-lead">
        Give your AI agent a pair of eyes and hands in the browser.
        Use Chrome VNC for visual control and session persistence,
        or camoufox for stealth headless browsing. Automate scraping, form filling,
        login flows, and more — all controlled by your AI agent.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
          {[
            { icon: Monitor, label: 'Chrome VNC', desc: 'Visual shared browser you can watch' },
            { icon: Eye, label: 'Session Persistence', desc: 'Stay logged into any website' },
            { icon: Globe, label: 'Web Scraping', desc: 'Extract data from any page' },
            { icon: Lock, label: 'Anti-Detection', desc: 'Avoid bot detection on sites' },
            { icon: Play, label: 'Form Automation', desc: 'Auto-fill and submit forms' },
            { icon: Clock, label: 'Headless Mode', desc: 'Run camoufox without a visible window' },
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

      {/* Chrome VNC */}
      <div className="doc-section">
        <div className="doc-section-title">Chrome VNC — Visual Shared Browser</div>
        <p className="doc-step-desc">
          <strong>Chrome VNC</strong> is a real, full Chrome browser running on your VPS
          that you can see and interact with through the dashboard. Think of it as
          "remote desktop for your AI agent" — you watch the agent work in the browser
          in real time.
        </p>

        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Open Chrome VNC from the Dashboard</div>
            <div className="doc-step-desc">
              In the <strong>My Tools</strong> section of the sidebar, click{' '}
              <strong>Chrome VNC</strong>. The browser opens in a new tab or embedded view.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Open <strong>My Tools</strong> in the sidebar</li>
              <li>Click <strong>Chrome VNC</strong></li>
              <li>The Chrome browser opens — you'll see the browser window in the dashboard</li>
              <li>The AI agent can see and interact with the same browser</li>
            </ol>
            {/* screenshot: chrome-vnc-open.png */}
            <div className="doc-tip">
              <ExternalLink size={13} />
              <span>
                You can also open Chrome VNC directly at{' '}
                <span className="doc-inline-code">https://vmi3094584-1.tailec7a72.ts.net/chrome/</span>{' '}
                (requires Tailscale connection). The agent sees the same session.
              </span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Log In and Save Your Session</div>
            <div className="doc-step-desc">
              Once Chrome VNC is open, log into any website normally (LinkedIn,
              Twitter, GHL, etc.). Your login session is <strong>persistent</strong> —
              it survives browser restarts and agent restarts.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Log into websites in Chrome VNC just like your regular browser</li>
              <li>Sessions persist across restarts (stored in your VPS filesystem)</li>
              <li>Your AI agent can use these sessions to act on your behalf</li>
              <li>Multiple profiles are supported (one per website or client)</li>
            </ul>
            <div className="doc-warning">
              <Lock size={13} />
              <span>
                <strong>Security:</strong> Only log into accounts you control. Don't use Chrome VNC
                for highly sensitive accounts without understanding the session is stored on your VPS.
              </span>
            </div>
          </div>
        </div>

        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">How the Agent Uses the Browser</div>
            <div className="doc-step-desc">
              When you ask your agent to do browser tasks, it uses Chrome VNC to:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, marginBottom: 10 }}>
              {[
                'Visit websites and take screenshots',
                'Scrape page content (text, prices, listings)',
                'Fill and submit forms',
                'Post on LinkedIn or Twitter',
                'Manage GHL pipelines visually',
                'Extract data from web dashboards',
                'Click through multi-step flows',
                'Download files from web interfaces',
              ].map((task) => (
                <div key={task} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '6px 10px', background: 'var(--fill-secondary)', borderRadius: 5, lineHeight: 1.4 }}>
                  {task}
                </div>
              ))}
            </div>
            <p className="doc-step-desc">
              Example prompt: <em>"Go to LinkedIn, search for 'VP of Marketing at [company]',
              visit 5 profiles, and extract their email addresses."</em>
            </p>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Camoufox */}
      <div className="doc-section">
        <div className="doc-section-title">Camoufox — Stealth Headless Browser</div>
        <p className="doc-step-desc">
          <strong>Camoufox</strong> is a headless browser (runs without a visible window)
          designed to avoid bot detection. Where Chrome VNC shows you what's happening,
          camoufox runs invisibly in the background — faster and more stealthy.
        </p>
        <div className="doc-tip">
          <Eye size={13} />
          <span>
            <strong>When to use Camoufox:</strong> Scraping large amounts of data,
            automated form submission at scale, accessing anti-bot protected sites.
            <strong>When to use Chrome VNC:</strong> Interactive tasks, watching agent work,
            debugging, one-off automations where visual confirmation matters.
          </span>
        </div>
        <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
          <li><strong>Anti-detection</strong> — rotates user agents, mouse movements, and fingerprints</li>
          <li><strong>Headless</strong> — no GUI, runs 2-5x faster than visible browsers</li>
          <li><strong>Session profiles</strong> — supports multiple browser profiles</li>
          <li><strong>Proxy support</strong> — route traffic through proxies for geo-targeting</li>
        </ul>
        {/* screenshot: camoufox-diagram.png */}
      </div>

      <div className="doc-divider" />

      {/* Session Persistence */}
      <div className="doc-section">
        <div className="doc-section-title">Session Persistence — Stay Logged In</div>
        <p className="doc-step-desc">
          One of the most powerful features of browser automation in ClawOps is{' '}
          <strong>session persistence</strong>. Your browser sessions are stored on your VPS,
          which means:
        </p>
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Persistent Login Sessions</div>
            <div className="doc-step-desc">
              Log into LinkedIn, Twitter, Gmail, GHL, or any site{' '}
              <strong>once</strong> in Chrome VNC. The session cookie is saved
              on your VPS. When your agent restarts or you reconnect, you're still logged in.
            </div>
          </div>
        </div>
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Profile-Based Sessions</div>
            <div className="doc-step-desc">
              Create multiple browser profiles — one per client, per website, or per use case.
              Each profile stores its own logins independently.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Open Chrome VNC</li>
              <li>Click the profile icon (top right of Chrome)</li>
              <li>Create a new profile (e.g., "Client ABC")</li>
              <li>Log into the relevant sites in that profile</li>
              <li>The agent can target a specific profile when automating</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* Anti-Detection */}
      <div className="doc-section">
        <div className="doc-section-title">Anti-Detection Explained</div>
        <p className="doc-step-desc">
          Many websites block bots using fingerprinting, CAPTCHAs, and behavioral analysis.
          ClawOps uses multiple layers to avoid detection:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 10 }}>
          {[
            { title: 'Human-like Mouse Paths', desc: 'Camoufox moves the mouse naturally, not in straight lines' },
            { title: 'Rotating User Agents', desc: 'Changes browser identity on each session' },
            { title: 'Canvas & WebGL Fingerprinting', desc: 'Spoofs browser graphics signatures' },
            { title: 'Built-in CAPTCHA Solving', desc: 'Integrates with anti-CAPTCHA services' },
            { title: 'Proxy Rotation', desc: 'Route through different IPs for geo-testing' },
            { title: 'Stealth Headers', desc: 'Removes browser automation headers that expose bots' },
          ].map((item) => (
            <div key={item.title} className="card" style={{ padding: '14px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="doc-warning">
          <Lock size={13} />
          <span>
            <strong>Disclaimer:</strong> Browser automation tools can be against website terms of service.
            Use responsibly. ClawOps is not responsible for account suspensions caused by automated browsing.
          </span>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="What's the difference between Chrome VNC and camoufox?" a="Chrome VNC is a visible, full Chrome browser you can watch and interact with — good for interactive automation, debugging, and tasks where visual confirmation matters. Camoufox is a headless (invisible) browser optimized for stealth — good for large-scale scraping and avoiding bot detection." />
        <FaqItem q="Can I use my own browser profile?" a="Yes. Chrome VNC supports multiple profiles. Create a new Chrome profile, log into your accounts, and the agent can use that profile. Your regular browser and the VNC browser are completely separate." />
        <FaqItem q="How do I share a browser session with the agent?" a="The agent automatically has access to all Chrome VNC sessions. When you ask the agent to do something in LinkedIn, it uses the session you logged in with in Chrome VNC." />
        <FaqItem q="Why is a website blocking my agent?" a="Some sites have aggressive bot detection. Try camoufox for those sites — it's specifically designed to evade detection. If still blocked, use a proxy with geo-location matching your target audience." />
        <FaqItem q="Can the agent take screenshots?" a="Yes. Both Chrome VNC and camoufox support screenshot capture. Chrome VNC screenshots are shown in the dashboard; camoufox saves them to your workspace files." />
        <FaqItem q="How long do sessions last?" a="Browser sessions persist until you explicitly clear them or delete the profile. VPS reboots don't clear sessions — the browser profile data is stored on disk." />
      </div>
    </DocsLayout>
  );
}
