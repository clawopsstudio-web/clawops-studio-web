'use client'

export default function DashboardTourGuide() {
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
        Dashboard Tour
      </h1>
      <p style={{ color: 'rgba(244,247,251,0.5)', fontSize: 16, marginBottom: 40 }}>
        A walkthrough of every section in the ClawOps dashboard.
      </p>

      <Section title="Home Dashboard" icon="🏠">
        <p style={{ marginBottom: 12 }}>
          The main dashboard shows your key metrics at a glance:
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Active Agents</strong> — Number of AI agents currently running</li>
          <li><strong>Tasks</strong> — Total, pending, and completed task counts</li>
          <li><strong>VPS Instances</strong> — All registered VPS instances and their status</li>
          <li><strong>Recent Tasks</strong> — Quick list of your latest tasks</li>
          <li><strong>System Health</strong> — CPU, RAM, and disk usage (via OpenClaw)</li>
        </ul>
      </Section>

      <Section title="Tasks Board" icon="✅">
        <p style={{ marginBottom: 12 }}>
          Kanban-style task management. Create tasks, set priorities, and track progress.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>Click <strong>New Task</strong> to create a task</li>
          <li>Set title, description, and priority (low/medium/high)</li>
          <li>Tasks appear in <strong>To Do</strong> by default</li>
          <li>Move tasks through <strong>In Progress</strong> → <strong>Done</strong></li>
          <li>You can assign tasks to AI agents for autonomous completion</li>
        </ul>
      </Section>

      <Section title="VPS Instances" icon="🖥️">
        <p style={{ marginBottom: 12 }}>
          Monitor and manage your Contabo VPS instances.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>View all registered VPS instances in one place</li>
          <li>See <strong>status</strong> (online/offline), <strong>IP address</strong>, and <strong>region</strong></li>
          <li>Monitor <strong>last heartbeat</strong> — shows when the VPS last checked in</li>
          <li>Register new instances from the <strong>Register New Instance</strong> button</li>
          <li>Delete instances you're no longer using</li>
        </ul>
      </Section>

      <Section title="Mission Control" icon="🎛️">
        <p style={{ marginBottom: 12 }}>
          Deep system monitoring and agent management. Access from the sidebar.
        </p>

        <h4 style={{ fontSize: 15, fontWeight: 600, margin: '16px 0 8px', color: '#00D4FF' }}>
          Health
        </h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>System health sparklines — CPU, RAM, disk over time</li>
          <li>Service status indicators</li>
          <li>Incident history</li>
        </ul>

        <h4 style={{ fontSize: 15, fontWeight: 600, margin: '16px 0 8px', color: '#00D4FF' }}>
          Agents
        </h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>List of all running agents (Henry, Dev, Dave, etc.)</li>
          <li>Agent status: active/idle/error</li>
          <li>Last active timestamp</li>
          <li>Agent type and configuration</li>
        </ul>

        <h4 style={{ fontSize: 15, fontWeight: 600, margin: '16px 0 8px', color: '#00D4FF' }}>
          Sessions
        </h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>Live session monitor</li>
          <li>Session search and filter</li>
          <li>Resume/replay past sessions</li>
        </ul>

        <h4 style={{ fontSize: 15, fontWeight: 600, margin: '16px 0 8px', color: '#00D4FF' }}>
          Logs
        </h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>Real-time log viewer</li>
          <li>Filter by service, level, or time range</li>
          <li>Download logs for offline analysis</li>
        </ul>

        <h4 style={{ fontSize: 15, fontWeight: 600, margin: '16px 0 8px', color: '#00D4FF' }}>
          Cron
        </h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>Visual pipeline editor for scheduled jobs</li>
          <li>Enable/disable individual jobs</li>
          <li>Run jobs manually on demand</li>
          <li>Dependency viewer</li>
        </ul>

        <h4 style={{ fontSize: 15, fontWeight: 600, margin: '16px 0 8px', color: '#00D4FF' }}>
          Security
        </h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>Overall security score (0-100)</li>
          <li>Watchdog status and recent heal incidents</li>
          <li>Auth failure log</li>
          <li>Open vulnerability list</li>
        </ul>
      </Section>

      <Section title="Skills Library" icon="🧩">
        <p style={{ marginBottom: 12 }}>
          Browse and install AI skills that extend what your agents can do.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>GHL CRM</strong> — Manage leads, pipelines, and SMS from chat</li>
          <li><strong>Google Workspace</strong> — Gmail, Drive, Docs, Sheets, Calendar</li>
          <li><strong>n8n Monitor</strong> — Watch workflows and executions</li>
          <li><strong>Google AI Studio</strong> — Access Gemini models directly</li>
          <li><strong>Social Media (OAuth)</strong> — Twitter, LinkedIn, Facebook via Nango</li>
        </ul>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(244,247,251,0.5)' }}>
          Install a skill → fill in your credentials → the skill is active for your account.
        </p>
      </Section>

      <Section title="Integrations" icon="🔗">
        <p style={{ marginBottom: 12 }}>
          Connect your existing tools so AI agents can use them.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>GoHighLevel (GHL)</strong> — CRM, pipelines, SMS</li>
          <li><strong>n8n</strong> — Workflow automation</li>
          <li><strong>Google Workspace</strong> — Productivity suite</li>
          <li><strong>Stripe/PayPal</strong> — Payment processing</li>
        </ul>
        <p style={{ marginTop: 12, fontSize: 14, color: 'rgba(244,247,251,0.5)' }}>
          Credentials are encrypted and stored securely. Only you and your agents can access them.
        </p>
      </Section>

      <Section title="Settings" icon="⚙️">
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Profile</strong> — Name, avatar, email</li>
          <li><strong>Team</strong> — Invite team members (future)</li>
          <li><strong>API Keys</strong> — Manage your API credentials</li>
          <li><strong>Billing</strong> — Subscription, plans, payment history</li>
          <li><strong>Danger Zone</strong> — Delete account</li>
        </ul>
      </Section>

      <Section title="Guides" icon="📚">
        <p>
          This section contains detailed guides for every feature. Use the sidebar to navigate between guides.
          If you need help, reach out to <strong>clawops.studio@gmail.com</strong>.
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
