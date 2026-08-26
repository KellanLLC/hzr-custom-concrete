import Link from 'next/link';
import { areas } from '@/config/areas';
import { business, licensing } from '@/config/business';
import { services } from '@/config/services';

const colHead: React.CSSProperties = { fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.74rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--tan)', margin: '0 0 14px' };
const rowLink: React.CSSProperties = { display: 'block', margin: '0 0 9px', fontSize: '.87rem' };

/**
 * The shipped footer, with its columns turned from labels into real links now
 * the pages behind them exist: services to /services/<slug>, towns to
 * /service-area/<slug>, and Contact into the fourth column. Layout, wordmark
 * and the licensing-gated lines are unchanged.
 */
export function Footer() {
  const towns = areas.filter((a) => ['ventura', 'oxnard', 'camarillo', 'thousand-oaks', 'simi-valley', 'santa-paula', 'ojai'].includes(a.slug));
  return (
    <footer style={{ background: 'var(--panel-2)', color: 'var(--fg-3)', padding: 'clamp(50px,5.4vw,76px) 0 0', overflow: 'hidden' }}>
      <div style={{ paddingInline: 'clamp(20px,5vw,56px)' }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(210px,100%),1fr))', gap: 'clamp(26px,3vw,48px)' }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-128.png" alt="" aria-hidden="true" loading="lazy" style={{ width: 62, height: 'auto', marginBottom: 14 }} />
            <p style={{ margin: '0 0 10px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.08rem', color: 'var(--fg)', lineHeight: 1.22, maxWidth: '22ch' }}>
              Custom concrete that speaks for itself.
            </p>
            <p style={{ margin: 0, fontSize: '.86rem', maxWidth: '34ch' }}>{licensing.footerBlurb}</p>
          </div>
          <nav aria-label="Services">
            <h2 style={colHead}>Services</h2>
            {services.map((s) => (
              <a key={s.slug} className="ft-a" href={`/services/${s.slug}`} style={rowLink}>
                {s.name}
              </a>
            ))}
          </nav>
          <nav aria-label="Service area">
            <h2 style={colHead}>Area</h2>
            {towns.map((t) => (
              <a key={t.slug} className="ft-a" href={`/service-area/${t.slug}`} style={rowLink}>
                {t.name}
              </a>
            ))}
            <Link className="ft-a" href="/service-area" style={rowLink}>
              All of Ventura County
            </Link>
          </nav>
          <nav aria-label="Get in touch">
            <h2 style={colHead}>Get in touch</h2>
            <a className="ft-a" href={business.phoneHref} style={rowLink}>
              Call {business.phone}
            </a>
            <a className="ft-a" href={business.smsHref} style={rowLink}>
              Text a photo
            </a>
            <a className="ft-a" href={business.social.instagram} target="_blank" rel="noopener" style={rowLink}>
              {business.social.instagramHandle}
            </a>
            <a className="ft-a" href="/contact" style={rowLink}>
              Contact
            </a>
            <a className="ft-a" href="/faq" style={rowLink}>
              Straight answers
            </a>
            <a className="ft-a" href="#estimate" style={rowLink}>
              Request an estimate
            </a>
          </nav>
        </div>

        <div style={{ maxWidth: 1180, margin: 'clamp(30px,3.4vw,44px) auto 0', display: 'flex', flexWrap: 'wrap', gap: '8px 26px', justifyContent: 'space-between', padding: '18px 0', borderTop: '1px solid rgba(247,246,243,.17)', fontSize: '.79rem' }}>
          <p style={{ margin: 0 }}>© 2026 HZR Custom Concrete</p>
          <p style={{ margin: 0 }}>{licensing.footerLine}</p>
          <p style={{ margin: 0 }}>
            {business.hours} · {business.asl}
          </p>
          <p style={{ margin: 0 }}>
            <a className="by-lnk" href="https://getkellan.com" target="_blank" rel="noopener">
              Made by Kellan
            </a>
          </p>
        </div>
      </div>

      <div aria-hidden="true" style={{ width: 'min(100% - clamp(40px,10vw,112px),1420px)', margin: '0 auto', lineHeight: 0.76, overflow: 'hidden' }}>
        <span style={{ display: 'block', textAlign: 'center', fontFamily: 'Excon,sans-serif', fontWeight: 900, fontSize: 'calc(min(100vw - clamp(40px,10vw,112px),1420px) / 2.05)', letterSpacing: '.005em', color: 'rgba(247,246,243,.06)', transform: 'translateY(.09em)' }}>
          HZR
        </span>
      </div>
    </footer>
  );
}
