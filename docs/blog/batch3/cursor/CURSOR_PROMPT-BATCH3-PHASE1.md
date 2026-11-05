# Cursor Prompt — Batch 3, Phase 1: Publish 30 posts with placeholder images

> **Update 6 November 2026:** the owner wants all 30 published now. Run `CURSOR_PROMPT-BATCH3-PUBLISH-ALL-NOW.md`. It overrides Step 3.3 (dates), Step 6 (date gate) and Step 10 (backfill timing) below.

Give this file to Cursor as the task brief and work through it in order. Do not skip Step 0.

**Phase 1 scope.** All 30 Batch 3 posts imported, routed, date-gated to publish one per day at 07:00 Sydney time, with full schema and placeholder images at the correct dimensions. **No image generation in this phase.** Phase 2 (`CURSOR_PROMPT-BATCH3-PHASE2.md`) replaces the placeholders.

**Inputs (this package):**

```
blog-batch3/
├── README.md                         overview and owner-confirmation list
├── PUBLISHING-SCHEDULE.md            30 dates, keywords, categories, daily routine, backfill
├── KEYWORD-MAP.md                    primary/secondary keywords, cannibalisation check, clusters
├── posts/{slug}.md                   × 30 article bodies with frontmatter
├── scripts/
│   ├── build_and_validate.py         validator; --build expands [[FAQ]] markers
│   ├── build_handoff.py              rebuilds research records and briefs
│   ├── build_image_pack.py           builds prompts, metadata and manifest
│   └── image_data.py                 per-image subjects and alt text
├── images/
│   ├── IMAGE-PROMPTS.md              150 prompts (Phase 2)
│   ├── image-metadata.json           150 SEO metadata records
│   └── blog-image-manifest.json      slug → slot → subject/alt (Phase 1 placeholders use this)
├── research/
│   ├── NSW-MARKET-RESEARCH-BATCH3.md competitors, gaps, locations, keyword strategy
│   ├── LOCATION-STRATEGY.md          location tiers and location by post
│   ├── POST-BRIEFS-01-15.md          briefs, posts 1–15
│   ├── POST-BRIEFS-16-30.md          briefs, posts 16–30
│   ├── RESEARCH-{slug}.md × 30       per-post research record, schema service node, owner flags
│   └── IMAGE-ALT-TEXT.md             150 alt texts
└── cursor/
    ├── CURSOR_PROMPT-BATCH3-PHASE1.md   this file
    └── CURSOR_PROMPT-BATCH3-PHASE2.md   image generation and install
```

Reused from Batch 2 without changes: `blog-batch2/cursor/SCHEMA-SPEC.md`, `blog-batch2/cursor/LOCAL-SEO-PLAYBOOK.md`, `blog-batch2/SHARED_CONTEXT.md` (business facts, voice, design tokens).

---

## Step 0 — Inspect before changing anything

Report what you find before writing code.

1. Find the blog content directory and open a live Batch 2 post, for example `laundry-joinery-cost-nsw`. Record the **exact frontmatter field names, order and value types**. Batch 3 must match them field for field.
2. Find the post route and template. Record how it renders the hero, OG, the inline images, the breadcrumb, category eyebrow, reading time, author aside, related articles, FAQ, CTA blockquote and footer quote CTA.
3. Record how Batch 2 implemented the date gate (future-dated posts hidden until 07:00 Sydney time) and reuse it. Do not build a second mechanism.
4. Find the category taxonomy. Check whether **Decking** and **Materials** exist.
5. Find the sitemap generator, RSS feed and JSON-LD implementation from Batch 2.
6. Check how Batch 2 rendered the FAQ: from frontmatter `faq`, from a body section, or both.

**Report all six findings, then continue.** If the Batch 3 frontmatter does not match the live schema, adapt the posts to the live schema. Never change the live schema to fit the posts.

---

## Step 1 — Guardrails (hard failures)

- **Never modify, republish or duplicate the 36 live posts** (6 Batch 1 and 30 Batch 2). The one exception is the URL fix in Step 7.
- **Never recreate the retired slugs** (301 redirected): `kitchen-storage-planning-australia`, `joinery-materials-guide-2pac-timber`, `australian-home-joinery-trends-2026`. Confirm the redirects still resolve after deploy.
- **Do not touch the redirect map** except to confirm it.
- **Do not create new location hubs or service pages** in Phase 1. Posts link only to the 16 existing location hubs and the existing service × location pages. `/decking` is optional, covered in Step 9, and needs owner approval first.
- **Do not change the design system.** No new fonts, colours, radii or components beyond a category entry.
- **Keep the diff to blog content, images, schema, sitemap and taxonomy.** No repo-wide prettier or eslint runs.

---

## Step 2 — Build and validate the posts

From `blog-batch3/`:

```bash
python3 scripts/build_and_validate.py           # must report 0 errors, 0 warnings
python3 scripts/build_and_validate.py --build   # expands [[FAQ]] into "## Frequently asked questions" + H3 Q&As
```

The `--build` step writes the visible FAQ into each body from the frontmatter `faq`. **If the live template already renders FAQ from frontmatter (Step 0.6), skip `--build`** and delete the `[[FAQ]]` marker line instead, so the FAQ is not shown twice. Either way, every FAQ in the schema must be visible on the page.

The validator enforces: slate dates, primary keyword in the first 100 words, 1,000–1,900 words, one H1, 6 or more H2s, 2 or more tables, one `> **STEEPWOOD` CTA, 5 FAQs, no raw HTML, no `<digit`, no emoji, no "!", allowed internal links only, no forward links, no retired slugs, no trailing slashes, and 4 or more external sources.

---

## Step 3 — Import

1. Copy each `posts/{slug}.md` into the content directory, using the live file extension (`.md` or `.mdx`).
2. Map the frontmatter to the live schema. Batch 3 carries `primaryKeyword`, `secondaryKeywords`, `locationFocus`, `internalLinks` and `relatedPosts`. Keep the ones Batch 2 kept. Drop the rest or move them into a lookup table. Never leave a field that breaks the build.
3. Set `date` / `datePublished` to the frontmatter date at **07:00 Australia/Sydney**. In November and December this is **+11:00** (AEDT), not +10:00. Example: `2026-11-07T07:00:00+11:00`.
4. Categories used: **Commercial, Kitchen Design, Decking, Home Offices, Materials.** Create **Decking** (and **Materials** if missing) following the existing taxonomy pattern, including an archive page if other categories have one. Category slug: `decking`.
5. Render the `> **STEEPWOOD ...` blockquote with the CTA component and class string Batch 2 used (see `SHARED_CONTEXT.md`).

### MDX safety pass

```bash
grep -rn '<[0-9]' posts/ || echo "clean"
grep -rn '[{}]' posts/*.md | grep -v '^.*---' || echo "clean"
```

Check that every table row has the same number of columns as its header.

---

## Step 4 — Placeholder images

Each post gets five placeholders at the exact final dimensions, so layout, CLS and OG previews are correct now and Phase 2 is a straight file swap.

| File | Dimensions | Purpose |
| --- | --- | --- |
| `hero.jpg` | 1600 × 1000 | Article hero |
| `og.jpg` | 1200 × 630 | Open Graph and Twitter card |
| `inline-01.jpg` | 1200 × 900 | Two-up grid, left |
| `inline-02.jpg` | 1200 × 900 | Two-up grid, right |
| `inline-wide.jpg` | 1600 × 1000 | Full width, after the FAQ |

Path: `public/blog/{slug}/{slot}.jpg`.

Reuse the Batch 2 script `scripts/generate-blog-placeholders.mjs`, which draws on-brand linen and ink placeholders, not grey boxes. Point it at `blog-batch3/images/blog-image-manifest.json`, or merge that file into the existing `scripts/blog-image-manifest.json`. **Do not overwrite or regenerate any Batch 1 or Batch 2 image folder.**

**Alt text is final now, not a placeholder.** Wire alt, title and caption from `images/image-metadata.json`. The hero alt matches each post's frontmatter `hero.alt`. Show the caption line "Illustrative image from SteepWood's guide: {title}." the same way Batch 2 does.

---

## Step 5 — Schema

Implement `blog-batch2/cursor/SCHEMA-SPEC.md` exactly: one `<script type="application/ld+json">` per post containing a `@graph` with `BlogPosting`, `BreadcrumbList`, `FAQPage`, the Organization/LocalBusiness reference and an `ImageObject` hero.

Batch 3 additions:

- `BlogPosting.about` → a `Service` node with `serviceType` from the "Service node" line in each `research/RESEARCH-{slug}.md` (Office fitout, Shopfitting, Commercial joinery, Kitchen installation, Deck construction, Home office joinery).
- `BlogPosting.spatialCoverage` / `areaServed` → `locationFocus` values as `Place` / `City`.
- `datePublished` and `dateModified` use the 07:00 +11:00 timestamp.
- Do **not** add Decking to the Organization `hasOfferCatalog` or `makesOffer` until the owner confirms licence scope (README §5).
- No `Product`, `Offer` or article-level `Review`.

Validate at least six posts across all five categories in the Rich Results Test and the Schema Markup Validator. Both must show zero errors.

---

## Step 6 — Scheduling (date gate)

One post per day, **7 November to 6 December 2026, at 07:00 Australia/Sydney**.

Reuse the Batch 2 mechanism. Confirm the comparison uses `Australia/Sydney`. A UTC comparison publishes each post 11 hours early, on the previous day.

A future-dated post must be:

- absent from `/blog`, category archives, related-articles grids, the sitemap and RSS
- 404 or `noindex` at its own URL until 07:00 on its date

On its date it must appear in all of those places, picked up by ISR or revalidation (`revalidate = 3600` or the Batch 2 equivalent) or a scheduled daily rebuild.

Test it: set one post to tomorrow 07:00, confirm it is hidden, then confirm it appears after the gate passes.

---

## Step 7 — Fix the broken Batch 2 source link

One external URL in Batch 2 returns 404:

```
WRONG  https://focusshopfit.com.au/the-quintessential-2026-price-guide-for-shopfitout-in-australia/
RIGHT  https://focusshopfit.com.au/the-quintessential-2026-price-guide-for-shop-fitout-in-australia/
```

Find it with `grep -rn "for-shopfitout-in-australia" content/` (it appears in `shopfitting-cost-by-format-nsw`). Replace the URL only, nothing else in the file, and update `dateModified` for that post. This is the only permitted change to a live post in this phase.

---

## Step 8 — Internal links and sitemap

1. Extract every internal href in the 30 posts and confirm each returns 200 on the deployed preview:
   ```bash
   grep -rhoE '\]\(/[^)]+\)' blog-batch3/posts/ | sed 's/^](//;s/)$//' | sort -u
   ```
2. Confirm no post links to a Batch 3 post with a later date. The validator already checks this; confirm again after import.
3. Body hrefs have no trailing slash.
4. Sitemap: Batch 3 posts appear only once live, with `lastmod` equal to `dateModified`. If Batch 2 added `sitemap-images.xml`, add Batch 3 images to it as they go live.
5. After each post goes live, submit the sitemap or request indexing for the URL in Search Console. A daily script or manual step is fine; see `PUBLISHING-SCHEDULE.md`.

---

## Step 9 — Optional, owner approval required

Do these only if the owner confirms them in the README checklist:

- **`/decking` service page plus location variants** (`/decking/newcastle`, `/decking/central-coast`, `/decking/sydney`), using the existing service page template. Once live, repoint the decking posts' "service" links to these pages in the day-31 backfill.
- **North Sydney or Lower North Shore hub.** Only if the owner wants a dedicated Sydney commercial hub.

---

## Step 10 — Day-31 backfill (Monday 7 December 2026)

Follow `PUBLISHING-SCHEDULE.md` "Day 31". Add 2–3 forward links per post within its cluster, add Batch 3 to related-articles for Batch 1 and 2, then re-run the link audit.

---

## Step 11 — Acceptance checklist

**Build and routing**

- [ ] Build passes with zero errors and no new warnings
- [ ] All 30 posts render at `/blog/{slug}` with every template block intact
- [ ] The 36 live posts are unchanged, except the single URL fix in `shopfitting-cost-by-format-nsw`
- [ ] The retired slugs still return 301
- [ ] Decking category and archive resolve

**Content**

- [ ] Validator reports 0 errors and 0 warnings
- [ ] FAQ visible once per post (not duplicated)
- [ ] No emoji, no markdown italics, no exclamation marks
- [ ] Author is Sukhveer Kaur on all 30

**Images**

- [ ] 150 placeholders at exact dimensions under `public/blog/{slug}/`
- [ ] Alt, title and caption wired from `image-metadata.json`
- [ ] OG card renders in a link-preview tool

**Schema**

- [ ] Rich Results Test shows zero errors on six posts across all five categories
- [ ] Every FAQ in the markup is visible on the page
- [ ] No Product, Offer or article-level Review

**Scheduling and indexing**

- [ ] Date gate tested and uses Australia/Sydney with the +11:00 offset
- [ ] Sitemap and RSS list only live posts
- [ ] Day-1 post (`office-fitout-newcastle-guide`) live at 07:00 on 7 Nov 2026 and submitted for indexing

**Owner confirmations**

- [ ] README §5 items resolved, or the affected sentences softened, before each affected post's date

---

## Step 12 — Report back

Report: files added, files modified, frontmatter mapping decisions, FAQ rendering choice, scheduling approach, link audit result, schema validation result, the Batch 2 URL fix, and any open owner-confirmation items.
