# AIO Layer Changelog

Branch: `aio-layer` (not merged to `main` until approved)

## Summary

Additive Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) layer on top of the frozen SEO foundation. No existing titles, metas, canonicals, H1/H2/H3 copy, or body paragraphs were modified.

## New components

| Component | Path | Purpose |
|---|---|---|
| IdentityBlock | `src/components/aio/IdentityBlock.tsx` | Verbatim Section 10.1 identity paragraph |
| AnswerFirst | `src/components/aio/AnswerFirst.tsx` | 40–60 word direct-answer prefixes |
| FactsBlock | `src/components/aio/FactsBlock.tsx` | Citation-rich statistics block |

## New libraries

| Module | Path |
|---|---|
| Constants | `src/lib/aio/constants.ts` |
| Answer-first data | `src/lib/aio/answer-first-data.ts` |
| Facts data | `src/lib/aio/facts-data.ts` |
| Fan-out FAQs | `src/lib/aio/fanout.ts` |
| Schema generators | `src/lib/aio/schema.ts` |
| Bot detection | `src/lib/aio/botAgents.ts` |
| Bot visit queries | `src/lib/aio/botVisits.ts` |

## Page wiring

- **Homepage** — IdentityBlock after H1
- **About** — IdentityBlock as opening paragraph
- **Contact** — IdentityBlock in intro
- **Location hubs** — IdentityBlock, FactsBlock, answer-first intro, Place + Speakable schema
- **Service pillars** — FactsBlock, answer-first on what-is and materials, HowTo + Speakable schema
- **Combo pages** — FactsBlock, 7 FAQs (5 existing + 2 fan-out), Speakable schema

## Schema additions (alongside existing JSON-LD)

- Organization `description` — canonical one-sentence (Section 10.2)
- HowTo — kitchens, wardrobes, office fitout, shopfitting pillars
- Place — location hubs with Wikipedia `@id`
- SpeakableSpecification — pages with FAQ sections
- FAQPage — expanded on combo pages with fan-out Q&As

## New files

- `public/llms.txt` — AI crawler summary (Section 10.7)
- `docs/AIO-OFFSITE-CHECKLIST.md` — Kam-owned off-site tasks
- `src/app/api/cron/refresh-content/route.ts` — weekly freshness revalidation
- `src/app/api/internal/ai-bot-visit/route.ts` — bot visit logging
- `src/app/admin/(protected)/ai-visibility/page.tsx` — admin scaffold

## Infrastructure

- `robots.ts` — explicit allow for GPTBot, PerplexityBot, ClaudeBot, Google-Extended, OAI-SearchBot, CCBot; disallow Bytespider
- `vercel.json` — Monday 18:00 UTC cron for `/api/cron/refresh-content`
- `prisma/schema.prisma` — `AiBotVisit` model
- `src/proxy.ts` — logs AI bot user-agents
- `scripts/snapshot-seo.mjs` — `pre-aio` and `post-aio` modes
- `globals.css` — `.answer-first` accent styling

## Manual ops required before launch

1. Run `pnpm prisma:migrate` to create `ai_bot_visits` table
2. Run `pnpm snapshot:seo:pre-aio` with dev server before merge review
3. Run `pnpm snapshot:seo:post-aio` after deploy preview to verify additive-only diff
4. Confirm `CRON_SECRET` is set in Vercel for refresh-content cron

## Deferred to Phase 4

- Person schema (awaiting founder data from Kam)
- Review schema enrichment (testimonial DB integration)
- `llms-full.txt` build pipeline
- Citation tracker, schema health, NAP monitor, freshness dashboard (admin placeholders only)

## SEO contract

Only additive changes permitted:

- New identity paragraphs
- New `.answer-first` prefixes
- New Facts H2 blocks
- New JSON-LD blocks (HowTo, Place, Speakable, expanded FAQPage)
- Organization `description` field

Existing SEO snapshot fields must remain byte-identical aside from the above.
