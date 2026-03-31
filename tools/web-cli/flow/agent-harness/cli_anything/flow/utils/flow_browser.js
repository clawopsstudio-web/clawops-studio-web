#!/usr/bin/env node
const { chromium } = require('playwright');

function ok(data) {
  process.stdout.write(JSON.stringify({ ok: true, ...data }, null, 2));
}

function fail(message) {
  process.stdout.write(JSON.stringify({ ok: false, error: message }, null, 2));
  process.exitCode = 1;
}

async function getContext(browser) {
  const contexts = browser.contexts();
  if (!contexts.length) throw new Error('No Chrome context found over CDP');
  return contexts[0];
}

async function openFlow(context) {
  let page = context.pages().find(p => (p.url() || '').includes('/fx/tools/flow'));
  if (!page) {
    page = await context.newPage();
    await page.goto('https://labs.google/fx/tools/flow', { waitUntil: 'domcontentloaded', timeout: 120000 });
  } else {
    await page.bringToFront();
  }
  await page.waitForTimeout(2500);
  return page;
}

async function collectStatus(page) {
  const body = await page.locator('body').innerText({ timeout: 15000 }).catch(() => '');
  return {
    url: page.url(),
    title: await page.title(),
    bodyPreview: body.slice(0, 1500),
    hasNewProject: /new project/i.test(body),
    authenticated: !/sign in|log in/i.test(body),
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
    const page = await openFlow(context);

    if (action === 'auth-check' || action === 'status') {
      return ok({ action, ...(await collectStatus(page)) });
    }
    if (action === 'open') {
      return ok({ action, url: page.url(), title: await page.title() });
    }
    if (action === 'inspect') {
      const data = await page.evaluate(() => ({
        buttons: Array.from(document.querySelectorAll('button')).map((el, i) => ({
          i,
          text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
          aria: el.getAttribute('aria-label') || ''
        })).filter(x => x.text || x.aria).slice(0, 40),
        inputs: Array.from(document.querySelectorAll('input,textarea')).map((el, i) => ({
          i,
          tag: el.tagName,
          placeholder: el.getAttribute('placeholder') || '',
          type: el.getAttribute('type') || ''
        })).slice(0, 20)
      }));
      return ok({ action, url: page.url(), title: await page.title(), ...data });
    }

    return fail(`Unsupported action: ${action}`);
  } catch (err) {
    return fail(err && err.message ? err.message : String(err));
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

run();
