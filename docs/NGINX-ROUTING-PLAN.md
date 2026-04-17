# Nginx Routing Plan — ClawOps Agentic OS

**Updated:** 2026-04-17
**Purpose:** Document new routes for InsForge multi-tenant dashboard + service proxies
**Nginx config file:** `/etc/nginx/sites-enabled/clawops` (server block on `:8081`)

---

## Current State (as of 2026-04-17)

Existing routes on port 8081 (app.clawops.studio via Cloudflare Tunnel):

| Path | Target | Status |
|------|--------|--------|
| `/n8n/` | `:5678` | ✅ Active |
| `/chrome/` | `:5800` | ⚠️ Deprecated (replaced by camoufox) |
| `/dashboard/` | `:8082` | ⚠️ Deprecated (replaced by InsForge) |
| `/hiclaw/` | `:18080` | ✅ Active |
| `/hiclaw-console/` | `:18001` | ✅ Active |
| `/hiclaw-element/` | `:18088` | ✅ Active |
| `/gateway/` | `:18789` | ✅ Active |
| `/site/` | `:3456` (clawops-web) | ⚠️ Deprecated (replaced by Agentic OS) |

---

## New Routes — Full Agentic OS

### Primary Server Block (port 8081)

```nginx
server {
    listen 8081;
    server_name _;

    # ─────────────────────────────────────────────────────────
    # INSFORGE AGENTIC OS — Multi-tenant Dashboard
    # Routes: app.clawops.studio/{slug}/dashboard/*
    # Upstream: InsForge (:3000 or cloud.insforge.dev)
    # ─────────────────────────────────────────────────────────

    # Root redirect to a login/landing page
    location = / {
        return 301 /site/;
    }

    # ─── Auth Middleware ─────────────────────────────────────
    # Before proxying to InsForge, validate JWT cookie/token.
    # Option A (nginx auth_request): validate against InsForge auth endpoint
    # Option B (application-level): InsForge SDK handles JWT validation
    # Option C (recommended): nginx passes X-Account-ID header after validating
    #
    # For now: pass-through with X-Forwarded headers, validate in app.
    # ─────────────────────────────────────────────────────────

    # Multi-tenant account dashboard
    location ~ ^/(?<slug>[a-z0-9-]+)/dashboard/ {
        proxy_pass http://127.0.0.1:3000/$slug/dashboard/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support for real-time features
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }

    # ─── Service Proxies ────────────────────────────────────

    # n8n — Workflow Automation
    location = /n8n {
        return 301 /n8n/;
    }
    location /n8n/ {
        proxy_pass http://127.0.0.1:5678/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Camoufox — Anti-Detection Browser (NEW — replaces /chrome/)
    # Route: /browser/ and /stealth/ both point to camoufox
    location = /browser {
        return 301 /browser/;
    }
    location /browser/ {
        proxy_pass http://127.0.0.1:9377/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    location = /stealth {
        return 301 /stealth/;
    }
    location /stealth/ {
        proxy_pass http://127.0.0.1:9377/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    # OpenClaw Gateway — WebSocket RPC
    location = /gateway {
        return 301 /gateway/;
    }
    location /gateway/ {
        proxy_pass http://127.0.0.1:18789/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }

    # HiClaw — Multi-Agent Hub
    location = /hiclaw {
        return 301 /hiclaw/;
    }
    location /hiclaw/ {
        proxy_pass http://127.0.0.1:18080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # ─── Deprecate Chrome VNC ───────────────────────────────
    # REMOVE after camoufox is fully tested
    # location /chrome/ { ... }
}
```

---

## Route Summary Table (Updated 2026-04-17)

| URL Path | Target Port | Service | Auth | Status |
|----------|-------------|---------|------|--------|
| `/{userId}/dashboard/*` | `:3456` (Next.js) | ClawOps Dashboard | JWT via Next.js middleware | ✅ Active |
| `/{userId}/chrome` | `:5800` | Chrome VNC (Docker) | JWT + Basic Auth fallback | ✅ Active |
| `/{userId}/n8n` | `:5678` | n8n | JWT (auth_request) | ✅ Active |
| `/{userId}/browser` | `:9377` | Camoufox | JWT (auth_request) | ✅ Active |
| `/{userId}/stealth` | `:9377` | Camoufox | JWT (auth_request) | ✅ Active |
| `/{userId}/gateway` | `:18789` | OpenClaw Gateway | JWT (auth_request) | ✅ Active |
| `/{userId}/hiclaw` | `:18080` | HiClaw | JWT (auth_request) | ⚠️ Service down |
| `/__auth/validate-jwt` | `:3456` | JWT validator | Internal only | ✅ Active |

### Old global routes (DEPRECATED — no auth):
| `/n8n/` | `:5678` | n8n | None | ⚠️ Deprecated |
| `/chrome/` | `:5800` | Chrome VNC | None | ⚠️ Deprecated |
| `/gateway/` | `:18789` | OpenClaw Gateway | None | ⚠️ Deprecated |

---

## Auth Middleware Implementation — ACTIVE (2026-04-17)

All scoped tool routes (`/{userId}/chrome`, `/{userId}/n8n`, etc.) are now secured with nginx `auth_request`.

### Auth Flow

```
Browser → Nginx (port 8081) → auth_request /__auth/validate-jwt
                                    ↓
                            Next.js /api/auth/validate-jwt
                            (reads sb-access-token cookie)
                            (validates JWT structurally + expiry + issuer)
                                    ↓
                            200 + X-Auth-User-Id, X-Auth-User-Email, X-Auth-Bearer headers
                                    ↓
                            nginx: auth_request_set captures headers as $auth_user_id, $auth_user_email, $auth_bearer
                                    ↓
                            Proxy to backend service with Authorization / X-Auth-* headers
```

### Internal Auth Endpoint

```nginx
location = /__auth/validate-jwt {
    internal;  # Only accessible via auth_request, not from outside
    proxy_pass http://127.0.0.1:3456/api/auth/validate-jwt;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "0";
    proxy_set_header Cookie $http_cookie;  # Forward original Cookie header
}
```

### Per-Service Auth Strategy

| Service | URL Pattern | Auth Mechanism | Headers Forwarded |
|---------|-----------|--------------|-----------------|
| Chrome VNC | `/{userId}/chrome` | JWT cookie (auth_request) + Basic Auth fallback (`satisfy any`) | `X-Auth-User-Id`, `X-Auth-User-Email` |
| n8n | `/{userId}/n8n` | JWT cookie (auth_request) | `Authorization: Bearer <token>`, `X-Auth-User-*` |
| OpenClaw Gateway | `/{userId}/gateway` | JWT cookie (auth_request) | `Authorization: Bearer <token>`, `X-Auth-User-*` |
| Camoufox | `/{userId}/browser`, `/{userId}/stealth` | JWT cookie (auth_request) | `Authorization: Bearer <token>`, `X-Auth-User-*` |
| HiClaw | `/{userId}/hiclaw` | JWT cookie (auth_request) | `Authorization: Bearer <token>`, `X-Auth-User-*` |

### Chrome VNC Basic Auth

Chrome VNC has no built-in auth. Nginx provides a fallback using `satisfy any`:
- Primary: JWT cookie validated by nginx
- Fallback: Nginx Basic Auth (realm: "ClawOps Chrome VNC")
- Creds file: `/etc/nginx/.htpasswd` (user: `clawops`, password set at install)
- To update: `htpasswd -bc /etc/nginx/.htpasswd <user> <pass>`

### JWT Validation Route

The `/api/auth/validate-jwt` Next.js route validates the Supabase JWT cookie:
- Reads `sb-access-token` cookie
- Decodes JWT payload (base64url decode)
- Verifies: `alg === HS256`, `exp` not expired, `iss === supabase`
- Returns 200 + user info headers on success
- Returns 401 on failure

### Testing Auth

```bash
# Unauthenticated → should return 401
curl -I http://127.0.0.1:8081/testuser/chrome

# Authenticated with JWT cookie → should return 200
curl -I -H "Cookie: sb-access-token=<your-jwt>" http://127.0.0.1:8081/testuser/chrome
```

### Old Route Summary (DEPRECATED)

| Path | Target | Status |
|------|--------|--------|
| `/n8n/` | `:5678` | ⚠️ Deprecated — use `/{userId}/n8n` |
| `/chrome/` | `:5800` | ⚠️ Deprecated — use `/{userId}/chrome` |
| `/dashboard/` | `:8082` | ⚠️ Deprecated — use `/{userId}/dashboard` |
| `/hiclaw/` | `:18080` | ⚠️ Deprecated — use `/{userId}/hiclaw` |
| `/gateway/` | `:18789` | ⚠️ Deprecated — use `/{userId}/gateway` |

---

## Auth Middleware Implementation Notes

### Approach 1 — Application-Level (Recommended for MVP)
InsForge SDK validates JWT on each request. Nginx just passes through headers.
- Pro: Simple, InsForge handles all auth logic
- Con: Unauthenticated requests reach the app before rejection

### Approach 2 — Nginx auth_request (Production)
```nginx
location /n8n/ {
    auth_request /auth/validate;
    proxy_pass http://127.0.0.1:5678/;
    # ...
}

# Hidden auth validation endpoint (points to a lightweight auth service)
location = /auth/validate {
    internal;
    proxy_pass http://127.0.0.1:3000/api/auth/validate-token;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
}
```

### Approach 3 — JWT Validation with Lua/Nginx Module
```nginx
# Requires nginx with lua module or njs
# Validate HS256 JWT inline in nginx
# More complex but zero backend round-trip for auth checks
```

---

## Deprecation Plan

1. **After camoufox is verified working:**
   - Remove `/chrome/` location block from nginx config
   - Update dashboard links from `/chrome/` to `/browser/`

2. **After InsForge dashboard replaces actionagentai dashboard:**
   - Remove `/dashboard/` location block (`:8082`)
   - Update Cloudflare Tunnel to point to InsForge instead

3. **After Agentic OS landing replaces clawops-web:**
   - Remove `/site/` location block (`:3456`)
   - Or keep `/site/` if Agentic OS includes public marketing pages

---

## Rollback Plan

If any new route causes issues, comment out the location block and run:
```bash
nginx -t && systemctl reload nginx
```

For emergency rollback to old Chrome VNC:
```bash
# Uncomment /chrome/ block, reload nginx
nginx -t && systemctl reload nginx
```

---

## Validation Commands

```bash
# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx

# Verify routes
curl -I http://127.0.0.1:8081/n8n/
curl -I http://127.0.0.1:8081/gateway/
curl -I http://127.0.0.1:8081/browser/
curl -I http://127.0.0.1:8081/stealth/

# Expected: HTTP 200 (or 301 redirect to /) for all
```
