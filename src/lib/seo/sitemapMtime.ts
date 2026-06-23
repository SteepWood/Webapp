import fs from "node:fs";
import path from "node:path";

/** Returns file mtime for sitemap lastmod hints; falls back to now when missing. */
export function fileMtime(relPath: string): Date {
  try {
    const stat = fs.statSync(path.join(process.cwd(), relPath));
    return stat.mtime;
  } catch {
    return new Date();
  }
}

export function maxMtime(...relPaths: string[]): Date {
  const timestamps = relPaths.map((relPath) => fileMtime(relPath).getTime());
  return new Date(Math.max(...timestamps));
}
