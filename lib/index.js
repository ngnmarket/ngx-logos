"use strict";

const fs = require("fs");
const path = require("path");

const FORMATS = ["png", "webp", "ico"];
const DIST_DIR = path.join(__dirname, "..", "dist");

/**
 * Returns the absolute path to a logo file.
 * @param {string} symbol - NGX ticker symbol e.g. "DANGCEM"
 * @param {"png"|"webp"|"ico"} format
 */
function getLogoPath(symbol, format = "png") {
  if (!FORMATS.includes(format)) {
    throw new Error(`Unsupported format "${format}". Valid formats: ${FORMATS.join(", ")}`);
  }
  return path.join(DIST_DIR, format, `${symbol}.${format}`);
}

/**
 * Returns a jsDelivr CDN URL for a logo (no local files needed).
 * @param {string} symbol - NGX ticker symbol e.g. "DANGCEM"
 * @param {"png"|"webp"|"ico"} format
 */
function getLogoUrl(symbol, format = "png") {
  if (!FORMATS.includes(format)) {
    throw new Error(`Unsupported format "${format}". Valid formats: ${FORMATS.join(", ")}`);
  }
  return `https://cdn.jsdelivr.net/npm/ngx-logos/dist/${format}/${symbol}.${format}`;
}

/**
 * Returns a list of all available ticker symbols.
 */
function listSymbols() {
  const pngDir = path.join(DIST_DIR, "png");
  if (!fs.existsSync(pngDir)) return [];
  return fs.readdirSync(pngDir).map((f) => path.basename(f, ".png"));
}

module.exports = { getLogoPath, getLogoUrl, listSymbols, FORMATS };
