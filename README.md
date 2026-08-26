# HZR Custom Concrete

Site for **Anthony Huizar / HZR Custom Concrete**, Ventura County, California.
Implemented from the Claude Design project ("HZR Site.dc.html") as a fully
static page: one `index.html`, one small `site.js`, self-hosted images and
fonts. No build step, no dependencies, nothing fetched at runtime except the
Google Maps embed in the service-area section.

## Deploying on Cloudflare

Cloudflare Pages (or Workers Assets): connect this repository, framework
preset **None**, build command **none**, output directory **`/`** (repo root).
That's it — every file is served as-is.

## The licensing toggle

**No "licensed, bonded & insured" claim appears on the page right now, on
purpose.** The BBB listing for the business carries an alert for failure to
have a required competency licence, so shipping that claim without a verified
CSLB number would be a real legal problem for Anthony (advertising as licensed
while unlicensed is a misdemeanor in California).

The design's licensing copy is all still here, behind a switch: put the real,
verified CSLB number into `CSLB_NUMBER` at the top of [site.js](site.js) and
the trust bar, the about facts, and the footer line all switch to the licensed
wording at once. Verify at cslb.ca.gov or (800) 321-2752 first.

## Forms

Both estimate forms validate and show a thank-you client-side; nothing is sent
anywhere yet. To make them reach Anthony, point the submit at a Cloudflare
Worker (email via a provider, or Twilio for SMS) or any form-relay service —
the markup needs no change.

## Type

[Excon](https://www.fontshare.com/fonts/excon) (Fontshare licence),
self-hosted in `fonts/`. Body text is `system-ui`.

## Provenance

Every photograph is Anthony's own work, from his Yelp and Instagram. All copy
facts (phone, hours, reviews, ASL proficiency, payment methods, May 2024 start)
come from his Instagram bio, his flyer, his Yelp listing, and BBB. The three
reviews are quoted as written, and they are every review the business has.
