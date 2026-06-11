# Core Web Vitals audit log (Phase 4 Task 5.1)

> Lighthouse scores on production/preview are verified in **`STEEPWOOD-MANUAL-OPS.md` §8**. This table tracks the code optimisations applied in Phase 4.

## Code optimisations applied

| Area | Change |
|---|---|
| LCP | Homepage hero uses `priority` + `fetchPriority="high"` + `sizes`; `react-dom` preload on `/` |
| LCP | Service, location, combo, blog, portfolio heroes use `priority` / `sizes` where applicable |
| CLS | Images use explicit dimensions or `fill` inside aspect-ratio containers |
| CLS | Testimonials section uses `Suspense` + skeleton fallback |
| RUM | `@vercel/speed-insights` wired in root layout |

## Lighthouse sample (fill in after manual run)

| URL | Mobile Perf | Desktop Perf | LCP element | Notes |
|---|---|---|---|---|
| `/` | _pending_ | _pending_ | Hero image | |
| `/custom-kitchen-joinery/` | _pending_ | _pending_ | Service hero | |
| `/locations/newcastle/` | _pending_ | _pending_ | Location hero | |
| `/custom-kitchen-joinery/newcastle/` | _pending_ | _pending_ | Combo hero | |
| `/blog/{sample-slug}/` | _pending_ | _pending_ | Cover image | |
