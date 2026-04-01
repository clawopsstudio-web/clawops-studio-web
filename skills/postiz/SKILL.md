---
name: postiz
description: >
  Install, configure, and manage Postiz (open-source social media scheduler) with proper
  Tailscale networking and cookie domain fixes. Use when setting up Postiz for social
  media management and publishing. Handles Docker deployment, nginx reverse proxy,
  Tailscale HTTPS routing, and common troubleshooting.
---

# Postiz Skill

Postiz is an open-source social media scheduling tool that can be deployed on your own
VPS for managing social media accounts (X/Twitter, LinkedIn, Facebook, Instagram, etc.).

## Prerequisites

- Docker and Docker Compose installed
- Tailscale installed and authenticated
- nginx available on the host
- Port 4007 available (or customize in script)
- A Tailscale subdomain (e.g., `vmi3094584-1.tailec7a72.ts.net`)

## Quick Install

```bash
# Run the installer
bash /root/.openclaw/skills/postiz/scripts/install-postiz.sh

# Or with custom subdomain
TAILSCALE_FQDN="your-subdomain.ts.net" bash /root/.openclaw/skills/postiz/scripts/install-postiz.sh
```

## Architecture

```
User → Tailscale HTTPS → nginx (port 8081) → Postiz (port 4007)
                                      ↓
                              Cookie Domain Fix (critical!)
```

## Cookie Domain Fix (IMPORTANT!)

**This is the #1 issue that breaks Postiz login.**

Postiz sets cookies with `Domain=.ts.net` which browsers reject because `.ts.net`
is a public suffix (similar to `.com`, `.net`, etc.).

**The fix:** nginx must rewrite the cookie domain using `proxy_cookie_domain`.

The install script handles this automatically. If you set up manually, ensure your
nginx config includes:

```nginx
location / {
    proxy_pass http://127.0.0.1:4007/;
    proxy_cookie_domain .ts.net your-full-subdomain.ts.net;
}
```

## Troubleshooting

### Login doesn't work - cookies rejected

**Symptoms:** Login page reloads but user stays logged out.

**Cause:** Cookie domain is set to `.ts.net` which browsers reject.

**Fix:**
```bash
# Check current cookie domain in nginx
grep "proxy_cookie_domain" /etc/nginx/nginx.conf

# If missing, add the fix
cat > /etc/nginx/nginx.conf << 'EOF'
worker_processes auto;
error_log /var/log/nginx/error.log;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 8081;
        server_name _;
        
        client_max_body_size 2G;
        
        location / {
            proxy_pass http://127.0.0.1:4007/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cookie_domain .ts.net YOUR_FULL_TAILSCALE_SUBDOMAIN.ts.net;
        }
    }
}
EOF

# Reload nginx
nginx -t && nginx -s reload
```

### Postiz container not starting

```bash
# Check container status
docker ps -a | grep postiz

# View logs
docker logs postiz

# Restart
docker restart postiz
```

### Database connection issues

```bash
# Check if postgres is running
docker ps | grep postgres

# View postgres logs
docker logs postiz-postgres
```

### Tailscale serve not working

```bash
# Check Tailscale serve status
tailscale serve status

# Reset Tailscale serve
tailscale serve reset

# Reconfigure
tailscale serve --bg http://127.0.0.1:8081
```

### Clear cookies and retry

If login still fails after fixes:

```bash
# Check if cookie domain is now correct
curl -s -D - http://127.0.0.1:4007/api/auth/login \
  -X POST -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test","provider":"LOCAL"}' \
  | grep -i set-cookie
```

The cookie should show `Domain=.your-full-subdomain.ts.net` not `Domain=.ts.net`

## Default Credentials (change these!)

After first install, create your admin user at:
`https://YOUR_SUBDOMAIN.ts.net/auth/register`

## Ports

| Port | Service |
|------|---------|
| 4007 | Postiz app |
| 5432 | PostgreSQL (internal) |
| 6379 | Redis (internal) |

## Access URLs

| URL | Description |
|-----|-------------|
| `http://localhost:4007` | Direct local access |
| `http://YOUR_VPS_IP:4007` | Direct VPS access |
| `https://YOUR_SUBDOMAIN.ts.net/` | Tailscale HTTPS access |

## Uninstallation

```bash
# Stop containers
cd /root/postiz
docker compose down

# Remove data volumes (WARNING: deletes all data)
docker compose down -v

# Remove files
rm -rf /root/postiz
```
