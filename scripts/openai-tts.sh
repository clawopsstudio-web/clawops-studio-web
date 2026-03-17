#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  openai-tts.sh "Text to speak" [--out /path/to/out.opus] [--voice onyx] [--model gpt-4o-mini-tts] [--format opus] [--instructions "Speak deeply and confidently"]

Defaults:
  --out ./tts-output.opus
  --voice onyx
  --model gpt-4o-mini-tts
  --format opus
  --instructions "Speak in a deep, confident, direct tone."

Auth resolution order:
  1. OPENAI_API_KEY env
  2. ~/.openclaw/openclaw.json -> skills.entries.openai-whisper-api.apiKey
  3. ~/.openclaw/openclaw.json -> skills.entries.openai-image-gen.apiKey
EOF
}

TEXT=""
OUT="./tts-output.opus"
VOICE="onyx"
MODEL="gpt-4o-mini-tts"
FORMAT="opus"
INSTRUCTIONS="Speak in a deep, confident, direct tone."

while [[ $# -gt 0 ]]; do
  case "$1" in
    --out)
      OUT="$2"; shift 2 ;;
    --voice)
      VOICE="$2"; shift 2 ;;
    --model)
      MODEL="$2"; shift 2 ;;
    --format)
      FORMAT="$2"; shift 2 ;;
    --instructions)
      INSTRUCTIONS="$2"; shift 2 ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      if [[ -z "$TEXT" ]]; then TEXT="$1"; shift; else echo "Unexpected arg: $1" >&2; exit 1; fi ;;
  esac
done

if [[ -z "$TEXT" ]]; then
  usage >&2
  exit 1
fi

resolve_key() {
  if [[ -n "${OPENAI_API_KEY:-}" ]]; then
    printf '%s' "$OPENAI_API_KEY"
    return 0
  fi
  node <<'NODE'
const fs = require('fs');
const p = '/root/.openclaw/openclaw.json';
try {
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const key = j?.skills?.entries?.['openai-whisper-api']?.apiKey || j?.skills?.entries?.['openai-image-gen']?.apiKey || '';
  process.stdout.write(key);
} catch (e) {
  process.stdout.write('');
}
NODE
}

API_KEY="$(resolve_key)"
if [[ -z "$API_KEY" ]]; then
  echo "No OpenAI API key found via OPENAI_API_KEY or ~/.openclaw/openclaw.json skill config." >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
TMP_JSON="$(mktemp)"
python3 - <<PY > "$TMP_JSON"
import json
print(json.dumps({
  "model": "$MODEL",
  "voice": "$VOICE",
  "input": "$TEXT",
  "response_format": "$FORMAT",
  "instructions": "$INSTRUCTIONS"
}))
PY

curl -fsSL https://api.openai.com/v1/audio/speech \
  -H "Authorization: Bearer ${API_KEY}" \
  -H 'Content-Type: application/json' \
  --data-binary @"$TMP_JSON" \
  -o "$OUT"

rm -f "$TMP_JSON"
echo "$OUT"
