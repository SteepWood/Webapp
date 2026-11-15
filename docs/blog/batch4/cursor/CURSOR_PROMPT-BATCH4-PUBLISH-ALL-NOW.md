# Cursor Prompt — Batch 4: Publish all 10 posts now

**Goal:** all 10 Batch 4 posts live in one deploy today, Monday 16 November 2026. They are dated one per day from 7 to 16 November 2026 (Batch 3's last post is 6 November), in the order in `PUBLISHING-SCHEDULE.md`. Use `CURSOR_PROMPT-BATCH4-PHASE1.md` for the detail of each step.

---

## Steps

1. **Phase 1, Step 0.** Inspect and report.
2. **Phase 1, Steps 1–5.** Guardrails, validate, import, placeholder images and schema. `datePublished` = frontmatter date at 07:00 +11:00. `dateModified` = `2026-11-16T07:00:00+11:00`.
3. **Business name fix, site-wide.** The owner confirmed the legal name is **Pavit Pty Ltd** (ABN 52 697 313 269). Earlier batches used "Pavit Cabinetry Pty Ltd" by mistake. Run `grep -rn "Pavit Cabinetry" .` across content, components, schema and config, and replace every "Pavit Cabinetry Pty Ltd" with "Pavit Pty Ltd" (posts in Batches 1–3, the Organization/LocalBusiness `legalName` and `alternateName`, the footer, and any image credit or caption text). Text only: do not change anything else in those files, and do not re-encode existing images. If posts are stored in Prisma, update the stored content in the production database as well, not only the seed files. Update `dateModified` on every post you edit. Pages that already say "Pavit Pty Ltd" are correct; leave them.
4. **Phase 1, Steps 6–7.** Order check and internal link audit. All 10 in the sitemap with `lastmod` = `2026-11-16`.
5. **Phase 1, Step 8.** Copy the package to `docs/blog/batch4/` and save the research as `docs/blog/PERPLEXITY-BLOG-BATCH4-RESEARCH-HANDOFF.md`.
6. **Seed, build, commit and push to `main`.** If posts are seeded into Prisma (as Batches 1–3 were), run the seed against the production database too, or the live site will not show them. Vercel deploys automatically. Wait for the production deployment to finish and confirm it shows Ready.
7. **Check live.** All 10 return 200 at `https://steepwood.com.au/blog/{slug}`. Each is in `/blog`, its category archive, the sitemap and RSS.
8. **Backfill now.** Add the links listed in `PUBLISHING-SCHEDULE.md` "Backfill pass" (inside Batch 4, and from Batch 3 posts to Batch 4). Add Batch 4 posts to related-articles for earlier posts in the same category. Update `dateModified` on edited posts. Re-run the link audit, commit, push and let Vercel redeploy.
9. **Phase 1, Step 9.** Run the acceptance checklist.
10. **Search Console.** Submit the sitemap. Request indexing for the 10 URLs, oldest first.
11. **Report back.** Phase 1 Step 10 format, the number of "Pavit Cabinetry" replacements by file, plus a table of the 10 URLs with `datePublished`, HTTP status and sitemap status.

## Check before deploy

```bash
cd blog-batch4
python3 scripts/build_and_validate.py                  # must end: 10 posts checked, 0 errors, 0 warnings
grep -h '^date:' posts/*.md | sort | sed -n '1p;$p'    # 2026-11-07 … 2026-11-16
```

## Do not

- Do not change any post body, title, slug or keyword, except backfill link sentences and the business name fix.
- Do not date any post later than 16 November 2026.
- Do not remove the date gate code.
- Do not create `/decking` or any new service or location page.
