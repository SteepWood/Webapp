# Cursor Prompt — Batch 4, Phase 2: Generate and install 50 photorealistic images

Prerequisite: Phase 1 is live. All 10 posts show placeholders at final dimensions, and alt, title and caption are wired from `images/image-metadata.json`.

**Phase 2 swaps pixels only.** Markup, layout, alt text and schema stay as they are. If Phase 2 needs a template edit, Phase 1 was not finished; fix Phase 1 first.

---

## 1. Style is locked to the live site, with stronger realism

Use the same house style as Batches 1–3. Full spec: `blog-batch2/images/ART-DIRECTION.md`.

- **Workshop documentary:** honey and white-oak cabinetry, raw carcasses on sawhorses, scarred workbench, red brick, polished concrete, daylight through a roller door.
- **Finished interiors:** cream two-pack, honey-oak veneer, concrete-look and sintered stone benchtops, matte black and brushed brass hardware, linen textures, warm Australian light.

**Batch 4 realism rule:** every image must look like a real photograph. The constraint block now opens with: true photograph, full-frame digital camera, prime lens, natural available light, true-to-life materials with real wood grain and slight imperfections, accurate scale, documentary realism. Reject anything that looks rendered, plastic, over-smooth or over-saturated.

New in Batch 4:

- Environment `industrial` for the warehouse post (tilt-up concrete, steel portal frame, polished concrete, roller-door light).
- Region clauses for `parramatta`, `western-sydney`, `lake-macquarie` and `hunter`.

Style references, style only, on every generation:

- `https://steepwood.com.au/blog/custom-kitchen-cost-nsw-2026/hero.jpg`
- `https://steepwood.com.au/blog/questions-to-ask-custom-joiner-australia/hero.jpg`

## 2. Prompts

All 50 prompts are in `images/IMAGE-PROMPTS.md`, numbered 001–050. Each is built from six blocks: Subject (= alt text), Environment, Region clause, Slot composition, Palette, Constraints. The same text is in the `prompt` field of each `images/image-metadata.json` record. To change a subject, edit `scripts/image_data.py` and re-run `python3 scripts/build_image_pack.py`. Never hand-edit generated files.

| Slot | Generate at | Final |
| --- | --- | --- |
| hero, inline-wide | 16:9, 2752×1536 | 1600×1000 |
| og | 16:9, 2752×1536, its own composition, not a hero crop | 1200×630 |
| inline-01, inline-02 | 4:3, 2400×1792, as a matched pair | 1200×900 |

## 3. Crop, compress and tag

Centre-crop, then downscale. Never upscale.

- hero, inline-wide: 2752×1536 → 2458×1536 → 1600×1000
- og: 2752×1536 → 2752×1445 → 1200×630
- inline-01/02: 2400×1792 → 2389×1792 → 1200×900

Progressive JPEG. Step quality down from 84 until at or under **400 KB at 1600 px** and **250 KB at 1200 px**.

Strip generator and camera metadata, then write IPTC, EXIF and XMP from `image-metadata.json` (title, description, creator, credit, copyright, keywords, city, state, country, `iptcExt:DigitalSourceType = trainedAlgorithmicMedia`). Reuse the Batch 2 and 3 install script (`blog-batch2/images/CURSOR_PROMPT-PHASE2-INSTALL.md`) with the Batch 4 metadata file.

## 4. QA: regenerate if any of these appear

- Any CGI, 3D-render, plastic or over-smoothed look
- Legible text, numbers, logos, signage or watermarks (pharmacy and restaurant scenes are high risk; shelves and menus must show no readable text)
- Faces or full figures, or malformed hands
- Children of any kind in the childcare images (empty rooms only)
- Impossible joinery, floating carcasses, warped lines
- A cool blue or fluorescent cast
- American or British fittings or architecture
- Split-panel or diptych frames
- An inline-01/02 pair with mismatched light
- An og that looks like a hero crop
- Decking: an elevated deck with no balustrade where the height clearly needs one
- Warehouse: a mezzanine with no balustrade or stair handrail

## 5. Install

1. Replace placeholders at `public/blog/{slug}/{slot}.jpg`, same filenames.
2. Check exact dimensions and file budgets.
3. Purge the image CDN cache or bump the image version query.
4. Add images to `sitemap-images.xml` if it exists.
5. Commit and push to `main`; Vercel deploys. Confirm the production deployment is Ready.
6. Link-preview check on five OG cards. Lighthouse on three posts: LCP not worse than Batch 3 posts.

## 6. Owner note

These are generated illustrations, not photos of SteepWood jobs. Captions say "Illustrative image" and files declare `trainedAlgorithmicMedia`. Never caption an image as a named client, address or completed SteepWood project. Real project photos from the owner replace the generated image for that slot, and that caption drops "Illustrative".

## 7. Report

- Count generated and regenerated, with reasons
- File size range by slot
- Lighthouse LCP before and after
- Any slots left on placeholders
