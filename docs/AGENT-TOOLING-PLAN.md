# AGENT TOOLING PLAN — Lean v1

Purpose: define the minimum practical tools, access paths, and automation methods for each ClawOps agent.

Principle: each agent should use the lightest working path first.
Priority of execution methods:
1. Direct API
2. MCP server
3. n8n workflow
4. Browser automation

Use browser automation only when the platform forces it.

---

## Henry — HQ / Command

### Core job
- Route priorities
- See blockers
- Keep the machine moving

### Needed tools
- Telegram
- workspace files / memory
- GitHub visibility
- Notion visibility
- CRM visibility (GHL)
- status/ops checks

### Preferred execution
- Direct API where possible
- MCP for structured systems
- Browser only for UI-only ops

---

## Ryan — Sales / Pipeline

### Core job
- leads
- outreach
- follow-up
- pipeline movement

### Needed tools
- GoHighLevel
- email / inbox workflow
- Telegram
- LinkedIn / social workflow support
- lead research handoff from Arjun

### Preferred execution
- Direct API or MCP for GHL
- n8n for follow-up automation
- browser automation only where outbound/social tools require it

---

## Arjun — Research / Market Intel

### Core job
- prospect research
- market research
- competitor intel
- audience / offer research

### Needed tools
- web research
- scraping / browser support where needed
- notion / docs output
- lead list enrichment inputs

### Preferred execution
- direct web/API first
- browser only when source pages block normal extraction

---

## Dev — Founding Engineer / Core Build

### Core job
- productization
- onboarding-to-runtime system design
- deployment architecture
- client stack shaping

### Needed tools
- GitHub
- deployment scripts
- Contabo API
- stack templates
- agent generation logic
- integration design surface

### Preferred execution
- direct API / CLI first
- MCP when useful
- browser only for forced admin flows

---

## Dave — DevOps / Backend

### Core job
- infra
- reliability
- backend services
- deployment runtime

### Needed tools
- Contabo API
- Docker
- Tailscale
- OpenClaw config/runtime
- backend provider (Supabase or insforge.dev)
- logs and service health

### Preferred execution
- direct CLI/API first
- n8n only for repeatable operational workflows

---

## Kyle — Frontend / Web

### Core job
- websites
- dashboards
- client-facing web apps
- polished frontend delivery

### Needed tools
- GitHub
- Vercel
- frontend framework/project templates
- design/assets workflow
- optional browser testing

### Preferred execution
- GitHub + direct deploy integration
- Vercel API or CLI first
- browser automation only for testing or UI-only config

---

## Tyler — Marketing / SEO

### Core job
- content
- SEO/GEO
- positioning
- distribution
- build-in-public momentum

### Needed tools
- X/Twitter workflow
- LinkedIn workflow
- content production tools
- image/video generation tools
- SEO/GEO tools
- notebook/content research helpers

### Preferred execution
- direct generation APIs first
- browser automation for social tools / NotebookLM / Whisk only where necessary

---

## Cross-Agent Money-Making Tool Priorities

### Tier 1 — connect first
1. GoHighLevel
2. GitHub
3. Vercel
4. backend baseline (Supabase or insforge.dev)
5. Contabo API

### Tier 2 — connect after core is stable
1. n8n workflows
2. social posting/content stack
3. browser automation for UI-only platforms
4. HiClaw practical use case
5. MetaClaw improvement loop

---

## Current Working Recommendations

### LobsterBoard
- useful later for dashboards / client visibility
- not required before revenue tooling and deployment tooling are working

### HiClaw
- use for one collaboration use case only
- do not make it a hard dependency yet

### MetaClaw
- use after repeated workflows exist
- best for optimization, not initial stack assembly

---

## Immediate Build Order

1. Telegram lane validation
2. GHL connection path
3. Frontend lane: GitHub + Vercel
4. Backend decision: Supabase vs insforge.dev
5. Contabo deployment path
6. outbound validation engine
