# Postiz Skill for OpenClaw

Install and manage Postiz (open-source social media scheduler) with proper networking.

## Quick Start

```bash
# Install Postiz
bash /root/.openclaw/skills/postiz/scripts/install-postiz.sh

# Troubleshoot issues
bash /root/.openclaw/skills/postiz/scripts/troubleshoot.sh

# Auto-fix common issues
TAILSCALE_FQDN="yourhost.ts.net" bash /root/.openclaw/skills/postiz/scripts/troubleshoot.sh auto-fix
```

## The Cookie Domain Issue

Postiz sets cookies with `Domain=.ts.net`. Browsers reject this because `.ts.net`
is a public suffix (similar to `.com`, `.net`).

**Symptom:** Login page reloads but user stays logged out.

**Fix:** The installer automatically configures nginx to rewrite the cookie domain.

## Files

```
postiz/
├── SKILL.md                 # Main skill documentation
├── README.md                # This file
├── scripts/
│   ├── install-postiz.sh    # Main installer
│   └── troubleshoot.sh      # Troubleshooting & auto-fix
└── docs/
    └── TROUBLESHOOTING.md   # Detailed troubleshooting guide
```

## Requirements

- Docker + Docker Compose
- Tailscale (for HTTPS access)
- nginx
- Port 4007 available

## Access After Install

- Local: `http://localhost:4007`
- HTTPS: `https://YOUR_TAILSCALE_SUBDOMAIN.ts.net`

## Common Issues

| Issue | Solution |
|-------|----------|
| Login doesn't work | Run `troubleshoot.sh auto-fix` |
| Container won't start | `docker logs postiz` |
| Tailscale not working | `tailscale serve status` |

## For Developers

To update this skill:

1. Edit files in `/root/.openclaw/skills/postiz/`
2. Test changes
3. Commit to GitHub:
   ```bash
   cd /root/.openclaw/skills/postiz
   git add .
   git commit -m "Update postiz skill"
   git push
   ```
