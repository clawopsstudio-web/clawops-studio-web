---
name: google-ai-studio
description: Browser-backed CLI harness for Google AI Studio using an already logged-in Chrome session on the VPS. Use when you need to verify AI Studio access, manage API keys, test prompts with Gemini models, or bootstrap session-dependent AI Studio workflows. The Chrome must already be logged into the Google account with AI Studio access.
---

# google-ai-studio

**Type:** Browser-backed CLI harness  
**Chrome:** Shared VPS Chrome at `http://127.0.0.1:9222` (CDP)  
**Auth:** Depends on Chrome container session staying alive  
**Target URL:** https://aistudio.google.com/apps

Treat this as a session-backed operator harness. For production app integrations, use Google Cloud SDK or AI Studio API credentials instead.

## Use the CLI

```bash
python3 {baseDir}/scripts/google_ai_studio_browser.py <command> [options]
```

## Commands

| Command | Description |
|---------|-------------|
| `auth-check` | Verify AI Studio auth state |
| `open` | Open AI Studio in the browser |
| `status` | Get auth + URL + title for AI Studio |
| `list-tabs` | List active AI Studio / Google accounts tabs |

## Examples

```bash
# Verify AI Studio is accessible
python3 scripts/google_ai_studio_browser.py auth-check --json

# Open AI Studio
python3 scripts/google_ai_studio_browser.py open

# Check status
python3 scripts/google_ai_studio_browser.py status --json

# List open tabs
python3 scripts/google_ai_studio_browser.py list-tabs --json
```

## Install the CLI globally

```bash
chmod +x scripts/google_ai_studio_browser.py
chmod +x scripts/google_ai_studio_browser.js
ln -s "$(pwd)/scripts/google_ai_studio_browser.py" /usr/local/bin/google-ai-studio
```

After installation:
```bash
google-ai-studio auth-check --json
google-ai-studio status --json
google-ai-studio list-tabs --json
```

## Verified actions

- `auth-check` → authenticated ✅ as clawops.studio@gmail.com
- "ClawOps Lead Management System" project visible in AI Studio
- Get API key flow accessible via browser

## Operating rules

- Verify with `auth-check` before claiming AI Studio is connected.
- If Google routes to sign-in or account chooser, treat the session as expired.
- Prefer this for operator/session work. For production use, set up proper API credentials.
- AI Studio UI may change; update selectors in `google_ai_studio_browser.js` if the harness breaks.

## Limitations

- Depends on the shared Chrome session at `http://127.0.0.1:9222`.
- Google AI Studio UI changes can break DOM selectors.
- Not a replacement for Google Cloud SDK or AI Studio REST API with service account credentials.
- Session expires if Chrome container is restarted.
