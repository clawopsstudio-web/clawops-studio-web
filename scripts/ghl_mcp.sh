#!/usr/bin/env bash
set -euo pipefail

ROOT="/root/.openclaw/workspaces/arjun"
ENV_FILE="${GHL_ENV_FILE:-$ROOT/.secrets/ghl.env}"
TMP_CONFIG="$(mktemp /tmp/mcporter-ghl.XXXXXX.json)"
trap 'rm -f "$TMP_CONFIG"' EXIT

if ! command -v mcporter >/dev/null 2>&1; then
  echo "mcporter is required but not installed" >&2
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing GHL env file: $ENV_FILE" >&2
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

if [[ -z "${GHL_API_KEY:-}" || -z "${GHL_LOCATION_ID:-}" ]]; then
  echo "GHL_API_KEY and GHL_LOCATION_ID must be set in $ENV_FILE" >&2
  exit 1
fi

printf '{"mcpServers":{},"imports":[]}\n' > "$TMP_CONFIG"
mcporter config add ghl --url https://services.leadconnectorhq.com/mcp/ --transport sse \
  --header "Authorization=Bearer ${GHL_API_KEY}" \
  --header "locationId=${GHL_LOCATION_ID}" \
  --persist "$TMP_CONFIG" >/dev/null

call() {
  mcporter --config "$TMP_CONFIG" call "$@"
}

usage() {
  cat <<'EOF'
Usage: scripts/ghl_mcp.sh <command> [args]

Safe read-only commands
  health                    Verify MCP server/tool discovery
  location                  Get current GHL location details
  pipelines                 List pipelines
  contacts [limit]          List contacts (default 10)
  open-opps [limit]         Search open opportunities (default 10)
  triage [limit]            Print Ryan's follow-up queue summary from recent contacts (default 25)

Raw passthrough
  call <server.tool> [k=v]  Run an arbitrary mcporter call against the ephemeral GHL config

Examples
  scripts/ghl_mcp.sh health
  scripts/ghl_mcp.sh contacts 10
  scripts/ghl_mcp.sh triage 25
  scripts/ghl_mcp.sh call ghl.contacts_get-contact path_contactId=abc123
EOF
}

cmd="${1:-}"
case "$cmd" in
  health)
    mcporter --config "$TMP_CONFIG" list
    ;;
  location)
    call ghl.locations_get-location path_locationId="$GHL_LOCATION_ID"
    ;;
  pipelines)
    call ghl.opportunities_get-pipelines query_locationId="$GHL_LOCATION_ID"
    ;;
  contacts)
    limit="${2:-10}"
    call ghl.contacts_get-contacts query_locationId="$GHL_LOCATION_ID" query_limit="$limit"
    ;;
  open-opps)
    limit="${2:-10}"
    call ghl.opportunities_search-opportunity query_location_id="$GHL_LOCATION_ID" query_limit="$limit" query_status=open
    ;;
  triage)
    limit="${2:-25}"
    raw="$(call ghl.contacts_get-contacts query_locationId="$GHL_LOCATION_ID" query_limit="$limit")"
    python3 - <<'PY' "$raw"
import json, sys
payload = json.loads(sys.argv[1])
contacts = payload.get('data', {}).get('contacts', [])
priority_buckets = []
for c in contacts:
    tags = [str(t).strip().lower() for t in (c.get('tags') or [])]
    score = 0
    if 'high priority' in tags:
        score += 3
    if 'follow-up' in tags:
        score += 2
    if 'warm lead' in tags:
        score += 1
    if c.get('type') == 'lead':
        score += 1
    channels = []
    if c.get('phone'):
        channels.append('phone')
    if c.get('email'):
        channels.append('email')
    if c.get('additionalEmails'):
        channels.append('extra-email')
    priority_buckets.append({
        'id': c.get('id'),
        'name': c.get('contactName') or 'Unknown',
        'company': c.get('companyName') or '',
        'type': c.get('type') or '',
        'tags': c.get('tags') or [],
        'channels': channels,
        'score': score,
    })
priority_buckets.sort(key=lambda x: (-x['score'], x['name']))
print('RYAN CONTACT TRIAGE')
print('===================')
for idx, c in enumerate(priority_buckets, 1):
    bucket = 'NOW' if c['score'] >= 4 else 'NEXT' if c['score'] >= 2 else 'WATCH'
    print(f"{idx}. [{bucket}] {c['name']} | {c['company']} | type={c['type']} | tags={', '.join(c['tags']) or '-'} | channels={', '.join(c['channels']) or 'none'} | id={c['id']}")
PY
    ;;
  call)
    shift
    if [[ $# -lt 1 ]]; then
      echo "Missing tool selector" >&2
      exit 1
    fi
    mcporter --config "$TMP_CONFIG" call "$@"
    ;;
  ''|-h|--help|help)
    usage
    ;;
  *)
    echo "Unknown command: $cmd" >&2
    usage
    exit 1
    ;;
esac
