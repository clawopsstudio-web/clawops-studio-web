'use client'

export default function GettingStartedGuide() {
  return (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#f4f7fb',
      lineHeight: 1.7,
    }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
        Getting Started with ClawOps
      </h1>
      <p style={{ color: 'rgba(244,247,251,0.5)', fontSize: 16, marginBottom: 40 }}>
        Your AI-powered Agentic OS — set up in minutes.
      </p>

      <Section title="1. Create Your Account" icon="🚀">
        <Step n="1" text="Go to app.clawops.studio and click Sign Up" />
        <Step n="2" text="Enter your email, create a password, and click Create Account" />
        <Step n="3" text="Check your email for a 6-digit verification code" />
        <Step n="4" text="Enter the code to verify your email — you'll be logged in automatically" />
        <p style={{ marginTop: 16, fontSize: 14, color: 'rgba(244,247,251,0.5)' }}>
          <strong>Alternative:</strong> Sign up with Google or GitHub by clicking the OAuth buttons — no email verification needed.
        </p>
      </Section>

      <Section title="2. Dashboard Overview" icon="🖥️">
        <p style={{ marginBottom: 12 }}>
          After logging in, you land on your personal dashboard. Here's what you see:
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          <li><strong>Home</strong> — Key metrics, recent tasks, and agent status at a glance</li>
          <li><strong>Tasks</strong> — Kanban board to manage your to-dos</li>
          <li><strong>Instances</strong> — Your VPS fleet and their health status</li>
          <li><strong>Mission Control</strong> — Deep system monitoring, logs, and agent management</li>
          <li><strong>Skills Library</strong> — Install AI skills (GHL, Google Workspace, n8n, etc.)</li>
          <li><strong>Integrations</strong> — Connect your tools (GHL, Google, etc.)</li>
          <li><strong>Settings</strong> — Profile, team, and billing</li>
        </ul>
      </Section>

      <Section title="3. Setting Up Your First VPS Instance" icon="🖥️">
        <p style={{ marginBottom: 12 }}>
          If you have a Contabo VPS or plan to deploy one:
        </p>
        <ol style={{ paddingLeft: 20 }}>
          <li>Go to <strong>Instances</strong> in the sidebar</li>
          <li>Click <strong>Register New Instance</strong></li>
          <li>Enter your VPS details (name, IP, tunnel URL from cloudflared)</li>
          <li>The instance will appear in your dashboard with health monitoring</li>
        </ol>
      </Section>

      <Section title="4. Connecting Integrations" icon="🔗">
        <p style={{ marginBottom: 12 }}>
          ClawOps works best when connected to your existing tools:
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>GoHighLevel (GHL)</strong> — Connect your CRM for lead management</li>
          <li><strong>Google Workspace</strong> — Gmail, Drive, Docs, Calendar via n8n MCP</li>
          <li><strong>n8n</strong> — Connect your n8n instance for workflow automation</li>
          <li><strong>Stripe/PayPal</strong> — Payment processing for subscriptions</li>
        </ul>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(244,247,251,0.5)' }}>
          Go to <strong>Integrations</strong> → click a provider → enter your credentials → Save.
        </p>
      </Section>

      <Section title="5. Installing AI Skills" icon="🤖">
        <p style={{ marginBottom: 12 }}>
          Skills extend what your AI agents can do. Install from the Skills Library:
        </p>
        <ol style={{ paddingLeft: 20 }}>
          <li>Go to <strong>Skills Library</strong> in the sidebar</li>
          <li>Browse categories: CRM, Productivity, Automation, Marketing, AI</li>
          <li>Click <strong>Install</strong> on a skill</li>
          <li>Fill in the required configuration (API keys, credentials)</li>
          <li>The skill is now active for your account</li>
        </ol>
      </Section>

      <Section title="6. Managing Tasks" icon="✅">
        <p style={{ marginBottom: 12 }}>
          Use the Tasks board to organize your work:
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>Create tasks with title, description, and priority (low/medium/high)</li>
          <li>View tasks in a Kanban board (To Do → In Progress → Done)</li>
          <li>Assign tasks to yourself or your AI agents</li>
          <li>AI agents can pick up and complete tasks autonomously</li>
        </ul>
      </Section>

      <Section title="7. Using Mission Control" icon="🎛️">
        <p style={{ marginBottom: 12 }}>
          Mission Control gives you deep visibility into your infrastructure:
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Health</strong> — CPU, RAM, disk, and service status</li>
          <li><strong>Agents</strong> — See all running agents and their status</li>
          <li><strong>Sessions</strong> — Live session logs and activity</li>
          <li><strong>Logs</strong> — Real-time log viewer with filters</li>
          <li><strong>Cron</strong> — Scheduled jobs and their status</li>
          <li><strong>Security</strong> — Security scan results and alerts</li>
        </ul>
      </Section>

      <Section title="Need Help?" icon="💬">
        <p>
          If you run into issues, reach out on Telegram or check the other guides in this section.
          Your account is tied to <strong>clawops.studio@gmail.com</strong> for support.
        </p>
      </Section>
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        {title}
      </h2>
      <div style={{ color: 'rgba(244,247,251,0.8)', fontSize: 15 }}>
        {children}
      </div>
    </div>
  )
}

function Step({ n, text }: { n: number | string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'rgba(0, 212, 255, 0.15)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 600, color: '#00D4FF', flexShrink: 0,
      }}>
        {n}
      </div>
      <span style={{ lineHeight: '24px' }}>{text}</span>
    </div>
  )
}
