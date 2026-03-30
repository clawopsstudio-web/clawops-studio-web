# GHL SETUP — Safe Local Path

Purpose: connect the installed `ghl-crm` skill without pasting secrets into chat.

Installed skill path:
- `/root/.openclaw/workspace/skills/ghl-crm`

---

## Required values

You need exactly these two values:

- `GHL_API_KEY`
  - GoHighLevel Private Integration Token (API v2)
- `GHL_LOCATION_ID`
  - the sub-account / location ID

---

## Where to get them

### GHL_API_KEY
Inside the target GHL sub-account:
1. Go to **Settings**
2. Go to **Integrations**
3. Open **Private Integrations**
4. Create or select an integration
5. Enable the scopes you need
6. Copy the token

### GHL_LOCATION_ID
Get it from either:
- **Settings → Business Info**
- or the sub-account context / URL

---

## Minimum practical scopes

For ClawOps, enable access for:
- Contacts
- Opportunities / Pipelines
- Conversations
- Calendars / Appointments
- Workflows

If scope names differ slightly in the GHL UI, choose the closest full read/write CRM access for those resource groups.

---

## Safe local env file

Do not paste secrets into chat.

Preferred local file:
- `/root/.openclaw/workspaces/arjun/.secrets/ghl.env`

Example contents:

```bash
export GHL_API_KEY='REPLACE_ME'
export GHL_LOCATION_ID='REPLACE_ME'
```

Protect it:

```bash
mkdir -p /root/.openclaw/workspaces/arjun/.secrets
chmod 700 /root/.openclaw/workspaces/arjun/.secrets
chmod 600 /root/.openclaw/workspaces/arjun/.secrets/ghl.env
```

---

## Load the env locally

```bash
source /root/.openclaw/workspaces/arjun/.secrets/ghl.env
```

---

## First harmless tests

### Test 1 — list pipelines

```bash
source /root/.openclaw/workspaces/arjun/.secrets/ghl.env && \
python3 /root/.openclaw/workspace/skills/ghl-crm/scripts/ghl_api.py pipelines list
```

### Test 2 — list contacts

```bash
source /root/.openclaw/workspaces/arjun/.secrets/ghl.env && \
python3 /root/.openclaw/workspace/skills/ghl-crm/scripts/ghl_api.py contacts list --limit 10
```

These are safe read tests and should be the first check.

---

## Read-only MCP status

Verified from this VPS:
- `locations_get-location` → success
- `opportunities_get-pipelines` → success
- `contacts_get-contacts` → success
- `opportunities_search-opportunity` → success (first open-opportunity search returned zero results)

Current conclusion:
- raw REST/API path is still not the preferred path here because it returned Cloudflare 403
- MCP is the working path for GHL from this machine
- the safest first practical workflow is contact triage / follow-up review, not opportunity-stage automation yet

## Safe reusable ops path

Use the local wrapper:

```bash
cd /root/.openclaw/workspaces/arjun
scripts/ghl_mcp.sh health
scripts/ghl_mcp.sh contacts 10
scripts/ghl_mcp.sh triage 25
```

This path:
- reads secrets from local `.secrets/ghl.env`
- builds an ephemeral MCP config in `/tmp`
- avoids committing secret-bearing server entries into tracked config
- stays read-only by default

## After connection works

Next useful sequence:
1. inspect pipelines ✅
2. inspect current contacts/opportunities ✅
3. run contact triage / follow-up review ✅
4. decide first real workflow
   - new lead creation
   - pipeline movement
   - follow-up drafting
   - appointment workflow

---

## Important

The installed script uses:
- Base URL: `https://services.leadconnectorhq.com`
- Header: `Authorization: Bearer <GHL_API_KEY>`
- Header: `Version: 2021-07-28`

So if auth fails, the likely causes are:
- bad token
- wrong sub-account/location ID
- missing scopes on the Private Integration
