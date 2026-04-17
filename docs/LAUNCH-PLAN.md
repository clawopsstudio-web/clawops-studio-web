# LAUNCH PLAN — ClawOps Studio
**Status:** IN PROGRESS  
**Last Updated:** 2026-03-29  
**By:** Henry (CEO)

---

## 🎯 MISSION
Turn the live infrastructure into a productized, one-click-deployable AI employee stack for agencies and founders.

---

## 📌 SEQUENCE (Pulkit-approved order)

1. ~~GHL location rename (SAAS TEST → CLAW Ops Studio)~~
2. ~~HiClaw review/activate~~
3. **Contabo 1-click deployment** ← CURRENT
4. Frontend + Backend deployment flow
5. Promotion / outbound engine

---

## ✅ COMPLETED THIS SESSION

### GHL Integration
- **Status:** LIVE (MCP route confirmed working)
- Location lookup: ✅
- Pipelines list: ✅
- Read-only operations: WORKING
- Write operations: BLOCKED (no location-update tool in MCP; REST API auth incompatible with PIT token)
- **Manual action needed:** Rename "SAAS TEST" → "CLAW Ops Studio" in GHL UI (Settings → Business Info)
- **Action needed:** Rotate GHL token if any exposure concerns

### HiClaw
- **Status:** Running (confirmed live Docker + services)
- Manager API: port 18443 (internal)
- Higress Console: port 18001
- Element Web: port 18088
- OpenClaw Control: port 18888
- **Decision:** Defer narrow integration — not a launch blocker. Use later for Matrix-based cross-agent notification bus.

---

## 🔴 GHL LOCATION RENAME (MANUAL STEP NEEDED)

**Do this in GHL UI:**
1. Log in to GHL → Settings → Business Info
2. Change business name to "CLAW Ops Studio"
3. Save

This is a 30-second manual step since no update API is accessible via MCP or REST with current token.

---

## 📋 CONTABO 1-CLICK DEPLOYMENT ARCHITECTURE

### What We Have
- Contabo API: `https://api.contabo.com/`
- OAuth2 authentication (Client ID + Client Secret + API User + API Password)
- VPS provisioning, snapshot management, cloud-init support
- CLI tool: `cntb`

### What We Need
- [ ] **Contabo API credentials** (OAuth2: Client ID, Client Secret, API User email, API Password)
- [ ] **Ubuntu 22.04 LTS image ID** (from Contabo)
- [ ] **VPS size/plan selection** (for different client tiers)
- [ ] **cloud-init script** for automated baseline setup

### Deployment Flow Design

```
Client Onboarding Form
    ↓
    (Sign up → Pay → Fill profile form)
    ↓
Contabo API: Provision VPS
    ├── Select OS (Ubuntu 22.04 LTS)
    ├── Select plan (tier-based)
    ├── Configure network (Tailscale VPN)
    ├── Inject cloud-init script
    └── Return VPS IP + credentials
    ↓
SSH to VPS
    ↓
Run Setup Scripts (automated)
    ├── Docker + Docker Compose
    ├── Tailscale
    ├── UFW firewall
    ├── Node.js 22.x
    ├── Playwright + Chrome
    └── OpenClaw Gateway
    ↓
Configure Client-Specific Stack
    ├── Clone/shape agent workspace
    ├── Set up Tailscale network
    ├── Install role-specific skills
    ├── Configure integrations (GHL, Notion, etc.)
    └── Generate client dashboard access
    ↓
Client Handoff
    ├── Send VPS credentials
    ├── Send dashboard URL
    └── Launch welcome sequence
```

### Onboarding Form Fields Needed
- [ ] Business name
- [ ] Business type (agency / SaaS / marketing team / other)
- [ ] Primary goals (what do they want their AI employee to do?)
- [ ] Tools they use (GHL, Notion, Slack, HubSpot, etc.)
- [ ] Current team size
- [ ] Preferred communication channel
- [ ] Budget tier ($299 / $399 / $499 per month)
- [ ] Website/social profiles (for AI context scraping)

### Deployment Tiers
| Tier | Price | VPS Spec | Agents |
|------|-------|----------|--------|
| Starter | $299/mo | 4 vCPU / 8GB RAM | 3 agents |
| Growth | $399/mo | 8 vCPU / 16GB RAM | 5 agents |
| Scale | $499/mo | 16 vCPU / 32GB RAM | Full 7-agent team |

### Next Actions (Contabo)
- [ ] Pulkit: Provide Contabo OAuth2 credentials
- [ ] Define exact cloud-init script contents
- [ ] Map Contabo image ID for Ubuntu 22.04 LTS
- [ ] Design VPS sizing logic per tier

---

## 🌐 FRONTEND + BACKEND DEPLOYMENT FLOW

### Frontend Stack
- **Repository:** GitHub
- **Hosting:** Vercel
- **Framework:** Next.js / React (per client need)
- **CI/CD:** GitHub Actions + Vercel auto-deploy

### Frontend Credentials Needed
- [ ] **GitHub Personal Access Token** or OAuth app for repo creation
- [ ] **Vercel API token** for deployment management
- [ ] **GitHub repo URL** for Kyle to work from

### Backend Stack
- **Primary:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **Alternative:** Self-hosted on Contabo (for data-sensitive clients)
- **Backend runtime:** Node.js / Fastify or Python / FastAPI

### Backend Credentials Needed
- [ ] **Supabase project ID + API keys**
- [ ] OR Contabo VPS for self-hosted backend
- [ ] Database schema design for client data model

### First Deploy Target
- LobsterBoard dashboard for client-facing view
- OR Kyle's first client website

---

## 🚀 PROMOTION / OUTBOUND ENGINE

### Channels
- **LinkedIn** — thought leadership + build-in-public
- **X/Twitter** — dev updates + product launches
- **Facebook Groups** — agency/SaaS communities
- **Skool** — community building

### Content Engine (Tyler)
- Build-in-public cadence
- Case studies (once first client is live)
- Product demo videos

### Outreach (Ryan)
- Direct outreach to agencies + SaaS founders
- Personalized intro sequences
- Follow-up automation (via GHL)

### Offer Positioning
- "$299-499/month for a dedicated AI employee team"
- 95% automation claim
- Fast deployment (same-day onboarding)

---

## 🔑 CREDENTIALS STILL NEEDED

| Credential | Priority | Status |
|------------|----------|--------|
| Contabo OAuth2 API credentials | HIGH | NOT PRESENT |
| GitHub PAT | HIGH | NOT PRESENT |
| Vercel API token | HIGH | NOT PRESENT |
| Supabase project keys | MEDIUM | NOT PRESENT |
| GHL token rotation | MEDIUM | Exposed in chat |

---

## 📍 HQ REPORTING RULE
All meaningful build/deploy milestones should be reported to **HQ topic (Telegram)** so Pulkit can monitor progress from the command center.
