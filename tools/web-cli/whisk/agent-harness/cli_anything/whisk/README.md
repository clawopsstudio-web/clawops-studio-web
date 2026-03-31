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
cli-anything-whisk status --json-output
cli-anything-whisk inspect --json-output
cli-anything-whisk upload-image --file out/reference.jpg --slot 0 --json-output
cli-anything-whisk export-image --output out/exported.jpg --image-index 0 --json-output
cli-anything-whisk generate --prompt "flat illustration of an AI agency team" --screenshot out/whisk.png --download out/whisk.jpg --json-output
cli-anything-whisk generate --file out/reference.jpg --slot 0 --prompt "subject in a neon cyberpunk city" --download out/whisk-ref.jpg --json-output
```

## Notes
- This is a session-dependent web harness, not a native API integration.
- Upload works by targeting Whisk's hidden file inputs by slot index.
- Export works by extracting blob-backed result images from the Whisk page.
