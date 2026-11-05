#!/usr/bin/env python3
"""Build the Batch 3 research handoff files from the finished posts.

Outputs (same format as Batch 2):
  research/RESEARCH-{slug}.md      one research record per post
  research/POST-BRIEFS-01-15.md    briefs for posts 1-15
  research/POST-BRIEFS-16-30.md    briefs for posts 16-30
Run from blog-batch3/:  python3 scripts/build_handoff.py
"""
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from build_and_validate import SLATE, faq_md, words as count_words  # noqa: E402

POSTS = ROOT / "posts"
RESEARCH = ROOT / "research"
MANIFEST = json.loads((ROOT / "images" / "blog-image-manifest.json").read_text())

SERVICE_RULES = [
    (("office-fitout", "office-kitchenette", "medical-clinic", "christmas"), "Office fitout"),
    (("shop", "cafe", "salon", "retail"), "Shopfitting"),
    (("commercial-joinery", "compact-laminate"), "Commercial joinery"),
    (("kitchen-installation",), "Kitchen installation"),
    (("deck",), "Deck construction"),
    (("home-office", "desk"), "Home office joinery"),
]


def service(slug):
    for keys, name in SERVICE_RULES:
        if any(k in slug for k in keys):
            return name
    return "Joinery"

# Owner-confirmation items by slug (README section 5 numbering).
DECK = "README §5 item 1: confirm deck work sits within Carpentry Contractor Licence 489553C, or soften deck-building claims."
DECKPAGE = "README §5 item 2: decide whether to build /decking pages; until then decking posts link to location pages and /quote."
TIMES = "README §5 item 6: confirm install durations and lead times quoted in this post match SteepWood practice."
ELSEWHERE = "README §5 item 7: confirm policy on installing kitchens bought elsewhere (FAQ answer is cautious)."
HOMEOFFICE = "README §5 item 8a: confirm the live 'from $3,000' home office price still applies."
CJLEAD = "README §5 item 8b: live commercial joinery page says 8–12 weeks lead time; post says manufacture takes a few weeks after approval. Align one or the other."
NAMES = "README §5 item 4: no clients are named. Confirm whether named case studies can be added at backfill."
XMAS = "README §5 item 10: add SteepWood's own Christmas shutdown dates if they should appear."
NAP = "README §5 item 9: live office fitout page shows 'Pavit Pty Ltd'; fix to 'Pavit Cabinetry Pty Ltd' for NAP consistency."

OWNER = {
    "office-fitout-newcastle-guide": [NAP, NAMES],
    "kitchen-installation-cost-nsw": [TIMES, ELSEWHERE],
    "shop-fitout-newcastle-guide": [NAMES],
    "decking-cost-newcastle": [DECK, DECKPAGE],
    "home-office-joinery-newcastle": [HOMEOFFICE],
    "commercial-joinery-newcastle-guide": [CJLEAD, NAMES],
    "office-fitout-central-coast-guide": [NAP],
    "kitchen-installation-newcastle": [TIMES, ELSEWHERE],
    "composite-vs-timber-decking-central-coast": [DECK, DECKPAGE],
    "shop-fitout-central-coast": [NAMES],
    "built-in-desk-study-nook-sydney": [HOMEOFFICE],
    "kitchen-installation-central-coast": [TIMES, ELSEWHERE],
    "deck-builders-sydney-cost": [DECK, DECKPAGE],
    "commercial-joinery-sydney-builders": [CJLEAD, NAMES],
    "kitchen-installation-sydney": [TIMES, ELSEWHERE],
    "home-office-joinery-central-coast": [HOMEOFFICE],
    "spotted-gum-merbau-blackbutt-decking-nsw": [DECK, DECKPAGE],
    "salon-barber-shop-fitout-nsw": [NAMES],
    "kitchen-installation-process-day-by-day": [TIMES],
    "home-office-built-ins-hybrid-work-nsw": [HOMEOFFICE],
    "office-fitout-sydney-small-business": [NAP],
    "commercial-joinery-central-coast": [CJLEAD, TIMES],
    "christmas-shutdown-fitout-planning-nsw": [XMAS],
}

LINK_RE = re.compile(r"(?<!!)\[([^\]]+)\]\((https?://[^)\s]+)\)")


def load(slug):
    text = (POSTS / f"{slug}.md").read_text()
    _, fm, body = text.split("---", 2)
    return yaml.safe_load(fm), body


def words(body, fm):
    return count_words(body.replace("[[FAQ]]", faq_md(fm.get("faq", []))))


def sources(body):
    seen, out = set(), []
    for anchor, url in LINK_RE.findall(body):
        if url in seen:
            continue
        seen.add(url)
        out.append((anchor.strip(), url))
    return out


def h2s(body):
    return [h.strip() for h in re.findall(r"^## (.+)$", body, re.M)]


def tables(body):
    return len(re.findall(r"^\|\s*-{3}", body, re.M))


def research_record(n, date, slug, fm, body):
    alts = MANIFEST.get(slug, {})
    lines = [
        f"# Research record — {slug}",
        "",
        f"- Post number: {n:02d} · Publish {date} 07:00 Australia/Sydney",
        f"- Final word count: {words(body, fm)} (body including FAQ, excluding YAML frontmatter)",
        f"- Primary keyword: `{fm['primaryKeyword']}` — title, H1, slug, meta description and first 100 words.",
        "- Secondary keywords: "
        + ", ".join(f"`{k}`" for k in fm.get("secondaryKeywords", []))
        + " — used in H2s, tables and FAQ.",
        f"- Category: {fm['category']} · Service node (`about`): {service(slug)}",
        f"- locationFocus: {', '.join(fm.get('locationFocus', []))}",
        "- Schema types: `BlogPosting` (with `about` Service and `spatialCoverage`), `BreadcrumbList`, `FAQPage`, `ImageObject`.",
        "",
        "## Sources used",
        "",
    ]
    lines += [f"- {a} — {u}" for a, u in sources(body)]
    lines += ["", "## Internal links", ""]
    lines += [f"- `{l['url']}` — anchor \"{l['anchor']}\"" for l in fm.get("internalLinks", [])]
    lines += ["", "## Image alt text", ""]
    lines += [f"- {k}: {v}" for k, v in alts.items()]
    lines += ["", "## NEEDS_OWNER_CONFIRMATION", ""]
    items = OWNER.get(slug)
    if items:
        lines += [f"- {i}" for i in items]
    else:
        lines.append("- No owner confirmation item identified. All ranges are presented as market planning figures, not SteepWood-specific prices or lead times.")
    return "\n".join(lines) + "\n"


def brief(n, date, slug, fm, body):
    links = ", ".join(f"`{l['url']}`" for l in fm.get("internalLinks", []))
    facts = sources(body)
    out = [
        f"### {n:02d} · `{slug}`",
        "",
        f"- **Publish** {date} 07:00 Sydney · **Category** {fm['category']} · **Service** {service(slug)} · **locationFocus** {', '.join(fm.get('locationFocus', []))}",
        f"- **Title / metaTitle** {fm['title']}",
        f"- **metaDescription** {fm['description']}",
        f"- **Primary** {fm['primaryKeyword']} · **Secondary** {', '.join(fm.get('secondaryKeywords', []))}",
        f"- **Sources ({len(facts)})**",
    ]
    out += [f"  - [{a}]({u})" for a, u in facts]
    out += [
        f"- **H2s** {' · '.join(h2s(body))}",
        f"- **Tables** {tables(body)}",
        f"- **Internal links** {links}",
        f"- **Related posts** {', '.join(fm.get('relatedPosts', []))}",
        f"- **FAQ** {' · '.join(q['question'] for q in fm.get('faq', []))}",
    ]
    flags = OWNER.get(slug)
    out.append("- **Flags** " + (" ".join(flags) if flags else "None."))
    out += ["", "---", ""]
    return "\n".join(out)


HEADER = """# Post Briefs {rng}

Batch 3 briefs, recorded from the finished posts so Cursor, an editor or a future writer can see the intent of each post at a glance. Read `README.md` and `research/NSW-MARKET-RESEARCH-BATCH3.md` first. Batch 2 rules in `blog-batch2/SHARED_CONTEXT.md` still apply (brand, NAP, CTA block, tone), except where Batch 3 overrides them:

- 1,000–1,900 words, Australian English, author Sukhveer Kaur.
- Direct answer to the primary keyword inside the first 100 words.
- At least 6 H2s, 2 tables, 4 inline sources and 5 FAQs matching the `FAQPage` schema.
- One SteepWood CTA block and the trust line (ABN 52 697 313 269, Licence 489553C, $20M public liability, 10-year structural warranty).
- Internal links only to pages live on the post's publish date (checked by `scripts/build_and_validate.py`).
- 5 image slots per post: hero, og, inline-01, inline-02, inline-wide.

---

"""


def main():
    briefs = {1: [], 2: []}
    for n, (date, slug) in enumerate(SLATE, 1):
        fm, body = load(slug)
        (RESEARCH / f"RESEARCH-{slug}.md").write_text(research_record(n, date, slug, fm, body))
        briefs[1 if n <= 15 else 2].append(brief(n, date, slug, fm, body))
    (RESEARCH / "POST-BRIEFS-01-15.md").write_text(HEADER.format(rng="01–15") + "\n".join(briefs[1]))
    (RESEARCH / "POST-BRIEFS-16-30.md").write_text(HEADER.format(rng="16–30") + "\n".join(briefs[2]))
    print(f"Wrote {len(SLATE)} research records and 2 brief files")


if __name__ == "__main__":
    main()
