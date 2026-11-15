# Publishing Schedule — Batch 4, 10 posts, publish all now

**16 November 2026:** Batch 3's last post is dated 6 November 2026. Batch 4 fills the gap with **one post per day from Saturday 7 November to Monday 16 November 2026**, and all 10 go live today in one deploy, the same way Batch 3 did.

- `datePublished` = the date below at 07:00 Australia/Sydney. All dates are in daylight saving time, so the offset is **+11:00** (AEDT) for every post.
- `dateModified` = `2026-11-16T07:00:00+11:00` for every post (the real go-live day).
- No date gate is needed: every date is today or earlier.
- Posts link only to the 66 live posts or to earlier Batch 4 posts, so there are no forward links. The backfill (below) runs straight after go-live.

Sequencing logic: alternate commercial and residential so the blog does not show three commercial posts in a row; Sydney commercial first (highest value), then Hunter residential, then the new verticals.

## All 10 posts

| # | Date | datePublished | Slug | Primary keyword | Category | Location focus |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Sat 7 Nov 2026 | `2026-11-07T07:00:00+11:00` | `office-fitout-parramatta` | office fitout Parramatta | Commercial | Parramatta, Westmead, Rydalmere, Norwest |
| 2 | Sun 8 Nov 2026 | `2026-11-08T07:00:00+11:00` | `kitchen-installation-lake-macquarie` | kitchen installation Lake Macquarie | Kitchen Design | Lake Macquarie, Charlestown, Warners Bay, Belmont |
| 3 | Mon 9 Nov 2026 | `2026-11-09T07:00:00+11:00` | `shop-fitout-maitland` | shop fitout Maitland | Commercial | Maitland, East Maitland, Green Hills, Rutherford |
| 4 | Tue 10 Nov 2026 | `2026-11-10T07:00:00+11:00` | `deck-builders-lake-macquarie` | deck builders Lake Macquarie | Decking | Lake Macquarie, Warners Bay, Belmont, Toronto |
| 5 | Wed 11 Nov 2026 | `2026-11-11T07:00:00+11:00` | `restaurant-fitout-newcastle` | restaurant fitout Newcastle | Commercial | Newcastle, Darby Street, Honeysuckle, Merewether |
| 6 | Thu 12 Nov 2026 | `2026-11-12T07:00:00+11:00` | `home-office-joinery-north-shore-sydney` | home office joinery North Shore | Home Offices | Chatswood, Lane Cove, Wahroonga, Mosman |
| 7 | Fri 13 Nov 2026 | `2026-11-13T07:00:00+11:00` | `pharmacy-fitout-nsw` | pharmacy fitout NSW | Commercial | Sydney, Newcastle, Central Coast, Maitland |
| 8 | Sat 14 Nov 2026 | `2026-11-14T07:00:00+11:00` | `warehouse-office-fitout-western-sydney` | warehouse office fitout Western Sydney | Commercial | Blacktown, Eastern Creek, Wetherill Park, Smithfield |
| 9 | Sun 15 Nov 2026 | `2026-11-15T07:00:00+11:00` | `kitchen-installation-maitland-hunter-valley` | kitchen installers Maitland | Kitchen Design | Maitland, East Maitland, Chisholm, Thornton |
| 10 | Mon 16 Nov 2026 | `2026-11-16T07:00:00+11:00` | `childcare-centre-joinery-nsw` | childcare centre joinery NSW | Commercial | Sydney, Newcastle, Central Coast, Maitland |

---

## After go-live (16–26 November)

Do steps 1 and 2 for every post on go-live day. Spread steps 3 and 4 over the next 10 days (one GBP post and one social post per day, oldest first) so Google Business Profile shows daily activity.

### Routine per post

1. Confirm the post is live at `/blog/{slug}` and appears on `/blog`, its category archive, the sitemap and RSS.
2. Request indexing in Google Search Console (URL Inspection, then Request indexing).
3. Publish a Google Business Profile post: the hero image, a two-sentence summary, and a "Learn more" button linking to the post. Use the primary keyword naturally.
4. Share commercial posts on LinkedIn and residential or decking posts on Facebook and Instagram.
5. Log the URL, publish time and GBP post in the tracking sheet.

| Day | GBP and social post |
| --- | --- |
| Tue 17 Nov | 1 office-fitout-parramatta |
| Wed 18 Nov | 2 kitchen-installation-lake-macquarie |
| Thu 19 Nov | 3 shop-fitout-maitland |
| Fri 20 Nov | 4 deck-builders-lake-macquarie |
| Sat 21 Nov | 5 restaurant-fitout-newcastle |
| Sun 22 Nov | 6 home-office-joinery-north-shore-sydney |
| Mon 23 Nov | 7 pharmacy-fitout-nsw |
| Tue 24 Nov | 8 warehouse-office-fitout-western-sydney |
| Wed 25 Nov | 9 kitchen-installation-maitland-hunter-valley |
| Thu 26 Nov | 10 childcare-centre-joinery-nsw |

## Promotion checklist per post

- [ ] Live, indexing requested
- [ ] GBP post with image and link
- [ ] Social post (channel by category)
- [ ] Link added from the matching service page "Related guides" block, if the template has one
- [ ] Commercial posts: email to 3–5 builder, property manager, architect or operator contacts where relevant

## Backfill pass — run immediately after go-live

1. **Forward links inside Batch 4** (add one sentence with the link in the most relevant section, no other edits):
   - Post 1 office-fitout-parramatta → 8 warehouse-office-fitout-western-sydney
   - Post 2 kitchen-installation-lake-macquarie → 9 kitchen-installation-maitland-hunter-valley, 4 deck-builders-lake-macquarie
   - Post 3 shop-fitout-maitland → 7 pharmacy-fitout-nsw, 9 kitchen-installation-maitland-hunter-valley
   - Post 4 deck-builders-lake-macquarie → no forward link needed
   - Post 5 restaurant-fitout-newcastle → 7 pharmacy-fitout-nsw
   - Post 7 pharmacy-fitout-nsw → 10 childcare-centre-joinery-nsw
2. **Links from Batch 3 posts to Batch 4** (Batch 3 posts may be edited for this only; update their `dateModified`):
   - office-fitout-sydney-small-business → 1, 8
   - office-fitout-timeline-nsw → 8
   - kitchen-installation-newcastle → 2, 9
   - kitchen-installation-cost-nsw → 9
   - shop-fitout-newcastle-guide → 3, 5
   - cafe-fitout-cost-nsw → 5
   - decking-cost-newcastle → 4
   - home-office-built-ins-hybrid-work-nsw → 6
   - built-in-desk-study-nook-sydney → 6
   - medical-clinic-fitout-joinery-nsw → 7, 10
   - commercial-joinery-sydney-builders → 8, 10
   - compact-laminate-commercial-joinery → 10
3. Add Batch 4 posts to related-articles logic for earlier posts in the same category.
4. Re-run the link audit and rebuild.

## Measurement checkpoints

| Date | Check |
| --- | --- |
| 23 Nov 2026 | All 10 submitted; fix any Search Console coverage errors |
| 30 Nov 2026 | All 10 indexed; backfill done |
| 16 Dec 2026 | Impressions and average position per post |
| 16 Feb 2027 | 90-day review; refresh titles with high impressions and low CTR, expand posts sitting on page two |
