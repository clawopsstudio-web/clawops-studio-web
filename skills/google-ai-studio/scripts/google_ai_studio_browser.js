#!/usr/bin/env node
function loadPlaywright() {
  try {
    return require('playwright');
  } catch (_) {
    const candidates = [process.env.PLAYWRIGHT_PATH, '/root/.openclaw/workspaces/arjun/node_modules/playwright', '/root/.openclaw/workspace/node_modules/playwright'].filter(Boolean);
    for (const mod of candidates) {
      try { return require(mod); } catch (_) {}
    }
    throw new Error('playwright module not found; install it or set PLAYWRIGHT_PATH');
  }
}
const { chromium } = loadPlaywright();
const TARGET = 'https://aistudio.google.com/apps';

function ok(data) { process.stdout.write(JSON.stringify({ ok: true, ...data }, null, 2)); }
function fail(message, extra = {}) { process.stdout.write(JSON.stringify({ ok: false, error: message, ...extra }, null, 2)); process.exitCode = 1; }
async function getContext(browser) { const contexts = browser.contexts(); if (!contexts.length) throw new Error('No Chrome context found over CDP'); return contexts[0]; }
async function listTabs(context) {
  const items = [];
  for (const [index, page] of context.pages().entries()) {
    const url = page.url() || '';
    if (!/aistudio\.google\.com|accounts\.google\.com/.test(url)) continue;
    items.push({ index, title: '', url });
  }
  return items;
}
async function openTarget(context) { let page = context.pages().find(p => (p.url() || '').includes('aistudio.google.com')); if (!page) { page = await context.newPage(); await page.goto(TARGET, { waitUntil: 'domcontentloaded', timeout: 120000 }); } else { await page.bringToFront().catch(() => {}); } await page.waitForTimeout(2500); return page; }
async function status(page) { const url = page.url() || ''; const title = await page.title().catch(() => ''); const body = await page.locator('body').innerText({ timeout: 15000 }).catch(() => ''); const authenticated = !url.includes('accounts.google.com') && !/sign in|choose an account/i.test(body.slice(0, 1200)); return { authenticated, url, title, bodyPreview: body.slice(0, 1200) }; }
async function run() {
  const raw = process.argv[2]; if (!raw) return fail('Missing JSON payload argument');
  const payload = JSON.parse(raw); let browser;
  try {
    browser = await chromium.connectOverCDP(payload.cdpUrl || 'http://127.0.0.1:9222');
    const context = await getContext(browser);
    if (payload.action === 'list-tabs') return ok({ action: payload.action, tabs: await listTabs(context) });
    const page = await openTarget(context);
    if (payload.action === 'open') return ok({ action: payload.action, url: page.url(), title: await page.title().catch(() => '') });
    if (payload.action === 'auth-check' || payload.action === 'status') return ok({ action: payload.action, ...(await status(page)) });
    return fail(`Unsupported action: ${payload.action}`);
  } catch (err) {
    return fail(err && err.message ? err.message : String(err));
  } finally {
    if (browser) browser.close().catch(() => {});
    setTimeout(() => process.exit(process.exitCode || 0), 25);
  }
}
run();
