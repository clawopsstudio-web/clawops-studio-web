# Skill/Agent Prune Plan — ClawOps Studio

**Goal:** Reduce runtime noise, increase specialization, lower hallucination risk.  
**Current reality:** Doctor shows 111 eligible skills, but only 6 plugins loaded. Clutter is mostly extra agents/personas.

---

## 🟢 KEEP — Active Business-Ready Core

### Global / HQ Core
- **telegram** — delivery channel (essential)
- **lossless-claw** — context engine (keeps memory/continuity)
- **metaclaw-openclaw** — self-improvement (active, low overhead)
- **bmad-method** — workflow tools (Dev uses it)
- **google** — web search (basic research)
- **notion** — docs/workspace (business docs)
- **github** — code/repo access (development)
- **mcporter** — MCP server (coordination)
- **web_fetch** — content extraction (research)

### Lane-Specific Active Tools
- **Ryan / Sales**
  - GHL (via MCP)
  - notion
  - lightweight research

- **Arjun / Research**
  - DeerFlow (after restore)
  - web research
  - document ingestion
  - *Later:* notebooklm-py

- **Dave / Backend**
  - Supabase (live)
  - GitHub
  - infra/deployment tools
  - *Later:* payment tools

- **Kyle / Frontend**  
  - GitHub
  - browser/dev tools
  - *Later:* design/prototyping tools

- **Tyler / Marketing**
  - web research
  - *Later:* notebooklm-py for content

- **Andrew / Architecture**
  - GitHub
  - design/planning tools

---

## 🟡 ARCHIVE — Not Active Now, Might Use Later

### Agent Workspaces (hide from runtime)
- instagram-curator
- narratologist  
- book-co-author
- paid-media-auditor
- mobile-app-builder
- support-responder
- china-market-localization-strategist
- discovery-coach
- unity-architect
- git-workflow-master
- compliance-auditor
- workflow-optimizer
- bilibili-content-strategist
- content-creator
- technical-artist
- video-optimization-specialist
- unity-shader-graph-artist
- reddit-community-builder
- data-consolidation-agent
- reality-checker
- data-engineer
- sre-site-reliability-engineer
- civil-engineer
- project-shepherd
- geographer
- pipeline-analyst
- performance-benchmarker
- supply-chain-strategist
- trend-researcher
- roblox-systems-scripter
- senior-project-manager
- xr-immersive-developer
- ad-creative-strategist
- tiktok-strategist
- blender-add-on-engineer
- deal-strategist
- ai-citation-specialist
- model-qa-specialist
- visual-storyteller
- studio-producer
- report-distribution-agent
- historian
- ux-architect
- recruitment-specialist
- psychologist
- podcast-strategist
- proposal-strategist

### Skills (disable/configure selectively)
- **openclaw-weixin** — unless actively using WeChat
- **goplaces** — map/location (not core business)
- **openai-image-gen** — unless needed for content
- **openai-whisper-api** — unless needed for voice

---

## 🔴 REMOVE LATER — Not Business-Relevant

### Repos to Remove from Disk
- agency-agents (too many templates)
- openclaw-master-skills (too broad, catalog only)
- AutoResearchClaw (research-focused, not delivery)
- geo-seo-claude (SEO tool, not core)
- marketingskills (marketing tools, not core)
- Memento-Skills (auto-agent gen, not MVP)
- canopy (team management, scale later)
- OpenJarvis (research toy)
- AgentScope (competitor)
- ruflo (competitor)
- NemoClaw (alpha, not ready)

### Plugins to Disable
- **openclaw-weixin** (unless WeChat is needed)
- Any unused MCP servers

---

## 🎯 Strategic Addition Plan

### After MVP — Add These
1. **DeerFlow** — restore with OpenRouter free model (research tool)
2. **notebooklm-py** — research/content generation (Arjun/Tyler)
3. **CLI-Anything** — engineering harnesses (Dev-only tool)

### Catalog Only — Use Sparingly
- LeoYeAI/openclaw-master-skills (cherry-pick only if needed)
- Individual skills from above repos, not wholesale installs

---

## 📊 Expected Outcome

After prune:
- **Active plugins:** 6 → ~8 (add DeerFlow, notebooklm later)
- **Relevant agents:** 7 → 7 (core team only)
- **Exposed skills:** 111 → ~15 (core + lane-specific)
- **Runtime noise:** ↓↓ (more deterministic, less hallucination risk)

This makes the system more focused, faster, and more business-aligned while preserving lane-specific capabilities.