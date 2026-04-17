# Execution Path Decision Framework

Last updated: 2026-03-31
Owner: Henry

## Purpose

Use the simplest, most reliable execution path for any app or workflow.

ClawOps should not default to browser-driving if a cleaner path exists.
At the same time, agents should not get stuck when one integration path fails.

## Default order of preference

1. **Direct API**
2. **MCP**
3. **n8n**
4. **CLI-Anything**
5. **Browser automation / Playwright**

This is the default ladder unless there is a strong reason to override it.

---

## The 5 execution paths

### 1) Direct API
Use when:
- the app has a real documented API
- auth is available
- the task is structured CRUD/data sync
- reliability matters
- the workflow may become core product/backend logic

Best for:
- contacts, leads, records
- payments
- subscriptions
- database writes
- backend event handling
- provisioning triggers

Why it wins:
- fastest
- most stable
- easiest to version and test
- least dependent on UI changes

---

### 2) MCP
Use when:
- a good MCP server already exists
- it exposes the actions we need cleanly
- agent ergonomics matter
- the API exists but MCP is easier to operate through

Best for:
- GitHub
- Notion
- GHL-style operational workflows
- structured agent actions
- internal agent tool use

Why it wins:
- API-like structure
- easier for agents to call safely
- good middle layer for operational work

---

### 3) n8n
Use when:
- the workflow spans multiple apps
- triggers/webhooks/schedules matter
- retries/logging/branching matter
- the job should keep running without manual prompting
- this is business process automation, not just one action

Best for:
- lead intake
- onboarding flows
- notification pipelines
- CRM updates from forms/events
- scheduled syncs
- multi-app orchestration

Why it wins:
- ideal for glue logic
- strong for automations that must persist
- easier to visualize and audit than ad hoc scripts

---

### 4) CLI-Anything
Use when:
- there is no clean API or MCP path
- the web UI is the real usable interface
- the task is repetitive and high-value
- the UI is stable enough
- we want a reusable command instead of manual clicking

Best for:
- export/download actions
- repetitive admin panel actions
- fixed UI workflows
- internal operator shortcuts
- UI-only apps with stable navigation

Why it wins:
- better than raw browser-driving for repeated flows
- wraps UI behavior in a more reusable operator surface

Limits:
- still depends on UI state
- still vulnerable to session/auth problems
- still breaks when app UI changes too much

---

### 5) Browser automation / Playwright
Use when:
- we are still exploring the app
- the flow is unclear
- auth/login/account selection needs human-like handling
- selectors/steps are still being discovered
- it is a one-off or setup task

Best for:
- discovery
- debugging
- setup
- auth exploration
- validating whether an app is even automatable

Why it wins:
- most flexible
- best fallback when nothing else is ready

Limits:
- highest fragility
- worst long-term maintainability
- should not be the default for core product logic

---

## 30-second decision tree

Ask these in order:

1. **Does a real API exist and do we have auth?**
   - Yes → use **Direct API**
2. **Is there already a good MCP server/tool?**
   - Yes → use **MCP**
3. **Is this a multi-step workflow with triggers/retries/schedules?**
   - Yes → use **n8n**
4. **Is this repetitive UI work with no clean API/MCP?**
   - Yes → use **CLI-Anything**
5. **Are we still learning/debugging/exploring the app?**
   - Yes → use **Browser automation**

Short version:

**API > MCP > n8n > CLI-Anything > Browser**

---

## Fallback rule (important)

Agents should not freeze if one path fails.

### Default fallback ladder
- Start with the best available primary path
- If blocked, degrade cleanly to the next path
- Record which path actually worked
- Promote only verified working paths into recurring operations

### Example fallback sequence
- Direct API fails due to missing scope → try MCP
- MCP lacks the needed action → try n8n
- n8n connector is weak or missing → try CLI-Anything
- CLI-Anything cannot stabilize auth/UI → use browser automation

### Important rule
Fallbacks are good for progress.
They are **not** proof that the weaker path should become the permanent system design.

Always promote the cleanest stable path once verified.

---

## Production vs exploration rule

### Production-critical flows should prefer:
- Direct API
- MCP
- n8n

Examples:
- payments
- onboarding state
- client records
- provisioning triggers
- backend writes
- subscription lifecycle

### Exploration / ops / UI-gap flows may use:
- CLI-Anything
- Browser automation

Examples:
- exports
- admin tasks
- setup steps
- temporary UI-only actions
- internal operator shortcuts

---

## n8n + custom MCP pattern

This is a useful ClawOps pattern.

If multiple apps need to be exposed to agents in a cleaner way, we can:
- connect the apps through n8n
- centralize workflow logic there
- then expose high-value actions through a custom MCP layer

### Why this matters
This gives us:
- one orchestration layer for app logic
- agent-friendly tools on top
- reusable actions without forcing every agent to understand every app directly

### Good use cases
- unified lead intake + CRM sync + notifications
- onboarding actions across form, DB, email, calendar, Drive
- recurring sales/research/reporting operations
- Google Workspace actions bundled into a few clean agent tools

In other words:
- **n8n** can be the workflow engine
- **custom MCP** can be the clean agent interface

That is often stronger than exposing raw app sprawl directly to every agent.

---

## Recommended operating pattern for ClawOps

### For any new app
1. Explore quickly in browser if needed
2. Check for direct API
3. Check for MCP
4. If multi-app workflow is needed, design in n8n
5. If only UI exists, consider CLI-Anything
6. Keep browser automation as fallback, not first principle

### For recurring agent operations
Prefer:
- minimal global tools
- lane-specific tools
- clean fallback logic
- verified working path recorded in docs

---

## Quick examples

### GoHighLevel
- Preferred: MCP
- Fallback: direct API if safe/reliable
- Browser only for edge setup/debug

### Supabase
- Preferred: direct API / SDK / backend wiring
- Fallback: browser for admin/setup only

### Notion
- Preferred: MCP or API
- n8n for workflow triggers

### Google Workspace
- Preferred: API and/or MCP-style wrappers
- n8n for workflows across Gmail/Calendar/Drive/Docs/Sheets
- Browser/CLI-Anything only for gaps or setup

### Random SaaS admin panel with no API
- Preferred: CLI-Anything if repetitive and stable
- Fallback: browser automation

---

## Final rule

Do not ask: "Can this be automated?"

Ask:
**"What is the highest-leverage, lowest-fragility path for this exact workflow — and what is the fallback if it breaks?"**
