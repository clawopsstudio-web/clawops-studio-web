# ClawOps Studio — Architecture v1.0

**Status:** Defined | **Last Updated:** 2026-04-15

---

## Product Vision

ClawOps Studio is **"The Agentic OS for Your Business"** — a SaaS platform that deploys vertical-specific AI agents (with pre-built skills, tools, MCPs, and browser automation) to businesses across different industries.

**Revenue target:** $100k/month
**Business model:** White-label + Vertical SaaS (Agency AI Employee at $299–499/month per client)
**Distribution:** Agency channels + white-label reseller

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 1: SaaS Frontend                   │
│  Vercel (Next.js) + Supabase (Auth + DB + Storage)         │
│  Landing → Auth → Dashboard (per-user, per-tenant)          │
└─────────────────────────────────────────────────────────────┘
                              │
                    Proxy / VPN / Tunnel
                              │
┌─────────────────────────────────────────────────────────────┐
│                 LAYER 2: Agent Infrastructure                │
│           OpenClaw Gateway (one gateway per VPS)            │
│                                                              │
│  Henry (Co-Founder) ─ Telegram DMs ─ Always On             │
│  Ryan (Sales Pipeline) ─ Telegram Topic 25                 │
│  Arjun (Market Research) ─ Telegram Topic 26               │
│  Dev (Coding Agent) ─ Telegram Topic 27                   │
│  Dave (DevOps/Backend) ─ Telegram Topic 29                 │
│  Kyle (Frontend/Web) ─ Telegram Topic 30                   │
│  Tyler (Marketing/SEO) ─ Telegram Topic 31                 │
│  Hermes (Customer Support) ─ App Dashboard Chat             │
│  ZeroClaw (Rescue) ─ Binary on VPS ─ Self-healing infra     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                  LAYER 3: Execution Tools                    │
│  Browser Automation: Chrome VNC (Docker) + Camoufox        │
│  Workflow Automation: n8n (port 5678)                       │
│  Visual Collaboration: OpenAgents Workspace (self-hosted)    │
│  Web Scraping: Firecrawl (Docker, port 3002)                │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   LAYER 4: Ops / Admin                       │
│  Ops Panel (port 7001) — System health, logs, config editor │
│  OpenClaw Control UI (port 18789) — Gateway sessions       │
│  Nginx (port 8081) — Reverse proxy, SSO, routing           │
│  Cloudflare Tunnel — Public exposure                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer 1: SaaS Frontend

### Hosting
- **Landing page:** `clawops.studio` — Vercel, Next.js, public
- **Dashboard:** `app.clawops.studio` — Vercel, Next.js, authenticated
- **Auth:** Supabase (OAuth + email magic link)
- **Beta mode:** No payment, instant dashboard access

### Multi-Tenant Strategy
Each SaaS user gets:
- A **per-user agent workspace** (isolated session store + files)
- A **Supabase JWT** (sb-access-token cookie)
- A **dedicated MCP config** (skills + tools for their vertical)
- Access to **shared n8n workflows** (multi-tenant safe)

As the business scales:
- **Shared gateway** (current) → sufficient for 50+ paying clients
- **Per-tenant VPS** → enterprise tier, full isolation

### Dashboard Routes
| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/auth/login` | Supabase OAuth login |
| `/auth/callback` | OAuth callback (code exchange in dashboard) |
| `/dashboard/[userId]` | Main user dashboard |
| `/dashboard/[userId]/n8n` | n8n landing → new tab |
| `/dashboard/[userId]/chrome` | Chrome VNC landing → new tab |
| `/dashboard/[userId]/metaclaw` | OpenClaw Control UI → new tab |
| `/dashboard/[userId]/mission-control` | Ops Panel → new tab |
| `/ops/` | Ops Panel (SSO-protected, Nginx auth proxy) |
| `/n8n/` | n8n (SSO-protected) |
| `/chrome/` | Chrome VNC (SSO-protected) |
| `/gateway/` | OpenClaw Control UI |

---

## Layer 2: Agent Infrastructure

### OpenClaw Gateway
**Running on:** vmi3094584 (Contabo VPS, production)
**Port:** 18789
**Version:** 2026.4.12
**Config:** `~/.openclaw/openclaw.json`

The gateway hosts multiple isolated agents. Each agent has:
- Own workspace directory
- Own session store
- Own skills
- Own model config
- Bound to specific channels/topics

### Agent Roster

| Agent | ID | Model | Channel | Purpose |
|---|---|---|---|---|
| **Henry** | henry | gemini-3.1-flash-lite | Telegram DM | Co-founder, always-on brain |
| **Ryan** | ryan | gpt-5.4 | Telegram topic 25 | Sales pipeline, follow-ups |
| **Arjun** | arjun | gpt-5.4 | Telegram topic 26 | Market research, ICP insights |
| **Dev** | dev | gpt-5.4 | Telegram topic 27 | Core build, coding tasks |
| **Dave** | dave | gpt-5.4 | Telegram topic 29 | DevOps, backend, infra |
| **Kyle** | kyle | gpt-5.4 | Telegram topic 30 | Frontend, website, UI |
| **Tyler** | tyler | gpt-5.4 | Telegram topic 31 | Marketing, SEO, content |
| **Hermes** | hermes | (TBD) | App Dashboard chat | Customer support (future) |
| **ZeroClaw** | zeroclaw | (Rust binary) | VPS-resident | Infra rescue (future) |

### Hermes (Support Agent) — Design

Hermes is the customer-facing support agent. It lives inside the SaaS dashboard.

```
Customer → Dashboard Chat Widget
         → Hermes (OpenClaw agent, bound to app.clawops.studio)
         → Routes to Henry if escalation needed
         → Routes to n8n workflows for ticket creation
         → Uses shared skills: GHL, Google Workspace, n8n
```

**Hermes ≠ Henry.** Hermes is customer-facing with a narrow skill set. Henry has full access.

**Implementation path:**
1. Add `hermes` agent: `openclaw agents add hermes`
2. Create `SOUL.md` for Hermes persona (support-oriented, empathetic, helpful)
3. Bind hermes to the dashboard's chat interface
4. Configure Hermes skills: `[ghl, google-workspace, n8n, frontend-agent]`
5. Set narrow tool permissions (no destructive ops, no SSH, no file system)

### ZeroClaw (Rescue Agent) — Design

ZeroClaw is a **Rust binary on the VPS** that watches OpenClaw and fixes things when they break. It does NOT depend on OpenClaw to run.

```
VPS Health Check (cron every 5 min)
 │
 ├── Is OpenClaw gateway responding? → YES → nothing to do
 ├── NO → ZeroClaw:
 │    ├── Attempt: systemctl restart openclaw
 │    ├── Attempt: edit openclaw.json if config is broken
 │    ├── Attempt: restart Nginx
 │    ├── If still failing → page Pulkit (Telegram alert)
 │    └── Log everything to ops panel
 │
 └── Independent of OpenClaw process
     → ZeroClaw starts in <10ms
     → ZeroClaw has its own Telegram bot channel
     → ZeroClaw cannot be taken down by OpenClaw crashes
```

**Scope of ZeroClaw:**
- ✅ Restart OpenClaw gateway
- ✅ Restart Nginx / cloudflared
- ✅ Detect and report crashes
- ✅ Page Pulkit on critical failure
- ❌ NOT a general-purpose AI agent
- ❌ NOT customer-facing
- ❌ NOT running customer tasks

### Vertical Agents (Future)

When we launch vertical-specific products, each vertical gets its own agent:

```
OpenClaw Gateway (vmi3094584)
 │
 ├── henry (always-on co-founder)
 ├── ryan / arjun / dev / dave / kyle / tyler (team)
 ├── hermes (customer support)
 ├── zeroclaw (infra rescue)
 │
 └── [vertical agents, created per product]
      ├── agency-ai (GHL + sales + marketing)
      ├── realestate-ai (scraping + CRM + outreach)
      └── ...
```

---

## Layer 3: Execution Tools

### Browser Automation Stack

| Tool | Purpose | Type | Port | Status |
|---|---|---|---|---|
| **Chrome VNC Docker** | Visual browser, shared sessions | Docker | 5800 | Active |
| **Camoufox** | Anti-detection headless scraping | Node.js | 9377 | To install |
| **OpenAgents Workspace Browser** | Live shared browser, human+agent | Browser panel | 7003 | To install |

**Browser choice by task:**

| Task | Tool | Why |
|---|---|---|
| User watching agent work | Chrome VNC | Full VNC stream |
| Demo / collaborative session | OpenAgents Workspace | Shared browser panel |
| LinkedIn scraping | Camoufox | Anti-detection fingerprints |
| Web data extraction | Camoufox + Firecrawl | Headless + cloud scraping |
| General automation | Chrome VNC (headless mode) | Standard CDP |

### Camoufox Installation Plan
1. `pip install camoufox` or `@askjo/camoufox-browser`
2. Configure OpenClaw browser profile: `~/.openclaw/openclaw.json → browser.profiles.camoufox`
3. Set port 9377
4. Add Nginx route: `/camoufox/` → port 9377
5. Update dashboard links

### OpenAgents Workspace — Visual Browser Replacement

**What it is:** Self-hosted collaborative workspace where humans + agents share a live browser in real-time.

**Why it's better than VNC for support:**
- Agent and customer see the same browser → no screen share setup
- Agent can highlight/annotate (future)
- Thread-based chat alongside the browser
- Self-hosted on our VPS → embedded in our dashboard

**Installation plan:**
1. `curl -fsSL https://openagents.org/install.sh | bash`
2. `agn install openclaw` (connect our agents)
3. Start workspace server: `agn workspace serve --port 7003`
4. Nginx route: `/team/` → port 7003
5. SSO-protect via Nginx auth proxy
6. Add "Team Workspace" link in dashboard sidebar

### Workflow Automation: n8n
- **Port:** 5678
- **Use cases:** CRM integrations, GHL automations, email sequences, reporting
- **Multi-tenant:** Workflows per tenant stored in tenant-specific n8n folders
- **MCP:** n8n exposes MCP tools accessible to OpenClaw agents

---

## Layer 4: Ops / Admin

### Ops Panel
- **URL:** `/ops/` → port 7001
- **Source:** Forked from `tugcantopaloglu/openclaw-dashboard`
- **Service:** `openclaw-ops` (systemd)
- **Auth:** Nginx auth proxy (Supabase JWT cookie → validate → forward)
- **Features:** Service control, log viewer, config editor, system health, session mgmt

### OpenClaw Control UI
- **URL:** `/gateway/` → port 18789
- **Access:** Via Nginx proxy
- **Auth:** `gateway.auth.token` in openclaw.json
- **Use:** Manual gateway inspection, session browsing, model config

### Nginx Routing (port 8081)
```
cloudflared tunnel → Nginx (8081)
 │
 ├── /n8n/*          → http://localhost:5678
 ├── /chrome/*        → http://localhost:5800
 ├── /gateway/*       → http://localhost:18789
 ├── /ops/*           → http://localhost:7001
 ├── /team/*          → http://localhost:7003  (future)
 ├── /camoufox/*      → http://localhost:9377  (future)
 └── /*               → http://localhost:3456  (Next.js)
```

All internal routes proxy WebSocket (`Upgrade` header).

---

## Repos & Integrations

### Our Repos
| Repo | Purpose | Push Status |
|---|---|---|
| `clawopsstudio-web/clawops-studio-web` | Next.js SaaS dashboard | ✅ Clean |
| `clawopsstudio-web/agent-skills` | Custom OpenClaw skills fork | ✅ Clean |
| `clawopsstudio-web/clawops-studio-archive` | Old archived code | Read-only |

### External Integrations
| Integration | Purpose | Protocol |
|---|---|---|
| OpenClaw | Core agent framework | Native |
| Supabase | Auth + DB + Storage | REST + OAuth |
| Vercel | Frontend hosting | Git push |
| Cloudflare Tunnel | Public URL exposure | `cloudflared` |
| n8n | Workflow automation | MCP + REST |
| Firecrawl | Cloud web scraping | API |
| Camoufox | Anti-detection browser | Playwright/CDP |
| OpenAgents Workspace | Visual collaboration | Agn CLI |
| Google Workspace | Docs, Drive, Gmail, Calendar | OAuth + API |
| GHL | CRM + automation | API |

### Rejected / Deferred
| Repo | Reason |
|---|---|
| `win4r/ClawTeam-OpenClaw` | Task-parallelism for coding; not our use case |
| `vercel-labs/agent-browser` | CLI tool, no SaaS embedding |
| `xlang-ai/OpenAgents` | Stale, research-only |
| `firecrawl/open-agent-builder` | Workflow builder, overlaps with n8n |
| `jo-inc/camofox-browser` | Camoufox is the maintained alternative |

---

## Architecture Decisions

| Decision | Rationale |
|---|---|
| OpenClaw as core framework | Self-hosted, multi-channel, multi-agent, MIT |
| Henry + team as OpenClaw native agents | No extra infra; all in one gateway |
| Hermes as separate agent, not Henry | Customer support ≠ co-founder; different SOUL.md |
| ZeroClaw as binary, not OpenClaw agent | Rescue tool must survive OpenClaw crashes |
| OpenAgents Workspace over plain VNC | Collaborative browser panel, embedded, self-hosted |
| Camoufox for anti-detection | Best open-source anti-detect; OpenClaw plugin exists |
| Ops Panel as separate service | Clean separation; ops ≠ product; easy to swap |
| Nginx SSO for internal services | No per-service auth code; Supabase JWT validates once |
| VPS → Cloudflare → Vercel | Clean routing; VPS services behind tunnel, SaaS on CDN |

---

## Implementation Roadmap

### Phase 1 — Foundation ✅
- [x] OpenClaw gateway running on VPS (vmi3094584)
- [x] Multi-agent setup (Henry + 7 team agents)
- [x] Nginx routing with Cloudflare Tunnel
- [x] SaaS dashboard on Vercel with Supabase auth
- [x] Ops Panel installed and accessible (port 7001)
- [x] Chrome VNC Docker for browser automation
- [x] n8n for workflow automation
- [x] Dashboard sidebar and homepage updated with real agent roster
- [x] Kill DeerFlow (was dead, container removed)
- [x] Kill PinchTab (deprecated, port closed)

### Phase 2 — Polish (Current)
- [ ] SSO for Ops Panel (Nginx auth proxy)
- [ ] Hermes agent setup (customer support persona, OpenClaw agent)
- [ ] Dashboard chat widget for Hermes

### Phase 3 — Browser Stack
- [ ] Camoufox installation (only when a paying client needs anti-detection scraping)
- [ ] OpenAgents Workspace (only when we build collaborative team features)

### Phase 4 — Rescue Layer
- [ ] ZeroClaw binary installation on VPS
- [ ] Health check cron (every 5 min)
- [ ] Telegram alert on gateway failure
- [ ] Auto-restart logic with backoff

### Phase 5 — Multi-Tenant Scale
- [ ] Per-tenant agent isolation
- [ ] Dedicated n8n workflows per tenant
- [ ] MCP server per tenant
- [ ] Vertical-specific agents (Agency AI, etc.)

---

## Multi-Tenant Architecture (Per-User VPS)

### Vision
Each paying customer gets their **own Contabo VPS** with a fully isolated OpenClaw instance. The customer accesses their dashboard via `https://{userId}.app.clawops.studio` (or `https://{slug}.clawops.studio`). The dashboard and auth live on our domain — the VPS is their private compute layer.

### User Flow
1. User signs up at `app.clawops.studio/auth/signup`
2. We provision a new Contabo VPS (via API or manual)
3. OpenClaw + required services installed on their VPS
4. User dashboard at `https://app.clawops.studio/dashboard/{userId}` (shared dashboard, or...)
5. OR: dedicated subdomain `https://{slug}.app.clawops.studio` → proxies to their VPS's OpenClaw
6. VPS services (n8n, Chrome, Gateway) accessible via `/n8n`, `/chrome`, `/gateway` on the shared dashboard
7. For enterprise: full white-label dashboard deployed on their own domain

### Pricing Tiers
| Tier | Price | Features | VPS |
|------|-------|----------|-----|
| Starter | $49/mo | 1 AI agent, n8n, GHL MCP, Telegram | 2 vCPU / 4GB RAM |
| Professional | $149/mo | 3 agents, all integrations, priority support | 4 vCPU / 8GB RAM |
| Agency | $499/mo | Unlimited agents, white-label, client sub-accounts | 8 vCPU / 16GB RAM |

### Technical Implementation
- **Provisioning**: Ansible playbook + Cloudinit script to spin up OpenClaw on new VPS
- **VPS SSH**: Key-based, managed via our ops panel
- **Dashboard**: Single multi-tenant Next.js app (current setup)
- **Auth**: Supabase handles auth; JWT validated against our shared secret
- **VPS Access**: Users don't SSH directly — they use the dashboard + ops panel
- **Monitoring**: OpenClaw status API polled from our dashboard

### Agent Team (per user)
Each user gets the same agent team as us, adapted to their business:
- **Henry** (configurable name) — their AI co-founder
- **Ryan** — their senior developer
- **Arjun** — their infra/DevOps agent
- **Kyle** — their frontend engineer
- **ZeroClaw** — their support agent (chat widget on their site)

### Installation Flow (for agents)
For each new user:
1. Run install script on their VPS (`bash <(curl) install.sh`)
2. Script installs: OpenClaw, n8n, Chrome VNC, DeerFlow, required MCPs
3. Register VPS in our dashboard (API call with their API key)
4. Dashboard shows their VPS as a new "instance"
5. Agents auto-configure based on user's plan tier

