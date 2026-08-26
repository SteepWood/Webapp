# SteepWood — Shared Context (Blog Batch 2, NSW Local SEO Programme)

Single source of truth for every writer, editor and implementer working on Batch 2.
Version: 2026-08-21. Site: https://steepwood.com.au

---

## 1. Business facts (use verbatim, never invent beyond this)

| Field | Value |
| --- | --- |
| Trading name | SteepWood |
| Legal entity | Pavit Cabinetry Pty Ltd t/as SteepWood |
| Workshop | Newcastle, NSW |
| Operating since | 2014 |
| ABN | 52 697 313 269 |
| Licence | NSW Carpentry Contractor Licence 489553C |
| Warranty | 10-year structural warranty on all joinery |
| Insurance (public copy) | Public liability $20 million; workers' compensation current |
| Author byline (all posts) | Sukhveer Kaur (Founder & Master Joiner) |
| Phone | 0468 387 676 (`tel:+61468387676`) |
| Email | hello@steepwood.com.au |
| Hours | Mon–Fri 7am–5pm; Sat by appointment |
| Service model | Free in-home measure and quote across NSW and ACT; furniture-freight delivery to QLD, VIC, WA, SA |
| Google rating (as published on site) | 4.9, 13 reviews |
| Positioning | Premium custom joinery, residential and commercial, designed and manufactured in Newcastle |

Do not invent other founders, other licences, award claims, client names, project values, or review counts.

Anything requiring legal or licence confirmation must be flagged in the research note as `NEEDS_OWNER_CONFIRMATION`.

---

## 2. Brand voice

- Brisk, technical, confident Australian English.
- Written from inside the workshop (tradesperson point of view), never agency marketing voice.
- Honest where competitors exaggerate. Say when flat-pack or mid-tier is genuinely enough.
- Specific, not generic. Name products, species, hardware, and 2026 AU price bands.
- No emojis. No markdown italics. Bold sparingly.
- No exclamation marks except inside quoted dialogue.
- Never use the words "scrape" or "crawl".
- Test: would we print this and hand it to a $40,000 client?

### Australian English (mandatory)

colour, centre, favourite, organisation, specialise, customise, recognise, kilometres, metres, catalogue, enquiry, practise (verb) / practice (noun), licence (noun) / license (verb), defence, analyse, travelling, fitout (one word), programme (structured plan) / program (software), storey (building level), aluminium, mould, kerb.

### Named products and materials (real AU names only)

- Panels and finishes: Polytec, Polytec SYNC, Laminex, Laminex Woodmatt, HMR MDF, 2-pac polyurethane, timber veneer
- Hardware: Blum (Legrabox, Aventos, Clip Top Blumotion, SERVO-DRIVE, Tandembox), Hettich, Häfele
- Benchtops: Dekton, Neolith, Smartstone (porcelain/sintered lines), Essastone, Quantum Quartz; Caesarstone only in historical or post-ban context
- Timbers: Spotted Gum, Blackbutt, Tasmanian Oak, Blackwood, Victorian Ash, American oak (name as an import)
- Regulation: WHS engineered stone prohibition effective 1 July 2024 (cite Safe Work Australia / SafeWork NSW)

Pricing: AUD, `$X,XXX` format, labelled as indicative 2026 ranges. Never present a range as a fixed quote.

---

## 3. Site architecture (respect exactly)

### 3.1 Service pages (flat root, no `/services/` prefix)

`/custom-kitchen-joinery/`, `/built-in-wardrobes/`, `/office-fitout/`, `/shopfitting/`, `/custom-bathroom-vanity/`, `/commercial-joinery/`, `/custom-furniture/`, `/home-office-joinery/`, `/laundry-cabinets/`, `/staircase-joinery/`

### 3.2 Service × location combos (all 10 services × all 16 locations exist)

`/{service}/{location}/` — e.g. `/custom-kitchen-joinery/newcastle/`, `/laundry-cabinets/central-coast/`

### 3.3 Location hubs — 16 live

`/locations/{slug}/` for: newcastle, sydney, canberra, melbourne, central-coast, hunter-valley, gold-coast, wollongong, brisbane, perth, byron-bay, port-macquarie, coffs-harbour, adelaide, bathurst, orange

NSW-relevant subset used by Batch 2 blogs: newcastle, sydney, central-coast, hunter-valley, wollongong, byron-bay, port-macquarie, coffs-harbour, bathurst, orange.

Batch 2 recommends adding new NSW hubs (see `research/LOCATION-STRATEGY.md`). Until those pages exist, blogs must only link to the 16 hubs above. Suburb and LGA names may appear as plain text in body copy without a link.

### 3.4 Portfolio (safe to link)

`/portfolio/`, `/portfolio/hamptons-kitchen-newcastle/`, `/portfolio/walk-in-robe-sydney/`, `/portfolio/floating-vanity-byron-bay/`, `/portfolio/office-fitout-canberra/`, `/portfolio/home-office-wollongong/`, `/portfolio/laundry-cabinets-central-coast/`

### 3.5 Conversion and legal

`/quote/` (primary CTA), `/contact/`, `/about/`, `/legal/consumer-rights/`, `tel:+61468387676`

### 3.6 Trailing slashes

Production uses trailing slashes. In frontmatter `internalLinks.url` values omit the trailing slash (Batch 1 style). In body markdown hrefs also omit it: `/custom-kitchen-joinery`, `/blog/{slug}`, `/locations/newcastle`.

---

## 4. Live blog inventory — never republish or duplicate

### 4.1 Batch 1 (live)

| Slug | Primary keyword | Category |
| --- | --- | --- |
| `custom-kitchen-cost-nsw-2026` | custom kitchen cost NSW | Cost Guides |
| `flat-pack-vs-custom-kitchen-australia` | flat pack vs custom kitchen | Buying Guides |
| `2pac-laminate-timber-veneer-kitchen-finishes-nsw` | 2pac vs laminate kitchen | Materials |
| `walk-in-robe-built-in-wardrobe-cost-guide-nsw` | walk in robe cost | Wardrobes |
| `questions-to-ask-custom-joiner-australia` | questions to ask custom joiner | Buying Guides |
| `benchtop-guide-engineered-stone-ban-nsw` | engineered stone alternatives | Materials |

### 4.2 Retired slugs (301'd — never recreate)

`kitchen-storage-planning-australia`, `joinery-materials-guide-2pac-timber`, `australian-home-joinery-trends-2026`

### 4.3 Cannibalisation rules

- No second generic "custom kitchen cost NSW" guide.
- Do not rewrite the engineered-stone ban post; link to it whenever benchtops come up.
- New kitchen-adjacent posts must attack a different primary keyword and a different SERP.
- Treat all six Batch 1 posts as pillar assets and link to them generously.

---

## 5. Post structure contract (every Batch 2 draft)

1. YAML frontmatter first, nothing before `---` (template in §6).
2. `# H1` matching or closely matching `title`.
3. Lede: 2–3 sentences, hook + promise + NSW specificity, primary keyword inside the first 100 words.
4. 6–9 `##` sections; `###` subsections where useful. Section headings should read like questions or plain statements a buyer would type.
5. At least two tables (cost tiers, comparison, spec matrix, or location matrix). GitHub-flavoured markdown.
6. At least one explicit NSW location matrix or location-specific section naming real suburbs, LGAs or regions.
7. Minimum 5 inline internal links with varied descriptive anchors. Never "click here" or "learn more".
8. One mid-article CTA using this exact blockquote pattern:

```markdown
> **STEEPWOOD SERVICE NAME** — Short pitch tied to the section. [Descriptive anchor](/custom-kitchen-joinery) or [Get a free measure and quote](/quote).
```

9. FAQ section: 5–6 Q&As as `###` questions with plain-paragraph answers, exactly matching the `faq` frontmatter block.
10. Footer CTA: final paragraph pointing to `/quote`.
11. Target 2,600–3,600 words. Batch 1 live posts run 2,450–3,470 words; match or slightly exceed.
12. Australian English throughout, including title, meta description, alt text, FAQ and tables.

### Citation rules

- External facts get inline markdown links with descriptive anchors.
- No separate "Sources" or "References" section.
- Every price band, statistic, regulation or population figure needs a real source link.

### MDX safety

- Escape comparison operators: write `` `<1%` `` or `&lt;1%`, never raw `<1%`.
- No custom JSX components beyond the blockquote CTA pattern.
- Do not use raw HTML.

### Internal linking matrix (minimum per post)

- 2+ links to relevant service pages
- 1+ link to a service × location page
- 1+ link to a location hub
- 1+ link to another blog post (Batch 1 or Batch 2)
- 1 body link to `/quote` plus the footer CTA
- 1 portfolio link where natural

---

## 6. Frontmatter template (copy exactly)

```yaml
---
title: "<exact H1 target, ≤60 chars preferred>"
slug: "<kebab-case-url-slug>"
description: "<meta description, 145–160 chars, includes primary keyword>"
date: "2026-08-XX"
author: "Sukhveer Kaur"
category: "<Cost Guides | Materials | Buying Guides | Kitchen Design | Wardrobes | Trends | Commercial | Home Offices | Bathrooms | Laundry | Staircases | Local Guides>"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
readingTime: "<X> min read"
hero:
  src: "/blog/<slug>/hero.jpg"
  alt: "<descriptive AU alt text, includes primary keyword and NSW location>"
ogImage: "/blog/<slug>/og.jpg"
primaryKeyword: "<main target keyword phrase>"
secondaryKeywords: ["kw1", "kw2", "kw3", "kw4", "kw5"]
locationFocus: ["<NSW location 1>", "<NSW location 2>", "<NSW location 3>"]
internalLinks:
  - { url: "/<service>", anchor: "<descriptive anchor>" }
  - { url: "/<service>/<location>", anchor: "<descriptive anchor>" }
  - { url: "/locations/<location>", anchor: "<descriptive anchor>" }
  - { url: "/blog/<existing-or-batch2-slug>", anchor: "<descriptive anchor>" }
  - { url: "/quote", anchor: "Get a free measure and quote" }
faq:
  - question: "<Q1>"
    answer: "<A1 in plain text, 2–4 sentences>"
  # 5–6 total
relatedPosts:
  - "<slug-of-related-post-1>"
  - "<slug-of-related-post-2>"
  - "<slug-of-related-post-3>"
---
```

`locationFocus` is a new Batch 2 field. It is optional for the renderer and used for internal reporting and future location filtering. Cursor must not break if it is ignored.

---

## 7. Visual and rendering contract (matches live design)

Observed from the live Batch 1 template on 2026-08-21. Writers do not touch CSS; this section exists so markdown maps cleanly onto the existing renderer.

### 7.1 Design tokens in use

| Token | Value |
| --- | --- |
| Page background | `#F7F1E8` (warm linen) |
| Body text | near-black warm ink, approx `#1F1610` at 90% opacity |
| Heading colour | `ink-900` (approx `#1F1610`) |
| Hero band background | dark espresso `#2A1F17`-family, hero image inset |
| Accent / CTA button | tan-bronze, `amber-500`-family border on blockquotes |
| Display font | Fraunces (serif), weight 500, negative letter-spacing |
| Body font | generalSans |
| Mono / eyebrow font | IBM Plex Mono, uppercase, letter-spaced (used for the category eyebrow) |
| Border radius | 8px / 0.625rem |

### 7.2 How markdown renders

| Markdown | Rendered as |
| --- | --- |
| `#` H1 | Fraunces 52px/65px over the dark hero band, with category eyebrow above in mono uppercase |
| `##` H2 | Fraunces 36px, top hairline rule `border-t border-ink-700/10`, generous top margin |
| `###` H3 | Fraunces 24px, no rule |
| paragraph | 18–24px body, `text-ink-800/90` |
| `- ` list | disc list, `pl-6`, `space-y-2` |
| table | full-width, `border-collapse`, body size, hairline row separators |
| `> **LABEL** — text` | left-border amber blockquote on `bg-ink-50`, serif h4 size, not italic |
| FAQ `###` questions | rendered as H3s; JSON-LD `FAQPage` is generated from frontmatter `faq` |

### 7.3 Image slots (auto-inserted by the template, not by markdown)

Do not place markdown image syntax in the body. The template pulls these paths:

| Asset | Path | Size | Aspect | Placement |
| --- | --- | --- | --- | --- |
| Hero | `/public/blog/{slug}/hero.jpg` | 1600×1000 | 16:10 | dark band under breadcrumb |
| OG | `/public/blog/{slug}/og.jpg` | 1200×630 | 1.91:1 | social card only |
| Inline 1 | `/public/blog/{slug}/inline-01.jpg` | 1200×900 | 4:3 | two-up grid, upper third of article |
| Inline 2 | `/public/blog/{slug}/inline-02.jpg` | 1200×900 | 4:3 | two-up grid, beside inline-01 |
| Inline wide | `/public/blog/{slug}/inline-wide.jpg` | 1600×1000 | 16:10 | full-width, after the FAQ block |

Writers must supply alt text for all five slots in the post's research note so Phase 2 can generate matching imagery.

### 7.4 Page furniture already provided by the template

Breadcrumb, category eyebrow, reading time, author aside ("About Sukhveer Kaur"), related-articles grid (from `relatedPosts`), footer quote CTA band, newsletter block. Writers must not duplicate any of these in body markdown.

---

## 8. SEO and schema expectations

Every post emits:

- `BlogPosting` (with `author`, `datePublished`, `dateModified`, `image`, `publisher`)
- `BreadcrumbList` (Home → Blog → Post)
- `FAQPage` built from frontmatter `faq`
- Canonical `https://steepwood.com.au/blog/{slug}/`
- Meta title from frontmatter `title` (site template appends `| SteepWood Joinery` — do not bake the brand into `title`)
- `revalidate` ≈ 3600s

Full schema payloads, including the Batch 2 additions (`Service`, `LocalBusiness`/`HomeAndConstructionBusiness`, `AreaServed`, `HowTo`, `ItemList`, `Speakable`), are specified in `cursor/SCHEMA-SPEC.md`.

---

## 9. Quality checklist (every post, before hand-off)

- [ ] Primary keyword in H1, meta description, first 100 words, and at least one H2
- [ ] No Batch 1 slug collision, no retired slug reuse, no duplicate primary keyword within Batch 2
- [ ] Australian English throughout
- [ ] Real product, timber and hardware names wherever a claim is made
- [ ] Every price band labelled as an indicative 2026 range with a source link
- [ ] Licence, ABN and warranty wording matches §1
- [ ] Frontmatter `faq` and body FAQ H3s match word for word
- [ ] All internal links resolve against §3 maps
- [ ] Mid-article `STEEPWOOD` blockquote CTA present, plus footer `/quote` CTA
- [ ] Two or more tables present
- [ ] At least one NSW location section with real suburbs or LGAs
- [ ] No raw `<digit` MDX hazards, no raw HTML, no markdown italics
- [ ] `relatedPosts` point at real Batch 1 or Batch 2 slugs
- [ ] Word count 2,600–3,600
- [ ] Five image alt texts recorded in the research note
