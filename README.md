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
| `CONTACT_DELIVERY` | To submit the form | `smtp` to send through an ordinary mail server, `resend` to send through the Resend API, or `log` to print submissions to the server console. `log` is refused in production. |
| `CONTACT_FROM_EMAIL` | Always, to send | Address both emails are sent from. Under `smtp` it should be the mailbox the credentials belong to; under `resend` its domain must be verified in Resend. |
| `SMTP_HOST` | With `CONTACT_DELIVERY=smtp` | Mail server hostname, from the web host's mail settings. |
| `SMTP_USER` | With `CONTACT_DELIVERY=smtp` | Mailbox login — usually the full address. |
| `SMTP_PASSWORD` | With `CONTACT_DELIVERY=smtp` | Mailbox password. |
| `SMTP_PORT` | No | Defaults to `587` (STARTTLS). Use `465` for implicit TLS. |
| `SMTP_SECURE` | No | `true` forces implicit TLS, `false` forces STARTTLS. Inferred from the port when unset, which is right for almost every host. |
| `RESEND_API_KEY` | With `CONTACT_DELIVERY=resend` | Resend API key. |

With `CONTACT_DELIVERY` unset the form reports a failure and points the sender
at the contact email address. That is deliberate: a form that reports success
while dropping the message loses leads silently.

These are **runtime** variables read on each request, not build-time ones, so
they must be present in the environment the server actually runs under — and
the process needs a restart after they change. Setting them only at build time
leaves the form broken.

### Checking the configuration

`GET /api/contact` reports whether delivery can work, whichever backend is
selected — otherwise
invisible from outside: the form deliberately tells the sender nothing about
the server, so a missing `CONTACT_DELIVERY` and a rejected API key produce the
same message. It answers `200` when delivery is ready and `503` while it is
not, and reports only booleans — never a key or any other secret.

```console
$ curl https://backeasysheets.com/api/contact
{"ready":false,"deliveryMode":null,"resendApiKeySet":false,
 "contactFromEmailSet":false,"deliversTo":"info@backeasysheets.com",
 "problems":["CONTACT_DELIVERY is not set. Set it to \"resend\" so submissions are emailed."]}
```

`ready: true` means the variables are present and well-formed. It does not
prove the mail server will accept the send — a wrong password or an
unverified sending domain still fails at delivery time, and that shows up in
the server log as `[contact] delivery failed:`.

For that case, run the diagnostic on the server:

```bash
cd /path/to/the/deployed/site
node scripts/diagnose-contact-smtp.js
```

It prints the whole SMTP conversation, and — importantly — compares the
password as written in `.env.production` against the value the app actually
receives.

### Keep the SMTP password alphanumeric

`.env` files are parsed by dotenv, which gives some characters meaning:

| Line in `.env.production` | What the app receives |
| --- | --- |
| `SMTP_PASSWORD=hunter2#secret$x` | `hunter2` |
| `SMTP_PASSWORD='hunter2#secret$x'` | `hunter2#secret` |
| `SMTP_PASSWORD="hunter2#secret$x"` | `hunter2#secret` |
| `SMTP_PASSWORD=hunter2secretx99` | `hunter2secretx99` |

A `#` truncates the value from that point, and `$name` is expanded as a
variable reference and disappears — **inside quotes as well as outside**, so
quoting is not a fix. The mail server then answers `535 Invalid login or
password` while the file still reads correctly, which is close to
undiagnosable without the script above.

Use letters and digits only for the mailbox password.

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

Delivery goes through `lib/contact-delivery.ts`. Pick a backend with
`CONTACT_DELIVERY`:

- **`smtp`** sends through an ordinary mail server using the credentials the
  web host already provides for the site's own mailbox. No third-party account
  and no DNS changes, so it is usually the quickest way to get a working form.
  TLS is required: on the default port 587 the connection starts plaintext and
  must upgrade with STARTTLS, and a server that cannot upgrade fails rather
  than sending the password in the clear.
- **`resend`** sends through the Resend HTTP API. Needs an account and the
  sending domain verified there by DNS.

Nodemailer is listed in `serverExternalPackages` in `next.config.ts`. It opens
raw TLS sockets and resolves transports at runtime, which the Route Handler
bundler cannot follow; without that entry delivery fails at runtime with a
module-resolution error.

Either backend sends two emails per submission — both rendered by
`lib/contact-email.ts`:

1. **The notification**, to the contact address in `config/site.ts`. This is
   the message itself. Its `Reply-To` is the sender, so replying in the inbox
   answers them directly. It must succeed: if it fails, delivery throws, the
   route answers 5xx, and the form tells the sender their message did not go
   through. The route never reports success for a message it could not send.
2. **The confirmation**, to the address the sender typed in — their receipt,
   confirming the message went through and naming the address the answer will
   arrive at, with a `Reply-To` of the contact address. It is sent second and is
   best-effort: a failure is logged, not thrown. The lead is already in the
   inbox by then, and telling the sender "your message could not be sent" when
   it was would only produce a duplicate submission.

**The confirmation does not quote the submission back, and must not start.**
Nobody verifies the address typed into the form, so anything that email echoes
is text an attacker can aim at a stranger's inbox from the site's own sending
domain — a spam-complaint vector that costs far more than the copy is worth to
a sender who already knows what they wrote. The full submission goes to the
business inbox and nowhere else. `tests/contact-email.test.ts` guards this.

What sender-supplied text remains — the first name in the greeting — is capped
short and flattened to one line by `sanitizeHeader()`, and escaped in the HTML
part. The confirmation's subject is fixed rather than built from submitted
values. The same `sanitizeHeader()` bounds the notification subject, which
keeps it safe under any delivery backend, not just a JSON API.

Adding another backend (Supabase, Formspree, SES) means adding a branch in
`contact-delivery.ts` — no page, form, or email-copy changes.
