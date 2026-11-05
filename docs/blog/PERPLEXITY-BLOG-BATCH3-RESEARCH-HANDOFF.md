# SteepWood — Perplexity Blog Research & Content Handoff (Batch 3)

**Purpose:** Archive of the Perplexity Computer research + publish pack for Blog Batch 3, mirrored the same way as Batch 2.

**Site:** https://steepwood.com.au  
**Pack on disk:** `docs/steepwood-blog-batch3/`  
**Date of this handoff:** 2026-11-06  
**Batch:** Blog Batch 3 — 30 posts, publish all now (backdated 24 Aug – 6 Nov 2026)

---

## 1. Source package

Unpacked from:

- `SteepWood Blog Batch 3 — 30-Day Publishing Package.zip`
- Companion Cursor prompts: Publish All Now / Phase 1 / Phase 2 / Start Here

Canonical working tree:

```
docs/steepwood-blog-batch3/
├── README.md
├── PUBLISHING-SCHEDULE.md
├── KEYWORD-MAP.md
├── posts/{slug}.md                         × 30
├── research/                               market research, briefs, RESEARCH-{slug}.md × 30
├── images/                                 IMAGE-PROMPTS.md, image-metadata.json, blog-image-manifest.json
├── cursor/                                 PHASE1, PHASE2, PUBLISH-ALL-NOW
└── scripts/                                build_and_validate.py, image pack builders
```

---

## 2. Publishing decision (overrides Phase 1 schedule)

Owner instruction (6 Nov 2026): publish **all 30 now**.

| Field | Value |
| --- | --- |
| `datePublished` | Schedule in `PUBLISHING-SCHEDULE.md` (24 Aug → 6 Nov 2026, ~every 2–3 days) at 07:00 Sydney |
| Offset | AEST `+10:00` before 4 Oct 2026; AEDT `+11:00` from 4 Oct |
| `dateModified` | Go-live day `2026-11-06T07:00:00+11:00` (Prisma `updatedAt` on seed) |
| Date gate | Keep Batch 2 gate; all Batch 3 dates are ≤ today so all show at once |
| Phase 2 | Pause — placeholders only in Phase 1 |

---

## 3. The 30 posts

| # | Date | Slug | Primary keyword | Category |
| ---: | --- | --- | --- | --- |
| 1 | 24 Aug | `office-fitout-newcastle-guide` | office fitout Newcastle | Commercial |
| 2 | 27 Aug | `kitchen-installation-cost-nsw` | kitchen installation cost NSW | Kitchen Design |
| 3 | 29 Aug | `shop-fitout-newcastle-guide` | shop fitout Newcastle | Commercial |
| 4 | 1 Sep | `decking-cost-newcastle` | decking cost Newcastle | Decking |
| 5 | 3 Sep | `home-office-joinery-newcastle` | home office joinery Newcastle | Home Offices |
| 6 | 6 Sep | `commercial-joinery-newcastle-guide` | commercial joinery Newcastle | Commercial |
| 7 | 8 Sep | `office-fitout-central-coast-guide` | office fitout Central Coast | Commercial |
| 8 | 11 Sep | `kitchen-installation-newcastle` | kitchen installation Newcastle | Kitchen Design |
| 9 | 13 Sep | `composite-vs-timber-decking-central-coast` | composite decking Central Coast | Decking |
| 10 | 16 Sep | `shop-fitout-central-coast` | shop fitters Central Coast | Commercial |
| 11 | 19 Sep | `cafe-fitout-cost-nsw` | cafe fitout cost | Commercial |
| 12 | 21 Sep | `built-in-desk-study-nook-sydney` | built in desk Sydney | Home Offices |
| 13 | 24 Sep | `kitchen-installation-central-coast` | kitchen installers Central Coast | Kitchen Design |
| 14 | 26 Sep | `office-fitout-timeline-nsw` | how long does an office fitout take | Commercial |
| 15 | 29 Sep | `retail-shop-fitout-sydney` | retail shop fitout Sydney | Commercial |
| 16 | 1 Oct | `deck-builders-sydney-cost` | deck builders Sydney | Decking |
| 17 | 4 Oct | `medical-clinic-fitout-joinery-nsw` | medical fitout Newcastle | Commercial |
| 18 | 6 Oct | `commercial-joinery-sydney-builders` | commercial joinery Sydney | Commercial |
| 19 | 9 Oct | `kitchen-installation-sydney` | kitchen installation Sydney | Kitchen Design |
| 20 | 11 Oct | `home-office-joinery-central-coast` | home office Central Coast | Home Offices |
| 21 | 14 Oct | `office-kitchenette-breakout-joinery` | office kitchenette joinery | Commercial |
| 22 | 17 Oct | `shop-counter-display-joinery` | custom shop counters | Commercial |
| 23 | 19 Oct | `spotted-gum-merbau-blackbutt-decking-nsw` | best decking timber NSW | Decking |
| 24 | 22 Oct | `salon-barber-shop-fitout-nsw` | barber shop fitout | Commercial |
| 25 | 24 Oct | `kitchen-installation-process-day-by-day` | how long does kitchen installation take | Kitchen Design |
| 26 | 27 Oct | `compact-laminate-commercial-joinery` | compact laminate joinery | Materials |
| 27 | 29 Oct | `home-office-built-ins-hybrid-work-nsw` | home office built ins | Home Offices |
| 28 | 1 Nov | `office-fitout-sydney-small-business` | small office fitout Sydney | Commercial |
| 29 | 3 Nov | `commercial-joinery-central-coast` | commercial joinery Central Coast | Commercial |
| 30 | 6 Nov | `christmas-shutdown-fitout-planning-nsw` | Christmas shutdown fitout | Commercial |

---

## 4. Research assets (do not invent beyond these)

- `research/NSW-MARKET-RESEARCH-BATCH3.md`
- `research/LOCATION-STRATEGY.md`
- `research/POST-BRIEFS-01-15.md` / `POST-BRIEFS-16-30.md`
- `research/RESEARCH-{slug}.md` × 30
- `research/IMAGE-ALT-TEXT.md`
- `KEYWORD-MAP.md`

Business facts, voice and schema contract: reuse Batch 2 `SHARED_CONTEXT` / `SCHEMA-SPEC` / `LOCAL-SEO-PLAYBOOK`.

---

## 5. Phase split

| Phase | Scope |
| --- | --- |
| **Phase 1 (this deploy)** | Import 30 posts, FAQ expansion, placeholders, schema, Focus Shopfit URL fix, sitemap, backfill links, live on production |
| **Phase 2 (paused)** | Generate/install 150 final images from `images/IMAGE-PROMPTS.md` |

---

## 6. Owner confirmations still open

See `docs/steepwood-blog-batch3/README.md` §5 (deck licence scope, optional `/decking` page, install durations, NAP name consistency, etc.). Softened copy is already in the posts where required.
