# SteepWood — P0 Image Delivery

29 photorealistic editorial images generated to brief specification, ready to deploy.

## Contents

- **`01-workshop/`** — 7 images (hero + 6 gallery)
  - `workshop-hero-main.jpg` (1600×1000, 16:10) — site-wide hero, replaces `hero-workshop.svg`
  - `workshop-assembly-bench.jpg`
  - `workshop-panel-processing.jpg`
  - `workshop-hand-finishing.jpg`
  - `workshop-timber-storage.jpg`
  - `workshop-quality-inspection.jpg`
  - `workshop-dispatch-prep.jpg`  (all 1600×1200, 4:3)

- **`04-portfolio/`** — 21 images (3 projects × 7)
  - **Hamptons Kitchen Newcastle** — `after`, `before`, `g01`–`g05`
  - **Walk-In Robe Sydney** — `after`, `before`, `g01`–`g05`
  - **Floating Vanity Byron Bay** — `after`, `before`, `g01`–`g05`
  - All `after`/`before`/`g01` shots are 1600×1000 (16:10).
  - All `g02`–`g05` gallery shots are 1200×800 (3:2).
  - Before/after pairs share identical aspect ratio per brief.

- **`06-og-social/`** — 1 image
  - `og-site-default.jpg` (1200×630, 1.91:1) — lower third naturally darker for white text overlay; no burned-in text.

- **`_raw/`** — original full-resolution PNGs (kept for re-crops, retouching, or higher-resolution exports).

## Specs

| File group | Dimensions | Aspect | Format |
| --- | --- | --- | --- |
| Workshop hero & portfolio hero/after/before/g01 | 1600×1000 | 16:10 | JPG q88 progressive |
| Workshop gallery (6) | 1600×1200 | 4:3 | JPG q88 progressive |
| Portfolio gallery g02–g05 | 1200×800 | 3:2 | JPG q88 progressive |
| OG default | 1200×630 | 1.91:1 | JPG q88 progressive |

## Brand anchor

All shots follow the master prompt:
- Premium Australian custom joinery (Newcastle NSW HQ)
- Materials: American oak, walnut, Tasmanian oak, Spotted Gum, 2-pac shaker, Caesarstone, Blum hardware
- Palette: warm ink browns (#1f1610–#453528), natural oak (#8b6b47), linen paper (#f7f1e8)
- Australian English context — Australian power points, tapware, proportions
- No watermarks, no logos, no faces, no burned-in text overlays, no fisheye

## Deployment

See `manifest.json` for the canonical `source → deployTo` mapping used by the build. Drop each JPG into the path indicated by `deployTo` in your Next.js `public/` tree.

## Notes from the shoot

- **`project-walk-in-robe-sydney-g03.jpg`** (full-height pivot mirror): the final composition reads as a diptych — a tighter left panel (mirror in oak surround) plus a secondary detail. If a single-panel mirror crop is required, re-export from `_raw/` with a square-side centre crop.
- All `before` shots were generated with the corresponding `after` shot supplied as a framing reference, locking lens/angle so the before/after slider crops line up.
- The brief asked for 16:10 and 1.91:1; raw generation supports 16:9. All JPGs have been centre-cropped + Lanczos-resized to the exact spec dimensions.
