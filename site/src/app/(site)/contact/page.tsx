import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { I } from '@/components/Icons';
import { EstimateBand, Facts, PageHead, sectionPad, wrap } from '@/components/page/Page';
import { business } from '@/config/business';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Call or text HZR Custom Concrete for a free estimate anywhere in Ventura County. 805-589-7879 rings Anthony directly. ASL proficient.',
  alternates: { canonical: '/contact' },
};

const CARDS = [
  {
    href: business.phoneHref,
    key: 'Call',
    val: business.phone,
    note: 'It rings Anthony, not a call centre. Fastest way onto the schedule.',
    icon: 'phone' as const,
  },
  {
    href: business.smsHref,
    key: 'Text',
    val: 'A photo of the job',
    note: 'A picture and a rough size is plenty. He reads it himself and rings you back.',
    icon: 'check' as const,
  },
  {
    href: business.social.instagram,
    key: 'Instagram',
    val: business.social.instagramHandle,
    note: 'Recent pours, and a DM works too, including in ASL, by video.',
    icon: 'out' as const,
    external: true,
  },
];

export default function Contact() {
  return (
    <>
      <Header />
      <PageHead
        kickerText="Get in touch"
        title={
          <>
            One number. <em style={{ fontStyle: 'normal', color: '#FEA12D' }}>Anthony picks up.</em>
          </>
        }
        lede="No dispatcher, no phone tree. Call, text a photo, send the form, or sign: Anthony is ASL proficient. Every estimate is free and quoted on your property."
      />

      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 'clamp(14px,1.8vw,22px)' }}>
          {CARDS.map((c) => (
            <a
              key={c.key}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
              style={{ display: 'block', border: '1px solid rgba(30,29,27,.12)', borderTop: '3px solid #FD9516', borderRadius: 3, padding: 'clamp(20px,2.4vw,28px)', background: '#fff' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.76rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#8F4A02' }}>
                <I id={c.icon} size={15} fill="#FD9516" />
                {c.key}
              </span>
              <span style={{ display: 'block', margin: '10px 0 6px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(1.3rem,1.1rem + .8vw,1.7rem)', letterSpacing: '-.016em', color: '#1E1D1B' }}>{c.val}</span>
              <span style={{ display: 'block', fontSize: '.92rem', lineHeight: 1.55, color: '#67635C' }}>{c.note}</span>
            </a>
          ))}
        </div>
      </section>

      <EstimateBand
        idPrefix="ct"
        source="contact"
        title="Or write it down here."
        copy="Name, number, roughly what you need. It lands with Anthony the moment you send it, and you get a call or a text back."
        extraOptions={['Marketing / SEO']}
      />

      <section style={{ background: '#F2F1EE', padding: sectionPad }}>
        <div style={wrap}>
          <Facts
            items={[
              { key: 'Hours', val: business.hours, note: 'Concrete keeps pour-day hours. If he is on a slab, leave a message; he calls back.' },
              { key: 'Service area', val: 'All of Ventura County', note: 'Based in Ventura, coast to the valleys. If you are on the edge of the county, ask anyway.' },
              { key: 'Payment', val: business.payment, note: 'Agreed before the work starts, never a surprise after it.' },
              { key: 'Accessibility', val: business.asl, note: 'Message him or sign on site; estimates work exactly the same in ASL.' },
            ]}
          />
          <p style={{ margin: 'clamp(24px,3vw,36px) 0 0', fontSize: '.95rem', color: '#4B4842' }}>
            Every review he has is on{' '}
            <a href={business.social.yelp} target="_blank" rel="noopener" style={{ fontWeight: 600, color: '#8F4A02' }}>
              Yelp
            </a>
            : 5.0, three of three. Every recent pour is on{' '}
            <a href={business.social.instagram} target="_blank" rel="noopener" style={{ fontWeight: 600, color: '#8F4A02' }}>
              Instagram
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
