# MEMORY.md — ClawOps Studio Long-Term Memory

**Last Updated:** 2026-03-27  
**Agent:** Henry (CEO)  
**Workspace:** /root/.openclaw/workspaces/arjun/

---

## 🏢 ABOUT CLAWOPS STUDIO

**Business Name:** ClawOps Studio (inspired by OpenClaw)  
**Founder:** Pulkit (@CryptoKin on Telegram)  
**Product:** Agency AI Employees ($299-499/month per client)  
**Target Clients:** Digital agencies, SaaS founders, marketing teams  
**Goal:** 95% automation for client onboarding and agent deployment

---

## 🛠️ CURRENT INFRASTRUCTURE

### Stack
- **Core:** OpenClaw (AI agent framework)
- **Orchestration:** Paperclip (agent control plane)
- **Networking:** Tailscale (VPN)
- **Hosting:** Contabo VPS
- **Containers:** Docker
- **Browser:** Playwright + Chrome (visual automation)
- **Workflows:** n8n
- **Security:** UFW (firewall)

### Installed Components
- OpenClaw Gateway (port 18789)
- Paperclip (control plane)
- Tailscale VPN
- Docker
- Playwright + Chrome
- n8n
- MetaClaw (v0.4.1) - agent auto-improvement
- HiClaw (v1.0.8) - multi-agent collaboration via Matrix
  - Manager API: http://127.0.0.1:18080
  - Higress Console: http://127.0.0.1:18001
  - Element Web (Matrix client): http://127.0.0.1:18088
  - LLM: OpenRouter (z-ai/glm-4.5-air:free, free models only)
  - Admin: admin / ClawOps2026!

### Multi-Channel + Multi-Model Infrastructure (ROADMAP)
- **Channels:** Telegram, Discord, WhatsApp (all synced)
- **Models:** Multiple AI models per channel (OpenRouter free, ChatGPT, Claude)
- **Use case:** Clients can chat via any channel, agents respond with optimal model
- **Implementation:** OpenClaw supports multi-channel, model routing per conversation
- **Priority:** Post-MVP (after core agent deployment is stable)

---

## 🤖 AGENT TEAM ROSTER

| Agent | Role | Status |
|-------|------|--------|
| **Henry** | CEO / Chief AI Officer | Active |
| **Ryan** | Sales | Active / structured |
| **Arjun** | Research | Active / structured |
| **Dev** | Founding Engineer | Active / structured |
| **Dave** | DevOps / Backend | Active / structured |
| **Kyle** | Frontend / Web | Active / structured |
| **Tyler** | Marketing / SEO | Active / structured |
| **Marcus** | Mobile App Agent | Future / not onboarded |

### Current Reporting Structure
- Henry
  - Ryan
  - Arjun
  - Dev
    - Dave
    - Kyle
  - Tyler

### Agent Templates Source
- **agency-agents** (msitarzewski): 25+ pre-built agent personas
  - https://github.com/msitarzewski/agency-agents

---

## 📋 DEPLOYMENT SEQUENCE (8 Phases)

### Phase 0: Infrastructure Setup (5-10 min, 95% automated)
1. Provision VPS on Contabo
2. Install Docker, Tailscale, UFW, Node.js, Playwright+Chrome
3. Verify connectivity

### Phase 1: Core Layer (10-15 min, 90% automated)
1. Install OpenClaw Gateway
2. Install Paperclip (orchestration)
3. Install MetaClaw (self-improvement/learning)
4. Verify core layer

### Phase 2: Agent Deployment (15-20 min, 85% automated)
1. Clone agency-agents templates
2. Customize agent configurations
3. Deploy agents to Paperclip
4. Verify agents active

### Phase 3: Skills Installation (20-30 min, 80% automated)
1. Install ClawSec/skill-security-auditor (FIRST!)
2. Install role-specific skills per agent
3. Run security audit on all skills
4. Verify skills work

### Phase 4: Integrations (15-20 min per integration, 75% automated)
1. GoHighLevel (ghl-crm skill from ClawHub)
2. Other CRMs as needed
3. Communication (Telegram, Discord, Email)
4. API keys configuration
5. Browser/session setup

### Phase 5: Client Dashboard (10-15 min, 90% automated)
1. Install LobsterBoard
2. Configure OpenClaw-specific widgets
3. Set up remote monitoring (lobsterboard-agent)
4. Client access setup

### Phase 6: n8n Workflows (15-20 min, 85% automated)
1. Install n8n
2. Import standard workflows
3. Configure webhooks
4. Test workflows

### Phase 7: Testing & Verification (20-30 min, 70% automated)
1. Infrastructure tests
2. Agent tests
3. Integration tests
4. Dashboard tests
5. Security audit

### Phase 8: Client Handover (15-20 min, 60% automated)
1. Documentation package
2. Training call
3. Handover checklist
4. Post-launch monitoring

**Total Target:** 180 min manual → 30-45 min with 95% automation

---

## 🔑 KEY REPOS & TOOLS

### ✅ INSTALL NOW (MVP Priority)

| Repo | Purpose | Link |
|------|---------|------|
| MetaClaw | Agent meta-learning (auto-fix, auto-improve, auto-learn) | https://github.com/aiming-lab/MetaClaw |
| agency-agents | 25+ agent templates | https://github.com/msitarzewski/agency-agents |
| openclaw-skills | 86 production skills + ClawSec | https://github.com/moriiisaac/openclaw-skills |
| ClawSec/skill-security-auditor | Security scanning for skills | Included in openclaw-skills |
| HiClaw | Multi-agent orchestration (Alibaba) | https://github.com/alibaba/hiclaw |
| AutoResearchClaw | Research agent base | https://github.com/aiming-lab/AutoResearchClaw |
| LobsterBoard | Client dashboard (60+ widgets, OpenClaw-native) | https://github.com/Curbob/LobsterBoard |
| geo-seo-claude | SEO/GEO tool (Tyler) | https://github.com/zubair-trabzada/geo-seo-claude |
| marketingskills | Conversion/CRO/copy/SEO skill library | https://github.com/coreyhaines31/marketingskills |

### ⚡ INTEGRATIONS

| Integration | Purpose | Setup |
|-------------|---------|-------|
| **GoHighLevel** | CRM for agencies | ghl-crm skill from ClawHub |
| GHL MCP Server | API endpoint | https://services.leadconnectorhq.com/mcp/ |
| OpenRouter | Free models | api.openrouter.ai |
| ChatGPT OAuth | Optional paid model | OAuth setup |

### ⚡ DEFER POST-MVP

| Repo | Purpose | Why Later |
|------|---------|-----------|
| OpenSpace | Cost optimization (46% fewer tokens) | After first revenue |
| Memento-Skills | Auto-agent generation | After MVP |
| canopy | Team management (330+ agents) | Future scale |
| NemoClaw | NVIDIA sandbox security | Still ALPHA |

### ❌ SKIP

| Repo | Why |
|------|-----|
| codingcreatively | Malicious/phishing tools |
| OpenJarvis | Stanford research project |
| AgentScope | Competitor to OpenClaw |
| ruflo | Competitor to Paperclip |
| NemoClaw | ALPHA - not production ready |
| mcpmarket.com | Inaccessible |

---

## 📊 DOCUMENTATION FILES

| Document | Location | Purpose |
|----------|----------|---------|
| DEPLOYMENT-SEQUENCE.md | /root/.openclaw/workspaces/arjun/docs/ | 8-phase deployment SOP |
| REPO-ANALYSIS.md | /root/.openclaw/workspaces/arjun/docs/ | All 24 repos analyzed |
| ARCHITECTURE.md | /root/.openclaw/workspaces/arjun/docs/ | System architecture |
| INSTALL-PLAN.md | /root/.openclaw/workspaces/arjun/docs/ | Installation roadmap |
| CLIENT-[NAME]-NOTES.md | /root/.openclaw/workspaces/arjun/clients/ | Per-client documentation |

---

## 🔐 SECURITY NOTES

### Skill Security Audit (MANDATORY)
Before installing ANY third-party skill:
```bash
python3 skill_security_auditor.py /path/to/skill/
```
Scan for: command injection, code execution, data exfiltration, prompt injection

### ClawHub Security Stats
- 13,000+ skills available
- ~13% flagged for security issues (340+ malicious)
- ALWAYS audit before installing

### NemoClaw Sandbox (Future)
When production-ready, provides:
- Landlock + seccomp + netns isolation
- Policy-enforced egress
- Policy-enforced filesystem
- Inference routing through OpenShell gateway

---

## 💡 KEY INSIGHTS

### GoHighLevel Integration
- Exists via ghl-mcp server
- URL: https://services.leadconnectorhq.com/mcp/
- Requires: Private Integration Token (PIT) + Location ID
- Can manage: contacts, opportunities, conversations, calendars, workflows

### geo-seo-claude (for Tyler)
- GEO market: $850M+ (projected $7.3B by 2031)
- AI-referred traffic: +527% YoY
- Commands: /geo audit, /geo quick, /geo citability, /geo report
- Can generate PDF reports with charts

### marketingskills (Corey Haines)
- 33 focused marketing skills for AI agents
- Covers CRO, copywriting, SEO, paid ads, analytics, GTM, retention
- Includes foundational `product-marketing-context` skill used by all others
- Strong fit for Tyler + agency marketing service delivery
- High-value skills: `copywriting`, `page-cro`, `seo-audit`, `paid-ads`, `revops`, `sales-enablement`

### LobsterBoard (Client Dashboard)
- Built specifically for OpenClaw
- 60+ widgets including: Auth Status, Active Sessions, Token Gauge, Cron Jobs
- Self-hosted, no cloud dependency
- Drag-and-drop editor

---

## 📅 NEXT ACTIONS

### Immediate (This Session)
- [x] Get Notion page ID from Pulkit
- [x] Push operating documentation to Notion
- [x] Create structured agent role files in workspace
- [ ] Start Phase 1: Core Layer Installation
  - [ ] Install MetaClaw
  - [ ] Install agency-agents
  - [ ] Install openclaw-skills + ClawSec

### Short Term
- [ ] Deploy team agents (Dave, Kyle, Marcus, Tyler, Ryan)
- [ ] Install role-specific skills
- [ ] Configure GoHighLevel integration
- [ ] Set up LobsterBoard dashboard

### Medium Term
- [ ] Create client onboarding automation
- [ ] Set up Contabo API for automatic VPS provisioning
- [ ] Build standard workflow templates in n8n
- [ ] Multi-channel setup: Telegram + Discord + WhatsApp with model routing

### Long Term
- [ ] Monitor NemoClaw for production release
- [ ] Implement OpenSpace for cost optimization
- [ ] Build Memento-Skills for auto-agent generation

---

## 🧠 CURRENT OPERATING STATE (Updated 2026-03-29)

### Session Context
- Pulkit has given strict instruction: **always check docs/config files first, verify actual state, then respond. Do not hallucinate.**
- New session should start by reading `docs/SYSTEM-OVERVIEW.md` for full context

### What's Actually Connected (VERIFIED)
- **n8n** — Running on Docker, port 5678 ✅
- **GitHub** — CLI authenticated as `clawopsstudio-web`, repo: `clawopsstudio-web/skills` ✅
- **GHL (GoHighLevel)** — Credentials exist in `.secrets/ghl.env`, MCP endpoint reachable ✅
- **Browser automation** — Playwright + Chrome ready ✅
- **DeerFlow 2.0** — Running at `http://127.0.0.1:2026`, security fix applied ✅
- **HiClaw** — Running (manager, console, element-web) ✅
- **MetaClaw** — Active ✅
- **LobsterBoard** — Installed ✅
- **Vercel** — NOT connected ❌ (needs login)

### Telegram Lane Status
- HQ (Henry) — Validated working ✅
- All other lanes (Ryan, Arjun, Dev, Dave, Kyle, Tyler) — NOT YET RE-VERIFIED

### What's LEFT to Do
**PRIORITY: Build Agent Tooling Matrix**
The infrastructure is ready. The remaining work is ASSIGNING tools to agents:
1. Create tooling matrix (which agent uses which tool)
2. Verify each agent can access their assigned tools
3. Test tool access per agent
4. Run Telegram lane sweep to validate lanes
5. Connect Vercel for Kyle

### Key Files
- `docs/SYSTEM-OVERVIEW.md` — Full system state (source of truth)
- `docs/TELEGRAM-LANE-SWEEP.md` — Lane validation procedure
- `docs/TELEGRAM-LANE-VALIDATION.md` — Validation log
- `TASKS.md` — Operating backlog
- `HEARTBEAT.md` — Operating rules

### Pulkit's Instructions
1. Check docs before responding
2. Verify config files before claiming anything
3. Don't hallucinate
4. Start new session with tooling matrix focus

### Org Structure (Confirmed)
| Agent | Role | Lane |
|-------|------|------|
| Henry | CEO / HQ | Topic 21 |
| Ryan | Sales / Pipeline | Topic 25 |
| Arjun | Research / Intel | Topic 26 |
| Dev | Founding Engineer | Topic 27 |
| Dave | DevOps / Backend | Topic 29 |
| Kyle | Frontend / Web | Topic 30 |
| Tyler | Marketing / SEO | Topic 31 |

## 🗺️ VISION & GOALS

**Goal:** 95% automation - client signs up, pays, fills form → fully deployed AI team

**Revenue Model:**
- Agency AI Employee: $299-499/month per client
- Target: Digital agencies, SaaS founders, marketing teams
- Report to Pulkit weekly on pipeline status

**Competitive Advantage:**
- MetaClaw for self-improving agents
- geo-seo-claude for SEO/GEO capabilities
- LobsterBoard for client dashboards
- GoHighLevel integration for CRM automation
- Multi-channel (Telegram/Discord/WhatsApp) + Multi-model (free + paid) infrastructure

---

*Last memory update: 2026-03-27 by Henry (CEO Agent) — org roles, workspace identity, Notion doc push, and model policy refreshed.*
