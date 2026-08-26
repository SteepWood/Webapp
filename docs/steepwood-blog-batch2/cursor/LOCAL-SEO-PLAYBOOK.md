# Local SEO Playbook — Dominating NSW

Content alone will not win local. This is the work that sits alongside the 30 posts. Ordered by leverage.

---

## 1. The three things Google actually ranks on

Google states local results are ranked primarily on **relevance, distance and prominence**, and that prominence is influenced by information across the web including links, articles and directories, and by review count and score ([Google Business Profile Help](https://support.google.com/business/answer/7091?hl=en)).

Mapped to SteepWood:

| Factor | Current position | Lever |
| --- | --- | --- |
| Relevance | Strong. 10 services × 16 locations already built, and 209 indexed URLs | Add the recommended NSW hubs in `LOCATION-STRATEGY.md` §4 |
| Distance | Fixed. One Newcastle workshop, and a service-area business cannot use a radius | Cannot be improved. Must be compensated for organically |
| Prominence | **Weakest input by a wide margin.** 13 Google reviews | Reviews, citations, links. This section |

Because distance cannot change, every point of prominence matters more here than it would for a business with shopfronts across Sydney.

---

## 2. Reviews — the single highest-priority action

Thirteen reviews at 4.9 is a good rating on a thin base. Review count feeds local prominence directly ([Google](https://support.google.com/business/answer/7091?hl=en)), and not one of the 34 competitors reviewed publishes a review count on their own site, which means this is both a ranking gap and a conversion gap.

**Target: 25 or more within 90 days, then a steady cadence.**

1. Ask at handover, in person, at the moment the client sees the finished job. Not by email a week later.
2. Send a short follow-up the same day with the direct review link. One reminder after four days, then stop.
3. Ask past clients from the last 24 months. A single respectful round of outreach.
4. Never offer an incentive for a review, and never gate the request on the sentiment of the answer. Both are prohibited by consumer law and by Google's policies.
5. Reply to every review inside 48 hours, naming the suburb and the type of work. Those replies are indexable text on the profile and they carry the location signal.
6. Spread the location mix deliberately. Reviews from Wollongong, Bowral and Terrigal are worth more to a NSW-wide strategy than five more from one suburb.

Do not display review content on the site as `Review` schema on blog posts. Keep the `aggregateRating` on the organisation node only, at 4.9 from 13 reviews, updated when the real count changes.

---

## 3. Google Business Profile

Constraints: **one profile only**, **20 service areas maximum**, and **no radius option** for a service-area business ([Google Help](https://support.google.com/business/answer/9157481?hl=en)).

**Recommended 20 service areas** (from `LOCATION-STRATEGY.md` §2): Newcastle, Lake Macquarie, Maitland, Port Stephens, Cessnock, Central Coast, Wyong, Gosford, Singleton, Muswellbrook, Wollongong, Shellharbour, Kiama, Bowral, Sydney, Northern Beaches, Woollahra, Chatswood, Parramatta, The Hills Shire.

Profile completeness tasks:

- Primary category: Cabinet maker. Secondary categories: Joiner, Kitchen remodeler, Furniture maker, Woodworker — only those that genuinely apply.
- Business name exactly as trading: SteepWood. Do not keyword-stuff the name; it is a suspension risk.
- Services list: all 10 site services, each with a description containing its primary keyword.
- Products: use for the signature joinery types, each with an indicative price range consistent with the blog posts.
- Attributes, hours (Mon–Fri 7am–5pm, Sat by appointment), phone 0468 387 676, and the quote URL.
- Photos: 20 or more real job photos, geotagged where possible, refreshed monthly. Not the Phase 2 generated images — the profile must show actual work.
- **Posts: one per published blog post**, on its publish day, per the checklist in `PUBLISHING-SCHEDULE.md`. That is 30 profile posts across the window.
- Q&A: seed the six most common questions and answer them from the business account. Use the FAQ text from the relevant posts.

---

## 4. Citations and NAP consistency

Every listing must carry identical details, matching the site exactly:

```
SteepWood
Pavit Cabinetry Pty Ltd t/as SteepWood
Newcastle NSW, Australia
0468 387 676
hello@steepwood.com.au
https://steepwood.com.au
ABN 52 697 313 269
NSW Carpentry Contractor Licence 489553C
```

Priority Australian citations: Google Business Profile, Bing Places, Apple Business Connect, Localsearch, True Local, Yellow Pages Australia, Hotfrog, Aussie Web, StartLocal, Yelp Australia, ABN Lookup consistency, NSW Fair Trading licence record consistency, HIA or relevant industry directory if membership exists.

Note that **Localsearch ranks first for *joinery Newcastle NSW***, ahead of every actual joiner. A complete, well-optimised Localsearch listing therefore captures traffic from a position SteepWood cannot yet outrank organically. Treat it as a channel, not just a citation.

**Oneflare closed on 30 June 2026 and now redirects to Airtasker.** Remove any Oneflare reference from marketing material and check for stale citations pointing there.

Audit for duplicates and for any listing showing an old phone number or address. Duplicate or inconsistent listings dilute the prominence signal.

---

## 5. The advertising compliance requirement, which is also an SEO asset

NSW requires that building trade advertisements show the **licensee name**, the **licence number with its category**, and a **business phone number**. Penalties reach $22,000 for an individual and $110,000 for a corporation ([NSW Government](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements)).

Not one of the 34 competitors reviewed publishes a licence number anywhere.

Implementation:

- Footer, site-wide: `Pavit Cabinetry Pty Ltd t/as SteepWood · NSW Carpentry Contractor Licence 489553C · ABN 52 697 313 269 · 0468 387 676`
- Same line on every location page, every service page and in the author aside on blog posts.
- In the organisation JSON-LD as `identifier` entries, per `SCHEMA-SPEC.md` §4.
- On the Google Business Profile description and in the services descriptions.
- On quotes, contracts, vehicle signage and paid ads.

This is a legal obligation that doubles as the strongest trust differentiator available, and it is why posts 17, 18 and 19 exist.

---

## 6. On-site local architecture

Already strong. Ten services × 16 locations plus 16 hubs plus 209 indexed URLs is a better structure than any competitor reviewed except Liteco's Eastern Suburbs pages.

Gaps to close, in order:

1. **Build the 16 recommended NSW hubs** in `LOCATION-STRATEGY.md` §4. Priorities 1 to 10 add $2.36 billion of approved alterations demand to the addressable layer, and 100 new service-by-location pages.
2. **Split Sydney.** One `/locations/sydney/` hub is serving a $2.0 billion renovation market across sub-regions with completely different housing stock. The four Sydney sub-region blog posts (23 to 26) are the interim substitute and should each link to their matching hub as soon as it exists.
3. **Add `areaServed` structured data** to every location page, naming the LGAs and the suburbs the page actually discusses.
4. **Add a suburb list to every location hub**, using the vocabulary in `LOCATION-STRATEGY.md` §5. Never invent a suburb.
5. **Add the licence and compliance line** to every location page.
6. **Interlink location pages geographically**, nearest-neighbour, not alphabetically.
7. **Geo-disambiguate Newcastle everywhere.** Five of ten page-one results for *custom joinery Newcastle* are United Kingdom businesses. Write Newcastle NSW, name the Hunter, name the LGA, state postcode where confirmed, and set `addressCountry: AU` in every schema block. This is a structural fix nobody else has made.

---

## 7. Link building

Realistic, defensible tactics only. No paid link networks.

| Tactic | Why it works here |
| --- | --- |
| Local press on the cost guides | Regional outlets in Newcastle, the Central Coast and the Illawarra cover renovation cost stories, and nobody local publishes prices. Posts 01, 05, 08 and 20 to 22 are the pitchable ones |
| The engineered stone angle | The prohibition remains newsworthy and page one for the replacement-benchtop query is entirely government and media, with no practitioner voice. Post 03 is a credible expert-comment source |
| Supplier and brand pages | Hardware, stone and timber suppliers often list stockists or featured fabricators. Ask |
| Architects, designers and builders | Reciprocal project pages. Only with written permission to name the project |
| Industry bodies | HIA and relevant associations, if membership exists. Do not claim membership that does not exist |
| Local sponsorship | Real community involvement in the Hunter, with a listing page link |
| Awards and directories with genuine editorial criteria | Only real entries. Never claim an award that was not won |

The cost guides are the linkable assets in this batch. Nine of them carry data no competitor publishes.

---

## 8. Measurement

Baseline everything before 22 August 2026. Review at day 30, 60 and 90 against the targets in `PUBLISHING-SCHEDULE.md`.

Track by cluster, not just sitewide:

| Cluster | Primary tracked terms |
| --- | --- |
| Kitchen | butlers pantry cost NSW, kitchen island cost NSW, kitchen cabinet cost per linear metre, kitchen renovation timeline NSW, Hamptons kitchen cost NSW |
| Materials | porcelain benchtop cost NSW, Blum hardware cost Australia, joinery timber species Australia |
| Other rooms | laundry cabinets cost NSW, floating vanity cost NSW, timber staircase cost NSW, built in home office cost NSW |
| Commercial | reception desk cost Australia, office fitout cost per square metre, shopfitting cost per square metre Australia |
| Trust | cabinet maker hourly rate NSW, why is custom joinery so expensive, NSW building licence check renovation |
| Local | custom joinery Newcastle cost, kitchen renovation Central Coast cost, kitchen renovation Wollongong cost, kitchen renovation Northern Beaches, bespoke joinery eastern suburbs Sydney, custom joinery North Shore Sydney, custom joinery Inner West Sydney, apartment joinery Sydney, joinery Southern Highlands, custom joinery regional NSW, new home joinery Sydney |

Also track and protect the positions already held: custom bathroom vanity cost Australia, walk in robe cost Australia, built in wardrobe cost, built in home office cost, shopfitting cost Australia, timber staircase cost Australia, commercial joinery Sydney, custom joinery Newcastle, cabinet maker Central Coast. The cannibalisation matrix in `TOPIC_SLATE.md` §3 exists to keep these safe — if any of them drops after a Batch 2 post goes live, check that post's primary keyword against the matrix first.

Local pack tracking should be run per target suburb, not per keyword, because distance changes the result set street by street.

---

## 9. Quarterly maintenance

- Refresh every price range in the cost guides, and update `dateModified`. All 30 posts are dated 2026 and will need a 2027 pass.
- Re-check every legal and compliance statement against the current NSW Fair Trading and SafeWork NSW pages. Thresholds and prohibitions change.
- Re-run the internal link audit. Add the forward links from the day-31 backfill pass if not already done.
- Update the review count in the organisation schema.
- Re-audit citations for drift.
- Re-run the competitor SERP check. The field in `NSW-MARKET-RESEARCH.md` is a point-in-time snapshot from August 2026.
