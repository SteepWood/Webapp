# SteepWood — Blog launch batch images (31 shots)

**Purpose:** Replace all blog image placeholders — including the **blog index hero** (currently reuses `workshop-hero-main.jpg` from the homepage) — and supply hero, OG, and inline images for the **6 launch-pack posts**.

**Output root (mandatory):**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\08-blog\
```

**After generation (developer):**
```bash
pnpm deploy:images
pnpm db:seed
```
Then hard-refresh `/blog/` and each post URL.

---

## Master prompt (prepend to every shot)

> Photorealistic editorial photograph for a premium Australian custom joinery brand called **SteepWood**, based in **Newcastle NSW**. Warm natural light, shallow depth of field where appropriate, true-to-life colours. Dominant materials: **American oak, walnut, Tasmanian oak, Spotted Gum**, 2-pac painted shaker profiles, **Polytec / Laminex** board, **Caesarstone / Dekton / Neolith** benchtops where relevant, **Blum** soft-close hardware. Interiors feel high-end but lived-in — Australian residential or light commercial, not European luxury hotel. Colour palette harmony: warm ink browns (#1f1610–#453528), natural oak (#8b6b47), linen paper tones (#f7f1e8). **No watermarks, no SteepWood logo burned in, no readable licence numbers or personal names on documents, no text overlays.** No fisheye distortion. Shot on a full-frame camera, 35mm or 50mm equivalent. Australian power points, tapware, and proportions.

---

## Technical specs

| Role | Dimensions | Aspect | Format | Deploy path |
| --- | --- | --- | --- | --- |
| Blog index hero | **1600 × 1000 px** | 16:10 | JPG q88 progressive, sRGB | `public/images/blog/blog-index-hero.jpg` |
| Post hero | **1600 × 1000 px** | 16:10 | JPG q88 progressive, sRGB | `public/blog/{slug}/hero.jpg` |
| Post OG / social | **1200 × 630 px** | ~1.91:1 | JPG q88 progressive, sRGB | `public/blog/{slug}/og.jpg` |
| Inline pair (×2) | **1200 × 900 px** | 4:3 | JPG q88 progressive, sRGB | `public/blog/{slug}/inline-01.jpg`, `inline-02.jpg` |
| Inline wide | **1600 × 1000 px** | 16:10 | JPG q88 progressive, sRGB | `public/blog/{slug}/inline-wide.jpg` |

**Naming in staging folder (before deploy):**
```
blog-index-hero.jpg
blog-{slug}-hero.jpg
blog-{slug}-og.jpg
blog-{slug}-inline-01.jpg
blog-{slug}-inline-02.jpg
blog-{slug}-inline-wide.jpg
```

**Slugs (exact):**
- `custom-kitchen-cost-nsw-2026`
- `flat-pack-vs-custom-kitchen-australia`
- `2pac-laminate-timber-veneer-kitchen-finishes-nsw`
- `walk-in-robe-built-in-wardrobe-cost-guide-nsw`
- `questions-to-ask-custom-joiner-australia`
- `benchtop-guide-engineered-stone-ban-nsw`

---

## Critical: blog index hero must NOT match homepage

The homepage hero is `public/images/workshop-hero-main.jpg` — a wide workshop establishing shot.

The **blog index** needs a **different composition** so visitors do not see the same image twice.

| Homepage hero (`workshop-hero-main`) | Blog index hero (`blog-index-hero`) |
| --- | --- |
| Wide workshop floor, CNC / assembly context | Tighter editorial crop — design desk or bench **review session** |
| Establishing “craft at scale” | “Insights & guidance” — plans, samples, notebook |
| Full room depth | Shallow depth of field, hands + materials in foreground |

**Do not** reuse the homepage workshop wide shot, re-crop it, or generate a near-identical CNC panorama.

---

## Batch checklist — 31 images

### 0 — Blog index (1 image)

| File | Deploy |
| --- | --- |
| `blog-index-hero.jpg` | `public/images/blog/blog-index-hero.jpg` |

**Prompt:**
> [Master prompt] Editorial blog cover for a joinery insights page. Over-shoulder or three-quarter view of a joinery designer at a workshop bench reviewing **architectural kitchen plans** beside **fanned material samples** (oak veneer chip, white 2-pac chip, grey stone sample) and a **steel ruler**. Warm Newcastle workshop window light, shallow depth of field on the samples and plans. Feels like “expert advice from the bench” — not a factory tour. 16:10, no visible faces (crop at shoulder/hands), no legible text on plans.

**Alt text (for developer):** SteepWood joinery designer reviewing plans and material samples at the Newcastle workshop bench.

---

### 1 — `custom-kitchen-cost-nsw-2026` (5 images)

**Topic:** NSW custom kitchen pricing guide. Category: Cost Guides.

| File | Role |
| --- | --- |
| `blog-custom-kitchen-cost-nsw-2026-hero.jpg` | Post hero + card thumbnail |
| `blog-custom-kitchen-cost-nsw-2026-og.jpg` | Open Graph |
| `blog-custom-kitchen-cost-nsw-2026-inline-01.jpg` | Inline pair — hardware detail |
| `blog-custom-kitchen-cost-nsw-2026-inline-02.jpg` | Inline pair — workshop fabrication |
| `blog-custom-kitchen-cost-nsw-2026-inline-wide.jpg` | Inline wide — finished kitchen context |

**Hero prompt:**
> [Master prompt] Custom shaker-profile kitchen carcass and door fronts in **Tasmanian oak veneer** on an assembly bench in a Newcastle joinery workshop. Soft-close **Blum** runners visible in an open drawer. Warm side light, premium but honest workshop realism — not a showroom install. 16:10.

**OG prompt:**
> [Master prompt] Same kitchen subject as hero but **wider crop** with more bench context; composition safe for **1200×630 centre crop** (keep key subject in middle third). Slightly brighter for social thumbnails.

**Inline-01 prompt:**
> [Master prompt] Close-up of **Blum Legrabox** full-extension drawer with internal divider inserts and soft-close runner — the kind of hardware line item that separates mid-range from premium kitchen quotes. Shallow depth of field, workshop or installed kitchen context. 4:3.

**Inline-02 prompt:**
> [Master prompt] Joinery craftsperson checking **MR board carcass** dimensions on a panel saw or assembly table in Newcastle workshop. Safety glasses optional, no identifiable face required. Fabrication reality — dust motes, true workshop background. 4:3.

**Inline-wide prompt:**
> [Master prompt] Completed **Hamptons-influenced** custom kitchen in an Australian coastal home — white 2-pac shaker doors, light stone benchtop, integrated appliances. Bright but natural daylight, lived-in styling (fruit bowl, tea towel), Merewether / Newcastle residential feel. 16:10 establishing shot.

**Alt (hero):** Custom timber kitchen joinery built in Newcastle NSW workshop by SteepWood.

---

### 2 — `flat-pack-vs-custom-kitchen-australia` (5 images)

**Topic:** Flat-pack vs custom decision guide. Category: Buying Guides.

| File | Role |
| --- | --- |
| `blog-flat-pack-vs-custom-kitchen-australia-hero.jpg` | Hero |
| `blog-flat-pack-vs-custom-kitchen-australia-og.jpg` | OG |
| `blog-flat-pack-vs-custom-kitchen-australia-inline-01.jpg` | Inline pair — flat-pack reality |
| `blog-flat-pack-vs-custom-kitchen-australia-inline-02.jpg` | Inline pair — custom workshop quality |
| `blog-flat-pack-vs-custom-kitchen-australia-inline-wide.jpg` | Inline wide — custom installed result |

**Hero prompt:**
> [Master prompt] Premium **custom kitchen joinery** on a Newcastle workshop bench before install — **Polytec SYNC** woodgrain doors, **Blum** hinge cups fitted, precise 2mm shadow lines. Sharp focus on door edge and hinge detail. This image represents the **custom** side of the comparison. 16:10.

**OG prompt:**
> [Master prompt] Wider crop of custom kitchen cabinetry on workshop bench; strong centre subject for 1200×630 social crop. Warm, confident, premium.

**Inline-01 prompt:**
> [Master prompt] **Flat-pack kitchen reality** — flat cardboard boxes with generic graphics stacked in a garage or laundry, **partially assembled** melamine cabinet with visible cam-lock fittings and misaligned filler strip, allen key on floor. Fluorescent or dull light. Honest, dated, **not** SteepWood quality — illustrates the flat-pack side without brand logos on boxes. 4:3.

**Inline-02 prompt:**
> [Master prompt] **Custom joinery contrast** — spray booth with hung **2-pac** doors curing, or CNC-cut MR panels labelled for a specific kitchen job. Newcastle workshop. Precision and permanence. 4:3.

**Inline-wide prompt:**
> [Master prompt] Installed **custom kitchen** in an Australian family home — integrated fridge column, waterfall stone edge, soft-close drawers slightly open to show quality. The “after you choose custom” outcome. 16:10.

**Alt (hero):** Custom kitchen joinery with Blum hardware and Polytec SYNC doors built in a Newcastle NSW workshop.

---

### 3 — `2pac-laminate-timber-veneer-kitchen-finishes-nsw` (5 images)

**Topic:** 2-pac vs laminate vs veneer finishes. Category: Materials.

| File | Role |
| --- | --- |
| `blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-hero.jpg` | Hero |
| `blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-og.jpg` | OG |
| `blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-inline-01.jpg` | Inline pair — 2-pac |
| `blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-inline-02.jpg` | Inline pair — laminate |
| `blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-inline-wide.jpg` | Inline wide — veneer run |

**Hero prompt:**
> [Master prompt] **Three kitchen door samples side by side** on a workshop bench: (1) smooth **white 2-pac** shaker, (2) **Polytec Woodmatt** grey laminate, (3) **Spotted Gum timber veneer**. Even lighting, labels turned away or out of frame, educational comparison layout. 16:10.

**OG prompt:**
> [Master prompt] Same three-finish comparison, pulled back slightly for 1200×630 crop; all three samples clearly visible in centre.

**Inline-01 prompt:**
> [Master prompt] Extreme close-up of **2-pac polyurethane** surface on a shaker profile — mirror-smooth paint-like finish, crisp rail and stile junction. No fingerprints. 4:3.

**Inline-02 prompt:**
> [Master prompt] **HPL laminate** door surface showing **Polytec SYNC** embossed woodgrain texture at raking angle — durability and texture visible. 4:3.

**Inline-wide prompt:**
> [Master prompt] Full kitchen run in **American oak veneer** with clear coat — warm timber grain across multiple doors and drawers, stone benchtop above. Australian home, natural window light. 16:10.

**Alt (hero):** Custom kitchen joinery Newcastle NSW showing 2-pac, Polytec laminate and timber veneer door finishes side by side.

---

### 4 — `walk-in-robe-built-in-wardrobe-cost-guide-nsw` (5 images)

**Topic:** Walk-in robe / built-in wardrobe costs. Category: Wardrobes.

| File | Role |
| --- | --- |
| `blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-hero.jpg` | Hero |
| `blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-og.jpg` | OG |
| `blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-inline-01.jpg` | Inline pair — internals |
| `blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-inline-02.jpg` | Inline pair — hanging zone |
| `blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-inline-wide.jpg` | Inline wide — full walk-in |

**Hero prompt:**
> [Master prompt] **Custom walk-in robe** with **Polytec** sliding doors (one panel slightly open) revealing **Blum** undermount drawer banks and hanging sections. Neutral carpet, soft LED strip glow inside robe. Sydney / Newcastle master suite scale. 16:10.

**OG prompt:**
> [Master prompt] Walk-in robe hero composition with more room context; centre-weighted for 1200×630.

**Inline-01 prompt:**
> [Master prompt] Open **full-extension drawer stack** in a walk-in robe — jumpers folded, **Blum** runner visible, cedar-lined jewellery tray optional. Organised, premium internals. 4:3.

**Inline-02 prompt:**
> [Master prompt] **Double hanging zone** with LED strip lighting switched on at robe entry — coats and dresses on slim hangers, mirror panel edge visible. 4:3.

**Inline-wide prompt:**
> [Master prompt] **Walk-in robe with centre island bench** — drawers below, folded shirts on top, hanging zones left and right. Federation / terrace master suite feel (Mosman-style proportions), not a US closet megastore. 16:10.

**Alt (hero):** Custom walk-in robe with Polytec sliding doors and Blum undermount drawer banks, Newcastle NSW joinery workshop.

---

### 5 — `questions-to-ask-custom-joiner-australia` (5 images)

**Topic:** Hiring a custom joiner — trust and process. Category: Buying Guides.

| File | Role |
| --- | --- |
| `blog-questions-to-ask-custom-joiner-australia-hero.jpg` | Hero |
| `blog-questions-to-ask-custom-joiner-australia-og.jpg` | OG |
| `blog-questions-to-ask-custom-joiner-australia-inline-01.jpg` | Inline pair — workshop proof |
| `blog-questions-to-ask-custom-joiner-australia-inline-02.jpg` | Inline pair — design consultation |
| `blog-questions-to-ask-custom-joiner-australia-inline-wide.jpg` | Inline wide — quality check |

**Hero prompt:**
> [Master prompt] **Kitchen carcasses under construction** on assembly horses in Newcastle workshop — MR board boxes, shelf pins, pocket screw holes, **no doors yet**. Honest in-progress joinery, not a finished install. Represents “look for a real workshop”. 16:10.

**OG prompt:**
> [Master prompt] Workshop carcass assembly, wider crop, centre subject for social.

**Inline-01 prompt:**
> [Master prompt] Workshop wall with **organised tool board**, **dust extraction hose**, and stacked **Blum hardware boxes** — signals licensed trade environment. No readable licence certificate text. 4:3.

**Inline-02 prompt:**
> [Master prompt] **In-home design consultation** — joinery designer with client at dining table (client shown from behind or hands only), **laptop showing 3D kitchen render**, **material sample board** fanned open. Australian home interior. 4:3.

**Inline-wide prompt:**
> [Master prompt] Senior craftsperson **quality-checking door reveal gaps** with feeler gauge on installed cabinetry — tape measure on bench, pencil behind ear optional. Professional sign-off moment. 16:10.

**Alt (hero):** Custom joinery workshop in Newcastle NSW showing cabinet carcasses under construction.

---

### 6 — `benchtop-guide-engineered-stone-ban-nsw` (5 images)

**Topic:** Post–engineered stone ban benchtop alternatives. Category: Materials.

| File | Role |
| --- | --- |
| `blog-benchtop-guide-engineered-stone-ban-nsw-hero.jpg` | Hero |
| `blog-benchtop-guide-engineered-stone-ban-nsw-og.jpg` | OG |
| `blog-benchtop-guide-engineered-stone-ban-nsw-inline-01.jpg` | Inline pair — sintered sample |
| `blog-benchtop-guide-engineered-stone-ban-nsw-inline-02.jpg` | Inline pair — waterfall edge |
| `blog-benchtop-guide-engineered-stone-ban-nsw-inline-wide.jpg` | Inline wide — full kitchen bench run |

**Hero prompt:**
> [Master prompt] **Sintered stone benchtop** (Dekton- or Neolith-style concrete grey slab) on **dark timber veneer** base cabinets in a completed Newcastle-area kitchen. Matte stone surface, minimal veining, contemporary Australian home. Post–engineered-stone-ban aesthetic. 16:10.

**OG prompt:**
> [Master prompt] Sintered stone kitchen hero, wider crop, strong centre for 1200×630.

**Inline-01 prompt:**
> [Master prompt] **Large format sintered stone sample** held at angle on workshop bench beside **timber and 2-pac chips** — thickness edge visible (12mm), factory cut edge clean. Educational material selection shot. 4:3.

**Inline-02 prompt:**
> [Master prompt] **Waterfall benchtop edge** where vertical panel meets floor — precise miter, dark stone, shadow gap at cabinet. Detail craftsmanship. 4:3.

**Inline-wide prompt:**
> [Master prompt] Long **island bench run** in sintered stone with undermount sink cut-out (no tap brand visible), **2-pac navy** or charcoal doors below. NSW coastal kitchen daylight. 16:10.

**Alt (hero):** Sintered stone benchtop in a custom kitchen joinery Newcastle NSW — Dekton slab with dark timber cabinetry.

---

## OG image rules (all 6 posts)

- **1200 × 630 px** exact
- Keep the **primary subject centred** — LinkedIn, Facebook, and Google crop edges aggressively
- Slightly **higher brightness** than hero — reads on small previews
- **No text overlays** (title burned in) — the site adds metadata separately

---

## Quality checklist (before marking complete)

- [ ] **31 files** present with exact filenames
- [ ] Blog index hero is **visually distinct** from `workshop-hero-main.jpg`
- [ ] All heroes **1600×1000**, all OG **1200×630**, inline pairs **1200×900**, inline wide **1600×1000**
- [ ] Progressive JPEG, sRGB, no PNG
- [ ] No watermarks, no legible documents, no celebrity faces
- [ ] Flat-pack inline shot (post 2) looks **dated** — not mistaken for SteepWood portfolio
- [ ] Three-finish hero (post 3) shows **clearly different** surface types
- [ ] Optional: zip as `steepwood-p1-blog-images.zip` beside the folder

---

## Developer wiring (after images land)

1. Add manifest entries under `08-blog/` in `docs/pictures/manifest.json`
2. Run `pnpm deploy:images`
3. Update `src/lib/images.ts` — add `BLOG_INDEX_HERO_IMAGE = "/images/blog/blog-index-hero.jpg"`
4. Update `src/app/blog/page.tsx` — replace `WORKSHOP_HERO_IMAGE` with `BLOG_INDEX_HERO_IMAGE`
5. Update `prisma/seedBlog.ts` — set `coverImageUrl: "/blog/{slug}/hero.jpg"` per post (alt already in frontmatter)
6. Wire `BlogVisualStrip` to `/blog/{slug}/inline-01.jpg`, `inline-02.jpg`, `inline-wide.jpg` when ready
7. Run `pnpm db:seed` and verify cards + hero placeholders are gone

**Do not regenerate:** homepage workshop hero, portfolio projects, service heroes, brand assets, team portraits.
