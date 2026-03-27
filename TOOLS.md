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

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
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

### Notion
- Parent page ID: `330be54579ac8064800ff45210674b55`
- Operating doc page: `https://www.notion.so/ClawOps-Studio-Operating-System-330be54579ac81e89021c78c2a227f05`
- Notion MCP config file: `config/mcporter.json`

Add whatever helps you do your job. This is your cheat sheet.
