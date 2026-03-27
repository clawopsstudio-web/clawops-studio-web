# ClawOps Studio - COMPLETE Repository Analysis (v2)

**Date:** 2026-03-27  
**Analyzed by:** Henry (CEO Agent)  
**Method:** Web scraping + detailed analysis  
**Purpose:** Determine what to integrate into ClawOps Studio infrastructure

---

## 🎯 EXECUTIVE SUMMARY

**Total repos analyzed:** 25  
**✅ INSTALL NOW (High Priority):** 9  
**⚡ DEFER POST-MVP (Medium Priority):** 6  
**🟢 REFERENCE ONLY:** 4  
**❌ SKIP (Not Relevant):** 6

---

## 🔴 INSTALL NOW — MVP PRIORITY

### 1. MetaClaw (aiming-lab)
**Link:** https://github.com/aiming-lab/MetaClaw  
**Type:** Core Infrastructure  
**Priority:** 🔴 MUST HAVE

**What it is:**
Agent that meta-learns and evolves. Supports multiple Claw variants (OpenClaw, IronClaw, PicoClaw, ZeroClaw, CoPaw, NanoClaw, NemoClaw).

**Key Features:**
- **AUTO-FIX** — When a skill breaks, it fixes itself instantly
- **AUTO-IMPROVE** — Successful patterns become better skill versions
- **AUTO-LEARN** — Captures winning workflows from actual usage
- Cross-session memory
- OpenRouter support

**How we use it:**
- Install on every agent we deploy
- Agents get smarter over time automatically
- Handles the "learning" part of our 95% automation goal

**Status:** ✅ Production ready

---

### 2. agency-agents (msitarzewski)
**Link:** https://github.com/msitarzewski/agency-agents  
**Type:** Agent Templates  
**Priority:** 🔴 HIGH

**What it is:**
Collection of 25+ pre-built AI agent personas with specialized expertise.

**Agents Included:**
| Agent | Specialty |
|-------|-----------|
| 🎨 Frontend Developer | React/Vue/Angular, UI, Core Web Vitals |
| 🏗️ Backend Architect | API design, database, scalability |
| 📱 Mobile App Builder | iOS/Android, React Native, Flutter |
| 🤖 AI Engineer | ML models, deployment, AI integration |
| 🚀 DevOps Automator | CI/CD, infrastructure automation |
| ⚡ Rapid Prototyper | Fast POC, MVPs |
| 💎 Senior Developer | Laravel/Livewire, advanced patterns |
| 🔒 Security Engineer | Threat modeling, secure code review |
| ⚡ Autonomous Optimization | LLM routing, cost optimization |
| 🔩 Embedded Firmware | Bare-metal, RTOS, ESP32/STM32 |
| 🚨 Incident Response | Incident management, post-mortems |
| ⛓️ Solidity Smart Contract | EVM contracts, gas optimization |
| 📚 Technical Writer | Developer docs, API reference |
| 🎯 Threat Detection | SIEM rules, threat hunting |
| 💬 WeChat Developer | WeChat ecosystem, Mini Programs |
| 👁️ Code Reviewer | PR reviews, code quality |
| 🗄️ Database Optimizer | Schema, query optimization |
| 🌿 Git Workflow Master | Branching, conventional commits |
| 🏛️ Software Architect | System design, DDD |
| 🛡️ SRE | SLOs, observability, chaos engineering |
| 🧬 AI Data Remediation | Self-healing pipelines, air-gapped SLMs |
| 🔧 Data Engineer | Data pipelines, lakehouse, ETL |
| 🔗 Feishu Integration | Feishu/Lark bots, workflows |

**How we use it:**
- Clone and adapt for our team (Dave, Kyle, Marcus, Tyler, Ryan)
- Customize prompts and workflows
- Use as templates for client-specific agents

**Installation:**
```bash
git clone https://github.com/msitarzewski/agency-agents.git
cp -r agency-agents/* ~/.openclaw/agents/
```

---

### 3. openclaw-skills (moriiisaac)
**Link:** https://github.com/moriiisaac/openclaw-skills  
**Type:** Agent Capabilities  
**Priority:** 🔴 HIGH

**What it is:**
86 production-ready skill packages across 9 domains. **2,300+ GitHub stars.**

**Skills by Domain:**
| Domain | Count | Examples |
|--------|-------|----------|
| 🔧 Engineering Core | 21 | Architecture, Frontend, Backend, DevOps, SecOps |
| ⚡ Engineering POWERFUL | 25 | Agent designer, RAG architect, security auditor, MCP builder |
| 🎯 Product | 8 | Product manager, UX researcher, landing pages, SaaS scaffolder |
| 📣 Marketing | 7 | Content creator, demand gen, social media, campaign analytics |
| 📋 Project Management | 6 | Senior PM, Scrum Master, Jira, Confluence |
| 🏥 Regulatory & QM | 12 | ISO 13485, FDA, GDPR, CAPA, risk management |
| 💼 C-Level Advisory | 2 | CEO advisor, CTO advisor |
| 📈 Business & Growth | 4 | Customer success, sales engineer, revenue ops |
| 💰 Finance | 1 | Financial analyst (DCF, budgeting, forecasting) |

**Advanced Skills (25 POWERFUL-tier):**
| Skill | What It Does |
|-------|-------------|
| agent-designer | Multi-agent orchestration, tool schemas |
| agent-workflow-designer | Sequential, parallel, router, orchestrator patterns |
| rag-architect | RAG pipeline builder, chunking optimizer |
| database-designer | Schema analyzer, ERD generation, index optimizer |
| skill-security-auditor | 🔒 Scan skills for malicious code before install |
| ci-cd-pipeline-builder | GitHub Actions/GitLab CI configs |
| mcp-server-builder | Build MCP servers from OpenAPI specs |
| pr-review-expert | Blast radius analysis, security scan |
| api-design-reviewer | REST API linter, breaking change detector |
| observability-designer | SLO designer, alert optimizer |
| incident-commander | Incident response playbook, severity classifier |

**How we use it:**
- Install skills per agent role
- Run security audits before deploying any skill
- 92+ CLI tools included

**Installation:**
```bash
# Add marketplace
/plugin marketplace add alirezarezvani/claude-skills

# Install by domain
/plugin install engineering-skills@claude-code-skills
/plugin install marketing-skills@claude-code-skills
/plugin install business-growth-skills@claude-code-skills
```

---

### 4. HiClaw (Alibaba)
**Link:** https://github.com/alibaba/hiclaw  
**Type:** Multi-Agent Orchestration  
**Priority:** 🔴 HIGH (Interesting)

**What it is:**
Collaborative Multi-Agent OS for transparent, human-in-the-loop task coordination via Matrix rooms.

**Key Features:**
- Manager-Workers architecture (eliminates need for human oversight)
- Supports OpenClaw, Copaw, NanoClaw, ZeroClaw, enterprise agents
- MinIO shared file system for inter-agent communication
- Higress AI Gateway for security
- Element IM + Matrix protocol for real-time collaboration
- 80% less memory than alternatives

**How we use it:**
- Could be our team coordination layer in the future
- Interesting architecture for managing multiple agents
- Could replace manual Paperclip orchestration later

**Status:** ✅ Production

---

### 5. AutoResearchClaw (aiming-lab)
**Link:** https://github.com/aiming-lab/AutoResearchClaw  
**Type:** Research Agent  
**Priority:** 🔴 HIGH

**What it is:**
Fully autonomous self-evolving research agent. Chat an idea → get a paper/research.

**How we use it:**
- Base for Ryan (Research agent)
- Market trends, competitor analysis
- Automated competitive intelligence

---

### 6. LobsterBoard (Curbob)
**Link:** https://github.com/Curbob/LobsterBoard  
**Type:** Client Dashboard  
**Priority:** 🔴 HIGH

**What it is:**
Drag-and-drop dashboard builder with 60+ widgets. **Built specifically for OpenClaw.**

**Features:**
- Drag-and-drop editor with 20px snap grid
- 60+ widgets (system monitoring, weather, calendars, RSS, smart home, finance, AI/LLM tracking, notes)
- Template gallery with auto-screenshot previews
- 5 themes (Default, Terminal, Feminine, Feminine Dark, Paper)
- Live data via Server-Sent Events
- No cloud - self-hosted

**OpenClaw-Specific Widgets:**
| Widget | What It Shows |
|--------|---------------|
| Auth Status | Authentication status |
| Active Sessions | OpenClaw session monitor |
| Token Gauge | Context window usage |
| Cron Jobs | Cron job status |
| Activity List | Activity timeline |
| System Log | Recent system log entries |

**Remote Server Monitoring:**
```bash
npm install -g lobsterboard-agent
lobsterboard-agent init
lobsterboard-agent serve
```

**How we use it:**
- Base for client dashboard
- Monitor agent activity, cron jobs, logs
- Client-facing status monitoring

**Installation:**
```bash
npm install lobsterboard
cd node_modules/lobsterboard
node server.cjs
# Open http://localhost:8080 → Ctrl+E to edit
```

---

### 7. geo-seo-claude (zubair-trabzada)
**Link:** https://github.com/zubair-trabzada/geo-seo-claude  
**Type:** Marketing Tool  
**Priority:** 🔴 HIGH (for Tyler)

**What it is:**
GEO-first SEO optimization for AI search engines (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews).

**Key Stats:**
- GEO services market: $850M+ (projected $7.3B by 2031)
- AI-referred traffic growth: +527% YoY
- AI traffic conversion vs organic: 4.4x higher
- Brand mentions vs backlinks for AI: 3x stronger correlation

**Commands:**
| Command | What It Does |
|---------|-------------|
| `/geo audit <url>` | Full GEO + SEO audit with parallel subagents |
| `/geo quick <url>` | 60-second GEO visibility snapshot |
| `/geo citability <url>` | Score content for AI citation readiness |
| `/geo report <url>` | Generate client-ready GEO report |
| `/geo report-pdf` | Generate professional PDF report |

**Sub-Skills (13):**
- geo-audit, geo-citability, geo-crawlers, geo-llmstxt
- geo-brand-mentions, geo-platform-optimizer, geo-schema
- geo-technical, geo-content, geo-report, geo-report-pdf
- geo-prospect, geo-proposal, geo-compare

**Sub-Agents (5 parallel):**
- geo-ai-visibility, geo-platform-analysis, geo-technical
- geo-content, geo-schema

**How we use it:**
- Tyler's SEO tool for client work
- Generate client reports and proposals
- Monitor GEO/SEO metrics

---

### 8. marketingskills (coreyhaines31)
**Link:** https://github.com/coreyhaines31/marketingskills  
**Type:** Marketing Skills Library  
**Priority:** 🔴 HIGH

**What it is:**
A focused library of 33 marketing skills for AI agents covering conversion optimization, copywriting, SEO, paid ads, analytics, retention, GTM, and sales enablement.

**Key Skills:**
- `copywriting`, `copy-editing`, `cold-email`, `email-sequence`
- `page-cro`, `signup-flow-cro`, `onboarding-cro`, `popup-cro`
- `seo-audit`, `ai-seo`, `schema-markup`, `programmatic-seo`, `site-architecture`
- `paid-ads`, `ad-creative`, `ab-test-setup`, `analytics-tracking`
- `revops`, `sales-enablement`, `pricing-strategy`, `launch-strategy`

**How we use it:**
- Core skill pack for Tyler (Marketing/SEO agent)
- Power client delivery for audits, landing pages, funnels, outreach, and growth experiments
- Pair with geo-seo-claude for AI-search + conversion work

**Status:** ✅ Installed locally

---

### 9. ClawSec / skill-security-auditor
**Source:** Included in openclaw-skills  
**Type:** Security  
**Priority:** 🔴 MUST HAVE

**What it is:**
Security auditing tool to scan skills for malicious code before installation.

**Scans for:**
- Command injection
- Code execution
- Data exfiltration
- Prompt injection
- Dependency supply chain risks
- Privilege escalation

**How we use it:**
- Run BEFORE installing any third-party skill
- Zero dependencies - works anywhere Python runs

```bash
python3 engineering/skill-security-auditor/scripts/skill_security_auditor.py /path/to/skill/
```

---

## ⚡ DEFER POST-MVP

### 9. canopy (Miosa-osa)
**Link:** https://github.com/Miosa-osa/canopy  
**Type:** Team Management  
**Priority:** 🟡 MEDIUM

**What it is:**
Open-source workspace protocol and command center for AI agent systems.

**Key Features:**
- 5-layer org hierarchy (Company → Division → Department → Team → Agent)
- Virtual office (pixel-art 2D + 3D team visualization)
- Agent lifecycle management
- Heartbeat schedules
- 330+ agent roster
- 96% context reduction vs loading everything upfront

**Tech Stack:**
- Backend: Elixir + Phoenix
- Database: PostgreSQL (67 migrations)
- Frontend: SvelteKit 2 + Tauri 2
- Real-time: Phoenix PubSub + SSE

**How we use it:**
- Study architecture for team management
- Could replace/enhance Paperclip later

---

### 10. OpenSpace (HKUDS)
**Link:** https://github.com/HKUDS/OpenSpace  
**Type:** Self-Evolution / Cost Optimization  
**Priority:** 🟡 MEDIUM

**What it is:**
"Make Your Agents: Smarter, Low-Cost, Self-Evolving"

**Key Stats:**
- **46% fewer tokens** (massive cost savings!)
- **4.2× better performance** on real-world tasks
- $11K earned in 6 hours (by community)

**Features:**
- AUTO-FIX, AUTO-IMPROVE, AUTO-LEARN (like MetaClaw)
- Network effects - one agent learns, ALL agents benefit
- Community skill sharing at open-space.cloud
- GDPVal benchmark for real economic value

**How we use it:**
- Cost optimization post-MVP
- Agents share learnings across the platform

---

### 11. Memento-Skills (Memento-Teams)
**Link:** https://github.com/Memento-Teams/Memento-Skills  
**Type:** Auto-Agent Generation  
**Priority:** 🟡 MEDIUM

**What it is:**
"Let Agents Design Agents" - agents can create other agents.

**Key Features:**
- **Read → Execute → Reflect → Write loop** - agents learn from failure
- **Skill self-evolution** - agents improve themselves
- **Auto-generates new agents/skills** based on needs
- Benchmarks: HLE (Humanity's Last Exam) and GAIA

**How we use it:**
- Auto-generate client-specific agents based on profile
- Part of our "95% automation" goal

---

### 12. Claw3D (iamlukethedev)
**Link:** https://github.com/iamlukethedev/Claw3D  
**Type:** Visualization  
**Priority:** 🟢 LOW (post-MVP)

**What it is:**
3D workspace/office for AI agents - visualize agents working in real-time.

**Features:**
- 3D retro office with desks, rooms, animations
- Fleet management and agent chat
- GitHub review flows, standups, analytics
- Gateway-first architecture

**How we use it:**
- Cool visualization for demos
- Not core to our business

---

### 13. deer-flow (ByteDance)
**Link:** https://github.com/bytedance/deer-flow  
**Type:** Reference Architecture  
**Priority:** 🟢 REFERENCE

**What it is:**
Open-source super agent harness with subagents, memory, sandboxes.

**Key Stats:**
- #1 on GitHub Trending (Feb 2026)
- Works with Claude Code, Codex, Cursor, Windsurf
- InfoQuest for intelligent search/crawling

**How we use it:**
- Reference architecture only
- Not for production client deployment

---

### 14. adamstewart.ai/openclaw-skills
**Link:** https://adamstewart.ai/openclaw-skills  
**Type:** Reference / Skills Discovery  
**Priority:** 🟢 REFERENCE

**What it is:**
Guide to essential OpenClaw skills with security warnings.

**Key Insight:**
- ClawHub has **13,000+ skills** (not 5,200!)
- **13% flagged for security issues** (340+ malicious)
- 3 essential skills: Google Workspace, ClawSec, Memory

**How we use it:**
- Reference for what skills exist
- Security awareness

---

## 🟢 REFERENCE ONLY

### 15. awesome-openclaw-skills (VoltAgent)
**Link:** https://github.com/VoltAgent/awesome-openclaw-skills  
**Type:** Skills Registry  
**Priority:** 🟢 REFERENCE

**What it is:**
5,200+ curated OpenClaw skills from ClawHub.

**How we use it:**
- Reference for finding skills
- Not to install directly

---

### 16. ai-engineering-toolkit (Sumanth077)
**Link:** https://github.com/Sumanth077/ai-engineering-toolkit  
**Type:** Tool Reference  
**Priority:** 🟢 REFERENCE

**What it is:**
100+ LLM libraries/frameworks reference list.

**Categories:**
- Vector DBs (Pinecone, Weaviate, Qdrant, Chroma, Milvus, FAISS)
- Orchestration (LangChain, LlamaIndex, DSPy, Semantic Kernel)
- RAG, Evaluation, Testing
- Agent Frameworks

**How we use it:**
- Know what tools exist
- Not to install - just reference

---

### 17. awesome-openclaw-usecases (hesamsheikh)
**Link:** https://github.com/hesamsheikh/awesome-openclaw-usecases  
**Type:** Use Case Reference  
**Priority:** 🟢 REFERENCE

**What it is:**
Community collection of real-world OpenClaw use cases.

**Use Cases:**
- Daily Reddit/YouTube Digest
- X/Twitter Automation
- Multi-Agent Content Factory
- YouTube Content Pipeline

**How we use it:**
- Inspiration for client use cases
- Not to install

---

### 18. NVIDIA/NemoClaw
**Link:** https://github.com/NVIDIA/NemoClaw  
**Type:** Claw Variant  
**Priority:** 🟢 REFERENCE

**What it is:**
Run OpenClaw in NVIDIA OpenShell sandbox with managed inference.

**Status:** ⚠️ **ALPHA** - Not production ready (March 2026)

**How we use it:**
- Monitor for production release
- Not for deployment now

---

## ❌ SKIP — NOT RELEVANT

### 19. codingcreatively
**Link:** https://github.com/codingcreatively  
**Why Skip:** User has malicious/phishing tools:
- WhatsApp phishing/OTP capture
- Instagram mass report tool
- Camera/gallery stealer
- DDOS tool

**Decision:** ❌ SKIP - Ethically problematic and not relevant.

---

### 20. OpenJarvis (Stanford)
**Link:** https://github.com/open-jarvis/OpenJarvis  
**Why Skip:** Stanford research project for local-first personal AI.

**Decision:** ❌ SKIP - Research project, not SaaS infrastructure.

---

### 21. AgentScope
**Link:** https://github.com/agentscope-ai/agentscope  
**Why Skip:** Alternative agent framework (competitor to OpenClaw).

**Decision:** ❌ SKIP - We use OpenClaw, not competing frameworks.

---

### 22. ruflo
**Link:** https://github.com/ruvnet/ruflo  
**Why Skip:** Agent orchestration platform (competitor to Paperclip).

**Decision:** ❌ SKIP - Paperclip is our orchestration layer.

---

### 23. mcpmarket.com
**Link:** https://mcpmarket.com/tools/skills  
**Why Skip:** 429 error - couldn't access. ClawHub has the same skills.

**Decision:** ❌ SKIP - Use ClawHub instead.

---

### 24. youtube-shorts-pipeline
**Link:** https://github.com/rushindrasinha/youtube-shorts-pipeline  
**Why Skip:** YouTube automation - marketing tactic, not core infra.

**Decision:** ❌ SKIP - Can add post-MVP if needed.

---

## 🦞 CLAW VARIANTS STATUS

| Claw | Source | Status | Decision |
|------|--------|--------|----------|
| **MetaClaw** | aiming-lab | ✅ Production | INSTALL - Core meta-learning |
| **HiClaw** | Alibaba | ✅ Production | STUDY - Team orchestration |
| **NemoClaw** | NVIDIA | ⚠️ Alpha | SKIP - Not production ready |
| **IronClaw** | ? | ? | Research if exists |
| **PicoClaw** | ? | ? | Research if exists |
| **ZeroClaw** | ? | ? | Research if exists |
| **CoPaw** | ? | ? | Research if exists |
| **NanoClaw** | ? | ? | Research if exists |

---

## 📋 INSTALL ORDER (48-HOUR MVP)

### PHASE 0: CORE INFRASTRUCTURE (Today)
```
1. MetaClaw (core meta-learning)
2. agency-agents (team templates - clone and customize)
3. openclaw-skills (86 skills + skill-security-auditor)
4. marketingskills (33 marketing/CRO/SEO skills for Tyler)
5. ClawSec / skill-security-auditor (security - MUST RUN FIRST)
```

### PHASE 1: AGENT DEPLOYMENT (Today)
```
5. Dave, Kyle, Marcus, Tyler, Ryan configurations
6. Skills per agent role
7. Paperclip setup for orchestration
```

### PHASE 2: CLIENT DASHBOARD (Post-MVP)
```
8. LobsterBoard (client dashboard)
9. AutoResearchClaw (Ryan's base)
10. geo-seo-claude (Tyler's SEO tool)
```

### PHASE 3: SCALE (After Revenue)
```
11. OpenSpace (cost optimization - 46% fewer tokens)
12. Memento-Skills (auto-agent generation)
13. canopy (team management - optional)
```

---

## 📊 QUICK REFERENCE TABLE

| Priority | Repo | Type | Use |
|----------|------|------|-----|
| 🔴 HIGH | MetaClaw | Core | Meta-learning agents |
| 🔴 HIGH | agency-agents | Templates | 25+ agent personas |
| 🔴 HIGH | openclaw-skills | Skills | 86 skills + security auditor |
| 🔴 HIGH | HiClaw | Orchestration | Team coordination |
| 🔴 HIGH | AutoResearchClaw | Agent | Research automation |
| 🔴 HIGH | LobsterBoard | Dashboard | Client dashboard |
| 🔴 HIGH | geo-seo-claude | Tool | SEO/GEO for Tyler |
| 🔴 HIGH | marketingskills | Skills | CRO, copy, SEO, paid ads, GTM |
| 🔴 HIGH | ClawSec | Security | Skill security auditing |
| 🟡 MED | canopy | Management | Team orchestration |
| 🟡 MED | OpenSpace | Optimization | Cost reduction |
| 🟡 MED | Memento-Skills | Auto-Gen | Agent creation |
| 🟢 LOW | Claw3D | Visualization | 3D office (cool) |
| 🟢 REF | deer-flow | Architecture | Reference only |
| 🟢 REF | awesome-openclaw-skills | Registry | Skills discovery |
| 🟢 REF | ai-engineering-toolkit | Reference | Tool reference |
| 🟢 REF | awesome-openclaw-usecases | Reference | Use case ideas |
| ❌ SKIP | codingcreatively | Malicious | Phishing/hacking tools |
| ❌ SKIP | OpenJarvis | Research | Stanford project |
| ❌ SKIP | AgentScope | Framework | Competitor to OpenClaw |
| ❌ SKIP | ruflo | Orchestration | Competitor to Paperclip |
| ❌ SKIP | NemoClaw | Alpha | Not production ready |
| ❌ SKIP | mcpmarket.com | Inaccessible | Use ClawHub instead |
| ❌ SKIP | youtube-shorts-pipeline | Marketing | Not core infra |

---

## 🎯 BOTTOM LINE

**For our MVP, we install:**
1. MetaClaw (core)
2. agency-agents (templates)
3. openclaw-skills + ClawSec (skills + security)
4. AutoResearchClaw (Ryan)
5. LobsterBoard (dashboard)
6. geo-seo-claude (Tyler)

**We defer:**
- canopy, OpenSpace, Memento-Skills (post-MVP)

**We skip:**
- Malicious tools, competitors, alpha software

---

*Document created: 2026-03-27 by Henry (CEO Agent)*
*Method: Web scraping + detailed analysis of all 24 repos*
