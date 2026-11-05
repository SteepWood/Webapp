/**
 * Batch 3 backfill: add 2–3 forward cluster links into earlier posts.
 * Priority list from PUBLISHING-SCHEDULE.md "Backfill pass".
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const POSTS = path.join(process.cwd(), "docs", "blog", "batch3", "posts");

/** Insert before the FAQ H2, after a short "Related guides" paragraph. */
const LINKS = {
  "office-fitout-newcastle-guide": [
    {
      url: "/blog/office-fitout-timeline-nsw",
      anchor: "how long an office fitout takes in NSW",
    },
    {
      url: "/blog/office-kitchenette-breakout-joinery",
      anchor: "office kitchenette and breakout joinery",
    },
    {
      url: "/blog/christmas-shutdown-fitout-planning-nsw",
      anchor: "Christmas shutdown fitout planning",
    },
  ],
  "kitchen-installation-cost-nsw": [
    {
      url: "/blog/kitchen-installation-sydney",
      anchor: "kitchen installation in Sydney",
    },
    {
      url: "/blog/kitchen-installation-process-day-by-day",
      anchor: "day-by-day kitchen installation process",
    },
  ],
  "shop-fitout-newcastle-guide": [
    {
      url: "/blog/shop-counter-display-joinery",
      anchor: "custom shop counters and display joinery",
    },
    {
      url: "/blog/salon-barber-shop-fitout-nsw",
      anchor: "salon and barber shop fitouts in NSW",
    },
  ],
  "decking-cost-newcastle": [
    {
      url: "/blog/deck-builders-sydney-cost",
      anchor: "deck builders and costs in Sydney",
    },
    {
      url: "/blog/spotted-gum-merbau-blackbutt-decking-nsw",
      anchor: "Spotted Gum, Merbau and Blackbutt decking guide",
    },
  ],
  "home-office-joinery-newcastle": [
    {
      url: "/blog/home-office-joinery-central-coast",
      anchor: "home office joinery on the Central Coast",
    },
    {
      url: "/blog/home-office-built-ins-hybrid-work-nsw",
      anchor: "home office built-ins for hybrid work",
    },
  ],
  "commercial-joinery-newcastle-guide": [
    {
      url: "/blog/commercial-joinery-sydney-builders",
      anchor: "commercial joinery for Sydney builders",
    },
    {
      url: "/blog/compact-laminate-commercial-joinery",
      anchor: "compact laminate for commercial joinery",
    },
    {
      url: "/blog/commercial-joinery-central-coast",
      anchor: "commercial joinery on the Central Coast",
    },
  ],
  "office-fitout-central-coast-guide": [
    {
      url: "/blog/office-fitout-sydney-small-business",
      anchor: "small-business office fitouts in Sydney",
    },
    {
      url: "/blog/commercial-joinery-central-coast",
      anchor: "commercial joinery on the Central Coast",
    },
  ],
  "composite-vs-timber-decking-central-coast": [
    {
      url: "/blog/deck-builders-sydney-cost",
      anchor: "deck builders and costs in Sydney",
    },
    {
      url: "/blog/spotted-gum-merbau-blackbutt-decking-nsw",
      anchor: "hardwood decking species for NSW",
    },
  ],
  "shop-fitout-central-coast": [
    {
      url: "/blog/shop-counter-display-joinery",
      anchor: "custom shop counters and display joinery",
    },
    {
      url: "/blog/salon-barber-shop-fitout-nsw",
      anchor: "salon and barber shop fitouts",
    },
    {
      url: "/blog/commercial-joinery-central-coast",
      anchor: "commercial joinery on the Central Coast",
    },
  ],
  "cafe-fitout-cost-nsw": [
    {
      url: "/blog/shop-counter-display-joinery",
      anchor: "custom shop counters and display joinery",
    },
    {
      url: "/blog/compact-laminate-commercial-joinery",
      anchor: "compact laminate for commercial joinery",
    },
  ],
  "office-fitout-timeline-nsw": [
    {
      url: "/blog/office-fitout-sydney-small-business",
      anchor: "small office fitouts in Sydney",
    },
    {
      url: "/blog/christmas-shutdown-fitout-planning-nsw",
      anchor: "Christmas shutdown fitout planning",
    },
  ],
  "medical-clinic-fitout-joinery-nsw": [
    {
      url: "/blog/compact-laminate-commercial-joinery",
      anchor: "compact laminate for commercial joinery",
    },
    {
      url: "/blog/commercial-joinery-central-coast",
      anchor: "commercial joinery on the Central Coast",
    },
  ],
  "office-kitchenette-breakout-joinery": [
    {
      url: "/blog/compact-laminate-commercial-joinery",
      anchor: "compact laminate for commercial joinery",
    },
    {
      url: "/blog/office-fitout-sydney-small-business",
      anchor: "small-business office fitouts in Sydney",
    },
  ],
};

function relatedBlock(links) {
  const items = links
    .map((link) => `- [${link.anchor}](${link.url})`)
    .join("\n");
  return `\n## Related guides in this series\n\n${items}\n`;
}

let updated = 0;
for (const [slug, links] of Object.entries(LINKS)) {
  const filePath = path.join(POSTS, `${slug}.md`);
  let raw = readFileSync(filePath, "utf8");
  if (raw.includes("## Related guides in this series")) {
    console.log("skip (already backfilled):", slug);
    continue;
  }

  const marker = "## Frequently asked questions";
  if (!raw.includes(marker)) {
    throw new Error(`Missing FAQ heading in ${slug}`);
  }

  raw = raw.replace(marker, `${relatedBlock(links)}\n${marker}`);
  writeFileSync(filePath, raw, "utf8");
  updated += 1;
  console.log("backfilled:", slug);
}

console.log(`Updated ${updated} posts.`);
