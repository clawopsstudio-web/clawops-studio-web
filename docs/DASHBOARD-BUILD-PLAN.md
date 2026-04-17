# ClawOps — Clean Dashboard Build Plan
**Date:** 2026-04-16
**Status:** Ready to execute

---

## The Two Problems We Solved Before

### Problem 1: Separate Login for Each Tool
**We solved this before with clawops-web.**
User logs in once → session cookie → middleware validates → proxy forwards → user never sees a second login screen.
**We do NOT repeat this mistake.** Single login. Everything accessible from dashboard.

### Problem 2: Iframe URL Breaking (RSC params)
**We solved this before.**
Next.js adds `_rsc=` params to URLs. Iframes break. We used authenticated proxy routes instead.
**We do NOT use iframes.** Clean URL paths. User sees the actual tool UI.

---

## Auth Strategy: Single Login

```
User logs in (InsForge JWT)
         ↓
Session cookie set
         ↓
Middleware validates cookie on every route
         ↓
All tools accessible — no separate login for any tool
```

---

## URL Path Strategy

Each tool gets a clean URL path under the user's dashboard. No iframes.

```
app.clawops.studio/{accountSlug}/dashboard/      → Main dashboard
app.clawops.studio/{accountSlug}/dashboard/crm  → CRM
app.clawops.studio/{accountSlug}/dashboard/social → Social (Composio)
app.clawops.studio/{accountSlug}/dashboard/tasks  → Tasks Kanban
app.clawops.studio/{accountSlug}/dashboard/agents → AI Agents
app.clawops.studio/{accountSlug}/dashboard/skills → Skills Library
app.clawops.studio/{accountSlug}/dashboard/tools  → Tools/Plugins
app.clawops.studio/{accountSlug}/dashboard/settings → Settings
app.clawops.studio/{accountSlug}/dashboard/account → Account, Team, Billing

app.clawops.studio/{accountSlug}/n8n            → N8n (proxy → :5678)
app.clawops.studio/{accountSlug}/browser         → Agent Browser (proxy)
app.clawops.studio/{accountSlug}/stealth         → Camoufox (proxy → :9377)
app.clawops.studio/{accountSlug}/gateway        → OpenClaw Gateway (proxy → :18789)

ops.clawops.studio/                        → Mission Control
ops.clawops.studio/agents                 → Fleet overview
```

Middleware validates JWT on every route. Proxy strips auth headers and forwards cleanly. No RSC params, no iframe breakage.

---

## Agentic OS — Structure

```
🏠 Dashboard
   Key metrics, leads today, social schedule, tasks due, agent status

📊 CRM
   Contacts (list + detail)
   Companies
   Deals Pipeline (Kanban: Lead → Qualified → Proposal → Won/Lost)

🤖 AI Agents
   Active Workers (ZeroClaw + spawned agents)
   Create New Agent (task-specific worker)
   Assign Task to Agent
   Monitor Activity + Outputs
   Memory / Context per Agent
   Spawn Workers (OpenClaw native spawning)
   Agent Team Chat (@mention agents)
   OpenAgents Workspace (shared context, persistent URL)

📱 Social
   Compose (Composio: Twitter, LinkedIn, Instagram, Facebook)
   Calendar (scheduled posts)
   Analytics (engagement, reach, followers)
   Connected Accounts (Composio OAuth per account)

📋 Tasks
   Kanban Board (To Do / In Progress / Done)
   My Tasks
   Assign to AI (send task to ZeroClaw)

🔗 Integrations
   GHL (GoHighLevel)
      Location ID: ___________
      API Key: _____________
   Google Workspace (Drive, Gmail, Calendar)
   N8n Workflows → /n8n (clean URL, no iframe)
   Stripe
   Other APIs

🧩 Skills
   Browse Skills (from GitHub)
   Installed Skills
   Install New → one click
   Skill Settings

🛠️ Tools
   MCP Servers (Smithree registry)
   Browse Plugins
   Installed Plugins
   Plugin Settings

🌐 Agent Browser
   Shared Browser (agent-browser WebSocket — user + agent same view)
   Stealth Mode (camoufox — autonomous tasks, bypasses detection)
   Session History

⚙️ Settings
   Profile (name, avatar, password)
   Team Members + Permissions (invite, role management)
   Integrations (GHL credentials, Composio, Google Workspace)
   API Keys
   Billing + Subscription Upgrade
   Usage & Limits
   Danger Zone (delete account)
```

---

## Mission Control — Structure

```
🏠 Overview
   Health indicators (CPU, RAM, disk, uptime)
   Active sessions count
   Alerts + incidents
   System sparklines

🚀 Fleet
   All client VPS instances
   Status: online / offline / degraded
   Resource usage per instance
   Alerts per client
   Quick actions (restart, heal, SSH)

💰 Costs
   Token spend per client
   Per-agent breakdown
   Week-over-week trending
   Anomaly alerts

📡 Sessions
   Live session monitor (all agents)
   Session search + filter
   Resume / replay session
   Session timeline

🤖 AI Agents
   Hermes ops agent (chat-based — runs openclaw doctor/heal/restart from chat)
   ZeroClaw (user's agent — monitor status)
   Spawned workers (task-specific)
   @mention to delegate tasks
   Shared workspace (OpenAgents concept)
   Persistent URL for workspace

🔒 Security
   Overall scan score (0-100)
   Watchdog status
   Heal incidents (last 7 days)
   Recent auth failures
   Open vulnerabilities

📜 Logs
   Real-time log viewer
   Filter: service / level / client / time
   Download logs

🌐 Browser
   Agent Browser (shared — both see same view)
   camoufox Stealth Mode (autonomous tasks)
   Session isolation per client

🧰 Scripts
   Run heal.sh (auto-fix gateway issues)
   Run security-scan.sh (full scan)
   Watchdog Status (last run, next run)
   Run daily-digest.sh
   Incident history

⚡ Cron
   Visual DAG pipeline editor
   Job list (enable/disable)
   Run manually
   Dependency viewer

🔧 Settings
   OpenClaw config editor (live)
   Alert thresholds
   Gateway settings
   Team access
```

---

## Dashboard Repo Decision

| Repo | Decision | Why |
|-------|-----------|-----|
| **ChristianAlmurr/openclaw-dashboard** | FORK AS BASE | MIT licensed, Next.js + TypeScript + Tailwind, beautiful UI. Fork it. |
| actionagentai/openclaw-dashboard | ALREADY RUNNING | Our Mission Control on port 3001. Keep separate. |
| tugcantopaloglu/openclaw-dashboard | PULL FEATURES | TOTP MFA, live feed, system health sparklines |

**We fork ChristianAlmurr → `clawops-clients`** as the base for Agentic OS.
We replace irrelevant pages (competitors, market-intel, practitioner-signals, tech-updates) with our own.

---

## InsForge Database Schema (Multi-Tenant SaaS)

Every row has `account_id` — this is what makes it a proper SaaS with isolated data per client.

```
accounts
├── id (UUID)
├── name (company/business name)
├── slug (URL-friendly unique: acme-corp)
├── plan (free/trial/professional/agency)
├── stripe_customer_id
├── ghl_location_id (encrypted)
├── ghl_api_key (encrypted)
├── composio_api_key (encrypted)
├── created_at, updated_at
└── trial_ends_at

users
├── id (UUID)
├── account_id (FK → accounts.id)
├── email (unique per account)
├── name, avatar_url
├── role (owner/admin/member/viewer)
├── password_hash (bcrypt)
├── ghl_credentials (encrypted JSONB)
├── composio_credentials (encrypted JSONB)
├── created_at, last_login_at, updated_at
└── suspended (boolean)

invitations
├── id, account_id, email, role, token, expires_at
└── accepted_at

contacts
├── id, account_id (FK → accounts.id)
├── name, email, phone, company_id
├── custom_fields (JSONB), tags (text[])
├── owner_id (FK → users.id)
└── created_at, updated_at

companies
├── id, account_id (FK → accounts.id)
├── name, domain, industry, size, address
└── created_at, updated_at

deals
├── id, account_id (FK → accounts.id)
├── title, contact_id, company_id
├── stage (lead/qualified/proposal/won/lost)
├── value, probability, currency
├── owner_id (FK → users.id)
└── created_at, updated_at, closed_at

tasks
├── id, account_id (FK → accounts.id)
├── title, description, status
├── board_id, column_id, assignee_id, due_date
├── position
└── created_at, updated_at

boards
├── id, account_id, name, type (tasks/deals)
└── columns (JSONB: [{id, name, color}])

ai_agents
├── id, account_id, name, type (zeroclaw/spawned)
├── status (active/idle/error)
├── memory_context (text)
└── created_at, last_active_at

integrations
├── id, account_id, provider (ghl/composio/stripe/gmail/etc)
├── credentials (encrypted JSONB)
├── status (connected/disconnected/error)
├── last_synced_at
└── created_at, updated_at

billing_events
├── id, account_id, stripe_event_id
├── event_type (subscription_created/updated/cancelled/etc)
├── payload (JSONB)
└── created_at
```

**Key SaaS patterns:**
- Every table has `account_id` → data isolated per client
- `accounts.slug` → `app.clawops.studio/acme-corp/dashboard`
- Owner can invite team members (email + role)
- Integrations stored per account, encrypted at rest
- Plan tiers control feature access (Kanban, AI agents, etc.)

---

## Build Sequence

### Day 1: Auth + URL Routing Foundation
**Everything depends on this. Single login. Clean URL paths. No iframes.**

- [ ] Fork ChristianAlmurr dashboard → `clawops-clients` repo
- [ ] Deploy InsForge on test Contabo VPS
- [ ] Set up InsForge JWT auth (email/password + Google OAuth)
- [ ] Build auth middleware — single login, one cookie, all tools accessible
- [ ] Build authenticated proxy routes:
      `/dashboard/{userId}/n8n` → proxy → n8n (:5678)
      `/dashboard/{userId}/browser` → proxy → agent-browser (WebSocket)
      `/dashboard/{userId}/stealth` → proxy → camoufox (:9377)
      `/dashboard/{userId}/gateway` → proxy → OpenClaw (:18789)
- [ ] Middleware validates JWT on every route
- [ ] Test: login once → click N8n → see N8n without re-auth
- [ ] Deploy to test subdomain

**Deliverable: Single login. All tools via clean URL paths. No iframes.**

### Day 2: Dashboard UI + CRM
- [ ] Update sidebar navigation (replace irrelevant pages)
- [ ] Configure InsForge PostgreSQL schema (accounts, users, contacts, deals, tasks)
- [ ] Build Account page (profile, team invite, role management)
- [ ] Build CRM: Contacts → Companies → Deals Pipeline (Kanban)
- [ ] Build Tasks Kanban (To Do / In Progress / Done)
- [ ] Build Billing + Subscription Upgrade page (Stripe integration)
- [ ] Build Integrations page (GHL credentials, Composio, Google Workspace)
- [ ] Test: create account → invite team → create contact → create deal

### Day 3: AI Agents + Social
- [ ] AI Agents page: list workers, spawn, assign, monitor
- [ ] OpenAgents workspace concept: shared context, @mentions
- [ ] Composio: OAuth connect social accounts
- [ ] Social: Compose (Twitter/LinkedIn/Instagram), Calendar, Analytics
- [ ] Test: connect Twitter via Composio → post from dashboard

### Day 4: Tools + Agent Browser
- [ ] camoufox on client VPS (port 9377)
- [ ] agent-browser WebSocket streaming in dashboard
- [ ] Skills Library: GitHub browse + install
- [ ] MCP Library: Smithree registry + enable/disable
- [ ] Tools / Plugins: plugin loader

### Day 5: Mission Control + Polish
- [ ] Install openclaw-ops scripts on our VPS
- [ ] Enhance Mission Control: fleet mgmt + costs + TOTP + live feed
- [ ] Deploy to ops.clawops.studio
- [ ] Docs page + onboarding wizard
- [ ] Test: watchdog, security scan, fleet view all working

---

## Stack Summary

| Layer | Choice |
|-------|--------|
| Dashboard base | ChristianAlmurr fork (MIT, Next.js + TypeScript + Tailwind) |
| Frontend | Next.js (App Router) |
| Backend + DB | InsForge (PostgreSQL) |
| Auth | InsForge JWT — single login, all tools |
| Social / Tools | Composio (850+ toolkits, OAuth per user) |
| User Agent | ZeroClaw (ship to client VPS) |
| Ops Agent | Hermes (chat-based, runs openclaw doctor/heal/restart) |
| Multi-Agent | OpenAgents workspace concept (shared context, @mentions) |
| Agent Spawning | OpenClaw native spawning |
| Stealth Browser | camoufox (:9377) — authenticated proxy route |
| Shared Browser | agent-browser (WebSocket) — authenticated proxy route |
| Workflows | N8n — authenticated proxy route (`/{userId}/n8n`) |
| Skills | GitHub (fetch + install) |
| MCP | Smithree registry |
| Tools / Plugins | Custom plugin loader on InsForge |
| Ops Scripts | openclaw-ops (heal, watchdog, security-scan) |

---

## What We Discard

| Repo | Why |
|------|-----|
| twentyhq/twenty | Full separate app (NestJS + Redis). Too heavy. |
| mattermost | Not relevant. |
| parlor | On-device voice AI. Desktop use case. |
| praisonai | Python framework. We use OpenClaw. |
| ClawTeam | OpenClaw has native multi-agent spawning. |
| competitors, market-intel, practitioner-signals, tech-updates (from ChristianAlmurr) | Not relevant to our product. Replace with CRM, Social, Integrations, Skills. |

---

## Tomorrow — Start Here

1. Fork ChristianAlmurr → `clawops-clients`
2. Deploy InsForge on test VPS
3. Build auth middleware + proxy routes
4. Test single login → access all tools

Foundation first. Everything else slots in.
