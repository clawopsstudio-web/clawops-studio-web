# ClawOps Studio — Architecture Freeze V1

**Last Updated:** 2026-03-31  
**Status:** Draft v1  
**Purpose:** Freeze the high-level system boundaries before deeper backend, onboarding, and deployment build-out.

---

## 1. Goal

ClawOps needs one clear architecture that supports the intended product experience:
- customer signs up
- customer pays
- customer completes onboarding
- customer receives a profile-matched AI assistant or team
- customer talks to the system first inside Mission Control
- customer expands to messaging apps and business tools with guided help
- customer runs on dedicated infrastructure provisioned for their deployment

This document defines the boundary between:
- frontend app
- backend app
- database
- OpenClaw runtime
- automation layer
- infrastructure/deployment layer

If a component does not clearly belong to one of these layers, it is not frozen yet.

---

## 2. Architecture Principles

### 2.1 Product-first, not infra-first
Customers buy an AI operator system, not server management.
Infrastructure exists to support product delivery, not to become the user experience.

### 2.2 Mission Control is the first operational surface
Every deployment must be usable in the dashboard before Telegram, WhatsApp, Discord, or Slack are connected.

### 2.3 Dynamic assistant/team shape
Not every customer gets the same team.
The system must support:
- one assistant
- small specialist setup
- full team deployment
based on customer profile and business needs.

### 2.4 Lean default capability exposure
Give only the minimum useful default tools/skills/apps.
Do not install every possible connector or skill by default.

### 2.5 Internal vs customer-facing separation
The customer-facing product should expose business-facing tools and channels.
Internal infrastructure tools remain hidden.

Examples of internal-only components:
- Supabase
- Vercel
- deployment internals
- Contabo orchestration details
- session store internals
- runtime hardening internals

### 2.6 Execution ladder remains stable
Preferred integration path:
1. Direct API
2. MCP
3. n8n
4. CLI / harness
5. Browser automation

This applies both to product integrations and operator workflows.

### 2.7 Dedicated infrastructure remains the default deployment model
Each serious customer should ultimately run on dedicated infrastructure rather than shared consumer runtime.
Contabo remains the intended standard provisioning target.

---

## 3. Frozen Layer Responsibilities

## 3.1 Frontend App

### Responsibilities
The frontend is responsible for the customer-facing product experience.

It should handle:
- marketing site
- plan selection
- signup entry
- billing UI hooks
- onboarding UI
- Mission Control UI
- customer dashboard views
- integration settings UI
- brain/model settings UI
- messaging channel setup UI
- status views and alerts
- upgrade/add-on surfaces

### It should NOT own
- durable business truth
- deployment orchestration logic
- raw provisioning workflows
- agent execution logic
- secret-heavy runtime internals

### Key frontend surfaces
1. **Marketing / conversion site**
2. **Onboarding flow**
3. **Mission Control dashboard**
4. **Settings / integrations / billing area**

### Mission Control UI requirements
Mission Control must include at least:
- chat pane
- setup recommendation pane
- system status pane
- pending approvals / blockers
- integration connection prompts

---

## 3.2 Backend App

### Responsibilities
The backend is the product-control layer.

It should own:
- customer/account lifecycle
- subscription state
- onboarding state
- deployment records
- deployment job state
- integration connection metadata
- brain/provider configuration metadata
- channel connection metadata
- dashboard API
- approval request records
- audit/event logs
- orchestration triggers

### It should NOT own
- the real-time agent reasoning loop
- direct conversation runtime
- generic browser automation details
- low-level OpenClaw config semantics unless mirrored as product state

### Backend role in the system
The backend is the system-of-business-state.
It converts product events into deployment and runtime actions.

Examples:
- payment success → mark account deployable
- onboarding complete → generate deployment blueprint
- deployment ready → allow Mission Control activation
- connect Gmail requested → create integration task and track its status

---

## 3.3 Database

### Responsibilities
The database is the durable source of truth for business and deployment state.

Minimum expected domains:
- accounts
- users
- subscriptions
- plans
- onboarding submissions
- deployment blueprints
- deployments
- deployment steps
- assistant/team profiles
- skill pack assignments
- integration connection records
- channel connection records
- approval requests
- audit logs
- usage/event records

### Safe principle
Chat history is not the canonical business system of record.
Docs are not the canonical business system of record.
Runtime config is not the canonical business system of record.

The DB should be the canonical business state.

### Current direction
Supabase remains the preferred backend/database direction for ClawOps internal product state, but it remains internal infrastructure, not a customer-facing “tool.”

---

## 3.4 OpenClaw Runtime

### Responsibilities
OpenClaw is the runtime execution layer for the deployed AI assistant/team.

It should own:
- agents
- messaging channel execution
- Mission Control chat execution bridge
- tool usage inside conversations
- skill invocation
- channel routing
- per-agent runtime behavior
- approvals in-context
- runtime memory and local task execution

### It should NOT own
- customer subscription truth
- billing source of truth
- account/user management source of truth
- deployment blueprint generation as a product responsibility
- provisioning pipeline as a product responsibility

### Product meaning
OpenClaw is where the AI actually lives and works.
The backend decides what should exist.
OpenClaw executes that existence.

---

## 3.5 Automation Layer

### Components
- n8n
- background workers
- webhook handlers
- scheduled tasks
- async job runners
- install/update scripts

### Responsibilities
The automation layer is the glue and long-running workflow engine.

It should own:
- webhook consumption
- scheduled actions
- retryable cross-system workflows
- multi-app orchestration
- async provisioning steps
- async integration tasks
- post-deploy checklists
- notifications and follow-up actions

### n8n specifically
n8n is best used for:
- multi-app workflows
- retries and schedules
- notification pipelines
- onboarding event chains
- CRM/email/doc app automations

n8n should not become the primary source of truth.
It is an execution/orchestration layer, not the core database.

---

## 3.6 Infrastructure / Deployment Layer

### Responsibilities
This layer provisions and shapes the actual customer environment.

It should own:
- Contabo provisioning
- base server bootstrap
- OS/runtime dependencies
- Docker/runtime service prep
- Tailscale setup
- OpenClaw install
- hardening baseline
- browser runtime availability if needed
- service supervision
- health checks

### Long-term target
Provisioning should become a structured pipeline driven by customer blueprint state, not a manual artisanal deployment.

### Default provider direction
Contabo remains the intended standard VPS provider and should be integrated into the core deployment path via API when ready.

---

## 4. Frozen Product-to-System Flow

## 4.1 Signup and Billing
1. customer visits frontend
2. customer selects plan
3. customer signs up
4. customer billing state is created/updated in backend
5. backend marks lifecycle state accordingly

## 4.2 Onboarding
1. frontend captures profile and business goals
2. backend stores onboarding submission
3. enrichment step generates recommendations
4. backend creates deployment blueprint

## 4.3 Blueprint
Blueprint should define:
- customer shape: solo assistant / small team / full team
- starter brain mode
- optional provider overrides
- recommended business tools
- preferred channels
- required skill packs
- approval checkpoints
- deployment target profile

## 4.4 Provisioning
1. backend/automation marks blueprint ready
2. deployment job provisions infrastructure
3. infrastructure installs runtime baseline
4. OpenClaw is configured
5. customer-specific assistant/team and skill packs are applied

## 4.5 Activation
1. Mission Control is enabled
2. default assistant responds in dashboard chat
3. customer receives guided next steps
4. messaging channels and apps are connected after initial activation

---

## 5. Frozen Product Surface Model

## 5.1 Mission Control is mandatory
Every deployment gets Mission Control.
This is not optional.

Why:
- gives immediate first contact surface
- avoids forcing messaging app setup first
- enables guided setup and approvals
- creates one universal customer control plane

## 5.2 External messaging channels are optional expansions
The first supported external expansion targets are:
- Telegram
- WhatsApp
- Discord
- Slack

These are connected after Mission Control is already working.

## 5.3 Customer-facing tools are business-facing only
The customer-facing tool catalog should focus on:
- communications
- docs/files
- CRM/workspace tools
- content/research tools
- approved custom integrations

The customer-facing catalog should not expose internal stack elements like Supabase or Vercel.

---

## 6. Frozen Brain Layer Model

The system must support three customer brain modes.

### 6.1 Starter Brain
- preconfigured default model stack
- immediate operability
- low-friction setup
- budget-aware defaults

### 6.2 Bring Your Own Brain
- customer supplies their own provider/API
- customer can raise quality or align with existing subscriptions

### 6.3 Hybrid Brain
- default stack first
- user upgrades selectively later

### Brain-layer ownership split
- frontend/backend own brain configuration UX and durable state
- OpenClaw owns runtime usage of the configured model choices
- automation may help validate key/provider health

---

## 7. Frozen Agent Layer Model

The system must support profile-based assistant/team composition.

### Rules
- do not assume every customer needs the same multi-agent team
- do not assume every customer wants a team at all
- default operating shape must be derived from onboarding and business profile

### Frozen output categories
- **Solo Assistant**
- **Small Specialist Pack**
- **Full Team Pack**

### Ownership split
- backend owns the recommended shape as product state
- OpenClaw owns the actual runtime instantiation of that shape
- dashboard exposes the result and allows later expansion

---

## 8. Frozen Integration Model

## 8.1 Customer-facing app/tool categories
Primary categories:
- messaging
- email/calendar/workspace
- CRM/business systems
- content/research tools
- knowledge/document tools

NotebookLM belongs in the content/research tool family and should be treated as a useful optional capability pack because it has already proven practical value in the ClawOps environment.

## 8.2 Integration-path rule
For each integration, choose the cleanest working path in this order:
1. API
2. MCP
3. n8n
4. CLI/harness
5. Browser automation

## 8.3 Guided setup rule
The customer should be guided conversationally.
The system chooses or recommends setup path instead of forcing technical decisions onto the user.

---

## 9. Frozen Session-Capture / Browser-Assisted Model

Some useful apps do not have clean APIs or clean auth flows.
For those tools, ClawOps can use a session-backed pattern.

### Frozen rule
Session-backed browser/CLI workflows are allowed for:
- internal operator tools
- content/research tools
- selected guided customer workflows

Examples:
- NotebookLM
- UI-first Google Labs tools
- other browser-only tools

### Constraints
They are lower-stability than API/MCP integrations because of:
- auth expiry
- browser state drift
- UI changes
- geo restrictions
- anti-bot friction

### Product handling
These should be presented as guided capability setup, not as invisible magic.
The dashboard assistant should help the customer:
- access the server/browser safely
- connect through Tailscale
- log into the required web app
- allow the system to reuse session state when appropriate

---

## 10. Frozen Tailscale Role

Tailscale is part of the secure access model.

### It is used for
- safe private access to Mission Control and other private surfaces
- admin/operator access to the instance
- customer access to private dashboard resources where applicable
- safer remote browser access than public exposure

### Product implication
The assistant in Mission Control should proactively guide customers on:
- how to install Tailscale on desktop/mobile
- how to join the relevant tailnet/access flow
- how to access the instance privately
- why private access matters for certain tools and browser-backed workflows

Tailscale is infrastructure, but the user still needs guided product-level help using it.

---

## 11. Frozen Contabo Requirement

Contabo API integration is a required future bridge for true one-click deployment.

### Current truth
The end-state product assumes dedicated VPS deployment.
That requires a real provisioning path.

### Therefore
Contabo provisioning must become a first-class deployment subsystem, not a side task.

### It should eventually support
- create VPS from product blueprint
- wait for readiness
- bootstrap baseline
- attach deployment record
- trigger stack install
- report status back to backend/dashboard

Until then, deployment remains partially manual or operator-assisted.

---

## 12. What is Frozen vs Not Frozen

## Frozen
- Mission Control first
- dynamic assistant/team shape
- brain layer as a primary product layer
- customer-facing tools exclude Supabase/Vercel
- dashboard = management surface
- messaging = execution surface
- OpenClaw = runtime layer
- backend = business-state/control layer
- database = durable business truth
- automation = async orchestration layer
- Contabo = intended standard VPS provisioning target
- Tailscale = secure access path
- NotebookLM-style session-backed tools are valid optional capability packs

## Not frozen yet
- exact DB schema
- exact billing provider implementation
- exact Mission Control frontend stack
- exact OpenClaw↔backend bridge mechanism for dashboard chat
- exact Contabo API workflow and retry model
- exact skill manifest schema
- exact plan/pricing packaging details

---

## 13. Immediate Next Technical Work

1. Define the exact product database schema
2. Define backend service boundaries and APIs
3. Define Mission Control chat bridge architecture
4. Define deployment blueprint schema
5. Define Contabo provisioning flow
6. Define default customer offering matrix
7. Define skill-pack/install-pack structure

---

## 14. Summary

ClawOps architecture is now frozen at the layer level.

The product flow is:
- frontend captures and presents
- backend decides and records
- database persists truth
- automation orchestrates long-running work
- infrastructure provisions the environment
- OpenClaw runs the assistant/team
- Mission Control becomes the first customer interaction surface
- messaging and integrations expand from there

This architecture keeps the product simple for the customer while preserving a disciplined internal system that can scale into repeatable deployments.
