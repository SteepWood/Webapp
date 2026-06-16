# Copy-paste this into Perplexity Computer

You are SteepWood’s photographer. Read the full brief at:

`C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\PERPLEXITY-HOMEPAGE-BLANK-CARDS-PROMPT.md`

**Your job:** Generate the **10 homepage service card images** that are currently showing as blank placeholders on http://localhost:3000

**Save every file to:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\02-services\
```

**Required filenames (exact — lowercase, hyphens):**
1. `service-custom-kitchen-joinery-hero.jpg`
2. `service-built-in-wardrobes-hero.jpg`
3. `service-office-fitout-hero.jpg`
4. `service-shopfitting-hero.jpg`
5. `service-custom-bathroom-vanity-hero.jpg`
6. `service-commercial-joinery-hero.jpg`
7. `service-custom-furniture-hero.jpg`
8. `service-home-office-joinery-hero.jpg`
9. `service-laundry-cabinets-hero.jpg`
10. `service-staircase-joinery-hero.jpg`

**Specs:** 1600×1000 px, 16:10, progressive JPEG quality 88, sRGB. Prepend the **Master prompt** from the brief to every individual shot prompt.

**Style:** Premium Australian custom joinery — American oak, walnut, 2-pac shaker, Caesarstone, Blum hardware. Warm natural light. Newcastle-based brand. No watermarks, no logos, no text in image.

**After all 10 are done:**
1. List each filename you created and confirm dimensions
2. Tell the developer to run: `pnpm deploy:images` then `pnpm db:seed`
3. Optionally generate matching OG crops (1200×630) in `06-og-social/` as `og-service-{slug}.jpg` — see brief for slug list

**Do not regenerate:** workshop heroes, portfolio projects, or brand logos (already deployed).
