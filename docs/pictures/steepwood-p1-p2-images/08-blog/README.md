# SteepWood blog launch images — 31 shots

Generated from the brief at `docs/pictures/PERPLEXITY-BLOG-LAUNCH-PROMPT.md`.

## Contents (31 files)

```
blog-index-hero.jpg                                                   1600×1000

# Post 1 — custom-kitchen-cost-nsw-2026
blog-custom-kitchen-cost-nsw-2026-hero.jpg                            1600×1000
blog-custom-kitchen-cost-nsw-2026-og.jpg                              1200×630
blog-custom-kitchen-cost-nsw-2026-inline-01.jpg                       1200×900
blog-custom-kitchen-cost-nsw-2026-inline-02.jpg                       1200×900
blog-custom-kitchen-cost-nsw-2026-inline-wide.jpg                     1600×1000

# Post 2 — flat-pack-vs-custom-kitchen-australia
blog-flat-pack-vs-custom-kitchen-australia-hero.jpg                   1600×1000
blog-flat-pack-vs-custom-kitchen-australia-og.jpg                     1200×630
blog-flat-pack-vs-custom-kitchen-australia-inline-01.jpg              1200×900
blog-flat-pack-vs-custom-kitchen-australia-inline-02.jpg              1200×900
blog-flat-pack-vs-custom-kitchen-australia-inline-wide.jpg            1600×1000

# Post 3 — 2pac-laminate-timber-veneer-kitchen-finishes-nsw
blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-hero.jpg        1600×1000
blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-og.jpg          1200×630
blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-inline-01.jpg   1200×900
blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-inline-02.jpg   1200×900
blog-2pac-laminate-timber-veneer-kitchen-finishes-nsw-inline-wide.jpg 1600×1000

# Post 4 — walk-in-robe-built-in-wardrobe-cost-guide-nsw
blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-hero.jpg           1600×1000
blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-og.jpg             1200×630
blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-inline-01.jpg      1200×900
blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-inline-02.jpg      1200×900
blog-walk-in-robe-built-in-wardrobe-cost-guide-nsw-inline-wide.jpg    1600×1000

# Post 5 — questions-to-ask-custom-joiner-australia
blog-questions-to-ask-custom-joiner-australia-hero.jpg                1600×1000
blog-questions-to-ask-custom-joiner-australia-og.jpg                  1200×630
blog-questions-to-ask-custom-joiner-australia-inline-01.jpg           1200×900
blog-questions-to-ask-custom-joiner-australia-inline-02.jpg           1200×900
blog-questions-to-ask-custom-joiner-australia-inline-wide.jpg         1600×1000

# Post 6 — benchtop-guide-engineered-stone-ban-nsw
blog-benchtop-guide-engineered-stone-ban-nsw-hero.jpg                 1600×1000
blog-benchtop-guide-engineered-stone-ban-nsw-og.jpg                   1200×630
blog-benchtop-guide-engineered-stone-ban-nsw-inline-01.jpg            1200×900
blog-benchtop-guide-engineered-stone-ban-nsw-inline-02.jpg            1200×900
blog-benchtop-guide-engineered-stone-ban-nsw-inline-wide.jpg          1600×1000
```

## Format

- JPEG, quality 88, progressive, sRGB
- Total pack size: ~5.8 MB

## Where to drop them

Copy the entire contents of this folder into:

```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\08-blog\
```

## Developer wiring (from the brief)

1. Add manifest entries for the new 08-blog files in `docs/pictures/manifest.json`.
2. Run `pnpm deploy:images`.
3. Add `BLOG_INDEX_HERO_IMAGE = "/images/blog/blog-index-hero.jpg"` to `src/lib/images.ts`.
4. Update `src/app/blog/page.tsx` — replace `WORKSHOP_HERO_IMAGE` with `BLOG_INDEX_HERO_IMAGE`.
5. Update `prisma/seedBlog.ts` — set `coverImageUrl: "/blog/{slug}/hero.jpg"` for each of the 6 launch posts.
6. Wire `BlogVisualStrip` to `/blog/{slug}/inline-01.jpg`, `inline-02.jpg`, `inline-wide.jpg`.
7. Run `pnpm db:seed`, hard-refresh `/blog/` and each post URL.

## Notes

- Blog index hero is intentionally different from the homepage `workshop-hero-main.jpg` — it shows a designer at a bench with plans and material samples, not a workshop floor.
- Post 2 inline-01 deliberately depicts dated flat-pack reality (DIY garage, melamine box, cam locks) to contrast with the SteepWood quality elsewhere on the same page.
- Post 3 hero shows the three finishes side by side (2-pac shaker, Polytec laminate, timber veneer) as required.
- All OG crops keep the subject in the centre third for safe 1200×630 social previews.
- No watermarks, no SteepWood logos, no legible licence numbers or readable text on plans or boxes.
