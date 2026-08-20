# Placeholder image assets

Every file in this directory is a clearly labeled placeholder awaiting final
photography. To replace one, drop in the final image and either:

1. Keep the same filename (converting to `.jpg`/`.png`/`.webp` and updating
   the `src` path where the file is referenced), or
2. Update the `src` prop where the image is used.

All images are rendered through `components/PlaceholderImage.tsx`, so sizing
and lazy-loading behavior stays consistent when files are swapped.

| File | Used on | Depicts (final photo) |
| --- | --- | --- |
| `bedroom-navy.webp` | Home hero | Final photo (in place): Easy Top on a grey platform bed |
| `bedroom-warm.webp` | Product hero | Final photo (in place): Easy Top on a warm upholstered bed, snaps visible along the sheet edge |
| `bedroom-cream.webp` | _unused_ | Final photo, held for a future slot: Easy Top on a cream upholstered bed |
| `snap-closeup.webp` | Home "Remove" step | Final photo (in place): both snaps — sheet corner folded back over the base snap. Rendered at natural aspect so neither snap is cropped. |
| `laundry-basket.webp` | Home + Product "Wash" step | Final photo (in place): top sheet going into the washing machine. 600x480 — adequate at render size; a larger original would be sharper still on high-DPI screens. |
| `snap-corner-navy.webp` | Home + Product "Reattach" step | Final photo (in place): fitted-base corner with the sheet snapped over the grommet, shot over the navy rug. Natural aspect, uncropped. |
| `top-sheet-peel-back.webp` | Home lifestyle (Easier on Your Back) | Final photo (in place): lifting the top sheet off the snaps |
| `kid-changing-bed.webp` | Home lifestyle (Easy Enough for Kids) + Legal hero | Final photo (in place): a boy changing his own bed. Used on two pages. |
| `family-pet-bed.webp` | Home lifestyle (Made for Real Life) | Final photo (in place): girl and dog on the bed. Supplied with the heading, copy and icon baked into a left-hand column; that column was cropped off so the page renders its own live text. |
| `system-diagram-clean.webp` | Home two-part system | Final diagram (in place). Derived from the supplied graphic by masking out its baked-in heading, copy and callout labels and cropping to the illustration, so the page renders that text live and editable. |
| `product-hero.svg` | Product hero | Top sheet lifted at one corner above the base |
| `snap-system-taupe.webp` | Product feature card 1 (Secure Snap System) | Final photo (in place): snap stud and socket in taupe. Natural aspect, uncropped. |
| `snap-low-profile.webp` | Product feature card 2 (Smooth, Low Profile) | Final photo (in place): single snap at a raking angle showing how flush it sits. |
| `elastic-pocket.webp` | Product feature card 3 (Deep, Secure Pocket) | Final photo (in place): elasticized hem of the fitted base lifted at a mattress corner. |
| `snap-construction.webp` | Product feature card 4 (Quality Construction) | Final photo (in place): grommet and reinforced hem stitching held in hand. |
| `whats-included.svg` | Product | Folded top sheet stacked on folded base |
| `depth-mattress.svg` | Product spec sidebar | Mattress depth range visual |
| `about-hero-farmhouse.webp` | About hero | Final photo (in place): farmhouse bedroom with the system made up |
| `about-problem-bw.webp` | About story (The Problem) | Final photo (in place): black and white, woman struggling with a conventional fitted sheet |
| `about-solution-photo.webp` | About story (The Solution) | Final photo (in place): woman lifting the bottom sheet off the snaps with ease |
| `promise-hem.webp` | About (Our Promise) | Final photo (in place): hand holding the white sheet hem, grommet and stitching detail |
| `contact-hero.svg` | Contact hero | Made bed with top sheet turned down |
