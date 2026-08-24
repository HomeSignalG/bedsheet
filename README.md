# BackEasy Sheets Bedding System — Website

A single-product, wholesale-focused company website for the patented BackEasy Sheets
two-part bed sheet system: a fitted base that stays on the mattress and a
removable bottom sheet that snaps on and off in seconds.

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
npm test            # Unit tests (node:test)
npm run build       # Production build
```

All four run on every push and pull request — see `.github/workflows/ci.yml`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/product` | Product (`#features` deep-links to the feature cards) |
| `/about` | About Us |
| `/contact` | Contact |
| `/legal` | Legal & Privacy Policy |

A custom `not-found.tsx` handles everything else.

## Environment variables

Nothing is required to run the site locally; the contact form is the only
part that needs configuration.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public origin, no trailing slash. Overrides the production default in `config/site.ts` — set it on preview and staging deploys so canonical URLs and the sitemap point at the right host. |
| `CONTACT_DELIVERY` | To submit the form | `resend` to send email, or `log` to print submissions to the server console. `log` is refused in production. |
| `RESEND_API_KEY` | With `CONTACT_DELIVERY=resend` | Resend API key. |
| `CONTACT_FROM_EMAIL` | With `CONTACT_DELIVERY=resend` | Verified sender address. |

With `CONTACT_DELIVERY` unset the form reports a failure and points the sender
at the contact email address. That is deliberate: a form that reports success
while dropping the message loses leads silently.

## Central configuration

All changeable business information lives in **`config/site.ts`**:

- Brand name, wordmark text, and tagline
- Logo (`logo.image` swaps in final artwork when it exists)
- Contact email — the footer's mail link and the delivery adapter both read it
- Production domain (overridable per environment, see above)
- Founder name and title
- Patent statements — every patent claim the site makes lives under `patent`,
  so legal review changes them in one place. `patent.number` stays `null`
  until legal review supplies real patent details; a placeholder notice
  renders meanwhile
- Available mattress-depth range (currently 10–22 inches) and the size table
- Contents of one complete system
- Privacy facts the policy text is generated from — `privacy.usesCookies`
  keeps the cookie section honest, so flip it before adding analytics or any
  third-party script
- Copyright holder and Legal "Last Updated" date
- Social links (icons render disabled until real URLs are added)

Update that one file and the change propagates across the site, including the
JSON-LD in `components/StructuredData.tsx`.

## Metadata

Pages build their metadata through `pageMetadata()` in `lib/metadata.ts`
rather than exporting a bare `metadata` object. Next merges metadata one
top-level key at a time, so a page that declares its own `openGraph` replaces
the layout's — silently dropping `siteName`, `type` and `locale`. The helper
keeps those on every route.

The share card is generated at build time by `app/opengraph-image.tsx`.

## Images

All photo slots live in `public/placeholders/` — see `public/placeholders/README.md`
for what each file depicts. Approved photography that no page references yet
lives in `assets/photography/`, which is not served.

Images render through `components/PlaceholderImage.tsx`. Pass `sizes` wherever
an image renders narrower than the viewport, and `bare` wherever `className`
already sets width or height — two competing Tailwind utilities for the same
property resolve by stylesheet order, not by which was written last.

Page heroes declare their photograph once as a `Photo` constant and share it
between the small-screen and large-screen renderings, so the alt text cannot
drift between them. `components/HeroPhoto.tsx` draws the large-screen half and
positions any overlay against the photograph itself rather than the panel it
is letterboxed within.

## Contact form

The form (`components/ContactForm.tsx`) validates on the client and posts to
`app/api/contact/route.ts`, which re-validates with the same shared schema
(`lib/contact.ts`). Selecting "Retail Buyer / Retail Partnership" reveals
optional buyer fields.

The route is protected by an origin check, a per-IP rate limit
(`lib/rate-limit.ts`), a decoy field, and a 64 KB body cap. The rate limiter
is per server instance; back it with Redis or KV if the site is deployed
across several.

Delivery goes through `lib/contact-delivery.ts`. Adding another backend
(Supabase, Formspree, SES) means adding a branch there — no page or form
changes. Delivery either succeeds or throws; the route never reports success
for a message it could not send.
