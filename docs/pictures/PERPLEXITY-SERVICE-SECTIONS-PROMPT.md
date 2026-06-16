# SteepWood — Service page section images (generation prompt)

**Purpose:** Generate bespoke images for every **text-only section** on service pillar pages (`/custom-kitchen-joinery/`, etc.) and service+location combo pages. Each service needs **11 images** beyond the existing hero and materials shots.

**Output root:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\02-services\
```

**After generation:**
```bash
pnpm deploy:images
```

Then update `src/lib/services-locations/serviceImages.ts` to prefer the new bespoke paths (developer step after zip handoff).

---

## Master prompt (prepend to every shot)

> Photorealistic editorial photograph for a premium Australian custom joinery brand called **SteepWood**, based in **Newcastle NSW**. Warm natural light, shallow depth of field where appropriate, true-to-life colours. Dominant materials: **American oak, walnut, Tasmanian oak, Spotted Gum**, 2-pac painted shaker profiles, **Caesarstone** benchtops, **Blum** soft-close hardware. Interiors feel high-end but lived-in — Australian residential or commercial, not European luxury hotel. Colour palette harmony: warm ink browns (#1f1610–#453528), natural oak (#8b6b47), linen paper tones (#f7f1e8). No watermarks, no logos, no text burned into the image. No fisheye distortion. Shot on a full-frame camera, 35mm or 50mm equivalent. **Australian English context** — power points, tapware, and proportions should feel Australian.

---

## Technical spec

| Field | Value |
|-------|-------|
| **Export size** | 1600 × 1000 px |
| **Aspect ratio** | 16:10 |
| **Format** | Progressive JPEG, quality 88, sRGB |
| **Deploy path** | `public/images/services/{slug}-{variant}.jpg` |

### Variants per service (11 files)

| Variant | Used on page for |
|---------|------------------|
| `what-is` | “What is {service}?” section |
| `section-01` … `section-06` | “What’s included” cards + matching body sections (same image per index) |
| `process-01` … `process-04` | Four-step process columns |

**Naming:** `service-{slug}-{variant}.jpg`

**Uniqueness rule:** Every file must differ from that service’s `-hero.jpg` and `-materials.jpg`.

---

## Batch checklist — 110 images total (11 × 10 services)

Generate all files for each service below. Prompts describe the **subject** — prepend [Master prompt] to each.

### 1. Custom Kitchen Joinery (`custom-kitchen-joinery`)

| Filename | Prompt subject |
|----------|----------------|
| `service-custom-kitchen-joinery-what-is.jpg` | Wide Hamptons kitchen in use — family breakfast scene blur, island and shaker cabinetry hero |
| `service-custom-kitchen-joinery-section-01.jpg` | Floor-to-ceiling kitchen cabinetry run, full wall of storage |
| `service-custom-kitchen-joinery-section-02.jpg` | Caesarstone island waterfall edge close-up |
| `service-custom-kitchen-joinery-section-03.jpg` | Co-ordinated tile or stone splashback behind cooktop |
| `service-custom-kitchen-joinery-section-04.jpg` | Blum soft-close drawer and pull-out pantry interior |
| `service-custom-kitchen-joinery-section-05.jpg` | Integrated oven and dishwasher in painted cabinetry |
| `service-custom-kitchen-joinery-section-06.jpg` | Install team fitting final cabinet panel on site |
| `service-custom-kitchen-joinery-process-01.jpg` | Designer with client reviewing kitchen plans at dining table |
| `service-custom-kitchen-joinery-process-02.jpg` | 3D kitchen render on laptop beside material samples |
| `service-custom-kitchen-joinery-process-03.jpg` | CNC cutting kitchen panels in Newcastle workshop |
| `service-custom-kitchen-joinery-process-04.jpg` | Kitchen install in progress — cabinets on walls, protective floor covering |

### 2. Built-In Wardrobes (`built-in-wardrobes`)

| Filename | Prompt subject |
|----------|----------------|
| `service-built-in-wardrobes-what-is.jpg` | Master bedroom with full wall of built-in wardrobe, neutral styling |
| `service-built-in-wardrobes-section-01.jpg` | Hinged wardrobe doors open showing hanging and shelving zones |
| `service-built-in-wardrobes-section-02.jpg` | Sliding wardrobe doors on floor-to-ceiling track |
| `service-built-in-wardrobes-section-03.jpg` | Walk-in robe entry with island bench and mirror |
| `service-built-in-wardrobes-section-04.jpg` | Soft-close drawer stacks with dividers for folded clothes |
| `service-built-in-wardrobes-section-05.jpg` | Full-height mirror panel integrated in wardrobe door |
| `service-built-in-wardrobes-section-06.jpg` | LED strip lighting inside wardrobe interior |
| `service-built-in-wardrobes-process-01.jpg` | In-home wardrobe consultation with tape measure |
| `service-built-in-wardrobes-process-02.jpg` | Wardrobe elevation drawing and finish samples on desk |
| `service-built-in-wardrobes-process-03.jpg` | Wardrobe carcass assembly on workshop bench |
| `service-built-in-wardrobes-process-04.jpg` | Wardrobe install — doors being hung on bedroom wall |

### 3. Office Fitout (`office-fitout`)

| Filename | Prompt subject |
|----------|----------------|
| `service-office-fitout-what-is.jpg` | Modern open-plan office with custom joinery visible throughout |
| `service-office-fitout-section-01.jpg` | Reception desk with brand timber slat feature |
| `service-office-fitout-section-02.jpg` | Staff breakout kitchenette and credenza |
| `service-office-fitout-section-03.jpg` | Boardroom credenza with integrated AV storage |
| `service-office-fitout-section-04.jpg` | Acoustic partition wall with joinery integration |
| `service-office-fitout-section-05.jpg` | Floor-to-ceiling office storage wall |
| `service-office-fitout-section-06.jpg` | Project manager reviewing fitout programme on site |
| `service-office-fitout-process-01.jpg` | Workplace strategy workshop with floor plan |
| `service-office-fitout-process-02.jpg` | Office joinery shop drawings spread on table |
| `service-office-fitout-process-03.jpg` | Commercial panels being edge-banded in workshop |
| `service-office-fitout-process-04.jpg` | After-hours office fitout install — reception desk placement |

### 4. Shopfitting (`shopfitting`)

| Filename | Prompt subject |
|----------|----------------|
| `service-shopfitting-what-is.jpg` | Completed boutique retail interior — customer browsing |
| `service-shopfitting-section-01.jpg` | Illuminated display shelving with product styling |
| `service-shopfitting-section-02.jpg` | Cash desk and transaction counter joinery |
| `service-shopfitting-section-03.jpg` | Fitting room joinery with curtain and hooks |
| `service-shopfitting-section-04.jpg` | Pharmacy dispensary counter with durable laminate |
| `service-shopfitting-section-05.jpg` | Café service counter and display case |
| `service-shopfitting-section-06.jpg` | Retail install night work — shopfront joinery |
| `service-shopfitting-process-01.jpg` | Retail concept sketch with brand mood board |
| `service-shopfitting-process-02.jpg` | Landlord approval drawings for shopfront |
| `service-shopfitting-process-03.jpg` | CNC-routed MDF retail profiles in workshop |
| `service-shopfitting-process-04.jpg` | Store handover — final styling on display shelves |

### 5. Custom Bathroom Vanity (`custom-bathroom-vanity`)

| Filename | Prompt subject |
|----------|----------------|
| `service-custom-bathroom-vanity-what-is.jpg` | Completed premium bathroom with double vanity |
| `service-custom-bathroom-vanity-section-01.jpg` | Wall-hung single vanity with stone top |
| `service-custom-bathroom-vanity-section-02.jpg` | Double bowl vanity with centre drawer bank |
| `service-custom-bathroom-vanity-section-03.jpg` | Freestanding vanity on legs with timber top |
| `service-custom-bathroom-vanity-section-04.jpg` | HMR cabinet interior — moisture-resistant carcass |
| `service-custom-bathroom-vanity-section-05.jpg` | Integrated shaver cabinet with mirrored door |
| `service-custom-bathroom-vanity-section-06.jpg` | Vanity install — levelling wall-hung cabinet |
| `service-custom-bathroom-vanity-process-01.jpg` | Bathroom measure visit with vanity elevation |
| `service-custom-bathroom-vanity-process-02.jpg` | Vanity design render beside stone samples |
| `service-custom-bathroom-vanity-process-03.jpg` | Vanity carcass construction with sealed edges |
| `service-custom-bathroom-vanity-process-04.jpg` | Plumber and joiner co-ordinating basin install |

### 6. Commercial Joinery (`commercial-joinery`)

| Filename | Prompt subject |
|----------|----------------|
| `service-commercial-joinery-what-is.jpg` | Hospitality venue with visible commercial joinery throughout |
| `service-commercial-joinery-section-01.jpg` | Reception and concierge joinery |
| `service-commercial-joinery-section-02.jpg` | Commercial kitchen back-of-house cabinetry |
| `service-commercial-joinery-section-03.jpg` | Healthcare waiting room joinery — durable surfaces |
| `service-commercial-joinery-section-04.jpg` | Education staffroom storage and bench joinery |
| `service-commercial-joinery-section-05.jpg` | Retail service counter with transaction height |
| `service-commercial-joinery-section-06.jpg` | Fire-rated board documentation beside cabinet sample |
| `service-commercial-joinery-process-01.jpg` | Commercial brief meeting with architect |
| `service-commercial-joinery-process-02.jpg` | Shop drawings for commercial certification |
| `service-commercial-joinery-process-03.jpg` | Commercial batch production on workshop floor |
| `service-commercial-joinery-process-04.jpg` | Commercial install — bar joinery modules being fixed |

### 7. Custom Furniture (`custom-furniture`)

| Filename | Prompt subject |
|----------|----------------|
| `service-custom-furniture-what-is.jpg` | Dining room with bespoke table and sideboard ensemble |
| `service-custom-furniture-section-01.jpg` | Tasmanian oak dining table — grain and edge detail |
| `service-custom-furniture-section-02.jpg` | Entertainment unit with integrated cable management |
| `service-custom-furniture-section-03.jpg` | Upholstered bedhead with timber frame |
| `service-custom-furniture-section-04.jpg` | Floor-to-ceiling bookshelf wall |
| `service-custom-furniture-section-05.jpg` | Console table in hallway with mirror above |
| `service-custom-furniture-section-06.jpg` | Furniture piece being oiled in workshop |
| `service-custom-furniture-process-01.jpg` | Client reviewing furniture sketches and timber samples |
| `service-custom-furniture-process-02.jpg` | Workshop mock-up of table leg profile |
| `service-custom-furniture-process-03.jpg` | Table top glue-up and clamping |
| `service-custom-furniture-process-04.jpg` | White-glove furniture delivery into dining room |

### 8. Home Office Joinery (`home-office-joinery`)

| Filename | Prompt subject |
|----------|----------------|
| `service-home-office-joinery-what-is.jpg` | Built-in home office wall with desk and shelving |
| `service-home-office-joinery-section-01.jpg` | Wall-to-wall desk with overhead cabinets |
| `service-home-office-joinery-section-02.jpg` | Study nook with integrated seat and desk |
| `service-home-office-joinery-section-03.jpg` | Library wall with ladder rail and adjustable shelves |
| `service-home-office-joinery-section-04.jpg` | Cable grommet and power integration in desk |
| `service-home-office-joinery-section-05.jpg` | Printer and filing drawer bank in office joinery |
| `service-home-office-joinery-section-06.jpg` | Two-person home office desk with privacy divider |
| `service-home-office-joinery-process-01.jpg` | Measuring study alcove for built-in desk |
| `service-home-office-joinery-process-02.jpg` | Home office 3D render on screen |
| `service-home-office-joinery-process-03.jpg` | Office cabinetry flat-pack for delivery |
| `service-home-office-joinery-process-04.jpg` | Desk top being scribed to uneven wall |

### 9. Laundry Cabinets (`laundry-cabinets`)

| Filename | Prompt subject |
|----------|----------------|
| `service-laundry-cabinets-what-is.jpg` | Complete Australian laundry room with full joinery |
| `service-laundry-cabinets-section-01.jpg` | Overhead laundry cabinets to ceiling |
| `service-laundry-cabinets-section-02.jpg` | Bench over front-loader washer and dryer |
| `service-laundry-cabinets-section-03.jpg` | Tall broom and mop cupboard with hooks |
| `service-laundry-cabinets-section-04.jpg` | Pull-out hamper drawer in laundry base cabinet |
| `service-laundry-cabinets-section-05.jpg` | Butler's pantry adjoining kitchen — storage wall |
| `service-laundry-cabinets-section-06.jpg` | HMR white interior — easy-wipe utility finish |
| `service-laundry-cabinets-process-01.jpg` | Laundry measure with appliance dimensions noted |
| `service-laundry-cabinets-process-02.jpg` | Laundry elevation with hamper and bench heights |
| `service-laundry-cabinets-process-03.jpg` | Laundry cabinet assembly with moisture-sealed edges |
| `service-laundry-cabinets-process-04.jpg` | Laundry install — benchtop fitted over appliances |

### 10. Staircase Joinery (`staircase-joinery`)

| Filename | Prompt subject |
|----------|----------------|
| `service-staircase-joinery-what-is.jpg` | Dramatic American oak staircase in double-height void |
| `service-staircase-joinery-section-01.jpg` | Straight timber staircase with closed stringer |
| `service-staircase-joinery-section-02.jpg` | Floating timber treads with glass balustrade |
| `service-staircase-joinery-section-03.jpg` | Curved or winding timber staircase plan view |
| `service-staircase-joinery-section-04.jpg` | Handrail profile and baluster fixing detail |
| `service-staircase-joinery-section-05.jpg` | Under-stair storage joinery with hinged access |
| `service-staircase-joinery-section-06.jpg` | Staircase engineering drawing beside timber sample |
| `service-staircase-joinery-process-01.jpg` | Site measure of stair void with laser level |
| `service-staircase-joinery-process-02.jpg` | Staircase 3D model and NCC compliance notes |
| `service-staircase-joinery-process-03.jpg` | Tread and riser components in workshop |
| `service-staircase-joinery-process-04.jpg` | Staircase install — handrail being fixed |

---

## Zip handoff

Package all 110 JPGs preserving filenames. Suggested zip name:

```
steepwood-service-sections.zip
```

Place in:
```
docs/pictures/steepwood-p1-p2-images/02-services/
```

Extract, then run `pnpm deploy:images`.

---

## Reference

| File | Role |
|------|------|
| `src/lib/services-locations/serviceImages.ts` | Runtime image resolution (update after deploy) |
| `docs/pictures/manifest.json` | Deploy map |
| `docs/pictures/PERPLEXITY-SERVICE-MATERIALS-PROMPT.md` | Materials block images (already done) |
