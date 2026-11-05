import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const POSTS_DIR = path.join(
  process.cwd(),
  "docs",
  "blog",
  "batch3",
  "posts",
);

function faqMd(faq) {
  const out = ["## Frequently asked questions", ""];
  for (const item of faq) {
    out.push(`### ${item.question}`, "", item.answer.trim(), "");
  }
  return `${out.join("\n").trimEnd()}\n`;
}

let updated = 0;
for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
  const filePath = path.join(POSTS_DIR, file);
  const raw = readFileSync(filePath, "utf8");
  if (!raw.includes("[[FAQ]]")) continue;

  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Bad frontmatter: ${file}`);

  const fm = parseYaml(match[1]);
  const body = match[2].replace("[[FAQ]]", faqMd(fm.faq ?? []).trimEnd());
  writeFileSync(filePath, `---\n${match[1]}\n---\n${body}`, "utf8");
  updated += 1;
  console.log("expanded FAQ:", file);
}

console.log(`Updated ${updated} posts.`);
