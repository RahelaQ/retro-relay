# Retro Relay 1.1.0

A recolour and three new furniture pieces for the dark scheme, plus four
theme-linter warnings cleared.

## What's new

**Graphite dark scheme.** The dark ground moves from a warm brown-black to
graphite with a slight cool cast. Cream ink and the amber accent stay as they
were — the cool ground against warm ink is what keeps this recognisably the
same theme.

**A spectrum bar** along the window's top edge — a broadcast-style colour
band built entirely from palette tokens, so it re-tints with the scheme and
with a custom accent. Smooth by default, with a hard-edged VHS variant and an
adjustable height.

**An atmospheric cloud wash** across dark-mode panes, with a stronger optional
variant. Checked by hand against the contrast script's targets at both
strengths.

**An orbital plate behind the graph view** — a faint star glow, coloured
orbits and a reticle give the force-directed layout a chart to drift across.
Fixed to the viewport rather than the nodes (CSS cannot read node positions
from the WebGL canvas), faint by default so the graph itself stays the
subject.

**Seven new Style Settings** covering all of the above — spectrum bar
visibility, style and height; cloud wash strength; orbital plate visibility
and opacity. Seventeen settings total, each still defaulting to the theme's
shipped behaviour.

## Fixed

Cleared all four warnings Obsidian's theme linter raised against 1.0.0: a
partially-supported `text-decoration` shorthand, two `:has()` selectors doing
work achievable without one (one of which was silently inverted from its
intent, applying tabular numerals to prose cells instead of numeric ones),
and a `break-inside` property swapped for the better-supported
`page-break-inside` alias.

## Installing

Existing installs update automatically once this release is live. Manual
installs: download `theme.css` and `manifest.json` below, replace the copies
in `.obsidian/themes/Retro Relay/`, restart Obsidian.

## Requirements

Obsidian 1.5.0 or newer. Desktop and mobile. No plugins required.

## Notes

- No network access: local font stacks only, nothing fetched at runtime.
- All 34 contrast pairs still pass WCAG 2.1 AA — re-verified with
  `node scripts/check-contrast.mjs` after every change in this release.
