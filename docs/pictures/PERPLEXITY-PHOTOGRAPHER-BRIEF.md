# SteepWood — Perplexity Computer Photographer Brief

**Role:** You are SteepWood’s in-house architectural photographer. Generate every image the marketing website needs, save them into this folder tree, and follow the naming rules exactly so a developer can deploy them without guesswork.

**Output root (mandatory):**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\
```

Create subfolders as listed below. You may add new subfolders if a shoot category needs splitting (e.g. `04-portfolio/hamptons-kitchen-newcastle/`).

---

## Master prompt (apply to every image)

Use this as the global style anchor. Prepend it to every individual prompt below.

> Photorealistic editorial photograph for a premium Australian custom joinery brand called **SteepWood**, based in **Newcastle NSW**. Warm natural light, shallow depth of field where appropriate, true-to-life colours. Dominant materials: **American oak, walnut, Tasmanian oak, Spotted Gum**, 2-pac painted shaker profiles, **Caesarstone** benchtops, **Blum** soft-close hardware. Interiors feel high-end but lived-in — Australian residential or commercial, not European luxury hotel. Colour palette harmony: warm ink browns (#1f1610–#453528), natural oak (#8b6b47), linen paper tones (#f7f1e8). No watermarks, no logos unless specified, no visible faces of real celebrities, no text overlays burned into the image (OG crops excepted). No fisheye distortion. Shot on a full-frame camera, 35mm or 50mm equivalent. **Australian English context** — power points, tapware, and proportions should feel Australian.

---

## Naming convention

Every file MUST follow this pattern:

```
{category}-{slug}-{variant}.{ext}
```

| Part | Values | Example |
|------|--------|---------|
| `category` | `workshop`, `service`, `location`, `project`, `team`, `og`, `blog`, `materials` | `service-custom-kitchen-joinery-hero.jpg` |
| `slug` | kebab-case matching webapp slugs (see manifest) | `location-newcastle-hero.jpg` |
| `variant` | `hero`, `after`, `before`, `g01`–`g08`, `portrait`, `1200x630`, `materials` | `project-hamptons-kitchen-newcastle-g03.jpg` |
| `ext` | `.jpg` preferred (`.webp` acceptable) | — |

**Rules**
- All lowercase, hyphens only, no spaces.
- Portfolio gallery shots: `g01`, `g02`, … ordered wide → detail → internal storage.
- Before/after pairs for the same project MUST share identical aspect ratio and framing axis (same room corner, same crop box).
- Export at **2×** the target display size minimum (see specs table).

---

## Technical specs

| Use on site | Export size | Aspect | Format | Notes |
|-------------|-------------|--------|--------|-------|
| Page hero / MediaFrame | **1600 × 1000 px** | 16:10 | JPG, quality 85+ | Safe zone: keep subject centred; edges may crop on mobile |
| Workshop gallery thumb | **1600 × 1200 px** | 4:3 | JPG | Also used in lightbox |
| Service/location cards (homepage bento) | **800 × 600 px** min | 4:3 | JPG | Can be centre-cropped from hero |
| Portfolio hero / featured grid | **1600 × 1000 px** | 16:10 | JPG | `after` image is primary |
| Before/after slider | **1600 × 1000 px** | 16:10 | JPG | **Identical dimensions** for before + after |
| Gallery masonry | **1200 × 800 px** | 3:2 | JPG | Portrait OK for tall joinery |
| Team portrait | **800 × 800 px** | 1:1 | JPG | Head and shoulders, consistent lighting across set |
| OG / social / schema default | **1200 × 630 px** | 1.91:1 | JPG | Leave **lower 35%** slightly darker/uncluttered for text overlay |
| Blog cover | **1600 × 1000 px** | 16:10 | JPG | Topic-specific, not generic workshop |

---

## Folder structure

Organise generated files like this:

```
docs/pictures/
├── PERPLEXITY-PHOTOGRAPHER-BRIEF.md    ← this file
├── manifest.json                       ← machine-readable deploy map
├── 01-workshop/
├── 02-services/
├── 03-locations/
├── 04-portfolio/
├── 05-team/
├── 06-og-social/
├── 07-materials/
└── 08-blog/
```

---

## Priority tiers

| Tier | Scope | Count |
|------|-------|------:|
| **P0 — Launch** | Workshop hero, 6 workshop gallery, site OG default, 3 portfolio projects (before/after + galleries) | ~25 |
| **P1 — SEO pages** | 10 service heroes, 16 location heroes | 26 |
| **P2 — Polish** | Team portraits (4), materials shot, blog covers, per-route OG crops | 10+ |

Complete **P0 first**, then P1, then P2.

---

# P0 — Launch images

## 01-workshop/

### `workshop-hero-main.jpg`
**Deploy to:** `public/images/workshop-hero-main.jpg` → wired as site-wide hero replacing `hero-workshop.svg`

**Prompt:**
> [Master prompt] Wide establishing shot inside a modern Australian joinery workshop in Newcastle. Clean but working bench, timber panels stacked vertically, CNC router visible in soft background, warm afternoon light through high windows. One craftsperson in work shirt (back or partial profile, not identifiable) checking a cabinet carcass. Atmosphere: precision, craft, scale. 16:10 landscape. No brand signage.

**Used on:** Homepage hero, About hero, all service/location/combo page heroes until service-specific images are wired.

---

### Workshop gallery (6 images — each distinct)

| Filename | Caption on site | Deploy path (suggested) |
|----------|-----------------|-------------------------|
| `workshop-assembly-bench.jpg` | Assembly bench | `public/images/workshop/assembly-bench.jpg` |
| `workshop-panel-processing.jpg` | Panel processing | `public/images/workshop/panel-processing.jpg` |
| `workshop-hand-finishing.jpg` | Hand finishing | `public/images/workshop/hand-finishing.jpg` |
| `workshop-timber-storage.jpg` | Timber storage | `public/images/workshop/timber-storage.jpg` |
| `workshop-quality-inspection.jpg` | Quality inspection | `public/images/workshop/quality-inspection.jpg` |
| `workshop-dispatch-prep.jpg` | Dispatch and install prep | `public/images/workshop/dispatch-prep.jpg` |

**Shared specs:** 1600 × 1200 px (4:3).

**Prompts:**

1. **assembly-bench** — [Master prompt] Close-medium shot of a solid timber assembly bench with cabinet components, clamps, and pencil layout lines. Hand tools visible. Warm workshop lighting.

2. **panel-processing** — [Master prompt] CNC flatbed or panel saw processing melamine/MDF sheets. Safety glasses on machine, dust extraction hose, industrial but clean Newcastle workshop.

3. **hand-finishing** — [Master prompt] Craftsman hand-sanding a 2-pac painted shaker drawer front on a trestle. Fine dust, tack cloth, premium finish focus. Shallow depth of field on drawer profile.

4. **timber-storage** — [Master prompt] Vertical timber storage racks: American oak and walnut boards with visible grain labels. Organised warehouse aisle in joinery workshop.

5. **quality-inspection** — [Master prompt] Joiner inspecting door alignment with a straight edge and feeler gauge on a nearly complete kitchen run. Critical, meticulous mood.

6. **dispatch-prep** — [Master prompt] Flat-pack cabinetry wrapped in blankets on A-frame trolleys, install kit boxes labelled by room. Ready for NSW delivery. Workshop loading bay.

---

## 06-og-social/

### `og-site-default.jpg`
**Deploy to:** `public/og-default.jpg`

**Prompt:**
> [Master prompt] 1200×630 social share image. Hero workshop or completed kitchen vignette filling frame. **Lower third** subtly darker (natural shadow, not graphic overlay) to allow white headline text. Premium, trustworthy, Australian joinery. No text in image.

**Used in:** Google LocalBusiness structured data (`/og-default.jpg`).

---

## 04-portfolio/

Three seed projects — each needs **after** (hero), **before**, and **5 gallery** images minimum.

### Project A — `hamptons-kitchen-newcastle`

| File | Variant |
|------|---------|
| `project-hamptons-kitchen-newcastle-after.jpg` | Completed kitchen hero |
| `project-hamptons-kitchen-newcastle-before.jpg` | Same angle, pre-renovation |
| `project-hamptons-kitchen-newcastle-g01.jpg` | Wide room shot |
| `project-hamptons-kitchen-newcastle-g02.jpg` | Shaker island detail |
| `project-hamptons-kitchen-newcastle-g03.jpg` | Butler's pantry internals |
| `project-hamptons-kitchen-newcastle-g04.jpg` | Caesarstone + undermount sink |
| `project-hamptons-kitchen-newcastle-g05.jpg` | Integrated appliance wall |

**After prompt:**
> [Master prompt] Completed Hamptons-style kitchen in a Newcastle coastal home. White 2-pac shaker cabinets, Caesarstone benchtop, brass cup handles, integrated fridge column, butler's pantry open door hint. Bright coastal daylight, ocean-neutral palette.

**Before prompt:**
> Same room corner and crop as after image. Dated 1990s laminate kitchen, mismatched cabinets, poor lighting — clearly pre-renovation. 16:10, identical framing to after.

**Gallery:** Detail shots of joinery quality — drawer internals with Blum soft-close, shaker profile, pantry shelving.

**Deploy:** CMS portfolio slug `hamptons-kitchen-newcastle` — developer uploads to Supabase `cms-media` or sets seed paths.

---

### Project B — `walk-in-robe-sydney`

| File | Notes |
|------|-------|
| `project-walk-in-robe-sydney-after.jpg` | Hero — American oak veneer, LED strips |
| `project-walk-in-robe-sydney-before.jpg` | Same wardrobe cavity, bare drywall / single rod |
| `project-walk-in-robe-sydney-g01.jpg` | Full walk-in wide |
| `project-walk-in-robe-sydney-g02.jpg` | Island bench with jewellery drawers |
| `project-walk-in-robe-sydney-g03.jpg` | Full-height mirror panel |
| `project-walk-in-robe-sydney-g04.jpg` | Soft-close drawer stack |
| `project-walk-in-robe-sydney-g05.jpg` | LED-lit hanging section |

**After prompt:**
> [Master prompt] Luxury walk-in robe in a Sydney apartment or North Shore home. American oak veneer, integrated LED strip lighting, centre island with soft-close drawers, full-height mirror. Warm, boutique hotel dressing room feel.

---

### Project C — `floating-vanity-byron-bay`

| File | Notes |
|------|-------|
| `project-floating-vanity-byron-bay-after.jpg` | Hero — floating HMR vanity |
| `project-floating-vanity-byron-bay-before.jpg` | Same bathroom wall, old vanity |
| `project-floating-vanity-byron-bay-g01.jpg` | Wide bathroom |
| `project-floating-vanity-byron-bay-g02.jpg` | Timber veneer drawer detail |
| `project-floating-vanity-byron-bay-g03.jpg` | Integrated basin + tapware |
| `project-floating-vanity-byron-bay-g04.jpg` | Concealed storage side |
| `project-floating-vanity-byron-bay-g05.jpg` | Moisture-resistant cabinet back |

**After prompt:**
> [Master prompt] Floating bathroom vanity in a Byron Bay coastal home. Moisture-resistant white cabinet, timber veneer drawer fronts, wall-hung with visible floor gap, large frameless mirror, natural coastal light, plants soft blur in background.

---

# P1 — Service hero images

Save all to `02-services/`. Each deploys to `public/images/services/{slug}-hero.jpg`.

| Filename | Deploy path | Subject prompt (add [Master prompt] prefix) |
|----------|-------------|---------------------------------------------|
| `service-custom-kitchen-joinery-hero.jpg` | `/images/services/custom-kitchen-joinery-hero.jpg` | Hamptons shaker kitchen, island, Caesarstone, integrated appliances. Hero angle from dining side. |
| `service-built-in-wardrobes-hero.jpg` | `/images/services/built-in-wardrobes-hero.jpg` | Floor-to-ceiling built-in wardrobe, sliding or hinged, neutral bedroom, soft textiles blur. |
| `service-office-fitout-hero.jpg` | `/images/services/office-fitout-hero.jpg` | Modern Australian office reception + breakout joinery, timber slats, quiet corporate palette. |
| `service-shopfitting-hero.jpg` | `/images/services/shopfitting-hero.jpg` | Boutique retail interior — display shelving, cash desk joinery, warm spot lighting. |
| `service-custom-bathroom-vanity-hero.jpg` | `/images/services/custom-bathroom-vanity-hero.jpg` | Double vanity, stone top, timber drawers, premium bathroom. |
| `service-commercial-joinery-hero.jpg` | `/images/services/commercial-joinery-hero.jpg` | Hospitality bar or café joinery — durable laminates, service counter. |
| `service-custom-furniture-hero.jpg` | `/images/services/custom-furniture-hero.jpg` | Bespoke dining table in Tasmanian oak + matching sideboard, residential dining room. |
| `service-home-office-joinery-hero.jpg` | `/images/services/home-office-joinery-hero.jpg` | Built-in home office desk, overhead cabinets, cable management, residential study. |
| `service-laundry-cabinets-hero.jpg` | `/images/services/laundry-cabinets-hero.jpg` | Australian laundry room — tall broom cupboard, bench over washer, clean utility aesthetic. |
| `service-staircase-joinery-hero.jpg` | `/images/services/staircase-joinery-hero.jpg` | American oak staircase, open tread or closed stringer, handrail detail, double-height void. |

**Optional OG crops** (same subject, 1200×630, lower third dark): save to `06-og-social/` as `og-service-{slug}.jpg` → deploy to `public/og/services/{slug}-og.jpg`.

---

# P1 — Location hero images

Save all to `03-locations/`. Each deploys to `public/images/locations/{slug}-hero.jpg`.

**Composition rule:** 70% premium joinery interior + 30% subtle regional cue (view through window, local architecture texture, landscape hint). Do NOT use clichéd skyline-only stock.

| Filename | Regional cue to include |
|----------|---------------------------|
| `location-newcastle-hero.jpg` | Coal-coast light, federation terrace or modern Newcastle home, workshop-local pride |
| `location-sydney-hero.jpg` | Harbour glimpse or inner-west terrace kitchen |
| `location-canberra-hero.jpg` | Clean modern ACT home, mountain light |
| `location-melbourne-hero.jpg` | Victorian terrace or Brighton Hamptons kitchen |
| `location-central-coast-hero.jpg` | Coastal family home, northerly light |
| `location-hunter-valley-hero.jpg` | Wine-country estate kitchen or cellar door joinery |
| `location-gold-coast-hero.jpg` | High-rise apartment joinery or coastal new-build |
| `location-wollongong-hero.jpg` | Escarpment-view home, Illawarra coastal |
| `location-brisbane-hero.jpg` | Queenslander verandah glimpse or subtropical open plan |
| `location-perth-hero.jpg` | Wide light, modern Perth home, limestone/neutral tones |
| `location-byron-bay-hero.jpg` | Relaxed coastal timber, indoor-outdoor flow |
| `location-port-macquarie-hero.jpg` | Mid-north coast family home |
| `location-coffs-harbour-hero.jpg` | Banana-coast bright interior |
| `location-adelaide-hero.jpg` | Adelaide Hills stone + timber kitchen |
| `location-bathurst-hero.jpg` | Heritage country home, cool-climate palette |
| `location-orange-hero.jpg` | Central-west NSW estate, cool-toned kitchen |

**Optional OG crops:** `og-location-{slug}.jpg` → `public/og/locations/{slug}-og.jpg`.

---

# P2 — Team portraits

Save to `05-team/`. Square 800×800. Consistent background: warm neutral workshop wall or soft bokeh workshop.

| Filename | Person | Role |
|----------|--------|------|
| `team-james-mitchell-portrait.jpg` | James Mitchell | Founder & Master Joiner |
| `team-sarah-chen-portrait.jpg` | Sarah Chen | Lead Designer |
| `team-tom-walsh-portrait.jpg` | Tom Walsh | Lead Joiner |
| `team-elena-rossi-portrait.jpg` | Elena Rossi | Install Lead |

**Prompt template:**
> [Master prompt] Professional head-and-shoulders portrait of an Australian {role description}, age {range}, wearing smart-casual workshop attire (not full hi-vis). Friendly, confident expression. Same lighting setup as other team portraits. 1:1 square crop.

Use **generic, non-identifiable** faces (Perplexity-generated people), not real individuals.

**Deploy:** `public/images/team/{slug}.jpg` — developer will wire `Team.tsx` when ready.

---

# P2 — Materials shot

### `materials-workshop-samples.jpg`
**Deploy to:** `public/images/materials-workshop-samples.jpg`

**Prompt:**
> [Master prompt] Flat lay or shallow studio shot of joinery material samples on workshop bench: oak and walnut timber swatches, 2-pac colour chips, Caesarstone quartz samples, Blum hinge and runner hardware, Polytec board labels. Educational, premium sample library feel. Used on service pages (materials block, may render desaturated).

---

# P2 — Blog covers

Save to `08-blog/`.

| Filename | Topic |
|----------|-------|
| `blog-kitchen-storage-planning-australia-hero.jpg` | Pantry drawers, internal storage planning |

**Prompt (kitchen storage):**
> [Master prompt] Open kitchen drawer and pull-out pantry internals showing organised storage, spice inserts, pot drawer. Australian kitchen context. Editorial blog cover, 16:10.

Add more `blog-{post-slug}-hero.jpg` files as new articles are published.

---

# Deployment manifest (developer reference)

After generation, the developer (Cursor agent) will:

1. Copy JPGs from `docs/pictures/` → `public/` per `manifest.json`
2. Update React components to reference new paths (replacing `hero-workshop.svg`)
3. Upload portfolio/blog images to Supabase `cms-media` if needed
4. Run `pnpm import:logo` only for brand assets (already done — **do not regenerate logos**)

See **`manifest.json`** in this folder for the full source → destination map.

---

# Quality checklist (before marking complete)

- [ ] Every filename matches convention exactly
- [ ] No duplicate images reused across unrelated slots (workshop gallery = 6 unique shots)
- [ ] Before/after pairs match framing
- [ ] OG images have uncluttered lower third
- [ ] No embedded text, watermarks, or misspelled signage
- [ ] Colour temperature consistent within each project set
- [ ] P0 folder complete before starting P2
- [ ] `manifest.json` updated if you add extra files

---

# Do NOT generate

These assets already exist — skip them:

- `/brand/*` logos and favicons
- `/badges/hia.svg`, `mba.svg`, `houzz.svg`
- `/logo.png`
- Any SVG illustrations in `public/`

---

**Questions?** Add a `NOTES.txt` in the relevant subfolder explaining creative decisions. The developer reads filenames first, notes second.
