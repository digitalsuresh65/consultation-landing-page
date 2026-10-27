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

## Flodesk submission

The consultation form submits to Flodesk form `6ae077d675c737372cf4391c` using Flodesk's official universal form handler. The existing page design is retained while the input names map to the Flodesk subscriber and custom fields from the supplied embed. Successful submissions use the redirect configured in Flodesk (`/thank-you`), which displays the production receipt message. A hidden `confirm_email_address` honeypot is included for bot filtering.

The browser validates full name, email, WhatsApp number, business name, website/Facebook URL, and message before submission. Flodesk owns subscriber creation, segment assignment, workflow enrollment, delivery, duplicate handling, and any confirmation behavior configured for this form. If those settings change, export the updated Flodesk embed and keep its form ID, field keys, and encoded configuration in sync with `components/CTAForm.tsx`.

## Vercel deployment

1. Push the project to your Git provider and import it in Vercel.
2. Use the auto-detected Next.js framework preset; build command `npm run build`. No custom output directory is needed.
3. Add the variables above for the appropriate environments; set the production site origin.
4. Deploy. When the video URL or number becomes available, add it and redeploy.

## Accessibility and behavior

Semantic headings and lists, visible keyboard focus, field labels, inline error associations, first-error focus, large tap targets, and reduced-motion support are included. The hero is the only entrance animation. Thank You metadata prevents indexing. No navigation, scarcity, statistics, testimonials, or extra marketing sections are included.

## Browser QA

`scripts/qa.cjs` checks both pages at 320, 375, 390, and 430 pixels, required-field and format errors, error focus, the exact Flodesk endpoint and field mapping, the thank-you receipt, and empty integration placeholders. Run a local server on port 3000 and execute with an installed Playwright package (`PLAYWRIGHT_MODULE=/absolute/path/to/playwright node scripts/qa.cjs`). It uses an installed Google Chrome browser; Playwright is a QA-only dependency and is not shipped with the site. The QA script intentionally never submits valid contact data, so it cannot create a real Flodesk subscriber or trigger the live workflow.

The production dependency audit is clean. Tailwind 3's development dependency tree currently reports upstream parser/glob advisories; avoid processing untrusted CSS or glob patterns. These packages are build tools and are not part of the deployed browser runtime.
