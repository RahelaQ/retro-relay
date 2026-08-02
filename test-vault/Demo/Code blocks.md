---
tags:
  - demo
---

# Code blocks

Inline code is a bordered chip — `const x = 1` — so it reads as code even in
greyscale, not only by colour. Back to [[Start here]].

## JavaScript

```js
// Comments sit at --rr-ink-faint, checked at 4.0:1 or better.
import { readFile } from 'node:fs/promises';

const CONFIG = {
  retries: 3,
  timeout: 5_000,
  label: 'retro-relay',
};

export async function loadTheme(path) {
  const css = await readFile(path, 'utf8');
  if (!css.includes('@settings')) {
    throw new Error(`no Style Settings block in ${path}`);
  }
  return css.trim();
}
```

## CSS

```css
.theme-dark {
  --rr-accent: #F0A055;
  --rr-ink: #F2E9D8;
}

.callout[data-callout='warning'] {
  --callout-color: 240, 160, 85;
}
```

## Python

```python
from dataclasses import dataclass

@dataclass
class Swatch:
    name: str
    hex: str

    def is_dark(self) -> bool:
        r, g, b = (int(self.hex[i:i + 2], 16) for i in (1, 3, 5))
        return (r * 299 + g * 587 + b * 114) / 1000 < 128
```

## Shell

```bash
# Long lines scroll inside the block instead of widening the note.
node scripts/check-contrast.mjs && node scripts/build-release.mjs --out dist --verbose --check-manifest
```

## No language specified

```
Plain fenced block. No syntax colouring, same chrome.
```
