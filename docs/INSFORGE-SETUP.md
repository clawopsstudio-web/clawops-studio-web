# InsForge Setup — Contabo VPS Deployment Plan

**Status:** Documentation only — do not execute yet
**Assumptions:** Contabo VPS (vmi3094584), Ubuntu/Debian, existing PostgreSQL, existing reverse proxy on :8081

---

## What Is InsForge?

InsForge is an AI-optimized Backend-as-a-Service platform:
- **Database:** PostgreSQL 15 with PostgREST auto-generating REST APIs from schema
- **Auth:** JWT (HS256) with bcrypt password hashing, OAuth (Google, GitHub, Microsoft, Discord)
- **Storage:** S3-compatible file storage
- **Edge Functions:** Serverless Deno runtime functions
- **AI:** Built-in OpenRouter integration with streaming support
- **Realtime:** WebSocket pub/sub via channels
- **Access:** SDK (`@insforge/sdk`) + MCP server for AI agent integration

## Architecture

```
AI Agent (OpenClaw/Henry)
  → MCP Server → InsForge API → PostgREST → PostgreSQL
                             → Edge Functions (Deno)
                             → S3 Storage
                             → OpenRouter (AI models)
```

## Key API Patterns

### Auth Flow
```
signUp/signIn(email, password) → JWT (7-day expiry, HS256 signed)
OAuth signIn → Provider → Callback → JWT
Session recovery: short-lived token + httpOnly refresh cookie
```

### Database API (PostgREST auto-generated)
```
GET    /api/database/records/{table}     → Query records
POST   /api/database/records/{table}     → Insert records
PATCH  /api/database/records/{table}     → Update records
DELETE /api/database/records/{table}     → Delete records
```
Query operators: `eq`, `gt`, `gte`, `lt`, `lte`, `like`, `in`, `or`, `and`

### Schema Structure
| Schema      | Tables                              | Access             |
|-------------|-------------------------------------|--------------------|
| `public`    | User-created tables                 | PostgREST (public) |
| `auth`      | users, user_providers, configs      | Internal API only  |
| `storage`   | buckets, objects                    | Internal API only  |
| `ai`        | configs, usage                      | Internal API only  |
| `functions` | definitions                         | Internal API only  |
| `realtime`  | channels, messages                  | Internal API only  |
| `system`    | secrets, audit_logs, migrations     | Internal API only  |

---

## Two Deployment Options

### Option A — InsForge Cloud (Recommended for MVP)

InsForge appears to be primarily offered as a managed cloud service at `insforge.dev`.

**Setup steps:**
1. Create account at insforge.dev
2. Create project → get `PROJECT_ID` + `API_SECRET`
3. Install SDK: `npm install @insforge/sdk`
4. Set env vars in OpenClaw:
   ```
   INSFORGE_PROJECT_ID=...
   INSFORGE_API_SECRET=...
   ```
5. Configure auth (email/password + OAuth providers)
6. Set allowed redirect URLs for OAuth callbacks

**Pros:** Zero ops, managed PostgreSQL + PostgREST, instant setup
**Cons:** External dependency, data hosted externally

---

### Option B — Self-Hosted on Contabo (Full Control)

If InsForge supports self-hosting, the deployment would follow this pattern:

**Prerequisites:**
- PostgreSQL 15 running (or install: `apt install postgresql postgresql-contrib`)
- Node.js 18+ (for InsForge CLI/SDK)
- Docker + Docker Compose (if InsForge ships as containers)
- S3-compatible storage (MinIO on Contabo, or use external S3)

**Step 1 — Clone and Setup**
```bash
cd /root
# Check if InsForge has a self-host option
git clone https://github.com/insforge/insforge  # if available
# or use their CLI
npm install -g @insforge/cli
```

**Step 2 — Database Setup**
```bash
sudo -u postgres psql
CREATE DATABASE insforge;
CREATE USER insforge_admin WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE insforge TO insforge_admin;
\q
```

**Step 3 — Environment Variables**
```bash
# /root/insforge/.env
DATABASE_URL=postgresql://insforge_admin:strong_password@localhost:5432/insforge
JWT_SECRET=$(openssl rand -hex 32)
PORT=3000
STORAGE_BACKEND=local  # or s3
STORAGE_PATH=/root/insforge/storage
```

**Step 4 — Start InsForge**
```bash
cd /root/insforge
npm install
npm run db:migrate
npm start
# Runs on port 3000
```

**Step 5 — Nginx Route**
Add to `/etc/nginx/sites-enabled/clawops` (server block listening :8081):
```nginx
# InsForge API
location /api/insforge/ {
    proxy_pass http://127.0.0.1:3000/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

---

## ClawOps-Specific Multi-Tenant Setup

Based on the dashboard master plan, we need multi-tenant isolation with `account_id` on every table.

**Recommended schema approach:**
```sql
-- Extend InsForge's public schema with our tenant tables
-- These get auto-generated REST APIs via PostgREST

CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    plan TEXT DEFAULT 'trial',
    stripe_customer_id TEXT,
    trial_ends_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies (InsForge/PostgREST handles this):
-- Users can only access rows where account_id matches their JWT claim
```

**JWT Claims for Multi-Tenant Isolation:**
```json
{
  "sub": "user_uuid",
  "account_id": "account_uuid",   ← used for RLS filter
  "role": "owner",
  "email": "user@example.com"
}
```

InsForge's SDK extracts `account_id` from the JWT → PostgREST applies RLS → users only see their own account data.

---

## Integration with ClawOps Agentic OS

**Middleware validates InsForge JWT on every request:**
```
Browser → Nginx (auth middleware) → InsForge validates JWT → Proxy routes forward → Services
                                                              ↓
                                              account_id extracted from JWT
                                              → passed as X-Account-ID header
```

**Next steps for Day 1 implementation:**
1. ✅ Document this plan
2. Create InsForge account (cloud) or install self-hosted
3. Fork ChristianAlmurr dashboard → add InsForge SDK
4. Implement JWT middleware in nginx (auth request to InsForge)
5. Test multi-tenant isolation

---

## Open Questions

1. **Does InsForge officially support self-hosting?** The docs don't show a self-hosted path clearly. If not, use InsForge Cloud for MVP.
2. **What's the InsForge CLI self-host install command?** Not found in docs — need to check their GitHub or Discord.
3. **Can we use an external PostgreSQL (Supabase) as InsForge backend?** Would enable us to use our existing Supabase setup.

**Action:** Check https://github.com/insforge for self-hosting option, or confirm cloud-only and use InsForge Cloud for MVP.
