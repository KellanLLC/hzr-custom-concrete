/**
 * Single source of truth for every business fact on the site.
 *
 * Everything here is transcribed from a real source: Anthony's Instagram bio,
 * his flyer, his Yelp listing, BBB, and the CSLB licence database. Facts that
 * are gated (licensing) explain their own gate.
 */

export const business = {
  name: 'HZR Custom Concrete',
  owner: 'Anthony Huizar',
  ownerFirst: 'Anthony',
  ownerTitle: 'Owner',
  /** 20 May 2024, from his Instagram bio. */
  established: 2024,
  establishedLine: 'May 2024',

  phone: '805.589.7879',
  phoneHref: 'tel:+18055897879',
  smsHref: 'sms:+18055897879',
  phoneE164: '+1-805-589-7879',

  /** Service-area business: based in Ventura, no street address published. */
  city: 'Ventura',
  region: 'CA',
  country: 'US',
  serviceArea: 'Ventura County, California',
  serviceAreaShort: 'Ventura County',

  /** Ventura city centre; the radius covers the county for the schema circle. */
  geo: { lat: 34.2805, lng: -119.2945, radiusMeters: 56000 },

  social: {
    instagram: 'https://www.instagram.com/hzr.custom.concrete',
    instagramHandle: '@hzr.custom.concrete',
    yelp: 'https://www.yelp.com/biz/hzr-custom-concrete-ventura',
  },

  /**
   * LICENSING — verified against the CSLB database on 26 Aug 2026:
   * CSLB #1152971, HZR CUSTOM CONCRETE, C-8 Concrete, issued 04/03/2026,
   * expires 04/30/2028 — but the licence is INACTIVE ("not able to contract
   * at this time") pending a contractor's bond and workers' comp. Advertising
   * "licensed, bonded & insured" while the licence is inactive would be a
   * false claim on all three counts, so `licensed` stays false and no
   * licensing line renders anywhere.
   *
   * When cslb.ca.gov shows the licence ACTIVE (Anthony files the bond and the
   * workers' comp), flip `licensed: true` and the trust bar, the about facts
   * and the footer line all switch to the licensed wording at once.
   */
  licensed: false,
  cslbNumber: '1152971',

  /** From the flyer and Yelp. */
  hours: 'Mon–Thu 7–6 · Fri–Sat 7–3',
  hoursLong: 'Monday to Thursday 7am–6pm, Friday and Saturday 7am–3pm',
  payment: 'Cash, Zelle and cards',
  asl: 'ASL proficient',

  slogan: 'Custom concrete that speaks for itself',

  rating: { value: '5.0', count: 3, source: 'Yelp' },
} as const;

/** The licensing lines, resolved from the gate above. Used in three places. */
export const licensing = business.licensed
  ? {
      trustTitle: 'Licensed, bonded & insured',
      trustDetail: `CSLB #${business.cslbNumber}`,
      aboutFact: `Licensed, bonded and insured · CSLB #${business.cslbNumber}`,
      footerLine: `Licensed, bonded & insured · CSLB #${business.cslbNumber}`,
      footerBlurb:
        'Owner-run concrete contractor for residential and commercial property across Ventura County, California. Licensed, bonded and insured.',
    }
  : {
      trustTitle: 'Free estimates, always',
      trustDetail: 'Quoted on the spot, no charge',
      aboutFact: 'Ask him directly',
      footerLine: 'Free estimates · Owner on every pour',
      footerBlurb:
        'Owner-run concrete contractor for residential and commercial property across Ventura County, California.',
    };
