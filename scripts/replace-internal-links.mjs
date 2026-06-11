import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = "src";

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }

    if (!/\.tsx?$/.test(entry)) {
      continue;
    }

    const content = readFileSync(path, "utf8");
    if (!content.includes('from "next/link"')) {
      continue;
    }

    writeFileSync(
      path,
      content.replaceAll('from "next/link"', 'from "@/components/ui/link"'),
    );
    console.log(path);
  }
}

walk(root);
