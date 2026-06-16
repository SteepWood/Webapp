# SteepWood — AIO Layer (Answer Engine + Generative Engine Optimisation)

> **Purpose:** Layer Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) on top of the existing SEO foundation in `STEEPWOOD-CURSOR-MASTER-BUILD.md`. Everything below is **additive** — no SEO content, schema, metadata, URL, heading, or copy from the master doc is removed or altered. AIO and SEO work together; this document encodes the contract between them.

---

## 0. Why AIO matters now (and why SEO still wins)

In 2026, AI search surfaces decide what gets shown for a growing share of high-intent commercial queries:

- Google AI Overviews appear on roughly 48% of queries ([GrowthOS](https://www.usegrowthos.com/blog/google-ai-overviews-vs-chatgpt-vs-perplexity)).
- Content with proper schema markup has a 2.5x higher chance of appearing in AI-generated answers ([Stackmatix](https://www.stackmatix.com/blog/structured-data-ai-search)).
- Sites with comprehensive schema see 40-60% higher citation rates in AI responses than competitors without schema ([LLMFY](https://llmfy.ai/blog/schema-for-llm-complete-guide)).
- Princeton research shows that citing sources, adding statistics, and including quotations can improve AI visibility by 30-40% ([Digital Applied](https://www.digitalapplied.com/blog/geo-guide-generative-engine-optimization-2026)).
- For local businesses, data accuracy is the single most impactful AI ranking factor ([SOCi](https://www.soci.ai/blog/how-to-rank-in-chatgpt-perplexity-and-google-ai-overview/)).

**The key insight:** SEO and AIO are not competing — they are layered. AI search engines (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude) start from web search results and then pick which pages to cite. Strong SEO gets you into the candidate pool; AIO determines whether you get cited inside the answer.

Each platform has different citation logic ([ZipTie](https://ziptie.dev/blog/content-refresh-strategy-for-ai-citations/)):

| Factor | ChatGPT | Perplexity | Google AI Overviews |
|---|---|---|---|
| Top source preference | Wikipedia (47.9%) | Reddit (46.7%) | Top organic results |
| Freshness requirement | Extreme — 76.4% cited within 30 days | High — real-time | Moderate, follows organic ranking |
| Organic SEO correlation | Low — ~90% from beyond page 2 | Low | High — 93.67% cite a top-10 result |
| Content style rewarded | Encyclopedic authority, factual density | Community-validated, discussion-driven | Schema-marked, traditionally authoritative |

SteepWood's AIO strategy must hit all three surfaces simultaneously.

---

## 1. The AIO contract (what must hold across the build)

These rules apply to every page in the build. They are enforced by the existing Cursor rules file plus a new AIO addendum.

### 1.1 SEO is not modified
- Every title, meta, canonical, hreflang, OG/Twitter tag, URL, JSON-LD block, H1/H2/H3 text, body paragraph, and FAQ that was specified in `STEEPWOOD-CURSOR-MASTER-BUILD.md` stays exactly as written.
- AIO work either (a) adds new structured-data blocks alongside existing ones, (b) adds new sections to pages, (c) creates new files (llms.txt, llms-full.txt, identity blocks), or (d) refines existing FAQ/body text without changing its semantic intent or AU English voice.

### 1.2 Answer-first writing within every section
For every section heading already specified in Section 9 of the master doc, the **first 40–60 words after the heading** must be a direct, self-contained answer to the question implied by the heading ([Frase](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai)). Supporting context follows after. This is editing within the existing copy, not replacing it.

### 1.3 Citation density
Every long-form page (service pillars, location hubs, blog posts) must include **at least one statistic with source citation every 150–200 words** ([Frase](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai)). Statistics use specific numbers (not "significant growth"). Sources are linked with anchor text that is the source name, not "source" or "link" — matching the SEO citation style.

### 1.4 Entity consistency
The exact identity block "**SteepWood is a Newcastle, NSW-headquartered custom joinery studio serving 16 Australian cities**" appears verbatim on the homepage, about page, contact page, every location hub, and the llms.txt file. AI models stop hallucinating about a brand when the same identity sentence appears at least three times across the site ([Position Digital](https://www.position.digital/blog/answer-engine-optimization-best-practices/)).

### 1.5 Semantic chunks
Sections are 200–400 words with one topic per section ([Frase](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai)). Existing master-doc headings are honoured; if a master-doc section is currently longer than 400 words, split it with H3 subheadings rather than removing content.

### 1.6 Server-rendered HTML
Every line of content visible on a page must be in the HTML the server returns. AI crawlers do not execute JavaScript reliably ([LLMrefs](https://llmrefs.com/generative-engine-optimization)). Next.js App Router server components by default already satisfy this — but client components must not be the sole bearer of body copy.

### 1.7 AU English + no emojis (already locked from master doc)
Same as master doc and UX prompt.

---

## 2. Workstream map — how AIO bolts onto the 4 phases

AIO is rolled into the existing phase plan. No new phase is created; existing tasks get AIO addenda, and new tasks are inserted at the end of each phase as **Section 10 (AIO)** of the master doc.

| Phase | Existing focus | New AIO additions |
|---|---|---|
| 1 — Foundation | Project setup, design system, global shell | llms.txt scaffolding; identity block; AI-bot crawl allowlist in robots.txt; `<Person>` and `<Organization>` E-E-A-T schema for SteepWood founder + Newcastle entity. |
| 2 — Core Pages | All 192 indexable pages with SEO content | Answer-first opening lines on every section; statistic-with-citation density; semantic chunking; AIO-enriched FAQ (multi-question variants targeting fan-out queries); HowTo schema on relevant service pages; canonical "how to describe us" sentence on home/about/contact; identity block repeated as specified. |
| 3 — Lead Gen | Quote form, portfolio, blog, admin | Blog editorial template enforces answer-first + citation density; portfolio detail pages get `CreativeWork` + `Place` linkage; testimonials enriched with `Review` schema and `Person` author markup; quote form thank-you page has structured event for AI agents that may complete the form. |
| 4 — Launch | Performance, security, analytics, GSC | Bing Webmaster Tools (critical — ChatGPT uses Bing's index); AI bot monitoring; AIO citation tracking dashboard; quarterly content refresh cadence in cron jobs; Wikipedia entity creation for SteepWood (off-site). |

---

## 3. Section 10 — AIO content additions (append to master doc)

The following becomes a new top-level section in `STEEPWOOD-CURSOR-MASTER-BUILD.md`, after Section 9.

### 10.1 The canonical identity block (use verbatim)

This block appears in three places on every key page and forms the basis of llms.txt.

```
SteepWood is a Newcastle, NSW-headquartered custom joinery studio serving 16 Australian cities including Sydney, Canberra, Melbourne, Brisbane, the Gold Coast, the Hunter Valley, and the Central Coast. We design, manufacture, and install custom kitchen joinery, built-in wardrobes, office fitouts, shopfitting, bathroom vanities, commercial joinery, custom furniture, home office joinery, laundry cabinets, and staircase joinery. Every project is hand-crafted in our Newcastle workshop using Australian-sourced timber and premium hardware, and is backed by a 10-year structural warranty.
```

Placement:
- Homepage: in the first 200 words, after the H1.
- About page: as the opening paragraph.
- Contact page: in the page intro.
- Every location hub `/locations/[location]/`: in the page intro (with the location elevated to first mention).
- llms.txt: as the blockquote summary directly below the H1.

### 10.2 The "how to describe us" line (one sentence AI repeats)

```
SteepWood is the Newcastle-based custom joinery studio that designs, builds, and installs premium kitchens, wardrobes, and commercial fitouts across 16 Australian cities.
```

This appears as the **meta description on the homepage** (already part of the SEO content kit — verify it matches), in the Organization schema's `description` field, in the llms.txt summary line, and in the social profile bios (Instagram, Facebook, LinkedIn, Google Business Profile "From the business" description).

### 10.3 Answer-first opening for every section (rewrite rules)

For every H2 already specified in Sections 9.4 and 9.5 of the master doc, prepend a 40–60 word **direct answer block** before the existing copy. The existing copy then follows as supporting context.

**Example — Custom Kitchen Joinery pillar page** (master doc section 9.4.1).

Existing H2 (locked): "How much does a custom kitchen cost in Australia?"

AIO direct-answer prefix (new, 47 words):
```
A custom kitchen in Australia typically costs between AU$18,000 and AU$45,000 in 2026, with the average sitting near AU$28,500 according to hipages 2025 cost data. SteepWood's custom kitchen joinery projects across Newcastle, Sydney, and Canberra average AU$32,000 for a mid-sized renovation, inclusive of design, manufacture, and installation.
```

Existing supporting copy from the SEO content kit then continues unchanged.

This pattern repeats for every service-pillar FAQ and every location-hub FAQ. Cursor will be instructed to fetch the existing copy from Section 9, prepend the answer block, and leave the rest intact.

### 10.4 Citation-rich content blocks

On every long-form page, insert a **"Project facts"** block (or "Service facts" / "Location facts" depending on page type) just below the H1 and identity block. This is a 4–6 bullet list of citation-anchored statistics. Each statistic uses a specific number with a linked source.

**Example — Sydney location hub `/locations/sydney/`:**

```markdown
## Sydney joinery — quick facts

- Average kitchen renovation in Sydney costs AU$26,000–AU$48,000 ([Hipages 2025 cost guide](https://hipages.com.au/article/how_much_does_kitchen_cabinetry_cost)).
- Sydney has 5.4 million residents across 658 suburbs, with the highest density of custom-joinery demand in the Inner West, Eastern Suburbs, and Lower North Shore ([Australian Bureau of Statistics 2024 estimate](https://www.abs.gov.au)).
- SteepWood services Sydney from our Newcastle workshop, 2 hours and 162 km north via the M1 Pacific Motorway ([Transport for NSW](https://www.transport.nsw.gov.au)).
- 73% of Sydney homeowners surveyed plan a kitchen or storage renovation within 5 years of purchase ([HIA Renovations Roundup 2025](https://hia.com.au)).
- Our average lead time for a Sydney custom kitchen is 6–8 weeks from design sign-off to installation.
```

Every location hub gets one. Every service pillar gets one (with service-specific statistics).

### 10.5 Fan-out query coverage

AI engines break long queries into smaller sub-queries (called "fan-out") and may use different sources for each ([LLMrefs](https://llmrefs.com/generative-engine-optimization)). For every service-location combo, the FAQ section must cover **fan-out variants**.

Example fan-out set for "custom kitchen joinery sydney":
- How much does a custom kitchen cost in Sydney?
- How long does it take to install a custom kitchen in Sydney?
- What is the best timber for kitchen cabinetry in Sydney's climate?
- Do you need council approval for a kitchen renovation in Sydney?
- Is custom joinery worth it vs flat-pack kitchens in Sydney?
- Who builds custom kitchens in Sydney with a warranty?
- Can you do a kitchen renovation in a Sydney apartment without changing the layout?

The master doc's combo template (Section 9.6) gets expanded so every combo page generates a **minimum of 7 FAQs**, all with answer-first openings and the same fan-out pattern. The combo-template generator in Phase 2 task 3.7 reads from a fan-out-question JSON file (new artefact: `data/aio/fanout-questions.json`).

### 10.6 New schema layer (added alongside existing JSON-LD, not replacing it)

The master doc Section 9.7 already specifies `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Organization`, `WebSite`. Add the following alongside, never replacing:

**10.6.1 Person schema for the founder / lead craftsperson** (homepage + about page):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://steepwood.com.au/#founder",
  "name": "[Founder full name]",
  "jobTitle": "Founder and Lead Joiner",
  "worksFor": { "@id": "https://steepwood.com.au/#organization" },
  "knowsAbout": ["Custom joinery", "Cabinet making", "Commercial fitout", "Australian timber species"],
  "alumniOf": "[trade qualifications / school]",
  "image": "https://steepwood.com.au/images/founder.jpg",
  "url": "https://steepwood.com.au/about/"
}
```
Cursor cannot generate the founder's name — that's a content task for Kam. The schema is rendered when the about page has the founder data.

**10.6.2 HowTo schema** on service pillar pages where the section structure matches a stepwise process (e.g. "Our joinery process"):
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How SteepWood designs and installs a custom kitchen",
  "step": [
    { "@type": "HowToStep", "name": "Site measure and brief", "text": "[40-60 word answer]" },
    { "@type": "HowToStep", "name": "Design and 3D visualisation", "text": "..." },
    { "@type": "HowToStep", "name": "Material selection", "text": "..." },
    { "@type": "HowToStep", "name": "Workshop manufacture", "text": "..." },
    { "@type": "HowToStep", "name": "On-site installation", "text": "..." }
  ]
}
```
Step text reuses existing master-doc body copy without modification beyond the answer-first prefix.

**10.6.3 Review schema** on testimonial blocks (Phase 3):
```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "[customer full name]" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
  "reviewBody": "[verbatim testimonial text]",
  "itemReviewed": { "@id": "https://steepwood.com.au/#organization" },
  "datePublished": "YYYY-MM-DD"
}
```
Aggregated into the existing homepage `AggregateRating` (master doc Section 9.7) — do not duplicate ratings across pages.

**10.6.4 Place + GeoCoordinates** on every location hub, with the city's Wikipedia `@id`:
```json
{
  "@type": "Place",
  "@id": "https://en.wikipedia.org/wiki/Sydney",
  "name": "Sydney, New South Wales",
  "geo": { "@type": "GeoCoordinates", "latitude": -33.8688, "longitude": 151.2093 },
  "containedInPlace": { "@type": "AdministrativeArea", "name": "New South Wales, Australia" }
}
```
This anchors location pages to Wikipedia entities — the single highest-leverage signal for ChatGPT citation ([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)).

**10.6.5 SpeakableSpecification** on FAQ blocks (voice / AI assistant answers):
```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "xpath": ["//section[@id='faqs']//*[contains(@class,'answer-first')]"]
  }
}
```

### 10.7 llms.txt (new file at `public/llms.txt`)

Following the 2026 best-practice format ([Limy](https://limy.ai/blog/llms.txt-in-2026-the-full-guide)). One H1, blockquote summary, 4–7 grouped H2 sections, 20–50 curated links.

```markdown
# SteepWood

> SteepWood is the Newcastle-based custom joinery studio that designs, builds, and installs premium kitchens, wardrobes, and commercial fitouts across 16 Australian cities.

SteepWood is a Newcastle, NSW-headquartered custom joinery studio. We design, manufacture, and install ten categories of custom joinery — custom kitchen joinery, built-in wardrobes, office fitouts, shopfitting, bathroom vanities, commercial joinery, custom furniture, home office joinery, laundry cabinets, and staircase joinery — for clients in Newcastle, Sydney, Canberra, Melbourne, Brisbane, the Gold Coast, Perth, Adelaide, the Hunter Valley, the Central Coast, Wollongong, Byron Bay, Port Macquarie, Coffs Harbour, Bathurst, and Orange. Every project is hand-crafted in our Newcastle workshop and backed by a 10-year structural warranty.

## Services

- [Custom kitchen joinery](https://steepwood.com.au/custom-kitchen-joinery/): Design, manufacture, and installation of custom kitchens across Australia. Average project cost AU$28,500–AU$45,000. 6–8 week lead time.
- [Built-in wardrobes](https://steepwood.com.au/built-in-wardrobes/): Walk-in and reach-in wardrobe joinery, custom internal fitouts, mirrored or panelled fronts. Average cost AU$4,000–AU$15,000.
- [Office fitout](https://steepwood.com.au/office-fitout/): Commercial office joinery and fitout for workspaces 50–2,000 m². Average cost AU$1,000–AU$3,500 per m².
- [Shopfitting](https://steepwood.com.au/shopfitting/): Retail shopfitting and joinery for boutique, hospitality, and showroom spaces.
- [Custom bathroom vanity](https://steepwood.com.au/custom-bathroom-vanity/): Wall-hung and freestanding bathroom vanity joinery, including stone-top integration.
- [Commercial joinery](https://steepwood.com.au/commercial-joinery/): Reception desks, boardroom tables, breakout joinery, and custom commercial furniture.
- [Custom furniture](https://steepwood.com.au/custom-furniture/): Bespoke timber furniture — dining tables, sideboards, entertainment units.
- [Home office joinery](https://steepwood.com.au/home-office-joinery/): Built-in desks, shelving, and storage for residential workspaces.
- [Laundry cabinets](https://steepwood.com.au/laundry-cabinets/): Custom laundry joinery and integrated appliance cabinetry.
- [Staircase joinery](https://steepwood.com.au/staircase-joinery/): Custom timber staircases, balustrades, and handrail joinery.

## Locations

- [Newcastle (HQ)](https://steepwood.com.au/locations/newcastle/): Our workshop and head office. Direct service across Newcastle, Lake Macquarie, Maitland, and Port Stephens.
- [Sydney](https://steepwood.com.au/locations/sydney/): 162 km / 2-hour drive south. Inner West, Eastern Suburbs, Lower North Shore, Northern Beaches coverage.
- [Canberra](https://steepwood.com.au/locations/canberra/): 425 km south-west. Full ACT and Queanbeyan coverage.
- [Melbourne](https://steepwood.com.au/locations/melbourne/): Premium projects only. Includes interstate transport.
- [Central Coast](https://steepwood.com.au/locations/central-coast/), [Hunter Valley](https://steepwood.com.au/locations/hunter-valley/), [Gold Coast](https://steepwood.com.au/locations/gold-coast/), [Wollongong](https://steepwood.com.au/locations/wollongong/), [Brisbane](https://steepwood.com.au/locations/brisbane/), [Perth](https://steepwood.com.au/locations/perth/), [Byron Bay](https://steepwood.com.au/locations/byron-bay/), [Port Macquarie](https://steepwood.com.au/locations/port-macquarie/), [Coffs Harbour](https://steepwood.com.au/locations/coffs-harbour/), [Adelaide](https://steepwood.com.au/locations/adelaide/), [Bathurst](https://steepwood.com.au/locations/bathurst/), [Orange](https://steepwood.com.au/locations/orange/).

## Trust and credentials

- [About SteepWood](https://steepwood.com.au/about/): Founder background, workshop, materials, and process.
- [Portfolio](https://steepwood.com.au/portfolio/): Recent projects across kitchens, wardrobes, office fitouts, and commercial work.
- [Testimonials](https://steepwood.com.au/about/#testimonials): Verified client reviews.
- [Process](https://steepwood.com.au/about/#process): Our 5-step design, manufacture, and installation workflow.

## Contact

- [Contact SteepWood](https://steepwood.com.au/contact/): Phone, email, workshop address, hours.
- [Request a quote](https://steepwood.com.au/quote/): 3-step quote request form with photo upload.

## Optional

- [Blog](https://steepwood.com.au/blog/): Joinery insights, material guides, and project case studies.
- [Privacy policy](https://steepwood.com.au/privacy/), [Terms](https://steepwood.com.au/terms/), [Australian Consumer Law](https://steepwood.com.au/australian-consumer-law/).
```

### 10.8 llms-full.txt (optional but recommended)

A concatenated Markdown bundle of every URL referenced in llms.txt, generated automatically by a build script (`scripts/build-llms-full.mjs`) that reads each route, strips chrome (header, footer, nav), and concatenates the main content in the same order as llms.txt. Served at `https://steepwood.com.au/llms-full.txt`. Regenerated on every deploy and on every content edit via the Vercel build hook.

### 10.9 AI bot crawl access (robots.txt addendum)

The master doc's robots.txt already exists. Add explicit allow directives for AI crawlers so there is no ambiguity ([SOCi](https://www.soci.ai/blog/how-to-rank-in-chatgpt-perplexity-and-google-ai-overview/)):

```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Disallow: /

User-agent: Amazonbot
Allow: /

Sitemap: https://steepwood.com.au/sitemap.xml
```

CCBot is included because Common Crawl is the dataset most non-Google AI engines train on. Bytespider (ByteDance / TikTok) is disabled by default — flip if Kam wants TikTok presence.

### 10.10 Content freshness cadence (cron)

ChatGPT cites content from within 30 days 76.4% of the time ([ZipTie](https://ziptie.dev/blog/content-refresh-strategy-for-ai-citations/)). Add to the Phase 4 cron schedule (master doc Phase 4):

| Cadence | Action |
|---|---|
| Weekly | Re-publish the homepage with an updated "Last reviewed" date (no copy changes required if nothing has changed; the date refresh signals recency). |
| Monthly | Refresh every service pillar — verify cost figures, update one statistic per page, regenerate the `dateModified` field in the schema. |
| Quarterly | Refresh every location hub — re-verify suburbs served, drive times, recent project gallery. |
| Quarterly | Refresh llms.txt and regenerate llms-full.txt. |
| Per project | When a portfolio project is added, generate a blog post automatically from the project data (admin one-click "publish case study" button). |

Implement as a Vercel Cron entry calling `/api/cron/refresh-content` which updates `dateModified` and triggers re-deploys for any pages flagged stale. Authentication via `CRON_SECRET`.

### 10.11 Off-site authority (work outside the codebase — but tracked in repo)

The single highest-leverage AIO move for a local business is third-party platform consistency ([SOCi](https://www.soci.ai/blog/how-to-rank-in-chatgpt-perplexity-and-google-ai-overview/)). These are non-code tasks owned by Kam, tracked in `docs/AIO-OFFSITE-CHECKLIST.md`:

- **NAP audit and fix** across Google Business Profile, Apple Maps, Bing Places, Yelp, Facebook, Houzz, Hipages, ServiceSeeking, TrueLocal, Yellow Pages, Whitepages — every directory uses the exact same name, address, phone, hours, and category as on the SteepWood site. Discrepancies are the highest-priority fixes.
- **Google Business Profile optimisation** following the [Distl AU GBP 2025 guide](https://distl.com.au/insights/google-business-profile-optimisation-australia-2025/): products, services, posts weekly, Q&A seeded with the same FAQs as the site, photos updated monthly, response rate to all reviews at 100%.
- **Review velocity** target: minimum 4.6 star average across GBP, Houzz, Facebook. 8–12 new reviews per quarter. Use an automated post-project review request via the admin panel.
- **Wikipedia entity** for SteepWood once the business meets notability requirements (press mentions, awards). This is the highest single AIO unlock for ChatGPT visibility but requires patience.
- **Reddit / Houzz / Whirlpool presence** with the founder profile, contributing genuinely helpful answers in r/AusRenovation, r/sydney, Houzz Discussions, Whirlpool home-improvement threads. Never astroturf. Real participation only ([Position Digital](https://www.position.digital/blog/answer-engine-optimization-best-practices/)).
- **PR placements** in Vogue Living, Belle, Houses, Australian Design Review, Domain, realestate.com.au — these are domains AI engines already cite for Australian design content.
- **YouTube channel** with project walk-throughs, captions and timestamps included, so AI engines can extract the transcripts.

These items are off-code but are gated by the launch readiness checklist in Phase 4 (master doc Section 8).

### 10.12 AIO monitoring dashboard (Phase 4)

Add to the admin panel a new "AI Visibility" tab. It tracks:

1. **Bot hit log** — middleware logs every request from GPTBot, PerplexityBot, ClaudeBot, Google-Extended, OAI-SearchBot. Tabulates by page and by week. Indicates which content is actually being indexed.
2. **Manual citation tracker** — a weekly cron run that asks ChatGPT, Perplexity, Claude, and Gemini ten benchmark queries (e.g. "best custom joinery in Newcastle", "Sydney custom kitchen builder with warranty") and logs whether SteepWood is cited, how it's described, and which competitors appear. Implemented via Perplexity API + OpenAI API + Anthropic API.
3. **Schema health** — daily Schema.org validator run against 12 sample URLs; flags any drift.
4. **NAP consistency monitor** — weekly check against major directories via the Google Places API.
5. **Freshness dashboard** — list of pages by `dateModified`, flagging anything older than the cadence in 10.10.

---

## 4. Cursor execution prompt — pasteable, SEO-locked, AIO-additive

Paste this into Cursor Agent mode on the SteepWood project. Run AFTER the SEO master doc has been integrated and BEFORE Phase 2 page content is finalised (so the AIO additions land in the same render as the original SEO content).

```
You are adding the AIO (Answer Engine Optimisation + Generative Engine Optimisation) layer to the SteepWood Next.js project. Read the entire file /home/user/workspace/STEEPWOOD-AIO-LAYER.md before doing anything.

═══════════════════════════════════════════════════════════════
THE LOCK
═══════════════════════════════════════════════════════════════

The existing SEO foundation defined in STEEPWOOD-CURSOR-MASTER-BUILD.md is FROZEN. You will:

- Not delete any title, meta, canonical, hreflang, OG/Twitter tag, URL, JSON-LD block, H1, H2, H3, body paragraph, FAQ question, FAQ answer, alt text, or aria-label.
- Not change Tailwind theme tokens, brand fonts, layout structure, or section order on any page.
- Only ADD new content (identity blocks, answer-first prefixes, citation-rich fact blocks, fan-out FAQs, new schema blocks alongside existing ones) or CREATE new files (llms.txt, llms-full.txt generator, robots.txt addendum, AIO monitoring routes).
- If a master-doc section currently exists, you may PREPEND a 40-60 word answer-first block before the existing copy. You may not rewrite the existing copy.

Use Australian English. No emojis. Cite sources inline using the source name as anchor text.

═══════════════════════════════════════════════════════════════
VERIFICATION GATES (run after every task)
═══════════════════════════════════════════════════════════════

Before committing any task:

1. SEO snapshot diff (use the existing scripts/snapshot-seo.mjs from the UX upgrade pack, or create one if missing): titles + metas + canonicals + existing JSON-LD blocks must be byte-identical across the 12-URL sample.
2. Heading map diff: existing H1/H2/H3 outline must be byte-identical (new content prepends WITHIN sections, never adds a new heading at the same level).
3. New JSON-LD blocks must validate at https://validator.schema.org/ with zero errors.
4. Lighthouse mobile budgets (Perf >= 90, A11y = 100, BP >= 95, SEO = 100, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1) must hold on home + 1 service + 1 location + 1 combo.
5. pnpm build, pnpm typecheck, pnpm lint all pass.
6. AU English check: no "color", "center", "organize", "kilometers", "specialize", "inquiry" anywhere in new copy.

Commit format: aio: <task-id> <message>. Pause for "next" between every task.

═══════════════════════════════════════════════════════════════
EXECUTION PLAN
═══════════════════════════════════════════════════════════════

Branch: aio-layer (do not merge to main until I approve).

TASK 0 — Setup
0.1 Read STEEPWOOD-AIO-LAYER.md end to end. Acknowledge in your reply which sections you read.
0.2 Confirm the SEO snapshot scripts from the UX upgrade pack exist. If not, create scripts/snapshot-seo.mjs that captures: <title>, <meta>, <link rel="canonical|alternate">, every <script type="application/ld+json"> block, and every H1/H2/H3 text on the 12-URL sample. Write snapshot to snapshots/seo-pre-aio.json.
0.3 Commit: aio: 0 setup branch and pre-aio snapshot.

TASK 1 — Identity block + "how to describe us"
1.1 Create components/aio/IdentityBlock.tsx that renders the verbatim identity paragraph from Section 10.1 of the AIO doc. Accept an optional `locationFirst` prop that elevates a specific city to the first mention.
1.2 Insert <IdentityBlock /> on: homepage (after H1, within first 200 words), about page (as the opening paragraph), contact page (in the intro), and every /locations/[location]/page.tsx with locationFirst={location}.
1.3 Update the homepage <Organization> JSON-LD block's `description` field to the exact "how to describe us" sentence from Section 10.2. Do not touch any other field.
1.4 Run gates 1, 2, 3, 5, 6.
1.5 Commit: aio: 1 add identity block and canonical description sentence.

TASK 2 — Answer-first prefixes on every section
2.1 Create a content artefact at data/aio/answer-first-prefixes.json. Keys are the section IDs from Section 9 of the master doc (e.g. "kitchens.cost", "wardrobes.materials", "sydney.suburbs"). Values are 40-60 word direct-answer paragraphs in AU English.
2.2 For service pillars: write answer-first prefixes for every H2 in Section 9.4 (all 10 services). Cost-related answers MUST include a specific AU$ figure and a linked citation.
2.3 For location hubs: write answer-first prefixes for every H2 in Section 9.5 (all 16 locations).
2.4 Modify the page templates in app/[service]/page.tsx and app/locations/[location]/page.tsx so that before each existing H2's body content, the corresponding answer-first prefix from the JSON renders as a <p class="answer-first"> paragraph. The existing copy follows underneath unchanged.
2.5 Add CSS targeting .answer-first that bolds the first sentence and adds a left border accent in brand colour, so it visually reads as a summary.
2.6 Run gates 1, 2, 3, 4, 5, 6. Snapshot diff must show new <p class="answer-first"> elements but NO changes to existing <h2> or surrounding body.
2.7 Commit: aio: 2 answer-first prefixes on service and location pages.

TASK 3 — Citation-rich fact blocks
3.1 Create data/aio/facts.json keyed by page identifier. Each entry is an array of 4-6 fact strings, each containing a specific number and a markdown link to an authoritative source (Hipages, ABS, HIA, BuildMat, government data, manufacturer specs).
3.2 Create components/aio/FactsBlock.tsx that renders a <section aria-labelledby="facts-h2"> with an H2 of "[Service|Location|Project] facts — quick reference" and an unordered list. The H2 level is locked to H2 — do not use H3 anywhere else for facts.
3.3 Insert <FactsBlock /> just below the H1 + identity block on every service pillar, location hub, and combo page.
3.4 IMPORTANT: This adds a new H2 to each page. Verify with the SEO snapshot that the heading map gains the "facts" H2 in a predictable position on every page (between the H1's hero and the existing first H2). Update snapshot-seo.mjs's "expected new headings" allowlist accordingly so the diff doesn't fail on this single intentional structural addition.
3.5 Run gates 1, 2, 3, 4, 5, 6.
3.6 Commit: aio: 3 citation-rich facts block on long-form pages.

TASK 4 — Expanded fan-out FAQ
4.1 Create data/aio/fanout-questions.json. For every service, list the 7 canonical fan-out questions (use the Sydney kitchen example in Section 10.5 of the AIO doc as the template; generalise to every service).
4.2 For every combo page (Section 9.6 of the master doc), update the combo generator so it emits 7+ FAQs (current spec is 5+). Pull questions from fanout-questions.json, generate answers using the existing combo template logic — but every answer must lead with a direct answer in 40-60 words.
4.3 Update the FAQPage JSON-LD on combo pages to include all 7+ Q&A pairs.
4.4 Run gates 1, 2, 3 (especially 3 — confirm FAQPage schema validates), 4, 5, 6.
4.5 Commit: aio: 4 fan-out FAQ on combo pages.

TASK 5 — New schema layer (Person, HowTo, Review, Place, Speakable)
5.1 Create lib/aio/schema.ts with reusable JSON-LD generators for Person, HowTo, Review, Place, SpeakableSpecification (templates from Section 10.6 of the AIO doc).
5.2 Render Person schema on home and about pages, gated behind whether founder data exists in the CMS. Until Kam provides founder content, render a placeholder schema with empty fields but DO NOT render an invalid block — fall back to omitting the schema entirely.
5.3 Render HowTo schema on the 4 service pillars that have a clear process narrative: kitchens, wardrobes, office fitout, shopfitting. Step text reuses existing master-doc section copy with the answer-first prefix.
5.4 Render Place schema with Wikipedia @id on every location hub.
5.5 Render SpeakableSpecification on every page that has a FAQ section.
5.6 Review schema is deferred to Phase 3 (when testimonial data is in the database).
5.7 Run gates. Pay special attention to gate 3 — every new schema block must validate.
5.8 Commit: aio: 5 person howto place speakable schema layer.

TASK 6 — llms.txt and llms-full.txt
6.1 Create public/llms.txt with the verbatim content from Section 10.7 of the AIO doc. Replace any placeholder URLs with real URLs after confirming the routing.
6.2 Create scripts/build-llms-full.mjs that reads each route listed in llms.txt, fetches the rendered HTML (in dev: localhost; in build: from .next/server), extracts the main content (everything inside <main>, stripping header/footer/nav), converts to Markdown via `node-html-markdown`, and concatenates in the order of llms.txt. Output to public/llms-full.txt.
6.3 Add a Vercel build step in next.config.ts or via package.json's "build" script that runs build-llms-full.mjs after `next build` succeeds.
6.4 Verify both files load at /llms.txt and /llms-full.txt with content-type text/plain or text/markdown; no auth wall; no robots block.
6.5 Run gates 1, 2, 4, 5, 6.
6.6 Commit: aio: 6 llms.txt and llms-full.txt with build pipeline.

TASK 7 — robots.txt AI bot allowlist
7.1 Replace the contents of app/robots.ts (or public/robots.txt depending on the existing implementation) with the directives in Section 10.9 of the AIO doc.
7.2 Verify in dev: curl http://localhost:3000/robots.txt. Confirm GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Google-Extended are all explicitly allowed; Bytespider is disallowed.
7.3 Run gates 1, 2, 4, 5, 6.
7.4 Commit: aio: 7 robots.txt AI bot allowlist.

TASK 8 — Content freshness cron and dateModified plumbing
8.1 Add to vercel.json a new cron entry: { "path": "/api/cron/refresh-content", "schedule": "0 18 * * 1" } (Mondays at 18:00 UTC; adjust if Kam wants a different time).
8.2 Implement /api/cron/refresh-content/route.ts. Authenticated via CRON_SECRET. The handler updates the dateModified field on the homepage and any page whose `lastReviewed` is older than the cadence in Section 10.10. Triggers a revalidate of those routes.
8.3 Add a dateModified field to the schema generator for every page type, computed from either the CMS data (preferred) or the file's git-last-modified timestamp (fallback).
8.4 Run gates 1, 2, 3, 4, 5, 6.
8.5 Commit: aio: 8 content freshness cron and dateModified plumbing.

TASK 9 — AIO admin tab (deferred details — scaffold only in this branch)
9.1 In app/admin/, scaffold a new route /admin/ai-visibility/ that renders a placeholder dashboard with the four panels named in Section 10.12: bot hit log, citation tracker, schema health, NAP consistency, freshness dashboard.
9.2 Create middleware.ts (or extend it) to log requests where the User-Agent contains GPTBot|PerplexityBot|ClaudeBot|Google-Extended|OAI-SearchBot. Store in a Supabase table `ai_bot_visits` with columns: id, user_agent, path, ip_hash, timestamp.
9.3 The dashboard reads from ai_bot_visits and groups by week + path.
9.4 The other three panels (citation tracker, NAP monitor, freshness) are scaffolded but show "Coming in Phase 4" placeholders. Full implementation happens in Phase 4.
9.5 Run gates 1, 2, 4, 5, 6.
9.6 Commit: aio: 9 ai visibility admin tab scaffold.

TASK 10 — Reconciliation PR
10.1 Run scripts/snapshot-seo.mjs to produce snapshots/seo-post-aio.json.
10.2 Diff against snapshots/seo-pre-aio.json. The diff must show ONLY: (a) new <script type="application/ld+json"> blocks for Person/HowTo/Place/Speakable, (b) one new H2 "Facts — quick reference" on long-form pages, (c) new <p class="answer-first"> elements, (d) new <IdentityBlock> paragraphs. Nothing else changes.
10.3 Run Lighthouse on the same 5 URLs from the UX upgrade pack's Task 0.5. Save to snapshots/lighthouse-post-aio/. Performance must be within -2 points per page; Accessibility = 100; SEO = 100.
10.4 Generate docs/AIO-LAYER-CHANGELOG.md listing every file changed, every component added, the new schema blocks, the new statistics added, and the Lighthouse table.
10.5 Open a PR titled "AIO layer — answer engine and generative engine optimisation". Body includes the diff summary, the Lighthouse table, and the statement: "SEO foundation is byte-identical. Only additive AIO content has been introduced. All gates passed."
10.6 Wait for me to review.

═══════════════════════════════════════════════════════════════
START NOW
═══════════════════════════════════════════════════════════════

Begin with Task 0. Confirm you have read Sections 10.1 through 10.12 of the AIO doc and pause for my "next" before starting Task 1.
```

---

## 5. Acceptance criteria for the AIO layer

The AIO layer is considered complete when:

- [ ] The 12-URL SEO snapshot diff shows only the additive changes listed in Task 10.2. Zero changes to existing titles, metas, canonicals, hreflangs, OG tags, original JSON-LD blocks, original headings, or original body copy.
- [ ] llms.txt is live at https://steepwood.com.au/llms.txt — public, no auth, content-type text/plain or text/markdown, under 100 KB.
- [ ] llms-full.txt is live at https://steepwood.com.au/llms-full.txt — auto-regenerated on every deploy.
- [ ] Identity block (Section 10.1) renders verbatim on home, about, contact, and every location hub.
- [ ] Every service pillar and location hub has an answer-first prefix on every H2.
- [ ] Every service pillar and location hub has a Facts block with at least 4 statistics, each with a linked source.
- [ ] Every combo page has at least 7 fan-out FAQs.
- [ ] HowTo schema renders on kitchens, wardrobes, office fitout, shopfitting pillars.
- [ ] Place schema with Wikipedia @id renders on every location hub.
- [ ] SpeakableSpecification renders on every page with a FAQ.
- [ ] Robots.txt explicitly allows GPTBot, PerplexityBot, ClaudeBot, OAI-SearchBot, Google-Extended.
- [ ] Vercel Cron entry for /api/cron/refresh-content is active and shows a future next-run timestamp.
- [ ] Admin /admin/ai-visibility/ tab is reachable behind auth, bot-hit log populates within 7 days of launch.
- [ ] AIO-OFFSITE-CHECKLIST.md exists in /docs and is reviewed weekly by Kam (NAP audit, GBP, reviews, PR, Reddit/Houzz).
- [ ] Lighthouse mobile across the 5 sample URLs holds: Perf >= 90, A11y = 100, BP >= 95, SEO = 100, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- [ ] Every new JSON-LD block validates at https://validator.schema.org/ with zero errors.
- [ ] AU English audit script reports zero American spellings in new content.
- [ ] Branch merged with tag `aio-v1`.

---

## 6. Why this combination wins

| Concern | How SEO addresses it | How AIO addresses it | Combined effect |
|---|---|---|---|
| "Will Google rank our pages?" | Master-doc Sections 1-9: keyword research, semantic URLs, comprehensive content, schema, internal linking, technical perf. | Section 10: answer-first writing, statistic density, expanded fan-out FAQs. | Higher organic rankings AND more featured-snippet / AI Overview citations. |
| "Will ChatGPT mention us?" | Master doc gets us into the candidate pool via strong on-page signals and authoritative content. | Identity block repetition, llms.txt, Person/Organization schema, Wikipedia entity work, Bing indexing (Phase 4). | Citation in ChatGPT answers when users ask "best joinery in Sydney" or "custom kitchen builder Newcastle". |
| "Will Perplexity cite us?" | Master doc's link structure + content depth gives Perplexity's web search step something to grab. | Reddit/Houzz/Whirlpool participation, plus the answer-extractable Facts blocks. | Citation in Perplexity answers with direct quotes from our Facts blocks. |
| "Will Google AI Overviews include us?" | The strongest path — Google AI Overviews cite a top-10 organic result 93.67% of the time. The master doc is built to rank in the top 10. | Schema layer (Person, HowTo, Place, Speakable) gives Google extra extraction targets; freshness cadence keeps `dateModified` recent. | Inclusion in AI Overviews for high-intent commercial queries. |
| "Will voice / Siri / Alexa answer with us?" | FAQPage schema from the master doc + Apple Maps presence. | SpeakableSpecification + canonical "how to describe us" sentence. | The voice assistant has a single, repeated sentence to read aloud. |

---

## 7. What to do today

Three concrete next actions, in priority order:

1. **Append Section 10 (the content above between the horizontal rules in Section 3 of this document) to the master build doc.** This is a literal `cat STEEPWOOD-AIO-LAYER.md >> STEEPWOOD-CURSOR-MASTER-BUILD.md` operation, or just paste Section 10.1–10.12 in at the end.
2. **Open Cursor in the SteepWood project and paste the prompt from Section 4 above.** Let it execute Task 0 (the safety snapshot) before anything else.
3. **Open `docs/AIO-OFFSITE-CHECKLIST.md` and start the NAP audit.** This is the single highest-leverage off-code AIO move and you don't need a developer to do it.
