# SteepWood — Homepage blank card images (generation prompt)

**Purpose:** Generate every image that still shows as a **blank placeholder card** on the homepage and related grids. The homepage `ServicesOverview` bento grid reads `heroImageUrl` from the database; each service needs a hero JPEG at the path below.

**Output root:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\02-services\
```

After generation, run from the repo root:
```bash
pnpm deploy:images
pnpm db:seed
```

---

## Master prompt (prepend to every shot below)

> Photorealistic editorial photograph for a premium Australian custom joinery brand called **SteepWood**, based in **Newcastle NSW**. Warm natural light, shallow depth of field where appropriate, true-to-life colours. Dominant materials: **American oak, walnut, Tasmanian oak, Spotted Gum**, 2-pac painted shaker profiles, **Caesarstone** benchtops, **Blum** soft-close hardware. Interiors feel high-end but lived-in — Australian residential or commercial, not European luxury hotel. Colour palette harmony: warm ink browns (#1f1610–#453528), natural oak (#8b6b47), linen paper tones (#f7f1e8). No watermarks, no logos, no text burned into the image. No fisheye distortion. Shot on a full-frame camera, 35mm or 50mm equivalent. **Australian English context** — power points, tapware, and proportions should feel Australian.

---

## Technical spec (all 10 service card images)

| Field | Value |
|-------|-------|
| **Export size** | 1600 × 1000 px (minimum 800 × 600 for card crop) |
| **Aspect ratio** | 16:10 (safe to centre-crop to 4:3 on mobile) |
| **Format** | Progressive JPEG, quality 88, sRGB |
| **Composition** | Subject fills frame; avoid empty ceiling; keep joinery as hero |
| **Deploy path** | `public/images/services/{slug}-hero.jpg` |

**Naming rule:** `service-{slug}-hero.jpg` in `02-services/`

---

## Priority batch — 10 homepage service cards (generate all)

These are the images that power the homepage **“Ten services. One commitment to craft.”** grid. Each card links to `/{slug}/`.

### 1. Custom Kitchen Joinery
- **Filename:** `service-custom-kitchen-joinery-hero.jpg`
- **Deploy:** `public/images/services/custom-kitchen-joinery-hero.jpg`
- **Alt text:** Custom Kitchen Joinery by SteepWood in Newcastle
- **Prompt:** [Master prompt] Hamptons-style shaker kitchen with American oak island, Caesarstone waterfall bench, integrated Miele-style appliances, soft morning light from dining side. Wide hero angle showing island + run of wall cabinets. Australian family home, lived-in but immaculate.

### 2. Built-In Wardrobes & Walk-In Robes
- **Filename:** `service-built-in-wardrobes-hero.jpg`
- **Deploy:** `public/images/services/built-in-wardrobes-hero.jpg`
- **Alt text:** Built-In Wardrobes by SteepWood in Newcastle
- **Prompt:** [Master prompt] Floor-to-ceiling built-in wardrobe with full-height mirror panel, soft-close drawers visible slightly ajar, neutral bedroom with linen bedding blur. Warm side light, boutique wardrobe showroom feel.

### 3. Office Fitout
- **Filename:** `service-office-fitout-hero.jpg`
- **Deploy:** `public/images/services/office-fitout-hero.jpg`
- **Alt text:** Office Fitout by SteepWood in Newcastle
- **Prompt:** [Master prompt] Modern Australian office reception and breakout joinery — timber slat feature wall, integrated reception desk, quiet corporate palette (ink, oak, white). No people; focus on joinery craftsmanship.

### 4. Shopfitting & Retail Joinery
- **Filename:** `service-shopfitting-hero.jpg`
- **Deploy:** `public/images/services/shopfitting-hero.jpg`
- **Alt text:** Shopfitting by SteepWood in Newcastle
- **Prompt:** [Master prompt] Boutique retail interior — custom display shelving, cash desk joinery, warm spot lighting on timber and brass details. Fashion or lifestyle store aesthetic, premium but approachable.

### 5. Custom Bathroom Vanity Joinery
- **Filename:** `service-custom-bathroom-vanity-hero.jpg`
- **Deploy:** `public/images/services/custom-bathroom-vanity-hero.jpg`
- **Alt text:** Custom Bathroom Vanity by SteepWood in Newcastle
- **Prompt:** [Master prompt] Double floating bathroom vanity, stone top, timber drawer fronts, frameless mirror, premium Australian bathroom. Moisture-resistant cabinet construction implied by clean edges and wall-hung detail.

### 6. Commercial Joinery
- **Filename:** `service-commercial-joinery-hero.jpg`
- **Deploy:** `public/images/services/commercial-joinery-hero.jpg`
- **Alt text:** Commercial Joinery by SteepWood in Newcastle
- **Prompt:** [Master prompt] Hospitality bar or café service counter — durable laminates, timber accents, under-bench storage, commercial-grade hardware. Evening ambient light, no branding on surfaces.

### 7. Custom & Bespoke Furniture
- **Filename:** `service-custom-furniture-hero.jpg`
- **Deploy:** `public/images/services/custom-furniture-hero.jpg`
- **Alt text:** Custom Furniture by SteepWood in Newcastle
- **Prompt:** [Master prompt] Bespoke Tasmanian oak dining table with matching sideboard in an Australian dining room. Natural window light, simple styling (ceramic vase, linen napkins), emphasis on timber grain and hand-finished edges.

### 8. Custom Home Office Joinery
- **Filename:** `service-home-office-joinery-hero.jpg`
- **Deploy:** `public/images/services/home-office-joinery-hero.jpg`
- **Alt text:** Home Office Joinery by SteepWood in Newcastle
- **Prompt:** [Master prompt] Built-in home office — wall-to-wall desk, overhead cabinets, cable grommet visible, timber and 2-pac mix. Residential study nook with bookshelf wall, organised and aspirational.

### 9. Custom Laundry Cabinets
- **Filename:** `service-laundry-cabinets-hero.jpg`
- **Deploy:** `public/images/services/laundry-cabinets-hero.jpg`
- **Alt text:** Laundry Cabinets by SteepWood in Newcastle
- **Prompt:** [Master prompt] Australian laundry room — tall broom cupboard, bench over front-loader washer/dryer stack, HMR white cabinetry, clean utility aesthetic. Bright even light, functional and premium.

### 10. Custom Timber Staircase Joinery
- **Filename:** `service-staircase-joinery-hero.jpg`
- **Deploy:** `public/images/services/staircase-joinery-hero.jpg`
- **Alt text:** Timber Staircase Joinery by SteepWood in Newcastle
- **Prompt:** [Master prompt] American oak staircase in double-height void — closed stringer or partial open tread, timber handrail with black metal balustrade option. Dramatic but warm light from skylight or large window.

---

## Optional OG companions (same subject, 1200 × 630)

Save to `06-og-social/` after each service hero. Deploy via `pnpm deploy:images` to `public/og/services/{slug}-og.jpg`.

| OG filename | Service slug |
|-------------|--------------|
| `og-service-custom-kitchen-joinery.jpg` | custom-kitchen-joinery |
| `og-service-built-in-wardrobes.jpg` | built-in-wardrobes |
| `og-service-office-fitout.jpg` | office-fitout |
| `og-service-shopfitting.jpg` | shopfitting |
| `og-service-custom-bathroom-vanity.jpg` | custom-bathroom-vanity |
| `og-service-commercial-joinery.jpg` | commercial-joinery |
| `og-service-custom-furniture.jpg` | custom-furniture |
| `og-service-home-office-joinery.jpg` | home-office-joinery |
| `og-service-laundry-cabinets.jpg` | laundry-cabinets |
| `og-service-staircase-joinery.jpg` | staircase-joinery |

**OG composition rule:** Same room/subject as hero, crop to 1200×630, add soft gradient darkening the **lower 35%** for social text overlay safety.

---

## Secondary blanks (not homepage service grid, but same placeholder pattern)

If these sections still show grey gradient placeholders elsewhere on the site, generate in a follow-up batch.

### Featured portfolio cards (homepage `#projects` carousel)
Uses `afterImageUrl` in database — should already be seeded from `/images/portfolio/{slug}/after.jpg`. If blank, regenerate:

| Slug | Filename | Prompt summary |
|------|----------|----------------|
| hamptons-kitchen-newcastle | `project-hamptons-kitchen-newcastle-after.jpg` | Hamptons shaker kitchen, Newcastle light, Caesarstone island |
| walk-in-robe-sydney | `project-walk-in-robe-sydney-after.jpg` | American oak walk-in robe, LED strips, island bench |
| floating-vanity-byron-bay | `project-floating-vanity-byron-bay-after.jpg` | Coastal floating vanity, Byron Bay natural light |

Save to `docs/pictures/steepwood-p0-images/04-portfolio/`, then `pnpm deploy:images` + `pnpm db:seed`.

### Team section (`/about/` — currently initials only, no photos yet)
| Filename (actual pack name) | Deploy path |
|-----------------------------|-------------|
| `team-portrait-01.jpg` | `public/images/team/james-mitchell.jpg` |
| `team-portrait-02.jpg` | `public/images/team/sarah-chen.jpg` |
| `team-portrait-03.jpg` | `public/images/team/tom-walsh.jpg` |
| `team-portrait-04.jpg` | `public/images/team/elena-rossi.jpg` |

**Prompt:** [Master prompt] Professional head-and-shoulders portrait, Australian craftsperson in smart-casual workshop attire, warm neutral background, 1:1 square, **generic non-identifiable face** (no real celebrities).

---

## Quality checklist (before handoff)

- [ ] All 10 files in `02-services/` match exact filenames above
- [ ] Each image is 1600×1000 (or larger), 16:10, JPG
- [ ] No logos, watermarks, or burned-in text (except OG crops)
- [ ] Australian interiors — tapware, GPOs, proportions feel local
- [ ] Colours align with SteepWood palette (warm oak, ink browns, linen whites)
- [ ] Run `pnpm deploy:images` and `pnpm db:seed`
- [ ] Hard-refresh http://localhost:3000 — service cards show photos, not grey placeholders

---

## Reference

Full site image map: `docs/pictures/manifest.json`  
Original photographer brief: `docs/pictures/PERPLEXITY-PHOTOGRAPHER-BRIEF.md`
