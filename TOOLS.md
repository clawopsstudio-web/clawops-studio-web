# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Telegram voice-note format: **Raw OGG**
- OpenAI TTS preferred voice: **alloy**
- Voice style: **male, friendly, soothing**
- Low-latency default: **short replies first, no unnecessary checks, voice only when useful/requested**
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod

### Messaging preferences

- When giving Pulkit text to copy/paste, always put it in a fenced code block for easy copying.

### Browser / auth preferences

- For configuring web apps through browser automation, Pulkit allows using the currently logged-in Gmail/Google session in the browser to sign up or log into services when needed.
- Use this for practical setup work (e.g. Supabase or similar app onboarding) instead of blocking on manual hand-holding when the session is already available.
- Still pause before destructive actions, billing commitments, irreversible org/account changes, or anything that could affect security beyond normal login/setup.
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Paperclip Integration

- **Paperclip URL:** http://100.78.128.98:3100
- **Company:** ClawOps Studio
- **Primary operating identity:** Henry (CEO)
- **Working access pattern:** direct Tailscale URL for Paperclip
- **Current creation workflow:** invite/manual board approval flow, not generic create-agent API
- **Skill path:** ~/.openclaw/skills/paperclip/SKILL.md
- **Secrets location:** keep current API keys and sensitive values in `.secrets/` or local env files, not in this notes file

### Current Org Roles
- Henry → CEO / Chief AI Officer
- Ryan → Sales
- Arjun → Research
- Dev → Founding Engineer
- Dave → DevOps / Backend
- Kyle → Frontend / Web
- Tyler → Marketing / SEO
- Marcus → future Mobile App agent

### Workspace Notes
- This filesystem workspace is still named `arjun`, but operationally it is the main Henry / ClawOps HQ workspace.
- Canonical org/system doc: `docs/CLAWOPS-STUDIO-OPERATING-SYSTEM.md`
- Agent role files: `agents/`
- Workspace identity note: `WORKSPACE-IDENTITY.md`

### Telegram delivery outbox
- Standard staging root for deliverables to send/share later: `deliveries/telegram/`
- Per-lane folders: `hq`, `ryan`, `arjun`, `dev`, `dave`, `kyle`, `tyler`, plus `shared`
- Date folder format: `YYYY-MM-DD`
- Also maintain a `latest/` folder per lane for stable download links.
- Put PDFs, images, audio, and video here when preparing assets for Telegram direct chat or topic lanes.
- Tailnet-only web root for downloads: `https://vmi3094584-1.tailec7a72.ts.net/deliveries/`
- Current staged NotebookLM exports:
  - `deliveries/telegram/hq/2026-03-31/clawops-studio-ai-workforce.pdf`
  - `deliveries/telegram/hq/2026-03-31/clawops-studio-ai-workforce-infographic.png`
  - `deliveries/telegram/hq/latest/clawops-studio-ai-workforce.pdf`
  - `deliveries/telegram/hq/latest/clawops-studio-ai-workforce-infographic.png`

### Notion
- Parent page ID: `330be54579ac8064800ff45210674b55`
- HQ dashboard page: `https://www.notion.so/ClawOps-HQ-Dashboard-330be54579ac81148dacc9246c0bbdd8`
- Operating doc page: `https://www.notion.so/ClawOps-Studio-Operating-System-330be54579ac81e89021c78c2a227f05`
- Agent directory page: `https://www.notion.so/ClawOps-Studio-Agent-Directory-330be54579ac817ab5efeda3c4cc70c7`
- Core databases:
  - Sales Pipeline: `https://www.notion.so/a2f094ae3127483a800c29e20e39707a`
  - Research Queue: `https://www.notion.so/efc14d2482834a98a0116f3d5318884f`
  - Build / Ops Tasks: `https://www.notion.so/7f4cb17f3ab34547a9051341f38d9c13`
- Local Notion link index: `docs/NOTION-INDEX.md`
- Notion MCP config file: `config/mcporter.json`

Add whatever helps you do your job. This is your cheat sheet.
