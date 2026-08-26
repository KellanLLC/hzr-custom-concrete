# HZR Custom Concrete

Site + backend for **Anthony Huizar / HZR Custom Concrete**, Ventura County,
California. Live at **https://hzrconcrete.com** on the Cloudflare Worker
`hzr-custom-concrete` (custom domain attached to the Worker).

The public site is the shipped Claude Design implementation, ported page-for-
page into Next.js 16 (App Router) and extended with the SEO pages; the backend
is the estimate → panel → review-request system, ported from Accent Welding.

```bash
cd site
npm install
npm run dev            # http://localhost:3000, panel password "dev"
npm run build          # typecheck + build
npx eslint src         # lint
node verify.mjs        # end to end: forms → D1 → panel → review → rating page
```

Deploy from the repo root (this is how the live Worker is shipped):

```bash
npx wrangler deploy
```

`wrangler.jsonc` at the root carries everything the deploy needs, including
the OpenNext build command. Local dev gets the same bindings via miniflare
from `wrangler.jsonc` + `.dev.vars` (gitignored).

## What is where

```
wrangler.jsonc        Worker config: D1, Durable Object clock, build command
db/schema.sql         D1 schema (idempotent; re-running never loses data)
site/src/config/      business.ts (every fact), services.ts, areas.ts, site.ts
site/src/app/(site)/  the public site: home, services/*, service-area/*, contact, faq
site/src/app/admin/   the panel
site/src/app/r/       the rating page behind every review text
site/src/app/api/     quote intake, the panel API, the rating POST
site/src/lib/server/  everything that touches D1 / the GoHighLevel webhook
site/src/worker/      the follow-up clock (Durable Object alarm, every 10 min)
```

## The panel (`/admin`)

Password-gated (the `ADMIN_PASSWORD` Worker secret), built for a phone.
**Requests**: every estimate submission, newest first — read it, call or text
the customer, set status, leave a private note, or text a review request with
the message prefilled. **Reviews**: the send history with what came back
(opened, star, feedback), plus a box for texting anyone who never used the
site. **Settings**: the owner number, every line of text the system sends, the
follow-up ladder (24h/24h/48h), the rating page switch + threshold, the review
destination link, a webhook mapping test, and the follow-up clock status.

**The review journey:** every text carries a tracked link to `/r/<token>`.
Tapping it stops the follow-ups. With the rating page on (default) they pick a
star: at/above the threshold they are forwarded to the review link; below it
they get a private box and the answer is texted to Anthony instead of going
public. If they never tap, follow-ups go out on day 1, 2 and 4, driven by a
Durable Object alarm (`SWEEPER`) that rings every ten minutes — the account is
at Cloudflare's 5-cron limit, hence the alarm. Note: asking for a star first is
review gating, which Google's policies prohibit; Settings → Rating page → off
makes the link forward straight through (still tracked), which is compliant.

**Texts** go out through a GoHighLevel inbound webhook (`GHL_WEBHOOK_URL`
secret; payload: `phone`, `sms-message`, `company`). Until it is set, sends log
as *failed* in the panel and nothing is lost.

**Spam trap:** hidden honeypot + keyword tells + an optional Gemini layer
(`GEMINI_API_KEY`), all failing open. Caught rows hide behind "Check spam
likely" in the panel footer; optionally reported to Discord
(`SPAM_WEBHOOK_URL`).

## Secrets

Set once from the repo root with `npx wrangler secret put <NAME>`:
`ADMIN_PASSWORD`, `SESSION_SECRET` (change to sign everyone out),
`GHL_WEBHOOK_URL`, and optional `GEMINI_API_KEY` / `SPAM_WEBHOOK_URL`.

## The licensing toggle

**No "licensed, bonded & insured" claim renders anywhere, on purpose.**
CSLB #1152971 (HZR CUSTOM CONCRETE, C-8, issued 04/03/2026, expires
04/30/2028) was verified against cslb.ca.gov on 26 Aug 2026 and is
**inactive** — "not able to contract at this time", pending a contractor's
bond and workers' comp. Advertising the claim while inactive would be false
advertising (a misdemeanor in California). When CSLB shows the licence
ACTIVE, flip `licensed: true` in `site/src/config/business.ts` — the trust
bar, the about facts and the footer line all switch to the licensed wording,
number included, at once.

## Provenance

Every photograph is Anthony's own work, from his Yelp and Instagram. All copy
facts come from his Instagram bio, his flyer, his Yelp listing, BBB and CSLB.
The three reviews are quoted as written, and they are every review the
business has. Type is [Excon](https://www.fontshare.com/fonts/excon)
(Fontshare licence), self-hosted; body text is `system-ui`.
