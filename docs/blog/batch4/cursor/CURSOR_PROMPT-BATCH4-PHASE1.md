# Cursor Prompt — Batch 4, Phase 1: Publish 10 posts with placeholder images

Run this with `CURSOR_PROMPT-BATCH4-PUBLISH-ALL-NOW.md`, which sets the go-live order and checks. Work through the steps in order. Do not skip Step 0.

**Phase 1 scope.** All 10 Batch 4 posts imported, routed and live today (Monday 16 November 2026), back-dated one per day from 7 to 16 November 2026, with full schema and placeholder images at final dimensions. **No image generation in this phase.** Phase 2 (`CURSOR_PROMPT-BATCH4-PHASE2.md`) replaces the placeholders.

**Inputs (this package):**

```
blog-batch4/
├── README.md                         overview and owner-confirmation list
├── PUBLISHING-SCHEDULE.md            10 dates, timestamps, keywords, GBP routine, backfill
├── KEYWORD-MAP.md                    keywords, cannibalisation check, clusters
├── posts/{slug}.md                   × 10 article bodies with frontmatter
├── scripts/
│   ├── build_and_validate.py         validator; --build expands [[FAQ]] markers
│   ├── build_handoff.py              rebuilds research records and briefs
│   ├── build_image_pack.py           builds prompts, metadata and manifest
│   └── image_data.py                 per-image subjects and alt text
├── images/
│   ├── IMAGE-PROMPTS.md              50 prompts (Phase 2)
│   ├── image-metadata.json           50 SEO metadata records
│   └── blog-image-manifest.json      slug → slot → subject/alt
├── research/
│   ├── NSW-MARKET-RESEARCH-BATCH4.md competitors, gaps, locations, keywords, schema
│   ├── LOCATION-STRATEGY.md          sub-market tiers and location by post
│   ├── POST-BRIEFS-01-10.md          one brief per post
│   ├── RESEARCH-{slug}.md × 10       per-post record, schema service node, owner flags
│   └── IMAGE-ALT-TEXT.md             50 alt texts
└── cursor/
    ├── CURSOR_PROMPT-BATCH4-PUBLISH-ALL-NOW.md
    ├── CURSOR_PROMPT-BATCH4-PHASE1.md   this file
    └── CURSOR_PROMPT-BATCH4-PHASE2.md   image generation and install
```

Reused without changes: `blog-batch2/cursor/SCHEMA-SPEC.md`, `blog-batch2/cursor/LOCAL-SEO-PLAYBOOK.md`, `blog-batch2/SHARED_CONTEXT.md`, and the Batch 3 implementation already live on the site.

---

## Step 0 — Inspect before changing anything

Report what you find before writing code.

1. Open a live Batch 3 post, for example `christmas-shutdown-fitout-planning-nsw`. Record the exact frontmatter field names, order and value types. Batch 4 must match them field for field.
2. Confirm the post template renders the hero, OG, inline images, breadcrumb, category eyebrow, reading time, author aside, related articles, FAQ, CTA blockquote and footer CTA the same way it did for Batch 3.
3. Confirm the **Decking**, **Commercial**, **Kitchen Design** and **Home Offices** categories exist (Batch 3 created Decking).
4. Find how Batch 3 rendered the FAQ (frontmatter, body, or both) and repeat it.
5. Find the sitemap, RSS and JSON-LD code used for Batch 3.
6. Find the Batch 3 placeholder script and manifest location.

**Report all six findings, then continue.** If the Batch 4 frontmatter does not match the live schema, adapt the posts to the live schema. Never change the live schema to fit the posts.

---

## Step 1 — Guardrails (hard failures)

- **Never modify, republish or duplicate the 66 live posts** (6 Batch 1, 30 Batch 2, 30 Batch 3), except the backfill link additions listed in `PUBLISHING-SCHEDULE.md` and the business name fix ("Pavit Cabinetry Pty Ltd" → "Pavit Pty Ltd") in the publish-all prompt.
- **Never recreate the retired slugs** (301 redirected): `kitchen-storage-planning-australia`, `joinery-materials-guide-2pac-timber`, `australian-home-joinery-trends-2026`.
- **Do not touch the redirect map** except to confirm it.
- **Do not create new service or location pages.** Posts link only to existing pages. `/decking` does not exist and needs owner approval first (README §5 item 2).
- **Do not change the design system.** No new fonts, colours, radii or components.
- **Keep the diff to blog content, images, schema, sitemap and the docs folder.** No repo-wide prettier or eslint runs.

---

## Step 2 — Build and validate

From `blog-batch4/`:

```bash
python3 scripts/build_and_validate.py           # must report: 10 posts checked, 0 errors, 0 warnings
python3 scripts/build_and_validate.py --build   # expands [[FAQ]] into "## Frequently asked questions" + H3 Q&As
```

If the live template renders FAQ from frontmatter (Step 0.4), skip `--build` and delete the `[[FAQ]]` marker line instead, so the FAQ is not shown twice. Every FAQ in the schema must be visible on the page.

---

## Step 3 — Import

1. Copy each `posts/{slug}.md` into the content directory with the live file extension.
2. Map the frontmatter to the live schema, exactly as Batch 3 was mapped (`primaryKeyword`, `secondaryKeywords`, `locationFocus`, `internalLinks`, `relatedPosts`).
3. `datePublished` = frontmatter date at **07:00 Australia/Sydney, +11:00**. Example: `2026-11-07T07:00:00+11:00`. `dateModified` = `2026-11-16T07:00:00+11:00` for all 10.
4. Render the `> **STEEPWOOD ...` blockquote with the CTA component Batch 3 used.

### MDX safety pass

```bash
grep -rn '<[0-9]' posts/ || echo "clean"
```

Check that every table row has the same number of columns as its header.

---

## Step 4 — Placeholder images

Five placeholders per post at exact final dimensions, so layout, CLS and OG previews are right now and Phase 2 is a file swap.

| File | Dimensions | Purpose |
| --- | --- | --- |
| `hero.jpg` | 1600 × 1000 | Article hero |
| `og.jpg` | 1200 × 630 | Open Graph and Twitter card |
| `inline-01.jpg` | 1200 × 900 | Two-up grid, left |
| `inline-02.jpg` | 1200 × 900 | Two-up grid, right |
| `inline-wide.jpg` | 1600 × 1000 | Full width, after the FAQ |

Path: `public/blog/{slug}/{slot}.jpg`. Reuse the Batch 3 placeholder script with `blog-batch4/images/blog-image-manifest.json`. **Do not overwrite any Batch 1, 2 or 3 image folder.**

Alt text is final now. Wire alt, title and caption from `images/image-metadata.json`. Hero alt equals frontmatter `hero.alt`. Show the caption "Illustrative image from SteepWood's guide: {title}." the same way Batch 3 does.

---

## Step 5 — Schema

Implement `blog-batch2/cursor/SCHEMA-SPEC.md` exactly, with the Batch 3 additions, which Batch 4 keeps:

- One JSON-LD `@graph` per post: `BlogPosting`, `BreadcrumbList`, `FAQPage`, Organization/LocalBusiness reference, `ImageObject` hero.
- `BlogPosting.about` → `Service` node with `serviceType` from the "Service node" line in each `research/RESEARCH-{slug}.md` (Office fitout, Shopfitting, Commercial joinery, Kitchen installation, Deck construction, Home office joinery).
- `BlogPosting.spatialCoverage` → `Place` nodes from `locationFocus`.
- No `Product`, `Offer` or article-level `Review`. Do not add decking to `hasOfferCatalog` or `makesOffer`.

Validate at least four posts (Commercial, Kitchen Design, Decking, Home Offices) in the Rich Results Test and Schema Markup Validator. Zero errors.

---

## Step 6 — Dates and order

No date gate is needed: every date is 16 November 2026 or earlier. Keep the existing date gate code in place.

On `/blog` the newest post is `childcare-centre-joinery-nsw` (16 Nov). The oldest Batch 4 post, `office-fitout-parramatta` (7 Nov), sits just above Batch 3's `christmas-shutdown-fitout-planning-nsw` (6 Nov). Category archives and RSS sort the same way.

---

## Step 7 — Internal links and sitemap

1. Extract every internal href in the 10 posts and confirm each returns 200 on the preview:
   ```bash
   grep -rhoE '\]\(/[^)]+\)' blog-batch4/posts/ | sed 's/^](//;s/)$//' | sort -u
   ```
2. Confirm no post links to a later-dated Batch 4 post (the validator checks this).
3. No trailing slashes on body hrefs.
4. All 10 posts in the sitemap with `lastmod` = `2026-11-16`. Add the images to `sitemap-images.xml` if the site has one.

---

## Step 8 — Store the research in the repo

Copy `blog-batch4/` to `docs/blog/batch4/`. Save `research/NSW-MARKET-RESEARCH-BATCH4.md` as `docs/blog/PERPLEXITY-BLOG-BATCH4-RESEARCH-HANDOFF.md` next to the Batch 2 and Batch 3 handoff files. Docs only; nothing in `docs/` is built into the site.

---

## Step 9 — Acceptance checklist

**Build and routing**

- [ ] Build passes with zero errors and no new warnings
- [ ] All 10 posts render at `/blog/{slug}` with every template block intact
- [ ] The 66 live posts unchanged, except backfill link additions and the business name fix
- [ ] `grep -rn "Pavit Cabinetry"` returns nothing in content, schema or components
- [ ] Retired slugs still return 301

**Content**

- [ ] Validator: 10 posts, 0 errors, 0 warnings
- [ ] FAQ visible once per post
- [ ] No emoji, no markdown italics, no exclamation marks
- [ ] Author is Sukhveer Kaur on all 10

**Images**

- [ ] 50 placeholders at exact dimensions under `public/blog/{slug}/`
- [ ] Alt, title and caption wired from `image-metadata.json`
- [ ] OG card renders in a link-preview tool

**Schema**

- [ ] Rich Results Test zero errors on four posts across four categories
- [ ] Every FAQ in the markup is visible on the page

**Dates and indexing**

- [ ] `datePublished` 2026-11-07 to 2026-11-16, all +11:00; `dateModified` 2026-11-16T07:00:00+11:00
- [ ] Sitemap and RSS list all 10
- [ ] Sitemap submitted in Search Console

---

## Step 10 — Report back

Report: files added, files modified, frontmatter mapping, FAQ rendering choice, link audit result, schema validation result, the docs copy, and open owner-confirmation items (README §5).
