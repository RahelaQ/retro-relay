#!/usr/bin/env node
/**
 * WCAG contrast checker for Retro Relay.
 *
 * Parses the --rr-* palette straight out of theme.css for both colour
 * schemes, then asserts every foreground/background pair the theme actually
 * relies on. Run it after any palette change:
 *
 *   node scripts/check-contrast.mjs
 *
 * Exit code 1 if any pair falls below its target, so it works in CI.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- colour maths (WCAG 2.1 relative luminance) ---------- */

function parseHex(hex) {
  const h = hex.trim().replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function luminance([r, g, b]) {
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(fg, bg) {
  const a = luminance(parseHex(fg));
  const b = luminance(parseHex(bg));
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- extract the palette from theme.css ---------- */

function extractScheme(css, selector) {
  // Grab the first block for `selector` and pull its --rr-* declarations.
  const start = css.indexOf(selector + ' {');
  if (start === -1) throw new Error(`palette block not found: ${selector}`);
  const open = css.indexOf('{', start);
  const close = css.indexOf('\n}', open);
  const block = css.slice(open, close);

  const palette = {};
  for (const m of block.matchAll(/(--rr-[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    palette[m[1]] = m[2];
  }
  return palette;
}

/* ---------- the pairs that matter ---------- */

// [foreground token, background token, minimum ratio, label]
// 4.5 = WCAG AA body text, 3.0 = AA large text / UI component boundaries.
const PAIRS = [
  ['--rr-ink', '--rr-bg-1', 4.5, 'body text on editor background'],
  ['--rr-ink', '--rr-bg-0', 4.5, 'body text on sidebar background'],
  ['--rr-ink', '--rr-bg-2', 4.5, 'body text on alt background'],
  ['--rr-ink-muted', '--rr-bg-1', 4.5, 'muted text on editor background'],
  ['--rr-ink-muted', '--rr-bg-0', 4.5, 'muted text on sidebar background'],
  ['--rr-ink-faint', '--rr-bg-1', 3.0, 'faint text (code comments) on editor bg'],
  ['--rr-accent', '--rr-bg-1', 4.5, 'links / H1 on editor background'],
  ['--rr-accent', '--rr-bg-0', 4.5, 'accent on sidebar background'],
  ['--rr-teal', '--rr-bg-1', 4.5, 'tags / external links on editor bg'],
  ['--rr-blue', '--rr-bg-1', 4.5, 'code: functions'],
  ['--rr-green', '--rr-bg-1', 4.5, 'code: strings'],
  ['--rr-yellow', '--rr-bg-1', 4.5, 'code: values'],
  ['--rr-red', '--rr-bg-1', 4.5, 'errors / unresolved links'],
  ['--rr-magenta', '--rr-bg-1', 4.5, 'code: keywords'],
  ['--rr-purple', '--rr-bg-1', 4.5, 'code: tags'],
  ['--rr-border', '--rr-bg-1', 1.4, 'borders against editor bg (visible seam)'],
  ['--rr-border-strong', '--rr-bg-1', 2.0, 'strong borders against editor bg'],
];

/* ---------- run ---------- */

const css = await readFile(join(ROOT, 'theme.css'), 'utf8');

const schemes = {
  dark: extractScheme(css, '.theme-dark'),
  light: extractScheme(css, '.theme-light'),
};

let failures = 0;
let checks = 0;

for (const [scheme, palette] of Object.entries(schemes)) {
  console.log(`\n  ${scheme.toUpperCase()}`);
  console.log('  ' + '-'.repeat(66));

  for (const [fgToken, bgToken, min, label] of PAIRS) {
    const fg = palette[fgToken];
    const bg = palette[bgToken];

    if (!fg || !bg) {
      console.log(`  ??  ${label}: missing ${!fg ? fgToken : bgToken}`);
      failures++;
      continue;
    }

    checks++;
    const r = ratio(fg, bg);
    const pass = r >= min;
    if (!pass) failures++;

    const mark = pass ? 'ok  ' : 'FAIL';
    console.log(
      `  ${mark} ${r.toFixed(2).padStart(5)}:1  (min ${min.toFixed(1)})  ${label}`
    );
  }
}

console.log('\n  ' + '='.repeat(66));
if (failures === 0) {
  console.log(`  All ${checks} contrast checks passed.\n`);
  process.exit(0);
} else {
  console.log(`  ${failures} of ${checks} checks FAILED.\n`);
  process.exit(1);
}
