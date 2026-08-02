---
tags:
  - demo
  - index
---

# Retro Relay — test vault

This vault exists to exercise every element the theme styles. Open each note
side by side with the theme loaded, and switch between light and dark mode
(`Ctrl/Cmd + P` → *Toggle light/dark mode*) to check both schemes.

> [!tip] Fastest way to review
> Open the graph view (`Ctrl/Cmd + G`) with this note focused. The demo notes
> link to each other, so the graph has something to draw.

## Demo notes

- [[Callouts]] — all thirteen callout families, both schemes
- [[Code blocks]] — syntax tokens, inline code, long-line scrolling
- [[Tables]] — headers, zebra rows, numeric alignment, overflow
- [[Typography]] — heading scale, lists, quotes, marks
- [[Graph view]] — what to look for in node and link colours
- [[Accessibility]] — the Style Settings toggles and what each one does

## Checklist when reviewing a change

- [x] Dark mode still passes contrast (`node scripts/check-contrast.mjs`)
- [x] Light mode still passes contrast
- [ ] Callout titles legible in both schemes
- [ ] Focus ring visible when tabbing through the sidebar
- [ ] Nothing overflows the note width horizontally

An unresolved link looks like this: [[This note does not exist]] — it should
be dotted *and* coloured, not colour alone.

External links look like this: [obsidian.md](https://obsidian.md).
