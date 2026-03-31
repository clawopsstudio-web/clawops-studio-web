# Contabo Provisioning Flow

**Last Updated:** 2026-04-01  
**Status:** Draft v1  
**Purpose:** Define the intended dedicated-VPS provisioning flow for ClawOps client deployments, with a clear split between what is already decided, what remains manual, and what still needs Contabo/API validation.

---

## 1. Executive summary

ClawOps is standardizing on **one dedicated Contabo-hosted VPS per client deployment**.

That provisioning path should be driven by the **deployment blueprint**, not by ad hoc operator memory.

The intended flow is:

1. customer signs up, pays, and completes onboarding
2. backend generates a deployment blueprint
3. blueprint is reviewed/approved enough to deploy
4. provisioning layer creates the Contabo server
5. baseline bootstrap + hardening run on the new host
6. Tailscale is established
7. OpenClaw + required packs are installed
8. Mission Control goes live first
9. post-activation guided setup handles channels, OAuth logins, and browser-backed tools

That is the target operating model.

**Current truth:**
- the architecture direction is clear
- the blueprint contract is mostly defined
- the runtime baseline is known from the current VPS
- the exact Contabo API workflow is **not fully verified in this repo yet**
- some steps will remain manual or operator-assisted until credentials, image IDs, cloud-init payloads, and retry semantics are locked down

---

## 2. Source-of-truth decisions already frozen elsewhere

This flow is based on the current architecture docs and should be treated as consistent with them:

- **Dedicated VPS per client** is the deployment model
- **Contabo** is the intended standard provisioning target
- **Mission Control is mandatory and first**
- **Tailscale is part of the secure access model**
- **Blueprint drives deployment**
- **External channels and business-tool integrations should not block activation**
- **Approval-sensitive actions must be explicit in system state**

Primary companion docs:
- `docs/ARCHITECTURE-FREEZE-V1.md`
- `docs/DEPLOYMENT-BLUEPRINT-SCHEMA-V1.md`
- `docs/DEPLOYMENT-SEQUENCE.md`
- `docs/LAUNCH-PLAN.md`
- `docs/SYSTEM-OVERVIEW.md`
- `docs/CLAWOPS-STUDIO-OPERATING-SYSTEM.md`

---

## 3. Scope of this document

This document covers the provisioning flow for a **new dedicated client VPS**.

It covers:
- how blueprint data should drive provisioning
- where Contabo API or manual Contabo actions fit
- how bootstrap should be structured
- what hardening baseline is expected
- how Tailscale/OpenClaw/Mission Control fit into activation
- what remains manual because of auth, approval, or unresolved API details

It does **not** attempt to fully define:
- final backend database schema
- final frontend onboarding implementation
- final Mission Control frontend stack
- final OpenClaw ↔ backend chat bridge details
- final Contabo retry model or job-runner implementation

---

## 4. Provisioning principles

### 4.1 One customer = one dedicated environment

Each paying customer should get their **own VPS environment**.

This supports:
- isolation
- easier debugging
- cleaner upgrades/rebuilds
- customer-specific browser session handling
- clearer access control
- simpler expectation-setting during handoff

### 4.2 Blueprint first, not artisan deploys

Operators should not invent infra/runtime shape during deployment.

Provisioning must consume a blueprint that already states:
- who the customer is
- what they bought
- what kind of assistant/team they need
- what infra profile they require
- whether browser runtime is needed
- what hardening/access posture is required
- what must wait for customer approval/auth

### 4.3 Mission Control first

Activation is not “done” when the server exists.

Activation is done when:
- Mission Control is reachable
- a default assistant responds there
- the customer can be guided through next steps from inside that surface

### 4.4 Do not block activation on optional integrations

The following should normally happen **after** base activation unless explicitly required:
- Telegram/WhatsApp/Discord/Slack setup
- Google OAuth
- CRM token entry
- browser-session capture for NotebookLM or similar tools
- customer-specific third-party app wiring

---

## 5. Canonical inputs from the deployment blueprint

The provisioning layer should read these blueprint sections as the minimum input contract.

### 5.1 Required blueprint domains

From `docs/DEPLOYMENT-BLUEPRINT-SCHEMA-V1.md`, provisioning should rely on:
- `meta`
- `customer`
- `subscription`
- `recommended_shape`
- `brain_layer`
- `channels`
- `skills_and_packs`
- `infrastructure`
- `security_and_access`
- `approvals`
- `deployment_plan`
- `notes`

### 5.2 Fields that should directly affect provisioning

### `subscription`
Use to confirm:
- billing complete
- dedicated deployment entitlement
- paid add-ons that require extra packs/runtime

### `recommended_shape`
Use to determine:
- assistant/team shape
- which workspaces/roles to install
- minimum runtime footprint

### `brain_layer`
Use to determine:
- default model/provider config posture
- whether deployment starts in starter mode or requires BYO/provider setup later

### `channels`
Use to determine:
- Mission Control must be enabled
- which channels are deferred after activation
- what should not block first launch

### `skills_and_packs`
Use to determine:
- core install packs
- role packs
- integration packs
- browser harness packs
- client overlays

### `infrastructure`
This is the most direct provisioning input:
- provider = `contabo`
- deployment model = `dedicated_vps`
- region preference
- instance profile
- browser runtime required or not
- Tailscale required or not
- public exposure policy
- hardening profile

### `security_and_access`
Use to determine:
- whether private/Tailscale access is mandatory
- whether guided browser-session capture is allowed
- default approval posture for external writes

### `approvals`
Use to determine:
- what cannot be auto-completed
- what must pause for customer or operator confirmation

### `deployment_plan`
Use to determine:
- phase sequence
- blocking steps
- manual steps
- verification checks

---

## 6. Provisioning lifecycle states

The blueprint lifecycle already defines:
- `draft`
- `recommended`
- `approved`
- `provisioning`
- `runtime_installing`
- `activation_ready`
- `active`
- `needs_revision`
- `archived`

For Contabo provisioning specifically, the operational interpretation should be:

| Blueprint state | Meaning for provisioning |
|---|---|
| `draft` / `recommended` | not deployable yet |
| `approved` | enough product + human approval exists to allocate infrastructure |
| `provisioning` | Contabo instance creation and first-access prep in progress |
| `runtime_installing` | server reachable; bootstrap, hardening, Tailscale, OpenClaw, and packs installing |
| `activation_ready` | Mission Control is reachable and verified, but customer-facing activation may still be pending |
| `active` | deployment live; guided setup continues for deferred integrations |
| `needs_revision` | provisioning must stop or not begin because blueprint is incomplete/contradictory |

---

## 7. End-to-end intended flow

### Phase 0 — Deployment readiness gate

Provisioning should **not** start until these are true:
- billing is complete
- deployment blueprint exists
- blueprint is at least `approved`
- `infrastructure.provider = contabo`
- `deployment_model = dedicated_vps`
- Mission Control is included in the deployment
- at least one assistant/agent definition exists
- no unresolved blocker exists in `approvals.pending` that should prevent infra creation

### Hard stop examples
- unpaid account
- no approved blueprint
- missing instance profile
- missing region/provider target
- contradictory access policy
- plan does not entitle dedicated deployment

---

### Phase 1 — Contabo order/instance creation

This is where the **Contabo API or manual Contabo action** fits.

### Intended automated inputs
Provisioning job should derive from blueprint:
- customer/workspace identifier
- desired region preference
- instance profile / size class
- OS image choice
- hostname/instance naming convention
- SSH/bootstrap access method
- cloud-init or equivalent first-boot payload
- tags/metadata linking infra back to deployment record

### Intended automated outcome
Provisioning layer receives:
- Contabo instance identifier
- public IP or reachable bootstrap address
- provisioning status
- initial access details sufficient for bootstrap automation

### What is known
Based on current planning docs, we expect Contabo to support:
- OAuth2-style API access
- VPS provisioning
- image selection
- cloud-init support

### What remains unresolved
The following are **not yet treated as verified implementation facts inside this repo**:
- the exact auth token exchange sequence we will use in production
- the exact instance-create endpoint payload for our selected SKU
- exact field names for user data / cloud-init payloads in our flow
- exact Ubuntu image ID to use
- exact region catalog and selection logic
- exact product/SKU mapping for our Starter/Growth/Scale tiers
- exact retry/idempotency model for failed or duplicated creates
- whether snapshots/images should be preferred over pure cloud-init for speed
- exact tagging/metadata support and how reliable it is

### Current operational rule
Until those details are locked down, this phase may be:
- fully automated via Contabo API later
- semi-automated via operator-run script/CLI
- manual in Contabo panel with structured handoff from blueprint

---

### Phase 2 — First access and server bootstrap

Once the instance is reachable, the provisioning layer should run the **baseline bootstrap**.

### Target baseline from current docs/runtime
The baseline stack is expected to include:
- Ubuntu 22.04 LTS
- Docker
- Docker Compose or current Docker Compose plugin path
- Node.js 22.x
- npm
- Tailscale
- UFW
- Playwright + Chrome
- OpenClaw gateway prerequisites
- systemd/process supervision setup where needed

### Bootstrap goals
Bootstrap should:
- establish a repeatable admin user/access path
- apply system updates
- install required packages/runtime dependencies
- prepare directories and service users where needed
- stage secrets/config inputs without leaking them into docs or repo
- install basic observability/health checks where appropriate

### Preferred automation pattern
Preferred order:
1. minimal instance creation
2. cloud-init handles only first-boot essentials
3. remote bootstrap script handles the full runtime baseline
4. later scripts install customer-specific runtime and packs

This split keeps cloud-init smaller and easier to debug.

### Why not overload cloud-init
Putting everything into cloud-init makes failures harder to inspect and retry.

Cloud-init should ideally do only enough to make the machine safely reachable and ready for the next step.

---

### Phase 3 — Hardening baseline

The current architecture already treats runtime hardening as non-optional.

For new client VPS deployments, the hardening baseline should at minimum include:
- restrict unnecessary public exposure
- enable and verify UFW default-deny posture except required ports
- minimize direct public service bindings where possible
- prefer loopback binding for internal services
- use Tailscale/private access for dashboards and admin surfaces where possible
- keep service restarts durable via systemd or equivalent supervision
- avoid storing customer secrets in tracked repo files
- document any required public endpoints explicitly instead of leaving them implicit

### Baseline hardening expectations

#### Network exposure
- do not expose Mission Control publicly by default
- do not expose internal admin surfaces unless there is a clear product requirement
- keep public exposure policy aligned with blueprint

#### Access
- bootstrap credentials/keys must be operator-controlled
- customer access should be mediated through intended product surfaces and guided Tailscale onboarding

#### Service durability
- critical services should restart automatically
- failure should degrade gracefully and be visible to operators

### Still unresolved
This repo does **not yet define** the final hardening profile as a line-by-line machine spec for every port/service combination on new customer boxes.

So `hardening_profile = baseline_v1` should currently be read as a policy target, not a fully codified installer artifact.

---

### Phase 4 — Tailscale setup

Tailscale is part of the secure access model and should be installed early in bootstrap.

### Tailscale should support
- operator/admin access to the new VPS
- private Mission Control access
- safer access to browser-backed tools and remote sessions
- guided customer access when needed

### Operational target
After bootstrap:
- the node joins the intended tailnet or approved access pattern
- operators can reach the box privately
- private service URLs can be tested before customer handoff

### Customer-facing product implication
The deployment is not just about installing Tailscale.
The customer should later be guided through:
- installing Tailscale on desktop/mobile
- joining the correct access path
- understanding why some tools require private access

### Unresolved detail
This repo does not yet freeze:
- exact tailnet topology for customer instances
- whether all clients share one tailnet or get segmented access patterns
- exact auth flow for enrolling a new node automatically
- exact automation path for customer invite/join steps

Those need explicit design before full automation.

---

### Phase 5 — OpenClaw runtime install

Once the server is hardened and reachable, provisioning moves into `runtime_installing`.

### Runtime install should include
- install/configure OpenClaw gateway
- create or shape the customer workspace
- place required agent/workspace files
- install required skills and packs from blueprint
- apply model/provider defaults from `brain_layer`
- configure runtime routing/settings needed for the default assistant/team

### What blueprint should drive here
- `recommended_shape` → which assistants/agents exist
- `skills_and_packs` → what gets installed
- `brain_layer` → default provider strategy
- `channels` → Mission Control now, other channels later
- `security_and_access` → approval posture and session-capture allowances

### Important rule
Do not force every optional integration into the initial runtime install.

The first runtime goal is a **working, safe, guided baseline**, not total integration completeness.

---

### Phase 6 — Mission Control activation

Mission Control is the **first operational surface** and must be enabled before external channels become the primary path.

### Activation-ready minimum
A deployment should not be marked `activation_ready` unless:
- Mission Control is running
- Mission Control is reachable from the intended access path
- the default assistant responds there
- the deployment status shown to the customer is coherent
- deferred setup items are visible as guided next steps, not hidden blockers

### Mission Control should surface
- deployment live status
- what was installed
- what still needs approval
- what still needs customer login or OAuth
- which channels/tools can be connected next
- why Tailscale/private access matters when relevant

### Important product rule
Mission Control is not a nice-to-have dashboard bolted on after infra.
It is the **handoff surface** that turns infrastructure into a usable product.

---

### Phase 7 — Post-activation guided setup

After Mission Control is live, the deployment should open an integration/setup queue.

Typical deferred tasks:
- Telegram connection
- WhatsApp/Discord/Slack connection
- Gmail/Calendar OAuth
- CRM token entry or MCP setup
- NotebookLM/browser-session setup
- website/content/CRM specific overlays
- BYO model/provider keys if customer wants that path

### Rule
These should be modeled as **guided setup tasks**, not hidden operator chores.

That keeps the customer journey aligned with Pulkit’s requirement:
- dashboard chat first
- channels and app connections after activation
- less terminal-heavy UX
- more guided assistant-led setup

---

## 8. Contabo API vs manual operator boundaries

Until the Contabo automation is production-ready, the provisioning system needs a clear split.

### 8.1 Safe to automate once credentials/workflow are validated
- read blueprint and validate deployability
- choose instance profile from blueprint mapping
- create a Contabo instance via API
- wait for provisioning status
- fetch server IP/identifier
- run bootstrap scripts
- install Tailscale/runtime/packs
- verify Mission Control readiness
- update deployment status back to backend/dashboard

### 8.2 May remain operator-assisted in the near term
- first-time Contabo credential setup
- image ID lookup/refresh
- SKU/plan mapping changes
- handling Contabo API weirdness or partial failures
- rebuilding after provider-side provisioning issues
- selecting alternate regions when preferred region is unavailable

### 8.3 Must remain manual/customer-driven
- billing/payment confirmation if external system has not confirmed it
- customer approval for approval-gated actions
- customer logins for third-party apps when required
- customer browser/OAuth session establishment where credentials should not be collected by operators
- customer acceptance of optional external-channel connections

---

## 9. Explicit approval and auth boundaries

This needs to be unambiguous.

### 9.1 Infra creation approval boundary
Provisioning a paid dedicated VPS is a meaningful infrastructure cost event.

So infra creation should require that:
- customer has paid or billing is otherwise confirmed
- blueprint is approved enough to deploy
- no internal operator policy says “wait”

If those are not true, the system should not allocate the server.

### 9.2 External write boundary
The blueprint already treats outbound and meaningful external writes as approval-sensitive.

That means a fresh deployment should **not assume** it can:
- send outbound CRM messages
- email contacts
- message prospects
- make meaningful third-party data changes

unless policy and approval state allow it.

### 9.3 Customer-auth boundary
ClawOps should not silently require operators to know the customer’s personal passwords.

For tools requiring customer auth, the intended pattern is:
- Mission Control explains the next step
- customer completes login/OAuth/session capture in a guided way
- runtime reuses the approved session/token where supported

### Examples
Manual/customer-auth steps may include:
- Google login
- CRM private integration token entry
- Slack/Discord app authorization
- NotebookLM session-backed access
- any browser-only tool where user presence is expected

### 9.4 Operator secret boundary
Operator/API secrets required for infrastructure or platform operations should live in approved secret storage/env management, not in markdown docs or tracked customer workspace files.

---

## 10. Proposed blueprint-to-infra mapping

This is the intended mapping for implementation.

| Blueprint field | Provisioning meaning |
|---|---|
| `subscription.deployment_tier` | whether dedicated VPS flow is allowed |
| `infrastructure.provider` | choose Contabo provisioning path |
| `infrastructure.instance_profile` | map to Contabo SKU/plan size |
| `infrastructure.region_preference` | choose preferred region or fallback order |
| `infrastructure.browser_runtime_required` | install Playwright/Chrome baseline |
| `infrastructure.tailscale_required` | require Tailscale enrollment |
| `infrastructure.public_exposure_policy` | determine public vs private service exposure |
| `infrastructure.hardening_profile` | choose baseline hardening recipe |
| `recommended_shape` | select workspaces/agents to install |
| `skills_and_packs` | install exact packs |
| `brain_layer.mode` | choose default provider/runtime config posture |
| `channels.primary_surface` | must enable Mission Control |
| `channels.deferred` | explicitly postpone non-blocking channels |
| `security_and_access.approval_policy` | configure safe default action posture |
| `approvals.pending` | prevent blocked actions from auto-completing |
| `deployment_plan.manual_steps` | surface expected human steps in Mission Control |

### Important implementation note
This mapping is conceptually clear now, but the exact machine-readable installer schema/job format is still to be built.

---

## 11. Failure handling expectations

The final automation layer should treat provisioning as a staged job, not one giant opaque script.

Recommended failure checkpoints:
- Contabo create failed
- Contabo create succeeded but server not reachable
- bootstrap failed
- hardening failed
- Tailscale enrollment failed
- OpenClaw install failed
- Mission Control failed health check
- post-activation setup queue failed to initialize

### Operational rule
Each failure should:
- stop the pipeline at the correct stage
- preserve enough metadata for retry/debug
- not falsely mark the deployment active
- report status back into the deployment record / Mission Control

### Still unresolved
Exact retry, rollback, and idempotency semantics are **not yet frozen**.

That includes questions like:
- when to rebuild vs retry in place
- when to destroy a failed Contabo instance automatically
- how to avoid duplicate server creation
- how to reconcile partial bootstrap state

---

## 12. Minimum verification checklist before handoff

Before a deployment is considered truly ready, verify:

### Infrastructure
- Contabo instance exists and is reachable
- hostname/IP recorded in deployment metadata
- baseline packages installed
- hardening baseline applied

### Access
- operator private access works
- Tailscale connectivity works
- intended customer/private dashboard path works

### Runtime
- OpenClaw gateway installed and running
- required packs/skills installed
- default assistant/team shape matches blueprint

### Mission Control
- Mission Control service is running
- URL/path is correct
- dashboard loads
- default assistant responds
- pending approvals/manual steps are visible

### Product alignment
- activation does not depend on optional external channels
- customer can be guided from Mission Control to the next setup steps

---

## 13. What is known vs unresolved

### 13.1 Known enough to build around now
- dedicated VPS per client is the intended model
- Contabo is the standard provider target
- blueprint is the deployment contract
- Mission Control must be first
- Tailscale is part of the secure access model
- baseline runtime should include Docker, Node, Tailscale, UFW, Playwright/Chrome, OpenClaw prerequisites
- activation should happen before optional channels and tools are fully connected
- auth/approval-sensitive actions must remain explicit

### 13.2 Still unresolved and should be treated honestly
- exact Contabo auth implementation details in our codebase
- exact API payload schema for create/reinstall workflows
- exact Ubuntu image ID and region/SKU catalog mapping
- exact cloud-init payload contents for production use
- exact tailnet/customer-access enrollment pattern
- exact secret distribution mechanism for customer deployments
- exact OpenClaw-to-backend deployment status sync mechanism
- exact destroy/retry/idempotency behavior for failed provisioning jobs
- whether we standardize on fresh builds, snapshots, or hybrid image strategy

---

## 14. Recommended next implementation steps

1. **Lock Contabo credentials and auth test flow**
   - validate token acquisition
   - validate instance list/create against a non-production test target

2. **Define Contabo catalog mapping**
   - Ubuntu image ID
   - region choices
   - instance profiles for Starter/Growth/Scale

3. **Write the minimal cloud-init**
   - keep it small
   - only establish first-boot baseline and handoff readiness

4. **Write bootstrap/hardening scripts**
   - packages
   - firewall
   - Tailscale
   - runtime prerequisites
   - health checks

5. **Define blueprint → job translator**
   - convert `infrastructure`, `recommended_shape`, `skills_and_packs`, and `deployment_plan` into executable stages

6. **Define activation health checks**
   - OpenClaw up
   - Mission Control up
   - default assistant responding

7. **Define approval/auth task surfacing in Mission Control**
   - explicit queue for customer logins, OAuth, tokens, and external-write approvals

---

## 15. Bottom line

The dedicated-VPS provisioning flow is conceptually clear:

- **Blueprint decides what gets deployed**
- **Contabo provides the host**
- **Bootstrap/hardening shape the machine**
- **Tailscale secures access**
- **OpenClaw provides runtime**
- **Mission Control is the first customer surface**
- **Optional integrations happen after activation**
- **Auth and approval boundaries stay explicit**

What is still missing is not the direction.

What is missing is the final implementation detail for:
- Contabo API execution
- SKU/image mapping
- retry/idempotency logic
- customer auth handoff mechanics

Until those are finalized, the provisioning flow should be treated as **blueprint-driven and structured, but still partially operator-assisted**.
