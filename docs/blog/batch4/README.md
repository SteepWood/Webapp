# SteepWood Blog Batch 4 — 10-Day Publishing Package (Start Here)

10 SEO blog posts, one per day, dated **Saturday 7 November to Monday 16 November 2026** (the day after Batch 3 finished, up to today), **all published at once on 16 November 2026**. Target markets: Newcastle and the Hunter (Lake Macquarie, Maitland), the Central Coast and Sydney (Parramatta, Western Sydney, North Shore). Services: office fitout, shops and hospitality, commercial joinery, kitchen installation, decking and custom home office joinery.

Prepared for Cursor to implement on steepwood.com.au in two phases:

- **Phase 1:** publish all 10 posts with on-brand placeholder images.
- **Phase 2:** generate and install the 50 photorealistic images in the existing site style.

---

## 1. Start here (for Cursor)

1. Read this README.
2. Run `cursor/CURSOR_PROMPT-BATCH4-PUBLISH-ALL-NOW.md`. It uses Phase 1 (`cursor/CURSOR_PROMPT-BATCH4-PHASE1.md`) for everything.
3. When Phase 1 is live and accepted, run `cursor/CURSOR_PROMPT-BATCH4-PHASE2.md`.
4. Posts ship with `[[FAQ]]` markers. Run `python3 scripts/build_and_validate.py --build` only if the site template does not render FAQs from frontmatter (Phase 1 Step 2 explains).
5. Straight after go-live, run the backfill pass in `PUBLISHING-SCHEDULE.md`.
6. Copy this whole folder into the repo at `docs/blog/batch4/` and save `research/NSW-MARKET-RESEARCH-BATCH4.md` as `docs/blog/PERPLEXITY-BLOG-BATCH4-RESEARCH-HANDOFF.md`, the same way Batches 2 and 3 were stored.

Shared inputs reused from earlier batches (unchanged):

- `blog-batch2/SHARED_CONTEXT.md` (brand, NAP, voice, CTA component)
- `blog-batch2/cursor/SCHEMA-SPEC.md`
- `blog-batch2/cursor/LOCAL-SEO-PLAYBOOK.md`
- `blog-batch2/images/ART-DIRECTION.md`
- Batch 3 live implementation (Decking and Materials categories, placeholder script, image install script)

## 2. What is in the package

| Path | Contents |
| --- | --- |
| `posts/` | 10 posts, Markdown with frontmatter, validated |
| `PUBLISHING-SCHEDULE.md` | Dates, timestamps, keywords, categories, 10-day GBP routine, backfill links |
| `KEYWORD-MAP.md` | Primary and secondary keywords, cannibalisation check against the 66 live posts, anchor rules, clusters |
| `research/NSW-MARKET-RESEARCH-BATCH4.md` | ABS location data, competitors by market, gaps, keyword strategy, structure, schema, local SEO actions, measurement |
| `research/LOCATION-STRATEGY.md` | Sub-market tiers, GBP constraint, location by post, next sub-markets |
| `research/POST-BRIEFS-01-10.md` | One brief per post: keywords, meta, sources, H2s, links, FAQ, flags |
| `research/RESEARCH-{slug}.md` (10) | Per-post record: word count, keywords, schema service node, sources, links, image alts, owner flags |
| `research/IMAGE-ALT-TEXT.md` | 50 alt texts |
| `images/IMAGE-PROMPTS.md` | 50 photorealistic image prompts |
| `images/image-metadata.json` | 50 metadata records (alt, title, caption, IPTC, loading hints, prompt) |
| `images/blog-image-manifest.json` | Slug → slot → subject; input for placeholders and generation |
| `cursor/CURSOR_PROMPT-BATCH4-PUBLISH-ALL-NOW.md` | Publish all 10 now, back-dated 7–16 Nov |
| `cursor/CURSOR_PROMPT-BATCH4-PHASE1.md` | Import, schema, placeholders, sitemap, guardrails, acceptance |
| `cursor/CURSOR_PROMPT-BATCH4-PHASE2.md` | Image generation, crop, compression, metadata, install, QA |
| `scripts/` | Validator (`--build` expands FAQ), handoff builder, image pack builder |

## 3. The 10 posts

| # | Date | Post | Primary keyword | Category |
| ---: | --- | --- | --- | --- |
| 1 | 7 Nov | `office-fitout-parramatta` | office fitout Parramatta | Commercial |
| 2 | 8 Nov | `kitchen-installation-lake-macquarie` | kitchen installation Lake Macquarie | Kitchen Design |
| 3 | 9 Nov | `shop-fitout-maitland` | shop fitout Maitland | Commercial |
| 4 | 10 Nov | `deck-builders-lake-macquarie` | deck builders Lake Macquarie | Decking |
| 5 | 11 Nov | `restaurant-fitout-newcastle` | restaurant fitout Newcastle | Commercial |
| 6 | 12 Nov | `home-office-joinery-north-shore-sydney` | home office joinery North Shore | Home Offices |
| 7 | 13 Nov | `pharmacy-fitout-nsw` | pharmacy fitout NSW | Commercial |
| 8 | 14 Nov | `warehouse-office-fitout-western-sydney` | warehouse office fitout Western Sydney | Commercial |
| 9 | 15 Nov | `kitchen-installation-maitland-hunter-valley` | kitchen installers Maitland | Kitchen Design |
| 10 | 16 Nov | `childcare-centre-joinery-nsw` | childcare centre joinery NSW | Commercial |

Every post: 1,000–1,900 words; primary keyword in the title, H1, slug, meta description and first 100 words; 6+ H2s; 2+ tables; 4+ inline sources; one SteepWood CTA block; 5 FAQs (FAQPage); the trust line with ABN, licence, $20M public liability and 10-year structural warranty; links only to live pages or earlier Batch 4 posts.

Validator result: **10 posts checked, 0 errors, 0 warnings.** 63 external source URLs checked; all resolve, though about a dozen government and directory sites block automated checks (403, 502 or 503) and open normally in a browser.

## 4. Why these topics and locations

Full evidence in `research/NSW-MARKET-RESEARCH-BATCH4.md`. In short:

- **Sub-markets with the most building activity:** Western Sydney ($7.4bn non-residential in Blacktown, Liverpool and Penrith), Parramatta (23.5 per cent vacancy, landlord-funded fitouts), Maitland and Cessnock (1,289 new houses), Lake Macquarie (798 new houses), North Shore ($345m alterations).
- **New verticals with weak joinery content:** restaurants, pharmacies and childcare centres. The ranking pages are builders and estimators, not joiners.
- **Directories lead local trade searches** in Maitland and Lake Macquarie. Detailed local guides with tables and sources are the clearest way past them.

## 5. Owner confirmations

Items 1, 6 and 9 were resolved by the owner on 16 November. Confirm the rest when you can; Cursor then edits the affected posts and updates `dateModified`.

| # | Item | Affects |
| --- | --- | --- |
| 1 | **Deck licence scope.** Resolved 16 Nov: wording softened. The post now says SteepWood takes on timber decks and outdoor carpentry within Carpentry Licence 489553C and will say at quote stage if a deck needs another licence class. | Post 4 |
| 2 | **Build `/decking` pages?** Decking posts still link to `/locations/newcastle` and `/quote` only. | Post 4 |
| 4 | **Named clients or projects.** Posts name no clients. Say if case studies can be added (for example the Rutherford barber fitout). | Posts 1, 3, 5, 7, 8, 10 |
| 5 | **"Illustrative image" captions.** Generated images are captioned as illustrative. Supply real project photos for any slot if you prefer. | Phase 2 |
| 6 | **Install times and lead times.** Resolved 16 Nov: owner approved the published planning ranges as written (cabinets one to four days, benchtops one to two weeks later). | Posts 2, 9 |
| 7 | **Installing kitchens bought elsewhere.** Posts stay cautious. Confirm the policy. | Posts 2, 9 |
| 8a | **Home office "from $3,000"** on the live page. Confirm it still applies beside the published North Shore ranges. | Post 6 |
| 8b | **Commercial joinery lead time.** Live page says 8–12 weeks; the childcare post says joinery is manufactured during early site works. Align one or the other. | Post 10 |
| 9 | **Business name.** Resolved 16 Nov: the correct legal name is **Pavit Pty Ltd** (ABN 52 697 313 269). All 10 Batch 4 posts use "Pavit Pty Ltd trading as SteepWood". Earlier posts, schema and the footer were updated to that legal name on 16 November 2026. Separately, the Hunter Valley shopfitting page shows $15,000–$75,000 and 8–12 weeks; check these sit comfortably beside the published ranges in post 3. | Site-wide (NAP), post 3 |

Item numbers match Batch 3 so the flags in the research records line up. Item 3 (North Sydney hub) and item 10 (Christmas dates) do not apply to Batch 4.

## 6. Phase 2 images

50 prompts (5 per post) in the locked six-block style, with a stronger photorealism block: real full-frame camera, natural light, true-to-life materials, documentary realism, no CGI look. New region clauses for Parramatta, Western Sydney, Lake Macquarie and the Hunter, and a new `industrial` environment for the warehouse post.
