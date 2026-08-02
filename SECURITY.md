# Security Policy

## What this project is

Retro Relay is a CSS-only theme for Obsidian. A release consists of two files —
`theme.css` and `manifest.json` — and contains no JavaScript. It cannot execute
code, read your notes, or reach the network on its own. That bounds what a
vulnerability in this project can be, but it does not reduce it to nothing:
CSS can still leak information and misrepresent the interface.

## Supported versions

This is a single-maintainer project. Only the most recent release receives
fixes; there are no long-lived maintenance branches. A security fix ships as a
new release rather than as a patch to an older one.

| Version          | Supported |
| ---------------- | --------- |
| Latest release   | ✅        |
| Anything earlier | ❌        |

If you are not on the latest version, update first — the issue may already be
fixed.

## What counts as a security issue in a theme

**In scope:**

- **Any outbound request.** This theme must make none. If a shipped `theme.css`
  contains `@import url(https://…)`, `url(https://…)`, or an `@font-face`
  pointing off-device, that is a vulnerability: it would reveal the reader's IP
  address and leak when and how often they open their vault. All fonts are
  local stacks for exactly this reason, and `scripts/build-release.mjs` fails
  the build if a remote reference appears.
- **Hiding or obscuring security-relevant interface.** CSS that makes a
  confirmation dialog, permission prompt, or error notice invisible,
  unreadable, or misleading — such that someone could be induced to confirm
  something they did not intend.
- **Making content look absent when it is not**, in a way that could lead to
  data loss — for example text rendered invisible against its background in a
  note the user then edits or deletes believing it empty.
- **A release whose attached files do not match the tagged commit**, which
  would indicate a tampered or mis-built release.

**Out of scope** — real issues, but not ours:

- Bugs in Obsidian itself. Report those via [obsidian.md/help](https://obsidian.md/help).
- Bugs in other themes or plugins, including Style Settings.
- Cosmetic problems: a colour you dislike, a misaligned element, a rule that
  does not apply. Please open a normal
  [issue](../../issues) instead.
- Insufficient colour contrast. That is a bug worth reporting, but through a
  normal issue — run `node scripts/check-contrast.mjs` and include the output.

## Reporting a vulnerability

**Please do not open a public issue for something exploitable.**

Use GitHub's private vulnerability reporting:

1. Go to the [Security tab](../../security) of this repository.
2. Select **Report a vulnerability**.
3. Describe what you found, and how to reproduce it.

The report stays private while it is being addressed.

Helpful to include, if you have it:

- The theme version (from `manifest.json` or the theme browser).
- Your Obsidian version and platform.
- Whether it reproduces with all other themes, plugins and CSS snippets
  disabled.
- The specific CSS rule involved, if you found it.

## What to expect

This is a side project maintained by one person, so these are honest
expectations rather than a service guarantee:

- **Acknowledgement** within 7 days.
- **An assessment** — whether it is in scope, and the intended fix — within 14
  days of acknowledgement.
- **A fix** shipped as a new release. Because the theme is two static files,
  fixes are usually quick once the problem is understood.
- **Credit** in the release notes and `CHANGELOG.md`, unless you would rather
  not be named.
- **If declined**, a plain explanation of why — most often that it belongs to
  Obsidian or another plugin, with a pointer to where to report it.

If you have had no reply in 14 days, feel free to open a public issue saying
only that you sent a private report and have not heard back. Do not include
the details.

## Verifying what you installed

Every GitHub release lists a SHA-256 for each attached file. To confirm the
files in your vault are the ones published:

```bash
shasum -a 256 "path/to/vault/.obsidian/themes/Retro Relay/theme.css"
shasum -a 256 "path/to/vault/.obsidian/themes/Retro Relay/manifest.json"
```

Compare the output against the checksums shown on the
[release page](../../releases/latest). If they differ, the files were altered
after publication — please report it.

