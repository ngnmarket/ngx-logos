export type LogoFormat = "png" | "webp" | "ico";

/**
 * Returns the absolute path to a logo file on disk.
 */
export function getLogoPath(symbol: string, format?: LogoFormat): string;

/**
 * Returns a jsDelivr CDN URL for a logo — no local files needed.
 */
export function getLogoUrl(symbol: string, format?: LogoFormat): string;

/**
 * Returns a list of all available NGX ticker symbols.
 */
export function listSymbols(): string[];

export const FORMATS: LogoFormat[];
