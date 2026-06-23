# Search & analytics tool verification (manual — post–Phase 4)

> Run these steps from **`STEEPWOOD-MANUAL-OPS.md` §6** after Phase 4 code is deployed to production or a stable preview URL.

## Programme phases (owner roadmap)

| Phase | Focus | Status |
|---|---|---|
| **Phase 1** | Customisation questionnaire, business data, content, deploy & seed | **Complete** (2026-06-22) |
| **Phase 2** | SEO optimisation & growth | **In progress** — P0 audit fixes shipped 2026-06-22 |
| Phase 3+ | TBD | Not started |

> **Note:** Phase 1 here means the **52-item pre-launch customisation programme** (live site on steepwood.com.au). This is separate from the original build-phase tags in `docs/STEEPWOOD-CURSOR-PHASES-README.md` (`phase-1-complete` = foundation scaffold).

---

## Phase 1 — customisation & launch — **COMPLETE**

| Field | Value |
|---|---|
| Status | **Complete** (2026-06-22) |
| Questions answered | **Q1–Q51** |
| Q52 | **Skipped** (owner sign-off — questionnaire closed) |
| Production URL | https://steepwood.com.au |
| Production deploy | Ready (2026-06-22) |
| Production seed | `pnpm db:seed` — 6 blog posts, 6 portfolio projects, 13 testimonials |

### End-batch items completed

- Commit & push to `main`
- Vercel production deploy (blog prerender fixes included)
- Production database seed
- Form email E2E (hello@ notifications + quote auto-reply)

### Deferred to manual ops (not blocking launch)

| Item | Source | Notes |
|---|---|---|
| DMARC DNS record | Q40 / email | `_dmarc` TXT still pending — see Resend section below |
| Security headers live curl test | Q38 | Code in `next.config.ts`; verify on production |
| PageSpeed mobile ≥90 (5 URLs) | Q38 | Not run on latest deploy |
| `pnpm audit:content` on production | Q37 | Local fixes applied; full production audit optional |
| Sitemap resubmit (search page) | Q51 | GSC/Bing may need refresh after `/search/` added |
| GSC email reports | Below | Still pending |
| Real Google reviews outreach | Q45 | Review link wired; client outreach is manual |

### Handoff to Phase 2 (SEO)

Phase 1 delivered a production-ready site with real NAP, portfolio, blog, schema, search, and verified forms. Phase 2 work will be driven by owner-supplied SEO prompts (technical SEO, content, indexing, local, performance-as-SEO, etc.).

---

## Google Search Console

| Field | Value |
|---|---|
| Property URL | `https://steepwood.com.au` (domain property — ownership verified) |
| Verification method | DNS TXT record |
| TXT record added | Yes |
| Verified date | 2026-06-16 |
| Sitemap submitted | Yes — `https://steepwood.com.au/sitemap.xml` (2026-06-19) |
| Sitemap status | Success — 202 pages discovered |
| Email reports enabled | _pending_ |

## Bing Webmaster Tools

| Field | Value |
|---|---|
| Import from GSC | Yes |
| Verified date | 2026-06-19 |
| Sitemap submitted | `https://steepwood.com.au/sitemap.xml` |
| Sitemap status | Success — 202 pages discovered |

## GA4

| Field | Value |
|---|---|
| Property name | SteepWood (web stream) |
| Measurement ID | `G-DJCTNBQ2E3` |
| Key events configured | `quote_submit`, `contact_submit` — marked as key events |
| Verified in realtime | Yes — 2026-06-19 |
| Cookie consent tested | Accept → GA4 loads; decline → no script (per privacy policy) |

## Resend (transactional email)

| Field | Value |
|---|---|
| Domain | steepwood.com.au |
| Domain verified | Yes (Resend API — 2026-06-22) |
| From address | `hello@steepwood.com.au` |
| Notify inbox | `hello@steepwood.com.au` |
| Vercel Production env | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `QUOTE_NOTIFY_EMAIL` — set |
| Form email E2E tested | **Yes — 2026-06-22** — hello@ notifications + sukhveer@ auto-reply confirmed |

### DNS status (2026-06-22)

| Record | Status | Value / notes |
|---|---|---|
| MX (inbound) | Pass | `steepwood-com-au.mail.protection.outlook.com` — Microsoft 365 receives hello@ / sukhveer@ |
| SPF — root | Pass | `v=spf1 include:secureserver.net -all` — workspace inboxes |
| SPF — `send` subdomain | Pass | `v=spf1 include:amazonses.com ~all` — Resend outbound |
| DKIM — `resend._domainkey` | Pass | Resend signing key present |
| DMARC — `_dmarc` | **Pending** | Add TXT: `v=DMARC1; p=quarantine; rua=mailto:dmarc@steepwood.com.au;` |

Run locally: `pnpm email:dns-check`

### Form email behaviour

| Form | Team notification | Customer auto-reply |
|---|---|---|
| **Quote** (`/quote/`) | → `hello@steepwood.com.au` | → submitter email |
| **Contact** (`/contact/`) | → `hello@steepwood.com.au` | _none (by design)_ |

Test send bundle: `pnpm email:test-forms --to=you@steepwood.com.au`

### Manual browser test (production)

1. **Contact** — [steepwood.com.au/contact/](https://steepwood.com.au/contact/) → submit → check `hello@` for notification (subject starts `Contact enquiry —`).
2. **Quote** — [steepwood.com.au/quote/](https://steepwood.com.au/quote/) → complete all 3 steps → check `hello@` for notification **and** submitter inbox for auto-reply (subject `Your SteepWood quote request — ref …`).
3. Confirm in [Resend → Logs](https://resend.com/emails) — status should be **Delivered** (not Bounced).
4. If mail lands in spam, add DMARC (above) and wait 24h for DNS propagation.

## Google Business Profile

| Field | Value |
|---|---|
| Location reference | `om-6582854789951435152` |
| Status | **Verified** (confirmed 2026-06-22) |
| Claimed date | 2026-06-19 |
| Verified date | 2026-06-22 |
| Public Maps URL | _regional map on contact page — review link wired_ |
| Google review URL | https://g.page/r/CbgiJ5KWkJ9vEAE/review |
| NAP matches website | Yes — confirmed by owner |

### NAP to match exactly in GBP

| Field | Website canonical |
|---|---|
| Business name | SteepWood |
| Phone | 0468 387 676 |
| Website | https://steepwood.com.au |
| Location | Newcastle, NSW (service-area or workshop — match what you submitted) |
| Hours | Mon–Fri 7am–5pm · Sat 9am–1pm (by appointment) · Sun closed |

### After verification is approved

- [x] GBP verified (2026-06-22)
- [x] Google review link wired (contact page + footer)
- [ ] Request reviews from recent clients (feeds local pack + TrustBar)

## Notes

- Do not block Phase 4 code completion on these checks.
- Update this file with dates and statuses as you complete each step.
