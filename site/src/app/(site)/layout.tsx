import { CallBar } from '@/components/CallBar';
import { Footer } from '@/components/Footer';
import { IconDefs } from '@/components/Icons';
import { business } from '@/config/business';
import { SITE_URL } from '@/config/site';

/**
 * The public site: footer, call bar, the icon sheet, and the
 * GeneralContractor schema on every page. The header is rendered by each
 * page (the home page's links are in-page anchors; everywhere else they lead
 * back to it), so it is not here.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: business.name,
    slogan: business.slogan,
    description:
      'Owner-run concrete contractor serving Ventura County. Driveways, patios, walkways, retaining walls, foundations, custom finishes, demolition and repair.',
    url: SITE_URL,
    telephone: business.phoneE164,
    founder: { '@type': 'Person', name: business.owner },
    foundingDate: '2024-05-20',
    image: [`${SITE_URL}/images/og-a.jpg`, `${SITE_URL}/images/og-square.jpg`, `${SITE_URL}/images/hero-2000.webp`],
    logo: `${SITE_URL}/images/logo-512.png`,
    address: { '@type': 'PostalAddress', addressLocality: business.city, addressRegion: business.region, addressCountry: business.country },
    areaServed: { '@type': 'AdministrativeArea', name: business.serviceArea },
    sameAs: [business.social.instagram, business.social.yelp],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating.value, reviewCount: String(business.rating.count) },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '07:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '07:00', closes: '15:00' },
    ],
  };

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div style={{ position: 'relative', background: '#fff' }}>
        <main id="main">{children}</main>
        <Footer />
      </div>
      <CallBar />
      <IconDefs />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
