# Cursor Prompt — Batch 3, Phase 2: Generate and install 150 images

Prerequisite: Phase 1 is complete. All 30 posts are scheduled or live with placeholders at final dimensions, and alt, title and caption are wired from `images/image-metadata.json`.

**Phase 2 swaps pixels only.** Markup, layout, alt text and schema stay as they are. If Phase 2 needs a template edit, Phase 1 was not finished; fix Phase 1 first.

---

## 1. Style is locked to the live site

Use the same house style as Batch 1 and Batch 2. Full spec: `blog-batch2/images/ART-DIRECTION.md`.

The house style has two families:

- **Workshop documentary:** honey and white-oak cabinetry, raw MDF carcasses on sawhorses, scarred workbench, tool pegboard, red brick, polished concrete, daylight through an open roller door, gum trees beyond.
- **Finished interiors:** cream two-pack, honey-oak veneer, concrete-look and sintered stone benchtops, matte black and brushed brass hardware, linen textures, coastal Australian light.

Batch 3 adds one environment, `outdoor`, for the decking posts: the back of an Australian home, native planting, late-afternoon sun. The palette and constraint blocks are unchanged.

Style references: pass these two live JPEGs into every generation, for style only:

- `https://steepwood.com.au/blog/custom-kitchen-cost-nsw-2026/hero.jpg`
- `https://steepwood.com.au/blog/questions-to-ask-custom-joiner-australia/hero.jpg`

## 2. Prompts

All 150 prompts are ready in `images/IMAGE-PROMPTS.md`, numbered 001–150. Each one is built from six blocks:

1. Subject (= alt text)
2. Environment
3. Region clause
4. Slot composition
5. Palette
6. Constraints

The same prompt text is stored in the `prompt` field of each `images/image-metadata.json` record. To change a subject, edit `scripts/image_data.py` and re-run `python3 scripts/build_image_pack.py`. Never hand-edit the generated files.

Generation sizes:

| Slot | Generate at | Final |
| --- | --- | --- |
| hero, inline-wide | 16:9, 2752×1536 | 1600×1000 |
| og | 16:9, 2752×1536, as its own composition, not a hero crop | 1200×630 |
| inline-01, inline-02 | 4:3, 2400×1792, as a matched pair | 1200×900 |

## 3. Crop, compress and tag

Centre-crop, then downscale. Never upscale.

- hero, inline-wide: crop 2752×1536 → 2458×1536 → resize 1600×1000
- og: crop 2752×1536 → 2752×1445 → resize 1200×630
- inline-01/02: crop 2400×1792 → 2389×1792 → resize 1200×900

Export progressive JPEG. Step quality down from 84 until the file is at or under **400 KB at 1600 px** and **250 KB at 1200 px**.

Strip generator and camera metadata, then write IPTC, EXIF and XMP from `image-metadata.json`:

- title, description, creator, credit, copyright, keywords, city, state and country
- XMP `iptcExt:DigitalSourceType = trainedAlgorithmicMedia`

Batch 2 already has the install script and field mapping: `blog-batch2/images/CURSOR_PROMPT-PHASE2-INSTALL.md`. Reuse it with the Batch 3 metadata file.

## 4. QA: regenerate if any of these appear

- Legible text, numbers, logos or watermarks
- Faces or full figures, or malformed hands
- Impossible joinery, floating carcasses, or warped lines
- A cool blue or fluorescent cast
- American or British fittings
- A split-panel or diptych frame
- An inline-01/02 pair with mismatched light
- An og that looks like a hero crop
- A CGI look
- On decking images: an elevated deck with no balustrade where the height clearly needs one

For comparison subjects (the decking species images and composite vs timber), keep the single-frame constraint in the prompt. It is already in the constraint block.

## 5. Install

1. Replace the placeholders at `public/blog/{slug}/{slot}.jpg`, keeping the filenames.
2. Check that the dimensions match exactly and the files are within budget.
3. Purge the image CDN cache, or bump the image version query if the site uses one.
4. Add the Batch 3 images to `sitemap-images.xml` if Batch 2 created one.
5. Run a link-preview check on five OG cards.
6. Run Lighthouse on three posts and confirm LCP has not regressed against Batch 2 posts.

## 6. Owner confirmation

These are generated illustrations, not photos of SteepWood jobs. Each caption says "Illustrative image" and every file declares `trainedAlgorithmicMedia`. Do not caption any image as a named client, address or completed SteepWood project. If the owner supplies real project photos, they replace the generated image for that slot, and the caption drops "Illustrative".

## 7. Report

Report back with:

- the count generated and the count regenerated, with reasons
- file size range by slot
- Lighthouse LCP before and after
- any slots left on placeholders
