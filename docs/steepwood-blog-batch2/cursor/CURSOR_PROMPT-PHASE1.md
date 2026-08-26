# Cursor Prompt — Phase 1: Publish 30 posts with placeholder images

Paste this file to Cursor as the task brief. Work through it in order. Do not skip the inspection step.

**Scope of Phase 1.** All 30 posts live, correctly routed, correctly scheduled, fully schema'd, with dimension-correct placeholder images. **No image generation in this phase.** Phase 2 replaces the placeholders.

**Inputs, all in this handoff package:**

```
build/steepwood-blog-batch2/
├── SHARED_CONTEXT.md                  business facts, voice, design tokens, frontmatter contract
├── PUBLISHING-SCHEDULE.md             the 30 dates, keywords, internal-link rule, measurement plan
├── posts/{slug}.md                    × 30, the article bodies with frontmatter
├── research/
│   ├── TOPIC_SLATE.md                 scored slate, cannibalisation matrix, owner-confirmation list
│   ├── LOCATION-STRATEGY.md           NSW demand data, tiers, recommended new hubs, suburb vocabulary
│   ├── POST-BRIEFS-01-15.md           per-post briefs
│   ├── POST-BRIEFS-16-30.md           per-post briefs
│   ├── WRITER-INSTRUCTIONS.md         editorial rules the copy already follows
│   ├── NSW-MARKET-RESEARCH.md         full evidence base, 354 inline sources
│   └── RESEARCH-{slug}.md             × 30: word count, keywords, sources, 5 image alt texts, schema notes
└── cursor/
    ├── CURSOR_PROMPT-PHASE1.md        this file
    ├── CURSOR_PROMPT-PHASE2.md        image generation
    ├── SCHEMA-SPEC.md                 JSON-LD contract
    └── LOCAL-SEO-PLAYBOOK.md          off-page and on-site local SEO work
```

---

## Step 0 — Inspect before you change anything

Do not assume the stack. Report what you find before writing code.

1. Locate the existing blog content directory. Find where `custom-kitchen-cost-nsw-2026` lives and what format it is in — MDX, MD, or a CMS collection.
2. Open that file and record its **exact frontmatter field names, order and value types**. The 30 new posts must match it field for field.
3. Locate the blog post route and template component. Record how it renders the hero image, the OG image, the inline images, the breadcrumb, the category eyebrow, the reading time, the author aside, the related-articles grid, the footer quote CTA and the newsletter block.
4. Record how images are referenced. The expected convention is `/public/blog/{slug}/hero.jpg`, `og.jpg`, `inline-01.jpg`, `inline-02.jpg`, `inline-wide.jpg`, inserted by the template rather than by markdown.
5. Locate the sitemap generator, the RSS feed if one exists, the category taxonomy, and the existing JSON-LD implementation.
6. Confirm whether the build supports future-dated posts. If it does not, you will need the scheduling approach in Step 5.

**Report all six findings, then proceed.** If any of the 30 posts' frontmatter does not match the live schema, adapt the posts to the live schema — never change the live schema to suit the posts.

---

## Step 1 — Guardrails

These are hard failures. Check them before and after.

- **Never modify, republish or duplicate the six live Batch 1 posts:** `custom-kitchen-cost-nsw-2026`, `flat-pack-vs-custom-kitchen-australia`, `2pac-laminate-timber-veneer-kitchen-finishes-nsw`, `walk-in-robe-built-in-wardrobe-cost-guide-nsw`, `questions-to-ask-custom-joiner-australia`, `benchtop-guide-engineered-stone-ban-nsw`.
- **Never recreate the three retired slugs**, which are 301 redirected: `kitchen-storage-planning-australia`, `joinery-materials-guide-2pac-timber`, `australian-home-joinery-trends-2026`. Verify the redirects still resolve after deploy.
- **Do not touch the existing 301 redirect map** except to confirm it.
- **Do not create new location hub pages in this phase.** `LOCATION-STRATEGY.md` §4 recommends 16 new hubs; that is a separate scoped project. Blog posts must only link to the 16 existing hubs.
- **Do not alter the design system.** Reuse existing components and tokens. No new fonts, no new colours, no new radii.
- **Do not run a prettier or eslint pass across unrelated files.** Keep the diff to blog content, images, schema and sitemap.

---

## Step 2 — Import the 30 posts

1. Copy each `posts/{slug}.md` into the blog content directory, converting the extension to whatever the live posts use.
2. Map frontmatter to the live schema. The posts carry a new field `locationFocus`. If the live schema has no such field, either add it to the collection schema as an optional string, or drop it from the frontmatter and instead pass the value into the schema graph from a lookup table. Do not leave an unrecognised field that breaks the build.
3. Set `readingTime` if the template expects it as a field rather than computing it. Use `wordCount ÷ 225`, rounded up, from `RESEARCH-{slug}.md`.
4. Set `datePublished` from `PUBLISHING-SCHEDULE.md`, at `07:00` Australia/Sydney, `+10:00` offset.
5. Assign categories from the schedule table: Laundry, Kitchen Design, Materials, Cost Guides, Bathrooms, Staircases, Home Offices, Commercial, Buying Guides, Local Guides. If a category does not exist in the taxonomy, create it following the existing pattern, including its archive page if archives exist.

### MDX safety pass

Run this before building. It has caused build failures on this codebase pattern before.

- Find any raw `<` immediately followed by a digit or a letter that is not a valid JSX tag. Escape as `&lt;` or wrap in backticks.
- Confirm no custom JSX exists in the bodies except the blockquote CTA pattern.
- Confirm no unescaped `{` or `}` outside code fences.
- Confirm every markdown table has a matching column count in every row.

Command to find the common offender:

```bash
grep -rn '<[0-9]' posts/ || echo "clean"
```

---

## Step 3 — Placeholder images

Every post gets five placeholders at exact final dimensions, so that layout, cumulative layout shift and OG previews are correct now and Phase 2 is a pure file swap.

| File | Dimensions | Purpose |
| --- | --- | --- |
| `hero.jpg` | 1600 × 1000 | Article hero |
| `og.jpg` | 1200 × 630 | Open Graph and Twitter card |
| `inline-01.jpg` | 1200 × 900 | Two-up grid, left, upper third of article |
| `inline-02.jpg` | 1200 × 900 | Two-up grid, right, upper third of article |
| `inline-wide.jpg` | 1600 × 1000 | Full-width, after the FAQ section |

Placeholders must be **on-brand, not grey boxes**, because stakeholders will review the site in this state. Use the live design tokens: background `#F7F1E8` warm linen, ink `#1F1610`, and the dark espresso used in the hero band. Draw the slot name, the dimensions and the intended subject in ink on linen, with a thin ink rule. No stock imagery, no lorem ipsum.

Generate with a script rather than by hand. Node with `sharp`, which is likely already a dependency:

```js
// scripts/generate-blog-placeholders.mjs
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SLOTS = [
  { name: "hero", w: 1600, h: 1000 },
  { name: "og", w: 1200, h: 630 },
  { name: "inline-01", w: 1200, h: 900 },
  { name: "inline-02", w: 1200, h: 900 },
  { name: "inline-wide", w: 1600, h: 1000 },
];

const LINEN = "#F7F1E8";
const INK = "#1F1610";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ w, h, slot, slug, subject }) {
  const wrapped = wrap(subject, 46);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${LINEN}"/>
    <rect x="48" y="48" width="${w - 96}" height="${h - 96}" fill="none"
          stroke="${INK}" stroke-opacity="0.14" stroke-width="2"/>
    <text x="80" y="140" font-family="IBM Plex Mono, monospace" font-size="26"
          letter-spacing="3" fill="${INK}" fill-opacity="0.55">
      ${esc(slot.toUpperCase())} · ${w}×${h}
    </text>
    <line x1="80" y1="176" x2="${w - 80}" y2="176" stroke="${INK}" stroke-opacity="0.14" stroke-width="2"/>
    ${wrapped
      .map(
        (line, i) =>
          `<text x="80" y="${252 + i * 58}" font-family="Georgia, serif" font-size="46" fill="${INK}">${esc(line)}</text>`
      )
      .join("\n")}
    <text x="80" y="${h - 80}" font-family="IBM Plex Mono, monospace" font-size="22"
          letter-spacing="2" fill="${INK}" fill-opacity="0.45">
      ${esc(slug)} · PHASE 1 PLACEHOLDER
    </text>
  </svg>`;
}

function wrap(text, max) {
  const out = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if ((line + " " + word).trim().length > max) {
      out.push(line.trim());
      line = word;
    } else {
      line += " " + word;
    }
  }
  if (line.trim()) out.push(line.trim());
  return out.slice(0, 5);
}

// manifest: { slug: { hero: "subject line", og: "...", ... } }
const manifest = JSON.parse(
  await import("node:fs/promises").then((fs) =>
    fs.readFile("scripts/blog-image-manifest.json", "utf8")
  )
);

for (const [slug, slots] of Object.entries(manifest)) {
  const dir = join("public", "blog", slug);
  await mkdir(dir, { recursive: true });
  for (const s of SLOTS) {
    const subject = slots[s.name] ?? "Image pending";
    await sharp(
      Buffer.from(svg({ w: s.w, h: s.h, slot: s.name, slug, subject }))
    )
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(dir, `${s.name}.jpg`));
  }
  console.log("placeholders:", slug);
}
```

Build `scripts/blog-image-manifest.json` from the five alt texts in each `research/RESEARCH-{slug}.md`. That manifest is also the input to Phase 2, so get it right once.

**Alt text is not a placeholder.** Wire the real alt text from `RESEARCH-{slug}.md` into the template now. Phase 2 changes pixels only.

---

## Step 4 — Schema

Implement exactly `cursor/SCHEMA-SPEC.md`. One `<script type="application/ld+json">` per post containing a `@graph`. Add `HowTo` only where the post's research file says the post qualifies. Never add `Product`, `Offer` or article-level `Review`.

Run the validation gate in §7 of that spec against at least six posts spanning different categories before shipping any.

---

## Step 5 — Scheduling

One post per day, 22 August to 20 September 2026, at 07:00 Australia/Sydney.

If the build supports future-dated posts, set `datePublished` and let the filter exclude them. Confirm the filter compares in Australia/Sydney, not UTC — a UTC comparison publishes each post ten hours early, on the previous day.

If the build does not support future dating, add a `draft: true` field to posts 2 through 30 and clear one per day. Automate it rather than doing it by hand: a scheduled build that flips the flag, or a daily rebuild that respects `datePublished`.

Either way, verify:

- A future-dated post is absent from `/blog`, absent from the sitemap, absent from the RSS feed, and returns 404 or is noindex at its URL until its date.
- On its date it appears in all four places.
- `lastmod` in the sitemap matches `dateModified`.

---

## Step 6 — Internal links

Verify every internal link in all 30 posts.

1. Extract all internal hrefs and check each returns 200.
2. Confirm no post links to a Batch 2 post with a **later** publish date. This is the rule in `PUBLISHING-SCHEDULE.md` and it exists so that no live post contains a dead link during the rollout.
3. Confirm no post links to a location hub outside the 16 live ones: newcastle, sydney, canberra, melbourne, central-coast, hunter-valley, gold-coast, wollongong, brisbane, perth, byron-bay, port-macquarie, coffs-harbour, adelaide, bathurst, orange.
4. Confirm body hrefs omit the trailing slash, matching Batch 1 style.
5. Add the 30 posts to the related-articles logic so Batch 1 posts start receiving links from Batch 2. Prefer same-category, then same-`locationFocus`.

```bash
# quick link audit
grep -rhoE '\]\(/[^)]+\)' posts/ | sed 's/^](//;s/)$//' | sort -u
```

---

## Step 7 — The day-31 backfill pass

Diarise this. On 21 September 2026, after all 30 are live, run one editing pass adding forward links: every post from day 1 to day 29 gains two to three links to later posts in its own cluster. Until then the schedule rule forbids them.

This single pass is what converts 30 separate articles into five interlinked topic clusters, and it is the highest-leverage task in the whole project. Do not skip it.

Cluster map for the backfill:

- **Kitchen** — 02, 04, 05, 09, 11, 30, plus Batch 1 `custom-kitchen-cost-nsw-2026`
- **Materials** — 03, 06, 10, 13, plus Batch 1 `2pac-laminate-timber-veneer-kitchen-finishes-nsw` and `benchtop-guide-engineered-stone-ban-nsw`
- **Other rooms** — 01, 07, 08, 12
- **Commercial** — 14, 15, 16
- **Trust** — 17, 18, 19, plus Batch 1 `questions-to-ask-custom-joiner-australia`
- **Local** — 20 to 30, each linking to the two geographically nearest others

---

## Step 8 — Acceptance checklist

Do not report Phase 1 complete until every line passes.

**Build and routing**

- [ ] `npm run build` (or the project equivalent) completes with zero errors and no new warnings
- [ ] All 30 posts render at `/blog/{slug}` with hero, OG, both inline images, wide image, breadcrumb, category eyebrow, reading time, author aside, related articles, footer quote CTA and newsletter block intact
- [ ] The six Batch 1 posts are byte-identical to before the change
- [ ] The three retired slugs still 301 to their targets
- [ ] `/blog` index paginates correctly with 36 posts
- [ ] Every category archive resolves

**Content integrity**

- [ ] No raw `<` before a digit anywhere in the 30 posts
- [ ] No emoji, no markdown italics, no exclamation marks outside quoted dialogue
- [ ] No separate Sources or References heading in any post
- [ ] Australian spelling throughout
- [ ] Author is Sukhveer Kaur on all 30
- [ ] Both blockquote CTAs present per post with the exact class string from `SHARED_CONTEXT.md`
- [ ] Six FAQ questions rendered per post

**Images**

- [ ] 150 placeholder files exist at exactly the specified dimensions
- [ ] Real alt text wired from `RESEARCH-{slug}.md`, not placeholder alt text
- [ ] `scripts/blog-image-manifest.json` complete for all 30 slugs and all five slots
- [ ] OG preview renders correctly when a post URL is pasted into a link-preview tool

**Schema**

- [ ] Rich Results Test passes with zero errors on at least six sampled posts
- [ ] Schema Markup Validator returns zero errors on the same six
- [ ] Every marked-up FAQ is visible on the page
- [ ] Organisation node carries ABN 52 697 313 269 and Licence 489553C, rating 4.9 from 13 reviews
- [ ] No `Product`, `Offer` or article-level `Review` markup anywhere

**Scheduling and indexing**

- [ ] Timezone comparison is Australia/Sydney, verified by a future-dated test
- [ ] Sitemap includes only live posts, with correct `lastmod`
- [ ] RSS feed includes only live posts
- [ ] Robots and canonical tags correct on all 30
- [ ] Search Console indexing requested for day-1 post

**Owner confirmations**

- [ ] Every `NEEDS_OWNER_CONFIRMATION` item across the 30 research files has been resolved or the affected sentence has been softened to a sourced market range. The full list is in `TOPIC_SLATE.md` §4. **Post 19 and post 03 must not go live until their items are cleared.**

---

## Step 9 — Report

Return: files added, files modified, frontmatter mapping decisions, the scheduling approach chosen, link audit results, schema validation results, any post that needed content adjustment and why, and the outstanding owner-confirmation list.
