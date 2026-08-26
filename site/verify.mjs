/**
 * Drives the whole system end to end against `npm run dev` (which carries the
 * real bindings via miniflare): the estimate form into D1, the panel, a
 * review request through the echo webhook, the rating page, low-star
 * feedback, and every public page at desktop and phone widths.
 *
 *   node verify.mjs            (dev server on :3000, password "dev")
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
let failures = 0;
const ok = (cond, label) => {
  console.log(`${cond ? '  ok ' : 'FAIL '} ${label}`);
  if (!cond) failures++;
};

const browser = await chromium.launch();

/* ── 1. the estimate form, hero card ──────────────────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE, { waitUntil: 'networkidle' });

  const card = page.locator('aside[aria-label="Quick estimate request"]');
  await card.locator('[name="name"]').fill('Verify Bot');
  await card.locator('[name="phone"]').fill('805-555-0100');
  await card.locator('[name="service"]').selectOption('Patio or back yard');
  await card.locator('[name="area"]').fill('Ojai');
  await card.locator('[name="details"]').fill('About 400 sq ft, old slab to break out.');
  await card.locator('button[type="submit"]').click();
  await card.getByText('Got it, thank you.').waitFor({ timeout: 10000 });
  ok(true, 'hero estimate form submits and thanks');

  // empty-required marking
  await card.getByText('Send another').click();
  await card.locator('button[type="submit"]').click();
  ok((await card.locator('.fld.is-bad').count()) >= 1, 'empty required fields are marked');
  ok(errors.length === 0, `no page errors on home (${errors.join('; ').slice(0, 120)})`);
  await page.close();
}

/* ── 2. the service page form carries its service ─────────────────────── */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/services/retaining-walls`, { waitUntil: 'networkidle' });
  ok((await page.locator('[name="service"]').inputValue()) === 'Retaining wall', 'service page preselects its service');
  await page.locator('[name="name"]').fill('Wall Verify');
  await page.locator('[name="phone"]').fill('805-555-0101');
  await page.locator('#estimate button[type="submit"]').click();
  await page.getByText('Got it, thank you.').waitFor({ timeout: 10000 });
  ok(true, 'service page form submits');
  await page.close();
}

/* ── 3. the panel: gate, request, status, review text ─────────────────── */
let reviewToken = null;
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await page.locator('#pw').fill('wrong-password');
  await page.getByRole('button', { name: /open the panel/i }).click();
  await page.getByText('Wrong password.').waitFor({ timeout: 8000 });
  ok(true, 'wrong password is refused');

  await page.locator('#pw').fill('dev');
  await page.getByRole('button', { name: /open the panel/i }).click();
  await page.getByRole('tab', { name: /requests/i }).waitFor({ timeout: 10000 });
  ok(true, 'panel opens with the dev password');

  const row = page.locator('li', { hasText: 'Verify Bot' }).first();
  await row.waitFor({ timeout: 8000 });
  ok(true, 'submitted request is on the board');
  await row.getByRole('button', { name: /Verify Bot/ }).click();
  await row.getByRole('button', { name: 'Contacted' }).click();
  await page.waitForTimeout(600);

  // send the review request (dev webhook echoes, so it lands as "sent")
  await row.getByRole('button', { name: /Text \(805\)/ }).click();
  await row.getByText('Sent.', { exact: true }).waitFor({ timeout: 10000 });
  ok(true, 'review request sends through the echo webhook');

  await page.getByRole('tab', { name: /reviews/i }).click();
  await page.locator('#view-reviews').getByText('Verify Bot').first().waitFor({ timeout: 8000 });
  ok(true, 'review shows in the Reviews tab');
  await page.close();

  // pull the token from the API the panel itself uses
  const ctx = await browser.newContext();
  const login = await ctx.request.post(`${BASE}/api/admin/session`, { data: { password: 'dev' } });
  ok(login.ok(), 'session API issues a cookie');
  const data = await (await ctx.request.get(`${BASE}/api/admin/data`)).json();
  reviewToken = data.reviews?.[0]?.token || null;
  ok(!!reviewToken, 'review row carries a tracked token');
  ok(Array.isArray(data.quotes) && data.quotes.some((q) => q.name === 'Wall Verify'), 'service-page lead is in the panel data');
  await ctx.close();
}

/* ── 4. the rating page: tap a low star, leave feedback ───────────────── */
if (reviewToken) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/r/${reviewToken}`, { waitUntil: 'networkidle' });
  await page.getByText('How did we do?').waitFor({ timeout: 8000 });
  ok(true, 'rating page renders');
  await page.getByRole('button', { name: '2 out of 5' }).click();
  await page.getByText(/put this right/i).waitFor({ timeout: 8000 });
  ok(true, 'low star shows the private feedback box');
  await page.locator('textarea[name="feedback"]').fill('Verification feedback, ignore.');
  await page.getByRole('button', { name: /send it/i }).click();
  await page.getByText('Thank you.').waitFor({ timeout: 8000 });
  ok(true, 'feedback posts and thanks');
  await page.close();
}

/* ── 5. every public page, two widths, no sideways scroll ─────────────── */
const routes = ['/', '/contact', '/faq', '/service-area', '/service-area/oxnard', '/service-area/moorpark', '/services/driveways', '/services/custom-stamped', '/services/demolition-repair', '/nope-404'];
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of routes) {
    const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const status = res?.status();
    const wantsOk = route !== '/nope-404';
    ok(wantsOk ? status === 200 : status === 404, `${route} at ${width}px answers ${status}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    ok(overflow <= 1, `${route} at ${width}px has no sideways scroll (${overflow}px)`);
  }
  await page.close();
}

/* ── 6. robots + sitemap ──────────────────────────────────────────────── */
{
  const ctx = await browser.newContext();
  const robots = await (await ctx.request.get(`${BASE}/robots.txt`)).text();
  ok(robots.includes('Disallow: /admin'), 'robots.txt hides the panel');
  const sitemap = await (await ctx.request.get(`${BASE}/sitemap.xml`)).text();
  ok(sitemap.includes('/services/driveways') && sitemap.includes('/service-area/ojai'), 'sitemap carries services and towns');
  ok(!robots.includes('workers.dev') && !sitemap.includes('workers.dev'), 'no workers.dev URLs anywhere');
  await ctx.close();
}

await browser.close();
console.log(failures ? `\n${failures} FAILURES` : '\nAll green.');
process.exit(failures ? 1 : 0);
