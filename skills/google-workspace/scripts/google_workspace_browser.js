#!/usr/bin/env node
const { spawnSync } = require('child_process');

function loadPlaywright() {
  try {
    return require('playwright');
  } catch (_) {
    const candidates = [
      process.env.PLAYWRIGHT_PATH,
      '/root/.openclaw/workspaces/arjun/node_modules/playwright',
      '/root/.openclaw/workspace/node_modules/playwright',
    ].filter(Boolean);
    for (const mod of candidates) {
      try { return require(mod); } catch (_) {}
    }
    throw new Error('playwright module not found; install it or set PLAYWRIGHT_PATH');
  }
}

const { chromium } = loadPlaywright();

const SERVICES = {
  gmail: 'https://mail.google.com/mail/u/0/#inbox',
  calendar: 'https://calendar.google.com/calendar/u/0/r',
  drive: 'https://drive.google.com/drive/my-drive',
  docs: 'https://docs.google.com/document/',
  sheets: 'https://docs.google.com/spreadsheets/u/0/',
};

function ok(data) {
  process.stdout.write(JSON.stringify({ ok: true, ...data }, null, 2));
}
function fail(message, extra = {}) {
  process.stdout.write(JSON.stringify({ ok: false, error: message, ...extra }, null, 2));
  process.exitCode = 1;
}

async function getContext(browser) {
  const contexts = browser.contexts();
  if (!contexts.length) throw new Error('No Chrome context found over CDP');
  return contexts[0];
}

function normalizeService(payload) {
  const service = payload.service || 'gmail';
  if (!SERVICES[service]) throw new Error(`Unsupported service: ${service}`);
  return service;
}

function isGoogleServiceUrl(url = '') {
  return /google\.com|googleusercontent\.com|accounts\.google\.com/.test(url);
}

async function relevantTabs(context) {
  return Promise.all(context.pages().map(async (page, i) => ({
    index: i,
    title: await page.title().catch(() => ''),
    url: page.url() || '',
  }))).then(items => items.filter(t => isGoogleServiceUrl(t.url) || /gmail|calendar|drive|docs|sheets/i.test(t.title)));
}

async function findPageForService(context, service) {
  const expected = SERVICES[service];
  for (const p of context.pages()) {
    const url = p.url() || '';
    if (url.includes('accounts.google.com')) continue;
    if (service === 'gmail' && url.includes('mail.google.com')) return p;
    if (service === 'calendar' && url.includes('calendar.google.com')) return p;
    if (service === 'drive' && url.includes('drive.google.com')) return p;
    if (service === 'docs' && url.includes('docs.google.com/document')) return p;
    if (service === 'sheets' && url.includes('docs.google.com/spreadsheets')) return p;
    if (url.startsWith(expected)) return p;
  }
  return null;
}

async function openService(context, service) {
  let page = await findPageForService(context, service);
  if (!page) {
    page = await context.newPage();
    await page.goto(SERVICES[service], { waitUntil: 'domcontentloaded', timeout: 120000 });
  } else {
    await page.bringToFront().catch(() => {});
    if (!page.url()) {
      await page.goto(SERVICES[service], { waitUntil: 'domcontentloaded', timeout: 120000 });
    }
  }
  await page.waitForTimeout(2500);
  return page;
}

async function pageStatus(page, service) {
  const url = page.url() || '';
  const title = await page.title().catch(() => '');
  const bodyText = await page.locator('body').innerText({ timeout: 15000 }).catch(() => '');
  const head = bodyText.slice(0, 500).toLowerCase();
  const looksLikeChooser = url.includes('accounts.google.com') || url.includes('ServiceLogin') || url.includes('accountchooser') || head.includes('choose an account') || head.includes('to continue to gmail') || head.includes('sign in to continue');
  const appHints = {
    gmail: title.toLowerCase().includes('gmail') || head.includes('compose') || head.includes('inbox'),
    calendar: title.toLowerCase().includes('calendar') || head.includes('my calendars') || head.includes('today') || head.includes('search for people'),
    drive: title.toLowerCase().includes('drive') || head.includes('my drive') || head.includes('priority') || head.includes('shared with me'),
    docs: title.toLowerCase().includes('docs') || head.includes('start a new document') || head.includes('blank document'),
    sheets: title.toLowerCase().includes('sheets') || head.includes('start a new spreadsheet') || head.includes('blank spreadsheet'),
  };
  const authenticated = !looksLikeChooser && !!appHints[service];
  return {
    service,
    authenticated,
    accountChooser: looksLikeChooser,
    url,
    title,
    bodyPreview: bodyText.slice(0, 1200),
  };
}

async function run() {
  const raw = process.argv[2];
  if (!raw) return fail('Missing JSON payload argument');
  const payload = JSON.parse(raw);
  const action = payload.action;
  let browser;
  try {
    browser = await chromium.connectOverCDP(payload.cdpUrl || 'http://127.0.0.1:9222');
    const context = await getContext(browser);

    if (action === 'list-tabs') {
      return ok({ action, tabs: await relevantTabs(context) });
    }

    const service = normalizeService(payload);
    const page = await openService(context, service);

    if (action === 'open') {
      return ok({ action, service, url: page.url(), title: await page.title().catch(() => '') });
    }

    if (action === 'auth-check' || action === 'status') {
      return ok({ action, ...(await pageStatus(page, service)) });
    }

    return fail(`Unsupported action: ${action}`);
  } catch (err) {
    return fail(err && err.message ? err.message : String(err));
  } finally {
    if (browser) browser.close().catch(() => {});
    setTimeout(() => process.exit(process.exitCode || 0), 25);
  }
}

run();
