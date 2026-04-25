#!/usr/bin/env node

/**
 * Processes raw logo files from logos/ into standardized dist/ outputs:
 *   dist/png/  — 200×200 PNG (transparent background)
 *   dist/webp/ — 200×200 WebP (transparent background)
 *   dist/ico/  — multi-size ICO (16×16, 32×32, 48×48)
 *
 * Usage: node scripts/process.js
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

/**
 * Builds an ICO file buffer from an array of PNG buffers.
 * Embeds PNGs directly (PNG-in-ICO), supported by all modern browsers and OSes.
 */
function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize * count;

  let offset = dataOffset;
  const offsets = pngBuffers.map((buf) => {
    const o = offset;
    offset += buf.length;
    return o;
  });

  const result = Buffer.alloc(offset);
  result.writeUInt16LE(0, 0); // reserved
  result.writeUInt16LE(1, 2); // type: 1 = ICO
  result.writeUInt16LE(count, 4);

  for (let i = 0; i < count; i++) {
    const base = headerSize + i * entrySize;
    const size = sizes[i];
    result.writeUInt8(size >= 256 ? 0 : size, base);     // width (0 = 256)
    result.writeUInt8(size >= 256 ? 0 : size, base + 1); // height
    result.writeUInt8(0, base + 2);                       // colorCount
    result.writeUInt8(0, base + 3);                       // reserved
    result.writeUInt16LE(1, base + 4);                    // planes
    result.writeUInt16LE(32, base + 6);                   // bitCount
    result.writeUInt32LE(pngBuffers[i].length, base + 8); // size
    result.writeUInt32LE(offsets[i], base + 12);          // offset
  }

  pngBuffers.forEach((buf, i) => buf.copy(result, offsets[i]));
  return result;
}

const LOGOS_DIR = path.join(__dirname, "../logos");
const DIST = {
  png: path.join(__dirname, "../dist/png"),
  webp: path.join(__dirname, "../dist/webp"),
  ico: path.join(__dirname, "../dist/ico"),
};

const PNG_SIZE = 200;
const ICO_SIZES = [16, 32, 48];

for (const dir of Object.values(DIST)) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processLogo(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const symbol = path.basename(filePath, ext); // preserves original casing e.g. DANGCEM

  const supported = [".png", ".jpg", ".jpeg", ".webp", ".svg"];
  if (!supported.includes(ext)) return;

  console.log(`Processing ${symbol}...`);

  const base = sharp(filePath).resize(PNG_SIZE, PNG_SIZE, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 }, // transparent
  });

  // PNG
  const pngBuffer = await base.clone().png().toBuffer();
  fs.writeFileSync(path.join(DIST.png, `${symbol}.png`), pngBuffer);

  // WebP
  await sharp(pngBuffer).webp({ lossless: true }).toFile(path.join(DIST.webp, `${symbol}.webp`));

  // ICO — downsample from the normalized 200×200 PNG for consistent quality,
  // then apply a sharpen pass to compensate for detail loss at small sizes
  const icoBuffers = await Promise.all(
    ICO_SIZES.map((size) =>
      sharp(pngBuffer)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: sharp.kernel.lanczos3,
        })
        .sharpen({ sigma: 0.5, m1: 1.5, m2: 0.5 })
        .png({ compressionLevel: 9 })
        .toBuffer()
    )
  );

  fs.writeFileSync(path.join(DIST.ico, `${symbol}.ico`), buildIco(icoBuffers, ICO_SIZES));

  console.log(`  [OK] ${symbol} → PNG, WebP, ICO`);
}

async function main() {
  const files = fs.readdirSync(LOGOS_DIR);

  if (!files.length) {
    console.error("No files found in logos/. Add source images first.");
    process.exit(1);
  }

  let success = 0;
  let failed = 0;

  for (const file of files) {
    try {
      await processLogo(path.join(LOGOS_DIR, file));
      success++;
    } catch (err) {
      console.error(`  [FAILED] ${file} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${success} processed, ${failed} failed.`);
  console.log(`Output: dist/png/, dist/webp/, dist/ico/`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
