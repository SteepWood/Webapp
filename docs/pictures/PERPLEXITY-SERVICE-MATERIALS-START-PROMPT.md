# Copy-paste this into Perplexity Computer

You are SteepWood’s photographer. Read the full brief at:

`C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\PERPLEXITY-SERVICE-MATERIALS-PROMPT.md`

**Your job:** Generate **10 unique materials & finishes images** — one per service page. These are the **second image** on each service pillar page (Materials & finishes section). They must be **detail/craftsmanship shots**, not wide room heroes, and **different from each service’s existing `-hero.jpg`**.

**Save every file to:**
```
C:\Users\afzal\OneDrive\Desktop\STEEPwood_Logo\steepwood_webapp\docs\pictures\steepwood-p1-p2-images\02-services\
```

**Required filenames (exact — lowercase, hyphens):**
1. `service-custom-kitchen-joinery-materials.jpg`
2. `service-built-in-wardrobes-materials.jpg`
3. `service-office-fitout-materials.jpg`
4. `service-shopfitting-materials.jpg`
5. `service-custom-bathroom-vanity-materials.jpg`
6. `service-commercial-joinery-materials.jpg`
7. `service-custom-furniture-materials.jpg`
8. `service-home-office-joinery-materials.jpg`
9. `service-laundry-cabinets-materials.jpg`
10. `service-staircase-joinery-materials.jpg`

**Specs:** 1600×1000 px, 16:10, progressive JPEG quality 88, sRGB. Prepend the **Master prompt** from the brief to every individual shot prompt.

**Composition rules:**
- Close-up or detail — materials, hardware, edges, finishes
- Strong texture and contrast (site renders these desaturated/grayscale)
- Australian premium joinery — oak, walnut, 2-pac, Caesarstone, Blum
- No watermarks, no logos, no text in image
- Must not look like a duplicate crop of the matching `-hero.jpg`

**After all 10 are done:**
1. List each filename you created and confirm dimensions
2. Tell the developer to run: `pnpm deploy:images`
3. Confirm each materials shot is visually distinct from its hero counterpart

**Do not regenerate:** service hero images, workshop gallery, portfolio, or brand assets (already deployed).
