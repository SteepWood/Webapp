# SteepWood — Manual Operations Runbook (Post–Phase 4)

> **When to run this:** After **all Phase 4 code tasks (5.1–5.7)** are complete and `pnpm build` passes. Do **not** block Phases 1–4 Cursor work on these items — they are the **production launch gate** only.
>
> **Order:** Work top-to-bottom. Each section unlocks the next. Tick every box before cutting over DNS to production.

---

## How this fits the 4-phase build

| Phase | Cursor builds (code) | Manual ops |
|---|---|---|
| 1 Foundation | Project scaffold, design system, Prisma, Supabase clients | **Deferred** → this doc §1–2 |
| 2 Core pages | 192 SEO pages, sitemap, schema | **Deferred** → this doc §7 (GSC after deploy) |
| 3 Lead gen | Quote form, emails, portfolio, blog, admin CRUD | **Deferred** → this doc §3–5 |
| 4 Launch | CWV, security headers, analytics, crons, smoke test | **Deferred** → this doc §6–10 |

Phases 1–4 are **code-complete** when `pnpm typecheck`, `pnpm build`, and each phase's **code acceptance criteria** pass. **Going live** requires this runbook.

---

## 1. Local machine & repository (one-time)

- [ ] Node.js 22 LTS, pnpm 9+, Git, PowerShell 7+
- [ ] `.env.local` filled from `.env.example` (never commit)
- [ ] `pnpm check:env` passes locally
- [ ] GitHub repo connected; `main` branch protected (optional)

---

## 2. Supabase (ap-southeast-2)

### 2.1 Project & connection strings

- [ ] Project `steepwood-prod` in **Sydney** region
- [ ] `DATABASE_URL` — pooler port **6543**, `?pgbouncer=true&connection_limit=1`
- [ ] `DIRECT_URL` — direct port **5432** (migrations only)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` and Vercel

### 2.2 Storage buckets

| Bucket | Access | Purpose |
|---|---|---|
| `quote-attachments` | **Private** — service_role + signed URLs only | Quote form uploads |
| `cms-media` | **Public read** | Admin blog/project hero & gallery images |

- [ ] `quote-attachments` created; direct anon PUT returns **403**
- [ ] `cms-media` created; public URL pattern works for uploaded images

### 2.3 Row-level security

- [ ] Run `sql/admin-rls-policies.sql` in Supabase SQL Editor
- [ ] Verify anon cannot `SELECT` from `quote_requests` (SQL editor test in file footer)
- [ ] Confirm Prisma/service_role still works for app routes

### 2.4 Admin authentication

- [ ] Email auth enabled (magic link only for MVP)
- [ ] **Redirect URL** added: `{NEXT_PUBLIC_SITE_URL}/auth/callback`
- [ ] Magic-link email template branded (Authentication → Email Templates, Australian English)
- [ ] Pre-register each admin user in Authentication → Users (`@steepwood.com.au` only; `shouldCreateUser: false` in app):
  - [x] `hello@steepwood.com.au` — mailbox created; user added in Supabase Auth
  - [x] `sukhveer@steepwood.com.au` — mailbox created; user added in Supabase Auth
- [ ] Optional: seed matching rows in `admin_users` table linked to `auth_user_id`

### 2.5 Backups

- [ ] Manual database snapshot taken before production cutover

---

## 3. Resend (transactional email)

- [ ] Account created; API key → `RESEND_API_KEY`
- [ ] Domain **steepwood.com.au** verified (DKIM ×3, MX, SPF, DMARC)
- [ ] `RESEND_FROM_EMAIL` and `QUOTE_NOTIFY_EMAIL` set (e.g. `hello@steepwood.com.au`)
- [ ] Test send from Resend dashboard succeeds
- [ ] Webhook configured → `/api/webhooks/resend/`; `RESEND_WEBHOOK_SECRET` set (optional but recommended)
- [ ] Quote submission E2E: internal notification + customer auto-reply arrive in Gmail, Outlook, Apple Mail
- [ ] Admin "Mark as contacted" email verified

---

## 4. Vercel deployment

- [ ] Project imported from GitHub; production branch `main`
- [ ] Region **syd1** confirmed (`vercel.json`)
- [ ] All env vars set for **Production** (mirror `.env.example`)
- [ ] `CRON_SECRET` set in Vercel; cron routes reject unauthorised calls
- [ ] Vercel Cron tab shows 3 jobs (publish posts, weekly summary, cleanup uploads)
- [ ] Preview deploy smoke test: `pnpm smoke https://your-preview-url.vercel.app`
- [ ] Custom domain `steepwood.com.au` added; DNS A/AAAA or CNAME configured
- [ ] `www` → apex 301 redirect configured
- [ ] HTTPS certificate active

---

## 5. DNS & domain

- [ ] Registrar: `steepwood.com.au` registered
- [ ] Nameservers pointed to Vercel DNS or Cloudflare (grey-cloud apex if proxied)
- [ ] Email DNS records from Resend (§3) live
- [ ] GSC verification TXT record added when ready (§7)
- [ ] TTL lowered to **300s** for 48h pre-launch (fast rollback)

---

## 6. Google services

- [x] **GA4** property created; `NEXT_PUBLIC_GA4_ID` set; realtime shows `page_view` after deploy
- [x] Key events marked: `quote_submit`, `contact_submit`
- [x] **Search Console** — property verified (DNS TXT preferred); sitemap `/sitemap.xml` submitted
- [x] **Bing Webmaster Tools** — import from GSC or verify manually; sitemap submitted
- [ ] **Google Business Profile** claimed; NAP matches website exactly
  - Location ref: `om-6582854789951435152` — **verification in progress** (2026-06-19)
- [x] Cookie consent tested: decline → GA4 script not loaded

---

## 7. Content, brand & legal (pre-launch)

- [ ] Logo, favicon, OG assets finalised (no placeholders)
- [ ] General Sans font files in `src/assets/fonts/` if not already (SIL licence noted)
- [ ] Real phone, workshop address, ABN, NSW Builder's Licence on site
- [ ] Lawyer-reviewed legal pages live (`/legal/privacy/`, `/legal/terms/`, `/legal/consumer-rights/`)
- [ ] ≥10 verified testimonials published
- [ ] ≥6 portfolio projects published
- [ ] ≥3 cornerstone blog posts published
- [ ] Hero / workshop photography replaces placeholders
- [ ] `pnpm audit:content` — 0 thin pages, 0 duplicate intros (or documented exceptions)

---

## 8. Security & performance verification (post-deploy)

- [ ] `curl -I https://steepwood.com.au` — HSTS, CSP, X-Frame-Options present
- [ ] https://securityheaders.com — grade **A or A+**
- [ ] HSTS preload submitted (https://hstspreload.org) — optional
- [ ] PageSpeed Insights mobile ≥90 on 5 sample URLs (home, service, location, combo, blog)
- [ ] Vercel Speed Insights + Analytics receiving data
- [ ] `pnpm audit` — 0 high/critical vulnerabilities
- [ ] Admin: unauthenticated `/admin/*` → login; non-`@steepwood.com.au` email rejected at callback

---

## 9. End-to-end functional tests

- [ ] Quote form: 3 steps → DB row in `quote_requests` → 2 emails → thank-you page
- [ ] Quote attachments: signed upload only; reject >10 MB and bad MIME types
- [ ] Contact form: DB row + notification email
- [ ] Admin dashboard shows new quote; status update + notes persist
- [ ] Admin CRUD: testimonial verify → visible on homepage; blog publish → `/blog/[slug]/`; project publish → `/portfolio/[slug]/`; service-location intro → combo page updates
- [ ] `pnpm smoke` against **production** — 100% pass
- [ ] Mobile UX: iOS Safari + Chrome Android on quote flow and contact
- [ ] OG preview tested (opengraph.xyz) on 5 URLs

---

## 10. Launch day cutover

- [ ] Backup current DNS records documented
- [ ] Final production smoke test green
- [ ] Soft launch announcement (email list, GBP, LinkedIn)
- [ ] Monitor GSC index coverage + Vercel Analytics daily for 14 days
- [ ] `git tag v1.0.0-launch`

---

## Quick reference — SQL & scripts in repo

| Asset | Path |
|---|---|
| Admin RLS policies | `sql/admin-rls-policies.sql` |
| Content audit | `pnpm audit:content` |
| Smoke test | `pnpm smoke` or `pnpm smoke https://steepwood.com.au` |
| CWV audit log | `docs/cwv-audit.md` |
| GSC/Bing tracker | `docs/tools-verification.md` |
| Env template | `.env.example` |

---

## Phase completion tags (code-only)

These tags mark **code milestones**, not production launch:

| Tag | Meaning |
|---|---|
| `phase-1-complete` | Foundation code shipped |
| `phase-2-complete` | 192 pages + SEO code shipped |
| `phase-3-complete` | Quote form + admin CRUD code shipped |
| `phase-4-complete` | Performance, security, analytics, crons code shipped |
| `v1.0.0-launch` | **This runbook** fully ticked + production live |
