# SteepWood — Cursor Prompt v3 (Sitewide Position-60 Fix)

**Repo:** SteepWood Next.js App Router on Vercel · Supabase backend
**Scope:** All 209 URLs in https://steepwood.com.au/sitemap.xml
**Goal:** Fix the four compounding causes of avg position 61 → target 25–30 within 90 days
**Constraints:** Australian English (colour, fitout, organise, metre, enquiry, licence, programme). No emojis. No markdown italics.

---

## What this prompt does

Fixes four root causes diagnosed in `audit-report-v3.md`:

1. **Keyword cannibalisation** — multiple URLs competing for the same query
2. **Wrong-page rankings** — hub pages absorbing city traffic that belongs to combo pages
3. **Internal link famine** — combo pages have 1–6 inbound links instead of 8–12
4. **P0 carry-over bugs** from audit v2 (missing H1s, wrong-city content, missing keyword qualifiers)

Applied across all 209 URLs:

- **1 home** + **5 top-level pages** (about, contact, quote, portfolio, blog)
- **10 service hubs** (`/built-in-wardrobes`, `/commercial-joinery`, `/custom-bathroom-vanity`, `/custom-furniture`, `/custom-kitchen-joinery`, `/home-office-joinery`, `/laundry-cabinets`, `/office-fitout`, `/shopfitting`, `/staircase-joinery`)
- **1 locations hub** + **16 city pages**
- **160 service×city combo pages** (10 services × 16 cities)
- **1 blog hub** + **6 blog posts**
- **3 legal pages** (privacy, terms, consumer-rights)
- **5 utility pages** (quote, portfolio, search, sitemap, 404)

---

## Universe of the site (paste into `lib/seo-graph.ts`)

```ts
// lib/seo-graph.ts

export const ALL_SERVICES = [
  'built-in-wardrobes',
  'commercial-joinery',
  'custom-bathroom-vanity',
  'custom-furniture',
  'custom-kitchen-joinery',
  'home-office-joinery',
  'laundry-cabinets',
  'office-fitout',
  'shopfitting',
  'staircase-joinery',
] as const;

export type Service = (typeof ALL_SERVICES)[number];

export const ALL_CITIES = [
  'adelaide',
  'bathurst',
  'brisbane',
  'byron-bay',
  'canberra',
  'central-coast',
  'coffs-harbour',
  'gold-coast',
  'hunter-valley',
  'melbourne',
  'newcastle',
  'orange',
  'perth',
  'port-macquarie',
  'sydney',
  'wollongong',
] as const;

export type City = (typeof ALL_CITIES)[number];

// Pretty labels (singular noun form used in copy)
export const SERVICE_LABEL: Record<Service, string> = {
  'built-in-wardrobes': 'Built-in Wardrobes',
  'commercial-joinery': 'Commercial Joinery',
  'custom-bathroom-vanity': 'Custom Bathroom Vanities',
  'custom-furniture': 'Custom Furniture',
  'custom-kitchen-joinery': 'Custom Kitchen Joinery',
  'home-office-joinery': 'Home Office Joinery',
  'laundry-cabinets': 'Laundry Cabinets',
  'office-fitout': 'Office Fit-Outs',
  'shopfitting': 'Shopfitting',
  'staircase-joinery': 'Staircase Joinery',
};

export const SERVICE_SINGULAR: Record<Service, string> = {
  'built-in-wardrobes': 'built-in wardrobe',
  'commercial-joinery': 'commercial joinery project',
  'custom-bathroom-vanity': 'custom bathroom vanity',
  'custom-furniture': 'custom furniture piece',
  'custom-kitchen-joinery': 'custom kitchen',
  'home-office-joinery': 'home office joinery fit-out',
  'laundry-cabinets': 'laundry cabinetry',
  'office-fitout': 'office fit-out',
  'shopfitting': 'shopfitting project',
  'staircase-joinery': 'staircase joinery',
};

export const CITY_LABEL: Record<City, string> = {
  'adelaide': 'Adelaide',
  'bathurst': 'Bathurst',
  'brisbane': 'Brisbane',
  'byron-bay': 'Byron Bay',
  'canberra': 'Canberra',
  'central-coast': 'Central Coast',
  'coffs-harbour': 'Coffs Harbour',
  'gold-coast': 'Gold Coast',
  'hunter-valley': 'Hunter Valley',
  'melbourne': 'Melbourne',
  'newcastle': 'Newcastle',
  'orange': 'Orange',
  'perth': 'Perth',
  'port-macquarie': 'Port Macquarie',
  'sydney': 'Sydney',
  'wollongong': 'Wollongong',
};

export const CITY_STATE: Record<City, string> = {
  'adelaide': 'SA',
  'bathurst': 'NSW',
  'brisbane': 'QLD',
  'byron-bay': 'NSW',
  'canberra': 'ACT',
  'central-coast': 'NSW',
  'coffs-harbour': 'NSW',
  'gold-coast': 'QLD',
  'hunter-valley': 'NSW',
  'melbourne': 'VIC',
  'newcastle': 'NSW',
  'orange': 'NSW',
  'perth': 'WA',
  'port-macquarie': 'NSW',
  'sydney': 'NSW',
  'wollongong': 'NSW',
};

// Nearby-city graph (3 neighbours per city) for internal linking
export const NEARBY_CITIES: Record<City, City[]> = {
  'adelaide': ['melbourne', 'perth', 'sydney'],
  'bathurst': ['orange', 'canberra', 'sydney'],
  'brisbane': ['gold-coast', 'byron-bay', 'sydney'],
  'byron-bay': ['gold-coast', 'coffs-harbour', 'brisbane'],
  'canberra': ['wollongong', 'bathurst', 'sydney'],
  'central-coast': ['newcastle', 'sydney', 'hunter-valley'],
  'coffs-harbour': ['port-macquarie', 'byron-bay', 'newcastle'],
  'gold-coast': ['brisbane', 'byron-bay', 'sydney'],
  'hunter-valley': ['newcastle', 'central-coast', 'port-macquarie'],
  'melbourne': ['adelaide', 'sydney', 'canberra'],
  'newcastle': ['central-coast', 'hunter-valley', 'sydney'],
  'orange': ['bathurst', 'canberra', 'sydney'],
  'perth': ['adelaide', 'melbourne', 'sydney'],
  'port-macquarie': ['coffs-harbour', 'newcastle', 'hunter-valley'],
  'sydney': ['central-coast', 'wollongong', 'newcastle'],
  'wollongong': ['sydney', 'canberra', 'central-coast'],
};

// Related-service graph (2 cousins per service)
export const RELATED_SERVICES: Record<Service, Service[]> = {
  'built-in-wardrobes': ['custom-kitchen-joinery', 'custom-bathroom-vanity'],
  'commercial-joinery': ['office-fitout', 'shopfitting'],
  'custom-bathroom-vanity': ['laundry-cabinets', 'built-in-wardrobes'],
  'custom-furniture': ['custom-kitchen-joinery', 'staircase-joinery'],
  'custom-kitchen-joinery': ['built-in-wardrobes', 'laundry-cabinets'],
  'home-office-joinery': ['custom-furniture', 'built-in-wardrobes'],
  'laundry-cabinets': ['custom-kitchen-joinery', 'custom-bathroom-vanity'],
  'office-fitout': ['commercial-joinery', 'home-office-joinery'],
  'shopfitting': ['commercial-joinery', 'office-fitout'],
  'staircase-joinery': ['custom-furniture', 'custom-kitchen-joinery'],
};

// Primary keyword per service (used in H1, title, schema)
export const SERVICE_PRIMARY_KEYWORD: Record<Service, string> = {
  'built-in-wardrobes': 'built-in wardrobes',
  'commercial-joinery': 'commercial joinery',
  'custom-bathroom-vanity': 'custom bathroom vanities',
  'custom-furniture': 'custom furniture',
  'custom-kitchen-joinery': 'custom kitchen joinery',
  'home-office-joinery': 'home office joinery',
  'laundry-cabinets': 'laundry cabinets',
  'office-fitout': 'office fit-out',
  'shopfitting': 'shopfitting',
  'staircase-joinery': 'staircase joinery',
};

// Secondary keywords per service (used in body, never in H1)
export const SERVICE_SECONDARY_KEYWORDS: Record<Service, string[]> = {
  'built-in-wardrobes': ['walk-in wardrobes', 'sliding door wardrobes', 'custom robes', 'bedroom storage'],
  'commercial-joinery': ['commercial cabinetry', 'fit-out joinery', 'retail joinery', 'hospitality joinery'],
  'custom-bathroom-vanity': ['bathroom cabinetry', 'vanity units', 'ensuite vanities', 'powder room vanities'],
  'custom-furniture': ['bespoke furniture', 'designer furniture', 'made-to-measure furniture', 'timber furniture'],
  'custom-kitchen-joinery': ['custom kitchens', 'bespoke kitchens', 'kitchen cabinetry', 'designer kitchens'],
  'home-office-joinery': ['home office cabinetry', 'study joinery', 'built-in desks', 'home office storage'],
  'laundry-cabinets': ['laundry joinery', 'laundry cabinetry', 'custom laundry', 'butler pantries'],
  'office-fitout': ['office fitouts', 'commercial office joinery', 'workplace fit-outs', 'corporate fit-outs'],
  'shopfitting': ['retail fitouts', 'shop fitouts', 'retail joinery', 'cafe fitouts'],
  'staircase-joinery': ['custom staircases', 'timber staircases', 'staircase balustrades', 'stair joinery'],
};
```

This file is the **single source of truth** for every page on the site. Every component, every metadata generator, every internal-link block reads from here.

---

# PART A — Fix the four root causes

## A1. Cannibalisation rule (the most important fix)

**The rule:** every page targets exactly one intent tier. No overlap.

| Page type | Targets queries like | Must NOT contain |
|---|---|---|
| Home `/` | "custom joinery Australia", "joinery NSW" | Any single-city heavy mentions; no city should appear more than once outside the footer |
| Service hub `/{service}` | "{service}", "{service} Australia" | Any city in body copy except in the "cities served" paragraph (each city named once, linked once) |
| Location hub `/locations` | "joinery locations Australia" | Specific service deep-dives |
| City page `/locations/{city}` | "joinery {city}", "cabinet maker {city}" | Any joinery phrase without "{city}" attached |
| Combo `/{service}/{city}` | "{service} {city}", e.g. "custom kitchen joinery newcastle" | The page must never mention any other city |
| Blog `/blog/{slug}` | Long-tail informational | No service-page keyword phrases without internal links to the service page |

**Apply this enforcement programmatically.** Add a build-time linter at `scripts/seo-lint.ts`:

```ts
// scripts/seo-lint.ts
// Run via: pnpm seo:lint  (add to package.json scripts)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_CITIES, ALL_SERVICES, CITY_LABEL } from '../lib/seo-graph';

type Violation = { file: string; rule: string; detail: string };
const violations: Violation[] = [];

// Read all page files under app/
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (/\.(tsx|mdx)$/.test(entry.name) && entry.name.startsWith('page')) out.push(p);
  }
  return out;
}

for (const file of walk('app')) {
  const txt = readFileSync(file, 'utf8');
  const rel = file.replace(/^app\//, '').replace(/\/page\.(tsx|mdx)$/, '');
  const parts = rel.split('/').filter(Boolean);

  // Rule 1: Combo pages must not mention other cities
  if (parts.length === 2 && (ALL_SERVICES as readonly string[]).includes(parts[0])) {
    const owningCity = parts[1];
    for (const city of ALL_CITIES) {
      if (city === owningCity) continue;
      const label = CITY_LABEL[city];
      const regex = new RegExp(`\\b${label}\\b`, 'g');
      const matches = txt.match(regex);
      if (matches && matches.length > 0) {
        violations.push({
          file,
          rule: 'combo-no-other-cities',
          detail: `Mentions ${label} (${matches.length}x) on /${owningCity} page`,
        });
      }
    }
  }

  // Rule 2: Service hub pages — each city must appear at most once
  if (parts.length === 1 && (ALL_SERVICES as readonly string[]).includes(parts[0])) {
    for (const city of ALL_CITIES) {
      const label = CITY_LABEL[city];
      const regex = new RegExp(`\\b${label}\\b`, 'g');
      const matches = txt.match(regex);
      if (matches && matches.length > 1) {
        violations.push({
          file,
          rule: 'hub-city-once',
          detail: `${label} appears ${matches.length}x on service hub (max 1)`,
        });
      }
    }
  }

  // Rule 3: Every page must have exactly one <h1>
  const h1Count = (txt.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) {
    violations.push({
      file,
      rule: 'one-h1',
      detail: `Found ${h1Count} <h1> tags (expected 1)`,
    });
  }
}

if (violations.length) {
  console.error(`SEO lint: ${violations.length} violations`);
  for (const v of violations) console.error(`  [${v.rule}] ${v.file} — ${v.detail}`);
  process.exit(1);
} else {
  console.log('SEO lint: clean');
}
```

Add `"seo:lint": "tsx scripts/seo-lint.ts"` to `package.json`, then run on every PR via CI. This prevents cannibalisation from creeping back in.

---

## A2. Wrong-page rankings — fix all 10 service hubs at once

For every file at `app/{service}/page.tsx` (10 files), enforce this structure:

```tsx
// app/custom-kitchen-joinery/page.tsx — TEMPLATE for all 10 service hubs

import { Metadata } from 'next';
import Link from 'next/link';
import { ALL_CITIES, CITY_LABEL, SERVICE_LABEL, SERVICE_PRIMARY_KEYWORD, SERVICE_SECONDARY_KEYWORDS } from '@/lib/seo-graph';
import { RelatedServicesBlock } from '@/components/RelatedServicesBlock';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';

const SERVICE = 'custom-kitchen-joinery' as const;
const KW = SERVICE_PRIMARY_KEYWORD[SERVICE];        // "custom kitchen joinery"
const LABEL = SERVICE_LABEL[SERVICE];                // "Custom Kitchen Joinery"
const SECONDARY = SERVICE_SECONDARY_KEYWORDS[SERVICE]; // ["custom kitchens", ...]

export const metadata: Metadata = {
  title: `${LABEL} Australia — SteepWood Custom Cabinetry Since 2014`,
  description: `${LABEL} designed and built by SteepWood. ${SECONDARY[0]}, ${SECONDARY[1]} and ${SECONDARY[2]} delivered nationally from our Newcastle workshop. NSW Licence 489553C.`,
  alternates: { canonical: `https://steepwood.com.au/${SERVICE}/` },
  openGraph: {
    title: `${LABEL} Australia — SteepWood`,
    description: `Bespoke ${KW} delivered nationally. Free design consult.`,
    url: `https://steepwood.com.au/${SERVICE}/`,
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <ServiceSchema service={SERVICE} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: LABEL, url: `/${SERVICE}/` },
      ]} />

      <article>
        {/* Exactly ONE <h1> */}
        <h1>{LABEL} in Australia — Custom-Built by SteepWood</h1>

        <section className="hero-intro">
          <p>
            SteepWood designs, manufactures and installs {KW} from our Newcastle workshop.
            Operating as Pavit Cabinetry Pty Ltd since 2014 (NSW Carpentry Contractor Licence 489553C),
            we deliver {SECONDARY[0]}, {SECONDARY[1]} and {SECONDARY[2]} to architects, builders
            and homeowners nationwide.
          </p>
        </section>

        {/* Service-specific deep content goes here — NO city names except in the one paragraph below */}
        <section className="service-detail">
          <h2>What we build</h2>
          {/* Full service detail — materials, process, finishes, hardware — NO city names */}
        </section>

        <section className="materials">
          <h2>Materials and hardware we specify</h2>
          {/* Polytec, Laminex, Caesarstone, Smartstone, Blum, Häfele, Hettich — no city names */}
        </section>

        <section className="process">
          <h2>Our process</h2>
          {/* Brief, consult → design → manufacture → install — no city names */}
        </section>

        {/* THE ONLY place city names appear on a service hub: one paragraph, each city linked once */}
        <section className="cities-served" aria-label="Cities we service">
          <h2>{LABEL} across Australia</h2>
          <p>
            We deliver {KW} nationwide. Pick your closest workshop hub for local information:{' '}
            {ALL_CITIES.map((city, i) => (
              <span key={city}>
                <Link href={`/${SERVICE}/${city}/`}>{LABEL} {CITY_LABEL[city]}</Link>
                {i < ALL_CITIES.length - 1 ? (i === ALL_CITIES.length - 2 ? ' and ' : ', ') : '.'}
              </span>
            ))}
          </p>
        </section>

        <RelatedServicesBlock currentService={SERVICE} />

        <section className="cta">
          <h2>Start your {SERVICE_PRIMARY_KEYWORD[SERVICE]} project</h2>
          <Link href="/quote/">Get a free design consult</Link>
        </section>
      </article>
    </>
  );
}
```

**Repeat for all 10 service hubs.** Change only the `SERVICE` const at the top. Copy is generated from `seo-graph.ts`.

---

## A3. City page template — 16 files at `app/locations/{city}/page.tsx`

The Adelaide cannibalisation was caused by generic AU copy on a city page. New rule: **every joinery phrase on a city page must be qualified with the city name**.

```tsx
// app/locations/adelaide/page.tsx — TEMPLATE for all 16 city pages

import { Metadata } from 'next';
import Link from 'next/link';
import {
  ALL_SERVICES,
  SERVICE_LABEL,
  SERVICE_PRIMARY_KEYWORD,
  CITY_LABEL,
  CITY_STATE,
  NEARBY_CITIES,
} from '@/lib/seo-graph';
import { LocalBusinessSchema } from '@/components/schema/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { CityServiceGrid } from '@/components/CityServiceGrid';

const CITY = 'adelaide' as const;
const LABEL = CITY_LABEL[CITY];   // "Adelaide"
const STATE = CITY_STATE[CITY];   // "SA"

export const metadata: Metadata = {
  title: `Custom Joinery ${LABEL} — Cabinet Maker ${LABEL} ${STATE} | SteepWood`,
  description: `Custom joinery and cabinetry in ${LABEL} ${STATE}. Custom kitchens, built-in wardrobes, vanities and commercial fit-outs delivered to ${LABEL}. NSW Licence 489553C.`,
  alternates: { canonical: `https://steepwood.com.au/locations/${CITY}/` },
};

export default function Page() {
  return (
    <>
      <LocalBusinessSchema city={CITY} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Locations', url: '/locations/' },
        { name: LABEL, url: `/locations/${CITY}/` },
      ]} />

      <article>
        <h1>Custom Joinery {LABEL} — SteepWood Cabinet Maker in {LABEL} {STATE}</h1>

        <section className="city-intro">
          <p>
            SteepWood delivers custom joinery to {LABEL} {STATE}. Operating from our Newcastle
            workshop since 2014, we design and install custom kitchens in {LABEL}, built-in
            wardrobes in {LABEL}, bathroom vanities in {LABEL}, laundry cabinetry, custom
            furniture, staircases and commercial joinery for {LABEL} projects.
          </p>
          {/*
            CRITICAL: every joinery phrase on this page is followed by "{LABEL}" or "in {LABEL}".
            Never write "bespoke joinery" — write "bespoke joinery in Adelaide".
            Never write "custom kitchens Australia" — write "custom kitchens in Adelaide".
            The build-time linter will fail the PR if generic phrases sneak in.
          */}
        </section>

        <section className="why-us">
          <h2>Why {LABEL} clients choose SteepWood</h2>
          <p>
            We service {LABEL} from our Newcastle facility with full project management, on-site
            measure and fixed quotes. Every {LABEL} project is drawn in-house, manufactured by
            licensed cabinetmakers and installed by our team.
          </p>
        </section>

        {/* The full 10-service grid links to every {service}/{city} combo */}
        <CityServiceGrid city={CITY} />

        <section className="nearby">
          <h2>Nearby cities we also service</h2>
          <ul>
            {NEARBY_CITIES[CITY].map((nc) => (
              <li key={nc}>
                <Link href={`/locations/${nc}/`}>Custom joinery {CITY_LABEL[nc]}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="cta">
          <h2>Get a custom joinery quote in {LABEL}</h2>
          <Link href="/quote/">Request a free design consult for {LABEL}</Link>
        </section>
      </article>
    </>
  );
}
```

**Repeat for all 16 city pages.** Change only `CITY`. The linter enforces "no generic phrases".

---

## A4. Combo page template — 160 files at `app/{service}/{city}/page.tsx`

Each combo is the canonical owner of `{service} {city}` queries. **Never mention any other city.**

```tsx
// app/custom-kitchen-joinery/newcastle/page.tsx — TEMPLATE for all 160 combo pages

import { Metadata } from 'next';
import Link from 'next/link';
import {
  SERVICE_LABEL,
  SERVICE_PRIMARY_KEYWORD,
  SERVICE_SECONDARY_KEYWORDS,
  CITY_LABEL,
  CITY_STATE,
  NEARBY_CITIES,
  RELATED_SERVICES,
} from '@/lib/seo-graph';
import { ServiceAreaSchema } from '@/components/schema/ServiceAreaSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { RelatedServicesBlock } from '@/components/RelatedServicesBlock';

const SERVICE = 'custom-kitchen-joinery' as const;
const CITY = 'newcastle' as const;
const SVC_LABEL = SERVICE_LABEL[SERVICE];
const SVC_KW = SERVICE_PRIMARY_KEYWORD[SERVICE];     // "custom kitchen joinery"
const SVC_SECONDARY = SERVICE_SECONDARY_KEYWORDS[SERVICE];
const CITY_LBL = CITY_LABEL[CITY];                    // "Newcastle"
const STATE = CITY_STATE[CITY];                       // "NSW"

export const metadata: Metadata = {
  title: `${SVC_LABEL} ${CITY_LBL} ${STATE} — SteepWood Cabinet Maker`,
  description: `${SVC_LABEL} in ${CITY_LBL} ${STATE}. ${SVC_SECONDARY[0]} and ${SVC_SECONDARY[1]} designed, built and installed by SteepWood. Free ${CITY_LBL} consult.`,
  alternates: { canonical: `https://steepwood.com.au/${SERVICE}/${CITY}/` },
  openGraph: {
    title: `${SVC_LABEL} ${CITY_LBL} ${STATE}`,
    description: `Bespoke ${SVC_KW} in ${CITY_LBL}. NSW Licence 489553C.`,
    url: `https://steepwood.com.au/${SERVICE}/${CITY}/`,
  },
};

export default function Page() {
  return (
    <>
      <ServiceAreaSchema service={SERVICE} city={CITY} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: SVC_LABEL, url: `/${SERVICE}/` },
        { name: `${SVC_LABEL} ${CITY_LBL}`, url: `/${SERVICE}/${CITY}/` },
      ]} />

      <article>
        {/* H1 owns the city+service combination — the only phrasing Google needs to see */}
        <h1>{SVC_LABEL} {CITY_LBL} — SteepWood Custom Cabinetmakers in {CITY_LBL} {STATE}</h1>

        <section className="combo-intro">
          <p>
            SteepWood delivers {SVC_KW} in {CITY_LBL} {STATE}. Every {SVC_KW} project for {CITY_LBL}
            clients is drawn, manufactured and installed by our team — operating since 2014 as
            Pavit Cabinetry Pty Ltd (NSW Carpentry Contractor Licence 489553C).
          </p>
        </section>

        <section className="service-detail">
          <h2>{SVC_LABEL} in {CITY_LBL} — what we build</h2>
          <p>
            Our {CITY_LBL} {SVC_KW} projects include {SVC_SECONDARY[0]},
            {' '}{SVC_SECONDARY[1]}, {SVC_SECONDARY[2]} and {SVC_SECONDARY[3]}. Each {CITY_LBL}
            installation uses Polytec, Laminex, Caesarstone, Smartstone, Blum and Häfele
            components. Drawings, measure and quote are fixed before manufacture begins.
          </p>
        </section>

        <section className="suburbs">
          <h2>{CITY_LBL} suburbs we service</h2>
          <p>
            {/* TODO: 6–10 hand-curated suburbs per city — see Suburb List below */}
            {/* For Newcastle: Newcastle East, Cooks Hill, The Junction, Merewether, Hamilton, ... */}
          </p>
        </section>

        <section className="process">
          <h2>How we work in {CITY_LBL}</h2>
          {/* Same process content, with "{CITY_LBL}" sprinkled naturally */}
        </section>

        <FAQSchema faqs={[
          {
            question: `How much does ${SVC_KW} cost in ${CITY_LBL}?`,
            answer: `${SVC_KW} pricing in ${CITY_LBL} ranges from $25,000 to $60,000+ for a fully installed project, depending on size, materials and finish.`,
          },
          {
            question: `Do you service all ${CITY_LBL} suburbs?`,
            answer: `Yes — SteepWood delivers ${SVC_KW} across greater ${CITY_LBL} ${STATE}.`,
          },
          {
            question: `How long does a ${SVC_KW} project take in ${CITY_LBL}?`,
            answer: `From measure to install, typically 6–10 weeks for a ${CITY_LBL} ${SVC_KW} project.`,
          },
        ]} />

        {/* Internal linking — 3 nearby cities (same service) + 2 related services (same city) */}
        <section className="related-combos" aria-label="Related joinery in nearby areas">
          <h2>{SVC_LABEL} in nearby cities</h2>
          <ul>
            {NEARBY_CITIES[CITY].map((nc) => (
              <li key={nc}>
                <Link href={`/${SERVICE}/${nc}/`}>{SVC_LABEL} {CITY_LABEL[nc]}</Link>
              </li>
            ))}
          </ul>

          <h2>Related services in {CITY_LBL}</h2>
          <ul>
            {RELATED_SERVICES[SERVICE].map((rs) => (
              <li key={rs}>
                <Link href={`/${rs}/${CITY}/`}>{SERVICE_LABEL[rs]} in {CITY_LBL}</Link>
              </li>
            ))}
            <li>
              <Link href={`/locations/${CITY}/`}>All SteepWood services in {CITY_LBL}</Link>
            </li>
          </ul>
        </section>

        <section className="cta">
          <Link href="/quote/">Get a free {SVC_KW} quote in {CITY_LBL}</Link>
        </section>
      </article>
    </>
  );
}
```

### Suburb list (paste into `lib/city-suburbs.ts`)

```ts
// lib/city-suburbs.ts
import { City } from './seo-graph';

export const CITY_SUBURBS: Record<City, string[]> = {
  adelaide: ['Adelaide CBD', 'North Adelaide', 'Norwood', 'Glenelg', 'Unley', 'Burnside', 'Prospect', 'Mitcham'],
  bathurst: ['Bathurst CBD', 'Kelso', 'West Bathurst', 'South Bathurst', 'Eglinton', 'Perthville', 'Abercrombie'],
  brisbane: ['Brisbane CBD', 'New Farm', 'Paddington', 'Bulimba', 'Hamilton', 'Toowong', 'Indooroopilly', 'Ascot'],
  'byron-bay': ['Byron Bay', 'Suffolk Park', 'Bangalow', 'Mullumbimby', 'Lennox Head', 'Federal', 'Ewingsdale'],
  canberra: ['Canberra City', 'Braddon', 'Kingston', 'Manuka', 'Forrest', 'Yarralumla', 'Deakin', 'Griffith'],
  'central-coast': ['Gosford', 'Terrigal', 'Erina', 'Avoca Beach', 'Woy Woy', 'Wamberal', 'Killcare', 'Wyong'],
  'coffs-harbour': ['Coffs Harbour CBD', 'Sawtell', 'Boambee', 'Korora', 'Park Beach', 'Toormina', 'Bonville'],
  'gold-coast': ['Surfers Paradise', 'Broadbeach', 'Burleigh Heads', 'Mermaid Beach', 'Palm Beach', 'Coolangatta', 'Robina', 'Bundall'],
  'hunter-valley': ['Cessnock', 'Pokolbin', 'Maitland', 'Singleton', 'Branxton', 'Lovedale', 'Rothbury', 'Muswellbrook'],
  melbourne: ['Melbourne CBD', 'South Yarra', 'Toorak', 'Brighton', 'Carlton', 'Richmond', 'Hawthorn', 'St Kilda'],
  newcastle: ['Newcastle East', 'Cooks Hill', 'The Junction', 'Merewether', 'Hamilton', 'New Lambton', 'Adamstown', 'Charlestown'],
  orange: ['Orange CBD', 'Bletchington', 'Glenroi', 'Calare', 'East Orange', 'Lucknow', 'Spring Hill'],
  perth: ['Perth CBD', 'Subiaco', 'Cottesloe', 'Claremont', 'Nedlands', 'Fremantle', 'Mount Lawley', 'Leederville'],
  'port-macquarie': ['Port Macquarie CBD', 'Settlement Point', 'Lighthouse Beach', 'Lake Cathie', 'Wauchope', 'Sancrox'],
  sydney: ['Sydney CBD', 'Mosman', 'Paddington', 'Surry Hills', 'Bondi', 'Manly', 'Double Bay', 'Newtown'],
  wollongong: ['Wollongong CBD', 'North Wollongong', 'Thirroul', 'Bulli', 'Figtree', 'Corrimal', 'Fairy Meadow', 'Helensburgh'],
};
```

Drop `CITY_SUBURBS[CITY].join(', ')` into the suburb section of each combo and city page.

---

## A5. Home page `/` — sitewide anchor

The home page is currently competing with combo pages for "custom joinery newcastle" (pos 56). Fix:

```tsx
// app/page.tsx — HOME

export const metadata: Metadata = {
  title: 'SteepWood — Custom Joinery & Cabinetmakers Australia (NSW Licence 489553C)',
  description: 'Custom joinery, kitchens, wardrobes, vanities and commercial fit-outs across Australia. Newcastle workshop since 2014. NSW Carpentry Licence 489553C.',
  alternates: { canonical: 'https://steepwood.com.au/' },
};
```

**Body rules for home:**
- H1: `SteepWood — Australia's Custom Joinery Studio`
- Mention every city **once only**, inside a single "cities we service" paragraph at the bottom (linked to `/locations/{city}/`).
- Mention every service **once only**, inside a single "services" grid (linked to `/{service}/`).
- Do not write "custom joinery Newcastle" anywhere on the home page — that phrase belongs exclusively to `/custom-kitchen-joinery/newcastle/` and `/locations/newcastle/`.

---

## A6. About page `/about/` — fix the missing H1 (carry-over P0)

```tsx
// app/about/page.tsx
export const metadata: Metadata = {
  title: 'About SteepWood — Custom Joinery Newcastle Since 2014 | Pavit Cabinetry',
  description: 'Founded in 2014, SteepWood is a Newcastle custom joinery studio led by Sukhveer Kaur. NSW Carpentry Contractor Licence 489553C, ABN 52 697 313 269.',
  alternates: { canonical: 'https://steepwood.com.au/about/' },
};

// EXACTLY ONE <h1>
<h1>About SteepWood — Custom Joinery Newcastle Since 2014</h1>
```

This page is allowed to mention Newcastle (the HQ city). It must NOT contain other city names in body content.

---

## A7. Locations hub `/locations/` — index of all 16 cities

```tsx
export const metadata: Metadata = {
  title: 'Locations — SteepWood Custom Joinery Across Australia',
  description: 'SteepWood delivers custom joinery to 16 cities across Australia. Find your nearest service area.',
  alternates: { canonical: 'https://steepwood.com.au/locations/' },
};

<h1>SteepWood Locations Across Australia</h1>
{/* Render a grid: each city → /locations/{city}/ with state, image, brief blurb */}
```

---

# PART B — Programmatic internal linking

## B1. `<RelatedServicesBlock>` component

```tsx
// components/RelatedServicesBlock.tsx
import Link from 'next/link';
import { RELATED_SERVICES, SERVICE_LABEL, Service } from '@/lib/seo-graph';

export function RelatedServicesBlock({ currentService }: { currentService: Service }) {
  const related = RELATED_SERVICES[currentService];
  return (
    <section className="related-services" aria-label="Related services">
      <h2>Related joinery services</h2>
      <ul>
        {related.map((svc) => (
          <li key={svc}>
            <Link href={`/${svc}/`}>{SERVICE_LABEL[svc]}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

## B2. `<CityServiceGrid>` component

```tsx
// components/CityServiceGrid.tsx
import Link from 'next/link';
import { ALL_SERVICES, SERVICE_LABEL, CITY_LABEL, City } from '@/lib/seo-graph';

export function CityServiceGrid({ city }: { city: City }) {
  return (
    <section className="city-service-grid" aria-label={`All services in ${CITY_LABEL[city]}`}>
      <h2>All SteepWood services in {CITY_LABEL[city]}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ALL_SERVICES.map((svc) => (
          <li key={svc}>
            <Link href={`/${svc}/${city}/`}>
              {SERVICE_LABEL[svc]} in {CITY_LABEL[city]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

## B3. Footer — 10×16 matrix

```tsx
// components/Footer.tsx
import Link from 'next/link';
import { ALL_SERVICES, ALL_CITIES, SERVICE_LABEL, CITY_LABEL } from '@/lib/seo-graph';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h3>Services</h3>
          <ul>
            {ALL_SERVICES.map((svc) => (
              <li key={svc}>
                <Link href={`/${svc}/`}>{SERVICE_LABEL[svc]}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Locations</h3>
          <ul>
            {ALL_CITIES.map((city) => (
              <li key={city}>
                <Link href={`/locations/${city}/`}>{CITY_LABEL[city]}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>SteepWood</h3>
          <p>Pavit Cabinetry Pty Ltd</p>
          <p>ABN 52 697 313 269</p>
          <p>NSW Carpentry Contractor Licence 489553C</p>
          <p><a href="mailto:hello@steepwood.com.au">hello@steepwood.com.au</a></p>
          <p><a href="tel:+61468387676">0468 387 676</a></p>
        </section>

        <section>
          <h3>Company</h3>
          <ul>
            <li><Link href="/about/">About</Link></li>
            <li><Link href="/portfolio/">Portfolio</Link></li>
            <li><Link href="/blog/">Blog</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
            <li><Link href="/quote/">Get a quote</Link></li>
            <li><Link href="/legal/privacy/">Privacy</Link></li>
            <li><Link href="/legal/terms/">Terms</Link></li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
```

This single footer adds **160 new internal links** to every page (10 services × 16 cities, plus all hubs). Combined with `<CityServiceGrid>` and `<RelatedServicesBlock>`, every combo page now receives 12+ contextual inbound links, lifting it out of the "1–6 inbound" famine zone identified in audit v3.

## B4. Blog post internal linking

Every blog MDX file must include **3 in-article links** with descriptive anchor text to relevant service/combo pages. Patch each blog accordingly:

| Blog slug | Add links to |
|---|---|
| `custom-kitchen-cost-nsw-2026` | `/custom-kitchen-joinery/`, `/custom-kitchen-joinery/sydney/`, `/custom-kitchen-joinery/newcastle/` |
| `flat-pack-vs-custom-kitchen-australia` | `/custom-kitchen-joinery/`, `/custom-kitchen-joinery/newcastle/`, `/laundry-cabinets/` |
| `benchtop-guide-engineered-stone-ban-nsw` | `/custom-kitchen-joinery/`, `/custom-kitchen-joinery/sydney/`, `/laundry-cabinets/sydney/` |
| `2pac-laminate-timber-veneer-kitchen-finishes-nsw` | `/custom-kitchen-joinery/`, `/built-in-wardrobes/`, `/custom-kitchen-joinery/newcastle/` |
| `walk-in-robe-built-in-wardrobe-cost-guide-nsw` | `/built-in-wardrobes/`, `/built-in-wardrobes/sydney/`, `/built-in-wardrobes/newcastle/` |
| `questions-to-ask-custom-joiner-australia` | `/custom-kitchen-joinery/`, `/about/`, `/quote/` |

Anchor text must be the keyword phrase, not "click here" or "learn more".

---

# PART C — Carry-over P0 bugs

## C1. Built-in wardrobes hub — keyword qualifier

In `app/built-in-wardrobes/page.tsx`, find:

```
"timber veneer kitchen cabinets"
```

Replace with:

```
"timber veneer kitchen cabinets Australia"
```

(Mentioned only once on the hub, in context of materials we use across the country.)

## C2. URL slash normalisation

In `next.config.js`:

```js
/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,  // canonicalise to trailing-slash URLs

  async redirects() {
    // Belt-and-braces: explicit 301s for known indexed duplicates
    return [
      {
        source: '/custom-kitchen-joinery/orange',
        destination: '/custom-kitchen-joinery/orange/',
        permanent: true,
      },
      // Add others if GSC shows duplicate indexing (check the "Pages" report for /url and /url/ pairs)
    ];
  },
};
```

Then verify every page sets `<link rel="canonical" href="https://steepwood.com.au{pathname}/" />` via the `metadata.alternates.canonical` field above.

## C3. Sitemap regeneration

Update `app/sitemap.ts` to emit URLs with trailing slashes only:

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { ALL_SERVICES, ALL_CITIES } from '@/lib/seo-graph';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://steepwood.com.au';
  const lastModified = new Date();

  const top = ['', 'about', 'contact', 'quote', 'portfolio', 'blog', 'locations'];
  const blogs = [
    '2pac-laminate-timber-veneer-kitchen-finishes-nsw',
    'benchtop-guide-engineered-stone-ban-nsw',
    'custom-kitchen-cost-nsw-2026',
    'flat-pack-vs-custom-kitchen-australia',
    'questions-to-ask-custom-joiner-australia',
    'walk-in-robe-built-in-wardrobe-cost-guide-nsw',
  ];
  const legal = ['legal/privacy', 'legal/terms', 'legal/consumer-rights'];

  const entries: MetadataRoute.Sitemap = [];

  for (const t of top) entries.push({ url: `${base}/${t ? t + '/' : ''}`, lastModified, priority: t === '' ? 1.0 : 0.8, changeFrequency: 'weekly' });
  for (const s of ALL_SERVICES) entries.push({ url: `${base}/${s}/`, lastModified, priority: 0.9, changeFrequency: 'weekly' });
  for (const c of ALL_CITIES) entries.push({ url: `${base}/locations/${c}/`, lastModified, priority: 0.8, changeFrequency: 'monthly' });
  for (const s of ALL_SERVICES) for (const c of ALL_CITIES) entries.push({ url: `${base}/${s}/${c}/`, lastModified, priority: 0.7, changeFrequency: 'monthly' });
  for (const b of blogs) entries.push({ url: `${base}/blog/${b}/`, lastModified, priority: 0.6, changeFrequency: 'monthly' });
  for (const l of legal) entries.push({ url: `${base}/${l}/`, lastModified, priority: 0.3, changeFrequency: 'yearly' });

  return entries;
}
```

After deploy, re-submit `https://steepwood.com.au/sitemap.xml` in Google Search Console.

---

# PART D — Schema.org structured data

Five schema components — one each at `components/schema/`. Each combo page renders 3 of them, every hub renders 2.

## D1. LocalBusinessSchema

```tsx
// components/schema/LocalBusinessSchema.tsx
import { CITY_LABEL, CITY_STATE, City } from '@/lib/seo-graph';

export function LocalBusinessSchema({ city }: { city?: City }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://steepwood.com.au/#business',
    name: 'SteepWood',
    legalName: 'Pavit Cabinetry Pty Ltd',
    url: 'https://steepwood.com.au/',
    telephone: '+61468387676',
    email: 'hello@steepwood.com.au',
    foundingDate: '2014',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Newcastle',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    areaServed: city
      ? { '@type': 'City', name: CITY_LABEL[city], addressRegion: CITY_STATE[city], addressCountry: 'AU' }
      : { '@type': 'Country', name: 'Australia' },
    identifier: [
      { '@type': 'PropertyValue', name: 'ABN', value: '52 697 313 269' },
      { '@type': 'PropertyValue', name: 'NSW Carpentry Contractor Licence', value: '489553C' },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

## D2. ServiceSchema (for service hubs)

```tsx
// components/schema/ServiceSchema.tsx
import { SERVICE_LABEL, SERVICE_PRIMARY_KEYWORD, Service } from '@/lib/seo-graph';

export function ServiceSchema({ service }: { service: Service }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: SERVICE_LABEL[service],
    name: `${SERVICE_LABEL[service]} by SteepWood`,
    description: `${SERVICE_PRIMARY_KEYWORD[service]} designed, manufactured and installed by SteepWood from our Newcastle workshop.`,
    provider: { '@id': 'https://steepwood.com.au/#business' },
    areaServed: { '@type': 'Country', name: 'Australia' },
    url: `https://steepwood.com.au/${service}/`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

## D3. ServiceAreaSchema (for combo pages)

```tsx
// components/schema/ServiceAreaSchema.tsx
import { SERVICE_LABEL, SERVICE_PRIMARY_KEYWORD, CITY_LABEL, CITY_STATE, Service, City } from '@/lib/seo-graph';

export function ServiceAreaSchema({ service, city }: { service: Service; city: City }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: SERVICE_LABEL[service],
    name: `${SERVICE_LABEL[service]} in ${CITY_LABEL[city]}`,
    description: `${SERVICE_PRIMARY_KEYWORD[service]} delivered to ${CITY_LABEL[city]} ${CITY_STATE[city]} by SteepWood.`,
    provider: { '@id': 'https://steepwood.com.au/#business' },
    areaServed: {
      '@type': 'City',
      name: CITY_LABEL[city],
      addressRegion: CITY_STATE[city],
      addressCountry: 'AU',
    },
    url: `https://steepwood.com.au/${service}/${city}/`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

## D4. BreadcrumbSchema (every page)

```tsx
// components/schema/BreadcrumbSchema.tsx
type Item = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: Item[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://steepwood.com.au${item.url}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

## D5. FAQSchema (combo pages and key blogs)

```tsx
// components/schema/FAQSchema.tsx
type FAQ = { question: string; answer: string };

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

---

# PART E — Keyword targeting matrix (one row per URL type)

This is the single source of truth for what each URL targets. Reference when QA-ing.

| URL pattern | Primary keyword | Secondary keywords | Don't target |
|---|---|---|---|
| `/` | "custom joinery Australia", "SteepWood" | "joinery NSW", "cabinetmaker Newcastle" | Any city-specific service term |
| `/about/` | "SteepWood about", "Pavit Cabinetry" | "Sukhveer Kaur", "Newcastle joinery studio" | Service-specific queries |
| `/quote/` | "joinery quote", "custom kitchen quote" | "free joinery consult" | — |
| `/portfolio/` | "joinery portfolio Australia" | "custom kitchen examples", "wardrobe projects" | — |
| `/blog/` | "joinery blog Australia" | "custom kitchen guide", "wardrobe guide" | — |
| `/locations/` | "joinery locations Australia" | "cabinet maker Australia locations" | — |
| `/locations/{city}/` | "joinery {city}", "cabinet maker {city}" | "custom kitchens {city}", "{city} joinery studio" | Any other city |
| `/{service}/` | SERVICE_PRIMARY_KEYWORD[svc] + " Australia" | SERVICE_SECONDARY_KEYWORDS[svc] | Any city-specific phrase |
| `/{service}/{city}/` | "{primary} {city}", e.g. "custom kitchen joinery sydney" | "{primary} {state}", "cabinetmaker {city}" | Other cities, generic AU phrases |
| `/blog/{slug}/` | Long-tail informational | Related service phrases | Direct competition with service hubs |

---

# PART F — Top 50 priority queries to rank for (current rank → target)

These are pulled from GSC + the master document. Combo pages must own these.

| Query | Owning URL | Current | Target |
|---|---|---|---|
| custom joinery newcastle | `/locations/newcastle/` | 53.8 | 8 |
| commercial joinery newcastle | `/commercial-joinery/newcastle/` | 23.4 (on `/`) | 6 |
| custom kitchen joinery newcastle | `/custom-kitchen-joinery/newcastle/` | ~45 | 7 |
| custom kitchen joinery sydney | `/custom-kitchen-joinery/sydney/` | ~50 | 12 |
| built in wardrobes newcastle | `/built-in-wardrobes/newcastle/` | ~55 | 10 |
| built in wardrobes sydney | `/built-in-wardrobes/sydney/` | 68.0 | 15 |
| office fit out newcastle | `/office-fitout/newcastle/` | 76.4 | 15 |
| office fit out sydney | `/office-fitout/sydney/` | ~60 | 18 |
| office fitout perth | `/office-fitout/perth/` | 77.4 | 25 |
| commercial joinery sydney | `/commercial-joinery/sydney/` | ~50 | 12 |
| commercial joinery perth | `/commercial-joinery/perth/` | 88 | 25 |
| custom kitchen sydney | `/custom-kitchen-joinery/sydney/` | competes with `/` | 12 |
| laundry cabinets adelaide | `/laundry-cabinets/adelaide/` | ~70 | 20 |
| laundry cabinets sydney | `/laundry-cabinets/sydney/` | unranked | 25 |
| custom bathroom vanity sydney | `/custom-bathroom-vanity/sydney/` | unranked | 25 |
| custom bathroom vanity newcastle | `/custom-bathroom-vanity/newcastle/` | unranked | 18 |
| staircase joinery sydney | `/staircase-joinery/sydney/` | 18 | 6 |
| staircase joinery canberra | `/staircase-joinery/canberra/` | 3 | hold |
| staircase joinery perth | `/staircase-joinery/perth/` | 7.7 | hold |
| staircase joinery bathurst | `/staircase-joinery/bathurst/` | 5 | hold |
| custom furniture sydney | `/custom-furniture/sydney/` | ~30 | 8 |
| custom furniture newcastle | `/custom-furniture/newcastle/` | ~35 | 10 |
| home office joinery sydney | `/home-office-joinery/sydney/` | unranked | 25 |
| home office joinery newcastle | `/home-office-joinery/newcastle/` | unranked | 20 |
| shopfitting sydney | `/shopfitting/sydney/` | unranked | 25 |
| shopfitting newcastle | `/shopfitting/newcastle/` | unranked | 18 |
| bespoke joinery sydney | `/locations/sydney/` | unranked | 18 |
| bespoke joinery newcastle | `/locations/newcastle/` | unranked | 12 |
| custom joinery sydney | `/locations/sydney/` | unranked | 15 |
| custom joinery central coast | `/locations/central-coast/` | leaks to Adelaide | 18 |
| custom joinery brisbane | `/locations/brisbane/` | unranked | 25 |
| custom joinery melbourne | `/locations/melbourne/` | unranked | 30 |
| custom joinery adelaide | `/locations/adelaide/` | 82 | 25 |
| custom joinery perth | `/locations/perth/` | unranked | 30 |
| custom kitchen joinery brisbane | `/custom-kitchen-joinery/brisbane/` | unranked | 25 |
| custom kitchen joinery melbourne | `/custom-kitchen-joinery/melbourne/` | unranked | 30 |
| custom kitchen joinery canberra | `/custom-kitchen-joinery/canberra/` | unranked | 20 |
| custom kitchen joinery central coast | `/custom-kitchen-joinery/central-coast/` | unranked | 15 |
| custom kitchen joinery hunter valley | `/custom-kitchen-joinery/hunter-valley/` | unranked | 15 |
| built in wardrobes central coast | `/built-in-wardrobes/central-coast/` | unranked | 15 |
| built in wardrobes hunter valley | `/built-in-wardrobes/hunter-valley/` | unranked | 18 |
| built in wardrobes byron bay | `/built-in-wardrobes/byron-bay/` | unranked | 22 |
| built in wardrobes gold coast | `/built-in-wardrobes/gold-coast/` | unranked | 22 |
| custom bathroom vanity adelaide | `/custom-bathroom-vanity/adelaide/` | unranked | 25 |
| custom bathroom vanity brisbane | `/custom-bathroom-vanity/brisbane/` | unranked | 28 |
| office fitout brisbane | `/office-fitout/brisbane/` | unranked | 25 |
| office fitout melbourne | `/office-fitout/melbourne/` | unranked | 30 |
| office fitout canberra | `/office-fitout/canberra/` | unranked | 22 |
| commercial joinery brisbane | `/commercial-joinery/brisbane/` | unranked | 25 |
| commercial joinery canberra | `/commercial-joinery/canberra/` | unranked | 22 |

---

# PART G — Ship checklist (in order)

### PR 1 — Foundation (1–2 days)
- [ ] `lib/seo-graph.ts` committed (single source of truth)
- [ ] `lib/city-suburbs.ts` committed
- [ ] `components/schema/*.tsx` — all 5 schema components
- [ ] `components/RelatedServicesBlock.tsx`, `components/CityServiceGrid.tsx`, `components/Footer.tsx`
- [ ] `next.config.js` — trailingSlash + redirects
- [ ] `app/sitemap.ts` regenerated
- [ ] `scripts/seo-lint.ts` + `pnpm seo:lint` script added
- [ ] CI runs `pnpm seo:lint` and fails on violations

### PR 2 — Hubs and home (1 day)
- [ ] `app/page.tsx` rewritten with single-mention rule
- [ ] All 10 `app/{service}/page.tsx` regenerated from the template
- [ ] `app/about/page.tsx` — H1 fix + Newcastle-only city mention
- [ ] `app/locations/page.tsx` — 16-city grid
- [ ] `app/built-in-wardrobes/page.tsx` — "timber veneer kitchen cabinets Australia" qualifier

### PR 3 — City pages (1 day)
- [ ] All 16 `app/locations/{city}/page.tsx` regenerated
- [ ] `/locations/adelaide/` — every joinery phrase qualified with "Adelaide"
- [ ] `CityServiceGrid` renders on every city page

### PR 4 — Combo pages (2 days)
- [ ] All 160 `app/{service}/{city}/page.tsx` regenerated from template
- [ ] `RelatedServicesBlock` + nearby-cities block on every combo
- [ ] `FAQSchema` with 3 FAQs per combo
- [ ] `ServiceAreaSchema` on every combo
- [ ] **Critical:** every combo passes the `combo-no-other-cities` linter rule

### PR 5 — Blog cross-linking (half day)
- [ ] 6 blog posts patched with 3 contextual in-article links each
- [ ] Anchor text uses target keywords, not generic words

### Post-deploy (same day as PR 5 merges)
- [ ] Re-submit `https://steepwood.com.au/sitemap.xml` in Google Search Console
- [ ] Request indexing for the top 20 priority URLs in GSC URL Inspection
- [ ] Set a 14-day reminder to re-run the GSC audit and compare to baseline

---

# PART H — Quality gates (run before merging each PR)

1. **`pnpm seo:lint`** — passes with zero violations
2. **`pnpm build`** — builds 209 routes without warnings
3. **Manual spot check** — open 5 random combo pages, search the rendered HTML for every other city name. Expect zero matches except in the footer locations list.
4. **Lighthouse SEO** — every page scores 95+ in the SEO category
5. **Schema validator** — paste any combo page URL into https://validator.schema.org/ — every block validates clean
6. **GSC URL inspection** — top 20 URLs return "Indexable" status

---

# PART I — Definition of done

| Metric | Today | Day 30 | Day 60 | Day 90 |
|---|---|---|---|---|
| Avg position (GSC, AU) | 61.2 | 45 | 35 | 25 |
| Impressions / 30d | 1,849 | 3,500 | 6,000 | 10,000 |
| Page-1 priority queries | 5 | 8 | 12 | 18 |
| Combo pages with 8+ inbound links | ~10 | 160 | 160 | 160 |
| Linter violations on main | unknown | 0 | 0 | 0 |

If by day 30 the avg position has not improved by 10+ positions, the issue is not on-page — it is the zero-backlinks ceiling. Action the parallel `steepwood-backlink-automation` pack.

---

*Australian English throughout. No emojis. No markdown italics. Author byline for blog work: Sukhveer Kaur.*
