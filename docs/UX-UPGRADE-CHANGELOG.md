# SteepWood UX Upgrade Changelog

SEO-locked visual upgrade per `docs/STEEPWOOD-UX-UPGRADE-CURSOR-PROMPT.md`.

## Verification gates

| Gate | Result |
|------|--------|
| SEO snapshot (`pnpm snapshot:seo`) | **ZERO DIFF** (12 sample URLs) |
| Heading map (`pnpm snapshot:headings`) | **ZERO DIFF** (12 sample URLs) |
| TypeScript (`pnpm typecheck`) | Pass |
| Smoke tests (`pnpm smoke`) | 15/15 pass |
| Build (`pnpm build`) | Pass (222 pages; known Prisma pool warnings during parallel SSG) |

## Tasks completed

### Task 0 — Safety net
- `scripts/snapshot-seo.mjs`, `scripts/snapshot-headings.mjs`, `scripts/seo-sample-urls.json`
- `pnpm snapshot:seo`, `pnpm snapshot:headings` scripts
- Baseline snapshots in `snapshots/`

### Task 1 — Foundation
- `motion`, `gsap`, `@gsap/react`, `lenis`, `liquid-glass-react`, `next-view-transitions`
- `components.json` registries (@magicui, @aceternity, @cult, @kibo, @kokonut)
- `.cursor/rules/steepwood-ux.mdc` (+ SEO lock block)

### Task 2 — Lenis smooth scroll
- `src/components/providers/LenisProvider.tsx` with GSAP ScrollTrigger sync
- Disabled below 768px and under `prefers-reduced-motion`

### Task 3 — View transitions
- `<ViewTransitions>` in `src/app/layout.tsx`
- All internal links via `src/components/ui/link.tsx` (next-view-transitions)
- Service + location `viewTransitionName` on cards and hub heroes

### Task 4 — Services bento grid
- `src/components/sections/ServicesBentoGrid.tsx` (Motion bento; Magic UI install skipped — shadcn overwrite prompt)
- Same titles, descriptions, links; featured cells for top 4 services

### Task 5 — Number tickers
- **Skipped** — no existing trust-stats row with discrete numeric values (would require new copy). Per Part 5 escape hatch.

### Task 6 — Aceternity hero + CTA background
- `Spotlight` on homepage hero (`src/components/ui/aceternity/spotlight.tsx`)
- `BackgroundGradientAnimation` on final CTA section

### Task 7 — Portfolio 3D cards
- Aceternity-style `CardContainer` / `CardBody` / `CardItem` on `/portfolio/` grid

### Task 8 — Liquid glass
- Sticky mobile CTA capsule (`LiquidGlassSurface` + Safari/Firefox fallback)
- Desktop nav → centred liquid glass pill after scroll > 80px

### Task 9 — GSAP ScrollTrigger process
- `ProcessScroll` on homepage (4-step process section)
- Pinned scrub on desktop; static stack on mobile / reduced motion
- Note: prompt referenced `/about/` but process section lives on homepage — same step copy preserved

### Task 10 — Portfolio before/after
- `ProjectComparisonHero` on `/portfolio/[slug]/` when `beforeImageUrl` + `afterImageUrl` exist
- Keyboard-accessible drag handle (arrow keys ±5%)
- Falls back to single hero image when pair missing

### Task 11 — Motion polish
- `Button` — `whileHover` / `whileTap` (non-`asChild`)
- `Accordion` trigger tap feedback
- Hero stagger, trust bar fade-in, location/service card hovers

## Key files added/changed

**New:** `scripts/snapshot-*.mjs`, `src/lib/motion/presets.ts`, `src/hooks/use-media-query.ts`, `src/components/ui/link.tsx`, `src/components/ui/aceternity/*`, `src/components/ui/liquid-glass-surface.tsx`, `src/components/sections/ServicesBentoGrid.tsx`, `ProcessScroll.tsx`, `LocationTeaserGrid.tsx`, `ProjectComparisonHero.tsx`

**Updated:** `layout.tsx`, `page.tsx`, `Hero.tsx`, `Header.tsx`, `StickyMobileCTA.tsx`, `FinalCTA.tsx`, `ProjectGrid.tsx`, `portfolio/[slug]/page.tsx`, `button.tsx`, `accordion.tsx`, `providers.tsx`, `LenisProvider.tsx`

## Lighthouse (post-upgrade sample)

Homepage production build (`pnpm build && pnpm start --port 3001`):

| Category | Score |
|----------|------:|
| Performance | 70 |
| Accessibility | 95 |
| Best Practices | 96 |
| SEO | 100 |

Dev Turbopack server scores are not representative (Performance ~47). Re-audit remaining sample URLs before launch.

## Frozen layers

No changes to: page copy, metadata, JSON-LD content, routes, `@theme` tokens, section order, forms, or tracking event names.
