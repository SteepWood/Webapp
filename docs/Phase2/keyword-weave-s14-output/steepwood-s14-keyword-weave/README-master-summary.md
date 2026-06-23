# §14 Service Pillar Keyword Weave — Master Summary

**Job:** Phase 2 §14 keyword weaving for 9 SteepWood service pillar pages.
**Reference:** `/custom-kitchen-joinery/` (already updated by developer — not touched here).
**Target file:** `src/lib/services-locations/serviceContent.ts` — one `defineService("slug", { ... })` per service.
**Output location (developer copies to):** `docs/Phase2/keyword-weave-s14-output/`

## Results

```
§14 service pillar keyword weave — complete

built-in-wardrobes:        8 / 8  ✓
office-fitout:             4 / 4  ✓
shopfitting:               3 / 3  ✓
custom-bathroom-vanity:    4 / 4  ✓
commercial-joinery:        4 / 4  ✓
custom-furniture:          5 / 5  ✓
home-office-joinery:       4 / 4  ✓
laundry-cabinets:          3 / 3  ✓
staircase-joinery:         5 / 5  ✓
─────────────────────────────────
Total: 9 services, 40 keyword placements, 0 missing
```

## What's in each `{slug}.md`

1. **Pre-write plan** — which existing FAQs / materials are extended vs replaced, what is new.
2. **`materials` (replace entire array)** — 3–4 paragraphs, Australian English, workshop-led tone, keywords woven naturally (target ~1–2% density).
3. **`processSteps` (only changed steps)** — full step objects where a description is being updated to carry a lead-time or workflow keyword.
4. **`faqs` (only NEW or REVISED entries)** — written as full `{ question, answer }` objects, ready to splice into the existing array. Existing FAQs not listed in the file are explicitly preserved.
5. **`optional whatIsParagraph`** — only used if a keyword cannot fit elsewhere without stuffing (none of the 9 needed this).
6. **Keyword checklist table** — keyword → location → exact phrase used.
7. **TypeScript-ready block** — paste targets for `defineService("slug", { materials: [...], faqs: [...], processSteps: [...] })`.

## Cross-links woven (per §17 reference table)

- `built-in-wardrobes` → blog `walk-in-robe-built-in-wardrobe-cost-guide-nsw` (FAQ #2)
- `office-fitout` → `/shopfitting/` (FAQ #3) and `/home-office-joinery/` (FAQ #4)
- `shopfitting` → `/commercial-joinery/` (materials #3 + FAQ #3)
- `custom-bathroom-vanity` — substrate / coastal materials woven (no cross-link required by §17)
- `commercial-joinery` → `/shopfitting/` (materials #4 + FAQ #3)
- `custom-furniture` — timber-species rewrite (no cross-link required by §17)
- `home-office-joinery` — bookshelf cost added (no cross-link required by §17)
- `laundry-cabinets` — coastal humidity + substrate woven (no cross-link required by §17)
- `staircase-joinery` — timber species woven (no cross-link required by §17)

## What was NOT changed (per rules in start prompt)

- `heroIntro` on every page — untouched
- H1 and meta tags — untouched
- Page routes — untouched
- `/custom-kitchen-joinery/` — explicitly excluded (already done)
- Homepage, location hubs, combo pages (`/{service}/{city}/`) — separate task
- Pricing ranges already on each page were preserved or extended with "typically", "from", "most projects" guards on new ranges
- Warranty terms — preserved at 10-year structural / 25-year Blum hardware

## Developer next steps

1. Drop the 9 `.md` files into `docs/Phase2/keyword-weave-s14-output/`.
2. For each service, splice the TypeScript-ready block at the bottom of each file into `src/lib/services-locations/serviceContent.ts` inside the relevant `defineService("slug", { ... })` call.
3. For `faqs`, **append the new FAQs and replace the revised ones** in place — keep all existing FAQs not listed in the file. Target FAQ count per page: 6–10.
4. Run `pnpm typecheck` and `pnpm build` to confirm no string-escape or trailing-comma issues.
5. Re-extract live HTML on a staging deploy and confirm each keyword appears at least once on its target page (the §14 verification script in `CURSOR_SEO_FIX_PROMPT.md` covers this).
6. Submit the updated sitemap.xml entries to Google Search Console once the deploy is live.

## Australian English / tone compliance

- Spelling: colour, fitout, organise, metre, enquiry, licence, programme, co-ordinate — verified throughout.
- No emojis, no markdown italics — verified.
- Words "scrape" and "crawl" not used in any file.
- Brisk, technical, confident tone — written to match the kitchen reference paragraphs (Polytec vs Laminex, Blum soft close, custom kitchen timeline) called out in the start prompt.
