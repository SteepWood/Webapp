# NSW Joinery Market & Competitor Research — Evidence Base for SteepWood
**Prepared 21 August 2026 · Newcastle NSW · Carpentry Contractor Licence 489553C**

Every figure below was taken from a page fetched during this research session, with the source URL linked next to the value. Where a value could not be confirmed from a fetched page, it is marked **n.a.** Raw extraction files are in `/home/user/workspace/research/*.jsonl`.

---

## Executive summary — the ten things that matter

1. **NSW is the largest renovation market in Australia by a wide margin.** Australians spent **$53.8 billion** on home improvements in the last financial year, of which **NSW accounted for $19.03 billion** — more than Victoria ($12.458b) and Queensland ($12.069b) ([Budget Direct](https://www.budgetdirect.com.au/home-contents-insurance/guides/home-improvements/home-renovation-capitals-of-australia.html)). HIA expects **NSW renovation investment to outpace Victoria by nearly 50% in 2026** ([HIA Outlook](https://hia.com.au/our-industry/housing/in-focus/2025/10/outlook-sunny-with-a-chance-of-renovations)).
2. **The single best targeting dataset is ABS "value of alterations & additions approved" by LGA.** Northern Beaches alone approved **$414.6m** of alterations in 2025-26, ahead of Inner West ($300.4m) and Woollahra ($287.6m) ([ABS LGA data cube, Jun 2026](https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia/jun-2026/87310do005_202606.xlsx)). Full 52-LGA ranking in Section 4.
3. **The "joinery Newcastle" SERP is contaminated with UK joiners.** Four of the top ten results for *custom joinery Newcastle* are UK businesses (ajsjoinery.co.uk, jpcjoinery.co.uk, jarvisgreenjoinery.co.uk, specialistjoineryco.co.uk) — a structural weakness a NSW site can exploit with explicit "Newcastle **NSW** / Hunter" geo-signals (see `s1_serp.jsonl`).
4. **Cost-guide SERPs are owned by lead-generation aggregators, not joiners.** thequoteyard.com.au, traderefer.au, sparky.fyi, goingrate.com.au, whatsthedamage.com.au, renopage.com.au, kitchenquote.com.au, hipages and airtasker occupy most page-one cost-query slots. None of them build cabinets. Workshop-authored, NSW-specific cost content is the highest-leverage content play available.
5. **SteepWood already ranks page-one for nine query families** including *joinery Newcastle NSW* (4 results), *custom joinery Newcastle* (#1), *custom bathroom vanity cost Australia* (#1), *built in home office cost Australia*, *walk in robe cost Australia* (#1), *shopfitting Australia*, *timber staircase cost Australia*, *cabinet maker Central Coast NSW* and *commercial joinery Sydney*. The programme should defend and deepen these, not restart.
6. **Blum / soft-close is an almost empty Australian SERP.** For *Blum hardware worth it* and *soft close drawers worth it*, page one is Reddit plus US cabinet shops (captivatingcabinets.com, ferris-cabinetry.com, nvkitchenandbath.com, kitchenbathgeeks.com). The only AU results are youscrewit.com.au, mb9.com.au and a Bunnings Workshop forum thread. An Australian trade-priced Blum guide is a near-uncontested win.
7. **Post-engineered-stone-ban content is 100% government.** Page one for *engineered stone ban replacement benchtops* is Safe Work Australia (×4), SafeWork SA, ABF, DEWR, ABC and The Conversation. No cabinetmaker has published a practical "what we now install instead, and what it costs" guide.
8. **NSW advertising compliance is a differentiator, not just a rule.** All NSW building-trade advertising must display licensee name, licence number **with the correct category of work**, and a business telephone number ([NSW Government](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements)). Most competitor sites reviewed showed no licence number at all — publishing 489553C prominently is a trust and compliance edge.
9. **Google's own local ranking factors are relevance, distance and prominence** — and prominence is explicitly driven by inbound links and review volume ([Google Business Profile Help](https://support.google.com/business/answer/7091?hl=en)). A workshop with one address cannot fake distance; the only levers are relevance (complete profile + service pages) and prominence (reviews + links + citations). Service-area businesses can set **up to 20 service areas** and may have only **one profile**, and cannot use a radius ([Google SAB rules](https://support.google.com/business/answer/9157481?hl=en)).
10. **Cabinetry is 35–45% of a kitchen renovation budget**, at **$1,400–$2,200/lm for polyurethane** and **$1,800–$3,000/lm for 2-pac** in Sydney ([LeadKit Sydney 2026](https://www.leadkit.com.au/blog/kitchen-renovation-cost-sydney-2026)). That per-linear-metre framing is how SteepWood should structure every cost page, because it is the number clients actually compare.

---

## SECTION 1 — Competitor landscape

### 1a. Genuine bespoke joinery / cabinetmaking competitors

| Company | URL | HQ / service area | Services | Price-tier signals | Blog / content | Cost guides | Suburb pages | Google reviews | Trust signals |
|---|---|---|---|---|---|---|---|---|---|
| Husk&Co | [huskandco.com.au](https://huskandco.com.au/) | Sydney | Custom cabinetry, kitchens, wardrobes | Premium, no prices published | Blog present in nav; article count n.a. | No | Not observed | n.a. | ACFA award winner "Best kitchen renovation $60–80k"; FIAA 2018 finalist |
| Luxe Joinery Group | [luxejoinerygroup.com.au](https://luxejoinerygroup.com.au/) | Sydney + Eastern Suburbs; NSW South Coast Wollongong→Bega | Premium custom joinery, kitchens, wardrobes | Premium/bespoke language, no prices | No blog | No | No | n.a. | None stated on site |
| BOS Joinery | [bosjoinery.com.au](https://www.bosjoinery.com.au/) | Sydney (Kogarah) | Luxury kitchens + flat-pack; cabinet making | Dual-tier: luxury **and** flat-pack; payment plans offered | Not observed | No | No | n.a. | Payment plans; licence n.a. |
| Art of Kitchens | [artofkitchens.com.au](https://www.artofkitchens.com.au/) | 1/4 Gundah Rd, Mt Kuring-Gai NSW 2080 · (02) 9457 7299 | Kitchen design + renovation | Award-winning luxury, no prices | Not observed | No | No | n.a. | "Award-winning" claim; awards not itemised on fetched page |
| Premier Kitchens | [premierkitchens.net.au](https://www.premierkitchens.net.au/) | Own Sydney factory; showrooms Willoughby + Drummoyne | Kitchens, manufacture | **"Best Price Guarantee"**; 3-week production | Not observed | No | No | n.a. | Best Price Guarantee; in-house factory; 3-week production claim |
| Kastell | [kastell.com.au](https://www.kastell.com.au/) | Sydney | Luxury kitchens, bathrooms, whole-home renovation | Luxury | Not observed | No | No | n.a. | n.a. |
| Impressive Wardrobes | [impressivewardrobes.com.au](https://www.impressivewardrobes.com.au/) | Sydney | Built-in wardrobes | "Affordable" positioning | No | No | No | n.a. | None observed |
| Highland Kitchens | [highlandkitchens.com.au](https://www.highlandkitchens.com.au/) | Camden / Macarthur NSW | Hamptons, Country, Provincial kitchen ranges | Luxury designer-led (designer Michael Kalpou) | Style range pages | No | No | n.a. | Named designer; style specialisation |
| Liteco Custom Joinery | [litecojoinery.com.au](https://litecojoinery.com.au/) | Sydney | Commercial + residential joinery | Mid–premium | Not observed | No | **Yes** — `/eastern-suburbs/` page ranks | n.a. | n.a. |
| Nadin West Joinery | [nadinwest.com.au](https://www.nadinwest.com.au/) | 51 Pacific Hwy, Bennetts Green NSW 2290 (Newcastle) | Custom kitchens + joinery | Award-winning, premium | No blog | No | No | n.a. | "Award-winning" |
| Urban Joinery | [urban-joinery.com.au](https://www.urban-joinery.com.au/) | Unit 3 Block E, 122 Woodstock St, Mayfield NSW 2304 (Newcastle) | Architectural joinery, custom cabinets | Premium architectural; **30 years trading** | No blog | No | No | n.a. | 30 years in business |
| Lambert Kitchens & Joinery | [lambertkitchens.com.au](https://lambertkitchens.com.au/) | Wollongong — Illawarra, Southern Sydney, Southern Highlands | Kitchens, joinery | Bespoke; **established 1978** | No blog | No | No | n.a. | Est. 1978 |
| PKS Joinery & Fitouts | [pksjoineryfitouts.com.au](https://www.pksjoineryfitouts.com.au/) | Central Coast NSW | Custom joinery, fitouts | Mid–premium | No blog | No | No | n.a. | n.a. |
| The Kitchen Centre | [thekitchencentre.com.au](https://www.thekitchencentre.com.au/) | Central Coast NSW | Kitchens, cabinetmaking | Mid-market | No blog | No | Claims coverage of **"more than 20 local suburbs"** | n.a. | "Fully licensed" (number not shown) |
| Adaptive Joinery | [adaptivejoinery.com.au](https://www.adaptivejoinery.com.au/) | Warehouse 1B/91 Kurrajong Ave, Mount Druitt NSW 2770 + Wagga Wagga + Thomastown VIC | **Commercial joinery only** | Volume commercial | Not observed | No | No | n.a. | 3 factories; **40+ years** |
| Sydney Shopfitters | [sydneyshopfitters.au](https://sydneyshopfitters.au/) | NSW / ACT / QLD | Retail shopfitting, in-house joinery | Commercial | Not observed | No | No | n.a. | **20+ years**; works in Westfield, Mirvac, Stockland, QIC, AMP centres |
| Greater Group | [thegreatergroup.com](https://www.thegreatergroup.com/) | Global retail + workplace design-build, incl. Sydney | Retail/workplace design & build | Enterprise | Not observed | No | No | n.a. | Sydney Airport project credits |

**Additional page-one local competitors observed in SERP data** (not individually fetched, so no field data — treat as ranking rivals to monitor): urbanprecision.com.au, pinejoinery.com.au, reposesydney.com, onestopjs.com.au, saltwaterjoinery.com.au, alljoinery.com.au, sydneycustomjoinery.com.au, sydneycabinetmakers.com, jayeninnovations.com.au, myjoinery.com.au, middletondesign.com.au, grothandsonsinteriors.com.au, thecabinetmakingco.com.au, spaceworksdesign.com.au, artemisco.com.au, specjoinery.com.au, goldentouchjoinery.com.au, joineryathart.com, verveinspirations.com, northernbeachesjoinery.com.au, everlongjoinery.com.au, grovesjoinery.com.au, benysjoinery.com.au, pkjdesigns.com.au, mcgeeprojects.com.au, joinerywollongong.com.au (Onyx Detailed Joinery), lambertkitchens.com.au, jadekitchens.com.au, coasttocoastkitchens.com.au, darkoskitchens.com.au, kemblakitchens.com.au, iconickitchens.com.au, wollongongkitchenrenovations.com, hatsoffkitchens.com.au, jasperdesign.net.au, mjsprojects.com.au, standfastkitchens.com.au, degabrielekitchens.com.au, elevatekitchens.com.au, sacucci.com.au, 73designandjoinery.com.au, ttk.com.au, inkjoinery.com.au, mariaprojects.com, acecommercial.com.au, rj.com.au, arkadeinteriors.com.au, terracejoinery.com.au, insetgroup.com.au, sitform.com.au, shapeshopfitters.com.au, acefitouts.com.au, associatedprojects.com.au, dyconstructions.com.au, colab-design.com, robesdelivered.com.au, 7amwardrobes.com.au, silvawardrobeco.com.au, factorydirectwardrobes.com.au, sydneywardrobe.com.au, bndwardrobes.com.au, creativebydesign.com.au, insideoutjoinery.au (see `s1_serp.jsonl` for query/position detail).

### 1b. National / aggregator SERP competitors

| Player | URL | What it is | Content marketing | Cost guides | Suburb / city pages | Trust signals |
|---|---|---|---|---|---|---|
| hipages | [hipages.com.au](https://hipages.com.au/) | Lead marketplace | Extensive cost-guide library | **Yes** — e.g. built-in wardrobe **$1,000–$5,000** ([hipages](https://hipages.com.au/article/how_much_does_a_wardrobe_cost)); cabinet makers **$50–$75/hr** ([hipages](https://hipages.com.au/article/how_much_do_kitchen_cabinet_makers_cost)); laundry reno **$5,000–$25,000** ([hipages](https://hipages.com.au/article/how_much_does_it_cost_to_renovate_a_laundry_room)) | Yes | ABN/licence checks. Tradie plans **$139+GST (155 credits, 1 postcode) → $649+GST (850 credits, 10 postcodes)** ([hipages membership costs](https://hipages.com.au/membership-costs)) |
| Airtasker | [airtasker.com/au](https://www.airtasker.com/au/services/cabinet-making/sydney/) | Services marketplace; **absorbed Oneflare** | Cost guides + "Top 10 Best Rated" city pages that rank for *cabinet maker Sydney* | Yes | Yes — Sydney, Newcastle, Central Coast, Parramatta cabinet-making pages | 160,000 Taskers have earned income ([Airtasker](https://www.oneflare.com.au/)) |
| Oneflare | oneflare.com.au | **RETIRED** | — | — | — | Closed **30 June 2026**; site/app redirect to airtasker.com; Airtasker bought it for **$9.8m in 2022** ([King Tradie](https://kingtradie.com/oneflare-review/)) |
| The Quote Yard | [thequoteyard.com.au](https://www.thequoteyard.com.au/) | Lead-gen | Deep **NSW-specific 2026** cost guides — direct content competitor | Yes (vanity, wardrobe, butler's pantry, staircase, kitchen island NSW) | Yes, by state | None visible |
| What's The Damage | [whatsthedamage.com.au](https://whatsthedamage.com.au/) | Cost-data publisher + lead sales | 36 trade categories × 14 cities; also sells "Commercial Fitout Leads — Pay Per Lead" | Yes | Yes | Claims pricing **cross-referenced against 90+ Australian trade pricing sources**, verified **August 2026** ([What's The Damage](https://whatsthedamage.com.au/carpenter-cost-sydney/)) |
| Kaboodle | [kaboodle.com.au](https://kaboodle.com.au/) | DIY flat-pack, sold through Bunnings network | 3D planner, price estimator, masterclass videos, eBooks | Price estimator | No | Bunnings distribution |
| Freedom Kitchens | [freedomkitchens.com.au](https://freedomkitchens.com.au/) | National kitchen retailer | Range pages: Designer / Signature Value / Value / Flat Pack / Wardrobe / Laundry / Home Office | No | No | **30+ years**; interest-free finance; "affordable" positioning |
| Kitchen Connection | [kitchenconnection.com.au](https://kitchenconnection.com.au/) | QLD + NSW retailer (Castle Hill showroom) | Planning/timeline content ranks for *kitchen renovation timeline Australia* | No | Showroom pages | **10-year workmanship warranty** |
| Wallspan | [wallspan.com.au](https://wallspan.com.au/) | **Adelaide/SA only** — not a NSW competitor | — | No | No | Does not do bathrooms |
| Bunnings | [bunnings.com.au](https://www.bunnings.com.au/) | Big-box retailer | Ranks for *laundry cabinets cost Australia*, *Hamptons kitchen Australia*, *reception desk cost*; Workshop forum ranks for *soft close worth it* | Product pricing | No | Robots-blocked to fetch; data from SERP titles only |
| Houzz AU | [houzz.com.au](https://www.houzz.com.au/professionals/joinery-and-cabinet-makers) | Pro directory + inspiration | Directory pages rank for *joinery Newcastle*, *cabinet maker Central Coast* | No | **Yes** — city directory pages | Listed pros include Nouvelle Kitchens, Wonderful Kitchens Padstow, Dan Kitchens, CORDONY Chatswood, Karanda Interiors Sylvania Heights |
| Homes to Love | [homestolove.com.au](https://www.homestolove.com.au/) | Publisher (Australian House & Garden) | Editorial + The Block content; ranks for *Hamptons kitchen Australia* | No | No | Masthead authority |
| Refresh Renovations | [refreshrenovations.com.au](https://www.refreshrenovations.com.au/) | Nationwide renovation franchise | Price guides — home office **$1,000 to over $140,000** ([Refresh](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget)) | Yes | **Yes — explicit Sydney sub-region pages**: City & Inner South/Eastern Suburbs, Inner South West, Inner West, Ryde & Parramatta, The Hills District/Baulkham Hills/Hawkesbury | Franchise network |
| ServiceSeeking | [serviceseeking.com.au](https://www.serviceseeking.com.au/) | Lead marketplace | Industry-insights blog (seasonality content) | Some | Yes | Business FAQ hub covers leads, daily budget, contact details ([ServiceSeeking FAQs](https://serviceseeking.zendesk.com/hc/en-au/sections/360005258794-FAQs-for-Businesses)); fee amounts not published |
| Localsearch | [localsearch.com.au](https://www.localsearch.com.au/) | AU directory | "10 BEST Joinery in Newcastle NSW" style pages | No | **Yes** — ranks top-1 for *joinery Newcastle NSW* | Directory authority |

> **Note on review counts:** no fetched competitor website stated its Google review count or star rating, so all review cells are **n.a.** Collecting these requires Google Maps directly.

---

## SECTION 2 — SERP analysis

Method: 40 Australian query families, top-10 results each, captured in `s1_serp.jsonl`. Google SERP features (AI Overviews, featured snippets, PAA) are **not exposed by the search index used**, so AI-Overview/PAA presence is **n.a.** and no verbatim PAA questions can be reported. The "questions to answer" listed below are inferred from ranking page titles, not from a captured PAA box — treat them as content targets, not observed SERP features.

| Query family | Who ranks page 1 | Dominant content type | SteepWood present? | Read |
|---|---|---|---|---|
| custom joinery Sydney | sydneycustomjoinery.com.au, huskandco, urbanprecision (×2), pinejoinery, reposesydney, onestopjs, saltwaterjoinery, luxejoinerygroup, alljoinery | **100% local business pages** — no aggregators | No | Pure local-business SERP; won on entity strength + on-page geo relevance, not blogs |
| cabinet maker Sydney | huskandco, sydneycabinetmakers, **airtasker**, jayeninnovations, myjoinery, middletondesign, grothandsonsinteriors, thecabinetmakingco, spaceworksdesign, bosjoinery | Local business + 1 aggregator | No | Airtasker's "Top 10 Best Rated" page is the only non-local slot |
| joinery Newcastle NSW | **localsearch (#1)**, **steepwood ×4**, nadinwest, urban-joinery, **ajsjoinery.co.uk**, grovesjoinery, houzz | Directory + local business + **UK contamination** | **Yes ×4** | Already dominant; the UK result signals weak geo-disambiguation |
| custom joinery Newcastle | **steepwood #1**, urban-joinery, nadinwest, **ajsjoinery.co.uk**, **jpcjoinery.co.uk**, everlongjoinery, **jarvisgreenjoinery.co.uk**, west-end-cabinet.com ×2, **specialistjoineryco.co.uk** | **5 of 10 are UK/US** | **Yes #1** | Biggest geo-relevance gap found in this study |
| kitchen renovation Wollongong | jadekitchens ×2, coasttocoastkitchens, darkoskitchens, kemblakitchens, joinerywollongong, wollongongkitchenrenovations, iconickitchens, localsearch, collabbuildingdesign | Local business + 1 directory | No | Crowded but all thin local pages; an Illawarra cost guide would stand out |
| cabinet maker Central Coast NSW | pksjoineryfitouts, **houzz ×2**, localsearch, hatsoffkitchens, jasperdesign, **steepwood**, thekitchencentre, mjsprojects, standfastkitchens | Local business + 3 directory | **Yes** | Directories hold 4/10 — beatable with depth |
| joinery Illawarra | benysjoinery ×2, tradewindmaintenance, mcgeeprojects ×2, lambertkitchens, pkjdesigns, greensmithco, joinerywollongong ×2 | 100% local business | No | No aggregator, no cost content — open |
| custom kitchens Sydney premium | sydneycustomkitchens, bosjoinery, degabrielekitchens, kastell, premierkitchens, artofkitchens, elevatekitchens, sacucci, 73designandjoinery, ttk | 100% local business | No | Premium head term; brand-led |
| bespoke joinery Sydney eastern suburbs | artemisco, verveinspirations, specjoinery, luxejoinerygroup, **litecojoinery /eastern-suburbs/**, goldentouchjoinery, joineryathart, pinejoinery, alljoinery, northernbeachesjoinery | 100% local business; **suburb landing pages win** | No | Direct proof that sub-region landing pages rank in Sydney |
| shopfitting company Sydney | sydneyshopfitters, thegreatergroup, acefitouts ×2, sitform, dyconstructions, colab-design, associatedprojects, insetgroup, shapeshopfitters | 100% commercial contractor pages | No | No aggregator competition at all |
| commercial joinery Sydney | adaptivejoinery, inkjoinery, mariaprojects, acecommercial, onestopjs, **steepwood**, rj.com.au, corporatefurn, arkadeinteriors, terracejoinery | 100% local/commercial business | **Yes** | Defend |
| built in wardrobes Sydney | impressivewardrobes, robesdelivered, 7amwardrobes, silvawardrobeco, factorydirectwardrobes ×2, sydneywardrobe, goldentouchjoinery, bndwardrobes, creativebydesign | 100% specialist wardrobe businesses | No | Category dominated by single-service specialists |
| custom bathroom vanity cost Australia | **steepwood #1**, sparky.fyi, designerbathware, blueleafbath, **thequoteyard**, **steepwood (Brisbane)**, vtfconstructions, homeupkeep, adpaustralia, sparky.fyi (Melbourne) | Cost aggregators + product retailers | **Yes #1 + #6** | Model page — replicate its structure across other services |
| laundry renovation cost Australia | renopage, bhg.com.au, threebirdsrenovations, **hipages**, hunterbathroomrenovations, presidentialgroup, perfectfitinterior, rebornrenovations, **canstar**, koast | Aggregator + publisher + interstate renovators | No | No NSW-specific joiner page — clear gap |
| laundry cabinets cost Australia | **bunnings**, archipro, umbaprocabinets, builderswarehouseonline, herabathware ×2, buildmat, **traderefer**, avahome, thebluespace | **Almost entirely product retailers** | No | Nobody is answering the *custom* laundry joinery question |
| built in home office cost Australia | refreshrenovations, **steepwood ×3** (AU, Orange NSW, Melbourne VIC), savings.com.au, sparky.fyi, **reddit**, kellysofficefurniture, househonest, cushmanwakefield | Franchise guide + SteepWood + finance publisher + Reddit | **Yes ×3** | Strong position; Reddit on page 1 signals unmet need |
| office fitout cost per square metre Australia | cushmanwakefield, apexei, hubinteriors, workspace360, **jll ×2**, progressivecorporate, commercialrealestate.com.au, justcoglobal, officefitoutgroup | Commercial real-estate consultancies + fitout firms | No | Authority-heavy; win on *joinery share* of fitout cost, not total |
| shopfitting cost Australia | shapeshopfitters, accessprojects, **traderefer**, leadkit, **steepwood**, apexei, woodpexcarpentry, **whatsthedamage ×2**, focusshopfit | Shopfitters + aggregators | **Yes** | Defend and extend to per-format guides |
| timber staircase cost Australia | staircaseconstructions, **thequoteyard**, artisticwoodfloor, supertrades ×2, **airtasker**, sydneydeckingsolutions, **steepwood ×2** (NSW, Orange NSW), thequoteyard (QLD) | Specialists + aggregators | **Yes ×2** | Very thin field — staircase is under-served nationally |
| butler's pantry cost Australia | **canstar**, dynasty-importers, homebuildershandbook, **airtasker**, eco2, craftbuilt, kitchenfox, gmcraftsmancabinets, **thequoteyard**, templetonbuilt | Finance publisher + aggregators + interstate cabinetmakers | No | No NSW joiner ranks — open |
| kitchen renovation timeline Australia | apadanadesign, kitchenshack, renoworx, propertyblueprintco ×2, duragroup, **kitchenconnection**, yourstoryproperty ×2, aclassbuilding | Renovators + retailers, mostly VIC | No | Zero NSW/Newcastle specificity |
| Blum hardware worth it | **reddit**, captivatingcabinets (US), nexuslivinghub, oreateai.com, **houzz (US)**, ferris-cabinetry (US), bestonlinecabinets (US), cabinetune, **youscrewit.com.au**, buildingandinteriors | **US shops + Reddit + AI-content sites** | No | Only 1 genuine AU trade voice on page 1 |
| soft close drawers worth it | kitchenbathgeeks, nvkitchenandbath, brushandrollpainting, luxwisp, houzz, **reddit ×2**, bryanturnerkitchens, **mb9.com.au**, **bunnings Workshop forum** | US blogs + forums | No | AU pricing + Blum trade-pack maths would win instantly |
| Hamptons kitchen Australia | homebeautiful ×2, **homestolove**, mojohomes, bhg.com.au, knebel, **bunnings**, **highlandkitchens (Camden NSW)**, thegoodguys, carlislehomes | **Publishers + volume builders** | No | Highland Kitchens proves a NSW joiner can rank here |
| engineered stone ban replacement benchtops | **safeworkaustralia ×4**, safework.sa.gov.au, **theconversation**, **abf.gov.au**, dewr.gov.au, **abc.net.au** | **100% government + media** | No | No practitioner guide exists — highest-authority gap in the study |
| kitchen renovation cost Australia 2026 | threebirdsrenovations, hackeraustralia, co-architecture ×2, jonathan-homes, **whatsthedamage**, newnhamconstructions, **goingrate**, **kitchenquote**, kitchenshack | Renovation brands + calculators | No | National head term; attack via NSW/Newcastle modifiers |
| walk in robe cost Australia | **steepwood #1**, wardrobeman, **reddit**, **steepwood**, oppeingroup, tradeheroes, joycekitchens, **goingrate**, **hipages**, kitchenfox | SteepWood + aggregators + Reddit | **Yes #1 + #4** | Best-performing existing asset |
| built in wardrobe cost Australia | wardrobeman, **thequoteyard**, **airtasker**, **reddit**, **goingrate**, candrcabinets, **steepwood**, sydneywardrobe, **hipages**, robesdelivered | Aggregator-dominated | **Yes #7** | Push to top 3 with NSW linear-metre data |
| reception desk cost Australia | adco, officefurniturebrisbane, premierofficefurniture ×2, bfx, cavan, officestock, keenoffice, abaxkf, **bunnings** | **100% office-furniture retailers** | No | Nobody covers *custom joinery* reception desks — total gap |
| kitchen island cost Australia | **rjggroup ×2**, **thequoteyard ×2**, refreshrenovations, kitchenquote, auspoints, insideoutjoinery, dicksmith.com.au, loughlinfurniture | Aggregators + one Sydney joiner | No | insideoutjoinery.au shows a joiner can rank |
| spotted gum timber price per metre | **trendtimbers ×3**, nationwidetimber, sustainableforestmanagement, allenbrothersflooring, jbmtimber, hammerroo, boschtimber, blacktownbuildingsupplies | Timber suppliers | No | Species-selection content for *joinery* (not decking) is missing |
| blackbutt timber price Australia | canterburytimbers, **trendtimbers ×4**, nationwidetimber, blacktownbuildingsupplies, imperialflooring, rusticworldtimbers, mahoneystimber | Timber suppliers | No | Same gap |
| Tasmanian oak price per cubic metre | jbmtimber, **trendtimbers ×5**, blackwoodgrowers ×2, mahoneystimber, canterburytimbers | Timber suppliers | No | Same gap |
| American oak timber price Australia | tileimporter ×3, **gumtree ×2**, **trendtimbers ×4**, livingtimbertrade | Suppliers + classifieds | No | Gumtree ranking = very weak SERP |
| Dekton benchtop price Australia | auskstone ×2, **marblebenchtopshub ×6**, cosentino, mastertops | Stone fabricators/suppliers | No | Fabricator-only; no cabinetmaker perspective |
| Neolith benchtop price Australia | **marblebenchtopshub ×2**, **auskstone ×5**, vbathroom, ceramicahomes, homebeautiful | Suppliers | No | Same |
| Smartstone price per square metre | **mobicast.co.za**, yellowpages.com.au, smartstonelandscape ×2, smartstone.com.au, **smartstone.co.za**, smartstonesystems ×2, marblebenchtopshub, auskstone | **Badly broken SERP — South African paving sites rank** | No | Trivially winnable with a correct AU Smartstone page |
| Caesarstone porcelain price Australia | marblebenchtopshub, **auskstone ×4**, jlmarble ×2, bambystone, caesarstone.com.au ×2, buildupbuildingsupplies | Suppliers + brand | No | No installer-side guidance |
| cabinet maker hourly rate Australia | **reddit**, **payscale ×3**, **indeed ×2**, servicetasker, **hipages**, **airtasker** | **Salary sites + aggregators** — no cabinetmaker | No | Nobody explains the difference between wage and charge-out rate |
| joiner hourly rate NSW | **cfmeu ×4**, payscale, ircgazette.justice.nsw.gov.au, fairworkmate, **whatsthedamage**, joiners.net.au | Union wage sheets + salary sites | No | Same gap, NSW-specific |

**Cross-SERP patterns**
- **Reddit appears on page 1** for *built in home office cost*, *walk in robe cost*, *built in wardrobe cost*, *Blum hardware worth it*, *soft close drawers worth it*, *cabinet maker hourly rate*. Reddit ranking is a reliable marker of unmet informational demand.
- **Aggregator saturation** is highest on cost queries and zero on "[service] [city]" commercial queries — the opposite of the usual assumption. Commercial/head terms are won by entity strength; cost terms are won by content.
- **Interstate and overseas contamination** appears on *custom joinery Newcastle* (UK), *Smartstone price* (South Africa), *Blum/soft-close* (US), *laundry renovation cost* (Perth/Melbourne/Canberra pages). Every one of these is a geo-relevance opening.

---

## SECTION 3 — Keyword and demand intelligence

### 3a. Confirmed search-volume data (publicly published)

| Keyword / term | Volume | Market | Basis | Source |
|---|---|---|---|---|
| bathroom renovations | **27,100 / month** (#1 home-improvement term in Australia **and** #1 in NSW) | AU | Google Keyword Planner, trailing 12 months | [Compare the Market](https://www.comparethemarket.com.au/home-loans/features/most-popular-home-improvements/) |
| outdoor kitchens | 22,200 / month | AU | Google Keyword Planner | [Compare the Market](https://www.comparethemarket.com.au/home-loans/features/most-popular-home-improvements/) |
| fencing | 18,100 / month | AU | Google Keyword Planner | [Compare the Market](https://www.comparethemarket.com.au/home-loans/features/most-popular-home-improvements/) |
| flooring | 12,100 / month | AU | Google Keyword Planner | [Compare the Market](https://www.comparethemarket.com.au/home-loans/features/most-popular-home-improvements/) |
| landscaping | 12,100 / month | AU | Google Keyword Planner | [Compare the Market](https://www.comparethemarket.com.au/home-loans/features/most-popular-home-improvements/) |
| kitchen renovation cost | 1,300 / month · KD 27 | AU | Agency keyword deck (Ahrefs-style) | [Keyword research PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| kitchen renovators | 1,000 / month · KD 20 | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| how much to renovate a kitchen | 320 / month | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| average cost of kitchen renovation | 260 / month | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| **kitchen renovations newcastle** | **210 / month · KD 21 · CPC $2.02** | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| **kitchen renovations central coast** | **170 / month · KD 8** | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| **kitchen renovations penrith** | **170 / month · KD 12 · CPC $4.19** | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| **kitchen renovations wollongong** | **140 / month · KD 9 · CPC $1.48** | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| **kitchen renovations northern beaches** | **110 / month · KD 16 · CPC $5.43** (highest CPC found) | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| small kitchen renovations sydney | 110 / month · KD 30 | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| kitchen and bathroom renovations illawarra | 90 / month · KD 8 | AU | same | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| kitchen renovations adelaide | 720 / month | AU | same (benchmark for how big a metro term gets) | [PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf) |
| home renovation | 49,500 / month | Global | Keysearch public top-keywords page | [Keysearch](https://www.keysearch.co/top-keywords/home-renovation-keywords) |
| kitchen renovation | 40,500 / month | Global | same | [Keysearch](https://www.keysearch.co/top-keywords/home-renovation-keywords) |
| kitchen renovation costs | 33,100 / month | Global | same | [Keysearch](https://www.keysearch.co/top-keywords/home-renovation-keywords) |
| home remodeling | 33,100 / month | Global | same | [Keysearch](https://www.keysearch.co/top-keywords/home-renovation-keywords) |
| kitchen makeover | 9,900 / month | Global | same | [Keysearch](https://www.keysearch.co/top-keywords/home-renovation-keywords) |

**Australia's renovation search intensity, normalised (SEMrush data, searches per 100,000 population per month)** — [Compare the Market](https://www.comparethemarket.com.au/home-loans/features/which-countries-love-renovation-the-most/):

| Term | AU searches / 100k pop / month | Global rank |
|---|---:|---|
| Total renovation searches | 55.32 | **3rd in the world** |
| kitchen renovation | 16.85 | **2nd** |
| bathroom renovation | 20.68 | 5th |
| **laundry renovation** | **6.13** | **1st in the world** |
| renovation | 11.11 | — |
| bedroom renovation | 0.42 | — |
| home office renovation | 0.11 | — |

> **Strategic read:** Australia is the world's #1 market for *laundry renovation* search intensity and #2 for *kitchen renovation* — yet the *laundry cabinets cost Australia* SERP is entirely product retailers and the *laundry renovation cost* SERP has no NSW joiner. That is the highest volume-to-competition ratio identified in this study.

**Not found / labelled as gaps:** Keysearch's public list contains **no** wardrobe, cabinetry, vanity, joinery, shopfitting or staircase terms (full list is 648 keywords behind a signup) ([Keysearch](https://www.keysearch.co/top-keywords/home-renovation-keywords)). No published Australian volume data was located for *custom joinery*, *cabinet maker [city]*, *built-in wardrobe*, *butler's pantry*, *office fitout* or *shopfitting* — those figures are **n.a.** and would require a paid tool.

### 3b. Market-size demand indicators

| Indicator | Value | Source |
|---|---|---|
| AU home improvement spend, last financial year | **$53.8 billion** (largest since 2022) | [Budget Direct](https://www.budgetdirect.com.au/home-contents-insurance/guides/home-improvements/home-renovation-capitals-of-australia.html) |
| **NSW share** | **$19.03 billion** — largest state; NSW renovation numbers eclipsed other states in 2026 | [Budget Direct](https://www.budgetdirect.com.au/home-contents-insurance/guides/home-improvements/home-renovation-capitals-of-australia.html) |
| Victoria / Queensland / WA / SA | $12.458b / $12.069b / $4.775b / $3.553b | [Budget Direct](https://www.budgetdirect.com.au/home-contents-insurance/guides/home-improvements/home-renovation-capitals-of-australia.html) |
| 2026 AU renovation spend | ~$50+ billion; **bathroom + kitchen together are >60% of total spend** | [What's The Damage 2026 report](https://whatsthedamage.com.au/report/australian-renovation-market-2026/) |
| Full kitchen renovation range (national) | $8,179–$20,443, midpoint **$14,311** | [What's The Damage](https://whatsthedamage.com.au/report/australian-renovation-market-2026/) |
| Kitchen scope spread | $5,000 flat-pack → **$80,000+** custom rebuild | [What's The Damage](https://whatsthedamage.com.au/report/australian-renovation-market-2026/) |
| Australia alterations & additions approved | **+14.0% year-on-year** in the latest three months; NSW new-home approvals +9.0% YoY to April 2026 | [HIA](https://hia.com.au/our-industry/newsroom/economic-research-and-forecasting/2026/06/approvals-reflect-good-momentum-heading-into-2026) |
| Australia alterations & additions, work done | **$3,976.2m** in March quarter 2026, **+4.1%** | [ABS Building Activity](https://www.abs.gov.au/statistics/industry/building-and-construction/building-activity-australia/latest-release) |
| Australia alterations & additions approved, monthly | **$1,321m** seasonally adjusted June 2026 (−4.0% on the month) | [ABS Building Approvals](https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia/latest-release) |
| NSW dwelling approvals | **5,063** seasonally adjusted June 2026 (trend 4,762) | [ABS Building Approvals](https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia/latest-release) |
| NSW renovation investment outlook | Expected to **outpace Victoria by nearly 50% in 2026**, driven by high Sydney land cost | [HIA Outlook](https://hia.com.au/our-industry/housing/in-focus/2025/10/outlook-sunny-with-a-chance-of-renovations) |

### 3c. Seasonality

**Documented, qualitative only.** Spring is described as *"one of the busiest renovation seasons in Australia"* and the start of the busy season; tradies are often fully booked by summer, quality professionals are heavily booked well before Christmas, and winter is not a busy season ([ServiceSeeking](https://www.serviceseeking.com.au/industry-insights/is-spring-a-good-time-to-renovate-7-reasons)). **No numeric quote-volume or search-index seasonality data for Australia was located — n.a.**

**Content implication:** the publishing calendar should front-load "planning" and "lead time" content in **late winter (July–August)** so it is indexed and ranking before the spring enquiry surge, and shift to "book now for autumn / avoid the Christmas shutdown" messaging from **September–November**.

---

## SECTION 4 — NSW location intelligence

### 4a. Master ranking — 52 NSW LGAs by renovation spend

Ranked by **value of alterations & additions approved, 2025-26 financial year ($'000)** — the closest available proxy for addressable custom-joinery demand — from the [ABS LGA building approvals data cube (June 2026)](https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia/jun-2026/87310do005_202606.xlsx). Population and median weekly household income are ABS 2021 Census QuickStats (population figures link to their source page).

| # | LGA | Alterations & additions approved 2025-26 | Total dwelling approvals 2025-26 | Population (2021) | Median weekly household income |
|---|---|---:|---:|---:|---:|
| 1 | Northern Beaches | $414,629k | 625 | [263,554](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA15990) | $2592 |
| 2 | Inner West | $300,441k | 901 | [182,818](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA14170) | $2340 |
| 3 | Woollahra | $287,592k | 237 | [53,496](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA18500) | $3192 |
| 4 | Sydney | $215,034k | 1,694 | [211,632](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17200) | $2212 |
| 5 | Waverley | $186,392k | 180 | [68,605](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17550) | $2854 |
| 6 | Randwick | $179,005k | 470 | [134,252](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16550) | $2305 |
| 7 | Central Coast | $165,958k | 1,324 | [346,596](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA11650) | $1507 |
| 8 | Sutherland Shire | $138,344k | 1,318 | [230,211](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17150) | $2288 |
| 9 | Willoughby | $127,019k | 176 | [75,613](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA18250) | $2556 |
| 10 | Wollongong | $117,062k | 1,605 | [214,564](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA18450) | $1682 |
| 11 | Newcastle | $115,526k | 854 | [168,873](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA15900) | $1760 |
| 12 | Ku-ring-gai | $114,060k | 910 | [124,076](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA14500) | $3038 |
| 13 | North Sydney | $104,341k | 464 | [68,950](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA15950) | $2524 |
| 14 | Mosman | $100,756k | 80 | [28,329](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA15650) | $2892 |
| 15 | Lake Macquarie | $92,577k | 1,214 | [213,845](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA14650) | $1623 |
| 16 | Hornsby | $90,967k | 421 | [151,811](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA14000) | $2417 |
| 17 | Canterbury-Bankstown | $71,087k | 1,668 | [371,006](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA11570) | $1556 |
| 18 | Shoalhaven | $69,882k | 869 | [108,531](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16959) | $1250 |
| 19 | The Hills Shire | $67,420k | 2,696 | [191,876](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17420) | $2831 |
| 20 | Wingecarribee | $54,750k | 336 | [52,709](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA18350) | $1673 |
| 21 | Lane Cove | $54,054k | 453 | [39,438](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA14550) | $2801 |
| 22 | Blacktown | $51,861k | 2,415 | [396,776](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA10750) | $2107 |
| 23 | Parramatta | $48,289k | 2,696 | [256,729](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16260) | $2051 |
| 24 | Port Macquarie-Hastings | $43,222k | 502 | [86,762](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16380) | $1263 |
| 25 | Ryde | $38,855k | 1,378 | [129,123](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16700) | $2098 |
| 26 | Blue Mountains | $37,683k | 124 | [78,121](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA10900) | $1756 |
| 27 | Penrith | $37,212k | 1,528 | [217,664](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16350) | $1903 |
| 28 | Byron | $36,686k | 168 | [36,116](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA11350) | $1602 |
| 29 | Kiama | $35,201k | 169 | [23,074](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA14400) | $1834 |
| 30 | Coffs Harbour | $31,990k | 340 | [78,759](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA11800) | $1363 |
| 31 | Ballina | $30,751k | 198 | [46,296](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA10250) | $1429 |
| 32 | Orange | $28,389k | 220 | [43,512](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16100) | $1665 |
| 33 | Albury | $27,187k | 415 | [56,093](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA10050) | $1430 |
| 34 | Port Stephens | $26,091k | 659 | [75,276](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16400) | $1372 |
| 35 | Camden | $25,022k | 1,759 | [119,325](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA11450) | $2353 |
| 36 | Wagga Wagga | $24,030k | 487 | [67,609](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17750) | $1638 |
| 37 | Hawkesbury | $21,375k | 460 | [67,207](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA13800) | $1980 |
| 38 | Queanbeyan-Palerang | $21,167k | 383 | [63,304](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16490) | $2295 |
| 39 | Wollondilly | $20,702k | 1,214 | [53,961](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA18400) | $2151 |
| 40 | Maitland | $18,818k | 1,370 | [90,226](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA15150) | $1766 |
| 41 | Cessnock | $18,203k | 767 | [63,632](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA11700) | $1493 |
| 42 | Campbelltown | $18,177k | 1,691 | [176,519](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA11500) | $1700 |
| 43 | Liverpool | $16,707k | 2,163 | [233,446](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA14900) | $1819 |
| 44 | Bathurst Regional | $16,476k | 196 | [43,567](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA10550) | $1585 |
| 45 | Tamworth Regional | $14,832k | 413 | [63,070](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17310) | $1416 |
| 46 | Dubbo Regional | $13,347k | 416 | [54,922](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA12390) | $1597 |
| 47 | Shellharbour | $10,718k | 856 | [76,271](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA16950) | $1647 |
| 48 | Goulburn Mulwaree | $8,866k | 334 | [32,053](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA13340) | $1466 |
| 49 | Armidale Regional | $7,050k | 106 | [29,124](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA10130) | $1404 |
| 50 | Singleton | $6,542k | 115 | [24,577](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17040) | $2016 |
| 51 | Griffith | $3,517k | 110 | [20,799](https://www.abs.gov.au/census/find-census-data/quickstats/2021/UCL112010) | $1706 |
| 52 | Muswellbrook | $1,956k | 69 | [16,357](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA15800) | $1628 |
### 4b. Priority tiers for SteepWood

| Tier | Locations | Why |
|---|---|---|
| **Tier 1 — home turf, must own** | Newcastle ($115.5m alterations), Lake Macquarie ($92.6m), Central Coast ($166.0m), Maitland, Port Stephens, Cessnock | Workshop is in Newcastle. Central Coast is the **7th-largest alterations market in NSW** and the **largest by dwelling count** outside Sydney (346,596 people, 152,706 dwellings). Newcastle + Lake Macquarie + Central Coast together = **$374m** of approved alterations |
| **Tier 2 — highest-value Sydney sub-markets** | Northern Beaches, Inner West, Woollahra, Waverley, Randwick, Sutherland Shire, Ku-ring-gai, Willoughby, North Sydney, Mosman, Lane Cove, Hornsby | The 12 wealthiest renovation markets in Australia's largest state. Northern Beaches + Inner West + Woollahra alone = **$1.00 billion** of approved alterations in one year |
| **Tier 3 — high-volume growth corridors** | The Hills Shire (2,696 approvals), Parramatta (2,696), Blacktown (2,415), Liverpool (2,163), Camden (1,759), Penrith, Campbelltown, Ryde, Canterbury-Bankstown | Very high **new-build** approval counts but comparatively low alterations spend → these are *new home joinery* and *second-stage fitout* markets, not renovation markets |
| **Tier 4 — premium regional / lifestyle** | Wollongong ($117.1m), Kiama, Shellharbour, Wingecarribee (Bowral/Mittagong, $54.8m), Shoalhaven ($69.9m), Byron ($36.7m), Ballina, Port Macquarie-Hastings ($43.2m), Blue Mountains ($37.7m) | High-value discretionary renovation; low keyword difficulty (kitchen renovations wollongong KD 9, illawarra KD 8) |
| **Tier 5 — regional cities, low competition** | Orange, Bathurst, Dubbo, Albury, Wagga Wagga, Tamworth, Coffs Harbour, Armidale, Goulburn, Queanbeyan, Griffith, Singleton, Muswellbrook | Smaller absolute markets but almost no bespoke-joinery competition. SteepWood already ranks with `/home-office-joinery/orange-nsw/` and `/staircase-joinery/orange-nsw/` pages — proof the template works |

### 4c. Price and dwelling-value context by region

| Market | Median value | Movement | Source |
|---|---|---|---|
| Sydney houses | **$1,733,891** | −3.3% qtr, +1.1% yr | [Domain House Price Report, June 2026](https://www.domain.com.au/research/house-price-report/june-2026/) |
| Sydney units | $849,068 | — | [Domain HPR June 2026](https://www.domain.com.au/research/house-price-report/june-2026/) |
| Sydney houses (31 July 2026, Cotality) | $1,529,308 | −4.6% qtr; dwellings $1,244,617, **5.3% below the Jan 2026 peak** | [OpenAgent/Cotality](https://www.openagent.com.au/suburb-profiles/sydney-property-market), [Australian Property Experts](https://australianpropertyexperts.com.au/blog/sydney-property-market-2026/) |
| Regional NSW dwellings | **$833,540** | +2.4% qtr, **+8.9% yr** | [NAB Regional NSW Q1 2026](https://www.nab.com.au/content/dam/nab/documents/reports/loan/nsw-regional-property-market-insights.pdf) |
| Regional NSW houses | $866,182 | +9.2% yr | [NAB](https://www.nab.com.au/content/dam/nab/documents/reports/loan/nsw-regional-property-market-insights.pdf) |
| Regional NSW houses (Domain) | **record $800,000** | +5.3% yr, +2.6% qtr — **outpacing Sydney's +4.2%** | [Domain Insight](https://insight.domain.com.au/research-insights/industry-news/the-surprising-nsw-tree-change-towns-where-house-prices-rose-most/) |
| Newcastle + Lake Macquarie dwellings | **$1,042,616** (houses $1,084,207, units $810,808) at 30 June 2026 | −0.4% month, **+9.2% yr**, peaked April 2026 | [Landmark Valuations](https://www.landmark-valuations.com.au/blog/property-valuation-newcastle-hunter-guide) |
| Newcastle houses | ~$927,500; rent $670/wk | — | [PropertyScout](https://propertyscoutau.com.au/market-trends/newcastle-nsw) |
| Hunter sub-regions | Lower Hunter **+14.0%**, Lake Macquarie-East **+12.4%**, Maitland **+11.7%** | annual | [Landmark Valuations](https://www.landmark-valuations.com.au/blog/property-valuation-newcastle-hunter-guide) |
| Central Coast houses | ~$1,103,000 (from ~$1,034,000), **+6.7%** to Feb 2026; ~8%/yr over 15 years | Avoca Beach $1.6–1.7m; Copacabana ~$1,631,000 (−3.2%); Terrigal ~$1,610,000 (+0.2%) | [George Brand](https://georgebrand.com.au/central-coast-property-market-update-winter-2026/) |
| Wollongong houses | ~$915,000 June qtr 2026, +6.2% yr | Thirroul >$1.35m (+11.6%); Fairy Meadow ~$1.08m (+7.4%); Figtree ~$875,000 (+4.8%); CBD units ~$610,000 (+5.1%) | [Daily Wollongong](https://dailywollongong.com.au/article/property-wollongong-20260703-ff503e6aa6dd) |
| Regional city growth (qtr / yr) | Wollongong +17.6%/+9.4%; Tamworth +10.3%/+8.7%; Orange +8.6%/+7.4%; Port Macquarie +8.4%/**+18.0%**; Newcastle +5.6%/+2.1%; Wagga +4.9%/+16.3%; Coffs +2.2%/+4.0%; Bathurst +1.2%/+6.2%; Dubbo +0.9%/+4.0%; Albury −1.6%/+2.9% | — | [NAB Regional NSW](https://www.nab.com.au/content/dam/nab/documents/reports/loan/nsw-regional-property-market-insights.pdf) |
| Central West medians (12m to May 2026) | Orange $744,500 (+10.18%); Mudgee $737,500 (+6.12%); Bathurst $665,000 (+1.53%); Dubbo $665,000 (+12.71%) | — | [Australian Property Experts](https://australianpropertyexperts.com.au/blog/central-west-nsw-property-investment-2026/) |
| Tree-change hotspots | Muswellbrook $585,000 **+18.2%**; Lismore $635,000 +17.6%; Kempsey $585,000 +15.8%; Snowy Monaro +15.1%; Upper Hunter +14.9%; Port Macquarie-Hastings $805,000; Coffs Harbour $820,000 | — | [Domain Insight](https://insight.domain.com.au/research-insights/industry-news/the-surprising-nsw-tree-change-towns-where-house-prices-rose-most/) |
| Byron region | Byron Bay **$2,454,099** (+4.45%); Ocean Shores $1,380,000 (+9.3%); Mullumbimby $1,120,000 (+9.6%), Dec 2025 | — | [Byron Property Search](https://www.byronpropertysearch.com.au/market-watch-2026/) |
| Most expensive Sydney suburbs 2026 | Point Piper **$23.5m**; Bellevue Hill $11.3m (71 sales); Centennial Park $11.0m; Vaucluse $9.60m (113 sales); Darling Point $9.13m; Double Bay $8.20m | — | [Property Carto](https://property.carto.au/sydney/house-prices/by-suburb/list) |
| Top Sydney SA3s by annual growth | Richmond-Windsor $1,007,861 **+7.5%**; Wyong $954,707 +7.4%; Camden $1,221,197 +7.0%; Wollondilly $1,227,130 +6.7%; Penrith $1,057,034 +6.1%; Campbelltown $1,000,076 +5.9%; Blue Mountains $1,016,832 +5.5%; Mount Druitt $981,168 +5.4%; Bringelly-Green Valley $1,247,218 +5.4%; St Marys $1,069,324 +4.5% | — | [Australian Property Experts](https://australianpropertyexperts.com.au/blog/sydney-property-market-2026/) |
| Long-run growth | Byron LGA **+89% since March 2020** (best in Australia); Kiama LGA +80% (4th); Mollymook Beach +62% annual (strongest in Australia). Sydney 20-year annualised 7.3%; regional NSW 7.8% | — | [Domain Spotlight NSW](https://insight.domain.com.au/research-insights/reports/domain-spotlight-report-new-south-wales/) |

### 4d. Population growth and forward pipeline

| Metric | Value | Source |
|---|---|---|
| Greater Sydney ERP at 30 June 2025 | **5,638,830**, +75,230 (+1.4%) | [ABS Regional Population](https://www.abs.gov.au/statistics/people/population/regional-population/latest-release) |
| Rest of NSW | +25,200 (+0.9%) | [ABS](https://www.abs.gov.au/statistics/people/population/regional-population/latest-release) |
| Fastest-growing NSW SA2s | Box Hill-Nelson 26,348 (**+3,911, +17.4%**); Austral-Greendale +16%; Marsden Park-Shanes Park +12% | [ABS](https://www.abs.gov.au/statistics/people/population/regional-population/latest-release) |
| NSW population projection | 8.1m (2021) → **10.07m (2041)**; Greater Sydney 4.9m → 6.3m (+28%) | [NSW Planning](https://www.planning.nsw.gov.au/data-and-resources/population-projections/key-findings) |
| Regional growth to 2041 | Illawarra-Shoalhaven **+36%**; Lower Hunter / Greater Newcastle **+27%**; Central Coast +17% | [NSW Planning](https://www.planning.nsw.gov.au/data-and-resources/population-projections/key-findings) |
| Fastest-growing LGAs to 2041 | **Maitland +49%, Shellharbour +43%, Cessnock +40%, Shoalhaven +40%**; annual growth Camden 3.5%, Wollondilly 3.3%, The Hills 2.7% | [NSW Planning](https://www.planning.nsw.gov.au/data-and-resources/population-projections/key-findings) |

### 4e. Housing stock character (where documented)

| Location | % separate houses (2021 Census) | Implication for joinery |
|---|---:|---|
| Blue Mountains | **92.1%** | Almost entirely detached — full-house joinery, staircases, period-style kitchens |
| Newcastle | 69.0% | Mixed inner-city terrace/apartment + detached suburbs |
| Woollahra | **22.3%** | Apartment/terrace heavy — small-footprint bespoke joinery, custom vanities, wall-to-wall robes |
| City of Sydney | **2.1%** | Effectively all apartments — bespoke fitted joinery for tight plans, no staircases |

Separate-house percentage was captured for all 52 LGAs in `s4_pop.jsonl`; the four above are the extremes. Domain and Cotality data did not provide a narrative "renovation character" description per location, so qualitative character statements for other LGAs are **n.a.**

---

## SECTION 5 — Local SEO and compliance intelligence for NSW

### 5a. Google Business Profile — ranking factors and service-area rules (Google's own documentation)

| Rule | Detail | Source |
|---|---|---|
| Ranking factors | Local results are **mainly based on relevance, distance and prominence**. Prominence is based partly on **how many websites link to the business and how many reviews it has**; more reviews and positive ratings can help local ranking. There is **no way to request or pay for a better local rank**. | [Google Business Profile Help 7091](https://support.google.com/business/answer/7091?hl=en) |
| Address visibility | If you do not serve customers at your business address, **remove the address** and enter only your service area | [Google Help 9157481](https://support.google.com/business/answer/9157481?hl=en) |
| One profile only | Service-area businesses **can only have one profile** for the whole area served | [Google Help 9157481](https://support.google.com/business/answer/9157481?hl=en) |
| Service-area limit | **Up to 20 service areas**, specified by **cities, postal codes or other areas** | [Google Help 9157481](https://support.google.com/business/answer/9157481?hl=en) |
| No radius | You **cannot** set a service area as a radius around your address; if previously set that way it cannot be edited and must be respecified by city/postcode | [Google Help 9157481](https://support.google.com/business/answer/9157481?hl=en) |
| Eligibility | Eligible if the business has a physical location customers can visit **or** travels to customers | [Google Help 3038177](https://support.google.com/business/answer/3038177?hl=en) |
| Business name | Must represent the business **as it is consistently represented in the real world** across signage, stationery and branding | [Google Help 3038177](https://support.google.com/business/answer/3038177?hl=en) |
| Categories | Choose the **fewest categories needed** to describe the core business | [Google Help 3038177](https://support.google.com/business/answer/3038177?hl=en) |
| One profile per business | More than one profile per business **can cause problems** with how information displays in Maps and Search | [Google Help 3038177](https://support.google.com/business/answer/3038177?hl=en) |

> **Practical consequence for SteepWood:** because a Newcastle workshop cannot manipulate *distance*, and can hold only one GBP with a maximum of 20 service areas, ranking in Sydney, the Central Coast, Wollongong and regional NSW must come from **website relevance (location landing pages) and prominence (reviews, links, citations)** — not from GBP geography. The 20-slot service-area cap should be allocated against the Tier 1 and Tier 4 LGAs in Section 4b, not spread thin.

### 5b. NSW licensing and advertising requirements

| Requirement | Detail | Source |
|---|---|---|
| Licence threshold | A **contractor licence** is required to **carry out, advertise or contract for** residential building or trade work — including carpentry — valued at more than **$5,000 in labour and materials, including GST** | [NSW Government — carpentry work](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/carpentry-work) |
| Penalties | **$22,000** for an individual, **$110,000** for a company, under the *Home Building Act 1989* | [NSW Government](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/general-building-work) |
| Licence classes | Individual contractor licence or endorsed contractor licence; company/partnership contractor licence; qualified supervisor certificate — issued for **1, 3 or 5 years** | [NSW Government](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/carpentry-work) |
| Kitchen/bathroom/laundry renovation | Explicitly listed as **"other residential building work"** requiring a contractor licence above $5,000 | [NSW Government — categories of work](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/categories-of-work) |
| **Advertising — mandatory disclosures** | All advertising must include: (1) the **licensee's name** — individual, company, or a business name registered to the licensee under the *Business Names Registration Act 2011*; (2) the **licence number with the correct category of work**; (3) the **business telephone number**. Applies to **internet, television, radio and other advertising** | [NSW Government — building trade advertisements](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements) |
| Advertising prohibition | The Act prohibits advertising residential building work over $5,000 — or specialist work of any value — without a current contractor licence | [NSW Government](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements) |
| Price claims in ads | *"A price cannot be stated as only part of the cost unless the single price is also clearly stated"* | [NSW Government](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements) |

> **Action:** every page of steepwood.com.au — including every cost guide and location landing page — should carry the footer string *"SteepWood · NSW Carpentry Contractor Licence 489553C · [phone]"*. This is a legal requirement for advertising, and simultaneously an E-E-A-T and conversion signal that almost no competitor reviewed provides.

### 5c. Contracts, insurance and warranties

| Item | Detail | Source |
|---|---|---|
| Written contract required | If the contract price is **over $5,000 including GST**, or the price is unknown but reasonable market cost of labour + materials exceeds $5,000 including GST. Must be dated and signed by/on behalf of each party | [NSW Government — contracts](https://www.nsw.gov.au/housing-and-construction/building-or-renovating-a-home/preparing/contracts) |
| $5,000–$20,000 | **Small job contract** with basic information | [NSW Government](https://www.nsw.gov.au/housing-and-construction/building-or-renovating-a-home/preparing/contracts) |
| Over $20,000 | Extensive **large job contract** | [NSW Government](https://www.nsw.gov.au/housing-and-construction/building-or-renovating-a-home/preparing/contracts) |
| **HBCF insurance threshold** | Required where a home building project is valued at **$20,000 or more including GST**. Builder must give the homeowner the **Certificate of Insurance before starting work or before asking for a deposit or any other payment**. Failure to take out cover is **an offence under NSW law** | [HIA Insurance Services](https://www.hiainsurance.com.au/products/home-warranty-insurance/home-warranty-insurance-nsw) |
| HBCF statutory basis | Residential building work exceeding **$20,000** requires HBCF insurance under the *Home Building Act 1989 (NSW)*; the threshold is total contract value **including labour and materials**; applies to new homes, renovations, extensions, alterations and additions | [Contracts Specialist](https://www.contractsspecialist.com.au/articles/common-misconceptions-hbcf-insurance/) |
| HBCF cover limits | Up to **$340,000** — claimable up to **6 years from completion** for major/structural defects and **2 years** for minor/non-structural defects. Covers the homeowner and any subsequent owner. Triggered if the builder disappears, dies, becomes insolvent, or has their licence suspended | [HIA Insurance Services](https://www.hiainsurance.com.au/products/home-warranty-insurance/home-warranty-insurance-nsw) |
| Statutory warranties (NSW) | **6 years** from completion for major defects; **2 years** for other defects. If a defect becomes apparent in the last six months of the period, a further six months applies to commence proceedings. Statutory warranties **cannot be excluded or restricted** | [HIA](https://hia.com.au/resources-and-advice/managing-your-business/managing-compliance/articles/statutory-warranties-for-home-building-work) |

*icare and SIRA pages on HBCF were robots-blocked and could not be fetched; the HBCF facts above come from HIA Insurance Services and Contracts Specialist. The official SIRA page is [sira.nsw.gov.au/home-building-compensation](https://www.sira.nsw.gov.au/home-building-compensation) — cite it but verify wording separately.*

### 5d. Engineered stone prohibition — exact scope and dates

| Date | Event | Source |
|---|---|---|
| **13 December 2023** | WHS Ministers unanimously agreed to ban the **use, supply and manufacture** of engineered stone from 1 July 2024, with limited exceptions | [Safe Work Australia](https://www.safeworkaustralia.gov.au/safety-topic/hazards/silica/engineered-stone-ban), [SafeWork NSW](https://www.safework.nsw.gov.au/legal-obligations/legislation/accordians/work-health-and-safety-amendment-engineered-stone-regulation-2024) |
| **31 December 2023** | Transitional arrangements apply to contracts entered into before this date | [SafeWork NSW](https://www.safework.nsw.gov.au/legal-obligations/legislation/accordians/work-health-and-safety-amendment-engineered-stone-regulation-2024) |
| **1 July 2024** | Commonwealth and all states/territories implemented the model WHS Regulation amendments. It became an offence for a PCBU to carry out — or direct/allow a worker to carry out — work involving the **manufacture, supply, processing or installation** of engineered stone benchtops, panels or slabs. NSW: *Work Health and Safety Amendment (Engineered Stone) Regulation 2024* commenced | [Safe Work Australia](https://www.safeworkaustralia.gov.au/safety-topic/hazards/silica/engineered-stone-ban), [SafeWork NSW](https://www.safework.nsw.gov.au/legal-obligations/legislation/accordians/work-health-and-safety-amendment-engineered-stone-regulation-2024) |
| **31 December 2024** | Work under contracts entered before 31 December 2023 could continue until this date | [SafeWork NSW](https://www.safework.nsw.gov.au/legal-obligations/legislation/accordians/work-health-and-safety-amendment-engineered-stone-regulation-2024) |
| **1 January 2025** | Engineered stone benchtops, panels and slabs became **prohibited imports** under regulation 5M of the *Customs (Prohibited Imports) Regulations 1956* | [Safe Work Australia](https://www.safeworkaustralia.gov.au/safety-topic/hazards/silica/engineered-stone-ban), [Australian Border Force](https://www.abf.gov.au/prohibited-goods-subsite/Pages/engineered-stone.aspx) |

**Definition and exclusions.** Engineered stone is an artificial product that contains crystalline silica, is created by combining natural stone materials with other chemical constituents such as water, resins or pigments, and undergoes a hardening process. The prohibition applies to **benchtops, panels and slabs**. The ban does **not** apply to concrete and cement products, bricks, pavers and similar blocks, or porcelain products ([SafeWork NSW public notice](https://www.safework.nsw.gov.au/news/safework-public-notice/engineered-stone-prohibition-to-commence-1-july-2024)). The NSW regulation **clarifies that all sintered stone and porcelain products are excluded from the general prohibition** ([SafeWork NSW regulation summary](https://www.safework.nsw.gov.au/legal-obligations/legislation/accordians/work-health-and-safety-amendment-engineered-stone-regulation-2024)). Implementation may vary slightly between jurisdictions ([Safe Work Australia](https://www.safeworkaustralia.gov.au/safety-topic/hazards/silica/engineered-stone-ban)).

**2025/2026 updates:** Safe Work Australia published a *Review of the engineered stone prohibition* dated December 2025 at [safeworkaustralia.gov.au/.../review-of-the-engineered-stone-prohibition_december2025.pdf](https://www.safeworkaustralia.gov.au/sites/default/files/2025-12/review-of-the-engineered-stone-prohibition_december2025.pdf). **The fetch timed out, so its findings are n.a. and should be read before publishing on this topic.** Safe Work Australia also lists an "We have updated our information on the engineered stone..." notice in search results; its content was not fetched.

### 5e. Australian Consumer Law — quoting and warranty obligations

| Obligation | Detail | Source |
|---|---|---|
| Statutory warranties on services | Every services contract contains warranties that (1) the service is carried out with **due care and skill**; (2) any **materials supplied are reasonably fit for purpose**; (3) the service and materials are **reasonably fit for any particular purpose the consumer made known** | [ACCC — Warranties and refunds guide (PDF)](https://www.accc.gov.au/system/files/Warranties%20and%20refunds%20-%20a%20guide%20for%20consumers%20and%20business.pdf) |
| When the provider is not responsible | If the consumer did not make clear what they wanted (unless clear from circumstances), or insisted the service be done a particular way and then dislikes the result | [ACCC PDF](https://www.accc.gov.au/system/files/Warranties%20and%20refunds%20-%20a%20guide%20for%20consumers%20and%20business.pdf) |
| Unsatisfactory services | Services that do not meet a statutory warranty **breach the contract** between consumer and seller | [ACCC PDF](https://www.accc.gov.au/system/files/Warranties%20and%20refunds%20-%20a%20guide%20for%20consumers%20and%20business.pdf) |
| **Single price rule** | If you display or advertise prices you must **always include the total price**, inclusive of all charges, taxes, duties, levies and fees — including **GST**. Optional charges such as delivery need not be included | [business.gov.au](https://business.gov.au/legal/fair-trading/display-prices) |
| **Component pricing** | If you advertise a price that is only part of the total, the **total must be shown as a single figure, at least as noticeable as the part price** | [business.gov.au](https://business.gov.au/legal/fair-trading/display-prices) |
| Price comparisons | Comparisons used to attract customers with possible savings **must not mislead** | [business.gov.au](https://business.gov.au/legal/fair-trading/display-prices) |
| ACCC role | Educates, accepts reports, **can require businesses to substantiate claims** about products or services, and may investigate and take compliance or enforcement action for misleading claims or unlawful price displays. It does **not** give legal advice or resolve individual disputes | [ACCC — false or misleading claims](https://www.accc.gov.au/business/advertising-and-promotions/false-or-misleading-claims), [ACCC — price displays](https://www.accc.gov.au/business/pricing/price-displays), [ACCC — setting prices](https://www.accc.gov.au/business/pricing/setting-prices) |

> **Content compliance rule for the 30-post programme:** every price range published must be **GST-inclusive and total**, or the GST-inclusive total must be stated with equal prominence. Ranges must be substantiable — build an internal evidence file per cost guide, because the ACCC can require substantiation. Avoid "from $X" headlines without the total-price context.

*ACCC pages on consumer guarantees, warranties, and displaying prices returned only "what the ACCC does" boilerplate rather than the substantive rules; the substantive obligations above therefore come from the ACCC's own PDF guide and business.gov.au.*

### 5f. Australian citation / directory sources — confirmed and what a listing offers

| Source | Confirmed | What a listing offers | Source |
|---|---|---|---|
| **Yellow Pages AU** | Yes | **Free listing** at no charge: business name, opening hours, phone, email, website, postal address. One free listing per business and address. Appears on yellowpages.com.au and whereis.com, and may be syndicated to **Google, Bing, Yahoo!7, Whereis, Google Maps, Voice Directory 1234, Call Connect** and other specialty sites. **Paid packages from $30/month** | [Yellow shop](https://www.yellow.com.au/shop/), [yellowpages.com.au](https://www.yellowpages.com.au/) |
| **True Local** | Yes | Australian business directory now presented under the Yellow Pages umbrella; lists popular categories by city including **Newcastle**. Specific listing features (profile, photos, reviews) **not stated on the site — n.a.** | [truelocal.com.au](https://www.truelocal.com.au/) |
| **Hotfrog AU** | Yes | Site is live and shows a live "Recent Activity" feed of businesses claiming listings, confirming a **claim-your-business** flow. Listing feature set **not stated — n.a.** | [hotfrog.com.au](https://www.hotfrog.com.au/) |
| **Localsearch** | Yes | Publishes "10 BEST [trade] in [city] NSW" pages — **ranked #1 for *joinery Newcastle NSW*** in this study's SERP data | `s1_serp.jsonl` |
| **Oneflare** | **No — retired** | Closed **30 June 2026**; folded into Airtasker; site and app redirect to airtasker.com. Businesses can no longer join, buy credits or quote. Oneflare review ratings were carried across to Airtasker for businesses migrating between 21 May and 30 June 2026 | [King Tradie](https://kingtradie.com/oneflare-review/) |
| **Airtasker** | Yes | Post-a-task marketplace with city service pages (e.g. `/au/services/cabinet-making/sydney/`). Customer describes the job, sets a budget, receives quotes and picks a Tasker. **160,000 Taskers** have earned income | [airtasker.com](https://www.oneflare.com.au/) |
| **hipages** | Yes | Credit-based lead marketplace. Up to **three tradies** can accept and connect with a customer. Credit cost per lead varies with trade skill level, number of tradies servicing a suburb, average job size, lead description and marketplace demand. Plans: **Starter $139+GST/mo (155 credits, 1 postcode)**, Advanced $249 (310, 3), Premium $449 (595, 5), **Platinum $649+GST (850 credits, 10 postcodes)** | [hipages lead pricing](https://hipages.com.au/tradie/lead-pricing/), [hipages membership costs](https://hipages.com.au/membership-costs) |
| **ServiceSeeking** | Yes | Lead marketplace with average-daily-budget model; business FAQ hub covers leads, budgets, contact details, service-area expansion and trials. **Fee amounts not published — n.a.** | [ServiceSeeking FAQs](https://serviceseeking.zendesk.com/hc/en-au/sections/360005258794-FAQs-for-Businesses) |
| **HIA (Housing Industry Association)** | Yes | Industry products for members to save time and get the job done; member support described qualitatively. Specific membership benefit list **not published on the homepage — n.a.** HIA does publish authoritative economic research and compliance articles worth citing | [hia.com.au](https://hia.com.au/) |
| **Master Builders NSW** | Yes | Offers a supportive local association, guidance and advice, industry representation across all sectors, and community access. **All MBA membership subscriptions are tax deductible.** Membership **categories and fees are not published — n.a.** | [MBA NSW — become member](https://www.mbansw.asn.au/become-member), [MBA NSW benefits](https://www.mbansw.asn.au/benefits) |
| **ACFA (Australian Cabinet and Furniture Association)** — the successor to CMDA | Yes | **75+ years** in furnishing, cabinet making, kitchen and joinery. **ACFA has merged with KBDi.** Membership tiers: **Micro** (sole traders/sub-contractors, no employees), **Associate** (suppliers/professional services), **Business+** (single-site with employees), **Premium** (multi-site with employees). Includes tailored workplace-relations templates, checklists, policies, unlimited HR advisory calls, 24/7 members portal, and **500+ business resources** across HR, WHS and wage rates | [acfa.net.au](https://www.acfa.net.au/), [ACFA membership PDF](https://www.acfa.net.au/wp-content/uploads/2024/03/ACFA-Membership_Web.pdf) |
| **KBDi (Kitchen and Bathroom Designers Institute)** | Yes | For designers, students, cabinetmakers, builders, tradespeople and industry suppliers. Has a Code of Ethics, membership levels, an **Accreditation Program**, and corporate/education/supplier partnerships. Retained benefits post-merger: design-inspired events, technical support, **PI insurance**, Design Awards program. Merger structured in two stages — ACFA added to the KBDi constitution as a special member for a **6–12 month** trial, then a **member vote** before completion | [KBDi — who is KBDi for](https://www.kbdi.org.au/become-a-member/who-is-kbdi-for), [KBDi merger announcement](https://www.kbdi.org.au/blogs/selina-zwolsman/2024/09/03/proposed-kbdi-and-acfa-merger-a-new-era-for-kitche) |
| **CMDA (Cabinet Makers and Designers Association)** | Domain live but **robots-blocked** (cmda.org.au) — could not be fetched. The FIAA/CMDA lineage now sits within ACFA per ACFA's own positioning; **direct confirmation n.a.** | — | — |
| **ATFA (Australasian Timber Flooring Association)** | Yes | Peak body for timber floors across Australia and NZ; not-for-profit, member-based, representing contractors, manufacturers, coating and adhesive manufacturers, suppliers and retailers. **Relevant to SteepWood only for timber flooring/stair-tread work, not cabinetry** | [atfa.com.au](https://atfa.com.au/) |

> **Citation-building priority:** Yellow Pages free listing first (it syndicates to Google, Bing, Google Maps, Whereis and Call Connect from a single submission), then Localsearch (it outranks every joiner for *joinery Newcastle NSW*), then Hotfrog and True Local. Treat hipages/Airtasker/ServiceSeeking as **paid lead channels**, not SEO assets — hipages Platinum at $649+GST/month for 10 postcodes is directly comparable to the cost of the content programme, and the content programme is a compounding asset while the leads are not.

---

## SECTION 6 — Cost benchmarks to cite in content (2025/2026 AUD)

All figures below are as published on the linked page. Where GST treatment was stated it is noted; where it was not, it is unstated.

### 6a. Full custom kitchen renovation

| Tier | Range | Market | Source |
|---|---|---|---|
| Budget / cosmetic | **$15,000–$30,000** | AU | [Three Birds Renovations 2026](https://www.threebirdsrenovations.com/blog/how-much-does-a-kitchen-renovation-cost-2026) |
| Mid-range | **$35,000–$65,000** | AU | [Three Birds 2026](https://www.threebirdsrenovations.com/blog/how-much-does-a-kitchen-renovation-cost-2026) |
| High-end / luxury | **$65,000–$130,000+** | AU | [Three Birds 2026](https://www.threebirdsrenovations.com/blog/how-much-does-a-kitchen-renovation-cost-2026) |
| Cosmetic refresh | $8,000–$20,000 | AU | [Hacker Australia](https://hackeraustralia.com.au/kitchen-renovation-costs-explained/) |
| Mid-range | $25,000–$45,000 | AU | [Hacker Australia](https://hackeraustralia.com.au/kitchen-renovation-costs-explained/) |
| Luxury / fully custom | $45,000–$100,000+ | AU | [Hacker Australia](https://hackeraustralia.com.au/kitchen-renovation-costs-explained/) |
| **Average AU kitchen renovation 2026, incl. installation** | **~$42,630** | AU | [Hacker Australia](https://hackeraustralia.com.au/kitchen-renovation-costs-explained/) |
| Per m² — budget / mid / luxury | ~$1,500–$2,000 / ~$2,500–$3,500 / $4,000+ per m² | AU | [Hacker Australia](https://hackeraustralia.com.au/kitchen-renovation-costs-explained/) |
| **Sydney budget refresh** | **$15,000–$25,000 incl. GST** | Sydney | [LeadKit Sydney 2026](https://www.leadkit.com.au/blog/kitchen-renovation-cost-sydney-2026) |
| **Sydney mid-range full renovation** | **$30,000–$55,000 incl. GST** (itemised $28,000–$57,000) | Sydney | [LeadKit Sydney 2026](https://www.leadkit.com.au/blog/kitchen-renovation-cost-sydney-2026) |
| **Sydney luxury / custom** | **$70,000–$120,000+ incl. GST** | Sydney | [LeadKit Sydney 2026](https://www.leadkit.com.au/blog/kitchen-renovation-cost-sydney-2026) |
| National range (market report) | $8,179–$20,443, midpoint $14,311; scope spread $5,000 flat-pack → $80,000+ custom | AU | [What's The Damage 2026 report](https://whatsthedamage.com.au/report/australian-renovation-market-2026/) |

**Cabinetry cost per linear metre — the most useful number for joinery content** ([LeadKit Sydney 2026](https://www.leadkit.com.au/blog/kitchen-renovation-cost-sydney-2026)). Cabinetry is **35–45% of total kitchen renovation cost**; a standard Sydney kitchen has **6–8 linear metres** of cabinetry (uppers + lowers).

| Cabinetry type | Supply + install per lm | Best for |
|---|---:|---|
| Laminate / melamine doors | **$800–$1,400/lm** | Budget renovations, rentals |
| Thermolaminated (vinyl wrap) | **$1,100–$1,800/lm** | Mid-range |
| Polyurethane | **$1,400–$2,200/lm** | Mid to high-end |
| **2-pac (spray-painted)** | **$1,800–$3,000/lm** | Luxury, flawless colour match |
| Timber veneer / solid timber | **$2,200–$4,000+/lm** | High-end |

A mid-range poly kitchen at 6–8 lm = **$8,400–$17,600 for cabinets alone**; the worked example is ~7 lm of poly at **$10,000–$15,000** supplied and installed. **2-pac costs 20–40% more than polyurethane**; poly is roller-applied and can show slight orange-peel up close, 2-pac is booth-sprayed for a glass-smooth finish with unlimited colour matching but is slightly more prone to chipping ([LeadKit](https://www.leadkit.com.au/blog/kitchen-renovation-cost-sydney-2026)).

### 6b. Butler's pantry

| Item | Cost | Source |
|---|---|---|
| Basic fit-out | **at least $1,400** (excludes moving walls, plumbing, wiring, flooring and labour) | [Canstar](https://www.canstar.com.au/home-loans/butlers-pantry-cost-design/), citing Home Builder's Handbook |
| Higher end | **can easily exceed $15,000** | [Canstar](https://www.canstar.com.au/home-loans/butlers-pantry-cost-design/) |
| Rule of thumb | **30%–50% of the cost of the main kitchen** (Graeme Metcalf, Dan Kitchens) | [Canstar](https://www.canstar.com.au/home-loans/butlers-pantry-cost-design/) |
| **NSW 2026 — basic walk-in pantry conversion** | **~$8,000** | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| **NSW 2026 — fully appointed** | **up to $35,000 or more** | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| Open shelving | $100–$300/lm | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| Flat-pack cabinetry incl. install | $400–$800/lm | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| **Custom cabinetry** | **$1,200–$2,500/lm** | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| Laminate benchtop | $300–$500/lm | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| Timber butcher block benchtop | $400–$800/lm | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| Plumbing from existing kitchen services | $800–$1,500 | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| Wine fridge | $800–$3,000 (integration options $500–$3,000) | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |
| Stud wall framing | $80–$150/m² | [The Quote Yard](https://www.thequoteyard.com.au/services/butler-pantry-cost-2026-nsw) |

### 6c. Built-in wardrobe and walk-in robe — NSW 2026

Best-in-class published NSW table ([The Quote Yard NSW](https://www.thequoteyard.com.au/services/built-in-wardrobe-cost-2026-nsw)):

| Wardrobe type | Total | Per lm | Materials | Install time |
|---|---:|---:|---|---|
| Basic reach-in, single bedroom | $1,500–$2,500 | $1,000–$1,500 | White melamine, basic hardware | 1–2 days |
| Standard double | $2,500–$4,000 | $1,000–$1,500 | Melamine, standard sliders | 1–2 days |
| Mid-range master | $3,500–$7,000 | $1,500–$2,200 | Textured melamine, soft-close, mirror doors | 2–3 days |
| **Premium custom** | **$7,000–$15,000+** | **$2,500–$3,500** | Timber veneer, polyurethane, **Blum/Hettich** | 3–5 days |
| Basic walk-in fitout | $5,000–$10,000 | $1,200–$1,800 | Melamine, open shelving, rails | 3–4 days |
| **Premium walk-in dressing room** | **$18,000–$40,000+** | **$2,500–$4,000+** | Island unit, display cases, LED | 5–10 days |

Cross-checks: general custom built-in wardrobes **$2,000–$12,000+**; compact two-bay $2,000–$4,000, mid-size three-to-four-bay with drawers/shelving $4,000–$6,000, large full-wall or walk-in $6,000–$12,000+ (Perth-based real installed examples, incl. a 1,375mm two-bay at **$3,265**) ([Wardrobe Man](https://wardrobeman.com.au/built-in-wardrobe-cost-guide-with-real-examples/)). National aggregator figures are much lower: **$1,000–$5,000** ([hipages](https://hipages.com.au/article/how_much_does_a_wardrobe_cost)); built-in wardrobe supply and install **$1,500–$4,000**, basic alcove MDF $1,500–$2,200, standard double-door painted MDF $2,000–$3,000+ ([LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026)); supply-and-install low $800 / typical $1,800 / high $3,500, or $1,500–$5,000 for "built-in wardrobe" ([What's The Damage](https://whatsthedamage.com.au/carpenter-cost/)).

> **Content angle:** the gap between aggregator figures ($1,000–$5,000) and real NSW custom figures ($7,000–$15,000+ premium) is the single most persuasive expectation-setting story available. A post titled "Why hipages says $1,000 and your quote says $9,000" writes itself and directly pre-qualifies leads.

### 6d. Bathroom vanity

| Item | Cost | Source |
|---|---|---|
| Wall-hung (floating) | ~$2,000–$6,000 installed (install adds $200–$500 labour) | [Sparky](https://www.sparky.fyi/costs/bathroom-vanity) |
| Freestanding | ~$1,500–$4,500 installed | [Sparky](https://www.sparky.fyi/costs/bathroom-vanity) |
| **Custom-built to fit** | **~$2,500–$8,000+ installed; lead time 4–8 weeks from design sign-off** | [Sparky](https://www.sparky.fyi/costs/bathroom-vanity) |
| 600mm compact | ~$1,500–$2,500 installed | [Sparky](https://www.sparky.fyi/costs/bathroom-vanity) |
| 900mm standard | ~$2,000–$4,000 installed | [Sparky](https://www.sparky.fyi/costs/bathroom-vanity) |
| 1200mm+ double basin | ~$3,500–$6,000 installed | [Sparky](https://www.sparky.fyi/costs/bathroom-vanity) |
| 1500mm+ premium | ~$5,000–$8,000+ installed | [Sparky](https://www.sparky.fyi/costs/bathroom-vanity) |
| **NSW: flat-pack wall-hung single** | supply $300–$800 · installed $800–$1,800 | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/bathroom-vanity-cost-2026-nsw) |
| **NSW: pre-assembled wall-hung single** | supply $700–$2,000 · installed $1,200–$2,800 | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/bathroom-vanity-cost-2026-nsw) |
| **NSW: freestanding single** | supply $500–$2,500 · installed $1,000–$3,500 | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/bathroom-vanity-cost-2026-nsw) |
| **NSW: wall-hung double** | supply $1,500–$4,500 · installed $2,500–$6,500 | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/bathroom-vanity-cost-2026-nsw) |
| **NSW: custom vanity with stone benchtop** | supply **$3,000–$10,000+** · installed **$4,500–$12,000+** | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/bathroom-vanity-cost-2026-nsw) |
| **NSW: timber floating vanity** | supply $1,200–$4,000 · installed $1,800–$5,000 | [The Quote Yard NSW](https://www.thequoteyard.com.au/services/bathroom-vanity-cost-2026-nsw) |

### 6e. Laundry renovation and laundry cabinets

| Tier | Cost | Cabinetry | Source |
|---|---|---|---|
| Partial / cosmetic refresh | **$3,000–$7,000** | Basic flat-pack | [Reno Page 2025-2026](https://www.renopage.com.au/resources/laundry-renovation-costs-in-australia-2025-2026) |
| Standard / full renovation | **$7,000–$15,000** | Semi-custom / custom | [Reno Page](https://www.renopage.com.au/resources/laundry-renovation-costs-in-australia-2025-2026) |
| High-end / premium | **$15,000–$25,000+** | Full custom | [Reno Page](https://www.renopage.com.au/resources/laundry-renovation-costs-in-australia-2025-2026) |
| **Cabinetry & storage line item** | **$1,500–$10,000** | — | [Reno Page](https://www.renopage.com.au/resources/laundry-renovation-costs-in-australia-2025-2026) |
| Benchtops / plumbing / electrical / tiling / sink & tapware / painting / appliances | $600–$3,500+ / $500–$2,500+ / $300–$2,000+ / $800–$4,000+ / $250–$1,500+ / $250–$1,000 / $700–$4,000+ | — | [Reno Page](https://www.renopage.com.au/resources/laundry-renovation-costs-in-australia-2025-2026) |
| Real-world basic update | ~$5,000 | Flat-pack, laminate top | [Reno Page](https://www.renopage.com.au/resources/laundry-renovation-costs-in-australia-2025-2026) |
| Real-world standard | $10,000–$14,000 | Custom cabinetry + stone benchtop + integrated washer/dryer space | [Reno Page](https://www.renopage.com.au/resources/laundry-renovation-costs-in-australia-2025-2026) |
| Aggregator range | $5,000–$25,000 (plumber $100–$150/hr) | — | [hipages](https://hipages.com.au/article/how_much_does_it_cost_to_renovate_a_laundry_room) |

### 6f. Home office built-ins

| Item | Cost | Source |
|---|---|---|
| **Home office built-ins** | **$4,000–$12,000** | [Sparky — custom joinery](https://www.sparky.fyi/costs/custom-joinery) |
| Desk with overhead shelving + filing drawers | from ~$4,000 | [Sparky](https://www.sparky.fyi/costs/custom-joinery) |
| Full fit-out: L-shaped desk + floor-to-ceiling bookshelves + built-in printer cabinet | **$8,000–$12,000** | [Sparky](https://www.sparky.fyi/costs/custom-joinery) |
| **Custom joinery, Sydney baseline per job** | **$5,000–$25,000** | [Sparky](https://www.sparky.fyi/costs/custom-joinery) |
| Regional discount to Sydney | Brisbane 5–10% below Sydney; Perth/Adelaide labour 5–15% lower | [Sparky](https://www.sparky.fyi/costs/custom-joinery) |
| Straightforward 2.4m painted MDF bookshelf with adjustable shelves | toward $5,000 | [Sparky](https://www.sparky.fyi/costs/custom-joinery) |
| Home offices generally | $1,000 to over $140,000 | [Refresh Renovations](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget) |
| Converting existing habitable space | $700 to $5,000+ | [Refresh](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget) |
| Converting an underutilised part of the home | $700 to $5,500+ | [Refresh](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget) |
| Garage conversion / new space from scratch | $25,000–$140,000 | [Refresh](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget) |
| Adding an extra room | $15,000 to $50,000+ | [Refresh](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget) |
| **Personalised mid-range home office incl. custom storage cabinets** | **$7,500–$30,000** | [Refresh](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget) |
| High-end incl. custom cabinetry, executive desk, HVAC, bar/secretary | $30,000 to $100,000+ | [Refresh](https://www.refreshrenovations.com.au/articles/complete-price-guide-to-creating-a-home-office-on-any-budget) |

### 6g. Office fitout per m²

| Benchmark | Cost | Source |
|---|---|---|
| **Australia average, moderate-style medium-quality fit-out, Q1 2026** | **AU$3,011/m²** | [JLL ANZ Fit-Out Cost Guide 2026](https://www.jll.com/en-au/insights/cost-fit-out-guide) |
| APAC average / global average, Q1 2026 | AU$2,197/m² / AU$3,031/m² | [JLL](https://www.jll.com/en-au/insights/cost-fit-out-guide) |
| Auckland NZ | AU$2,694/m² (NZ$3,216/m²) | [JLL](https://www.jll.com/en-au/insights/cost-fit-out-guide) |
| YoY growth | **+3.5% to +6%** depending on state — driven by skilled-labour shortages, high material costs, premium subcontractor rates, and infrastructure absorbing labour (**data centres in NSW**, Olympics projects in QLD, hospitals/rail in WA) | [JLL](https://www.jll.com/en-au/insights/cost-fit-out-guide) |
| Basic fitout | $1,000–$1,500/m² — open-plan, standard finishes, limited customisation | [Workspace360](https://workspace360.com.au/fitout-cost-guide/) |
| Mid-range fitout | $1,500–$3,000/m² — open-plan + private spaces, upgraded finishes, moderate custom elements | [Workspace360](https://workspace360.com.au/fitout-cost-guide/) |
| **High-end fitout** | **$3,000+/m² — premium materials, bespoke joinery, integrated technology** | [Workspace360](https://workspace360.com.au/fitout-cost-guide/) |

*Sydney-specific office fitout rate is **n.a.** — JLL states its report benchmarks five cities but the Sydney figure was not in the fetched content; Cushman & Wakefield's guide was robots-blocked.*

### 6h. Retail shopfitting per m²

| Tier | Cost | Source |
|---|---|---|
| National average shopfitting rate | **$500–$2,000/m²** | [TradeRefer 2026](https://traderefer.au/trades/retail-shop-fit-out) |
| Budget retail | $400–$800/m² | [TradeRefer](https://traderefer.au/trades/retail-shop-fit-out) |
| Mid-range retail | $800–$1,500/m² | [TradeRefer](https://traderefer.au/trades/retail-shop-fit-out) |
| High-end flagship stores and restaurants | **$1,500–$4,000+/m²** | [TradeRefer](https://traderefer.au/trades/retail-shop-fit-out) |
| Emergency / after-hours | ~$3,000/m² estimated peak | [TradeRefer](https://traderefer.au/trades/retail-shop-fit-out) |
| **100m² café fit-out (commercial kitchen + seating + fitout)** | **$120,000–$350,000** | [TradeRefer](https://traderefer.au/trades/retail-shop-fit-out) |
| Regional variation | **10–20% higher in capital cities** including Sydney; lower in regional areas | [TradeRefer](https://traderefer.au/trades/retail-shop-fit-out) |
| Basic / standard fitout | $400–$800+/m² — carpet tiles or vinyl, grid ceilings, track lighting, paint, flat-pack fixtures. Small retail, pop-ups, simple office refreshes | [Focus Shopfit 2026](https://focusshopfit.com.au/the-quintessential-2026-price-guide-for-shop-fitout-in-australia/) |
| **Mid-range / custom fitout** | **$800–$1,500+/m² — custom joinery for the POS counter, engineered timber flooring, specialised lighting, minor structural mods.** Described as the most common category for established retail, cafés and modern offices | [Focus Shopfit 2026](https://focusshopfit.com.au/the-quintessential-2026-price-guide-for-shop-fitout-in-australia/) |

### 6i. Timber staircase

NSW-specific ([The Quote Yard NSW](https://www.thequoteyard.com.au/services/timber-staircase-cost-2026-nsw)):

| Type | Cost |
|---|---:|
| Professionally built internal timber staircase | **$3,500–$12,000** |
| Basic straight, pine, incl. standard balustrade + handrail | $3,500–$6,000 (materials alone ~$1,500–$2,500) |
| Basic straight, hardwood, incl. balustrade + handrail | $5,500–$9,000 |
| Quarter-turn | $6,000–$12,000 |
| **Timber spiral** | **$8,000–$20,000+** |
| External, simple deck access | from $2,500 |
| External, elaborate entry / long flight | $8,000+ |

Typical residential straight flights have **13–15 risers** and run **3.5–4.5m horizontally** ([The Quote Yard](https://www.thequoteyard.com.au/services/timber-staircase-cost-2026-nsw)).

Construction-stair-only estimates, balustrading excluded ([Staircase Constructions](https://staircaseconstructions.com.au/budget-estimates/)):

| Shape | MDF | Glacial Oak | Exotic Timber | Steel stringers w/ Glacial Oak |
|---|---|---|---|---|
| Straight | Under $2k | Under $5k | $5–$10k | $5–$10k |
| L-shape | Under $2k | $5–$10k | $5–$10k | $5–$10k |
| U-shape | Under $3k | $5–$10k | $10–$15k | $10–$15k |
| T-shape | Under $3k | $5–$10k | $10–$15k | $10–$15k |
| **Curved** | **$10–15k** | **$20k+** | **$25k+** | **$25k+** |

### 6j. Reception desk

| Item | Cost | Source |
|---|---|---|
| **Straight reception desk, made to order, six standard sizes, 18mm + 25mm board, Australian made** | **From $1,198 + GST** · lead time **4–6 weeks** | [Spoke Joinery & Cabinetry](https://www.spokejoineryandcabinetry.com.au/straight-receptions) |
| **Return reception desk, three standard sizes** | **From $2,054 + GST** · lead time **4–6 weeks** | [Spoke Joinery & Cabinetry](https://www.spokejoineryandcabinetry.com.au/return-receptions) |

*This is the only Australian trade-priced reception-desk joinery data located. The rest of the SERP is office-furniture retail (adco.com.au, bfx.com.au, cavan.com.au, premierofficefurniture.com.au, officestock.com.au, abaxkf.com.au) with no published custom-joinery pricing — **a total content gap**.*

### 6k. Kitchen island

NSW 2026 ([The Quote Yard NSW](https://www.thequoteyard.com.au/services/kitchen-island-cost-2026-nsw)):

| Configuration | Cost |
|---|---:|
| Simple freestanding / basic prep island | from ~$3,000 |
| Basic freestanding from furniture retailers | $500–$2,000 |
| Quality freestanding from kitchen specialists | $2,000–$5,000 |
| **Custom-made freestanding from cabinet makers** | **$3,000–$8,000** |
| **Standard built-in island construction** | **$4,000–$15,000** |
| Feature panels | +$500–$2,500 |
| Curved island elements | +$2,000–$5,000 |
| Two-tier / raised seating section | +$1,500–$4,000 |
| **Fully appointed with cooktop, sink and waterfall benchtop** | **can exceed $25,000** |

Sizing guidance: small 1.2m (basic prep), medium 1.8–2.4m (seating + storage), large >2.4m; minimum practical footprint **1,200mm × 600mm** ([The Quote Yard](https://www.thequoteyard.com.au/services/kitchen-island-cost-2026-nsw)). Benchtop material inputs on the same page: laminate $300–$500/lm; engineered stone $800–$1,500/m²; natural stone and porcelain slabs $1,200–$2,500/m².

Tiered national view ([RJG Group 2026](https://www.rjggroup.com.au/kitchen-island-cost-australia-2026/)): flat-pack/budget **$1,000–$4,000**; semi-custom **$5,000–$12,000**; **full custom $12,000–$25,000+**. The benchtop is named the single biggest price driver — laminate from ~$500/slab, engineered stone from ~$2,500/slab, natural stone or porcelain $5,000+/slab.

### 6l. Timber species prices

**Trend Timbers dressed price list — prices correct as of August 2026, all ex GST, per lineal metre** ([Trend Timbers](https://trendtimbers.com.au/dressed-timber-price-list/)):

| Species | Size (mm) | Price/lm | Notes |
|---|---|---:|---|
| **Tasmanian Oak** | 19×140 | **$30.25** | |
| Tasmanian Oak | 19×170 | $38.50 | |
| Tasmanian Oak | 42×135 | $71.50 | |
| **American Oak** | 19×140 | **$30.55** | |
| American Oak | 19×170 | $33.55 | |
| American Oak | 32×185 | $66.00 | |
| American Oak | 42×190 | $102.30 | |
| American Oak | 65×65 | $88.55 | |
| **NSW Spotted Gum** | 19×185 | **$44.00** | |
| NSW Spotted Gum | 32×185 | $82.50 | |
| NSW Spotted Gum | 42×140 | $81.95 | |
| NSW Spotted Gum | 65×65 | $75.35 | max length 750mm |
| NSW Spotted Gum | 85×85 | $122.10 | max length 750mm |
| **NSW Blackbutt** | 19×185 | **$39.50** | Feature Grade |
| NSW Blackbutt | 32×185 | $80.30 | Feature Grade |
| NSW Blackbutt | 42×185 | $97.35 | Feature Grade |
| NSW Blackbutt | 42×285 | $152.35 | Feature Grade |
| NSW Blackbutt | 65×65 | $75.35 | Feature Grade, max 750mm |
| NSW Blackbutt | 85×85 | $122.10 | Feature Grade |
| Tasmanian Blackwood | 19×165 | $59.40 | |
| Tasmanian Blackwood | 32×190 | $108.90 | |
| Tasmanian Blackwood | 42×190 | $133.65 | |
| Tasmanian Blackwood | 90×90 | $195.25 | |
| Jarrah | 19×135 / 42×135 / 42×185 | $34.90 / $68.00 / $130.90 | |
| New Guinea Rosewood | 19×135 / 42×135 / 65×65 | $33.00 / $69.85 / $90.75 | |
| Sydney Blue Gum | 32×185 | $88.55 | |
| African Bosse | 19×140 | $28.05 | |

Cross-checks: Queensland Spotted Gum 200×25mm standard grade kiln-dried rough-sawn joinery timber **$31.59/lm** ([Hammerroo](https://hammerroo.com.au/products/queensland-spotted-gum-200-x-25mm-standard-grade-kiln-dried-rough-sawn-joinery-timber)). A JBM Timber Spotted Gum F27 DAR page was robots-blocked, so that quote is **n.a.**

> **Content angle:** these are the only per-lineal-metre AU joinery-timber prices found in the entire study, and the SERP for every species term is timber suppliers selling *decking and flooring*, not joinery stock. A "what Blackbutt vs Spotted Gum vs Tas Oak vs American Oak actually costs to build a kitchen from" post has no incumbent.

### 6m. Blum hardware

| Item | Price | Source |
|---|---|---|
| **Blum LEGRABOX drawer kit** | **from $233.00 inc. GST** | [eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/drawer-kits/blum-legrabox) |
| Blum Inserta soft-close hinge, full overlay 110° | from **$14.00 inc. GST** | [eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/hinges) |
| Blum screw-on soft-close hinge, full overlay 110° | from $14.00 inc. GST | [eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/hinges) |
| Blum Inserta soft-close hinge, half overlay 110° | from $16.00 inc. GST | [eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/hinges) |
| Blum Inserta soft-close hinge, half overlay 45° | from $22.00 inc. GST | [eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/hinges) |
| Blum Inserta soft-close hinge, full overlay 110° — Onyx | from $19.00 inc. GST | [eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/hinges) |
| Blum Inserta soft-close hinge, full overlay 155° | from $37.00 inc. GST (Onyx from $30.00) | [eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/hinges) |

*Lincoln Sentry's Blum range page lists products but publishes no prices, so TANDEMBOX antaro trade-pack pricing is **n.a.** ([Lincoln Sentry](https://www.lincolnsentry.com.au/page/blum-range)). Bunnings' Blum hinge page is robots-blocked.*

### 6n. Stone and sintered benchtops

**Installed cost per linear metre** ([Konnect Kitchens](https://konnectkitchens.com.au/stone-benchtop-cost-gold-coast/) — Gold Coast basis; supply, templating and installation included; average kitchen 5–7 lm):

| Material | Per lm installed | Average kitchen total |
|---|---:|---:|
| Laminate (stone-look) | $200–$450 | $1,000–$3,150 |
| Engineered stone (entry / mid / premium) | $450–$650 / $650–$900 / $900–$1,200 | $2,250–$4,550 / $3,250–$6,300 / $4,500–$8,400 |
| **Dekton / Neolith** | **$900–$1,400** | **$4,500–$9,800** |
| Granite | $700–$1,100 | $3,500–$7,700 |
| Marble | $900–$1,500 | $4,500–$10,500 |
| Quartzite | $1,000–$1,600 | $5,000–$11,200 |

**Per square metre**, various sources:

| Material | Per m² | Basis | Source |
|---|---:|---|---|
| **Dekton** | **$1,000–$1,800+ installed** (premium porcelain up to $2,000) | Perth context | [Mastertops](https://www.mastertops.com.au/dekton-vs-porcelain-benchtops-which-one-to-choose-for-your-kitchen) |
| Porcelain | $700–$1,500+ installed | Perth context | [Mastertops](https://www.mastertops.com.au/dekton-vs-porcelain-benchtops-which-one-to-choose-for-your-kitchen) |
| **Neolith sintered stone** | **$300–$700 incl. installation** | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Marble | $800–$3,000 incl. installation | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Granite | ~$700–$1,700 incl. installation | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Engineered / reconstituted stone (e.g. Trend Stone) | $650–$1,350 incl. basic fabrication + installation | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Porcelain | $400–$1,050 for very basic fabrication + installation (fabrication much higher — specialised material) | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Timber | $550–$950 | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Polished concrete | ~$1,000–$1,750 | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Laminate | $120–$440 **per lineal metre** ($120/lm for 600mm standard finish; $440/lm for 1000–1200mm premium) | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Stainless steel | ~$1,200–$3,600 **per lineal metre** incl. manufacture, supply and installation | AU | [Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/) |
| Stone benchtops overall | $700–$2,500 incl. manufacturing, polishing, sealing and installation | AU | [Yellow Pages](https://www.yellowpages.com.au/articles/kitchens/how-much-does-a-stone-benchtop-cost/) |
| Granite / marble / engineered / porcelain / timber (YP) | $700–$1,900 / $900–$2,500 / $650–$1,350 (bare $400–$730 + install) / $700–$1,050 / $550–$1,200 | AU | [Yellow Pages](https://www.yellowpages.com.au/articles/kitchens/how-much-does-a-stone-benchtop-cost/) |
| IKEA quartz or ceramic | $679–$1,079 | AU | [Yellow Pages](https://www.yellowpages.com.au/articles/kitchens/how-much-does-a-stone-benchtop-cost/) |

Add-ons for natural stone: sink cut-out usually **$250**; drainage grooves ~**$350**; undermount sinks and unique fittings attract extra because edges must be carefully finished ([Home Beautiful](https://www.homebeautiful.com.au/kitchen-ideas/benchtops-bars/kitchen-benchtop-material-we-compare-7-popular-surfaces/)).

*AUSKstone's Dekton and Neolith category pages returned no prices or slab dimensions, and the Neolith page errored — those slab-level figures are **n.a.** ([AUSKstone Dekton](https://www.auskstone.com.au/product-category/20mm-sintered-stone/dekton/)). **Smartstone** and **Caesarstone porcelain** per-m² prices are **n.a.** — smartstone.com.au returned a client error and the Smartstone SERP is polluted with South African paving sites; no fetched page stated an AU Smartstone or Caesarstone porcelain rate.*

### 6o. Labour rates

**Award / wage floor** — Joinery and Building Trades Award MA000029 ([FairWork Mate](https://fairworkmate.com.au/awards/joinery-award); rates change annually on 1 July following the Annual Wage Review):

| Classification | Base hourly | Casual (+25%) |
|---|---:|---:|
| Joinery Level 1 | $25.74 | $32.18 |
| Joinery Level 2 | $26.44 | $33.05 |
| Joinery Level 3 | $27.08 | $33.85 |
| Joinery Level 4 | $27.97 | $34.96 |

Fair Work Commission C10 trade rate base wage is put at approximately **$27–$30/hr** ([LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026)).

**Charge-out rates to clients:**

| Rate | Value | Source |
|---|---|---|
| **Sydney carpentry hourly** | **low $63 · typical $98 · high $150/hr** (prices include GST, Sydney metro, verified **August 2026**, cross-referenced against 90+ AU trade pricing sources) | [What's The Damage — Sydney](https://whatsthedamage.com.au/carpenter-cost-sydney/) |
| **Sydney full-day carpentry** | **$460 / $715 / $1,025 per day** | [What's The Damage — Sydney](https://whatsthedamage.com.au/carpenter-cost-sydney/) |
| National carpentry hourly | low $55 · typical $85 · high $130/hr; full day $400 / $620 / $900 | [What's The Damage — national](https://whatsthedamage.com.au/carpenter-cost/) |
| **National carpenter hourly (2026)** | **$75–$110/hr** | [LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026) |
| **Sydney** | **$90–$115/hr** | [LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026) |
| Melbourne / Brisbane / Perth / Adelaide | $85–$110 / $80–$105 / $80–$105 / $75–$100/hr | [LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026) |
| **Custom joinery and heritage specialists** | **above $120/hr** | [LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026) |
| Structural framing, labour only | $85–$120/hr or project quoted | [LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026) |
| Handyman / call-out minimum | $60–$90/hr / $80–$150 | [LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026) |
| Kitchen cabinet makers | **$50–$75/hr**; $100–$600+ per cabinet supplied and installed; from $2,600 to install/replace all kitchen cabinets; whole-job range $2,800–$15,200 (national averages) | [hipages](https://hipages.com.au/article/how_much_do_kitchen_cabinet_makers_cost) |
| Custom cabinetry and joinery (Sydney) | $23–$63 — **unit not specified on the page**; treat as unusable | [What's The Damage — Sydney](https://whatsthedamage.com.au/carpenter-cost-sydney/) |

**Newcastle-specific joiner or cabinetmaker charge-out rates: n.a.** No fetched page published a Newcastle rate. The best available proxy is the Sydney figure ($90–$115/hr, [LeadKit](https://www.leadkit.com.au/blog/carpentry-cost-australia-2026)) discounted by the same order as the published regional discounts (Brisbane 5–10% below Sydney, Perth/Adelaide 5–15% lower, [Sparky](https://www.sparky.fyi/costs/custom-joinery)) — but that is an inference, not a sourced figure, and should be labelled as such if published.

> **Content angle:** the *cabinet maker hourly rate* and *joiner hourly rate NSW* SERPs are Payscale, Indeed, Reddit and CFMEU wage sheets. Nobody explains why a $26/hr award wage becomes a $98/hr charge-out rate. A transparent "where your money actually goes" breakdown is a trust-building, differentiated post that no competitor has.

---

## SECTION 7 — Content gap analysis: top 30 opportunities ranked

Ranking logic: (weakness of the incumbent SERP) × (commercial intent) × (SteepWood's existing authority and ability to author from the workshop floor). Every "why winnable" statement traces to the SERP composition captured in `s1_serp.jsonl` or to a gap identified in Sections 5 and 6.

| # | Content opportunity | Target query family | Why winnable |
|---|---|---|---|
| 1 | **Engineered stone ban: what NSW joiners install instead in 2026 — porcelain, sintered stone, timber, steel — with prices** | engineered stone ban replacement benchtops | Page one is **100% government and media** (Safe Work Australia ×4, SafeWork SA, ABF, DEWR, ABC, The Conversation). No practitioner has published what actually gets installed now. SteepWood can cite the exact regulation dates and the NSW clarification that **sintered stone and porcelain are excluded** ([SafeWork NSW](https://www.safework.nsw.gov.au/legal-obligations/legislation/accordians/work-health-and-safety-amendment-engineered-stone-regulation-2024)) plus real per-lm installed pricing |
| 2 | **Custom reception desk cost Australia: what a joinery-built reception counter costs vs off-the-shelf** | reception desk cost Australia | Page one is **entirely office-furniture retailers**. The only trade-priced joinery data in existence is Spoke's **from $1,198 + GST, 4–6 week lead** ([Spoke](https://www.spokejoineryandcabinetry.com.au/straight-receptions)). Zero joinery competition on a high-value commercial query |
| 3 | **Laundry joinery cost NSW: custom laundry cabinets, per linear metre** | laundry cabinets cost Australia · laundry renovation cost NSW | Australia is **#1 in the world for laundry-renovation search intensity** ([Compare the Market](https://www.comparethemarket.com.au/home-loans/features/which-countries-love-renovation-the-most/)) yet the *laundry cabinets* SERP is Bunnings and bathware retailers, and the *laundry renovation cost* SERP has Perth, Melbourne and Canberra pages but no NSW joiner. Highest volume-to-competition ratio found |
| 4 | **Blum hardware, priced in Australian dollars: what LEGRABOX, TANDEMBOX and soft-close hinges actually add to your kitchen** | Blum hardware worth it · soft close drawers worth it | Both SERPs are **US cabinet shops, Reddit, Houzz US and AI-content sites**, with only youscrewit.com.au and mb9.com.au representing Australia. SteepWood can publish real AU trade pricing — LEGRABOX from **$233 inc GST**, soft-close hinges from **$14 inc GST** ([eKitchens](https://www.ekitchens.com.au/products/hardware-accessories/hinges)) — which no US page can match |
| 5 | **Smartstone and Caesarstone porcelain benchtop prices in Australia (2026)** | Smartstone price per square metre · Caesarstone porcelain price Australia | The Smartstone SERP is **broken** — a South African paving site ranks #1 and smartstone.co.za ranks #6. A correct, current Australian page would win almost immediately |
| 6 | **Cabinetmaker hourly rate vs charge-out rate: where your money goes in a NSW joinery quote** | cabinet maker hourly rate Australia · joiner hourly rate NSW | Page one is Payscale, Indeed, Reddit and CFMEU wage sheets. Nobody bridges the **$25.74–$27.97/hr award base** ([FairWork Mate](https://fairworkmate.com.au/awards/joinery-award)) and the **$63–$150/hr Sydney charge-out** ([What's The Damage](https://whatsthedamage.com.au/carpenter-cost-sydney/)). Radical transparency is both differentiated and trust-building |
| 7 | **Joinery timber species guide: Blackbutt vs Spotted Gum vs Tasmanian Oak vs American Oak, with per-lineal-metre prices** | spotted gum timber price per metre · blackbutt timber price · Tasmanian oak price · American oak timber price | All four SERPs are **timber suppliers selling decking and flooring**; Gumtree ranks twice for American oak. Nobody frames species selection for *cabinetry and joinery*. Real prices available from [Trend Timbers, August 2026](https://trendtimbers.com.au/dressed-timber-price-list/) |
| 8 | **Butler's pantry cost NSW: what $8,000 buys vs $35,000** | butlers pantry cost Australia | Page one is Canstar, Airtasker, and **interstate** cabinetmakers (Adelaide, Melbourne, QLD). No NSW joiner ranks despite thequoteyard publishing a NSW page at #9 — proving Google wants NSW content here |
| 9 | **Kitchen renovation timeline Newcastle / NSW: week-by-week, with real lead times** | kitchen renovation timeline Australia | Page one is renovators and retailers with **zero NSW or Newcastle specificity** (mostly Victorian). Combine with the documented **spring booking crunch** ([ServiceSeeking](https://www.serviceseeking.com.au/industry-insights/is-spring-a-good-time-to-renovate-7-reasons)) and real workshop lead times (custom vanities run **4–8 weeks from design sign-off**, [Sparky](https://www.sparky.fyi/costs/bathroom-vanity)) |
| 10 | **Kitchen island cost NSW: freestanding vs built-in vs waterfall, priced** | kitchen island cost Australia | SERP is aggregators (rjggroup ×2, thequoteyard ×2, kitchenquote, auspoints) plus **dicksmith.com.au** and a furniture retailer. insideoutjoinery.au proves a Sydney joiner can rank. Full NSW cost table already sourced |
| 11 | **Cabinetry per linear metre: laminate vs thermolaminated vs poly vs 2-pac vs veneer, and what each costs in NSW** | kitchen cabinet cost per linear metre · poly vs 2 pac kitchen | The definitive per-lm table exists only on a lead-gen blog ([LeadKit](https://www.leadkit.com.au/blog/kitchen-renovation-cost-sydney-2026)). A joiner explaining **why 2-pac costs 20–40% more than poly**, from the spray booth, outranks a lead-gen page on experience signals |
| 12 | **Newcastle NSW vs Newcastle UK: joinery in the Hunter** — or more practically, a heavily geo-disambiguated Newcastle hub page | joinery Newcastle · custom joinery Newcastle | **Five of ten results for *custom joinery Newcastle* are UK or US businesses.** Explicit "Newcastle **NSW** 2300 / Hunter / Lake Macquarie / Maitland" entity signals, ABN, licence 489553C and NSW-specific schema fix a structural SERP defect |
| 13 | **Walk-in robe vs built-in wardrobe: cost, space and resale — NSW 2026** | walk in robe cost Australia · built in wardrobe cost Australia | SteepWood already ranks **#1 and #4** for walk-in robe and **#7** for built-in wardrobe. Reddit is on page one of both — unmet need. Push to #1–3 with the NSW per-lm table ($1,000–$1,500 basic → **$2,500–$4,000+ premium walk-in**, [The Quote Yard](https://www.thequoteyard.com.au/services/built-in-wardrobe-cost-2026-nsw)) |
| 14 | **"hipages says $1,000, your quote says $9,000" — why aggregator wardrobe and kitchen prices are wrong** | built in wardrobe cost Australia · how much should a wardrobe cost | Directly attacks the incumbents on page one. hipages publishes **$1,000–$5,000** ([hipages](https://hipages.com.au/article/how_much_does_a_wardrobe_cost)) against real NSW premium custom at **$7,000–$15,000+**. Pre-qualifies leads and earns links |
| 15 | **Office fitout: what the joinery actually costs as a share of $/m²** | office fitout cost per square metre Australia | Page one is JLL, Cushman & Wakefield and fitout firms quoting whole-project rates (**AU$3,011/m² AU average**, [JLL](https://www.jll.com/en-au/insights/cost-fit-out-guide)). Nobody isolates the joinery line. High-value B2B intent, and SteepWood already ranks for /office-fitout/ |
| 16 | **Shopfitting cost by format: café vs boutique retail vs medical vs office, per m²** | shopfitting cost Australia | SteepWood already ranks page one. Deepen with format-level detail — **$800–$1,500+/m² mid-range with custom POS joinery** ([Focus Shopfit](https://focusshopfit.com.au/the-quintessential-2026-price-guide-for-shop-fitout-in-australia/)), **$120,000–$350,000 for a 100m² café** ([TradeRefer](https://traderefer.au/trades/retail-shop-fit-out)), **10–20% capital-city premium** |
| 17 | **Timber staircase cost NSW: straight vs quarter-turn vs curved vs spiral** | timber staircase cost Australia | Extremely thin national SERP; SteepWood already holds two slots. Curved stairs at **$20k–$25k+** ([Staircase Constructions](https://staircaseconstructions.com.au/budget-estimates/)) and spiral at **$8,000–$20,000+** ([The Quote Yard](https://www.thequoteyard.com.au/services/timber-staircase-cost-2026-nsw)) are high-ticket, low-competition |
| 18 | **Hamptons kitchen in NSW: what it costs to build properly, and what "Hamptons" means in joinery terms** | Hamptons kitchen Australia | Page one is publishers (Home Beautiful ×2, Homes to Love, BHG), Bunnings and volume builders — **but Highland Kitchens of Camden NSW ranks #7**, proving a NSW joiner can break in. Shaker doors, profiled panels and V-groove are joinery decisions, not styling decisions |
| 19 | **NSW building licence, HBCF insurance and your $20,000 threshold: what a homeowner should check before signing** | nsw builder licence check · home warranty insurance nsw renovation | No competitor site reviewed published a licence number. Authoritative, citable facts available: licence needed above **$5,000 incl GST**, fines **$22,000 / $110,000** ([NSW Government](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/carpentry-work)); HBCF required at **$20,000+ incl GST** with certificate **before deposit** ([HIA Insurance](https://www.hiainsurance.com.au/products/home-warranty-insurance/home-warranty-insurance-nsw)); statutory warranties **6 years / 2 years** ([HIA](https://hia.com.au/resources-and-advice/managing-your-business/managing-compliance/articles/statutory-warranties-for-home-building-work)) |
| 20 | **Custom bathroom vanity cost NSW — expand the page that already ranks #1** | custom bathroom vanity cost Australia | SteepWood holds **#1 and #6**. Add the NSW supply-vs-installed matrix ($800–$1,800 flat-pack → **$4,500–$12,000+ custom with stone**, [The Quote Yard](https://www.thequoteyard.com.au/services/bathroom-vanity-cost-2026-nsw)) and size-based pricing ([Sparky](https://www.sparky.fyi/costs/bathroom-vanity)) to defend against sparky.fyi and thequoteyard |
| 21 | **Home office joinery cost — expand the pages already ranking** | built in home office cost Australia | SteepWood already holds **three of ten slots** and Reddit is on page one. Add concrete configurations: desk + overheads + filing from **~$4,000**, full L-shaped fit-out **$8,000–$12,000** ([Sparky](https://www.sparky.fyi/costs/custom-joinery)) |
| 22 | **Illawarra / Wollongong joinery and kitchen cost guide** | kitchen renovation wollongong · joinery illawarra | *kitchen renovations wollongong* is **KD 9 / 140 searches**, *kitchen and bathroom renovations illawarra* **KD 8 / 90 searches** ([keyword PDF](https://cdn2.f-cdn.com/files/download/193561461/Keyword%20Research%20For%20Brilliant%20Australia%20-%20Sheet1.pdf)); the *joinery Illawarra* SERP has **no aggregator and no cost content**. Wollongong is the **10th-largest alterations market in NSW at $117.1m** and houses grew +6.2% to ~$915,000 ([Daily Wollongong](https://dailywollongong.com.au/article/property-wollongong-20260703-ff503e6aa6dd)) |
| 23 | **Central Coast joinery hub: Gosford, Terrigal, Avoca, Copacabana, Wyong** | cabinet maker central coast nsw · kitchen renovations central coast | SteepWood already ranks page one; *kitchen renovations central coast* is **KD 8 / 170 searches**. Central Coast is the **7th-largest alterations market ($166.0m)** and **largest dwelling stock outside Sydney (152,706)**; Terrigal ~$1.61m and Copacabana ~$1.63m ([George Brand](https://georgebrand.com.au/central-coast-property-market-update-winter-2026/)). Directories hold 4 of 10 slots — beatable |
| 24 | **Northern Beaches / Eastern Suburbs premium joinery landing pages** | bespoke joinery sydney eastern suburbs · kitchen renovations northern beaches | The *eastern suburbs* SERP is proof that **sub-region landing pages rank** — Liteco's `/eastern-suburbs/` page is #5. *kitchen renovations northern beaches* has the **highest CPC found ($5.43)**. Northern Beaches is the **#1 alterations LGA in NSW at $414.6m**, Woollahra #3 at $287.6m with the **highest median household income at $3,192/wk** |
| 25 | **Apartment and terrace joinery: bespoke fitted joinery for tight Sydney floorplans** | apartment joinery sydney · small kitchen renovations sydney | City of Sydney is **2.1% separate houses** and Woollahra **22.3%** ([ABS QuickStats](https://www.abs.gov.au/census/find-census-data/quickstats/2021/LGA17200)) — an enormous apartment/terrace market that no page-one result addresses. *small kitchen renovations sydney* is 110 searches / KD 30 |
| 26 | **Hunter Valley and Southern Highlands: joinery for period homes, wine-country properties and tree-change renovations** | joinery bowral · joinery hunter valley · cessnock kitchen renovation | Wingecarribee approved **$54.8m** of alterations from just 52,709 people — one of the highest per-capita renovation spends in NSW. Muswellbrook medians rose **+18.2%** and Upper Hunter +14.9% ([Domain Insight](https://insight.domain.com.au/research-insights/industry-news/the-surprising-nsw-tree-change-towns-where-house-prices-rose-most/)). Almost no bespoke-joinery competition |
| 27 | **Commercial joinery for medical, dental and allied health fitouts in NSW** | medical fitout joinery · dental fitout nsw | The *commercial joinery Sydney* SERP is **100% local businesses with no content**, and SteepWood already ranks #6. Medical/dental is high-margin, recurring, and completely unaddressed in content |
| 28 | **Growth-corridor new-build joinery: The Hills, Camden, Blacktown, Liverpool, Box Hill** | new home joinery sydney · builder joinery supply nsw | These LGAs approved the **most dwellings in NSW** (The Hills 2,696, Parramatta 2,696, Blacktown 2,415, Liverpool 2,163, Camden 1,759) while spending comparatively little on alterations — a **builder/second-fix channel**, not a renovation channel. Box Hill-Nelson grew **+17.4% in one year** ([ABS](https://www.abs.gov.au/statistics/people/population/regional-population/latest-release)) |
| 29 | **Regional NSW joinery hubs: Orange, Bathurst, Dubbo, Wagga, Tamworth, Albury, Port Macquarie, Coffs, Byron, Ballina** | joinery [regional city] nsw | SteepWood's existing `/home-office-joinery/orange-nsw/` and `/staircase-joinery/orange-nsw/` pages **already rank page one nationally**, proving the template works with almost no competition. Port Macquarie-Hastings medians rose **+18.0%** and Byron LGA is **+89% since March 2020** ([Domain Spotlight NSW](https://insight.domain.com.au/research-insights/reports/domain-spotlight-report-new-south-wales/)) |
| 30 | **"Renovate before spring": booking, lead times and why the joinery has to be ordered first** | when to renovate australia · kitchen renovation lead time | Spring is documented as one of Australia's busiest renovation seasons, tradies are often fully booked by summer, and quality professionals are booked well before Christmas ([ServiceSeeking](https://www.serviceseeking.com.au/industry-insights/is-spring-a-good-time-to-renovate-7-reasons)). No joiner owns this seasonal-urgency query family, and it converts |

### 7b. Structural gaps (not single posts, but programme-level fixes)

1. **No competitor reviewed publishes a licence number.** NSW law requires licensee name, **licence number with the correct category**, and a business phone number in *all* advertising ([NSW Government](https://www.nsw.gov.au/business-and-economy/running-a-business/advertising-laws-and-your-business/building-trade-advertisements)). Putting 489553C in the footer of every page is compliance and differentiation in one move.
2. **Only Refresh Renovations (franchise) and Liteco run genuine Sydney sub-region landing pages.** The *eastern suburbs* SERP proves they rank. This is an unoccupied structural play across Northern Beaches, Inner West, North Shore, Sutherland Shire, Hills District, Ryde and Parramatta.
3. **No fetched competitor site published Google review counts or ratings.** Since Google states prominence is partly driven by **review volume and positive ratings** ([Google](https://support.google.com/business/answer/7091?hl=en)), a systematic review-generation programme is the single highest-ROI non-content lever.
4. **Every cost SERP is owned by businesses that do not build cabinets.** Workshop-authored content with process photography, real lead times and real hardware prices carries experience signals that lead-gen sites structurally cannot fake.
5. **Warranty length is a nearly unused trust lever.** Kitchen Connection publishes a **10-year workmanship warranty**; almost no bespoke joiner does. NSW statutory minimums are already 6 years major / 2 years other ([HIA](https://hia.com.au/resources-and-advice/managing-your-business/managing-compliance/articles/statutory-warranties-for-home-building-work)), so an explicit longer warranty is cheap to offer and highly persuasive.
6. **Nobody is publishing lead times.** Spoke publishes **4–6 weeks** on reception desks and Sparky notes **4–8 weeks** for custom vanities. Publishing honest lead times pre-qualifies enquiries and is a genuine differentiator against flat-pack and aggregator expectations.

---

## Data quality notes and known gaps

**Values marked n.a. in this report:**
- Google review counts and star ratings for **all** competitors — no fetched competitor site stated them.
- AI Overview, featured snippet and People Also Ask presence, and verbatim PAA questions — the search index used does not expose SERP features.
- Published Australian search volumes for *custom joinery*, *cabinet maker [city]*, *built-in wardrobe*, *butler's pantry*, *office fitout*, *shopfitting*, *staircase*.
- Numeric seasonality data for Australian renovation demand (qualitative only).
- Sydney-specific office fitout $/m² (JLL benchmarks five cities but the fetched content did not name Sydney; Cushman & Wakefield robots-blocked).
- Smartstone and Caesarstone porcelain per-m² AU prices.
- Blum TANDEMBOX antaro trade-pack pricing (Lincoln Sentry publishes no prices).
- Newcastle-specific joiner/cabinetmaker charge-out rates.
- Master Builders NSW and HIA membership fees and category lists.
- Safe Work Australia's December 2025 *Review of the engineered stone prohibition* findings (fetch timed out — **read before publishing on topic #1**).
- CMDA's current status (cmda.org.au robots-blocked; ACFA positions itself as the successor body).
- Qualitative "renovation character" descriptions per LGA beyond the four separate-house extremes.

**Sources that could not be fetched (do not retry):** robots-blocked — smh.com.au, realestate.com.au news, degabrielekitchens.com.au, bunnings.com.au, accessprojects.com.au, servicetasker.com.au, sira.nsw.gov.au, jbmtimber.com.au, profile.id.com.au (all), jadekitchens.com.au, cushmanwakefield.com, icare.nsw.gov.au, cmda.org.au, sydneycustomjoinery.com.au, grovesjoinery.com.au. Client errors — airtasker.com/costs, smartstone.com.au, mbansw.asn.au/membership, auskstone.com.au Neolith category. Other — NSW housing supply dashboard (file too large), property.com.au (rate-limited), thefold.com.au and serviceseeking.com.au homepage (incomplete).

**Raw data files** (all in `/home/user/workspace/research/`): `s1_serp.jsonl` (40 SERPs × 10 results), `s1_comp.jsonl` (34 competitor/aggregator profiles), `s34.jsonl` (demand and market data), `s4_pop.jsonl` (52 NSW LGAs, ABS Census), `s4c.jsonl` (property prices, ABS approvals cube), `s5_compliance.jsonl` + `s5c.jsonl` (50 compliance/directory pages), `s6_costs.jsonl` + `s6c.jsonl` (60 cost pages), plus the fetch helper `fetchjobs.py` and the discovery scripts.
