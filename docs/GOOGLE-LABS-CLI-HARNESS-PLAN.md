# Google Labs CLI Harness Plan

Last updated: 2026-03-31
Owner: Henry
Status: planning before implementation

## Goal

Create reusable CLI-style operator interfaces for selected Google Labs web apps using the already logged-in Chrome/browser session when available.

Initial target apps:
- Whisk
- Flow

Deferred for now:
- Pomelli (not available in current region)

---

## Important truth

These are **web apps**, not classic local applications with a clean backend or stable native CLI.

That means the resulting CLI harnesses will be:
- browser-backed
- session-dependent
- more fragile than API/MCP-based tools

So this is viable for:
- internal operator workflows
- repetitive asset-generation flows
- experimentation and speed

But it should **not** be treated as production-grade architecture until it proves stable over time.

---

## Correct implementation model

For Whisk and Flow, the CLI should be built as:

- a Python Click CLI
- JSON-capable output
- a thin wrapper around browser automation / browser session state
- able to reuse an already-authenticated Chrome session where possible

This is closer to:
- browser automation wrapped as a CLI

than to:
- a true API integration

---

## Recommended build order

### Phase 1 — Whisk first
Whisk is the best first target because:
- narrower scope than Flow
- strong creative value
- likely easier workflow surface
- good testbed for session reuse and export flow

### Phase 2 — Flow second
Flow is likely:
- heavier
- more asynchronous
- more fragile
- more expensive in credits/time

So it should come after Whisk proves the pattern.

### Phase 3 — Pomelli later
Blocked by region for now.
Do not build until geo-access is solved and value is verified.

---

## First CLI scope (minimal viable commands)

## Whisk MVP
Focus on a narrow useful command set first:
- `auth-check` — verify session is usable
- `open` — open Whisk landing/app page
- `create-project` or equivalent if the UI has a stable concept of projects
- `upload-image` — add source image(s)
- `set-prompt` — set optional prompt text
- `generate` — trigger generation
- `list-outputs` — inspect available results
- `download` — save output locally
- `status` — report current session/page/job state

## Flow MVP
Likely commands:
- `auth-check`
- `open`
- `new-project` or equivalent
- `upload-input`
- `set-prompt`
- `generate`
- `list-assets`
- `download`
- `status`

---

## Session strategy

Preferred approach:
- reuse the existing logged-in browser session in the running Chrome environment
- avoid repeated fresh-login automation where possible
- persist captured state in a local controlled file if needed

Caveat:
- session reuse can still break from expiry, geo checks, account switching, or anti-bot friction

So every CLI should include:
- `auth-check`
- clear failure messages
- a path to recover by reopening the app in browser and refreshing session state

---

## Execution-path classification

These apps should be classified as:
- primary path: browser-backed CLI harness
- fallback: manual browser use
- future optional improvement: API/MCP only if a real supported surface appears

Do **not** pretend these belong in the same reliability tier as Gmail API, Calendar API, or GHL MCP.

---

## Proposed file layout

Create harnesses under a workspace-owned area rather than mixing with vendor repos.

Suggested root:
`tools/web-cli/`

Example:

```text
tools/web-cli/
  whisk/
    agent-harness/
      WHISK.md
      setup.py
      cli_anything/
        whisk/
          README.md
          __main__.py
          whisk_cli.py
          core/
          utils/
          tests/
  flow/
    agent-harness/
      FLOW.md
      setup.py
      cli_anything/
        flow/
          README.md
          __main__.py
          flow_cli.py
          core/
          utils/
          tests/
```

---

## Build constraints

### Constraint 1 — real UI inspection required
Before implementing stable commands, inspect:
- page structure
- project concept
- upload flow
- generation trigger
- output/download path
- async completion states

### Constraint 2 — narrow scope first
Do not attempt a huge command surface on day one.
Start with one successful real workflow end-to-end.

### Constraint 3 — tests should reflect reality
Useful real workflow test for Whisk:
- open logged-in session
- upload one source image
- add a simple prompt
- generate one output
- download output
- verify file exists and nonzero size

Useful real workflow test for Flow:
- open logged-in session
- create one tiny generation job
- poll until done
- download result
- verify artifact exists

### Constraint 4 — async jobs matter
Flow especially may need polling and job-state handling.
That should be explicit in CLI design.

---

## Recommended next move

### Immediate
1. Keep the logged-in browser session alive
2. Start with Whisk
3. Inspect the live Whisk UI and identify stable workflow steps
4. Build only the Whisk MVP harness first
5. Validate it on one real output download
6. Then reuse the pattern for Flow

### Not recommended right now
- building Pomelli before geo issue is solved
- pretending this is stable enough to expose broadly to all agents
- creating a giant command surface before one real workflow works

---

## Success definition

### Whisk harness success
- session can be reused
- one real generation flow works end-to-end
- output can be saved locally
- CLI returns machine-readable JSON

### Flow harness success
- one real generation flow works end-to-end
- async completion is handled sanely
- output can be saved locally
- failures return useful diagnostics

---

## Bottom line

Yes, we can build CLIs for these web apps.

But the honest framing is:
- **Whisk/Flow CLI = browser-backed harness around a logged-in web app**
- useful, practical, and worth doing
- but not the same class of reliability as real API/MCP integrations
