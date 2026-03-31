# Third-Party Tool Installs

Last updated: 2026-03-31

## Installed now

### NotebookLM
- Repo reference: `external/notebooklm-py`
- Python package installed in isolated venv: `/root/.openclaw/tools/notebooklm-py`
- Exposed CLI: `/usr/local/bin/notebooklm`
- Local OpenClaw skill registered at: `/root/.openclaw/skills/notebooklm/SKILL.md`
- Current state: installed, not authenticated yet
- Next step: run `notebooklm login`

### CLI-Anything
- Repo reference: `external/CLI-Anything`
- Local OpenClaw skill registered at: `/root/.openclaw/skills/cli-anything/SKILL.md`
- Intended scope: Dev-only / targeted use, not global runtime sprawl

### OpenClaw Master Skills
- Repo reference: `external/openclaw-master-skills`
- Registered as catalog/reference only via symlink:
  `/root/.openclaw/skills-catalog/openclaw-master-skills`
- Policy: cherry-pick specific skills only; do not wholesale attach to runtime

## Verification
- `notebooklm --version` => `0.3.4`
- `notebooklm auth check` currently fails because no NotebookLM login has been completed in this runtime yet
