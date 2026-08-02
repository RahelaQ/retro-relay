---
tags:
  - demo
  - a11y
---

# Accessibility

Back to [[Start here]].

## What the theme does without any configuration

- **Measured contrast.** Every text and accent pair is checked against WCAG 2.1
  AA by `scripts/check-contrast.mjs`. Body and accent colours target 4.5:1;
  code comments and border seams target the large-text and non-text thresholds.
- **Visible keyboard focus.** A two-pixel accent outline with a 2px offset on
  every focusable element, via `:focus-visible`. Obsidian's default ring is
  easy to lose against a warm ground.
- **Never colour alone.** Unresolved links get a dotted underline; callouts
  carry icons; the active tab gets an accent rule; headings step down by weight
  and size as well as colour.
- **Reduced motion honoured.** `prefers-reduced-motion: reduce` collapses every
  transition and animation.
- **Raised contrast honoured.** `prefers-contrast: more` firms up ink and
  borders automatically.

## Style Settings toggles

Install the **Style Settings** community plugin to get these. Without it the
defaults below apply and nothing breaks.

| Setting | Default | What it does |
|---|---|---|
| Always underline links | off | Links stop relying on colour (WCAG 1.4.1) |
| Increase contrast | off | Pushes ink to the extremes, firms up borders |
| Disable animations | off | Manual switch for people whose OS setting differs |
| Dyslexia-friendly body font | off | OpenDyslexic / Atkinson Hyperlegible, looser spacing |
| Body font size | 16px | 12–24px |
| Body line height | 1.6 | 1.2–2.2 |
| Readable line length | 42rem | 30–90rem |
| Accent colour | per scheme | Separate light and dark values |
| Plain table rows | off | Turns off zebra striping, which is on by default |
| Scanline texture on headings | off | Cosmetic CRT nod |

> [!warning] If you change the accent colour
> The shipped accents are the measured ones. A custom accent is not checked
> automatically — run `node scripts/check-contrast.mjs` after editing the
> palette in `theme.css`, or verify your value manually.

## Known limits

- The contrast script checks the shipped palette, not runtime overrides from
  Style Settings or `prefers-contrast`.
- Syntax-highlighting colours are checked against the editor background only,
  not against every possible code-block background a plugin might introduce.
