# ClawOps Studio — System Documentation
**Last Updated:** April 17, 2026
**Version:** 1.0

---

## Architecture Overview

```
clawops.studio (Vercel) → Landing Page
app.clawops.studio (Vercel) → Auth + Dashboard
VPS (Contabo) → OpenClaw Gateway + Tools
n8n MCP → Google Docs integration
```

### Infrastructure

| Service | URL | Status |
|---|---|---|
| Landing Page | https://clawops.studio | ✅ Live |
| Dashboard | https://app.clawops.studio | ✅ Live |
| OpenClaw Gateway | localhost:18789 | ✅ Running |
| n8n | localhost:5678 | ✅ Running |
| Chrome VNC | localhost:5800 | ✅ Running |
| Mission Control | localhost:8082 | ✅ Running |
| Next.js Dev | localhost:3456 | ✅ Running |

---

## Core Systems

### 1. Authentication (InsForge)

**Backend:** https://4tn9u5bb.us-east.insforge.app
**User:** clawops.studio@gmail.com ✅ Verified

InsForge is the auth provider. All routes protected by JWT session cookie `insforge_session`.

**Auth Flow:**
- Email/Password via `/api/auth/login`
- Google OAuth
- GitHub OAuth
- Session cookie: `insforge_session` (httpOnly, 7 days)

### 2. Database (InsForge)

**Tables:**
- `profiles` — user profile data
- `tasks` — task management
- `vps_instances` — VPS server records
- `user_skills` — integrations (GHL, n8n, Google Workspace, Google Docs)
- `onboarding_configs` — onboarding state
- `agent_configs` — AI agent settings
- `accounts` — billing/plan data

### 3. VPS (Contabo)

**IP:** 161.97.173.78
**Gateway:** localhost:18789 (OpenClaw Gateway)
**OpenClaw:** Telegram @ClawOps_bot (AI agent)
**Tailscale:** Running (VPN network)

---

## Services Running on VPS

| Service | Port | Public | Notes |
|---|---|---|---|
| OpenClaw Gateway | 18789 | Localhost | AI agent + gateway |
| n8n | 5678 | Via nginx | Workflow automation |
| Chrome VNC | 5800 | Via nginx | Browser automation |
| Mission Control | 8082 | Via nginx | Dashboard |
| Next.js | 3456 | Via nginx | Legacy app |
| Nginx | 8081 | Public :80/443 | Reverse proxy |

---

## Cloudflare Tunnel

**Tunnel Name:** clawops-vps
**Tunnel ID:** c602ff34-30d8-49cc-bdf1-4044b12d9e6f
**Status:** Healthy ✅
**CNAME:** c602ff34-30d8-49cc-bdf1-4044b12d9e6f.cfargotunnel.com

---

## Google Workspace

**Email:** clawops.studio@gmail.com ✅ (App Password: rgqm xljs mnyg dtce)
**YouTube OAuth:** Connected
**Google Docs MCP:** Connected via n8n

---

## Vercel Deployments

| Environment | Branch | Status |
|---|---|---|
| Production | main | ✅ Live |
| Preview | insforge-v2 | Latest build |

**Domains:**
- clawops.studio → Production landing page
- app.clawops.studio → Dashboard (InsForge auth)

---

## API Routes

### Auth
- `POST /api/auth/login` — Email/password login
- `GET /api/auth/session` — Get current session
- `POST /api/auth/sessions/current` — Verify JWT token

### Dashboard Data
- `GET /api/dashboard` — Dashboard data (tasks, instances, profile
- `GET /api/instances` — VPS instances list
- `POST /api/instances` — Register VPS instance
- `DELETE /api/instances?id=` — Remove instance
- `GET /api/tasks` — Task list
- `POST /api/tasks` — Create task
- `PATCH /api/tasks` — Update task
- `DELETE /api/tasks?id=` — Delete task

### Tools
- `GET /api/openclaw-status` — VPS health check
- `GET /api/vps/register` — Register VPS
- `GET /api/integrations` — Integration list
- `POST /api/integrations` — Connect integration
- `GET /api/onboarding` — Onboarding state
- `POST /api/onboarding` — Save onboarding

---

## Credentials Summary

| Service | Username | Status |
|---|---|---|
| Gmail (IMAP) | clawops.studio@gmail.com | ✅ Working |
| InsForge | anon key | ✅ Working |
| GitHub | clawopsstudio-web token | ✅ Pushing |
| Vercel | Full API | ✅ Deploying |
| Cloudflare | Token active | ✅ Tunnel running |
| YouTube OAuth | n8n | ✅ Connected |
| Google Docs | n8n | ✅ Connected |
| Telegram | @ClawOps_bot | ✅ Running |

## Known Issues & Notes

- VPS gateway localhost:18789 not publicly accessible. Use nginx at :8081/8082/5678
- Dashboard routes use anon key for InsForge database reads
- Tasks/instances need user_id column in InsForge DB (RLS policy restricts inserts)
- Pricing/docs pages 404 (not routes in current build)
- Guide routes exist: /guides/authentication/, /guides/getting-started/

## Cloudflare DNS Records

| Domain | Type | Value | Proxied |
|---|---|---|---|
| clawops.studio | A | Cloudflare CDN | ✅ |
| app.clawops.studio | A | 216.198.79.1 (Vercel) | No |
| *.clawops.studio | CNAME | Cloudflare tunnel | ✅ |

## Environment Variables (Vercel)
- NEXT_PUBLIC_INSFORGE_BASE_URL = https://4tn9u5bb.us-east.insforge.app
- INSFORGE_ANON_KEY = [Vercel env var]
- INSFORGE_SERVICE_KEY = [Vercel env var]
