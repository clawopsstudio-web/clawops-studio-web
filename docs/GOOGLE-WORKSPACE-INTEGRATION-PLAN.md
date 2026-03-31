# Google Workspace Integration Plan

Last updated: 2026-03-31
Owner: Henry
Status: Planning / ready for execution

## Objective

Connect the highest-value Google surfaces for ClawOps operations and agent workflows without creating auth sprawl, tool sprawl, or brittle browser-only dependencies.

This plan covers:
- Gmail
- Calendar
- Drive
- Docs
- Sheets
- Google AI Studio
- selected Google AI / free-service surfaces as useful

Important: some names mentioned in chat (for example **Pompli**, **Whisk**, **Flow**) need exact product verification before implementation. Do not assume identity, API surface, or auth path until confirmed.

---

## Strategic rule

Use the execution-path ladder:

**Direct API → MCP → n8n → CLI-Anything → Browser**

And add fallback logic:
- if primary path fails, use the next cleanest path
- document which path actually worked
- do not let fallback become permanent architecture by accident

---

## Priority order

### Phase 1 — Core operating surfaces
1. Gmail
2. Calendar
3. Drive
4. Docs
5. Sheets

### Phase 2 — AI / generation surfaces
6. Google AI Studio
7. Other validated Google AI/free surfaces worth using

### Phase 3 — Optional/experimental
8. Any verified useful Google service that passes the ROI test

---

## Service-by-service plan

## 1) Gmail

### Why it matters
- inbound ops
- approvals
- client communications
- notifications
- sales / onboarding signal capture

### Preferred path
1. Gmail API
2. MCP wrapper if a good one exists or we build one
3. n8n for triggers, labels, forwarding, notifications
4. browser only for auth/setup edge cases

### Good automations
- unread important inbox triage
- lead email classification
- send-draft / approval workflow
- notification to Telegram when high-priority email arrives
- onboarding mail ingestion into CRM / Supabase

### Guardrails
- outbound email should require approval unless explicitly authorized
- never expose mailbox globally to all agents by default
- Ryan/Henry access patterns should be separated from other lanes

### Best long-term shape
- Gmail API as core
- n8n for trigger/workflow layer
- custom MCP for agent-safe actions like:
  - list important unread
  - summarize thread
  - draft reply
  - send approved reply

---

## 2) Calendar

### Why it matters
- sales scheduling
- onboarding scheduling
- reminders
- founder time protection
- event-driven automation

### Preferred path
1. Google Calendar API
2. MCP wrapper if useful
3. n8n for reminders, sync, event-based workflows
4. browser only for setup/debug

### Good automations
- upcoming events summary
- meeting reminders in Telegram
- auto-create onboarding events from form/payment actions
- scheduling follow-up tasks after calls

### Guardrails
- no silent calendar edits for founder-critical events
- event creation is lower risk than event deletion
- keep timezone handling explicit

### Best long-term shape
- Calendar API or MCP for direct actions
- n8n for reminders and cross-app workflows

---

## 3) Drive

### Why it matters
- asset storage
- client folders
- shared docs
- generated deliverables
- long-term file organization

### Preferred path
1. Drive API
2. MCP if available / useful
3. n8n for folder/file workflows
4. browser for setup/permissions

### Good automations
- create client folder from onboarding
- upload generated artifacts
- place reports/decks in standard folder structures
- archive completed deliverables
- sync selected outputs from local workspace to Drive

### Guardrails
- enforce folder naming conventions
- avoid broad delete/move powers by default
- shared-drive permissions need explicit review

### Best long-term shape
- Drive API for file operations
- n8n for routing assets into client folders
- possible MCP toolset for agent-safe upload/list/search actions

---

## 4) Docs

### Why it matters
- proposals
- SOPs
- client docs
- shared internal docs
- report generation

### Preferred path
1. Docs API
2. Drive API for file orchestration around docs
3. n8n for template-based generation
4. browser for formatting edge cases

### Good automations
- generate proposal docs from templates
- create onboarding docs from client intake
- generate internal meeting notes or runbooks
- export/share finalized docs

### Guardrails
- template discipline matters
- rich formatting may still require manual/browser cleanup
- avoid giving every agent broad write access to all docs

### Best long-term shape
- template-driven doc generation
- Drive + Docs API combo
- n8n for workflow triggers

---

## 5) Sheets

### Why it matters
- lightweight ops tables
- lead review sheets
- reporting
- content calendars
- quick shared structured data without app build overhead

### Preferred path
1. Sheets API
2. MCP if it provides useful abstractions
3. n8n for sync/report workflows
4. browser for setup or edge formatting

### Good automations
- push lead lists to Sheets
- append sales activity logs
- create reporting tabs
- maintain content calendars
- export selected operational views for humans

### Guardrails
- Sheets can become shadow-database chaos fast
- do not let critical backend truth live only in Sheets
- use it for ops visibility, not as the core system of record

### Best long-term shape
- Sheets for lightweight ops/reporting
- Supabase remains source of truth for product/backend data

---

## 6) Google AI Studio

### Why it matters
- model access
- experimentation
- prompts/testing
- possible Gemini workflows

### Preferred path
1. API where appropriate
2. local service wrappers / MCP if we decide it is worth agent exposure
3. browser for setup and experimentation only

### Good uses
- quick Gemini testing
- generation experiments
- prompt evaluation
- internal research/content workflows

### Guardrails
- do not expose multiple overlapping model paths to all agents without need
- control cost, quotas, and data handling
- keep AI Studio separate from production workflow truth unless intentionally promoted

### Best long-term shape
- limited targeted access for the right lanes
- likely Arjun/Tyler/Andrew more than everyone else

---

## 7) Other Google free / AI surfaces

### Current rule
Only connect a Google service if all 3 are true:
1. it is real and verified
2. it has a clear business use case
3. it beats the alternatives in leverage

### Notes on uncertain names
The following names were mentioned conversationally and should be verified before action:
- Pompli
- Whisk
- Flow

Do not assume:
- product identity
- auth method
- API availability
- whether the service is still live/relevant

When ready, create a short verification table:
- exact product name
- URL
- what it does
- API or no API
- use case for ClawOps
- worth connecting? yes/no

---

## Recommended execution architecture

## Layer 1 — Auth and base access
Set up and verify:
- correct Google account / Workspace identity
- app passwords / OAuth / service account strategy where applicable
- least-privilege scopes
- local secrets storage in `.secrets/`
- clear account ownership and lane ownership

## Layer 2 — Core integrations
Implement first:
- Gmail
- Calendar
- Drive
- Docs
- Sheets

## Layer 3 — Workflow layer
Use n8n for:
- triggers
- schedules
- routing
- notifications
- cross-app workflows

Examples:
- Gmail label → Telegram alert
- payment event → create Drive folder + Doc + Calendar task
- onboarding form → Sheet log + Drive folder + Doc template + Gmail draft

## Layer 4 — Agent interface layer
Expose high-value operations through MCP or clean internal tools.

Examples:
- Gmail: list important unread, draft reply, send approved reply
- Calendar: list next events, create event, move event with approval
- Drive: create folder, upload file, get share link
- Docs: create proposal from template
- Sheets: append row, fetch report slice

This avoids forcing every agent to deal with raw Google app complexity directly.

---

## Fallback model for Google services

### Example
If Gmail API setup is blocked:
- try MCP if available
- if workflow-based action is enough, use n8n
- if neither works, use browser for auth/setup or one-off execution
- if repetitive UI-only pattern remains, consider CLI-Anything

### Rule
Browser is a bridge, not the long-term system design.

---

## Lane ownership suggestion

### Henry
- Gmail overview
- Calendar overview
- final approvals
- cross-system coordination

### Ryan
- sales inbox slices
- meeting scheduling support
- follow-up workflows

### Dave
- backend wiring
- secrets handling
- n8n integration
- API reliability

### Andrew (`dev`)
- architecture boundaries
- MCP/tool interface design
- system-level integration strategy

### Arjun / Tyler
- optional use of Docs/Drive/AI Studio for research/content workflows

---

## What to connect first

## Recommended first build sequence

### Step 1
Verify the exact Google account context we want as primary.
Questions to settle:
- personal Gmail vs Google Workspace org account
- whether `clawops.studio@gmail.com` is the operational root
- which services are already signed in and usable

### Step 2
Connect Gmail + Calendar first.
These have the fastest operational ROI.

### Step 3
Connect Drive + Docs + Sheets.
These become the artifact and working-memory layer.

### Step 4
Design 2-3 n8n workflows.
Recommended starters:
1. important email → Telegram alert
2. onboarding event → Drive folder + Doc + Calendar item
3. sales/update report → Sheet + Telegram summary

### Step 5
Wrap the highest-value actions in MCP/internal tools.
Do not expose the whole Google universe raw.

---

## What to avoid

- connecting every Google surface at once
- giving every lane broad Gmail/Drive write access
- using Sheets as the source of truth for backend-critical data
- relying on browser automation for core production workflows when API/MCP/n8n can do the job
- blindly trusting old sessions/cookies as durable integration

---

## Definition of done for this integration block

### Planning done when:
- service priority is frozen
- exact target Google account is confirmed
- auth strategy is chosen
- execution path is selected per service

### Execution done when:
- Gmail connected and tested
- Calendar connected and tested
- Drive connected and tested
- Docs connected and tested
- Sheets connected and tested
- 2-3 real workflows running through n8n and/or MCP
- docs updated with verified runtime truth

---

## Immediate next action

Run a verification pass for the Google account/runtime and create a simple matrix:
- service
- current access state
- preferred path
- fallback path
- owner
- blocker
- next action

That matrix should drive execution instead of vague “connect Google” work.
