# TASKS — ClawOps HQ

Purpose: single operating backlog for Henry / ClawOps Studio.
Status legend: TODO | DOING | BLOCKED | DONE | DEFERRED
Priority: P0 = revenue/launch | P1 = this week | P2 = useful | P3 = someday

---

## ⚡ PRIMARY GOAL: Full Autonomy

**All pending work goes to backlog. Autonomy is the only active P0.**

### Why
If Henry + swarm are fully autonomous:
→ the entire backlog completes without Pulkit micromanaging
→ product gets built in parallel
→ revenue runs automatically

### Definition of "fully autonomous"
Henry can run the entire operation without Pulkit being present:
- picks next unblocked task
- executes using available tools
- uses browser automation for web apps (Gmail session available)
- updates docs and Mission Control
- spawns/coordinates sub-agents for parallel work
- surfaces only real blockers
- continues until blocked

### Current autonomy blockers
1. No hard "continue without asking" rule
2. Too many parallel threads diluting focus
3. Some web app setup still requires manual session/auth
4. Backend/product path not fully locked
5. Swarm coordination not defined

### Autonomy success criteria
- [ ] Henry executes backlog items without prompting
- [ ] Swarm spawns and coordinates parallel work
- [ ] Browser automation used for web app setup (Gmail session)
- [ ] Mission Control stays synced automatically
- [ ] Only real blockers surface to Pulkit

---

## 📦 BACKLOG

All items below are DEFERRED until autonomy is proven.

### Product / Build
- [DEFERRED] Landing page + offer page
- [DEFERRED] Client onboarding dashboard
- [DEFERRED] Client portal / login flow
- [DEFERRED] Automated onboarding flow (form → setup → delivery)
- [DEFERRED] Payment integration (Stripe or provider)
- [DEFERRED] Deployment pipeline (Contabo + stack shaping)
- [DEFERRED] Supabase live project + credentials
- [DEFERRED] 1-click Contabo deployment path
- [DEFERRED] Outbound validation engine execution
- [DEFERRED] Sales content batch (Tyler's first week)
- [DEFERRED] Sales recurring workflow (Ryan's loop)

### Infrastructure / Tools
- [DEFERRED] Vercel auth + deployment flow
- [DEFERRED] DeerFlow research integration
- [DEFERRED] Paperclip re-evaluation
- [DEFERRED] MetaClaw improvement loop
- [DEFERRED] HiClaw narrow pilot use case
- [DEFERRED] LobsterBoard decision

### Done
- [DONE] Telegram lane operations (stable enough)
- [DONE] GoHighLevel CRM connectivity (MCP path, read + safe write)
- [DONE] Backend baseline documentation (Supabase baseline doc exists)
- [DONE] Outbound validation engine plan (doc exists, not executed)

---

## 🐝 AGENT SWARM ARCHITECTURE

### How it works
Henry is the primary swarm coordinator.
Sub-agents are spawned for parallel work streams.
Each agent has a clear mandate and knows what to do.
Results feed back into Mission Control.

### Swarm roles
| Agent | Swarm Role | What they own |
|-------|-----------|---------------|
| Henry | Coordinator + HQ | Sequence, priorities, blocking, final review |
| Ryan | Sales swarm | Outreach, follow-up, lead triage, offer positioning |
| Tyler | Content swarm | Content batch, social, X/build-in-public posts |
| Andrew | Architecture | System design, product structure, boundary decisions |
| Dave | Backend/Infra | Supabase, database, payment API, deployment pipeline |
| Kyle | Frontend | Landing page, dashboard, onboarding UI, Vercel deploy |
| Arjun | Research | Market intel, competitor analysis, offer validation |

### Coordination rules
1. One task per agent at a time
2. Henry sequences what runs when
3. Agents update Mission Control after each milestone
4. Real blockers → Henry surfaces to Pulkit
5. No agent waits idle; if blocked, pick next task from backlog
6. Browser automation is the default for web app setup (Gmail session available)

### Swarm execution loop
```
Henry picks next task → spawns agent → agent executes → updates Mission Control
→ Henry reviews output → next task → repeat until blocked
```

---

## 🔑 BROWSER AUTOMATION RULE

- Playwright + Chrome are available
- Pulkit's Gmail/Google session is the default auth for web apps
- Use browser for: signup, login, form fills, OAuth, UI configuration
- Do NOT use browser for: billing, destructive actions, credential rotation
- After setup, export/store tokens/env for shell/API access

---

## 🎯 CURRENT SEQUENCE (until autonomy proven)

1. **Henry builds autonomy system fully**
   - Lock AUTONOMY-RULES.md v2
   - Set up swarm spawning protocol
   - Verify Henry can execute backlog without Pulkit

2. **Product build runs in parallel via swarm**
   - Spawn agents for: landing page, onboarding, payment, deployment

3. **Revenue motion runs in parallel via swarm**
   - Ryan: outbound + follow-up
   - Tyler: content batch

4. **Backend/infra runs in parallel via swarm**
   - Dave: Supabase live connect + payment webhook
   - Kyle: Vercel deploy

---

## AUTONOMY SUCCESS METRIC

**When Henry can execute the full backlog loop for 24 hours without Pulkit prompting → autonomy is proven.**
