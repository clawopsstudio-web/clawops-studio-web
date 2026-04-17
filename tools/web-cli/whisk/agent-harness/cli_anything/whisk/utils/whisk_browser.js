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
  const resultImageCount = await page.locator('img').evaluateAll(imgs => imgs.filter(img => (img.src || '').startsWith('blob:')).length).catch(() => 0);
  const uploadInputCount = await page.locator('input[type=file]').count().catch(() => 0);
  return {
    url: page.url(),
    title: await page.title(),
    promptVisible: !!promptVisible,
    downloadCount,
    animateCount,
    resultImageCount,
    uploadInputCount,
    bodyPreview: text.slice(0, 1500),
  };
}

async function ensureImagePanel(page) {
  let text = await bodyText(page);
  if (/upload image|hide images|subject\n|subject\b/i.test(text)) return;
  const addImages = page.locator('button').filter({ hasText: /add images/i }).first();
  if (await addImages.count().catch(() => 0)) {
    await addImages.click({ timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1500);
  }
}

async function uploadImage(page, filePath, slotIndex = 0) {
  await ensureImagePanel(page);
  const inputs = page.locator('input[type=file]');
  const count = await inputs.count().catch(() => 0);
  if (!count) throw new Error('No Whisk image upload inputs found');
  const index = Math.max(0, Math.min(Number(slotIndex || 0), count - 1));
  await inputs.nth(index).setInputFiles(filePath);
  await page.waitForTimeout(4000);
  const statusText = await bodyText(page);
  return {
    uploadInputCount: count,
    uploadSlotIndex: index,
    uploadErrorVisible: /something went wrong fetching your media/i.test(statusText),
  };
}

async function exportBlobImage(page, outputPath, imageIndex = 0) {
  const absOut = ensureDirFor(outputPath);
  const data = await page.evaluate(async ({ imageIndex }) => {
    const blobImages = Array.from(document.querySelectorAll('img')).map(el => ({ src: el.src || '', width: el.naturalWidth || 0, height: el.naturalHeight || 0 })).filter(x => x.src.startsWith('blob:'));
    if (!blobImages.length) return { ok: false, error: 'No blob-backed Whisk result images found' };
    const target = blobImages[Math.max(0, Math.min(imageIndex, blobImages.length - 1))];
    const res = await fetch(target.src);
    const blob = await res.blob();
    const ab = await blob.arrayBuffer();
    const bytes = new Uint8Array(ab);
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.slice(i, i + chunk));
    }
    return {
      ok: true,
      src: target.src,
      mime: blob.type,
      width: target.width,
      height: target.height,
      b64: btoa(binary),
    };
  }, { imageIndex: Number(imageIndex || 0) });
  if (!data.ok) throw new Error(data.error || 'Failed to export blob image');
  fs.writeFileSync(absOut, Buffer.from(data.b64, 'base64'));
  return {
    downloadPath: absOut,
    downloadMime: data.mime,
    exportedImageIndex: Number(imageIndex || 0),
    exportedWidth: data.width,
    exportedHeight: data.height,
    exportedSrc: data.src,
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
        })).slice(0, 10),
        fileInputs: Array.from(document.querySelectorAll('input[type=file]')).map((el, i) => ({
          i,
          accept: el.getAttribute('accept') || '',
          multiple: !!el.multiple
        })).slice(0, 10),
        resultImages: Array.from(document.querySelectorAll('img')).map((el, i) => ({
          i,
          src: (el.src || '').slice(0, 160),
          width: el.naturalWidth || 0,
          height: el.naturalHeight || 0
        })).filter(x => x.src.startsWith('blob:')).slice(0, 20)
      }));
      return ok({ action, url: page.url(), title: await page.title(), ...inspect });
    }

    if (action === 'upload-image') {
      if (!payload.filePath) return fail('Missing filePath for upload-image');
      const page = await openWhisk(context);
      await enterToolIfPresent(page);
      const upload = await uploadImage(page, payload.filePath, payload.slotIndex || 0);
      const status = await collectStatus(page);
      return ok({ action, filePath: path.resolve(payload.filePath), ...upload, ...status });
    }

    if (action === 'export-image') {
      if (!payload.outputPath) return fail('Missing outputPath for export-image');
      const page = await openWhisk(context);
      await enterToolIfPresent(page);
      const exported = await exportBlobImage(page, payload.outputPath, payload.imageIndex || 0);
      const status = await collectStatus(page);
      return ok({ action, ...exported, ...status });
    }

    if (action === 'generate') {
      if (!payload.prompt) return fail('Missing prompt for generate');
      const page = await openWhisk(context);
      await enterToolIfPresent(page);

      let upload = null;
      if (payload.filePath) {
        upload = await uploadImage(page, payload.filePath, payload.slotIndex || 0);
      }

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

      if (upload) {
        result.upload = upload;
      }

      if (payload.screenshotPath) {
        const absShot = ensureDirFor(payload.screenshotPath);
        await page.screenshot({ path: absShot, fullPage: true });
        result.screenshotPath = absShot;
      }

      if (payload.downloadPath && downloadCount > 0) {
        try {
          Object.assign(result, await exportBlobImage(page, payload.downloadPath, payload.imageIndex || 0));
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
