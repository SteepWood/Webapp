# Shared writing context — SteepWood blog launch batch

Every post must follow this brief.

## SteepWood facts (use these verbatim)
- Premium custom joinery studio, **Newcastle NSW** workshop
- NSW Carpentry Contractor Licence **489553C**
- ABN 52 697 313 269
- 10-year structural warranty on all joinery
- Hand-crafted in Newcastle workshop, Australian-sourced timber where possible
- Free in-home measure and quote across NSW and ACT; furniture-freight delivery to QLD, VIC, WA, SA
- Phone 0468 387 676 · hello@steepwood.com.au · Mon–Fri 7am–5pm, Sat by appointment
- Operating since 2014
- Author byline for all posts: **Sukhveer Kaur** (founder)

## Voice & style
- Brisk, technical, confident Australian English (colour, fitout, organise, kilometres, enquiry, metre, centre)
- Tradesperson POV — written from inside the workshop
- No emojis. No markdown italics (`*text*`). Use **bold** for emphasis only when needed
- No exclamation points except in dialogue
- Never use the words "scrape" or "crawl"
- Reference real AU products by name: Polytec, Polytec SYNC, Laminex, Laminex Woodmatt, Blum (Legrabox, Aventos, undermount runners), Hettich, Häfele, Dulux, Caesarstone (only in historical/post-ban context), Dekton, Neolith, Smartstone
- Reference real AU timber species: Spotted Gum, Tasmanian Oak, Blackbutt, Blackwood, American oak (named as such, it's an import)
- Pricing in AUD with `$X,XXX` formatting, AU 2026 ranges
- Mention WHS engineered-stone ban context when relevant (effective **1 July 2024**)

## Structure rules (every post)
1. **Frontmatter block** at the very top (see template below)
2. **Lede paragraph** (2–3 sentences, hook + promise + AU/NSW specificity)
3. **5–8 H2 sections** with 1–2 H3 subsections where appropriate
4. **At least one comparison table** OR cost table
5. **Inline internal links** — minimum 3, distributed naturally through the body, anchor text varied
6. **One mid-article in-body CTA module** styled as a callout (use `> **STEEPWOOD SERVICE** —` blockquote pattern)
7. **FAQ section** with 4–6 Q&As (H3 questions, plain-paragraph answers) — for FAQPage schema
8. **Footer CTA** — final paragraph pointing at /quote
9. **AU English everywhere** — spell-check before saving

## Frontmatter template
Every post must START with this YAML frontmatter (no leading text before it):

```yaml
---
title: "<the exact H1, ≤ 60 chars target>"
slug: "<url-slug>"
description: "<meta description, 145-160 chars, includes primary keyword>"
date: "2026-06-22"
author: "Sukhveer Kaur"
category: "<one of: Cost Guides | Materials | Buying Guides | Kitchen Design | Wardrobes | Trends>"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
readingTime: "<X> min read"
hero:
  src: "/blog/<slug>/hero.jpg"
  alt: "<descriptive AU alt text>"
ogImage: "/blog/<slug>/og.jpg"
primaryKeyword: "<main target keyword phrase>"
secondaryKeywords: ["kw1", "kw2", "kw3", "kw4"]
internalLinks:
  - { url: "/<service-slug>", anchor: "<descriptive anchor>" }
  - { url: "/blog/<other-post-slug>", anchor: "<descriptive anchor>" }
  - { url: "/quote", anchor: "Get a free measure and quote" }
faq:
  - question: "<Q1>"
    answer: "<A1 in plain text, 2-4 sentences>"
  - question: "<Q2>"
    answer: "<A2>"
  # 4-6 total
relatedPosts:
  - "<slug-of-related-post-1>"
  - "<slug-of-related-post-2>"
---
```

## URL pattern map (use these EXACT slugs)

### Service pages (flat root-level, no /services/ prefix)
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

### Location pages (`/locations/{slug}`)
newcastle, sydney, canberra, melbourne, central-coast, hunter-valley, gold-coast, wollongong, brisbane, perth, byron-bay, port-macquarie, coffs-harbour, adelaide, bathurst, orange

### Portfolio
- `/portfolio` (index)
- `/portfolio/hamptons-kitchen-newcastle`
- `/portfolio/walk-in-robe-sydney`
- `/portfolio/floating-vanity-byron-bay`

### Existing blog posts (do NOT republish these slugs; safe to internally link)
- `/blog/kitchen-storage-planning-australia`
- `/blog/joinery-materials-guide-2pac-timber`
- `/blog/australian-home-joinery-trends-2026`

### Conversion
- `/quote` (free measure & quote form)
- `/contact`
- `tel:+61468387676`

## The 6 NEW slugs in this batch
1. `/blog/custom-kitchen-cost-nsw-2026`
2. `/blog/flat-pack-vs-custom-kitchen-australia`
3. `/blog/2pac-laminate-timber-veneer-kitchen-finishes-nsw`
4. `/blog/walk-in-robe-built-in-wardrobe-cost-guide-nsw`
5. `/blog/questions-to-ask-custom-joiner-australia`
6. `/blog/benchtop-guide-engineered-stone-ban-nsw`

## Internal linking matrix — every post should include
- At least **2 links to relevant service pages** (correct slugs above)
- At least **1 link to another post in this batch** (cross-pollinate)
- At least **1 link to /quote** in body + 1 in footer CTA
- 1 link to a **portfolio project** where natural
- 1 link to a **location page** where the post mentions a city explicitly

## Citation rules inside body
For external data references (e.g. engineered stone ban, NSW labour rates) use inline markdown links with descriptive anchor text. Examples:
- "[Safe Work Australia confirms the prohibition](https://www.safeworkaustralia.gov.au/safety-topic/hazards/crystalline-silica-and-silicosis/prohibition-engineered-stone)"
- Do NOT include a separate "Sources" or "References" section — keep all citations inline

## Quality bar
- Real numbers, real product names, real NSW context
- Honest where competitors lie (e.g. acknowledge flat-pack is right for some buyers)
- Specific, not generic ("Blum Legrabox in Carbon Black with internal drawer dividers", not "high-quality drawers")
- Each post should pass the "would I print this and hand it to a $40k client" test
