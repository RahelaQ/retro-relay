# Changelog

All notable changes to Retro Relay are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

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

[1.0.0]: https://github.com/RahelaQ/retro-relay-obsidian-theme/releases/tag/1.0.0
