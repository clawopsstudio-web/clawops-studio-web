# Deployment-Ready Next.js — Production Checklists and Performance Thresholds

## Purpose

A Next.js site that works locally is not production-ready. This skill encodes the deployment pipeline, performance thresholds, and production checklists from the ClawOps setup — systemd service, nginx routing, base path `/site`, environment-aware configuration.

---

## Pre-Build Checklist

Before running `next build`, verify:

- [ ] All environment variables are defined in `.env.production` or injected via systemd
- [ ] `next.config.js` has `output: 'standalone'` for Docker/systemd deploys
- [ ] No hardcoded URLs — use environment variables for API endpoints
- [ ] Image domains configured in `next.config.js` if using external images
- [ ] `next/font` is used instead of Google Fonts link tags (eliminates layout shift)
- [ ] All heavy components (3D viewers, Canvas, complex animations) are lazy-loaded
- [ ] TypeScript types are complete — no `any` in production code paths

---

## Build Steps

### 1. Environment Configuration
```bash
# Systemd env file: /etc/environment or service Environment= lines
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api

# Build command (ClawOps pattern)
next build
```

### 2. Build with Bundle Analysis
```bash
# Analyze bundle size on every build
ANALYZE=true next build

# Or use @next/bundle-analyzer
npm run build -- -a
```

**Bundle size thresholds:**
- Initial JS bundle: < 250KB gzipped
- Largest chunk: < 150KB gzipped
- Total CSS: < 50KB gzipped
- Any component lazy-loaded: no limit, but must be lazy

If a bundle exceeds threshold: identify the source with `next build` output, tree-shake or lazy-load the offending module.

### 3. Output: Standalone
```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',  // Outputs self-contained .next/standalone/
  images: {
    domains: ['your-cdn.com', 'your-storage.com'],
  },
  basePath: '/site',     // ClawOps: site served at /site
  assetPrefix: '/site',  // Required when basePath is set
}
module.exports = nextConfig
```

Standalone mode produces a minimal Node.js server. No `node_modules` copy needed on the server — just `npm run start` from the standalone directory.

---

## Lazy Loading Heavy Components

### 3D / Canvas Components
```tsx
import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(
  () => import('../components/HeroCanvas'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a1a 0%, #050511 100%)',
          borderRadius: '16px'
        }}
      />
    )
  }
)
```

### Rule:** `ssr: false` for any component that uses `window`, `document`, WebGL, or Canvas. Without it, the server render crashes.

### Heavy UI Components
```tsx
const PricingCalculator = dynamic(
  () => import('../components/PricingCalculator'),
  { ssr: false }
)
```

---

## Performance Thresholds

### Core Web Vitals Targets
| Metric | Target | Critical |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | > 4.0s |
| FID (First Input Delay) | < 100ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| TTFB (Time to First Byte) | < 200ms | > 600ms |

### Hero-Specific Rules
- LCP element must be the headline or CTA button, not a background image or canvas
- Hero canvas/WebGL must not block LCP
- Font preload tags must be in `<head>` before any script tags

### Measurement
```bash
# Lighthouse CI in pipeline
npx lighthouse https://your-domain.com --output=json --output-path=./lighthouse-report.json

# Or use PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=YOUR_URL&key=YOUR_KEY"
```

---

## ClawOps Deployment Architecture

### Systemd Service
File: `/etc/systemd/system/clawops-site.service`

```ini
[Unit]
Description=ClawOps Next.js Site
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/clawops-site/.next/standalone
ExecStart=/usr/bin/node server.js
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=NEXT_PUBLIC_SITE_URL=https://clawops.com
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Rule:** Always set `Restart=always` and `RestartSec=10`. The site should recover from crashes without manual intervention.

### Nginx Routing
File: `/etc/nginx/sites-available/clawops-site`

```nginx
server {
    listen 80;
    server_name clawops.com www.clawops.com;

    location /site/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;

        # Performance headers
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    location /site/_next/static/ {
        proxy_pass http://127.0.0.1:3000/_next/static/;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

**Key rule:** When using `basePath: '/site'`, nginx must route `/site/` to the Next.js app, and the Next.js app must receive requests at `/` (strip the base path via `proxy_pass http://127.0.0.1:3000/` with trailing slash).

### Service Management
```bash
# Enable and start
systemctl enable clawops-site
systemctl start clawops-site
systemctl status clawops-site

# Reload after deploy
systemctl restart clawops-site

# Logs
journalctl -u clawops-site -f
```

---

## Environment-Aware Configuration

### Runtime Environment Variables
```javascript
// next.config.js — build-time only
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Runtime config (use this for client-side env vars)
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  }
}
```

### Environment Variable Rules
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never put secrets (API keys, database URLs) behind `NEXT_PUBLIC_`
- For server-side secrets: use `process.env.SECRET_KEY` in API routes only
- Inject secrets via systemd `Environment=` lines or a `.env` file read by the service manager

### File Structure for Base Path `/site`
```
Next.js app root
  next.config.js       → basePath: '/site', assetPrefix: '/site'
  .env.production      → NEXT_PUBLIC_SITE_URL=https://domain.com/site

Nginx
  location /site/      → proxy_pass http://127.0.0.1:3000/

Browser URL
  https://domain.com/site/  → served by Next.js
```

---

## Post-Deploy Verification

- [ ] `curl -I https://your-domain.com/site` returns 200
- [ ] `curl -I https://your-domain.com/site/_next/static/...` returns 200 with cache headers
- [ ] Lighthouse score: Performance > 90, Accessibility > 90
- [ ] No console errors in production build (run `next build` locally first)
- [ ] Images load from CDN or Next.js image optimization (`/_next/image`)
- [ ] Fonts load from `next/font` (no external font requests)
- [ ] API routes respond correctly (test all endpoints)
- [ ] Service restarts cleanly: `systemctl restart clawops-site && sleep 3 && curl -I http://127.0.0.1:3000`

---

## Rules Summary

### DO
- Use `output: 'standalone'` in next.config.js for systemd/Docker deploys
- Lazy load all Canvas/WebGL/3D components with `ssr: false`
- Set `basePath` and `assetPrefix` together when deploying to a subpath
- Configure nginx to cache `/_next/static/` with long TTL (31536000s)
- Use `next/font` instead of Google Fonts link tags
- Set `Restart=always` in systemd service
- Measure LCP after every deploy — hero canvas must not block it

### DON'T
- Hardcode URLs in components — use environment variables
- Use `any` types in production code
- Ship a build with bundle analysis showing chunks > 150KB gzipped
- Deploy without a health check endpoint (`/api/health`)
- Run `next start` without `NODE_ENV=production`
- Expose server-side secrets behind `NEXT_PUBLIC_` prefix
- Forget `proxy_pass http://127.0.0.1:3000/` with trailing slash when basePath is used
