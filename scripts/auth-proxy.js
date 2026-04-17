// Auth proxy for n8n/chrome/gateway services
// Runs on port 4001
// Reads sb-access-token cookie from the browser request, validates JWT locally
// If valid: proxies to the actual service
// If invalid: redirects browser to login

const http = require('http');
const https = require('https');

const SERVICE_PORTS = {
  n8n: 5678,
  chrome: 5800,
  gateway: 18789,
};

const SUPABASE_PROJECT = 'dyzkfmdjusdyjmytgeah';
const APP_DOMAIN = 'app.clawops.studio';

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  const cookies = {};
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    cookies[name.trim()] = decodeURIComponent(rest.join('=').trim());
  });
  return cookies;
}

function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    return payload;
  } catch {
    return null;
  }
}

function validateJWT(token) {
  const payload = decodeJWT(token);
  if (!payload) return { valid: false, reason: 'Invalid token format' };
  if (payload.exp && Date.now() >= payload.exp * 1000) return { valid: false, reason: 'Token expired' };
  if (payload.ref !== SUPABASE_PROJECT) return { valid: false, reason: 'Wrong project' };
  if (!payload.iss || !payload.iss.includes('.supabase.co/auth/v1')) return { valid: false, reason: 'Invalid issuer' };
  return { valid: true, userId: payload.sub, email: payload.email };
}

function proxyRequest(req, res, targetPort) {
  const url = new URL(req.url, `http://127.0.0.1:${targetPort}`);
  const options = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: url.pathname + url.search,
    method: req.method,
    headers: {
      ...Object.fromEntries(
        Object.entries(req.headers).filter(([k]) =>
          !['host', 'connection', 'transfer-encoding', 'expect'].includes(k.toLowerCase())
        )
      ),
      'X-Forwarded-Host': APP_DOMAIN,
      'X-Forwarded-Proto': 'https',
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (e) => {
    console.error(`Proxy error: ${e.message}`);
    res.writeHead(502);
    res.end('Bad Gateway');
  });

  req.pipe(proxyReq);
}

const fs = require('fs');
const LOG = '/tmp/auth-proxy.log';

function log(msg) {
  const line = new Date().toISOString() + ' ' + msg + '\n';
  fs.appendFileSync(LOG, line);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:4001`);
  const path = url.pathname.replace(/^\//, ''); // strip leading /
  const parts = path.split('/');
  const serviceName = parts[0]; // e.g. "n8n" or "n8n/"
  const servicePath = parts.slice(1).join('/');

  // Log cookies for debugging
  const cookieHeader = req.headers.cookie || '';
  log(`REQUEST ${req.method} /${serviceName} COOKIE:${cookieHeader.substring(0, 200)}`);

  // Validate service
  const port = SERVICE_PORTS[serviceName.replace(/\/$/, '')];
  if (!port) {
    res.writeHead(404);
    res.end('Service not found');
    return;
  }

  // Check JWT from cookie (already declared above in logging block)
  const cookies = parseCookies(cookieHeader);
  const token = cookies['sb-access-token'];

  if (!token) {
    res.writeHead(302, { Location: `https://${APP_DOMAIN}/auth/login?redirect=/${serviceName}` });
    res.end();
    return;
  }

  const validation = validateJWT(token);
  if (!validation.valid) {
    res.writeHead(302, { Location: `https://${APP_DOMAIN}/auth/login?redirect=/${serviceName}` });
    res.end();
    return;
  }

  // Valid JWT — proxy to service
  const upstreamPath = servicePath ? `/${servicePath}` : '/';
  req.url = upstreamPath + url.search;
  proxyRequest(req, res, port);
});

server.listen(4001, '127.0.0.1', () => {
  console.log('Auth proxy running on port 4001');
});
