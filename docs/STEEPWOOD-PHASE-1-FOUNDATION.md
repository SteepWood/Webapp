# SteepWood — Cursor Build Prompt: PHASE 1 of 4
## FOUNDATION AND DESIGN SYSTEM

> **How to use this file with Cursor:**
> 1. Open Cursor in an empty directory.
> 2. Open Cursor Chat (Cmd/Ctrl+L), select **Agent** mode, pick a strong model (Claude 3.7 Sonnet or GPT-5 class).
> 3. Paste the line below into the chat first:
>    `Read this entire file end-to-end before doing anything. Then execute Phase 1 task-by-task in order. After each task, run any verification commands listed, summarise what changed, and wait for me to say "next" before starting the next task. Use Australian English in all UI copy. Do not invent content — pull from the embedded SEO content kit when needed.`
> 4. Then attach or paste this file. Cursor will work through the tasks sequentially.
> 5. When Phase 1 is complete and you've tagged `phase-1-complete`, open the Phase 2 prompt file.

---

## BUILD-FIRST WORKFLOW

**Phase 1 = code only.** Do not block tasks on Supabase dashboard setup, storage buckets, Resend domain verification, DNS, or font downloads unless needed for a local `pnpm dev` smoke test.

All manual / external setup is deferred to **`docs/STEEPWOOD-MANUAL-OPS.md`** (run after Phase 4 code, before production launch).

Phase 1 is **complete** when code acceptance criteria below pass and `pnpm build` succeeds — not when Section 7 environment checklist is ticked.

---

## PHASE 1 SCOPE (what this phase ships)

By the end of Phase 1 you will have:
- A Next.js 15 + TypeScript project with App Router, Tailwind v4 (CSS-first), and the locked "Craft & Contrast" design system tokens.
- Environment variable hygiene (`.env.local`, `.env.example`, secret scanning).
- Prisma 6 wired to Supabase Postgres with a singleton client.
- Supabase SSR client for server components and route handlers, with typed schema for Storage and Auth.
- All three brand fonts loaded correctly (Fraunces, General Sans, IBM Plex Mono).
- shadcn/ui v4 CLI configured for Tailwind v4.
- Global Header (desktop nav + mobile drawer + sticky behaviour), global Footer (credentials, locations grid, legal links), and the Sticky Mobile CTA bar.
- LocalBusiness + Organization + WebSite JSON-LD embedded in the root layout.
- A placeholder homepage that verifies the foundation, passes Lighthouse smoke, and renders schema correctly.

**Phase 1 does NOT build:** real page content, the quote form, the admin panel, the blog, the portfolio gallery, or analytics. Those come in Phases 2, 3, 4.

**Phase 1 milestone tag:** `phase-1-complete`

---

## CRITICAL CONSTRAINTS (apply throughout Phase 1)

1. **Stack is locked** — Next.js 15 (App Router), React 19, TypeScript strict, Tailwind v4 CSS-first (no tailwind.config.ts), shadcn/ui v4, Prisma 6, Supabase Postgres + Auth + Storage, Resend for email, deploy to Vercel. Do not substitute libraries without explicit approval.
2. **Australian English everywhere** — `colour`, `centre`, `organise`, `specialise`, `kilometres`, `enquiry`. UI copy, code comments, commits.
3. **Accessibility is non-negotiable** — WCAG 2.2 AA. Every interactive element must be keyboard-reachable and screen-reader-labelled.
4. **No emojis in code or UI.** No exclamation points in body copy.
5. **Commit format:** `phase-1: <task-id> <short description>` e.g. `phase-1: 2.6 add Tailwind v4 theme tokens`.

---

## EMBEDDED CONTEXT (READ THIS FIRST)

The following blocks are the locked-in product, design, and architecture specs. Treat them as the source of truth.

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

## SECTION 2 — PHASE 1: FOUNDATION AND DESIGN SYSTEM

> **Phase goal:** Stand up a production-grade Next.js 15 + TypeScript codebase with the "Craft & Contrast" design system, Prisma + Supabase wiring, Tailwind v4 CSS-first theming, shadcn/ui primitives, and the shared shell (Header, Footer, Sticky Mobile CTA) ready to receive page content in Phase 2.
>
> **Phase duration:** Days 1–4 of the build.
>
> **Definition of phase done:**
> - `pnpm dev` runs without warnings on Node 22 LTS
> - `pnpm build` succeeds; `next build` output shows 0 type errors and 0 lint warnings
> - Root `/` route renders a placeholder homepage with the real Header + Footer
> - Tailwind v4 design tokens resolve (background `#1C1410`, accent `#D4892A`, Fraunces serif headings)
> - Prisma client connects to Supabase; `pnpm prisma db pull` succeeds against the live schema
> - LocalBusiness + Organization + WebSite JSON-LD validates in the [Schema Markup Validator](https://validator.schema.org/)
> - Lighthouse on the placeholder home scores ≥95 across Performance, Accessibility, Best Practices, SEO

### How to use the prompts in this section

Each task block contains:

1. **Task ID and name** — paste into your task tracker
2. **Cursor Prompt** — copy verbatim into Cursor Composer (Cmd/Ctrl+I), one prompt per Composer session for atomicity
3. **Files to create or modify** — verify Cursor produces these
4. **Definition of Done** — manual checklist before marking complete

All prompts assume Cursor has the repo open with the following MCPs configured: GitHub, Supabase (project ref `[YOUR_SUPABASE_PROJECT_REF]`, region `ap-southeast-2`), Vercel. Replace bracketed placeholders before running.

---

### Task 2.1 — Initialise the Next.js 15 + TypeScript project

**Cursor Prompt:**

```
Context: I'm building SteepWood, a premium custom joinery website on Windows using Cursor IDE. Project lives at C:\code\steepwood. Stack is Next.js 15.3.x (App Router), React 19, TypeScript 5.8 strict, Tailwind v4.1 CSS-first, pnpm package manager. Target deploy: Vercel syd1 region.

Task: Initialise the project at the current working directory (already empty folder named steepwood).

Steps to execute in order:
1. Run `pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-pnpm` (note the dot to install in current dir; answer "Yes" if prompted to continue in non-empty dir because of .git).
2. Open package.json and pin React to ^19.0.0, react-dom to ^19.0.0, next to ^15.3.0, typescript to ^5.8.0, tailwindcss to ^4.1.0, eslint-config-next to ^15.3.0.
3. Update tsconfig.json: set "target": "ES2022", "strict": true, "noUncheckedIndexedAccess": true, "noImplicitOverride": true, ensure "moduleResolution": "bundler".
4. Create .nvmrc with content `22.11.0`.
5. Create .editorconfig with UTF-8, LF line endings, 2-space indent, final newline true.
6. Replace the default README.md with a one-paragraph project description: "SteepWood — premium custom joinery for Newcastle, Hunter Valley and Australia-wide. Production codebase. Australian English. Not for public distribution."
7. Run `pnpm install` to refresh the lockfile.
8. Run `pnpm dev` once to confirm it boots, then stop.

Acceptance criteria:
- `pnpm dev` boots without errors on http://localhost:3000
- `pnpm typecheck` (add this script to package.json as `"typecheck": "tsc --noEmit"`) returns 0 errors
- tsconfig.json has strict: true and noUncheckedIndexedAccess: true
- Australian English in README ("organise" not "organize" — apply throughout the project)
```

**Files to create or modify:**
- `package.json`, `pnpm-lock.yaml`
- `tsconfig.json`
- `.nvmrc`, `.editorconfig`
- `README.md`
- `src/app/layout.tsx`, `src/app/page.tsx` (default scaffolding)
- `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`

**Definition of Done:**
- [ ] `pnpm dev` runs cleanly
- [ ] `pnpm build && pnpm typecheck` returns 0 errors
- [ ] Git status shows the scaffolded files; commit as `chore: scaffold next.js 15 + ts strict baseline`

---

### Task 2.2 — Configure environment variables and secret hygiene

**Cursor Prompt:**

```
Context: SteepWood Next.js 15 project, just scaffolded. We need to wire up env vars for Supabase (already provisioned in ap-southeast-2), Resend (transactional email), and runtime feature flags. Windows + Cursor IDE.

Task: Establish the env-var convention before any database or email code is written.

Steps:
1. Create `.env.local` (gitignored) with these placeholders:
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   DATABASE_URL=
   DIRECT_URL=
   RESEND_API_KEY=
   RESEND_FROM_EMAIL=hello@steepwood.com.au
   QUOTE_NOTIFY_EMAIL=hello@steepwood.com.au
   NEXT_PUBLIC_SITE_URL=https://steepwood.com.au
   NEXT_PUBLIC_GA4_ID=
   NODE_ENV=development

2. Create `.env.example` with the same keys but no values, plus a comment header explaining each.

3. Create `src/env.ts` using @t3-oss/env-nextjs and zod for type-safe env validation. Install: `pnpm add @t3-oss/env-nextjs zod@^3.24.0`. Define:
   - server: SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL, DIRECT_URL, RESEND_API_KEY, RESEND_FROM_EMAIL, QUOTE_NOTIFY_EMAIL (all required, non-empty strings; RESEND_FROM_EMAIL and QUOTE_NOTIFY_EMAIL must pass z.string().email())
   - client: NEXT_PUBLIC_SUPABASE_URL (url), NEXT_PUBLIC_SUPABASE_ANON_KEY (min 20 chars), NEXT_PUBLIC_SITE_URL (url), NEXT_PUBLIC_GA4_ID (optional)
   - runtimeEnv mapping all the above
   - emptyStringAsUndefined: true

4. In .gitignore, ensure these lines exist: .env, .env.local, .env*.local, .env.production.local. Do NOT ignore .env.example.

5. Add a script to package.json: `"check:env": "tsx src/env.ts"` and install tsx: `pnpm add -D tsx`.

Acceptance criteria:
- `pnpm check:env` exits 0 only when all required vars are set
- `.env.local` is gitignored (run `git check-ignore .env.local` to confirm)
- TypeScript autocompletes env.NEXT_PUBLIC_SUPABASE_URL with full type safety
- Importing `env` from `@/env` throws a descriptive error at build time if a required var is missing
```

**Files to create or modify:**
- `.env.local` (local only — not committed)
- `.env.example`
- `src/env.ts`
- `.gitignore`
- `package.json` (scripts + dependencies)

**Definition of Done:**
- [ ] `pnpm check:env` validates env on demand
- [ ] No real secrets are committed to git
- [ ] `env.RESEND_API_KEY` is typed as `string` (not `string | undefined`) in IDE

---

### Task 2.3 — Wire Prisma 6 + Supabase Postgres with a client singleton

**Cursor Prompt:**

```
Context: SteepWood project. Database already exists in Supabase (ap-southeast-2 region) with these tables: services, locations, service_locations, blog_posts, portfolio_projects, testimonials, faqs, quote_requests, contact_submissions, admin_users, sitemap_overrides. We need Prisma 6 to introspect this schema and provide a typed client. Connection uses Supabase pooler (port 6543 with pgbouncer=true&connection_limit=1 for serverless) and direct (port 5432) for migrations.

Task: Set up Prisma with the singleton pattern for Next.js serverless.

Steps:
1. Install: `pnpm add @prisma/client@^6.0.0` and `pnpm add -D prisma@^6.0.0`.

2. Run `pnpm prisma init --datasource-provider postgresql` to create prisma/schema.prisma and a stub .env. Delete the stub .env entries — we use .env.local via the prisma section already (Next.js loads it for prisma commands when invoked via package.json scripts that prefix with `dotenv -e .env.local --`).

3. Edit prisma/schema.prisma:
   - generator client { provider = "prisma-client-js"; previewFeatures = ["fullTextSearchPostgres"] }
   - datasource db { provider = "postgresql"; url = env("DATABASE_URL"); directUrl = env("DIRECT_URL") }

4. Add to package.json scripts:
   "prisma:pull": "dotenv -e .env.local -- prisma db pull",
   "prisma:generate": "prisma generate",
   "prisma:studio": "dotenv -e .env.local -- prisma studio",
   "prisma:migrate": "dotenv -e .env.local -- prisma migrate dev"
   Install: `pnpm add -D dotenv-cli`.

5. Run `pnpm prisma:pull` to introspect the existing Supabase schema into schema.prisma. Then run `pnpm prisma:generate`.

6. Create `src/lib/db/prisma.ts` with the singleton pattern (prevents connection pool exhaustion in dev hot reload AND in Vercel serverless functions):
   - import { PrismaClient } from '@prisma/client'
   - const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }
   - export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'] })
   - if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

7. Create `src/lib/db/cached.ts` — wraps frequently-called read queries in React's `cache()` for request-level dedup. Export at minimum:
   - getServiceBySlug(slug: string)
   - getLocationBySlug(slug: string)
   - getServiceLocation(serviceSlug: string, locationSlug: string)
   - getAllServices()
   - getAllLocations()
   Each wrapped in `cache()` from 'react'. Use Prisma's findUnique where possible.

Acceptance criteria:
- `pnpm prisma:pull` succeeds (DB credentials in .env.local must be correct first)
- `pnpm prisma:generate` produces typed client
- `import { prisma } from '@/lib/db/prisma'` autocompletes all model methods
- Singleton pattern verified: console.log inside the file should NOT fire more than once across hot reloads in dev
- Australian English in any comments ("colour" not "color")
```

**Files to create or modify:**
- `prisma/schema.prisma` (introspected)
- `src/lib/db/prisma.ts`
- `src/lib/db/cached.ts`
- `package.json`

**Definition of Done:**
- [ ] All 11 tables appear in `prisma/schema.prisma`
- [ ] `prisma.service.findMany()` returns typed results in a test page
- [ ] No new connection per request in Vercel functions (verify post-deploy in Supabase dashboard → Database → Pooler)

---

### Task 2.4 — Set up Supabase SSR client for server components and route handlers

**Cursor Prompt:**

```
Context: SteepWood Next.js 15 App Router project. Prisma handles direct DB access; @supabase/ssr handles auth, Supabase Storage (image uploads from the quote form), and any RLS-protected reads. We use @supabase/ssr v0.6+ which supports the new cookie API (getAll/setAll) — never use the deprecated get/set/remove pattern.

Task: Install and configure @supabase/ssr correctly for Next.js 15.

Steps:
1. Install: `pnpm add @supabase/ssr@^0.6.0 @supabase/supabase-js@^2.49.0`.

2. Create `src/lib/supabase/server.ts`:
   - `export async function createClient()` that uses cookies() from 'next/headers' (async in Next 15)
   - Pass cookies object with getAll() and setAll(cookiesToSet) implementation
   - Wrap setAll in try/catch (server components can't set cookies, but route handlers can — the catch is required by the SSR pattern)
   - Returns SupabaseClient typed against the database schema (generate types later in Task 2.5)

3. Create `src/lib/supabase/client.ts` (browser-side):
   - Uses createBrowserClient from '@supabase/ssr'
   - Singleton pattern using a module-level variable
   - Pulls keys from env (validated by src/env.ts)

4. Create `src/middleware.ts` at project root level inside src/:
   - Calls a helper updateSession(request) from src/lib/supabase/middleware.ts
   - matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)' — exclude static + image assets

5. Create `src/lib/supabase/middleware.ts`:
   - Implements updateSession(request: NextRequest) per @supabase/ssr v0.6 docs
   - Creates supabaseResponse, sets cookies on both request and response
   - Calls await supabase.auth.getUser() (NOT getSession — getUser revalidates the JWT and is required for security per Supabase 2024+ guidance)
   - Critical: do NOT add logic between createServerClient and supabase.auth.getUser() — this can cause logout loops per Supabase docs

Acceptance criteria:
- `import { createClient } from '@/lib/supabase/server'` works in a server component
- No "cookies can only be modified..." warnings in dev
- `await supabase.auth.getUser()` returns null user (we have no auth users yet) without throwing
- Middleware fires on `/` route in dev
```

**Files to create or modify:**
- `src/lib/supabase/server.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/middleware.ts`
- `src/middleware.ts`
- `package.json`

**Definition of Done:**
- [ ] Test page that calls `createClient()` from server.ts renders without errors
- [ ] Middleware logs visible in dev terminal
- [ ] No deprecated cookie API methods used (`get`, `set`, `remove` — only `getAll`/`setAll`)

---

### Task 2.5 — Generate typed Supabase schema for Storage and Auth

**Cursor Prompt:**

```
Context: SteepWood — even though Prisma is our primary ORM, the Supabase client needs typed access for Storage (image uploads) and the auth.users table for the admin panel later. Project ref is [YOUR_SUPABASE_PROJECT_REF].

Task: Generate Supabase types and wire them into the client.

Steps:
1. Install Supabase CLI as a dev dep: `pnpm add -D supabase`.

2. Add script to package.json: `"supabase:types": "supabase gen types typescript --project-id [YOUR_SUPABASE_PROJECT_REF] --schema public > src/lib/supabase/database.types.ts"`.

3. Run `pnpm supabase:types` (requires `supabase login` first — interactive token paste).

4. Update `src/lib/supabase/server.ts` and `client.ts` to import the Database type:
   - `import type { Database } from './database.types'`
   - Pass as generic: `createServerClient<Database>(...)`, `createBrowserClient<Database>(...)`

5. Create `src/lib/supabase/storage.ts` with helper functions:
   - `uploadQuoteAttachment(file: File, quoteRequestId: string)` — uploads to `quote-attachments/{quote_request_id}/{uuid}-{filename}` bucket, returns signed URL
   - `createSignedUploadUrl(path: string)` — returns presigned URL the browser uses to PUT files directly (offloads bandwidth from our server)
   - Validate MIME types: image/jpeg, image/png, image/webp, application/pdf; reject anything else server-side
   - Validate file size: max 10MB per file, max 5 files total per quote

Acceptance criteria:
- src/lib/supabase/database.types.ts is generated and contains the 11 tables
- Importing supabase.from('services') autocompletes column names
- Signed URL flow works end-to-end in a local test (use Storage bucket `quote-attachments` — create it in Supabase dashboard if not present, with private RLS policy)
```

**Files to create or modify:**
- `src/lib/supabase/database.types.ts` (generated)
- `src/lib/supabase/storage.ts`
- `src/lib/supabase/server.ts`, `client.ts` (updated with generics)
- `package.json`

**Definition of Done:**
- [ ] Types regenerate cleanly after any schema change (`pnpm supabase:types`)
- [ ] Storage bucket `quote-attachments` exists in Supabase dashboard with policy: only service_role can read; signed URLs grant temporary access
- [ ] No `any` types in supabase client usage

---

### Task 2.6 — Configure Tailwind v4 CSS-first with the "Craft & Contrast" design tokens

**Cursor Prompt:**

```
Context: SteepWood uses Tailwind v4.1 which moves configuration from JS to CSS via the @theme directive. No tailwind.config.ts file is needed. The design system is "Craft & Contrast" — a near-black workshop palette with Amber Timber accent, deep serif typography (Fraunces variable), General Sans body, and IBM Plex Mono for micro-detail.

Task: Define the complete design system in src/app/globals.css using Tailwind v4's CSS-first @theme directive.

Steps:
1. Verify postcss.config.mjs uses `@tailwindcss/postcss` (default v4 setup).

2. Replace src/app/globals.css entirely with the following structure:

```css
@import "tailwindcss";

@theme {
  /* COLOURS — Craft & Contrast palette (Australian English: 'colour' in comments) */
  --color-ink-950: #0F0A07;          /* deepest near-black */
  --color-ink-900: #1C1410;          /* primary background (workshop charcoal) */
  --color-ink-800: #2A1F18;          /* elevated surface */
  --color-ink-700: #3D2E22;          /* borders on dark */
  --color-ink-100: #F5F0EA;          /* off-white (warm) */
  --color-ink-50:  #FAF7F2;          /* paper */

  --color-amber-600: #B8721F;        /* hover/pressed accent */
  --color-amber-500: #D4892A;        /* PRIMARY accent — Amber Timber */
  --color-amber-400: #E0A04F;        /* light accent */
  --color-amber-100: #F5E4C8;        /* tint backgrounds */

  --color-sage-700: #4A5D3A;         /* supporting muted green */
  --color-sage-500: #7A8F66;
  --color-sage-100: #E0E6D5;

  --color-success: #5C8A4D;
  --color-warning: #C97B1F;
  --color-error: #B33B2E;

  /* TYPOGRAPHY */
  --font-serif: "Fraunces", "Georgia", serif;
  --font-sans:  "General Sans", "Inter", system-ui, sans-serif;
  --font-mono:  "IBM Plex Mono", "Menlo", monospace;

  /* FLUID TYPE SCALE (clamp-based, 320px to 1440px viewport) */
  --text-display-1: clamp(2.75rem, 1.5rem + 6.25vw, 6rem);     /* hero H1 */
  --text-display-2: clamp(2.25rem, 1.25rem + 5vw, 4.5rem);     /* page titles */
  --text-h1:        clamp(2rem, 1.25rem + 3.75vw, 3.5rem);
  --text-h2:        clamp(1.625rem, 1.125rem + 2.5vw, 2.75rem);
  --text-h3:        clamp(1.375rem, 1rem + 1.875vw, 2.25rem);
  --text-h4:        clamp(1.125rem, 0.9375rem + 0.9375vw, 1.5rem);
  --text-body-lg:   clamp(1.0625rem, 0.9375rem + 0.625vw, 1.25rem);
  --text-body:      1rem;
  --text-body-sm:   0.875rem;
  --text-caption:   0.75rem;

  /* SPACING — 4pt base, fluid for marketing sections */
  --spacing-section-y: clamp(4rem, 8vw, 8rem);
  --spacing-container-x: clamp(1rem, 4vw, 2rem);
  --spacing-stack-lg: 2.5rem;
  --spacing-stack-md: 1.5rem;
  --spacing-stack-sm: 1rem;

  /* RADII */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1.25rem;
  --radius-full: 9999px;

  /* SHADOWS — warm-tinted, never neutral grey */
  --shadow-sm: 0 1px 2px 0 rgba(28, 20, 16, 0.08);
  --shadow-md: 0 4px 12px -2px rgba(28, 20, 16, 0.12);
  --shadow-lg: 0 12px 32px -8px rgba(28, 20, 16, 0.18);
  --shadow-xl: 0 24px 48px -12px rgba(28, 20, 16, 0.24);

  /* MOTION — calm, never bouncy */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 180ms;
  --duration-base: 280ms;
  --duration-slow: 480ms;
  --duration-deliberate: 720ms;

  /* BREAKPOINTS — already in Tailwind defaults but documented here */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Base resets */
@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body {
    background-color: var(--color-ink-50);
    color: var(--color-ink-900);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: 1.6;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-serif);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  /* Focus rings — WCAG AA visible */
  *:focus-visible {
    outline: 2px solid var(--color-amber-500);
    outline-offset: 2px;
    border-radius: 2px;
  }
  /* Respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

3. Update src/app/layout.tsx to import globals.css (already imported by default) and add `<html lang="en-AU" className="scroll-smooth">`.

Acceptance criteria:
- `bg-ink-900`, `text-amber-500`, `font-serif`, `text-display-1` all work as Tailwind utilities
- Fluid typography visibly scales between 320px and 1440px viewport widths
- Focus ring appears as amber 2px on tab navigation
- prefers-reduced-motion disables all animations in OS settings test
```

**Files to create or modify:**
- `src/app/globals.css` (full rewrite)
- `src/app/layout.tsx` (lang and className)
- `postcss.config.mjs` (verify)

**Definition of Done:**
- [ ] All design tokens render as Tailwind classes in IntelliSense (install Tailwind CSS IntelliSense VS Code extension in Cursor)
- [ ] Lighthouse Accessibility ≥95 on placeholder home (focus visibility passes)
- [ ] No console errors about missing CSS

---

### Task 2.7 — Load fonts (Fraunces via Google, General Sans via Fontshare self-hosted, IBM Plex Mono via Google)

**Cursor Prompt:**

```
Context: SteepWood typography is Fraunces (variable serif from Google Fonts), General Sans (variable sans from Fontshare — must be self-hosted because Fontshare CDN has no SLA), and IBM Plex Mono (Google Fonts).

Task: Wire all three fonts via next/font for optimal performance (zero layout shift, automatic preconnect, self-host the variable file).

Steps:
1. Use next/font/google for Fraunces and IBM Plex Mono in src/lib/fonts.ts:

```typescript
import { Fraunces, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
  weight: ['400', '500', '600', '700'],
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const generalSans = localFont({
  src: [
    {
      path: '../assets/fonts/GeneralSans-Variable.woff2',
      style: 'normal',
      weight: '200 700',
    },
    {
      path: '../assets/fonts/GeneralSans-VariableItalic.woff2',
      style: 'italic',
      weight: '200 700',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});
```

2. Manually download GeneralSans-Variable.woff2 and GeneralSans-VariableItalic.woff2 from https://www.fontshare.com/fonts/general-sans (accept the licence) and place at src/assets/fonts/. Add a `LICENCE.md` in that folder noting the SIL Open Font Licence terms.

3. In src/app/layout.tsx, apply all three variable classes to the html element:
```typescript
import { fraunces, generalSans, ibmPlexMono } from '@/lib/fonts';
// ...
<html lang="en-AU" className={`${fraunces.variable} ${generalSans.variable} ${ibmPlexMono.variable} scroll-smooth`}>
```

4. Verify the font CSS variables match those declared in globals.css @theme block (--font-serif, --font-sans, --font-mono).

Acceptance criteria:
- DevTools Network tab shows fonts loading from /_next/static/media/ (self-hosted, no Fontshare CDN call)
- FOIT/FOUT eliminated: visual hierarchy renders correctly during font swap thanks to size-adjust metric overrides (next/font handles automatically)
- Web Vitals CLS = 0 on font load
- font-serif utility class renders Fraunces; default body text renders General Sans
```

**Files to create or modify:**
- `src/lib/fonts.ts`
- `src/assets/fonts/GeneralSans-Variable.woff2`
- `src/assets/fonts/GeneralSans-VariableItalic.woff2`
- `src/assets/fonts/LICENCE.md`
- `src/app/layout.tsx`

**Definition of Done:**
- [ ] Three font variable classes applied to `<html>`
- [ ] No CLS triggered by fonts (Lighthouse CLS = 0)
- [ ] Fontshare CDN is never called at runtime (verify Network tab)

---

### Task 2.8 — Install and configure shadcn/ui CLI v4 for Tailwind v4

**Cursor Prompt:**

```
Context: SteepWood will use shadcn/ui v4 (Tailwind v4-compatible) for accessible primitives — Button, Input, Label, Select, Dialog, Toast (Sonner), etc. shadcn/ui copies components into our codebase rather than installing as a dependency, so we can fully customise them. The CLI is `pnpm dlx shadcn@latest`.

Task: Initialise shadcn/ui v4 and install our core primitive set.

Steps:
1. Run `pnpm dlx shadcn@latest init`. When prompted:
   - Style: New York (sharper, more editorial than Default)
   - Base colour: Stone (closest to our warm palette — we override anyway)
   - CSS variables: Yes
   - components.json should auto-create

2. Edit components.json to set:
   - `"tailwind": { "css": "src/app/globals.css", "baseColor": "stone", "cssVariables": true }`
   - `"aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" }`
   - `"iconLibrary": "lucide"` (Lucide React is shadcn v4 default)

3. Install our core primitive set in one batch:
   `pnpm dlx shadcn@latest add button input label textarea select checkbox radio-group dialog drawer sheet sonner badge separator avatar accordion tabs tooltip skeleton form`

4. The Button component imports cva (class-variance-authority). Open src/components/ui/button.tsx and customise variants to match Craft & Contrast:
   - default variant: bg-amber-500 text-ink-950 hover:bg-amber-600
   - destructive: bg-error text-ink-50
   - outline: border-2 border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-ink-50
   - ghost: text-ink-900 hover:bg-ink-100
   - link: text-amber-600 underline-offset-4 hover:underline
   - sizes: sm h-9 px-3, default h-11 px-5, lg h-12 px-6, xl h-14 px-8 text-lg (xl is for primary hero CTA)
   - Add `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50 disabled:opacity-50 disabled:pointer-events-none` to base classes

5. Install Lucide icons: `pnpm add lucide-react@latest`.

6. Verify the form component requires react-hook-form and zod resolvers: `pnpm add react-hook-form@^7.54.0 @hookform/resolvers@^3.10.0 zod@^3.24.0` (zod already installed).

Acceptance criteria:
- All listed shadcn primitives present in src/components/ui/
- Button variants render correctly when used as `<Button variant="default">Get a Free Measure & Quote</Button>`
- No TypeScript errors from shadcn components
- Sonner toaster works (`<Toaster />` placed in root layout)
```

**Files to create or modify:**
- `components.json`
- `src/components/ui/*.tsx` (~15 primitives)
- `src/lib/utils.ts` (auto-created by shadcn — contains `cn()` helper)
- `package.json`

**Definition of Done:**
- [ ] `<Button>Get a Free Measure & Quote</Button>` renders with amber accent
- [ ] Form, Dialog, Sonner toast all functional in a smoke-test page
- [ ] All variants pass WCAG AA contrast (verify with browser DevTools contrast checker)

---

### Task 2.9 — Build the global Header (with desktop nav + mobile drawer + sticky behaviour)

**Cursor Prompt:**

```
Context: SteepWood Header is the most-seen UI in the entire site. It must communicate craft (Fraunces logotype), enable instant contact (click-to-call phone, free-quote CTA), and provide intuitive nav to 10 services + 16 locations without overwhelming. Sticky on scroll, translucent then solid at scroll > 80px.

Task: Build src/components/layout/Header.tsx with full responsive behaviour.

Steps:
1. Create src/components/layout/Header.tsx as a Client Component (it uses scroll listener + drawer state):

```typescript
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
```

Component requirements:
- Logo on left: Fraunces 600 weight, text "SteepWood" with the "S" slightly larger (use a span with text-[1.1em]). Wrap in <Link href="/">.
- Desktop nav (lg breakpoint and up): Services (dropdown), Projects, About, Locations, Blog, Contact. Use shadcn NavigationMenu for the Services dropdown (install if not present: `pnpm dlx shadcn@latest add navigation-menu`).
  - Services dropdown lists all 10 services in a 2-column grid with hover preview text.
- Right side: phone number with Phone icon (click-to-call: `<a href="tel:+61240000000">02 4000 0000</a>` — replace with real number when known), then a Button variant="default" size="default" with text "Get a Free Measure & Quote".
- Mobile (below lg): hamburger Menu icon opens shadcn Sheet from right. Sheet contains:
  - Logo
  - Full nav as expandable accordion (Services expands to 10 items)
  - Locations as accordion expandable to 16 items
  - Phone CTA (large, full-width)
  - "Get a Free Measure & Quote" Button (large, full-width, primary)
- Sticky behaviour: position: fixed, top: 0, z-50. Scroll listener (passive: true) — when window.scrollY > 80, add 'bg-ink-50/95 backdrop-blur-md shadow-md', else 'bg-transparent'.
- Height: 72px mobile, 88px desktop.
- Use clsx via cn() helper from @/lib/utils.

2. In src/app/layout.tsx, render <Header /> above {children}.

3. Add `scroll-padding-top: 6rem;` to html in globals.css to prevent anchor links from being hidden behind the sticky header.

Acceptance criteria:
- Header is sticky and visually changes at scroll > 80px
- Mobile drawer opens, traps focus (shadcn Sheet handles), closes on Esc
- All nav links have visible focus states (amber ring)
- "Get a Free Measure & Quote" button always visible on desktop, always in drawer on mobile
- Click-to-call phone number is a real tel: link
- Lighthouse Accessibility ≥95 on a page using the Header
```

**Files to create or modify:**
- `src/components/layout/Header.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css` (scroll-padding-top)

**Definition of Done:**
- [ ] Tab through Header — all interactive elements show amber focus ring
- [ ] Resize browser from 320px to 1920px — no layout breakage
- [ ] Click "Get a Free Measure & Quote" — currently links to `/quote` (will be built in Phase 3)

---

### Task 2.10 — Build the global Footer with credentials, locations grid, and legal links

**Cursor Prompt:**

```
Context: SteepWood Footer is a trust-signal powerhouse AND an SEO internal-linking hub. It links to all 10 services, all 16 locations, displays credentials (HIA, MBA, ABN, NSW licence), and contains legal links (Privacy, Terms, Australian Consumer Law statement).

Task: Build src/components/layout/Footer.tsx as a Server Component (no interactivity needed).

Steps:
1. Create src/components/layout/Footer.tsx. Structure (mobile stacks vertically, desktop 4-column grid below lg):

Column 1 — Brand + Credentials:
- Fraunces "SteepWood" logotype
- One-line tagline: "Premium custom joinery, crafted in Newcastle. Serving NSW and Australia-wide."
- Small print: ABN 00 000 000 000 · NSW Builder's Licence 000000C
- Credential badges row: HIA, MBA, Houzz (small monochrome SVGs in /public/badges/)

Column 2 — Services:
- Heading "Services" (Fraunces, h4)
- Bulleted list of all 10 services, each linking to /[service]/
  Services: custom-kitchen-joinery, built-in-wardrobes, bathroom-vanity-joinery, laundry-cabinets, home-office-joinery, custom-furniture, staircase-joinery, commercial-joinery, office-fitout, shopfitting-retail-joinery

Column 3 — Locations:
- Heading "Areas We Serve"
- Two-column sub-grid of all 16 locations linking to /custom-joinery/[location]/ (default service hub per location)
  Locations: newcastle, sydney, central-coast, wollongong, hunter-valley, port-macquarie, coffs-harbour, tamworth, armidale, byron-bay, melbourne, brisbane, perth, adelaide, canberra, gold-coast

Column 4 — Contact + Newsletter:
- Phone (click-to-call, large)
- Email: hello@steepwood.com.au (mailto:)
- Address: workshop street address (placeholder until provided)
- Hours: "Mon–Fri 7am–5pm · Sat by appointment"
- Newsletter signup: Email input + Subscribe button (wire to Resend audience API later; render the form now, leave a TODO for the submit handler)

Bottom bar (full width):
- Left: © {new Date().getFullYear()} SteepWood Joinery Pty Ltd · All rights reserved
- Centre (or right on mobile): "Proudly servicing Newcastle, Hunter Valley & Australia-wide"
- Right: Privacy Policy · Terms · Australian Consumer Law (each linking to /legal/privacy, /legal/terms, /legal/consumer-rights)

Visual styling:
- bg-ink-900 text-ink-100
- Padding: pt-section-y pb-12 (uses fluid spacing token)
- Heading text-h4 font-serif text-ink-50 mb-stack-md
- Links text-ink-100/80 hover:text-amber-400 transition-colors duration-fast
- Credential badges height 32px, opacity-70 hover:opacity-100

2. Render in src/app/layout.tsx below {children}.

3. Add `scroll-mt-24` utility consideration in CSS if anchor links target footer.

Acceptance criteria:
- All 10 service links + 16 location links present (verify count = 26 internal links)
- Newsletter form renders (submit is TODO)
- Footer is text-readable at 320px width (no horizontal scroll)
- All links have aria-current="page" handled automatically by Next.js Link when active
- Lighthouse Accessibility ≥95 with Footer in DOM
```

**Files to create or modify:**
- `src/components/layout/Footer.tsx`
- `src/app/layout.tsx`
- `public/badges/hia.svg`, `mba.svg`, `houzz.svg` (download monochrome versions, or commission)

**Definition of Done:**
- [ ] Footer renders on every page (via layout.tsx)
- [ ] Internal link count from Footer: 10 services + 16 locations + 3 legal = 29 links minimum
- [ ] Mobile (320px): no horizontal overflow

---

### Task 2.11 — Build the Sticky Mobile CTA bar

**Cursor Prompt:**

```
Context: On mobile, the most important conversion mechanic is a persistent CTA bar at the bottom of the viewport — one tap to call, one tap to start the quote. It appears only on viewports < lg (1024px) and only after the user scrolls past 30% of the page (so the hero CTA isn't competing with it on first paint).

Task: Build src/components/layout/StickyMobileCTA.tsx.

Steps:
1. Create as a Client Component with these props: none (it's globally rendered).

2. State: visible (boolean). useEffect with scroll listener — set visible=true when scrollY > viewportHeight * 0.3, false when at top.

3. Layout: position: fixed; bottom: 0; left: 0; right: 0; z-50; height: 64px. Display only at lg:hidden.
   - bg-ink-50/95 backdrop-blur-md border-t border-ink-700/20 shadow-xl
   - Inner: flex gap-0 — two equal-width buttons sharing the row, no rounded corners on outer edges, divider in middle.
   - Left button: `<a href="tel:+61240000000">` with Phone icon + "Call" label, full-height tap target.
   - Right button: `<Link href="/quote">` styled as primary (bg-amber-500), with Calendar/Clipboard icon + "Free Quote" label.

4. Accessibility:
   - aria-label on the wrapper: "Quick contact actions"
   - Each link/button has a visible label, no icon-only.
   - prefers-reduced-motion: skip the slide-up transition.

5. Animation: Use Framer Motion (already in stack — install if missing: `pnpm add framer-motion@^11.15.0`). On mount-after-visible, slide up from y: 100% to y: 0 with duration-base ease-out-soft.

6. Render in src/app/layout.tsx between Header and Footer (or below Footer in DOM order — visually overlaid).

7. Add padding-bottom: 80px to the main wrapper on lg:hidden so content isn't obscured by the bar.

Acceptance criteria:
- Bar appears only on mobile/tablet, only after 30% scroll
- Two clearly labelled actions, both with WCAG AA contrast and 44×44px minimum tap target
- No layout shift when bar appears (achieved via the bottom padding on main)
- Reduced motion users see no slide animation
```

**Files to create or modify:**
- `src/components/layout/StickyMobileCTA.tsx`
- `src/app/layout.tsx`
- `package.json` (framer-motion)

**Definition of Done:**
- [ ] Test at 375px viewport (iPhone SE) — bar appears, both buttons functional
- [ ] Test at 1024px+ — bar is `display: none`
- [ ] Lighthouse mobile score unchanged (no perf regression)

---

### Task 2.12 — Add LocalBusiness + Organization + WebSite JSON-LD to root layout

**Cursor Prompt:**

```
Context: SteepWood is hyper-local AND Australia-wide. Google rewards proper structured data with rich results, knowledge panel, and local pack inclusion. We use a @graph structure to declare three entities at once: LocalBusiness (the joinery business), Organization (corporate entity), and WebSite (the domain with sitelinks search potential).

Task: Add JSON-LD to src/app/layout.tsx as a server-rendered <script> tag.

Steps:
1. Create src/lib/seo/structuredData.ts with helpers:

```typescript
import { env } from '@/env';

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;
const BUSINESS_NAME = 'SteepWood';
const BUSINESS_LEGAL_NAME = 'SteepWood Joinery Pty Ltd';

export function rootStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: BUSINESS_NAME,
        legalName: BUSINESS_LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-default.jpg`,
        telephone: '+61-2-4000-0000', // TODO: replace with real number
        email: 'hello@steepwood.com.au',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'TBD workshop address',
          addressLocality: 'Newcastle',
          addressRegion: 'NSW',
          postalCode: '2300',
          addressCountry: 'AU',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -32.9283,
          longitude: 151.7817,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:00',
            closes: '17:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:00',
            closes: '13:00',
            description: 'By appointment',
          },
        ],
        areaServed: [
          // Repeat one entry per location — Newcastle, Sydney, etc.
          { '@type': 'City', name: 'Newcastle', '@id': 'https://en.wikipedia.org/wiki/Newcastle,_New_South_Wales' },
          // ...add all 16 with Wikipedia @id where possible
        ],
        sameAs: [
          'https://www.instagram.com/steepwood/',
          'https://www.facebook.com/steepwood/',
          'https://www.houzz.com.au/professionals/cabinet-makers/steepwood',
          // TODO: real URLs once social accounts created
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BUSINESS_LEGAL_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          // same social URLs as above
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-AU',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}
```

2. In src/app/layout.tsx, render the script BEFORE the closing </body>:

```tsx
import Script from 'next/script';
import { rootStructuredData } from '@/lib/seo/structuredData';

// inside RootLayout return:
<Script
  id="root-jsonld"
  type="application/ld+json"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData()) }}
/>
```

Acceptance criteria:
- View page source on `/` — the @graph JSON appears in a <script type="application/ld+json">
- Paste source into https://validator.schema.org/ → all three entities validate with 0 errors and 0 warnings
- Paste into Google's Rich Results Test → eligible for Local Business and Sitelinks Search Box rich results
- Australian English in addressRegion ("NSW" not "New South Wales" in formal data, but localised in display)
```

**Files to create or modify:**
- `src/lib/seo/structuredData.ts`
- `src/app/layout.tsx`

**Definition of Done:**
- [ ] All three entities validate at validator.schema.org
- [ ] Rich Results Test shows Local Business + Sitelinks Search Box eligibility
- [ ] @graph @id references resolve internally (organization publisher reference works)

---

### Task 2.13 — Build placeholder homepage and verify the foundation

**Cursor Prompt:**

```
Context: SteepWood — Phase 1 is nearly complete. We need a placeholder homepage so the Header, Footer, fonts, design tokens, JSON-LD all render together for Lighthouse and visual review. Phase 2 will replace this with the real homepage.

Task: Build src/app/page.tsx as a minimal placeholder.

Steps:
1. Replace src/app/page.tsx with:

```tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'SteepWood — Premium Custom Joinery in Newcastle & Australia-wide',
  description: 'SteepWood designs and crafts bespoke custom joinery — kitchens, wardrobes, vanities, and commercial fitouts — for homes and businesses across Newcastle, Sydney, and Australia-wide.',
};

export default function HomePage() {
  return (
    <main>
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-container-x py-section-y">
        <p className="font-mono text-caption uppercase tracking-widest text-amber-600 mb-stack-sm">
          Premium custom joinery · Newcastle, NSW
        </p>
        <h1 className="font-serif text-display-1 text-ink-900 max-w-4xl mb-stack-md">
          Joinery, crafted with precision and patience.
        </h1>
        <p className="text-body-lg text-ink-800 max-w-2xl mb-stack-lg">
          Made-to-measure kitchens, wardrobes, vanities, and commercial joinery —
          designed in Newcastle, delivered Australia-wide.
        </p>
        <div className="flex flex-col sm:flex-row gap-stack-sm">
          <Button asChild size="xl">
            <Link href="/quote">Get a Free Measure &amp; Quote</Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link href="/projects">View Our Work</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
```

2. Run Lighthouse on http://localhost:3000 (after `pnpm build && pnpm start`). Capture scores.

3. Run `pnpm typecheck` and `pnpm lint` — both must return 0 issues.

4. Commit: `feat(phase-1): foundation, design system, and shell complete`.

Acceptance criteria:
- Lighthouse Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO ≥95
- Real Header (sticky, with nav), real Footer (with all credentials and links), placeholder hero render together
- No console errors or warnings
- JSON-LD visible in page source
- Mobile responsive (test at 320px, 375px, 768px, 1024px, 1440px)
```

**Files to create or modify:**
- `src/app/page.tsx`

**Definition of Done — PHASE 1 CODE COMPLETE:**
- [ ] All Lighthouse categories ≥95 on placeholder home
- [ ] `pnpm build` succeeds with 0 TypeScript errors
- [ ] Header, Footer, Sticky Mobile CTA render globally
- [ ] All design tokens functional via Tailwind utility classes
- [ ] Prisma + Supabase clients wired (DB query succeeds when `DATABASE_URL` is set; graceful skip OK in CI without secrets)
- [ ] JSON-LD present in page source (live validator test → deferred to manual ops)
- [ ] Australian English used throughout copy and code comments
- [ ] Git tag: `phase-1-complete`

**Deferred to `STEEPWOOD-MANUAL-OPS.md`:** storage buckets, magic-link email branding, Resend domain, DNS, GSC, production Vercel import.

---



---

## PHASE 1 ENVIRONMENT CHECKLIST (DEFERRED — reference only)

> **Not a Phase 1 gate.** This checklist is preserved for reference. Execute it via **`docs/STEEPWOOD-MANUAL-OPS.md`** after Phase 4 code is complete, before production launch.
>
> For local development during Phases 1–4, only `.env.local` + `pnpm check:env` are required.

## SECTION 7 — ENVIRONMENT SETUP CHECKLIST

> **Purpose:** A complete pre-build checklist of every account, key, domain, and configuration step needed BEFORE Cursor starts coding. Do this in order; each item unlocks the next.

### 7.1 Local development machine (Windows)

- [ ] **Node.js 22 LTS** installed via the official installer or `winget install OpenJS.NodeJS.LTS`
- [ ] **pnpm** installed: `npm install -g pnpm` (or `corepack enable && corepack prepare pnpm@latest --activate`)
- [ ] **Git** installed (winget install Git.Git) — required for version control AND for some pnpm dependencies
- [ ] **Cursor IDE** installed from https://cursor.sh
- [ ] **PowerShell 7+** (winget install Microsoft.PowerShell) — better DX than Windows PowerShell 5
- [ ] **VS Code Tailwind CSS IntelliSense extension** installed inside Cursor
- [ ] Confirm versions: `node -v` (≥22), `pnpm -v` (≥9), `git --version`

### 7.2 GitHub

- [ ] Personal account or organisation account ready
- [ ] **Private** repository created: `steepwood/steepwood` (or under personal account)
- [ ] SSH key configured locally and added to GitHub (`ssh -T git@github.com` succeeds)
- [ ] Branch protection rule on `main`: require PR review (optional for solo dev), require status checks (Vercel build) to pass

### 7.3 Supabase

- [ ] Account created at https://supabase.com
- [ ] New project created in **ap-southeast-2 (Sydney)** region — non-negotiable for AU data residency
- [ ] Project name: `steepwood-prod`
- [ ] Database password saved in a password manager (you'll need it for connection strings)
- [ ] Database tables created per the schema in Section 1 (already done per your context)
- [ ] **Storage bucket** `quote-attachments` created with private RLS (only service_role read; signed URLs grant temporary public read)
- [ ] **Email Auth** enabled (no third-party providers needed for MVP)
- [ ] **Magic Link email** template customised in Supabase dashboard (Authentication → Email Templates)
- [ ] **RLS enabled** on all tables; default deny everything; explicit allow for service_role
- [ ] Connection strings captured:
  - `DATABASE_URL` — uses pooler, port 6543, with `?pgbouncer=true&connection_limit=1`
  - `DIRECT_URL` — direct connection, port 5432, used for Prisma migrations
- [ ] `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` captured from Project Settings → API
- [ ] Supabase CLI installed locally: `pnpm add -D supabase` (covered in Task 2.5)

### 7.4 Vercel

- [ ] Account created at https://vercel.com (sign up with GitHub for one-click repo import)
- [ ] Team or personal scope decided
- [ ] Project NOT yet imported (do this after Cursor scaffolds the repo and you push to GitHub)
- [ ] Vercel Pro plan considered (required if you need >100GB bandwidth/month or want preview deployments without time limits) — start on Hobby, upgrade when needed
- [ ] Vercel CLI installed: `pnpm add -g vercel` (optional but useful for local env var pulling)

### 7.5 Resend (transactional email)

- [ ] Account created at https://resend.com
- [ ] **Domain verified**: steepwood.com.au
  - Add DKIM CNAME records to DNS (Resend provides 3 CNAMEs)
  - Add MX record (Resend provides 1)
  - Set SPF: `v=spf1 include:spf.resend.com -all`
  - Set DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@steepwood.com.au;`
  - Verify status shows "Verified" in Resend dashboard
- [ ] API key generated and saved as `RESEND_API_KEY`
- [ ] Sender address chosen: `hello@steepwood.com.au`
- [ ] Test email sent via Resend dashboard to confirm deliverability

### 7.6 Domain and DNS

- [ ] `steepwood.com.au` registered (use a .com.au-capable registrar — VentraIP, Crazy Domains, Synergy Wholesale)
- [ ] DNS provider chosen — recommend **Vercel DNS** (free, integrates with deploys) OR **Cloudflare** (free + CDN). Note: if using Cloudflare, set DNS-only (grey cloud) for the root domain when Vercel is hosting, OR use full proxy with careful CSP configuration
- [ ] If using Vercel DNS: nameservers updated at registrar to Vercel's NS records
- [ ] If using Cloudflare: nameservers updated at registrar to Cloudflare's NS records
- [ ] Email DNS records configured (DKIM, SPF, DMARC, MX) per 7.5
- [ ] Decide on www vs apex — recommend **apex** (steepwood.com.au) as canonical, with `www.steepwood.com.au` as 301 redirect (Vercel handles automatically when both domains added to project)

### 7.7 Google services

- [ ] **Google Search Console** account ready (free, https://search.google.com/search-console) — verify property after launch
- [ ] **Google Analytics 4** property created — Measurement ID captured as `NEXT_PUBLIC_GA4_ID`
- [ ] **Google Business Profile** claimed at https://business.google.com — critical for local SEO, separate from GSC; covers NAP (name/address/phone), hours, photos, reviews
- [ ] **Google Tag Manager** (optional) — only if you anticipate adding multiple tracking pixels later

### 7.8 Branding and content assets

Before launch, gather:

- [ ] **Logo** in SVG + PNG (512×512, transparent background) — for site logo, OG images, schema
- [ ] **Hero photography** — 6-10 high-resolution workshop and finished-project photos, minimum 2000px wide
- [ ] **Workshop photography** for About page (6 images minimum)
- [ ] **Team photos** for About page (one per team member, plus group shot)
- [ ] **6 portfolio projects** with title, description, 8-12 photos each, completion date, location
- [ ] **10 verified testimonials** with name, suburb, rating, quote, source platform link
- [ ] **3 cornerstone blog posts** drafted (e.g. "Choosing benchtops for Australian kitchens", "Designing built-in wardrobes for Federation homes", "What to expect from a custom joinery project")
- [ ] **ABN, NSW Builder's Licence number, public liability insurance certificate**
- [ ] **Real phone number** with click-to-call format (+61 2 XXXX XXXX)
- [ ] **Workshop address** (street address for LocalBusiness schema and Contact page)
- [ ] **Trading hours** finalised
- [ ] **Social media handles** for Instagram, Facebook, Houzz, ProductReview.com.au

### 7.9 Legal

- [ ] **Lawyer review booked** for Privacy Policy, Terms, Australian Consumer Law statements (we provide templates in Task 3.12; lawyer must review)
- [ ] **Insurance certificates** available for upload to site
- [ ] **Warranty terms** finalised in writing (lifetime craftsmanship warranty, 10-year structural — adjust per your business)

### 7.10 Pre-launch envelope of credentials

Before starting Phase 1, create a secure password manager entry "SteepWood Build" containing:

```
GitHub repo URL + SSH path
Supabase project URL
Supabase DATABASE_URL
Supabase DIRECT_URL
Supabase NEXT_PUBLIC_SUPABASE_URL
Supabase NEXT_PUBLIC_SUPABASE_ANON_KEY
Supabase SUPABASE_SERVICE_ROLE_KEY
Vercel project URL
Vercel team slug
Resend API key
Resend domain verification status
GA4 Measurement ID
Google Search Console verification token
Domain registrar login
DNS provider login
Real business phone, address, ABN, licence number
```

---


---

## CURSOR RULES FOR THIS PHASE (also save to .cursor/rules/steepwood.mdc in Task 2.1)

The following coding standards apply to every file you generate in this phase and every subsequent phase. In Task 2.1 you will save this exact content to `.cursor/rules/steepwood.mdc`.

## SECTION 6 — CURSOR RULES FILE (.cursor/rules/steepwood.mdc)

> **Purpose:** Cursor's "Rules for AI" feature lets you embed project-wide coding standards into a markdown file that's automatically injected into every Composer prompt. This file enforces our stack, naming conventions, SEO requirements, and Australian English rule without you having to repeat them.

### How to install

1. Create the directory `.cursor/rules/` at the project root if it doesn't exist
2. Save the content below as `.cursor/rules/steepwood.mdc`
3. In Cursor Settings → Rules for AI, ensure "Project Rules" is enabled

### File contents

```markdown
---
description: SteepWood — Next.js 15 custom joinery site coding standards
globs: ["**/*.ts", "**/*.tsx", "**/*.css", "**/*.md"]
alwaysApply: true
---

# SteepWood Coding Standards

You are working on **SteepWood**, a premium custom joinery website. Apply these rules to every change.

## Stack (non-negotiable)

- **Next.js 15.3+** App Router only (no Pages Router)
- **React 19** with Server Components by default; Client Components only when needed
- **TypeScript 5.8+** with `strict: true` and `noUncheckedIndexedAccess: true`
- **Tailwind v4.1** CSS-first — `@theme` in globals.css, NO tailwind.config.ts file
- **Prisma 6** for all direct DB queries; **@supabase/ssr 0.6+** for auth + storage
- **shadcn/ui v4** for primitive components
- **react-hook-form 7.54+ + zod 3.24+** for all forms
- **Resend 4+** for transactional email (React Email templates)
- **pnpm** package manager
- **Australian English** throughout — code comments, copy, alt text, schema

## File and naming conventions

- File names: PascalCase for components (`HeroBanner.tsx`), kebab-case for routes (`custom-kitchen-joinery/`), camelCase for utilities (`buildServiceMetadata.ts`)
- Component names: PascalCase
- Functions: camelCase, verbs (`resolveService`, `getAggregateRating`)
- Constants: SCREAMING_SNAKE_CASE
- Hooks: prefix with `use`
- Server actions: in `src/app/actions/`, suffix with the entity (e.g. `quote.ts`, `contact.ts`)
- Types: prefer `type` over `interface` unless declaration merging needed
- No default exports for components; use named exports for tree-shake friendliness

## React patterns

- Server Component is the default. Add `'use client'` only when the file:
  - uses state (useState/useReducer)
  - uses effects (useEffect/useLayoutEffect)
  - uses browser-only APIs (window, document)
  - registers event listeners
- Keep Client Components as small as possible — push state down, lift Server Component rendering up
- Wrap Prisma queries in React `cache()` from 'react' when called from multiple places per request (e.g. generateMetadata + page body)
- Use Suspense with skeleton fallbacks for any data fetch that could be slow

## SEO requirements (apply to EVERY page)

Every page MUST include:

1. `generateMetadata` returning title (≤60 chars), description (150-160 chars), openGraph, twitter, alternates.canonical
2. `revalidate` exported (default 86400s for static, 3600s for blog, 0 for admin)
3. JSON-LD structured data appropriate to the page type:
   - Home: LocalBusiness + Organization + WebSite (in root layout @graph — already done)
   - Service pillar: Service + BreadcrumbList + FAQPage
   - Location hub: LocalBusiness + BreadcrumbList + FAQPage
   - Service+Location: Service + LocalBusiness + BreadcrumbList + FAQPage + AggregateRating (when reviews exist)
   - Blog post: BlogPosting + BreadcrumbList
   - Project: ImageGallery + BreadcrumbList + Review (if testimonial linked)
4. `<h1>` with the primary keyword
5. Semantic HTML: `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
6. All images use `next/image` with width + height (or fill + aspect-ratio container)
7. All internal links use `next/link` Link component with descriptive anchor text (NOT "click here", "learn more", "read more")
8. No use of `<a href="/internal-path">` for internal links — always Link

## Prisma patterns

- Singleton client from `@/lib/db/prisma` only — never `new PrismaClient()` directly
- Always use Prisma's typed methods; never raw SQL unless absolutely necessary
- For read queries reused across components, wrap in `cache()` and put in `src/lib/db/cached.ts`
- Pagination: use `take` + `skip` for offset pagination; for cursor pagination use `cursor` + `take`
- Never log full DB results in production code (sensitive data risk)

## Form patterns

- All forms use react-hook-form with zod resolver
- Zod schemas live in `src/lib/validations/<entity>.ts`
- Submit handler calls a server action in `src/app/actions/<entity>.ts`
- Server action: validate with zod, check honeypot, persist, return `{ ok: boolean, error?: string, data?: T }`
- Use Sonner for success/error toasts
- Honeypot field name "company" or "website" — hidden via `aria-hidden + tabindex=-1 + style absolute -9999px`

## Styling patterns

- Use Tailwind utility classes; never inline `style={}` except for dynamic CSS variables
- Use design tokens (see globals.css @theme): bg-ink-900, text-amber-500, font-serif, text-display-1, p-section-y, etc.
- Mobile-first: write base classes for mobile, then add `sm:`, `md:`, `lg:`, `xl:` overrides
- Container width: `max-w-7xl mx-auto px-container-x`
- Section padding: `py-section-y`
- For complex variants on shadcn primitives, edit the component's `variants` in cva config rather than overriding with utility classes downstream

## Accessibility (WCAG 2.2 AA — non-negotiable)

- All interactive elements have visible focus indicators (focus-visible:ring-2 ring-amber-500 ring-offset-2)
- All images have descriptive `alt` text (decorative images: `alt=""`)
- All form inputs have associated `<label>` elements (use shadcn Form which handles this)
- All buttons have accessible names (text content OR aria-label for icon-only buttons)
- Colour contrast ≥4.5:1 for body text, ≥3:1 for large text — verify with browser DevTools
- Touch targets ≥44×44 CSS pixels on mobile
- Respect prefers-reduced-motion (globals.css has the rule already)
- Use semantic HTML; don't use `<div>` for clickable things — use `<button>` or `<a>`

## Australian English

This is non-negotiable. Use Australian spelling in ALL user-facing copy, code comments, JSON-LD descriptions, alt text, and meta tags:

- ✓ colour (not color)
- ✓ centre (not center)
- ✓ favourite (not favorite)
- ✓ organisation (not organization)
- ✓ specialise, customise, recognise (-ise not -ize)
- ✓ kilometres, metres (not kilometers, meters)
- ✓ catalogue (not catalog)
- ✓ programme (when meaning a structured plan), program (for software/computer)
- ✓ enquiry (not inquiry)
- ✓ practise (verb), practice (noun)
- ✓ licence (noun), license (verb)
- ✓ defence (not defense)
- ✓ analyse (not analyze)
- ✓ travelling, travelled (double l)
- ✓ "you'll receive your quote within 1 business day" — note no full stop after numerals when in headlines

CSS/Tailwind keywords stay in US English because they are reserved technical terms — `text-color`, `border-color`, `background-color` are CSS specs, not our copy. Use ink/amber/sage colour scale names in our @theme.

## Comments

- Code comments: Australian English, sentence case, full stops at end
- TODO comments: format `// TODO: <description> (<initials> <YYYY-MM-DD>)`
- FIXME for known bugs to address
- NOTE for non-obvious decisions worth preserving

## Performance defaults

- Default to next/image, next/link, next/script
- Default to Server Components — only opt into Client when needed
- Default to ISR (revalidate=86400 for marketing pages, 3600 for blog) — only use force-dynamic for admin/forms
- Default to lazy loading (next/image is lazy by default except priority=true for above-fold)
- Default to AVIF/WebP image formats (configured in next.config.ts)
- Avoid blocking the main thread: useDeferredValue, useTransition, dynamic() with ssr:false for heavy client-only widgets

## When generating code

- Always produce complete, working code — no `// ...` placeholders
- Always include the imports at the top
- Always include TypeScript types — no `any` (use `unknown` if truly unknown, then narrow)
- Always include error handling for async operations
- Always include accessibility attributes
- Always include JSON-LD for new pages where appropriate
- When uncertain about a pattern, prefer the documented pattern in the master build document over invention

## When asked to refactor

- Preserve existing behaviour first; verify with the developer before changing behaviour
- Update tests if any
- Update affected types throughout

## Commit message format

- Conventional Commits: `<type>(<scope>): <description>`
- Types: feat, fix, chore, docs, refactor, test, perf, style
- Scopes: foundation, design-system, seo, quote, blog, admin, perf, a11y, dx
- Examples:
  - `feat(quote): add multi-step quote form Step 1`
  - `perf(images): preload LCP hero image on homepage`
  - `fix(seo): correct BreadcrumbList @id resolution`
```

### Why these rules matter

- **Stack lock** — prevents Cursor from suggesting Pages Router, useEffect data fetching, or non-Prisma DB queries
- **Australian English** — saves you from line-by-line copy reviews
- **SEO checklist** — every page Cursor generates will include metadata, schema, semantic HTML
- **Accessibility floor** — WCAG AA enforced as a baseline, not an afterthought
- **Performance defaults** — Server Components, ISR, lazy loading become muscle memory



---

## PHASE 1 ACCEPTANCE CRITERIA

Do not declare Phase 1 complete unless ALL of the following are true:

- [ ] `pnpm dev` runs without errors and serves `http://localhost:3000`.
- [ ] `pnpm build` succeeds with zero TypeScript errors and zero ESLint errors.
- [ ] `pnpm lint` passes with zero warnings.
- [ ] `pnpm typecheck` passes.
- [ ] `.env.example` exists with placeholder values for every variable referenced in `.env.local`. `.env.local` is gitignored.
- [ ] Prisma client singleton imports from `@/lib/prisma` and `pnpm prisma generate` succeeds.
- [ ] Supabase SSR client works in a server component (verified with a test call).
- [ ] Fraunces, General Sans, IBM Plex Mono all render correctly on the placeholder homepage (verified visually and via DevTools → Computed → font-family).
- [ ] Tailwind v4 theme tokens from Section 1.4 are applied via `@theme` block in `app/globals.css`. No `tailwind.config.ts` exists.
- [ ] `npx shadcn@latest add button` succeeds and the Button renders with brand colours.
- [ ] Header: desktop nav shows all top-level links; mobile drawer opens/closes via keyboard (Esc); sticky behaviour reduces height on scroll.
- [ ] Footer: NAP block, all 16 locations grid, credentials row, legal links present.
- [ ] Sticky Mobile CTA bar appears below 768px viewport with Call + Quote buttons.
- [ ] Root layout `<head>` contains LocalBusiness, Organization, and WebSite JSON-LD (verified by viewing source and running [schema.org validator](https://validator.schema.org/)).
- [ ] Placeholder homepage Lighthouse mobile scores: Performance ≥ 90, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.
- [ ] All commits follow `phase-1: <task-id> <message>` format.
- [ ] Final commit tagged `phase-1-complete`.

When every box is ticked, stop and tell me Phase 1 is complete. Then open the Phase 2 prompt file.
