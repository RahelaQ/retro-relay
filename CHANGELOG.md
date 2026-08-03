# Changelog

All notable changes to Retro Relay are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [1.1.0] — 2026-08-03

### Changed

- Dark palette recoloured from a warm brown-black ground to graphite with a
  slight cool cast, still paired with cream ink and the amber accent — the
  cool ground against warm ink is what keeps it recognisably the same theme
  as the light scheme.

### Added

- Spectrum bar: a broadcast-style chromatic band along the window's top edge,
  built from palette tokens so it re-tints with the colour scheme. Smooth by
  default, with a hard-edged "VHS" variant and an adjustable height.
- Atmospheric cloud wash across dark-mode panes, with a stronger optional
  variant. Kept within the contrast script's targets at both strengths.
- Graph view orbital plate — a faint star glow, coloured orbits and a reticle
  behind the force-directed layout, each independently adjustable.
- Seven new Style Settings covering the above (spectrum bar visibility, style
  and height; cloud wash strength; orbital plate visibility and opacity).

### Fixed

- Cleared four warnings from Obsidian's theme linter: a partially-supported
  `text-decoration` shorthand, two `:has()` selectors doing work that could be
  done without one (one of which was silently inverted from its intent), and
  a `break-inside` property swapped for its better-supported `page-break-inside`
  alias.

## [1.0.0] — 2026-08-02

First release.

### Added

- Complete dark palette — warm brown-black ground, cream ink, amber accent.
- Complete light palette — paper ground, deep brown ink, burnt-amber accent.
  Built as its own palette rather than an inversion of the dark one.
- Contrast verification script (`scripts/check-contrast.mjs`) covering 34
  foreground/background pairs across both schemes against WCAG 2.1 AA.
- Graph view styling for both schemes — note, tag, attachment, focused and
  unresolved nodes, link colour, canvas ground and the controls panel.
- All thirteen Obsidian callout families, aliases included, each with a
  distinct colour in both schemes.
- Full syntax token palette for code blocks, bordered inline-code chips, a
  hover language badge and contained horizontal overflow.
- Table styling — shaded headers, zebra rows on by default, tabular numerals
  and overflow contained to the table.
- Workspace chrome — titlebar, tabs with an accent rule on the active tab,
  sidebar, nav items, status bar in monospace.
- Visible `:focus-visible` ring on every focusable element.
- `prefers-reduced-motion` and `prefers-contrast: more` support.
- Print stylesheet — paper ground, black ink, expanded external link targets.
- Ten Style Settings options, each defaulting to the theme's shipped behaviour.
- `test-vault/` exercising every styled element, with the theme preselected.
- Release tooling (`scripts/build-release.mjs`) that validates the manifest
  against Obsidian's theme schema and emits only the two shipped files.

[1.1.0]: https://github.com/RahelaQ/retro-relay/releases/tag/1.1.0
[1.0.0]: https://github.com/RahelaQ/retro-relay/releases/tag/1.0.0
