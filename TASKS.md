# TASKS — ClawOps HQ

Purpose: single operating backlog for Henry / ClawOps Studio.  
Status: TODO | DOING | BLOCKED | DONE | DEFERRED  
Priority: P0 = revenue/launch | P1 = this week | P2 = useful

---

## Operating Priorities

1. Connectivity truth — Google Workspace, social/media, CLI/browser-backed tools
2. Frontend product shell — onboarding, Mission Control, integrations, billing UI
3. PayPal payment path — payment lifecycle + webhook/state model
4. Backend build — Supabase schema, app wiring, state APIs, runtime bridge
5. Product automation — onboarding flow, deployment pipeline, Contabo later
6. Revenue motion — outreach execution, publishing, follow-up loops
7. Runtime hardening stability — keep the lean roster/docs/session hygiene stable

---

## Reality Check

The following planning/spec work is now effectively complete and should not be treated as the main bottleneck:
- Architecture freeze docs
- Mission Control chat bridge spec
- Contabo provisioning flow spec
- Deployment blueprint schema
- Notion rollout plan
- Dev + Dave execution spec

The bottleneck is now **implementation order**, not more planning.

---

## Current Sequence (Active)

### Phase 0 — Connectivity first
1. Google Workspace core connectivity
2. Social/media platform connectivity
3. Browser/CLI/session-backed tool connectivity

### Phase 1 — Frontend shell
4. Frontend app shell
5. Onboarding flow UI
6. Mission Control UI shell
7. Integrations/settings UI
8. Billing UI

### Phase 2 — Payment path
9. PayPal flow and webhook model

### Phase 3 — Backend
10. DB schema + backend APIs
11. Mission Control state APIs
12. Runtime bridge
13. Deployment/job state model

### Phase 4 — Product automation
14. Automated onboarding flow
15. Deployment pipeline
16. Contabo implementation later

---

## Swarm / Delivery Status

| Track | Status | Notes |
|------|--------|-------|
| Tyler content batch | ✅ DONE | Ready to publish |
| Dave Supabase project recovery | ✅ DONE | Project active, credentials saved |
| Ryan outbound validation prep | ✅ DONE | Lead list + templates ready |
| Kyle landing page | ✅ DONE | Live via GitHub Pages |
| Architecture/spec stack | ✅ DONE | Freeze + bridge + provisioning + execution docs created |
| Runtime hardening baseline | ✅ DONE | Gateway hardened, Weixin removed, session store pruned |

---

## Active Queue

### P0 — Connectivity first

- [TODO] **Google Workspace core connectivity**
  - Owner: Henry + Dave
  - Goal: Connect and validate Gmail, Calendar, Drive, Docs, Sheets, AI Studio using the cleanest working path per service
  - Next action: Create a live connectivity matrix with current access state, owner, preferred path, fallback path, blocker, and next action
  - Definition of done:
    - Gmail path selected and one real action verified
    - Calendar path selected and one real action verified
    - Drive path selected and one real action verified
    - Docs path selected and one real action verified
    - Sheets path selected and one real action verified
    - AI Studio evaluated and categorized
    - verified path documented for each service

- [TODO] **Social/media platform connectivity**
  - Owner: Henry + Tyler + Ryan
  - Goal: Verify which publishing/outreach platforms should be operational now and connect them through API/MCP/n8n/CLI/browser as appropriate
  - Scope: X/Twitter, LinkedIn, Facebook, Instagram, and any other platform Pulkit explicitly wants active
  - Next action: Build a platform matrix with business use, access state, preferred execution path, and blocker
  - Definition of done:
    - target platforms frozen
    - one real working action or verified blocker per platform
    - preferred path documented for each platform
    - risky/browser-only flows clearly marked as guided/manual where needed

- [TODO] **Browser/CLI/session-backed tools connectivity**
  - Owner: Henry + Andrew
  - Goal: Lock the real operating path for tools that depend on browser sessions or CLI harnesses
  - Scope: NotebookLM, Whisk, Flow, and other proven browser-first tools only
  - Next action: Verify which tools are truly worth keeping active, and document auth/session stability plus actual working action
  - Definition of done:
    - NotebookLM path verified
    - Whisk path verified
    - Flow status honestly categorized
    - session-backed setup requirements documented
    - only high-ROI browser tools remain in active scope

### P0 — Frontend shell

- [TODO] **Frontend app shell**
  - Owner: Kyle + Henry
  - Goal: Build the customer-facing app shell for the actual product, not just the landing page
  - Scope: login, navigation, dashboard shell, Mission Control shell, integrations/settings, billing view
  - Next action: Turn the new frontend-first sequence into a UI page map and component map
  - Definition of done:
    - app shell exists
    - main navigation exists
    - billing/integrations/mission-control routes are defined
    - frontend reflects real capabilities, not fake integrations

- [TODO] **Onboarding flow UI**
  - Owner: Kyle + Henry
  - Goal: Build the profile/business intake flow that leads into a deployment blueprint
  - Next action: Define screens/steps for profile, business goals, team shape recommendation, brain selection, and setup expectations
  - Definition of done:
    - onboarding flow exists in UI
    - user can complete profile/business intake
    - output maps cleanly to blueprint fields

- [TODO] **Mission Control UI shell**
  - Owner: Kyle + Andrew
  - Goal: Build the first product-control surface in the frontend
  - Next action: Build the shell for chat, status, setup tasks, approvals, and notifications
  - Definition of done:
    - Mission Control layout exists
    - chat pane exists
    - status/setup/approval/activity panes exist
    - UI is ready for backend hookup later

- [TODO] **Integrations + settings UI**
  - Owner: Kyle + Henry
  - Goal: Create settings pages that reflect real connected app paths
  - Next action: Use the connectivity matrix to define which services appear as API/OAuth, which are guided browser setup, and which are deferred
  - Definition of done:
    - Google section exists
    - social section exists
    - browser-backed tools section exists
    - Tailscale/private-access guidance is represented where required

- [TODO] **Billing UI (PayPal-first)**
  - Owner: Kyle + Henry
  - Goal: Replace generic Stripe thinking with a real PayPal-facing billing surface
  - Next action: Define plan view, payment state view, and post-payment handoff states
  - Definition of done:
    - billing page is PayPal-aligned
    - payment states are visible in UI
    - deployment readiness can later depend on real payment state

### P0 — Payment path

- [TODO] **PayPal payment integration model**
  - Owner: Dave + Henry
  - Goal: Define and then implement the payment lifecycle using PayPal instead of Stripe
  - Next action: Freeze the event/state model for successful payment, cancellation, failed payment, and renewal/subscription handling as applicable
  - Definition of done:
    - PayPal chosen as active provider ✅
    - lifecycle states defined
    - webhook/event mapping defined
    - account/subscription update path defined

### P0 — Backend implementation

- [TODO] **Supabase schema + backend baseline**
  - Owner: Dave + Andrew
  - Goal: Move from recovered access into real backend implementation
  - Current state: Supabase project is active and credentials are saved locally in `.secrets/supabase.env`
  - Next action: Create initial schema for accounts, users, subscriptions, onboarding, deployments, approvals, setup tasks, notifications
  - Definition of done:
    - schema created
    - migrations tracked
    - backend baseline exists
    - core state can be stored/retrieved

- [TODO] **Mission Control backend state APIs**
  - Owner: Dave + Andrew
  - Goal: Expose backend-backed session/status/setup/approval/notification state for the frontend shell
  - Next action: Implement the first API surfaces for Mission Control status and non-chat panels
  - Definition of done:
    - Mission Control can load state from backend
    - setup tasks come from backend
    - approvals come from backend
    - notifications come from backend

- [TODO] **Runtime bridge prototype**
  - Owner: Andrew + Dave
  - Goal: Make one Mission Control message travel through backend → OpenClaw → frontend stream safely
  - Next action: Implement one-thread, one-turn, SSE-backed bridge prototype
  - Definition of done:
    - one message creates a runtime turn
    - OpenClaw reply streams back
    - side effects can be persisted separately from transcript text

- [TODO] **Deployment/job state model**
  - Owner: Andrew + Dave
  - Goal: Make deployments staged objects, not informal operator flows
  - Next action: Implement lifecycle statuses and a minimal job/checkpoint model
  - Definition of done:
    - deployment statuses exist in backend
    - jobs/checkpoints exist
    - failure states are visible and queryable

### P1 — Product automation

- [TODO] **Automated onboarding flow**
  - Owner: Dave + Andrew
  - Goal: Client fills onboarding → blueprint/deployment record created → activation path starts
  - Next action: After frontend + PayPal + backend baseline exist, connect the flow end to end
  - Definition of done:
    - onboarding creates real records
    - deployment blueprint is generated/persisted
    - flow reaches activation-ready staging

- [TODO] **Client onboarding dashboard handoff**
  - Owner: Kyle + Henry
  - Goal: Convert onboarding completion into a clear dashboard handoff inside Mission Control
  - Next action: Map onboarding completion states to recommended next steps and setup cards
  - Definition of done:
    - onboarding completion leads into Mission Control
    - next actions are visible
    - setup queue is coherent

- [DEFERRED] **Deployment pipeline (Contabo implementation)**
  - Owner: Dave + Andrew
  - Goal: 1-click VPS + stack deployment from client profile
  - Status: Deferred until frontend, PayPal, and backend baseline are real
  - Definition of done:
    - Contabo API/auth flow verified
    - blueprint-to-infra mapping implemented
    - first client VPS deployed through structured pipeline

### P1 — Revenue motion

- [TODO] **First outreach send**
  - Owner: Ryan + Henry
  - Goal: Send the first approved outbound batch for the Agency AI Employee offer
  - Current state: 15 leads and templates are ready
  - Next action: Pulkit approves top 5 and Ryan executes first batch through the safest verified path
  - Definition of done:
    - first batch sent
    - responses tracked
    - follow-up queue started

- [TODO] **Sales recurring workflow (Ryan loop)**
  - Owner: Ryan
  - Goal: Lock recurring triage → review/tag → propose follow-up → approval → outbound
  - Next action: Formalize recurring triggers and operating rhythm once first outreach batch is sent
  - Definition of done:
    - loop documented
    - schedule/triggers defined
    - Henry can run it without prompting

- [DONE] **Sales content batch (Tyler first week)**
  - Owner: Tyler
  - Current state: 14 posts, 20 viral hooks, 30-day calendar, and strategy docs are complete

- [DONE] **Outbound validation prep**
  - Owner: Ryan
  - Current state: lead list + outreach templates complete

- [DONE] **Landing page + offer page**
  - Owner: Kyle
  - Current state: Live at `https://clawopsstudio-web.github.io/test/`

### P2 — Stability / deferred tracks

- [DONE] **Runtime hardening baseline**
  - Owner: Henry
  - Current state: Gateway bound to loopback, `openclaw-weixin` removed while keeping MetaClaw active, roster pruned, stale session-store mappings reduced

- [DONE] **Stabilize Telegram lane operations**
  - Owner: Henry
  - Current state: All 7 lanes verified and usable

- [DONE] **Connect GoHighLevel (GHL)**
  - Owner: Henry + Ryan
  - Current state: MCP path works, read + safe write validated

- [DEFERRED] **Vercel auth + deployment flow**
  - Owner: Kyle
  - Status: Deferred — GitHub Pages is the current landing-page path

- [DEFERRED] **DeerFlow research integration**
  - Owner: Arjun
  - Status: Deferred — not on the critical path

- [DEFERRED] **Paperclip re-evaluation**
  - Owner: Henry
  - Status: Deferred — off critical path

- [DEFERRED] **MetaClaw improvement loop**
  - Owner: Henry
  - Status: Deferred — plugin active, no chosen target workflow yet

- [DEFERRED] **HiClaw narrow pilot use case**
  - Owner: Henry
  - Status: Deferred — services live, use case not chosen

- [DEFERRED] **LobsterBoard decision**
  - Owner: Henry
  - Status: Deferred — Mission Control is the active dashboard path

---

## Decision Log

- Active sequence is now: connectivity first → frontend shell → PayPal → backend → automation
- Payment provider is **PayPal**, not Stripe
- Mission Control remains the first operational surface
- Use the execution ladder: API → MCP → n8n → CLI → browser
- Optional messaging channels and many app integrations should not block first activation
- Contabo remains the intended deployment target, but implementation is deferred until the earlier product path is real
- Runtime hardening baseline remains in place and should not be destabilized by tool sprawl
