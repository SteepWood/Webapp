# Office Fitout — §14 keyword weave

Pre-write plan: keep existing 3-paragraph `materials` block; add commercial-joinery cost band, home-office-fitout mention, and a workshop lead-time line. Update one `processSteps` description to absorb the "joinery lead time" keyword. Add 2 new FAQs (commercial joinery fitout cost, shopfitting cross-link) and lightly revise the existing office fitout cost FAQ for tighter sqm framing.

## materials (replace entire array — 4 paragraphs)

1. Office joinery from SteepWood is manufactured in Newcastle and installed Australia-wide. Carcasses and casework use commercial-grade Laminex and Polytec panels, compact phenolic where high-cycle wear is expected, and solid surface or stone bench tops on reception desks and breakout zones. Hardware is Blum and Häfele throughout — drawer runners, hinges, and lift mechanisms rated for the cycle counts a busy office produces.

2. Commercial joinery fitout cost Australia varies more by inclusions than by size: a 200 sqm tenancy with a custom reception desk, two boardroom credenzas, a breakout kitchen, and four storage walls can land anywhere between $80,000 and $250,000 depending on finish level, freight to city, and programme compression. Sydney and Melbourne tenancies typically sit at the higher end; Newcastle, Wollongong, and Canberra projects benefit from shorter freight and a more direct workshop relationship.

3. We also build home office fitout ideas built-in shelves elements — wall-to-wall bookcase joinery, integrated desks, and floor-to-ceiling storage — as part of larger residential commissions and for executives running serious home offices. The same workshop, the same Blum hardware, the same 2pac and veneer finishes carry across our commercial and residential work, which makes co-ordinating brand colour across head office and home study very straightforward.

4. Joinery lead time Australia workshop schedules are the single biggest factor in office-fitout programmes that slip. Our standard workshop lead time is six to ten weeks from signed shop drawings to delivery for a mid-sized fitout, and we book site dates against the construction programme rather than pretending to deliver in unrealistic windows. We provide weekly progress photos, shop drawings for certifier review, and a single project manager from brief to handover.

## processSteps (REVISED — show full step object)

- **Construction programme:** Manufacture in our Newcastle workshop runs in parallel with site partitioning and services. Joinery lead time Australia workshop schedules are typically six to ten weeks for a mid-sized commercial fitout, and we lock dates against the builder's programme at shop-drawing sign-off — not at deposit. Weekly photos from the workshop floor keep the project manager and tenant in the loop.

## faqs (REVISED + NEW entries)

### FAQ (lightly REVISED): How much does an office fitout cost per square metre in Australia?

Office fitout costs in Australia typically range from $800 to $3,000+ per square metre, depending on city, finish level, and the extent of structural work required. Sydney and Melbourne sit at the upper end; Perth, Adelaide, Canberra, and regional NSW offer lower rates because of trade availability and freight. A basic open-plan refresh may be achievable under $1,000 per sqm; a premium fitout with custom joinery, quality finishes, and advanced acoustic treatment will sit from $2,500 upward. Commercial joinery fitout cost Australia is the major driver inside that per-sqm figure on most projects.

### FAQ (NEW): How does commercial joinery fitout cost compare across Australia?

Commercial joinery fitout cost Australia depends on three things: panel grade (commercial Laminex / Polytec vs decorative residential board), hardware tier (Blum and Häfele commercial-rated runners vs domestic), and the volume of custom shop-drawn elements vs off-the-shelf casework. As a rule of thumb, expect $1,200–$2,200 per linear metre for premium commercial joinery, plus separate line items for stone benchtops, integrated AV, and acoustic treatments. Freight to Sydney, Brisbane, Perth, and Adelaide is quoted separately so you can see exactly what the joinery itself costs.

### FAQ (NEW): Do you also handle shopfitting joinery, or just office fitouts?

We do both. Shopfitting joinery cost Australia tracks slightly lower per linear metre than office fitout because retail counters and shelving systems repeat across modules, while office reception and boardroom joinery are typically one-off. If your project is retail rather than office — POS counters, display fixtures, shelving systems — see our shopfitting service page at `/shopfitting/`. We are happy to scope mixed-use jobs (e.g. ground-floor retail with first-floor head office) under a single project programme.

### FAQ (NEW): Can SteepWood also build a home office to match my workplace joinery?

Yes. Many of our office-fitout clients ask us to deliver matching home office fitout ideas built-in shelves, integrated desks, and bookcase walls for their residences. Because we hold colour and timber samples on file from your commercial project, we can match decor finishes, brand colour, and hardware tier across both spaces. See our home office joinery service page at `/home-office-joinery/` for residential scope.

## optional whatIsParagraph
none

## keyword checklist

| # | Keyword | Location | Exact phrase in copy |
|---|---------|----------|------------------------|
| 1 | commercial joinery fitout cost Australia | materials #2 + FAQ #1 (revised) + FAQ #2 (new) | "Commercial joinery fitout cost Australia varies more by inclusions than by size…" |
| 2 | shopfitting joinery cost Australia | FAQ #3 (new) + cross-link `/shopfitting/` | "Shopfitting joinery cost Australia tracks slightly lower per linear metre…" |
| 3 | home office fitout ideas built-in shelves | materials #3 + FAQ #4 (new) | "we also build home office fitout ideas built-in shelves elements…" |
| 4 | joinery lead time Australia workshop | materials #4 + processSteps (Construction programme) | "Joinery lead time Australia workshop schedules are the single biggest factor…" |

**Total: 4 / 4 keywords woven · 0 missing**

---

```typescript
// Paste targets for defineService("office-fitout", { ... })

materials: [
  "Office joinery from SteepWood is manufactured in Newcastle and installed Australia-wide. Carcasses and casework use commercial-grade Laminex and Polytec panels, compact phenolic where high-cycle wear is expected, and solid surface or stone bench tops on reception desks and breakout zones. Hardware is Blum and Häfele throughout — drawer runners, hinges, and lift mechanisms rated for the cycle counts a busy office produces.",
  "Commercial joinery fitout cost Australia varies more by inclusions than by size: a 200 sqm tenancy with a custom reception desk, two boardroom credenzas, a breakout kitchen, and four storage walls can land anywhere between $80,000 and $250,000 depending on finish level, freight to city, and programme compression. Sydney and Melbourne tenancies typically sit at the higher end; Newcastle, Wollongong, and Canberra projects benefit from shorter freight and a more direct workshop relationship.",
  "We also build home office fitout ideas built-in shelves elements — wall-to-wall bookcase joinery, integrated desks, and floor-to-ceiling storage — as part of larger residential commissions and for executives running serious home offices. The same workshop, the same Blum hardware, the same 2pac and veneer finishes carry across our commercial and residential work, which makes co-ordinating brand colour across head office and home study very straightforward.",
  "Joinery lead time Australia workshop schedules are the single biggest factor in office-fitout programmes that slip. Our standard workshop lead time is six to ten weeks from signed shop drawings to delivery for a mid-sized fitout, and we book site dates against the construction programme rather than pretending to deliver in unrealistic windows. We provide weekly progress photos, shop drawings for certifier review, and a single project manager from brief to handover."
],

processSteps: [
  // ... keep Workplace brief, Design and documentation, Handover as-is
  {
    title: "Construction programme",
    description: "Manufacture in our Newcastle workshop runs in parallel with site partitioning and services. Joinery lead time Australia workshop schedules are typically six to ten weeks for a mid-sized commercial fitout, and we lock dates against the builder's programme at shop-drawing sign-off — not at deposit. Weekly photos from the workshop floor keep the project manager and tenant in the loop."
  }
],

faqs: [
  {
    question: "How much does an office fitout cost per square metre in Australia?",
    answer: "Office fitout costs in Australia typically range from $800 to $3,000+ per square metre, depending on city, finish level, and the extent of structural work required. Sydney and Melbourne sit at the upper end; Perth, Adelaide, Canberra, and regional NSW offer lower rates because of trade availability and freight. A basic open-plan refresh may be achievable under $1,000 per sqm; a premium fitout with custom joinery, quality finishes, and advanced acoustic treatment will sit from $2,500 upward. Commercial joinery fitout cost Australia is the major driver inside that per-sqm figure on most projects."
  },
  {
    question: "How does commercial joinery fitout cost compare across Australia?",
    answer: "Commercial joinery fitout cost Australia depends on three things: panel grade (commercial Laminex / Polytec vs decorative residential board), hardware tier (Blum and Häfele commercial-rated runners vs domestic), and the volume of custom shop-drawn elements vs off-the-shelf casework. As a rule of thumb, expect $1,200–$2,200 per linear metre for premium commercial joinery, plus separate line items for stone benchtops, integrated AV, and acoustic treatments. Freight to Sydney, Brisbane, Perth, and Adelaide is quoted separately so you can see exactly what the joinery itself costs."
  },
  {
    question: "Do you also handle shopfitting joinery, or just office fitouts?",
    answer: "We do both. Shopfitting joinery cost Australia tracks slightly lower per linear metre than office fitout because retail counters and shelving systems repeat across modules, while office reception and boardroom joinery are typically one-off. If your project is retail rather than office — POS counters, display fixtures, shelving systems — see our shopfitting service page at /shopfitting/. We are happy to scope mixed-use jobs (e.g. ground-floor retail with first-floor head office) under a single project programme."
  },
  {
    question: "Can SteepWood also build a home office to match my workplace joinery?",
    answer: "Yes. Many of our office-fitout clients ask us to deliver matching home office fitout ideas built-in shelves, integrated desks, and bookcase walls for their residences. Because we hold colour and timber samples on file from your commercial project, we can match decor finishes, brand colour, and hardware tier across both spaces. See our home office joinery service page at /home-office-joinery/ for residential scope."
  }
  // ... keep existing FAQs: What is included, duration, warm vs cold shell, permits, reliable company, agile design, tax deduction
],
```
