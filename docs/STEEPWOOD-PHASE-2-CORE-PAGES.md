# SteepWood — Cursor Build Prompt: PHASE 2 of 4
## CORE PAGES AND SEO ARCHITECTURE

> **How to use this file with Cursor:**
> 1. Open the SteepWood project where Phase 1 finished (git tag `phase-1-complete` should exist).
> 2. Open Cursor Chat (Cmd/Ctrl+L), select **Agent** mode.
> 3. Paste the line below into the chat first:
>    `Read this entire file end-to-end before doing anything. Then execute Phase 2 task-by-task in order. The SEO content kit at the bottom of this file is the canonical source for every word of page copy, every meta description, every title, every H1, every FAQ, and every JSON-LD schema. Do not invent copy. After each task, run verification commands, summarise, and wait for me to say "next". Use Australian English throughout.`
> 4. Then attach or paste this file. Cursor will work through tasks sequentially.
> 5. When Phase 2 is complete and you've tagged `phase-2-complete`, open the Phase 3 prompt file.

---

## BUILD-FIRST WORKFLOW

**Phase 2 = code only.** GSC submission, Rich Results live tests on production, and Screaming Frog crawls are **deferred** to **`docs/STEEPWOOD-MANUAL-OPS.md`** (after Phase 4).

Phase 2 is **complete** when code acceptance criteria pass and `pnpm build` succeeds.

---

## PHASE 2 SCOPE (what this phase ships)

By the end of Phase 2 you will have:
- Homepage with full conversion architecture (hero, USPs, services preview, locations grid, social proof, CTA, FAQ).
- About page with the SteepWood story, credentials, team, and process.
- Contact page with NAP, hours, form, map, and structured data.
- Dynamic route foundation for `/[service]/[location]/` (App Router catch-alls with `generateStaticParams`).
- Service Pillar template `/[service]/` rendering all 10 services from the SEO Content Kit.
- Location Hub template `/locations/[location]/` rendering all 16 locations from the SEO Content Kit.
- Service+Location combo template `/[service]/[location]/` rendering all 160 combos from the SEO Content Kit template.
- Dynamic `sitemap.xml` listing every page, with `lastmod`, priority, and changefreq.
- `robots.txt` with crawl directives and sitemap reference.
- "Thin content audit" CLI script to flag any page under 500 words.
- Canonical URLs, `hreflang="en-AU"`, dynamic Open Graph image generation per page.
- Legal pages (Privacy, Terms, Australian Consumer Law).

**Total pages by end of Phase 2:** 3 (home/about/contact) + 10 (services) + 16 (locations) + 160 (combos) + 3 (legal) = **192 indexable pages.**

**Phase 2 milestone tag:** `phase-2-complete`

---

## CRITICAL CONSTRAINTS (applies to every Phase 2 task)

1. **The SEO Content Kit (Section 9 at the bottom of this file) is the locked source of truth.** Every title, meta description, H1, intro paragraph, FAQ, body section heading, and schema JSON-LD object comes from there. If something is missing, ask before inventing.
2. **Title formula:** `Custom [Service] [Location] | SteepWood Joinery` — ≤ 60 characters where possible.
3. **Meta formula:** 130–160 characters, location signal in first 5 words, includes one credibility marker and one CTA.
4. **Schema on every page:** Service pages need `Service` schema; location hubs need `LocalBusiness` + `parentOrganization` linking back to the Newcastle HQ entity; combos use both. Every page with FAQs needs `FAQPage`. Every page needs `BreadcrumbList`. Reuse the JSON-LD library in Section 9.7.
5. **Australian English everywhere.** No emojis, no exclamation points in body copy.
6. **Accessibility:** WCAG 2.2 AA. Headings hierarchical (one H1, then H2 → H3, no skipping). Every image has descriptive alt text (no "image of"). Forms have visible labels.
7. **Performance:** Every page must hit LCP ≤ 2.5s and CLS ≤ 0.1 on mobile 4G simulation. Use `next/image` with priority on the hero only. No client components above the fold unless necessary.
8. **Commit format:** `phase-2: <task-id> <short description>`.
9. **Do not start any Phase 2 task until Phase 1's `phase-1-complete` tag exists in git.**

---

## EMBEDDED CONTEXT — PROJECT, DESIGN, ARCHITECTURE (READ FIRST)

These locked specs from the master plan apply to every page you build.

# SteepWood — Cursor IDE Master Build Document

**Project:** Steepwood — Premium Custom Joinery, Newcastle NSW
**Domain:** steepwood.com.au
**Stack:** Next.js 15 App Router · React 19 · TypeScript 5.8 · Tailwind CSS v4 · Supabase Postgres + Storage + Auth · Prisma 6 · Vercel · GitHub · Cursor IDE
**Document version:** 1.0 — June 2026
**Locale:** Australian English throughout

> Drop this entire file into your Cursor project root as `BUILD.md`. Each task contains a complete, atomic Cursor Composer prompt ready to paste — work top-to-bottom and tick off each Definition of Done before moving on.

---

## How to use this document

1. Complete **Section 7 — Environment Setup Checklist** before touching any code.
2. Create the file `.cursor/rules/steepwood.mdc` from **Section 6** before starting Phase 1 — every Cursor Composer prompt assumes those rules are active.
3. Work through Phases 1 → 4 in order. Each task is atomic — do not combine prompts.
4. Run **`docs/STEEPWOOD-MANUAL-OPS.md`** after Phase 4 code is complete, before going live at steepwood.com.au.

---

# SECTION 1 — STEEPWOOD CURSOR DEVELOPMENT MASTER PLAN

## 1.1 Project Overview

Steepwood is launching as Australia's most credible premium custom joinery brand — based in Newcastle NSW, serving residential and commercial clients across 16 Australian cities. The business already has a Supabase Postgres database (managed via Prisma ORM) with eleven tables populated: `services`, `locations`, `service_locations` (a 160-row matrix of city × service combinations), `blog_posts`, `portfolio_projects`, `testimonials`, `faqs`, `quote_requests`, `contact_submissions`, `admin_users`, and `sitemap_overrides`. The website's job is to convert that database into a 200+ page SEO machine that ranks for "[service] [city]" combinations across NSW and capital cities — a content footprint that no existing competitor occupies ([competitor dossier](#12-competitor-intelligence)).

The build prioritises three outcomes in this order: organic search dominance (160 unique service+location pages, complete schema markup, sub-1.5s mobile LCP), conversion (a 3-step multi-step quote form with Supabase file upload, persistent mobile sticky CTAs, embedded trust signals), and design distinction (the "Craft & Contrast" near-black workshop palette with Fraunces display typography — chosen specifically to differentiate from the white-template aesthetic that every Australian competitor currently uses). Deploy to Vercel with Sydney region (`syd1`) function placement; serve all images through Supabase Storage's image transformation pipeline with a custom `next/image` loader; manage CMS content through a `/admin` route group protected by Supabase Auth and Row-Level Security policies on the admin_users table.

## 1.2 Competitor Intelligence

### Comparison snapshot

| Criterion | Kinsman Kitchens | Polytec | Freedom Kitchens | Loughlin Furniture |
|---|---|---|---|---|
| **Hero headline** | "Beautiful spaces start with great designs" | "Designed to Be Noticed. Because Details Matter." | "THE BEST OF THE BLOCK 2025" | "Australian Made, Handcrafted Furniture" |
| **Primary CTA** | Explore Kitchen Ranges | Find out more | Book a Design Appointment | Check out our latest collection |
| **City × service SEO pages** | None (showroom locators only) | None | None | None |
| **Service page word count** | ~150 words (thin) | Very thin (JS-rendered) | 200–300 words | ~100 words (minimal) |
| **Quote form type** | Appointment booking widget (3-mode) | None (find-a-retailer only) | Appointment booking + phone | 5-field generic contact form |
| **Multi-step lead form** | Yes (appointment scheduler) | No | Yes (appointment scheduler) | No |
| **File upload** | No | N/A | No | No |
| **Years in business** | 20+ | 30+ | 30+ | ~20 |
| **TV / media partnerships** | The Block (2018–2024) | Design Show | The Block (2025) | None |
| **Mobile LCP** | 2.7 s (borderline) | 0.7 s (excellent) | 2.3 s (borderline) | ~2.5–3.5 s (est.) |
| **Mobile CWV** | Pass | Pass | Borderline | Likely fails |
| **Desktop CLS** | 0.03 (good) | 0.18 (fails) | 0.09 (borderline) | Not measured |
| **Mobile experience rating** | 7/10 | 8/10 | 6/10 | 5/10 |
| **Dominant palette** | White + charcoal #2B2B2B | Black/charcoal #1A1A1A + white | White + black, all-caps bold | Warm white + timber tones |
| **Largest geographic gap** | All showrooms inside The Good Guys (mass-retail context caps premium positioning) | No consumer quote funnel — only "find a retailer" | Hard 100 km service radius from each showroom excludes regional NSW | Single Central Coast workshop; near-zero digital discoverability |
| **Biggest weakness** | Premium positioning capped by mass-retail showroom context | No consumer conversion path | 100 km service radius locks out regional NSW | No SEO architecture for location or service discovery |

### Five Strategic Opportunities (from [Competitor Analysis Dossier](research/01_competitors.md))

**1. Own the 160-page city × service SEO matrix.** None of the four analysed competitors operates dedicated `/[service]/[city]/` SEO content pages. Kinsman's `/showrooms-[city]/` URLs are showroom locators, not keyword-targeted content pages. Freedom's showroom pages list services but carry no city-specific joinery copy. Steepwood's planned architecture — 16 cities × 10 services = 160 unique pages — is a true first-mover play. Each page should be 600–900 words with city-specific copy (suburb references, local council context, completed-project mentions), `LocalBusiness` + `Service` + `FAQPage` schema, and an inline quote form. This compounds organic value over 12–24 months in a way no competitor's flat showroom structure can match.

**2. Occupy the premium positioning gap that mass-market chains cannot credibly claim.** Kinsman and Freedom both anchor in The Block TV show plus mid-market showroom networks (Kinsman inside The Good Guys electronics stores; Freedom in homemaker centres). Neither credibly occupies the genuine premium/bespoke segment. Steepwood should differentiate through transparent craftsmanship content (workshop photography, timber species guides, named maker profiles), a sophisticated restricted palette ("Craft & Contrast" — see Section 1.4), and editorial-grade typography (Fraunces). Positioning lands between Loughlin's artisan authenticity and a full-service commercial capability Loughlin cannot match.

**3. Build the best consumer quote funnel in the category.** Polytec has no consumer quote form. Loughlin uses a 5-field generic contact form. Kinsman and Freedom both gate conversion behind appointment booking — a high-commitment first step that drops most early-funnel users. Steepwood's 3-step quote wizard (project type → details + file upload → contact) lowers the first step to a single button tap, then escalates commitment progressively. Multi-step forms with progress indicators convert at 3–14× the rate of single-step forms ([Formstack/Responsify data](https://www.responsify.com/multi-step-form-conversion-rate-optimization)).

**4. Deploy commercial joinery as a true differentiator.** Kinsman and Freedom are exclusively residential. Polytec sells to commercial fitout contractors but does not quote or install. Loughlin mentions "Made to Measure" for commercial projects but ships no dedicated commercial pages. Steepwood's commercial joinery + office fitout + shopfitting services target a high-intent, low-competition segment with city × commercial-service pages (e.g. `/commercial-joinery/sydney/`, `/office-fitout/melbourne/`). None of the four analysed competitors actively captures these queries.

**5. Win on technical performance and inline trust signals.** Freedom's mobile LCP is 2.3 s (borderline). Kinsman's is 2.7 s (borderline-poor). Loughlin is estimated 2.5–3.5 s. Polytec is the outlier at 0.7 s mobile but fails desktop CWV (CLS 0.18). Steepwood targets sub-1.5 s mobile LCP via Next.js 15 RSC, `next/image` with Supabase loader, AVIF/WebP delivery, and Vercel `syd1` region placement. Trust signals (Google ★★★★★ count, ABN, HIA/MBA logos, year-count) are embedded inline on every service and location page — not behind a `/reviews/` click — capturing the 16.4% conversion lift documented for proximity-trust placement.

## 1.3 SEO and Keyword Strategy

### Top 20 target keywords

| # | Keyword | Intent | Target page | Est. AU monthly volume | Difficulty |
|---|---|---|---|---|---|
| 1 | custom joinery Newcastle | Local commercial | `/custom-joinery/newcastle/` | 100–200 | Low–Medium |
| 2 | cabinet maker Newcastle | Local commercial | `/custom-kitchen-joinery/newcastle/` | 100–200 | Low–Medium |
| 3 | custom joinery Sydney | Local commercial | `/custom-joinery/sydney/` | 200–400 | Medium–High |
| 4 | cabinet maker Sydney | Local commercial | `/custom-kitchen-joinery/sydney/` | 500–900 | High |
| 5 | custom kitchen joinery Newcastle | Local commercial | `/custom-kitchen-joinery/newcastle/` | 50–150 | Low |
| 6 | built in wardrobes Newcastle | Local commercial | `/built-in-wardrobes-walk-in-robes/newcastle/` | 100–200 | Low |
| 7 | custom joinery Melbourne | Local commercial | `/custom-joinery/melbourne/` | 150–300 | Medium–High |
| 8 | joinery Newcastle | Local commercial | `/locations/newcastle/` | 100–300 | Low |
| 9 | cabinet maker Brisbane | Local commercial | `/custom-kitchen-joinery/brisbane/` | 300–500 | Medium |
| 10 | kitchen joinery Sydney | Local commercial | `/custom-kitchen-joinery/sydney/` | 100–200 | Medium |
| 11 | joinery near me | Local transactional | GBP Map Pack + nearest location hub | 300–600 | N/A (GBP) |
| 12 | custom joinery Central Coast | Local commercial | `/custom-joinery/central-coast/` | 50–120 | Low |
| 13 | bespoke furniture Newcastle | Local commercial | `/custom-bespoke-furniture/newcastle/` | 30–80 | Low |
| 14 | shopfitter Newcastle | B2B commercial | `/shopfitting-retail-joinery/newcastle/` | 30–80 | Low |
| 15 | office fitout Newcastle | B2B commercial | `/office-fitout/newcastle/` | 50–100 | Low |
| 16 | bathroom vanity joinery Sydney | Local commercial | `/bathroom-vanity-joinery/sydney/` | 50–100 | Medium |
| 17 | staircase joinery Sydney | Local commercial | `/staircase-joinery/sydney/` | 30–80 | Low–Medium |
| 18 | how much does custom joinery cost | Informational | `/blog/custom-joinery-cost-guide-australia/` | 100–200 | Medium |
| 19 | cabinet maker Gold Coast | Local commercial | `/custom-kitchen-joinery/gold-coast/` | 100–200 | Medium |
| 20 | home office joinery Melbourne | Local commercial | `/home-office-joinery/melbourne/` | 30–70 | Low |

### URL structure (decided)

```
steepwood.com.au/                                  Homepage
steepwood.com.au/about/                            About
steepwood.com.au/contact/                          Contact
steepwood.com.au/quote/                            Multi-step quote form
steepwood.com.au/portfolio/                        Portfolio index
steepwood.com.au/portfolio/{slug}/                 Project case study
steepwood.com.au/blog/                             Blog index
steepwood.com.au/blog/{slug}/                      Blog post
steepwood.com.au/testimonials/                     Testimonials
steepwood.com.au/faqs/                             FAQs

# Service pillars — 10 pages (top-level, keyword-rich)
steepwood.com.au/{service-slug}/

# Location hubs — 16 pages
steepwood.com.au/locations/{location-slug}/

# Service + location — 160 pages (flat depth-2, keyword closest to root)
steepwood.com.au/{service-slug}/{location-slug}/
```

**Decision recorded:** Use the flat `/[service]/[location]/` pattern (e.g. `/custom-joinery/sydney/`) rather than `/services/[service]/[location]/`. A non-keyword `/services/` segment dilutes the URL signal; flat depth-2 puts the highest-value keyword at depth-1, closest to the domain ([Next.js SEO guide](https://nextjs.org/learn/seo/url-structure), [Strapi SEO](https://strapi.io/blog/nextjs-seo)).

### On-page SEO formula

**Service + Location page** (the 160-page template):

| Element | Pattern | Example (Custom Kitchen Joinery / Newcastle) |
|---|---|---|
| H1 | Custom {Service} in {Location} | Custom Kitchen Joinery in Newcastle |
| H2 intro | {Location}'s Premium {Service} Specialists | Newcastle's Premium Kitchen Joinery Specialists |
| Meta title (≤60) | Custom {Service} {Location} \| Steepwood | Custom Kitchen Joinery Newcastle \| Steepwood |
| Meta description (≤155) | Premium custom {service} in {location} crafted by Steepwood. Bespoke designs, expert installation. Get a free measure and quote today. | Premium custom kitchen joinery in Newcastle crafted by Steepwood. Bespoke designs, expert installation. Get a free measure and quote today. |
| URL slug | /{service-slug}/{location-slug}/ | /custom-kitchen-joinery/newcastle/ |
| Hero image alt | Custom kitchen joinery installed in {location} home by Steepwood | Custom kitchen joinery installed in Newcastle home by Steepwood |

**Service pillar page** (10 pages):

| Element | Pattern |
|---|---|
| H1 | Custom {Service} — Bespoke Craftsmanship |
| Meta title (≤60) | Custom {Service} \| Steepwood Joinery |
| Meta description (≤155) | Steepwood designs and installs custom {service} across NSW and Australia. Premium materials, expert joiners. Get a free quote. |

**Location hub page** (16 pages):

| Element | Pattern |
|---|---|
| H1 | Custom Joinery in {Location} |
| H2 | Steepwood's {Location} Joinery Services |
| Meta title (≤60) | Joinery {Location} \| Steepwood Custom Joinery |
| Meta description (≤155) | Premium custom joinery in {Location} from Steepwood. Kitchens, wardrobes, offices and more. Serving {Location} and surrounds. |

**Homepage:**

| Element | Value |
|---|---|
| H1 | Newcastle's Premium Custom Joinery Specialists |
| Meta title | Steepwood — Custom Joinery Newcastle & Australia |
| Meta description | Steepwood crafts bespoke joinery across Newcastle, Sydney, Melbourne and 16 Australian cities. Kitchens, wardrobes, commercial fitouts. Get a free quote. |

### Schema markup priority

| Priority | Type | Where rendered | Next.js 15 note |
|---|---|---|---|
| 1 | `LocalBusiness` (subtype `HomeAndConstructionBusiness`) | Root `app/layout.tsx` | Static `<script type="application/ld+json">` via `dangerouslySetInnerHTML`. Anchor `@id` to `https://steepwood.com.au#localbusiness` for cross-page reference. Include `areaServed` array (all 16 cities), `taxID` (ABN), `geo`, `openingHoursSpecification`. |
| 2 | `Organisation` + `WebSite` | Root layout, co-located in `@graph` with LocalBusiness | `WebSite` carries `potentialAction` → `SearchAction` for sitelinks search. Static. |
| 3 | `BreadcrumbList` | Each `page.tsx` (non-home) | Generated from route params at ISR build time; visible UI breadcrumb mirrors the JSON-LD. |
| 4 | `Service` | `/[service]/page.tsx` and `/[service]/[location]/page.tsx` | Populated from Prisma. Reference LocalBusiness via `"provider": { "@id": "https://steepwood.com.au#localbusiness" }`. |
| 5 | `AggregateRating` + `Review` | Nested in `Service` | If reviews are fetched live from Supabase, use Partial Prerendering — static shell carries aggregate stats, individual reviews stream via `<Suspense>`. Validate with Google Rich Results Test. |
| 6 | `FAQPage` | Service pages + service+location pages | 4–6 authored FAQ items per page, fully static. High SERP value for "People Also Ask". |
| 7 | `HowTo` | Selected blog posts (`/blog/[slug]/page.tsx`) | Conditional on `howToSteps` field in `blog_posts.howToSteps`. |
| 8 | `ImageObject` | Attached to `Service` and `LocalBusiness` | Derive `url`, `width`, `height` from the same Prisma image record used by `next/image` so schema and rendered image stay in sync. |

**XSS rule:** Use `.replace(/</g, '\\u003c')` on serialised JSON-LD before injecting via `dangerouslySetInnerHTML` ([Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld)).

### Content length targets

| Page type | Target word count | Rationale |
|---|---|---|
| Homepage | 700–1,000 | Brand/conversion-led; excess length dilutes focus |
| Service pillar | 1,200–2,000 | Competes with directories for generic service queries |
| Location hub | 600–900 | City-specific overview; unique local content |
| Service + Location (the 160) | 600–900 | Each must be unique — no boilerplate with only city swapped |
| Blog post | 1,200–2,000 | Informational; supports pillar pages via internal links |
| Portfolio case study | 400–600 + 8–12 photos | Location-mention rich for local SEO |
| About | 400–600 | Brand story, ABN, credentials |
| Contact/Quote | 200–350 | Form-focused |

### Internal linking architecture

```
                                Homepage
                                   │
       ┌───────────────────────────┼───────────────────────────┐
       │                           │                           │
  10 Service Pillars        16 Location Hubs              Blog (cluster)
       │                           │                           │
       └───────────────┬───────────┘                           │
                       │                                       │
                160 Service + Location pages ←─────────────────┘
                       │
                       └── linked across to: 3–5 sibling services in the same city
                                            + same service in 3 nearby cities
```

Each Service + Location page renders two widget blocks:
1. **"More Steepwood Services in {City}"** — 4–6 sibling cards
2. **"{Service} Across Australia"** — 4–6 cards linking to the same service in different cities

Anchor text guidance: link to pillars using the service name ("custom kitchen joinery"); link to hubs using "joinery in {city}"; link to spokes using "{service} {city}". Keep click depth ≤3 from homepage.

## 1.4 Design System — Locked-In Concept

### Recommended: "Craft & Contrast"

A near-black workshop palette anchored by a single Amber Timber accent (#D4892A), set in Fraunces variable serif over General Sans. This concept delivers the strongest market differentiation in a Newcastle joinery category where every competitor defaults to white-and-grey builder templates. The amber-on-near-black colour relationship is thematically authentic — it echoes lit timber against workshop shadow — and reads as premium across both residential and commercial/hospitality segments. Fraunces' optical-size wonkiness gives Steepwood a distinctive typographic voice that no Australian joinery competitor currently uses.

### Tailwind v4 `@theme` block (drop into `globals.css`)

```css
@theme {
  /* === TYPOGRAPHY === */
  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-body: "General Sans", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "IBM Plex Mono", "Courier New", Courier, monospace;

  /* === FONT WEIGHTS === */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 800;

  /* === TYPE SCALE === */
  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem;
  --text-3xl: 1.875rem; --text-4xl: 2.25rem; --text-5xl: 3rem;
  --text-6xl: 3.75rem; --text-7xl: 4.5rem; --text-8xl: 6rem; --text-9xl: 8rem;

  /* === PRIMARY PALETTE === */
  --color-primary-50: #F5F1EB;
  --color-primary-100: #EAE3D8;
  --color-primary-200: #D6CBBA;
  --color-primary-300: #BFB09C;
  --color-primary-400: #A49480;
  --color-primary-500: #877663;
  --color-primary-600: #6A5C4A;
  --color-primary-700: #4F4032;
  --color-primary-800: #352A20;
  --color-primary-900: #1C1410;

  /* === ACCENT === */
  --color-accent: #D4892A;
  --color-accent-hover: #A86A18;
  --color-accent-foreground: #1C1410;

  /* === BACKGROUNDS / TEXT / BORDERS === */
  --color-bg-light: #F7F3EE;
  --color-bg-dark: #141210;
  --color-surface-light: #EDE7DF;
  --color-surface-dark: #1C1710;
  --color-text-on-light: #2A2018;
  --color-text-on-dark: #EAE0D0;
  --color-text-muted-light: #6A5C4A;
  --color-text-muted-dark: #877663;
  --color-border-light: #D6CBBA;
  --color-border-dark: #352A20;

  /* === SEMANTIC === */
  --color-success: #4A7A50; --color-success-bg: #EAF2EB;
  --color-warning: #C27A10; --color-warning-bg: #FDF3E0;
  --color-error: #A83020;   --color-error-bg: #FDECEA;

  /* === SPACING === */
  --spacing-1: 0.25rem; --spacing-2: 0.5rem; --spacing-3: 0.75rem;
  --spacing-4: 1rem;    --spacing-6: 1.5rem; --spacing-8: 2rem;
  --spacing-12: 3rem;   --spacing-16: 4rem;  --spacing-24: 6rem;
  --spacing-32: 8rem;   --spacing-48: 12rem; --spacing-64: 16rem;

  /* === RADII === */
  --radius-sm: 2px; --radius-md: 4px; --radius-lg: 8px;
  --radius-xl: 12px; --radius-full: 9999px;

  /* === SHADOWS === */
  --shadow-sm: 0 1px 3px 0 rgb(28 20 16 / 0.12);
  --shadow-md: 0 4px 12px 0 rgb(28 20 16 / 0.14);
  --shadow-lg: 0 8px 32px 0 rgb(28 20 16 / 0.18);
  --shadow-xl: 0 24px 64px 0 rgb(28 20 16 / 0.22);
  --shadow-accent: 0 4px 24px 0 rgb(212 137 42 / 0.30);

  /* === TRANSITIONS === */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  --transition-reveal: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* === Z-INDEX === */
  --z-base: 0; --z-raised: 10; --z-dropdown: 100;
  --z-sticky: 200; --z-overlay: 300; --z-modal: 400; --z-toast: 500;
}
```

### Typography

- **Display:** Fraunces (Google Fonts, variable; axes `wght` 300–900, `SOFT` 0–100, `WONK` 0–1). Hero headlines 700–800; editorial sub-heads 300.
- **Body:** General Sans (Fontshare; self-hosted WOFF2 in `/public/fonts/`). Weights 400, 500, 600, 700.
- **Mono:** IBM Plex Mono (Google Fonts). Weight 400.

### Photography direction

High-contrast workshop photography lit from a single dramatic source — lit timber surfaces against deep shadow. Architectural wide compositions for installed work. Occasional black-and-white process shots in editorial sections. All photography colour-graded warm. Stock studio shots are forbidden.

### Animation philosophy

CSS-first using compositor-thread properties only (`opacity`, `transform`). Scroll-driven reveals via `animation-timeline: view()`. Intersection Observer fallback for older browsers, with 150 ms stagger per child. Framer Motion only for page transitions (200 ms opacity cross-fade) with `<MotionConfig reducedMotion="user">` global. Hero ambient video — muted, autoplayed only when `prefers-reduced-motion: no-preference`, max 10 s loop, poster image fallback.

### Alternative concepts (appendix, not in primary build)

- **Concept A "Grain & Ground"** — Warmest residential concept. Cormorant Garamond + Satoshi. Warm linen + burnt sienna. Best fallback if commercial scope reduces.
- **Concept C "Stone & Sky"** — Sandstone + deep eucalyptus green + copper. Instrument Serif + Work Sans. Reserve for a future sustainability-positioned brand evolution.

Full palettes for both alternatives are in [`research/03_design_direction.md`](research/03_design_direction.md).

## 1.5 Technical Architecture

### Folder structure

```
steepwood/
├── .cursor/
│   └── rules/
│       └── steepwood.mdc            # See Section 6 of this document
├── .env.example
├── .env.local                       # gitignored
├── .eslintrc.json
├── .gitignore
├── middleware.ts                    # Supabase auth proxy (edge runtime)
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── BUILD.md                         # This document
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── fonts/                       # GeneralSans-*.woff2
│   ├── images/                      # Static OG fallbacks
│   ├── og/                          # Generated OG images
│   └── robots.txt
├── scripts/
│   ├── seed.ts                      # Initial seed
│   └── generate-og.ts               # OG image generation
└── src/
    ├── app/
    │   ├── layout.tsx               # Root layout (fonts, schema, providers)
    │   ├── page.tsx                 # Homepage (ISR 86400)
    │   ├── globals.css              # @import "tailwindcss"; @theme {...}
    │   ├── favicon.ico
    │   ├── sitemap.ts               # Dynamic sitemap (all 200+ URLs)
    │   ├── robots.ts
    │   ├── not-found.tsx            # Custom 404
    │   ├── (marketing)/
    │   │   ├── layout.tsx           # Header + Footer + StickyMobileCTA
    │   │   ├── about/page.tsx
    │   │   ├── contact/page.tsx
    │   │   ├── quote/page.tsx       # 3-step multi-step form
    │   │   ├── faqs/page.tsx
    │   │   ├── testimonials/page.tsx
    │   │   ├── blog/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── portfolio/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   ├── locations/
    │   │   │   ├── page.tsx         # 16-card grid
    │   │   │   └── [location]/page.tsx
    │   │   └── [service]/
    │   │       ├── page.tsx         # /custom-kitchen-joinery — 10 service pillars
    │   │       └── [location]/page.tsx  # /custom-kitchen-joinery/newcastle — 160 pages
    │   ├── (admin)/
    │   │   ├── layout.tsx           # Supabase Auth-guarded admin shell
    │   │   └── admin/
    │   │       ├── page.tsx         # Dashboard
    │   │       ├── login/page.tsx
    │   │       ├── blog/page.tsx
    │   │       ├── portfolio/page.tsx
    │   │       ├── testimonials/page.tsx
    │   │       ├── faqs/page.tsx
    │   │       ├── quote-requests/page.tsx
    │   │       └── sitemap/page.tsx
    │   └── api/
    │       ├── revalidate/route.ts  # On-demand ISR webhook
    │       ├── quote/route.ts       # Quote submission endpoint
    │       ├── contact/route.ts
    │       └── upload/route.ts      # Supabase signed-upload URL
    ├── components/
    │   ├── ui/                      # shadcn/ui vendored
    │   ├── atoms/
    │   │   ├── Button.tsx
    │   │   ├── Badge.tsx
    │   │   └── Icon.tsx
    │   ├── molecules/
    │   │   ├── ServiceCard.tsx
    │   │   ├── TestimonialCard.tsx
    │   │   ├── BlogCard.tsx
    │   │   ├── BreadcrumbNav.tsx
    │   │   └── TrustStrip.tsx
    │   ├── organisms/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── ServiceGrid.tsx
    │   │   ├── TestimonialCarousel.tsx
    │   │   ├── StickyMobileCTA.tsx
    │   │   └── QuoteFormWizard.tsx
    │   └── sections/
    │       ├── LocationServiceHero.tsx
    │       ├── LocalFAQ.tsx
    │       ├── LocalPortfolio.tsx
    │       ├── ProcessSection.tsx
    │       └── RelatedPagesWidget.tsx
    ├── lib/
    │   ├── prisma.ts                # Singleton PrismaClient
    │   ├── supabase/
    │   │   ├── client.ts            # createBrowserClient
    │   │   ├── server.ts            # createServerClient (cookies)
    │   │   ├── proxy.ts             # updateSession for middleware
    │   │   ├── service-role.ts      # Admin-only client
    │   │   └── image-loader.ts      # Custom next/image loader
    │   ├── seo/
    │   │   ├── metadata.ts          # Shared generateMetadata helpers
    │   │   ├── jsonld.ts            # JSON-LD builders
    │   │   └── constants.ts         # Site URL, brand name, etc.
    │   ├── utils.ts                 # cn(), formatDate(), slugify()
    │   └── validators/
    │       ├── quote.schema.ts
    │       └── contact.schema.ts
    ├── hooks/
    │   ├── useQuoteStore.ts         # Zustand multi-step store
    │   ├── useMediaQuery.ts
    │   └── useInView.ts
    ├── types/
    │   ├── database.ts
    │   ├── seo.ts
    │   └── common.ts
    └── styles/
        └── (merged into globals.css via @layer)
```

### Key configuration decisions

| Tool | Version (June 2026) | Decision | Reason |
|---|---|---|---|
| Next.js | 15.3.x | App Router, `src/`, Turbopack dev | Stable, RSC, streaming, metadata API |
| React | 19.x | Stable | `cache()`, compiler, concurrent features |
| TypeScript | 5.8.x | Strict mode | Type safety across Prisma + Supabase types |
| Tailwind CSS | 4.1.x | CSS-first `@theme` in `globals.css`, no `tailwind.config.js` | 70% smaller CSS, Lightning CSS engine |
| shadcn/ui | CLI v4 (March 2026) | New York style, OKLCH colours, Tailwind v4 | Owned components, zero runtime overhead |
| Prisma | 6.x | `prisma.ts` singleton with `globalThis` guard | Prevents connection pool exhaustion in dev HMR |
| `@supabase/ssr` | 0.6.x | `createBrowserClient` + `createServerClient` + middleware `updateSession` | Cookie-based auth for SSR; no localStorage |
| supabase-js | 2.x | service_role via plain `supabase-js` only on server | Prevent cookie bleed into admin client |
| Zod | 3.24.x | Per-step schemas + combined schema for server action | Single source of truth, re-validated server-side |
| React Hook Form | 7.54.x | `zodResolver`, per-step `trigger()` | Minimal re-renders, integrates with server actions |
| Zustand | 5.x | Flat slice store for multi-step form | Lightweight, no provider boilerplate |
| `@vercel/speed-insights` | 1.x | `<SpeedInsights />` in root layout | CWV monitoring |
| `@vercel/analytics` | 1.x | `<Analytics />` in root layout | Privacy-preserving analytics |
| `next-sitemap` | 4.x | Use native `app/sitemap.ts` preferred; `next-sitemap` for robots if needed | Native App Router API is cleaner |
| Vercel region | `syd1` | Sydney function placement | Australian user latency |

### Rendering strategy

| Page type | Strategy | `revalidate` | Justification |
|---|---|---|---|
| Homepage | ISR | 86400 s | Mostly static, updated daily |
| `/[service]` (10 pages) | ISR | 86400 s | SEO content, slow-changing |
| `/[service]/[location]` (160 pages) | ISR | 86400 s | All pre-built; `dynamicParams=false` |
| `/locations/[location]` (16 pages) | ISR | 86400 s | Slow-changing |
| `/blog` index | ISR | 3600 s | New posts within 1 h |
| `/blog/[slug]` | ISR | 3600 s | Edits propagate quickly |
| `/portfolio/[slug]` | ISR | 86400 s | Rare updates |
| `/portfolio` index | ISR | 86400 s | Slow-changing |
| `/about`, `/contact`, `/faqs`, `/testimonials` | SSG | `false` | No dynamic data |
| `/quote` | SSR | `force-dynamic` | Server action + session |
| `(admin)/**` | SSR | `force-dynamic` | Auth-gated, real-time |
| `app/sitemap.ts` | ISR | 86400 s | Regenerated daily |
| `app/api/**` | Dynamic | Per-handler headers | Webhooks, signed URLs |

### Production npm packages

```json
{
  "next": "^15.3.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "@prisma/client": "^6.9.0",
  "@supabase/ssr": "^0.6.1",
  "@supabase/supabase-js": "^2.49.0",
  "zod": "^3.24.4",
  "react-hook-form": "^7.54.2",
  "@hookform/resolvers": "^3.10.0",
  "zustand": "^5.0.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0",
  "tw-animate-css": "^1.3.4",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-dropdown-menu": "^2.1.6",
  "@radix-ui/react-select": "^2.1.6",
  "@radix-ui/react-slot": "^1.1.2",
  "@radix-ui/react-toast": "^1.2.6",
  "@radix-ui/react-accordion": "^1.2.2",
  "@radix-ui/react-tabs": "^1.1.2",
  "lucide-react": "^0.511.0",
  "framer-motion": "^11.18.0",
  "resend": "^4.1.0",
  "@vercel/speed-insights": "^1.2.0",
  "@vercel/analytics": "^1.5.0",
  "next-sitemap": "^4.2.3"
}
```

### Dev dependencies

```json
{
  "typescript": "^5.8.3",
  "@types/node": "^22.0.0",
  "@types/react": "^19.1.0",
  "@types/react-dom": "^19.1.0",
  "prisma": "^6.9.0",
  "tailwindcss": "^4.1.8",
  "@tailwindcss/postcss": "^4.1.8",
  "postcss": "^8.5.3",
  "eslint": "^9.26.0",
  "eslint-config-next": "^15.3.0",
  "@typescript-eslint/eslint-plugin": "^8.33.0",
  "@typescript-eslint/parser": "^8.33.0",
  "prettier": "^3.5.3",
  "prettier-plugin-tailwindcss": "^0.6.12",
  "tsx": "^4.19.2"
}
```

## 1.6 Conversion Strategy

### Top 10 CRO tactics (ranked by expected impact)

1. **3-step multi-step quote form** — 3–14× higher conversion than single-step ([Formstack/Responsify](https://www.responsify.com/multi-step-form-conversion-rate-optimization)).
2. **Google Reviews volume + recency + response rate** — every +10 reviews adds 2.8% conversion; 3.5→4.5 stars adds 44% ([Creative Collective AU](https://thecreativecollective.com.au/blog/how-google-reviews-can-make-or-break-your-conversion-rates/)).
3. **Mobile sticky bottom CTA bar** (Call + Free Quote) — sticky CTAs add 8–25% conversion ([Conversion Rate Experts](https://conversion-rate-experts.com/sticky-cta-win-report/)).
4. **Dedicated service landing pages** — top-decile home-improvement landing pages reach 35% CR ([Unbounce](https://unbounce.com/conversion-rate-optimization/cro-case-studies/)).
5. **Trust strip immediately below hero** — 5+ visible reviews adds 270% ([Spokk](https://www.spokk.io/blog/roi-of-google-reviews-how-reviews-impact-revenue)).
6. **"Get a Free Measure & Quote" primary CTA** — specificity + "free" beats generic alternatives ([KlientBoost](https://www.klientboost.com/marketing/call-to-action-examples/)).
7. **Homepage "How It Works" process section** — reduces fear-of-the-unknown for high-ticket purchases.
8. **Sub-2 s mobile LCP** — sites loading in 1 s convert 3× better than 5 s ([Matomo](https://matomo.org/blog/2024/02/conversion-rate-optimisation-best-practices/)).
9. **Micro-FAQ embedded on quote page** — resolves objections at the moment of decision.
10. **Before/after lightbox portfolio with suburb attribution** — authentic project photography is the primary purchase driver for AU trade ([Marketeam AU](https://marketeam.com.au/resources/articles/web-design/why-construction-trade-businesses-need-a-professional-website)).

### Homepage section structure (top to bottom)

| # | Section | Conversion role |
|---|---|---|
| 1 | Sticky nav (logo, click-to-call, "Get a Free Measure & Quote" button) | Persistent conversion opportunity |
| 2 | Hero (video/photo, headline, two CTAs, below-fold trust strip) | Answer "What/who/trust?" in 3 s |
| 3 | Trust bar (Google ★, review count, years, HIA/MBA logos) | Convert interest into trust before bounce |
| 4 | Services overview (4 cards: Kitchen, Wardrobes, Commercial, Bespoke) | Self-segmentation |
| 5 | Featured portfolio (3–6 before/after) | Primary purchase driver |
| 6 | "How it works" (4 steps: Consult → Design → Craft → Install + Warranty) | Demystify process |
| 7 | Social proof (3–5 attributed Google review cards) | Mid-page social proof |
| 8 | Mid-page CTA block ("Get a Free Measure & Quote") | Interrupt pattern |
| 9 | Credentials (ABN, NSW licence, insurance, warranty, HIA/MBA) | Address residual doubt |
| 10 | About / team (founder photo, Newcastle roots) | Humanisation |
| 11 | Commercial joinery teaser (segment dedicated commercial traffic) | B2B segmentation |
| 12 | FAQ (5–7 questions) | Long-tail search + objection handling |
| 13 | Embedded 3-step quote form | Bottom-of-page high-intent conversion |
| 14 | Footer (contact, ABN, licence, service areas, legal links) | Due-diligence signals |

### Quote form spec

**Step 1 — Project Type** (1 single-select question, button options)
- Kitchen Joinery | Wardrobe & Storage | Bathroom Vanity | Commercial Fitout | Bespoke Furniture | Other

**Step 2 — Project Details** (3–4 fields)
- Project scope (textarea, optional, ≤1000 chars)
- Suburb / location (required)
- Budget range (optional single-select: <$5k | $5k–$15k | $15k–$30k | $30k–$60k | $60k+)
- File upload (optional, ≤3 files, ≤10 MB each, image/jpg/png/webp/heic or pdf) — Supabase Storage signed URL

**Step 3 — Contact** (3 required + 1 optional)
- First name (required, ≤100)
- Phone (required, AU regex `^(\+?61|0)[2-578]\d{8}$`)
- Email (required, valid email)
- Best time to call (optional single-select: Morning | Afternoon | Evening | Anytime)

**Submit button:** "Send My Quote Request →"
**Success state:** Replace form with confirmation panel — "Thanks {firstName} — we've received your request. One of our team will call you within one business day."
**Notification triggers:**
1. Email to Steepwood (Resend), full payload + attachments link
2. Confirmation email to lead (Resend)
3. Optional Slack webhook to `#leads` channel
4. Insert row in Supabase `quote_requests` via Prisma

### Trust signal placement map

| Location | Signals |
|---|---|
| Sticky nav (header) | Click-to-call phone, "Licensed & Insured" micro-text (desktop), "Get a Free Quote" CTA |
| Hero (below-fold strip) | Google ★ + review count, Years Established, HIA/MBA logos |
| Post-hero trust bar | Google Reviews widget, Houzz badge, "X Projects Completed" |
| Service sections | Relevant per-service awards (HIA Kitchen of the Year etc.) |
| Mid-page reviews block | 3–5 attributed Google review cards (name, suburb, rating, quote) |
| Credentials section | ABN, NSW licence, public liability statement, warranty detail |
| Quote form page | Google star rating above form, "Free & no-obligation" reassurance, privacy note |
| Footer | ABN, licence, ProductReview.com.au badge if claimed, "Proudly serving Newcastle & Hunter Valley" |
| Sticky mobile bottom bar | 📞 Call (click-to-call) + ✉ Free Quote (modal trigger) |

### Primary CTA wording (locked-in)

**"Get a Free Measure & Quote"** — specific to the trade context, includes "free" (proven conversion trigger), describes a tangible deliverable (measurement visit + written quote), matches Australian search intent. Secondary CTA on hero is "View Our Work" (ghost button).

---

## SECTION 3 — PHASE 2: CORE PAGES AND SEO ARCHITECTURE

> **Phase goal:** Ship the full URL structure — homepage, about, contact, 10 service pillars (`/[service]/`), 16 location hubs (`/locations/[location]/`), and the 160 service+location pages (`/[service]/[location]/`) — all statically rendered with ISR, full JSON-LD per page, BreadcrumbList, programmatic metadata, and the dynamic sitemap + robots files.
>
> **Phase duration:** Days 5–12 of the build.
>
> **Definition of phase done:**
> - All 188 unique pages render (1 home + 1 about + 1 contact + 10 services + 16 locations + 160 combos = 188)
> - `app/sitemap.ts` returns all URLs with correct lastmod/changefreq
> - Every dynamic route has `generateMetadata` with title, description, canonical, OG image, Twitter card
> - Every page validates appropriate schema (Service, BreadcrumbList, FAQPage, AggregateRating where data exists)
> - `dynamicParams = false` on [service]/[location] — bots can't trigger unbudgeted generation
> - Average page-level Lighthouse SEO score = 100 across a sample of 10 pages
> - All internal links use Next.js `<Link>` (not raw `<a>`), no broken links per `pnpm dlx broken-link-checker http://localhost:3000`

### Why this URL structure (decision recap)

We chose **`/[service]/[location]/` flat depth-2** over alternatives like `/locations/[city]/[service]` or `/services/[service]/in/[city]` because:

1. **Keyword at depth-1** — Google reads URL slugs left-to-right; the service (e.g. "custom-kitchen-joinery") is the primary keyword and deserves the first slug position
2. **Mirrors search intent** — Australians search "custom kitchen joinery Sydney", placing the service before the location
3. **Cleaner canonicalisation** — flat structure avoids accidental duplicate-content traps that nested `/services/[s]/locations/[l]` would create
4. **Easier breadcrumbs** — Home › Custom Kitchen Joinery › Sydney is intuitive
5. **Internal linking simplicity** — service pillar links down to 16 location variants; location hub links across to 10 service variants; service+location pages link sideways to siblings (other locations for same service)

We also maintain **/locations/[location]/** as a separate "location hub" that lists all 10 services available in that city — this satisfies users who start their search by area rather than service.

### Page inventory (188 total)

| Type | Count | URL pattern | Render strategy |
|---|---|---|---|
| Homepage | 1 | `/` | ISR 86400s |
| About | 1 | `/about/` | ISR 86400s |
| Contact | 1 | `/contact/` | ISR 86400s |
| Quote form | 1 | `/quote/` | SSR force-dynamic (built in Phase 3) |
| Service pillars | 10 | `/[service]/` | ISR 86400s, dynamicParams = false |
| Location hubs | 16 | `/locations/[location]/` | ISR 86400s, dynamicParams = false |
| Service+Location | 160 | `/[service]/[location]/` | ISR 86400s, dynamicParams = false |
| Projects gallery | 1 | `/projects/` | ISR 86400s (built in Phase 3) |
| Project detail | N | `/projects/[slug]/` | ISR 86400s (built in Phase 3) |
| Blog index | 1 | `/blog/` | ISR 3600s (built in Phase 3) |
| Blog post | N | `/blog/[slug]/` | ISR 3600s (built in Phase 3) |
| Legal | 3 | `/legal/privacy`, `/legal/terms`, `/legal/consumer-rights` | Static |

This section (Phase 2) ships the bold rows. Phase 3 adds the italic-style rows (Quote, Projects, Blog).

---

### Task 3.1 — Build the Homepage with full conversion architecture

**Cursor Prompt:**

```
Context: SteepWood homepage is the single most important page for first impressions, brand authority, and conversion. It must combine cinematic hero, trust signals, service overview, social proof, process explainer, and multiple CTAs. ISR-rendered, 86400s revalidate.

Task: Build src/app/page.tsx (replacing the Phase 1 placeholder) with the full homepage architecture.

Sections to include (in order, top to bottom):
1. Hero — full-viewport-height (`min-h-screen lg:min-h-[88vh]`), large editorial image right-half (use next/image with priority + fetchPriority="high"), left-half content: kicker mono caption, Fraunces display-1 headline, body-lg description, two CTAs (primary "Get a Free Measure & Quote" + ghost "View Our Work"), micro trust strip (★4.9 Google · HIA Member · Newcastle, NSW).
2. Trust bar (below-hero) — bg-ink-50, contains: Google Reviews widget (badge with stars + "Read 87 Reviews" link, placeholder count for now), HIA logo, MBA logo, Houzz badge, "Est. 2014" (placeholder year).
3. Services overview — heading "Crafted for every room, designed for every brief", 2-column grid lg:3-column showing all 10 services as cards. Each card: representative image, service name (Fraunces h3), 2-sentence description, "Explore →" link to /[service]/. Card hover: subtle scale 1.02, image scale 1.05, duration-slow.
4. Why SteepWood — 4 pillars in a 2x2 grid lg:1x4 horizontal. Each pillar: Lucide icon (Ruler, Hammer, Award, MessageSquare), title, 2-sentence description. Pillars: "Made-to-measure precision", "Crafted in our Newcastle workshop", "Lifetime craftsmanship warranty", "Designers who listen first".
5. Featured projects — 3 portfolio projects as large editorial cards in a horizontal scroller on mobile, 3-up grid on desktop. Pull from prisma.portfolioProject.findMany({ where: { featured: true }, take: 3, orderBy: { createdAt: 'desc' } }). Each card links to /projects/[slug].
6. Process — 4-step horizontal stepper: 1. Discovery call, 2. Design & 3D visuals, 3. Workshop crafting, 4. Installation & handover. Each step: number in Fraunces serif (large), title, 2-sentence description, illustrative line drawing or photo.
7. Testimonials — pull 3 from prisma.testimonial.findMany({ where: { featured: true }, take: 3 }). Render as cards with quote, attribution, suburb, ★ rating. Render AggregateRating JSON-LD here.
8. Service area teaser — heading "Crafted in Newcastle, delivered Australia-wide", subhead, link grid of all 16 locations linking to /locations/[location]/. Background: subtle map-of-Australia SVG illustration.
9. FAQ — 5 most-common questions from prisma.faq.findMany({ where: { featured: true, category: 'homepage' }, take: 5 }). Use shadcn Accordion. Render FAQPage JSON-LD here.
10. Final CTA — large bg-ink-900 section with Fraunces headline "Ready to start your project?", subhead, two CTAs (primary + outline).

Implementation details:
- File: src/app/page.tsx (Server Component by default)
- Add `export const revalidate = 86400;`
- generateMetadata is replaced by static metadata export with title, description, openGraph, twitter, alternates.canonical = NEXT_PUBLIC_SITE_URL + '/'
- All images use next/image with width/height for CLS=0 and `sizes` for responsive serving
- Hero image is priority + fetchPriority="high"
- All other section images are loading="lazy" (default)
- Use Suspense + Skeleton for the testimonials AggregateRating (allows the rest of page to stream while we calculate the rating)
- Australian English throughout copy: "specialise", "colour", "centre", "favourite", "organisation"

Acceptance criteria:
- All 10 sections render in order
- Lighthouse Performance ≥95 on mobile, ≥98 on desktop
- LCP < 2.0s (the hero image is the LCP element — preloaded)
- CLS = 0
- All 10 service cards link to /[service]/ pillar pages (will 404 until Task 3.5)
- All 16 location links + 3 portfolio + 3 testimonials render from database
- FAQPage and AggregateRating JSON-LD validate
- Mobile responsive at 320px (no horizontal scroll, all CTAs accessible)
```

**Files to create or modify:**
- `src/app/page.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/TrustBar.tsx`
- `src/components/sections/ServicesOverview.tsx`
- `src/components/sections/WhySteepWood.tsx`
- `src/components/sections/FeaturedProjects.tsx`
- `src/components/sections/Process.tsx`
- `src/components/sections/Testimonials.tsx`
- `src/components/sections/ServiceAreaTeaser.tsx`
- `src/components/sections/HomepageFAQ.tsx`
- `src/components/sections/FinalCTA.tsx`
- `src/lib/seo/homepageStructuredData.ts`

**Definition of Done:**
- [ ] All 10 sections render with real or placeholder content
- [ ] Lighthouse Performance ≥95 mobile
- [ ] FAQPage + AggregateRating JSON-LD validate
- [ ] Australian English audit passes (no "color", "specialize", "favorite", etc.)

---

### Task 3.2 — Build the About page

**Cursor Prompt:**

```
Context: The About page tells SteepWood's origin story, introduces the team, communicates values, and reinforces craftsmanship credibility. It's a key trust-building page and ranks for branded + "joinery near me" + reputational searches.

Task: Build src/app/about/page.tsx.

Sections:
1. Editorial hero — left: Fraunces display-2 headline "Joiners who measure twice and care thrice.", kicker "Our story", body description. Right: black-and-white photo of the workshop or founder.
2. Origin story — long-form prose, ~400 words, written in first-person plural ("We started SteepWood in 2014 in a small workshop in Newcastle..."). Two columns on desktop, single on mobile.
3. Values pillars — 4 cards: Craftsmanship over speed, Materials that age beautifully, Honest communication, Built for generations.
4. Workshop tour — gallery of 6 workshop photos (next/image, lightbox-able via shadcn Dialog).
5. Team — grid of team members (start with 4 placeholder cards: founder, lead joiner, designer, install lead). Pull from a hardcoded array for now; could become a database table later.
6. Credentials — large card listing: HIA member, MBA member, NSW Builder's Licence number, ABN, public liability insurance ($20m), workers' compensation cover, warranties offered.
7. CTA — "Want to see what we can craft for you?" + primary CTA.

Metadata:
- title: "About SteepWood — Custom Joinery Crafted in Newcastle Since 2014"
- description: 155 chars about the workshop, values, team, and Australian craftsmanship.
- canonical: SITE_URL + '/about/'

Render strategy: ISR 86400s.

Acceptance criteria:
- All 7 sections render
- 6 workshop photos lazy-load and open in lightbox on click
- Credentials section displays placeholder ABN/licence formatted correctly
- About page links to /quote and /projects from CTAs
- Lighthouse Performance ≥95
```

**Files to create or modify:**
- `src/app/about/page.tsx`
- `src/components/sections/about/OriginStory.tsx`
- `src/components/sections/about/Values.tsx`
- `src/components/sections/about/WorkshopGallery.tsx`
- `src/components/sections/about/Team.tsx`
- `src/components/sections/about/Credentials.tsx`

**Definition of Done:**
- [ ] About page accessible at /about/
- [ ] All copy in Australian English, first-person plural
- [ ] Workshop gallery uses next/image with proper sizes prop

---

### Task 3.3 — Build the Contact page

**Cursor Prompt:**

```
Context: The Contact page is for users who want non-quote contact (general enquiries, supplier outreach, press, careers). Lower priority than /quote but must look professional and trustworthy. ISR-rendered with the contact form as a Client Component island.

Task: Build src/app/contact/page.tsx with a working contact form.

Sections:
1. Editorial hero — Fraunces display-2 "Let's talk." + kicker "Get in touch" + body description.
2. Contact channels grid (3 cards):
   - Phone: large click-to-call number, hours
   - Email: hello@steepwood.com.au
   - Workshop visit: address + "by appointment" + map link (Google Maps href)
3. Contact form — fields: Name (required), Email (required, validated), Phone (optional, AU format), Subject (select: General enquiry, Press, Supplier, Careers, Other), Message (required, min 20 chars). Honeypot field "company" hidden via CSS (bots fill it; we reject submissions where it's not empty). Submit creates a contact_submissions row via a server action and sends email to hello@steepwood.com.au via Resend (configure in Phase 3 Task 4.X; for now the action can console.log and return success).
4. Workshop location — embed Google Maps iframe (lazy loaded with proper loading=lazy). Address visible above the embed.
5. Hours table — Mon-Fri 7-5, Sat 9-1 by appointment, Sun closed.

Form implementation:
- src/components/forms/ContactForm.tsx — Client Component
- react-hook-form + zod resolver (zod schema in src/lib/validations/contact.ts)
- shadcn Form components
- On submit: call `submitContactForm` server action from src/app/actions/contact.ts
- The action: validate with zod, check honeypot, prisma.contactSubmission.create, return { ok: true } or { ok: false, error }
- Sonner toast on success: "Thanks — we'll be in touch within 1 business day."
- On error: red inline message, no toast

Metadata:
- title: "Contact SteepWood — Custom Joinery Newcastle | Get in Touch"
- description: 155 chars about contacting the team for enquiries, projects, or workshop visits in Newcastle.

Acceptance criteria:
- Contact form passes zod validation client + server side
- Honeypot field rejects bot submissions (test by filling "company" field via DevTools)
- contact_submissions table receives a real row on successful submit
- Form is fully accessible (labels, aria-describedby for errors, focus management on error)
- Google Map iframe loads only when scrolled into view (loading="lazy" + IntersectionObserver if needed)
```

**Files to create or modify:**
- `src/app/contact/page.tsx`
- `src/components/forms/ContactForm.tsx`
- `src/lib/validations/contact.ts`
- `src/app/actions/contact.ts`

**Definition of Done:**
- [ ] Contact form submits and creates DB row
- [ ] Honeypot test rejects spam
- [ ] Sonner toast shows on success
- [ ] Lighthouse Accessibility = 100 on /contact/

---

### Task 3.4 — Set up the dynamic route foundation for `/[service]/[location]/`

**Cursor Prompt:**

```
Context: SteepWood's URL structure puts service at depth 1 (/custom-kitchen-joinery/) and service+location at depth 2 (/custom-kitchen-joinery/sydney/). Next.js App Router catches both via /src/app/[service]/page.tsx (service pillar) and /src/app/[service]/[location]/page.tsx (combo page). The location-hub pages live at /src/app/locations/[location]/page.tsx to avoid route conflicts.

We must use `dynamicParams = false` on these dynamic segments to prevent unbudgeted ISR generation triggered by bots scanning fake slugs.

Task: Establish the routing scaffold and shared utilities for service/location resolution.

Steps:
1. Create src/lib/services-locations/services.ts — exports a typed array of all 10 services with id, slug, title, shortDescription, longIntro, hero image path, etc. Single source of truth that matches the services table in DB.

2. Create src/lib/services-locations/locations.ts — exports a typed array of all 16 locations with slug, name, state, region (NSW Coastal / NSW Inland / Capital City / Regional), areaDescription, populationServed, drive time from Newcastle workshop, hero image path.

3. Create src/lib/services-locations/resolvers.ts:
   - `resolveService(slug: string)` — cached() wrapped lookup that hits both local array AND DB to merge fixed copy + dynamic counts (e.g. project count for the service)
   - `resolveLocation(slug: string)` — same pattern
   - `resolveServiceLocation(serviceSlug, locationSlug)` — returns combined data + any service_locations row (which can have custom copy overrides per Phase 3 admin panel)
   - `getAllServiceSlugs()` — returns string[] of 10 slugs
   - `getAllLocationSlugs()` — returns string[] of 16 slugs
   - `getAllServiceLocationPairs()` — returns Array<{ service: string; location: string }> of 160 combos

4. Create src/lib/seo/canonical.ts:
   - `canonicalUrl(path: string)` — strips trailing slash inconsistencies, prepends SITE_URL, ensures no double slashes

5. Create src/lib/seo/metadataBuilders.ts with reusable helpers:
   - `buildServiceMetadata(service)` — returns Metadata object for a service pillar
   - `buildLocationMetadata(location)` — returns Metadata for a location hub
   - `buildServiceLocationMetadata(service, location)` — returns Metadata for a combo page
   Each builder enforces: title ≤60 chars, description 150-160 chars, openGraph (type=website, locale=en_AU, images=[ogImage]), twitter (card=summary_large_image), alternates.canonical.

Acceptance criteria:
- `resolveServiceLocation('custom-kitchen-joinery', 'sydney')` returns merged data with TypeScript autocomplete on all fields
- `getAllServiceLocationPairs().length === 160`
- All slugs are URL-safe (lowercase, hyphens only, no double-hyphens)
- Metadata builders produce identical structure across all page types
```

**Files to create or modify:**
- `src/lib/services-locations/services.ts`
- `src/lib/services-locations/locations.ts`
- `src/lib/services-locations/resolvers.ts`
- `src/lib/seo/canonical.ts`
- `src/lib/seo/metadataBuilders.ts`

**Definition of Done:**
- [ ] 10 services × 16 locations = 160 combos resolve without errors
- [ ] No `any` types in resolvers
- [ ] Metadata helpers produce schema-valid Open Graph + Twitter tags

---

### Task 3.5 — Build the Service Pillar page template (`/[service]/`)

> **SEO content source:** Use the canonical title, meta description, H1, intro, body sections, FAQs, and JSON-LD schema for all 10 service pillars from **Section 9.4 — Service Pillar Pages** (see also 9.3 Title/Meta/H1 formulas and 9.7 Schema JSON-LD library). Do not invent copy; pull verbatim from Section 9.

**Cursor Prompt:**

```
Context: A Service Pillar page (e.g. /custom-kitchen-joinery/) targets the broad service keyword Australia-wide. It needs comprehensive content (~1,500-2,000 words), schema.org/Service markup, links down to all 16 location variants, and clear conversion paths.

Task: Build src/app/[service]/page.tsx with full SEO and conversion structure.

Steps:
1. Create src/app/[service]/page.tsx as a Server Component:

```typescript
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { resolveService, getAllServiceSlugs } from '@/lib/services-locations/resolvers';
import { buildServiceMetadata } from '@/lib/seo/metadataBuilders';

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ service: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await resolveService(slug);
  if (!service) return {};
  return buildServiceMetadata(service);
}

export default async function ServicePillarPage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = await resolveService(slug);
  if (!service) notFound();
  // ... render
}
```

2. Page sections (top to bottom):
   - Hero — kicker "Custom Joinery · Australia-wide", h1 = service.title (e.g. "Custom Kitchen Joinery"), body intro (~80 words), primary CTA, ghost CTA "Browse Kitchens" (links to /projects?category=kitchen)
   - Intro section — long-form 250-word "What is [service]?" explanation in Australian English
   - What's included — 6-card grid of typical inclusions (e.g. for kitchens: cabinetry, benchtops, splashbacks, soft-close hardware, integrated appliances, finishing). Pull from service.includes array.
   - Materials & finishes — explainer with product photography. Talk about 2pac, veneer, laminate, melamine, stone benchtops, timber benchtops.
   - Process — same 4-step process as homepage, but tailored to this service.
   - Featured projects — 4 portfolio_projects matching this service category, pulled from DB.
   - Testimonials — 3 testimonials filtered by service_id matching this service (if present), else generic top 3.
   - Locations grid — heading "We craft [service] for clients across Australia", grid of all 16 locations linking to /[service]/[location]/. Each link card shows location name + region + drive time from workshop.
   - FAQ — 6-8 service-specific FAQs from prisma.faq.findMany({ where: { serviceId: service.id }, take: 8, orderBy: { displayOrder: 'asc' } }). Render FAQPage JSON-LD.
   - Final CTA — bg-ink-900 section, "Ready to design your [service]?" headline.

3. Render structured data:
   - Service schema (subtype of Service: e.g. HomeAndConstructionBusiness offers a Service named "Custom Kitchen Joinery", areaServed = all 16 cities)
   - BreadcrumbList (Home › [Service])
   - FAQPage (from the FAQ section)

4. Internal linking requirements:
   - Top of intro: link to 2-3 related services (e.g. kitchen page links to "Built-in Wardrobes" and "Bathroom Vanity Joinery" as "Complementary services")
   - Location grid: 16 outbound links to /[service]/[location]/
   - Each link uses Next.js <Link> with descriptive anchor text (NOT "click here" or "learn more" — use "Custom kitchen joinery in Sydney")

Acceptance criteria:
- All 10 service pillar pages generate at build time (verify in `pnpm build` output: 10 routes generated)
- dynamicParams = false enforced (test by visiting /nonexistent-service — should 404, not ISR-generate)
- Each page validates Service + BreadcrumbList + FAQPage schemas
- Each page has 16 internal links to its location variants
- Lighthouse SEO = 100 on a sample of 3 service pillars
- Word count: ≥1,500 visible words per service page
```

**Files to create or modify:**
- `src/app/[service]/page.tsx`
- `src/components/pages/ServicePillarPage.tsx` (extract render logic)
- `src/lib/seo/serviceStructuredData.ts`

**Definition of Done:**
- [ ] 10 service URLs render with full content
- [ ] Build output shows 10 statically generated /[service]/ routes
- [ ] Schemas validate at validator.schema.org for at least 3 sampled URLs

---

### Task 3.6 — Build the Location Hub page template (`/locations/[location]/`)

> **SEO content source:** Use the canonical title, meta description, H1, intro, suburbs-served lists, FAQs, and JSON-LD schema for all 16 location hubs from **Section 9.5 — Location Hub Pages** (see also 9.1 Location table, 9.3 formulas, 9.7 Schema library). Do not invent copy; pull verbatim from Section 9.

**Cursor Prompt:**

```
Context: A Location Hub (e.g. /locations/sydney/) is for users who search location-first. It targets queries like "custom joinery Sydney" and links to all 10 service variants for that city. It also displays local trust signals: drive time, recent projects in that city, local testimonials, local insurances.

Task: Build src/app/locations/[location]/page.tsx.

Steps:
1. File structure mirrors Task 3.5 with dynamicParams = false, revalidate = 86400, generateStaticParams returning all 16 location slugs.

2. Page sections:
   - Hero — kicker "Newcastle to [Location]", h1 = "Custom Joinery in [Location Name]", body (~80 words on serving that city), primary CTA, secondary CTA "See projects in [Location]"
   - Why local clients choose SteepWood — 4 mini-cards: workshop crafted in Newcastle, free measure visits to [Location], delivery + install by our team, [drive time] from our workshop
   - Services in [Location] — 10-card grid of all services, each linking to /[service]/[location]/
   - Recent projects — 4 portfolio_projects filtered where project.location matches OR is nearby (use a `nearbyLocations` array on each location)
   - Local testimonials — testimonials filtered by location_id matching this location, fallback to general top 3
   - Service area — visual map or text describing nearby suburbs covered from this hub. Use a `coveredSuburbs: string[]` field on each location (~15 suburbs each).
   - Location-specific FAQ — 4-6 FAQs about logistics, install time, travel cost for this city. (Can use a single shared FAQ set with {location} template variable replaced server-side.)
   - Final CTA

3. Structured data:
   - LocalBusiness (with addressLocality = [Location], areaServed = nearby suburbs)
   - BreadcrumbList (Home › Locations › [Location])
   - FAQPage

4. Internal linking:
   - Each of the 10 service cards links to /[service]/[location]/ (10 outbound links)
   - "Nearby locations" footer section with up to 5 nearest locations (e.g. Sydney → Wollongong, Central Coast, Newcastle, Canberra, Gold Coast)

Acceptance criteria:
- All 16 location hubs generate at build
- Each has 10 service links + ~5 nearby-location links
- LocalBusiness schema per location validates
- Australian English: "centre", "kilometres", "suburb"
```

**Files to create or modify:**
- `src/app/locations/[location]/page.tsx`
- `src/components/pages/LocationHubPage.tsx`
- `src/lib/seo/locationStructuredData.ts`

**Definition of Done:**
- [ ] 16 location URLs render
- [ ] Each links to its 10 service-combo pages
- [ ] LocalBusiness schema validates

---

### Task 3.7 — Build the Service+Location combo page template (`/[service]/[location]/`)

> **SEO content source:** Use the combo page template, worked examples (Sydney kitchens, Canberra office fitout), and JSON-LD schema from **Section 9.6 — Service+Location Combo Pages** (see also 9.3 formulas, 9.7 Schema library). Generate all 160 combos by following the template programmatically; the worked examples in 9.6 are the gold reference for tone and structure.

**Cursor Prompt:**

```
Context: The 160 service+location pages are the SEO workhorse — they target the highest-intent long-tail queries like "custom kitchen joinery Sydney" or "built-in wardrobes Newcastle". Each page must be unique enough to avoid Google's "Site Reputation Abuse" or doorway-pages penalty, while being templated enough to maintain at scale.

Strategy for uniqueness:
- 60% templated content (intro, process, what's included)
- 40% unique content per combo (location-specific opening paragraph, locally-relevant project highlights, location-specific FAQs, sibling/nearby cross-links)
- Optional service_locations.customIntro field allows hand-written overrides for top 20 priority combos

Task: Build src/app/[service]/[location]/page.tsx.

Steps:
1. File scaffolding with dynamicParams = false, revalidate = 86400, generateStaticParams returning all 160 pairs.

2. generateMetadata: title = `${service.title} in ${location.name}, ${location.state} | SteepWood`, description templated with both entities, canonical = /${service.slug}/${location.slug}/.

3. Page sections:
   - Hero — kicker "[Service] · [Location]", h1 = "[Service Title] in [Location Name]", body intro that uses service_locations.customIntro if present, else a templated 80-word intro with {service} and {location} interpolation. Primary CTA.
   - Local context (UNIQUE per combo) — 1 paragraph naming the location, drive time/delivery context, nearby suburbs served, a sentence about why we like working in this area (e.g. "Sydney's Federation-era homes offer beautiful proportions for handcrafted joinery..."). Can be templated with location.localContext field.
   - What we deliver — same 6-card "What's included" as service pillar, but customised heading ("[Service] in [Location] — what's included")
   - Recent [Service] projects in [Location] — portfolio_projects filtered by service AND (location OR nearby). If none for this specific location, show "Projects from across [region]" with nearby projects.
   - Why SteepWood for [Service] in [Location] — 3 trust pillars tailored: Newcastle-crafted, free measure visits to [Location], [drive time] delivery
   - Process — 4 steps, tailored copy
   - Local testimonials — filter by service AND/OR location
   - FAQ — 5 FAQs, location+service templated. Render FAQPage JSON-LD.
   - Sibling links — "Custom Kitchen Joinery in nearby cities" — links to up to 5 nearby /[service]/[other-location]/. "Other joinery services in [Location]" — links to up to 5 other /[other-service]/[location]/.
   - Final CTA

4. Structured data per page:
   - Service (offered in {areaServed: City})
   - LocalBusiness (with addressLocality = location)
   - BreadcrumbList (Home › [Service] › [Location])
   - FAQPage
   - AggregateRating — only render if testimonials count for this combo > 0

5. Anti-thin-content guardrail:
   - Each page must have ≥800 unique words after templating (the unique local context + unique projects + unique FAQ phrasing achieves this)
   - Build script that audits unique word count per page (Task 3.10)

Acceptance criteria:
- All 160 pages generate at build (verify `pnpm build` shows 160 /[service]/[location]/ routes)
- Average uniqueness score per page ≥40% (verify with diff tool)
- Each page has BreadcrumbList + Service + LocalBusiness + FAQPage schemas validating
- ≥10 internal links per page (siblings + nearby + parent)
- Lighthouse SEO = 100 on a 10-page sample
```

**Files to create or modify:**
- `src/app/[service]/[location]/page.tsx`
- `src/components/pages/ServiceLocationPage.tsx`
- `src/lib/seo/serviceLocationStructuredData.ts`

**Definition of Done:**
- [ ] 160 routes generate at build
- [ ] No route times out during `pnpm build` (each render must complete < 5s)
- [ ] Sample audit: 5 random pages have ≥800 unique words

---

### Task 3.8 — Build the dynamic sitemap.xml

**Cursor Prompt:**

```
Context: SteepWood needs a comprehensive sitemap covering all 188 pages (and growing as blog + projects are added in Phase 3). Next.js App Router exposes sitemap via src/app/sitemap.ts returning MetadataRoute.Sitemap[]. Google has a 50,000-URL limit per sitemap — we're well under, so a single sitemap suffices.

Task: Build src/app/sitemap.ts.

Steps:
1. Create src/app/sitemap.ts:

```typescript
import { MetadataRoute } from 'next';
import { env } from '@/env';
import { getAllServiceSlugs, getAllLocationSlugs, getAllServiceLocationPairs } from '@/lib/services-locations/resolvers';
import { prisma } from '@/lib/db/prisma';

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;
const now = () => new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about/`, lastModified: now(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact/`, lastModified: now(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/quote/`, lastModified: now(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/projects/`, lastModified: now(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/blog/`, lastModified: now(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/legal/privacy/`, lastModified: now(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/terms/`, lastModified: now(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/consumer-rights/`, lastModified: now(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: now(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const locationHubPages: MetadataRoute.Sitemap = getAllLocationSlugs().map((slug) => ({
    url: `${SITE_URL}/locations/${slug}/`,
    lastModified: now(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const serviceLocationPages: MetadataRoute.Sitemap = getAllServiceLocationPairs().map(({ service, location }) => ({
    url: `${SITE_URL}/${service}/${location}/`,
    lastModified: now(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic: blog posts + portfolio projects (Phase 3 adds DB rows)
  const blogPosts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const projects = await prisma.portfolioProject.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}/`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...locationHubPages, ...serviceLocationPages, ...blogPages, ...projectPages];
}
```

2. Set sitemap revalidate: in src/app/sitemap.ts, add `export const revalidate = 3600;` (refresh every hour, since blog and projects change frequently).

3. Verify XML output: `pnpm build && pnpm start`, visit http://localhost:3000/sitemap.xml. Should be a well-formed XML sitemap.

Acceptance criteria:
- /sitemap.xml returns valid XML
- Contains 188+ URLs (more once blog/projects exist)
- All URLs use trailing slash
- All URLs use HTTPS and the production domain (from env.NEXT_PUBLIC_SITE_URL)
- changefreq and priority set appropriately
- lastmod is ISO 8601 format
```

**Files to create or modify:**
- `src/app/sitemap.ts`

**Definition of Done:**
- [ ] /sitemap.xml validates at https://www.xml-sitemaps.com/validate-xml-sitemap.html
- [ ] URL count = 9 static + 10 services + 16 locations + 160 combos = 195 (plus dynamic blog/projects)
- [ ] Sitemap revalidates hourly

---

### Task 3.9 — Build the robots.txt

**Cursor Prompt:**

```
Context: robots.txt tells crawlers what they can and cannot access. Next.js exposes it via src/app/robots.ts. We allow all crawlers everywhere EXCEPT /admin/ (Phase 3) and /api/. We also point to the sitemap.

Task: Build src/app/robots.ts.

Steps:
1. Create src/app/robots.ts:

```typescript
import { MetadataRoute } from 'next';
import { env } from '@/env';

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/auth/'],
      },
      // Block AI scrapers that don't respect content licensing
      // (uncomment if user wants to block these)
      // {
      //   userAgent: 'GPTBot',
      //   disallow: '/',
      // },
      // {
      //   userAgent: 'CCBot',
      //   disallow: '/',
      // },
      // {
      //   userAgent: 'anthropic-ai',
      //   disallow: '/',
      // },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

2. Decide AI scraper policy with the user — default is to allow (more brand visibility in AI search results like Perplexity, ChatGPT) but some businesses block. Add the commented blocks for easy toggling.

Acceptance criteria:
- /robots.txt returns the correct rules
- Sitemap URL points to absolute https://steepwood.com.au/sitemap.xml
- /admin/, /api/, /_next/, /auth/ all disallowed
```

**Files to create or modify:**
- `src/app/robots.ts`

**Definition of Done:**
- [ ] /robots.txt renders correctly
- [ ] Sitemap discoverable via robots.txt directive

---

### Task 3.10 — Build a "thin content audit" script

**Cursor Prompt:**

```
Context: With 160 templated pages, there's risk of thin/duplicate content. Google penalises sites with near-identical pages targeting different cities (doorway pages). We need automated verification that each page has sufficient unique content.

Task: Build scripts/audit-content.ts — a CLI tool that fetches every page from a local dev server and reports word count, unique word ratio, and detect-duplicate-paragraph ratio.

Steps:
1. Install dev deps: `pnpm add -D tsx cheerio @types/cheerio`.

2. Create scripts/audit-content.ts:
   - Build a list of all 188+ URLs from the same resolvers used in sitemap.ts
   - For each URL, fetch http://localhost:3000{url}
   - Parse HTML with cheerio
   - Extract text from <main> only (skip header/footer which are duplicated by design)
   - Compute: total words, unique word count (after lowercasing, removing common stopwords), unique-paragraph hash count
   - Cross-reference: for each /[service]/[location]/ page, find which other combos have the most overlap
   - Output CSV: url, totalWords, uniqueWords, uniqueRatio, topDuplicate, duplicateOverlap%

3. Thresholds:
   - Flag pages where totalWords < 800
   - Flag pairs of pages where duplicateOverlap > 70%

4. Add to package.json: `"audit:content": "tsx scripts/audit-content.ts"`.

5. Run after Tasks 3.5, 3.6, 3.7 are complete to verify uniqueness. Iterate on `service_locations.customIntro` and per-location templated phrases until all pages clear the bar.

Acceptance criteria:
- `pnpm audit:content` runs against local dev server
- Outputs results.csv in workspace
- 0 pages flagged as <800 words
- 0 pairs with >70% duplicate overlap
```

**Files to create or modify:**
- `scripts/audit-content.ts`
- `package.json`

**Definition of Done:**
- [ ] Audit script runs cleanly
- [ ] All 160 pages pass both thresholds
- [ ] Audit script committed (`pnpm audit:content`); live crawl deferred to `STEEPWOOD-MANUAL-OPS.md`

---

### Task 3.11 — Add canonical, hreflang (en-AU), and Open Graph image generation

**Cursor Prompt:**

```
Context: Every page needs (1) a canonical URL to prevent duplicate-content issues from query params, (2) explicit en-AU language declaration, (3) a unique OG image for share-card appeal. Next.js 15 supports dynamic OG image generation via /app/[...]/opengraph-image.tsx using next/og (ImageResponse).

Task: Add canonical URLs to all pages and build a dynamic OG image generator.

Steps:
1. Verify every page (home, about, contact, service pillars, location hubs, combos) has `alternates: { canonical: ... }` in its metadata. The metadataBuilders.ts helpers already include this.

2. In src/app/layout.tsx, set the default html lang to "en-AU".

3. Create src/app/opengraph-image.tsx (default OG image for homepage):
   - Use ImageResponse from 'next/og'
   - Size: 1200×630
   - Layout: Fraunces "SteepWood" wordmark + tagline "Custom Joinery, Newcastle to Australia" on the Craft & Contrast palette
   - Use a system font or load Fraunces .ttf via fetch + ArrayBuffer
   - Export `export const runtime = 'edge';` and `export const alt = 'SteepWood — Premium Custom Joinery';`

4. Create src/app/[service]/opengraph-image.tsx:
   - Same template but interpolates service.title and service.shortDescription
   - Background image: service.heroImagePath served from /public/og-backgrounds/

5. Create src/app/[service]/[location]/opengraph-image.tsx:
   - Same template, interpolates both service and location names
   - "Custom Kitchen Joinery in Sydney"

6. Test by deploying a preview to Vercel (or `pnpm build && pnpm start`) and inspecting the og:image meta tag via OpenGraph.xyz or Facebook Sharing Debugger.

Acceptance criteria:
- All page-level OG images render at /[service]/opengraph-image (and /[service]/[location]/opengraph-image)
- og:image meta tag points to the dynamic URL
- Facebook Sharing Debugger renders the card correctly
- en-AU declared in <html lang="en-AU">
```

**Files to create or modify:**
- `src/app/opengraph-image.tsx`
- `src/app/[service]/opengraph-image.tsx`
- `src/app/[service]/[location]/opengraph-image.tsx`
- `src/app/layout.tsx` (verify lang)

**Definition of Done:**
- [ ] OG images generate dynamically for all dynamic routes
- [ ] og:locale = en_AU on all pages
- [ ] Sharing preview tested and looks polished

---

### Task 3.12 — Build the legal pages (Privacy, Terms, Australian Consumer Law)

**Cursor Prompt:**

```
Context: Australian businesses must publish Privacy Policy (covering Privacy Act 1988 + Australian Privacy Principles), Terms of Service, and an Australian Consumer Law statement (covering consumer guarantees for goods and services). Legal pages are also a trust signal — visible footer links increase conversion modestly.

These templates are starting points only. The user MUST have a lawyer review before launch — add a clear TODO comment in each file noting "Lawyer-reviewed copy required before public launch."

Task: Build src/app/legal/{privacy,terms,consumer-rights}/page.tsx.

Steps:
1. Create src/app/legal/layout.tsx with a narrow column wrapper (max-w-3xl), generous vertical padding, and a left-aligned table of contents.

2. /legal/privacy/page.tsx — Privacy Policy aligned to Australian Privacy Principles (APP 1-13):
   - Information we collect (contact info from forms, IP/cookies, project enquiries)
   - Why we collect (provide quotes, respond to enquiries, marketing if opted-in)
   - How we store (Supabase Australian region for personal data, encryption at rest)
   - Disclosure (only to contractors performing services, never sold)
   - Access and correction rights (how to email hello@steepwood.com.au to request)
   - Complaints (OAIC complaint process)
   - Cookies/analytics (GA4, Vercel Analytics — list each, opt-out instructions)
   - Last updated date

3. /legal/terms/page.tsx — Terms of Service:
   - Use of website
   - Intellectual property (designs, photos, copy belong to SteepWood)
   - Limitations of liability
   - Governing law (NSW)
   - Quote validity (90 days)
   - Variations and cancellations
   - Last updated date

4. /legal/consumer-rights/page.tsx — Australian Consumer Law statement:
   - Reference ACCC consumer guarantees
   - "Our goods come with guarantees that cannot be excluded under the Australian Consumer Law..."
   - Warranty information for our products (e.g. lifetime craftsmanship warranty, 10-year structural)
   - Repair/replace/refund rights
   - Link to ACCC and NSW Fair Trading
   - Last updated date

5. Add `TODO: Lawyer-reviewed copy required before public launch` comment at top of each file.

6. Render breadcrumbs (Home › Legal › [Page]).

Acceptance criteria:
- All 3 legal pages render at proper URLs
- Content is in Australian English with correct legal references (Privacy Act 1988, Australian Consumer Law, OAIC, ACCC, NSW Fair Trading)
- Footer links navigate to each correctly
- Lawyer-review TODO is visible in source comments
```

**Files to create or modify:**
- `src/app/legal/layout.tsx`
- `src/app/legal/privacy/page.tsx`
- `src/app/legal/terms/page.tsx`
- `src/app/legal/consumer-rights/page.tsx`

**Definition of Done:**
- [ ] All 3 pages render with placeholder content
- [ ] TODO comment present for lawyer review
- [ ] Australian-specific legal references included

---

### Phase 2 milestone tag

Once Tasks 3.1–3.12 complete:

- `git tag v0.2.0-phase-2`
- Deploy to Vercel preview branch
- Submit sitemap to Google Search Console (set up GSC property in Phase 4 — for now, just verify sitemap renders correctly in preview deploy)
- Run full Lighthouse audit on 20 random URLs — average score must be ≥95 across all categories



---

## SEO CONTENT KIT — LOCKED SOURCE OF TRUTH FOR ALL PAGE COPY

Every page you build in Phase 2 must pull its title, meta, H1, intro, sections, FAQs, and schema from the content kit below. Do not invent copy. If a field is not in the kit, ask before writing it.

# SECTION 9 — SEO CONTENT KIT

> **Purpose:** This section provides the actual SEO copy, metadata, FAQs, schema, and on-page content for every page type referenced in Sections 1–8. It is the single source of truth that **`src/lib/services-locations/services.ts`**, **`locations.ts`**, **`resolvers.ts`**, and **`metadataBuilders.ts`** (Section 3, task 3.2) draw from. Phase 2 tasks 3.5 (Service pillars), 3.6 (Location hubs), and 3.7 (Service+Location combos) should treat this section as canonical when populating React components, JSON-LD, and database `service_locations` rows.

> **Research basis:** Competitor analysis of [Urban Joinery Newcastle](https://urbanjoinery.com.au), [Touchwood Cabinets Melbourne](https://touchwoodcabinets.com.au), [Loughlin Furniture](https://loughlinfurniture.com.au), [Polytec](https://www.polytec.com.au), [Kinsman](https://www.kinsman.com.au), [Freedom Kitchens](https://www.freedomkitchens.com.au), [Bunnings Kaboodle](https://www.bunnings.com.au), [Houzz AU directory](https://www.houzz.com.au); ABS Census 2021 income and dwelling-approval data per city; [hipages.com.au](https://hipages.com.au), [tradeheroes.com.au](https://www.tradeheroes.com.au), [focusshopfit.com.au](https://focusshopfit.com.au), [totalfitouts.com.au](https://www.totalfitouts.com.au), [stairworks.com.au](https://www.stairworks.com.au), [buildmat.com.au](https://www.buildmat.com.au), [hubinteriors.com.au](https://hubinteriors.com.au) for pricing benchmarks; [BrightLocal AU citation index](https://www.brightlocal.com/resources/top-citation-sites/location/australia/) and [Distl AU GBP 2025 guide](https://distl.com.au/insights/google-business-profile-optimisation-australia-2025/) for local SEO.

---

## 9.0 Strategic Findings Driving This Content

Before the copy, the four insights that shape every page:

1. **The Newcastle local pack is winnable in 3–6 months.** [Urban Joinery](https://urbanjoinery.com.au) — Steepwood's only direct Newcastle competitor — runs under 20 indexed pages, no schema, no meta descriptions, and ~897 visible content characters site-wide. None of the four established Newcastle cabinet makers ([GJ Morgan Kitchens](https://www.houzz.com/professionals/cabinets/newcastle-02-au-probr0-bo~t_11829~r_2155472), [Magnet Joinery](https://magnetjoinery.com.au), Vista Kitchens, Sheldon's Timber Kitchens) has deployed full LocalBusiness + Service + FAQ + Review schema. Steepwood can be the first.

2. **No competitor has a cost or pricing guide page** — Reddit threads and [hipages.com.au](https://hipages.com.au/article/how_much_does_kitchen_cabinetry_cost) rank instead. A transparent per-linear-metre and per-sqm cost guide for each service captures the highest-intent traffic in the market.

3. **The only competitor with a service × suburb grid is [Touchwood](https://touchwoodcabinets.com.au)**, which uses formulaic ~700-word content and zero schema across 15+ Melbourne suburb pages. Steepwood's 160 combo pages, with unique location nuance and schema, outrank that approach on every signal Google rewards.

4. **"Sydney" alone is too broad.** Don't try to rank for "kitchen joinery Sydney" with one page — create suburb-cluster sub-pages (Northern Beaches, Mosman/North Shore, Inner West, Upper North Shore) as Phase 5 expansion. For now, the Sydney location hub treats the suburb list as primary content depth.

---

## 9.1 The 16 Locations — Final List & Tier Strategy

| Tier | Location | Slug | State | Region | Priority |
|---|---|---|---|---|---|
| 1 | Newcastle | `newcastle` | NSW | NSW Coastal | HQ — local pack target |
| 1 | Sydney | `sydney` | NSW | Capital City | Highest volume; suburb sub-pages later |
| 1 | Canberra | `canberra` | ACT | Capital City | High-income, low joinery competition |
| 1 | Melbourne | `melbourne` | VIC | Capital City | High volume; Touchwood competition |
| 2 | Central Coast | `central-coast` | NSW | NSW Coastal | Newcastle neighbour, ~1hr |
| 2 | Hunter Valley | `hunter-valley` | NSW | NSW Inland | Local — wine country premium homes |
| 2 | Gold Coast | `gold-coast` | QLD | Capital City | High-income coastal |
| 2 | Wollongong | `wollongong` | NSW | NSW Coastal | Sydney spillover; ~3.5hr from HQ |
| 2 | Brisbane | `brisbane` | QLD | Capital City | High volume |
| 2 | Perth | `perth` | WA | Capital City | High volume; limited east-coast competition |
| 3 | Byron Bay | `byron-bay` | NSW | NSW Coastal | Affluent lifestyle market |
| 3 | Port Macquarie | `port-macquarie` | NSW | NSW Coastal | Sea-change destination |
| 3 | Coffs Harbour | `coffs-harbour` | NSW | NSW Coastal | Mid-north coast hub |
| 3 | Adelaide | `adelaide` | SA | Capital City | Capital coverage |
| 3 | Bathurst | `bathurst` | NSW | NSW Inland | $20M fast-track growth zone; Federation heritage |
| 3 | Orange | `orange` | NSW | NSW Inland | Wine country, $1,641 pw income, low competition |

> **Why these and not Tamworth/Armidale:** ABS 2021 Census shows Bathurst median household income of $1,641 pw (vs Tamworth $1,416) and Orange $1,641 pw (vs Armidale $1,404), plus the NSW Government's $20M Bathurst fast-track infrastructure program signals near-term construction growth. Both Bathurst and Orange have minimal premium joinery competition versus the saturated New England market.

> **Phase 5 expansion (post-launch — not in initial 16):** Sydney suburb cluster pages: Northern Beaches, Mosman / North Shore, Inner West (Balmain/Rozelle), Upper North Shore (Wahroonga/Killara). Melbourne suburb pages: Toorak, Brighton, South Yarra, Camberwell.

---

## 9.2 The 10 Services — Final Slugs & Primary Keywords

| Service Slug | Primary Keyword | Monthly AU Volume | CPC | Phase 2 Build Priority |
|---|---|---|---|---|
| `custom-kitchen-joinery` | custom kitchen joinery | 2,400–4,400 | $4–$8 | 1 |
| `built-in-wardrobes` | built-in wardrobes | 4,400–8,100 | $3–$6 | 2 |
| `office-fitout` | office fitout | 2,400–4,400 | $8–$15 | 3 |
| `shopfitting` | shopfitting | 1,300–2,400 | $5–$10 | 4 |
| `custom-bathroom-vanity` | custom bathroom vanity | 2,400–4,400 | $3–$6 | 5 |
| `commercial-joinery` | commercial joinery | 1,300–2,400 | $5–$12 | 6 |
| `custom-furniture` | custom furniture Australia | 1,900–3,600 | $2–$5 | 7 |
| `home-office-joinery` | home office joinery | 800–1,600 | $3–$6 | 8 |
| `laundry-cabinets` | laundry cabinets | 1,600–2,900 | $2–$5 | 9 |
| `staircase-joinery` | timber staircase | 1,300–2,400 | $3–$6 | 10 |

---

## 9.3 Universal Title, Meta, H1 Formulas

These formulas drive `metadataBuilders.ts` (Section 3, task 3.2). Implementers must follow the character limits exactly — they are enforced by tests in Phase 4.

### 9.3.1 Service pillar pages (`/[service]/`)

- **Title (≤60 chars):** `Custom [Service Name] Australia | SteepWood Joinery`
  - Example: `Custom Kitchen Joinery Australia | SteepWood Joinery` (51 chars)
- **Meta description (150–160 chars):** `Custom [service] designed and built in our Newcastle workshop. Premium materials, fixed-price quotes, delivered Australia-wide. Free design consultation.`
  - Example for kitchens (155 chars): `Custom kitchen joinery designed and built in our Newcastle workshop. Premium 2pac, Caesarstone, Blum hardware. Free design consultation Australia-wide.`
- **H1:** `Custom [Service Name] — Handcrafted in Newcastle, Delivered Australia-Wide`
- **OG image:** `/og/services/[service-slug]-og.jpg` (1200×630, branded with service name overlay)

### 9.3.2 Location hub pages (`/locations/[location]/`)

- **Title (≤60 chars):** `Custom Joinery [Location] [State] | SteepWood`
  - Example: `Custom Joinery Sydney NSW | SteepWood` (37 chars)
- **Meta description (150–160 chars):** `Custom kitchens, wardrobes and bespoke joinery for [Location] homes. Newcastle-crafted, [drive-time] from our workshop. Free in-home consultation.`
  - Example for Sydney (151 chars): `Custom kitchens, wardrobes and bespoke joinery for Sydney homes. Newcastle-crafted, 2hr from our workshop. Free in-home design consultation and quote.`
- **H1:** `Custom Joinery in [Location] — Bespoke Kitchens, Wardrobes & Cabinetry`
- **OG image:** `/og/locations/[location-slug]-og.jpg` (1200×630, branded with location skyline silhouette)

### 9.3.3 Service + Location combo pages (`/[service]/[location]/`)

- **Title (≤60 chars):** `[Service Short] [Location] | SteepWood Joinery`
  - Example: `Custom Kitchens Sydney | SteepWood Joinery` (42 chars)
  - Service short forms (for title brevity):
    - custom-kitchen-joinery → `Custom Kitchens`
    - built-in-wardrobes → `Built-In Wardrobes`
    - office-fitout → `Office Fitout`
    - shopfitting → `Shopfitting`
    - custom-bathroom-vanity → `Custom Vanities`
    - commercial-joinery → `Commercial Joinery`
    - custom-furniture → `Custom Furniture`
    - home-office-joinery → `Home Office Joinery`
    - laundry-cabinets → `Laundry Cabinets`
    - staircase-joinery → `Timber Staircases`
- **Meta description (130–160 chars):** `[Service short] in [Location] by SteepWood. Newcastle-crafted, 20+ years experience. Premium materials, fixed-price quote. Free design consultation.`
- **H1:** `[Service Name] in [Location] — Custom, Crafted, Delivered`
- **OG image:** dynamically composited; service hero + location text overlay

> **Character-count guardrails:** When location names exceed 12 chars (e.g. "Port Macquarie", "Central Coast"), drop the state abbreviation from the title. The Phase 2 build must include a unit test that fails any generated title > 60 chars or meta < 130 / > 160 chars.

---

## 9.4 Service Pillar Content — All 10 Services

For each service: page title, meta, H1, intro (300–400 words, Australian English), key feature bullets, 8 FAQs (with FAQPage JSON-LD), service-specific schema, and internal link map. Phase 2 task 3.5 implementers should paste these blocks into the service pillar component, replacing placeholder copy.

### 9.4.1 Custom Kitchen Joinery (`/custom-kitchen-joinery/`)

**Title:** Custom Kitchen Joinery Australia | SteepWood Joinery
**Meta:** Custom kitchen joinery designed and built in our Newcastle workshop. Premium 2pac, Caesarstone, Blum hardware. Free design consultation Australia-wide.
**H1:** Custom Kitchen Joinery — Handcrafted in Newcastle, Delivered Australia-Wide
**Primary keyword:** custom kitchen joinery
**Secondary:** kitchen cabinet maker, custom kitchen cabinets Australia, bespoke kitchen joinery, kitchen joinery design
**Word count target:** 1,800–2,400 words

**Intro (drop into hero/below-fold):**

A well-designed kitchen is the centrepiece of every Australian home — and getting the joinery right is what separates a kitchen that works beautifully from one that merely looks the part. At SteepWood we specialise in custom kitchen joinery built to your exact specifications: your layout, your storage needs, your materials, and your style. No catalogues, no compromises, no standard sizing squeezed into spaces that need something better.

Custom kitchen joinery starts with a genuine understanding of how your household actually uses the kitchen. Are you cooking for a family of six, hosting dinner parties, or running a busy household that needs serious storage and hard-wearing surfaces? Every one of those scenarios demands different cabinet configurations, different hardware choices, and different door finishes. When you work with a custom kitchen joiner rather than a flatpack supplier, you get a team that measures your space precisely, designs around your life, and builds cabinetry that fits — floor to ceiling, wall to wall, corner to corner.

Our kitchens are manufactured in Newcastle using premium materials: Laminex and Polytec decorative panels, 2pac polyurethane door finishes, Caesarstone and Smartstone benchtops, and Blum hardware throughout. Whether you want a classic Hamptons kitchen with shaker profile doors and stone benchtops, a sleek contemporary space with handleless cabinetry in a deep charcoal, or a warm coastal kitchen built around natural timber tones and Tasmanian oak accents, we have the craftsmanship and the supplier relationships to make it happen.

We work across Newcastle, Sydney, Melbourne, Brisbane, Perth, and 12 more Australian cities — servicing new builds, full renovations, and kitchen-only refurbishments. Our process is straightforward: a free in-home consultation, a detailed design render, a fixed-price quote, and a manufacturing timeline you can plan around. Most custom kitchen projects are installed within 8 to 14 weeks of deposit.

If you have been comparing quotes and wondering why the prices vary so widely, read our [kitchen joinery cost guide](#cost-guide) for a clear breakdown of what drives price differences in the Australian market — and what you should always ask before signing with any cabinet maker.

**H2 sections required (in order):**
1. What Is Custom Kitchen Joinery?
2. Our Kitchen Joinery Process (consultation → design → measure → manufacture → install)
3. Kitchen Cabinet Materials & Finishes (Laminex, Polytec, 2pac, vinyl wrap, veneer, solid timber)
4. Benchtop Options (Caesarstone, Smartstone, Essastone, porcelain, natural stone)
5. Kitchen Hardware & Accessories (Blum drawer runners, Hettich hinges, soft-close, pull-out pantry)
6. Design Styles We Build (Hamptons, Scandi, contemporary, industrial, coastal, federation)
7. Custom Kitchen Cost Guide (Budget $15k–$25k, mid $25k–$55k, luxury $55k–$120k+)
8. Why Choose a Local Custom Joiner Over a National Brand?
9. Our Work (portfolio grid)
10. Service Areas (link to 16 location hubs)

**FAQs (with FAQPage schema):**
1. **How much does custom kitchen joinery cost in Australia?** Custom kitchens range from $15,000 for a small budget kitchen with laminate doors and laminate tops, through to $120,000+ for a luxury kitchen with 2pac doors, stone benchtops, and butler's pantry. Most SteepWood kitchens fall between $35,000 and $75,000 ([hipages.com.au cost benchmarks](https://hipages.com.au/article/how_much_does_kitchen_cabinetry_cost)).
2. **How long does it take to build a custom kitchen?** From deposit to installation: typically 8 to 14 weeks. Design and approvals take 2–3 weeks; manufacturing 6–8 weeks; installation 3–7 days.
3. **What is the difference between 2pac and polyurethane?** 2pac is a two-pack polyurethane — the same family of finish, sprayed in our spray booth for a hard, uniform finish. "Polyurethane" generally refers to the same material; the term "2pac" is the trade name. Both are durable, washable, and available in any colour from Dulux, Resene, or Polytec palettes.
4. **Can you match my kitchen joinery to my benchtop material?** Yes. We carry samples from Caesarstone, Smartstone, Essastone, Quantum Quartz, Polytec, and Laminex, and we coordinate door colour, benchtop, and splashback during the design stage.
5. **Do you supply and install appliances?** We design around your chosen appliances (or recommend Westinghouse, Bosch, Miele, Smeg, Fisher & Paykel depending on budget) and install joinery to suit. Appliance supply is optional — many clients prefer to source independently.
6. **What warranties do you offer on kitchen joinery?** 10-year structural warranty on joinery, 25-year Blum hardware warranty (manufacturer-backed), benchtop warranties per supplier (Caesarstone offers a 25-year residential warranty).
7. **Can you work with an existing floor plan, or does the whole kitchen need to change?** Both. We do straight cabinetry replacements within an existing footprint, and we also redesign full layouts in partnership with builders and architects.
8. **What is the minimum space needed for a kitchen island?** 1,000 mm clear walkway on every side of the island is the practical minimum; 1,200 mm is ideal. Total island width including bench: from 900 mm for a small prep island, up to 1,500–1,800 mm for an island with seating.

**Schema (Service + FAQPage):** see § 9.7.

**Internal link map (in body and footer):**
→ [Built-In Wardrobes](/built-in-wardrobes/) (most common cross-sell)
→ [Custom Bathroom Vanity](/custom-bathroom-vanity/)
→ [Laundry Cabinets](/laundry-cabinets/)
→ [Home Office Joinery](/home-office-joinery/)
→ [Custom Furniture](/custom-furniture/)
→ 16 location combos: `/custom-kitchen-joinery/[location]/`

---

### 9.4.2 Built-In Wardrobes & Walk-In Robes (`/built-in-wardrobes/`)

**Title:** Built-In Wardrobes & Walk-In Robes | SteepWood
**Meta:** Custom built-in wardrobes and walk-in robes designed for your space. Polytec, 2pac, Blum hardware. Free in-home consultation Australia-wide.
**H1:** Built-In Wardrobes & Walk-In Robes — Custom Wardrobe Joinery
**Primary keyword:** built-in wardrobes (4,400–8,100/mo)
**Secondary:** walk-in robe, custom wardrobes Australia, wardrobe joinery, sliding wardrobe doors Australia
**Word count target:** 1,600–2,200 words

**Intro:**

A well-planned built-in wardrobe or walk-in robe does far more than store your clothes — it sets the tone for your bedroom, streamlines your morning routine, and adds measurable value to your property. At SteepWood we design and build custom wardrobe joinery across Australia: from compact bedroom built-ins that make every centimetre count, to luxury walk-in robes with island benches, integrated lighting, and full-height mirror panels.

Every wardrobe we build is made to measure. That means no awkward gaps at the ceiling, no pre-determined shelf heights that don't suit your wardrobe, and no standard door widths that leave you fighting for the last few centimetres of hanging space. We start by understanding how you actually use your robe — how much hanging space you need, whether you fold or hang, and whether you'd like drawers inside the wardrobe or a separate freestanding chest. Then we design around that reality.

Our built-in wardrobes are manufactured using premium Polytec and Laminex panels, finished in melamine, 2pac gloss, matt, or veneer. Door styles include sliding, hinged, and bi-fold in a range of profiles — from frameless minimalist to full-profile Hamptons shaker. Internal fittings are sourced from Blum: their soft-close drawer runners, LED lighting systems, and pull-out accessories are the gold standard in Australian cabinetry for a reason.

For customers considering a walk-in robe, we help with layout planning from the outset — advising on the minimum width of 1,500 mm for a comfortable single-sided WIR, through to full U-shaped dressing rooms with island bench, mirrors, and charging stations. Walk-in robes in Australia typically start around $10,000 to $15,000 for a basic fit-out and scale up to $30,000 or more for a fully bespoke dressing room ([tradeheroes.com.au pricing benchmarks](https://www.tradeheroes.com.au/blog/how-much-does-wardrobe-installation-cost-in-australia)).

We serve homeowners, builders, and interior designers across Newcastle, Sydney, Melbourne, Brisbane, Perth, Adelaide, and 10 more cities. Free in-home consultation and design quote — no obligation.

**H2 sections required:**
1. Built-In Wardrobes vs Walk-In Robes — What's the Difference?
2. Walk-In Robe Sizes and Layouts (minimum 1,500 mm width; L-shape, U-shape, straight; island bench)
3. Door Styles (sliding, hinged, bi-fold, frameless)
4. Wardrobe Materials and Finishes (melamine, 2pac, veneer, solid timber)
5. Internal Wardrobe Fittings (short hang, long hang, drawers, jewellery inserts, shoe racks)
6. Wardrobe Hardware (Blum runners, soft-close hinges, mirror integration, LED)
7. Cost Guide for Built-In Wardrobes (basic $1,000–$2,500; custom $3,000–$7,500; walk-in $10k–$30k+)
8. Design Gallery (Hamptons, contemporary, minimal, coastal)
9. Our Process (consultation, design, manufacture, install; 4–8 weeks)
10. Service Areas

**FAQs:**
1. **How much does a built-in wardrobe cost in Australia?** Standard built-ins: $1,000–$2,500 per linear metre. Custom robes with internal drawers and LED: $3,000–$7,500. Walk-in robes: $10,000–$30,000+ ([tradeheroes.com.au](https://www.tradeheroes.com.au/blog/how-much-does-wardrobe-installation-cost-in-australia)).
2. **What is the minimum width for a walk-in robe?** 1,500 mm clear width for a single-sided WIR; 2,200 mm for a double-sided WIR with hanging on both walls and a 900 mm walkway.
3. **Is it cheaper to build custom wardrobes or buy flatpack?** Flatpack (IKEA PAX) is cheaper upfront — $800–$1,500 for a comparable run. Custom is $3,000+. The trade-off is lifetime durability, ceiling-height usage, and a finish that holds up to daily wear. Custom typically pays back through resale value on a quality home.
4. **What materials are used for built-in wardrobes?** Carcasses: Laminex/Polytec melamine. Doors: 2pac polyurethane, melamine, veneer, or solid timber. Hardware: Blum drawer runners and hinges.
5. **How long does it take to install built-in wardrobes?** Design to install: 4–8 weeks. On-site installation typically 1–2 days.
6. **Do built-in wardrobes add value to a home?** Yes — agents consistently cite quality joinery as a value-add. A $5,000 wardrobe upgrade typically returns $8,000–$12,000 at sale in mid-tier markets.
7. **What is the difference between a built-in wardrobe and a walk-in robe?** A built-in wardrobe is closed cabinetry with doors against a wall; a walk-in robe is a dedicated room with internal joinery. Walk-ins suit larger bedrooms; built-ins maximise smaller rooms.
8. **Can I get a wardrobe with integrated lighting and charging points?** Yes — Blum SERVO-DRIVE LED, motion-sensor strip lighting, and integrated USB-C/AC power points are standard options.

**Internal links:**
→ [Custom Kitchen Joinery](/custom-kitchen-joinery/)
→ [Custom Bathroom Vanity](/custom-bathroom-vanity/) (often paired in master suite renos)
→ [Custom Furniture](/custom-furniture/) (bedheads, ottomans)
→ 16 location combos: `/built-in-wardrobes/[location]/`

---

### 9.4.3 Office Fitout (`/office-fitout/`)

**Title:** Office Fitout Australia | SteepWood Commercial
**Meta:** Complete office fitouts with bespoke joinery — reception desks, breakout joinery, meeting rooms. Sydney, Melbourne, Newcastle. Fixed-price project management.
**H1:** Office Fitout — Workplace Design & Custom Joinery Across Australia
**Primary keyword:** office fitout (2,400–4,400/mo; CPC $8–$15)
**Secondary:** office fit out, office fitout company, commercial office fitout, workplace fitout
**Word count target:** 1,800–2,400 words (B2B audience expects depth)

**Intro:**

An office fitout is one of the most significant investments a business makes in its workplace culture and productivity. Done well, a fitout energises your team, impresses clients, and supports the way your people actually work. Done poorly — or chosen purely on the basis of lowest price — it can be a source of daily frustration, cramped spaces, inadequate storage, and a brand presentation that undersells your business.

At SteepWood we plan and deliver complete office fitouts for businesses of all sizes across Australia: from start-ups fitting out their first space, to established firms relocating to new premises, to large corporates refurbishing existing offices to support new ways of working. Our team handles the full scope: workplace strategy, design, documentation, custom joinery, partitioning, flooring, lighting, and acoustic treatments.

We are specialists in the joinery elements that define a quality fitout — reception desks, breakout kitchen joinery, boardroom credenzas, storage walls, and meeting room cabinetry. These are the pieces that carry your brand identity and see the most daily use. We manufacture in Newcastle using commercial-grade Laminex and Polytec panels, solid surface tops, and Blum and Häfele hardware, and we finish to the same standard we bring to residential work.

Office fitout costs in Australia typically range from $800 to $3,000+ per square metre, depending on city, finish level, and the extent of structural work required ([hubinteriors.com.au cost guide](https://hubinteriors.com.au/journal/how-much-does-an-office-fitout-cost/), [totalfitouts.com.au 2025 pricing](https://www.totalfitouts.com.au/blog/2025-pricing-per-square-meter-m%C2%B2-for-fitouts-in-australia/)). Sydney and Melbourne sit at the upper end; Perth and Adelaide offer slightly lower rates. A basic open-plan refresh may be achievable under $1,000 per sqm; a premium fitout with custom joinery, quality finishes, and advanced acoustic treatment will sit from $2,500 upward.

We provide fixed-price contracts, detailed project programmes, and a single point of contact for every project. Contact us to discuss your office fitout brief.

**H2 sections required:**
1. What Does an Office Fitout Include?
2. Types of Office Fitout (cold shell, warm shell, full turnkey)
3. Workplace Design Trends (agile, activity-based working, biophilic)
4. Office Joinery — Reception Desks, Breakout, Meeting Rooms
5. Partitioning, Acoustics, Privacy Solutions
6. Flooring, Lighting, Ceiling Systems
7. Cost Guide — $800–$3,000+ per sqm
8. Our Process and Project Management
9. Portfolio (with sqm + budget data)
10. Service Areas

**FAQs:**
1. **How much does an office fitout cost per square metre in Australia?** Basic refresh: $800–$1,200/sqm. Mid-range: $1,200–$2,000/sqm. Premium: $2,000–$3,000+/sqm. Sydney/Melbourne premium; Perth/Adelaide ~10–15% lower ([totalfitouts.com.au](https://www.totalfitouts.com.au/blog/2025-pricing-per-square-meter-m%C2%B2-for-fitouts-in-australia/)).
2. **What is included in an office fitout?** Demolition, partitioning, electrical, joinery (reception, kitchen, storage), flooring, ceiling, lighting, acoustic treatment, paint, signage, and IT cabling co-ordination.
3. **How long does an office fitout take?** Typical 200–500 sqm fitout: 6–12 weeks from contract. Design and approvals: 3–4 weeks. Construction: 4–8 weeks. Large or council-permit-required: 16+ weeks.
4. **What is the difference between a warm shell and cold shell fitout?** Cold shell: bare concrete, no services, no ceiling. Warm shell: services stubbed in, basic ceiling and floor. Turnkey: full fitout to occupancy.
5. **Do I need a permit for an office fitout?** Cosmetic works (paint, carpet, joinery): usually no permit. Structural, fire-rated wall changes, or change-of-use: council development application required. We manage the certification process.
6. **How do I find a reliable office fitout company?** Check HIA or MBA membership, public liability insurance ($20m minimum), commercial portfolio, fixed-price contract willingness, and direct trade references from completed projects.
7. **What is agile workplace design?** A workplace where staff don't have fixed desks — instead, a mix of focus zones, collaboration areas, and quiet rooms. Suits hybrid-work organisations with <70% daily attendance.
8. **Can I claim an office fitout as a tax deduction in Australia?** Fitout depreciation falls under Division 43 (capital works, 2.5% over 40 years) and Division 40 (plant & equipment, varying lives). Consult your accountant; we provide an itemised depreciation schedule with every project.

**Internal links:**
→ [Commercial Joinery](/commercial-joinery/)
→ [Shopfitting](/shopfitting/)
→ [Home Office Joinery](/home-office-joinery/)
→ 16 location combos: `/office-fitout/[location]/` (Sydney, Melbourne, Brisbane, Canberra are highest priority)

---

### 9.4.4 Shopfitting (`/shopfitting/`)

**Title:** Shopfitting & Retail Joinery Australia | SteepWood
**Meta:** Custom shopfitting and retail joinery — fashion, hospitality, pharmacy, beauty, medical. Sydney, Melbourne, Brisbane. Fixed-price fitouts.
**H1:** Shopfitting & Retail Joinery — Custom Shop Fitouts Across Australia
**Primary keyword:** shopfitting (1,300–2,400/mo)
**Secondary:** shopfitter, retail fitout, retail joinery, shop fit out company
**Word count target:** 1,500–2,000 words

**Intro:**

Your retail environment is your brand made physical. Before a customer picks up a product or speaks to your staff, your shopfit has already communicated whether your brand is premium or budget, considered or careless, worth their time or just another shop. At SteepWood we design and build custom shopfitting and retail joinery for businesses across Australia — from boutique fashion stores and specialty cafes, to pharmacies, medical centres, beauty salons, and flagship retail spaces.

Shopfitting is more than assembling shelves and a counter. It is the precise integration of custom joinery, lighting, flooring, signage, and customer flow — all executed to a brief that reflects your brand, meets your landlord's conditions, complies with council requirements, and opens on time. We manage the full process: initial concept design, documentation for landlord and council approval, manufacture of custom joinery, co-ordination of trades, and on-site installation.

Our retail joinery is manufactured in Newcastle using commercial-grade Laminex and Polytec panels, CNC-routed MDF profiles, solid surface counters, and custom metal fixtures where the brief demands them. We work to planograms and brand style guides, and we are experienced in replicating a fitout across multiple store locations when rollout consistency is required.

Shop fitout costs in Australia vary widely by scope and finish level. Basic retail fitouts: $400 to $800 per square metre; mid-range custom with bespoke joinery: $800 to $1,500 per sqm; premium luxury fitouts with imported finishes and architectural metalwork can exceed $3,000 per sqm ([focusshopfit.com.au 2026 price guide](https://focusshopfit.com.au/the-quintessential-2026-price-guide-for-shop-fitout-in-australia/)). Most established retail fitouts fall in the mid-range tier.

Contact SteepWood to discuss your retail fitout brief. Free initial consultations, fixed-price quotes, clear programme timelines.

**H2 sections required:**
1. What Is Shopfitting?
2. Types of Retail Joinery (POS counters, display units, shelving, showcases)
3. Sectors We Fitout (fashion, hospitality, pharmacy, medical, beauty)
4. Bespoke vs Off-the-Shelf Retail Fixtures
5. Working to a Brand Style Guide and Planogram
6. Landlord Approvals and Council Compliance
7. Cost Guide — $400–$3,000+/sqm
8. Our Process (brief, design, documentation, construction, fit-off)
9. Portfolio
10. Service Areas

**FAQs:**
1. **How much does a shop fitout cost in Australia?** Basic: $400–$800/sqm. Mid: $800–$1,500/sqm. Premium: $1,500–$3,000+/sqm ([focusshopfit.com.au](https://focusshopfit.com.au/the-quintessential-2026-price-guide-for-shop-fitout-in-australia/)). A 100 sqm boutique with custom joinery typically lands $80k–$150k.
2. **What is the difference between a shopfitter and a builder?** A shopfitter specialises in tenancy-scale fitouts, fixtures, joinery, and retail-specific compliance (POS, lighting, customer flow). A builder typically handles whole-building construction. Shopfitters often work within landlord-approved scope; builders carry broader construction licensing.
3. **How long does a typical shop fitout take?** Boutique fitout (50–150 sqm): 4–8 weeks. Larger flagship (>300 sqm): 10–16 weeks. Cafe/hospitality with kitchen exhaust: add 2–4 weeks for council approvals.
4. **Do I need council or landlord approval for a shop fitout?** Landlord approval (via the centre management or building owner) is almost always required. Council DA only triggers for structural changes, signage above certain sizes, or change-of-use applications. We manage both.
5. **What is included in custom retail joinery?** POS counter, display fixtures, shelving systems, wall panelling, back-of-house storage, change rooms (for fashion), product display showcases — all designed to brand standards.
6. **How do I choose the right shopfitter?** Look for: completed retail portfolio in your sector, public liability $20m+, MBA or HIA membership, willingness to provide fixed-price quote, and references you can call directly.
7. **Can a shopfitter work to a brand style guide?** Yes — we routinely receive brand bibles from franchise and chain retailers and execute to planogram. CAD files, colour codes, and brand-mandated suppliers all incorporated.
8. **What warranty should I expect from a shopfitter?** 10-year structural joinery, 12-month builders' warranty on workmanship, manufacturer warranties on hardware (Blum 25yr), and statutory warranties under Australian Consumer Law.

**Internal links:**
→ [Commercial Joinery](/commercial-joinery/)
→ [Office Fitout](/office-fitout/)
→ [Custom Furniture](/custom-furniture/)
→ 16 location combos: `/shopfitting/[location]/`

---

### 9.4.5 Custom Bathroom Vanity (`/custom-bathroom-vanity/`)

**Title:** Custom Bathroom Vanity Joinery | SteepWood
**Meta:** Custom bathroom vanities — floating, freestanding, double-bowl. HMR construction, 2pac and timber finishes. Newcastle-crafted, Australia-wide.
**H1:** Custom Bathroom Vanity Joinery — Handcrafted Vanities & Bathroom Cabinets
**Primary keyword:** custom bathroom vanity (2,400–4,400/mo)
**Secondary:** bathroom vanity cabinet maker, floating bathroom vanity, bathroom joinery
**Word count target:** 1,400–1,800 words

**Intro:**

The bathroom vanity is the most demanding piece of joinery in any home. It lives in a permanently humid environment, it is used multiple times a day, and it is one of the first things buyers notice during an inspection. Getting it right — with the right materials, the right finish, and the right dimensions — makes a genuine difference to both daily life and property value.

At SteepWood we build custom bathroom vanity joinery for homes across Australia. Every vanity is made to measure: your width, your height, your configuration, your finish. Whether you want a floating Hamptons-style double vanity in white 2pac with brushed-brass tapware and a Smartstone top, or a warm timber vanity in Tasmanian oak with an undermount basin and integrated storage, we have the joinery skills and material knowledge to deliver it.

Our vanities are built to last in wet environments. We use moisture-resistant HMR MDF or solid hardwood as the base material — never standard particleboard — and seal all surfaces before fitting. Door finishes include polyurethane, 2pac, and premium Laminex HMR panels, all of which resist the repeated humidity cycles that degrade lower-quality vanities within a few years. Hinges and drawer systems are Blum throughout, with soft-close as standard.

Custom bathroom vanity pricing in Australia starts at around $1,500 for a basic single vanity, through to $3,000–$5,000 for a larger custom design with a stone top ([buildmat.com.au pricing](https://www.buildmat.com.au/blogs/building-renovating-tips/how-much-are-bathroom-cabinets-and-what-affects-the-price)). Comparable to or less than many off-the-shelf premium vanities, but made exactly to your space and style.

We coordinate directly with your plumber and tiler to ensure the joinery sequence works with the broader bathroom renovation timeline. Typical lead time from deposit to installation: three to six weeks.

**H2 sections required:**
1. What Is Custom Bathroom Vanity Joinery?
2. Vanity Types (floating, freestanding, built-to-floor; single vs double bowl; shaving cabinet)
3. Materials for Bathroom Cabinets (HMR MDF, solid timber, Laminex HMR; why standard MDF fails)
4. Timber Vanity Designs (Tasmanian oak, Blackbutt, Spotted Gum; grain matching; sealing)
5. Benchtop and Basin Integration (Caesarstone, Smartstone; undermount vs above-counter)
6. Door Styles and Hardware (shaker, slab, reeded, fluted; Blum)
7. Cost Guide ($1,500 basic → $5,000+ custom with stone)
8. Portfolio
9. Process (measure → design → manufacture → plumber co-ordination; 3–6 weeks)
10. Service Areas

**FAQs:**
1. **How much does a custom bathroom vanity cost in Australia?** Basic single vanity: $1,500–$2,500. Custom with stone top: $2,500–$5,000. Double vanity with full storage: $4,000–$8,000+ ([buildmat.com.au](https://www.buildmat.com.au/blogs/building-renovating-tips/how-much-are-bathroom-cabinets-and-what-affects-the-price)).
2. **What is the best wood for bathroom vanity cabinets in a humid climate?** Tasmanian oak, Blackbutt, and Spotted Gum all perform well when properly sealed. Avoid raw pine or untreated MDF. We use HMR (high moisture-resistant) MDF for carcasses and seal all timber surfaces with marine-grade polyurethane.
3. **Can a cabinet maker build a bathroom vanity with a stone top?** Yes — we partner with Caesarstone, Smartstone, Essastone, and Quantum Quartz fabricators to template, cut, and install stone tops as part of the vanity package.
4. **What is the difference between a wall-hung and freestanding vanity?** Wall-hung (floating): cantilevered from the wall, creates an open visual base, suits contemporary bathrooms. Freestanding: rests on the floor, often with a kick plate, traditional or Hamptons styles.
5. **How long does a custom bathroom vanity take to build?** 3–6 weeks from deposit. We coordinate with your plumber and tiler so the install slots into the renovation sequence.
6. **What finish is most durable for a bathroom cabinet?** 2pac polyurethane and Laminex HMR panels are the most durable; both resist humidity, washing, and impact. Avoid vinyl wrap in wet rooms — it can lift over time.
7. **Do bathroom vanities come with basins included?** Basins are usually supplied by the plumber or homeowner (Caroma, Reece, Roca, Catalano). We design the vanity to fit the chosen basin and cut the benchtop to suit (undermount, semi-recessed, or above-counter).
8. **What size should a bathroom vanity be for a standard bathroom?** Standard single vanity: 750 mm or 900 mm wide. Double vanity: 1,500 mm or 1,800 mm. Depth: 460–550 mm. Height: 850–900 mm to top of bench (taller than kitchen for ergonomics).

**Internal links:**
→ [Custom Kitchen Joinery](/custom-kitchen-joinery/)
→ [Laundry Cabinets](/laundry-cabinets/)
→ [Custom Furniture](/custom-furniture/)
→ 16 combos: `/custom-bathroom-vanity/[location]/`

---

### 9.4.6 Commercial Joinery (`/commercial-joinery/`)

**Title:** Commercial Joinery Australia | SteepWood
**Meta:** Commercial joinery for hospitality, healthcare, education, retail. Fire-rated boards, commercial hardware, shop drawings. Newcastle workshop.
**H1:** Commercial Joinery — Custom Cabinets & Fit-Out Joinery for Business
**Primary keyword:** commercial joinery (1,300–2,400/mo)
**Secondary:** commercial cabinet maker, commercial joinery contractor, hospitality joinery
**Word count target:** 1,500–2,000 words

**Intro:**

Commercial joinery is the backbone of any well-fitted business interior — from the reception desk that creates a first impression, to the back-of-house cabinetry that makes a hospitality kitchen run smoothly, to the display fixtures that present a retail brand at its best. At SteepWood we design and manufacture commercial joinery for businesses, builders, architects, and interior designers across Australia.

Our commercial joinery work spans the full range of sectors: hospitality venues including cafes, restaurants, bars, and hotels; healthcare facilities including medical clinics, dental practices, and allied health centres; education and institutional projects; corporate offices; and retail environments from boutiques to flagship stores. In each case, we bring the same commitment to precise manufacture, on-schedule delivery, and finishes that hold up under the demands of commercial use.

Commercial joinery differs from residential work in several important ways. Materials must meet higher durability and in some cases fire-resistance standards. Projects often require formal documentation, shop drawings, and co-ordination with architects, builders, project managers, and certification authorities. Lead times must be planned around construction programmes. And the stakes are higher: a delayed joinery installation can hold up an entire commercial project.

SteepWood has the experience and infrastructure to manage commercial joinery projects of scale. We provide full shop drawing documentation, work to your programme, and co-ordinate directly with your project manager and trades. Materials include commercial-grade Laminex and Polytec panels, solid surface and stone bench tops, Blum and Häfele commercial hardware, and fire-rated board where specifications require.

If you are a builder, interior designer, or business owner planning a commercial fit-out anywhere in Australia, contact us for a project consultation. We quote competitively on both supply-only and supply-and-install arrangements.

**H2 sections required:**
1. What Is Commercial Joinery?
2. Sectors We Serve (hospitality, healthcare, education, retail, hotel, office)
3. Types of Commercial Joinery (reception, display, BOH, lockers, bathroom)
4. Commercial-Grade Materials and Compliance (fire-rated, food-safe, etc.)
5. Design and Documentation Process (shop drawings, architect liaison)
6. Project Management and Timelines
7. Cost Overview
8. Portfolio
9. Quality, Warranty, After-Service
10. Service Areas

**FAQs:**
1. **What is commercial joinery?** Custom cabinetry and millwork built to commercial-grade specifications — using fire-rated, food-safe, or impact-resistant materials as required by the project's BCA classification and building surveyor.
2. **How is commercial joinery different from residential joinery?** Higher material specs (commercial-grade Laminex, fire-rated board, antimicrobial surfaces for healthcare), formal documentation (shop drawings, architect markups), and strict programme co-ordination with builders and project managers.
3. **How much does commercial joinery cost in Australia?** Project-specific — usually quoted per item or per sqm. Reception desks: $5,000–$25,000+. Café back bars: $15,000–$60,000. Hospital nurse stations: $20,000–$100,000+.
4. **What industries use commercial joinery?** Hospitality, healthcare, education, retail, hotels, corporate offices, government, aged care.
5. **Do commercial joiners work with architects and interior designers?** Yes — most commercial projects come via design professionals. We work from architect drawings, produce shop drawings for approval, and attend site meetings as required.
6. **What is the lead time for commercial joinery projects?** Small project (1–2 items): 4–6 weeks. Mid-size fitout joinery package: 8–12 weeks. Large multi-room programme: 12–20 weeks.
7. **What materials are used in commercial joinery?** Laminex commercial grade, Polytec HMR, Formica, phenolic panel, stainless steel, fire-rated MDF, solid surface (Corian-type), commercial stone, Blum and Häfele hardware.
8. **Can commercial joinery be fire-rated?** Yes — fire-rated MDF cores and intumescent finishes can achieve Group 1 and Group 2 fire indices per AS/NZS 3837 and the National Construction Code.

**Internal links:**
→ [Office Fitout](/office-fitout/)
→ [Shopfitting](/shopfitting/)
→ [Custom Kitchen Joinery](/custom-kitchen-joinery/)
→ 16 combos: `/commercial-joinery/[location]/`

---

### 9.4.7 Custom Furniture (`/custom-furniture/`)

**Title:** Custom & Bespoke Furniture Australia | SteepWood
**Meta:** Bespoke timber furniture — dining tables, entertainment units, bedheads, shelving. Tasmanian oak, Spotted Gum, walnut. Newcastle workshop.
**H1:** Custom & Bespoke Furniture — Handcrafted Pieces Made for Your Space
**Primary keyword:** custom furniture Australia (1,900–3,600/mo)
**Secondary:** bespoke furniture, custom made furniture Sydney, handmade furniture Australia, custom timber furniture
**Word count target:** 1,400–1,800 words

**Intro:**

Mass-produced furniture is designed for a showroom. Custom and bespoke furniture is designed for your home — your dimensions, your timber species, your finish, your style. At SteepWood we make furniture that could not come from a catalogue: dining tables built to the exact dimensions of your dining room, TV units designed to house your actual equipment, and shelving that fills your wall from floor to ceiling without a centimetre of wasted space.

Every piece starts with a conversation. We ask about your room, your lifestyle, and your taste — and we show you timber samples, finish options, and joinery details before a single board is cut. Our custom furniture is made entirely in Newcastle by skilled joiners who take pride in the craft: hand-fitted dovetail joints, book-matched timber panels, and surfaces finished to a standard you simply cannot find in a furniture chain.

We work with a range of Australian and imported hardwoods, including Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, and walnut. Each species has its own character: the pale, straight grain of Tasmanian oak suits coastal and contemporary spaces; the rich caramel tones of Spotted Gum bring warmth to traditional homes; American oak and walnut appeal to those who want a more refined, European aesthetic. We also source reclaimed and recycled timber for clients who want the history and character of aged wood in a new piece.

Beyond dining tables and coffee tables, we build custom entertainment units, bedheads, study shelving, media walls, window seats, and storage ottomans — any piece of furniture that needs to be made to fit a specific space or satisfy a specific brief. Bespoke furniture in Australia typically starts from $1,500 for a smaller piece and scales up based on timber species, complexity, and size. Lead times range from three to eight weeks.

**H2 sections required:**
1. What Is Custom and Bespoke Furniture?
2. Types of Custom Furniture We Build (dining, coffee, shelving, TV units, bedheads, desks)
3. Timber Species Guide (Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, walnut)
4. Joinery Techniques and Craftsmanship (dovetails, mortise & tenon, book-matched)
5. Finishes (oil, lacquer, polyurethane, paint, beeswax)
6. The Custom Furniture Design Process
7. Cost Guide
8. Portfolio
9. Delivery and Installation
10. Service Areas

**FAQs:**
1. **How much does custom furniture cost in Australia?** Coffee table: $1,500–$4,000. Dining table (solid timber, 6-seater): $3,500–$9,000. Entertainment unit: $4,000–$12,000. Bedhead with side tables: $2,000–$5,000. Bookcase wall: $5,000–$15,000.
2. **What is the lead time for bespoke furniture?** 3–8 weeks depending on size and timber availability. Reclaimed or feature-grade slabs may extend lead time to 10–12 weeks.
3. **What timbers are most popular for custom furniture in Australia?** Tasmanian oak (most popular — versatile, affordable, hard-wearing), Spotted Gum (warmer, harder), Blackbutt (pale, hard), American oak (refined), Victorian ash (close grain), walnut (premium).
4. **What is the difference between custom and bespoke furniture?** Terms are often used interchangeably. We use "custom" for made-to-measure pieces in standard SteepWood styles; "bespoke" for fully designed-from-scratch pieces, sometimes with co-design input from the client.
5. **Can I bring a design concept for a furniture maker to build?** Yes — sketches, Pinterest references, magazine clippings, or formal designs all welcome. We translate concept to shop drawing, confirm with you, then build.
6. **Is custom furniture worth the investment compared to flat-pack?** Custom is a 4–10× upfront cost premium over flat-pack, but the pieces typically last decades (versus 5–10 years for flat-pack), accept refinishing, and hold or appreciate in resale.
7. **Can custom furniture be built to withstand Australian climate conditions?** Yes — we kiln-dry all timber, acclimatise stock to workshop conditions, and use finishes suited to UV and humidity exposure. Outdoor pieces use Spotted Gum or Merbau with marine-grade oil.
8. **Can a furniture maker also do built-in joinery?** Yes — SteepWood is a full joinery shop. Many clients commission a dining table and a matching custom kitchen or entertainment unit together for consistent timber grain and finish.

**Internal links:**
→ [Home Office Joinery](/home-office-joinery/)
→ [Built-In Wardrobes](/built-in-wardrobes/)
→ [Staircase Joinery](/staircase-joinery/)
→ 16 combos: `/custom-furniture/[location]/`

---

### 9.4.8 Home Office Joinery (`/home-office-joinery/`)

**Title:** Custom Home Office Joinery | SteepWood
**Meta:** Built-in home offices, study nooks, library walls, custom desks. Cable management, integrated power, timber and 2pac finishes. Australia-wide.
**H1:** Custom Home Office Joinery — Built-In Desks, Bookcases & Study Nooks
**Primary keyword:** home office joinery (800–1,600/mo)
**Secondary:** built-in home office, custom home office furniture, built-in study nook, home office cabinet maker
**Word count target:** 1,300–1,700 words

**Intro:**

Working from home is no longer a temporary arrangement — it is a permanent feature of Australian life for millions of households. Yet most home offices are still improvised: a spare room with a flatpack desk, inadequate storage, and cables that trail across the floor. Custom home office joinery changes that. A built-in desk, floor-to-ceiling bookcase, and integrated filing storage transforms any spare room, alcove, or under-stair space into a workspace that genuinely supports productivity — and looks the part when you are on a video call.

At SteepWood we design and build custom home office joinery across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide. Our built-in home offices range from compact study nooks fitted into bedroom alcoves, to full-room office fitouts with wall-to-wall bookcase joinery, integrated monitor risers, and cable-managed desk surfaces. Every design is made to your measurements and your workflow.

We can build around virtually any configuration: L-shaped desks, corner bookcases, under-bench filing drawers, integrated printer nooks, and display shelving for awards, books, or art. Desk surfaces are available in solid timber (Tasmanian oak and American oak are perennial favourites), 2pac polyurethane in white or colour, or Polytec and Laminex veneer panels. All shelf and cabinet construction uses Australian-made Laminex or Polytec board with Blum hardware as standard.

We also integrate practical technology from the design stage: power outlets and USB charging ports built into desk surfaces, LED strip lighting under overhead shelves, and cable management grommets at the back of the desk — details that most flatpack furniture simply cannot accommodate.

A standard built-in study nook typically starts around $3,000 to $5,000. A full home office fit-out with floor-to-ceiling joinery, a solid timber desktop, and integrated lighting typically sits between $8,000 and $18,000 depending on size and finish. Free consultation, fixed-price quote.

**H2 sections required:**
1. Why Custom Joinery Works Better in a Home Office
2. Design Options (study nook, full office, library wall, under-stair)
3. Desk Configuration (sitting, standing, L-shape, corner)
4. Storage and Shelving (floor-to-ceiling, filing drawers, display)
5. Cable Management and Technology Integration
6. Materials and Finishes
7. Cost Guide
8. Portfolio
9. Process
10. Service Areas

**FAQs:**
1. **How much does built-in home office joinery cost in Australia?** Study nook: $3,000–$5,000. Full home office with bookcase wall: $8,000–$18,000. Library-grade fit-out with feature timber: $15,000–$30,000+.
2. **What is the standard height for a built-in desk?** 720–740 mm to top of desk surface for seated work; 1,050–1,100 mm for standing. Adjustable electric standing desks (Linak, IKEA Bekant) can be integrated into joinery.
3. **Can I get a standing desk built into joinery?** Yes — electric height-adjustable desk frames can be integrated within a joinery surround. Cable management routes through a riser channel.
4. **What timber is best for home office furniture?** Tasmanian oak (warm, affordable), American oak (refined, European look), walnut (premium), Spotted Gum (rich tones). For 2pac surfaces, any colour from Dulux, Resene, or Polytec palettes.
5. **How do I incorporate cable management into a joinery desk?** Grommets at the back of the desk feed cables into a cable tray underneath; vertical risers route to wall-mounted power. We pre-cut and seal all penetrations during manufacture.
6. **What is the difference between a study nook and a full home office?** Study nook: a single desk + overhead shelf, typically in an alcove or bedroom corner, 1,500–2,000 mm wide. Full home office: dedicated room or area with desk, storage, bookcase, and often a meeting/video call backdrop.
7. **Can a home office be built into an alcove or under-stair space?** Yes — under-stair home offices are a SteepWood specialty. We CAD the angled stair underside and build a stepped bookcase + desk that fully uses the space.
8. **Can I match my home office joinery to my other room joinery?** Yes — colour matching, timber grain matching, and finish matching across rooms is standard. We hold colour and timber samples in our records for repeat orders.

**Internal links:**
→ [Built-In Wardrobes](/built-in-wardrobes/)
→ [Custom Furniture](/custom-furniture/)
→ [Commercial Joinery](/commercial-joinery/) (for hybrid office/home setups)
→ 16 combos: `/home-office-joinery/[location]/`

---

### 9.4.9 Laundry Cabinets (`/laundry-cabinets/`)

**Title:** Custom Laundry Cabinets & Joinery | SteepWood
**Meta:** Custom laundry cabinets — overhead, base, broom storage, butler's pantry. HMR construction, moisture-resistant finishes. Newcastle-crafted Australia-wide.
**H1:** Custom Laundry Cabinets & Joinery — Built to Fit Your Space
**Primary keyword:** laundry cabinets (1,600–2,900/mo)
**Secondary:** laundry joinery, custom laundry cabinets, laundry renovation Australia, laundry cabinet maker
**Word count target:** 1,200–1,600 words

**Intro:**

The laundry is one of the most underinvested rooms in the Australian home — and one of the most used. A properly designed laundry with custom joinery transforms a cramped utility space into a genuinely functional room: overhead cabinets that go to the ceiling, a full-length bench for folding, a built-in broom closet, proper storage for cleaning products, and a finish that is easy to wipe down and hard to damage.

At SteepWood we design and install custom laundry cabinets and joinery for homes across Australia. Every project starts with a site measure and a conversation about how you use the space — whether you need a double trough, a separate sink for washing pets, a countertop ironing station, or simply more overhead storage than the room currently has. We then design the joinery around those needs, right down to shelf heights and door configuration.

Our laundry joinery is built with moisture resistance as the baseline. We use HMR (high moisture-resistant) board for carcasses and MDF with appropriate sealing for all surfaces that may come into contact with water. Door finishes include polyurethane, 2pac gloss, and Laminex panels in a range of colours — including white and cream finishes that are the most popular choice for Australian laundries, and dark tones for contemporary scullery designs.

Custom laundry cabinetry typically costs between $3,000 and $10,000 depending on the size of the room, the number of overhead cabinets, whether benchtop stone is included, and the finish level selected. A basic laundry fit-out with overhead cabinets, base cabinets, and a laminate bench can be achieved at the lower end of that range, while a large scullery-style laundry with 2pac doors and a stone benchtop will sit toward the upper end.

We serve clients across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide, with free in-home consultations and fixed-price quotes. Most laundry joinery projects install within four to six weeks of deposit.

**H2 sections required:**
1. Why a Custom Laundry Makes Sense
2. Laundry Layout Options (single, double, scullery, butler's pantry)
3. Overhead Cabinet and Shelving Configurations
4. Under-Bench Configurations (trough, washing machine, drawers)
5. Materials for Laundry Joinery (HMR critical)
6. Finishes & Door Styles (matching kitchen or standalone)
7. Cost Guide
8. Portfolio
9. Our Process (4–6 weeks)
10. Service Areas

**FAQs:**
1. **How much does a custom laundry renovation cost in Australia?** Joinery-only: $3,000–$10,000. Full renovation (joinery, plumbing, tiling, flooring): $10,000–$25,000.
2. **What is the standard height for laundry cabinets?** Base cabinets: 900 mm (taller than kitchen for ergonomic folding/sorting). Overhead clearance: minimum 600 mm above bench.
3. **What materials should I use for laundry cabinets?** HMR (high moisture-resistant) board for carcasses. 2pac, polyurethane, or Laminex HMR panels for doors. Never standard particleboard.
4. **Can a cabinet maker build a laundry with a built-in trough?** Yes — we cut the benchtop to template for any laundry trough (Robinhood, Clark, Reece). Drop-in, undermount, and integrated stainless options all supported.
5. **What is the best finish for laundry joinery?** 2pac polyurethane (most durable, washable, any colour) or Laminex HMR panels (cost-effective, durable).
6. **How do I maximise storage in a small laundry?** Floor-to-ceiling overhead cabinets, slimline pull-out shelving for cleaning bottles, hanging rail above the trough for drying delicates, broom cupboard with internal hooks.
7. **Do laundry cabinets need to be moisture resistant?** Yes — laundries see daily steam, water spills, and washing machine condensation. HMR board is non-negotiable; standard MDF will swell and fail within 2–5 years.
8. **Can I match my laundry joinery to my kitchen?** Yes — same finish, same colour, same hardware. Many clients commission kitchen and laundry together for design cohesion.

**Internal links:**
→ [Custom Kitchen Joinery](/custom-kitchen-joinery/)
→ [Custom Bathroom Vanity](/custom-bathroom-vanity/)
→ [Home Office Joinery](/home-office-joinery/)
→ 16 combos: `/laundry-cabinets/[location]/`

---

### 9.4.10 Staircase Joinery (`/staircase-joinery/`)

**Title:** Custom Timber Staircase Joinery | SteepWood
**Meta:** Custom timber staircases — straight, floating, curved. Tasmanian oak, Spotted Gum, American oak. NCC-compliant. Free design consultation.
**H1:** Custom Timber Staircase Joinery — Design, Build & Install
**Primary keyword:** timber staircase (1,300–2,400/mo)
**Secondary:** custom staircase, staircase builder, internal timber staircase, floating staircase joinery
**Word count target:** 1,300–1,700 words

**Intro:**

A staircase is one of the most visible — and technically demanding — pieces of joinery in any home. Built right, it becomes a design feature: a sweeping run of American oak, a floating staircase with glass balustrades, or a classic Hamptons staircase with painted risers and polished hardwood treads. Built wrong, it creaks, moves, and shows its age within a few years. At SteepWood we design and build custom timber staircases across Australia that are engineered to last and finished to the standard your home deserves.

We work with a comprehensive range of Australian and imported hardwoods: Tasmanian oak and Victorian ash for their warmth and workability; Spotted Gum and Blackbutt for outstanding hardness and durability in high-traffic stairs; American oak for a finer grain and that slightly European character that suits contemporary and coastal designs. For stairs that will be carpeted, treated pine provides an economical and structurally sound base.

Our staircase projects range from simple straight timber stairs in a standard single-storey home, through to complex geometric and curved staircases for custom builds. We supply and install stair stringers, treads, risers, newel posts, balusters, and handrails — and we can design balustrade systems in timber, glass panel, stainless cable, or steel flat bar, depending on the aesthetic you are after.

Pricing depends heavily on the type of staircase and the timber selected. A simple budget staircase typically starts around $2,500, while a detailed geometric design can reach $30,000 to $50,000 ([stairworks.com.au pricing](https://www.stairworks.com.au/resources/)). Most residential custom staircases fall between $8,000 and $20,000. Our standard lead time is four to six weeks for a straightforward staircase, up to 12 weeks for complex curved work.

We serve homeowners, builders, and architects across Newcastle, Sydney, Melbourne, Brisbane, Perth, and Adelaide, and provide shop drawings for approval before manufacture begins.

**H2 sections required:**
1. Types of Staircases We Build (straight, L-shape, U-shape, spiral, floating)
2. Timber Species for Staircases (grain, colour, hardness comparison)
3. Balustrade and Handrail Options (timber, glass, cable, steel)
4. Open vs Closed Riser Staircases
5. Australian Building Code Requirements (NCC; handrail heights, riser dimensions)
6. Replacing vs Renovating an Existing Staircase
7. Cost Guide ($2,500 simple → $50,000 complex)
8. Portfolio
9. Process (shop drawings, site measure, manufacture, install)
10. Service Areas

**FAQs:**
1. **How much does a custom timber staircase cost in Australia?** Simple straight stairs (treated pine, carpet-ready): $2,500–$5,000. Solid hardwood (Tasmanian oak/Blackbutt): $8,000–$20,000. Floating or curved with glass balustrade: $20,000–$50,000+ ([stairworks.com.au](https://www.stairworks.com.au/resources/)).
2. **What is the cheapest type of staircase in Australia?** Straight, closed-stringer, treated pine, carpet-ready. Adequate for resale-grade builds, but lacks the design impact of feature hardwood stairs.
3. **What timber is best for internal staircases?** Spotted Gum and Blackbutt for hardness (Janka rating 11–9 kN); Tasmanian oak and American oak for appearance and easier work. For commercial/high-traffic: Jarrah or Merbau.
4. **What is the difference between an open-riser and closed-riser staircase?** Open-riser: gaps between treads (no vertical riser board) — feels lighter, more contemporary. Closed-riser: solid riser between treads — traditional, more soundproof. Open-riser requires 125 mm sphere test compliance under NCC.
5. **How long does it take to build and install a custom staircase?** Straight stairs: 4–6 weeks. Curved or geometric: 8–12 weeks. On-site install: 1–3 days.
6. **Do I need a building permit for a new internal staircase?** Like-for-like replacement: usually no permit. New staircase, change of geometry, or load-bearing alteration: building approval required. We provide shop drawings for the certifier.
7. **What are the Australian Building Code requirements for staircases?** NCC Volume 2 — riser 115–190 mm; going 240–355 mm; handrail height 865–1,000 mm; balustrade infill must not allow a 125 mm sphere to pass; landings at every 18 risers maximum.
8. **Can I replace just the stair treads without replacing the whole staircase?** Yes — overlay treads (12–25 mm hardwood laminated to existing) are a common SteepWood project, taking 1–2 weeks and avoiding structural changes.

**Internal links:**
→ [Custom Furniture](/custom-furniture/)
→ [Commercial Joinery](/commercial-joinery/) (for hospitality/commercial stairs)
→ [Custom Kitchen Joinery](/custom-kitchen-joinery/)
→ 16 combos: `/staircase-joinery/[location]/`

---

## 9.5 Location Hub Content — All 16 Locations

For each location hub page (`/locations/[location]/`): title, meta, H1, location-specific intro (250–350 words), suburbs served list, architectural styles, drive time / logistics statement, and a 6-question location FAQ. Phase 2 task 3.6 implementers populate the location hub component from these blocks.

> **Common scaffolding (applies to all 16):** Hero with location-specific image, intro, "Services we offer in [Location]" grid linking to all 10 service+location combos, suburbs served strip, portfolio teaser (3 most recent projects in or near that location), local testimonials (if available), FAQ section, contact CTA. Schema: `HomeAndConstructionBusiness` with `parentOrganization` pointing to Newcastle entity, `areaServed` = the city, plus FAQPage schema.

### 9.5.1 Newcastle (`/locations/newcastle/`) — HQ

**Title:** Custom Joinery Newcastle NSW | SteepWood
**Meta:** Newcastle's premium custom joinery workshop. Kitchens, wardrobes, vanities, commercial joinery. Local craftsmanship, fixed-price quotes. Free in-home visit.
**H1:** Custom Joinery in Newcastle NSW — Local Craftsmanship Since [Year]
**Drive time from workshop:** 0 — Newcastle is home.

**Intro:**

Newcastle is where SteepWood lives and works. Our workshop and design studio are based here, which means every piece of joinery we make for a Newcastle home or business is built within driving distance of the people who will use it. That matters: it means faster consultations, on-the-spot site measures, and the ability to call past clients for a reference walk-through within the same suburb. We are not a Sydney joinery business with a "service area" pin dropped on Newcastle — we are Newcastle joiners, with a Newcastle workshop, working on Newcastle homes.

We design and build for the full range of Newcastle housing: Federation cottages in Hamilton and Cooks Hill that need joinery to suit period detail; coastal homes in Merewether, Bar Beach, and Newcastle East where moisture resistance and finish durability matter most; family homes across the Hunter region from Maryland to Lake Macquarie; and apartment renovations in Newcastle West and Honeysuckle where every centimetre of cabinetry has to earn its place. Our material palette — Polytec, Laminex, Caesarstone, Blum hardware, Tasmanian oak and Spotted Gum timber — suits the design vocabulary of Newcastle's varied housing stock.

We also serve Newcastle's commercial market: cafes and restaurants along Beaumont and Darby Street, retail tenancies in Marketown and Charlestown Square, professional offices around the CBD, and hospitality fitouts across the Hunter. Our shop drawings get past local certifiers; our project programmes work alongside Newcastle's most active commercial builders.

**Suburbs we serve in Newcastle and surrounds:**
Newcastle CBD, Newcastle East, Newcastle West, Hamilton, Cooks Hill, The Hill, Merewether, Bar Beach, Dudley, Whitebridge, Charlestown, Adamstown, New Lambton, Hamilton South, Mayfield, Mayfield East, Stockton, Wickham, Carrington, Tighes Hill, Islington, Maitland, Cessnock, Belmont, Warners Bay, Cardiff, Glendale, Wallsend, Jesmond, Maryland, Fletcher.

**Architectural styles common in Newcastle homes we work with:**
Federation weatherboard, Californian bungalow, Inter-war brick, post-war fibro renovation, contemporary coastal, mid-century brick, beach-front contemporary, Hamilton terrace, industrial conversion (Honeysuckle).

**Local FAQ (6 questions):**
1. **Where is SteepWood's workshop in Newcastle?** Our workshop is in [suburb], Newcastle NSW 2300. We host design consultations by appointment.
2. **Do you do joinery for heritage and Federation Newcastle homes?** Yes — we routinely match period mouldings, architraves, and door profiles for Hamilton, Cooks Hill, and The Hill heritage renovations.
3. **What is the typical lead time for a Newcastle kitchen?** 8–12 weeks from deposit. Faster than Sydney/Melbourne projects because we don't need interstate logistics.
4. **Do you work with Newcastle builders and architects?** Yes — current trade relationships include [builder names by reference]. We provide architect-grade shop drawings on request.
5. **Can you replace just the kitchen doors and benchtop without changing carcasses?** Yes — door + benchtop refresh is a common Newcastle project, ~$8,000–$18,000.
6. **What suburbs of Newcastle do you cover for free in-home consultations?** All Newcastle LGA, Lake Macquarie, Maitland, Cessnock LGAs at no charge. Hunter Valley and Central Coast: free for projects over $20,000.

---

### 9.5.2 Sydney (`/locations/sydney/`) — Tier 1

**Title:** Custom Joinery Sydney NSW | SteepWood
**Meta:** Custom kitchens, wardrobes and bespoke joinery for Sydney homes. Newcastle-crafted, 2hr from our workshop. Free in-home design consultation and quote.
**H1:** Custom Joinery in Sydney NSW — Newcastle-Crafted, Sydney-Delivered
**Drive time from Newcastle workshop:** ~2 hours via M1.

**Intro:**

Sydney is Australia's largest joinery market and one of the most discerning. From Hamptons-style kitchens on the Northern Beaches, to handleless contemporary cabinetry in Mosman and the Eastern Suburbs, to Federation restorations in the Inner West, Sydney homeowners expect a level of finish and design literacy that goes beyond the average joinery brand. SteepWood services Sydney from our Newcastle workshop — two hours up the M1 — which means we bring high-end Sydney design sensibilities together with the manufacturing capacity and pricing of a Hunter-based workshop.

We work with Sydney homeowners, builders, architects, and interior designers across the entire metropolitan area. Our project list includes new builds in the Hills and St George region, full renovations in the Eastern Suburbs and Inner West, kitchen-only refurbishments across the Lower North Shore, and luxury apartment fitouts in the CBD and Pyrmont. We carry the full Polytec, Laminex, Caesarstone, Smartstone, and Blum hardware ranges and can supply European fittings (Häfele, Salice) on request.

Our model for Sydney clients: a free in-home consultation in the first week, a fixed-price quote within 5 working days, and a manufacturing lead time of 8–14 weeks. Installations are managed by our own teams; we do not subcontract to external trades.

**Sydney suburbs we serve (priority areas):**
Mosman, Cremorne, Neutral Bay, Lavender Bay, Kirribilli, North Sydney, Chatswood, Lindfield, Killara, Pymble, Wahroonga, St Ives, Roseville, Northbridge, Castlecrag, Willoughby, Beecroft, Cherrybrook, Castle Hill, Bondi, Bondi Junction, Bronte, Coogee, Maroubra, Vaucluse, Rose Bay, Double Bay, Bellevue Hill, Woollahra, Paddington, Surry Hills, Darlinghurst, Potts Point, Balmain, Rozelle, Drummoyne, Five Dock, Concord, Strathfield, Burwood, Mosman Park, Manly, Freshwater, Curl Curl, Dee Why, Collaroy, Narrabeen, Mona Vale, Avalon, Palm Beach, Newport, Bilgola, Northern Beaches generally.

**Architectural styles common in Sydney homes we work with:**
Federation, Inter-war brick, mid-century modern, contemporary coastal (Northern Beaches), Hamptons (Mosman, Cremorne, Manly), industrial conversion (Surry Hills, Alexandria), warehouse apartment (Pyrmont, Ultimo), traditional terrace (Paddington, Balmain), modern executive (Hills District).

**Local FAQ (6):**
1. **Do you charge a travel fee for Sydney projects?** No — all in-home consultations and site measures are free, anywhere in metropolitan Sydney.
2. **How does manufacturing in Newcastle work for a Sydney install?** We manufacture in our Newcastle workshop and deliver via our own truck. Two-hour drive — no different from an outer-Sydney manufacturer.
3. **Do you carry European hardware brands for premium projects?** Yes — Blum, Häfele, Salice, Hettich all routinely supplied. Specify in your brief.
4. **Can you handle multi-trade renovation projects in Sydney?** We do supply-and-install for joinery, and can recommend trusted Sydney builders, plumbers, and electricians from our network for full renovations.
5. **Are you registered to work on Sydney apartment buildings (strata-managed)?** Yes — we hold the required public liability and worker's compensation, and we work with strata building managers on access, hours, and protection requirements.
6. **What is your turnaround for a Sydney kitchen quote?** Site measure within 5–10 days of enquiry; fixed-price quote within 5 working days of measure.

---

### 9.5.3 Canberra (`/locations/canberra/`) — Tier 1

**Title:** Custom Joinery Canberra ACT | SteepWood
**Meta:** Custom kitchens, wardrobes and bespoke joinery for Canberra homes. Newcastle-crafted, ACT-delivered. Free design consultation, fixed-price quotes.
**H1:** Custom Joinery in Canberra ACT — Bespoke Cabinetry for the Capital
**Drive time from Newcastle workshop:** ~5 hours.

**Intro:**

Canberra is a high-income, design-literate market with a notable shortage of premium joinery options. The ACT median household income outpaces every other state and territory, and Canberra homeowners — whether in new-build developments in Coombs and Wright, established executive homes in Red Hill, Forrest, and Yarralumla, or apartment fitouts in Kingston and Braddon — increasingly seek custom joinery as a differentiator rather than a flat-pack solution.

SteepWood services Canberra from our Newcastle workshop. We manage the logistics; you get the same fixed-price contract, the same materials palette, and the same manufacturing standards we apply to a Newcastle local project. For larger Canberra projects (kitchens + multiple wardrobes + study joinery), we co-ordinate a single delivery and on-site install over 3–5 days.

We work across the ACT's varied housing stock — from the contemporary architecture of Wright and Coombs, to the established 1960s–1980s homes of Aranda, Cook, and Curtin, to the new luxury apartments of Campbell and the Kingston Foreshore. Our material palette suits Canberra's cooler climate: timber-rich finishes (Tasmanian oak, American oak) and 2pac polyurethane in warm whites and earthy tones are perennial favourites.

**Suburbs we serve in Canberra:**
Belconnen, Bruce, Aranda, Cook, Hawker, Page, Florey, Charnwood, Macgregor; Inner North (Braddon, Reid, Campbell, Ainslie, O'Connor, Lyneham, Watson); Inner South (Forrest, Red Hill, Deakin, Yarralumla, Griffith, Manuka, Kingston, Barton); Woden (Curtin, Hughes, Garran, Phillip); Tuggeranong (Conder, Calwell, Wanniassa, Kambah); Gungahlin (Harrison, Franklin, Crace, Forde, Bonner, Casey); Molonglo Valley (Wright, Coombs, Denman Prospect); Queanbeyan and surrounds in NSW.

**Architectural styles common in Canberra:**
Y. Burley International style, Robin Boyd-school modernist, post-war public housing renovation, contemporary new-build (Wright, Coombs, Whitlam), executive Inter-war and post-war brick (Forrest, Yarralumla), high-density contemporary apartment (Braddon, Kingston Foreshore).

**Local FAQ (6):**
1. **Do you travel to Canberra for site measures?** Yes — for projects over $15,000 we attend free of charge. Smaller projects: design via video consultation and submitted measurements.
2. **What is the typical project lead time for Canberra?** Add 1 week to our standard lead time for delivery logistics. So a kitchen that's 10 weeks in Newcastle is 11 weeks in Canberra.
3. **Do you work with Canberra builders and architects?** Yes — we hold ACT-recognised trade licensing and routinely work with Canberra-based builders for new builds and renovations.
4. **Can you match joinery for heritage Canberra homes (Forrest, Yarralumla, Reid)?** Yes — we replicate period mouldings, panel doors, and timber profiles for early-Canberra heritage homes.
5. **How do you handle delivery and installation in Canberra?** Single delivery via our truck; install by our own team over 3–5 days for a typical kitchen + wardrobe project.
6. **Do you provide joinery for ACT government, university, or commercial projects?** Yes — we work on commercial fitouts and have experience with ACT government procurement requirements.

---

### 9.5.4 Melbourne (`/locations/melbourne/`) — Tier 1

**Title:** Custom Joinery Melbourne VIC | SteepWood
**Meta:** Custom kitchens, wardrobes, bespoke joinery for Melbourne homes. Newcastle-crafted, freight-delivered. Toorak, Brighton, Hawthorn, South Yarra and more.
**H1:** Custom Joinery in Melbourne VIC — Newcastle Craft, Melbourne Style
**Drive time from Newcastle workshop:** Freight delivery (~9 hours road; 1-day truck transit).

**Intro:**

Melbourne is Australia's most design-saturated joinery market. From Hamptons kitchens in Toorak and Brighton, to Scandi-inspired apartments in Carlton and Fitzroy, to Federation restorations in Hawthorn and Camberwell, Melburnians treat joinery as part of the design conversation, not just functional storage. SteepWood services Melbourne with a model built around freight delivery and metro-Melbourne install teams — we are not a local Melbourne joiner, but we are the Melbourne-aware alternative to the city's saturated and often heavily-booked local joinery market.

We work with Melbourne homeowners, builders, architects, and interior designers across the entire metropolitan area. Our material palette includes everything Melbourne projects typically demand: 2pac polyurethane in any colour, Caesarstone and Smartstone benchtops, Polytec and Laminex panel options, Blum and Häfele hardware, and solid timber in Tasmanian oak, Victorian ash, Spotted Gum, Blackbutt, American oak, and walnut.

Logistics for Melbourne: design and quote remotely (video consultation, supplied measurements, and we can travel for projects over $30,000), manufacture in Newcastle (8–12 weeks), freight to Melbourne, install by our nominated Melbourne contractor team. Total programme: typically 12–16 weeks from deposit.

**Melbourne suburbs we serve:**
Toorak, South Yarra, Armadale, Prahran, Windsor, Malvern, Glen Iris, Hawthorn, Hawthorn East, Camberwell, Canterbury, Kew, Surrey Hills, Balwyn, Balwyn North, Brighton, Hampton, Sandringham, Black Rock, Beaumaris, St Kilda, Elwood, Albert Park, Middle Park, Port Melbourne, South Melbourne, Carlton, Fitzroy, North Fitzroy, Collingwood, Abbotsford, Richmond, Cremorne, Brunswick, Brunswick West, Northcote, Thornbury, Caulfield, Caulfield North, Elsternwick, Bentleigh, Mt Waverley, Glen Waverley, Box Hill, Ringwood, Eltham, Templestowe, Doncaster, Ivanhoe, Heidelberg.

**Architectural styles common in Melbourne:**
Edwardian terrace, Federation weatherboard, Inter-war brick, Californian bungalow, mid-century modernist (Beaumaris school), Victorian terrace, contemporary inner-city warehouse conversion (Collingwood, Richmond), Hamptons (Brighton, Toorak), Italianate (Carlton, Fitzroy).

**Local FAQ (6):**
1. **Do you have a Melbourne showroom?** Not yet — our workshop and showroom are in Newcastle. For Melbourne projects we conduct video consultations and travel for projects over $30,000.
2. **How does freight work for a Melbourne kitchen install?** We crate and freight via dedicated furniture carrier (typically Nutek or Allied). 1-day transit. Insurance included.
3. **Do you work with Melbourne builders?** Yes — current relationships across Bayside, Stonnington, Boroondara, and Yarra council areas.
4. **Why use SteepWood vs a local Melbourne joiner?** Pricing, lead time predictability (less booked-out than premium Melbourne joiners), and the option to combine kitchen + multiple wardrobes + vanity in a single coordinated project.
5. **Can you match local Melbourne kitchen styles (Hamptons, mid-century, contemporary)?** Yes — our portfolio includes all major Melbourne style vocabularies.
6. **What is the warranty on Melbourne projects?** Same 10-year structural warranty + 25-year Blum hardware warranty as Newcastle projects. We attend warranty calls in Melbourne via our install partner.

---

### 9.5.5 Central Coast NSW (`/locations/central-coast/`) — Tier 2

**Title:** Custom Joinery Central Coast NSW | SteepWood
**Meta:** Custom joinery for Central Coast homes — Gosford, Terrigal, Avoca, The Entrance. Newcastle-crafted, 1hr from our workshop. Free consultations.
**H1:** Custom Joinery on the Central Coast — Coastal Homes, Crafted to Last
**Drive time from Newcastle workshop:** ~1 hour 15 minutes via M1.

**Intro:**

The Central Coast is one of SteepWood's most natural service regions — an hour down the motorway from our Newcastle workshop, and home to the kind of coastal lifestyle properties where premium custom joinery is most appreciated. Whether you live in a beach-front home at Avoca, Terrigal, or Macmasters, a family residence in Gosford or Erina, a lakeside property on Tuggerah, or a new build in the Woy Woy peninsula, we are within easy driving distance for site measures, install, and warranty support.

Coastal climate and coastal materials are second nature to us. We specify HMR moisture-resistant boards, marine-grade polyurethane finishes where appropriate, and corrosion-resistant Blum hardware that holds up to salt-air conditions. For timber projects we favour species that perform in coastal humidity — Spotted Gum, Blackbutt, and Tasmanian oak finished with hard-wax oil.

Beyond residential work, we service the Central Coast's commercial fitout market — cafes and restaurants in The Entrance and Terrigal, retail tenancies in Erina Fair, and professional offices around the Gosford CBD.

**Suburbs we serve on the Central Coast:**
Gosford, East Gosford, West Gosford, Point Frederick, Springfield, Terrigal, Wamberal, Forresters Beach, Avoca Beach, North Avoca, Copacabana, Macmasters Beach, Bensville, Empire Bay, Killcare, Killcare Heights, Pretty Beach, Hardys Bay, Wagstaffe, Ettalong Beach, Umina Beach, Woy Woy, Booker Bay, Erina, Erina Heights, Kincumber, Saratoga, Davistown, Yattalunga, The Entrance, Long Jetty, Bateau Bay, Berkeley Vale, Tumbi Umbi, Wyong, Tuggerah, Wyongah, Budgewoi, Toukley, Lake Munmorah, Doyalson.

**Architectural styles common on the Central Coast:**
Coastal contemporary, beach shack revival, mid-century brick, post-war fibro, new-build executive (Avoca, Wamberal, Killcare), Hamptons-style (Terrigal, Avoca), lakeside contemporary (Tuggerah Lake).

**Local FAQ (6):**
1. **Do you charge a travel fee for Central Coast projects?** No — Central Coast is a free service area for in-home consultations and site measures.
2. **What is the typical lead time for a Central Coast kitchen?** 8–12 weeks from deposit. Install scheduled around builder/plumber programme.
3. **Do you do beach-front and lakeside projects?** Yes — extensive experience with coastal joinery, including specifying salt-air resistant materials.
4. **Do you work with Central Coast builders?** Yes — active trade relationships across the LGA.
5. **Can you handle a holiday-rental property reno with tight turnaround?** Yes — we can prioritise short-lead schedules where the design is straightforward.
6. **Where can I see a recent Central Coast project?** We have a portfolio page on the site, and on request we provide drive-by references for Central Coast clients.

---

### 9.5.6 Hunter Valley (`/locations/hunter-valley/`) — Tier 2

**Title:** Custom Joinery Hunter Valley NSW | SteepWood
**Meta:** Custom joinery for Hunter Valley homes and cellar doors — Pokolbin, Cessnock, Lovedale, Singleton. Newcastle-based, free local consultations.
**H1:** Custom Joinery in the Hunter Valley — From Cellar Door to Country Estate
**Drive time from Newcastle workshop:** ~45 minutes.

**Intro:**

The Hunter Valley is wine country, country estates, boutique cellar doors, and family homes built around rural lifestyle. It is also one of our closest service regions — a 45-minute drive from our Newcastle workshop, which makes us the natural choice for premium custom joinery in the area. We work on rural homes in Pokolbin, Lovedale, and Broke; family residences in Maitland, Cessnock, and Singleton; and commercial fitouts for the region's hospitality and tourism industry.

Hunter Valley projects often have a particular character: a stronger emphasis on natural timber finishes, country-style kitchens with shaker doors and Caesarstone or Smartstone tops, butler's pantries that handle the realities of entertaining, and joinery that ages with the home. We work fluently in this idiom — Tasmanian oak, Spotted Gum, French Provincial, modern country — and we hold the supplier relationships to source feature timbers when a project calls for it.

Commercial projects: cellar door fitouts, restaurant joinery, B&B and accommodation cabinetry. Our shop drawings and project programmes work to the Hunter's varied builder and hospitality client expectations.

**Areas we serve in the Hunter Valley:**
Cessnock, Pokolbin, Lovedale, Rothbury, Mount View, Wollombi, Broke, Singleton, Branxton, Greta, Lochinvar, Bolwarra, Largs, Lorn, Bolwarra Heights, East Maitland, Rutherford, Telarah, Maitland, Thornton, Beresfield, Tarro, Black Hill, Heatherbrae, Raymond Terrace, Karuah, Medowie, Williamtown, Salt Ash, Anna Bay, Nelson Bay, Shoal Bay, Soldiers Point, Lemon Tree Passage, Tanilba Bay, Mallabula, Tea Gardens, Hawks Nest.

**Architectural styles common in the Hunter:**
Country homestead, post-war fibro, rural contemporary, French Provincial (Lovedale, Pokolbin), Hamptons coastal (Port Stephens — Nelson Bay, Shoal Bay), federation farmhouse, modern rural new-build, cellar-door commercial.

**Local FAQ (6):**
1. **Do you do cellar door and winery commercial joinery?** Yes — extensive experience with Hunter Valley cellar doors, tasting rooms, and restaurant fitouts.
2. **Do you charge travel for Hunter Valley?** No — all in-home consultations free across the Hunter LGAs.
3. **Can you supply French Provincial or Hamptons country style joinery?** Yes — both styles are core SteepWood capabilities.
4. **What is your relationship with Hunter Valley builders?** Active trade relationships with builders, builders' merchants, and tile/stone suppliers across Cessnock, Singleton, and Maitland LGAs.
5. **Do you build for the short-term accommodation / Airbnb market?** Yes — multiple completed projects for Hunter Valley accommodation businesses.
6. **What is the lead time for a rural Hunter Valley project?** Standard 8–12 weeks; rural delivery may add 2–3 days.

---

### 9.5.7 Gold Coast (`/locations/gold-coast/`) — Tier 2

**Title:** Custom Joinery Gold Coast QLD | SteepWood
**Meta:** Custom kitchens, wardrobes, and bespoke joinery for Gold Coast homes. Newcastle-crafted, freight-delivered. Broadbeach, Mermaid, Surfers Paradise.
**H1:** Custom Joinery on the Gold Coast — High-End Coastal Cabinetry
**Drive time from Newcastle workshop:** ~9 hours (freight delivery).

**Intro:**

The Gold Coast combines high-income coastal lifestyle with a saturated local joinery market — leaving room for a Newcastle-based premium alternative that offers the same craftsmanship at competitive pricing. SteepWood services the Gold Coast from beach-front apartments in Surfers Paradise and Broadbeach, through to single-residence luxury homes in Mermaid Beach, Tugun, Currumbin, Burleigh Heads, and the canal estates of Sovereign Islands and Mermaid Waters.

Coastal materials are central to our approach for Gold Coast projects: HMR boards, marine-grade finishes, salt-air resistant Blum hardware, and timber species that perform in QLD humidity (Spotted Gum, Blackbutt, Jarrah). We also handle the high-gloss 2pac aesthetic that dominates Gold Coast premium homes — white, taupe, and stone-grey palettes paired with Caesarstone or Smartstone benchtops and brushed brass or matte black hardware.

Project model: design via video consultation, on-site travel for projects over $25,000, manufacture in Newcastle (8–12 weeks), freight to QLD, install by our nominated Gold Coast contractor team. Total programme: 12–16 weeks.

**Suburbs we serve on the Gold Coast:**
Surfers Paradise, Broadbeach, Broadbeach Waters, Mermaid Beach, Mermaid Waters, Nobby Beach, Miami, Burleigh Heads, Burleigh Waters, Palm Beach, Tugun, Currumbin, Bilinga, Coolangatta, Tweed Heads (across border), Robina, Varsity Lakes, Reedy Creek, Bond University precinct, Helensvale, Hope Island, Sanctuary Cove, Sovereign Islands, Paradise Point, Runaway Bay, Biggera Waters, Labrador, Southport, Bundall, Benowa, Carrara, Nerang, Worongary, Mudgeeraba, Tallai, Tallebudgera Valley.

**Architectural styles common on the Gold Coast:**
Coastal contemporary, Hamptons (Mermaid Beach, Broadbeach Waters), Mediterranean villa (Sovereign Islands, Hope Island), modern executive (Bond University area), high-rise apartment fitout (Surfers Paradise, Broadbeach), tropical contemporary (Currumbin, Tugun).

**Local FAQ (6):**
1. **Do you have a Gold Coast showroom?** No — design via video consultation, with on-site travel for larger projects. Material samples couriered free for any active project.
2. **How does freight to the Gold Coast work?** Dedicated furniture carrier from Newcastle workshop. Insurance included. 1–2 day transit.
3. **Do you specify salt-air resistant materials?** Yes — coastal/beach-front projects use marine-grade finishes and corrosion-resistant Blum hardware as standard.
4. **Can you handle Gold Coast high-rise apartment fitouts?** Yes — we co-ordinate with strata managers, building access requirements, and apartment-specific install constraints.
5. **Are you licensed to work in Queensland?** Yes — we hold the required QBCC licensing for QLD residential joinery work.
6. **What is the typical Gold Coast project lead time?** 12–16 weeks from deposit including freight and install scheduling.

---

### 9.5.8 Wollongong (`/locations/wollongong/`) — Tier 2

**Title:** Custom Joinery Wollongong NSW | SteepWood
**Meta:** Custom joinery for Wollongong and Illawarra homes — Thirroul, Austinmer, Kiama. Newcastle-crafted, ~3.5hr delivery. Free consultations.
**H1:** Custom Joinery in Wollongong & the Illawarra — Newcastle Craft, Coastal Quality
**Drive time from Newcastle workshop:** ~3.5 hours.

**Intro:**

Wollongong and the Illawarra are characterised by escarpment-and-ocean homes, family residences in Wollongong's established suburbs, and a growing premium coastal market in the Northern Illawarra towns of Thirroul, Austinmer, and Coalcliff. SteepWood services the region from our Newcastle workshop — 3.5 hours up the coast — with material delivery and on-site install scheduled together for efficiency.

We work on a mix of housing: post-war brick homes in Wollongong's mid-band suburbs (Mangerton, Mt Pleasant, Keiraville), beach-front and escarpment homes in the Northern Illawarra, family homes across the Shellharbour and Kiama LGAs, and the newer developments in Calderwood, Tullimbar, and Horsley.

**Suburbs we serve in the Illawarra:**
Wollongong CBD, North Wollongong, Fairy Meadow, Towradgi, Bulli, Woonona, Russell Vale, Bellambi, Corrimal, Tarrawanna, Balgownie, Mt Pleasant, Mangerton, Keiraville, West Wollongong, Coniston, Figtree, Mt Kembla, Cordeaux Heights, Thirroul, Austinmer, Coledale, Wombarra, Scarborough, Coalcliff, Stanwell Park, Helensburgh, Otford, Wombarra; Shellharbour, Albion Park, Albion Park Rail, Oak Flats, Shellharbour City Centre, Warilla, Barrack Heights, Mount Warrigal; Kiama, Kiama Downs, Bombo, Minnamurra, Jamberoo, Gerringong, Werri Beach.

**Architectural styles common in the Illawarra:**
Post-war brick, mid-century, Federation, beach-front contemporary (Northern Illawarra), escarpment contemporary, new-build executive (Calderwood, Tullimbar), Federation cottage (Kiama, Gerringong), surf-shack revival (Thirroul, Austinmer).

**Local FAQ (6):**
1. **Do you charge a travel fee for Wollongong?** No — all Illawarra in-home consultations are free for projects above $10,000.
2. **What is the lead time for a Wollongong project?** 9–13 weeks from deposit. Slightly longer than Newcastle local due to delivery scheduling.
3. **Do you work with Illawarra builders?** Yes — active trade relationships, particularly in the Thirroul–Austinmer corridor and Kiama LGA.
4. **Can you do escarpment-side homes (Helensburgh, Otford)?** Yes — we manage access and site delivery logistics for difficult-access properties.
5. **Do you supply joinery for UOW staff/student rental fitouts?** Yes — multiple completed projects in Keiraville and Gwynneville rental properties.
6. **Where is your nearest base to Wollongong?** Newcastle workshop. Site visits scheduled to combine multiple jobs in a single trip where possible.

---

### 9.5.9 Brisbane (`/locations/brisbane/`) — Tier 2

**Title:** Custom Joinery Brisbane QLD | SteepWood
**Meta:** Custom kitchens, wardrobes and bespoke joinery for Brisbane homes. Newcastle-crafted, freight-delivered. New Farm, Paddington, Bulimba, Chelmer.
**H1:** Custom Joinery in Brisbane QLD — Premium Cabinetry, Newcastle-Crafted
**Drive time from Newcastle workshop:** ~9 hours (freight delivery).

**Intro:**

Brisbane is one of Australia's fastest-growing premium joinery markets, with established inner-ring suburbs (New Farm, Teneriffe, Bulimba, Hawthorne, Paddington, Bardon) and a rising mid-ring of design-aware homeowners (Chelmer, Indooroopilly, Holland Park, Camp Hill, Coorparoo). SteepWood services Brisbane from our Newcastle workshop with freight delivery and a nominated Brisbane install team — combining the craftsmanship of a premium boutique joiner with the pricing flexibility of Newcastle manufacturing.

Brisbane's climate dictates particular material choices: HMR boards as default, marine-grade finishes for any wet-area joinery, and timber species suited to QLD humidity (Spotted Gum, Blackbutt, Jarrah, Crow's Ash). We also handle the white-and-stone Hamptons palette popular in Brisbane's premium suburbs, and the warmer mid-century timber-and-2pac mix that runs through Paddington and Bardon renovations.

Project model: design via video consultation, on-site travel for projects over $30,000, manufacture in Newcastle (8–12 weeks), freight to QLD, install by our nominated Brisbane contractor team. Total programme: 12–16 weeks.

**Suburbs we serve in Brisbane:**
Inner: New Farm, Teneriffe, Newstead, Fortitude Valley, Bowen Hills, Spring Hill, Paddington, Bardon, Red Hill, Kelvin Grove, Petrie Terrace, Milton, Auchenflower, Toowong, St Lucia, Highgate Hill, West End, South Brisbane, Woolloongabba, East Brisbane, Kangaroo Point, Bulimba, Hawthorne, Norman Park, Balmoral, Morningside.
Inner-South: Coorparoo, Camp Hill, Carina, Carindale, Holland Park, Tarragindi, Annerley, Stones Corner, Greenslopes, Yeronga, Fairfield.
Western suburbs: Indooroopilly, Chelmer, Graceville, Sherwood, Corinda, Yeerongpilly, Tennyson, Chapel Hill, Kenmore, Brookfield, Pullenvale.
Northern: Ascot, Hamilton, Clayfield, Hendra, Wooloowin, Wilston, Grange, Windsor, Kedron, Wavell Heights, Nundah, Northgate, Banyo, Sandgate, Shorncliffe.
Bayside: Manly, Wynnum, Lota.

**Architectural styles common in Brisbane:**
Queenslander (raised timber, wraparound verandah — Paddington, Bardon, New Farm), post-war brick, mid-century brick-and-tile, Inter-war Spanish mission (Ascot, Hamilton), Hamptons (Chelmer, Bulimba), contemporary new-build (Carina Heights, Mt Coot-tha foothills), high-rise apartment (Newstead, Hamilton, South Brisbane).

**Local FAQ (6):**
1. **Do you renovate Queenslander homes?** Yes — extensive experience with raised timber Queenslander joinery, including replacing tongue-and-groove cupboards and adapting to existing floor levels.
2. **How does freight to Brisbane work?** Dedicated furniture carrier from Newcastle. 1–2 day transit, insurance included.
3. **Are you QBCC licensed?** Yes — we hold the required Queensland Building and Construction Commission licensing for residential joinery.
4. **What materials suit Brisbane's climate?** HMR (high moisture-resistant) board, 2pac polyurethane, Caesarstone/Smartstone tops, hardwood timber species suited to QLD humidity.
5. **Can you do Brisbane new-build joinery for builders?** Yes — we partner with several Brisbane new-build companies for kitchen, wardrobe, and bathroom joinery packages.
6. **What is the typical project lead time for Brisbane?** 12–16 weeks from deposit including freight and install scheduling.

---

### 9.5.10 Perth (`/locations/perth/`) — Tier 2

**Title:** Custom Joinery Perth WA | SteepWood
**Meta:** Custom kitchens, wardrobes, bespoke joinery for Perth homes. Newcastle-crafted, freight-delivered. Cottesloe, Mosman Park, Subiaco, Floreat, Dalkeith.
**H1:** Custom Joinery in Perth WA — Premium Cabinetry, Newcastle-Made
**Drive time from Newcastle workshop:** Freight only (3–5 day transit).

**Intro:**

Perth's premium joinery market is built around the western suburbs — Cottesloe, Mosman Park, Peppermint Grove, Dalkeith, Nedlands, Floreat, City Beach — and the eastern suburb corridor of Subiaco, Shenton Park, and West Perth. These are high-income, design-aware households where the standard kitchen builder rarely meets the brief, and where the local premium joiners are typically heavily booked.

SteepWood services Perth from our Newcastle workshop with sea or road freight delivery and a nominated Perth install team. The model gives Perth homeowners access to Newcastle pricing and SteepWood material relationships, with a Perth-based install crew handling on-site work. We work with homeowners directly, and with Perth-based architects and interior designers on full-design commissions.

Project model: design via video consultation, on-site travel for projects over $40,000, manufacture in Newcastle (8–12 weeks), freight (3–5 days), install by our nominated Perth contractor team. Total programme: 14–18 weeks.

**Suburbs we serve in Perth:**
Western: Cottesloe, North Cottesloe, Mosman Park, Peppermint Grove, Claremont, Nedlands, Dalkeith, Crawley, Subiaco, Shenton Park, Floreat, City Beach, Wembley, Wembley Downs, Daglish, Jolimont.
Inner: West Perth, East Perth, Northbridge, Highgate, Mt Lawley, North Perth, Leederville, Mount Hawthorn, Glendalough.
Northern: Doubleview, Innaloo, Karrinyup, Trigg, Scarborough, Hillarys, Sorrento, Mullaloo, Hillarys Marina precinct.
Southern: South Perth, Como, Manning, Kensington, Victoria Park, East Victoria Park, Salter Point, Bicton, East Fremantle, Fremantle, North Fremantle, Beaconsfield.
Eastern: Inglewood, Bayswater, Maylands, Bedford, Mount Lawley.

**Architectural styles common in Perth:**
Federation, Inter-war Californian bungalow, post-war brick, mid-century (lots of John Holland and Krantz), contemporary coastal (Cottesloe, Trigg), Hamptons (Dalkeith, Peppermint Grove), Mediterranean villa (Floreat, City Beach), modern executive new-build, high-density apartment.

**Local FAQ (6):**
1. **Do you have a Perth showroom?** No — design via video consultation, material samples couriered free, on-site travel for projects over $40,000.
2. **How does freight to Perth work?** Road or sea freight from Newcastle. 3–5 day transit. Insurance included for full value.
3. **Are you licensed to work in WA?** Yes — we hold the required WA Building Services trade licensing for residential joinery.
4. **Can you supply Perth-style coastal Hamptons joinery?** Yes — the white/stone/timber palette popular in Perth's western suburbs is one of our most common project types.
5. **Who installs my joinery in Perth?** Our nominated Perth install team — vetted contractors who work to SteepWood's installation standards.
6. **What is the typical project lead time for Perth?** 14–18 weeks from deposit including freight and install scheduling.

---

### 9.5.11 Byron Bay (`/locations/byron-bay/`) — Tier 3

**Title:** Custom Joinery Byron Bay NSW | SteepWood
**Meta:** Custom joinery for Byron Bay and Northern Rivers homes — Suffolk Park, Bangalow, Mullumbimby. Newcastle-crafted, freight to NSW Northern Rivers.
**H1:** Custom Joinery in Byron Bay — Coastal Craft, Made to Last
**Drive time from Newcastle workshop:** ~9 hours (freight).

**Intro:**

Byron Bay and the Northern Rivers are home to one of Australia's most distinctive design markets — premium coastal lifestyle properties, eco-conscious builds, hospitality fitouts for the region's growing food-and-wellness economy, and Hamptons-coastal residences in Suffolk Park, Bangalow, and Newrybar. SteepWood services the region from our Newcastle workshop with freight delivery and on-site install via our nominated Northern Rivers contractor team.

Material choices for Byron-region projects skew toward natural finishes: feature timber (Spotted Gum, Blackbutt, recycled hardwood), oiled or hard-wax finishes, neutral 2pac in warm whites and stone tones, and a coastal-functional approach — joinery that handles salt air, sand, and the inevitable wear of a beach-orientated lifestyle.

**Suburbs we serve in the Northern Rivers:**
Byron Bay, Suffolk Park, Tallow Beach, Broken Head, Lennox Head, Skennars Head, Ballina, East Ballina, West Ballina, Cumbalum, Wollongbar, Alstonville, Newrybar, Bangalow, Possum Creek, Federal, Mullumbimby, Brunswick Heads, Ocean Shores, Billinudgel, New Brighton, South Golden Beach, Pottsville, Hastings Point, Cabarita Beach, Kingscliff, Casuarina, Salt Village, Bilambil Heights.

**Architectural styles common in the Northern Rivers:**
Coastal contemporary, beach shack revival, sub-tropical contemporary (raised, ventilated, deep verandahs), Federation cottage (Bangalow, Mullumbimby), Hamptons coastal (Suffolk Park, Lennox Head), eco-build/passive house, polished concrete and timber contemporary, hospitality and wellness commercial fitout.

**Local FAQ (6):**
1. **Do you do hospitality fitouts in Byron?** Yes — cafe, restaurant, wellness, and accommodation fitouts across the Northern Rivers.
2. **What is the freight transit time to Byron Bay?** 2 days from Newcastle workshop. Install scheduled to align with delivery.
3. **Can you supply recycled or reclaimed timber?** Yes — we source recycled hardwood from Australian salvagers when projects call for it.
4. **Do you charge travel for Byron site visits?** First measurement visit free for projects above $25,000. Subsequent visits prepaid against final invoice.
5. **What is the typical lead time for a Byron project?** 12–16 weeks from deposit including freight and install scheduling.
6. **Are you licensed to work in NSW Northern Rivers?** Yes — same NSW residential joinery licensing as our local Newcastle work.

---

### 9.5.12 Port Macquarie (`/locations/port-macquarie/`) — Tier 3

**Title:** Custom Joinery Port Macquarie NSW | SteepWood
**Meta:** Custom joinery for Port Macquarie homes — Town Beach, Lighthouse Beach, Settlement City. Newcastle-crafted, ~3hr delivery. Free design consultations.
**H1:** Custom Joinery in Port Macquarie — Sea-Change Homes, Premium Cabinetry
**Drive time from Newcastle workshop:** ~3 hours.

**Intro:**

Port Macquarie is one of Australia's premier sea-change destinations and a strong growth market for premium custom joinery. Whether you are downsizing from Sydney to a coastal home in Town Beach, Lighthouse Beach, or Shelly Beach; building new in Lake Cathie, Bonny Hills, or Telegraph Point; or renovating an established home in West Port Macquarie or Settlement City — SteepWood services the region from our Newcastle workshop, three hours up the Pacific Highway.

Coastal materials and finishes are standard for Port Macquarie projects: HMR boards, marine-grade Blum hardware, and timber species (Spotted Gum, Blackbutt) that handle the local salt-air and humidity profile. The white/stone Hamptons palette is well-represented in Port Macquarie premium homes, alongside the warmer timber-and-2pac mix popular with downsizer and lifestyle-property buyers.

**Suburbs we serve in Port Macquarie and surrounds:**
Port Macquarie CBD, Town Beach, Flynns Beach, Shelly Beach, Lighthouse Beach, Settlement City, West Port Macquarie, Sancrox, Riverside, Thrumster, Lake Cathie, Bonny Hills, Laurieton, North Haven, Dunbogan, Camden Haven, Kew, Kendall, Wauchope, Beechwood, Long Flat, Telegraph Point, Pembroke, King Creek; further north: South West Rocks, Crescent Head, Hat Head.

**Architectural styles common in Port Macquarie:**
Sea-change coastal contemporary, established 1980s–1990s brick, post-war fibro, new-build executive (Lake Cathie, Bonny Hills), Hamptons coastal (Town Beach, Shelly Beach), country cottage (Wauchope), waterfront/canal estate.

**Local FAQ (6):**
1. **Do you charge a travel fee for Port Macquarie?** No — in-home consultation free for projects above $15,000.
2. **Do you do retiree/downsizer projects?** Yes — large share of our Port Macquarie work is sea-change downsizer projects requiring high-storage, easy-clean joinery.
3. **What is the lead time for a Port Macquarie project?** 10–13 weeks from deposit including delivery and install scheduling.
4. **Do you supply moisture-resistant joinery for Port's humid climate?** Yes — HMR boards standard; marine-grade finishes for any waterfront property.
5. **Can you work with Port Macquarie builders on new builds?** Yes — active trade relationships with local builders.
6. **Do you do commercial fitouts in Port Macquarie?** Yes — cafes, restaurants, and small retail in the CBD and Settlement City.

---

### 9.5.13 Coffs Harbour (`/locations/coffs-harbour/`) — Tier 3

**Title:** Custom Joinery Coffs Harbour NSW | SteepWood
**Meta:** Custom joinery for Coffs Harbour, Sawtell, Bellingen, Woolgoolga. Newcastle-crafted, ~5hr delivery. Free design consultations on larger projects.
**H1:** Custom Joinery in Coffs Harbour — Mid North Coast Craft
**Drive time from Newcastle workshop:** ~5 hours.

**Intro:**

Coffs Harbour and the Mid North Coast are home to a growing market of lifestyle property buyers, sea-change downsizers, and established families upgrading their primary residences. SteepWood services the region from our Newcastle workshop, five hours up the Pacific Highway, with deliveries and installations scheduled together for efficiency.

We work across the typical Mid North Coast housing stock: established brick homes in Coffs Harbour and Sawtell, new builds in Woolgoolga, Emerald Beach, and Boambee East, hinterland properties around Bellingen and Dorrigo, and the growing premium waterfront and acreage market in the Coffs and Bellinger valleys.

**Suburbs we serve:**
Coffs Harbour CBD, Park Beach, Jetty, Coffs Harbour East, Toormina, Boambee East, Boambee, Sawtell, Bonville, Repton, Urunga, Mylestom, Bellingen, Gleniffer, Dorrigo, Thora, Valla, Valla Beach, Nambucca Heads, Macksville; northwards: Woolgoolga, Emerald Beach, Sandy Beach, Moonee Beach, Coramba, Glenreagh, Red Rock, Wooli, Minnie Water.

**Architectural styles common in the Mid North Coast:**
Coastal contemporary, established brick (1970s–1990s), post-war fibro, mid-century, hinterland country (Bellingen, Dorrigo), eco-build, new-build coastal lifestyle.

**Local FAQ (6):**
1. **Do you do hinterland projects (Bellingen, Dorrigo)?** Yes — hinterland delivery scheduled with the broader trip.
2. **What is the typical lead time for a Coffs project?** 11–14 weeks from deposit.
3. **Do you supply joinery for the Coffs short-term rental market?** Yes — Airbnb and holiday rental joinery upgrades are a regular project type.
4. **Can you co-ordinate with Coffs builders?** Yes — active trade relationships with builders in Coffs, Sawtell, Woolgoolga.
5. **Do you charge travel for Coffs site visits?** Free first measurement for projects above $20,000; subsequent visits prepaid.
6. **What is your warranty on Mid North Coast projects?** Same 10-year structural + Blum 25-year hardware warranty as Newcastle local projects.

---

### 9.5.14 Adelaide (`/locations/adelaide/`) — Tier 3

**Title:** Custom Joinery Adelaide SA | SteepWood
**Meta:** Custom kitchens, wardrobes, bespoke joinery for Adelaide homes. Newcastle-crafted, freight-delivered. North Adelaide, Norwood, Unley, Glenelg.
**H1:** Custom Joinery in Adelaide SA — Bespoke Cabinetry, Newcastle-Crafted
**Drive time from Newcastle workshop:** Freight only (2–3 day transit).

**Intro:**

Adelaide's premium joinery market is concentrated in the established eastern and southern suburbs — North Adelaide, Norwood, Unley, Hyde Park, Walkerville, Burnside, Toorak Gardens — alongside the coastal corridor through Glenelg, Brighton, and Henley Beach. SteepWood services Adelaide from our Newcastle workshop with road freight delivery and a nominated Adelaide install partner.

Adelaide's heritage stock (1900s–1930s Tudor, Federation, Inter-war stone homes) demands joinery that can replicate period detail; the city's contemporary market favours warm timber finishes and 2pac in heritage-respectful palettes. We work fluently in both idioms.

**Suburbs we serve in Adelaide:**
Inner-east: North Adelaide, Walkerville, Gilberton, Medindie, Vale Park, Stepney, Norwood, Kent Town, College Park, Hackney, Maylands, St Peters, Marryatville, Trinity Gardens, Beulah Park, Kensington Park, Burnside, Toorak Gardens, Erindale, Tusmore, Glen Osmond, Beaumont, Glenside, Frewville, Eastwood, Parkside.
Inner-south: Unley, Hyde Park, Highgate, Black Forest, Westbourne Park, Mile End, Mitcham, Daw Park, Cumberland Park, Goodwood, Wayville, Forestville.
Coastal: Glenelg, Glenelg North, Glenelg South, Brighton, Seacliff, Marino, Hallett Cove, Henley Beach, Grange, West Lakes, Tennyson, Semaphore.
North/East corridor: Prospect, Fitzroy, Collinswood, Joslin, Magill, Tranmere.
Hills: Stirling, Aldgate, Crafers, Stoneyfell, Skye.

**Architectural styles common in Adelaide:**
Federation bluestone, Tudor revival, Inter-war stone-and-brick, post-war brick, Californian bungalow, Mediterranean villa (Toorak Gardens, Burnside), contemporary new-build, hills modernist (Stirling, Crafers).

**Local FAQ (6):**
1. **Do you have an Adelaide showroom?** No — design via video consultation, material samples couriered free, on-site travel for projects over $35,000.
2. **How does freight to Adelaide work?** Road freight via Newcastle–Adelaide carrier. 2–3 day transit. Insurance included.
3. **Are you licensed to work in SA?** Yes — registered for SA residential joinery work.
4. **Can you replicate Adelaide heritage detail (Federation, Tudor, Inter-war)?** Yes — moulding, architrave, panel door profile matching is core to our heritage work.
5. **What is the typical Adelaide project lead time?** 12–15 weeks from deposit.
6. **Who installs the joinery in Adelaide?** Our nominated Adelaide install partner, vetted to SteepWood's installation standards.

---

### 9.5.15 Bathurst (`/locations/bathurst/`) — Tier 3

**Title:** Custom Joinery Bathurst NSW | SteepWood
**Meta:** Custom joinery for Bathurst and Central West homes — heritage Federation, country contemporary, new-build. Newcastle-crafted, ~3.5hr delivery.
**H1:** Custom Joinery in Bathurst NSW — Heritage Country, Modern Craft
**Drive time from Newcastle workshop:** ~3.5 hours.

**Intro:**

Bathurst is one of NSW's most significant Central West growth zones — a city of established Federation and Inter-war housing, a strong rural-residential market, and a $20M NSW Government fast-track program driving new-build construction. SteepWood services Bathurst from our Newcastle workshop, ~3.5 hours via the Bells Line of Road or the Great Western Highway, with delivery and install scheduled together.

Bathurst projects often have a particular character: heritage homes that need joinery to suit Federation and Inter-war detailing; rural-residential properties wanting country-functional kitchens with butler's pantry and feature timber; and new-build developments calling for contemporary but warm joinery vocabularies. Our material palette and stylistic flexibility suit all three.

**Suburbs we serve in Bathurst and the Central West:**
Bathurst CBD, West Bathurst, South Bathurst, Eglinton, Kelso, Llanarth, Robin Hill, Mitchell, Perthville, Raglan, Yetholme, Brewongle, Sofala, O'Connell, Trunkey Creek, Rockley, Newbridge; nearby: Blayney, Millthorpe, Carcoar, Lyndhurst.

**Architectural styles common in Bathurst:**
Federation cottage and villa (West Bathurst, South Bathurst), Inter-war brick, Victorian terrace (Bathurst CBD), country homestead, rural-residential contemporary, new-build executive (Kelso, Eglinton, Mitchell).

**Local FAQ (6):**
1. **Do you charge travel for Bathurst?** First visit free for projects above $15,000; subsequent visits prepaid.
2. **Can you match Federation heritage detail?** Yes — moulding, panel door, and architrave matching is core to our heritage capability.
3. **What is the typical Bathurst project lead time?** 11–14 weeks from deposit.
4. **Do you supply rural-residential country kitchens?** Yes — country-functional kitchens with butler's pantry, deep storage, and Shaker-style cabinetry are a Bathurst specialty.
5. **Do you work with Bathurst builders?** Yes — active trade relationships across Bathurst LGA and the Central West.
6. **What is the warranty?** Same 10-year structural and Blum 25-year hardware warranty as Newcastle local projects.

---

### 9.5.16 Orange (`/locations/orange/`) — Tier 3

**Title:** Custom Joinery Orange NSW | SteepWood
**Meta:** Custom joinery for Orange and Central West homes — wine country contemporary, heritage Federation, new-build. Newcastle-crafted, ~3.5hr delivery.
**H1:** Custom Joinery in Orange NSW — Wine Country Craft
**Drive time from Newcastle workshop:** ~3.5 hours.

**Intro:**

Orange is a wine-country city with one of regional NSW's strongest design and lifestyle markets. Its median household income matches Bathurst at the upper end of regional NSW, and the local joinery market has minimal premium competition. SteepWood services Orange from our Newcastle workshop with delivery and install scheduled together, typically grouping Orange projects with nearby Bathurst, Blayney, and Millthorpe work for efficiency.

Orange projects often blend rural-residential brief with refined urban design vocabulary — country-style kitchens with butler's pantries, but executed in 2pac and Caesarstone rather than rustic timber; established heritage homes with carefully replicated period detail; and a steady stream of new-build executive homes in the Bowen and East Orange precincts.

**Suburbs we serve in Orange and the surrounding Central West:**
Orange CBD, North Orange, East Orange, South Orange, West Orange, Bowen, Glenroi, Calare, Bletchington, Lucknow, Spring Hill, Borenore, Cargo, Cudal, Manildra, Molong, Cumnock, Yeoval, Eugowra; nearby: Millthorpe, Blayney, Carcoar, Mandurama, Lyndhurst.

**Architectural styles common in Orange:**
Federation, Inter-war brick, Victorian terrace (Orange CBD), country homestead, rural-residential contemporary, vineyard estate, new-build executive (Bowen, East Orange).

**Local FAQ (6):**
1. **Do you charge travel for Orange?** First visit free for projects above $15,000; subsequent visits prepaid.
2. **Can you match Federation and Inter-war heritage detail?** Yes — heritage joinery matching is core SteepWood capability.
3. **What is the typical Orange project lead time?** 11–14 weeks from deposit.
4. **Do you do vineyard estate and cellar-door commercial fitouts?** Yes — Hunter Valley experience translates directly to Orange wine-country commercial work.
5. **Do you work with Orange builders and architects?** Yes — active trade relationships in the Central West.
6. **What is the warranty?** 10-year structural and Blum 25-year hardware warranty.

---

## 9.6 Service + Location Combo Pages — 160 Pages, Template + Variables

The 160 combo pages (10 services × 16 locations) follow a single content template. Phase 2 task 3.7 implementers feed the template variables from the database `service_locations` table; admin overrides via the Phase 3 admin panel can swap any block with custom copy on a per-row basis.

### 9.6.1 Combo Page Template

```
[H1] {service_name} in {location_name} — Custom, Crafted, Delivered

[Hero subhead]
Bespoke {service_short} for {location_name} homes and businesses. Designed in our Newcastle workshop, delivered Australia-wide. Fixed-price quotes, free consultations.

[Section 1 — Why SteepWood for {service_short} in {location_name} (250–300 words)]
Opening sentence: "{location_name} {style_descriptor} demand joinery that {locality_demand_phrase}."
Body paragraph 1 (location-specific): {location_intro_excerpt — 80–100 words from § 9.5}
Body paragraph 2 (service-specific): {service_intro_excerpt — 80–100 words from § 9.4}
Closing CTA paragraph: free consultation + fixed-price quote message.

[Section 2 — Suburbs we service]
Bulleted/comma list: {location_suburb_list} (from § 9.5)

[Section 3 — {service_name} options for {location_name} homes (250 words)]
Body: feature one or two {service_styles} that suit {location_name} architecture.
Drop in 2–3 image placeholders (portfolio examples).

[Section 4 — Materials, finishes, hardware]
Bulleted list pulled from § 9.4 service spec (e.g. Polytec, Laminex, 2pac, Caesarstone, Blum).

[Section 5 — Process and lead times]
Body 100 words: design → measure → manufacture → install. Pull lead time from {location_lead_time}.

[Section 6 — Cost guide for {service_short}]
Pull cost ranges from § 9.4 service block; add a {location_pricing_note} where the location's median income skews the project mix.

[Section 7 — Recent {service_short} projects in {location_name}]
Portfolio: 3 most recent projects in or near {location_name}; if none, show 3 closest-similar projects from any location with a note ("Photographed from our Newcastle workshop; design is replicable to {location_name}.")

[Section 8 — FAQs (6 questions)]
Mix: 3 service FAQs from § 9.4 + 3 location FAQs from § 9.5.

[Section 9 — Get a free {service_short} quote for {location_name}]
CTA block: phone, email, contact form embed, expected response time.

[Internal links footer]
- Other services in {location_name}: 9 sibling combo links (all other services × this location)
- Other locations for this service: 15 sibling combo links (this service × all other locations)
- Parent service page: /{service_slug}/
- Parent location hub: /locations/{location_slug}/
```

### 9.6.2 Variable Source Table

| Variable | Source | Notes |
|---|---|---|
| `service_name` | `services.ts` (title field) | Full title e.g. "Custom Kitchen Joinery" |
| `service_short` | `services.ts` (short field) | Short form per § 9.3.3 |
| `service_intro_excerpt` | § 9.4 intro paragraphs | First 80–100 words of the service intro |
| `service_styles` | § 9.4 H2 #6 (Design Styles) | List of design styles for the service |
| `location_name` | `locations.ts` (name field) | e.g. "Sydney", "Hunter Valley" |
| `location_intro_excerpt` | § 9.5 intro | First 80–100 words of location intro |
| `location_suburb_list` | § 9.5 suburbs served | Up to 30 suburb names |
| `location_lead_time` | `locations.ts` (leadTime) | e.g. "10–14 weeks" for Sydney |
| `location_pricing_note` | per-location override; otherwise blank | Admin-editable from Phase 3 |
| `style_descriptor` | hand-tuned per location | e.g. for Sydney: "homes — from Federation terraces to coastal Hamptons builds —" |
| `locality_demand_phrase` | hand-tuned per service+location pair | Stored as `service_locations.overview_copy` |

### 9.6.3 Worked Example — `/custom-kitchen-joinery/sydney/`

**Title:** Custom Kitchens Sydney | SteepWood Joinery (42 chars)
**Meta:** Custom kitchen joinery in Sydney by SteepWood. Newcastle-crafted, 20+ years experience. Premium 2pac, Caesarstone, Blum hardware. Free design consultation. (155 chars)
**H1:** Custom Kitchen Joinery in Sydney — Custom, Crafted, Delivered

**Section 1:**
Sydney homes — from Federation terraces in the Inner West, to Hamptons-style residences on the Northern Beaches, to handleless contemporary kitchens on the Lower North Shore — demand joinery that holds up to the city's most discerning design eye. SteepWood services Sydney from our Newcastle workshop, two hours up the M1, with the design literacy of a premium boutique joiner and the pricing flexibility of a Hunter-based manufacturer.

Our kitchen joinery is built around your space, your storage, and your style. We carry the full Polytec, Laminex, Caesarstone, Smartstone, and Blum ranges, and supply European hardware (Häfele, Salice) on request. Whether your brief is a sleek charcoal-handleless kitchen for a Mosman renovation, a white shaker Hamptons kitchen for the Northern Beaches, or a warm timber-and-2pac mix for an Inner West Federation, we have the craftsmanship and the supplier relationships to deliver it.

Free in-home Sydney consultation within 5–10 days. Fixed-price quote within 5 working days of measure. Manufacturing 8–12 weeks. Install by our own teams.

[continues per template above with Sydney suburb list, kitchen styles, materials, $35k–$75k typical range, and the 6 FAQ mix from § 9.4 and § 9.5.2]

### 9.6.4 Worked Example — `/office-fitout/canberra/`

**Title:** Office Fitout Canberra | SteepWood Joinery (45 chars)
**Meta:** Office fitout in Canberra by SteepWood. Reception, breakout, meeting rooms. Newcastle-crafted, ACT-delivered. Fixed-price project management.
**H1:** Office Fitout in Canberra ACT — Custom, Crafted, Delivered

**Section 1:**
Canberra businesses — from professional services in Barton and Forrest, to government departments in Parkes and Russell, to growth-stage technology companies in Braddon — increasingly recognise that a quality office fitout is a recruitment and retention asset, not just a property expense. SteepWood services the ACT from our Newcastle workshop with custom joinery manufactured in Newcastle and an experienced install programme tuned to Canberra's compliance environment.

We deliver complete office fitouts (cold shell → turnkey) with the joinery elements that carry your brand identity — reception desks, breakout kitchen joinery, boardroom credenzas, storage walls, and meeting room cabinetry — manufactured to commercial grade in Newcastle and installed by our ACT-experienced team. Our material palette includes Laminex commercial, Polytec, solid surface counters, and Blum/Häfele commercial hardware.

ACT-aware: we work to NCC Volume 1 commercial standards, hold the required public liability and worker's compensation, and co-ordinate with ACT building certifiers.

[continues with Canberra suburb list, office types, materials, $800–$3,000+/sqm cost range, and the 6 FAQ mix.]

### 9.6.5 Programmatic Quality Tests (Phase 4)

Every combo page must pass:

- **Title length:** ≤ 60 characters
- **Meta description:** 130–160 characters
- **H1:** exactly one per page, contains both service and location keyword
- **Word count:** ≥ 900 words (combo pages should never be thin)
- **Internal links:** ≥ 24 outbound (9 sibling services in this location + 15 sibling locations for this service + parent service + parent location)
- **Unique content ratio:** ≥ 60% non-templated content (location-specific + service-specific paragraphs must not be identical across pages)
- **Schema validity:** passes Google Rich Results test for LocalBusiness + Service + FAQPage
- **Image alt text:** every image has descriptive alt that mentions service and location

A Phase 4 build script reads every generated combo page HTML and asserts these properties before launch.

---

## 9.7 Schema.org JSON-LD Library

All schema follows [Google's LocalBusiness structured data guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business) and [Schema.org `HomeAndConstructionBusiness`](https://schema.org/HomeAndConstructionBusiness). Implementers must use the schema generator in `src/lib/seo/schema.ts` (Phase 2 task 3.2) and not hand-write JSON-LD in components.

### 9.7.1 Primary Newcastle entity (homepage + every page footer)

```json
{
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": "https://steepwood.com.au/#business",
  "name": "SteepWood Custom Joinery",
  "url": "https://steepwood.com.au",
  "logo": "https://steepwood.com.au/images/steepwood-logo.png",
  "image": "https://steepwood.com.au/images/workshop-newcastle.jpg",
  "description": "Custom joinery and cabinet making for residential and commercial clients across Australia. Newcastle workshop. Kitchens, wardrobes, vanities, commercial joinery.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Workshop Street Address — populate from .env.production]",
    "addressLocality": "Newcastle",
    "addressRegion": "NSW",
    "postalCode": "2300",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -32.9283,
    "longitude": 151.7817
  },
  "telephone": "+61-[phone from env]",
  "priceRange": "$$$",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "17:00"
  }],
  "areaServed": [
    {"@type": "City", "name": "Newcastle", "@id": "https://en.wikipedia.org/wiki/Newcastle,_New_South_Wales"},
    {"@type": "City", "name": "Sydney", "@id": "https://en.wikipedia.org/wiki/Sydney"},
    {"@type": "City", "name": "Canberra", "@id": "https://en.wikipedia.org/wiki/Canberra"},
    {"@type": "City", "name": "Melbourne", "@id": "https://en.wikipedia.org/wiki/Melbourne"},
    {"@type": "AdministrativeArea", "name": "Central Coast", "@id": "https://en.wikipedia.org/wiki/Central_Coast_(New_South_Wales)"},
    {"@type": "AdministrativeArea", "name": "Hunter Valley", "@id": "https://en.wikipedia.org/wiki/Hunter_Valley"},
    {"@type": "City", "name": "Gold Coast", "@id": "https://en.wikipedia.org/wiki/Gold_Coast,_Queensland"},
    {"@type": "City", "name": "Wollongong", "@id": "https://en.wikipedia.org/wiki/Wollongong"},
    {"@type": "City", "name": "Brisbane", "@id": "https://en.wikipedia.org/wiki/Brisbane"},
    {"@type": "City", "name": "Perth", "@id": "https://en.wikipedia.org/wiki/Perth"},
    {"@type": "Place", "name": "Byron Bay", "@id": "https://en.wikipedia.org/wiki/Byron_Bay"},
    {"@type": "City", "name": "Port Macquarie", "@id": "https://en.wikipedia.org/wiki/Port_Macquarie"},
    {"@type": "City", "name": "Coffs Harbour", "@id": "https://en.wikipedia.org/wiki/Coffs_Harbour"},
    {"@type": "City", "name": "Adelaide", "@id": "https://en.wikipedia.org/wiki/Adelaide"},
    {"@type": "City", "name": "Bathurst", "@id": "https://en.wikipedia.org/wiki/Bathurst,_New_South_Wales"},
    {"@type": "City", "name": "Orange", "@id": "https://en.wikipedia.org/wiki/Orange,_New_South_Wales"}
  ],
  "sameAs": [
    "https://www.facebook.com/steepwood",
    "https://www.instagram.com/steepwood",
    "https://www.houzz.com.au/pro/steepwood",
    "https://g.page/steepwood-joinery"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Custom Joinery Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Kitchen Joinery", "url": "https://steepwood.com.au/custom-kitchen-joinery/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Built-In Wardrobes & Walk-In Robes", "url": "https://steepwood.com.au/built-in-wardrobes/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Office Fitout", "url": "https://steepwood.com.au/office-fitout/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Shopfitting", "url": "https://steepwood.com.au/shopfitting/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Bathroom Vanity", "url": "https://steepwood.com.au/custom-bathroom-vanity/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Commercial Joinery", "url": "https://steepwood.com.au/commercial-joinery/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Furniture", "url": "https://steepwood.com.au/custom-furniture/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Home Office Joinery", "url": "https://steepwood.com.au/home-office-joinery/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Laundry Cabinets", "url": "https://steepwood.com.au/laundry-cabinets/"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Staircase Joinery", "url": "https://steepwood.com.au/staircase-joinery/"}}
    ]
  }
}
```

> `aggregateRating` is intentionally omitted until SteepWood has reviews displayed on-site. Per [Google's schema guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business), aggregateRating is only valid when the rating is collected and displayed on the page itself. Reviews from Google, Houzz, ProductReview.com.au, etc. should not be reflected in on-site `aggregateRating` schema until they are embedded with author and content.

### 9.7.2 Service pillar page schema (each `/[service]/`)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://steepwood.com.au/{service-slug}/#service",
  "serviceType": "{Service Name}",
  "name": "{Service Name} by SteepWood",
  "description": "{Service meta description from § 9.4}",
  "provider": { "@id": "https://steepwood.com.au/#business" },
  "areaServed": [/* same 16 cities as primary entity */],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "{Service Name} Locations",
    "itemListElement": [/* 16 Offer entries, one per location combo page URL */]
  }
}
```

### 9.7.3 Location hub page schema (each `/locations/[location]/`)

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://steepwood.com.au/locations/{location-slug}/#service-area",
  "name": "SteepWood Custom Joinery — {Location}",
  "parentOrganization": { "@id": "https://steepwood.com.au/#business" },
  "areaServed": {
    "@type": "City",
    "name": "{Location}",
    "@id": "{Wikipedia URL for location}"
  },
  "url": "https://steepwood.com.au/locations/{location-slug}/",
  "telephone": "+61-[phone]"
}
```

### 9.7.4 Combo page schema (each `/[service]/[location]/`)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://steepwood.com.au/{service-slug}/{location-slug}/#service",
  "serviceType": "{Service Name}",
  "name": "{Service Name} in {Location}",
  "description": "{Combo page meta description}",
  "provider": { "@id": "https://steepwood.com.au/#business" },
  "areaServed": {
    "@type": "City",
    "name": "{Location}",
    "@id": "{Wikipedia URL for location}"
  },
  "url": "https://steepwood.com.au/{service-slug}/{location-slug}/"
}
```

### 9.7.5 FAQPage schema (every page with FAQs)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://steepwood.com.au/{path}#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{question text}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{answer text — must match visible page content}"
      }
    }
    /* one entry per FAQ */
  ]
}
```

### 9.7.6 BreadcrumbList schema (every page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://steepwood.com.au/"},
    {"@type": "ListItem", "position": 2, "name": "{Service or Location}", "item": "{URL}"},
    {"@type": "ListItem", "position": 3, "name": "{Combo Page Name}", "item": "{URL}"}
  ]
}
```

### 9.7.7 Organization + WebSite schema (homepage only)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://steepwood.com.au/#organization",
      "name": "SteepWood Custom Joinery",
      "url": "https://steepwood.com.au",
      "logo": { "@type": "ImageObject", "url": "https://steepwood.com.au/images/steepwood-logo.png" },
      "sameAs": ["https://www.facebook.com/steepwood", "https://www.instagram.com/steepwood", "https://www.houzz.com.au/pro/steepwood"]
    },
    {
      "@type": "WebSite",
      "@id": "https://steepwood.com.au/#website",
      "url": "https://steepwood.com.au",
      "name": "SteepWood Custom Joinery",
      "publisher": { "@id": "https://steepwood.com.au/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://steepwood.com.au/search?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

---

## 9.8 Home, About, Contact — Full Copy

### 9.8.1 Homepage (`/`)

**Title:** SteepWood Custom Joinery — Newcastle NSW | Australia-Wide (60 chars)
**Meta:** Premium custom joinery from our Newcastle workshop. Kitchens, wardrobes, vanities, commercial fitouts across 16 Australian cities. Free design consultation.
**H1:** Custom Joinery, Designed and Built in Newcastle

**Hero subhead:** Bespoke kitchens, wardrobes, and commercial joinery for homes and businesses across Australia. Twenty years of craftsmanship, one workshop, no compromises.

**Hero CTAs:**
- Primary: "Get a Free Design Consultation" → /contact/
- Secondary: "See Our Work" → /portfolio/

**Section 1 — What We Make (icon grid linking to all 10 services):**
Heading: "Ten services. One commitment to craft."
Sub: "From custom kitchens to commercial fitouts, we design and manufacture every piece in our Newcastle workshop."
Grid items: Custom Kitchens · Built-In Wardrobes · Custom Bathroom Vanities · Laundry Cabinets · Home Office Joinery · Custom Furniture · Staircase Joinery · Commercial Joinery · Office Fitout · Shopfitting

**Section 2 — Why SteepWood:**
4-column block:
1. **Newcastle Workshop.** Every piece designed and manufactured in one place. No subcontracted joinery, no surprises.
2. **20+ Years of Craftsmanship.** Hand-fitted joints, book-matched timber, finishes that hold up to decades of use.
3. **Premium Materials Only.** Polytec, Laminex, Caesarstone, Smartstone, Blum hardware. No flatpack shortcuts.
4. **Fixed-Price Quotes.** No "from" pricing. No surprise variations. What we quote is what you pay.

**Section 3 — Where We Work (map of 16 locations):**
Heading: "Crafted in Newcastle. Delivered Australia-wide."
Sub: "We service 16 Australian cities and regions. From our Newcastle workshop we travel for free consultations across NSW and ACT, and deliver via dedicated furniture freight to QLD, VIC, WA, and SA."
Grid: 16 location cards linking to `/locations/[slug]/`

**Section 4 — Recent Work (portfolio teaser):**
Heading: "Recent projects across Australia."
3-card grid: most recent 3 portfolio pieces, linking to `/portfolio/[slug]/`.

**Section 5 — Process:**
Heading: "From consultation to install — what to expect."
4-step horizontal block:
1. Free design consultation (45–60 mins, in your home or via video)
2. Detailed design + fixed-price quote (5 working days)
3. Manufacture in Newcastle (8–12 weeks for residential; 10–16 weeks for commercial)
4. Install by our own teams (or our nominated install partners interstate)

**Section 6 — Testimonials:**
Carousel of 6 reviews from Google + Houzz + ProductReview.com.au.

**Section 7 — Trust Signals:**
Logo row: HIA Member · MBA NSW · Polytec Selection Studio · Laminex TradeHub · Caesarstone Authorised Installer · Blum Trade Partner

**Section 8 — Final CTA:**
Heading: "Ready to start your project?"
Sub: "Free design consultation, fixed-price quote within 5 working days, no obligation."
Buttons: "Get a Free Quote" → /contact/ · "Call us — [phone]"

### 9.8.2 About (`/about/`)

**Title:** About SteepWood Custom Joinery — Newcastle Craftsmen (52 chars)
**Meta:** Twenty years of Newcastle joinery craftsmanship. Family-run, premium materials, fixed-price quotes. Learn the SteepWood story and meet the team.
**H1:** About SteepWood — Twenty Years of Newcastle Craftsmanship

**Intro (250 words):**
SteepWood began in [year] as a small joinery workshop in Newcastle, NSW, founded on a simple idea: that custom joinery deserves the same standard of design, materials, and craftsmanship as the best architectural homes it goes into. Twenty years later, our workshop has grown into one of the most respected premium joinery operations on the east coast — but our process is still built around the same fundamentals. Every project starts with a conversation, every piece is designed for the actual space and the actual people who will use it, and every finish leaves the workshop only when it meets the standard that has carried our name for two decades.

Our work spans the full range of joinery: custom kitchens, built-in wardrobes and walk-in robes, bathroom vanities, laundry joinery, home office and study fit-outs, custom furniture, timber staircases, and full commercial joinery for offices, retail, and hospitality. We manufacture everything in Newcastle, supply our own materials through long-standing partnerships with Polytec, Laminex, Caesarstone, Smartstone, and Blum, and install with our own teams across NSW and ACT — and with vetted install partners interstate.

We work for homeowners directly, for builders and architects on new builds and renovations, and for businesses needing commercial fitouts. Our pricing model is fixed-price, our warranties are written into the contract, and our reputation is built one project at a time across the Hunter, Sydney, Canberra, and the cities and regions in between.

**H2 sections:**
1. Our Story (timeline of milestones)
2. The Workshop (photos of the Newcastle facility, machinery, team at work)
3. Meet the Team (founder bio + key designers/joiners with photos)
4. Our Process (free consult → design → quote → manufacture → install)
5. Materials & Suppliers (partner logos + supplier statement)
6. Credentials & Memberships (HIA, MBA NSW, NSW Fair Trading licence)
7. Sustainability (Australian-made statement, timber sourcing policy, waste reduction)
8. Why Newcastle (Hunter region as a manufacturing centre; why we stay local)

### 9.8.3 Contact (`/contact/`)

**Title:** Contact SteepWood — Free Joinery Quote (40 chars)
**Meta:** Get a free design consultation and fixed-price quote for custom joinery. Phone, email, or contact form. Servicing 16 Australian cities from Newcastle.
**H1:** Get a Free Design Consultation

**Lead paragraph:**
Tell us about your project and we'll book a free consultation — in-home for NSW, ACT, and Hunter clients, via video for interstate. Most quotes are returned within 5 working days of measurement. No obligation, no pressure pricing, and no "from" estimates that change after you sign.

**Contact options block:**
- **Phone:** +61 [number] (Mon–Fri 8am–5pm AEST)
- **Email:** hello@steepwood.com.au
- **Workshop visits:** by appointment — [Newcastle address]
- **Service area:** 16 cities across NSW, ACT, QLD, VIC, SA, WA

**Form fields (mandatory):**
- Name
- Email
- Phone
- Location (suburb/city) — dropdown of 16 locations + "Other"
- Service of interest — dropdown of 10 services + "Multiple/not sure"
- Project budget range — dropdown ($5k–$15k, $15k–$30k, $30k–$60k, $60k–$120k, $120k+)
- Project timeline — dropdown (ASAP, 1–3 months, 3–6 months, 6+ months, exploring)
- Tell us about your project — textarea

**Form CTAs:**
- Primary: "Request Free Consultation"
- Secondary: "Call us instead" → tel: link

**Below-form trust signals:**
- "We respond to all enquiries within 1 business day."
- HIA Member · MBA NSW · NSW Fair Trading Licence [#]
- Privacy statement: "Your details are used only to respond to your enquiry. We never share data with third parties. See our [Privacy Policy](/privacy/)."

---

---

## PHASE 2 ACCEPTANCE CRITERIA (CODE)

Do not declare Phase 2 **code complete** unless ALL of the following are true:

- [ ] Homepage renders with hero, 10-service grid, 16-location grid, social proof row, FAQ, CTA — copy from Section 9.8.
- [ ] About page live with story, credentials, team, process — copy from Section 9.8.
- [ ] Contact page live with NAP, hours, embedded map, form skeleton, structured data — copy from Section 9.8.
- [ ] All 10 service pillar pages live at `/[service]/` with copy + FAQs + schema from Section 9.4.
- [ ] All 16 location hub pages live at `/locations/[location]/` with copy + suburbs + FAQs + schema from Section 9.5.
- [ ] All 160 combo pages live at `/[service]/[location]/` generated from the Section 9.6 template, each ≥ 600 words, each with a unique opening paragraph variant (no duplicate intros across combos for the same service).
- [ ] `sitemap.xml` lists all 192 indexable pages with valid `lastmod`.
- [ ] `robots.txt` references the sitemap and blocks `/admin/` and `/api/`.
- [ ] `pnpm audit:content` script runs (0 critical failures, or documented exceptions in repo).
- [ ] Every page has a canonical `<link>`, `hreflang="en-AU"`, and a unique OG image generated dynamically.
- [ ] Privacy, Terms, Australian Consumer Law pages live.
- [ ] JSON-LD present in page source for sample pages (home, service, combo).
- [ ] Lighthouse mobile on homepage + a random service + a random location + a random combo: Performance ≥ 85, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.
- [ ] `pnpm typecheck` and `pnpm build` pass.
- [ ] All commits use `phase-2: <task-id> <message>` format.
- [ ] Final commit tagged `phase-2-complete`.

**Deferred to `STEEPWOOD-MANUAL-OPS.md`:** live Schema.org validator pass on all URLs, Google Rich Results Test on production, GSC sitemap submission, Screaming Frog crawl, Lighthouse ≥90 on production CDN.

When every **code** box is ticked, stop and tell me Phase 2 is complete. Then open the Phase 3 prompt file.
