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

## What the page does

Four behaviours live in [site.js](site.js); everything else is CSS.

- **The header** sits transparent over the hero and turns into a solid bar
  past 60px of scroll, shrinking the lockup as it goes.
- **Below 1041px** the nav folds into a menu behind the button in the header,
  and the hero's quick-estimate card is replaced by a link down to the full
  form. The menu button only appears once the script has run, so with no
  JavaScript the links simply stay out in the bar — nothing is stranded
  behind a control that cannot open.
- **The sticky call bar** stays up the whole way down and steps aside for the
  hero and the estimate form, which carry their own calls to action. It reads
  the scroll position directly rather than through an observer, so it can
  never be left offstage by an event that never fires, and it goes
  `visibility: hidden` when away so it leaves the tab order with it. The band
  it lands on is reserved under the footer, so it never crops the wordmark.
- **Both estimate forms** validate and show a thank-you.

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

## Where this departs from the design file

Deliberate, and all in the same direction — the design is a mockup, this is
the live page:

- **Licensing is off**, as above. The design ships it on with a placeholder
  number.
- **The forms work.** The design's submit is an `alert()` saying it is a demo;
  here both forms validate, mark empty fields and swap to a thank-you.
- **Review attributions keep their dates** ("Yelp, Sept 2024" rather than
  "Yelp"), and use a middot rather than an em dash, matching the separators
  used elsewhere on the page.
- **Form inputs are a flat 16px.** Anything smaller makes iOS zoom the page
  when a field takes focus.
- **No hover lift.** Buttons change state on hover; they do not move.
- **Below 380px the header lockup steps down** a size so the row cannot
  overrun on the smallest phones.
- Head matter the mockup has no place for: `lang`, Open Graph tags,
  `GeneralContractor` structured data, a theme colour, a touch icon and font
  preloads.

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
