# cli-anything-whisk

A browser-backed CLI harness for Google Labs Whisk.

## Install

```bash
cd tools/web-cli/whisk/agent-harness
pip install -e .
```

## Requirements
- Chrome/Chromium already running with DevTools at `http://127.0.0.1:9222`
- Logged-in Google session with Whisk access
- Node Playwright available in the environment

## Commands

```bash
cli-anything-whisk auth-check
cli-anything-whisk open
cli-anything-whisk status --json
cli-anything-whisk inspect --json
cli-anything-whisk generate --prompt "flat illustration of an AI agency team" --screenshot out/whisk.png --download out/whisk.jpg --json
```

## Notes
- This is a session-dependent web harness, not a native API integration.
- Prompt-only generation is supported in the MVP.
- File upload is not wrapped yet.
