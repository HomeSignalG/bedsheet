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
| `wash-basket.webp` | Home + Product "Wash" step | Photo in place, but only 150x120px — soft at render size and clearly blurry on high-DPI screens. Replace with a full-resolution original (1200px wide or more) when available. |
| `snap-corner-navy.webp` | Home + Product "Reattach" step | Final photo (in place): fitted-base corner with the sheet snapped over the grommet, shot over the navy rug. Natural aspect, uncropped. |
| `top-sheet-peel-back.webp` | Home lifestyle (Easier on Your Back) | Final photo (in place): lifting the top sheet off the snaps |
| `kid-changing-bed.webp` | Home lifestyle (Easy Enough for Kids) | Final photo (in place): a boy changing his own bed |
| `family-pet-bed.webp` | Home lifestyle (Made for Real Life) | Final photo (in place): girl and dog on the bed. Supplied with the heading, copy and icon baked into a left-hand column; that column was cropped off so the page renders its own live text. |
| `system-diagram.webp` | Home two-part system | Final diagram (in place). Carries its own heading, copy and TOP SHEET / FITTED BASE / MATTRESS labels, so the page renders that text screen-reader-only instead of on screen. |
| `product-hero.svg` | Product hero | Top sheet lifted at one corner above the base |
| `feature-snap-system.svg` | Product features | Snap fasteners along the sheet edge |
| `feature-snap-profile.svg` | Product features | Smooth low-profile snaps close-up |
| `feature-pocket.svg` | Product features | Fitted base pocket on a mattress corner |
| `feature-construction.svg` | Product features | Reinforced stitching close-up |
| `whats-included.svg` | Product | Folded top sheet stacked on folded base |
| `depth-mattress.svg` | Product spec sidebar | Mattress depth range visual |
| `about-hero.svg` | About hero | Founder seated on a made bed |
| `about-problem.svg` | About story | Struggling with a traditional fitted sheet |
| `about-solution.svg` | About story | Easy Top on a made bed (reserved) |
| `promise-sheets.svg` | About promise | Folded Easy Top set |
| `founder-portrait.svg` | About founder | Founder portrait |
| `contact-hero.svg` | Contact hero | Made bed with top sheet turned down |
