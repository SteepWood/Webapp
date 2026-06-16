# SteepWood — Service materials images (generation prompt)

**Purpose:** Generate **10 unique materials & finishes images** — one per service pillar page. These appear in the **“Materials & finishes”** section (second image on each `/custom-kitchen-joinery/`-style page). Each must be **different from that service’s hero image** and show craftsmanship, materials, hardware, or finish detail relevant to the service.

**Output root:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\02-services\
```

**After generation:**
```bash
pnpm deploy:images
```

No database seed required — paths are wired in `src/lib/services-locations/services.ts` as `materialsImagePath`.

---

## Master prompt (prepend to every shot below)

> Photorealistic editorial photograph for a premium Australian custom joinery brand called **SteepWood**, based in **Newcastle NSW**. Warm natural light, shallow depth of field where appropriate, true-to-life colours. Dominant materials: **American oak, walnut, Tasmanian oak, Spotted Gum**, 2-pac painted shaker profiles, **Caesarstone** benchtops, **Blum** soft-close hardware. Interiors feel high-end but lived-in — Australian residential or commercial, not European luxury hotel. Colour palette harmony: warm ink browns (#1f1610–#453528), natural oak (#8b6b47), linen paper tones (#f7f1e8). No watermarks, no logos, no text burned into the image. No fisheye distortion. Shot on a full-frame camera, 35mm or 50mm equivalent. **Australian English context** — power points, tapware, and proportions should feel Australian.

---

## Technical spec (all 10 images)

| Field | Value |
|-------|-------|
| **Export size** | 1600 × 1000 px |
| **Aspect ratio** | 16:10 |
| **Format** | Progressive JPEG, quality 88, sRGB |
| **Composition** | Detail or close-up — materials, joinery edge, hardware, or finish texture. Not a wide room hero (that is a separate file). |
| **Rendering note** | Site may display this image **desaturated (grayscale)** — ensure strong texture, contrast, and readable material definition. |
| **Deploy path** | `public/images/services/{slug}-materials.jpg` |

**Naming rule:** `service-{slug}-materials.jpg` in `02-services/`

**Do not duplicate:** Each materials shot must differ clearly from its matching `service-{slug}-hero.jpg` — different angle, crop, subject, or scale.

---

## Batch — 10 service materials images

### 1. Custom Kitchen Joinery
- **Filename:** `service-custom-kitchen-joinery-materials.jpg`
- **Deploy:** `public/images/services/custom-kitchen-joinery-materials.jpg`
- **Prompt:** [Master prompt] Close-up detail of Hamptons shaker kitchen joinery — painted 2-pac profile edge, soft-close Blum hinge partially open, Caesarstone benchtop waterfall edge meeting cabinet side. Shallow depth of field, warm side light emphasising paint finish and stone texture. Craftsmanship detail, not a wide room shot.

### 2. Built-In Wardrobes & Walk-In Robes
- **Filename:** `service-built-in-wardrobes-materials.jpg`
- **Deploy:** `public/images/services/built-in-wardrobes-materials.jpg`
- **Prompt:** [Master prompt] Wardrobe interior detail — full-extension soft-close drawer runner, folded knitwear in drawer, hanging rail with cedar strip, mirror backing panel edge visible. Neutral bedroom tones blurred in background. Emphasis on storage hardware and interior fit-out quality.

### 3. Office Fitout
- **Filename:** `service-office-fitout-materials.jpg`
- **Deploy:** `public/images/services/office-fitout-materials.jpg`
- **Prompt:** [Master prompt] Commercial office joinery detail — laminate reception desk edge with ABS edging strip, integrated cable grommet, timber slat acoustic panel meeting laminate surface. Clean corporate palette (ink, oak, white). Precision factory edge, no wide office panorama.

### 4. Shopfitting & Retail Joinery
- **Filename:** `service-shopfitting-materials.jpg`
- **Deploy:** `public/images/services/shopfitting-materials.jpg`
- **Prompt:** [Master prompt] Retail display joinery detail — illuminated timber shelf with brass price-rail channel, folded garment or product box softly blurred, warm spot lighting on shelf edge and grain. Boutique fashion-store aesthetic. Focus on display craftsmanship and durable retail finishes.

### 5. Custom Bathroom Vanity Joinery
- **Filename:** `service-custom-bathroom-vanity-materials.jpg`
- **Deploy:** `public/images/services/custom-bathroom-vanity-materials.jpg`
- **Prompt:** [Master prompt] Bathroom vanity materials detail — moisture-resistant HMR cabinet edge, timber veneer drawer front pull, under-mount basin rim and stone benchtop mitre joint, chrome tapware softly out of focus. Coastal bathroom light. Emphasis on wet-area construction and premium finishes.

### 6. Commercial Joinery
- **Filename:** `service-commercial-joinery-materials.jpg`
- **Deploy:** `public/images/services/commercial-joinery-materials.jpg`
- **Prompt:** [Master prompt] Commercial hospitality joinery detail — durable compact laminate service counter edge, commercial-grade adjustable hinge, fire-rated board substrate visible at open service door, stainless kick plate at base. Evening ambient light. Built for heavy use, still refined.

### 7. Custom & Bespoke Furniture
- **Filename:** `service-custom-furniture-materials.jpg`
- **Deploy:** `public/images/services/custom-furniture-materials.jpg`
- **Prompt:** [Master prompt] Bespoke furniture craftsmanship detail — Tasmanian oak table edge with oiled finish showing grain figure, hand-planed chamfer, matching timber sample block on workshop bench beside the piece. Warm workshop light. Celebrates timber species and hand finishing.

### 8. Custom Home Office Joinery
- **Filename:** `service-home-office-joinery-materials.jpg`
- **Deploy:** `public/images/services/home-office-joinery-materials.jpg`
- **Prompt:** [Master prompt] Home office joinery detail — built-in desk cable management tray, grommet with charging cables, drawer with document organiser dividers, mix of 2-pac drawer front and timber desktop edge. Residential study setting blurred behind. Functional WFH craftsmanship.

### 9. Custom Laundry Cabinets
- **Filename:** `service-laundry-cabinets-materials.jpg`
- **Deploy:** `public/images/services/laundry-cabinets-materials.jpg`
- **Prompt:** [Master prompt] Laundry joinery materials detail — HMR white cabinet interior, pull-out hamper drawer on soft-close runners, benchtop over front-loader clearance gap, broom cupboard hook rail with stored mop handle blurred. Bright even utility-room light. Moisture-resistant, practical construction.

### 10. Custom Timber Staircase Joinery
- **Filename:** `service-staircase-joinery-materials.jpg`
- **Deploy:** `public/images/services/staircase-joinery-materials.jpg`
- **Prompt:** [Master prompt] Timber staircase craftsmanship detail — American oak tread nosing profile, closed stringer joint, black metal balustrade fixing bracket, handrail cross-section showing lamination and oil finish. Dramatic skylight side light along grain. Engineering and finish quality visible.

---

## Quality checklist (before handoff)

- [ ] All 10 files saved to `02-services/` with exact filenames above
- [ ] Each image is 1600×1000, 16:10, progressive JPG
- [ ] Each materials shot is visually distinct from its matching `-hero.jpg`
- [ ] Strong texture/contrast (images render desaturated on site)
- [ ] No watermarks, logos, or burned-in text
- [ ] Run `pnpm deploy:images`
- [ ] Hard-refresh service pages — Materials & finishes block shows unique image per service

---

## Reference

| File | Role |
|------|------|
| `docs/pictures/manifest.json` | Deploy map (`dataRef: services.ts materialsImagePath`) |
| `docs/pictures/PERPLEXITY-PHOTOGRAPHER-BRIEF.md` | Full site photographer brief |
| `docs/pictures/PERPLEXITY-HOMEPAGE-BLANK-CARDS-PROMPT.md` | Service **hero** card images |
