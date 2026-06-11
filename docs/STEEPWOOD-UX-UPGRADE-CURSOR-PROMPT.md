# SteepWood — UI/UX Upgrade Cursor Prompt (SEO-Locked)

> **How to use:** Paste the entire block below into Cursor Chat in **Agent** mode on your SteepWood project. Make sure the shadcn MCP is connected first (see `STEEPWOOD-UI-UX-SKILLS-PACK.md`). Cursor will read its rules, then execute the upgrade in tracks, pausing for your approval between each.

---

## THE PROMPT — paste this into Cursor

```
You are upgrading the UI/UX of the SteepWood Next.js project. This is a SURFACE-LEVEL VISUAL UPGRADE ONLY. Read this entire prompt before touching any file.

═══════════════════════════════════════════════════════════════
PART 1 — WHAT MUST NOT CHANGE (THE SEO-LOCKED CORE)
═══════════════════════════════════════════════════════════════

The following layers are FROZEN. You must not modify them. If a UX change would require touching any of them, stop and ask me first.

FROZEN LAYER 1 — Page copy and metadata
- Every <title>, <meta name="description">, OpenGraph tag, Twitter card, canonical URL, hreflang, and robots directive stays exactly as written.
- Every H1, H2, H3, body paragraph, FAQ question, FAQ answer, button label, and microcopy string stays exactly as written.
- Every alt text on every image stays exactly as written.
- Australian English spelling is preserved (colour, centre, organise, specialise, kilometres, enquiry).
- If you need to add a new visual element that requires text, ask me first. Do not invent copy.

FROZEN LAYER 2 — Structured data (JSON-LD)
- Every schema.org block stays byte-identical: LocalBusiness, Organization, WebSite, Service, FAQPage, BreadcrumbList, AggregateRating, CreativeWork, Article, anything else already present.
- @id anchors, areaServed Wikipedia URLs, parentOrganization links, sameAs arrays, geo coordinates — all locked.
- After every commit, run `pnpm exec next-sitemap || true` and then curl one of: home, a service, a location, a combo, a portfolio detail. Diff the JSON-LD against the pre-upgrade snapshot. Zero diff allowed.

FROZEN LAYER 3 — Information architecture
- URL structure stays identical: /, /about, /contact, /quote, /portfolio, /portfolio/[slug], /blog, /blog/[slug], /[service], /locations/[location], /[service]/[location], /privacy, /terms, /australian-consumer-law.
- The 192-page page count stays identical. No new routes, no removed routes.
- sitemap.xml, robots.txt, and the dynamic OG image route stay identical in output.
- Heading hierarchy stays identical (one H1, then H2 → H3, no skipping). Do not promote, demote, or re-order headings.

FROZEN LAYER 4 — Brand colours and typography
- The Tailwind v4 @theme block in app/globals.css stays identical. Do not change a single token: brand colours, neutrals, semantic colours, spacing scale, radius scale, shadow scale.
- The three brand fonts stay identical and loaded the same way: Fraunces (display), General Sans (body), IBM Plex Mono (accents).
- Type scale, line-heights, letter-spacing — all locked.
- Dark mode behaviour stays identical.

FROZEN LAYER 5 — Section order and content blocks on every page
- Every page keeps every section it currently has, in the same order.
- The trust signals, social proof, CTA, FAQ, and breadcrumb positions stay identical.
- The global Header navigation order and Footer column order stay identical.

FROZEN LAYER 6 — Forms and conversion paths
- The 3-step quote form's field names, validation rules, server actions, Resend email templates, and Supabase Storage flow stay identical.
- All phone, email, and CTA targets stay identical (tel:, mailto:, /quote).
- Tracking events (GA4 quote_started, quote_step_completed, quote_submitted, phone_click, email_click, service_card_click, location_card_click) stay identical.

FROZEN LAYER 7 — Accessibility contract
- WCAG 2.2 AA must continue to pass on every modified page.
- Lighthouse Accessibility must stay at 100.
- Every interactive element keeps its current keyboard support, focus ring, aria-label, and screen-reader behaviour.
- prefers-reduced-motion must be honoured by every new animation you add.
- Contrast ratios must not drop below 4.5:1 for body text and 3:1 for large text. If a glass/blur effect would push contrast below threshold, you must darken/lighten the overlay until it passes.

═══════════════════════════════════════════════════════════════
PART 2 — WHAT YOU ARE UPGRADING (THE ALLOWED SURFACE)
═══════════════════════════════════════════════════════════════

You may only modify these layers:

ALLOWED LAYER A — Component rendering technique
- Swap the static rendering of a section for an animated/interactive equivalent that displays THE SAME TEXT AND IMAGES in roughly the same visual position.
- Example: a static <div class="grid"> of service cards becomes a Magic UI BentoGrid that still renders the same 10 cards with the same titles, descriptions, and links.

ALLOWED LAYER B — Motion and transitions
- Add Motion (the npm package "motion", not "framer-motion") for entrance animations, hover states, focus states, tap states, drawer open/close, accordion expand/collapse.
- Add GSAP + ScrollTrigger for pinned scroll sequences and section reveal scrubs.
- Add Lenis for global smooth scroll.
- Add next-view-transitions for cross-route morphing (e.g. service card on homepage → service pillar hero).

ALLOWED LAYER C — Surface effects
- Add liquid-glass-react (with browser-aware CSS fallback) to: sticky mobile CTA bar, desktop nav scrolled-state, floating quote-launcher button, image hover overlays on portfolio.
- Add subtle gradient/blur/shadow surfaces from Aceternity UI (Spotlight, Background Gradient Animation, Lamp) ONLY behind hero areas — never behind body copy.

ALLOWED LAYER D — Interactive components from registries
- Source new interactive components ONLY through the shadcn MCP, from these registries: @magicui, @aceternity, @cult, @kibo, @kokonut.
- Allowed picks: BentoGrid, NumberTicker, AnimatedBeam, Marquee, 3DCard, Spotlight, FamilyButton, ComparisonSlider, ActionSearchBar, GradientButton.
- If a component does not exist in those registries, do not write one from scratch — ask me first.

═══════════════════════════════════════════════════════════════
PART 3 — VERIFICATION GATES (RUN AFTER EVERY TASK)
═══════════════════════════════════════════════════════════════

Before committing any task, you must run and pass these checks. If any fail, fix and re-run before moving on.

GATE 1 — SEO snapshot diff
- Before starting this upgrade, run: `node scripts/snapshot-seo.mjs` (you will create this script as Task 0).
- After each task, run it again. The script must output "ZERO DIFF" for: titles, metas, canonicals, hreflang, OG tags, JSON-LD blocks across 12 sample URLs (home, about, contact, /quote, /portfolio, 2 services, 2 locations, 2 combos, 1 blog).
- Any diff aborts the commit.

GATE 2 — Heading map diff
- Run `node scripts/snapshot-headings.mjs` before and after. The H1/H2/H3 outline for every sampled URL must be byte-identical.

GATE 3 — Lighthouse mobile budgets
- Performance >= 90, Accessibility = 100, Best Practices >= 95, SEO = 100.
- LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- If a Motion or 3D component pushes a route over the JS bundle budget (200 KB gzipped per route), lazy-load it with next/dynamic({ ssr: false }) OR remove it.

GATE 4 — Build and type check
- `pnpm build` succeeds, zero TypeScript errors, zero ESLint errors, zero new console warnings in dev.

GATE 5 — Reduced motion smoke test
- In DevTools, toggle "Reduce motion" on. Reload the page. Every animated component must either skip its entrance animation or collapse to a 0.01s fade. No infinite loops, no parallax, no Lenis smoothing.

GATE 6 — Reader mode smoke test
- Open Safari Reader / Firefox Reader View on the homepage, a service, a location, and a blog post. The full content must extract cleanly. If any section disappears in Reader, the new component is hiding content from semantic HTML — fix the markup.

═══════════════════════════════════════════════════════════════
PART 4 — EXECUTION PLAN (DO IN ORDER, COMMIT AFTER EACH TASK)
═══════════════════════════════════════════════════════════════

Use this exact commit prefix: `ux: <task-id> <message>` — for example `ux: 0.2 add seo snapshot script`.

After EACH task: run all 6 gates, summarise the diff to me, and wait for me to type "next" before starting the next task. Do not batch tasks.

──────────── TASK 0 — Safety net ────────────

0.1 Create branch `ux-upgrade` off main. Do NOT merge to main until I approve.
0.2 Create `scripts/snapshot-seo.mjs` that:
    - Reads a list of 12 URLs from `scripts/seo-sample-urls.json` (you'll seed this file).
    - For each URL, runs `pnpm dev` against it (or static HTML if available) and extracts: <title>, every <meta>, every <link rel="canonical"|"alternate">, every <script type="application/ld+json"> block, every <h1>/<h2>/<h3> text node.
    - Writes `snapshots/seo-pre.json` on first run, `snapshots/seo-post.json` on subsequent runs, diffs them, and exits non-zero on any diff.
0.3 Create `scripts/snapshot-headings.mjs` (same shape, headings only).
0.4 Run both scripts to write the pre-upgrade snapshot.
0.5 Run Lighthouse on home + 1 service + 1 location + 1 combo + 1 blog post and save the results JSON to `snapshots/lighthouse-pre/`.
0.6 Commit: `ux: 0 safety net snapshots and scripts`.

──────────── TASK 1 — Foundation libraries ────────────

1.1 Install: `pnpm add motion gsap @gsap/react lenis liquid-glass-react next-view-transitions`.
1.2 Confirm the shadcn MCP is wired (check `.cursor/mcp.json`) and that `components.json` registers @magicui, @aceternity, @cult, @kibo, @kokonut.
1.3 Create `.cursor/rules/steepwood-ux.mdc` from the rules block in `STEEPWOOD-UI-UX-SKILLS-PACK.md`.
1.4 Run gates 1, 2, 4. (Lighthouse not yet — no UI changes.)
1.5 Commit: `ux: 1 install motion gsap lenis liquid-glass-react and register registries`.

──────────── TASK 2 — Global smooth scroll (Lenis) ────────────

2.1 Create `components/providers/lenis-provider.tsx` as a client component. Initialise with `{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true }`.
2.2 Sync GSAP ticker with Lenis: `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
2.3 Disable Lenis when `prefers-reduced-motion: reduce` matches OR viewport < 768px (use a `useMediaQuery` hook).
2.4 Wrap `{children}` in `app/layout.tsx` with `<LenisProvider>`. Do NOT move any other element. Do NOT touch <head>.
2.5 Run all 6 gates. Especially confirm reader mode still extracts content.
2.6 Commit: `ux: 2 add lenis smooth scroll with reduced-motion and mobile gating`.

──────────── TASK 3 — Page transitions (next-view-transitions) ────────────

3.1 Wrap `{children}` in `app/layout.tsx` with `<ViewTransitions>` from next-view-transitions. Replace every internal `<Link>` in the codebase with the one from next-view-transitions (do NOT touch external links).
3.2 On the homepage service cards, add `style={{ viewTransitionName: 'service-' + slug }}`. On each `/[service]/page.tsx`, add the matching `viewTransitionName` on the hero wrapper.
3.3 Do the same for the location grid → location hub.
3.4 Confirm Firefox falls back gracefully (no animation, instant navigation, no errors).
3.5 Run all 6 gates. JSON-LD must be identical (you only added wrapper attributes, not content).
3.6 Commit: `ux: 3 add view transitions for service and location card morphing`.

──────────── TASK 4 — Magic UI bento grid for services ────────────

4.1 Install: `npx shadcn@latest add @magicui/bento-grid` (via the MCP, not by pasting).
4.2 Replace the homepage services section's static grid with the bento. Each cell renders the SAME service title, description, and link as before. The 4 priority services (custom-kitchen-joinery, built-in-wardrobes, office-fitout, shopfitting) get larger cells.
4.3 The H2 above the grid stays identical. The intro paragraph stays identical. The CTA below stays identical.
4.4 Add Motion `whileHover={{ y: -4 }}` with the locked default spring on each cell.
4.5 Run all 6 gates. Snapshot diff must be ZERO (the H2/H3, link text, and surrounding copy are unchanged; only the visual layout container changed).
4.6 Commit: `ux: 4 magic ui bento for homepage services grid`.

──────────── TASK 5 — Magic UI number tickers for trust stats ────────────

5.1 Install: `npx shadcn@latest add @magicui/number-ticker`.
5.2 In the trust stats row (wherever "200+ projects", "16 locations", "X years" currently render as static numbers), wrap each numeric value in NumberTicker. Use `delay={0.2}` staggered per stat. The label text next to each number stays identical.
5.3 NumberTicker must respect prefers-reduced-motion (jump straight to final value).
5.4 Run all 6 gates.
5.5 Commit: `ux: 5 magic ui number tickers for trust stats`.

──────────── TASK 6 — Aceternity spotlight + animated background on home hero ────────────

6.1 Source Aceternity's `Spotlight` and `BackgroundGradientAnimation` (via MCP if available, else copy the source files into `components/ui/aceternity/`).
6.2 Wrap the homepage hero in `Spotlight` (`className="from-amber-400 via-orange-300 to-transparent"`, intensity tuned so the underlying hero copy keeps a 4.5:1 contrast ratio). The hero H1, subhead, and CTAs stay byte-identical.
6.3 Add `BackgroundGradientAnimation` ONLY behind the final CTA section above the footer. Tune opacity so the section's H2 and paragraph keep 4.5:1 contrast.
6.4 Confirm in DevTools that the hero LCP element is the H1 text (or the hero image if you already had one) — Spotlight must not become the LCP element.
6.5 Run all 6 gates. If Lighthouse Performance drops below 90, reduce the Spotlight blur radius or lazy-mount it.
6.6 Commit: `ux: 6 aceternity spotlight on hero and gradient on final cta`.

──────────── TASK 7 — Aceternity 3D card on portfolio tiles ────────────

7.1 Source `CardContainer` + `CardBody` + `CardItem` from Aceternity.
7.2 On `/portfolio/` index, wrap each project tile. Tilt amplitude capped at `translateZ(20px)` and `rotateX/Y(6deg)` max.
7.3 The project title, location chip, service chip, and `<Link>` stay identical.
7.4 Lazy-mount the 3D card wrapper below the fold.
7.5 Run all 6 gates.
7.6 Commit: `ux: 7 aceternity 3d card on portfolio tiles`.

──────────── TASK 8 — Liquid glass for sticky mobile CTA and scrolled nav ────────────

8.1 Refactor the sticky mobile CTA bar to use `LiquidGlass` from `liquid-glass-react`: `displacementScale={50}`, `blurAmount={0.08}`, `saturation={130}`, `aberrationIntensity={1.5}`, `elasticity={0.2}`, `cornerRadius={32}`, `padding="12px 20px"`.
8.2 Detect Safari/Firefox via `navigator.userAgent` AND feature-detect SVG displacement support. For unsupported browsers, render the same children inside a Tailwind fallback: `bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg rounded-full`.
8.3 The two buttons (Call, Quote) keep their exact labels, hrefs, and aria-labels.
8.4 In the desktop nav, after `window.scrollY > 80`, transition the nav into a centred liquid glass pill containing the same nav links. Above the threshold, render the existing nav as-is.
8.5 Contrast check: the Call and Quote button text must still hit 4.5:1 against the worst-case background behind the glass. If it doesn't, darken the glass tint until it does.
8.6 Run all 6 gates. Pay extra attention to contrast and to Lighthouse mobile (liquid glass is GPU-heavy).
8.7 Commit: `ux: 8 liquid glass sticky mobile cta and scrolled desktop nav`.

──────────── TASK 9 — GSAP ScrollTrigger on About → Process ────────────

9.1 On `/about/`, locate the "Our Process" section (4 steps). Convert it to a pinned ScrollTrigger sequence using `@gsap/react`'s `useGSAP` hook.
9.2 Pin the section while scrolling through it (`pin: true, scrub: 0.5`). Each step's number, title, and description fade in with `y: 40 → 0, opacity: 0 → 1`.
9.3 The text content of every step stays identical. Do not change step numbers, headings, or descriptions.
9.4 Disable the pin and scrub on mobile (< 768px) and on prefers-reduced-motion — render steps as the original static stack.
9.5 Return cleanup from useGSAP to kill all ScrollTriggers on unmount.
9.6 Run all 6 gates. Heading map must be byte-identical.
9.7 Commit: `ux: 9 gsap scrolltrigger pin on about process section`.

──────────── TASK 10 — Kibo UI before/after slider on portfolio detail ────────────

10.1 Install: `npx shadcn@latest add @kibo/comparison`.
10.2 On `/portfolio/[slug]/`, insert the Comparison slider ABOVE the existing project description, in place of (or above) the current hero image. The image alt texts stay identical. The project H1 stays identical. The body description stays identical.
10.3 Drag handle must be keyboard-accessible (left/right arrows move it 5%).
10.4 If a project does not have a before/after pair in the database, render the original single hero image instead — do not break the layout.
10.5 Run all 6 gates.
10.6 Commit: `ux: 10 kibo before/after slider on portfolio detail`.

──────────── TASK 11 — Final pass: motion polish on cards, buttons, FAQ ────────────

11.1 Add Motion `whileHover` and `whileTap` to every Button and Card primitive (one-time touch in components/ui/button.tsx and components/ui/card.tsx) using the locked spring. Existing variants, sizes, and labels stay identical.
11.2 Convert the FAQ accordion's open/close to Motion's AnimatePresence + layout. The question and answer text stay identical. The accordion must still emit the same DOM structure that FAQPage JSON-LD references.
11.3 Run all 6 gates one final time across 12 sample URLs.
11.4 Run a full-site Lighthouse pass on 10 random URLs and confirm budgets.
11.5 Commit: `ux: 11 motion polish on button card faq`.

──────────── TASK 12 — Reconciliation and PR ────────────

12.1 Run scripts/snapshot-seo.mjs and scripts/snapshot-headings.mjs one more time. The post-upgrade snapshot must equal the pre-upgrade snapshot.
12.2 Run Lighthouse on the same 5 URLs from Task 0.5. Save results to `snapshots/lighthouse-post/`. Compare. Performance must be within -2 points of the pre-upgrade score per page. Accessibility must still be 100. SEO must still be 100.
12.3 Generate a markdown changelog at `docs/UX-UPGRADE-CHANGELOG.md` listing every file changed, every component added, and the before/after Lighthouse scores per sampled URL.
12.4 Open a PR titled `UX upgrade — motion, liquid glass, scroll, page transitions (SEO-locked)`. Body of the PR must include:
    - A bullet list of allowed changes made (per Part 2 above).
    - The full output of the final snapshot-seo and snapshot-headings runs (must show ZERO DIFF).
    - The Lighthouse before/after table.
    - A statement: "No frozen layer was modified. All gates passed."
12.5 Do NOT merge. Wait for me to review.

═══════════════════════════════════════════════════════════════
PART 5 — IF SOMETHING WOULD BREAK A FROZEN LAYER
═══════════════════════════════════════════════════════════════

If at any point you find a UX upgrade that would require:
- changing a heading
- changing copy
- changing a JSON-LD field
- changing a URL
- changing a meta tag
- dropping contrast below WCAG AA
- pushing a page below the performance/accessibility/SEO Lighthouse thresholds with no available mitigation

STOP. Do not make the change. Tell me what you wanted to do, why the frozen layer blocks it, and ask whether to skip the task or whether I want to relax the constraint for that specific instance. Default: skip the task.

═══════════════════════════════════════════════════════════════
START NOW
═══════════════════════════════════════════════════════════════

Start with Task 0. Build the snapshot scripts first. Show me the pre-upgrade snapshot output before touching any visible code. Then wait for me to type "next" before starting Task 1.
```

---

## Why this prompt works

1. **Part 1 freezes seven layers** with explicit examples — Cursor cannot drift the SEO surface even by accident.
2. **Part 2 narrowly defines the allowed surface** — only "rendering technique", motion, surface effects, and registry components.
3. **Part 3 makes the SEO contract machine-verifiable** via the two snapshot scripts. If Cursor changes a meta tag, the diff aborts the commit.
4. **Part 4 is sequenced** — safety net first (snapshots before any change), then libraries, then progressively richer surface work, then final reconciliation PR.
5. **Part 5 is an explicit escape hatch** that forces Cursor to ask rather than silently break the SEO layer.

## Optional power-up

If you want even tighter enforcement, add this to `.cursor/rules/steepwood-ux.mdc` after Task 1.3:

```markdown
## SEO lock (alwaysApply: true)
- Never modify <title>, <meta>, <link rel="canonical"|"alternate">, or <script type="application/ld+json"> blocks in this codebase as part of a UX task. If a UX change requires touching them, abort and ask the user.
- Never modify the text of any H1, H2, H3, paragraph, FAQ question, FAQ answer, button label, image alt, or aria-label in this codebase as part of a UX task.
- Never modify route file paths or add/remove pages as part of a UX task.
- Never change Tailwind @theme tokens in app/globals.css as part of a UX task.
- If you must add a new visual component that itself contains text, use existing copy from the page's content kit — do not invent new copy.
```

Cursor will refuse SEO-touching edits during UX tasks even if you forget to remind it.
