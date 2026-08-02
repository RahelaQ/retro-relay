---
tags:
  - demo
---

# Callouts

Every type carries an icon as well as a colour, so meaning survives greyscale
printing and colour-blind viewing. Back to [[Start here]].

> [!note] Note
> The default. Blue, hairline border, accent rule on the left.

> [!abstract] Abstract / Summary / TLDR
> Teal. Use for the one-paragraph version of a long note.

> [!info] Info
> Blue, same family as note.

> [!todo] Todo
> Muted blue — deliberately quieter than warning.

> [!tip] Tip / Hint / Important
> Teal. Reads as helpful rather than urgent.

> [!success] Success / Check / Done
> Green.

> [!question] Question / Help / FAQ
> Yellow.

> [!warning] Warning / Caution / Attention
> Amber — the theme's accent hue, so warnings feel native rather than bolted on.

> [!failure] Failure / Fail / Missing
> Dusty red, softer than danger.

> [!danger] Danger / Error
> Red, the loudest thing in the palette.

> [!bug] Bug
> Magenta.

> [!example] Example
> Purple.

> [!quote] Quote / Cite
> Muted sand — recedes, as a citation should.

## Nesting and folding

> [!warning] Foldable callouts work too
> > [!note] Nested
> > Borders and fills compose without turning to mud.

> [!info]- Collapsed by default
> The `-` suffix starts it folded. The chevron inherits the callout colour.

## Callout with rich content

> [!example] Mixed content
> A table, code and a list inside one callout:
>
> | Element | Styled |
> |---|---|
> | Table | yes |
> | Code | yes |
>
> ```js
> const ok = true;
> ```
>
> - list item
> - another
