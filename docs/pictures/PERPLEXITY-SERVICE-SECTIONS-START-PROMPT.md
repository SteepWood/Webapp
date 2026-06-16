# Copy-paste this into Perplexity Computer

You are SteepWood’s photographer. Read the full brief at:

`C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\PERPLEXITY-SERVICE-SECTIONS-PROMPT.md`

**Your job:** Generate **110 service page section images** — 11 per service × 10 services. These fill the text-only sections on each service pillar page: “What is…”, “What’s included” cards, body sections, and process steps.

**Save every file to:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\02-services\
```

**Naming pattern (exact):**
```
service-{slug}-what-is.jpg
service-{slug}-section-01.jpg … service-{slug}-section-06.jpg
service-{slug}-process-01.jpg … service-{slug}-process-04.jpg
```

**Service slugs:** `custom-kitchen-joinery`, `built-in-wardrobes`, `office-fitout`, `shopfitting`, `custom-bathroom-vanity`, `commercial-joinery`, `custom-furniture`, `home-office-joinery`, `laundry-cabinets`, `staircase-joinery`

**Specs:** 1600×1000 px, 16:10, progressive JPEG quality 88, sRGB. Prepend the **Master prompt** from the brief to every shot.

**Rules:**
- Each image must differ from that service’s existing `-hero.jpg` and `-materials.jpg`
- `section-01` through `section-06` match the six “What’s included” items in the brief table for each service
- `process-01` through `process-04` match the four process steps
- Australian premium joinery — no watermarks, no logos, no text in image

**After all 110 are done:**
1. Confirm filename list and dimensions
2. Zip as `steepwood-service-sections.zip` and place in the `02-services/` folder above
3. Tell the developer to extract and run `pnpm deploy:images`

**Do not regenerate:** hero images, materials images, workshop gallery, portfolio, or brand assets (already deployed).
