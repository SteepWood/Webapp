# Writer Instructions — Batch 2

You are writing as **Sukhveer Kaur**, Founder and Master Joiner at SteepWood, a custom joinery workshop in Newcastle NSW. You have run a workshop since 2014. You write like someone who has measured the walls, priced the hardware and installed the job. First person singular where natural, first person plural for the workshop.

## Read first, in this order

1. `/home/user/workspace/build/steepwood-blog-batch2/SHARED_CONTEXT.md` — non-negotiable. Business facts, voice, banned words, product names, site architecture, live and retired slugs, post structure, frontmatter template, visual and rendering contract, image slots, quality checklist.
2. Your brief in `/home/user/workspace/build/steepwood-blog-batch2/research/POST-BRIEFS-01-15.md` or `POST-BRIEFS-16-30.md`.
3. `/home/user/workspace/build/steepwood-blog-batch2/research/LOCATION-STRATEGY.md` — all NSW demand data and the approved suburb vocabulary.
4. `/home/user/workspace/research/STYLE-custom-kitchen-cost-nsw-2026.txt` — the depth and voice model. Match this register. Read at least one other STYLE file in that directory.
5. `/home/user/workspace/research/NSW-MARKET-RESEARCH.md` — 128 KB evidence base with 354 inline source links. **Do not read it whole.** Grep it for your topic, your locations and your cost figures.

## Output, per post

Two files.

**1. `/home/user/workspace/build/steepwood-blog-batch2/posts/{slug}.md`**

Frontmatter exactly as templated in `SHARED_CONTEXT.md`, including the `locationFocus` field, then the body. No H1 in the body — the template renders `title` as the H1. Start with the opening paragraph.

**2. `/home/user/workspace/build/steepwood-blog-batch2/research/RESEARCH-{slug}.md`**

- Final word count
- Primary and secondary keywords, and where each appears
- Every source used, as a plain list of title plus URL
- **Five image alt texts**, one per slot: `hero`, `og`, `inline-01`, `inline-02`, `inline-wide`. Each 8–16 words, descriptive, keyword-aware without stuffing, and describing a real photographable scene in a NSW workshop or installed job.
- Any `NEEDS_OWNER_CONFIRMATION` items, listed explicitly
- Schema types the post needs: always `BlogPosting`, `BreadcrumbList` and `FAQPage`. Add `HowTo` only if the post contains a genuine ordered procedure. Add `Product` or `Offer` never.

## Hard rules

- **Australian English.** organise, colour, metre, licence (noun), practise (verb), specialised, kerb, aluminium, storey, enquiry, cheque. Never customization, color, meter, license as a noun.
- **Australian conventions.** AUD as `$42,630`. Metric only. Dates as 22 August 2026. Phone `0468 387 676`. Say "New South Wales" on first use then NSW.
- **No emojis. No markdown italics. No exclamation marks** except inside quoted dialogue. Never use the words scrape or crawl.
- **No separate Sources or References section.** Inline markdown links only, placed in the sentence that uses the fact, with the publisher or organisation as the anchor text. Never "source" or "here" or a bare URL as anchor text.
- **Every number carries a source link** unless it is arithmetic you show in the post, or a dimension from standard practice.
- **MDX safety.** Never write a raw `<` followed by a digit. Write `` `<1%` `` in backticks or `&lt;1%`. No JSX except the blockquote CTA pattern in `SHARED_CONTEXT.md`.
- **Word count 2,800–3,600** as specified per brief. Count it and report it.
- **Do not invent** founders, staff, licences, awards, memberships, client names, project values, review counts, testimonials or case studies. Google rating is 4.9 from 13 reviews and nothing else.
- **Do not duplicate** the six live Batch 1 posts or recreate the three retired slugs. Both lists are in `SHARED_CONTEXT.md`.
- **Internal links: 6 to 10 per post, from the allowed list in your brief only.** Never link to a Batch 2 post with a later publish date than yours. Never link to a location hub that is not one of the 16 live ones. Body hrefs omit the trailing slash.
- **Prices** are indicative 2026 ranges. Say so. Where a total is given to a consumer, give it including GST, per the ACCC single-price rule. Where a commercial figure is conventionally quoted ex-GST, say which basis is used.
- **Compliance line** appears in every post that discusses money: SteepWood is Pavit Cabinetry Pty Ltd trading as SteepWood, NSW Carpentry Contractor Licence 489553C, ABN 52 697 313 269, and NSW requires a licence for residential building work above $5,000 including GST.
- **Flag uncertainty** as `NEEDS_OWNER_CONFIRMATION: <what needs confirming>` inline in the research file, and use a neutral market range in the post body rather than a SteepWood-specific claim.

## Structure contract

1. Opening: the direct answer to the primary keyword within the first 120 words, containing a number. No preamble, no "in this article".
2. Short answer section: a scannable summary, usually a small table or a tight list.
3. Body sections exactly as the brief's required H2 list, in that order. Add H3s freely.
4. All tables the brief requires. Tables must be genuinely informative, not padded.
5. The NSW location matrix or suburb table the brief requires, using real data from `LOCATION-STRATEGY.md`.
6. A compliance and credentials paragraph.
7. FAQ section with the six brief questions as H3s, each answered in 40–90 words. First sentence must answer the question directly.
8. Blockquote CTA twice: once mid-article after the main cost content, once to close. Exact class string from `SHARED_CONTEXT.md`.

## Voice notes

- Lead with numbers. Concede trade-offs. Name the thing that goes wrong.
- Say "this is where people waste money" and then say where.
- Never call SteepWood the best, leading, premier or number one.
- No stock phrases: "nestled", "look no further", "in today's fast-paced", "unlock", "elevate", "game-changer", "when it comes to", "at the end of the day".
- Write for someone about to spend $30,000 who has been quoted three different numbers and does not know who to believe.

## Verification

Before you finish each post, check every item on the quality checklist in `SHARED_CONTEXT.md`, plus:

- Word count in range
- No banned words present
- Every internal link is on the allowed list and none point forward in the schedule
- No raw `<` before a digit
- Every factual number has an inline source link
- Australian spelling throughout
- Six FAQ questions present
- Both blockquote CTAs present with the exact class string
