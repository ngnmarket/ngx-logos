# 🇳🇬 NGX Logos

![npm](https://img.shields.io/npm/v/ngx-logos)
![license](https://img.shields.io/github/license/AsaoluElijah/ngx-logos)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

A community-maintained logo resource for companies listed on the **[Nigerian Stock Exchange](https://ngnmarket.com)**.

All logos are available in three standardized formats, with transparent backgrounds:

| Format | Size                  | Directory    |
| ------ | --------------------- | ------------ |
| PNG    | 200×200px             | `dist/png/`  |
| WebP   | 200×200px             | `dist/webp/` |
| ICO    | 16×16, 32×32, 48×48px | `dist/ico/`  |

## Usage

### Install

```bash
npm install ngx-logos
```

Or use without installing via `npx` (see CLI section below).

### JS / TS API

```js
// CommonJS
const { getLogoPath, getLogoUrl, listSymbols } = require('ngx-logos');

// ESM / TypeScript
import { getLogoPath, getLogoUrl, listSymbols } from 'ngx-logos';
```

```js
// Absolute path to the file on disk (useful for Node.js / build tools)
getLogoPath('DANGCEM', 'png');   // → <package_dir>/dist/png/DANGCEM.png
getLogoPath('GTCO', 'ico');      // → <package_dir>/dist/ico/GTCO.ico

// CDN URL via jsDelivr — no local files needed, great for frontend use
getLogoUrl('DANGCEM', 'webp');   // → https://cdn.jsdelivr.net/npm/ngx-logos/dist/webp/DANGCEM.webp
getLogoUrl('GTCO', 'png');       // → https://cdn.jsdelivr.net/npm/ngx-logos/dist/png/GTCO.png

// List all available ticker symbols
listSymbols();                   // → ['ACCESSCORP', 'DANGCEM', 'GTCO', ...]
```

### CLI — copy only the formats you need

```bash
# Copy all PNGs to ./public/logos (default)
npx ngx-logos copy

# Copy specific formats
npx ngx-logos copy --formats=png,webp --dest=./public/logos
npx ngx-logos copy --formats=ico --dest=./public/favicons

# Copy specific companies only
npx ngx-logos copy --formats=png --symbols=DANGCEM,GTCO --dest=./assets

# List all available symbols
npx ngx-logos list
```

When copying multiple formats, each gets its own subdirectory — e.g. `./public/logos/png/`, `./public/logos/webp/`, `./public/logos/ico/`. A single format copies directly into the destination folder.

### GitHub Raw URLs

You can reference logos directly without installing anything, using GitHub raw URLs or the jsDelivr CDN (recommended for production — cached and faster):

```text
# jsDelivr CDN (recommended)
https://cdn.jsdelivr.net/gh/ngnmarket/ngx-logos/dist/png/DANGCEM.png
https://cdn.jsdelivr.net/gh/ngnmarket/ngx-logos/dist/webp/GTCO.webp
https://cdn.jsdelivr.net/gh/ngnmarket/ngx-logos/dist/ico/ACCESS.ico

# GitHub Raw
https://raw.githubusercontent.com/ngnmarket/ngx-logos/main/dist/png/DANGCEM.png
https://raw.githubusercontent.com/ngnmarket/ngx-logos/main/dist/webp/GTCO.webp
https://raw.githubusercontent.com/ngnmarket/ngx-logos/main/dist/ico/ACCESS.ico
```

In HTML:

```html
<img src="https://cdn.jsdelivr.net/gh/ngnmarket/ngx-logos/dist/png/DANGCEM.png" alt="Dangote Cement" width="40" height="40" />
```

### Direct download

Browse and download individual logos from the [`dist/`](https://github.com/ngnmarket/ngx-logos/tree/main/dist) folder on GitHub.

## Companies

Logos are named by their NGX ticker symbol in uppercase — e.g. `DANGCEM.png`, `GTCO.webp`, `ACCESS.ico`.

Missing a company? See [CONTRIBUTING.md](./CONTRIBUTING.md) to add it.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add or update logos.

## License

The tooling and scripts in this repository are licensed under the [MIT License](./LICENSE).

All brand assets (logos, trademarks) remain the property of their respective companies. This repository provides them solely as a convenience resource.
