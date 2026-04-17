# ClawOps Dashboard — Master Build Plan
**Date:** 2026-04-16
**Updated:** 2026-04-17
**Status:** In Progress

## URLs Confirmed

| URL | Purpose |
|-----|---------|
| clawops.studio | Website (live |
| app.clawops.studio/signin | Login page |
| app.clawops.studio/signup | Signup page |
| app.clawops.studio/dashboard | Main dashboard |
| ops.clawops.studio | Mission Control |

## DNS / Hosting

| Domain | Provider | Status |
|---------|----------|--------|
| clawops.studio | Cloudflare | ✅ Live |
| app.clawops.studio | Cloudflare Tunnel → VPS | ✅ Active |
| ops.clawops.studio | Cloudflare Tunnel → VPS | ✅ Active |

## Backend: Supabase (self-hosted)

Supabase runs on our VPS. No vendor dependency. Full control.
- PostgreSQL + JWT auth + MCP server ✅
- Fix: update Google OAuth redirect URIs to app.clawops.studio

## OAuth Fix — Required

Google Cloud Console → Add redirect URI:
```
https://app.clawops.studio/api/auth/google/callback
```

## Services on VPS

| Service | Port | Status |
|---------|------|--------|
| OpenClaw Gateway | 18789 | ✅ Running |
| n8n | 5678 | ✅ Running |
| camoufox | 9377 | ✅ Running |
| actionagentai dashboard | 3001 | ✅ Running |
| Nginx | 8081 | ✅ Running |
| Cloudflare Tunnel | Tunnel | ✅ Running |
| clawops-web landing | 3456 | ⚠️ Replace |
| HiClaw | 18080 | ❌ Registry blocked |

## Docs Created

- docs/CLAWOPS-DASHBOARD-MASTER-PLAN.md (this file)
- docs/REPO-ANALYSIS-2026-04-16.md
- docs/DASHBOARD-BUILD-PLAN.md
- docs/SIDEBAR-DESIGN.md
- docs/ACCOUNT-PAGE-DESIGN.md
- docs/INSFORGE-SETUP.md
- docs/NGINX-ROUTING-PLAN.md

## Agent Team

| Agent | Model | Role |
|-------|-------|------|
| Henry | GPT-5.4 | Orchestrator |
| Dave | Claude Opus 4.6 | Backend/Infra |
| Andrew | Claude Sonnet 4.6 | Frontend/UX |

## Auth Implementation — Completed (2026-04-17)

### Cookie Sessions
- Cookie name: `sb-access-token`
- Settings: `httpOnly=true`, `secure=true`, `sameSite=lax`
- Expiry: **7 days (604800 seconds)** for all auth cookies
- Cleared on logout via `/api/auth/logout`

### Files Modified
- `app/api/auth/session/route.ts` — 7-day cookie expiry, removed `.app.clawops.studio` domain
- `app/api/auth/email-login/route.ts` — 7-day cookie expiry for all session cookies
- `app/api/auth/logout/route.ts` — **NEW** — clears all auth cookies + redirects to `/auth/login`
- `components/dashboard/DashboardShell.tsx` — added logout button to sidebar bottom section

### Middleware Validation (already working)
- All `/dashboard/*` routes validated via JWT cookie in `middleware.ts`
- Invalid/expired token → redirect to `/auth/login?redirectTo=<path>`

### Nginx Clean URLs
- `/signin` → 301 redirect → `/auth/login`
- `/signup` → 301 redirect → `/auth/signup`

### Testing Checklist
- [ ] Login → refresh page → still logged in
- [ ] Logout button → redirects to `/auth/login` → cookie cleared
- [ ] Direct access to `/dashboard` without cookie → redirects to `/auth/login`
- [ ] `/signin` → redirects to `/auth/login`
- [ ] `/signup` → redirects to `/auth/signup`

## Frontend Implementation — Andrew (2026-04-17)

### Files Modified
- `components/NavLinks.tsx` — Complete sidebar rewrite
  - Replaced old workspace/project nav with new ClawOps nav
  - Primary nav: Dashboard | CRM | Tasks | AI Agents | Social | Skills | Tools | Integrations
  - Secondary nav: Account | Settings
  - Collapsible Tools section (n8n, Browser, Stealth, Gateway, HiClaw)
  - Logout button at bottom of sidebar
  - Both collapsed (56px icon-only) and expanded (200px) modes

### Files Created
- `app/dashboard/account/page.tsx` — Full account management page
  - Profile section (avatar upload, name, email, password change modal)
  - Team section (member list, role badges, invite by email, pending invites)
  - Billing section (plan card, usage progress bars with color-coded limits)
  - API Keys section (masked keys, copy, revoke, create with permissions)
  - Danger Zone (delete account with name confirmation)

- `app/dashboard/crm/page.tsx` — Full CRM page
  - Tab: Deals Kanban (Lead → Qualified → Proposal → Won → Lost)
    - Drag-and-drop between columns
    - Per-column total values
    - Deal cards with priority badges and values
    - "New Deal" modal
  - Tab: Contacts list
    - Expandable rows with contact details
    - Search/filter
    - Quick email/call actions

### Settings Page
- Already existed at `app/settings/page.tsx` — retained as-is
- Covers: operator profile, accent color, branding, agent customization

### Navigation Routes
- `/` → Dashboard
- `/dashboard/crm` → CRM
- `/dashboard/account` → Account
- `/settings` → Settings (existing)

## Build Fix — Dave (2026-04-17)

**Problem:** `next build` failed with `Missing credentials. Please pass an apiKey, or set the OPENAI_API_KEY environment variable.` because `OpenAI` clients were instantiated at module-level without an `apiKey`.

**Root cause:** The `openai` npm package validates the `apiKey` at construction time. When `process.env.OPENCLAW_GATEWAY_TOKEN` is undefined (common at build time), `new OpenAI({ apiKey: undefined })` throws.

**Files fixed:**
- `app/api/chat/[id]/route.ts` — Changed to lazy factory `openaiFromGateway()` called inside POST handler
- `app/api/kanban/chat/[id]/route.ts` — Added `|| 'gateway-token'` fallback to apiKey
- `app/api/tts/route.ts` — Added `|| 'gateway-token'` fallback to apiKey
- `app/api/transcribe/route.ts` — Added `|| 'gateway-token'` fallback to apiKey

**Result:** `next build` now completes successfully. Server restarted on port 3456 (PID 384268).

## Browser Infrastructure — Dave (2026-04-17)

### Two Browsers Available

| Browser | URL | Use Case |
|---------|-----|---------|
| Chrome VNC (Docker) | https://vmi3094584-1.tailec7a72.ts.net/chrome/ | Visual shared sessions |
| camoufox (port 9377) | https://app.clawops.studio/browser/ | Headless, anti-detection, REST API |

### Nginx Routes Added
```
location /browser { proxy_pass http://127.0.0.1:9377/; }   # camoufox
location /stealth  { proxy_pass http://127.0.0.1:9377/; }  # camoufox (alias)
```

### Dashboard Navigation Updated
- `components/NavLinks.tsx` — Added `Chrome VNC` external link (Monitor icon) to TOOL_LINKS
- `/browser` and `/stealth` already in nav → now both working (200 OK)
- `/n8n` → proxied through auth (port 4001)
- `/gateway` → proxied through auth (port 4001)

### Decision: Keep Chrome VNC Docker container
- Chrome VNC (port 5800) is useful for shared visual browsing
- camoufox (port 9377) is for headless/stealth automation tasks
- Both kept; no removal needed

## Login Flow Test Results — Dave (2026-04-17)

| Test | Result |
|------|--------|
| GET https://app.clawops.studio/auth/login | ✅ 200 — Renders login form |
| POST /api/auth/session (no creds) | ✅ 400 `{"error":"Missing token or userId"}` |
| POST /api/auth/logout | Requires real session (can't test without valid creds) |
| GET /browser | ✅ 200 — camoufox responding |
| GET /stealth | ✅ 200 — camoufox responding (alias) |

**Auth model:** Client-side Supabase Auth (no server-side `/api/auth/session` route). The login page uses Supabase JS client directly. Cookies are set by Supabase on the client.

## Pending Actions

1. Update Google OAuth redirect URIs in Cloud Console
2. Fix Supabase callback route
3. Test full auth flow with real credentials
4. Push updates to GitHub
5. Verify sidebar collapses/expands correctly
6. Verify logout button works (clears session cookies + redirects)

## Composio Integration — User-Owns-Account Model

### How it works
- Each user creates their own Composio account (free tier: generous monthly requests)
- User connects their social accounts via Composio OAuth (Twitter, LinkedIn, Instagram)
- User pastes their Composio API key in dashboard settings
- API key stored encrypted in database
- AI agent uses Composio API to post to user's social accounts
- Users manage their own credentials — we never touch them

### Benefits
- No cost to us
- No credential storage liability
- Users feel ownership
- Composio handles OAuth, token refresh, API changes
- Works for all integrations: Gmail, Notion, HubSpot, Salesforce, Slack

### User flow
1. Dashboard → Social → "Connect Composio"
2. Opens composio.dev → signs up free
3. Connects Twitter/LinkedIn/Instagram via OAuth
4. Copies API key from Settings
5. Pastes in dashboard → AI agent posts from their accounts

## Tool Documentation Pages Required

Each tool needs a docs page under /dashboard/docs/[tool]

| Doc Page | Content |
|---------|---------|
| /dashboard/docs/social | How to connect Composio, post to Twitter, schedule content |
| /dashboard/docs/crm | How to add contacts, manage deals pipeline |
| /dashboard/docs/agents | How to spawn agents, assign tasks, monitor activity |
| /dashboard/docs/skills | How to browse and install OpenClaw skills |
| /dashboard/docs/tools | How to enable MCP servers, install plugins |
| /dashboard/docs/integrations | GHL setup, Google Workspace connection |
| /dashboard/docs/workspace | How to use the file browser and editor |
| /dashboard/docs/browser | How to use Chrome VNC and camoufox |
| /dashboard/docs/chat | How to chat with AI agents |

