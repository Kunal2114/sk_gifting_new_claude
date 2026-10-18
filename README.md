# SK Corporate Gifting website

Next.js 14 (App Router) + Tailwind CSS. Deploys on Vercel straight from Git.

**Pages:** Home · Products · Product detail (one per product) · Request a quote (enquiry basket + form) · Contact · Privacy
**Includes:** per-page SEO, sitemap + robots, structured data (LocalBusiness, Product, FAQ), WhatsApp button, mobile menu, Vercel Analytics.

## Run locally
```bash
npm install
cp .env.example .env.local     # then fill in (see "Enquiries" below)
npm run dev                    # http://localhost:3000
```

## Where to edit things
| What | File |
|---|---|
| Phone, email, address, GSTIN, hours | `config/site.js` |
| Products (name, text, features, image) | `data/products.js` |
| Home page steps, occasions, "why us", FAQ | `data/content.js` |
| Client logos / testimonials (hidden until filled) | `config/site.js` (`clients`, `testimonials`) |
| Colours and fonts | `tailwind.config.js` |

**Add a product:** drop a 4:5 image (e.g. 1000x1250) into `public/images/products/`, add an object to `data/products.js`. The product page, sitemap entry and enquiry option appear automatically.

## Enquiries (important)
The quote form posts to `/api/enquiry`. Configure **at least one** delivery method in Vercel → Project → Settings → Environment Variables (the form shows a friendly error if neither is set, so enquiries are never lost silently):

1. **Supabase** – run `supabase/enquiries.sql` in the SQL editor, then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server-only key).
2. **Email via Resend** – set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` (sender must be on a domain verified in Resend).

You can use both. Test with a real submission after deploying.

## Deploy
1. Push this folder's contents to your Git repo (replace the old site on a **branch first**, e.g. `redesign`).
2. Vercel gives that branch a **Preview URL**. Review it on phone and desktop.
3. Add the environment variables above (Preview + Production).
4. Merge to `main` when happy; Vercel deploys to skgiftsco.in.

## Before you go live: checklist
- [ ] Confirm phone, address and GSTIN in `config/site.js`.
- [ ] Confirm product specs / branding options in `data/products.js` match what you can supply.
- [ ] Confirm you are authorised to name Samsonite / American Tourister (trolley page text).
- [ ] Confirm you have the right to use each product photo commercially.
- [ ] The product photos are mock-ups showing the SK logo on stock items. Swap in photos of your real samples when you have them.
- [ ] Submit a test enquiry and confirm it reaches you.
- [ ] Have the privacy page reviewed for your needs.
- [ ] Add your Google Business Profile and submit `/sitemap.xml` in Google Search Console.
