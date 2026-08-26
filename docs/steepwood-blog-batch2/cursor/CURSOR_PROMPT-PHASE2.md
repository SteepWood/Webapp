# Cursor Prompt — Phase 2: Generate and ship the 150 images

Prerequisite: Phase 1 is complete and accepted. All 30 posts are live or scheduled, all five placeholder slots per post exist at final dimensions, alt text is already wired from `research/RESEARCH-{slug}.md`, and `scripts/blog-image-manifest.json` is populated.

**Phase 2 is a pixel swap.** No markup changes, no layout changes, no alt-text changes, no schema changes beyond the `caption` field already sourced from alt text. If Phase 2 requires a template edit, something in Phase 1 was incomplete — fix Phase 1 first.

---

## 1. Art direction

The images must look like they were taken in this business, not licensed from a library. The site is warm, restrained and material-led. Anything glossy, blue-toned, American or obviously synthetic will read as fake and undercut the trust the copy is built on.

**Locked palette and light**

| Attribute | Direction |
| --- | --- |
| Base tones | Warm linen `#F7F1E8`, deep ink `#1F1610`, dark espresso timber, muted amber accent |
| Light | Soft, directional Australian daylight. Late morning or mid afternoon. Visible warmth, no cool cast |
| White balance | Warm, 4800–5400K feel. Never blue, never clinical |
| Contrast | Medium. Shadows retain detail. No crushed blacks, no blown highlights |
| Depth of field | Shallow to medium on detail shots, deeper on room shots. Never a heavy fake bokeh |
| Grain | Very light film grain acceptable. No HDR, no glow, no vignette |
| Aspect discipline | Compose for the exact slot ratio. Do not generate square and crop |

**Materials that belong in frame**

Australian hardwoods — Spotted Gum, Blackbutt, Tasmanian Oak — American White Oak, two-pack painted cabinetry in warm off-whites and muted greens, timber veneer, brushed brass and matte black hardware, porcelain and sintered stone benchtops, linen, terracotta, ceramic.

**Never in frame**

- People's faces. Hands at work are fine and preferred. No identifiable faces, no invented staff, no fake tradespeople in branded shirts.
- Any logo, brand name, licence number, price, or readable text of any kind. Text in generated images is unreliable and a wrong licence number is a compliance problem.
- North American or United Kingdom architectural cues: basements, brick chimneys with pots, sash windows with deep reveals, drywall corner beads, American power outlets, imperial tape measures.
- Engineered stone being dry-cut. It is prohibited product and depicting unsafe silica practice is indefensible for a licensed operator.
- Clutter, stock-photo styling, fruit bowls with three lemons, kitchens with nothing in them and a single orchid.
- Watermarks, borders, frames, collages, split screens.

**Negative prompt, use on every generation**

```
text, letters, words, numbers, logo, watermark, signature, brand name, price tag,
human face, portrait, people looking at camera, deformed hands, extra fingers,
american kitchen, uk kitchen, basement, drywall corner bead, imperial ruler,
cool blue lighting, fluorescent lighting, hdr, oversaturated, glossy plastic,
cgi render look, 3d render, cartoon, illustration, collage, split screen, border,
frame, vignette, lens flare, cluttered, messy, low resolution, blurry, distorted
perspective, warped straight lines, crooked cabinetry, impossible joinery
```

---

## 2. Slot-by-slot direction

| Slot | Dimensions | Composition |
| --- | --- | --- |
| `hero` | 1600 × 1000 | The establishing shot. Room or full-assembly context. Generous negative space in the upper left third where the title band sits. Wide framing, eye level or slightly below |
| `og` | 1200 × 630 | The same subject, reframed for a link card. Tighter, higher contrast, one clear focal object, readable as a thumbnail at 300 px wide. Do not reuse the hero crop |
| `inline-01` | 1200 × 900 | Detail or material shot. Close on a joint, a drawer box, a hardware action, a finish sample, a benchtop edge. Hands acceptable |
| `inline-02` | 1200 × 900 | The counterpart to `inline-01`, forming a coherent pair in the two-up grid. Same lighting, same scene family, different subject or angle. If `inline-01` is a detail, `inline-02` is the same detail in context |
| `inline-wide` | 1600 × 1000 | The payoff shot, placed after the FAQ. Finished, installed, lived-in. Slightly warmer and softer than the hero |

`inline-01` and `inline-02` sit side by side. They must be shot as a pair — matched light, matched white balance, matched tone. A cool detail shot beside a warm one is the most visible failure mode in the whole set.

---

## 3. Prompt formula

Build every prompt from the alt text already in `research/RESEARCH-{slug}.md`. The alt text was written to describe a real photographable scene, so it is the subject line.

```
{ALT_TEXT_SUBJECT}, photographed in a working Australian custom joinery
workshop in Newcastle New South Wales / installed in an Australian home in
{LOCATION_CONTEXT}, {SLOT_COMPOSITION}, soft directional Australian daylight,
warm linen and deep ink palette, {MATERIALS}, natural materials, medium
contrast, editorial interiors photography, shot on a full frame camera with a
{35mm|50mm|85mm} lens, {ASPECT} aspect ratio, photorealistic, no text
```

Lens guide: 35 mm for `hero` and `inline-wide`, 50 mm for `og`, 85 mm for detail shots.

### Three worked examples

**`laundry-joinery-cost-nsw` / hero, 1600 × 1000**

```
A completed custom laundry with full-height cabinetry, a stone benchtop over a
front loader, and open shelving with folded linen, installed in a renovated
Australian home, wide establishing shot at eye level with generous empty wall
space in the upper left third, soft directional late-morning Australian
daylight from a side window, warm linen and deep ink palette, two-pack painted
cabinetry in a warm off-white with matte black handles, medium contrast,
editorial interiors photography, 35mm lens, 8:5 aspect ratio, photorealistic,
no text
```

**`blum-hardware-cost-australia` / inline-01, 1200 × 900**

```
Close detail of a soft-close drawer runner and drawer box being fitted into a
cabinet carcass, one pair of hands guiding the drawer onto the runner, brushed
metal against warm timber, shallow depth of field, soft directional Australian
daylight in a joinery workshop, warm linen and deep ink palette, medium
contrast, editorial product-detail photography, 85mm lens, 4:3 aspect ratio,
photorealistic, no text, no faces
```

**`joinery-cost-guide-northern-beaches` / inline-wide, 1600 × 1000**

```
A finished open-plan kitchen with a large island and a porcelain benchtop in a
coastal Australian home, glazed doors open to a deck with muted coastal
planting beyond, lived-in and warm with a linen tea towel and a ceramic bowl on
the bench, soft warm afternoon light, warm linen and deep ink palette, timber
veneer and warm off-white two-pack cabinetry, brushed brass tapware, medium
contrast, editorial interiors photography, 35mm lens, 8:5 aspect ratio,
photorealistic, no text, no people
```

### Location context by post

Location posts must look like their region. This is what stops eleven location articles sharing one generic kitchen.

| Posts | Visual context |
| --- | --- |
| 20 Newcastle and Hunter | Federation and interwar interiors, Cooks Hill and Merewether character, harbour light, weatherboard and brick |
| 21 Central Coast | Fibro beach cottage and 1970s brick veneer, casual coastal, hardwearing surfaces |
| 22 Wollongong and Illawarra | Escarpment outlook, split-level interiors, weatherboard and postwar brick |
| 23 Northern Beaches | Bright coastal, indoor-outdoor, generous glazing, pale timber and stone |
| 24 Eastern Suburbs | Victorian terrace and art deco apartment interiors, narrow rooms, high ceilings, ornate cornices |
| 25 North Shore | Large Federation and interwar houses, leafy outlook, libraries and staircases, deeper timber tones |
| 26 Inner West | Narrow terrace, galley kitchen, brick side wall, rear-extension light |
| 27 Apartments | Compact urban interiors, concrete and plaster, integrated joinery, city light |
| 28 Highlands and Hunter Valley | Cool-climate country interiors, mudrooms, hearths, rural outlook, heavier timber |
| 29 Regional NSW | Country town homes, wide verandahs, generous rooms, dry inland light |
| 30 Growth corridors | New project-home interiors, plasterboard-fresh, butler's pantry, contemporary and clean |

---

## 4. Generation and processing

1. Generate a **shortlist of three candidates per slot**, not one. Pick by hand. 150 slots means roughly 450 generations.
2. Check each candidate for the failure modes in §5 before accepting it.
3. Post-process every accepted image identically so the set is visually coherent:
   - Resize to exact slot dimensions with a high-quality Lanczos resample.
   - Very slight warm bias if the generation drifted cool. Do not push it into orange.
   - Export progressive JPEG, quality 82, mozjpeg. Target under 400 KB for the 1600 px files and under 250 KB for the rest.
   - Strip all EXIF and any generator metadata.
4. Also emit a WebP or AVIF sibling if the template already serves modern formats. Match the existing convention; do not introduce a new one.

```js
// scripts/process-blog-images.mjs — run over the accepted candidates
import sharp from "sharp";
const SIZES = {
  hero: [1600, 1000],
  og: [1200, 630],
  "inline-01": [1200, 900],
  "inline-02": [1200, 900],
  "inline-wide": [1600, 1000],
};
// for each accepted file:
//   sharp(src)
//     .resize(w, h, { fit: "cover", position: "centre", kernel: "lanczos3" })
//     .jpeg({ quality: 82, mozjpeg: true, progressive: true })
//     .withMetadata({})            // strips EXIF
//     .toFile(dest)
```

Overwrite the Phase 1 placeholders in place at `/public/blog/{slug}/{slot}.jpg`. Same paths, same filenames. Nothing else changes.

---

## 5. Reject any image showing these

Check every single image. These are the failures that get shipped by accident.

- Any legible text, number or logo, including on a benchtop sample or a tool
- An identifiable human face
- Malformed hands, extra fingers, or a hand passing through an object
- Cabinetry with impossible geometry: doors that could not open, drawers behind a panel, a benchtop floating unsupported, mitres that do not meet
- Warped or bowed lines where cabinetry should be straight — the most common giveaway
- A cool or blue cast, or lighting that does not match the rest of the set
- North American or United Kingdom fittings, outlets or architectural details
- A kitchen or laundry that does not match the article's subject. A laundry article must show a laundry
- `inline-01` and `inline-02` that clearly come from different scenes or different light
- `og` that is an obvious crop of `hero`
- Visible tiling, duplication or repeated pattern artefacts in timber grain

---

## 6. Alt text and captions

Alt text was wired in Phase 1 and **must not change**. It was written to match the described scene, so the generation was directed by it. If an accepted image genuinely diverges from its alt text, regenerate the image rather than rewrite the alt text — the alt text is the SEO asset and it is already in the schema `caption` field.

Two checks:

- Every `<img>` and `next/image` has non-empty alt text, and it is the text from `research/RESEARCH-{slug}.md`.
- The `hero` alt text matches the `image.caption` value in the JSON-LD graph, per `cursor/SCHEMA-SPEC.md` §3.

---

## 7. Acceptance checklist

- [ ] 150 images replaced, five per slug, 30 slugs, all at exact specified dimensions
- [ ] No placeholder remains anywhere under `/public/blog/`
- [ ] Every image passes the §5 reject list
- [ ] `inline-01` and `inline-02` read as a matched pair on every post
- [ ] `og` is a distinct composition from `hero` on every post
- [ ] All eleven location posts look regionally distinct per the §3 context table
- [ ] File sizes within target; total added weight to the repository reported
- [ ] EXIF and generator metadata stripped
- [ ] Modern-format siblings emitted only if the template already serves them
- [ ] Lighthouse performance on six sampled posts is no worse than before Phase 2, and largest contentful paint has not regressed
- [ ] Cumulative layout shift is still zero, confirming the Phase 1 dimensions were correct
- [ ] OG cards preview correctly for six sampled posts in a link-preview tool
- [ ] Alt text unchanged from Phase 1 on all 150 images
- [ ] Schema `image.caption` still matches hero alt text
- [ ] No template, markup, schema or content file changed in this phase other than image files and the processing script

## 8. Report

Return: the model or service used, total generations against accepted images, any slot that needed more than five attempts and why, total added repository weight, before-and-after Lighthouse and largest-contentful-paint figures for the sampled posts, and any post where the art direction had to be varied along with the reason.
