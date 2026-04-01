---
name: google-workspace
description: Browser-backed CLI harness for Google Workspace (Gmail, Calendar, Drive, Docs, Sheets). Use when you need to check or act on Google Workspace surfaces using an already logged-in Chrome session on the VPS. Verify auth, open services, or bootstrap session-dependent automation without claiming there is a stable API integration.
---

# google-workspace

**Type:** Browser-backed CLI harness  
**Chrome:** Shared VPS Chrome at `http://127.0.0.1:9222` (CDP)  
**Auth:** Depends on Chrome container session staying alive  

Treat this as a session-backed operator tool, not a durable API integration.

## Use the CLI

```bash
python3 {baseDir}/scripts/google_workspace_browser.py <command> [options]
```

## Commands

| Command | Description |
|---------|-------------|
| `auth-check --service <name>` | Verify auth state for a service |
| `open --service <name>` | Open a Google Workspace service in the browser |
| `status --service <name>` | Get auth + URL + title for a service |
| `list-tabs` | List active Google tabs in the browser |

## Services

Supported `--service` values:
- `gmail`
- `calendar`
- `drive`
- `docs`
- `sheets`

## Examples

```bash
# Verify Gmail is accessible
python3 scripts/google_workspace_browser.py auth-check --service gmail --json

# Open Google Calendar
python3 scripts/google_workspace_browser.py open --service calendar

# Check Drive auth state
python3 scripts/google_workspace_browser.py status --service drive --json

# List all open Google tabs
python3 scripts/google_workspace_browser.py list-tabs --json
```

## Install the CLI globally

```bash
chmod +x scripts/google_workspace_browser.py
ln -s "$(pwd)/scripts/google_workspace_browser.py" /usr/local/bin/google-workspace
```

After installation:
```bash
google-workspace auth-check --service gmail --json
google-workspace auth-check --service calendar --json
google-workspace auth-check --service drive --json
google-workspace auth-check --service docs --json
google-workspace auth-check --service sheets --json
```

## Operating rules

- Assume Chrome is already running with CDP at `http://127.0.0.1:9222` unless overridden with `--cdp-url`.
- Use `auth-check` before claiming a Google surface is connected.
- Use `list-tabs` to understand current browser state before opening new tabs.
- Google redirects to account-chooser or sign-in = session expired, not browser broken.
- Do NOT send outbound email or change customer-facing Google data without explicit approval.

## Output contract

Use `--json` when another tool or agent will consume the result.

## Limitations

- Browser/session dependent.
- Can be invalidated by Google account security rotation.
- UI changes in Google Workspace can break selectors.
- Not a replacement for proper Google APIs or OAuth-backed integrations.
