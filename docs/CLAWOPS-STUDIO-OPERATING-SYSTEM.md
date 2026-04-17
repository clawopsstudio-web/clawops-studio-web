# ClawOps Studio — Operating System

_Last updated: 2026-03-27_

## 1) Business Overview

**Business:** ClawOps Studio  
**Founder:** Pulkit  
**Offer:** Agency AI Employees  
**Pricing:** ~$299–499/month per client  
**Target clients:** Digital agencies, SaaS founders, marketing teams

## 2) Core Business Goal

Build a productized service where a client can:

1. Sign up
2. Pay
3. Complete onboarding form
4. Share business context/assets
5. Receive a provisioned VPS
6. Get a tailored OpenClaw-based AI team deployed
7. Be handed access, dashboard, and ongoing support

Target state: **~95% automation**, with the practical understanding that logins, credentials, approvals, some OAuth steps, and some platform-specific UI actions may still require manual or semi-manual intervention.

## 3) Core Infrastructure Stack

- OpenClaw
- Paperclip
- Docker
- Tailscale
- UFW
- Playwright + Chrome
- n8n
- Contabo VPS per client

## 4) Current Operating Rules

- Use dedicated VPS infrastructure per client.
- Tailscale is the preferred secure access layer.
- Direct Paperclip access over Tailscale is the currently trusted path.
- OpenClaw gateway must remain externally reachable to Paperclip.
- Agent creation in Paperclip is handled via invite/manual board approval flow where needed.
- Standard API creation may still fail with board restrictions.

## 5) Org Chart

- **Henry** — CEO / Chief AI Officer
  - **Ryan** — Sales
  - **Arjun** — Research
  - **Dev** — Founding Engineer
    - **Dave** — DevOps / Backend
    - **Kyle** — Frontend / Web
  - **Tyler** — Marketing / SEO

## 6) Agent Role Definitions

### Henry — CEO / Chief AI Officer
Owns company direction, final decisions, prioritization, delivery quality, escalation, coordination of all agents, and communication with Pulkit.

### Ryan — Sales
Owns outreach, follow-ups, lead qualification, objection handling, pipeline movement, and closing support.

### Arjun — Research
Owns market research, competitor mapping, offer research, workflow/tooling research, niche discovery, and strategic synthesis.

### Dev — Founding Engineer
Owns technical architecture, engineering standards, implementation quality, technical planning, and oversight of Dave and Kyle.

### Dave — DevOps / Backend
Owns VPS provisioning, Docker, networking, Tailscale, UFW, backend services, integrations, deployment automation, and system reliability.

### Kyle — Frontend / Web
Owns website/frontend work, landing pages, dashboards, client portal UI, usability, polish, and web-based client experiences.

### Tyler — Marketing / SEO
Owns positioning, messaging, SEO/GEO, content strategy, landing page copy, case studies, growth support, and sales collateral.

## 7) Agent SOPs

### Henry SOP
- Set weekly priorities
- Review pipeline, delivery, blockers, and risks
- Make final decision on tradeoffs
- Approve major changes in systems/process
- Escalate technical architecture to Dev when needed
- Report clear business status to Pulkit

### Ryan SOP
- Keep lead list active
- Follow up relentlessly but intelligently
- Qualify leads by pain, urgency, budget, and fit
- Push leads toward calls, demos, or close
- Keep pipeline honest; no vanity metrics
- Escalate technical questions to Dev/Henry

### Arjun SOP
- Produce competitor research and market maps
- Find verticals/niches with pain + buying intent
- Research pricing, offers, positioning, and demand signals
- Summarize findings into actionable recommendations
- Support sales and marketing with intelligence, not fluff

### Dev SOP
- Own technical standards and system design
- Turn business needs into implementation plans
- Review architecture, integrations, and code quality
- Decide what Dave vs Kyle should execute
- Prevent technical debt from blocking delivery

### Dave SOP
- Provision and harden infrastructure
- Maintain backend services and deployment flows
- Keep networking, firewall, gateway, and tailnet stable
- Diagnose outages and infra regressions fast
- Improve repeatable deployment automation

### Kyle SOP
- Build and improve web UI and dashboard surfaces
- Translate business requirements into clean UX
- Improve frontend reliability, clarity, and polish
- Support sales/marketing pages when needed
- Keep implementation practical, not overly fancy

### Tyler SOP
- Build messaging that converts
- Create SEO/GEO strategy and content plans
- Improve landing pages, case studies, offers, and positioning
- Support sales with collateral and persuasive assets
- Focus on pipeline and revenue impact, not vanity content

## 8) Model Assignment Strategy

This setup is intentionally optimized for **quality + cost-effectiveness**, not maximal power everywhere.

### Global rule
- Premium models are reserved for leadership and critical technical work.
- Workhorse models handle research, iteration, and production throughput.
- Free/cheap models absorb high-volume routine tasks.

### Recommended starting map
- **Henry:** `openai-codex/gpt-5.4`
- **Ryan:** `openrouter/mistralai/mistral-small-3.1-24b-instruct:free`
- **Arjun:** `opencode-go/minimax-m2.7`
- **Dev:** `openai-codex/gpt-5.3-codex`
- **Dave:** `openrouter/qwen/qwen3-coder:free`
- **Kyle:** `opencode-go/minimax-m2.5`
- **Tyler:** `openrouter/nvidia/nemotron-3-super-120b-a12b:free`

### Recommended fallbacks
- Most agents: `google/gemini-3.1-flash-lite-preview`
- Dev fallback: `openrouter/qwen/qwen3-coder:free`
- Henry fallback: `google/gemini-3.1-flash-lite-preview`

### Why this mix
- **GPT-5.4:** best reserved for CEO/final review
- **GPT-5.3 Codex:** strong engineering lead model
- **MiniMax M2.7:** high-quality, lower-cost research workhorse
- **MiniMax M2.5:** cheaper/faster UI and execution model
- **Qwen3 Coder free:** strong budget coding/backend model
- **Nemotron free:** strong planning/instruction-following for marketing workflows
- **Mistral Small free:** efficient writing/assistant-style sales support
- **Gemini Flash Lite:** fast cheap fallback across the org

## 9) Model Governance Rules

- Model assignments are **not permanent**.
- Models can be changed later per agent, per session, or by fallback chain.
- Org design and SOPs matter more than any one model.
- If one model underperforms for a role, swap it without changing the org chart.

## 10) Delivery Philosophy

ClawOps Studio is not selling generic AI chat. It is selling deployable, role-based AI workers with defined outputs, responsibilities, and workflow placement.

The offer must stay anchored to:
- revenue impact
- speed of deployment
- repeatability
- client clarity
- automation where it matters

## 11) Near-Term Priorities

1. Finalize agent operating docs
2. Clean up Paperclip org/roles where needed
3. Finish any remaining agent claims/approvals
4. Assign models per agent
5. Standardize client onboarding process
6. Build repeatable deployment workflow
7. Push operating docs into Notion

## 12) Notes

- `openrouter/auto` has been removed from the live config.
- Global primary model has been switched to `openai-codex/gpt-5.4`.
- Model assignments can be tuned later without disrupting structure.
