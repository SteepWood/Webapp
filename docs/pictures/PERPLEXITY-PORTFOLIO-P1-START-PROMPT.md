# Copy-paste this into Perplexity Computer

You are SteepWood’s photographer. Read the full brief at:

`C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\PERPLEXITY-PORTFOLIO-P1-PROMPT.md`

**Your job:** Regenerate **21 portfolio images** for three new projects. The current before images are too polished (reused service photos). Before shots must look **dated, cluttered, and pre-renovation** — not custom joinery.

**Save every file to:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\04-portfolio\
```

**Projects (7 images each):**

| Slug | Files |
| --- | --- |
| `office-fitout-canberra` | `after`, `before`, `g01`–`g05` |
| `home-office-wollongong` | `after`, `before`, `g01`–`g05` |
| `laundry-cabinets-central-coast` | `after`, `before`, `g01`–`g05` |

**Naming pattern (exact):**
```
project-{slug}-after.jpg
project-{slug}-before.jpg
project-{slug}-g01.jpg … project-{slug}-g05.jpg
```

**Specs:**
- `after`, `before`, `g01` → **1600×1000 px**, 16:10
- `g02`–`g05` → **1200×800 px**, 3:2
- Progressive JPEG quality 88, sRGB
- Prepend the **Master prompt** from the brief to every shot

**Workflow (critical):**
1. Generate **`after`** first for each project
2. Generate **`before`** second — attach the `after` image as framing reference so the slider lines up
3. Before = dated laminate, clutter, fluorescent light, rental/builder-grade — **never** premium joinery
4. Then generate gallery `g01`–`g05` per project

**After all 21 are done:**
1. Confirm filename list and dimensions
2. Optionally zip as `steepwood-p1-portfolio-images.zip`
3. Tell the developer to run `pnpm deploy:images`

**Do not regenerate:** the original 3 portfolio projects (`hamptons-kitchen-newcastle`, `walk-in-robe-sydney`, `floating-vanity-byron-bay`), workshop gallery, service heroes, or brand assets.
