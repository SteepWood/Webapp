# SteepWood.com.au — Full SEO Audit

**Site:** https://steepwood.com.au
**Trading entity:** Pavit Cabinetry Pty Ltd t/a SteepWood (ABN 52 697 313 269 · NSW Carpentry Contractor 489553C)
**HQ:** Newcastle, NSW
**Audit date:** 22 June 2026  
**P0 code fixes shipped:** 22 June 2026 (Phase 2 PR 1)
**P1 code fixes shipped:** 16 June 2026 (Phase 2 PR 2)

### P0 completion log

| § | Issue | Status | Notes |
|---|---|---|---|
| §1 | 3× 404 blog URLs in sitemap | **Fixed** | Retired slugs excluded from sitemap; 301 redirects to replacement launch-pack posts |
| §2 | `www` → apex redirect | **Fixed** | Host-based 308 redirect in `next.config.ts` |
| §3 | Duplicate `\| SteepWood \| SteepWood` titles | **Fixed** | Root template `"%s \| SteepWood Joinery"`; page titles stripped of brand suffix |
| §4 | Service page paragraph duplication | **Fixed** | Removed auto-generated `bodySections` that recycled `whatIsParagraphs` |
| §5 | Deploy 6 launch-pack blog posts | **Done** (Phase 1) | Production seed + images live |
| §6 | Claim Google Business Profile | **Done** (Phase 1) | Verified 2026-06-22 |
| §7 | Connect Google Search Console | **Done** (Phase 1) | Domain property verified; sitemap submitted |

### P1 completion log

| § | Issue | Status | Notes |
|---|---|---|---|
| §8 | Blog hub missing `og:image` | **Fixed** | OpenGraph + Twitter cards on `/blog/` using `og-default.jpg` |
| §9 | 15 non-Newcastle location pages thin | **Fixed** | `locationHubExtensions.ts` + Why SteepWood, lead time, freight, architecture bullets |
| §10 | FAQ answers hidden until JS | **Fixed** | Native `<details>`/`summary>` via `FaqDisclosure` (homepage, service, location FAQs) |
| §11.1 | Sitemap `lastmod` all identical | **Fixed** | File mtimes from source TSX/content modules |
| §11.2 | Root schema missing GBP, ratings, catalog | **Fixed** | `sameAs`, `identifier`, `hasOfferCatalog`, async `aggregateRating` in root `@graph` |
| §12 | Citation directories | **Ops** | Manual NAP submissions — see `docs/tools-verification.md` |
| §13 | Analytics baseline | **Verified** | GA4 + Vercel Analytics wired; `generate_lead` on quote submit |
| §14 | Keyword weaving | **Done** | All 10 service pillars updated via `steepwood-s14-keyword-weave.zip` → `serviceContent.ts` |

**Refresh recommended:** Re-run Semrush / spot-check sitemap after next production deploy.

---

## Executive summary

SteepWood is a freshly launched Next.js site on Vercel with strong technical bones — clean HTML5, valid schema across every page, comprehensive sitemap (170+ URLs), AI-friendly robots.txt, HSTS, CSP, hreflang, canonicals — but **virtually no organic visibility yet**. Semrush's AU database returns Authority Rank 5,052,767, only **4 ranked keywords (all on Google pages 6–9)**, zero estimated organic traffic, and zero indexed backlinks. The 24-month history is all zeros, confirming this is a launch-phase domain rather than a declining one.

The audit is therefore framed as a **launch-readiness review**: fix the small set of blocking technical defects (notably three sitemap URLs returning 404, a missing apex redirect for `www.`, and duplicated `| SteepWood | SteepWood` title suffixes), then execute an authority-building plan focused on Google Business Profile, NAP citations, local link acquisition, and consistent publication of long-form content from the Newcastle workshop. Content quality across service and location pages is already above industry norms — schema coverage, in particular, is outstanding.

---

## 1. Visibility snapshot (Semrush, AU database)

| Metric | Value | Notes |
|---|---|---|
| Semrush domain rank | 5,052,767 | Essentially unranked. Typical of <6-month-old domains with no backlinks. |
| Organic keywords | 4 | All on positions 55–90 (Google pages 6–9). |
| Estimated organic traffic | 0 visits/month | No keyword ranks in the top-50, so Semrush attributes zero traffic. |
| Backlinks indexed | 0 | Semrush has not yet crawled any referring domains. |
| Referring domains | 0 | Same as above. |
| Anchor text distribution | n/a | No anchors recorded. |
| Top competitors (Semrush) | None returned | Insufficient keyword overlap to compute. |
| Paid (Adwords) keywords | 0 | No active Google Ads campaign detected by Semrush. |

### The four ranked keywords

| Keyword | Pos. | Volume (AU) | CPC | URL |
|---|---|---|---|---|
| cabinet maker central coast | 60 | 110 | $2.49 | /locations/central-coast |
| central coast custom | 55 | 90 | — | /locations/central-coast |
| commercial interior fitouts perth | 90 | 90 | — | /office-fitout/perth/ |
| style up kitchens and joinery | 57 | 70 | — | /custom-kitchen-joinery |

These rankings indicate Google has begun indexing service-location combo pages, but the site is far from competitive on any commercial keyword.

### 24-month historical trajectory

All zeros. SteepWood does not yet have enough crawl signal in Semrush's index to register monthly traffic estimates. This is normal for a Next.js relaunch where the prior site (if any) had a different stack or domain — but it also means there is no decline narrative; everything below is **what to ship before traffic arrives**, not what to fix after losing it.

---

## 2. Technical audit — site infrastructure

### What's working (keep doing it)

- **HTTPS forced** — HTTP 308 redirect from `http://` to `https://`.
- **HSTS preload** — `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- **Modern security headers** — CSP, X-Content-Type-Options, X-Frame-Options SAMEORIGIN, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy locking down camera/microphone/geolocation/FLoC.
- **Vercel edge + Next.js SSR** — `x-nextjs-prerender: 1` confirms pages are pre-rendered to HTML (good for Googlebot).
- **Next/Image optimisation** — all 17 homepage images served via `/_next/image?url=…&w=3840&q=75` with responsive `srcset`. Format negotiation (AVIF/WebP) handled at the edge.
- **Sitemap correctly linked** in robots.txt (`Sitemap: https://steepwood.com.au/sitemap.xml`).
- **AI bot policy is exemplary** — explicit Allow rules for GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, ClaudeBot, anthropic-ai, Applebot-Extended, cohere-ai, CCBot, Amazonbot; explicit Disallow for Bytespider. This positions SteepWood well for AI Overviews and ChatGPT citations.
- **Canonicals present on every audited page** and self-referential.
- **hreflang `en-AU`** declared on every page.
- **Trailing-slash policy is consistent** (all URLs end with `/`).
- **JSON-LD coverage is best-in-class for the joinery vertical:**
  - Homepage: `@graph` (LocalBusiness + Organization + Person + WebSite), FAQPage with 5 Q&A, plus 6 standalone Review entities.
  - Service pages: Service + BreadcrumbList + FAQPage + HowTo + WebPage + Review + the LocalBusiness `@graph`.
  - Location pages: HomeAndConstructionBusiness + BreadcrumbList + FAQPage + Place + WebPage + Reviews.

### Defects to fix

| # | Issue | Severity | Where | Fix |
|---|---|---|---|---|
| T1 | **3 sitemap URLs return 404** | **P0** | `/blog/australian-home-joinery-trends-2026/`, `/blog/joinery-materials-guide-2pac-timber/`, `/blog/kitchen-storage-planning-australia/` — all listed in `sitemap.xml` but return 404. | Either publish the posts (drafts may exist locally) or remove the entries from the sitemap. Wasted crawl budget + risk of soft-404 signals. |
| T2 | **`www.` subdomain returns 200, not 301** | **P0** | `https://www.steepwood.com.au/` resolves with HTTP 200 instead of redirecting to apex. Both versions can be indexed → duplicate content risk and split link equity. | Add a Vercel redirect (or DNS-level if managed there) from `www.steepwood.com.au/*` → `https://steepwood.com.au/$1` with HTTP 301. |
| T3 | **Title-tag duplication: `\| SteepWood \| SteepWood`** | **P1** | 4 of 6 audited pages have the suffix `\| SteepWood \| SteepWood` (built-in-wardrobes, custom-kitchen-joinery, blog, locations/newcastle). Caused by the page-level title already containing `\| SteepWood` and a template appender adding another `\| SteepWood`. | Strip the template suffix when the page title already ends with `\| SteepWood`, OR remove the per-page `\| SteepWood` from the source. Affects ~150+ pages including all service-location combos. |
| T4 | **Title length on some pages exceeds Google's ~60-char display limit** | **P1** | `Custom Kitchen Joinery Australia \| SteepWood Joinery \| SteepWood` = 64 chars. `Built-In Wardrobes & Walk-In Robes \| SteepWood \| SteepWood` = 60 chars. | Fixing T3 also fixes this. Target 50–58 chars including brand. |
| T5 | **Sitemap `<lastmod>` is set to today on every URL** | P2 | Every URL shows `2026-06-22T06:10:35.939Z`. This signals "everything updated" on every crawl which Google may ignore or down-weight. | Generate `<lastmod>` from actual content/MDX file mtime, not build time. |
| T6 | **Sitemap is single-file (no index)** | P2 | Currently OK — 170-ish URLs is under the 50,000-URL/50 MB limit. | No action now. Once the blog reaches 50+ posts, consider splitting into a sitemap index with `/sitemap-pages.xml`, `/sitemap-blog.xml`, `/sitemap-portfolio.xml`. |
| T7 | **No `viewport` audit performed in this report** | P2 | Cannot test mobile rendering without a headless browser pass. | Run a manual PageSpeed Insights / Lighthouse pass on `/`, `/custom-kitchen-joinery`, `/locations/newcastle` and the new blog URLs. |
| T8 | **No Open Graph image on the `/blog/` index** | P2 | Confirmed via head inspection: `og:image` present on every other page but absent on `/blog/`. Twitter card downgrades from `summary_large_image` to `summary`. | Add an `og:image` to the blog hub page (the workshop hero or a "Insights from the workshop" tile works fine). |
| T9 | **`x-robots-tag` and indexability spot-check** | P2 | None of the 6 audited pages carry a `<meta name="robots">` directive, which defaults to `index, follow`. No `x-robots-tag` header observed. | Confirm via Google Search Console once connected. |

---

## 3. On-page audit — content and template defects

### Service pages (10 pages × parent + 16 city combos = 170 URLs)

**Strengths**
- Single H1 on every page, descriptive and AU-localised.
- 1,500–2,000 words on parent service pages; 1,200–1,800 on city combo pages. Above the threshold Google uses to consider a page "thin" for commercial intent.
- Strong inclusion of materials nouns (Polytec, Laminex, Caesarstone, Smartstone, Blum, Hettich) — exactly what high-intent shoppers search and AI overviews ingest.
- Internal linking from each service page to all 16 city variants and from each city page back to all 10 services — every page is reachable in ≤2 clicks from the homepage.

**Defects**

| # | Issue | Severity | Where | Fix |
|---|---|---|---|---|
| C1 | **Paragraph duplication on the kitchen service page** | **P0** | The `/custom-kitchen-joinery/` body repeats three core paragraphs ("Custom kitchen joinery starts with a genuine understanding…", "Our kitchens are manufactured in Newcastle using premium materials…", "We work across Newcastle, Sydney, Melbourne, Brisbane, Perth…") 3+ times each in the same page. Likely a templating bug where bullet/expanded sections inject the parent intro repeatedly. | Audit the kitchen-joinery template (and likely the other 9 service templates) so each paragraph renders once. Duplication inside a single URL doesn't earn a duplicate-content penalty but signals low edit quality and inflates word count artificially, which Google's helpful-content systems may down-weight. |
| C2 | **Cross-city pages have boilerplate fingerprints** | P1 | The Sydney kitchen page repeats the phrase "Typical for Sydney custom kitchens projects" five times and "For Sydney projects, this step is scheduled within our 8–14 weeks from deposit programme" three times. Across 160 service-city combos, the bulk of the content is templated and only the city noun changes. | Tighten templates so the city variation is genuine (suburb mentions, drive times, build types unique to the city) instead of inserted boilerplate. The good news: Sydney/Mosman/Cremorne/Northern Beaches references already exist; lean harder into those. Aim for 30%+ unique copy per combo page. |
| C3 | **Service H2/H3 structure is fine but some H3s are functional, not topical** | P2 | E.g. on the kitchen page, every "card" feature is an H3 ("Custom cabinetry", "Benchtops", "Splashbacks") — fine. But on combo pages, H3s named after city names ("Newcastle", "Sydney", "Canberra") appear in the "Locations we service" rail, which double-counts city names as section headings. | Demote those rail labels to `<span>` or H4. Reserve H3s for in-page topical sections. |
| C4 | **FAQ rendering — accessibility vs SEO** | P2 | The accordion uses Radix and renders questions inside `<button>` inside `<h3>` — fine. Answers are hidden in collapsed `<div role="region">` until clicked. Google reads the JSON-LD FAQPage, which contains full Q&A, so SEO is fine. However, users without JS see questions but no answers (a regression for screen readers and non-JS bots). | Pre-render answers in the DOM (e.g. with `defaultValue` open, then JS-hide after hydration) so they're always present in HTML. Alternative: render answers in plain `<details>` instead of Radix accordion. |

### Location pages (16 cities)

**Strengths**
- Each carries a unique LocalBusiness type appropriate to the city (`HomeAndConstructionBusiness` on Newcastle, etc.) plus a `Place` entity with coordinates.
- Newcastle page (the HQ) carries genuine local detail — Hamilton, Cooks Hill, Merewether, Bar Beach, Honeysuckle, Marketown, Charlestown — exactly what should rank.

**Defects**

| # | Issue | Severity | Where | Fix |
|---|---|---|---|---|
| L1 | **Non-Newcastle cities are templates with suburb-list inserts** | P1 | Sydney, Melbourne, Brisbane, etc., pages reuse the same paragraph scaffolding and substitute city names. Differentiation is shallow. | Add city-unique sections: (a) Recent local enquiry suburbs (already mentioned for Sydney — extend everywhere), (b) Build type/architecture detail unique to the city, (c) Lead time/freight detail unique to the city. Newcastle is the template to copy in spirit, not in literal copy. |
| L2 | **No service-area microdata** | P2 | LocalBusiness schema declares one address (Newcastle) but `areaServed` is not exhaustively listed on combo pages. | Add `areaServed` as an array of cities on each location LocalBusiness block, and on the main LocalBusiness `@graph` add all 16 cities (or use a national `Country: AU` value). |

### Blog hub and posts

**Strengths**
- `/blog/` carries 1,024 words of intro + post grid (above thin-content threshold).
- New posts use BlogPosting + Person (author Sukhveer Kaur) + BreadcrumbList schema.
- Editorial voice is on-brief: AU spellings, joinery-specific, founder byline.

**Defects**

| # | Issue | Severity | Where | Fix |
|---|---|---|---|---|
| B1 | **3 blog URLs in sitemap return 404** | **P0** | (same as T1 above) `/blog/australian-home-joinery-trends-2026/`, `/blog/joinery-materials-guide-2pac-timber/`, `/blog/kitchen-storage-planning-australia/`. | Publish the drafts (these were the original three demo posts on the site) or remove from sitemap. |
| B2 | **Blog hub missing `og:image`** | P2 | (same as T8 above) | Add the workshop hero or a "Insights from the workshop" tile as `og:image`. |
| B3 | **Author archive not in sitemap** | P2 | No `/author/sukhveer-kaur/` URL detected, so the Person schema points to a person but not a hub. | Either add an author archive page or remove the `url` field from the Person entity. |

---

## 4. Backlinks and authority

Semrush returns **`ERROR 50 :: NOTHING FOUND`** for all four backlink endpoints (overview, anchors, referring domains, competitors). Translation: zero indexed inbound links.

For a Newcastle joinery business operating since 2014 (per the brand story), this is unusually low — it almost certainly indicates that the prior brand (if any) lived on a different domain that was not 301-redirected to `steepwood.com.au`. **If a prior domain exists, that is the single highest-leverage SEO fix in this entire audit.**

### Authority-building plan (next 90 days)

| Priority | Action | Why |
|---|---|---|
| **P0** | Check whether SteepWood / Pavit Cabinetry / "Castle & Co joinery arm" had any prior web presence. If so, 301-redirect every old URL to the closest match on steepwood.com.au. | Recovers historic authority + any aged anchor profile. |
| **P0** | Claim and verify Google Business Profile for the Newcastle workshop. Add full NAP, hours, services, photos, owner Q&A, and link to steepwood.com.au. | Local pack visibility is the highest-converting channel for joinery. |
| **P0** | Submit consistent NAP (Name / Address / Phone) to: Yellow Pages AU, True Local, Hotfrog AU, Pure Local, Aussie Web, ServiceSeeking, HiPages, Houzz AU, Bing Places, Apple Business Connect. | Local citation foundation for Newcastle + 16 cities. |
| P1 | Outreach for 5–10 industry placements: Houzz AU profile + project features, Australian Designer Rugs / Belle / Vogue Living "trade directory" listings, BUILD Australian Architecture Awards (where eligible), Master Builders Association NSW member directory, HIA member directory. | Topical relevance + AU authority. |
| P1 | Pitch 3 long-form guides to AU-specific publications: Houzz AU editorial, Realestate.com.au's editorial, Domain.com.au's design section, ArchitectureAU, House & Garden AU. Lead with the engineered-stone-ban benchtop guide (already written). | Earned editorial links carry weight. |
| P1 | Sponsor / supply for one regional event (Newcastle Now, Hunter Region Business Awards) for a press-release link. | Local relevance. |
| P2 | Reach out to non-competing complementary trades — kitchen designers, interior designers, builders, real estate stylists in Newcastle/Sydney/Hunter Valley — and offer a portfolio swap (their gallery on your portfolio page, your link on theirs). | Low-effort relevant link building. |

---

## 5. Competitor positioning

Semrush could not return competitors because SteepWood doesn't yet rank for enough overlap keywords. For the audit, the realistic competitive set in the Newcastle joinery space is:

| Competitor type | Examples to monitor manually | Why they matter |
|---|---|---|
| National joinery brands | Kinsman, Freedom Kitchens, Kaboodle | These dominate broad-volume terms like "custom kitchen Australia" but compete weakly on local intent. |
| Newcastle-local joinery | Daniel Lomma Design, Hunter Region Cabinets, Eastside Kitchens & Joinery, Polytec showroom partners in NSW | Direct competitors for Newcastle/Hunter combo searches. |
| Sydney premium joinery | Sublime Cabinets, IO Kitchens, Tom Mark Henry's joinery suppliers | Direct competitors for "Sydney custom kitchen joinery". |
| Aggregators | Hipages, ServiceSeeking, OneFlare, Houzz AU | These often outrank individual joiners on long-tail city queries. Either out-publish them (long-form combo pages — already underway) or list on them. |

**Action:** once SteepWood reaches Authority Score 10+ (typically achieved with 30–50 referring domains), re-run `domain_organic_organic` to see which sites actually share SERPs. For now, manually search the top 5 city + service combinations (e.g. "custom kitchen Newcastle", "built-in wardrobes Sydney", "office fitout Canberra") and record the top 10 organic results in a spreadsheet — repeat monthly.

---

## 6. AI search readiness (LLM citations and AI Overviews)

This is where SteepWood has a structural advantage and should double down.

| Signal | Status | Notes |
|---|---|---|
| robots.txt allows AI crawlers | ✅ Excellent | GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended, cohere-ai, CCBot, Amazonbot, OAI-SearchBot all explicitly allowed. Bytespider blocked (correct). |
| Structured data depth | ✅ Excellent | LocalBusiness + Organization + Person + Service + FAQPage + HowTo + Review + BreadcrumbList + Place across all major templates. |
| Clear E-E-A-T signals | ⚠️ Strong but improvable | Founder byline (Sukhveer Kaur) on blog posts, NSW licence number visible on homepage, ABN published, ten Google reviews referenced. Add: photos of the workshop and team, video walk-through, "About the founder" page expansion. |
| Content depth and recency | ⚠️ In progress | Six new launch-pack blog posts not yet deployed. Once live, target a weekly cadence for the first quarter. |
| AI Overview citation quality | Untested | Once GSC is connected, monitor impressions from AI Overviews (AIO traffic shows up as `Search Appearance > AI Overviews` in GSC's new schema). |

---

## 7. Prioritised action plan

### P0 — Critical, ship within 7 days

1. **Fix 3× 404 blog URLs.** Either publish the drafts or strip the entries from `sitemap.xml`. Currently breaking sitemap integrity.
2. **Add `www.steepwood.com.au` → `steepwood.com.au` 301 redirect.** Configure in Vercel project settings → Domains.
3. **De-duplicate the `| SteepWood | SteepWood` title-tag pattern** across all ~170 sitemap URLs. One-line fix in the Next.js `generateMetadata` helper.
4. **Audit and fix paragraph duplication on `/custom-kitchen-joinery/`** (and likely every other service template). Each paragraph should appear exactly once.
5. **Deploy the six new launch-pack blog posts.** They are written, illustrated, and ready — every day they sit on a hard drive is a day of lost crawl signal.
6. **Claim Google Business Profile** for the Newcastle workshop address. Free, takes 30 minutes, single highest-impact local-SEO action.
7. **Connect Google Search Console.** This is the only way to see real impressions, clicks, CTR, and AI Overview appearances. Verify via DNS TXT.

### P1 — Important, ship within 30 days

8. Add `og:image` to `/blog/` and confirm Twitter card upgrades to `summary_large_image`.
9. Expand the 15 non-Newcastle location pages with genuine city-specific content (suburb-level enquiry examples, local architectural styles, freight/lead-time specifics) — aim for 30%+ unique copy per page.
10. Pre-render FAQ accordion answers in the DOM (or switch to `<details>`) for accessibility and non-JS clients.
11. Generate `<lastmod>` in sitemap from content mtime, not build time.
12. Add `areaServed` arrays to LocalBusiness schema on the main `@graph`.
13. Submit NAP to 8–10 AU citation directories listed in §4.
14. Run PageSpeed Insights / Lighthouse on the four template pages (home, service, location, blog post). Track LCP, INP, CLS in Vercel Analytics.
15. Set up Vercel Analytics → Real User Monitoring and Google Analytics 4. Confirm both pre-existing in CSP (`https://www.googletagmanager.com`, `https://va.vercel-scripts.com`, `https://vitals.vercel-insights.com` are already allowed).
16. Pitch the engineered-stone-ban benchtop guide to 5 AU design publications.

### P2 — Nice-to-have, ship within 90 days

17. Author archive page for Sukhveer Kaur (or remove the `url` from the Person schema).
18. Demote city-name H3s to H4 on combo pages.
19. Plan sitemap-index split once the blog reaches 50+ posts.
20. Build a recurring monthly tracking dashboard: `domain_rank`, `domain_organic` (top 50), `backlinks_overview`, GBP impressions, GSC clicks/impressions. Use Semrush's `domain_rank_history` once data starts populating.
21. Add a portfolio swap programme with 5–10 non-competing AU design trades.
22. Consider adding a "Trade pricing" or "Architect & designer" page to capture B2B inbound; high-value, low-volume keyword.
23. Investigate prior-domain redirect opportunity (§4) — could be P0 if a domain is identified.

---

## 8. Quick wins (low effort, high impact)

| Win | Effort | Impact |
|---|---|---|
| GBP claim + verification | 30 min | High — local pack visibility within 2–4 weeks. |
| `www` → apex 301 redirect | 5 min | High — recovers any prior www links + closes duplicate-content gap. |
| Remove `| SteepWood` duplication from titles | 15 min | Medium — better CTR from cleaner SERP appearance across 170 URLs. |
| Fix or remove the 3× 404 sitemap URLs | 5 min | Medium — Googlebot stops wasting budget on dead pages. |
| Deploy 6 new blog posts | 1 hour | High — instantly triples blog content depth. |
| Connect GSC | 10 min | High — unlocks all forward measurement. |
| Submit to GBP + 5 citation sites | 90 min | Medium — local citation foundation. |

---

## 9. Measurement plan

| Metric | Source | Cadence | Target by 90 days |
|---|---|---|---|
| Semrush domain rank | Semrush `domain_rank` | Monthly | < 2,000,000 (from 5,052,767) |
| Organic keywords (top 100) | Semrush `domain_organic` | Monthly | 50+ keywords (from 4) |
| Organic keywords (top 20) | Semrush `domain_organic` | Monthly | 10+ keywords |
| Referring domains | Semrush `backlinks_refdomains` | Monthly | 25+ (from 0) |
| GSC impressions | Google Search Console | Weekly | 5,000+/month |
| GSC clicks | Google Search Console | Weekly | 250+/month |
| GBP profile views | Google Business Profile | Weekly | 500+/month for Newcastle |
| GBP direction requests | Google Business Profile | Weekly | 20+/month |
| GA4 organic sessions | GA4 | Weekly | 800+/month |
| Quote form submissions (organic) | GA4 event tracking | Weekly | 10+/month |

---

## Appendix A — Sources

- Semrush AU database — `domain_rank`, `domain_rank_history`, `domain_organic`, `domain_organic_unique`, `domain_organic_organic`, `backlinks_overview`, `backlinks_anchors`, `backlinks_refdomains` ([Semrush](https://www.semrush.com/))
- Live HTML inspection of 6 representative templates (homepage, kitchen service, built-in wardrobes service, Newcastle location, Sydney kitchen combo, blog hub, about)
- [steepwood.com.au/sitemap.xml](https://steepwood.com.au/sitemap.xml) (170+ URLs)
- [steepwood.com.au/robots.txt](https://steepwood.com.au/robots.txt)
- HTTP response headers (Vercel-served)
- Manual HTTP status check on 9 blog URLs and 6 portfolio URLs

## Appendix B — Files saved

- `semrush-raw.txt` — raw Semrush outputs for traceability
- `raw_home.html`, `raw_custom-kitchen-joinery.html`, `raw_locations_newcastle.html`, `raw_built-in-wardrobes.html`, `raw_blog.html`, `raw_about.html` — full HTML snapshots
- `audit-report.md` — this report

---

*Audit performed 22 June 2026. Refresh recommended after each P0 action ships and at the 30/60/90-day milestones.*
