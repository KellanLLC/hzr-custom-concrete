/**
 * The one absolute URL the site knows about itself. Everything that emits an
 * absolute link — the Open Graph card, the sitemap, robots.txt, canonical
 * URLs, the GeneralContractor schema, the tracked review links in every text
 * the panel sends, the deep link in the owner alert — derives from this
 * constant.
 *
 * hzrconcrete.com is the custom domain attached to the Worker; the old
 * hzr-custom-concrete.bkthueson.workers.dev address was only ever a staging
 * name.
 */
export const SITE_URL = 'https://hzrconcrete.com';
