# ClawOps Studio — Complete System Overview

**Last Updated:** 2026-03-31  
**Status:** Pre-launch / Hardened Operating Baseline

---

## 🎯 Business Goal

**Product:** Agency AI Employees  
**Price:** $299–499/month per client  
**Target Clients:** Digital agencies, SaaS founders, marketing teams  
**North Star:** 95% automation — client signs up → pays → fills onboarding form → fully deployed AI team on their own VPS

---

## 🔄 Client Flow

```
Sign Up / Pay
    ↓
Onboarding Form (business profile, goals, tools, roles)
    ↓
Context Gathering (scrape website, define personas)
    ↓
VPS Provisioning (Contabo)
    ↓
Agent Stack Deployment (OpenClaw + skills + integrations)
    ↓
Dashboard Handoff (LobsterBoard)
    ↓
Client Operates via Telegram / Dashboard
```

---

## 🏗️ Current Infrastructure

| Component | Status | Purpose |
|-----------|--------|---------|
| **OpenClaw** | ✅ Running | Core agent runtime |
| **Gateway** | ✅ Running on loopback (`127.0.0.1:18789`) | Agent communication with reduced exposure |
| **Tailscale** | ✅ Active access path | VPN / remote access |
| **Docker** | ✅ Running | Container runtime |
| **Paperclip** | ⚠️ Deferred / backlog | Internal orchestration (deprioritized) |
| **MetaClaw** | ✅ Active | Optimization / self-improvement layer |
| **HiClaw** | ✅ Running (local) | Multi-agent collaboration |
| **DeerFlow** | ⏸ Deferred / must re-verify before use | Deep research / workflow automation |
| **n8n** | ✅ Running (Docker) | Workflow automation |
| **Playwright + Chrome** | ✅ Available | Browser automation |
| **UFW Firewall** | ✅ Configured | Security |

---

## 💬 Operating Model — Telegram Lanes

**Structure:** One bot → One supergroup → 7 topics (lanes)

| Lane | Agent | Topic # | Model | Role |
|------|-------|---------|-------|------|
| HQ / Command | Henry | 21 | gpt-5.4 | Executive synthesis, routing, priorities |
| Sales / Pipeline | Ryan | 25 | budget-first small/free model | Outreach, follow-up, pipeline |
| Research / Intel | Arjun | 26 | budget-first small/free model | Market intel, prospect research |
| Founding Engineer | Andrew (`dev`) | 27 | budget-first small/free model | Client deployment architecture |
| DevOps / Backend | Dave | 29 | coding/backend model | Infrastructure, reliability |
| Frontend / Web | Kyle | 30 | lightweight web model | Websites, dashboards |
| Marketing / SEO | Tyler | 31 | lightweight content model | Content, SEO, GEO, positioning |

**Operating Rules:**
- Telegram = front door for discussion
- Paperclip = back office for tracked delegation (currently deferred)
- Not every message becomes a task — use judgment
- Cross-lane issues route through HQ

---

## 🔌 Apps & Integrations Connected

| App | Status | Purpose |
|-----|--------|---------|
| **Telegram** | ✅ Live | Primary operating surface |
| **Notion** | ✅ Connected | Docs, databases, HQ dashboard |
| **GoHighLevel (GHL)** | ✅ MCP operational (read + safe write path validated) | CRM — pipeline, contacts, opportunities |
| **OpenRouter** | ✅ Connected | LLM models (free + paid) |
| **LobsterBoard** | ✅ Installed | Optional client-facing dashboard |
| **Mission Control** | ✅ Running on systemd | Internal HQ dashboard at `/dashboard/` via Tailscale |
| **GitHub** | ✅ Connected | Version control / frontend repo path works |
| **Vercel** | ⏸ Deferred / backlog | Not a repo problem; blocked by authenticated runtime access and not on critical path |

---

## 📌 Mission Control Durability

- Service name: `mission-control.service`
- Runs via systemd and is enabled at boot
- Restarts automatically on failure
- Local URL: `http://127.0.0.1:8082/`
- Tailscale URL: `https://vmi3094584-1.tailec7a72.ts.net/dashboard/`
- UI auto-refreshes every 30 seconds
- If the dashboard looks stale, hard refresh once before treating it as down

## 🔄 Mission Control Sync Rule

Mission Control is only trustworthy if source-of-truth files are kept current.

Required behavior:
- update `TASKS.md` whenever status/progress changes
- update `docs/SYSTEM-OVERVIEW.md` whenever system/runtime truth changes
- keep config-backed routing/model changes reflected in `~/.openclaw/openclaw.json`
- do not treat chat-only updates as board sync

## 🛠️ Tools & Skills Available

### Core Skills (OpenClaw)
- `clawhub` — search/install/manage skills from clawhub.com
- `github` — GitHub operations via `gh` CLI
- `himalaya` — Email management (IMAP/SMTP)
- `mcporter` — MCP server management
- `notion` — Notion API integration
- `weather` — Weather forecasts
- `tmux` — Remote control tmux sessions
- `healthcheck` — Host security audits
- `paperclip` — Agent coordination

### Domain Skills
- `ghl-crm` — GoHighLevel CRM integration
- `geo-seo-claude` — SEO/GEO tools (for Tyler)
- `marketingskills` — CRO, copywriting, SEO, paid ads (33 skills)
- `skill-security-auditor` — Scan skills for security issues

### Special Tools
- **MetaClaw** — Auto-fix, auto-improve, auto-learn
- **HiClaw** — Multi-agent collaboration via Matrix
  - Manager API: `http://127.0.0.1:18080`
  - Console: `http://127.0.0.1:18001`
  - Element Web: `http://127.0.0.1:18088`
- **DeerFlow 2.0** — Deep research, report generation
  - Running at: `http://127.0.0.1:2026`
  - Model path discovered: GLM-4 Flash via OpenRouter
  - Current status: deferred/backlog until auth is fixed and one real revenue-useful brief succeeds
- **LobsterBoard** — Client dashboard (60+ widgets)

---

## 📋 What Needs to Be Done

### P0 — Must Do Before Revenue

| Task | Status | Owner | Blocker |
|------|--------|-------|---------|
| **Architecture freeze** | ❌ Todo | Andrew + Dave | Needs explicit OpenClaw/backend/DB boundary spec |
| **Supabase backend wiring** | 🔄 Ready to start | Dave | Access recovered; now needs schema/app implementation |
| **Payment + onboarding path** | ❌ Todo | Henry + Dave | Depends on backend path being locked |
| **Runtime hardening baseline** | ✅ Done | Henry | Maintain docs + avoid sprawl regression |

### P1 — This Week

| Task | Status | Owner |
|------|--------|-------|
| **Ryan recurring GHL loop** | 🔄 Ready to formalize | Ryan + Henry |
| **Tyler publish first batch** | 🔄 Ready | Tyler |
| **HiClaw pilot** | ⏸ Deferred | Henry |
| **DeerFlow validation** | ⏸ Deferred / re-verify before use | Arjun |
| **Vercel setup** | ⏸ Deferred | Kyle |

### P2 — Soon

| Task | Status |
|------|--------|
| Client onboarding automation | ❌ Todo |
| 1-click Contabo deploy | ❌ Todo |
| n8n workflow imports | ❌ Todo |
| Optional client dashboard refinement | ❌ Todo |

---

## 🔧 Tools That Need to Be Added

| Tool | Priority | Why |
|------|----------|-----|
| **GitHub CLI / access** | P1 | Already connected — Kyle needs repo access + workflow defined |
| **Vercel CLI / integration** | P1 | NOT connected — needs login + deploy setup for Kyle |
| **Supabase** | P1 | Backend for client systems |
| **n8n** | P2 | Workflow automation |
| **GHL OAuth flow** | P1 | Full GHL capabilities |

---

## 📊 Revenue Tracker

| Metric | Value |
|--------|-------|
| Leads contacted | — |
| Follow-ups due | — |
| Active opportunities | — |
| Blocked deals | — |
| Tool integrations completed | — |

---

## 🗺️ Deployment Sequence (8 Phases)

### Phase 0: Infrastructure Setup (5-10 min)
- [DONE] Provision VPS on Contabo
- [DONE] Install Docker, Tailscale, UFW, Node.js, Playwright+Chrome

### Phase 1: Core Layer (10-15 min)
- [DONE] Install OpenClaw Gateway
- [DONE] Install Paperclip (internal)
- [DONE] Install MetaClaw (self-improvement)
- [DONE] Verify core layer

### Phase 2: Agent Deployment (15-20 min)
- [DONE] Deploy 7 agents (Henry, Ryan, Arjun, Dev, Dave, Kyle, Tyler)
- [IN PROGRESS] Verify agents active

### Phase 3: Skills Installation (20-30 min)
- [DONE] Security auditor skill
- [PARTIAL] Role-specific skills per agent

### Phase 4: Integrations (15-20 min each)
- [IN PROGRESS] GoHighLevel (GHL)
- [TODO] GitHub / Vercel
- [TODO] Supabase
- [TODO] n8n

### Phase 5: Client Dashboard
- [DONE] LobsterBoard installed
- [TODO] Configure client widgets

### Phase 6: n8n Workflows
- [DONE] Install n8n (running on Docker, port 5678)
- [TODO] Import standard workflows

### Phase 7: Testing & Verification
- [IN PROGRESS] Telegram lane validation
- [TODO] Integration tests

### Phase 8: Client Handover
- [TODO] Documentation package
- [TODO] Training call
- [TODO] Handover checklist

---

## 🔑 Key Decisions in Effect

1. **Telegram = Operating surface** (not DM)
2. **Paperclip = Deferred** (not critical path)
3. **GHL = Priority** (touches revenue directly)
4. **Supabase = Backend choice**
5. **LobsterBoard = Client dashboard**
6. **Budget-first models** (free tier preferred)
7. **One bot, one supergroup, 7 topics** (not 7 bots)

---

## 🚦 Next Actions (Priority Order)

1. **Freeze architecture** — Andrew + Dave define runtime/backend/DB boundaries
2. **Build Supabase schema + backend wiring** — move from access recovery into implementation
3. **Define payment/onboarding flow** — webhook + client record + setup trigger path
4. **Lock Ryan recurring CRM loop** — triage → approval → outbound
5. **Publish Tyler’s first batch** — turn content readiness into distribution
6. **Keep runtime/docs aligned** — Mission Control, TASKS, SYSTEM-OVERVIEW stay truthful
7. **Revisit deferred threads only if they become revenue-relevant** — DeerFlow, Vercel, HiClaw pilot

---

*This document is the source of truth for ClawOps Studio infrastructure, tools, and priorities.*
