# SteepWood — Cursor Build Prompt: PHASE 3 of 4
## LEAD GENERATION AND CONTENT ENGINE

> **How to use this file with Cursor:**
> 1. Open the SteepWood project where Phase 2 finished (git tag `phase-2-complete` should exist).
> 2. Open Cursor Chat (Cmd/Ctrl+L), select **Agent** mode.
> 3. Paste the line below into the chat first:
>    `Read this entire file end-to-end before doing anything. Then execute Phase 3 task-by-task in order. After each task, run verification commands, summarise, and wait for me to say "next" before starting the next task. Use Australian English throughout.`
> 4. Then attach or paste this file.
> 5. When Phase 3 is complete and you've tagged `phase-3-complete`, open the Phase 4 prompt file.

---

## BUILD-FIRST WORKFLOW

**Phase 3 = code only.** Do not block on: Supabase bucket creation in dashboard, RLS SQL in production, Resend domain verification, live email deliverability tests, admin magic-link E2E on production, or `cms-media` bucket setup.

Implement code paths; fail gracefully when env keys are missing. All external verification → **`docs/STEEPWOOD-MANUAL-OPS.md`** §3–5 and §9 (after Phase 4).

---

## PHASE 3 SCOPE (what this phase ships)

By the end of Phase 3 you will have:
- A 3-step Quote Request form (service type → project details + image upload → contact details + submit) with full validation, accessibility, and saved-state.
- Resend wired for transactional email (lead notifications to SteepWood, confirmation emails to the user).
- Supabase Storage configured for quote image uploads with size and type limits.
- A Portfolio Gallery (`/portfolio/`) and Project Detail pages (`/portfolio/[slug]/`) with image optimisation, lightbox, and structured data (`CreativeWork` or `Project` schema).
- A Blog system (`/blog/` index + `/blog/[slug]/` detail) supporting MDX, with `Article` schema, author bio, related posts, and category/tag pages.
- A Testimonials display block (used on home + service + location pages) backed by Supabase, with `AggregateRating` schema on the homepage.
- An Admin panel (`/admin/`) protected by Supabase Auth — dashboard shell with role-gated access.
- Admin CRUD for: Quote Requests (read + status updates), Testimonials (full CRUD), Blog Posts (full CRUD with MDX preview), Portfolio Projects (full CRUD with image upload), Service/Location intro overrides (lets the SteepWood team tweak intro paragraphs without redeploying).

**Phase 3 does NOT build:** analytics events (Phase 4), performance optimisation (Phase 4), security headers (Phase 4), launch QA (Phase 4).

**Phase 3 milestone tag:** `phase-3-complete`

---

## CRITICAL CONSTRAINTS (applies to every Phase 3 task)

1. **Lead capture is the #1 KPI.** Every decision in the Quote form should reduce friction. Multi-step is non-negotiable (Step 1 = service, Step 2 = details, Step 3 = contact). Save state between steps in `sessionStorage` so refresh doesn't wipe progress.
2. **Form accessibility:** Visible labels, error messages tied with `aria-describedby`, `aria-invalid` on errored fields, focus management between steps, submit button states (idle/loading/success/error), and a polite live region for success/error announcements.
3. **Resend rules:** Two emails per submission — one to `quotes@steepwood.com.au` with all details, one to the lead with a confirmation + what-happens-next. From address: `quotes@steepwood.com.au` (configured in Resend with SPF/DKIM).
4. **Supabase Storage:** Bucket `quote-uploads` with policy that allows authenticated inserts only via the Quote API route (no direct client uploads). Max 10 MB per image, JPEG/PNG/WebP/HEIC only, max 5 images per submission.
5. **Admin panel security:** Server-only auth check via Supabase SSR client at the layout level. No client-side guard alone. Role check against `profiles.role = 'admin'` in Postgres.
6. **Blog MDX:** Use `next-mdx-remote` with a strict allowlist of components. Frontmatter required: `title`, `description`, `publishedAt`, `updatedAt`, `author`, `tags`, `heroImage`. Every post needs `Article` schema.
7. **Australian English, no emojis, no exclamation points in body copy.**
8. **Commit format:** `phase-3: <task-id> <short description>`.
9. **Do not start Phase 3 until `phase-2-complete` tag exists.**

---

## EMBEDDED CONTEXT — PROJECT, DESIGN, ARCHITECTURE (READ FIRST)

These locked specs apply to every component you build.

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

## SECTION 4 — PHASE 3: LEAD GENERATION AND CONTENT ENGINE

> **Phase goal:** Turn the static SEO machine into a conversion-and-content engine — ship the multi-step quote form (with Supabase Storage uploads + Resend notifications), the portfolio system, the testimonials display, blog architecture, and a minimal admin CMS for the SteepWood team to add content without touching code.
>
> **Phase duration:** Days 13–20 of the build.
>
> **Definition of phase done:**
> - Multi-step quote form submits end-to-end (DB row + file uploads + email notification + thank-you redirect)
> - Portfolio system supports adding new projects via admin panel; gallery + detail pages render
> - Blog system supports drafting, scheduling, and publishing posts; index + post pages render with full schema
> - Testimonials display on home/service/location pages; AggregateRating updates as new ones are approved
> - Admin panel is protected by Supabase Auth; only @steepwood.com.au emails allowed
> - Email notifications fire reliably (verified via Resend dashboard logs)

---

### Task 4.1 — Build the multi-step Quote form (Step 1: Service type)

**Cursor Prompt:**

```
Context: The quote form is SteepWood's primary conversion mechanic. Industry data shows multi-step forms outperform single-page forms by 30-50% for high-consideration purchases because they reduce perceived effort. We split into 3 steps: (1) Service type + project size, (2) Project details + image upload, (3) Contact details. Each step submits to the next via client-side state (Zustand) and only the final step persists to DB via a server action.

Task: Build src/app/quote/page.tsx with multi-step shell and Step 1.

Steps:
1. Install Zustand if not already: `pnpm add zustand@^5.0.0`.

2. Create src/lib/stores/quoteForm.ts:
   - Zustand store with state: step (1-3), data (partial QuoteFormData)
   - Actions: setStep(n), updateData(partial), resetForm()
   - Use persist middleware to localStorage (so users don't lose progress on refresh, but include an expiry of 24h)

3. Create src/lib/validations/quote.ts with three zod schemas (Step1Schema, Step2Schema, Step3Schema) and a combined QuoteSchema that all three must pass:
   - Step1: serviceTypes (array of enum, min 1), projectScope (enum: "single-room" | "multi-room" | "full-home" | "commercial"), budgetRange (enum: "<10k" | "10-25k" | "25-50k" | "50-100k" | "100k+" | "not-sure"), timeframe (enum: "asap" | "1-3-months" | "3-6-months" | "6-12-months" | "exploring")
   - Step2: locationSlug (enum of 16), suburb (string min 2), propertyType (enum: "house" | "apartment" | "commercial-space" | "new-build"), projectDescription (string min 30, max 1500), attachments (array of {url: string, name: string, mimeType: string, size: number}, max 5)
   - Step3: fullName (string min 2), email (email), phone (regex for AU mobile/landline), preferredContact (enum: "email" | "phone" | "either"), consentMarketing (boolean), consentPrivacy (boolean, must be true)

4. Create src/app/quote/page.tsx — Server Component that renders <QuoteFormShell /> Client Component. Add metadata: title "Get a Free Measure & Quote — SteepWood", description, canonical /quote/.

5. Create src/components/forms/quote/QuoteFormShell.tsx:
   - Reads step from Zustand
   - Renders progress bar at top showing 1 → 2 → 3 with active step highlighted in amber
   - Renders Step1Form, Step2Form, or Step3Form conditionally
   - Includes "← Back" link to previous step (disabled on Step 1)

6. Create src/components/forms/quote/Step1Form.tsx:
   - Service type selector — 10-card checkbox grid (each card has service name + icon, lights up amber when selected). Multi-select allowed.
   - Project scope — 4 radio cards
   - Budget — 6 radio buttons in a row (responsive: stack on mobile)
   - Timeframe — 5 radio buttons
   - "Continue" Button — disabled until Step1Schema validates
   - On click: updateData + setStep(2)
   - Form uses react-hook-form with zod resolver

Acceptance criteria:
- /quote/ renders with Step 1 visible
- Progress bar shows 33% complete on Step 1
- Validation prevents progressing without selecting at least one service
- Local storage persists state across page refresh (within 24h window)
- All interactive elements WCAG AA accessible (focus rings, labels, keyboard nav)
```

**Files to create or modify:**
- `src/lib/stores/quoteForm.ts`
- `src/lib/validations/quote.ts`
- `src/app/quote/page.tsx`
- `src/components/forms/quote/QuoteFormShell.tsx`
- `src/components/forms/quote/Step1Form.tsx`
- `src/components/forms/quote/ProgressBar.tsx`

**Definition of Done:**
- [ ] Step 1 validates and advances to Step 2
- [ ] Local storage persistence works (test by filling fields, refreshing browser)
- [ ] Accessibility audit on Step 1 passes (keyboard nav, screen reader labels)

---

### Task 4.2 — Build Quote form Step 2 (project details + image upload)

**Cursor Prompt:**

```
Context: Step 2 captures project specifics and lets users upload reference images or floor plans. We use Supabase Storage with signed upload URLs to keep file traffic off our Next.js server. Max 5 files, 10MB each, MIME-restricted (image/* + PDF).

Task: Build src/components/forms/quote/Step2Form.tsx with full upload flow.

Steps:
1. Fields:
   - Location: shadcn Select with all 16 locations grouped by region
   - Suburb: Input
   - Property type: 4 radio cards
   - Project description: Textarea (min 30, max 1500 chars, char counter shown)
   - Reference images: drag-and-drop file upload zone (use react-dropzone: `pnpm add react-dropzone`)

2. File upload UX:
   - Drag-and-drop zone with "Drop files here or click to browse" copy
   - Accepted formats listed: JPG, PNG, WebP, PDF
   - Max 5 files, 10MB each — enforce client-side BEFORE upload
   - On drop: for each file, call `createSignedUploadUrl` server action (route handler at /api/upload-url, accepts filename + mimeType + size, returns signed URL OR error)
   - Upload directly to Supabase Storage via PUT (fetch)
   - Show progress bar per file
   - On success: store {url, name, mimeType, size} in form state
   - "Remove" button per file (X icon)
   - Display image thumbnails inline; PDF shows generic PDF icon

3. Server validation in /api/upload-url:
   - Validate MIME type strict allowlist
   - Validate file size
   - Reject if user already has 5 files in current draft (track via session cookie OR rely on client-side only — for MVP rely on client + final DB-level constraint)
   - Generate path: `quote-attachments/draft-{nanoid}/{uuid}-{sanitised-filename}`
   - Return signed URL with 5-minute expiry

4. Validation: Step2Schema must pass before "Continue" enables.

5. UX polish:
   - On upload error, show Sonner toast with specific reason ("File too large", "Format not supported")
   - On Step 2 mount, restore uploaded files from Zustand if present (refresh recovery)

Acceptance criteria:
- Drag-and-drop accepts JPG/PNG/WebP/PDF
- Reject >10MB files with clear toast
- Reject 6th file with clear message
- Upload progress visible per file
- Files stored at correct Supabase Storage path with private RLS
- Step advances to Step 3 on valid submit
```

**Files to create or modify:**
- `src/components/forms/quote/Step2Form.tsx`
- `src/components/forms/quote/FileUploadZone.tsx`
- `src/app/api/upload-url/route.ts`
- `package.json` (react-dropzone)

**Definition of Done:**
- [ ] Upload to Supabase Storage works end-to-end
- [ ] File constraints enforced client + server
- [ ] Mobile UX works (tested on iOS Safari and Chrome Android — touch-friendly drop zone)

---

### Task 4.3 — Build Quote form Step 3 (contact details + submit)

**Cursor Prompt:**

```
Context: Step 3 is contact + consent + final submit. Submitting persists to prisma.quoteRequest, copies attachment file paths into a related quote_attachments table or JSON column, fires email notifications via Resend (to internal team AND auto-reply to user), then redirects to /quote/thank-you/.

Task: Build src/components/forms/quote/Step3Form.tsx and the submit server action.

Steps:
1. Fields:
   - Full name (Input)
   - Email (Input type="email")
   - Phone (Input — validate AU format: starts with +61, 04, 02, 03, 07, or 08, etc.)
   - Preferred contact: 3 radio buttons (Email / Phone / Either)
   - Consent checkboxes:
     - [ ] I'd like to receive occasional design inspiration emails (optional)
     - [✓] I agree to SteepWood's Privacy Policy and Terms (required — pre-checked is illegal in AU; must be unchecked by default)
   - Honeypot field "website" hidden via CSS

2. Submit button: "Send my quote request" — disabled while submitting, shows Sonner toast on result.

3. Server action src/app/actions/quote.ts:
   ```typescript
   export async function submitQuote(payload: QuoteFormData) {
     // Validate honeypot
     if (payload.honeypot) return { ok: false, error: 'spam' };
     // Validate full QuoteSchema
     const parsed = QuoteSchema.safeParse(payload);
     if (!parsed.success) return { ok: false, error: 'validation', issues: parsed.error.flatten() };
     // Persist to DB
     const quote = await prisma.quoteRequest.create({ data: { ... } });
     // Send notification email to team
     await sendQuoteNotification(quote);
     // Send auto-reply to user
     await sendQuoteAutoReply(quote);
     // Return success with quote ID
     return { ok: true, quoteId: quote.id };
   }
   ```

4. Reset Zustand store on success, redirect to /quote/thank-you/ with quote ID in search params (e.g. ?ref=abc123).

5. Create /quote/thank-you/page.tsx — confirmation page with:
   - Large "Thank you, {name}" heading
   - "We've received your request. Our team will be in touch within 1 business day."
   - Quote reference number
   - "What happens next" 4-step explanation
   - Links to /projects/ and /blog/ to keep user engaged

Acceptance criteria:
- Quote submission creates a quote_requests row with all data
- Email fires to hello@steepwood.com.au (verified in Resend dashboard)
- Auto-reply email arrives at user's email within 30s
- Honeypot rejects spam
- Redirect to thank-you page works
- Form resets fully (cannot resubmit same form by going back)
```

**Files to create or modify:**
- `src/components/forms/quote/Step3Form.tsx`
- `src/app/actions/quote.ts`
- `src/lib/email/quoteNotifications.ts`
- `src/app/quote/thank-you/page.tsx`

**Definition of Done:**
- [ ] End-to-end quote submission tested
- [ ] Both internal and user emails verified
- [ ] Thank-you page renders with reference number

---

### Task 4.4 — Wire Resend for transactional email

**Cursor Prompt:**

```
Context: Resend is our transactional email provider. Already installed, RESEND_API_KEY in .env.local. We need to configure DKIM + SPF + DMARC for steepwood.com.au domain (do this in Vercel DNS) and build reusable email templates using React Email.

Task: Build the email infrastructure.

Steps:
1. Install: `pnpm add resend@^4.0.0 react-email@^3.0.0 @react-email/components@^0.0.31`.

2. DNS setup (user action — document in Section 7):
   - Verify steepwood.com.au domain in Resend dashboard
   - Add DKIM TXT records to DNS (Vercel DNS or wherever steepwood.com.au is registered)
   - SPF: `v=spf1 include:spf.resend.com -all`
   - DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@steepwood.com.au;`

3. Create src/lib/email/client.ts:
   ```typescript
   import { Resend } from 'resend';
   import { env } from '@/env';
   export const resend = new Resend(env.RESEND_API_KEY);
   ```

4. Create email templates in src/emails/:
   - QuoteAutoReplyEmail.tsx — confirmation to user with reference number, "what happens next" timeline, contact info
   - QuoteNotificationEmail.tsx — internal team email with full quote details, attachment links, "View in admin" CTA linking to /admin/quotes/[id]
   - ContactFormEmail.tsx — internal team email for general enquiries

   Each uses React Email components: <Html>, <Body>, <Container>, <Heading>, <Text>, <Button>, <Hr>, <Link>. Style with inline CSS via the React Email <Tailwind> wrapper.

5. Create src/lib/email/quoteNotifications.ts:
   - `sendQuoteAutoReply(quote)` — renders template, calls resend.emails.send with from: RESEND_FROM_EMAIL, to: quote.email, replyTo: QUOTE_NOTIFY_EMAIL
   - `sendQuoteNotification(quote)` — renders template, calls send with to: QUOTE_NOTIFY_EMAIL

6. Error handling: if Resend send fails, log but DO NOT fail the quote submission (DB row persists; team can retry email send from admin panel).

7. Add Resend webhook handling at /api/webhooks/resend for delivery/bounce/complaint events. Update quote_requests table with delivery status.

Acceptance criteria:
- Test email arrives in inbox within 30s
- React Email template renders correctly in Gmail, Outlook, Apple Mail, Yahoo (test all four)
- DKIM + SPF + DMARC all PASS at https://mxtoolbox.com/
- Webhook receives events from Resend (test by sending a quote, checking webhook logs)
```

**Files to create or modify:**
- `src/lib/email/client.ts`
- `src/lib/email/quoteNotifications.ts`
- `src/emails/QuoteAutoReplyEmail.tsx`
- `src/emails/QuoteNotificationEmail.tsx`
- `src/emails/ContactFormEmail.tsx`
- `src/app/api/webhooks/resend/route.ts`

**Definition of Done:**
- [ ] Both quote emails deliver
- [ ] DNS records validate
- [ ] Email rendering verified in 4 major clients

---

### Task 4.5 — Build the Portfolio Gallery and Project Detail pages

**Cursor Prompt:**

```
Context: Portfolio is the most-clicked section after the homepage. It shows craftsmanship before users contact. We build a filterable gallery at /projects/ and rich detail pages at /projects/[slug]/. Projects are stored in prisma.portfolioProject (already schemed) with fields: title, slug, summary, category, locationId, completedAt, heroImage, gallery (jsonb array), status, featured.

Task: Build the portfolio section.

Steps:
1. /projects/page.tsx — Server Component, ISR 86400s:
   - generateMetadata: title "Our Projects — Custom Joinery Portfolio | SteepWood", description, canonical
   - Hero: Fraunces display-2 "Selected works", subhead
   - Filter bar (Client Component island, useSearchParams for URL state):
     - Filter by service category (10 options + All)
     - Filter by location/region (16 options + All)
     - Filter by year completed (last 5 years)
   - Project grid: 3 columns desktop, 2 tablet, 1 mobile. Each card = next/image (16:10 ratio) + title overlay on hover + summary.
   - Pagination: 12 projects per page, "Load more" Client Component that fetches via server action OR paginated server-rendered with searchParams.page.
   - On click: navigate to /projects/[slug]/

2. /projects/[slug]/page.tsx — Server Component, ISR 86400s, dynamicParams = false:
   - generateStaticParams returns all published slugs
   - generateMetadata: per-project title, description, OG image (use project.heroImage)
   - Hero: full-bleed project.heroImage + project.title + meta (category, location, completed date)
   - Long-form description (project.description, 300-500 words)
   - Gallery: 8-12 photos in a masonry grid with lightbox (use yet-another-react-lightbox: `pnpm add yet-another-react-lightbox`)
   - Project details sidebar: client (anonymised: "Sydney homeowners"), service category, location, completion date, materials used
   - Testimonial from this project (if linked)
   - "Similar projects" — 3 related projects (same category or same location)
   - CTA: "Inspired? Get a free measure & quote"

3. JSON-LD: ImageGallery + BreadcrumbList. If testimonial attached, include Review schema.

4. Image optimisation:
   - Hero images: 1600×1000 (16:10), priority + fetchPriority="high"
   - Gallery: 1200×800, lazy load, responsive sizes
   - All next/image with alt text from project.gallery[].alt

Acceptance criteria:
- /projects/ renders 12+ project cards in a responsive grid
- Filter by category updates URL (?category=kitchen) and re-renders
- /projects/[slug]/ shows full project with gallery and lightbox
- All images CLS=0 (explicit width/height)
- Lighthouse Performance ≥95 on a project detail page
```

**Files to create or modify:**
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/components/portfolio/ProjectGrid.tsx`
- `src/components/portfolio/ProjectFilter.tsx`
- `src/components/portfolio/ProjectGallery.tsx`
- `src/lib/seo/projectStructuredData.ts`

**Definition of Done:**
- [ ] /projects/ filters work via URL
- [ ] /projects/[slug]/ pages generate at build for all published projects
- [ ] Lightbox works keyboard-accessibly

---

### Task 4.6 — Build the Blog system

**Cursor Prompt:**

```
Context: A blog drives long-tail SEO traffic (kitchen design tips, joinery materials guides, Australian home trends). It also supports thought-leadership for the brand. Posts stored in prisma.blogPost with title, slug, excerpt, body (MDX), heroImage, author, publishedAt, status, category, tags, readingTime.

We use MDX for rich content (components inside markdown). For the MVP, we render MDX server-side; future iterations can add an admin WYSIWYG.

Task: Build the blog index and post pages.

Steps:
1. Install: `pnpm add next-mdx-remote@^5.0.0 rehype-pretty-code@^0.14.0 remark-gfm@^4.0.0`.

2. /blog/page.tsx — Server Component, ISR 3600s:
   - Hero: "Insights from the workshop"
   - Featured post (largest card, top of grid)
   - 12 latest posts in 3-column grid
   - Sidebar: category filter, popular tags, "Subscribe to our newsletter" embed
   - Pagination via searchParams.page

3. /blog/[slug]/page.tsx — Server Component, ISR 3600s, dynamicParams = false:
   - generateStaticParams from published posts
   - Hero: title (Fraunces display-2), author + date + reading time, heroImage
   - Body: MDX-rendered article with custom components ({Callout, ImageWithCaption, ServiceCTA, ProjectEmbed})
   - Table of contents (auto-generated from h2/h3, sticky on desktop)
   - Author bio at end
   - Related posts: 3 by same category
   - CTA at end: "Planning a project? Get a free measure & quote"
   - Comments: skip for MVP

4. JSON-LD: BlogPosting (subtype of Article) with author, datePublished, dateModified, image, headline, articleBody, mainEntityOfPage.

5. MDX components in src/components/mdx/:
   - Callout (info, warning, tip variants)
   - ImageWithCaption (next/image + figcaption)
   - ServiceCTA (mid-article CTA card linking to a specific service)
   - ProjectEmbed (embeds a featured project card)

6. Add reading time calculation: src/lib/blog/readingTime.ts — strips markdown, counts words, divides by 200 wpm, rounds up.

Acceptance criteria:
- /blog/ paginates correctly via URL
- /blog/[slug]/ renders MDX with custom components
- BlogPosting JSON-LD validates
- Table of contents updates as user scrolls (sticky highlight)
- Lighthouse Performance ≥95
```

**Files to create or modify:**
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/blog/BlogGrid.tsx`
- `src/components/blog/BlogSidebar.tsx`
- `src/components/blog/TableOfContents.tsx`
- `src/components/mdx/*.tsx` (Callout, ImageWithCaption, ServiceCTA, ProjectEmbed)
- `src/lib/blog/readingTime.ts`
- `src/lib/seo/blogStructuredData.ts`

**Definition of Done:**
- [ ] Blog index + post pages render
- [ ] MDX components render correctly
- [ ] BlogPosting schema validates
- [ ] At least 3 seed posts in DB for testing

---

### Task 4.7 — Build the Testimonials display + AggregateRating

**Cursor Prompt:**

```
Context: Social proof is critical for high-consideration purchases. We display testimonials throughout the site (homepage, service pages, location pages, project pages) and aggregate them into an AggregateRating for schema-driven rich results (star ratings in SERPs).

Testimonials are stored in prisma.testimonial with fields: name, suburb, rating (1-5), quote, projectId (optional), serviceId (optional), locationId (optional), sourcePlatform (Google/Houzz/ProductReview/Direct), sourceUrl, verified, featured, displayOrder.

Task: Build the testimonials components and integrate AggregateRating schema.

Steps:
1. Create src/components/testimonials/TestimonialCard.tsx:
   - Quote in serif italic
   - Star rating (★★★★★) using Lucide Star icons
   - Attribution: "— {name}, {suburb}"
   - Source badge (Google/Houzz logo + "Verified review")
   - Click → opens shadcn Dialog with full review

2. Create src/components/testimonials/TestimonialGrid.tsx — 3-column grid of TestimonialCards.

3. Create src/components/testimonials/TestimonialsCarousel.tsx — alternative horizontal carousel for the homepage (use embla-carousel-react: `pnpm add embla-carousel-react`).

4. Create src/lib/testimonials/aggregateRating.ts:
   - `getAggregateRating(filter?: { serviceId?: string; locationId?: string })` — returns { ratingValue: number, reviewCount: number, bestRating: 5, worstRating: 1 }
   - Wrapped in React `cache()` for request dedup
   - Returns null if fewer than 5 verified testimonials match (per Google's threshold for showing rating in SERPs)

5. Integrate into pages:
   - Homepage testimonials section (Task 3.1) uses the global AggregateRating
   - Service pillar pages use filter { serviceId }
   - Location hubs use filter { locationId }
   - Service+location pages use both filters

6. AggregateRating JSON-LD per page (only when ≥5 reviews):
   ```json
   "aggregateRating": {
     "@type": "AggregateRating",
     "ratingValue": "4.9",
     "reviewCount": "87",
     "bestRating": "5",
     "worstRating": "1"
   }
   ```

7. Add individual Review schemas only when there are <10 reviews on the page (above 10 only AggregateRating is needed for SERP).

Acceptance criteria:
- TestimonialCard renders with all metadata
- AggregateRating JSON-LD validates
- AggregateRating updates dynamically as new testimonials are approved in admin
- All testimonials displayed are flagged `verified: true` in DB (admin must verify before display)
```

**Files to create or modify:**
- `src/components/testimonials/TestimonialCard.tsx`
- `src/components/testimonials/TestimonialGrid.tsx`
- `src/components/testimonials/TestimonialsCarousel.tsx`
- `src/lib/testimonials/aggregateRating.ts`
- `src/lib/seo/aggregateRatingSchema.ts`

**Definition of Done:**
- [ ] Testimonials display on home, service, location, combo pages
- [ ] AggregateRating shows in Rich Results Test as eligible
- [ ] Only verified testimonials shown

---

### Task 4.8 — Build the Admin panel (auth + dashboard shell)

**Cursor Prompt:**

```
Context: SteepWood team needs a minimal admin panel to: (1) view and triage incoming quote requests, (2) approve testimonials, (3) publish blog posts, (4) add portfolio projects, (5) manage service+location custom intros. We don't need a full Sanity/Strapi — just a Next.js admin section protected by Supabase Auth.

Email-allowlist auth: only emails matching @steepwood.com.au can log in. Use Supabase Auth Magic Link (no passwords).

Task: Build /admin/ shell with auth.

Steps:
1. Create src/app/admin/layout.tsx:
   - Server Component
   - Checks for authenticated user via createClient() from supabase/server.ts
   - If no user or user.email doesn't end in @steepwood.com.au, redirect('/admin/login')
   - Otherwise render admin shell: sidebar nav (Quote Requests, Testimonials, Blog Posts, Projects, Services & Locations, Settings), top bar with user email and logout

2. /admin/login/page.tsx:
   - Magic Link form: email Input + "Send login link" Button
   - On submit: server action calls supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: SITE_URL + '/auth/callback', shouldCreateUser: false } })
   - Add Supabase Auth callback at /auth/callback/route.ts (per @supabase/ssr docs)
   - Show Sonner toast: "Check your email for the login link"

3. Supabase Auth Email Templates: customise the magic-link email in Supabase dashboard → Authentication → Email Templates. Use SteepWood branding, Australian English.

4. RLS policies:
   - Apply row-level security on admin_users table (only authenticated user can read own row)
   - Apply RLS on quote_requests, testimonials, blog_posts, portfolio_projects: only authenticated users with email matching @steepwood.com.au can SELECT/INSERT/UPDATE/DELETE
   - All anon access blocked

5. /admin/page.tsx (dashboard):
   - Metric cards: new quotes this week, pending testimonials, draft blog posts, published projects count
   - Recent activity feed: last 10 events (quote received, testimonial approved, post published)
   - Quick actions: "Add new project", "Write new post"

Acceptance criteria:
- Unauthenticated visit to /admin/ redirects to /admin/login/
- Non-allowlisted email logs in but gets immediately logged out + error message
- Allowlisted email receives Magic Link, clicks, lands on /admin/ dashboard
- RLS policies tested: anon user via SQL editor cannot SELECT from quote_requests
```

**Files to create or modify:**
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/auth/callback/route.ts`
- `src/app/admin/_components/AdminSidebar.tsx`
- Supabase RLS policies (apply via SQL editor or migration)

**Definition of Done (code):**
- [ ] Auth flow implemented (magic link send, callback, allowlist check, protected layout)
- [ ] Non-domain emails rejected in callback route
- [ ] `sql/admin-rls-policies.sql` committed

**Deferred to `STEEPWOOD-MANUAL-OPS.md`:** auth E2E on production, RLS applied + anon SQL test, branded magic-link email template

---

### Task 4.9 — Build admin CRUD: Quote Requests, Testimonials, Blog Posts, Projects, Service/Location intros

**Cursor Prompt:**

```
Context: Each admin section is a list view + detail/edit form. We use shadcn DataTable for lists (TanStack Table under the hood) and shadcn Form for editing. Server actions for all mutations.

Task: Build 5 admin CRUD sections.

Steps for each section follow the same pattern:

### /admin/quotes/
- List: table with columns (date, name, service types, location, status, view)
- Filters: status (new/contacted/quoted/won/lost), date range
- Detail page /admin/quotes/[id]/: full quote data, attachments (download links), status dropdown (server action updates), internal notes textarea, "Mark as contacted" button (sends email log to user)
- No deletion (data retention for compliance)

### /admin/testimonials/
- List: name, suburb, rating, source, status (pending/verified/featured/rejected)
- Bulk actions: verify, feature, reject
- Detail: view full quote, edit name/suburb (if anonymising), set verified/featured flags, link to projectId/serviceId/locationId

### /admin/blog/
- List: title, status, publishedAt, category
- Create new: form with title (auto-slugs), excerpt, body (MDX textarea with markdown preview using react-markdown), heroImage (Supabase Storage upload), category, tags, status (draft/published/scheduled), publishedAt
- Server action saves; if status=scheduled and publishedAt in future, a Vercel Cron job (Task 5.X) publishes at that time

### /admin/projects/
- Same pattern as blog: title, slug, summary, description (MDX), category, location, completedAt, heroImage, gallery (multi-upload to Supabase Storage), materials (array), status, featured

### /admin/services-locations/
- Grid of 160 combos
- Click a combo → edit customIntro (override the default templated intro for top-priority combos)
- Bulk import via CSV (optional polish — defer if time constrained)

Acceptance criteria:
- All 5 CRUD sections functional
- Server actions update DB and revalidatePath() the affected pages so changes appear on the public site immediately
- File uploads (hero images, gallery) work end-to-end
- Optimistic UI updates (use useOptimistic) for status changes
```

**Files to create or modify:**
- `src/app/admin/quotes/page.tsx`, `[id]/page.tsx`
- `src/app/admin/testimonials/page.tsx`, `[id]/page.tsx`
- `src/app/admin/blog/page.tsx`, `new/page.tsx`, `[id]/edit/page.tsx`
- `src/app/admin/projects/page.tsx`, `new/page.tsx`, `[id]/edit/page.tsx`
- `src/app/admin/services-locations/page.tsx`, `[service]/[location]/page.tsx`
- Multiple server actions in `src/app/actions/admin/*.ts`

**Definition of Done (code):**
- [ ] All CRUD routes + server actions implemented
- [ ] `revalidatePath()` called on mutations
- [ ] Admin actions gated by `requireAdminAction()`

**Deferred to `STEEPWOOD-MANUAL-OPS.md`:** live CRUD E2E on production DB, RLS verification, public revalidation spot-check

---

### Phase 3 milestone tag

- `git tag v0.3.0-phase-3`
- End-to-end test: submit a quote → verify DB row → verify emails → verify admin dashboard shows it → mark as contacted → verify user gets notification
- Performance check: admin pages don't need to be fast (acceptable to be SSR force-dynamic); public pages must remain at ≥95 Lighthouse despite the new database calls



---

## PHASE 3 ACCEPTANCE CRITERIA (CODE)

Do not declare Phase 3 **code complete** unless ALL of the following are true:

- [ ] 3-step Quote form deployed at `/quote/`.
- [ ] Quote form: refresh between steps does not lose state (sessionStorage / Zustand).
- [ ] Quote form: keyboard-only flow from Step 1 → submit works without using a mouse.
- [ ] Quote submit server action validates with Zod, persists to `quote_requests`, calls Resend helpers (errors logged, submission still succeeds if email fails).
- [ ] Upload API validates MIME + size server-side; signed-URL flow implemented in code.
- [ ] Portfolio: `/portfolio/` and `/portfolio/[slug]/` render with gallery, lightbox, schema.
- [ ] Blog: `/blog/` paginates; `/blog/[slug]/` renders MDX with `Article` schema.
- [ ] Testimonials on homepage + service + location pages; AggregateRating on homepage when ≥5 verified reviews.
- [ ] Admin: `/admin/login`, auth callback, protected layout, dashboard metrics, sidebar nav.
- [ ] Admin CRUD routes exist: quotes, testimonials, blog, projects, services-locations (+ settings placeholder).
- [ ] Admin server actions call `requireAdminAction()`; `/api/admin/upload-url` returns 401 when unauthenticated.
- [ ] `sql/admin-rls-policies.sql` committed (application deferred to manual ops).
- [ ] `pnpm typecheck` and `pnpm build` pass.
- [ ] Lighthouse mobile on `/quote/`, `/portfolio/`, `/blog/`: Performance ≥ 85, Accessibility = 100, Best Practices ≥ 95.
- [ ] All commits use `phase-3: <task-id> <message>` format.
- [ ] Final commit tagged `phase-3-complete`.

**Deferred to `STEEPWOOD-MANUAL-OPS.md`:** live Resend emails in Gmail/Outlook/Apple Mail, curl 403 on direct bucket upload, RLS SQL applied + anon SELECT test, magic-link auth E2E on production, `cms-media` + `quote-attachments` buckets, branded magic-link template, admin user pre-registration, full E2E quote → admin triage flow.

When every **code** box is ticked, stop and tell me Phase 3 is complete. Then open the Phase 4 prompt file.
