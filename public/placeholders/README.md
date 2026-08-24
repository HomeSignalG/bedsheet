# Placeholder image assets

Every file in this directory is a clearly labeled placeholder awaiting final
photography. To replace one, drop in the final image and either:

1. Keep the same filename (converting to `.jpg`/`.png`/`.webp` and updating
   the `src` path where the file is referenced), or
2. Update the `src` prop where the image is used.

All images are rendered through `components/PlaceholderImage.tsx`, so sizing
and lazy-loading behavior stays consistent when files are swapped. Photos are
never cropped to their tiles — they scale to fit inside them — so a row of
tiles only lines up when every photo in it shares one aspect ratio. When a
supplied shot does not, extend it rather than cropping it back:

    python3 scripts/pad-to-aspect.py in.webp public/placeholders/out.webp 4 3

That keeps the whole frame and builds the new margin out of the photo's own
edges. Note what was done in the file's row below.

Everything under `public/` is deployed verbatim, so this directory holds only
photographs a page actually references. Approved shots that are not placed yet
live in `assets/photography/`, which is not served.

| File | Used on | Depicts (final photo) |
| --- | --- | --- |
| `bedroom-navy.webp` | Home hero | Final photo (in place): BackEasy Sheets on a grey platform bed |
| `bedroom-warm.webp` | Product hero | Final photo (in place): BackEasy Sheets on a warm upholstered bed, snaps visible along the sheet edge |
| `snap-closeup.webp` | Home "Remove" step + Product "Unsnap" step | Final photo (in place): both snaps — sheet corner folded back over the base snap. 1054x1492 WebP, retouched. Scales to fit its tile, so neither snap is cropped. |
| `laundry-basket.webp` | Home + Product "Wash" step | Final photo (in place): bottom sheet lifted from the laundry basket into the washing machine. 1015x1550 WebP — high-DPI sharp, and portrait like the other two step photos. |
| `snap-corner-navy.webp` | Home + Product "Reattach" step | Final photo (in place): fitted-base corner with the sheet snapped over the grommet, shot over the navy rug. Natural aspect, uncropped. |
| `top-sheet-peel-back.webp` | Home lifestyle (Easier on Your Back) | Final photo (in place): a woman lifting the bottom sheet off the nickel grommets. Supplied file installed as-is at 1515x1038 WebP, replacing the earlier 1516x1038 version — not recropped or re-encoded, so it is byte-for-byte what was handed over. Renders `object-contain` in the 4:3 lifestyle tile, so the wider frame letterboxes rather than cropping. |
| `kid-changing-bed.webp` | Home lifestyle (Easy Enough for Kids) | Final photo (in place): a boy changing his own bed. |
| `family-pet-bed.webp` | Home lifestyle (Made for Real Life) | Final photo (in place): girl and dog on the bed, nickel grommet visible at the sheet corner. Supplied square (1254x1254) where the lifestyle tiles are 4:3, so the margin either side was extended to 1672x1254 with `scripts/pad-to-aspect.py` — the photo's own edge columns stretched out, blurred and desaturated with distance — and the frame itself is untouched, so the tile fills without cropping the shot. |
| `system-diagram-full.webp` | Home two-part system | Final diagram (in place). Derived from the supplied graphic by masking out its baked-in heading, copy and callout labels and cropping to the illustration, so the page renders that text live and editable. The supplied graphic ran out of canvas before the foundation closed, so the bottom of that box — its front corner and third leg — was drawn back in from the surrounding line work; the layers, the callout dots and their leader lines are untouched. The three leader lines leave the right edge at 8.58%, 24.38% and 45.88% of the image height, which is what the Home callouts are pinned to. Renamed from `system-diagram-clean.webp` when the full artwork replaced the cropped one, so no cache can keep serving the old file under the old URL. |
| `snap-system-taupe.webp` | Product feature card 1 (Secure Snap System) | Final photo (in place): snap stud and socket in taupe. Shot portrait (296x461) where the other three feature photos are 4:3, so the margin either side was extended to 615x461 — the photo's own edge columns stretched out, blurred and desaturated with distance — and the frame itself is untouched. Lets the four cards render at one size without cropping any of them. |
| `snap-low-profile.webp` | Product feature card 2 (Smooth, Low Profile) | Final photo (in place): single snap at a raking angle showing how flush it sits. |
| `elastic-pocket.webp` | Product feature card 3 (Deep, Secure Pocket) | Final photo (in place): elasticized hem of the fitted base lifted at a mattress corner. Shot portrait (1086x1448) and extended the same way as `snap-system-taupe.webp`, to 1931x1448, so it fills the shared 4:3 card tile uncropped. |
| `snap-construction.webp` | Product feature card 4 (Quality Construction) | Final photo (in place): grommet and reinforced hem stitching held in hand. |
| `about-hero-farmhouse.webp` | About hero | Final photo (in place): farmhouse bedroom with the system made up |
| `about-problem-bw.webp` | About story (The Problem) | Final photo (in place): black and white, woman struggling with a conventional fitted sheet |
| `about-solution-photo.webp` | About story (The Solution) | Final photo (in place): woman lifting the bottom sheet off the snaps with ease |
| `promise-hem.webp` | About (Our Promise) + Legal hero | Final photo (in place): hand holding the white sheet hem, grommet and stitching detail |
| `contact-hero-bedroom.webp` | Contact hero | Final photo (in place): the system made up on a cream upholstered bed in a sunlit bedroom, snaps visible along the top-sheet edge. Supplied 1536x1024 (3:2) and used as shot — the hero scales it to fit, so nothing is cropped. |
