# Contributing to NGX Logos

Thank you for helping improve this resource! Follow the steps below to add or update a company logo.

## Requirements

Each logo submission must include **all three formats** for the company's NGX ticker symbol:

| Format | Size | Filename example |
|--------|------|-----------------|
| PNG    | 200×200px, transparent background | `DANGCEM.png` |
| WebP   | 200×200px, transparent background | `DANGCEM.webp` |
| ICO    | Multi-size: 16×16, 32×32, 48×48px | `DANGCEM.ico` |

- Filenames must be the **NGX ticker symbol in uppercase**.
- Images must have a **transparent background** (no white or colored fill).
- The logo should be centered and not cropped.

## Conversion tools

If you only have the original logo in one format, use any of these free tools to convert:

- **[CloudConvert](https://cloudconvert.com)** — supports PNG, WebP, ICO and most other formats.
- **[Squoosh](https://squoosh.app)** — great for PNG → WebP conversion in the browser.
- **[Favicon.io](https://favicon.io/favicon-converter/)** — easy PNG → ICO conversion (select 16, 32, and 48px sizes).
- **[ConvertICO](https://convertico.com)** — dedicated PNG to ICO converter.

## Steps

1. Fork this repository.
2. Add your logo files to the appropriate `dist/` subdirectories:
   - `dist/png/SYMBOL.png`
   - `dist/webp/SYMBOL.webp`
   - `dist/ico/SYMBOL.ico`
3. Open a pull request with the title: `Add logo: SYMBOL` or `Update logo: SYMBOL`.
4. In the PR description, include a link to a public source confirming the logo (company website, annual report, NGX listing page, etc.).

## Notes

- If a company has rebranded or updated its logo, open a PR with the updated files and mention the old vs new branding in the description.
- Do not submit logos with watermarks, drop shadows, or colored backgrounds.
- All brand assets remain the property of their respective companies.
