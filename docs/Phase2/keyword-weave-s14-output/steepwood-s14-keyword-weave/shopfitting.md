# Shopfitting — §14 keyword weave

Pre-write plan: extend `materials` block to absorb both cost keywords and the cross-link to `/commercial-joinery/`; add 2 new FAQs (joinery quote what's included, commercial cross-link). Lightly revise the existing cost FAQ to use the exact keyword phrase.

## materials (replace entire array — 4 paragraphs)

1. Shopfitting joinery cost Australia varies more by finish level than by floor area. Basic retail fitouts in melamine and laminate sit at $400 to $800 per square metre; mid-range custom retail joinery with bespoke counters, fixtures, and 2pac doors runs $800 to $1,500 per sqm; premium luxury fitouts with imported finishes, architectural metalwork, and feature lighting can exceed $3,000 per sqm. Most established retailers we work with land in the mid-range tier, and we provide a fixed-price quote against the planogram and brand style guide before manufacture starts.

2. Our retail joinery is manufactured in Newcastle using commercial-grade Laminex and Polytec panels, CNC-routed MDF profiles, solid surface counters, and custom metal fixtures where the brief demands them. We work to planograms, brand style guides, CAD files, and brand-mandated suppliers, and we are experienced in replicating a fitout across multiple store locations when rollout consistency is required.

3. Where projects cross between retail and head office or back-of-house — typical for flagship stores, hospitality groups, and clinic chains — we co-ordinate scope with our commercial joinery service. Commercial joinery fitout cost Australia tends to be a bit higher per linear metre than pure retail because boardroom, reception, and storage-wall pieces are one-off rather than modular. For mixed-scope or back-of-house work, see our commercial joinery service page at `/commercial-joinery/`.

4. Every shopfit comes with a 10-year structural joinery warranty, a 12-month builders' warranty on workmanship, and the manufacturer's hardware warranty (25 years on Blum). Shop drawings, landlord documentation, and council compliance paperwork are co-ordinated by our project team — not handed back to the tenant.

## processSteps (no changes required)

Existing steps (Retail brief → Concept and documentation → Manufacture → Install and fit-off) already read well. No edits.

## faqs (REVISED + NEW entries)

### FAQ (lightly REVISED): How much does a shop fitout cost in Australia?

Shopfitting joinery cost Australia varies widely by scope and finish level. Basic retail fitouts: $400 to $800 per square metre; mid-range custom with bespoke joinery: $800 to $1,500 per sqm; premium luxury fitouts with imported finishes and architectural metalwork can exceed $3,000 per sqm. Most established retail fitouts fall in the mid-range tier. For comparable budgets on office and head-office work, commercial joinery fitout cost Australia typically runs slightly higher per linear metre than retail because office reception and boardroom joinery pieces are one-off rather than modular.

### FAQ (NEW): What's included in a joinery quote from SteepWood?

The joinery quote what's included Australia question gets asked a lot, because tenants have been burned before by quotes that exclude freight, install, or scope creep. A SteepWood shopfitting quote always covers: shop drawings, panel and hardware supply, manufacture in our Newcastle workshop, freight to your site, installation, fit-off, snag and final clean, plus the 10-year structural joinery warranty. Excluded items are listed line-by-line — e.g. electrical, plumbing, signage, flooring, and any landlord-mandated trade restrictions in your lease — so you know exactly what is and isn't in the number.

### FAQ (NEW): Do you also do non-retail commercial joinery — offices, healthcare, hospitality?

Yes. We do all of it. If your scope crosses into office reception, boardroom credenzas, healthcare casework, or hospitality back-of-house, see our commercial joinery service page at `/commercial-joinery/`. Commercial joinery fitout cost Australia is quoted on the same basis as shopfitting — fixed-price against shop drawings, freight separately itemised, single project manager from brief to handover.

## optional whatIsParagraph
none

## keyword checklist

| # | Keyword | Location | Exact phrase in copy |
|---|---------|----------|------------------------|
| 1 | shopfitting joinery cost Australia | materials #1 + FAQ #1 (revised) | "Shopfitting joinery cost Australia varies more by finish level than by floor area" |
| 2 | commercial joinery fitout cost Australia | materials #3 + FAQ #1 + FAQ #3 + cross-link `/commercial-joinery/` | "Commercial joinery fitout cost Australia tends to be a bit higher per linear metre…" |
| 3 | joinery quote what's included Australia | FAQ #2 (new) | "The joinery quote what's included Australia question gets asked a lot…" |

**Total: 3 / 3 keywords woven · 0 missing**

---

```typescript
// Paste targets for defineService("shopfitting", { ... })

materials: [
  "Shopfitting joinery cost Australia varies more by finish level than by floor area. Basic retail fitouts in melamine and laminate sit at $400 to $800 per square metre; mid-range custom retail joinery with bespoke counters, fixtures, and 2pac doors runs $800 to $1,500 per sqm; premium luxury fitouts with imported finishes, architectural metalwork, and feature lighting can exceed $3,000 per sqm. Most established retailers we work with land in the mid-range tier, and we provide a fixed-price quote against the planogram and brand style guide before manufacture starts.",
  "Our retail joinery is manufactured in Newcastle using commercial-grade Laminex and Polytec panels, CNC-routed MDF profiles, solid surface counters, and custom metal fixtures where the brief demands them. We work to planograms, brand style guides, CAD files, and brand-mandated suppliers, and we are experienced in replicating a fitout across multiple store locations when rollout consistency is required.",
  "Where projects cross between retail and head office or back-of-house — typical for flagship stores, hospitality groups, and clinic chains — we co-ordinate scope with our commercial joinery service. Commercial joinery fitout cost Australia tends to be a bit higher per linear metre than pure retail because boardroom, reception, and storage-wall pieces are one-off rather than modular. For mixed-scope or back-of-house work, see our commercial joinery service page at /commercial-joinery/.",
  "Every shopfit comes with a 10-year structural joinery warranty, a 12-month builders' warranty on workmanship, and the manufacturer's hardware warranty (25 years on Blum). Shop drawings, landlord documentation, and council compliance paperwork are co-ordinated by our project team — not handed back to the tenant."
],

faqs: [
  {
    question: "How much does a shop fitout cost in Australia?",
    answer: "Shopfitting joinery cost Australia varies widely by scope and finish level. Basic retail fitouts: $400 to $800 per square metre; mid-range custom with bespoke joinery: $800 to $1,500 per sqm; premium luxury fitouts with imported finishes and architectural metalwork can exceed $3,000 per sqm. Most established retail fitouts fall in the mid-range tier. For comparable budgets on office and head-office work, commercial joinery fitout cost Australia typically runs slightly higher per linear metre than retail because office reception and boardroom joinery pieces are one-off rather than modular."
  },
  {
    question: "What's included in a joinery quote from SteepWood?",
    answer: "The joinery quote what's included Australia question gets asked a lot, because tenants have been burned before by quotes that exclude freight, install, or scope creep. A SteepWood shopfitting quote always covers: shop drawings, panel and hardware supply, manufacture in our Newcastle workshop, freight to your site, installation, fit-off, snag and final clean, plus the 10-year structural joinery warranty. Excluded items are listed line-by-line — e.g. electrical, plumbing, signage, flooring, and any landlord-mandated trade restrictions in your lease — so you know exactly what is and isn't in the number."
  },
  {
    question: "Do you also do non-retail commercial joinery — offices, healthcare, hospitality?",
    answer: "Yes. We do all of it. If your scope crosses into office reception, boardroom credenzas, healthcare casework, or hospitality back-of-house, see our commercial joinery service page at /commercial-joinery/. Commercial joinery fitout cost Australia is quoted on the same basis as shopfitting — fixed-price against shop drawings, freight separately itemised, single project manager from brief to handover."
  }
  // ... keep existing FAQs: shopfitter vs builder, fitout duration, landlord approval, included scope, choosing a shopfitter, brand style guide, warranty
],
```
