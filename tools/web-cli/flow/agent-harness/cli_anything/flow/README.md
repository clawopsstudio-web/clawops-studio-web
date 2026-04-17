# cli-anything-flow

A browser-backed CLI harness for Google Labs Flow.

## Install

```bash
cd tools/web-cli/flow/agent-harness
pip install -e .
```

## Commands

```bash
cli-anything-flow auth-check --json-output
cli-anything-flow open --json-output
cli-anything-flow status --json-output
cli-anything-flow inspect --json-output
```

## Notes
- This is a session-dependent web harness.
- Generation/export is intentionally deferred until the live Flow UI is mapped cleanly.
