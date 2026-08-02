#!/usr/bin/env node
/**
 * Builds the clean release payload and validates it.
 *
 *   node scripts/build-release.mjs              # writes dist/
 *   node scripts/build-release.mjs --sync-vault # also refresh test-vault copy
 *
 * Obsidian installs a theme from exactly two files, so dist/ contains exactly
 * two files. Everything else in this repo — test vault, screenshots, scripts,
 * docs — is for developing the theme, not for shipping it.
 *
 * Attach BOTH files in dist/ to the GitHub release as binary attachments, with
 * the release tag matching `version` in manifest.json.
 */

import { readFile, mkdir, rm, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const VAULT_THEME = join(ROOT, 'test-vault', '.obsidian', 'themes', 'Retro Relay');

const PAYLOAD = ['manifest.json', 'theme.css'];

/* ---------- validate the manifest against Obsidian's theme schema ---------- */

const REQUIRED = ['name', 'version', 'minAppVersion', 'author'];
// Plugin-only fields. Obsidian's theme review rejects a manifest carrying them.
const PLUGIN_ONLY = ['id', 'description', 'isDesktopOnly'];

const manifestRaw = await readFile(join(ROOT, 'manifest.json'), 'utf8');
let manifest;
try {
  manifest = JSON.parse(manifestRaw);
} catch (err) {
  console.error(`  manifest.json is not valid JSON: ${err.message}`);
  process.exit(1);
}

const problems = [];

for (const field of REQUIRED) {
  if (!manifest[field]) problems.push(`missing required field: ${field}`);
}

for (const field of PLUGIN_ONLY) {
  if (field in manifest) {
    problems.push(`"${field}" is a plugin-only field and must not appear in a theme manifest`);
  }
}

if (manifest.version && !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
  problems.push(`version must be x.y.z, got "${manifest.version}"`);
}

// Naming rules from the Obsidian manifest reference.
if (manifest.name) {
  if (/theme/i.test(manifest.name)) problems.push('theme names may not contain "Theme"');
  if (/obsidian|obsi-|-sidian/i.test(manifest.name)) problems.push('theme names may not contain "Obsidian"');
  if (!/^[\x20-\x7E]+$/.test(manifest.name)) problems.push('theme names must use Basic Latin characters only');
}

const css = await readFile(join(ROOT, 'theme.css'), 'utf8');
if (!css.trim()) problems.push('theme.css is empty');
if (!/\.theme-light/.test(css)) problems.push('theme.css has no .theme-light block');
if (!/\.theme-dark/.test(css)) problems.push('theme.css has no .theme-dark block');
// A remote fetch would break offline use and leak the reader's IP.
if (/@import\s+url\(\s*['"]?https?:/i.test(css)) problems.push('theme.css fetches a remote stylesheet');
if (/url\(\s*['"]?https?:/i.test(css)) problems.push('theme.css references a remote asset');

if (problems.length) {
  console.error('\n  Release blocked:\n');
  for (const p of problems) console.error(`    - ${p}`);
  console.error('');
  process.exit(1);
}

/* ---------- write dist/ ---------- */

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

for (const file of PAYLOAD) {
  await copyFile(join(ROOT, file), join(DIST, file));
}

// versions.json is a plugin mechanism, not a theme one — deliberately absent.

console.log(`\n  ${manifest.name} v${manifest.version}`);
console.log(`  minAppVersion ${manifest.minAppVersion}, author ${manifest.author}`);
console.log('\n  dist/');
for (const file of PAYLOAD) console.log(`    ${file}`);
console.log(`\n  Tag the GitHub release "${manifest.version}" and attach both files.\n`);

/* ---------- optionally refresh the test vault's copy ---------- */

if (process.argv.includes('--sync-vault')) {
  await mkdir(VAULT_THEME, { recursive: true });
  for (const file of PAYLOAD) {
    await copyFile(join(ROOT, file), join(VAULT_THEME, file));
  }
  console.log('  test-vault theme copy refreshed.\n');
}
