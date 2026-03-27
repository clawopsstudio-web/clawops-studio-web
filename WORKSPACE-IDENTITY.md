# WORKSPACE IDENTITY

## Why this folder is named `arjun`

This OpenClaw workspace directory is still named `arjun` for historical reasons.

It started as an Arjun-oriented workspace early in setup, but it is now effectively the **main ClawOps Studio command workspace**.

## Current truth

- **Filesystem workspace name:** `arjun`
- **Operational identity in main chat:** `Henry`
- **Function:** central ClawOps Studio HQ / command room

## Rule going forward

Treat this workspace as the main company workspace for ClawOps Studio.

### What lives here
- company strategy
- long-term memory
- operating docs
- model policy
- Paperclip/OpenClaw coordination files
- top-level leadership context

### What should not be confused
The folder name does **not** define the active executive identity.

`arjun/` is just the directory label.

## Organizational convention going forward

Use this workspace as:
- **Henry / HQ / company-level operations**

Use subfolders and docs to separate agent responsibilities cleanly instead of relying on the root folder name.

Recommended pattern:
- `docs/` → company docs
- `agents/` → agent role docs and operating notes
- `memory/` → running memory/logs
- `config/` → integration and MCP config
- `.secrets/` → local secret material

## Future cleanup note
If we ever want a true rename from `arjun` to `henry` or `clawops-hq`, do it as a coordinated migration only after checking all OpenClaw references, session bindings, Paperclip integrations, and local automation paths.

For now: **keep the folder name, clean the semantics.**
