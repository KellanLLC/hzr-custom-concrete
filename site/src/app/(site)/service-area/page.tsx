import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { EstimateBand, Facts, PageHead, h2, kickerDk, sectionPad, wrap } from '@/components/page/Page';
import { areas } from '@/config/areas';
import { business } from '@/config/business';

export const metadata: Metadata = {
  title: 'Service Area: Ventura County, CA',
  description:
    'HZR Custom Concrete pours driveways, patios, walls and foundations across Ventura County: Ventura, Oxnard, Camarillo, Thousand Oaks, Simi Valley, Santa Paula, Ojai and more. Free estimates everywhere on the list.',
  alternates: { canonical: '/service-area' },
};

export default function ServiceArea() {
  const near = areas.filter((a) => a.minutes <= 20);
  const far = areas.filter((a) => a.minutes > 20);

  return (
    <>
      <Header />
      <PageHead
        kickerText="Where we pour"
        title={
          <>
            If it&rsquo;s in Ventura County, <em style={{ fontStyle: 'normal', color: '#FEA12D' }}>he pours in it.</em>
          </>
        }
        lede="Based in Ventura, working the whole county, coast to the valleys. Every town below gets the same free walk-through and the same crew; the only thing that changes is the drive."
      />

      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={wrap}>
          {[
            { title: 'Close to home', list: near },
            { title: 'Worth the drive', list: far },
          ].map((g) => (
            <div key={g.title} style={{ marginBottom: 'clamp(30px,3.6vw,46px)' }}>
              <p style={kickerDk}>{g.title}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 'clamp(12px,1.6vw,20px)' }}>
                {g.list.map((t) => (
                  <li key={t.slug}>
                    <a href={`/service-area/${t.slug}`} style={{ display: 'block', height: '100%', border: '1px solid rgba(30,29,27,.12)', borderLeft: '3px solid #FD9516', borderRadius: 3, padding: '16px 18px', background: '#fff' }}>
                      <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                        <span style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.14rem', letterSpacing: '-.012em', color: '#1E1D1B' }}>{t.name}</span>
                        <span style={{ fontSize: '.78rem', color: '#67635C', whiteSpace: 'nowrap' }}>{t.minutes ? `~${t.minutes} min out` : 'home ground'}</span>
                      </span>
                      <span style={{ display: 'block', marginTop: 5, fontSize: '.89rem', lineHeight: 1.5, color: '#67635C' }}>{t.line}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p style={{ margin: 0, maxWidth: '62ch', color: '#4B4842', fontSize: '1.02rem' }}>
            Not on the list? Ask anyway: the whole county is in range, and an estimate costs nothing either way. Call or text{' '}
            <a href={business.phoneHref} style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, color: '#8F4A02' }}>
              {business.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <section style={{ background: '#F2F1EE', padding: sectionPad }}>
        <div style={wrap}>
          <div style={{ marginBottom: 'clamp(24px,3vw,38px)', maxWidth: '62ch' }}>
            <h2 style={h2}>Same crew, same prices, county-wide.</h2>
          </div>
          <Facts
            items={[
              { key: 'Walk-throughs', val: 'Free, everywhere listed', note: 'Anthony walks the job with you and quotes it on the spot, whatever town it is in.' },
              { key: 'One crew', val: 'No subcontracting', note: 'The crew that quotes your job is the crew that pours it, in every town on this page.' },
              { key: 'Distance', val: 'Never changes the price', note: 'The drive is ours to worry about. A Simi Valley slab costs what a Ventura slab costs.' },
              { key: 'Call or text', val: business.phone, note: 'It rings Anthony’s phone. ASL proficient; message him or sign on site.' },
            ]}
          />
        </div>
      </section>

      <EstimateBand idPrefix="area" source="estimate" />
    </>
  );
}
