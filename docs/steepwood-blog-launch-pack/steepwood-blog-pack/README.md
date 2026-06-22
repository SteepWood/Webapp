# SteepWood Blog Launch Pack

Six high-quality blog posts plus a Cursor build prompt to wire them into the SteepWood Next.js webapp.

## What's inside

```
steepwood-blog-pack/
├── README.md                  ← this file
├── SHARED_CONTEXT.md          ← voice rules, slug map, frontmatter template
├── posts/                     ← 6 ready-to-publish posts (AU English, MDX-ready)
│   ├── custom-kitchen-cost-nsw-2026.md
│   ├── flat-pack-vs-custom-kitchen-australia.md
│   ├── 2pac-laminate-timber-veneer-kitchen-finishes-nsw.md
│   ├── walk-in-robe-built-in-wardrobe-cost-guide-nsw.md
│   ├── questions-to-ask-custom-joiner-australia.md
│   └── benchtop-guide-engineered-stone-ban-nsw.md
└── cursor/
    └── CURSOR_PROMPT.md       ← paste into Cursor Agent mode in the steepwood_webapp repo
```

## The 6 posts at a glance

| # | Slug | Primary keyword | Intent | Words |
|---|------|------------------|--------|-------|
| 1 | custom-kitchen-cost-nsw-2026 | custom kitchen cost NSW | High (quote) | 4,125 |
| 2 | flat-pack-vs-custom-kitchen-australia | flat pack vs custom kitchen | High (decision) | 3,950 |
| 3 | 2pac-laminate-timber-veneer-kitchen-finishes-nsw | 2pac vs laminate kitchen | Mid (research) | 5,172 |
| 4 | walk-in-robe-built-in-wardrobe-cost-guide-nsw | walk in robe cost | High (quote) | 3,871 |
| 5 | questions-to-ask-custom-joiner-australia | questions to ask custom joiner | High (trust) | 3,225 |
| 6 | benchtop-guide-engineered-stone-ban-nsw | engineered stone alternatives | High (urgent, post-ban) | 4,084 |

Every post has frontmatter, 5–11 H2 sections, a 5-question FAQ array (ready for FAQPage schema), at least 3 quote-page CTAs, internal links to service pages, locations, portfolio and cross-batch posts.

## How to use

1. Open the `steepwood_webapp` repo in Cursor.
2. Open Agent mode.
3. Paste the contents of `cursor/CURSOR_PROMPT.md` as the first message.
4. Drop the 6 files in `posts/` into the agent's context (or let it read them from this pack).
5. Review the diff, run the link checker the prompt builds, then deploy.

## After deploy

- Generate per-post hero and OG images (1200x630 OG, 1600x900 hero) and drop into `/public/images/blog/`.
- Run `pnpm deploy:images` if you use the image pipeline.
- Submit the updated sitemap to Google Search Console and request indexing for the 6 new URLs.
- Manually review post #6 (engineered stone) before publishing — it touches WHS regulation and you may want a final pass for your specific licence wording.

## Notes

- Locations referenced: Newcastle (HQ), Hunter Valley, Central Coast, Sydney, Byron Bay, Port Macquarie. Edit if any of those service URLs change.
- Citations are inline in each post — verify any pricing numbers against your current quote sheet before publishing.
- Author byline is set to Sukhveer Kaur in the frontmatter of every post.
