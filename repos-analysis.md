# ClawOps Studio - Repository Analysis

**Analyzed by:** Henry (CEO Agent)  
**Date:** 2026-03-27  
**Purpose:** Determine what to integrate into ClawOps Studio architecture

---

## 🎯 EXECUTIVE SUMMARY

Out of 21 links analyzed, here's what we NEED vs. DON'T NEED:

### ✅ INSTALL NOW (High Priority)
| Repo | Why | How It Fits |
|------|-----|-------------|
| **MetaClaw** | Agent that meta-learns and evolves | Core infrastructure - makes our agents smarter over time |
| **agency-agents** | Pre-built agent personas (Frontend Dev, Backend, etc.) | Source material for our team (Dave, Kyle, Marcus, etc.) |
| **openclaw-skills** | 86 production-ready skills (engineering, marketing, etc.) | Gives our agents specialized capabilities |
| **AutoResearchClaw** | Research agent for OpenClaw | Use for Ryan (Research agent) |
| **VoltAgent/awesome-openclaw-skills** | 5200+ skills registry reference | Know what's available for client needs |

### ⚡ DEFER (Medium Priority)
| Repo | Why | When |
|------|-----|------|
| **canopy** | Workspace protocol with virtual office | Nice to have after MVP |
| **OpenSpace** | Self-evolving agents (46% fewer tokens) | After we prove the model |
| **Memento-Skills** | "Let Agents Design Agents" | Interesting for auto-generating client agents |
| **LobsterBoard** | Dashboard builder (60+ widgets) | For client dashboard UI |
| **geo-seo-claude** | GEO/SEO optimization tool | For Tyler's marketing work |
| **deer-flow** | ByteDance agent architecture | Reference for building our own orchestration |

### ❌ SKIP (Not Relevant)
| Repo | Why |
|------|-----|
| **codingcreatively** | User with pentest/hacking tools - not relevant, some are malicious |
| **Claw3D** | 3D visualization - cool but not core to our business |
| **OpenJarvis** | Stanford local-first AI research - not applicable |
| **ruflo** | Agent orchestration - Paperclip is better for our stack |
| **agentscope** | Alternative agent framework - we use OpenClaw |
| **awp-skill** | Blockchain/crypto related - not our business |
| **mcpmarket.com** | Couldn't access (429 error) - ClawHub has the same |
| **youtube-shorts-pipeline** | YouTube automation - marketing tactic, not core infra |
| **awesome-openclaw-usecases** (dup) | Duplicate entry |

---

## 📦 DETAILED ANALYSIS

### 1. ✅ **agency-agents** (msitarzewski)
**Relevance:** 🔴 HIGH  
**Link:** https://github.com/msitarzewski/agency-agents

**What it is:** Collection of pre-built AI agent personas with specialized expertise.

**Contains:**
- Frontend Developer (React/Vue/Angular)
- Backend Architect
- More agents in the repo

**How we use it:**
- Copy agent definitions for our team (Dave, Kyle, Marcus, Tyler, Ryan)
- Customize their prompts and workflows
- Use as templates for client-specific agents

**Action:** Clone and adapt for our team structure.

---

### 2. ✅ **MetaClaw** (aiming-lab)
**Relevance:** 🔴 HIGH - CORE INFRASTRUCTURE  
**Link:** https://github.com/aiming-lab/MetaClaw

**What it is:** Agent that meta-learns and evolves. Supports multiple Claw variants (OpenClaw, IronClaw, PicoClaw, ZeroClaw, CoPaw, NanoClaw, NemoClaw).

**Key features:**
- Auto-fix: When a skill breaks, it fixes itself
- Auto-improve: Successful patterns become better skill versions
- Auto-learn: Captures winning workflows from actual usage
- Cross-session memory
- OpenRouter support

**How we use it:**
- Install on every agent we deploy
- Agents get smarter over time automatically
- Handles the "learning" part of our 95% automation goal

**Action:** THIS IS PART OF OUR CORE STACK. Install first.

---

### 3. ✅ **openclaw-skills** (moriiisaac)
**Relevance:** 🔴 HIGH  
**Link:** https://github.com/moriiisaac/openclaw-skills

**What it is:** 86 production-ready skills for Claude Code, OpenAI Codex, and OpenClaw.

**Categories:**
- Engineering (21 core, 25 advanced)
- Product (8)
- Marketing (7)
- Regulatory/Quality (12)
- Project Management (6)
- C-level advisory (2)
- Business & Growth (4)
- Finance (1)

**How we use it:**
- Install relevant skills on each agent
- Dave (Dev) gets engineering skills
- Marcus (Sales) gets business/growth skills
- Tyler (Marketing) gets marketing skills
- Ryan (Research) gets research/analysis skills

**Action:** Install skill packages relevant to each agent role.

---

### 4. ✅ **AutoResearchClaw** (aiming-lab)
**Relevance:** 🟡 MEDIUM-HIGH  
**Link:** https://github.com/aiming-lab/AutoResearchClaw

**What it is:** Fully autonomous self-evolving research agent. Chat an idea → get a paper/research.

**How we use it:**
- Use as the base for Ryan (Research agent)
- Research market trends, competitors, opportunities
- Automated competitive analysis

**Action:** Install for Ryan.

---

### 5. ✅ **awesome-openclaw-skills** (VoltAgent)
**Relevance:** 🟢 REFERENCE  
**Link:** https://github.com/VoltAgent/awesome-openclaw-skills

**What it is:** Curated collection of 5,200+ OpenClaw skills from ClawHub.

**How we use it:**
- Reference for what skills exist
- Find specialized skills for client needs
- Not to install directly - just to know what's available

**Action:** Bookmark for when clients need specific capabilities.

---

### 6. ⚡ **canopy**
**Relevance:** 🟡 MEDIUM  
**Link:** https://github.com/Miosa-osa/canopy

**What it is:** Open-source workspace protocol and command center for AI agent systems. "Build autonomous AI companies — not chatbots."

**Features:**
- 5-layer org hierarchy (Company → Division → Department → Team → Agent)
- Virtual office (pixel-art 2D + 3D)
- Agent lifecycle management
- Heartbeat schedules
- 330+ agent roster

**How we use it:**
- Interesting architecture reference
- Could replace/enhance our Paperclip setup later
- The virtual office is interesting for visualizing our team

**Action:** Study architecture, consider after MVP.

---

### 7. ⚡ **OpenSpace** (HKUDS)
**Relevance:** 🟡 MEDIUM  
**Link:** https://github.com/HKUDS/OpenSpace

**What it is:** "Make Your Agents: Smarter, Low-Cost, Self-Evolving"

**Key stats:**
- 46% fewer tokens
- Self-evolving skills
- Network effects across agents

**How we use it:**
- Could integrate after MVP for cost savings
- Makes agents smarter by sharing learnings

**Action:** Defer until after we have paying clients.

---

### 8. ⚡ **LobsterBoard**
**Relevance:** 🟡 MEDIUM  
**Link:** https://github.com/Curbob/LobsterBoard

**What it is:** Drag-and-drop dashboard builder with 60+ widgets. Self-hosted, no cloud.

**How we use it:**
- Could be the base for client dashboard
- Monitor agent activity, cron jobs, logs

**Action:** Consider for client-facing dashboard after MVP.

---

### 9. ⚡ **geo-seo-claude**
**Relevance:** 🟢 NICE TO HAVE  
**Link:** https://github.com/zubair-trabzada/geo-seo-claude

**What it is:** GEO-first SEO optimization tool for AI search (ChatGPT, Claude, Perplexity, Gemini).

**How we use it:**
- Tyler's (Marketing) tool for SEO optimization
- Client reports for GEO/SEO

**Action:** Install for Tyler after MVP.

---

### 10. ⚡ **Memento-Skills**
**Relevance:** 🟡 MEDIUM  
**Link:** https://github.com/Memento-Teams/Memento-Skills

**What it is:** "Let Agents Design Agents" - agents can create other agents.

**How we use it:**
- Auto-generate client-specific agents based on their profile
- Part of our "95% automation" goal

**Action:** Interesting for Phase 2 when we have automated onboarding.

---

### 11. ⚡ **deer-flow** (ByteDance)
**Relevance:** 🟢 REFERENCE  
**Link:** https://github.com/bytedance/deer-flow

**What it is:** Open-source super agent harness with subagents, memory, sandboxes.

**How we use it:**
- Reference architecture for building our own orchestration
- Not to install - just study the patterns

**Action:** Study for architectural ideas.

---

### 12. ❌ **codingcreatively**
**Relevance:** 🔴 SKIP  
**Link:** https://github.com/codingcreatively

**What it is:** User with various repos including pentest tools, BTC prediction, DDOS tools, etc.

**Why skip:** Not relevant to our business. Some tools are security-related/questionable. We don't need WhatsApp phishing tools or Instagram mass report tools.

**Action:** SKIP.

---

### 13. ❌ **Claw3D**
**Relevance:** 🟢 NICE TO HAVE (But skip for MVP)  
**Link:** https://github.com/iamlukethedev/Claw3D

**What it is:** 3D visualization layer for OpenClaw (virtual office where you can see agents working).

**Why skip for now:** Cool visualization but not core to our business model. Nice to have after MVP.

**Action:** Skip for MVP.

---

### 14-23. ❌ Various others (skip)
- **OpenJarvis:** Stanford local-first AI research project
- **ruflo:** Agent orchestration (Paperclip is better)
- **agentscope:** Alternative agent framework
- **awp-skill:** Blockchain-related
- **mcpmarket.com:** Couldn't access
- **youtube-shorts-pipeline:** Marketing tactic, not core infra
- **awesome-openclaw-usecases:** Duplicate

---

## 📋 INSTALL ORDER

For our 48-hour MVP, here's what to install and when:

### RIGHT NOW (Today):
1. **MetaClaw** - Core infrastructure
2. **agency-agents** - Team structure template
3. **openclaw-skills** - Relevant skill packages for each role

### AFTER MVP:
4. **AutoResearchClaw** - For Ryan (Research)
5. **LobsterBoard** - For client dashboard
6. **geo-seo-claude** - For Tyler (Marketing)
7. **canopy** - For team management (optional)

### PHASE 2 (After revenue):
8. **OpenSpace** - Self-evolving agents for cost savings
9. **Memento-Skills** - Auto-generate client agents

---

## 🎯 BOTTOM LINE

**We need:**
- MetaClaw (core)
- agency-agents (team templates)
- openclaw-skills (capabilities)

**We reference but don't install now:**
- deer-flow (architecture ideas)
- awesome-openclaw-skills (skill discovery)
- canopy (future team management)

**We skip:**
- codingcreatively (irrelevant/malicious)
- Everything else not listed above

**Next step:** Pulkit, confirm this list and I'll start installing the HIGH priority ones.
