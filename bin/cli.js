#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const FORMATS = ["png", "webp", "ico"];
const DIST_DIR = path.join(__dirname, "..", "dist");
const VERSION = require("../package.json").version;

const HELP = `
ngx-logos v${VERSION}
Logo resources for companies listed on the Nigerian Exchange Group (NGX)

Usage:
  npx ngx-logos <command> [options]

Commands:
  copy    Copy logo files to a destination directory
  list    List all available ticker symbols

Options (copy):
  --formats <list>   Comma-separated formats to copy: png,webp,ico
                     Default: png
  --dest    <path>   Destination directory
                     Default: ./public/logos
  --symbols <list>   Comma-separated symbols to copy (e.g. DANGCEM,GTCO)
                     Default: all

Examples:
  npx ngx-logos copy
  npx ngx-logos copy --formats=png,webp --dest=./public/logos
  npx ngx-logos copy --formats=ico --dest=./public/favicons
  npx ngx-logos copy --formats=png --symbols=DANGCEM,GTCO --dest=./assets
  npx ngx-logos list
`;

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    const match = arg.match(/^--(\w+)(?:=(.+))?$/);
    if (match) args[match[1]] = match[2] ?? true;
  }
  return args;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function allSymbols() {
  const pngDir = path.join(DIST_DIR, "png");
  if (!fs.existsSync(pngDir)) return [];
  return fs.readdirSync(pngDir).map((f) => path.basename(f, ".png"));
}

function cmdList() {
  const symbols = allSymbols();
  if (!symbols.length) {
    console.log("No logos found. Make sure the package is installed correctly.");
    return;
  }
  console.log(`${symbols.length} companies available:\n`);
  console.log(symbols.join("  "));
}

function cmdCopy(args) {
  const formats = (args.formats || "png")
    .split(",")
    .map((f) => f.trim().toLowerCase())
    .filter(Boolean);

  const invalidFormats = formats.filter((f) => !FORMATS.includes(f));
  if (invalidFormats.length) {
    console.error(`Invalid format(s): ${invalidFormats.join(", ")}. Valid: ${FORMATS.join(", ")}`);
    process.exit(1);
  }

  const dest = path.resolve(args.dest || "./public/logos");

  const symbols = args.symbols
    ? args.symbols.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean)
    : allSymbols();

  if (!symbols.length) {
    console.error("No symbols found. Make sure the package is installed correctly.");
    process.exit(1);
  }

  console.log(`Copying ${symbols.length} logo(s) in [${formats.join(", ")}] to ${dest} ...\n`);

  let copied = 0;
  let missing = 0;

  for (const format of formats) {
    const formatDest = formats.length > 1 ? path.join(dest, format) : dest;
    ensureDir(formatDest);

    for (const symbol of symbols) {
      const src = path.join(DIST_DIR, format, `${symbol}.${format}`);
      if (!fs.existsSync(src)) {
        console.warn(`  [MISSING] ${symbol}.${format}`);
        missing++;
        continue;
      }
      fs.copyFileSync(src, path.join(formatDest, `${symbol}.${format}`));
      copied++;
    }
  }

  console.log(`\nDone. ${copied} file(s) copied${missing ? `, ${missing} not found` : ""}.`);
  if (formats.length > 1) {
    console.log(`Output: ${formats.map((f) => path.join(dest, f)).join(", ")}`);
  } else {
    console.log(`Output: ${dest}`);
  }
}

const [,, command, ...rest] = process.argv;
const args = parseArgs(rest);

if (!command || command === "--help" || command === "-h") {
  console.log(HELP);
} else if (command === "list") {
  cmdList();
} else if (command === "copy") {
  cmdCopy(args);
} else {
  console.error(`Unknown command: "${command}"\n`);
  console.log(HELP);
  process.exit(1);
}
