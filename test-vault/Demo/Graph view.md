---
tags:
  - demo
---

# Graph view

Open the graph with `Ctrl/Cmd + G`. Because the demo notes link to each other
and to [[Start here]], there is a real structure to look at rather than a
single dot.

## What the theme styles

| Element | Variable | Dark | Light |
|---|---|---|---|
| Note node | `--graph-node` | cream | deep brown |
| Focused node | `--graph-node-focused` | amber | burnt amber |
| Tag node | `--graph-node-tag` | teal | dark teal |
| Attachment node | `--graph-node-attachment` | purple | dark purple |
| Unresolved node | `--graph-node-unresolved` | translucent red | translucent red |
| Links | `--graph-line` | warm sand at 28% | warm brown at 28% |

The canvas sits on `--background-primary` rather than pure black, so the graph
belongs to the same room as the rest of the interface. The controls panel picks
up the theme's border, radius and shadow tokens.

> [!note] Node kind is not colour-only
> Obsidian already varies node size by link count, and the focus ring marks the
> active node. Colour is a third signal, not the only one.

## Things worth checking after a palette change

- [ ] Links are visible against the canvas but do not compete with nodes
- [ ] Unresolved nodes read as incomplete, not as errors
- [ ] Tag nodes are distinguishable from note nodes in both schemes
- [ ] The controls panel border is visible against the canvas
