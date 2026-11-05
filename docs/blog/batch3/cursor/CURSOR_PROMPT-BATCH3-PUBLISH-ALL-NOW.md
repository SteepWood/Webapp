# Cursor Prompt — Batch 3: Publish all 30 posts now

This file **overrides the scheduling parts** of `CURSOR_PROMPT-BATCH3-PHASE1.md`. Everything else in Phase 1 still applies: Step 0 inspection, guardrails, import, placeholder images, schema, the Batch 2 link fix, internal links and the acceptance checklist.

**Goal:** all 30 Batch 3 posts are live in one deploy today (Friday 6 November 2026). They are dated from the day after Batch 2 finished (Batch 2's last post is 23 August 2026) up to today, about every 2–3 days, in the original order.

---

## What changes from Phase 1

| Phase 1 said | Do this instead |
| --- | --- |
| Step 3.3: dates in Nov–Dec at +11:00 | Use the `date` in each post's frontmatter at 07:00 Australia/Sydney. **Before 4 October 2026 use +10:00 (AEST); from 4 October use +11:00 (AEDT).** The exact values are in the `datePublished` column of `PUBLISHING-SCHEDULE.md`. |
| `dateModified` = `datePublished` | `dateModified` = `2026-11-06T07:00:00+11:00` for all 30 posts. |
| Step 6: date gate, one post per day | **No date gate needed.** Every date is today or earlier, so all 30 show at once. Keep the Batch 2 gate in the code. Do not remove it. |
| Step 10: backfill on 7 December | **Run the backfill now**, straight after go-live (see `PUBLISHING-SCHEDULE.md`, "Backfill pass"). |

## Steps

1. **Phase 1, Step 0.** Inspect and report, as written.
2. **Phase 1, Steps 1–5.** Guardrails, validate, import, placeholder images and schema. Use the date and offset rule above when you set `datePublished` and `dateModified`.
3. **Phase 1, Step 7.** The Batch 2 Focus Shopfit link fix.
4. **Phase 1, Step 8.** Internal links and sitemap. Every post goes in the sitemap now, with `lastmod` = `2026-11-06`.
5. **Order check.** On `/blog`, the newest post is `christmas-shutdown-fitout-planning-nsw` (6 Nov 2026). The oldest Batch 3 post, `office-fitout-newcastle-guide` (24 Aug 2026), sits just above Batch 2's `new-home-joinery-growth-corridors-nsw`. Category archives and RSS sort the same way.
6. **Build, deploy and check live.** All 30 return 200 at `/blog/{slug}`. Each one is in `/blog`, its category archive, the sitemap and RSS.
7. **Backfill now.** Add the forward links listed in `PUBLISHING-SCHEDULE.md` "Backfill pass". Add Batch 3 posts to related-articles for Batch 1 and 2 posts in the same category. Re-run the link audit, rebuild and deploy. Update `dateModified` to the deploy time for posts you edit.
8. **Phase 1, Step 11.** Run the acceptance checklist, skipping the date-gate lines. Confirm `datePublished` offsets: +10:00 for posts 1–15 (24 Aug – 29 Sep), +11:00 for posts 16–30 (4 Oct – 6 Nov).
9. **Search Console.** Submit the sitemap. Request indexing for the 30 URLs, oldest first, as many as the daily quota allows. Continue the next day if needed.
10. **Report back.** Use the Phase 1 Step 12 format, plus a table of all 30 URLs with `datePublished`, HTTP status and whether each is in the sitemap.

## Check before deploy

```bash
cd blog-batch3
python3 scripts/build_and_validate.py          # must end: 30 posts checked, 0 errors, 0 warnings
grep -h '^date:' posts/*.md | sort | sed -n '1p;$p'   # 2026-08-24 … 2026-11-06
```

## Do not

- Do not change any post body, title, slug or keyword.
- Do not date any post later than 6 November 2026.
- Do not remove the date gate code. Batch 4 may need it.
