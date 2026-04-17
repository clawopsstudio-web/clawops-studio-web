# ClawOps Studio — Mission Control Chat Bridge

**Last Updated:** 2026-04-01  
**Status:** Draft v1  
**Purpose:** Define how Mission Control chat should bridge the frontend/dashboard experience to backend business state, deployed OpenClaw runtime, approvals, setup flows, notifications, and later channel expansion.

---

## 1. Why this document exists

The architecture freeze explicitly left one major piece unresolved:

> the exact OpenClaw ↔ backend bridge mechanism for dashboard chat

That gap matters because Mission Control is supposed to be:
- the first operational surface after deployment
- the first place the customer talks to their assistant/team
- the place where setup blockers, approvals, and recommendations appear
- the control plane that later expands into Telegram, WhatsApp, Discord, and Slack

Without a clear bridge model, Mission Control risks becoming one of two bad things:
- a thin chat UI with no real link to deployment state
- a runtime-only surface that bypasses backend truth and product controls

This document defines the practical middle path.

---

## 2. Core design outcome

Mission Control chat should work as a **product-controlled runtime surface**.

That means:
- **frontend** owns the customer experience
- **backend + DB** own durable business state and UI-readable setup state
- **OpenClaw** owns actual conversational execution and tool usage
- **automation/workers** handle long-running setup, notifications, and retries
- **Mission Control chat** is the bridge where those layers meet in one usable interface

Put simply:
- the customer talks in Mission Control
- the backend records what that means in product terms
- OpenClaw executes the AI work
- backend reflects the resulting state back into UI cards, approvals, tasks, and notifications

Mission Control is **not** just a transcript window.
It is a structured control surface backed by real state.

---

## 3. Non-negotiable rules carried forward from the other docs

## 3.1 Mission Control comes first
Every deployment must become usable in Mission Control before Telegram, WhatsApp, Discord, or Slack are connected.

## 3.2 Backend/DB remain the durable source of truth for product state
Chat history alone cannot be the system of record for:
- deployment readiness
- onboarding completion
- integration connection status
- approval status
- subscription state
- channel configuration

## 3.3 OpenClaw remains the execution runtime
OpenClaw should own:
- assistant/team behavior
- tool use
- runtime approvals in context
- channel execution
- skill invocation
- local task execution

But it should not become the source of truth for product lifecycle state.

## 3.4 External channels are extensions, not prerequisites
Telegram, WhatsApp, Discord, and Slack are later operating surfaces.
Mission Control is the universal base surface.

## 3.5 Setup must stay guided and practical
The customer should not have to understand:
- runtime internals
- API vs MCP vs n8n vs browser automation
- why one integration needs Tailscale or Chrome session reuse

Mission Control should present guided actions, not infrastructure lectures.

---

## 4. Current baseline vs target state

## 4.1 Current baseline
Today, the local Mission Control implementation is:
- read-only
- file-backed
- polling `/api/state`
- showing task/system/agent visibility
- useful as an HQ board, but not yet a product chat bridge

Current real implementation facts:
- service runs locally on port `8082`
- Tailscale serves it under `/dashboard/`
- source-of-truth inputs are currently files like `TASKS.md`, `docs/SYSTEM-OVERVIEW.md`, and `~/.openclaw/openclaw.json`
- there is no customer-facing runtime chat bridge yet

## 4.2 Target state
Mission Control should evolve into a stateful product surface with five connected panels:
1. **Chat thread** — talk to HQ/default assistant/team lead
2. **Recommended actions** — guided setup and next steps
3. **Approvals** — explicit decisions needed before sensitive actions
4. **System status** — deployment, integrations, channels, brain, runtime health
5. **Activity/notifications** — what changed, what succeeded, what is blocked

The backend should supply these surfaces from structured records, not by scraping chat text.

---

## 5. Source-of-truth split

This split is the most important implementation rule.

| Layer | Owns | Must not own |
|---|---|---|
| Frontend / Mission Control UI | rendering, input UX, action cards, approval buttons, setup flows, status views | business truth, runtime internals |
| Backend API | lifecycle state, deployment state, setup queue, integration metadata, approval records, notification records, audit events | direct reasoning loop |
| Database | durable source of truth for product/deployment state | ephemeral runtime execution |
| OpenClaw runtime | assistant execution, tools, skills, channel routing, in-context approvals, runtime memory | subscription/account source of truth |
| Automation / workers | async installs, retries, provisioning steps, notification fanout, post-deploy jobs | primary business truth |

### Key principle
**One customer action in chat can produce both runtime output and structured state updates.**

Example:
- customer says: “Connect Gmail next”
- runtime replies conversationally
- backend also creates/updates:
  - integration setup task
  - approval requirement if needed
  - notification trail
  - audit event

That is the bridge.

---

## 6. Product objects the bridge must support

Mission Control chat should not rely on one giant unstructured transcript. It needs typed objects behind the UI.

## 6.1 `mission_control_session`
Represents the customer’s Mission Control workspace session.

Suggested fields:
- `id`
- `account_id`
- `deployment_id`
- `blueprint_id`
- `primary_agent_key` (usually `hq`)
- `status` (`pending_activation`, `active`, `degraded`, `paused`)
- `created_at`
- `last_active_at`

## 6.2 `conversation_thread`
Represents a specific thread/surface.

Suggested fields:
- `id`
- `deployment_id`
- `surface` (`mission_control`, `telegram`, `whatsapp`, `discord`, `slack`)
- `channel_ref` (external chat/thread metadata when relevant)
- `agent_scope` (`hq`, `sales`, `content`, etc.)
- `status`

### Rule
Mission Control gets its own thread by default.
External channels get separate linked threads later.

## 6.3 `message`
Represents a user, assistant, or system message.

Suggested fields:
- `id`
- `thread_id`
- `role` (`user`, `assistant`, `system`)
- `message_type` (`chat`, `status`, `approval_prompt`, `setup_prompt`, `notification`)
- `content_markdown`
- `structured_payload` (optional JSON for cards, actions, metadata)
- `runtime_turn_id` (nullable)
- `created_at`

## 6.4 `runtime_turn`
Tracks one backend-requested OpenClaw execution.

Suggested fields:
- `id`
- `thread_id`
- `trigger_source` (`user_message`, `system_event`, `approval_resolution`, `setup_action`)
- `requested_agent_key`
- `status` (`queued`, `running`, `waiting_approval`, `completed`, `failed`, `cancelled`)
- `started_at`
- `completed_at`
- `error_code`
- `error_message`

## 6.5 `approval_request`
Tracks a discrete decision that must be surfaced in Mission Control.

Suggested fields:
- `id`
- `deployment_id`
- `thread_id`
- `scope` (`outbound_message`, `external_write`, `channel_connect`, `browser_session_reuse`, `billing_or_plan`, `admin_action`)
- `title`
- `description`
- `risk_level` (`low`, `medium`, `high`)
- `requested_by_agent`
- `status` (`pending`, `approved`, `denied`, `expired`, `superseded`)
- `expires_at`
- `resolution_actor`
- `resolution_note`

## 6.6 `setup_task`
Represents recommended or required setup work.

Suggested fields:
- `id`
- `deployment_id`
- `category` (`brain`, `integration`, `channel`, `access`, `browser_tool`, `verification`)
- `key` (`connect_gmail`, `install_tailscale`, `open_server_chrome`, `connect_telegram`)
- `priority`
- `status` (`suggested`, `ready`, `blocked`, `in_progress`, `completed`, `dismissed`)
- `blocking`
- `recommended_method`
- `fallback_method`
- `requires_customer_action`
- `requires_approval`
- `ui_action_payload`

## 6.7 `notification_event`
Represents system-visible events that should show in Mission Control and optionally fan out elsewhere.

Suggested fields:
- `id`
- `deployment_id`
- `type`
- `severity` (`info`, `warning`, `critical`)
- `title`
- `body`
- `action_url`
- `delivery_targets` (`mission_control`, `telegram`, `email`, etc.)
- `read_state`
- `created_at`

## 6.8 `channel_connection`
Tracks external messaging expansion.

Suggested fields:
- `id`
- `deployment_id`
- `channel` (`telegram`, `whatsapp`, `discord`, `slack`)
- `status` (`not_started`, `pending_auth`, `pending_verification`, `active`, `error`, `disabled`)
- `connected_identity`
- `linked_thread_id`
- `last_health_at`

---

## 7. The bridge architecture

The cleanest V1 model is:

```text
Mission Control UI
  ↓
Backend API
  ↓
Runtime Bridge Worker / Adapter
  ↓
OpenClaw Runtime
  ↓
Runtime Events back to Backend
  ↓
DB + Event Stream
  ↓
Mission Control UI
```

### Why this is the right shape
It preserves the frozen boundaries:
- frontend does not talk directly to OpenClaw
- backend remains the product-control layer
- runtime-specific semantics are isolated behind a bridge adapter
- chat output can coexist with durable business state updates

---

## 8. Recommended V1 transport model

Use:
- **HTTP POST** for customer input and button actions
- **SSE (Server-Sent Events)** for live streaming updates back into Mission Control
- **async worker queue** between backend and runtime bridge

### Why SSE first
SSE is enough for V1 because Mission Control mainly needs:
- streaming assistant responses
- status changes
- approval cards appearing live
- setup task updates
- deployment/integration notifications

It is simpler than going straight to a custom WebSocket layer.
WebSockets can be added later if voice, co-browsing, or richer low-latency collaboration becomes necessary.

---

## 9. End-to-end flows the bridge must support

## 9.1 Activation flow

### Goal
When deployment reaches `activation_ready`, Mission Control should become instantly useful.

### Flow
1. backend marks deployment `activation_ready`
2. backend creates default `mission_control_session`
3. backend creates default `conversation_thread` for `mission_control`
4. backend materializes initial `setup_task` records from blueprint + onboarding status
5. backend emits first system notification: “Your workspace is ready”
6. backend triggers one system-initiated runtime turn
7. OpenClaw sends a welcome message from HQ/default assistant
8. Mission Control shows:
   - welcome chat
   - what was deployed
   - assistant/team shape
   - recommended next steps
   - any blockers or approvals

### Important rule
Activation must not wait on Telegram, WhatsApp, Discord, or Slack.

---

## 9.2 Customer sends a chat message

### Example
“Connect Gmail and Calendar next.”

### Flow
1. frontend POSTs message to backend
2. backend stores the `message`
3. backend creates `runtime_turn(status=queued)`
4. backend publishes runtime job to bridge worker
5. bridge worker invokes the correct OpenClaw agent/session
6. runtime emits streaming events:
   - `turn.started`
   - `message.delta`
   - `message.completed`
   - `approval.requested` (if needed)
   - `setup_task.created` or `setup_task.updated`
   - `notification.created` (if relevant)
   - `turn.completed`
7. backend persists normalized records
8. frontend receives SSE updates and renders:
   - streaming assistant reply
   - action cards for Gmail/Calendar setup
   - any approval prompts

### Important rule
The assistant’s reply and the setup queue update should come from the same underlying turn, but be stored as separate structured records.

---

## 9.3 Approval-required action

### Example cases
- send outbound CRM message
- send email draft externally
- reuse browser session for a guided web tool
- enable a channel that requires auth/identity linking
- perform meaningful external write

### Flow
1. runtime determines approval is required
2. bridge worker emits `approval.requested`
3. backend stores `approval_request(status=pending)`
4. frontend renders approval card in both:
   - chat timeline
   - dedicated approvals panel
5. customer chooses approve or deny
6. frontend POSTs resolution to backend
7. backend stores resolution and creates follow-up runtime turn if needed
8. runtime either proceeds or stops
9. final result is shown in chat and activity feed

### Rule
Approvals must be resolvable outside the transcript.
A customer should not need to scroll up in chat to find critical pending approvals.

---

## 9.4 Guided setup flow

### Example
“Set up NotebookLM” or “How do I access server Chrome?”

### Flow
1. backend already has a `setup_task` or creates one from the request
2. runtime explains the setup path in plain language
3. backend shows a structured action card with:
   - why this tool is recommended
   - recommended method
   - fallback method
   - customer action needed
   - secure access guidance
4. if browser-backed, show a Tailscale/private access flow first
5. if server Chrome is needed, show an action to open the private `/chrome/` route
6. when customer completes the step, backend marks task accordingly
7. optional verification job runs and updates state

### Rule
Browser-backed flows should be framed as guided setup, not hidden magic.

---

## 9.5 Notification flow

### Example events
- deployment moved to `active`
- Gmail connection failed
- Telegram channel verified
- approval is expiring soon
- model provider key is invalid
- browser session expired for NotebookLM

### Flow
1. backend or worker emits normalized `notification_event`
2. event always appears in Mission Control activity feed
3. if policy allows, event may also fan out to enabled channels
4. event links back to the exact setup task / approval / thread that needs action

### Rule
Mission Control is the canonical place to resolve system-state issues even if alerts are echoed elsewhere.

---

## 10. Frontend UX contract

Mission Control needs explicit UI regions, not just one chat column.

## 10.1 Required panes

### A. Chat pane
Shows:
- normal conversation
- system welcome
- assistant guidance
- inline approval prompts
- inline setup prompts
- streaming output

### B. Recommended actions pane
Shows the active `setup_task` queue.

Examples:
- Choose brain mode
- Connect Gmail
- Connect Calendar
- Install Tailscale on laptop
- Install Tailscale on phone
- Open server Chrome for NotebookLM login
- Connect Telegram

### C. Approvals pane
Shows all pending approvals with clear severity and expiry.

### D. Status pane
Shows summarized backend truth:
- deployment stage
- active assistant/team shape
- starter vs BYO vs hybrid brain mode
- connected integrations
- connected channels
- runtime health
- last sync/verification times

### E. Activity / notifications pane
Shows recent state changes, warnings, and system events.

## 10.2 Action-card rule
Any task that requires a customer click, login, approval, or follow-through should produce a structured card.
Chat text alone is not enough.

## 10.3 No hidden state rule
If the system is blocked, the UI must show:
- what is blocked
- why it is blocked
- who needs to act
- what happens next after resolution

---

## 11. Backend API shape for V1

These are suggested API surfaces, not final routes.

## 11.1 Chat/session APIs
- `GET /api/mission-control/session/:deploymentId`
- `GET /api/mission-control/threads/:threadId`
- `GET /api/mission-control/threads/:threadId/messages`
- `POST /api/mission-control/threads/:threadId/messages`
- `GET /api/mission-control/threads/:threadId/stream` (SSE)

## 11.2 Setup/approval APIs
- `GET /api/mission-control/setup-tasks?deployment_id=...`
- `POST /api/mission-control/setup-tasks/:taskId/action`
- `GET /api/mission-control/approvals?deployment_id=...`
- `POST /api/mission-control/approvals/:approvalId/approve`
- `POST /api/mission-control/approvals/:approvalId/deny`

## 11.3 Status APIs
- `GET /api/mission-control/status/:deploymentId`
- `GET /api/mission-control/notifications?deployment_id=...`
- `GET /api/mission-control/channels?deployment_id=...`

## 11.4 Runtime bridge internal APIs/events
The frontend should never use these directly.
Examples:
- `enqueueRuntimeTurn(turnPayload)`
- `onRuntimeEvent(event)`
- `requestApproval(payload)`
- `completeTurn(payload)`

---

## 12. Runtime bridge worker responsibilities

The runtime bridge worker is the key adapter between backend and OpenClaw.

It should:
- receive normalized turn requests from backend
- map them to the right deployed OpenClaw workspace/session/agent
- stream runtime output back as normalized events
- translate runtime-native approval prompts into product approval objects
- translate runtime-discovered setup blockers into setup task updates
- hide OpenClaw-specific config/session details from the frontend
- attach correlation IDs for auditability

It should **not**:
- own subscription or billing logic
- invent product state on its own
- bypass backend persistence

### Practical implementation note
This worker is the correct place to isolate any unstable runtime details, including:
- session IDs
- agent routing semantics
- OpenClaw config differences by deployment
- channel-specific execution quirks

That keeps the product API stable even if runtime wiring evolves.

---

## 13. Event taxonomy for the bridge

A normalized event set will make the system much easier to build and debug.

Suggested event types:
- `turn.created`
- `turn.started`
- `turn.completed`
- `turn.failed`
- `message.created`
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

### Rule
The backend should store normalized events even if they originate from very different runtime/tool paths.
That creates one audit trail and one UI language.

---

## 14. Approval model in Mission Control

Approvals are a first-class part of the product, not an edge case.

## 14.1 What should require approval by default
- outbound messages to prospects/customers
- external email sends
- CRM writes with real business effect
- browser-session reuse for sensitive tools where appropriate
- plan/billing affecting actions
- admin/security sensitive actions

## 14.2 Approval UX requirements
Every approval card should show:
- what action will happen
- which assistant requested it
- why it is needed
- what system/tool it affects
- what happens if approved
- what happens if denied
- expiry/timeout if relevant

## 14.3 Approval persistence rule
Approval resolution must be stored durably in backend/DB and linked to the turn that requested it.

## 14.4 Chat behavior rule
The assistant can mention approvals conversationally, but the canonical pending/approved/denied state must live outside chat text.

---

## 15. Setup-flow model

Mission Control should feel like the assistant is actively helping the customer finish setup, not just waiting for commands.

## 15.1 Setup task sources
Setup tasks should be created from:
- deployment blueprint
- onboarding gaps
- integration recommendations
- access/security requirements
- runtime-discovered blockers
- health/verification failures

## 15.2 Core setup categories

### Brain setup
Examples:
- confirm starter brain
- add premium provider key
- switch to hybrid mode

### Access setup
Examples:
- install Tailscale on laptop
- install Tailscale on phone
- confirm private access works

### Integration setup
Examples:
- connect Gmail
- connect Calendar
- connect Notion
- connect GoHighLevel

### Browser-backed tool setup
Examples:
- open server Chrome
- log into Google for NotebookLM
- verify session capture/reuse works

### Channel setup
Examples:
- connect Telegram
- connect WhatsApp
- connect Discord
- connect Slack

## 15.3 Tailscale rule
Tailscale remains infrastructure, but Mission Control must present it as guided product access.
The UI should explain:
- why private access is required
- where to click
- what device to install it on
- how to confirm completion

## 15.4 Browser route rule
If a browser-backed setup path is needed, Mission Control should surface the private browser route as a guided action, not bury it in operator notes.
Current route expectation:
- dashboard: `/dashboard/`
- server Chrome/noVNC path: `/chrome/`

---

## 16. Notifications and summaries

Mission Control needs a clear notification model so it can also become the control plane for external channel activity.

## 16.1 Notification classes

### Informational
- deployment finished
- channel connected
- integration verified

### Warning
- auth expiring soon
- browser session stale
- setup task blocked
- health check degraded

### Critical
- deployment failed
- runtime unavailable
- approval required for blocked business workflow
- connected channel broken

## 16.2 Delivery rule
Every important notification should land in Mission Control first.
Optional fanout can then go to:
- Telegram
- Slack
- email
- later other channels

## 16.3 Summary rule
External channels should receive summaries/alerts when useful, but the full management state should still be recoverable in Mission Control.

---

## 17. Channel-extension model

The biggest product risk here is turning channel expansion into state chaos.
The bridge should prevent that.

## 17.1 Core rule
Mission Control remains the default management surface.
External channels become additional execution surfaces.

## 17.2 Recommended model
Each enabled channel gets:
- its own `channel_connection`
- its own linked `conversation_thread`
- its own health state
- its own identity mapping

## 17.3 What should be shared across channels
Shared at deployment/account level:
- assistant/team shape
- brain mode
- approval policy
- integration state
- setup-task state
- deployment/system status

## 17.4 What should remain per-thread/per-channel
- transcript history
- platform-specific thread references
- delivery failures
- channel-specific routing context

## 17.5 Practical UX implication
Mission Control should eventually show:
- connected channels
- health of each channel
- latest activity by channel
- approvals/tasks triggered by channel activity
- ability to continue or resolve a channel-driven issue inside Mission Control

## 17.6 Do not do this
Do **not** merge all channel transcripts into one giant unreadable universal transcript by default.
Linked threads with shared higher-level state is cleaner and safer.

---

## 18. Security and access implications

## 18.1 No direct frontend-to-runtime coupling
The frontend should never need runtime secrets or direct runtime transport.

## 18.2 Sensitive auth steps stay explicit
For OAuth, browser-session, or channel-auth steps, Mission Control should show:
- what the customer is doing
- which identity they are connecting
- whether the session may be reused later
- how to revoke or reconnect later

## 18.3 Private access posture
Where private surfaces are required, Mission Control should route the user toward Tailscale-backed access rather than pretending everything is public-safe.

## 18.4 Auditability
Every approval, integration change, channel connect, and runtime-triggered sensitive action should be auditable through backend records.

---

## 19. Failure modes the bridge must handle

## 19.1 Runtime unavailable
UI should show:
- chat unavailable/degraded
- last healthy time
- whether setup/status panels still work

## 19.2 Backend available but runtime delayed
UI should show queued/running states, not just spinner ambiguity.

## 19.3 Approval lost in transcript
Prevented by dedicated approval records + approval pane.

## 19.4 Setup drift
Prevented by deriving setup queue from structured records, not just assistant memory.

## 19.5 Channel drift
Prevented by separate `channel_connection` + per-channel health and linked threads.

## 19.6 Browser-session fragility
Treat as a managed, user-visible setup state:
- active
- expired
- re-login required
- verification pending

---

## 20. Recommended implementation sequence

## Phase 1 — Backend-backed Mission Control shell
Build the backend state model first.

Deliverables:
- deployment/session/thread/message tables
- setup task table
- approval table
- notifications table
- status API for Mission Control

## Phase 2 — One-thread Mission Control chat
Add Mission Control-only chat before channel expansion.

Deliverables:
- POST message
- SSE stream
- runtime bridge worker
- assistant reply rendering
- turn status handling

## Phase 3 — Setup and approvals as typed objects
Make Mission Control useful beyond chat.

Deliverables:
- action cards
- approval pane
- setup queue pane
- stateful task completion/verification

## Phase 4 — Notifications and health model
Add system event visibility.

Deliverables:
- notification feed
- deployment/integration/channel health cards
- warning/critical fanout policy

## Phase 5 — Channel extensions
Only after Mission Control is solid.

Deliverables:
- Telegram linked thread model
- WhatsApp/Discord/Slack linked thread model
- channel health state
- cross-surface resolution in Mission Control

## Phase 6 — Browser-backed guided flows
Formalize session-backed tools.

Deliverables:
- Tailscale guidance cards
- `/chrome/` action route cards
- browser-session status records
- NotebookLM-style setup verification flow

---

## 21. Decisions captured in this draft

1. **Mission Control chat should be backend-mediated, not frontend-direct to OpenClaw.**
2. **Backend/DB remain canonical for product state; chat transcript is not enough.**
3. **OpenClaw remains the execution runtime, isolated behind a runtime bridge worker.**
4. **SSE is the recommended V1 live-update transport; WebSockets can wait.**
5. **Approvals must exist as durable records with their own UI pane, not only chat messages.**
6. **Setup flows must be represented as typed setup tasks, derived from blueprint + runtime blockers.**
7. **Mission Control should surface private access guidance, including Tailscale and browser-backed `/chrome/` flows.**
8. **External channels should be linked threads with shared higher-level state, not one giant merged transcript.**
9. **Notifications should land in Mission Control first, then optionally fan out elsewhere.**
10. **Channel setup must never block initial Mission Control activation.**

---

## 22. What is still intentionally not frozen

This document does **not** yet freeze:
- the exact backend framework
- the exact DB schema names/types
- the exact queue technology
- the exact OpenClaw runtime invocation method
- the exact frontend stack or component library
- the exact channel-auth implementation details per platform

What it does freeze is the control pattern:
- Mission Control is the product surface
- backend mediates and records
- OpenClaw executes
- setup/approvals/notifications are structured objects
- channels extend the system without replacing Mission Control

---

## 23. Summary

The Mission Control chat bridge should turn the dashboard from a passive board into the real customer control plane.

The correct model is:
- **chat for interaction**
- **backend records for product truth**
- **runtime turns for execution**
- **approval objects for sensitive decisions**
- **setup tasks for guided onboarding and expansion**
- **notifications for system awareness**
- **linked channel threads for Telegram/WhatsApp/Discord/Slack growth**

That gives ClawOps the exact product behavior the other docs point toward:
- customer lands in Mission Control first
- talks to the assistant immediately
- sees what is live, what is blocked, and what should happen next
- completes setup through guided actions
- approves sensitive operations safely
- expands into external channels later without losing control of state

This is the practical bridge between dashboard UX and actual deployed AI operations.
