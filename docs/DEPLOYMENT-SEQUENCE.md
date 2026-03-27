# ClawOps Studio — Client Deployment Sequence

**Document Version:** 1.0  
**Date:** 2026-03-27  
**Created by:** Henry (CEO Agent)  
**Purpose:** Standard operating procedure for deploying ClawOps Studio infrastructure for ANY client

---

## 🎯 OVERVIEW

This document defines the exact sequence for deploying a ClawOps Studio instance for a new client. Follow this document for every client onboarding to ensure consistency and completeness.

**Target:** 95% automation — minimize manual steps, maximize repeatability.

---

## 📋 PRE-ONBOARDING CHECKLIST

Before starting deployment, verify:

- [ ] Client signed up and paid (Stripe/Paddle confirmed)
- [ ] Onboarding form completed (profile, business, tools, goals)
- [ ] Contabo VPS provisioned (or API automated provisioning triggered)
- [ ] Domain/subdomain configured (client.domain.com)
- [ ] Tailscale network established
- [ ] Client API keys collected (or consent to use OpenRouter free models)
- [ ] GoHighLevel access (if client uses GHL)

---

## 🔢 DEPLOYMENT SEQUENCE

### PHASE 0: Infrastructure Setup

**Time:** 5-10 minutes (automated)  
**Automation:** 95%

```
0.1 — Provision VPS on Contabo
      ├── Select OS (Ubuntu 22.04 LTS)
      ├── Configure firewall (UFW)
      ├── Set up SSH keys
      └── Automated via Contabo API or manual

0.2 — Install Core Software
      ├── Docker + Docker Compose
      ├── Tailscale (VPN networking)
      ├── UFW (firewall)
      ├── Node.js 22.x
      ├── npm 10.x
      └── Playwright + Chrome (browser automation)

0.3 — Verify Connectivity
      ├── Tailscale peer connection
      ├── SSH access confirmed
      └── Ports open (22, 18789, 3000, etc.)
```

**Scripts:** `scripts/phase0-infrastructure.sh`

---

### PHASE 1: Core Layer Installation

**Time:** 10-15 minutes (semi-automated)  
**Automation:** 90%

```
1.1 — Install OpenClaw Gateway
      ├── Clone OpenClaw repository
      ├── Run setup wizard
      ├── Configure gateway (port 18789)
      └── Generate authentication token

1.2 — Install Paperclip (Control Plane)
      ├── npm install -g @openclaw/paperclip
      ├── Configure workspace path
      ├── Set up API endpoints
      └── Verify Paperclip is running

1.3 — Install MetaClaw (Intelligence Layer)
      ├── git clone https://github.com/aiming-lab/MetaClaw
      ├── Install into OpenClaw skills directory
      ├── Configure learning parameters
      └── Verify MetaClaw is active on gateway

1.4 — Verify Core Layer
      ├── OpenClaw Gateway status: RUNNING
      ├── Paperclip API: responding
      └── MetaClaw: initialized
```

**Scripts:** `scripts/phase1-core-layer.sh`

---

### PHASE 2: Agent Deployment

**Time:** 15-20 minutes (semi-automated)  
**Automation:** 85%

```
2.1 — Clone agency-agents Templates
      ├── git clone https://github.com/msitarzewski/agency-agents
      ├── Review available agent personas
      └── Select agents based on client needs

2.2 — Customize Agent Configurations
      ├── Dave (DevOps/Backend) — if client needs automation
      ├── Kyle (Frontend/Web) — if client needs web work
      ├── Marcus (Mobile) — if client needs apps
      ├── Tyler (Marketing/SEO) — if client needs marketing
      ├── Ryan (Research) — if client needs research
      └── Custom agents based on profile

2.3 — Configure Agent Settings
      ├── System prompts (SOUL.md per agent)
      ├── Memory settings (MEMORY.md)
      ├── Skill assignments
      └── Model preferences (OpenRouter free / paid)

2.4 — Deploy Agents to Paperclip
      ├── Register each agent with Paperclip
      ├── Set up agent communication channels
      ├── Configure heartbeat schedules
      └── Verify agents are active
```

**Scripts:** `scripts/phase2-agents.sh`

---

### PHASE 3: Skills Installation

**Time:** 20-30 minutes (semi-automated)  
**Automation:** 80%

```
3.1 — Install Core Skills (All Agents)
      ├── skill-security-auditor (MUST INSTALL FIRST!)
      ├── memory-management
      ├── file-operations
      └── communication-tools

3.2 — Install Role-Specific Skills

FOR TYLER (Marketing/SEO):
      ├── geo-seo-claude (SEO/GEO optimization)
      │   └── /geo audit, /geo report, /geo citability
      ├── marketingskills (Corey Haines)
      │   └── copywriting, page-cro, seo-audit, paid-ads, revops, sales-enablement
      ├── social-media-automation
      ├── content-creation-skills
      └── campaign-analytics

FOR RYAN (Research):
      ├── AutoResearchClaw
      ├── web-research-skills
      ├── competitor-analysis
      └── market-trends

FOR DAVE (DevOps):
      ├── ci-cd-pipeline-builder
      ├── docker-management
      ├── monitoring-setup
      └── security-scanning

FOR KYLE (Frontend):
      ├── frontend-development-skills
      ├── ui-design-skills
      └── core-web-vitals-analyzer

3.3 — Run Security Audit
      ├── python3 skill_security_auditor.py <each-skill>
      ├── Verify no malicious code
      └── Document audit results

3.4 — Verify Skills
      ├── Test each skill command
      ├── Verify MCP connections
      └── Document working skills
```

**Scripts:** `scripts/phase3-skills.sh`

---

### PHASE 4: Integrations

**Time:** 15-20 minutes (per integration)  
**Automation:** 75%

```
4.1 — GoHighLevel Integration (if client uses GHL)
      ├── Install ghl-crm skill (from ClawHub)
      ├── Obtain Private Integration Token (PIT) from client
      ├── Obtain Location ID (sub-account ID)
      ├── Configure MCP server: https://services.leadconnectorhq.com/mcp/
      ├── Test connection: contacts, opportunities, conversations
      └── Document integration status

4.2 — Other CRM Integrations (as needed)
      ├── HubSpot
      ├── Salesforce
      └── Custom CRM APIs

4.3 — Communication Integrations
      ├── Telegram bot setup
      ├── Discord webhook
      ├── Email (himalaya/SMTP)
      └── WhatsApp Business API

4.4 — API Keys Configuration
      ├── OpenRouter (free models available)
      ├── ChatGPT OAuth (optional)
      ├── Anthropic (optional)
      └── Client-specific APIs

4.5 — Browser/Session Setup
      ├── Configure Playwright + Chrome
      ├── Set up session persistence
      ├── Test web app logins
      └── Document session credentials (encrypted)
```

**Scripts:** `scripts/phase4-integrations.sh`

---

### PHASE 5: Client Dashboard

**Time:** 10-15 minutes (semi-automated)  
**Automation:** 90%

```
5.1 — Install LobsterBoard
      ├── npm install lobsterboard
      ├── Configure port (default 8080)
      ├── Set up admin credentials
      └── Verify dashboard loads

5.2 — Configure Dashboard Widgets
      ├── Active Sessions (OpenClaw)
      ├── Token Gauge (context usage)
      ├── Cron Jobs status
      ├── System Log
      ├── Activity List
      └── Custom widgets per client

5.3 — Set Up Remote Monitoring (lobsterboard-agent)
      ├── Install on client VPS
      ├── Configure API key
      ├── Add server to dashboard
      └── Verify metrics streaming

5.4 — Client Access Setup
      ├── Create client user account
      ├── Configure read-only access
      ├── Test client login
      └── Share dashboard URL
```

**Scripts:** `scripts/phase5-dashboard.sh`

---

### PHASE 6: n8n Workflow Automation

**Time:** 15-20 minutes (per workflow)  
**Automation:** 85%

```
6.1 — Install n8n
      ├── Docker container or npm install
      ├── Configure webhook URLs
      └── Verify n8n is accessible

6.2 — Import Standard Workflows
      ├── Lead capture → CRM entry
      ├── Appointment booking → calendar sync
      ├── Client notification → Telegram/Email
      └── Weekly report generation

6.3 — Configure Webhooks
      ├── Paperclip → n8n triggers
      ├── OpenClaw → n8n events
      └── Client apps → n8n integrations

6.4 — Test Workflows
      ├── Run test data through each workflow
      ├── Verify outputs are correct
      └── Document workflow logic
```

**Scripts:** `scripts/phase6-n8n.sh`

---

### PHASE 7: Testing & Verification

**Time:** 20-30 minutes  
**Automation:** 70%

```
7.1 — Infrastructure Tests
      ├── VPS connectivity: PASS/FAIL
      ├── Docker containers: all running
      ├── Tailscale mesh: connected
      └── Firewall rules: verified

7.2 — Agent Tests
      ├── Each agent responds to test message
      ├── Skills execute correctly
      ├── MetaClaw learning: active
      └── Inter-agent communication: working

7.3 — Integration Tests
      ├── GoHighLevel API: connected
      ├── CRM operations: tested
      ├── Web app logins: verified
      └── Browser automation: working

7.4 — Dashboard Tests
      ├── Dashboard loads: PASS/FAIL
      ├── Widgets update: PASS/FAIL
      ├── Client login: working
      └── Remote monitoring: streaming

7.5 — Security Audit
      ├── skill-security-auditor: clean
      ├── No exposed API keys
      ├── Tailscale auth: required
      └── Firewall: restrictive
```

**Scripts:** `scripts/phase7-testing.sh`

---

### PHASE 8: Client Handover

**Time:** 15-20 minutes  
**Automation:** 60%

```
8.1 — Documentation Package
      ├── System architecture diagram
      ├── Agent roster with roles
      ├── Installed skills inventory
      ├── Integration credentials (encrypted)
      ├── Dashboard access link
      └── Emergency contacts

8.2 — Training (15-30 min call)
      ├── How to interact with agents
      ├── How to view dashboard
      ├── How to submit requests
      └── Escalation procedures

8.3 — Handover Checklist
      ├── Client receives documentation
      ├── Dashboard access confirmed
      ├── Payment confirmed
      └── Welcome email sent

8.4 — Post-Launch Monitoring
      ├── Set up monitoring alerts
      ├── Configure heartbeat checks
      ├── Schedule daily health check
      └── Document first-week observations
```

---

## 📊 AUTOMATION PROGRESS

| Phase | Manual Time | Automated Time | Automation % |
|-------|-------------|----------------|---------------|
| Phase 0: Infrastructure | 10 min | 5 min | 95% |
| Phase 1: Core Layer | 15 min | 10 min | 90% |
| Phase 2: Agents | 20 min | 15 min | 85% |
| Phase 3: Skills | 30 min | 20 min | 80% |
| Phase 4: Integrations | 20 min | 15 min | 75% |
| Phase 5: Dashboard | 15 min | 10 min | 90% |
| Phase 6: n8n | 20 min | 15 min | 85% |
| Phase 7: Testing | 30 min | 20 min | 70% |
| Phase 8: Handover | 20 min | 10 min | 60% |
| **TOTAL** | **180 min** | **120 min** | **~80%** |

**Goal: 95% automation** — Target: 30-45 min total manual intervention per client.

---

## 🛠️ Scripts Directory

```
scripts/
├── phase0-infrastructure.sh      # VPS setup, Docker, Tailscale
├── phase1-core-layer.sh          # OpenClaw, Paperclip, MetaClaw
├── phase2-agents.sh              # Clone, customize, deploy agents
├── phase3-skills.sh             # Install skills per role
├── phase4-integrations.sh       # GHL, CRM, API keys
├── phase5-dashboard.sh           # LobsterBoard setup
├── phase6-n8n.sh                # n8n workflows
├── phase7-testing.sh            # Automated tests
└── phase8-handover.sh           # Documentation, training
```

---

## 📋 CLIENT ONBOARDING FORM

Collect during sign-up:

```
CLIENT PROFILE
├── Company Name: ____________
├── Industry: ____________
├── Company Size: ____________
├── Target Market: ____________

BUSINESS NEEDS
├── Primary Goal: ____________
├── Desired AI Agents: [ ] DevOps  [ ] Marketing  [ ] Research  [ ] Sales  [ ] Admin
├── Number of Employees: ____________
├── Tools Currently Using: ____________
├── Website URL: ____________
├── Social Media Handles: ____________

CRM & INTEGRATIONS
├── Current CRM: [ ] GoHighLevel  [ ] HubSpot  [ ] Salesforce  [ ] Other: _______
├── GoHighLevel Access: [ ] Yes  [ ] No
└── API Keys Available: [ ] Yes  [ ] No

PREFERENCES
├── Preferred AI Model: [ ] Free (OpenRouter)  [ ] Paid (ChatGPT/Claude)
├── Communication: [ ] Telegram  [ ] Discord  [ ] Email
└── Dashboard Access: [ ] Yes  [ ] No

AGENT CONFIGURATION
├── Agent 1 Name: ____________ Role: ____________
├── Agent 2 Name: ____________ Role: ____________
├── Agent 3 Name: ____________ Role: ____________
└── Custom Instructions: ____________
```

---

## 📁 DOCUMENTATION FILES

| File | Location | Purpose |
|------|----------|---------|
| DEPLOYMENT-SEQUENCE.md | `/root/.openclaw/workspaces/arjun/docs/` | This file |
| REPO-ANALYSIS.md | `/root/.openclaw/workspaces/arjun/docs/` | All analyzed repos |
| ARCHITECTURE.md | `/root/.openclaw/workspaces/arjun/docs/` | System architecture |
| CLIENT-[NAME]-NOTES.md | `/root/.openclaw/workspaces/arjun/clients/` | Per-client notes |

---

## 🔄 UPDATE LOG

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-27 | 1.0 | Initial creation |

---

## ✅ PRE-DEPLOYMENT SIGN-OFF

Before starting deployment, confirm:

- [ ] Client payment received
- [ ] Onboarding form completed
- [ ] VPS provisioned
- [ ] Access credentials collected
- [ ] Integration permissions granted

**Ready to deploy:** YES / NO  
**Deployer:** _______________  
**Date:** _______________

---

*Document maintained by Henry (CEO Agent) for ClawOps Studio*
