# ClawOps Studio — Client Journey and Deployment Flow

**Last Updated:** 2026-03-31  
**Status:** Draft v1

---

## 1. Purpose

This document defines the intended customer journey for ClawOps Studio and the internal delivery flow that turns a paying customer into a live AI operator environment.

It is written to answer two questions:
1. What should the customer experience from signup through ongoing use?
2. What should ClawOps do internally to deliver that experience consistently?

This is the product-level view, not the low-level implementation spec.

---

## 2. Core Product Principle

Customers are not buying infrastructure.
Customers are buying an AI operator system tailored to their individual and business profile.

The product must feel like:
- choose a plan
- describe your business and goals
- receive a solo AI assistant or a full AI team
- talk to that system in the dashboard immediately
- connect messaging apps and business tools gradually with guided help
- operate through chat + dashboard, not terminal commands

The customer should never need to understand:
- OpenClaw internals
- VPS setup
- terminal workflows
- tool runtime details
- agent routing architecture

Those remain ClawOps implementation details.

---

## 3. Product Layers

ClawOps should be designed as five connected layers.

### 3.1 Brain Layer
How the system thinks.

This includes:
- default starter model stack
- optional bring-your-own API/provider setup
- hybrid model routing
- per-agent or per-workflow model selection later
- fallback model policy
- cost vs quality controls

The customer can start with a preconfigured starter brain and upgrade later.

### 3.2 Agent Layer
What AI worker shape the customer receives.

This should not be fixed to one universal team.
It must adapt to the user's profile.

Possible outputs:
- a single AI assistant for an individual operator
- a lightweight duo or trio for a small business
- a full team for agencies or more complex operations

Agent composition should be derived from:
- user role
- business type
- industry
- goals
- preferred workflows
- integrations required
- desired autonomy level

The system should recommend the right operating shape rather than forcing everyone into the same seven-agent structure.

### 3.3 Channel Layer
Where the customer talks to the AI system.

All deployments should include one default surface:
- Mission Control dashboard chat

Optional expansion channels:
- Telegram
- WhatsApp
- Discord
- Slack
- other channels later

Messaging apps are extensions, not prerequisites.

### 3.4 Tool/App Layer
What external systems the AI can access for the customer.

Customer-facing app integration examples:
- Gmail
- Calendar
- Drive
- Docs
- Sheets
- GoHighLevel
- Notion
- Slack
- Discord
- Telegram
- WhatsApp
- custom CRMs or internal apps

Important scope rule:
- **Supabase and Vercel are internal ClawOps infrastructure/build tools, not customer-facing apps to present in the customer tool catalog.**

### 3.5 Deployment Layer
Where and how the system runs.

This includes:
- Contabo VPS provisioning
- OpenClaw install
- runtime hardening baseline
- Tailscale access
- Docker services
- n8n where needed
- dashboard/control-plane setup
- preconfigured skills and tools

---

## 4. Customer Types and Recommended Shapes

The system should support multiple customer shapes.

### 4.1 Solo Operator
Best for:
- founder
- consultant
- freelancer
- creator

Recommended shape:
- one HQ-style AI assistant
- optional one specialist add-on later

Primary value:
- planning
- inbox and follow-up help
- research
- content assistance
- task coordination

### 4.2 Small Business / Lean Team
Best for:
- small agency
- startup team
- local business operator

Recommended shape:
- one HQ assistant
- one or two specialists depending on need

Examples:
- sales + content
- research + operations
- support + follow-up

### 4.3 Full Team Deployment
Best for:
- digital agencies
- SaaS founders with multiple functions
- businesses wanting parallel AI workers

Recommended shape:
- HQ / coordinator
- sales
- research
- marketing
- frontend / web
- backend / ops
- custom specialist roles as needed

The system should start from profile-driven recommendations, not hardcoded assumptions.

---

## 5. Ideal Customer Journey

## 5.1 Discover
The customer lands on the marketing site.

They should immediately understand:
- what ClawOps is
- who it is for
- what outcome they get
- whether they need one assistant or a team
- pricing / plan structure
- the next step to begin

Goal of this step:
- convert interest into signup / subscription start

## 5.2 Choose Plan
The customer chooses a plan.

Possible dimensions:
- solo assistant vs team deployment
- standard vs advanced integrations
- starter vs premium support or customization

Backend effect:
- create account shell
- create subscription intent or subscription record
- set lifecycle state to onboarding

## 5.3 Complete Onboarding
The customer fills a guided onboarding flow.

This should capture:
- personal name and role
- business name
- website
- industry / niche
- business goals
- major workflows
- preferred communication channels
- desired apps/integrations
- whether they want a solo assistant or a team
- preferred autonomy / approval style
- model preference: starter brain vs bring your own vs hybrid

The onboarding should feel like briefing a smart operator, not filling a technical deployment checklist.

## 5.4 Context Enrichment
After onboarding, ClawOps enriches the customer profile.

Possible enrichment:
- website scrape
- offer extraction
- ICP / audience inference
- suggested tools
- suggested AI team shape
- suggested skill packs
- suggested messaging channels
- suggested starter workflows

Output:
- a deployment blueprint

## 5.5 Brain Selection
The customer must have a usable AI brain from day one.

Recommended modes:

### Starter Brain
- preconfigured default model stack
- low-friction setup
- immediate operability
- budget-aware default

### Bring Your Own Brain
- customer provides API/provider access
- allows premium quality or existing account usage

### Hybrid Brain
- start with default model stack
- add custom models/providers over time

The brain layer should be visible in the dashboard and adjustable later.

## 5.6 Provisioning and Installation
Once onboarding and billing conditions are satisfied, backend triggers deployment.

Customer sees:
- deployment started
- current stage
- estimated readiness
- what input is still required

Customer does not see:
- low-level infra commands
- terminal logs by default
- manual stack assembly details

## 5.7 First Login to Mission Control
Mission Control should be the first operational surface after deployment.

This is critical.
The customer should not need Telegram, WhatsApp, Discord, or Slack connected to start using the system.

Mission Control should provide:
- dashboard access
- system status
- AI chat with HQ/default assistant
- recommended setup actions
- integration/connectivity guidance
- approval requests

This is the control plane and initial conversation surface.

## 5.8 Guided Setup Through Chat
On first login, the customer should be greeted by the AI assistant.

The assistant should proactively:
- explain what has been deployed
- explain whether they received a solo assistant or a team
- recommend next steps
- ask whether to connect messaging apps
- ask whether to connect business apps
- ask whether to upgrade or customize the brain layer
- offer guided setup paths

Example system behavior:
- connect Telegram now
- connect Gmail + Calendar next
- connect GHL if sales workflow is needed
- add a premium model provider later if desired

## 5.9 Expand to Messaging Channels
After Mission Control works, the customer can add channels.

Supported first-class channel targets:
- Telegram
- WhatsApp
- Discord
- Slack

The user should be able to choose one or many.

The AI assistant inside Mission Control should guide this setup conversationally.

## 5.10 Ongoing Use
After activation, customer operates through two surfaces:

### Dashboard / Mission Control
Best for:
- setup
- management
- visibility
- configuration
- approvals
- account state
- integration status
- system health

### Messaging Apps
Best for:
- everyday interaction
- natural language work requests
- updates and alerts
- lightweight approvals
- role-specific usage

This split should remain stable:
- **dashboard = management surface**
- **messaging = execution surface**

---

## 6. Mission Control as the First Surface

Mission Control should evolve from a passive dashboard into the first-party customer control plane.

It should include at least three areas:

### 6.1 Chat Pane
Where the customer talks to the AI assistant immediately after deployment.

### 6.2 Recommended Actions Pane
Examples:
- choose or confirm your brain mode
- connect Telegram / WhatsApp / Discord / Slack
- connect Gmail / Calendar / GHL / Notion
- review recommended skills or workflows
- finish missing approvals

### 6.3 System Status Pane
Examples:
- deployment status
- active assistant/team members
- model status
- connected apps
- connected channels
- pending setup tasks
- alerts / blockers

Mission Control should be enough for first use even if no external messaging channel is connected yet.

---

## 7. Integration Guidance Model

A major product advantage is guided integration help.

The customer should not need to know whether a tool is best connected via API, browser automation, n8n, MCP, or CLI.

The system should choose or recommend the best path.

### Preferred execution order
1. Direct API
2. MCP
3. n8n
4. CLI / harness
5. Browser automation

### Customer-facing expectation
For each integration, the dashboard should present:
- recommended method
- fallback method
- what customer action is needed
- what ClawOps can automate
- what remains manual for security/auth reasons

This allows guided setup without exposing technical complexity.

---

## 8. Internal Delivery Flow

This is ClawOps' internal view of the same journey.

## 8.1 Account and Subscription Creation
When the customer signs up:
- create customer/account record
- create user record
- create subscription or subscription intent
- set lifecycle state

## 8.2 Onboarding Capture
Store onboarding in structured form.

This becomes the source material for:
- deployment blueprint
- agent recommendations
- tool recommendations
- messaging recommendations
- brain setup recommendations

## 8.3 Deployment Blueprint Generation
Convert onboarding + enrichment into a structured blueprint.

Blueprint should define:
- customer shape: solo assistant or team
- initial agent roster
- starter brain mode
- required and optional integrations
- preferred channels
- required skill packs
- approval checkpoints
- provisioning profile

## 8.4 Contabo Provisioning
Provision dedicated infrastructure through Contabo.

Ideal future flow:
- create VPS via Contabo API
- wait for machine readiness
- apply initial access/bootstrap configuration
- register deployment in backend state

This is still a missing key integration and must become part of the core deployment pipeline.

## 8.5 Instance Bootstrap
Install the runtime stack.

Expected baseline:
- OpenClaw
- hardened config
- Docker/runtime dependencies
- Tailscale access
- Mission Control/dashboard
- browser automation support if needed
- n8n when required
- selected skill packs and tooling

## 8.6 Brain and Agent Provisioning
Apply the customer-specific operating shape.

This means:
- create one assistant or full team depending on profile
- assign default or customer-provided brain settings
- apply role-specific behavior and permissions
- install only the necessary skills/tools

## 8.7 Integration Setup
Apply customer-facing integrations as selected or recommended.

Examples:
- Gmail
- Calendar
- Drive
- Docs
- Sheets
- GHL
- Notion
- messaging channels

Important implementation note:
- internal tools like Supabase and Vercel can exist in the ClawOps stack but should not be framed as customer-facing integrations during onboarding.

## 8.8 Verification
Before handoff, run checks.

Examples:
- deployment reachable
- dashboard reachable
- default assistant responds
- starter brain works
- selected channels work if configured
- selected integrations pass basic checks
- setup blockers are clearly recorded

## 8.9 Handoff
Mark deployment ready and hand customer into Mission Control.

The customer should receive:
- access
- initial greeting from assistant
- current system state
- next recommended actions
- ability to continue setup conversationally

---

## 9. Brain Layer Principles

The brain layer is a primary product component.

### 9.1 Requirements
- every customer must have a usable default brain from day one
- customers should be able to bring their own provider later
- the dashboard should support model/provider upgrades over time
- the system should support budget-first and premium paths

### 9.2 Customer-facing brain options
- Starter Brain
- Bring Your Own Brain
- Hybrid Brain

### 9.3 Dashboard responsibilities
The dashboard should later expose:
- active default model
- fallback model
- connected providers
- API key status
- per-agent upgrade options in advanced mode

---

## 10. Agent Layer Principles

The agent layer must be adaptive, not rigid.

### Rules
- not every customer needs a full team
- not every customer needs the same roles
- the AI shape should match profile, business complexity, and goals
- the customer should be able to start small and expand later

### Example path
- Start with one assistant
- Add sales assistant later
- Add marketing or research later
- Expand to full team only when needed

This creates a more realistic and less intimidating customer experience.

---

## 11. Customer-Facing Tool Scope

To avoid confusion, customer-facing tools should focus on business operations and communications.

### Good customer-facing examples
- email
- calendar
- CRM
- documents
- messaging
- research/content tools
- internal knowledge tools

### Internal-only examples
- Supabase
- Vercel
- deployment infrastructure internals
- internal observability or build tooling

The customer should see outcomes and guided setup, not ClawOps engineering internals.

---

## 12. System of Record Principles

The system should keep clear responsibility boundaries.

### Dashboard / frontend app
- customer experience
- onboarding UI
- billing UI
- Mission Control UI
- integration UI

### Backend
- business state
- customer records
- subscription state
- onboarding records
- deployment jobs
- integration metadata
- audit events

### Database
- persistent source of truth for product and deployment state

### OpenClaw runtime
- agents
- chat execution
- tool use
- messaging channels
- skills and runtime behavior

### Automation layer
- provisioning jobs
- webhook handlers
- n8n workflows
- long-running install/update steps

This boundary must later be frozen in the architecture document.

---

## 13. Open Questions Requiring Next-Step Design

### 13.1 Contabo API integration
Still needs a concrete provisioning flow and retry model.

### 13.2 Exact backend schema
Needs formal definition for accounts, subscriptions, onboarding, deployments, integrations, and runtime links.

### 13.3 Mission Control customer chat implementation
Needs a formal UX and backend/runtime architecture.

### 13.4 Brain setup UX
Needs decision on how customers add providers, keys, default models, and fallback models.

### 13.5 Dynamic team recommendation logic
Needs a rule system for recommending solo assistant vs multi-agent setup.

---

## 14. Recommended Next Document

The next technical doc should be:

`docs/ARCHITECTURE-FREEZE-V1.md`

It should derive directly from this customer journey and define:
- frontend responsibilities
- backend responsibilities
- database responsibilities
- OpenClaw runtime responsibilities
- automation/n8n responsibilities
- deployment orchestration responsibilities
- how Mission Control chat bridges frontend and OpenClaw

---

## 15. Summary

ClawOps should deliver a profile-aware AI operator system, not a generic static team and not raw infrastructure.

The intended customer journey is:
- discover
- subscribe
- onboard
- receive recommended assistant or team shape
- start with a default brain
- enter Mission Control
- talk to the assistant immediately
- connect channels and tools with guided help
- expand capabilities over time

The intended internal process is:
- capture customer state
- generate deployment blueprint
- provision Contabo VPS
- install hardened OpenClaw environment
- install customer-specific brain, agents, and skills
- verify deployment
- hand customer into Mission Control as the first operational surface

This is the clearest path to a product that feels easy for the customer while remaining structured and repeatable for ClawOps internally.
