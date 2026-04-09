# ClawOps Studio — All Credentials & API Keys
**Last Updated:** 2026-04-06
**Access:** Pulkit only — do not share these

---

## SUPABASE ✅

**Project:** ClawOps Lead Management System
**Project URL:** https://dyzkfmdjusdyjmytgeah.supabase.co
**Project Ref:** dyzkfmdjusdyjmytgeah
**Dashboard:** https://supabase.com/dashboard/project/dyzkfmdjusdyjmytgeah
**Status:** CLI linked, API keys saved, database connected

**API Keys (saved in `/root/.openclaw/workspace/.secrets/supabase.env`):**
- anon key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- service_role key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Personal Access Token:** `sbp_70302bceb8edaefcc6b4c75c195efe115aca1351`
**MCP URL:** `https://mcp.supabase.com/mcp?project_ref=dyzkfmdjusdyjmytgeah` ⚠️ verify project ref — last chars may be swapped (`geha` vs `geah`)

**CLI Commands:**
```bash
export SUPABASE_ACCESS_TOKEN=sbp_70302bceb8edaefcc6b4c75c195efe115aca1351
supabase link --project-ref dyzkfmdjusdyjmytgeah
```

---

## OPENCLAW / VPS

**VPS:** Contabo (vmi3094584.contaboserver.net)
**Public IP:** 89.58.x.x
**Tailscale:** vmi3094584-1.tailec7a72.ts.net

**Gateway:** Port 18789 (loopback only)
**OpenClaw CLI:** `/usr/bin/openclaw`

---

## SERVICES RUNNING ON VPS

| Service | URL | Port | Notes |
|---|---|---|---|
| Landing Page (Next.js) | https://vmi3094584-1.tailec7a72.ts.net/site/ | 3456 | systemctl: clawops-web |
| n8n | https://vmi3094584-1.tailec7a72.ts.net/n8n/ | 5678 | Docker |
| Browser VNC | https://vmi3094584-1.tailec7a72.ts.net/chrome/ | 5800 | Docker: chrome-vnc-new |
| OpenClaw Gateway | https://vmi3094584-1.tailec7a72.ts.net/gateway/ | 18789 | Docker |
| HiClaw | https://vmi3094584-1.tailec7a72.ts.net/hiclaw/ | 18080 | Docker |
| HiClaw Console | https://vmi3094584-1.tailec7a72.ts.net/hiclaw-console/ | 18001 | Docker |
| HiClaw Element | https://vmi3094584-1.tailec7a72.ts.net/hiclaw-element/ | 18088 | Docker |
| Firecrawl | http://localhost:3002 | 3002 | Docker |
| DeerFlow | Port varies | Docker | |
| Nginx | Port 8081 | 8081 | Host system |

---

## AI / MODEL PROVIDERS

| Provider | API Key | Status |
|---|---|---|
| OpenAI | [SAVED IN openclaw.json] | Active |
| Anthropic | [SAVED IN openclaw.json] | Active |
| Gemini | [SAVED IN openclaw.json] | Active |
| OpenRouter | [SAVED IN openclaw.json] | Active |
| Google AI Studio | Authenticated via Chrome | Active |

---

## COMMUNICATION CHANNELS

| Channel | Bot Token / Credentials | Status |
|---|---|---|
| Telegram | [SAVED IN openclaw.json] | Active |

---

## BROWSER / AUTOMATION

| Tool | Auth | Status |
|---|---|---|
| NotebookLM | Chrome cookies (clawops.studio@gmail.com) | Active |
| Google Workspace | Chrome cookies (clawops.studio@gmail.com) | Active |
| cli-anything | Authenticated via Chrome | Active |

---

## SOCIAL / GHL

| Service | Credentials | Status |
|---|---|---|
| GHL | MCP path works | Active |
| Nango OAuth | admin / ClawOps2026! | Dashboard: https://vmi3094584-1.tailec7a72.ts.net/oauth/ |

---

## OTHER SERVICES

| Service | URL | Notes |
|---|---|---|
| ClawhHub | https://clawhub.ai | Skill marketplace |
| smithery.ai | https://smithery.ai | MCP tools |
| Vercel | https://vercel.com | Deploy target |

---

## CONTABO

**Account:** [Pulkit's account]
**API Key:** [Pulkit to add]
**Cloud VPS 10 (Trial Pool):** [Pulkit to add once purchased]

---

## WHAT I STILL NEED FROM PULKIT

- [ ] Contabo API credentials
- [ ] Contabo Cloud VPS 10 for trial pool (when bought)

---

## SECRETS STORAGE

Individual secrets files stored at: `/root/.openclaw/workspace/.secrets/`
(Not committed to Git — .gitignore covers this directory)

## Contabo API
- Client ID: INT-14649324
- Client Secret: s3RBY1JlWLhBz7Mk1iM8dzKrJExq0HNH
- API User: digitalsutraa20@gmail.com
- API Password: ClawOps2026!
- Auth URL: https://auth.contabo.com/auth/realms/contabo/protocol/openid-connect/token
- API Base: https://api.contabo.com/v1

### Available Products (API)
| Tier | Product ID | RAM | vCPU | Disk |
|------|-----------|-----|------|------|
| Trial | V10 | 48GB | 12 | 200GB SSD |
| Pro | V95 | 12GB | 6 | 200GB SSD |
| Team/Agency | V100 | (website only) | | |

### API Capabilities
- Auth: OAuth2 password grant
- Create: POST /v1/compute/instances
- List: GET /v1/compute/instances
- Cancel: POST /v1/compute/instances/{id}/cancel
- Start/Stop/Restart: POST /v1/compute/instances/{id}/{action}
- Secrets: POST /v1/secrets (for root passwords)
