#!/usr/bin/env python3
"""Build the Batch 3 image prompt pack, metadata JSON, manifest and alt-text table.

Outputs:
  images/IMAGE-PROMPTS.md          150 prompts (six-block architecture)
  images/image-metadata.json       150 SEO metadata records (Batch 2 contract)
  images/blog-image-manifest.json  slug -> slot -> subject (Phase 1 placeholders + Phase 2 input)
  research/IMAGE-ALT-TEXT.md       alt / title / caption table
"""
import json, pathlib, yaml, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from image_data import POSTS

ROOT = pathlib.Path(__file__).resolve().parent.parent
SLOTS = [("hero", 1600, 1000, "16:9"), ("og", 1200, 630, "16:9"),
         ("inline-01", 1200, 900, "4:3"), ("inline-02", 1200, 900, "4:3"),
         ("inline-wide", 1600, 1000, "16:9")]

ENV = {
 "workshop": "photographed inside a working Australian custom joinery workshop in Newcastle New South Wales, scarred timber workbench, tool pegboard, red brick and polished concrete, soft daylight through an open roller door with gum trees beyond",
 "home": "installed in a lived-in Australian home, plastered walls, timber floors, soft side light from a window",
 "site": "on an Australian residential renovation site mid-installation, floor protection down, clean and organised, soft daylight from a window",
 "commercial": "installed in an Australian commercial tenancy, clean finished interior, natural daylight mixed with warm interior lighting",
 "outdoor": "built at the rear of an Australian home in New South Wales, natural garden and native planting beyond, soft late-afternoon Australian sun",
}
REGION = {
 "newcastle": "the setting reads as Newcastle NSW: Federation red brick, timber verandah details, coastal Hunter light",
 "central-coast": "the setting reads as the NSW Central Coast: low-set fibro or rendered coastal home, spotted gums and bushland, bright coastal light",
 "sydney": "the setting reads as Sydney: Victorian terrace or modern apartment proportions, sandstone or face brick, filtered city light",
}
SLOT_RULE = {
 "hero": "wide establishing shot at eye level, subject in the right two-thirds, quiet negative space in the upper left for the dark espresso title band, 35mm lens, deep focus, generous margin on all four edges, 16:9",
 "og": "one clear focal subject centred, slightly higher contrast so it reads at thumbnail size, 50mm lens, everything important inside the central 80 percent, composed separately from the hero, 16:9",
 "inline-01": "close detail, shallow depth of field, 85mm lens, raking side light to show material texture, 4:3",
 "inline-02": "medium detail from the same scene as inline-01 with identical lighting direction and white balance so the pair reads as one shoot, 50mm lens, 4:3",
 "inline-wide": "wide finished payoff, warmer and softer than the hero, whole assembly visible in its space, 35mm lens, 16:9",
}
PALETTE = "warm natural Australian daylight, honey-toned white oak and blackbutt timber, soft cream two-pack cabinetry, pale concrete-look and sintered stone benchtops, matte black and brushed brass hardware, linen and ceramic accents, medium contrast with open detailed shadows, warm white balance"
CONSTRAINTS = "photorealistic editorial architectural photography, real Australian joinery, no people's faces and no full figures, hands only where hands are described, absolutely no text, letters, numbers, labels, signage, logos, brand names or watermarks anywhere in the frame, straight true cabinetry lines with no bowing or warping, physically plausible joinery and hardware, no American or British fittings or architecture, no cool blue or fluorescent cast, no HDR, no lens flare, no vignette, no fake bokeh balls, no CGI or 3D render look, no stock-photo styling, no clutter, one single continuous photograph in one unbroken frame: no split panels, no diptych, no triptych, no collage, no grid, no internal borders or dividing lines"

def fm(slug):
    t = (ROOT / "posts" / f"{slug}.md").read_text()
    return yaml.safe_load(t.split("---")[1])

prompts, meta, manifest, alt_rows = [], [], {}, []
n = 0
for slug, (env, region, city, subjects) in POSTS.items():
    f = fm(slug)
    subjects = list(subjects)
    subjects[0] = f["hero"]["alt"]  # hero alt must match frontmatter exactly
    assert len(set(subjects)) == 5, slug
    manifest[slug] = {}
    prompts.append(f"\n## {slug}\n\nTitle: {f['title']}  \nPrimary keyword: {f['primaryKeyword']}  \nEnvironment: `{env}`  \nRegion clause: `{region or 'none'}`\n")
    for (slot, w, h, ar), subj in zip(SLOTS, subjects):
        n += 1
        blocks = [subj, ENV[env]]
        if region: blocks.append(REGION[region])
        blocks += [SLOT_RULE[slot], PALETTE, CONSTRAINTS]
        prompt = ", ".join(blocks)
        prompts.append(f"### {n:03d} · {slot} · {w}×{h}\n\n```\n{prompt}\n```\n")
        manifest[slug][slot] = subj
        kw = f["primaryKeyword"]
        caption = f"{subj}. Illustrative image from SteepWood's guide: {f['title']}."
        rec = {
          "n": n, "slug": slug, "slot": slot, "file": f"{slot}.jpg",
          "path": f"public/blog/{slug}/{slot}.jpg",
          "url": f"https://steepwood.com.au/blog/{slug}/{slot}.jpg",
          "page_url": f"https://steepwood.com.au/blog/{slug}",
          "width": w, "height": h, "aspect_generated": ar,
          "alt": subj,
          "title_attr": f"{kw} — SteepWood custom joinery",
          "caption": caption,
          "description": f"{subj}. Illustrative image accompanying SteepWood's guide to {kw}, prepared by SteepWood, a custom joinery workshop in Newcastle New South Wales.",
          "keywords": list(dict.fromkeys([kw, city, "New South Wales", *f.get("secondaryKeywords", [])[:3], slot.replace('-', ' '), "SteepWood", "custom joinery", "Newcastle NSW joinery workshop"])),
          "creator": "SteepWood", "credit": "SteepWood (Pavit Cabinetry Pty Ltd t/as SteepWood)",
          "copyright": "Copyright SteepWood. All rights reserved.", "rights_url": "https://steepwood.com.au/",
          "city": city, "state": "New South Wales", "country": "Australia", "country_code": "AUS",
          "digital_source_type": "trainedAlgorithmicMedia",
          "loading": "eager" if slot == "hero" else "lazy",
          "fetchpriority": "high" if slot == "hero" else "auto",
          "decoding": "sync" if slot == "hero" else "async",
          "sizes": "100vw" if slot in ("hero", "inline-wide", "og") else "(max-width: 768px) 100vw, 720px",
          "prompt": prompt,
        }
        meta.append(rec)
        alt_rows.append(f"| {n} | `{slug}` | `{slot}` | {w}×{h} | {subj} |")

head = """# SteepWood Blog Batch 3 — Image Prompt Pack (150 prompts)

Generated by `scripts/build_image_pack.py` from `scripts/image_data.py`. Each prompt follows the locked six-block architecture from Batch 2 (`blog-batch2/images/ART-DIRECTION.md`): Subject, Environment, Region clause (location posts only), Slot composition, fixed Palette, fixed Constraints. Batch 3 adds one environment, `outdoor`, for the three decking posts; every other block is unchanged.

Pass two live Batch 1 JPEGs as style-only references on every generation:
`/blog/custom-kitchen-cost-nsw-2026/hero.jpg` and `/blog/questions-to-ask-custom-joiner-australia/hero.jpg`.

Generate 16:9 at 2752×1536 and 4:3 at 2400×1792, then centre-crop and downscale (never upscale) to the final sizes. Budget: 400 KB or less at 1600 px, 250 KB or less at 1200 px.
"""
(ROOT / "images").mkdir(exist_ok=True)
(ROOT / "images" / "IMAGE-PROMPTS.md").write_text(head + "\n".join(prompts))
(ROOT / "images" / "image-metadata.json").write_text(json.dumps(meta, indent=1, ensure_ascii=False))
(ROOT / "images" / "blog-image-manifest.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False))
(ROOT / "research" ).mkdir(exist_ok=True)
(ROOT / "research" / "IMAGE-ALT-TEXT.md").write_text(
  "# Batch 3 — Image Alt Text (150)\n\nAlt text is final in Phase 1. Phase 2 swaps pixels only. Hero alt matches each post's frontmatter `hero.alt`.\n\n| # | Slug | Slot | Size | Alt text |\n| --- | --- | --- | --- | --- |\n" + "\n".join(alt_rows) + "\n")
print("prompts:", n)
