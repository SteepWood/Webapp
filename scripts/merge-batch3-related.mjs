import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const POSTS = path.join(process.cwd(), "docs", "blog", "batch3", "posts");

const ADD = {
  "office-fitout-newcastle-guide": [
    "office-fitout-timeline-nsw",
    "office-kitchenette-breakout-joinery",
    "christmas-shutdown-fitout-planning-nsw",
  ],
  "kitchen-installation-cost-nsw": [
    "kitchen-installation-sydney",
    "kitchen-installation-process-day-by-day",
  ],
  "shop-fitout-newcastle-guide": [
    "shop-counter-display-joinery",
    "salon-barber-shop-fitout-nsw",
  ],
  "decking-cost-newcastle": [
    "deck-builders-sydney-cost",
    "spotted-gum-merbau-blackbutt-decking-nsw",
  ],
  "home-office-joinery-newcastle": [
    "home-office-joinery-central-coast",
    "home-office-built-ins-hybrid-work-nsw",
  ],
  "commercial-joinery-newcastle-guide": [
    "commercial-joinery-sydney-builders",
    "compact-laminate-commercial-joinery",
    "commercial-joinery-central-coast",
  ],
  "office-fitout-central-coast-guide": [
    "office-fitout-sydney-small-business",
    "commercial-joinery-central-coast",
  ],
  "composite-vs-timber-decking-central-coast": [
    "deck-builders-sydney-cost",
    "spotted-gum-merbau-blackbutt-decking-nsw",
  ],
  "shop-fitout-central-coast": [
    "shop-counter-display-joinery",
    "salon-barber-shop-fitout-nsw",
    "commercial-joinery-central-coast",
  ],
  "cafe-fitout-cost-nsw": [
    "shop-counter-display-joinery",
    "compact-laminate-commercial-joinery",
  ],
  "office-fitout-timeline-nsw": [
    "office-fitout-sydney-small-business",
    "christmas-shutdown-fitout-planning-nsw",
  ],
  "medical-clinic-fitout-joinery-nsw": [
    "compact-laminate-commercial-joinery",
    "commercial-joinery-central-coast",
  ],
  "office-kitchenette-breakout-joinery": [
    "compact-laminate-commercial-joinery",
    "office-fitout-sydney-small-business",
  ],
};

for (const [slug, extras] of Object.entries(ADD)) {
  const filePath = path.join(POSTS, `${slug}.md`);
  let raw = readFileSync(filePath, "utf8");
  const match = raw.match(
    /relatedPosts:\r?\n((?:  - "[^"]+"\r?\n)+)/,
  );
  if (!match) {
    throw new Error(`No relatedPosts block in ${slug}`);
  }

  const existing = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const merged = [...new Set([...existing, ...extras])];
  const block = `relatedPosts:\n${merged.map((s) => `  - "${s}"\n`).join("")}`;
  raw = raw.replace(match[0], block);
  writeFileSync(filePath, raw, "utf8");
  console.log(slug, "→", merged.length, "related");
}
