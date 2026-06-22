# SteepWood — Portfolio expansion images (3 new projects)

**Purpose:** Replace placeholder portfolio images for the three Q32 projects. The current `before` shots look too polished (they were copied from service hero photos). Regenerate all **21 images** with credible before/after contrast.

**Output root (mandatory):**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\04-portfolio\
```

**After generation:**
```bash
pnpm deploy:images
```

Images deploy to `public/images/portfolio/{slug}/` and seed paths update on next `pnpm db:seed`.

---

## Master prompt (prepend to every shot)

> Photorealistic editorial photograph for a premium Australian custom joinery brand called **SteepWood**, based in **Newcastle NSW**. Warm natural light, shallow depth of field where appropriate, true-to-life colours. Dominant materials: **American oak, walnut, Tasmanian oak, Spotted Gum**, 2-pac painted shaker profiles, **Caesarstone** benchtops, **Blum** soft-close hardware. Interiors feel high-end but lived-in — Australian residential or commercial, not European luxury hotel. Colour palette harmony: warm ink browns (#1f1610–#453528), natural oak (#8b6b47), linen paper tones (#f7f1e8). No watermarks, no logos unless specified, no visible faces of real celebrities, no text overlays burned into the image. No fisheye distortion. Shot on a full-frame camera, 35mm or 50mm equivalent. **Australian English context** — power points, tapware, and proportions should feel Australian.

---

## Technical specs

| File group | Dimensions | Aspect | Format |
| --- | --- | --- | --- |
| `after`, `before`, `g01` | **1600 × 1000 px** | 16:10 | JPG q88 progressive, sRGB |
| `g02`–`g05` | **1200 × 800 px** | 3:2 | JPG q88 progressive, sRGB |

**Naming:** `project-{slug}-{variant}.jpg` — all lowercase, hyphens only.

| Variant | Role |
| --- | --- |
| `after` | Hero + featured grid + slider “after” side |
| `before` | Slider “before” side — **must match `after` framing exactly** |
| `g01` | Wide room establishing shot (same project, can differ angle from after) |
| `g02`–`g05` | Detail / internal storage / hardware — wide → detail progression |

---

## Before/after workflow (critical)

The slider crops to identical aspect ratio. **Do not** generate before and after independently.

1. **Generate `after` first** for each project (hero composition, best light).
2. **Generate `before` second**, supplying the finished `after` image as a **framing reference**. Same room corner, same camera height, same crop box, same wall lines and window positions.
3. **Before shots must look pre-renovation** — dated, cluttered, imperfect. They should never pass as SteepWood portfolio work.

### Before-shot rules (non-negotiable)

| Do | Do not |
| --- | --- |
| Dated laminate, melamine, or painted MDF in poor condition | Custom shaker, 2-pac, or premium veneer |
| Fluorescent or dim uneven lighting | Bright editorial daylight |
| Visible clutter, cables, boxes, mismatched furniture | Staged, minimalist, magazine-ready |
| Scuffed paint, water stains, cheap hardware | Brushed stainless pulls, soft-close drawers |
| “Rental office” or “builder-grade” aesthetic | Boutique joinery showroom |

If the before image could sit on SteepWood’s homepage, it is **too polished** — regenerate.

---

## Batch checklist — 21 images (3 projects × 7)

### Project D — `office-fitout-canberra`

**Client context:** Rachel & Mark O'Connor — twelve-person accounting practice, Barton ACT. Reception desk, glass-fronted meeting-room wall unit, breakout joinery with charging and file drawers. Finishes: Polytec Natural White laminate, 2-pac navy accents, brushed stainless pulls.

| File | Variant |
| --- | --- |
| `project-office-fitout-canberra-after.jpg` | Completed fitout hero |
| `project-office-fitout-canberra-before.jpg` | Same angle, pre-fitout |
| `project-office-fitout-canberra-g01.jpg` | Wide reception + meeting-room glimpse |
| `project-office-fitout-canberra-g02.jpg` | Reception desk front — laminate + navy accent detail |
| `project-office-fitout-canberra-g03.jpg` | Glass-fronted meeting-room wall unit |
| `project-office-fitout-canberra-g04.jpg` | Breakout joinery with integrated charging |
| `project-office-fitout-canberra-g05.jpg` | Lockable file drawer internals, label rails |

**After prompt:**
> [Master prompt] Completed office fitout in a Barton Canberra professional services suite. Custom reception desk with concealed storage, glass-fronted meeting-room wall unit with display shelving, breakout credenza with integrated USB charging grommets. Polytec Natural White laminate, 2-pac navy accent panels, brushed stainless bar pulls. Quiet corporate palette, Canberra winter daylight through office windows, polished but working environment — not a showroom.

**Before prompt:**
> **Framing reference: attach `project-office-fitout-canberra-after.jpg`.** Same room corner and crop. Pre-renovation leased office: dated beige partition walls, cheap laminate reception counter with chipped edge, tangled power boards and cables on desk, mismatched second-hand chairs, flickering ceiling fluorescent panels, cardboard moving boxes stacked in corner, coffee-stained carpet tiles. Clearly a space mid-relocation — functional mess, zero custom joinery. 16:10, identical framing to after.

**Gallery prompts:**
- **g01:** Wide shot from reception toward meeting room — full fitout context.
- **g02:** Reception desk three-quarter angle — laminate grain, navy accent panel, stainless pulls.
- **g03:** Meeting-room glass-fronted unit — files and binders neatly arranged behind glass.
- **g04:** Breakout zone — charging ports, file drawers, corporate breakout nook.
- **g05:** Open file drawer — label rails, hanging folders, Blum soft-close runner visible.

**Deploy:** `public/images/portfolio/office-fitout-canberra/{variant}.jpg`

---

### Project E — `home-office-wollongong`

**Client context:** Fiona & Greg Saunders — spare bedroom converted to permanent home office in a Wollongong terrace. Floor-to-ceiling wall unit: built-in desk, cable grommets, printer bay with ventilation, open shelving. Polytec Ravine White fronts, oak-look laminate accents.

| File | Variant |
| --- | --- |
| `project-home-office-wollongong-after.jpg` | Completed home office hero |
| `project-home-office-wollongong-before.jpg` | Same wall, spare bedroom |
| `project-home-office-wollongong-g01.jpg` | Wide room — full wall unit |
| `project-home-office-wollongong-g02.jpg` | Desk surface + cable grommet detail |
| `project-home-office-wollongong-g03.jpg` | Enclosed printer bay, ventilation grille |
| `project-home-office-wollongong-g04.jpg` | Open shelving with books and awards |
| `project-home-office-wollongong-g05.jpg` | Soft-close file drawers + pinboard notice zone |

**After prompt:**
> [Master prompt] Completed home office joinery in a Wollongong terrace spare bedroom. Floor-to-ceiling wall unit with integrated desk, cable management grommets, enclosed printer bay with ventilation slots, open display shelving, soft-close file drawers. Polytec Ravine White door fronts with oak-look laminate accent panels. Independent LED task strip under overhead cabinets. Coastal terrace light, hybrid-work calm — premium but lived-in.

**Before prompt:**
> **Framing reference: attach `project-home-office-wollongong-after.jpg`.** Same bedroom wall and crop. Pre-renovation spare room: bare painted plaster wall with picture-hook holes, flat-pack IKEA desk sagging slightly, monitor on cardboard box, printer on folding table, power strip trailing across carpet, pile of moving boxes and coat on single bed edge, mismatched bedside lamp, no built-in storage. Dated floral carpet or worn timber floorboards. Obviously a temporary setup — nothing built-in. 16:10, identical framing to after.

**Gallery prompts:**
- **g01:** Wide bedroom-to-office conversion — full wall unit in terrace room context.
- **g02:** Desk detail — grommet, oak-look accent, clean cable routing.
- **g03:** Printer bay door ajar — ventilation slots, tidy cable exit.
- **g04:** Open shelves — books, small plant, framed certificate blur.
- **g05:** Drawer stack open — file dividers, pinboard-backed notice strip beside unit.

**Deploy:** `public/images/portfolio/home-office-wollongong/{variant}.jpg`

---

### Project F — `laundry-cabinets-central-coast`

**Client context:** Michelle & Andrew Park — Erina Central Coast family laundry reconfiguration. Full-height HMR cabinetry, pull-out broom cupboard, stone folding bench, washer/dryer cavities with access panels. Polytec Classic White doors, satin chrome handles.

| File | Variant |
| --- | --- |
| `project-laundry-cabinets-central-coast-after.jpg` | Completed laundry hero |
| `project-laundry-cabinets-central-coast-before.jpg` | Same room, pre-renovation |
| `project-laundry-cabinets-central-coast-g01.jpg` | Wide laundry — full cabinetry run |
| `project-laundry-cabinets-central-coast-g02.jpg` | Stone folding bench + overhead cupboards |
| `project-laundry-cabinets-central-coast-g03.jpg` | Pull-out broom cupboard open |
| `project-laundry-cabinets-central-coast-g04.jpg` | Washer/dryer cavity with access panel |
| `project-laundry-cabinets-central-coast-g05.jpg` | Deep pet-supply drawer + concealed ironing niche |

**After prompt:**
> [Master prompt] Completed laundry cabinetry in an Erina Central Coast family home. Full-height moisture-resistant white cabinetry, stone-topped folding bench, integrated front-loader and dryer stack with access panels, pull-out broom cupboard, overhead drying-line storage. Polytec Classic White doors, satin chrome cup handles. Bright utility room, coastal family home — clean, organised, Australian laundry proportions.

**Before prompt:**
> **Framing reference: attach `project-laundry-cabinets-central-coast-after.jpg`.** Same laundry room corner and crop. Pre-renovation utility space: freestanding top-loader washer on bare vinyl floor, exposed copper and PVC plumbing along wall, wire shelf with mismatched detergent bottles, plastic laundry hamper overflowing, chipped magnolia paint, single bare bulb, no folding bench, broom leaning in corner, pet food bag on floor. Dingy, cramped, builder-grade — zero custom cabinetry. 16:10, identical framing to after.

**Gallery prompts:**
- **g01:** Wide laundry — full-height run, appliances integrated.
- **g02:** Folding bench — stone top, overhead cupboard, task light.
- **g03:** Broom cupboard pulled out — mops, vacuum, organised cleaning supplies.
- **g04:** Appliance cavity — access panel ajar, plumbing neat behind.
- **g05:** Deep drawer open — pet supplies; glimpse of concealed ironing board niche.

**Deploy:** `public/images/portfolio/laundry-cabinets-central-coast/{variant}.jpg`

---

## Quality checklist (before handoff)

- [ ] 21 files, exact filenames, correct folders
- [ ] All `after` / `before` / `g01` at 1600×1000 (16:10)
- [ ] All `g02`–`g05` at 1200×800 (3:2)
- [ ] Before/after pairs share identical framing (test by overlaying in an editor)
- [ ] **Before shots look dated and cluttered** — clearly not SteepWood joinery
- [ ] **After shots look premium** — distinct step-change from before
- [ ] No watermarks, logos, burned-in text, or identifiable faces
- [ ] Australian context (GPO outlets, tapware, proportions)

## Zip handoff (optional)

Zip the `04-portfolio/` folder as `steepwood-p1-portfolio-images.zip` and place beside it. Developer runs `pnpm deploy:images`.
