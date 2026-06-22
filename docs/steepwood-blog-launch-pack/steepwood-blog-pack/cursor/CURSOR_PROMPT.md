# Cursor Build Prompt — SteepWood Blog Launch Batch (6 Posts)

Paste this entire prompt into Cursor's composer (Cmd+I / Ctrl+I) with **Agent mode** enabled and the SteepWood `steepwood_webapp` repo open. The prompt is self-contained: it tells Cursor exactly what files to read, what new files to create, and how to wire schema, OG, sitemap, and internal links.

---

## ROLE

You are working in the SteepWood Next.js webapp (App Router, TypeScript, Tailwind). The blog system already exists with 3 posts deployed at `/blog/{slug}`. Schema markup, MDX components (`<Callout>`, `<ServiceCTA>`), and a sticky table of contents are already in production. You are adding **6 new blog posts** without breaking any existing patterns.

Be conservative: match the existing blog post pattern exactly. Do not refactor; do not introduce new dependencies; do not change the schema shape that's already in production. Only add files needed for the 6 new posts and wire them in.

---

## INPUTS (read these first)

There are 6 finished post markdown files. Their slugs and category mappings:

| # | Slug | Category |
|---|------|----------|
| 1 | `custom-kitchen-cost-nsw-2026` | Cost Guides |
| 2 | `flat-pack-vs-custom-kitchen-australia` | Buying Guides |
| 3 | `2pac-laminate-timber-veneer-kitchen-finishes-nsw` | Materials |
| 4 | `walk-in-robe-built-in-wardrobe-cost-guide-nsw` | Wardrobes |
| 5 | `questions-to-ask-custom-joiner-australia` | Buying Guides |
| 6 | `benchtop-guide-engineered-stone-ban-nsw` | Materials |

Each markdown file has:
- Complete YAML frontmatter (title, slug, description, date, author, category, tags, readingTime, hero, ogImage, primaryKeyword, secondaryKeywords, internalLinks, faq, relatedPosts)
- A `# H1` line (matches frontmatter title)
- 5–11 H2 sections, comparison tables, mid-article CTA blockquotes, FAQ H3 questions

The files will be supplied either:
- Dropped into `docs/blog-pack/posts/` for you to read, OR
- Already moved into `content/blog/` (see step 2 — confirm the project's existing content path)

---

## STEP-BY-STEP TASKS

### STEP 1 — Discover the existing blog architecture

Read these files first and report what you find before making changes:

1. `app/blog/page.tsx` (or `app/(site)/blog/page.tsx`) — blog index
2. `app/blog/[slug]/page.tsx` — individual post page
3. Anything matching `lib/blog/**/*` or `lib/posts/**/*` — the loader
4. `content/blog/**` or `posts/**` or `data/blog/**` — where existing post bodies live
5. `components/mdx/**` — MDX components including `Callout` and `ServiceCTA`
6. `app/sitemap.ts` (or `app/sitemap.xml/route.ts`)
7. `app/robots.ts`
8. Any existing schema utilities — search the repo for `BlogPosting`, `BreadcrumbList`, `FAQPage`, `application/ld+json`

**Confirm before writing:** What is the source path for post bodies? What loader/format does `[slug]/page.tsx` use (raw markdown, MDX via `next-mdx-remote`, Contentlayer, `@content-collections`, custom)? What is the exact frontmatter contract the loader expects?

If your discovered contract differs from the YAML in the supplied posts, write a small adapter in `lib/blog/normalise.ts` rather than rewriting all 6 post files.

### STEP 2 — Place the post files

Move (or copy) the 6 `.md` files into the directory the loader reads from. Likely paths in order of probability:
- `content/blog/<slug>.md` or `<slug>.mdx`
- `posts/<slug>.mdx`
- `data/blog/<slug>.md`

If the existing 3 posts are `.mdx`, rename the new files from `.md` to `.mdx`. The bodies are valid markdown that parses as MDX as long as no stray `<` characters are interpreted as JSX. Scan each file for raw `<` and either escape (`&lt;`) or wrap in inline code if needed. Especially watch for `<1%` strings in the benchtop post — wrap as `` `<1%` `` inline code.

### STEP 3 — Add category support

The existing posts use `category` in frontmatter ("Kitchen Design", "Materials", "Home Trends"). The current `/blog` page renders a Categories widget with 3 hardcoded entries. Extend the categories widget to be data-driven:

- Build the categories list from the union of all post categories, with post counts
- Each category becomes a filter link at `/blog?category=<slug>` (use kebab-case slugs: `cost-guides`, `buying-guides`, `materials`, `wardrobes`, `kitchen-design`, `home-trends`)
- On `/blog`, when `?category=<slug>` is present, filter the post list and update the H1 to `<Category Name>`
- Keep the existing sidebar visual style — do not redesign it
- Make sure the existing 3 posts keep working: map their categories ("Kitchen Design", "Materials", "Home Trends") to slugs `kitchen-design`, `materials`, `home-trends`

### STEP 4 — Wire JSON-LD schema for each new post

The existing posts emit `BlogPosting` + `BreadcrumbList` + `@graph` (LocalBusiness + Organization + WebSite). Match that exactly. **Add one more schema block per post: `FAQPage`** — built from the `faq` array in frontmatter.

For each post, the rendered `<head>` should include all of:

1. **`BlogPosting`** — same shape as the existing posts:
   - `headline` = `title`
   - `description` = `description`
   - `image` = absolute URL to `hero.src`
   - `datePublished` = `date` (ISO 8601 with Australia/Sydney timezone offset)
   - `dateModified` = file mtime or `updatedDate` if present
   - `author` = `{ "@type": "Person", "name": author }`
   - `publisher` = SteepWood Organization (re-use existing constant)
   - `mainEntityOfPage` = canonical URL
   - `articleBody` = the post markdown body (same as existing posts)
   - `wordCount` and `timeRequired` from a word-count util
   - `url` = canonical URL

2. **`BreadcrumbList`** — Home → Blog → `<title>` (use existing builder)

3. **`FAQPage`** — NEW. From `faq` frontmatter:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "<question>",
      "acceptedAnswer": { "@type": "Answer", "text": "<answer>" }
    }
  ]
}
```

Only emit FAQPage if `faq` array has ≥1 entry. Place it as a third `<script type="application/ld+json">` block in the post page head.

### STEP 5 — Render the FAQ section in the post body

The FAQ already exists in the post markdown body. **Do not re-render it from frontmatter**. The frontmatter `faq` array is the source for the FAQPage schema, while the visible FAQ block in the post body is what readers see. The two must stay in sync — add a dev-only assertion that logs a warning if the body H3s don't include every frontmatter question (string-includes match is fine).

### STEP 6 — Render "Related posts" at the end of each post

The frontmatter `relatedPosts` array contains slugs. Below the FAQ and footer CTA, render a "Related reading" block with 3 cards (same card design as the blog index). Hide the section if `relatedPosts` is empty or all entries are 404.

### STEP 7 — Internal-link autochecker (build-time)

Add a small build-time check in `scripts/check-blog-links.ts`:
- Parse every `.md`/`.mdx` in the blog content directory
- For each internal link (`href` starting with `/`), confirm the target route resolves in the Next.js app router by checking either:
  - A file exists at `app/<path>/page.tsx`, OR
  - The path matches a known dynamic route (`/blog/:slug` if a post file exists, `/locations/:slug` if the slug is in the known list, `/portfolio/:slug` if the portfolio slug exists)
- Print warnings (not errors) for unresolved links so the build doesn't break, but the dev sees them in `pnpm dev` logs
- Add this as `pnpm check:blog-links` and as a pre-commit (or pre-`deploy:images`) step if a husky/lint-staged setup exists

### STEP 8 — Update the sitemap

`app/sitemap.ts` should automatically pick up the 6 new posts if the existing pattern reads from the content directory. Confirm this. If the sitemap is hardcoded, add the 6 slugs with:
- `lastModified` = file mtime
- `changeFrequency` = `"monthly"`
- `priority` = `0.7`

### STEP 9 — Hero and OG image placeholders

Each post frontmatter references `/blog/<slug>/hero.jpg` and `/blog/<slug>/og.jpg`. These image files do not exist yet. Two options — choose based on what the existing posts do:

**Option A (likely current behaviour):** The existing posts fall back to `/images/hero-workshop.svg` when the per-post image is missing. If true, do nothing — the fallback will be used until per-post images are generated.

**Option B:** If the loader throws when the image is missing, generate 6 lightweight placeholder PNGs (1600×900) in `public/blog/<slug>/hero.jpg` and `og.jpg` (1200×630). Use a solid SteepWood ink-brown (#3a2618) with the post title in white centred Inter Bold. A 50-line node script with `sharp` does this cleanly.

State in your final report which option applied.

### STEP 10 — Update the blog index for sorting and pagination

The current `/blog` shows all 3 posts in a single column with no pagination. After adding 6 posts, the index will have 9. Add basic pagination: 6 posts per page, with `/blog?page=2` rendering the next set, sorted by `date` desc. Reuse existing post-card components — do not restyle.

### STEP 11 — Add an "Updated" stamp option

The existing posts already emit `article:modified_time`. Surface this visibly in the post header byline as `Updated <date>` when `updatedDate` (optional frontmatter) is present and differs from `date`. This is a small SEO win — Google often shows the updated date in SERPs.

### STEP 12 — Verify everything

Before opening a PR or pushing:
1. `pnpm build` should succeed with zero new TypeScript errors and zero broken imports
2. Visit each new post locally; view source; confirm all three JSON-LD blocks are present and valid (paste each into [validator.schema.org](https://validator.schema.org/) or [Google Rich Results Test](https://search.google.com/test/rich-results) if available)
3. `/blog?category=cost-guides` filters to 1 post (the cost guide), `?category=materials` to 2 posts, etc.
4. Sitemap (`/sitemap.xml`) lists all 9 posts
5. The internal-link checker prints any unresolved links — they should all resolve given the slug map below
6. Lighthouse score on at least one new post — aim ≥ 90 on SEO and Best Practices

---

## SLUG MAP (must resolve)

Service pages (flat root-level, no `/services/` prefix):
- `/custom-kitchen-joinery`
- `/built-in-wardrobes`
- `/office-fitout`
- `/shopfitting`
- `/custom-bathroom-vanity`
- `/commercial-joinery`
- `/custom-furniture`
- `/home-office-joinery`
- `/laundry-cabinets`
- `/staircase-joinery`

Locations (`/locations/<slug>`):
newcastle, sydney, canberra, melbourne, central-coast, hunter-valley, gold-coast, wollongong, brisbane, perth, byron-bay, port-macquarie, coffs-harbour, adelaide, bathurst, orange

Portfolio (`/portfolio/<slug>`):
hamptons-kitchen-newcastle, walk-in-robe-sydney, floating-vanity-byron-bay

Existing blog posts:
- `/blog/kitchen-storage-planning-australia`
- `/blog/joinery-materials-guide-2pac-timber`
- `/blog/australian-home-joinery-trends-2026`

New blog posts (this batch):
- `/blog/custom-kitchen-cost-nsw-2026`
- `/blog/flat-pack-vs-custom-kitchen-australia`
- `/blog/2pac-laminate-timber-veneer-kitchen-finishes-nsw`
- `/blog/walk-in-robe-built-in-wardrobe-cost-guide-nsw`
- `/blog/questions-to-ask-custom-joiner-australia`
- `/blog/benchtop-guide-engineered-stone-ban-nsw`

Conversion:
- `/quote`, `/contact`, `tel:+61468387676`

External links the posts use (no action needed; these resolve naturally):
- `safeworkaustralia.gov.au`, `aca.org.au`, `service.nsw.gov.au`, `polytec.com.au`, `laminex.com.au`, `whatsthedamage.com.au`, `buildana.com.au`, `kitchenquote.com.au`, `thequoteyard.com.au`, `cutbybees.com.au`, `intero.com.au`

---

## OUTPUT FORMAT (what Cursor should produce)

When done, post a single summary message in this format:

```
SteepWood blog launch batch — build report

CONTENT FILES PLACED
  content/blog/custom-kitchen-cost-nsw-2026.mdx
  content/blog/flat-pack-vs-custom-kitchen-australia.mdx
  ... (6 total)

NEW CODE FILES
  scripts/check-blog-links.ts (new)
  lib/blog/normalise.ts (new, if needed)
  components/blog/FaqJsonLd.tsx (new)
  components/blog/RelatedPosts.tsx (new)
  ...

MODIFIED FILES
  app/blog/page.tsx — added category filtering and pagination
  app/blog/[slug]/page.tsx — added FAQPage JSON-LD, related-posts block
  lib/blog/loader.ts — added FAQ + relatedPosts to post type
  ...

IMAGE STRATEGY
  Option A — existing fallback in use, no placeholders generated
  (or)
  Option B — generated 12 placeholders under public/blog/<slug>/

VERIFICATION
  pnpm build: PASS (0 errors, 0 new warnings)
  /blog?category=cost-guides: 1 post (custom-kitchen-cost-nsw-2026)
  /blog?category=materials: 2 posts (finishes guide + benchtop guide)
  /blog?category=buying-guides: 2 posts (flat-pack + questions-to-ask)
  /blog?category=wardrobes: 1 post
  Sitemap: 9 posts listed
  Internal-link check: <N> unresolved links → <list, or "none">

NEXT STEPS FOR USER
  1. Generate per-post hero images (1600×900) and OG images (1200×630)
  2. Run `pnpm deploy:images` to push to S3
  3. Submit updated sitemap to Google Search Console
  4. Manually request indexing for the 6 new URLs in GSC
```

---

## DOs and DON'Ts

DO:
- Match the existing schema shape exactly (BlogPosting + BreadcrumbList + LocalBusiness graph)
- Keep AU English in any new UI strings ("Categories", not "Topics")
- Preserve existing visual design — only extend, don't redesign
- Use `lastModified` from file mtime so updated posts re-trigger Google crawls
- Treat the supplied `.md` files as source of truth; if the loader needs `.mdx`, rename them but don't rewrite their content

DON'T:
- Don't add a CMS or change content storage
- Don't add new heavy dependencies (no Contentlayer if not already there, no Sanity, no MDX-bundler if `next-mdx-remote` is already in use)
- Don't move the existing 3 posts unless the loader contract requires it
- Don't change service-page slugs (they are flat root-level by design)
- Don't add comment systems, newsletter integrations, or analytics — out of scope
- Don't change the colour palette, fonts, or component primitives
- Don't auto-generate the FAQ from frontmatter into the body — the body already contains the FAQ; the frontmatter version is for schema only

---

## TROUBLESHOOTING NOTES

- If `next-mdx-remote` chokes on `<` in body copy (e.g. `<1% silica`), wrap as inline code: `` `<1%` ``. I've flagged this in the benchtop post specifically.
- If frontmatter parsing fails on the `internalLinks` array shape (some loaders prefer flat arrays), normalise it in `lib/blog/normalise.ts` — don't edit the 6 .md files.
- If `relatedPosts` references a slug that doesn't exist (typo or pending post), silently skip rather than rendering a broken card.

When everything compiles and the verification checklist passes, you are done.
