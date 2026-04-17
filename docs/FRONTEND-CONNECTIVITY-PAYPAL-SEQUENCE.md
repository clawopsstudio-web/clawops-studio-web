# ClawOps Studio — Frontend + Connectivity + PayPal Sequence

**Last Updated:** 2026-04-01  
**Status:** Active execution sequence  
**Owner:** Henry

---

## 1. Why this sequence exists

ClawOps already has enough architecture docs.
The next risk is building in the wrong order.

Pulkit’s updated direction is:
1. **connect the real operating surfaces first**
2. **build the frontend product shell next**
3. **design payment around PayPal, not Stripe**
4. **then implement backend/state/runtime integration**

This is the correct move because it prevents:
- fake integrations in the UI
- building settings pages for tools we have not actually connected
- backend abstractions that do not match real execution paths
- Stripe-first assumptions when PayPal is the actual payment path

---

## 2. Active sequence

## Phase 0 — Connectivity truth first

Before major frontend/backend implementation, verify and connect the high-value external surfaces the product will actually rely on.

### 0A. Google Workspace core
Priority order:
1. Gmail
2. Calendar
3. Drive
4. Docs
5. Sheets
6. AI Studio

### 0B. Social / publishing / platform connectivity
Priority depends on actual GTM motion, but likely includes:
- X / Twitter
- LinkedIn
- Facebook
- Instagram
- any other channel Pulkit actually wants agents to operate on

### 0C. Browser + CLI + session-backed surfaces
For services that do not have clean APIs or where auth is UI-led:
- NotebookLM
- Whisk
- Flow
- any other browser-first tool that proves real value

### Output of Phase 0
For each service, define:
- current access state
- owner
- preferred path
- fallback path
- auth/session requirement
- blocker
- next action

### Rule
Use the execution ladder:
**API → MCP → n8n → CLI → browser**

This phase is about reality, not hypothetical feature lists.

---

## 3. Why connectivity comes before frontend-heavy work

If frontend is built first without verified connections, we risk shipping:
- fake integration cards
- wrong onboarding steps
- invalid setup instructions
- brittle assumptions about auth and tool access

Connectivity-first gives frontend a real foundation.

Examples:
- if Gmail API works, frontend can show a clean connect/verify flow
- if NotebookLM is session-backed, frontend should show guided browser/Tailscale/session setup instead of pretending it is a normal OAuth app
- if social platforms are browser-led, frontend should surface guided setup and approval patterns accordingly

---

## 4. Phase 1 — Frontend product shell

After connectivity truth is established, build the product shell.

### Core surfaces to build
1. **Marketing / entry app shell**
2. **Signup / login flow**
3. **Onboarding flow**
4. **Mission Control UI**
5. **Integrations/settings pages**
6. **Billing page**
7. **Deployment/status views**

### What frontend should prove
- the product journey is coherent
- the customer can understand what they are getting
- Mission Control feels like the first operating surface
- setup guidance is visible and structured
- integrations reflect real available paths
- billing page is aligned to PayPal, not Stripe assumptions

### Frontend principle
Build real screens and flows, but do not over-polish disconnected mockups.
The frontend should be product-real, even if backed by mocked/local state for the first pass.

---

## 5. Phase 2 — PayPal payment path

ClawOps should now plan around **PayPal** as the active payment provider.

### This replaces
- Stripe-first assumptions
- generic “Stripe or provider” placeholder thinking

### PayPal phase goals
- define product payment model
- define subscription or payment states needed in backend
- define onboarding/payment handoff
- define webhook/event mapping
- define what happens on:
  - successful payment
  - subscription start
  - cancellation
  - failed payment
  - renewal if applicable

### Product implication
Payment state must drive whether a customer becomes deployable.

### Required outcome
A clear PayPal-driven lifecycle:
- user pays
- backend marks account eligible
- onboarding continues or unlocks deployment
- Mission Control can reflect billing/deployment readiness

---

## 6. Phase 3 — Backend and state implementation

Only after connectivity truth + frontend shell + PayPal model are clear should the deeper backend implementation start.

### Backend focus
- Supabase schema
- account/user/subscription model
- onboarding persistence
- deployment blueprint persistence
- deployment/job state model
- Mission Control state APIs
- approvals/setup tasks/notifications
- runtime bridge to OpenClaw

### Why backend comes after these earlier phases
Because then backend will be shaped by:
- real integrations
- real frontend flows
- real payment provider
- real setup paths

Not by guesswork.

---

## 7. Recommended execution order inside each phase

## Phase 0 — Connectivity

### 0.1 Google Workspace audit matrix
- Gmail
- Calendar
- Drive
- Docs
- Sheets
- AI Studio

### 0.2 Social/media audit matrix
- X
- LinkedIn
- Facebook
- Instagram
- others only if actually relevant

### 0.3 Path selection per service
Record:
- API
- MCP
- n8n
- CLI
- browser

### 0.4 Verify at least one real working action per core service
Examples:
- Gmail read or label action
- Calendar read/create event
- Drive folder/file action
- Docs create/read action
- Sheets append/read action
- one real social/browser action where applicable

---

## Phase 1 — Frontend

### 1.1 App structure
- app shell
- navigation
- auth pages

### 1.2 Onboarding flow
- profile capture
- business profile
- recommended team/brain summary
- setup expectations

### 1.3 Mission Control shell
- chat pane
- status pane
- setup recommendations pane
- approvals pane
- notifications/activity pane

### 1.4 Integrations pages
- Google Workspace section
- social platforms section
- browser-backed tools section
- Tailscale/private-access guidance section

### 1.5 Billing page
- PayPal-facing
- plan selection / account state / payment status

---

## Phase 2 — PayPal

### 2.1 Payment state model
Need product states for:
- unpaid
- pending
- paid
- cancelled
- failed
- renewal_due or equivalent if applicable

### 2.2 Webhook/event model
Map PayPal events into backend state changes.

### 2.3 UI-state mapping
Mission Control / dashboard should know:
- whether payment is blocking deployment
- whether onboarding can continue
- whether renewal/issue requires attention

---

## Phase 3 — Backend

### 3.1 DB schema
### 3.2 state APIs
### 3.3 runtime bridge
### 3.4 deployment pipeline
### 3.5 provisioning integration

This is where the earlier architecture docs become implementation.

---

## 8. Concrete rule changes from previous planning

### Old sequence (superseded)
- architecture freeze
- backend foundation
- product build
- payment path
- deployment flow

### New active sequence
1. **Google + social + browser connectivity**
2. **frontend product shell**
3. **PayPal payment flow**
4. **backend/state implementation**
5. **runtime/deployment integration**

### Why this is better
Because it matches actual product reality and Pulkit’s updated direction.

---

## 9. Scope boundaries

### In scope now
- connectivity verification
- integration-path choice
- frontend shell
- PayPal-first billing path
- backend planning aligned to these truths

### Not the focus right now
- deep Contabo automation implementation
- broad marketplace/catalog work
- optional infra experiments
- Vercel rework
- DeerFlow recovery
- Paperclip revival

---

## 10. Immediate next actions

1. build a **connectivity matrix** for Google + social + browser-backed tools
2. update `TASKS.md` to reflect the new order
3. replace active payment wording from Stripe-first to PayPal-first
4. convert frontend work into a defined app-shell scope

---

## 11. Summary

The active ClawOps build sequence is now:

1. **Connectivity truth first**
2. **Frontend shell second**
3. **PayPal payment path third**
4. **Backend and runtime integration after that**

This is the cleanest path to a product that matches real capabilities instead of planning fiction.
