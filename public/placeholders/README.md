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

| File | Used on | Depicts (final photo) |
| --- | --- | --- |
| `bedroom-navy.webp` | Home hero | Final photo (in place): BackEasy Sheets on a grey platform bed |
| `bedroom-warm.webp` | Product hero | Final photo (in place): BackEasy Sheets on a warm upholstered bed, snaps visible along the sheet edge |
| `bedroom-cream.webp` | _unused_ | Final photo, held for a future slot: BackEasy Sheets on a cream upholstered bed |
| `snap-closeup.webp` | Home "Remove" step + Product "Unsnap" step | Final photo (in place): both snaps — sheet corner folded back over the base snap. 1054x1492 WebP, retouched. Rendered at natural aspect so neither snap is cropped. |
| `laundry-basket.webp` | Home + Product "Wash" step | Final photo (in place): bottom sheet lifted from the laundry basket into the washing machine. 1015x1550 WebP — high-DPI sharp, and portrait like the other two step photos. |
| `snap-corner-navy.webp` | Home + Product "Reattach" step | Final photo (in place): fitted-base corner with the sheet snapped over the grommet, shot over the navy rug. Natural aspect, uncropped. |
| `top-sheet-peel-back.webp` | Home lifestyle (Easier on Your Back) | Final photo (in place): lifting the top sheet off the snaps |
| `kid-changing-bed.webp` | Home lifestyle (Easy Enough for Kids) + Contact hero + Legal hero | Final photo (in place): a boy changing his own bed. Used on three pages. |
| `family-pet-bed.webp` | Home lifestyle (Made for Real Life) | Final photo (in place): girl and dog on the bed. Supplied with the heading, copy and icon baked into a left-hand column; that column was cropped off so the page renders its own live text. |
| `system-diagram-clean.webp` | Home two-part system | Final diagram (in place). Derived from the supplied graphic by masking out its baked-in heading, copy and callout labels and cropping to the illustration, so the page renders that text live and editable. The supplied graphic ran out of canvas before the foundation closed, so the bottom of that box — its front corner and third leg — was drawn back in from the surrounding line work; the layers, the callout dots and their leader lines are untouched. The three leader lines leave the right edge at 8.58%, 24.38% and 45.88% of the image height, which is what the Home callouts are pinned to. |
| `product-hero.svg` | Product hero | Top sheet lifted at one corner above the base |
| `snap-system-taupe.webp` | Product feature card 1 (Secure Snap System) | Final photo (in place): snap stud and socket in taupe. Shot portrait (296x461) where the other three feature photos are 4:3, so the margin either side was extended to 615x461 — the photo's own edge columns stretched out, blurred and desaturated with distance — and the frame itself is untouched. Lets the four cards render at one size without cropping any of them. |
| `snap-low-profile.webp` | Product feature card 2 (Smooth, Low Profile) | Final photo (in place): single snap at a raking angle showing how flush it sits. |
| `elastic-pocket.webp` | Product feature card 3 (Deep, Secure Pocket) | Final photo (in place): elasticized hem of the fitted base lifted at a mattress corner. Shot portrait (1086x1448) and extended the same way as `snap-system-taupe.webp`, to 1931x1448, so it fills the shared 4:3 card tile uncropped. |
| `snap-construction.webp` | Product feature card 4 (Quality Construction) | Final photo (in place): grommet and reinforced hem stitching held in hand. |
| `whats-included.svg` | _unused_ | Folded top sheet stacked on folded base |
| `about-hero-farmhouse.webp` | About hero | Final photo (in place): farmhouse bedroom with the system made up |
| `about-problem-bw.webp` | About story (The Problem) | Final photo (in place): black and white, woman struggling with a conventional fitted sheet |
| `about-solution-photo.webp` | About story (The Solution) | Final photo (in place): woman lifting the bottom sheet off the snaps with ease |
| `promise-hem.webp` | About (Our Promise) | Final photo (in place): hand holding the white sheet hem, grommet and stitching detail |
| `contact-hero.svg` | _unused_ | Made bed with top sheet turned down. The Contact hero now runs `kid-changing-bed.webp`. |
