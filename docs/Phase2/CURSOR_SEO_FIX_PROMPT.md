# SteepWood — SEO Audit Fix Pack (Cursor Build Prompt)

**Project:** steepwood.com.au (Next.js on Vercel, App Router)
**Repo:** SteepWood production codebase
**Audit reference:** `audit-report.md` (22 June 2026)
**Build target:** Ship all P0 fixes in one PR, then P1 in a second PR, then P2 in a third.
**Style:** Australian English throughout — colour, fitout, organise, metre, enquiry, licence. No em-dashes mid-sentence in user-visible copy. No emojis. Brisk, technical, confident.
**Author byline for any new blog frontmatter:** Sukhveer Kaur (founder).
**Forbidden words in copy and code comments:** "scrape", "crawl" (use "extract", "read", "browse" instead).

---

## How to use this prompt

You are Cursor / Claude Code working inside the SteepWood repo. Read this whole document first, plan, then execute in three commits:

1. **PR 1 — P0 fixes** (sections §1 to §7). These must ship within 7 days.
2. **PR 2 — P1 fixes** (sections §8 to §14). Ship within 30 days.
3. **PR 3 — P2 fixes** (sections §15 to §19). Ship within 90 days.

Confirm each commit with `pnpm build && pnpm lint && pnpm typecheck` (or the project equivalent — detect the package manager from the lockfile).

After every PR:
- Run `curl -s https://steepwood.com.au/sitemap.xml | head -20` to spot-check.
- Run a Lighthouse pass on `/`, `/custom-kitchen-joinery`, `/locations/newcastle`, `/blog/custom-kitchen-cost-nsw-2026`.

---

# Part A — P0 fixes (PR 1)

## §1. Fix three 404 blog URLs in the sitemap

### Problem

Three URLs are listed in `sitemap.xml` but return HTTP 404:

- `/blog/australian-home-joinery-trends-2026/`
- `/blog/joinery-materials-guide-2pac-timber/`
- `/blog/kitchen-storage-planning-australia/`

These were the original three demo posts. They have either been deleted or never rebuilt during the Next.js migration.

### Two acceptable fixes — pick one and document the choice in the PR description

**Option A (preferred): Restore the three posts as proper MDX files.** Use the content stubs in §1.1 below as the seed and expand each to 1,200+ words using the keyword research at `blog-research/keyword-research.md`. Set the author to Sukhveer Kaur and `publishedAt` to the original publication dates if known, otherwise `2026-06-01` to `2026-06-15`.

**Option B (faster): Remove them from the sitemap generator.** Edit whichever route generates `sitemap.xml` (likely `app/sitemap.ts` or `app/sitemap.xml/route.ts` or a `next-sitemap.config.js`) and drop these three slugs from the blog-post URL collector. Confirm with `curl -s https://steepwood.com.au/sitemap.xml | grep -c 'australian-home-joinery-trends-2026'` returning `0`.

### §1.1 — Content seeds if you choose Option A

Create three new MDX files under `content/blog/` (or wherever blog posts live — detect from the existing `/blog/custom-kitchen-cost-nsw-2026/` source). Each must follow the existing post template (frontmatter, hero image path, BlogPosting schema injected by the layout). Match the structure of `content/blog/custom-kitchen-cost-nsw-2026.mdx` exactly.

#### Post 1: `australian-home-joinery-trends-2026.mdx`

```yaml
---
title: "Australian Home Joinery Trends 2026 — From a Newcastle Workshop"
slug: "australian-home-joinery-trends-2026"
description: "Seven joinery trends shaping Australian homes in 2026: natural timber cabinetry, post-engineered-stone benchtops, warm minimalism, integrated appliances, mixed finishes, butler's pantries, and Polytec SYNC woodgrains."
author: "Sukhveer Kaur"
publishedAt: "2026-06-15"
updatedAt: "2026-06-22"
heroImage: "/images/blog/joinery-trends-2026-hero.jpg"
heroImageAlt: "Australian kitchen with natural oak cabinetry and sintered-stone benchtop"
tags: ["trends", "kitchen design", "2026", "australian joinery"]
readingTime: 9
faq:
  - q: "What are the biggest Australian joinery trends in 2026?"
    a: "Natural timber cabinetry (light oak, walnut, Tasmanian Oak), post-ban benchtops (sintered stone, porcelain, natural stone), warm minimalism, integrated appliances, mixed-finish kitchens, butler's pantries as second kitchens, and Polytec SYNC textured woodgrain doors."
  - q: "What replaced engineered stone in 2026?"
    a: "From 1 July 2024 high-silica engineered stone is prohibited in Australia. Premium replacements are sintered stone (Dekton, Neolith, Laminam), porcelain slabs, natural stone (marble, granite, quartzite), and on tighter budgets solid-surface or high-pressure laminate."
---

# Australian Home Joinery Trends 2026 — From a Newcastle Workshop

(1,200+ words of body content, organised under H2s for each trend. Use Style Curator and Domain as supporting references via inline links. Embed the keywords listed in §17 — at minimum: kitchen design trends Australia 2026, Laminex colour trends 2025 2026, Polytec SYNC woodgrain kitchen doors, integrated appliances kitchen design 2026, warm minimalism kitchen design Australia, butler's pantry vs scullery difference, engineered stone alternatives Australia.)
```

#### Post 2: `joinery-materials-guide-2pac-timber.mdx`

```yaml
---
title: "Joinery Materials Guide — 2pac, Laminate, Timber Veneer and HMR"
slug: "joinery-materials-guide-2pac-timber"
description: "Pick the right joinery material for your project. 2-pac, laminate, Polytec, Laminex, timber veneer, HMR board: durability, cost, coastal performance, and the right pairings for Newcastle and Sydney homes."
author: "Sukhveer Kaur"
publishedAt: "2026-06-08"
updatedAt: "2026-06-22"
heroImage: "/images/blog/joinery-materials-guide-hero.jpg"
heroImageAlt: "Polytec, Laminex, 2-pac and timber veneer joinery samples on a workshop bench"
tags: ["materials", "2pac", "laminate", "timber veneer", "buying guide"]
readingTime: 11
faq:
  - q: "Is 2-pac worth the extra cost over laminate?"
    a: "For high-touch surfaces (kitchen doors, vanities, joinery in direct sunlight) 2-pac polyurethane is more durable, easier to spot-repair, and holds colour for longer than laminate. For internal carcassing and wardrobe boxes laminate is usually the better value choice."
  - q: "What's the best joinery material for coastal Newcastle and Central Coast homes?"
    a: "Moisture-resistant (HMR) board carcassing, 2-pac sprayed doors on bathroom vanities and laundry cabinets, and Polytec Thermolaminated panels for high-humidity areas. Avoid standard MDF in any room with regular water exposure."
---

# Joinery Materials Guide — 2pac, Laminate, Timber Veneer and HMR

(1,500+ words. Cover: 2-pac polyurethane, Polytec, Laminex, timber veneer, solid timber, HMR board, particleboard, plywood, MDF. Pair each material with a use case. Embed keywords: 2pac vs laminate kitchen Australia, Polytec vs Laminex kitchen doors, plywood vs MDF cabinets Australia, polyurethane vs laminate cabinet doors, MDF vs plywood kitchen substrate Australia, timber veneer kitchen cabinets Australia, Polytec SYNC woodgrain kitchen doors, Laminex colour trends 2025 2026, Spotted Gum joinery furniture Australia, Tasmanian Oak kitchen cabinet properties, Blackbutt timber joinery NSW, Blum soft close hardware quality, coastal home joinery materials humidity, Australian timber furniture joinery species.)
```

#### Post 3: `kitchen-storage-planning-australia.mdx`

```yaml
---
title: "Kitchen Storage Planning — The Australian Workshop Guide"
slug: "kitchen-storage-planning-australia"
description: "Plan kitchen storage like a custom joiner. Drawer-bank sizing, pull-out pantries, corner solutions, appliance garages, butler's pantries, and the storage decisions that separate a $25k kitchen from a $60k one."
author: "Sukhveer Kaur"
publishedAt: "2026-06-01"
updatedAt: "2026-06-22"
heroImage: "/images/blog/kitchen-storage-planning-hero.jpg"
heroImageAlt: "Open custom kitchen drawer banks with Blum runners and graphite-lined inserts"
tags: ["kitchen planning", "storage", "butler's pantry", "buying guide"]
readingTime: 10
faq:
  - q: "How many drawer banks do I actually need in a custom kitchen?"
    a: "A medium family kitchen typically benefits from two to three pot-drawer banks (one near the cooktop, one near the dishwasher, one for serving), one cutlery drawer with internal organiser, and one deep pantry drawer or pull-out pantry. Drawer-led storage outperforms hinged-door cupboards on both ergonomics and lifespan."
  - q: "Do I need a butler's pantry or just a bigger pantry?"
    a: "A butler's pantry is worth specifying when you have the floor area (about 4–8 sqm) and you regularly entertain or cook ahead. For most NSW family homes a deep pull-out pantry plus an appliance garage delivers 80 percent of the benefit at 30 percent of the cost."
---

# Kitchen Storage Planning — The Australian Workshop Guide

(1,400+ words. Cover drawer-bank planning, pull-out pantries, corner solutions (Le Mans, magic corner), appliance garages, butler's pantries, integrated bin units, soft-close hardware, and lined drawer organisers. Embed keywords: kitchen renovation checklist Australia, butler's pantry vs scullery difference, butler's pantry joinery cost Australia, kitchen joinery glossary terms Australia, custom kitchen timeline how long Australia, Blum soft close hardware quality, integrated appliances kitchen design 2026.)
```

> **Don't gate the PR on writing all three posts.** If time-boxed, ship Option B (remove from sitemap) in PR 1 and queue Option A as a follow-up PR.

---

## §2. Add `www` → apex 301 redirect

### Problem

`https://www.steepwood.com.au/` currently returns HTTP 200 instead of 301-ing to `https://steepwood.com.au/`. Both versions are indexable. Duplicate-content risk and split link equity.

### Fix — Vercel project settings (preferred)

1. Open the Vercel dashboard → SteepWood project → **Settings → Domains**.
2. Locate `www.steepwood.com.au`. If it isn't listed, add it.
3. Set it to **Redirect to `steepwood.com.au`** with **status code 308** (Vercel's UI labels permanent redirects 308; this is the modern equivalent of 301 and Google treats it identically).
4. Wait for DNS propagation and verify:

```bash
curl -sI https://www.steepwood.com.au/ | head -3
# Expect: HTTP/2 308   AND   location: https://steepwood.com.au/
```

### Alternative — `next.config.js`

If for any reason the domain redirect can't be done in the Vercel dashboard, add this to `next.config.js`:

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.steepwood.com.au' }],
        destination: 'https://steepwood.com.au/:path*',
        permanent: true, // emits 308
      },
    ];
  },
  // ...existing config
};
module.exports = nextConfig;
```

Commit, deploy, verify with the `curl` command above.

---

## §3. Strip duplicate `| SteepWood | SteepWood` from titles

### Problem

Four of six audited pages emit titles ending in `| SteepWood | SteepWood`:

- `Custom Kitchen Joinery Australia | SteepWood Joinery | SteepWood` (64 chars, over Google's display cap)
- `Built-In Wardrobes & Walk-In Robes | SteepWood | SteepWood`
- `Blog — Joinery Insights & Design Tips | SteepWood | SteepWood`
- `Custom Joinery Newcastle NSW | SteepWood | SteepWood`

The duplication is caused by both the per-page `generateMetadata` *and* a global title template appending `| SteepWood`. Affects ~150+ pages.

### Fix — Audit and rationalise the title strategy

1. Locate the root metadata config — usually `app/layout.tsx` or a `lib/metadata.ts` helper. Find:

   ```ts
   // typical pattern
   export const metadata: Metadata = {
     title: {
       default: 'SteepWood Custom Joinery — Newcastle NSW | Australia-Wide',
       template: '%s | SteepWood',
     },
     // ...
   };
   ```

2. Search the codebase for hardcoded `| SteepWood` suffixes in page-level `generateMetadata` calls and remove them. Run:

   ```bash
   rg "\| SteepWood" --type ts --type tsx --type mdx
   ```

3. **Decide on the canonical title strategy and apply it everywhere:**

   - Root layout sets `template: '%s | SteepWood Joinery'`.
   - Each page's `generateMetadata` returns *only* the descriptive title — no brand suffix.
   - The Next.js metadata system will append ` | SteepWood Joinery` automatically.

4. Apply this title map (target 50–58 chars including brand suffix):

| Page | New title (drop the brand — template adds it) | Final rendered title |
|---|---|---|
| Homepage (`/`) | `Custom Joinery Newcastle NSW — Australia-Wide` (use `absolute` since this is the root) | `Custom Joinery Newcastle NSW — Australia-Wide` (no suffix) |
| `/about/` | `About — Newcastle Craftsmen Since 2014` | `About — Newcastle Craftsmen Since 2014 \| SteepWood Joinery` |
| `/contact/` | `Contact — Free Design Consultation` | `Contact — Free Design Consultation \| SteepWood Joinery` |
| `/quote/` | `Get a Free Quote — Fixed-Price in 5 Days` | `Get a Free Quote — Fixed-Price in 5 Days \| SteepWood Joinery` |
| `/portfolio/` | `Portfolio — Recent Custom Joinery Projects` | `Portfolio — Recent Custom Joinery Projects \| SteepWood Joinery` |
| `/blog/` | `Joinery Insights & Design Tips` | `Joinery Insights & Design Tips \| SteepWood Joinery` |
| `/locations/` | `Locations — 16 Australian Cities Served` | `Locations — 16 Australian Cities Served \| SteepWood Joinery` |
| `/custom-kitchen-joinery/` | `Custom Kitchen Joinery Australia` | `Custom Kitchen Joinery Australia \| SteepWood Joinery` |
| `/built-in-wardrobes/` | `Built-In Wardrobes & Walk-In Robes` | `Built-In Wardrobes & Walk-In Robes \| SteepWood Joinery` |
| `/office-fitout/` | `Office Fitout — Bespoke Workplace Joinery` | `Office Fitout — Bespoke Workplace Joinery \| SteepWood Joinery` |
| `/shopfitting/` | `Shopfitting & Retail Joinery Australia` | `Shopfitting & Retail Joinery Australia \| SteepWood Joinery` |
| `/custom-bathroom-vanity/` | `Custom Bathroom Vanity Joinery` | `Custom Bathroom Vanity Joinery \| SteepWood Joinery` |
| `/commercial-joinery/` | `Commercial Joinery — Hospitality & Healthcare` | `Commercial Joinery — Hospitality & Healthcare \| SteepWood Joinery` |
| `/custom-furniture/` | `Bespoke Furniture — Australian Timber` | `Bespoke Furniture — Australian Timber \| SteepWood Joinery` |
| `/home-office-joinery/` | `Home Office Joinery — Built-In Studies` | `Home Office Joinery — Built-In Studies \| SteepWood Joinery` |
| `/laundry-cabinets/` | `Custom Laundry Cabinets & Joinery` | `Custom Laundry Cabinets & Joinery \| SteepWood Joinery` |
| `/staircase-joinery/` | `Custom Timber Staircase Joinery NSW` | `Custom Timber Staircase Joinery NSW \| SteepWood Joinery` |
| `/locations/{city}/` | `Custom Joinery {City} — Newcastle Workshop` | `Custom Joinery {City} — Newcastle Workshop \| SteepWood Joinery` |
| `/{service}/{city}/` | `{Service Short} {City} — Newcastle Workshop` | `{Service Short} {City} — Newcastle Workshop \| SteepWood Joinery` |
| `/blog/{slug}/` | (post's own title from frontmatter) | `{Post title} \| SteepWood Joinery` |

5. Verify:

```bash
# After deploy, spot-check titles across 6 pages
for u in / /about/ /blog/ /custom-kitchen-joinery/ /built-in-wardrobes/ /locations/newcastle/; do
  printf "%-40s %s\n" "$u" "$(curl -s https://steepwood.com.au$u | grep -oP '(?<=<title>).*?(?=</title>)' | head -1)"
done
# Expect: no `| SteepWood | SteepWood` duplication.
```

---

## §4. De-duplicate paragraph repetition on service pages

### Problem

`/custom-kitchen-joinery/` (and likely all 10 service templates) repeats core paragraphs 3+ times per page:

- "Custom kitchen joinery starts with a genuine understanding…" appears 3×
- "Our kitchens are manufactured in Newcastle using premium materials…" appears 3×
- "We work across Newcastle, Sydney, Melbourne, Brisbane, Perth…" appears 3×

Likely cause: feature-card components are reading the same paragraph from a shared content array and rendering it under multiple section wrappers.

### Fix — Audit and rewire the service template

1. Locate the service-page component (likely `app/[service]/page.tsx` or `app/(marketing)/[service]/page.tsx`).
2. Find the data file feeding it (likely `content/services/custom-kitchen-joinery.json` or a `lib/services.ts`).
3. The data object should have **distinct fields** for each section:

   ```ts
   // lib/services.ts (target shape)
   type ServiceContent = {
     slug: string;
     hero: {
       h1: string;
       intro: string;        // appears in hero only
       primaryCta: string;
       secondaryCta: string;
     };
     summary: string;         // appears once, in summary band under hero
     featureCards: Array<{    // 6 cards — each unique copy
       title: string;
       body: string;
     }>;
     materialsSection: {
       intro: string;         // appears once
       materials: string;     // appears once
       hardware: string;      // appears once
     };
     processSteps: Array<{    // 4 steps, each unique
       step: number;
       title: string;
       body: string;
     }>;
     locationsIntro: string;   // appears once above the city rail
     faq: Array<{ q: string; a: string }>;
   };
   ```

4. **Rule:** every text block on the rendered page must come from a unique field. No component should reuse `summary` or `featureCards[i].body` to fill two visual sections.

5. After refactoring, verify on `/custom-kitchen-joinery/`:

   ```bash
   curl -s https://steepwood.com.au/custom-kitchen-joinery/ | grep -c "Custom kitchen joinery starts with a genuine understanding"
   # Expect: 1
   ```

6. Roll the same data-shape fix across all 10 service templates: `custom-kitchen-joinery`, `built-in-wardrobes`, `office-fitout`, `shopfitting`, `custom-bathroom-vanity`, `commercial-joinery`, `custom-furniture`, `home-office-joinery`, `laundry-cabinets`, `staircase-joinery`.

### §4.1 — Drop-in replacement copy for `custom-kitchen-joinery`

Use this as the canonical kitchen-page content. Mirror the structure for the other nine services.

```json
{
  "slug": "custom-kitchen-joinery",
  "hero": {
    "h1": "Custom Kitchen Joinery — Handcrafted in Newcastle, Delivered Australia-Wide",
    "intro": "Premium custom kitchen joinery designed, manufactured and installed from our Newcastle workshop. Floor-to-ceiling cabinetry in 2-pac, Polytec and Laminex, paired with sintered stone, porcelain or natural-stone benchtops and Blum soft-close hardware throughout.",
    "primaryCta": "Get a Free Design Consultation",
    "secondaryCta": "Browse Kitchen Projects"
  },
  "summary": "Custom kitchen joinery is cabinetry designed and built to your exact layout, storage needs and finish — not flat-pack sizing. SteepWood manufactures every kitchen in our Newcastle workshop using premium 2-pac, post-engineered-stone benchtops and Blum hardware, with fixed-price quotes across 16 Australian cities.",
  "featureCards": [
    {
      "title": "Custom cabinetry",
      "body": "Floor-to-ceiling cabinetry designed around your layout, storage needs and appliance schedule — no flat-pack sizing forced into a custom space."
    },
    {
      "title": "Post-ban benchtops",
      "body": "Sintered stone, porcelain, natural stone and Laminex Surround surfaces templated and installed. Engineered stone replaced from 1 July 2024."
    },
    {
      "title": "Splashbacks and finishes",
      "body": "Co-ordinated splashback selections matched to door finishes and benchtop materials — glass, porcelain tile, sintered slab and timber veneer."
    },
    {
      "title": "Soft-close hardware",
      "body": "Blum drawer runners, Hettich hinges, pull-out pantries and soft-close doors as standard. 25-year Blum manufacturer warranty."
    },
    {
      "title": "Integrated appliances",
      "body": "Joinery designed and built around your chosen ovens, dishwashers, fridges and rangehoods — Miele, Bosch, Fisher & Paykel, Smeg."
    },
    {
      "title": "Installation and warranty",
      "body": "Professional installation by our own teams with a 10-year structural warranty and supplier-backed hardware cover."
    }
  ],
  "materialsSection": {
    "intro": "Material specification is where a custom kitchen earns its price. SteepWood uses premium Australian board products, hand-sprayed finishes and hardware backed by decade-long manufacturer warranties.",
    "materials": "Doors and panels in Laminex, Polytec and Polytec SYNC textured woodgrain. 2-pac polyurethane sprayed in our workshop. Timber veneers in Tasmanian Oak, American Oak, Spotted Gum and Blackbutt where the brief calls for warmth.",
    "hardware": "Bench surfaces in Dekton, Neolith, Laminam, porcelain slab, natural stone (marble, granite, quartzite), Laminex Surround and high-pressure laminate. Hardware is Blum throughout — Tandembox, Legrabox, Servo-Drive and Aventos lift mechanisms backed by Blum's 25-year warranty."
  },
  "processSteps": [
    {
      "step": 1,
      "title": "Free design consultation",
      "body": "45 to 60 minutes in your home or via video. We listen first, measure second and leave you with a clear sense of what is possible."
    },
    {
      "step": 2,
      "title": "Design render and fixed-price quote",
      "body": "Within five working days of measure you receive drawings, material selections and a fixed-price quote with no hidden variations."
    },
    {
      "step": 3,
      "title": "Manufacture in Newcastle",
      "body": "Most custom kitchen projects take 8 to 14 weeks from deposit — 2 to 3 weeks design, 6 to 8 weeks manufacture. Every component built and finished in our workshop."
    },
    {
      "step": 4,
      "title": "Install by our own teams",
      "body": "On-site installation typically takes 3 to 7 days. We co-ordinate plumbers and electricians where required and hand over with a complete care guide."
    }
  ],
  "locationsIntro": "Every location below links to our dedicated custom kitchen page for that city — with local logistics, drive times and project examples.",
  "faq": [
    {
      "q": "How much does a custom kitchen cost in NSW in 2026?",
      "a": "SteepWood kitchens typically fall between $25,000 and $75,000 supplied and installed. Entry-level kitchens with laminate doors and laminate benchtops start around $18,000. Premium 2-pac kitchens with sintered-stone or natural-stone benchtops, butler's pantries and integrated appliances reach $90,000 to $120,000. See our [Custom Kitchen Cost NSW 2026 guide](/blog/custom-kitchen-cost-nsw-2026/) for the full breakdown."
    },
    {
      "q": "How long does a custom kitchen take from quote to install?",
      "a": "Most SteepWood kitchens run 10 to 14 weeks from signed contract to installation. That covers two to three weeks for design and engineering, six to eight weeks of workshop manufacture in Newcastle, and three to seven days of on-site installation."
    },
    {
      "q": "What materials and hardware do you use?",
      "a": "Doors in 2-pac polyurethane, Polytec, Polytec SYNC and Laminex. Carcassing in moisture-resistant (HMR) board for kitchens, vanities and laundries. Benchtops in sintered stone, porcelain, natural stone or Laminex Surround. Hardware Blum throughout (Tandembox drawer runners, Legrabox, Aventos lift mechanisms, Servo-Drive) with a 25-year manufacturer warranty."
    },
    {
      "q": "Do you replace engineered stone benchtops?",
      "a": "Engineered (high-silica) stone has been prohibited Australia-wide from 1 July 2024 for new installations. We specify post-ban alternatives — sintered stone, porcelain slabs, natural stone or laminate. See our [benchtop guide on post-ban alternatives](/blog/benchtop-guide-engineered-stone-ban-nsw/)."
    },
    {
      "q": "Is there a warranty?",
      "a": "Yes. SteepWood kitchens carry a 10-year structural warranty on cabinetry, plus Blum's 25-year hardware warranty and supplier-specific cover on benchtops and appliances."
    },
    {
      "q": "Do you service Sydney, Melbourne, Brisbane and other cities outside Newcastle?",
      "a": "Yes. We deliver custom kitchens to 16 Australian cities from our Newcastle workshop. Free consultations across NSW and ACT; interstate projects are quoted with freight and install co-ordination built into the programme."
    }
  ]
}
```

---

## §5. Deploy the six new launch-pack blog posts

### Problem

The blog launch pack delivered earlier in this thread contains six posts that are written, illustrated and ready, but not yet deployed:

- `custom-kitchen-cost-nsw-2026.md`
- `flat-pack-vs-custom-kitchen-australia.md`
- `2pac-laminate-timber-veneer-kitchen-finishes-nsw.md`
- `walk-in-robe-built-in-wardrobe-cost-guide-nsw.md`
- `questions-to-ask-custom-joiner-australia.md`
- `benchtop-guide-engineered-stone-ban-nsw.md`

Hero images are in `steepwood-p1-blog-images.zip` (31 JPEGs).

### Fix

1. Unzip blog images to `public/images/blog/` (preserving the slug-prefixed filenames).
2. Copy the six MD files from `steepwood-blog-pack/posts/` to the repo's `content/blog/` directory.
3. Confirm frontmatter matches the existing post schema (title, slug, description, author: Sukhveer Kaur, publishedAt, updatedAt, heroImage, heroImageAlt, tags, readingTime, faq).
4. Ensure each post has a `BlogPosting` JSON-LD block injected by the blog-post layout (`app/blog/[slug]/page.tsx`). Verify with:

   ```bash
   curl -s https://steepwood.com.au/blog/custom-kitchen-cost-nsw-2026/ | grep -c "BlogPosting"
   # Expect: ≥1
   ```

5. Add the six slugs to the sitemap generator (probably automatic if it reads from `content/blog/*`).
6. Run a manual indexing request in Google Search Console (once GSC is connected — see §7).

---

## §6. Claim Google Business Profile

### Problem

No verified GBP for SteepWood. Local pack visibility is impossible without it.

### Fix (operational, not code)

1. Go to [business.google.com](https://business.google.com) → sign in with the SteepWood Google account (or hello@steepwood.com.au).
2. Add business:
   - **Name:** SteepWood Custom Joinery
   - **Category (primary):** Cabinet maker
   - **Categories (additional):** Custom kitchen design, Carpenter, Furniture maker, Interior designer
   - **Address:** Newcastle workshop street address (confirm exact address with Kam — currently not in the public site footer)
   - **Service area:** Add all 16 cities (Newcastle, Sydney, Canberra, Melbourne, Central Coast, Hunter Valley, Gold Coast, Wollongong, Brisbane, Perth, Byron Bay, Port Macquarie, Coffs Harbour, Adelaide, Bathurst, Orange)
   - **Phone:** 0468 387 676
   - **Website:** https://steepwood.com.au
   - **Hours:** Mon–Fri 7:00–17:00, Sat 9:00–13:00 (confirm)
3. Verification: Google will offer postcard, phone or email. Postcard is the most reliable for a workshop address.
4. After verification:
   - Upload 10+ workshop and portfolio photos.
   - Add all 10 services as products with descriptions.
   - Seed 5+ owner Q&A questions covering pricing, timeline, materials, warranty, service area.
   - Add the NSW Carpentry Contractor Licence number (489553C) as an attribute and in the business description.

### Sitewide code change to support GBP linking

Add the GBP URL to `Organization` JSON-LD once the profile is verified — see §11.2.

---

## §7. Connect Google Search Console

### Problem

No GSC connection means no impression, click, CTR, query, or AI Overview data. All forward measurement is blind.

### Fix (operational)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add property → **Domain property** (preferred, covers all subdomains and protocols).
3. Verify via DNS TXT record at the domain registrar:
   - Record type: `TXT`
   - Host: `@` (or blank, depending on registrar)
   - Value: the `google-site-verification=...` string GSC provides
   - TTL: 3600
4. Wait 10–30 minutes for DNS propagation. Click **Verify** in GSC.
5. Once verified:
   - Submit `https://steepwood.com.au/sitemap.xml` under Sitemaps.
   - Request indexing for the 6 new blog posts under URL Inspection.
   - Enable the **Page experience**, **Core Web Vitals** and **AI Overview** reports.

### Optional — connect GSC to the Perplexity Computer connector

If Kam wants automated monthly reporting, connect the `google_search_console` connector in Perplexity and schedule a recurring task. (Currently DISCONNECTED — connect via the in-app prompt.)

---

# Part B — P1 fixes (PR 2)

## §8. Add `og:image` to `/blog/`

### Problem

`/blog/` is the only page in the audited set missing an `og:image`. Twitter card downgrades from `summary_large_image` to `summary`.

### Fix

In `app/blog/page.tsx` (or wherever the blog-hub metadata is generated), add:

```ts
export const metadata: Metadata = {
  title: 'Joinery Insights & Design Tips',
  description: 'Practical joinery advice, kitchen design tips, and Australian home trends from the SteepWood workshop in Newcastle.',
  openGraph: {
    title: 'Joinery Insights & Design Tips | SteepWood Joinery',
    description: 'Practical joinery advice, kitchen design tips, and Australian home trends from the SteepWood workshop in Newcastle.',
    url: 'https://steepwood.com.au/blog/',
    siteName: 'SteepWood Joinery',
    images: [
      {
        url: 'https://steepwood.com.au/images/og/blog-hub.jpg',
        width: 1200,
        height: 630,
        alt: 'Insights from the SteepWood workshop in Newcastle',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joinery Insights & Design Tips | SteepWood Joinery',
    description: 'Practical joinery advice, kitchen design tips, and Australian home trends from the SteepWood workshop in Newcastle.',
    images: ['https://steepwood.com.au/images/og/blog-hub.jpg'],
  },
};
```

If `public/images/og/blog-hub.jpg` doesn't yet exist, create it (1200×630, ~150 KB JPEG, "Insights from the workshop" on the workshop hero image).

While you're there, audit every `app/**/page.tsx` and confirm each `generateMetadata`/`metadata` exports a complete `openGraph` and `twitter` block. Create a shared helper to avoid drift:

```ts
// lib/metadata.ts
import type { Metadata } from 'next';

const SITE_URL = 'https://steepwood.com.au';
const SITE_NAME = 'SteepWood Joinery';

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
}): Metadata {
  const ogImage = opts.ogImage ?? `${SITE_URL}/images/og/default.jpg`;
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: opts.title }],
      locale: 'en_AU',
      type: opts.type ?? 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      images: [ogImage],
    },
  };
}
```

Refactor pages to use it.

---

## §9. Expand the 15 non-Newcastle location pages with unique content

### Problem

Sydney, Melbourne, Brisbane and other location pages reuse the same paragraph scaffolding and substitute city names. Differentiation is shallow ("Typical for Sydney custom kitchens projects" repeats 5×).

### Fix

For each of the 15 non-Newcastle location pages, replace boilerplate substitution with genuine city-specific content. Use the **Newcastle page** as the qualitative template (suburb-level enquiry detail, architectural styles, local material considerations) — not as a copy-paste source.

### §9.1 — City content matrix

Drop this data into `content/locations/{city}.json` (one file per city). The fields below feed an updated location template that no longer renders the same paragraph twice.

```json
{
  "Sydney": {
    "drive": "~2 hours via M1",
    "primarySuburbs": ["Mosman", "Cremorne", "Neutral Bay", "Chatswood", "Bondi", "Double Bay", "Paddington", "Balmain", "Manly", "Dee Why", "Castle Hill", "Strathfield", "Surry Hills", "Pyrmont", "Newtown"],
    "architecture": ["Federation terrace (Paddington, Balmain, Newtown)", "Inter-war brick (Eastern Suburbs, Lower North Shore)", "Mid-century modern (Castle Cove, Killara)", "Hamptons (Mosman, Cremorne, Manly)", "Contemporary coastal (Northern Beaches)", "Warehouse apartment (Pyrmont, Ultimo, Surry Hills)", "Modern executive (Hills District)"],
    "localContext": "Sydney is Australia's largest joinery market and one of the most discerning. Sydney clients typically brief 2-pac doors with sintered-stone or natural-stone benchtops, Blum drawer-led storage and integrated Miele or Gaggenau appliances. Heritage approvals are common in the Inner West and Eastern Suburbs.",
    "leadTime": "10–14 weeks from deposit; install programmed Tuesday–Thursday outside Sydney peak-hour traffic windows.",
    "freight": "Newcastle to Sydney delivery via dedicated furniture freight; ~2 hours road transit. Material samples couriered next-business-day."
  },
  "Canberra": {
    "drive": "~5 hours via Hume Hwy",
    "primarySuburbs": ["Forrest", "Yarralumla", "Red Hill", "Deakin", "Griffith", "O'Connor", "Ainslie", "Reid", "Kingston", "Manuka", "Bruce", "Kaleen", "Belconnen"],
    "architecture": ["Inter-war Garden City (Reid, Ainslie, Forrest)", "Mid-century government house (Yarralumla, Red Hill)", "1970s brick veneer (Belconnen, Tuggeranong)", "Contemporary apartment (Kingston, New Acton)", "Diplomatic-quarter custom (Yarralumla, Deakin)"],
    "localContext": "Canberra projects often involve diplomatic and senior-public-service homes with formal entertaining requirements — butler's pantries, walk-in robes with island benches, and integrated home-office joinery. Frost and dry-summer climate make timber-veneer movement allowances important.",
    "leadTime": "12–16 weeks from deposit allowing for freight scheduling and trades co-ordination across the ACT–NSW border.",
    "freight": "Newcastle to Canberra via dedicated furniture freight; 1-day road transit. Two delivery windows per fortnight."
  },
  "Melbourne": {
    "drive": "~9 hours road; 1-day truck transit",
    "primarySuburbs": ["Hawthorn", "Toorak", "South Yarra", "Brighton", "Camberwell", "Kew", "Malvern", "Albert Park", "Carlton", "Fitzroy", "Northcote", "Elwood", "St Kilda", "Mount Eliza"],
    "architecture": ["Victorian terrace (Carlton, Fitzroy, Albert Park)", "Edwardian (Hawthorn, Camberwell)", "Inter-war brick (Toorak, Malvern)", "Mid-century modern (Mount Eliza, Beaumaris)", "Contemporary bayside (Brighton, Elwood)"],
    "localContext": "Melbourne briefs lean heritage-conscious — moulded shaker doors, period-correct skirting and architraves, deep tongue-and-groove paneling on islands, and natural-stone benchtops with traditional edge profiles.",
    "leadTime": "14–18 weeks from deposit factoring interstate freight and install windows.",
    "freight": "Newcastle to Melbourne via dedicated furniture freight; 1–2 day road transit. Weekly freight slot."
  },
  "Central Coast": {
    "drive": "~1 hour 15 minutes via M1",
    "primarySuburbs": ["Terrigal", "Avoca Beach", "Killcare", "Wamberal", "Pearl Beach", "Empire Bay", "Erina", "Gosford", "Long Jetty", "Tuggerah", "Bateau Bay", "Forresters Beach"],
    "architecture": ["Coastal contemporary (Terrigal, Avoca, Wamberal)", "Beach shack renovation (Killcare, Pearl Beach)", "1980s brick veneer (Erina, Gosford)", "Hamptons-coastal (Bateau Bay, Forresters)", "Family weekender"],
    "localContext": "Central Coast briefs emphasise moisture resistance, salt-air durability and timber finishes that hide sandy traffic. Tasmanian Oak and Spotted Gum veneers feature heavily; Polytec SYNC textured woodgrain is popular for the textured-but-wipe-clean finish.",
    "leadTime": "10–14 weeks from deposit; installs combined with Newcastle and Sydney route trips.",
    "freight": "Direct Newcastle install team — no freight required."
  },
  "Hunter Valley": {
    "drive": "~45 minutes from Newcastle",
    "primarySuburbs": ["Pokolbin", "Lovedale", "Cessnock", "Maitland", "Singleton", "Branxton", "Rothbury", "Mount View", "Wollombi"],
    "architecture": ["Rural farmhouse renovation", "Vineyard cellar-door fitouts", "Federation country home", "Modern country (large glazing, raked ceilings)", "Heritage homestead"],
    "localContext": "Hunter Valley work skews to vineyard cellar-door joinery, rural farmhouse kitchens, and country-home fitouts. Briefs favour solid Australian timber (Blackbutt, Spotted Gum), large island benches with natural-stone tops, and integrated commercial-style appliances.",
    "leadTime": "8–12 weeks from deposit; same-day site visits from our Newcastle workshop.",
    "freight": "Direct Newcastle install team — no freight required."
  },
  "Gold Coast": {
    "drive": "~9 hours road; freight delivery",
    "primarySuburbs": ["Mermaid Beach", "Burleigh Heads", "Palm Beach", "Currumbin", "Broadbeach", "Main Beach", "Surfers Paradise", "Robina", "Sanctuary Cove", "Hope Island"],
    "architecture": ["Beachfront contemporary (Mermaid, Burleigh)", "Canal-front modern (Sanctuary Cove, Hope Island)", "1970s brick (Robina, Nerang)", "Hamptons-coastal (Palm Beach, Currumbin)", "Mid-century beach house"],
    "localContext": "Gold Coast briefs prioritise saltwater corrosion resistance, full-height moisture-resistant joinery and tropical-climate hardware specification. Sintered-stone benchtops are favoured for UV stability around large glazing.",
    "leadTime": "14–18 weeks from deposit allowing for QLD freight scheduling.",
    "freight": "Newcastle to Gold Coast via dedicated furniture freight; 2-day road transit. Weekly freight slot via Brisbane hub."
  },
  "Wollongong": {
    "drive": "~3.5 hours via M1 and Princes Hwy",
    "primarySuburbs": ["Thirroul", "Austinmer", "Bulli", "Coalcliff", "Wollongong CBD", "North Wollongong", "Figtree", "Mount Keira", "Stanwell Park", "Helensburgh"],
    "architecture": ["Federation cottage (Bulli, Thirroul)", "Inter-war brick (Wollongong, Figtree)", "Beach cottage renovation (Austinmer, Coalcliff)", "Escarpment contemporary (Mount Keira)", "1970s brick"],
    "localContext": "Wollongong work spans Illawarra coastal homes and escarpment contemporary projects. Saltwater proximity drives moisture-resistant carcassing specification; raked-ceiling brief is common.",
    "leadTime": "10–14 weeks from deposit; combined install routes with Sydney South.",
    "freight": "Direct Newcastle install team or combined Sydney run — no separate freight."
  },
  "Brisbane": {
    "drive": "~9 hours road; freight delivery",
    "primarySuburbs": ["New Farm", "Teneriffe", "Paddington", "Bardon", "Ascot", "Hamilton", "Bulimba", "Hawthorne", "Camp Hill", "Wilston", "Indooroopilly", "Toowong"],
    "architecture": ["Queenslander (Paddington, Bardon, Wilston)", "Inter-war character home (Ascot, Hamilton)", "Post-war timber (Camp Hill, Bulimba)", "Contemporary riverside (New Farm, Teneriffe)", "Hamptons-Queensland fusion"],
    "localContext": "Brisbane briefs frequently involve Queenslander renovations — VJ panel detail, high-set joinery, sub-floor access cabinetry and verandah-integrated outdoor joinery. Sub-tropical climate makes ventilation gaps and moisture-resistant board essential.",
    "leadTime": "14–18 weeks from deposit factoring freight and trades scheduling.",
    "freight": "Newcastle to Brisbane via dedicated furniture freight; 2-day road transit. Weekly freight slot."
  },
  "Perth": {
    "drive": "Freight only (3–5 day transit)",
    "primarySuburbs": ["Cottesloe", "Peppermint Grove", "Dalkeith", "Mosman Park", "Subiaco", "Nedlands", "Floreat", "City Beach", "Claremont", "Applecross", "South Perth", "Como"],
    "architecture": ["Federation (Subiaco, Mount Lawley)", "Inter-war bungalow (Nedlands, Floreat)", "Mid-century coastal (Cottesloe, City Beach)", "Modern contemporary (Peppermint Grove, Dalkeith)", "Limestone restoration"],
    "localContext": "Perth projects often involve coastal contemporary or modernist limestone homes. Material specification accounts for high-UV exposure (sintered stone and porcelain over engineered surfaces) and the Perth design preference for handleless cabinetry in deep neutrals.",
    "leadTime": "16–20 weeks from deposit allowing for WA freight transit.",
    "freight": "Newcastle to Perth via dedicated furniture freight; 3–5 day road transit. Fortnightly freight slot."
  },
  "Byron Bay": {
    "drive": "~9 hours road; freight delivery",
    "primarySuburbs": ["Byron Bay", "Suffolk Park", "Lennox Head", "Bangalow", "Ballina", "Brunswick Heads", "Mullumbimby", "The Pocket", "Federal", "Coorabell"],
    "architecture": ["Beach-house contemporary (Byron, Suffolk Park)", "Hinterland modern (Federal, Coorabell)", "Federation cottage (Bangalow, Mullumbimby)", "Tropical contemporary (Lennox)", "Surf-shack renovation"],
    "localContext": "Northern Rivers work emphasises coastal moisture resistance, biophilic timber selections (Spotted Gum, Blackbutt) and pared-back palettes. Heritage-overlay restrictions apply in parts of Bangalow and central Byron.",
    "leadTime": "14–18 weeks from deposit factoring freight.",
    "freight": "Newcastle to Byron via dedicated furniture freight; 2-day road transit. Weekly freight slot via Brisbane hub."
  },
  "Port Macquarie": {
    "drive": "~3 hours via Pacific Hwy",
    "primarySuburbs": ["Port Macquarie CBD", "Lighthouse Beach", "Flynns Beach", "Town Beach", "Settlement City", "Wauchope", "Bonny Hills", "Lake Cathie", "Camden Haven"],
    "architecture": ["Coastal contemporary", "1980s brick veneer", "Beach cottage renovation", "Lakeside contemporary (Lake Cathie, Camden Haven)", "Retirement-village interiors"],
    "localContext": "Mid-North-Coast briefs focus on coastal moisture resistance and accessible-design joinery (lower drawer banks, side-opening ovens, pull-out pantries) for retirees downsizing from Sydney.",
    "leadTime": "10–14 weeks from deposit; direct Newcastle install routes.",
    "freight": "Direct Newcastle install team — no freight."
  },
  "Coffs Harbour": {
    "drive": "~5 hours via Pacific Hwy",
    "primarySuburbs": ["Coffs Harbour CBD", "Sawtell", "Woolgoolga", "Korora", "Boambee", "Bellingen", "Urunga", "Dorrigo"],
    "architecture": ["Coastal contemporary (Sawtell, Korora)", "Federation hinterland (Bellingen, Dorrigo)", "Beachside cottage (Woolgoolga)", "1970s brick veneer", "Tropical modern"],
    "localContext": "Coffs and Bellingen work balances coastal saltwater exposure with hinterland-rainforest humidity. Material selection emphasises HMR carcassing, sealed timber veneers, and sintered-stone benchtops.",
    "leadTime": "12–14 weeks from deposit; combined Newcastle install routes.",
    "freight": "Direct install via Newcastle team — combined Port Macquarie / Coffs routes."
  },
  "Adelaide": {
    "drive": "Freight only (2–3 day transit)",
    "primarySuburbs": ["North Adelaide", "Unley", "Norwood", "Burnside", "Glenelg", "Hyde Park", "Walkerville", "Prospect", "St Peters", "Stirling", "Goodwood"],
    "architecture": ["Sandstone villa (North Adelaide, Walkerville)", "Bluestone bungalow (Unley, Goodwood)", "Inter-war (Hyde Park, Prospect)", "Hills modern (Stirling, Aldgate)", "Coastal mid-century (Glenelg)"],
    "localContext": "Adelaide briefs commonly involve sandstone or bluestone villa renovations with strict heritage-overlay constraints. Joinery is specified to complement period detail — moulded shaker doors, deep architraves, recessed appliances.",
    "leadTime": "16–18 weeks from deposit allowing for SA freight transit.",
    "freight": "Newcastle to Adelaide via dedicated furniture freight; 2–3 day road transit. Fortnightly freight slot."
  },
  "Bathurst": {
    "drive": "~3.5 hours via Bells Line of Road",
    "primarySuburbs": ["Bathurst CBD", "Kelso", "South Bathurst", "Eglinton", "Perthville", "O'Connell", "Brewongle", "Sofala"],
    "architecture": ["Federation (Bathurst CBD, Kelso)", "Inter-war brick", "Rural farmhouse (Sofala, O'Connell)", "Contemporary acreage", "Heritage Bathurst conservation overlay"],
    "localContext": "Central West work includes Bathurst CBD heritage homes (under conservation overlay) and rural acreage builds across Brewongle and O'Connell. Joinery specification often involves solid Australian timber and natural-stone benchtops to suit period architecture.",
    "leadTime": "12–14 weeks from deposit; direct Newcastle install routes via the Blue Mountains.",
    "freight": "Direct Newcastle install team — combined Bathurst / Orange routes."
  },
  "Orange": {
    "drive": "~3.5 hours via Great Western Hwy",
    "primarySuburbs": ["Orange CBD", "Bletchington", "East Orange", "Calare", "Lucknow", "Borenore", "Spring Hill", "Millthorpe"],
    "architecture": ["Federation (Orange CBD, Bletchington)", "Inter-war (East Orange)", "Rural farmhouse renovation", "Vineyard cellar-door fitouts", "Cool-climate contemporary"],
    "localContext": "Central West wine-country briefs frequently combine residential kitchens and small commercial cellar-door joinery. Cool-climate material specification favours solid timber and warm-toned natural stone.",
    "leadTime": "12–14 weeks from deposit; combined Bathurst / Orange install routes.",
    "freight": "Direct Newcastle install team."
  }
}
```

### §9.2 — Location template guidance

For each city, the rendered page must contain *at minimum* these unique sections (no boilerplate substitution):

1. **Hero** — `Custom Joinery in {City} — Newcastle Workshop, Delivered to {City}` (or city-specific variant).
2. **Why SteepWood in {City}** — pulls from `localContext` field.
3. **Suburbs we service in {City}** — chips list from `primarySuburbs`.
4. **Architecture and building types** — bullet list from `architecture`.
5. **Lead times and freight** — `leadTime` + `freight` paragraphs.
6. **Ten services in {City}** — card grid linking to each `/{service}/{city}/` combo page.
7. **Nearby cities** — links to the 3 nearest cities (geographically).
8. **FAQ** — at least 4 city-specific FAQs (cost, lead time, freight, service area).

---

## §10. Pre-render FAQ accordion answers

### Problem

The Radix Accordion FAQ component renders questions inside `<button>` server-side but keeps answers in collapsed `<div role="region">` regions that are `hidden` until JS hydration. Google reads the JSON-LD FAQPage so SEO is fine, but screen readers, non-JS bots and older browsers see questions without answers.

### Fix

Two acceptable approaches — pick one:

**Option A (recommended): Switch to native `<details>` / `<summary>`.** Best for accessibility and zero-JS rendering. CSS-style the disclosure arrow to match Radix visual.

```tsx
// components/faq.tsx
export function Faq({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-lg border border-stone-200 px-4 py-3 open:bg-stone-50"
        >
          <summary className="cursor-pointer list-none font-medium text-stone-900 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              {item.q}
              <svg
                className="h-4 w-4 transition-transform group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="mt-3 text-stone-700">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
```

**Option B: Keep Radix Accordion, pre-render answers in DOM.** Set `defaultValue` to all item IDs, then collapse on hydration via `useEffect`. Less ideal — flash of expanded content on first paint.

After fixing, verify:

```bash
curl -s https://steepwood.com.au/ | grep -c "10-year structural warranty"
# Expect: ≥1 (i.e. the FAQ answer text appears in raw HTML, not just JSON-LD)
```

---

## §11. Schema improvements

### §11.1 — Generate `sitemap.xml` `<lastmod>` from content mtime

Currently every URL shows the same `<lastmod>` timestamp (build time). Google's docs say this is a hint, not a directive — and "everything updated" on every crawl gets discounted.

Locate the sitemap generator. For Next.js App Router this is typically `app/sitemap.ts`:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { getAllBlogPosts } from '@/lib/blog';
import { getAllPortfolioProjects } from '@/lib/portfolio';

const SITE = 'https://steepwood.com.au';

const SERVICES = [
  'custom-kitchen-joinery',
  'built-in-wardrobes',
  'office-fitout',
  'shopfitting',
  'custom-bathroom-vanity',
  'commercial-joinery',
  'custom-furniture',
  'home-office-joinery',
  'laundry-cabinets',
  'staircase-joinery',
];

const CITIES = [
  'newcastle', 'sydney', 'canberra', 'melbourne', 'central-coast',
  'hunter-valley', 'gold-coast', 'wollongong', 'brisbane', 'perth',
  'byron-bay', 'port-macquarie', 'coffs-harbour', 'adelaide', 'bathurst', 'orange',
];

function fileMtime(relPath: string): Date {
  try {
    const stat = fs.statSync(path.join(process.cwd(), relPath));
    return stat.mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,          lastModified: fileMtime('app/page.tsx'),            changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/about/`,    lastModified: fileMtime('app/about/page.tsx'),      changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/contact/`,  lastModified: fileMtime('app/contact/page.tsx'),    changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/quote/`,    lastModified: fileMtime('app/quote/page.tsx'),      changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/portfolio/`,lastModified: fileMtime('app/portfolio/page.tsx'),  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE}/blog/`,     lastModified: fileMtime('app/blog/page.tsx'),       changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE}/locations/`,lastModified: fileMtime('app/locations/page.tsx'),  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE}/legal/privacy/`,         lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/legal/terms/`,           lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/legal/consumer-rights/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE}/${s}/`,
    lastModified: fileMtime(`content/services/${s}.json`),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const locationPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE}/locations/${c}/`,
    lastModified: fileMtime(`content/locations/${c}.json`),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const comboPages: MetadataRoute.Sitemap = SERVICES.flatMap((s) =>
    CITIES.map((c) => ({
      url: `${SITE}/${s}/${c}/`,
      lastModified: fileMtime(`content/locations/${c}.json`),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  );

  const blogPosts = await getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter((p) => p.published !== false)
    .map((p) => ({
      url: `${SITE}/blog/${p.slug}/`,
      lastModified: p.updatedAt ?? p.publishedAt ?? now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  const portfolioProjects = await getAllPortfolioProjects();
  const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map((p) => ({
    url: `${SITE}/portfolio/${p.slug}/`,
    lastModified: p.updatedAt ?? p.publishedAt ?? now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...comboPages,
    ...portfolioPages,
    ...blogPages,
  ];
}
```

Critically: **the sitemap loader must filter out unpublished or 404-returning blog posts.** A `published: false` frontmatter field, or a guard that excludes posts whose MDX file no longer exists, prevents future 404-in-sitemap regressions.

### §11.2 — Add `areaServed`, `aggregateRating`, GBP URL to root `LocalBusiness`

In `lib/schema/local-business.ts` (or wherever the root `@graph` is built):

```ts
export const rootGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': 'https://steepwood.com.au/#localbusiness',
      name: 'SteepWood Custom Joinery',
      legalName: 'Pavit Cabinetry Pty Ltd',
      alternateName: 'SteepWood',
      description: 'Newcastle-headquartered custom joinery studio serving 16 Australian cities. Custom kitchens, built-in wardrobes, office fitouts, shopfitting, bathroom vanities, commercial joinery and bespoke furniture.',
      url: 'https://steepwood.com.au',
      telephone: '+61468387676',
      email: 'hello@steepwood.com.au',
      priceRange: '$$$',
      foundingDate: '2014',
      // Add this once GBP is verified:
      sameAs: [
        'https://g.page/r/<GBP_PLACE_ID>',          // Google Business Profile
        'https://www.houzz.com.au/professionals/cabinet-makers/steepwood', // once Houzz listed
        // future: Instagram, Facebook, LinkedIn
      ],
      identifier: [
        { '@type': 'PropertyValue', propertyID: 'ABN', value: '52 697 313 269' },
        { '@type': 'PropertyValue', propertyID: 'NSW Carpentry Contractor Licence', value: '489553C' },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '<WORKSHOP STREET ADDRESS>',
        addressLocality: 'Newcastle',
        addressRegion: 'NSW',
        postalCode: '<POSTCODE>',
        addressCountry: 'AU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -32.9283,
        longitude: 151.7817,
      },
      areaServed: [
        { '@type': 'City', name: 'Newcastle' },
        { '@type': 'City', name: 'Sydney' },
        { '@type': 'City', name: 'Canberra' },
        { '@type': 'City', name: 'Melbourne' },
        { '@type': 'City', name: 'Brisbane' },
        { '@type': 'City', name: 'Gold Coast' },
        { '@type': 'City', name: 'Perth' },
        { '@type': 'City', name: 'Adelaide' },
        { '@type': 'City', name: 'Wollongong' },
        { '@type': 'City', name: 'Byron Bay' },
        { '@type': 'City', name: 'Port Macquarie' },
        { '@type': 'City', name: 'Coffs Harbour' },
        { '@type': 'City', name: 'Bathurst' },
        { '@type': 'City', name: 'Orange' },
        { '@type': 'AdministrativeArea', name: 'Central Coast NSW' },
        { '@type': 'AdministrativeArea', name: 'Hunter Valley NSW' },
        { '@type': 'Country', name: 'Australia' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Custom Joinery Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Kitchen Joinery', url: 'https://steepwood.com.au/custom-kitchen-joinery/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Built-In Wardrobes & Walk-In Robes', url: 'https://steepwood.com.au/built-in-wardrobes/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office Fitout', url: 'https://steepwood.com.au/office-fitout/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopfitting', url: 'https://steepwood.com.au/shopfitting/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Bathroom Vanity', url: 'https://steepwood.com.au/custom-bathroom-vanity/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Joinery', url: 'https://steepwood.com.au/commercial-joinery/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Furniture', url: 'https://steepwood.com.au/custom-furniture/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Office Joinery', url: 'https://steepwood.com.au/home-office-joinery/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laundry Cabinets', url: 'https://steepwood.com.au/laundry-cabinets/' }},
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Staircase Joinery', url: 'https://steepwood.com.au/staircase-joinery/' }},
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '10',  // Update from Google Business Profile once verified
        bestRating: '5',
        worstRating: '1',
      },
    },
    // ...Organization, Person, WebSite entries
  ],
};
```

---

## §12. Submit to AU local citation directories

(Operational, not code. Run in parallel with §6.)

For each directory:
- Use **identical NAP**: SteepWood Custom Joinery / Newcastle NSW workshop address / 0468 387 676 / hello@steepwood.com.au
- Reference: NSW Carpentry Contractor Licence 489553C, ABN 52 697 313 269, since 2014
- Use the same business description (200–300 words) across all listings

Submit in this order:

1. **Google Business Profile** (already in §6 — highest priority)
2. **Bing Places for Business** ([bingplaces.com](https://www.bingplaces.com))
3. **Apple Business Connect** ([businessconnect.apple.com](https://businessconnect.apple.com))
4. **Yellow Pages AU** ([yellowpages.com.au](https://www.yellowpages.com.au))
5. **True Local** ([truelocal.com.au](https://www.truelocal.com.au))
6. **Hotfrog AU** ([hotfrog.com.au](https://www.hotfrog.com.au))
7. **Pure Local** ([purelocal.com.au](https://www.purelocal.com.au))
8. **Aussie Web** ([aussieweb.com.au](https://aussieweb.com.au))
9. **Houzz AU** ([houzz.com.au/professionals](https://www.houzz.com.au/professionals)) — also creates a portfolio profile
10. **HiPages** ([hipages.com.au](https://hipages.com.au)) — paid lead-gen, optional
11. **ServiceSeeking** ([serviceseeking.com.au](https://www.serviceseeking.com.au))
12. **Master Builders Association NSW member directory** (if eligible)
13. **HIA (Housing Industry Association) member directory** (if eligible)

Keep a tracker spreadsheet at `/home/user/workspace/steepwood-seo-fixes/citation-tracker.csv`. After every PR, refresh this file with new listing URLs.

---

## §13. Lighthouse + Vercel Analytics + GA4 baseline

Add Vercel Analytics (already CSP-allowed: `https://va.vercel-scripts.com`, `https://vitals.vercel-insights.com`):

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Add GA4 (already CSP-allowed: `https://www.googletagmanager.com`, `https://www.google-analytics.com`):

```tsx
// app/layout.tsx
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // set in Vercel env vars

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}</Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Add GA4 event for quote-form submissions:

```ts
// app/quote/_components/quote-form.tsx (inside onSubmit success branch)
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'generate_lead', {
    event_category: 'engagement',
    event_label: 'quote_form_submit',
    value: 1,
  });
}
```

Run Lighthouse on these 4 pages after deploy and record LCP/INP/CLS baseline:

- `/`
- `/custom-kitchen-joinery/`
- `/locations/newcastle/`
- `/blog/custom-kitchen-cost-nsw-2026/`

Target: LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on mobile and desktop.

---

## §14. Re-weave full keyword universe into service and location pages

### Problem

Current Semrush shows only 4 ranking keywords — but the master keyword research at `blog-research/keyword-research.md` defines a **60-keyword universe** that the site should target across services, locations, and blog. Existing service-page copy only naturally surfaces a fraction.

### Fix

Apply the keyword mapping in §17 below. The goal is not stuffing — every keyword listed for a page must read as natural conversational copy, woven into existing sections. **Verify each keyword appears at least once on its target page, ideally in an H2 or H3 plus body copy.**

After applying, run this check:

```bash
# Verify keyword appearance across the site
python3 -c "
import urllib.request
keywords = {
  '/custom-kitchen-joinery/': ['custom kitchen cost Sydney','custom joinery cost Australia','2pac vs laminate kitchen Australia','Polytec vs Laminex kitchen doors','Caesarstone benchtop cost Australia','engineered stone alternatives Australia','butler\\'s pantry joinery cost Australia','custom kitchen timeline how long Australia','kitchen design trends Australia 2026','integrated appliances kitchen design 2026','kitchen renovation Sydney cost 2026','flat pack kitchen IKEA vs custom worth it','warm minimalism kitchen design Australia','Polytec SYNC woodgrain kitchen doors','timber veneer kitchen cabinets Australia'],
  # ...add all 14 service pages similarly
}
for url, kws in keywords.items():
    html = urllib.request.urlopen('https://steepwood.com.au' + url).read().decode().lower()
    missing = [k for k in kws if k.lower() not in html]
    print(url, 'missing:', missing or 'ALL PRESENT')
"
```

(See §17 for the full keyword-to-page mapping.)

---

# Part C — P2 fixes (PR 3)

## §15. Author archive for Sukhveer Kaur

Add `/author/sukhveer-kaur/` with a Person + CollectionPage schema and list all posts by the author. Then update the `Person` entry in the `@graph` to include `url: 'https://steepwood.com.au/author/sukhveer-kaur/'`. Page should include 150-word bio, founder photo, NSW Carpentry Contractor Licence reference, social links once live.

## §16. Demote city-name H3s on combo pages

On any service-combo page (e.g. `/custom-kitchen-joinery/sydney/`), the "Locations we also serve" rail uses `<h3>` for city names — this double-counts city names as section headings. Demote those rail labels to `<span>` or `<h4>`. Reserve `<h3>` for in-page topical sections (Materials, Hardware, FAQ, Process).

## §17. Plan sitemap-index split

Once the blog reaches 50+ posts (estimated Q4 2026), split `sitemap.xml` into:

- `/sitemap.xml` → sitemap index
- `/sitemap-pages.xml` → static + service + location pages
- `/sitemap-services.xml` → service-city combo pages (160 URLs)
- `/sitemap-blog.xml` → blog posts
- `/sitemap-portfolio.xml` → portfolio projects

For Next.js this means converting `app/sitemap.ts` into multiple sub-route files plus a sitemap index generator.

## §18. Portfolio-swap programme

Outreach plan, not code. Identify 5–10 non-competing AU design trades (interior designers, architects, real-estate stylists, kitchen designers without their own workshop) in Newcastle, Sydney and Hunter Valley. Offer reciprocal linking: their work featured on your portfolio page, your link in their "trusted joiners" section. Track in `citation-tracker.csv`.

## §19. Add "Trade & Designer" page

Capture B2B inbound from architects and interior designers with a dedicated page at `/trade/`:

- Trade pricing structure (drawing-package-only or full supply-and-install)
- Drawing acceptance formats (Rhino, SketchUp, ArchiCAD, Revit)
- Lead times for trade orders
- Insurance and licence references
- Past trade clients (with permission)

This captures the high-value low-volume "joinery supplier for architects" keyword.

---

# Part D — Reference materials

## §17 (Reference table). Full keyword-to-page mapping (all 60 keywords woven in)

Use this as the source of truth for every on-page edit. Where a keyword appears on multiple pages, weave it into the most relevant section without duplication. Target keyword density 1–2% per page (not above).

### Homepage (`/`)

| # | Keyword | Where to weave |
|---|---|---|
| 1 | custom joinery cost Australia | Hero subheading or "Why SteepWood" intro |
| 2 | custom kitchen Newcastle NSW | "About" band ("custom kitchen joinery in Newcastle NSW") |
| 3 | joinery Newcastle NSW | Hero H1 supporting line |
| 4 | cabinetmaker Newcastle NSW | "Why SteepWood" section |
| 5 | kitchen design trends Australia 2026 | Blog/insights teaser block |
| 6 | engineered stone alternatives Australia | Materials band ("post-engineered-stone benchtops in sintered stone, porcelain, natural stone") |
| 7 | custom joinery warranty Australia | Trust band ("10-year structural warranty, 25-year Blum hardware warranty") |
| 8 | NSW carpentry licence check | Licence band ("NSW Carpentry Contractor 489553C — verify on Service NSW") |

### `/custom-kitchen-joinery/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | custom kitchen cost Sydney | Pricing FAQ + city-rail Sydney card |
| 2 | custom joinery cost Australia | Pricing intro |
| 3 | flat pack vs custom kitchen Australia | "Why custom" section with link to blog |
| 4 | 2pac vs laminate kitchen Australia | Materials section |
| 5 | kitchen renovation cost NSW | Pricing FAQ |
| 6 | butler's pantry joinery cost Australia | Storage section ("butler's pantry as a second kitchen") |
| 7 | custom kitchen timeline how long Australia | Process section |
| 8 | Polytec vs Laminex kitchen doors | Materials section |
| 9 | engineered stone alternatives Australia | Benchtops section |
| 10 | Caesarstone benchtop cost Australia | Post-ban materials FAQ |
| 11 | kitchen design trends Australia 2026 | Trends teaser → blog link |
| 12 | integrated appliances kitchen design 2026 | Hardware section |
| 13 | warm minimalism kitchen design Australia | Trends teaser |
| 14 | Polytec SYNC woodgrain kitchen doors | Materials section |
| 15 | Laminex colour trends 2025 2026 | Materials section |
| 16 | timber veneer kitchen cabinets Australia | Materials section |
| 17 | Blum soft close hardware quality | Hardware section |
| 18 | flat pack kitchen IKEA vs custom worth it | Blog link |
| 19 | kitchen renovation Sydney cost 2026 | FAQ |
| 20 | custom joinery Sydney cost 2026 | FAQ |
| 21 | kitchen renovation checklist Australia | Process section + checklist sidebar |
| 22 | how long does a kitchen renovation take | Process section + lead-time FAQ |
| 23 | stone benchtop ban Australia alternative | Benchtops section |

### `/built-in-wardrobes/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | built in wardrobes cost Australia | Pricing band |
| 2 | walk in robe cost guide Australia | Pricing FAQ |
| 3 | built in wardrobe design trends 2026 | Trends section |
| 4 | walk in wardrobe design ideas Australia | Inspiration section |
| 5 | walk in wardrobe Newcastle NSW cost | Local FAQ |
| 6 | Polytec vs Laminex kitchen doors | Materials section (same material range) |
| 7 | timber veneer kitchen cabinets Australia | Materials section |
| 8 | Blum soft close hardware quality | Hardware section |

### `/office-fitout/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | commercial joinery fitout cost Australia | Pricing FAQ |
| 2 | shopfitting joinery cost Australia | Cross-link |
| 3 | home office fitout ideas built-in shelves | Design section (residential mention) |
| 4 | joinery lead time Australia workshop | Process section |

### `/shopfitting/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | shopfitting joinery cost Australia | Pricing FAQ |
| 2 | commercial joinery fitout cost Australia | Pricing FAQ |
| 3 | joinery quote what's included Australia | What's-included sidebar |

### `/custom-bathroom-vanity/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | bathroom vanity custom joinery cost | Pricing band |
| 2 | coastal home joinery materials humidity | Coastal-suitability section |
| 3 | MDF vs plywood kitchen substrate Australia | Materials section (HMR explanation) |
| 4 | timber veneer kitchen cabinets Australia | Materials section |

### `/commercial-joinery/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | commercial joinery fitout cost Australia | Pricing band |
| 2 | shopfitting joinery cost Australia | Cross-link |
| 3 | joinery quote what's included Australia | What's-included sidebar |
| 4 | joinery lead time Australia workshop | Process section |

### `/custom-furniture/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | Australian timber furniture joinery species | Timber-species section |
| 2 | Spotted Gum joinery furniture Australia | Timber-species section |
| 3 | Tasmanian Oak kitchen cabinet properties | Timber-species section |
| 4 | Blackbutt timber joinery NSW | Timber-species section |
| 5 | timber veneer kitchen cabinets Australia | Materials section |

### `/home-office-joinery/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | home office joinery built-in cost | Pricing band |
| 2 | home office fitout ideas built-in shelves | Inspiration section |
| 3 | built in bookshelf joinery cost Australia | Library-wall section |
| 4 | joinery quote what's included Australia | What's-included sidebar |

### `/laundry-cabinets/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | laundry cabinet joinery cost Australia | Pricing band |
| 2 | coastal home joinery materials humidity | HMR materials section |
| 3 | MDF vs plywood kitchen substrate Australia | Materials section |

### `/staircase-joinery/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | staircase joinery timber cost NSW | Pricing band |
| 2 | Australian timber furniture joinery species | Timber-species section |
| 3 | Spotted Gum joinery furniture Australia | Timber-species section |
| 4 | Tasmanian Oak kitchen cabinet properties | Timber-species section |
| 5 | Blackbutt timber joinery NSW | Timber-species section |

### `/locations/newcastle/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | custom kitchen Newcastle NSW | Hero + body |
| 2 | joinery Newcastle NSW | Hero + body |
| 3 | cabinetmaker Newcastle NSW | "Why SteepWood Newcastle" section |
| 4 | custom kitchen Hunter Valley NSW | Nearby-cities section |
| 5 | kitchen renovation Central Coast NSW | Nearby-cities section |
| 6 | walk in wardrobe Newcastle NSW cost | FAQ |
| 7 | heritage home kitchen renovation NSW | Newcastle suburb context (Cooks Hill, Hamilton) |
| 8 | coastal home joinery materials humidity | Newcastle coastal context |
| 9 | NSW carpentry licence check | Licence band |

### `/locations/hunter-valley/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | custom kitchen Hunter Valley NSW | Hero |
| 2 | kitchen renovation Hunter Valley NSW cost | FAQ |
| 3 | heritage home kitchen renovation NSW | Federation farmhouse section |
| 4 | Australian timber furniture joinery species | Local timber mention |

### `/locations/central-coast/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | kitchen renovation Central Coast NSW | Hero |
| 2 | coastal home joinery materials humidity | Coastal section |
| 3 | cabinet maker central coast | Hero (already ranks position 60 — push toward 30) |

### `/locations/sydney/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | custom kitchen cost Sydney | Pricing band |
| 2 | kitchen renovation Sydney cost 2026 | Pricing band |
| 3 | custom joinery Sydney cost 2026 | Pricing FAQ |
| 4 | heritage home kitchen renovation NSW | Inner-West Federation section |

### `/locations/canberra/`

| # | Keyword | Where to weave |
|---|---|---|
| 1 | kitchen renovation Canberra | Hero + pricing band |

### Blog (existing + new posts)

The 6 launch-pack posts and 3 restored posts (or 3 sitemap-removed posts) already cover the bulk of these keywords. Cross-link from service and location pages where the table above flags "blog link".

---

## §18 (Reference). PR checklist template

Copy this into each PR description:

```markdown
## SEO Audit Fix PR — [P0/P1/P2]

### Issues addressed
- [ ] §X — [issue title]
- [ ] §Y — [issue title]

### Verification
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] Sitemap returns expected URL count (`curl -s https://steepwood.com.au/sitemap.xml | grep -c '<loc>'`)
- [ ] All previously 404 URLs now return 200 (or have been removed from sitemap)
- [ ] `www.steepwood.com.au` returns 308 → apex (P0 only)
- [ ] Title-tag spot check (6 pages) shows no `| SteepWood | SteepWood` duplication (P0 only)
- [ ] `/custom-kitchen-joinery/` shows each paragraph exactly once (P0 only)
- [ ] Lighthouse on `/`, `/custom-kitchen-joinery/`, `/locations/newcastle/`, `/blog/custom-kitchen-cost-nsw-2026/` — LCP < 2.5 s mobile

### Manual ops follow-up (not blocking)
- [ ] GBP claimed and verified
- [ ] GSC connected and sitemap submitted
- [ ] First 5 citation directories submitted (Bing Places, Apple Business Connect, Yellow Pages AU, True Local, Houzz AU)
```

---

## §19 (Reference). Glossary of terms used in this prompt

- **2-pac (or 2pac)** — two-part polyurethane paint, sprayed and oven-cured. Premium kitchen door finish.
- **HMR** — High Moisture Resistant board (typically green-tinted MR-MDF or MR-particleboard) for kitchens, vanities, laundries.
- **Polytec / Laminex** — Australian decorative-panel brands. Polytec SYNC is the textured-woodgrain product line.
- **Blum** — Austrian hardware brand; industry standard for drawer runners, hinges, lift mechanisms.
- **Engineered stone ban** — Effective 1 July 2024, high-silica (>1%) engineered-stone benchtops prohibited for new installs in Australia. Source: ACA.
- **NAP** — Name, Address, Phone. Citation consistency signal.
- **GBP** — Google Business Profile (formerly Google My Business).
- **GSC** — Google Search Console.
- **LCP / INP / CLS** — Largest Contentful Paint / Interaction to Next Paint / Cumulative Layout Shift. Google Core Web Vitals.

---

**End of prompt.** Ship PR 1 first, then PR 2, then PR 3. Verify after each. Update `audit-report.md` with completion timestamps as each section closes.
