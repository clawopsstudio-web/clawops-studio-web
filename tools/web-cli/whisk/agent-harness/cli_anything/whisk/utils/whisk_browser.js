#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function ok(data) {
  process.stdout.write(JSON.stringify({ ok: true, ...data }, null, 2));
}

function fail(message, extra = {}) {
  process.stdout.write(JSON.stringify({ ok: false, error: message, ...extra }, null, 2));
  process.exitCode = 1;
}

function ensureDirFor(filePath) {
  const abs = path.resolve(filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  return abs;
}

async function getContext(browser) {
  const contexts = browser.contexts();
  if (!contexts.length) throw new Error('No Chrome context found over CDP');
  return contexts[0];
}

async function findWhiskPage(context) {
  for (const p of context.pages()) {
    const url = p.url() || '';
    if (url.includes('/fx/tools/whisk')) return p;
  }
  return null;
}

async function openWhisk(context) {
  let page = await findWhiskPage(context);
  if (!page) {
    page = await context.newPage();
    await page.goto('https://labs.google/fx/tools/whisk', { waitUntil: 'domcontentloaded', timeout: 120000 });
  } else {
    await page.bringToFront();
  }
  await page.waitForTimeout(2500);
  return page;
}

async function enterToolIfPresent(page) {
  const enterText = page.getByText(/enter tool/i).first();
  if (await enterText.count().catch(() => 0)) {
    await enterText.click({ timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);
  }
}

async function bodyText(page) {
  return await page.locator('body').innerText({ timeout: 15000 }).catch(() => '');
}

async function collectStatus(page) {
  const text = await bodyText(page);
  const downloadCount = await page.locator('button').evaluateAll(btns => btns.filter(b => ((b.innerText || b.textContent || '').includes('download'))).length).catch(() => 0);
  const animateCount = await page.locator('button').evaluateAll(btns => btns.filter(b => ((b.innerText || b.textContent || '').includes('ANIMATE'))).length).catch(() => 0);
  const promptVisible = await page.locator('textarea[placeholder*="Describe your idea"]').count().catch(() => 0);
  return {
    url: page.url(),
    title: await page.title(),
    promptVisible: !!promptVisible,
    downloadCount,
    animateCount,
    bodyPreview: text.slice(0, 1500),
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

    if (action === 'auth-check') {
      const page = await openWhisk(context);
      const status = await collectStatus(page);
      const authenticated = !/sign in|log in/i.test(status.bodyPreview || '');
      return ok({ action, authenticated, ...status });
    }

    if (action === 'open') {
      const page = await openWhisk(context);
      return ok({ action, url: page.url(), title: await page.title() });
    }

    if (action === 'status') {
      const page = await openWhisk(context);
      await enterToolIfPresent(page);
      const status = await collectStatus(page);
      return ok({ action, ...status });
    }

    if (action === 'inspect') {
      const page = await openWhisk(context);
      await enterToolIfPresent(page);
      const inspect = await page.evaluate(() => ({
        buttons: Array.from(document.querySelectorAll('button')).map((el, i) => ({
          i,
          text: (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
          aria: el.getAttribute('aria-label') || '',
          type: el.getAttribute('type') || ''
        })).filter(x => x.text || x.aria).slice(0, 60),
        textareas: Array.from(document.querySelectorAll('textarea')).map((el, i) => ({
          i,
          placeholder: el.getAttribute('placeholder') || '',
          valueLength: (el.value || '').length
        })).slice(0, 10)
      }));
      return ok({ action, url: page.url(), title: await page.title(), ...inspect });
    }

    if (action === 'generate') {
      if (!payload.prompt) return fail('Missing prompt for generate');
      const page = await openWhisk(context);
      await enterToolIfPresent(page);
      const promptBox = page.locator('textarea[placeholder*="Describe your idea"]');
      await promptBox.waitFor({ timeout: 20000 });
      await promptBox.fill(payload.prompt);
      await page.getByRole('button', { name: /submit prompt/i }).click({ timeout: 15000 });

      const timeoutMs = Number(payload.timeoutMs || 90000);
      const started = Date.now();
      let downloadCount = 0;
      while (Date.now() - started < timeoutMs) {
        await page.waitForTimeout(3000);
        downloadCount = await page.locator('button').evaluateAll(btns => btns.filter(b => ((b.innerText || b.textContent || '').includes('download'))).length).catch(() => 0);
        if (downloadCount > 0) break;
      }

      const result = {
        action,
        prompt: payload.prompt,
        url: page.url(),
        title: await page.title(),
        downloadCount,
        elapsedMs: Date.now() - started,
      };

      if (payload.screenshotPath) {
        const absShot = ensureDirFor(payload.screenshotPath);
        await page.screenshot({ path: absShot, fullPage: true });
        result.screenshotPath = absShot;
      }

      if (payload.downloadPath && downloadCount > 0) {
        const absDl = ensureDirFor(payload.downloadPath);
        try {
          const button = page.locator('button').filter({ hasText: 'download' }).first();
          const [download] = await Promise.all([
            page.waitForEvent('download', { timeout: 20000 }),
            button.click({ timeout: 15000 })
          ]);
          await download.saveAs(absDl);
          result.downloadPath = absDl;
          result.suggestedFilename = await download.suggestedFilename();
        } catch (err) {
          result.downloadError = err && err.message ? err.message : String(err);
        }
      }

      return ok(result);
    }

    return fail(`Unsupported action: ${action}`);
  } catch (err) {
    return fail(err && err.message ? err.message : String(err));
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

run();
