# ClawOps Studio — Execution Spec for Dev + Dave (V1)

**Last Updated:** 2026-04-01  
**Status:** Active draft  
**Purpose:** Convert the current architecture/planning stack into one practical build order for Andrew (`dev`) and Dave so implementation starts from a single sequence instead of doc sprawl.

---

## 1. Why this exists

ClawOps now has the right strategic docs, but the next risk is obvious:
- too many planning documents
- unclear implementation order
- blurred ownership between architecture and backend/devops
- reopening optional threads before the core product path is built

This document compresses the current source-of-truth into one execution plan for the next build phase.

It is derived from:
- `docs/ARCHITECTURE-FREEZE-V1.md`
- `docs/DEPLOYMENT-BLUEPRINT-SCHEMA-V1.md`
- `docs/MISSION-CONTROL-CHAT-BRIDGE.md`
- `docs/CONTABO-PROVISIONING-FLOW.md`
- `docs/CLIENT-JOURNEY-AND-DEPLOYMENT-FLOW.md`
- `docs/DEFAULT-USER-OFFERING-MATRIX.md`
- `docs/SYSTEM-OVERVIEW.md`

---

## 2. Core build goal

Build the first real product path that goes from:

1. customer account + plan
2. onboarding capture
3. deployment blueprint
4. deployment record + staged provisioning
5. Mission Control activation
6. backend-mediated runtime chat
7. guided setup queue
8. later channel/integration expansion

This is the minimum viable ClawOps product loop.

---

## 3. What is already decided

The following are now frozen enough to build against:

- **Mission Control is the first operational surface**
- **Backend + DB are canonical for product/deployment state**
- **OpenClaw is the execution runtime**
- **Mission Control chat is backend-mediated**
- **SSE is the right V1 live transport**
- **Dedicated Contabo VPS per serious client is the standard deployment model**
- **Tailscale is part of the secure access baseline**
- **Blueprint drives deployment**
- **Optional channels and app integrations must not block first activation**
- **Approvals, setup tasks, and notifications are typed records, not just chat text**

Relevant memory alignment:
- runtime hardening and source-of-truth discipline became explicit priorities, and Contabo API automation remains an open medium-term task rather than something that should be hand-waved as done. Source: `MEMORY.md#L259-L297`
- Pulkit’s durable operating rule is to execute and delegate by default, only interrupting for human-required logins, destructive/high-risk actions, billing, security lockout risk, or founder-only decisions. Source: `MEMORY.md#L315-L327`

---

## 4. Ownership split

## 4.1 Andrew (`dev`) owns

Andrew owns the **product/system architecture boundary layer**:
- backend service boundaries
- DB entity model
- Mission Control bridge contract
- event taxonomy
- deployment state machine
- blueprint-to-runtime mapping model
- product-safe abstractions over OpenClaw internals
- approval/setup/notification object model

Andrew is responsible for making sure the system does not turn into spaghetti.

## 4.2 Dave owns

Dave owns the **backend + reliability + environment implementation path**:
- backend project baseline
- DB migrations/schema implementation
- worker/job execution baseline
- deployment pipeline scaffolding
- runtime bridge service implementation
- health checks / service supervision / operability
- provisioning script structure
- environment hardening around the backend/runtime stack

Dave is responsible for making the architecture executable and durable.

## 4.3 Shared ownership

Andrew + Dave jointly own:
- deployment state machine correctness
- blueprint contract stability
- backend ↔ runtime bridge design
- activation-ready checks
- failure and retry semantics for deployment jobs
- what is product state vs runtime state

## 4.4 Henry owns

Henry owns:
- sequencing
- done criteria
- priority discipline
- preventing optional-thread drift
- deciding when a spec is good enough to build

---

## 5. What NOT to work on first

Do **not** let the team drift into these before the core loop is built:
- broad Vercel work
- DeerFlow recovery/validation
- Paperclip revival
- public marketplace/catalog implementation
- deep Telegram polish beyond what already works
- advanced browser harness expansion beyond the already-proven Whisk/NotebookLM value path
- optional channel expansion before Mission Control chat exists properly

Those are not the bottleneck now.

---

## 6. Phase order

This is the intended execution order.

## Phase 1 — Product data model freeze

### Goal
Freeze the product/state objects so frontend, backend, and runtime work from one schema language.

### Deliverables
Andrew leads, Dave supports:
- canonical entity list
- lifecycle/state machine definitions
- required identifiers and relations
- approval/setup/notification schemas
- deployment/job schemas
- channel linking model

### Must define now
At minimum:
- `account`
- `user`
- `subscription`
- `onboarding_submission`
- `deployment_blueprint`
- `deployment`
- `deployment_job`
- `mission_control_session`
- `conversation_thread`
- `message`
- `runtime_turn`
- `approval_request`
- `setup_task`
- `notification_event`
- `channel_connection`
- `integration_connection`

### Done when
- entity list exists in one doc/table form
- each entity has owner/system-of-record clarity
- lifecycle states are named
- obvious contradictions are removed

---

## Phase 2 — Backend baseline + schema implementation

### Goal
Stand up the real internal product backend and DB shape.

### Deliverables
Dave leads, Andrew reviews:
- backend project structure
- database schema/migrations
- environment config layout
- internal auth/admin baseline
- first CRUD/API surfaces for deployments, blueprints, setup tasks, approvals, notifications
- seed/test fixture path for one sample deployment

### Required outputs
- DB migration set
- backend env example/spec
- initial REST endpoints
- one test blueprint persisted in DB
- one deployment record that references it

### Done when
- backend can create/read a blueprint-backed deployment
- Mission Control placeholder APIs can read real DB state
- no core product object still lives only in markdown imagination

---

## Phase 3 — Deployment state machine + job orchestration

### Goal
Make deployments first-class staged jobs instead of informal sequences.

### Deliverables
Andrew + Dave:
- deployment lifecycle implementation
- job runner or queue baseline
- checkpoint model
- failure state handling
- activation gating logic

### Required job stages
At minimum:
- `validated`
- `provisioning`
- `bootstrap`
- `hardening`
- `tailscale_setup`
- `runtime_install`
- `packs_install`
- `mission_control_enable`
- `activation_checks`
- `active`
- `failed`

### Done when
- backend can advance a deployment through staged status
- failures stop at a clear checkpoint
- state is queryable by UI and operators

---

## Phase 4 — Mission Control backend shell

### Goal
Make Mission Control a real product surface backed by DB state before live chat is added.

### Deliverables
Andrew defines contract, Dave implements:
- session/status APIs
- setup task APIs
- approval APIs
- notification feed APIs
- deployment status summary APIs

### UI contract assumed
Mission Control should eventually render:
- chat pane
- recommended actions pane
- approvals pane
- status pane
- activity/notifications pane

### Done when
- a deployment can load a Mission Control page from backend state alone
- setup tasks and approvals are visible without relying on runtime chat text

---

## Phase 5 — Runtime bridge V1

### Goal
Connect Mission Control chat to OpenClaw without making frontend talk to OpenClaw directly.

### Deliverables
Andrew defines adapter/event contract, Dave implements worker/service:
- backend message ingest endpoint
- runtime turn creation
- runtime bridge worker
- normalized event stream
- SSE updates back to UI
- error/timeout handling

### Normalized runtime events
At minimum:
- `turn.created`
- `turn.started`
- `message.delta`
- `message.completed`
- `approval.requested`
- `setup_task.created`
- `setup_task.updated`
- `notification.created`
- `turn.completed`
- `turn.failed`

### Done when
- a user message in Mission Control creates a runtime turn
- OpenClaw reply streams back through SSE
- bridge can persist both chat output and typed side-effects

---

## Phase 6 — Approval and setup-task execution model

### Goal
Make the system useful for real customer setup and sensitive actions.

### Deliverables
Andrew leads product behavior, Dave implements storage/actions:
- approval persistence and action endpoints
- setup-task action handlers
- blocked-state handling
- resolution-triggered runtime follow-up turns

### Must support early
- connect Gmail next
- connect Calendar next
- install/use Tailscale
- open server Chrome for browser-backed setup
- browser-session-guided tasks like NotebookLM
- approval-gated external write patterns

### Done when
- approvals are not trapped in transcript text
- setup blockers are first-class UI state
- customer can resolve next steps from Mission Control

---

## Phase 7 — Contabo provisioning integration baseline

### Goal
Turn provisioning from a doc into an executable pipeline, even if partially operator-assisted at first.

### Deliverables
Dave leads, Andrew reviews abstraction boundaries:
- blueprint → provisioning job translator
- Contabo config mapping table
- instance profile mapping
- bootstrap script baseline
- hardening script baseline
- Tailscale enrollment step
- deployment metadata backfill into DB

### Honest scope for V1
Allowed in V1:
- operator-assisted trigger path
- partially manual Contabo create step if API details are not yet finalized
- scripted bootstrap after server creation

Not allowed:
- pretending full one-click provisioning exists if it does not

### Done when
- one test deployment can be driven from blueprint to a reachable activation-ready environment with documented/manual seams where necessary

---

## Phase 8 — Activation-ready experience

### Goal
Make the first customer experience coherent.

### Deliverables
Andrew + Dave:
- activation welcome flow
- recommended actions materialized from blueprint + status
- default assistant/team shown correctly
- clear blocked/unblocked states
- guided next-step cards

### Done when
- new deployment lands in Mission Control
- default assistant responds
- customer sees what is live, what is next, and what needs action
- Telegram/WhatsApp/etc are clearly optional next steps, not activation blockers

---

## 7. First implementation slice

If the team only builds one small but real slice next, build this:

### Slice A — "Activation-ready single deployment"

**User story:**
A paid customer with a completed onboarding profile gets a blueprint-backed deployment record, a staged deployment job, a backend-backed Mission Control session, and one working runtime chat thread with setup tasks.

### Minimum capabilities
- store one blueprint in DB
- create one deployment from it
- expose deployment status API
- expose Mission Control session/thread/messages API
- send one message from Mission Control to OpenClaw through bridge
- stream reply back with SSE
- show at least 3 seeded setup tasks
- show at least 1 seeded approval example

### Why this slice first
Because it proves the core product shape without waiting for every integration and channel.

---

## 8. Canonical entity ownership table

| Entity | Canonical owner | Why |
|---|---|---|
| account | backend/DB | business truth |
| user | backend/DB | auth and access |
| subscription | backend/DB | billing truth |
| onboarding_submission | backend/DB | intake truth |
| deployment_blueprint | backend/DB | deployment contract |
| deployment | backend/DB | product deployment state |
| deployment_job | backend/DB | async orchestration record |
| mission_control_session | backend/DB | product surface state |
| conversation_thread | backend/DB | surface/thread identity |
| message | backend/DB + runtime bridge | persisted UI transcript |
| runtime_turn | backend/DB + runtime bridge | execution tracking |
| approval_request | backend/DB | sensitive-action control |
| setup_task | backend/DB | guided setup state |
| notification_event | backend/DB | system-visible state changes |
| channel_connection | backend/DB | linked channel state |
| integration_connection | backend/DB | app/integration state |
| agent execution internals | OpenClaw | runtime concern |
| tool execution internals | OpenClaw | runtime concern |

---

## 9. API priority list

Build these before nice-to-have endpoints.

### Tier 1
- `POST /deployments`
- `GET /deployments/:id`
- `GET /deployments/:id/status`
- `GET /mission-control/session/:deploymentId`
- `GET /mission-control/threads/:threadId/messages`
- `POST /mission-control/threads/:threadId/messages`
- `GET /mission-control/threads/:threadId/stream`

### Tier 2
- `GET /mission-control/setup-tasks?deployment_id=...`
- `POST /mission-control/setup-tasks/:id/action`
- `GET /mission-control/approvals?deployment_id=...`
- `POST /mission-control/approvals/:id/approve`
- `POST /mission-control/approvals/:id/deny`
- `GET /mission-control/notifications?deployment_id=...`

### Tier 3
- provisioning job APIs
- channel connection APIs
- integration connection APIs
- admin/operator retry APIs

---

## 10. Data/event contract priority

Before broad implementation, freeze these contracts:

### 10.1 Deployment status enum
Need one source of truth for:
- `draft`
- `recommended`
- `approved`
- `provisioning`
- `runtime_installing`
- `activation_ready`
- `active`
- `needs_revision`
- `failed`
- `archived`

### 10.2 Runtime turn status enum
Need one source of truth for:
- `queued`
- `running`
- `waiting_approval`
- `completed`
- `failed`
- `cancelled`

### 10.3 Setup task status enum
Need one source of truth for:
- `suggested`
- `ready`
- `blocked`
- `in_progress`
- `completed`
- `dismissed`

### 10.4 Approval status enum
Need one source of truth for:
- `pending`
- `approved`
- `denied`
- `expired`
- `superseded`

### 10.5 Event taxonomy
Need one normalized event set across runtime and backend:
- `turn.created`
- `turn.started`
- `message.delta`
- `message.completed`
- `approval.requested`
- `approval.updated`
- `setup_task.created`
- `setup_task.updated`
- `notification.created`
- `deployment.updated`
- `integration.updated`
- `channel.updated`
- `runtime.health_changed`

---

## 11. Hard boundaries to respect while building

## 11.1 Frontend must not talk directly to OpenClaw
Always route through backend + bridge.

## 11.2 OpenClaw must not become billing/subscription truth
Runtime is execution, not commercial state.

## 11.3 n8n must not become the primary DB
Use it for orchestration, not core truth.

## 11.4 Optional integrations must not define the activation model
Gmail/Telegram/NotebookLM are valuable, but the product must work before all of them are connected.

## 11.5 Browser/session-backed tools stay explicit
If a flow needs Tailscale, server Chrome, or session reuse, present it as guided setup state, not hidden magic.

---

## 12. Practical backlog for the next 5 work items

### Item 1 — Entity + schema freeze doc
Output:
- one canonical schema/entities document or migration plan

Owner:
- Andrew lead
- Dave support

### Item 2 — Backend skeleton + migrations
Output:
- working backend repo structure
- DB schema migrated
- env layout

Owner:
- Dave lead

### Item 3 — Mission Control state APIs
Output:
- session/status/setup/approval/notification endpoints

Owner:
- Dave lead
- Andrew review

### Item 4 — Runtime bridge prototype
Output:
- one thread, one turn, one SSE stream, one OpenClaw reply

Owner:
- Andrew contract
- Dave implementation

### Item 5 — Deployment job runner skeleton
Output:
- staged deployment record and checkpoint execution path

Owner:
- Dave lead

---

## 13. What success looks like in the next milestone

The next meaningful milestone is **not** “more docs.”
It is this:

> A blueprint-backed deployment exists in the DB, Mission Control loads real status/setup state from the backend, and one chat message can go through the runtime bridge to OpenClaw and stream back safely.

If that works, ClawOps has crossed from planning into product.

---

## 14. Summary

This is the build order:

1. freeze entities and lifecycle
2. implement backend + DB baseline
3. implement deployment/job state machine
4. implement Mission Control state shell
5. implement runtime bridge with SSE
6. implement approvals and setup tasks as typed objects
7. implement Contabo provisioning baseline
8. polish activation-ready product experience

Andrew keeps the architecture clean.
Dave makes it real and reliable.
Henry keeps sequencing honest.

That is the shortest path from planning to a real ClawOps product loop.
