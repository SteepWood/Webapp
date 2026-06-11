# SteepWood — Cursor Build Prompt: PHASE 4 of 4
## POLISH, PERFORMANCE AND LAUNCH (CODE)

> **How to use this file with Cursor:**
> 1. Open the SteepWood project where Phase 3 finished (git tag `phase-3-complete` should exist).
> 2. Open Cursor Chat (Cmd/Ctrl+L), select **Agent** mode.
> 3. Paste the line below into the chat first:
>    `Read this entire file end-to-end before doing anything. Then execute Phase 4 task-by-task in order. After each task, run verification commands, summarise, and wait for me to say "next" before starting the next task. Use Australian English throughout. Do not block on external dashboard setup — all manual ops are deferred to STEEPWOOD-MANUAL-OPS.md until after Task 5.7.`
> 4. Then attach or paste this file.
> 5. When Phase 4 **code** is complete, tag `phase-4-complete`, then run **`docs/STEEPWOOD-MANUAL-OPS.md`** before production cutover.

---

## BUILD-FIRST WORKFLOW (read before Task 5.1)

**Phases 1–4 = code only.** Cursor completes when `pnpm typecheck` and `pnpm build` pass and each phase's **code acceptance criteria** below are green.

**Manual / dashboard / DNS / email verification** is **not** a phase blocker. Everything external is consolidated in:

→ **`docs/STEEPWOOD-MANUAL-OPS.md`** (run after Task 5.7, before `v1.0.0-launch`)

During Phases 1–4 you may use `.env.local` with dev/preview credentials. Mock or skip live email delivery in local dev if keys are missing — code paths must still compile and fail gracefully.

---

## PHASE 4 SCOPE (what this phase ships — code)

- Core Web Vitals optimisation (LCP, INP, CLS) + Vercel Speed Insights
- Security headers + CSP in `next.config.ts`
- GA4 + Vercel Analytics + typed conversion events + cookie consent
- Custom 404 / 500 / global-error pages
- `vercel.json` (syd1, crons) + cron API routes (scheduled posts, weekly summary, draft upload cleanup)
- `scripts/smoke-test.ts` + `pnpm smoke`
- GSC/Bing **code artifacts** (`docs/tools-verification.md` template) — actual verification deferred to manual ops

**Phase 4 does NOT require (deferred):** live DNS cutover, Resend domain verification, Supabase bucket creation in dashboard, production GSC submission, real content photography, lawyer sign-off.

**Phase 4 code milestone tag:** `phase-4-complete`  
**Production launch tag:** `v1.0.0-launch` (only after `STEEPWOOD-MANUAL-OPS.md` is fully ticked)

---

## PHASE 4 TASKS (implementation status)

Tasks **5.1 → 5.7** are implemented in code. Summary:

| Task | Deliverable |
|---|---|
| **5.1** | CWV audit, image `priority`/`sizes`, Speed Insights |
| **5.2** | Security headers + CSP in `next.config.ts` |
| **5.3** | GA4, Vercel Analytics, event tracking, cookie consent |
| **5.4** | `docs/tools-verification.md` template (GSC/Bing steps documented) |
| **5.5** | `not-found.tsx`, `error.tsx`, `global-error.tsx` |
| **5.6** | `vercel.json`, cron routes, `CRON_SECRET` in env |
| **5.7** | `scripts/smoke-test.ts`, `pnpm smoke`, launch runbook pointer |

| Task | Key files |
|---|---|
| 5.1 | `src/app/page.tsx`, `src/components/analytics/AnalyticsShell.tsx`, `docs/cwv-audit.md` |
| 5.2 | `next.config.ts` |
| 5.3 | `src/lib/analytics/*`, `src/components/CookieConsent.tsx`, event wiring in forms/layout |
| 5.4 | `docs/tools-verification.md` (template — verification deferred) |
| 5.5 | `src/app/not-found.tsx`, `error.tsx`, `global-error.tsx` |
| 5.6 | `vercel.json`, `src/app/api/cron/*`, `CRON_SECRET` in `src/env.ts` |
| 5.7 | `scripts/smoke-test.ts`, `pnpm smoke` |

---

## PHASE 4 CODE ACCEPTANCE CRITERIA

Declare Phase 4 **code complete** when ALL are true (no manual/dashboard gates):

- [x] `pnpm typecheck` and `pnpm build` pass with 0 errors
- [x] Speed Insights component wired in root layout
- [x] Security headers configured in `next.config.ts`
- [x] GA4 + Vercel Analytics components wired; events helpers exist for quote, contact, phone, project, blog depth
- [x] Cookie consent gates GA4 script load
- [x] Branded 404, error, and global-error pages render
- [x] `vercel.json` defines syd1 + 3 cron paths; cron routes verify `CRON_SECRET`
- [x] Scheduled blog publish cron updates `isPublished` and calls `revalidatePath`
- [ ] `pnpm smoke` passes against running dev/preview URL (run locally: `pnpm dev` then `pnpm smoke`)
- [ ] Lighthouse mobile Performance ≥85 (verified in manual ops)
- [ ] Final commit tagged `phase-4-complete`

When every box is ticked, stop and tell me Phase 4 code is complete. Then open **`docs/STEEPWOOD-MANUAL-OPS.md`** and work through it before production launch.

---

## AFTER PHASE 4 — MANUAL OPS (launch gate)

All items previously scattered across Phases 1–3 task checklists, environment setup (Section 7), Task 4.8 RLS notes, Resend/DNS setup, and Section 8 Launch Readiness are now in one place:

**→ `docs/STEEPWOOD-MANUAL-OPS.md`**

Do not declare the site **live** until that runbook is fully ticked and `git tag v1.0.0-launch` is created.
