# ClawOps Studio - Technical Architecture

**Date:** 2026-03-27  
**Version:** 1.0  
**Status:** MVP Planning

---

## 🎯 VISION

ClawOps Studio is a SaaS platform that allows users to:
1. Sign up and pay
2. Fill out an onboarding form (profile, business, website, tools, goals)
3. Get a fully deployed OpenClaw instance with AI employees
4. Manage everything from a dashboard

**Goal:** 95% automation - from signup to deployed agents.

---

## 🏗️ SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐ │
│  │ Landing │  │ Signup/ │  │Onboarding│  │  Dashboard   │ │
│  │  Page   │  │  Pay    │  │  Form    │  │  (Client)   │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    BACKEND LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Payment     │  │ Provisioning │  │  Agent         │  │
│  │  (Stripe)    │  │  (Contabo)   │  │  Orchestration │  │
│  └──────────────┘  └──────────────┘  └────────────────┘  │
│                                                      ┌─────┴─┐
│  ┌──────────────┐  ┌──────────────┐               │Paper- │
│  │  Onboarding  │  │  Config      │───────────────▶│clip   │
│  │  Processor   │  │  Generator   │               └───────┘
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┼────┘
                                                          │
┌─────────────────────────────────────────────────────────▼────┐
│                    AGENT LAYER (Per Client VPS)              │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ OpenClaw   │  │  MetaClaw   │  │  Team       │       │
│  │ Instance   │  │  (Learning) │  │  (Our AI)   │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                             │
│  Our Team:                                                  │
│  ├── Dave (DevOps/Engineering)                             │
│  ├── Kyle (Backend/API)                                    │
│  ├── Marcus (Sales/Revenue)                                │
│  ├── Tyler (Marketing/Growth)                              │
│  └── Ryan (Research/Analysis)                              │
│                                                             │
│  Tools Installed:                                          │
│  ├── Docker                                                │
│  ├── Playwright + Chrome                                   │
│  ├── Firecrawl                                             │
│  ├── n8n                                                   │
│  ├── Skills & MCP                                          │
│  └── OpenRouter (free models)                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 STACK COMPONENTS

### Core Infrastructure
| Component | Purpose | Priority |
|-----------|---------|----------|
| **OpenClaw** | Main AI agent runtime | MUST HAVE |
| **MetaClaw** | Meta-learning agent (auto-fix, auto-improve, auto-learn) | MUST HAVE |
| **Paperclip** | Agent coordination/control plane | MUST HAVE |
| **Contabo VPS** | VPS with pre-installed OpenClaw | MUST HAVE |

### Agent Team (Our AI Employees)
| Agent | Role | Primary Skills |
|-------|------|----------------|
| **Dave** | DevOps/Engineering | System admin, Docker, CI/CD, infrastructure |
| **Kyle** | Backend/API | Python, Node.js, API development |
| **Marcus** | Sales/Revenue | Lead gen, outreach, closing, pipeline management |
| **Tyler** | Marketing/Growth | SEO, content, social media, campaigns |
| **Ryan** | Research/Analysis | Market research, competitive analysis, data |

### Tools & Services
| Tool | Purpose | Integration |
|------|---------|-------------|
| **Docker** | Container runtime for agents | VPS |
| **Playwright + Chrome** | Browser automation | VPS |
| **Firecrawl** | Web scraping | Paperclip |
| **n8n** | Workflow automation | VPS |
| **OpenRouter** | Free LLM models | OpenClaw |
| **ChatGPT OAuth** | Paid LLM option | OpenClaw |
| **Stripe** | Payment processing | Backend |
| **Tailscale** | VPN for secure access | VPS |
| **UFW** | Firewall | VPS |

---

## 📊 AUTOMATION BREAKDOWN

### 95% Automatable Parts

| Process | Automation | Notes |
|---------|------------|-------|
| User Signup | ✅ 100% | Stripe + onboarding form |
| Payment Processing | ✅ 100% | Stripe subscriptions |
| VPS Provisioning | ✅ 95% | Contabo API + Terraform |
| OpenClaw Installation | ✅ 95% | Bash script automation |
| Tool Installation | ✅ 90% | Docker, Playwright, etc. |
| Skills Installation | ✅ 90% | Based on business profile |
| MCP Configuration | ✅ 90% | Auto-configured per profile |
| Agent Deployment | ✅ 90% | Templates + customization |
| Website Scraping | ✅ 85% | Firecrawl automation |
| OpenRouter Setup | ✅ 100% | Free tier auto-config |
| ChatGPT OAuth | ✅ 100% | OAuth flow |

### Manual (5%)
| Process | Why Manual | Frequency |
|---------|------------|-----------|
| API Key Configuration | User provides their own keys | One-time |
| Web App Session Login | User logs into their apps | One-time |
| Complex Troubleshooting | Edge cases | Rare |
| Escalated Issues | Human judgment needed | Rare |

---

## 🚀 DEPLOYMENT FLOW

```
1. USER SIGNUP
   └── User registers on website
       └── Chooses plan ($299-$499/month)

2. PAYMENT
   └── Stripe processes payment
       └── Webhook triggers provisioning

3. ONBOARDING FORM
   └── User fills profile info:
       ├── Name, company, role
       ├── Business description
       ├── Website URL
       ├── Tools they use (Slack, Notion, etc.)
       ├── Desired AI agent name
       ├── Number of employees (or recommendation)
       └── Goals and priorities

4. WEBSITE SCRAPING
   └── Firecrawl scrapes their website
       └── Generates context for agents

5. VPS PROVISIONING
   └── Contabo API creates VPS
       └── Pre-configured with OpenClaw image

6. TOOL INSTALLATION (Automated)
   └── UFW firewall
   └── Tailscale VPN
   └── Docker
   └── Playwright + Chrome
   └── n8n
   └── Skills & MCP

7. AGENT CONFIGURATION
   └── Based on onboarding data:
       ├── Profile → Agent persona
       ├── Business → Industry context
       ├── Tools → MCP integrations
       ├── Goals → Task priorities

8. AGENT DEPLOYMENT
   └── OpenClaw instance deployed
       └── MetaClaw installed (learning)
       └── Team agents instantiated
       └── Dashboard access provided

9. CLIENT DASHBOARD
   └── Monitor agent activity
   └── View task progress
   └── Manage agent configurations
   └── Access logs and reports
```

---

## 📁 DIRECTORY STRUCTURE

```
/root/.openclaw/workspaces/arjun/
├── AGENTS.md              # Agent definitions
├── IDENTITY.md            # Henry's identity
├── USER.md                # Pulkit's profile
├── SOUL.md                # Arjun's sales persona
├── TOOLS.md               # Tool configurations
├── HEARTBEAT.md           # Heartbeat tasks
├── docs/
│   ├── REPO-ANALYSIS.md   # Repository analysis
│   ├── ARCHITECTURE.md    # This file
│   └── INSTALL-PLAN.md    # Installation roadmap
└── memory/
    └── YYYY-MM-DD.md      # Daily logs
```

---

## 🔐 SECURITY

### Per-Client Isolation
- Each client gets their own VPS
- Tailscale VPN for secure access
- UFW firewall (only necessary ports)
- No shared resources between clients

### API Key Management
- Client-provided keys stored securely
- Paperclip manages credential rotation
- No exposure in logs or UI

### Network Security
```
VPS Firewall (UFW):
├── 22/tcp (SSH - limited IP)
├── 80/tcp (HTTP)
├── 443/tcp (HTTPS)
└── 18792/tcp (OpenClaw - internal only)

External Access via Tailscale VPN only
```

---

## 💰 PRICING TIERS

| Tier | Price | Agents | Features |
|------|-------|--------|----------|
| **Starter** | $299/mo | 1-2 agents | Basic skills, email support |
| **Professional** | $399/mo | 3-5 agents | All skills, priority support |
| **Enterprise** | $499/mo | 6+ agents | Custom skills, dedicated support |

---

## 📅 ROADMAP

### Phase 0: MVP Core (48 hours)
- [x] Repository analysis
- [ ] MetaClaw installation
- [ ] agency-agents setup
- [ ] openclaw-skills integration
- [ ] Basic Paperclip setup
- [ ] Contabo provisioning script

### Phase 1: Client Portal
- [ ] Landing page
- [ ] Stripe integration
- [ ] Onboarding form
- [ ] VPS provisioning automation
- [ ] Client dashboard

### Phase 2: Full Automation
- [ ] Complete tool installation automation
- [ ] Auto-scaling based on load
- [ ] Advanced monitoring
- [ ] Auto-remediation

### Phase 3: Intelligence
- [ ] MetaClaw learning optimization
- [ ] OpenSpace integration
- [ ] Auto-agent generation (Memento-Skills)
- [ ] Predictive scaling

---

*Document created: 2026-03-27 by Henry (CEO Agent)*
