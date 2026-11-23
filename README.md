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

## YouTube and WhatsApp

The thank-you page embeds YouTube video `QhzArGq7zfM` using YouTube's privacy-enhanced domain and links its WhatsApp button to +977 9851074355 and the requested pre-filled message. `NEXT_PUBLIC_SITE_URL` remains the full production origin used for absolute Open Graph metadata; locally it defaults to http://localhost:3000.

## Flodesk submission

The consultation form renders the supplied Flodesk form `6b0410517ae5546b44e75d91` through Flodesk's official universal form loader. Flodesk handles subscriber creation, segment assignment, and enrollment in the workflow configured for that form. The site's visual styling and accessible validation are applied to the live fields so the existing layout remains unchanged. The static embed snapshot is not submitted verbatim because Flodesk rotates the CSRF token and real/decoy field names on each load; hard-coded field names can appear to submit successfully while Flodesk discards the request.

The browser validates full name, email, WhatsApp number, business name, website/Facebook URL, and message before submission. Flodesk owns subscriber creation, segment assignment, workflow enrollment, delivery, duplicate handling, and any confirmation behavior configured for this form. Keep the six fields in the same order in the Flodesk form; if its structure changes, update `fieldSettings` in `components/CTAForm.tsx` to match.

## Vercel deployment

1. Push the project to your Git provider and import it in Vercel.
2. Use the auto-detected Next.js framework preset; build command `npm run build`. No custom output directory is needed.
3. Set `NEXT_PUBLIC_SITE_URL` for the appropriate environments.
4. Deploy.

## Accessibility and behavior

Semantic headings and lists, visible keyboard focus, field labels, inline error associations, first-error focus, large tap targets, and reduced-motion support are included. The hero is the only entrance animation. Thank You metadata prevents indexing. No navigation, scarcity, statistics, testimonials, or extra marketing sections are included.

## Browser QA

`scripts/qa.cjs` checks both pages at 320, 375, 390, and 430 pixels, required-field and format errors, error focus, the exact Flodesk endpoint, the rotating CSRF token, randomized decoy fields, all six submitted values, the thank-you receipt, and the YouTube and WhatsApp integrations. Run a local server on port 3000 and execute with an installed Playwright package (`PLAYWRIGHT_MODULE=/absolute/path/to/playwright node scripts/qa.cjs`). It uses an installed Google Chrome browser; Playwright is a QA-only dependency and is not shipped with the site. The QA script intercepts the valid submission before it reaches Flodesk, so it cannot create a subscriber or trigger the live workflow.

The production dependency audit is clean. Tailwind 3's development dependency tree currently reports upstream parser/glob advisories; avoid processing untrusted CSS or glob patterns. These packages are build tools and are not part of the deployed browser runtime.
