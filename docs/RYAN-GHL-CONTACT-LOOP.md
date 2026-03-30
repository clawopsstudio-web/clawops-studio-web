# RYAN — GHL CONTACT TRIAGE + FOLLOW-UP LOOP

Purpose: define Ryan's first real GHL operating workflow using the validated MCP path.

Status: read-only by default
Owner: Ryan / Henry
Priority: P0

---

## Why this is the first workflow

Verified state from GHL:
- location lookup works
- pipelines lookup works
- contacts lookup works
- opportunity search works
- first open-opportunity search returned zero open opportunities

Conclusion:
- Ryan should start with **contact triage / follow-up review**
- do **not** center the first workflow on pipeline-stage automation yet

---

## Safe execution path

Use the local wrapper script:

```bash
cd /root/.openclaw/workspaces/arjun
scripts/ghl_mcp.sh health
scripts/ghl_mcp.sh contacts 10
scripts/ghl_mcp.sh triage 25
```

How it stays safe:
- reads credentials from local `.secrets/ghl.env`
- builds an ephemeral MCP config in `/tmp`
- does not commit secrets into tracked config files
- defaults to read-only checks

---

## Ryan's first operating loop

### Step 1 — Pull current queue

```bash
cd /root/.openclaw/workspaces/arjun
scripts/ghl_mcp.sh triage 25
```

This classifies recent contacts into:
- **NOW** — high-priority / follow-up contacts with reachable channel(s)
- **NEXT** — warm leads or follow-up candidates
- **WATCH** — lower-signal records not worth immediate attention

### Step 2 — Review only reachable leads first

Prioritize records with:
1. `high priority` tag
2. `follow-up` tag
3. `warm lead` tag
4. contact type = `lead`
5. at least one reachable channel (`phone`, `email`)

### Step 3 — Create a short follow-up queue

Ryan should produce a concise operational summary:
- who needs follow-up now
- why they are in queue
- which channel is available
- what the next action should be

Format:
- **Now:** 3-5 best contacts
- **Next:** 3-5 secondary contacts
- **Blocked:** contacts with no usable channel or unclear state

### Step 4 — Draft only, no auto-send

Until outbound behavior is explicitly approved and tested:
- draft follow-up copy only
- do not send messages automatically
- do not mutate GHL records automatically

### Step 5 — Upgrade later

Once real opportunity volume exists, expand Ryan's workflow into:
- opportunity review
- stage movement suggestions
- missed-follow-up detection
- task creation / reminders

---

## Definition of done for this workflow

Ryan's GHL path can be marked ✅ only when all are true:
- Ryan can run the safe MCP wrapper path reliably
- Ryan can produce a useful follow-up queue from live contacts
- one real lane task is completed using this workflow
- Mission Control source files are updated to reflect the live state
