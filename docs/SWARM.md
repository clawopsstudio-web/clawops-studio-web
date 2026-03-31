# SWARM ARCHITECTURE — ClawOps Agent Swarm

## Purpose

Enable parallel execution of all backlog items through an autonomous agent swarm coordinated by Henry.

Goal: entire backlog completes without Pulkit micromanaging.

---

## How the Swarm Works

Henry is the **coordinator + HQ**.
Sub-agents are **workers** on specific streams.
Results feed back into Mission Control.
Henry surfaces only real blockers.

### Execution Loop
```
Henry picks next task → spawns agent → agent executes → updates Mission Control
→ Henry reviews → next task → repeat until blocked
```

---

## Agent Roles & Mandates

### Henry (Coordinator)
- Owns sequence and priorities
- Spawns and steers sub-agents
- Updates Mission Control
- Surfaces blockers to Pulkit
- Runs autonomy loop

### Ryan (Sales Swarm)
- Lead outreach and follow-up
- Offer positioning and validation
- GHL CRM management
- Target: revenue this week

### Tyler (Content Swarm)
- First 1-week content batch
- Social posts (X, LinkedIn, Facebook, Skool)
- Build-in-public narrative
- Offer validation content

### Andrew (Architecture)
- System design decisions
- Product structure
- AI/backend logic boundaries
- Freezes architecture before build expands

### Dave (Backend/Infra Swarm)
- Supabase live project setup (browser + Gmail session)
- Database schema (clients, projects, tasks, payments)
- Payment API integration
- Deployment pipeline (Contabo)
- Webhook handling

### Kyle (Frontend Swarm)
- Landing/offer page (GitHub Pages fallback)
- Client onboarding UI
- Dashboard / Mission Control improvements
- Vercel deployment (after auth)

### Arjun (Research Swarm)
- Market intel
- Competitor analysis
- Offer validation research
- Keep informed on GEO/SEO landscape

---

## Swarm Coordination Rules

1. **One task per agent at a time** — no multitasking dilution
2. **Henry sequences** — what runs when, who works on what
3. **Update Mission Control** — after every milestone
4. **Real blockers → Henry** — surface to Pulkit only what truly can't be worked around
5. **No idle agents** — if blocked, pick next backlog task
6. **Browser automation first** for web app setup (Gmail session available)
7. **Commit after milestones** — keep git current

---

## Tool Access Per Agent

| Agent | Primary Tools | Auth Method |
|-------|--------------|-------------|
| Henry | all | coordinator |
| Ryan | GHL MCP, browser, Telegram | MCP + browser (Gmail) |
| Tyler | browser, GitHub, Telegram | browser (Gmail) |
| Andrew | docs, OpenClaw config | file-based |
| Dave | Supabase, Docker, browser, shell | browser (Gmail) + shell |
| Kyle | GitHub, Vercel, Playwright | browser (Gmail) + GitHub |
| Arjun | browser, web search, DeerFlow | browser + web search |

---

## Spawning Protocol

### When to spawn
- parallel work stream is unblocked
- task is large enough to benefit from dedicated focus
- Henry needs to coordinate multiple fronts simultaneously

### How to spawn
```
sessions_spawn with:
  - runtime: "subagent" or "acp"
  - mode: "run" (one-shot) or "session" (persistent)
  - task: clear mandate from backlog
  - cwd: /root/.openclaw/workspaces/arjun
```

### What to include in spawn task
1. exact task from backlog
2. relevant files to read
3. success criteria
4. where to report output
5. when to update Mission Control

---

## Browser Automation Standard

- Playwright + Chrome available
- Pulkit's Gmail/Google session = default auth for web apps
- Use for: signup, login, form fills, OAuth, UI config
- NOT for: billing, destructive actions, credential changes
- After setup: export tokens to shell env for persistent access

---

## Status Reporting

- Agents report to Henry via session messages
- Henry aggregates and updates Mission Control
- Henry surfaces only real blockers to Pulkit
- No noisy per-agent status to Pulkit unless important

---

## Autonomy Success Criteria

- [ ] Henry picks next task without prompting
- [ ] Henry spawns parallel agents for unblocked work
- [ ] Agents execute and update Mission Control
- [ ] Browser automation used for web app setup
- [ ] Henry runs 24+ hours without Pulkit prompts
- [ ] Backlog clears without micromanagement
