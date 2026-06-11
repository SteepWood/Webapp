# SteepWood — Premium UI/UX Skills Pack for Cursor

A curated, opinionated stack of the best open-source UI/UX libraries on GitHub to layer Framer-style motion, Apple-inspired liquid glass, and premium interactive components onto the SteepWood Next.js build. Every recommendation includes the GitHub repo, what it does, why it matters for SteepWood specifically, install commands, and the exact Cursor prompt to use it.

---

## How this pack works (read first)

**1. Cursor talks to component libraries through the shadcn MCP server.**
Instead of asking Cursor to "write me a fancy bento grid" (where it hallucinates props and breaks), you connect Cursor to one or more component registries via the [shadcn MCP](https://ui.shadcn.com/docs/mcp), then ask it to install real, working components from those registries by name.

**2. Install the shadcn MCP in Cursor once.**
Open Cursor → `Cmd/Ctrl + Shift + P` → "Cursor Settings" → `MCP` tab → `Add new global MCP server`, then paste:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@canary", "registry:mcp"]
    }
  }
}
```

Restart Cursor. You'll see a green dot next to `shadcn` in the MCP panel and a list of tools (`search_items`, `get_item`, `get_install_command`, `add_item`). From now on you can ask Cursor things like "Install the hero-pill component from Magic UI" and it will actually do it correctly ([Shadcn MCP docs](https://ui.shadcn.com/docs/mcp)).

**3. Tell Cursor which registries are allowed.**
Create `components.json` in your project root if shadcn init hasn't already, then add the registries you want from the list below. Example:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": { "css": "app/globals.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "utils": "@/lib/utils" },
  "registries": {
    "@magicui": "https://magicui.design/r/{name}.json",
    "@aceternity": "https://ui.aceternity.com/registry/{name}.json",
    "@cult": "https://www.cult-ui.com/r/{name}.json",
    "@kibo": "https://www.kibo-ui.com/r/{name}.json",
    "@kokonut": "https://kokonutui.com/r/{name}.json"
  }
}
```

Then Cursor can install with: `npx shadcn@latest add @magicui/animated-beam` (or it does it for you via MCP).

---

## The recommended stack for SteepWood

| Layer | Library | Use it for |
|---|---|---|
| **Motion engine** | Motion (formerly Framer Motion) | All interactive component animations |
| **Scroll engine** | GSAP + ScrollTrigger | Section reveals, pinning, hero parallax |
| **Smooth scroll** | Lenis | Premium scroll feel across the site |
| **Animated component registry** | Magic UI | Bento grids, marquee, animated beams, number tickers |
| **Premium hero/section components** | Aceternity UI | Background gradients, spotlight cards, 3D card flip, lamp |
| **Liquid glass** | liquid-glass-react | Navigation, sticky CTA, modal cards |
| **Bento + AI-style cards** | Cult UI | Bento components, family-style buttons |
| **Niche components** | Kibo UI | Stories, reels, comparison sliders, mini-calendars |
| **Subtle interactive blocks** | Kokonut UI | Hover cards, action search bars, badges |
| **3D (optional, sparingly)** | React Three Fiber + Drei | One hero showpiece on `/`, nothing more |
| **Page transitions** | next-view-transitions | App-router page transitions in Next 15 |
| **Cursor rules** | Custom `.cursor/rules/steepwood-ux.mdc` | Locks the motion grammar so Cursor stays on-brand |

---

## 1. Motion engine — `motiondivision/motion`

**Repo:** [github.com/motiondivision/motion](https://github.com/motiondivision/motion) — formerly known as `framer-motion`, this is the de-facto premium animation library for React. Maintained by the original Framer Motion author.

**Why for SteepWood:** Every micro-interaction (button hover, card tilt, drawer slide, FAQ accordion, sticky CTA reveal) should run through Motion. It composes cleanly with Tailwind, supports Next 15 server components via the new `motion/react` and `motion/react-client` split, and supports the View Transitions API for cross-route animations ([Motion docs](https://motion.dev)).

**Install:**
```bash
pnpm add motion
```

**Cursor prompt to use:**
> Add Motion animations to the homepage hero. Stagger the headline, subhead, and CTA buttons with a `mass: 0.5, stiffness: 100, damping: 14` spring. Use `motion/react-client` (not the deprecated `framer-motion` import). On the service cards, add `whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}` and respect `prefers-reduced-motion`.

---

## 2. Scroll engine — `greensock/gsap`

**Repo:** [github.com/greensock/GSAP](https://github.com/greensock/GSAP) — **now 100% free for commercial use as of April 2025**, including all formerly Club-only plugins (ScrollTrigger, ScrollSmoother, SplitText, MorphSVG, DrawSVG, Inertia) ([Noqode](https://www.noqode.fr/en/outils/gsap)).

**Why for SteepWood:** Motion is best for component-level animations; GSAP is best for timeline-based, scroll-driven sequences. Use ScrollTrigger to pin the "Our Process" section while the steps animate in, to fade and reveal the "Recent Projects" grid, and to drive the parallax on the location hero images. ScrollTrigger is what gives high-end agency sites their cinematic feel.

**Install:**
```bash
pnpm add gsap @gsap/react
```

**Cursor prompt to use:**
> On `/about/`, add a pinned section using GSAP ScrollTrigger and `@gsap/react`'s `useGSAP` hook. The "Our Process" section should pin for the duration of scrolling through 4 steps, and each step's number, title, and description should fade in with `y: 40 → 0` over `scrub: 0.5`. Kill the trigger on cleanup. Do not use the deprecated CDN import — use the npm package.

---

## 3. Smooth scroll — `darkroomengineering/lenis`

**Repo:** [github.com/darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) — the smooth-scroll library used by Studio Freight, Awwwards winners, and most Framer-templated sites. Composes cleanly with GSAP ScrollTrigger.

**Why for SteepWood:** Joinery is a tactile, considered craft. Default browser scroll feels cheap next to a Lenis-eased scroll. One install, one provider, the entire site feels more premium.

**Install:**
```bash
pnpm add lenis
```

**Cursor prompt to use:**
> Wrap the app in a `<LenisProvider>` client component in `app/layout.tsx`. Initialise Lenis with `duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`. Sync it with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(time => lenis.raf(time * 1000))`. Disable Lenis when `prefers-reduced-motion` is set or the viewport is below 768px.

---

## 4. Animated component registry — Magic UI

**Repo:** [github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui) — 150+ animated, Motion-powered shadcn-compatible components. Bento grids, animated beams, marquees, number tickers, animated lists.

**Why for SteepWood:**
- **Animated Beam** — visualise the design → build → install process on the homepage and on `/about/`.
- **Number Ticker** — animate "200+ projects delivered", "16 locations served" trust stats.
- **Bento Grid** — show the 10 services as an animated bento layout instead of a flat grid.
- **Marquee** — scrolling row of testimonial logos / "as seen in" press mentions.

**Install (after shadcn MCP is wired):**
```bash
npx shadcn@latest add @magicui/animated-beam @magicui/number-ticker @magicui/bento-grid @magicui/marquee
```

**Cursor prompt to use:**
> Replace the static services grid on the homepage with the Magic UI `bento-grid` component. Show our 10 services with the 4 most-converting (kitchens, wardrobes, office fitout, shopfitting) as larger cells. Each cell gets a `motion` hover-lift. Pull copy from Section 9.4 of the master build doc. Then replace the trust stats row with three `number-ticker` instances animating 0 → 200, 0 → 16, 0 → 25 with `duration: 2.5`.

---

## 5. Premium hero and section blocks — Aceternity UI

**Repo:** [github.com/aceternity-ui/ui](https://ui.aceternity.com/components) — 70+ Tailwind + Motion components specifically tuned for SaaS-grade hero sections, including 3D card effects, spotlight cards, background-gradient animations, lamp effect, sparkles, vortex.

**Why for SteepWood:**
- **3D Card Effect** — apply to portfolio project cards so they tilt on cursor.
- **Spotlight** — radial light following cursor on the homepage hero behind the headline.
- **Background Gradient Animation** — subtle animated mesh behind the CTA section to lift it above the rest of the page.
- **Lamp Effect** — dramatic header on `/contact/` so the form feels destination-worthy.

**Install pattern (Aceternity components are usually copy-paste, occasionally via MCP):**
```bash
# Either via shadcn registry once wired:
npx shadcn@latest add @aceternity/3d-card
# Or copy from https://ui.aceternity.com/components
```

**Cursor prompt to use:**
> On the homepage, wrap the hero copy in Aceternity's `Spotlight` component with `className="from-amber-400 via-orange-300 to-transparent"`. On `/portfolio/`, wrap each project tile in Aceternity's `CardContainer` + `CardBody` + `CardItem` (3D card effect) so they tilt on cursor. Keep tilt amplitude low — `translateZ(20px)` max — this is joinery, not Web3.

---

## 6. Liquid glass — `rdev/liquid-glass-react`

**Repo:** [github.com/rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) — Apple's iOS 26 / macOS Tahoe liquid glass effect for React. Real SVG displacement maps, chromatic aberration, configurable elasticity. **Not just a `backdrop-blur` trick** — it's the proper refracted-edge effect.

**Why for SteepWood:**
- The sticky **mobile CTA bar** becomes a floating liquid glass capsule.
- The desktop nav, once scrolled past the hero, transitions into a liquid glass pill.
- The "Get a Quote" modal trigger floats as a liquid glass button.
- Image hover overlays on the portfolio gallery use it.

**Caveat:** Safari and Firefox only partially render the displacement (still degrades gracefully — it falls back to a frosted glass look). On mobile Safari, it's worth feature-detecting and falling back to a CSS `backdrop-filter: blur()` panel.

**Install:**
```bash
pnpm add liquid-glass-react
```

**Cursor prompt to use:**
> Convert the sticky mobile CTA bar into a liquid glass capsule using `liquid-glass-react`. Props: `displacementScale={50}`, `blurAmount={0.08}`, `saturation={130}`, `aberrationIntensity={1.5}`, `elasticity={0.2}`, `cornerRadius={32}`, `padding="12px 20px"`. Wrap both the Call and Quote buttons. Detect Safari and Firefox via `navigator.userAgent` — for those, swap to a Tailwind fallback: `bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg`.

**Alternative (more compatible across browsers):** [`albedim/apple-web-liquid-glass-demo`](https://github.com/albedim/apple-web-liquid-glass-demo) — pure SVG + Tailwind, works in all evergreen browsers, slightly less photoreal but more reliable for production.

---

## 7. Bento and AI-style cards — Cult UI

**Repo:** [github.com/nolly-studio/cult-ui](https://www.cult-ui.com) — beautifully designed, Motion-powered shadcn extensions. Their `Bento` and `Family Button` (think: macOS Dock-style expanding action button) are especially good for premium landing pages.

**Why for SteepWood:**
- The "Why SteepWood" section becomes a `Family Button` that expands to show all 5 USPs on click.
- The locations grid on the homepage becomes a `Bento` with Newcastle (HQ) as the hero cell.

**Install:**
```bash
npx shadcn@latest add @cult/bento @cult/family-button
```

**Cursor prompt to use:**
> Replace the static 16-location grid on the homepage with Cult UI's `Bento` layout. Newcastle is the 2x2 hero cell (with a small "HQ" badge). Sydney, Canberra, Melbourne are 2x1 cells. The other 12 are 1x1 cells. Each cell links to `/locations/[slug]/` and uses Motion's `layoutId` for the cell-to-page transition.

---

## 8. Niche components — Kibo UI

**Repo:** [github.com/haydenbleasel/kibo](https://www.kibo-ui.com) — a curated registry of components shadcn/ui doesn't have. Includes a `Comparison` slider (before/after image drag), `Reels` (vertical scroll stories), `MiniCalendar`, and more. Ships with built-in MCP support so Cursor finds these by name.

**Why for SteepWood:**
- **Comparison slider** — before/after for every renovation project on `/portfolio/[slug]/`. Joinery is the perfect use case.
- **Reels** — Instagram-style vertical scroll of recent installs on the homepage on mobile.
- **Mini Calendar** — appointment-style booking slot picker in the quote form's Step 3.

**Install:**
```bash
npx shadcn@latest add @kibo/comparison @kibo/reels @kibo/mini-calendar
```

**Cursor prompt to use:**
> On every `/portfolio/[slug]/` page, add Kibo UI's `Comparison` slider above the project description. Left image = "before", right image = "after". Touch-drag on mobile, mouse-drag on desktop. Cache images via `next/image` with `priority={false}` and `loading="lazy"`.

---

## 9. Subtle interactive blocks — Kokonut UI

**Repo:** [github.com/kokonut-labs/kokonutui](https://kokonutui.com) — 100+ open source components, all Motion-based, with focus on the small premium touches: animated badges, action search bars, hover cards, gradient buttons.

**Why for SteepWood:** Polish layer. Use it for:
- The "search by service or location" input on the homepage (their `ActionSearchBar`).
- Sparkle / glow on the primary CTA button.
- Animated trust badges in the footer credentials row.

**Install:**
```bash
npx shadcn@latest add @kokonut/action-search-bar @kokonut/gradient-button
```

---

## 10. 3D (optional, one hero showpiece only) — React Three Fiber + Drei

**Repos:** [github.com/pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) + [github.com/pmndrs/drei](https://github.com/pmndrs/drei) — the canonical React 3D stack.

**Why for SteepWood (with caution):** Joinery is craft, not crypto. If you do 3D, do it in exactly one place. The strongest candidate: an interactive 3D model of a custom kitchen island on the `/custom-kitchen-joinery/` pillar page, with materials the visitor can swap (oak vs walnut vs marble top). Everywhere else, 3D will damage trust and performance.

**Install:**
```bash
pnpm add three @react-three/fiber @react-three/drei
pnpm add -D @types/three
```

**Cursor prompt to use:**
> On `/custom-kitchen-joinery/` only, add a React Three Fiber canvas above the FAQ section with a low-poly kitchen island model (provided at `/models/island.glb`). Allow visitors to click 3 material chips (Oak, Walnut, Marble) to swap the island's materials using Drei's `useGLTF` and `useTexture`. Lock the camera with `OrbitControls` (no pan, no zoom out, 45° elevation max). Lazy-load this entire component with `next/dynamic({ ssr: false })`. Skip on mobile (`useMediaQuery`).

---

## 11. Page transitions — `shuding/next-view-transitions`

**Repo:** [github.com/shuding/next-view-transitions](https://github.com/shuding/next-view-transitions) — wraps the View Transitions API for Next.js App Router. The cleanest way to get cross-route morphing in Next 15.

**Why for SteepWood:** Clicking a service card on `/` morphs the card into the `/[service]/` hero. Clicking a location chip in the footer morphs to `/locations/[location]/`. That's the kind of detail that signals "this site costs $50k", not "this site is a template".

**Install:**
```bash
pnpm add next-view-transitions
```

**Cursor prompt to use:**
> Wrap `app/layout.tsx`'s children in `<ViewTransitions>` from `next-view-transitions`. Replace every internal `<Link>` with their `<Link>`. On the homepage service cards, add `style={{ viewTransitionName: 'service-' + service.slug }}` and matching `viewTransitionName` on the service pillar page's hero. Fallback gracefully for Firefox.

---

## The Cursor rules file — lock the motion grammar

Save this as `.cursor/rules/steepwood-ux.mdc` so Cursor follows it on every UI request without you re-explaining.

```markdown
---
description: SteepWood motion and interaction grammar — applied to all UI work
alwaysApply: true
---

# SteepWood UX rules

## Motion grammar (locked)
- All animations use `motion` (the renamed framer-motion). Never import from `framer-motion` — that package is deprecated.
- Default spring: `{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }`.
- Default tween for opacity/colour: `{ duration: 0.25, ease: [0.2, 0.0, 0, 1] }`.
- Stagger children with `staggerChildren: 0.06`.
- Every interactive element with hover state has a `whileHover` and `whileTap`.
- Every animated element respects `prefers-reduced-motion: reduce` via `useReducedMotion()`.

## Scroll grammar (locked)
- Lenis runs at the layout level. Never duplicate scroll listeners — sync GSAP ScrollTrigger to Lenis with `lenis.on('scroll', ScrollTrigger.update)`.
- Disable Lenis on `prefers-reduced-motion` AND below 768px viewport.
- GSAP scroll animations use `useGSAP` from `@gsap/react`, not raw `useEffect`. Always return cleanup.

## Liquid glass usage (locked)
- Liquid glass (`liquid-glass-react`) is reserved for: sticky mobile CTA, scrolled-state desktop nav, "Get a Quote" floating trigger, image hover overlays on portfolio.
- Never use liquid glass on body text, form inputs, or anywhere it would hurt readability.
- Always provide a CSS-fallback variant for Safari and Firefox (feature-detect via `CSS.supports('backdrop-filter', 'blur(1px)')` and user-agent).

## Component sourcing (locked)
- Before writing a new animated component from scratch, search shadcn MCP for an existing one in @magicui, @aceternity, @cult, @kibo, @kokonut.
- If a component exists in a registry, install it via `npx shadcn@latest add @<registry>/<name>` — do not paste the source manually.
- Customise installed components in `components/ui/`, never in `node_modules`.

## Accessibility (locked)
- All hover-only interactions must have a keyboard equivalent.
- All decorative motion must pause/skip under `prefers-reduced-motion`.
- Liquid glass blur must not drop text contrast below WCAG AA (4.5:1).

## Performance (locked)
- Heavy components (3D canvas, large Motion compositions) lazy-load via `next/dynamic({ ssr: false })`.
- Aceternity / Magic UI hero blocks load above the fold; everything else below the fold is `loading="lazy"`.
- Per-page JS bundle ≤ 200 KB gzipped — if a Motion-heavy component pushes a route over budget, split it.
```

Tell Cursor: `Please save the rules above to .cursor/rules/steepwood-ux.mdc and follow them on every UI change from here on.`

---

## Three suggested ways to roll this out

You don't need everything at once. Pick a track based on time and risk appetite.

### Track A — Minimum premium polish (1 day)
1. Install Motion + Lenis + the shadcn MCP.
2. Add Magic UI bento grid for services and number tickers for trust stats.
3. Add `next-view-transitions` for service card → service page morphing.
4. Add the Cursor rules file.

**Outcome:** site feels noticeably more premium without any risk to the SEO build.

### Track B — Full motion + liquid glass (2–3 days)
Everything in Track A, plus:
5. Aceternity 3D card on portfolio + Spotlight on homepage.
6. Liquid glass on sticky mobile CTA + scrolled nav.
7. GSAP ScrollTrigger on About → Process and Home → Locations.
8. Cult UI Family Button for "Why SteepWood".

**Outcome:** site is in the top 5% of joinery sites globally.

### Track C — Full premium (3–5 days)
Everything in Track A and B, plus:
9. Kibo UI before/after slider on every portfolio detail page.
10. Kokonut UI action search bar on the homepage.
11. R3F + Drei interactive kitchen island on the kitchens pillar page (one place only).
12. Custom liquid glass quote-launcher floating button.

**Outcome:** awwwards-tier site — at the cost of more performance hardening work in Phase 4.

---

## A single Cursor kickoff prompt you can paste right now

```
We're upgrading the SteepWood site's UI/UX. Read /home/user/workspace/STEEPWOOD-UI-UX-SKILLS-PACK.md first. Then:

1. Install the shadcn MCP in our project's components.json with @magicui, @aceternity, @cult, @kibo, @kokonut registries.
2. Save the Cursor rules block from the pack to .cursor/rules/steepwood-ux.mdc.
3. Install motion, lenis, gsap, @gsap/react, liquid-glass-react, next-view-transitions.
4. Execute Track A from the pack in order, committing after each step with messages like "ux: track-a step 1 lenis provider".
5. After Track A is done, stop and show me a localhost preview before starting Track B.
```

---

## Coverage check — does this conflict with the 4-phase build?

No. This pack is purely additive:
- **Phase 1** (Foundation) — install the libraries listed in Tracks A/B/C and save the Cursor rules. No page content yet.
- **Phase 2** (Core Pages) — when building each page from the SEO Content Kit, use the Magic UI / Aceternity / Cult components as the *visual implementation* of the sections the kit describes. The copy stays locked; only the rendering technique upgrades.
- **Phase 3** (Lead Gen) — liquid glass on the floating quote launcher; Kibo UI before/after on portfolio; Kokonut action search in the admin shell.
- **Phase 4** (Launch) — the performance hardening step is where you verify each motion / glass / 3D addition still hits the LCP ≤ 2.5s and INP ≤ 200ms budgets.

The locked acceptance criteria in each phase file (especially Phase 4's Lighthouse and Core Web Vitals gates) are what keep this from going overboard. If a component breaks budget, you cut it.
