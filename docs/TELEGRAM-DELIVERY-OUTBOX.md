# Telegram Delivery Outbox

## Purpose

A single predictable staging area for files that need to be sent back to Pulkit in Telegram direct chat or in Telegram topic lanes.

This is a **workspace convention** and pickup path:
- create/export assets here first
- organize them by lane and date
- then use the available messaging/upload path when the runtime supports file sending

## Root path

`/root/.openclaw/workspaces/arjun/deliveries/telegram/`

## Folder structure

- `shared/` — reusable assets that are not lane-specific
- `hq/` — Henry / main HQ lane / direct founder-facing delivery
- `ryan/` — sales outputs
- `arjun/` — research outputs
- `dev/` — architecture / engineering outputs
- `dave/` — backend / ops outputs
- `kyle/` — frontend / web outputs
- `tyler/` — marketing / SEO outputs

Inside each lane folder, use date buckets:

`YYYY-MM-DD/`

Example:

`/root/.openclaw/workspaces/arjun/deliveries/telegram/hq/2026-03-31/`

## Naming convention

Use clean, human-readable, hyphenated filenames.

Examples:
- `client-onboarding-flow-v1.pdf`
- `sales-outreach-audio-01.ogg`
- `landing-page-review.mp4`
- `research-brief-infographic.png`

## Current staged files

- `deliveries/telegram/hq/2026-03-31/clawops-studio-ai-workforce.pdf`
- `deliveries/telegram/hq/2026-03-31/clawops-studio-ai-workforce-infographic.png`

## Operational rule

For future generated content:
1. generate locally
2. place final artifacts in `deliveries/telegram/<lane>/<YYYY-MM-DD>/`
3. keep source/intermediate files in `out/` or tool-specific folders
4. treat `deliveries/telegram/` as the clean handoff/send-ready area

## Important limitation

This path solves **organization and pickup consistency**.
It does **not by itself create a new Telegram file-upload capability**.
If/when the active runtime exposes native document/audio/video upload into Telegram chats or topic lanes, this outbox is the path to send from.
