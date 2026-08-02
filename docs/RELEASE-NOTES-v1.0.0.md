# Retro Relay 1.0.0

First release. A warm analog theme for Obsidian — cream-on-cocoa in the dark,
ink-on-paper in the light, amber accent through both.

## What you get

**Two finished colour schemes.** Light mode is a full paper-and-ink palette
built in its own right, not a washed-out inversion of the dark one.

**Contrast that was measured, not guessed.** 34 foreground/background pairs
across both schemes are verified against WCAG 2.1 AA by a script in the repo.
Body text and accents target 4.5:1; code comments and border seams target the
large-text and non-text thresholds. The lowest body-text margin in either
scheme is 4.85:1. Run `node scripts/check-contrast.mjs` to confirm.

**Nothing depends on colour alone.** Callouts carry icons, unresolved links get
a dotted underline, the active tab gets an accent rule, and heading hierarchy
steps down by weight and size as well as hue.

**Graph view is styled in both schemes** — notes, tags, attachments, focused
and unresolved nodes separated, links set back, canvas on the theme ground
rather than black.

**Everything else you actually look at:** all thirteen callout families, a full
syntax token palette, bordered inline-code chips, shaded table headers with
zebra rows, monospace status bar, and a print stylesheet.

**Accessibility beyond contrast.** A visible two-pixel focus ring on every
focusable element, plus automatic support for `prefers-reduced-motion` and
`prefers-contrast: more`.

**Ten optional settings** via the Style Settings plugin — underline links,
increase contrast, disable animations, dyslexia-friendly font, font size, line
height, line length, accent colour, plain table rows, and a CRT scanline nod.
Each one defaults to the theme's shipped behaviour, so installing the plugin
changes nothing until you touch a switch.

## Installing

**From the community directory** (once published): Settings → Appearance →
Themes → Manage → search "Retro Relay".

**Manually:** download `theme.css` and `manifest.json` below, put them in a
folder named exactly `Retro Relay` under `.obsidian/themes/`, restart Obsidian,
then select the theme under Settings → Appearance.

## Requirements

Obsidian 1.5.0 or newer. Desktop and mobile. No plugins required.

## Notes

- No network access: one `theme.css`, local font stacks only, nothing fetched
  at runtime.
- If you customise the palette, re-run the contrast script — a custom accent is
  not verified automatically.
