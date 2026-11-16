/**
 * Tell IndexNow (Bing and the other IndexNow engines) about Batch 4
 * and the posts edited by the legal-name fix or the backfill.
 *
 * Run only after https://steepwood.com.au/{key}.txt is live.
 * A 200 or 202 response means the list was accepted.
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const HOST = "steepwood.com.au";
const ORIGIN = `https://${HOST}`;

const NEW_POSTS = [
  "office-fitout-parramatta",
  "kitchen-installation-lake-macquarie",
  "shop-fitout-maitland",
  "deck-builders-lake-macquarie",
  "restaurant-fitout-newcastle",
  "home-office-joinery-north-shore-sydney",
  "pharmacy-fitout-nsw",
  "warehouse-office-fitout-western-sydney",
  "kitchen-installation-maitland-hunter-valley",
  "childcare-centre-joinery-nsw",
];

/** Batch 2 and Batch 3: legal-name fix. Backfill links are a subset of Batch 3. */
const EDITED_EARLIER_POSTS = [
  "laundry-joinery-cost-nsw",
  "kitchen-renovation-timeline-lead-times-nsw",
  "porcelain-sintered-stone-benchtop-cost-nsw",
  "butlers-pantry-cost-nsw",
  "cabinetry-cost-per-linear-metre-nsw",
  "blum-hardware-cost-australia",
  "floating-vanity-vs-floor-mounted-cost-nsw",
  "timber-staircase-cost-nsw",
  "kitchen-island-cost-nsw",
  "joinery-timber-species-guide-nsw",
  "hamptons-kitchen-cost-nsw",
  "home-office-joinery-cost-nsw",
  "custom-timber-furniture-cost-australia",
  "reception-desk-cost-australia",
  "office-fitout-joinery-cost-nsw",
  "shopfitting-cost-by-format-nsw",
  "cabinetmaker-hourly-rate-vs-charge-out-nsw",
  "why-custom-joinery-quotes-differ-australia",
  "nsw-building-licence-hbcf-warranty-guide",
  "joinery-cost-guide-newcastle-hunter",
  "joinery-cost-guide-central-coast",
  "joinery-cost-guide-wollongong-illawarra",
  "joinery-cost-guide-northern-beaches",
  "joinery-cost-guide-eastern-suburbs-sydney",
  "joinery-cost-guide-north-shore-sydney",
  "joinery-cost-guide-inner-west-sydney",
  "apartment-terrace-joinery-sydney",
  "southern-highlands-hunter-valley-joinery-guide",
  "regional-nsw-joinery-guide",
  "new-home-joinery-growth-corridors-nsw",
  "office-fitout-newcastle-guide",
  "kitchen-installation-cost-nsw",
  "shop-fitout-newcastle-guide",
  "decking-cost-newcastle",
  "home-office-joinery-newcastle",
  "commercial-joinery-newcastle-guide",
  "office-fitout-central-coast-guide",
  "kitchen-installation-newcastle",
  "composite-vs-timber-decking-central-coast",
  "shop-fitout-central-coast",
  "cafe-fitout-cost-nsw",
  "built-in-desk-study-nook-sydney",
  "kitchen-installation-central-coast",
  "office-fitout-timeline-nsw",
  "retail-shop-fitout-sydney",
  "deck-builders-sydney-cost",
  "medical-clinic-fitout-joinery-nsw",
  "commercial-joinery-sydney-builders",
  "kitchen-installation-sydney",
  "home-office-joinery-central-coast",
  "office-kitchenette-breakout-joinery",
  "shop-counter-display-joinery",
  "spotted-gum-merbau-blackbutt-decking-nsw",
  "salon-barber-shop-fitout-nsw",
  "kitchen-installation-process-day-by-day",
  "compact-laminate-commercial-joinery",
  "home-office-built-ins-hybrid-work-nsw",
  "office-fitout-sydney-small-business",
  "commercial-joinery-central-coast",
  "christmas-shutdown-fitout-planning-nsw",
];

function page(pathname) {
  const url = new URL(pathname, ORIGIN);
  if (url.pathname !== "/" && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }
  return url.href;
}

const urlList = [
  ...NEW_POSTS.map((slug) => page(`/blog/${slug}/`)),
  ...EDITED_EARLIER_POSTS.map((slug) => page(`/blog/${slug}/`)),
  page("/blog/"),
  `${ORIGIN}/sitemap.xml`,
  `${ORIGIN}/sitemap-images.xml`,
];

const publicDir = path.join(process.cwd(), "public");
const keyNames = readdirSync(publicDir).filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
if (keyNames.length !== 1) {
  throw new Error(`Expected one public/{32-hex}.txt IndexNow key, found ${keyNames.length}.`);
}
const key = keyNames[0].slice(0, -4);
const keyBody = readFileSync(path.join(publicDir, keyNames[0]), "utf8").trim();
if (keyBody !== key) {
  throw new Error("IndexNow key file must contain only the key.");
}

const payload = {
  host: HOST,
  key,
  keyLocation: `${ORIGIN}/${key}.txt`,
  urlList,
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
const text = await response.text();
console.log(`IndexNow HTTP ${response.status}`);
console.log(`URLs sent: ${urlList.length}`);
if (text) console.log(text.slice(0, 800));
if (response.status !== 200 && response.status !== 202) {
  process.exitCode = 1;
}
