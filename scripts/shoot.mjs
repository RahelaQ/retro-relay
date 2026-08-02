#!/usr/bin/env node
/**
 * Renders the preview pages to PNGs in screenshots/.
 *
 *   node scripts/shoot.mjs
 *
 * These are UI mocks driven by the real theme.css — the colours, borders,
 * radii and type are the theme's own, but the layout is reproduced here
 * rather than captured from a running Obsidian. For the community directory
 * you may prefer a genuine in-app capture; see docs/COMMUNITY-CHECKLIST.md.
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'screenshots');

const SHOTS = [
  { page: 'preview.html', scheme: 'theme-dark',  w: 1280, h: 880, file: 'preview-dark.png' },
  { page: 'preview.html', scheme: 'theme-light', w: 1280, h: 880, file: 'preview-light.png' },
  { page: 'thumb.html',   scheme: 'theme-dark',  w: 512,  h: 288, file: 'screenshot.png' },
  { page: 'thumb.html',   scheme: 'theme-light', w: 512,  h: 288, file: 'screenshot-light.png' },
];

const browser = await chromium.launch();

for (const shot of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: shot.w, height: shot.h },
    deviceScaleFactor: 1,
  });

  await page.goto('file://' + join(HERE, shot.page));
  await page.evaluate((scheme) => {
    document.body.className = scheme;
  }, shot.scheme);

  // Let font fallback and layout settle before capturing.
  await page.waitForLoadState('load');
  await page.waitForTimeout(150);

  const path = join(OUT, shot.file);
  await page.screenshot({ path, clip: { x: 0, y: 0, width: shot.w, height: shot.h } });
  console.log(`  ${shot.file.padEnd(24)} ${shot.w}×${shot.h}`);

  await page.close();
}

await browser.close();
console.log('\n  Screenshots written to screenshots/\n');
