# SteepWood Blog Batch 2 — NSW Local SEO Programme

Thirty long-form posts, a 30-day publishing schedule, the NSW market research behind them, and two Cursor implementation briefs.

Prepared August 2026 for Pavit Cabinetry Pty Ltd t/as SteepWood, Newcastle NSW.

---

## What this is for

The objective is top-of-page rankings for SteepWood's ten services across the major NSW markets, driven by content no competitor in the field publishes.

The research found the opening clearly. Across 34 reviewed NSW competitors, **not one publishes a licence number, a cost guide, lead times or a review count.** Meanwhile NSW is the largest home-improvement market in the country at $19.03 billion ([Budget Direct](https://www.budgetdirect.com.au/home-contents-insurance/guides/home-improvements/home-renovation-capitals-of-australia.html)), Australian alterations approvals are up 14.0 per cent year on year ([HIA](https://hia.com.au/our-industry/newsroom/economic-research-and-forecasting/2026/06/approvals-reflect-good-momentum-heading-into-2026)), and Australia ranks first in the world for laundry-renovation search intensity and second for kitchens ([Compare the Market](https://www.comparethemarket.com.au/home-loans/features/which-countries-love-renovation-the-most/)).

Every post in this batch is built on the thing competitors will not do: publish real numbers, with sources, and state the licence.

---

## Read in this order

**If you are implementing:**

1. `cursor/CURSOR_PROMPT-PHASE1.md` — publish all 30 with placeholder images
2. `cursor/SCHEMA-SPEC.md` — the JSON-LD contract, referenced by Phase 1
3. `cursor/CURSOR_PROMPT-PHASE2.md` — generate and swap in the 150 real images
4. `cursor/LOCAL-SEO-PLAYBOOK.md` — the off-page work that runs alongside

**If you are reviewing strategy:**

1. `research/TOPIC_SLATE.md` — the 30 topics, how they were scored, 14 ideas rejected and why
2. `research/LOCATION-STRATEGY.md` — which NSW markets and why, with ABS demand data
3. `PUBLISHING-SCHEDULE.md` — the calendar and the measurement targets
4. `research/NSW-MARKET-RESEARCH.md` — the full evidence base, 354 inline sources

**If you are editing copy:**

1. `SHARED_CONTEXT.md` — business facts, voice, design tokens, structure contract
2. `research/WRITER-INSTRUCTIONS.md` — the editorial rules the drafts already follow
3. `research/POST-BRIEFS-01-15.md` and `research/POST-BRIEFS-16-30.md`
4. `research/RESEARCH-{slug}.md` — per post: word count, keyword placement, sources, five image alt texts, schema notes

---

## Package contents

```
build/steepwood-blog-batch2/
├── README.md                          this file
├── SHARED_CONTEXT.md                  business facts, voice, AU English list, design tokens,
│                                      frontmatter template, image slots, quality checklist
├── PUBLISHING-SCHEDULE.md             30-day calendar, internal-linking rule, per-post
│                                      promotion checklist, 90-day targets
├── posts/                             30 × {slug}.md — the article bodies
├── research/
│   ├── TOPIC_SLATE.md                 scored slate, cluster balance, rejected ideas,
│   │                                  cannibalisation control matrix
│   ├── LOCATION-STRATEGY.md           5 priority tiers, GBP service-area allocation,
│   │                                  16 recommended new hubs, approved suburb vocabulary
│   ├── POST-BRIEFS-01-15.md           per-post briefs
│   ├── POST-BRIEFS-16-30.md           per-post briefs
│   ├── WRITER-INSTRUCTIONS.md         editorial contract
│   ├── NSW-MARKET-RESEARCH.md         full market research, 7 sections, 354 sources
│   └── RESEARCH-{slug}.md             30 × per-post research and image notes
└── cursor/
    ├── CURSOR_PROMPT-PHASE1.md        publish with placeholders
    ├── CURSOR_PROMPT-PHASE2.md        image generation
    ├── SCHEMA-SPEC.md                 JSON-LD contract and validation gate
    └── LOCAL-SEO-PLAYBOOK.md          reviews, GBP, citations, links, measurement
```

---

## The 30 posts

| # | Date | Slug | Cluster |
| --- | --- | --- | --- |
| 01 | 22 Aug | `laundry-joinery-cost-nsw` | Other rooms |
| 02 | 23 Aug | `kitchen-renovation-timeline-lead-times-nsw` | Kitchen |
| 03 | 24 Aug | `porcelain-sintered-stone-benchtop-cost-nsw` | Materials |
| 04 | 25 Aug | `butlers-pantry-cost-nsw` | Kitchen |
| 05 | 26 Aug | `cabinetry-cost-per-linear-metre-nsw` | Kitchen |
| 06 | 27 Aug | `blum-hardware-cost-australia` | Materials |
| 07 | 28 Aug | `floating-vanity-vs-floor-mounted-cost-nsw` | Other rooms |
| 08 | 29 Aug | `timber-staircase-cost-nsw` | Other rooms |
| 09 | 30 Aug | `kitchen-island-cost-nsw` | Kitchen |
| 10 | 31 Aug | `joinery-timber-species-guide-nsw` | Materials |
| 11 | 1 Sep | `hamptons-kitchen-cost-nsw` | Kitchen |
| 12 | 2 Sep | `home-office-joinery-cost-nsw` | Other rooms |
| 13 | 3 Sep | `custom-timber-furniture-cost-australia` | Materials |
| 14 | 4 Sep | `reception-desk-cost-australia` | Commercial |
| 15 | 5 Sep | `office-fitout-joinery-cost-nsw` | Commercial |
| 16 | 6 Sep | `shopfitting-cost-by-format-nsw` | Commercial |
| 17 | 7 Sep | `cabinetmaker-hourly-rate-vs-charge-out-nsw` | Trust |
| 18 | 8 Sep | `why-custom-joinery-quotes-differ-australia` | Trust |
| 19 | 9 Sep | `nsw-building-licence-hbcf-warranty-guide` | Trust |
| 20 | 10 Sep | `joinery-cost-guide-newcastle-hunter` | Local |
| 21 | 11 Sep | `joinery-cost-guide-central-coast` | Local |
| 22 | 12 Sep | `joinery-cost-guide-wollongong-illawarra` | Local |
| 23 | 13 Sep | `joinery-cost-guide-northern-beaches` | Local |
| 24 | 14 Sep | `joinery-cost-guide-eastern-suburbs-sydney` | Local |
| 25 | 15 Sep | `joinery-cost-guide-north-shore-sydney` | Local |
| 26 | 16 Sep | `joinery-cost-guide-inner-west-sydney` | Local |
| 27 | 17 Sep | `apartment-terrace-joinery-sydney` | Local |
| 28 | 18 Sep | `southern-highlands-hunter-valley-joinery-guide` | Local |
| 29 | 19 Sep | `regional-nsw-joinery-guide` | Local |
| 30 | 20 Sep | `new-home-joinery-growth-corridors-nsw` | Local |

All at 07:00 Australia/Sydney. Spring is the busiest renovation season in Australia ([ServiceSeeking](https://www.serviceseeking.com.au/industry-insights/is-spring-a-good-time-to-renovate-7-reasons)), which is why the schedule runs into September rather than later.

---

## Three things that will break if you ignore them

**1. No forward internal links until day 31.** Posts may only link to posts already published. On 21 September, run the single backfill pass in `CURSOR_PROMPT-PHASE1.md` §7 that adds forward links across all six clusters. That pass is what turns 30 articles into interlinked topic clusters, and it is the highest-leverage task in the project.

**2. Blogs may only link to the 16 existing location hubs.** They are newcastle, sydney, canberra, melbourne, central-coast, hunter-valley, gold-coast, wollongong, brisbane, perth, byron-bay, port-macquarie, coffs-harbour, adelaide, bathurst, orange. The 16 additional hubs recommended in `LOCATION-STRATEGY.md` §4 are a separate project. Linking to one before it exists ships a dead link.

**3. Never republish the six live Batch 1 posts or the three retired slugs.** Retired slugs are 301 redirected and must never be recreated. Both lists are in `SHARED_CONTEXT.md`.

---

## Before anything goes live

Six items need the owner's confirmation. The full list with context is in `research/TOPIC_SLATE.md` §4, and each affected post flags its own items in `research/RESEARCH-{slug}.md`.

| Item | Blocks |
| --- | --- |
| SteepWood's actual lead times per service | Posts 01, 02, 05 — currently written as sourced market ranges |
| HBCF position and whether certificates are issued | Post 19 — **hard block** |
| Any industry memberships, if they exist | Any post that would otherwise claim one. Claim nothing unconfirmed |
| Newcastle charge-out rate | Post 17 — currently market ranges only |
| Safe Work Australia's December 2025 engineered-stone review outcome | Post 03 — **hard block** |
| Whether any commercial project may be named | Posts 14, 15, 16 |

The two hard blocks are legal and compliance statements. Everything else is already written as a sourced market range and can publish as-is, then be sharpened once confirmed.

---

## What the content is designed to exploit

- **Newcastle is geographically ambiguous.** Five of ten page-one results for *custom joinery Newcastle* are United Kingdom businesses. Post 20 and the schema disambiguation in `SCHEMA-SPEC.md` §6 attack that directly.
- **A directory outranks every joiner** for *joinery Newcastle NSW*. `LOCAL-SEO-PLAYBOOK.md` §4 treats that listing as a channel rather than just a citation.
- **The Illawarra has no aggregator and zero cost content.** Post 22 walks into an empty SERP, at keyword difficulty 8 to 9.
- **Sydney sub-regions work and almost nobody does them.** One competitor's Eastern Suburbs landing page ranks fifth, which is the proof. Posts 23 to 26 cover four sub-regions with distinct housing stock, from Northern Beaches at $414.6 million in approved alterations down through Inner West at $300.4 million ([ABS](https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia/jun-2026/87310do005_202606.xlsx)).
- **The licence gap.** NSW law requires the licence number in trade advertising, with penalties to $110,000 for a corporation ([NSW Government](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements)). Nobody in the field publishes theirs. Posts 17, 18 and 19 turn a legal obligation into the strongest available differentiator.
- **Sintered stone and porcelain are outside the engineered stone prohibition** ([SafeWork NSW](https://www.safework.nsw.gov.au/legal-obligations/legislation/accordians/work-health-and-safety-amendment-engineered-stone-regulation-2024)). Page one for the replacement-benchtop question is government and media with no practitioner voice. Post 03 fills it.

---

## Success measures

Targets and the full tracking list are in `PUBLISHING-SCHEDULE.md` and `LOCAL-SEO-PLAYBOOK.md` §8.

Track by cluster, not sitewide, and watch the nine positions SteepWood already holds. The cannibalisation matrix in `TOPIC_SLATE.md` §3 exists to protect them. If one drops after a Batch 2 post goes live, check that post's primary keyword against the matrix first.

The single highest-priority non-content action is reviews. Thirteen at 4.9 is a strong rating on a thin base, review count feeds local prominence directly ([Google](https://support.google.com/business/answer/7091?hl=en)), and distance to the Newcastle workshop cannot be changed — so prominence is the only one of Google's three local factors still open to improvement.
