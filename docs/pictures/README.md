# SteepWood — P1 + P2 Image Pack

Premium custom joinery imagery for SteepWood (Newcastle NSW HQ). 58 final assets across services, locations, OG social, team, materials and blog.

All images are photorealistic editorial photography in the SteepWood brand language: warm natural light, true-to-life colours, American oak / walnut / Tasmanian oak / Spotted Gum, 2-pac shaker profiles, Caesarstone, Blum hardware, Australian context (tapware, power points, proportions).

## Folder structure

| Folder | Contents | Size | Aspect |
| --- | --- | --- | --- |
| `02-services/` | 10 service hero images | 1600 × 1000 | 16:10 |
| `03-locations/` | 16 location hero images | 1600 × 1000 | 16:10 |
| `05-team/` | 4 anonymous craftsperson portraits | 800 × 800 | 1:1 |
| `06-og-social/` | 26 OG social cards (10 service + 16 location) | 1200 × 630 | 1.91:1 |
| `07-materials/` | 1 materials flat-lay (samples + hardware) | 1600 × 1000 | 16:10 |
| `08-blog/` | 1 kitchen storage blog hero | 1600 × 1000 | 16:10 |

## Output spec

- **Format:** Progressive JPEG, quality 88, optimised
- **Colour:** sRGB, true-to-life
- **Cropping:** Center-crop, Lanczos resize from 16:9 / 1:1 source renders
- **OG cards:** include a soft eased gradient darkening the lower portion of the image for text-overlay safety. Place title text in the bottom third over the gradient.

## Service slugs (10)

custom-kitchen-joinery, built-in-wardrobes, office-fitout, shopfitting, custom-bathroom-vanity, commercial-joinery, custom-furniture, home-office-joinery, laundry-cabinets, staircase-joinery

## Location slugs (16)

newcastle, sydney, canberra, melbourne, central-coast, hunter-valley, gold-coast, wollongong, brisbane, perth, byron-bay, port-macquarie, coffs-harbour, adelaide, bathurst, orange

## File naming convention

- Service hero: `service-{slug}-hero.jpg`
- Location hero: `location-{slug}-hero.jpg`
- OG service: `og-service-{slug}.jpg`
- OG location: `og-location-{slug}.jpg`
- Team portrait: `team-portrait-0{1-4}.jpg`
- Materials: `materials-workshop-samples.jpg`
- Blog: `blog-kitchen-storage-planning-australia-hero.jpg`

## Notes

- No real faces shown in team portraits (per brand rules) — torsos, hands, partial side, and back-of-head compositions only.
- Each location hero embeds a sense-of-place anchor (e.g. Tacking Point Lighthouse for Port Macquarie, Mount Lofty for Adelaide, Cape Byron Lighthouse for Byron Bay).
- Source PNG renders are kept locally in `_raw/` and excluded from the distribution ZIP.
