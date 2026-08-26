import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { EstimateBand, Facts, PageHead, ServiceCard, h2, kickerDk, sectionPad, wrap } from '@/components/page/Page';
import { areaBySlug, areas } from '@/config/areas';
import { business } from '@/config/business';
import { serviceBySlug } from '@/config/services';
import { SITE_URL } from '@/config/site';

type Props = { params: Promise<{ town: string }> };

export function generateStaticParams() {
  return areas.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = areaBySlug((await params).town);
  if (!area) return { title: 'Not found' };
  return {
    title: `Concrete Contractor in ${area.name}, CA`,
    description: `Driveways, patios, walkways, retaining walls and foundations in ${area.name}, California. Owner-run, free on-site estimates. Call or text 805-589-7879.`,
    alternates: { canonical: `/service-area/${area.slug}` },
  };
}

export default async function TownPage({ params }: Props) {
  const area = areaBySlug((await params).town);
  if (!area) notFound();

  const focus = area.focus.map((f) => serviceBySlug(f)!).filter(Boolean);
  const neighbours = areas
    .filter((t) => t.slug !== area.slug)
    .sort((x, y) => Math.abs(x.minutes - area.minutes) - Math.abs(y.minutes - area.minutes))
    .slice(0, 4);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Concrete work in ${area.name}, California`,
    serviceType: ['Concrete driveways', 'Concrete patios', 'Walkways and sidewalks', 'Retaining walls', 'Footings and foundations', 'Stamped and coloured concrete', 'Concrete demolition and repair'],
    provider: { '@type': 'GeneralContractor', name: business.name, url: SITE_URL, telephone: business.phoneE164 },
    areaServed: { '@type': 'City', name: area.name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Ventura County, California' } },
    url: `${SITE_URL}/service-area/${area.slug}`,
  };

  return (
    <>
      <Header />
      <PageHead
        kickerText="Where we pour"
        title={
          <>
            Concrete, poured right in <em style={{ fontStyle: 'normal', color: '#FEA12D' }}>{area.name}.</em>
          </>
        }
        lede={`Driveways, patios, walls and foundations in ${area.name}, quoted on your property, free, by the owner, ${area.minutes ? `about ${area.minutes} minutes from his base in Ventura` : 'based right here in town'}.`}
        crumb={{ href: '/service-area', label: 'Everywhere we work' }}
      />

      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: '24px clamp(34px,4vw,64px)', alignItems: 'end', marginBottom: 'clamp(26px,3.2vw,40px)' }}>
            <div>
              <p style={kickerDk}>The work here</p>
              <h2 style={h2}>What {area.name} asks for.</h2>
            </div>
            <p style={{ margin: 0, color: '#4B4842', fontSize: '1.02rem' }}>{area.body[0]}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(258px,47%),1fr))', gap: 'clamp(10px,1.4vw,18px)', marginBottom: 'clamp(24px,3vw,36px)' }}>
            {focus.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
          <p style={{ margin: 0, color: '#4B4842', maxWidth: '68ch', fontSize: '1.02rem', lineHeight: 1.62 }}>{area.body[1]}</p>
        </div>
      </section>

      <section style={{ background: '#F2F1EE', padding: sectionPad }}>
        <div style={wrap}>
          <Facts
            items={[
              { key: 'From Ventura', val: area.minutes ? `About ${area.minutes} minutes` : 'Home ground', note: 'Rounded, and it does not change the price. The walk-through to quote it is free.' },
              { key: 'Estimates', val: 'On site, on the spot', note: 'Anthony walks the job with you and gives you a real number before he leaves.' },
              { key: 'One crew', val: 'Owner on every pour', note: 'The crew that quotes it is the crew that pours it. Residential and commercial.' },
              { key: 'Call or text', val: business.phone, note: 'It rings Anthony’s phone. Text a photo of the job to start.' },
            ]}
          />
          <p style={{ margin: 'clamp(24px,3vw,36px) 0 0', fontSize: '.95rem', color: '#4B4842' }}>
            Also pouring in{' '}
            {neighbours.map((t, i) => (
              <span key={t.slug}>
                <a href={`/service-area/${t.slug}`} style={{ fontWeight: 600, color: '#8F4A02' }}>
                  {t.name}
                </a>
                {i < neighbours.length - 1 ? ', ' : ''}
              </span>
            ))}{' '}
            and <Link href="/service-area" style={{ fontWeight: 600, color: '#8F4A02' }}>the rest of the county</Link>.
          </p>
        </div>
      </section>

      <EstimateBand idPrefix="town" source="estimate" defaultArea={area.name} title={`Free estimates in ${area.name}.`} copy="A rough size and what is there now is enough to start. Anthony reads it, calls you back and walks the job with you: free, on site, quoted on the spot." />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
