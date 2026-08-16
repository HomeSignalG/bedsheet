# [BRAND NAME] — Two-Part Bed-Sheet System Website

A single-product, wholesale-focused company website for a patented two-part
bed-sheet system: a fitted base that stays installed on the mattress and a
removable sleeping surface that comes off for washing.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS**.

## Run it locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

## Checks

```bash
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript
npm run build       # Production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/product` | Product |
| `/about` | About Us |
| `/contact` | Contact |
| `/legal` | Legal & Privacy Policy |

## Central configuration

All changeable business information lives in **`config/site.ts`**:

- Company / brand name (currently the `[BRAND NAME]` placeholder)
- Logo (text placeholder now; set `logo.image` when a real logo exists)
- Contact email (placeholder)
- Domain / base URL (placeholder — used for canonical URLs, Open Graph,
  robots.txt, and sitemap.xml)
- Patent notices (placeholders — no patent number is published until legal
  review supplies one)
- Pocket-depth range (currently 8–22 inches)
- What's included per set
- Copyright holder and Legal "Last Updated" date
- Social links (empty for now)

Update that one file and the change propagates across the site.

## Placeholder images

All placeholder assets live in `public/images/` — see
`public/images/README.md` for what each file should depict when final
photography is available.

## Contact form

The form (`components/ContactForm.tsx`) validates on the client and posts to
`app/api/contact/route.ts`, which re-validates with the same shared schema
(`lib/contact.ts`). Delivery is development-safe: submissions are only logged
to the server console via the adapter in `lib/contact-delivery.ts`. To connect
Supabase, Resend, Formspree, or another backend later, replace just that
adapter function. Spam-protection TODOs (honeypot, rate limiting, origin
check) are documented in the API route.
