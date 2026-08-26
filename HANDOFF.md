# HZR Custom Concrete — backend handoff

The site at **hzrconcrete.com** is now the full app: the same shipped design,
plus the estimate → panel → review system ported from Accent Welding, plus the
SEO pages. This file is the list of what is done, what is wired to a switch,
and the small number of things only Anthony (or you) can supply.

## Done and live

- **Every form sends.** The two home-page estimate forms, the form on each of
  the 8 service pages, and the contact page all POST to `/api/quote`, land in
  the site's own D1 database, and appear in the panel instantly.
- **The panel** at `hzrconcrete.com/admin`: Requests (read, status, private
  note, one-tap review text), Reviews (history + what came back + stop
  follow-ups + text-anyone box), Settings (owner number, every message
  template, follow-up ladder, rating page, webhook test, clock status). Spam
  sits behind "Check spam likely" in the footer.
- **The review journey**: tracked `/r/<token>` links, tap-detection that stops
  follow-ups, the star screen, low stars diverted to a private box that texts
  Anthony, follow-ups on day 1 / 2 / 4 driven by a Durable Object clock that
  rings every ten minutes (this account is at Cloudflare's 5-cron limit).
- **SEO pages**: 8 service pages (`/services/…`), 10 town pages
  (`/service-area/…`) + hub, `/contact`, `/faq`, sitemap.xml, robots.txt,
  Service/FAQ structured data, canonical URLs on hzrconcrete.com.
- **Spam trap**: honeypot + keyword tells, failing open. The Gemini layer and
  Discord reporting switch on if you ever set `GEMINI_API_KEY` /
  `SPAM_WEBHOOK_URL`.

## What is left to supply

1. **The GoHighLevel workflow mapping** — the webhook URL is set as the
   `GHL_WEBHOOK_URL` secret and a mapping test was fired on 26 Aug 2026
   (GHL answered "Success: test request received"), so the inbound trigger
   already holds a sample carrying the three fields: `phone` (E.164),
   `sms-message`, `company` ("HZR Custom Concrete"). In GoHighLevel, map
   those fields in the workflow and publish it; from that moment every panel
   send is a real text. Panel → Settings → **Webhook test** fires another
   sample any time.

2. **A review destination** — panel → Settings → "Google review link". Blank
   today, so a happy customer sees a thank-you instead of being forwarded.
   Paste Anthony's Google Business Profile review link when he has one (his
   Yelp write-a-review URL also works, though Yelp's rules frown on asking).
   Worth knowing: the star-first screen is review gating, which Google
   prohibits; Settings → "Ask for a rating first" → off is the compliant mode
   and keeps the tap tracking.

3. **The licensing claim — leave OFF until CSLB says Active.** CSLB #1152971
   is verified as HZR's (C-8 Concrete, issued 04/03/2026, expires 04/30/2028)
   but is **inactive** pending a contractor's bond and workers' comp, so the
   site still makes no licensed/bonded/insured claim. When cslb.ca.gov shows
   ACTIVE, flip `licensed: true` in `site/src/config/business.ts` and deploy —
   the trust bar, about facts and footer all switch, number included.

## Housekeeping worth knowing

- **Deploys**: `npx wrangler deploy` from the repo root (the config carries
  the whole build). That is also how this deployment was made; the domain
  rides on the Worker, so every deploy is live the moment it finishes.
- **Secrets already set**: `ADMIN_PASSWORD` (the panel password — passed on
  separately, change it any time with `npx wrangler secret put
  ADMIN_PASSWORD`) and `SESSION_SECRET` (rotate to sign everyone out).
- **The old static files** (`index.html`, `site.js`, root `fonts/`,
  `images/`) were the previous deployment and are preserved in git history;
  the live copies now live in `site/public/` and the page markup in
  `site/src/app/(site)/page.tsx`.
- **Local dev**: `cd site && npm run dev`, panel password `dev`, texts go to
  a local echo route. `node verify.mjs` drives everything end to end.
