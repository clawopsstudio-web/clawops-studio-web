# ClawOps Studio — Complete System Overview

**Last Updated:** 2026-03-29  
**Status:** Pre-launch / Infrastructure Validation

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
| **Gateway** | ✅ Running (port 18789) | Agent communication |
| **Tailscale** | ✅ Connected | VPN / remote access |
| **Docker** | ✅ Running | Container runtime |
| **Paperclip** | ⚠️ Deferred / backlog | Internal orchestration (deprioritized) |
| **MetaClaw** | ✅ Active | Self-improvement loop |
| **HiClaw** | ✅ Running (local) | Multi-agent collaboration |
| **DeerFlow** | ✅ Updated & Running | Deep research / workflow automation |
| **n8n** | ✅ Running (Docker) | Workflow automation |
| **Playwright + Chrome** | ✅ Available | Browser automation |
| **UFW Firewall** | ✅ Configured | Security |

---

## 💬 Operating Model — Telegram Lanes

**Structure:** One bot → One supergroup → 7 topics (lanes)

| Lane | Agent | Topic # | Model | Role |
|------|-------|---------|-------|------|
| HQ / Command | Henry | 21 | gpt-5.4 | Executive synthesis, routing, priorities |
| Sales / Pipeline | Ryan | 25 | nemotron-3-super (free) | Outreach, follow-up, pipeline |
| Research / Intel | Arjun | 26 | minimax-m2.5 (free) | Market intel, prospect research |
| Founding Engineer | Andrew (`dev`) | 27 | minimax-m2.7 | Client deployment architecture |
| DevOps / Backend | Dave | 29 | gpt-5.3-codex | Infrastructure, reliability |
| Frontend / Web | Kyle | 30 | gemini-3.1-flash-lite | Websites, dashboards |
| Marketing / SEO | Tyler | 31 | glm-4.7-flash | Content, SEO, GEO, positioning |

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
| **GoHighLevel (GHL)** | ✅ MCP operational (read-only + safe write tested) | CRM — pipeline, contacts, opportunities |
| **OpenRouter** | ✅ Connected | LLM models (free + paid) |
| **LobsterBoard** | ✅ Installed | Client-facing dashboard |
| **Mission Control** | ✅ Running on systemd | Internal HQ dashboard at `/dashboard/` via Tailscale |
| **GitHub** | ✅ Connected (clawopsstudio-web) | Version control — repo: clawopsstudio-web/skills |
| **Vercel** | ⚠️ Deferred / backlog | Deployment for Kyle; repo/test path verified but auth still missing in current runtime |

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
| **Telegram lane sweep** | ✅ Done enough to operate | Henry | Remaining caveat: topic isolation / long-run reliability not fully proven |
| **GHL connection** | 🔄 Reusable MCP wrapper + triage loop ready | Henry | Raw API path still returns 403; use `scripts/ghl_mcp.sh` for read-only ops |
| **Autonomy system** | 🔄 Running | Henry | Watch for timeout/noise |
| **Agent tooling matrix** | 🔄 In progress | Henry | Verify tools lane by lane |

### P1 — This Week

| Task | Status | Owner |
|------|--------|-------|
| **HiClaw pilot** | 🔄 Defined | Henry |
| **DeerFlow test** | ⏸ Backlog / deferred | Arjun |
| **GitHub + Vercel setup** | ⏸ Backlog / deferred | Kyle |
| **Supabase backend** | ❌ Todo | Dev/Dave |
| **1-click Contabo deploy** | ❌ Todo | Dev/Dave |

### P2 — Soon

| Task | Status |
|------|--------|
| n8n workflows | ❌ Not installed |
| Client onboarding automation | ❌ Todo |
| Outbound validation engine | ❌ Todo |
| Content engine (X, LinkedIn) | ❌ Todo |

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

1. **Run Telegram lane sweep** — validate all lanes
2. **Test GHL connection** — verify CRM works
3. **Test DeerFlow research** — validate Arjun's tool
4. **Set up GitHub + Vercel** — enable Kyle to ship
5. **Document Supabase baseline** — enable Dev/Dave
6. **Define HiClaw pilot use case** — narrow collaboration test
7. **Build 1-click Contabo flow** — productize deployment

---

*This document is the source of truth for ClawOps Studio infrastructure, tools, and priorities.*
