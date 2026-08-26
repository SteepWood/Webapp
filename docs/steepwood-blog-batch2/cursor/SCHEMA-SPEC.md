# Schema Specification — Batch 2

Structured data for all 30 posts. Emit as JSON-LD in a single `<script type="application/ld+json">` per page using a `@graph` array. One script tag, not four.

Google states that structured data must describe content visible on the page and that marking up content the user cannot see is a violation of the spam policies ([Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)). Every FAQ marked up must appear in the rendered page.

---

## 1. Required on every post

`BlogPosting`, `BreadcrumbList`, `FAQPage`. Nothing else is required.

## 2. Conditional

- `HowTo` — only where the post contains a genuine numbered procedure with discrete steps. Each post's `RESEARCH-{slug}.md` states whether it qualifies. Candidates: post 19 (checking a licence), post 27 (strata approval pathway), post 05 (costing a kitchen from a measurement).
- Never emit `Product`, `Offer`, `AggregateRating` or `Review` on a blog post. Price ranges in an article are not product offers, and inventing review markup on an article is a spam-policy violation.
- `LocalBusiness` belongs on the location hub pages and the home page, not on blog posts. The blog `publisher` reference below points at the existing organisation node.

---

## 3. The graph

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://steepwood.com.au/blog/{slug}/#article",
      "isPartOf": { "@id": "https://steepwood.com.au/blog/{slug}/#webpage" },
      "headline": "{title, 60 characters or fewer where possible, never over 110}",
      "description": "{metaDescription}",
      "datePublished": "{publishDate}T07:00:00+10:00",
      "dateModified": "{publishDate}T07:00:00+10:00",
      "inLanguage": "en-AU",
      "articleSection": "{category}",
      "keywords": "{primary keyword}, {secondary keywords, comma separated}",
      "wordCount": {integer, actual body word count},
      "timeRequired": "PT{readingTime}M",
      "author": {
        "@type": "Person",
        "name": "Sukhveer Kaur",
        "jobTitle": "Founder & Master Joiner",
        "worksFor": { "@id": "https://steepwood.com.au/#organization" },
        "url": "https://steepwood.com.au/about/"
      },
      "publisher": { "@id": "https://steepwood.com.au/#organization" },
      "image": {
        "@type": "ImageObject",
        "url": "https://steepwood.com.au/blog/{slug}/hero.jpg",
        "width": 1600,
        "height": 1000,
        "caption": "{hero alt text from RESEARCH-{slug}.md}"
      },
      "mainEntityOfPage": { "@id": "https://steepwood.com.au/blog/{slug}/#webpage" },
      "about": [
        { "@type": "Thing", "name": "{topic 1}" },
        { "@type": "Thing", "name": "{topic 2}" }
      ],
      "spatialCoverage": {
        "@type": "AdministrativeArea",
        "name": "{locationFocus}"
      },
      "isAccessibleForFree": true
    },
    {
      "@type": "WebPage",
      "@id": "https://steepwood.com.au/blog/{slug}/#webpage",
      "url": "https://steepwood.com.au/blog/{slug}/",
      "name": "{metaTitle}",
      "isPartOf": { "@id": "https://steepwood.com.au/#website" },
      "breadcrumb": { "@id": "https://steepwood.com.au/blog/{slug}/#breadcrumb" },
      "primaryImageOfPage": { "@id": "https://steepwood.com.au/blog/{slug}/#primaryimage" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://steepwood.com.au/blog/{slug}/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://steepwood.com.au/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://steepwood.com.au/blog/" },
        { "@type": "ListItem", "position": 3, "name": "{category}", "item": "https://steepwood.com.au/blog/category/{category-slug}/" },
        { "@type": "ListItem", "position": 4, "name": "{title}" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://steepwood.com.au/blog/{slug}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{FAQ question 1, exactly as rendered}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{FAQ answer 1, exactly as rendered, plain text, no markdown}"
          }
        }
      ]
    }
  ]
}
```

Notes.

- The final `BreadcrumbList` item has no `item` property. That is correct for the current page.
- If category archive pages do not exist at `/blog/category/{slug}/`, drop breadcrumb position 3 and renumber. Do not point a breadcrumb at a URL that returns 404.
- `FAQPage` `mainEntity` must contain all six questions, in rendered order, with answer text matching the rendered answer word for word. Strip markdown links from the answer text but keep the sentences intact.
- `wordCount` is the real count from `RESEARCH-{slug}.md`. Do not estimate.
- `timeRequired` should match the reading time the template already displays, so the page and the markup agree.

## 4. The organisation node

The organisation node should already exist site-wide. If it does not, add it once in the site layout, not per post. It must carry the licence details, because NSW requires the licensee name and licence number with its category in trade advertising ([NSW Government](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements)).

```json
{
  "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": "https://steepwood.com.au/#organization",
  "name": "SteepWood",
  "legalName": "Pavit Cabinetry Pty Ltd",
  "alternateName": "Pavit Cabinetry Pty Ltd t/as SteepWood",
  "url": "https://steepwood.com.au/",
  "telephone": "+61468387676",
  "email": "hello@steepwood.com.au",
  "foundingDate": "2014",
  "identifier": [
    { "@type": "PropertyValue", "name": "ABN", "value": "52 697 313 269" },
    { "@type": "PropertyValue", "name": "NSW Carpentry Contractor Licence", "value": "489553C" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Newcastle",
    "addressRegion": "NSW",
    "addressCountry": "AU"
  },
  "areaServed": [
    { "@type": "State", "name": "New South Wales" },
    { "@type": "State", "name": "Australian Capital Territory" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "description": "By appointment"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "13",
    "bestRating": "5"
  }
}
```

The rating figures are 4.9 from 13 reviews. **Do not change them to any other number.** If review count grows, update it here and nowhere else.

## 5. `areaServed` on location posts

The eleven location posts (20 to 30) should extend the `BlogPosting` `spatialCoverage` with the specific LGAs the post covers, which reinforces geographic relevance for a market where distance to the Newcastle workshop cannot be changed.

```json
"spatialCoverage": [
  { "@type": "AdministrativeArea", "name": "Northern Beaches Council", "containedInPlace": { "@type": "State", "name": "New South Wales" } },
  { "@type": "City", "name": "Manly" },
  { "@type": "City", "name": "Dee Why" }
]
```

Use only suburbs actually named in the post body. Do not list suburbs the article does not discuss.

## 6. Post 20 specifically

`joinery-cost-guide-newcastle-hunter` must disambiguate from Newcastle upon Tyne, because five of ten page-one results for the head term are United Kingdom businesses. In the markup:

- `spatialCoverage` names Newcastle, New South Wales explicitly, contained in New South Wales, contained in Australia.
- Add `"addressRegion": "NSW"` and `"addressCountry": "AU"` anywhere an address appears.
- Add `"postalCode": "2300"` to the organisation address if the owner confirms the workshop postcode.

## 7. Validation gate

No post ships until all of these pass.

1. [Google Rich Results Test](https://search.google.com/test/rich-results) returns `Article` and `FAQ` eligible with zero errors.
2. [Schema Markup Validator](https://validator.schema.org/) returns zero errors and zero warnings that relate to required properties.
3. Every FAQ question and answer in the markup is visible in the rendered page.
4. Every `@id` resolves within the graph, and every referenced URL returns 200.
5. `datePublished` matches the scheduled date in `PUBLISHING-SCHEDULE.md` and carries the `+10:00` offset.
6. No `Product`, `Offer` or article-level `Review` markup is present.
