# Copy-paste this into Perplexity Computer

You are SteepWood’s photographer. Read the full brief at:

`C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\PERPLEXITY-BLOG-LAUNCH-PROMPT.md`

**Your job:** Generate **31 blog images** — one unique **blog index hero** (must NOT look like the homepage workshop shot) plus **5 images per post** for all 6 launch-pack articles.

**Save every file to:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\08-blog\
```

---

## Image count (31 total)

| Group | Count | Notes |
| --- | ---: | --- |
| Blog index hero | **1** | Replaces repetitive homepage workshop image on `/blog/` |
| Per-post hero | **6** | 16:10 — card grid + post header |
| Per-post OG | **6** | 1200×630 — social / Open Graph |
| Per-post inline pair | **12** | 4:3 — two mid-article slots per post |
| Per-post inline wide | **6** | 16:10 — one wide slot per post |
| **Total** | **31** | |

---

## Slugs (use in every filename)

1. `custom-kitchen-cost-nsw-2026`
2. `flat-pack-vs-custom-kitchen-australia`
3. `2pac-laminate-timber-veneer-kitchen-finishes-nsw`
4. `walk-in-robe-built-in-wardrobe-cost-guide-nsw`
5. `questions-to-ask-custom-joiner-australia`
6. `benchtop-guide-engineered-stone-ban-nsw`

---

## Naming pattern (exact)

```
blog-index-hero.jpg

blog-{slug}-hero.jpg
blog-{slug}-og.jpg
blog-{slug}-inline-01.jpg
blog-{slug}-inline-02.jpg
blog-{slug}-inline-wide.jpg
```

**Example for post 1:**
```
blog-custom-kitchen-cost-nsw-2026-hero.jpg
blog-custom-kitchen-cost-nsw-2026-og.jpg
blog-custom-kitchen-cost-nsw-2026-inline-01.jpg
blog-custom-kitchen-cost-nsw-2026-inline-02.jpg
blog-custom-kitchen-cost-nsw-2026-inline-wide.jpg
```

---

## Specs

| File suffix | Size | Aspect |
| --- | --- | --- |
| `blog-index-hero.jpg` | 1600×1000 | 16:10 |
| `-hero.jpg` | 1600×1000 | 16:10 |
| `-og.jpg` | **1200×630** | social crop |
| `-inline-01.jpg`, `-inline-02.jpg` | 1200×900 | 4:3 |
| `-inline-wide.jpg` | 1600×1000 | 16:10 |

- Progressive JPEG quality **88**, sRGB
- Prepend the **Master prompt** from the brief to **every** shot

---

## Critical rules

1. **Blog index hero ≠ homepage hero.** The homepage uses a wide workshop/CNC establishing shot (`workshop-hero-main.jpg`). The blog index needs a **tighter editorial shot** — plans + material samples + ruler on a bench (“insights from the workshop”). Do **not** regenerate or mimic the homepage wide workshop panorama.

2. **Post 2 inline-01** must look like **flat-pack reality** (cardboard boxes, cam locks, dated melamine) — not premium SteepWood joinery.

3. **Post 3 hero** must show **three distinct finishes side by side**: 2-pac, laminate, timber veneer.

4. **OG images:** keep subject **centred** for 1200×630 crop; slightly brighter than hero.

5. **No** watermarks, logos burned in, or legible licence numbers / plan text.

---

## Suggested workflow

1. Generate **`blog-index-hero.jpg`** first — confirm it looks different from a wide workshop tour photo.
2. For each slug (in order above), generate in this sequence:
   - `-hero.jpg`
   - `-og.jpg` (use hero as composition reference; widen/brighter)
   - `-inline-01.jpg` and `-inline-02.jpg`
   - `-inline-wide.jpg`
3. After all **31** files exist, print a filename checklist with dimensions.
4. Optionally zip as `steepwood-p1-blog-images.zip`.
5. Tell the developer to run `pnpm deploy:images` and `pnpm db:seed`.

---

## Do not regenerate

Homepage workshop hero, portfolio before/after sets, service pillar heroes, brand logos, team portraits, or `og-default.jpg`.
