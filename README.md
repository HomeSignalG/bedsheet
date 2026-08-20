# SWAP Bedding System — Website

A single-product, wholesale-focused company website for the patented SWAP
two-part bed sheet system: a fitted base that stays on the mattress and a
removable top sheet that snaps on and off in seconds.

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
| `/product` | Product (the header's Features link targets `/product#features`) |
| `/about` | About Us |
| `/contact` | Contact |
| `/legal` | Legal & Privacy Policy |

## Central configuration

All changeable business information lives in **`config/site.ts`**:

- Brand name, wordmark text, and tagline
- Logo (`logo.image` swaps in final artwork when it exists)
- Contact email
- Domain / base URL (placeholder — used for canonical URLs, Open Graph,
  robots.txt, and sitemap.xml)
- Founder name and title
- Patent statement — `patent.number` stays `null` until legal review
  supplies real patent details; a placeholder notice renders meanwhile
- Pocket-depth range (currently 10–22 inches) and the size table
- What's included per set
- Copyright holder and Legal "Last Updated" date
- Social links (icons render disabled until real URLs are added)

Update that one file and the change propagates across the site.

## Placeholder images

All photo slots use labeled placeholder assets in `public/images/` — see
`public/images/README.md` for what each file should depict when final
photography is available.

## Contact form

The form (`components/ContactForm.tsx`) validates on the client and posts to
`app/api/contact/route.ts`, which re-validates with the same shared schema
(`lib/contact.ts`). Selecting "Retail Buyer / Retail Partnership" reveals
optional buyer fields. Delivery is development-safe: submissions are only
logged to the server console via the adapter in `lib/contact-delivery.ts`. To
connect Supabase, Resend, Formspree, or another backend later, replace just
that adapter function. Spam-protection TODOs (honeypot, rate limiting, origin
check) are documented in the API route.
