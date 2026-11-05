#!/usr/bin/env python3
"""SteepWood Blog Batch 3 - build and validate.

Usage:
  python3 build_and_validate.py            # validate only (FAQ marker allowed)
  python3 build_and_validate.py --build    # replace [[FAQ]] with body FAQ from frontmatter, then validate

Checks every post in ../posts:
  - frontmatter parses, required keys present, slug matches filename
  - date matches the publishing slate, no duplicate slugs or primary keywords
  - primary keyword (or its core words) appears in the first 100 words
  - body word count 1,000-1,900 (after FAQ expansion)
  - exactly one H1, at least 6 H2s, at least 2 tables, one STEEPWOOD CTA blockquote
  - 5 FAQs
  - no raw HTML, no "<digit" (breaks MDX), no emojis, no exclamation marks in body copy
  - internal links point only to pages that exist (or earlier Batch 3 posts)
  - no forward links to Batch 3 posts that publish later
  - no retired slugs
"""
import re, sys, pathlib, yaml

ROOT = pathlib.Path(__file__).resolve().parent.parent
POSTS = ROOT / "posts"

SLATE = [
    ("2026-08-24", "office-fitout-newcastle-guide"),
    ("2026-08-27", "kitchen-installation-cost-nsw"),
    ("2026-08-29", "shop-fitout-newcastle-guide"),
    ("2026-09-01", "decking-cost-newcastle"),
    ("2026-09-03", "home-office-joinery-newcastle"),
    ("2026-09-06", "commercial-joinery-newcastle-guide"),
    ("2026-09-08", "office-fitout-central-coast-guide"),
    ("2026-09-11", "kitchen-installation-newcastle"),
    ("2026-09-13", "composite-vs-timber-decking-central-coast"),
    ("2026-09-16", "shop-fitout-central-coast"),
    ("2026-09-19", "cafe-fitout-cost-nsw"),
    ("2026-09-21", "built-in-desk-study-nook-sydney"),
    ("2026-09-24", "kitchen-installation-central-coast"),
    ("2026-09-26", "office-fitout-timeline-nsw"),
    ("2026-09-29", "retail-shop-fitout-sydney"),
    ("2026-10-01", "deck-builders-sydney-cost"),
    ("2026-10-04", "medical-clinic-fitout-joinery-nsw"),
    ("2026-10-06", "commercial-joinery-sydney-builders"),
    ("2026-10-09", "kitchen-installation-sydney"),
    ("2026-10-11", "home-office-joinery-central-coast"),
    ("2026-10-14", "office-kitchenette-breakout-joinery"),
    ("2026-10-17", "shop-counter-display-joinery"),
    ("2026-10-19", "spotted-gum-merbau-blackbutt-decking-nsw"),
    ("2026-10-22", "salon-barber-shop-fitout-nsw"),
    ("2026-10-24", "kitchen-installation-process-day-by-day"),
    ("2026-10-27", "compact-laminate-commercial-joinery"),
    ("2026-10-29", "home-office-built-ins-hybrid-work-nsw"),
    ("2026-11-01", "office-fitout-sydney-small-business"),
    ("2026-11-03", "commercial-joinery-central-coast"),
    ("2026-11-06", "christmas-shutdown-fitout-planning-nsw"),
]
DATE_OF = {s: d for d, s in SLATE}

SERVICES = ["custom-kitchen-joinery", "built-in-wardrobes", "office-fitout", "shopfitting",
            "custom-bathroom-vanity", "commercial-joinery", "custom-furniture",
            "home-office-joinery", "laundry-cabinets", "staircase-joinery"]
LOCATIONS = ["newcastle", "sydney", "canberra", "melbourne", "central-coast", "hunter-valley",
             "gold-coast", "wollongong", "brisbane", "perth", "byron-bay", "port-macquarie",
             "coffs-harbour", "adelaide", "bathurst", "orange"]
PORTFOLIO = ["hamptons-kitchen-newcastle", "walk-in-robe-sydney", "floating-vanity-byron-bay",
             "office-fitout-canberra", "home-office-wollongong", "laundry-cabinets-central-coast"]
LIVE_POSTS = """custom-kitchen-cost-nsw-2026 flat-pack-vs-custom-kitchen-australia
2pac-laminate-timber-veneer-kitchen-finishes-nsw walk-in-robe-built-in-wardrobe-cost-guide-nsw
questions-to-ask-custom-joiner-australia benchtop-guide-engineered-stone-ban-nsw laundry-joinery-cost-nsw
kitchen-renovation-timeline-lead-times-nsw porcelain-sintered-stone-benchtop-cost-nsw butlers-pantry-cost-nsw
cabinetry-cost-per-linear-metre-nsw blum-hardware-cost-australia floating-vanity-vs-floor-mounted-cost-nsw
timber-staircase-cost-nsw kitchen-island-cost-nsw joinery-timber-species-guide-nsw hamptons-kitchen-cost-nsw
home-office-joinery-cost-nsw custom-timber-furniture-cost-australia reception-desk-cost-australia
office-fitout-joinery-cost-nsw shopfitting-cost-by-format-nsw cabinetmaker-hourly-rate-vs-charge-out-nsw
why-custom-joinery-quotes-differ-australia nsw-building-licence-hbcf-warranty-guide
joinery-cost-guide-newcastle-hunter joinery-cost-guide-central-coast joinery-cost-guide-wollongong-illawarra
joinery-cost-guide-northern-beaches joinery-cost-guide-eastern-suburbs-sydney joinery-cost-guide-north-shore-sydney
joinery-cost-guide-inner-west-sydney apartment-terrace-joinery-sydney southern-highlands-hunter-valley-joinery-guide
regional-nsw-joinery-guide new-home-joinery-growth-corridors-nsw""".split()
RETIRED = ["kitchen-storage-planning-australia", "joinery-materials-guide-2pac-timber",
           "australian-home-joinery-trends-2026"]

STATIC = {"/quote", "/contact", "/about", "/legal/consumer-rights", "/blog"}
ALLOWED = set(STATIC)
for s in SERVICES:
    ALLOWED.add(f"/{s}")
    for l in LOCATIONS:
        ALLOWED.add(f"/{s}/{l}")
for l in LOCATIONS:
    ALLOWED.add(f"/locations/{l}")
for p in PORTFOLIO:
    ALLOWED.add(f"/portfolio/{p}")
for p in LIVE_POSTS:
    ALLOWED.add(f"/blog/{p}")

REQUIRED = ["title", "slug", "description", "date", "author", "category", "tags", "readingTime",
            "hero", "ogImage", "primaryKeyword", "secondaryKeywords", "internalLinks", "faq", "relatedPosts"]
CATEGORIES = {"Commercial", "Kitchen Design", "Decking", "Home Offices", "Materials"}
EMOJI = re.compile("[\U0001F300-\U0001FAFF\u2600-\u27BF]")
STOP = {"how", "long", "does", "an", "a", "the", "take", "best", "for", "in", "nsw", "of"}


def split(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        raise ValueError("no frontmatter")
    return yaml.safe_load(m.group(1)), m.group(1), m.group(2)


def faq_md(faq):
    out = ["## Frequently asked questions", ""]
    for item in faq:
        out += [f"### {item['question']}", "", item["answer"].strip(), ""]
    return "\n".join(out).rstrip() + "\n"


def words(md):
    md = re.sub(r"\]\([^)]*\)", "]", md)
    md = re.sub(r"^\| ?-{3}.*$", "", md, flags=re.M)
    return len([w for w in md.split() if re.search(r"[A-Za-z0-9]", w)])


def main():
    build = "--build" in sys.argv
    errors, warns = [], []
    seen_kw = {}
    files = sorted(POSTS.glob("*.md"))
    for f in files:
        slug = f.stem
        e = lambda msg: errors.append(f"{slug}: {msg}")
        text = f.read_text()
        try:
            fm, fm_raw, body = split(text)
        except Exception as ex:
            e(f"frontmatter error {ex}")
            continue
        for k in REQUIRED:
            if k not in fm:
                e(f"missing frontmatter key {k}")
        if fm.get("slug") != slug:
            e("slug does not match filename")
        if slug not in DATE_OF:
            e("slug not in slate")
            continue
        if str(fm.get("date")) != DATE_OF[slug]:
            e(f"date {fm.get('date')} != slate {DATE_OF[slug]}")
        if fm.get("category") not in CATEGORIES:
            e(f"bad category {fm.get('category')}")
        if len(fm.get("description", "")) > 165:
            warns.append(f"{slug}: description {len(fm['description'])} chars (>165)")
        if len(fm.get("title", "")) > 70:
            warns.append(f"{slug}: title {len(fm['title'])} chars (>70)")
        kw = fm.get("primaryKeyword", "").lower()
        if kw in seen_kw:
            e(f"primary keyword duplicates {seen_kw[kw]}")
        seen_kw[kw] = slug
        faq = fm.get("faq") or []
        if len(faq) != 5:
            e(f"{len(faq)} FAQs (need 5)")

        if build and "[[FAQ]]" in body:
            body = body.replace("[[FAQ]]", faq_md(faq).rstrip())
            f.write_text(f"---\n{fm_raw}\n---\n{body}")
        if "[[FAQ]]" not in body and "## Frequently asked questions" not in body:
            e("no FAQ marker or FAQ section")

        full_body = body.replace("[[FAQ]]", faq_md(faq))
        n = words(full_body)
        if not 1000 <= n <= 1900:
            e(f"word count {n} outside 1,000-1,900")
        plain = re.sub(r"\]\([^)]*\)", "]", full_body)
        first = " ".join(re.sub(r"^#.*$", "", plain, count=1, flags=re.M).split()[:100]).lower()
        core = [w for w in re.findall(r"[a-z]+", kw) if w not in STOP]
        if kw not in first and not all(w in first for w in core):
            e(f"primary keyword '{kw}' not in first 100 words")
        if len(re.findall(r"^# ", body, re.M)) != 1:
            e("needs exactly one H1")
        h2 = len(re.findall(r"^## ", full_body, re.M))
        if h2 < 6:
            e(f"only {h2} H2s")
        tables = len(re.findall(r"^\| ?-{3}", full_body, re.M))
        if tables < 2:
            e(f"only {tables} tables")
        if len(re.findall(r"^> \*\*STEEPWOOD", body, re.M)) != 1:
            e("needs exactly one STEEPWOOD CTA blockquote")
        if re.search(r"<\s*[a-zA-Z/!]", body):
            e("raw HTML found")
        if re.search(r"<\s*\d", full_body):
            e("raw '<digit' found (breaks MDX)")
        if EMOJI.search(text):
            e("emoji found")
        if "!" in re.sub(r"!\[", "", plain):
            e("exclamation mark found")
        if "/quote" not in body:
            e("no /quote CTA")

        links = re.findall(r"\]\((/[^)\s]*)\)", body) + [l["url"] for l in fm.get("internalLinks", [])]
        links += [f"/blog/{r}" for r in fm.get("relatedPosts", [])]
        for l in links:
            path = l.split("#")[0]
            if path.endswith("/") and path != "/":
                e(f"trailing slash {l}")
                path = path.rstrip("/")
            if any(r in path for r in RETIRED):
                e(f"retired slug link {l}")
            if path in ALLOWED:
                continue
            if path.startswith("/blog/") and path[6:] in DATE_OF:
                target = path[6:]
                if DATE_OF[target] >= DATE_OF[slug]:
                    e(f"forward/self link to later Batch 3 post {l}")
                continue
            e(f"link to page that does not exist {l}")
        for r in fm.get("relatedPosts", []):
            if r in DATE_OF and DATE_OF[r] >= DATE_OF[slug]:
                e(f"relatedPosts forward link {r}")
        ext = re.findall(r"\]\((https?://[^)\s]+)\)", body)
        if len(ext) < 4:
            warns.append(f"{slug}: only {len(ext)} external source links")
        print(f"{slug:48s} {fm.get('date')}  {n:5d} words  H2 {h2}  tables {tables}  sources {len(set(ext))}")

    missing = [s for _, s in SLATE if not (POSTS / f"{s}.md").exists()]
    if missing:
        warns.append(f"{len(missing)} posts not written yet: {', '.join(missing)}")
    for w in warns:
        print("WARN ", w)
    for x in errors:
        print("ERROR", x)
    print(f"\n{len(files)} posts checked, {len(errors)} errors, {len(warns)} warnings")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
