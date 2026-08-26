import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { EstimateBand, Facts, PageHead, ServiceCard, h2, kickerDk, sectionPad, wrap } from '@/components/page/Page';
import { business } from '@/config/business';
import { serviceBySlug, services } from '@/config/services';
import { SITE_URL } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return { title: 'Not found' };
  return {
    title: `${s.name} in Ventura County, CA`,
    description: `${s.lede} Owner-run, free estimates across Ventura County. Call or text 805-589-7879.`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();

  const related = s.related.map((slug) => serviceBySlug(slug)!).filter(Boolean);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${s.name} in Ventura County`,
    serviceType: s.name,
    description: s.lede,
    provider: { '@type': 'GeneralContractor', name: business.name, url: SITE_URL, telephone: business.phoneE164 },
    areaServed: { '@type': 'AdministrativeArea', name: business.serviceArea },
    url: `${SITE_URL}/services/${s.slug}`,
  };

  return (
    <>
      <Header />
      <PageHead kickerText="What we pour" title={s.h1} lede={s.lede} crumb={{ href: '/#services', label: 'All eight services' }} />

      {/* photo + the three paragraphs */}
      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(380px,100%),1fr))', gap: 'clamp(30px,4vw,72px)', alignItems: 'start' }}>
          <figure style={{ margin: 0, position: 'relative', borderRadius: 3, overflow: 'hidden', maxWidth: 520 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt={s.alt} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
            <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '48px 22px 18px', color: '#fff', background: 'linear-gradient(0deg,rgba(20,19,17,.9),rgba(20,19,17,0))', fontSize: '.84rem' }}>
              Our own job, in this county. No stock photography anywhere on this site.
            </figcaption>
          </figure>
          <div>
            <p style={kickerDk}>How we do it</p>
            <h2 style={{ ...h2, margin: '0 0 18px' }}>The job behind the photograph.</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 24)} style={{ margin: '0 0 14px', color: '#4B4842', maxWidth: '58ch', fontSize: '1.02rem', lineHeight: 1.62 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* the four facts */}
      <section style={{ background: '#F2F1EE', padding: sectionPad }}>
        <div style={wrap}>
          <Facts items={s.facts} />
        </div>
      </section>

      <EstimateBand idPrefix="svc" source="service" defaultService={s.formOption} title={`Get a number for your ${s.noun}.`} />

      {/* related services */}
      <section style={{ background: '#2B2A27', padding: sectionPad }}>
        <div style={wrap}>
          <div style={{ marginBottom: 'clamp(24px,3vw,38px)' }}>
            <p style={{ margin: '0 0 12px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.74rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#FD9516' }}>Often asked for together</p>
            <h2 style={{ ...h2, color: '#F7F6F3' }}>While the crew is there.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(258px,47%),1fr))', gap: 'clamp(10px,1.4vw,18px)' }}>
            {related.map((r) => (
              <ServiceCard key={r.slug} s={r} />
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
