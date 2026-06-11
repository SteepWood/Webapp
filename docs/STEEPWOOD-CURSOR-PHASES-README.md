# SteepWood Cursor Build — 4-Phase Prompt Pack

This pack splits the SteepWood master build doc into four self-contained Cursor prompts. Each file is a complete prompt you can paste into Cursor Agent mode to execute one phase of the build, in order, without missing any information from the master doc.

---

## Build-first workflow (Phases 1–4 = code; manual ops = after Phase 4)

**Phases 1–4 are code-only milestones.** Cursor should not block on Supabase dashboard clicks, DNS, Resend domain verification, RLS SQL in production, or live email deliverability tests while building.

All external / manual / dashboard work is consolidated in **`STEEPWOOD-MANUAL-OPS.md`**. Run that runbook **after Phase 4 code is complete** (`phase-4-complete` tag), **before** production cutover (`v1.0.0-launch` tag).

| Milestone | Tag | What it means |
|---|---|---|
| Phase N code done | `phase-N-complete` | `pnpm build` passes + phase code acceptance criteria |
| Production launch | `v1.0.0-launch` | Manual ops runbook fully ticked |

---

## How the pack works

Each phase file is **self-contained** — it embeds:

- The project overview, design system, technical architecture, and conversion strategy (Section 1 of the master doc).
- The exact tasks for that phase, copied verbatim from the master doc.
- Any phase-specific reference material the phase needs (e.g. Phase 2 has the full SEO Content Kit; Phase 4 has performance/security/cron code tasks).
- **Code acceptance criteria** that gate the next phase (manual ops deferred).

You do not need the master doc open while running Cursor. You only need the file for the phase you're working on.

---

## Order of execution

Phases must be run in order. Each phase ends with a git tag that the next phase checks for.

| Phase | File | Git tag at end | Output |
|---|---|---|---|
| 1 | `STEEPWOOD-PHASE-1-FOUNDATION.md` | `phase-1-complete` | Next.js project, design system, fonts, global Header/Footer, sticky CTA, root JSON-LD, placeholder homepage. |
| 2 | `STEEPWOOD-PHASE-2-CORE-PAGES.md` | `phase-2-complete` | All 192 public pages live with full SEO content, schema, sitemap, robots, legal pages. |
| 3 | `STEEPWOOD-PHASE-3-LEAD-GEN.md` | `phase-3-complete` | Multi-step quote form, Resend, portfolio, blog, testimonials, admin panel + CRUD. |
| 4 | `STEEPWOOD-PHASE-4-LAUNCH.md` | `phase-4-complete` | CWV, security headers, analytics code, crons, smoke test. |
| — | `STEEPWOOD-MANUAL-OPS.md` | `v1.0.0-launch` | All dashboard/DNS/email/RLS/E2E checks — **after Phase 4 code**. |

---

## How to use each phase prompt in Cursor

1. Open the SteepWood project directory in Cursor (for Phase 1, open an empty directory).
2. Open Cursor Chat (Cmd/Ctrl + L) and switch to **Agent** mode. Pick a strong model (Claude 3.7 Sonnet or GPT-5 class).
3. Paste this kickoff line first:
   `Read this entire file end-to-end before doing anything. Then execute the phase task-by-task in order. After each task, run any verification commands listed, summarise what changed, and wait for me to say "next" before starting the next task. Use Australian English throughout. Do not invent copy — pull verbatim from the embedded content kit when the prompt references it.`
4. Then attach (drag in) or paste the phase file.
5. Work through tasks in order. After each task: review the diff, confirm verification commands passed, then type `next`.
6. When the phase acceptance criteria are all green, commit + tag, then move to the next phase file.

---

## Why this works

- **Each phase prompt is small enough to fit in a Cursor Agent context window** while being complete enough that Cursor never needs to ask "what does X mean".
- **The locked specs (design system, architecture, Cursor rules) are repeated in every phase file** so a fresh Cursor session in any phase has full context.
- **The SEO Content Kit is embedded inside Phase 2** because that's the only phase that needs to render the actual copy. Other phases reference page slugs without needing the full text.
- **Each phase has a hard acceptance gate**, which prevents Cursor from declaring "done" prematurely.

---

## Files in this pack

- `STEEPWOOD-PHASE-1-FOUNDATION.md` — Phase 1 prompt
- `STEEPWOOD-PHASE-2-CORE-PAGES.md` — Phase 2 prompt (includes full SEO Content Kit)
- `STEEPWOOD-PHASE-3-LEAD-GEN.md` — Phase 3 prompt
- `STEEPWOOD-PHASE-4-LAUNCH.md` — Phase 4 prompt (code)
- `STEEPWOOD-MANUAL-OPS.md` — **Post–Phase 4 manual runbook** (launch gate)
- `STEEPWOOD-CURSOR-MASTER-BUILD.md` — Original master doc (keep as reference; you don't need it open during builds)
- This README

---

## Coverage check vs the master doc

Every section of the master doc has been mapped into a phase prompt:

| Master doc section | Lives in |
|---|---|
| 1. Master plan (overview, competitors, SEO, design, architecture, conversion) | Embedded in every phase file as "Shared context" |
| 2. Phase 1 tasks (2.1–2.13) | Phase 1 file |
| 3. Phase 2 tasks (3.1–3.12) | Phase 2 file |
| 4. Phase 3 tasks (4.1–4.9) | Phase 3 file |
| 5. Phase 4 tasks (5.1–5.7) | Phase 4 file |
| 6. Cursor rules (.cursor/rules/steepwood.mdc) | Phase 1 file (you save the rules file in Task 2.1) |
| 7. Environment setup checklist | `STEEPWOOD-MANUAL-OPS.md` §1–2 (post–Phase 4; reference copy kept in Phase 1 file) |
| 8. Launch readiness checklist | `STEEPWOOD-MANUAL-OPS.md` §8–10 (post–Phase 4) |
| 9. SEO Content Kit (services, locations, combos, schema, home/about/contact copy) | Phase 2 file |

No master-doc content has been dropped. The pack is a lossless re-organisation of the master doc into four execution-ready Cursor prompts.
</content>
</invoke>