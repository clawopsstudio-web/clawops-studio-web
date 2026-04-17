# Deployment Blueprint Schema V1

**Last Updated:** 2026-03-31  
**Status:** Draft v1  
**Purpose:** Define the canonical structured object that turns customer signup + onboarding into a deployable ClawOps environment.

---

## 1. Why this exists

ClawOps needs one canonical blueprint object between:
- onboarding/product intake
- backend business state
- provisioning/infrastructure
- runtime/agent installation
- integration setup
- Mission Control activation

Without this blueprint, deployment becomes ad hoc and inconsistent.

The blueprint is the handoff object that says:
> who this customer is, what they bought, what they need, what should be deployed, what should be connected, what should wait, and what needs approval.

---

## 2. Design goals

The blueprint must be:
- **profile-driven** — not every user gets the same team or tools
- **deployment-ready** — useful to backend + provisioning + runtime setup
- **human-readable** — operators should understand it quickly
- **machine-executable** — automation should be able to act on it
- **approval-aware** — manual/auth-sensitive steps must be explicit
- **extensible** — future packs/integrations should fit without breaking the model

---

## 3. Canonical ownership

### Backend owns
- creation
- persistence
- versioning
- lifecycle state
- validation
- deployment-job linkage

### OpenClaw consumes
- runtime/agent/team definition
- skill packs
- channels
- tool integrations
- model/brain settings
- approval posture

### Provisioning layer consumes
- environment target
- infra profile
- install packs
- browser/runtime requirements
- hardening baseline

### Mission Control surfaces
- setup status
- recommendations
- pending approvals
- integration queue
- team shape and active capabilities

---

## 4. Blueprint lifecycle

### Stages
1. `draft` — onboarding still incomplete
2. `recommended` — first system recommendation generated
3. `approved` — human/customer confirmed enough to proceed
4. `provisioning` — infrastructure creation in progress
5. `runtime_installing` — OpenClaw + packs being installed
6. `activation_ready` — Mission Control can go live
7. `active` — deployment is live
8. `needs_revision` — blueprint must be updated before proceeding
9. `archived` — no longer current

---

## 5. High-level schema sections

A deployment blueprint should contain these top-level domains:

1. `meta`
2. `customer`
3. `subscription`
4. `business_profile`
5. `recommended_shape`
6. `brain_layer`
7. `channels`
8. `tools_and_integrations`
9. `skills_and_packs`
10. `infrastructure`
11. `security_and_access`
12. `onboarding_status`
13. `approvals`
14. `deployment_plan`
15. `operations`
16. `notes`

---

## 6. Recommended schema fields

## 6.1 `meta`
Metadata about the blueprint object itself.

```json
{
  "blueprint_id": "bp_...",
  "version": 1,
  "status": "recommended",
  "created_at": "2026-03-31T20:00:00Z",
  "updated_at": "2026-03-31T20:15:00Z",
  "source": "onboarding_flow_v1",
  "workspace_key": "clawops-client-acme",
  "owner": "henry"
}
```

### Purpose
- identity
- lifecycle tracking
- versioning
- operator ownership

---

## 6.2 `customer`
Who this deployment is for.

```json
{
  "customer_id": "cust_...",
  "account_id": "acct_...",
  "name": "Acme Agency",
  "primary_contact": {
    "name": "Jane Doe",
    "email": "jane@acme.com",
    "telegram": "@janedoe"
  },
  "timezone": "Asia/Kolkata",
  "region": "IN",
  "company_size": "small_team"
}
```

### Purpose
Drives:
- timezone defaults
- support expectations
- channel recommendations
- geo/access concerns

---

## 6.3 `subscription`
What they bought.

```json
{
  "plan": "business_ops",
  "billing_status": "paid",
  "deployment_tier": "dedicated_vps",
  "addons": [
    "notebooklm_pack",
    "custom_ghl_pack"
  ]
}
```

### Purpose
Defines entitlement boundaries.

---

## 6.4 `business_profile`
The actual operating context.

```json
{
  "industry": "digital_agency",
  "primary_goals": [
    "sales_followup",
    "content_generation",
    "client_delivery"
  ],
  "team_structure": "founder_led",
  "technical_maturity": "medium",
  "content_heavy": true,
  "crm_in_use": "gohighlevel",
  "workspace_stack": ["gmail", "calendar", "drive", "notion"],
  "channel_preferences": ["mission_control", "telegram"],
  "compliance_or_constraints": ["manual_approval_for_outbound"]
}
```

### Purpose
This is what turns product into a profile-aware recommendation engine.

---

## 6.5 `recommended_shape`
What agent/team setup should exist.

```json
{
  "mode": "small_specialist_pack",
  "agents": [
    {
      "key": "hq",
      "display_name": "HQ Assistant",
      "role": "coordination",
      "required": true
    },
    {
      "key": "sales",
      "display_name": "Sales Assistant",
      "role": "pipeline_and_followup",
      "required": true
    },
    {
      "key": "content",
      "display_name": "Content Assistant",
      "role": "research_and_generation",
      "required": false
    }
  ],
  "rationale": "Customer is a small agency with sales + content needs."
}
```

### Allowed modes
- `solo_assistant`
- `small_specialist_pack`
- `full_team_pack`

---

## 6.6 `brain_layer`
How the deployment thinks.

```json
{
  "mode": "starter",
  "provider_strategy": "default_stack",
  "bring_your_own_enabled": true,
  "hybrid_enabled": true,
  "premium_provider_connected": false,
  "recommended_upgrade_trigger": "better_quality_needed_for_client_work",
  "notes": "Start immediately on default stack; upgrade later if needed."
}
```

### Allowed modes
- `starter`
- `byo`
- `hybrid`

### Purpose
Separates:
- immediate operability
- later provider upgrades
- customer-level model configuration

---

## 6.7 `channels`
Where the assistant/team should operate.

```json
{
  "primary_surface": "mission_control",
  "enabled": ["mission_control"],
  "recommended_next": ["telegram"],
  "deferred": ["whatsapp", "discord", "slack"],
  "constraints": ["do_not_block_activation_on_messaging_setup"]
}
```

### Rule
Mission Control is always first.
External channels should not block activation.

---

## 6.8 `tools_and_integrations`
Business-facing tools, not internal infra.

```json
{
  "recommended": [
    {
      "key": "gmail",
      "priority": "high",
      "path": "api_or_oauth",
      "required_for_activation": false
    },
    {
      "key": "calendar",
      "priority": "medium",
      "path": "api_or_oauth",
      "required_for_activation": false
    },
    {
      "key": "gohighlevel",
      "priority": "high",
      "path": "mcp",
      "required_for_activation": false
    },
    {
      "key": "notebooklm",
      "priority": "medium",
      "path": "browser_session_harness",
      "required_for_activation": false
    }
  ],
  "internal_hidden": ["supabase", "vercel", "contabo"],
  "deferred": ["flow", "whisk", "pomelli"],
  "notes": "Recommend NotebookLM for content/research-heavy users."
}
```

### Rule
Only customer-facing tools belong in the visible recommendation layer.

---

## 6.9 `skills_and_packs`
Reusable installable capability packs.

```json
{
  "core_packs": [
    "mission-control-baseline",
    "approval-safe-actions",
    "integration-guide"
  ],
  "role_packs": [
    "sales-ops-pack",
    "content-research-pack"
  ],
  "integration_packs": [
    "ghl-pack",
    "google-workspace-pack"
  ],
  "browser_harness_packs": [
    "notebooklm-pack"
  ],
  "custom_client_overlays": []
}
```

### Strategic note
This section becomes the bridge to the future private skill/harness catalog and later marketplace/import layer.

---

## 6.10 `infrastructure`
Where and how it gets deployed.

```json
{
  "provider": "contabo",
  "deployment_model": "dedicated_vps",
  "region_preference": "eu_or_in_based_on_customer",
  "instance_profile": "standard_small",
  "browser_runtime_required": true,
  "tailscale_required": true,
  "public_exposure_policy": "minimal",
  "hardening_profile": "baseline_v1"
}
```

### Rule
Contabo is the intended standard provisioning target.
This field must be explicit even if provisioning remains partially manual today.

---

## 6.11 `security_and_access`
Access posture.

```json
{
  "tailscale_access": {
    "required": true,
    "customer_guided_setup": true,
    "mobile_setup_recommended": true
  },
  "browser_session_capture": {
    "allowed_for_supported_tools": true,
    "guided_by_assistant": true
  },
  "approval_policy": {
    "outbound_messages": "require_approval",
    "meaningful_external_writes": "require_approval"
  }
}
```

### Rule
Security-sensitive actions must be represented in blueprint policy, not buried in operator memory.

---

## 6.12 `onboarding_status`
What has been completed so far.

```json
{
  "profile_complete": true,
  "billing_complete": true,
  "assistant_shape_confirmed": true,
  "brain_mode_confirmed": false,
  "mission_control_ready": false,
  "tool_connections_started": false,
  "tailscale_guidance_shown": false,
  "notebooklm_guidance_shown": false
}
```

### Purpose
Gives Mission Control a clean setup queue.

---

## 6.13 `approvals`
Things that must be explicitly approved.

```json
{
  "pending": [
    {
      "type": "external_write",
      "label": "Send outbound follow-up through CRM",
      "required_from": "customer"
    }
  ],
  "waived": [],
  "policy_version": "approval_v1"
}
```

---

## 6.14 `deployment_plan`
Actual install/provisioning steps.

```json
{
  "phase_sequence": [
    "server_bootstrap",
    "runtime_install",
    "agent_pack_install",
    "mission_control_enable",
    "integration_queue_open",
    "post_deploy_checks"
  ],
  "blocking_steps": [
    "billing_complete"
  ],
  "manual_steps": [
    "customer_logs_into_google_if_needed",
    "customer_connects_tailscale_if_private_access_required"
  ],
  "verification_required": [
    "mission_control_chat_live",
    "default_assistant_responding",
    "core_pack_installed"
  ]
}
```

---

## 6.15 `operations`
Post-launch operating defaults.

```json
{
  "heartbeat_mode": "selective",
  "reporting_surface": "mission_control",
  "escalation_surface": "hq_lane",
  "media_delivery_mode": "tailscale_link_outbox",
  "maintenance_window_policy": "operator_defined"
}
```

---

## 6.16 `notes`
Freeform but structured enough for operators.

```json
{
  "operator_notes": [
    "Content-heavy account; prioritize NotebookLM onboarding.",
    "Do not block activation waiting on Telegram setup."
  ],
  "customer_promises": [
    "Start in Mission Control first.",
    "External channels can be added later."
  ]
}
```

---

## 7. Canonical example blueprint

```json
{
  "meta": {
    "blueprint_id": "bp_acme_001",
    "version": 1,
    "status": "approved",
    "created_at": "2026-03-31T20:00:00Z",
    "updated_at": "2026-03-31T20:30:00Z",
    "source": "onboarding_flow_v1",
    "workspace_key": "acme-workspace",
    "owner": "henry"
  },
  "customer": {
    "customer_id": "cust_acme",
    "account_id": "acct_acme",
    "name": "Acme Agency",
    "primary_contact": {
      "name": "Jane Doe",
      "email": "jane@acme.com",
      "telegram": "@janedoe"
    },
    "timezone": "Asia/Kolkata",
    "region": "IN",
    "company_size": "small_team"
  },
  "subscription": {
    "plan": "business_ops",
    "billing_status": "paid",
    "deployment_tier": "dedicated_vps",
    "addons": ["notebooklm_pack"]
  },
  "business_profile": {
    "industry": "digital_agency",
    "primary_goals": ["sales_followup", "content_generation"],
    "team_structure": "founder_led",
    "technical_maturity": "medium",
    "content_heavy": true,
    "crm_in_use": "gohighlevel",
    "workspace_stack": ["gmail", "calendar", "drive"],
    "channel_preferences": ["mission_control", "telegram"],
    "compliance_or_constraints": ["manual_approval_for_outbound"]
  },
  "recommended_shape": {
    "mode": "small_specialist_pack",
    "agents": [
      {"key": "hq", "display_name": "HQ Assistant", "role": "coordination", "required": true},
      {"key": "sales", "display_name": "Sales Assistant", "role": "pipeline_and_followup", "required": true},
      {"key": "content", "display_name": "Content Assistant", "role": "research_and_generation", "required": false}
    ],
    "rationale": "Small agency with sales and content workload."
  },
  "brain_layer": {
    "mode": "starter",
    "provider_strategy": "default_stack",
    "bring_your_own_enabled": true,
    "hybrid_enabled": true,
    "premium_provider_connected": false,
    "recommended_upgrade_trigger": "quality_or_volume_growth",
    "notes": "Start fast, upgrade later."
  },
  "channels": {
    "primary_surface": "mission_control",
    "enabled": ["mission_control"],
    "recommended_next": ["telegram"],
    "deferred": ["whatsapp", "discord"],
    "constraints": ["do_not_block_activation_on_messaging_setup"]
  },
  "tools_and_integrations": {
    "recommended": [
      {"key": "gmail", "priority": "high", "path": "api_or_oauth", "required_for_activation": false},
      {"key": "calendar", "priority": "medium", "path": "api_or_oauth", "required_for_activation": false},
      {"key": "gohighlevel", "priority": "high", "path": "mcp", "required_for_activation": false},
      {"key": "notebooklm", "priority": "medium", "path": "browser_session_harness", "required_for_activation": false}
    ],
    "internal_hidden": ["supabase", "vercel", "contabo"],
    "deferred": [],
    "notes": "NotebookLM recommended because content output matters."
  },
  "skills_and_packs": {
    "core_packs": ["mission-control-baseline", "approval-safe-actions", "integration-guide"],
    "role_packs": ["sales-ops-pack", "content-research-pack"],
    "integration_packs": ["ghl-pack", "google-workspace-pack"],
    "browser_harness_packs": ["notebooklm-pack"],
    "custom_client_overlays": []
  },
  "infrastructure": {
    "provider": "contabo",
    "deployment_model": "dedicated_vps",
    "region_preference": "closest_supported_region",
    "instance_profile": "standard_small",
    "browser_runtime_required": true,
    "tailscale_required": true,
    "public_exposure_policy": "minimal",
    "hardening_profile": "baseline_v1"
  },
  "security_and_access": {
    "tailscale_access": {
      "required": true,
      "customer_guided_setup": true,
      "mobile_setup_recommended": true
    },
    "browser_session_capture": {
      "allowed_for_supported_tools": true,
      "guided_by_assistant": true
    },
    "approval_policy": {
      "outbound_messages": "require_approval",
      "meaningful_external_writes": "require_approval"
    }
  },
  "onboarding_status": {
    "profile_complete": true,
    "billing_complete": true,
    "assistant_shape_confirmed": true,
    "brain_mode_confirmed": false,
    "mission_control_ready": false,
    "tool_connections_started": false,
    "tailscale_guidance_shown": false,
    "notebooklm_guidance_shown": false
  },
  "approvals": {
    "pending": [],
    "waived": [],
    "policy_version": "approval_v1"
  },
  "deployment_plan": {
    "phase_sequence": [
      "server_bootstrap",
      "runtime_install",
      "agent_pack_install",
      "mission_control_enable",
      "integration_queue_open",
      "post_deploy_checks"
    ],
    "blocking_steps": ["billing_complete"],
    "manual_steps": [
      "customer_logs_into_google_if_needed",
      "customer_connects_tailscale_if_private_access_required"
    ],
    "verification_required": [
      "mission_control_chat_live",
      "default_assistant_responding",
      "core_pack_installed"
    ]
  },
  "operations": {
    "heartbeat_mode": "selective",
    "reporting_surface": "mission_control",
    "escalation_surface": "hq_lane",
    "media_delivery_mode": "tailscale_link_outbox",
    "maintenance_window_policy": "operator_defined"
  },
  "notes": {
    "operator_notes": [
      "Prioritize NotebookLM onboarding after activation.",
      "Do not block deployment waiting for Telegram."
    ],
    "customer_promises": [
      "Mission Control first.",
      "Messaging channels can be added later."
    ]
  }
}
```

---

## 8. Validation rules

A V1 blueprint is considered valid only if:
- `meta.status` exists
- `customer` exists
- `subscription.billing_status` exists
- `recommended_shape.mode` exists
- `brain_layer.mode` exists
- `channels.primary_surface` is set
- `infrastructure.provider` is set
- `deployment_plan.phase_sequence` is non-empty

A V1 blueprint cannot mark `activation_ready` or `active` unless:
- billing is complete
- infrastructure target is defined
- Mission Control is part of the deployment
- at least one agent or assistant exists

---

## 9. Implementation notes

### Backend
This blueprint should become a stored object in the product database and should be versioned.

### Frontend
Onboarding should progressively build or refine this object.

### Mission Control
Should display a human-friendly interpretation of the blueprint:
- what you got
- what is next
- what still needs login/approval
- what can be added later

### Provisioning
Should convert blueprint sections into infra/runtime jobs.

### Catalog / marketplace future
`skills_and_packs` is the clean bridge to the future private skill/harness repo, curated install catalog, and later marketplace/import system.

---

## 10. Summary

The deployment blueprint is the contract between sales/onboarding promises and actual system deployment.

It ensures ClawOps can move from:
- vague idea of what the customer wants

to:
- explicit deployable system definition

This schema should now be treated as the canonical basis for:
- onboarding output
- deployment planning
- install packs
- assistant/team recommendation logic
- Mission Control setup flow
- future Contabo automation and catalog-based installs
