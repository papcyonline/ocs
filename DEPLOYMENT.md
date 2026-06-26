# Deployment & SEO Launch Checklist

Production target: **https://ottri.net**

Last verified: `next build` passes — 21 routes, all service/location pages
statically prerendered, no type or lint errors.

---

## 1. Before you deploy

- [ ] **Set production environment variables** (see `.env.example` for the full
      list and setup notes). On Vercel: Project → Settings → Environment
      Variables. Required for full functionality:
  - [ ] `RESEND_API_KEY` — contact/quote form emails (verify the `ottri.net`
        domain in Resend first)
  - [ ] `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` — booking SMS /
        WhatsApp notifications
  - [ ] `GOOGLE_SITE_VERIFICATION` — leave blank for now; filled in step 3
  - [ ] `BING_SITE_VERIFICATION` — optional
- [ ] **Confirm the canonical domain.** The site URL is hardcoded in
      `lib/site.ts` (`url: "https://ottri.net"`). All canonicals, the sitemap,
      OG tags, and structured data derive from it. If the production domain
      changes, update it there.
- [ ] **Run the build locally** to catch issues before pushing:
      `npm run build`
- [ ] **Point the domain.** DNS for `ottri.net` → your host. Decide whether
      `www` redirects to apex (or vice-versa) and keep it consistent with the
      canonical URL above.
- [ ] **Force HTTPS** (automatic on Vercel/Netlify).

## 2. Deploy

- [ ] Push to the production branch / run the deploy.
- [ ] Confirm the live site loads over `https://ottri.net`.
- [ ] Spot-check these routes return 200 on production:
  - `/`, `/quote`, `/faq`
  - `/services/residential-cleaning` (+ commercial, post-construction)
  - `/cleaning/highlands` (+ downtown, st-matthews, east-end, south-louisville)
  - `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon`
  - `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest`, `/apple-icon`

## 3. Google Search Console (do this first — it's the priority)

- [ ] Go to https://search.google.com/search-console → **Add property** →
      enter `ottri.net`.
- [ ] Choose the **HTML tag** method and copy only the `content="..."` value.
- [ ] Set `GOOGLE_SITE_VERIFICATION` to that value in production env vars and
      **redeploy**.
- [ ] Click **Verify** in Search Console.
- [ ] Submit the sitemap: Sitemaps → enter `sitemap.xml`.
- [ ] Use **URL Inspection** to request indexing for `/` and the three service
      pages.

## 4. Validate the SEO/structured data on production

- [ ] **Rich Results Test** (https://search.google.com/test/rich-results) —
      run it against:
  - The homepage → expect `LocalBusiness` (CleaningService) + `WebSite` +
    `HowTo` (the "How it works" steps)
  - `/faq` → expect `FAQPage` (with all questions)
  - A service page → expect `Service` + `FAQPage` + `BreadcrumbList`
  - A neighborhood page → expect `Service` + `FAQPage` + `BreadcrumbList`
- [ ] **Schema Markup Validator** (https://validator.schema.org) — paste a URL,
      confirm no errors.
- [ ] **Social preview** — paste the homepage URL into the
      [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
      and confirm the generated OG image + title render. (Twitter/X card uses
      the same image.)
- [ ] **Mobile-Friendly / Core Web Vitals** — check PageSpeed Insights
      (https://pagespeed.web.dev) for the homepage.

## 5. Google Business Profile (biggest local-ranking lever)

- [ ] Create/claim the **Google Business Profile** for Ottri Cleaning Services
      (https://business.google.com). This is what powers the local "map pack".
- [ ] Ensure **NAP consistency** — name, address, phone must match the site
      exactly:
  - Name: `Ottri Cleaning Services`
  - Phone: `502-390-7925`
  - Service area: Greater Louisville, KY (set GBP as a service-area business)
- [ ] Add the same services and service areas (the 5 neighborhoods) in GBP.
- [ ] Link the website to `https://ottri.net`.

## 6. Optional but recommended

- [ ] **Bing Webmaster Tools** (https://www.bing.com/webmasters) — add the
      property, set `BING_SITE_VERIFICATION`, submit the sitemap. Also feeds
      ChatGPT search.
- [ ] **Analytics** — add a privacy-friendly analytics tag (e.g. Vercel
      Analytics or Plausible) to track traffic and conversions.
- [ ] Submit the site to relevant local directories (Yelp, BBB, Angi) with
      identical NAP for citation consistency.

---

## Pending — data only the owner can provide

These are wired in code and will activate the moment the values are filled in
`lib/site.ts`. They are **not** blocking deployment.

- [ ] **Social profile URLs** (`site.social`) — replace the `"#"` placeholders
      with real Facebook / Instagram / X / LinkedIn URLs. This populates the
      `sameAs` array in structured data (helps entity/knowledge-graph
      association) and activates the footer social icons.
- [ ] **Review count** (`site.rating.count`) — set to the real combined number
      of Google + Yelp reviews. Until then, `AggregateRating` is intentionally
      omitted from schema to avoid a Google manual penalty. Once set, star
      ratings become eligible to show in search results.
  - ⚠️ The count and rating must match what is publicly verifiable on the
        Google Business Profile and Yelp page.
- [ ] **Customer review text** — real testimonials enable `Review` schema and
      would replace the current "promises" carousel in `components/Testimonials.tsx`.

## What is already live (no action needed)

- Per-page metadata, canonical URLs, Open Graph + Twitter cards (OG image on
  every page, including service and neighborhood pages)
- Dynamically generated OG share image, favicon, and Apple touch icon
- Web app manifest + theme color
- Structured data: LocalBusiness/CleaningService, WebSite, HowTo, Service,
  FAQPage, BreadcrumbList, Place
- `sitemap.xml` (14 content URLs) and `robots.txt` (AI crawlers explicitly
  allowed — edit `app/robots.ts` to opt out of AI use)
- `llms.txt` + `llms-full.txt` for LLM/answer-engine ingestion (generated from
  the same data as the pages, so they never drift)
- 3 service landing pages + 5 neighborhood landing pages, fully cross-linked
- Search Console / Bing verification slots (env-driven)
