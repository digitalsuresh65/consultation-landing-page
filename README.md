# A&A Fashion Boutique consultation

Next.js App Router, TypeScript, Tailwind CSS. All page and component source is in `app/` and `components/`; colors are centralized in `tailwind.config.ts`. The supplied transparent logo is copied into `public/logo.png` and rendered with `next/image` on a maroon badge. Headlines use Cormorant Garamond; body copy uses Manrope through `next/font` (downloaded at build time and self-hosted).

## Local setup

Requires Node.js 20.9 or later.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Run `npm run typecheck` and `npm run build` to validate. `npm start` serves the production build.

## Vimeo and WhatsApp

Add these to `.env.local`, or to the project's Vercel environment variables:

- `NEXT_PUBLIC_VIMEO_URL`: the HTTPS Vimeo video URL, including an unlisted privacy hash if supplied by Vimeo. Supports `vimeo.com/<id>`, `vimeo.com/<id>/<hash>`, and `player.vimeo.com/video/<id>?h=<hash>`. Enable embedding in Vimeo privacy settings. Autoplay is disabled.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: your real international WhatsApp number, country code first, digits only (an initial `+` is also accepted). No spaces or punctuation. The link includes the requested pre-filled message.
- `NEXT_PUBLIC_SITE_URL`: the full production origin, used for absolute Open Graph metadata. Locally it defaults to http://localhost:3000.

Blank or invalid configuration renders clearly labeled dashed placeholders. No fake number or video is included. Restart development or rebuild/redeploy after changing environment variables. Public-prefixed variables are public: do not put secrets in them.

## Demo submission and real backend

The form validates required fields, email, WhatsApp format, and an optional HTTP(S) URL, then simulates a delay and redirects to `/thank-you?demo=1&name=...`. It sends and saves **no form data**. Only a first name is placed in the URL for personalization; it may appear in browser history. The form and demo confirmation explicitly disclose this. Visiting `/thank-you` directly does not claim a request was received.

The demo modifies the provided confirmation wording to prevent implying receipt by the boutique or promising a follow-up that cannot occur. The real-receipt component in `components/ReceiptConfirmation.tsx` contains the exact requested production copy and is deliberately not used until receipt can be verified.

To connect a backend:

1. Replace the commented simulated delay in `components/CTAForm.tsx` with a POST to your real API (for example an App Router `app/api/consultations/route.ts`). Never expose API credentials in client code.
2. Validate on the server as well as the client; add rate limiting and suitable abuse protection. Save or deliver the request successfully before returning success.
3. On errors, show an inline status message, reset the loading state, and retain the values for retry. Only redirect after a successful response.
4. Have the API issue a signed, short-lived receipt or an opaque receipt ID, and verify it server-side on the Thank You page. Do not trust a query parameter such as `success=1` as proof of receipt. Render `ReceiptConfirmation` only for a verified receipt, using its submitted first name for the headline. Remove the demo notice once actual receipt is implemented.
5. Personal data should be handled under your published privacy policy before accepting real submissions.

## Vercel deployment

1. Push the project to your Git provider and import it in Vercel.
2. Use the auto-detected Next.js framework preset; build command `npm run build`. No custom output directory is needed.
3. Add the variables above for the appropriate environments; set the production site origin.
4. Deploy. When the video URL or number becomes available, add it and redeploy.

## Accessibility and behavior

Semantic headings and lists, visible keyboard focus, field labels, inline error associations, first-error focus, large tap targets, and reduced-motion support are included. The hero is the only entrance animation. Thank You metadata prevents indexing. No navigation, scarcity, statistics, testimonials, or extra marketing sections are included.

## Browser QA

`scripts/qa.cjs` checks both pages at 320, 375, 390, and 430 pixels, required-field and format errors, error focus, successful demo redirect, personalization, and empty integration placeholders. Run a local server on port 3000 and execute with an installed Playwright package (`PLAYWRIGHT_MODULE=/absolute/path/to/playwright node scripts/qa.cjs`). It uses an installed Google Chrome browser; Playwright is a QA-only dependency and is not shipped with the site. Synthetic contact values exist only in this local test script.

The production dependency audit is clean. Tailwind 3's development dependency tree currently reports upstream parser/glob advisories; avoid processing untrusted CSS or glob patterns. These packages are build tools and are not part of the deployed browser runtime.
