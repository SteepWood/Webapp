# SteepWood Blog Batch 3 — 30-Day Publishing Package

30 SEO blog posts, **all published at once on 6 November 2026**, dated about every 2–3 days from **24 August to 6 November 2026** (the day after Batch 2 finished up to today). Original plan was one per day from 7 November; the owner changed it to publish all now. Target markets: the Newcastle and Hunter region, the Central Coast and Sydney. Services covered: office fitout, shopfitting, commercial joinery, kitchen installation, decking and custom home office joinery.

Prepared for Cursor to implement on steepwood.com.au in two phases:

- **Phase 1:** publish all 30 posts with on-brand placeholder images.
- **Phase 2:** generate and install the 150 images in the existing site style.

---

## 1. Start here (for Cursor)

1. Read this README.
2. Run `cursor/CURSOR_PROMPT-BATCH3-PUBLISH-ALL-NOW.md`. It uses Phase 1 (`cursor/CURSOR_PROMPT-BATCH3-PHASE1.md`) for everything except dates, scheduling and backfill timing.
3. When Phase 1 is accepted, run `cursor/CURSOR_PROMPT-BATCH3-PHASE2.md`.
4. Posts are shipped with `[[FAQ]]` markers unexpanded. Run `python3 scripts/build_and_validate.py --build` only if the site template does not render FAQs from frontmatter (Phase 1 explains this).
5. Straight after go-live, run the backfill pass in `PUBLISHING-SCHEDULE.md`.

Shared inputs reused from Batch 2 (unchanged):

- `blog-batch2/SHARED_CONTEXT.md`
- `blog-batch2/cursor/SCHEMA-SPEC.md`
- `blog-batch2/cursor/LOCAL-SEO-PLAYBOOK.md`
- `blog-batch2/images/ART-DIRECTION.md`

## 2. What is in the package

| Path | Contents |
| --- | --- |
| `posts/` | 30 posts, Markdown with frontmatter, validated |
| `PUBLISHING-SCHEDULE.md` | Dates, slugs, keywords, categories, daily routine, promotion checklist, day-31 backfill |
| `KEYWORD-MAP.md` | Primary and secondary keywords, cannibalisation check against the 36 live posts, anchor rules, clusters |
| `research/NSW-MARKET-RESEARCH-BATCH3.md` | Competitors by service and region, SERP gaps, location choice (ABS data), keyword strategy, structure, schema, local SEO actions, measurement |
| `research/LOCATION-STRATEGY.md` | Location tiers, GBP constraint, location by post, coverage count |
| `research/POST-BRIEFS-01-15.md`, `research/POST-BRIEFS-16-30.md` | One brief per post: keywords, meta, sources, H2s, links, FAQ, flags |
| `research/RESEARCH-{slug}.md` (30 files) | Per-post research record: word count, keywords, schema, sources, internal links, image alts, owner-confirmation flags |
| `research/IMAGE-ALT-TEXT.md` | 150 alt texts |
| `images/IMAGE-PROMPTS.md` | 150 image prompts in the locked six-block style |
| `images/image-metadata.json` | 150 metadata records (alt, title, caption, IPTC fields, loading hints, prompt) |
| `images/blog-image-manifest.json` | Slug → slot → subject; input for placeholders and generation |
| `cursor/CURSOR_PROMPT-BATCH3-PUBLISH-ALL-NOW.md` | Publish all 30 now, backdated 24 Aug – 6 Nov; overrides Phase 1 scheduling |
| `cursor/CURSOR_PROMPT-BATCH3-PHASE1.md` | Import, date gate, schema, placeholders, sitemap, guardrails, acceptance |
| `cursor/CURSOR_PROMPT-BATCH3-PHASE2.md` | Image generation, crop, compression, metadata, install, QA |
| `scripts/build_and_validate.py` | Validator; `--build` expands `[[FAQ]]` |
| `scripts/build_handoff.py` | Rebuilds the research records and post briefs from the posts |
| `scripts/build_image_pack.py`, `scripts/image_data.py` | Rebuild the prompt pack and metadata after editing subjects |

## 3. The 30 posts at a glance

| Cluster | Posts | Regions |
| --- | --- | --- |
| Office fitout | 6 | Newcastle, Central Coast, Sydney, NSW |
| Shopfitting and retail | 6 | Newcastle, Central Coast, Sydney, NSW |
| Commercial joinery | 5 | Newcastle, Central Coast, Sydney, NSW |
| Kitchen installation | 5 | Newcastle, Central Coast, Sydney, NSW |
| Decking (new category) | 4 | Newcastle, Central Coast, Sydney, NSW |
| Home office | 4 | Newcastle, Central Coast, Sydney, NSW |

Every post follows the same build:

- 1,000–1,900 words, with the primary keyword in the title, H1, slug, meta description and first 100 words
- 6 or more H2s and 2 or more tables
- 4 or more inline sources
- one SteepWood CTA block and 5 FAQs (marked up as FAQPage)
- a trust line with the ABN, licence, $20M public liability and 10-year structural warranty
- links only to pages that exist on the date the post publishes

Validator result: **30 posts, 0 errors, 0 warnings.** All 68 external source URLs were checked. Every page loads; a few sites block automated checks but open normally in a browser.

## 4. Why these topics and locations

In summary (full evidence is in `research/NSW-MARKET-RESEARCH-BATCH3.md`):

- **Newcastle first:** it is the workshop location, and SteepWood's service pages there already rank.
- **Central Coast second:** $166.0m of alterations and additions were approved in 2025–26 (ABS). Competitor content is weak there and directory sites dominate the results.
- **Sydney third:** it has the highest spend but the strongest competition, so these posts target long-tail, small-business and builder queries.
- **Gaps exploited:**
  - local cost-per-m² guides
  - joinery-led decking content, including BAL and mine subsidence
  - kitchen installation process
  - barber and salon fitout, and compact laminate
  - builder subcontract joinery
  - Christmas shutdown planning

## 5. Owner confirmations

All posts now go live on 6 November 2026, so the "Needed by" dates below are past. Confirm each item as soon as you can, and Cursor will edit the affected posts (update `dateModified` when it does).

| # | Item | Affects | Needed by |
| --- | --- | --- | --- |
| 1 | **Deck licence scope.** NSW Carpentry Contractor Licence 489553C covers carpentry. Some deck work, especially larger or structural landscaping decks, may need a structural landscaping licence. Confirm which deck work SteepWood does and under which licence. If unsure, soften "we build decks" to "we build timber decks and outdoor carpentry within our licence". | Posts 4, 9, 16, 23 | 9 Nov |
| 2 | **Build a `/decking` service page?** Decking posts currently link to location pages and `/quote` only. A `/decking` page plus `/decking/newcastle`, `/decking/central-coast` and `/decking/sydney` would give the decking posts a page to rank. | Phase 1 Step 9 | Any time |
| 3 | **North Sydney / Lower North Shore hub?** Optional Sydney commercial hub. | Phase 1 Step 9 | Any time |
| 4 | **Can projects or clients be named?** Posts currently name no clients. If you want named case studies (for example GYG Boolaroo, or the Rutherford barber fitout), say so and we will add them in the backfill. | All commercial posts | Backfill |
| 5 | **"Illustrative image" label.** Generated images are captioned "Illustrative image from SteepWood's guide". Confirm you are happy with this, or supply real project photos for any slot. | Phase 2 | Before Phase 2 |
| 6 | **Install durations and lead times quoted in posts.** Examples: "cabinets usually go in over two to four days", "install often one to three days", "manufacture 4–8 weeks". Confirm these match how SteepWood works. | Posts 2, 8, 13, 19, 25, 29 | 8 Nov |
| 7 | **Installing kitchens bought elsewhere.** Posts say SteepWood focuses on installing kitchens it designs and builds, and will "tell you honestly" about other installs. Confirm this policy. | Posts 2, 8, 13, 19 | 8 Nov |
| 8 | **Live site figures that conflict with the posts.** (a) The live home office page says "from $3,000"; posts quote third-party ranges of $3,000–$8,000 (InsideOut) and $4,000–$8,000 (Sparky). These are consistent, but confirm the "from" price. (b) The live commercial joinery page says a typical lead time of 8–12 weeks; post 6 says "a few weeks" for manufacture after approval. Pick one figure and we will align the post or the page. | Posts 5, 6, 12, 20, 27 | 11 Nov |
| 9 | **Business name consistency.** The live office fitout page mentions "Pavit Pty Ltd"; posts use "Pavit Cabinetry Pty Ltd t/as SteepWood". Fix the live page so the name matches GBP and ABN records. | Site-wide (NAP) | ASAP |
| 10 | **Christmas shutdown dates.** Post 30 does not state SteepWood's own closure dates. If you want them included, send the dates. | Post 30 | 5 Dec |

## 6. Phase 2 images

The 150 prompts are ready and use the same style system as Batch 2. The image set can be generated and packaged (crop, compress and embedded metadata) as a follow-up, ready for Cursor to drop into `public/blog/{slug}/`.

## 7. Batch 2 fix included

The broken Focus Shopfit URL (`...for-shopfitout-in-australia/` → `...for-shop-fitout-in-australia/`) has been corrected in the local Batch 2 copy (`blog-batch2/posts/shopfitting-cost-by-format-nsw.md`). Phase 1 Step 7 tells Cursor to apply the same one-line fix on the live site.
