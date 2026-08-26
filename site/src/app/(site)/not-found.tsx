import Link from 'next/link';
import { Header } from '@/components/Header';
import { I } from '@/components/Icons';
import { business } from '@/config/business';

export default function NotFound() {
  return (
    <>
      <Header />
      <section style={{ background: '#1E1D1B', color: '#F7F6F3', minHeight: '82svh', display: 'grid', alignItems: 'center', padding: 'clamp(148px,20vh,224px) clamp(20px,5vw,56px) clamp(54px,6vw,84px)' }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto', width: '100%' }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.74rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#FD9516' }}>404</p>
          <h1 style={{ margin: '0 0 16px', maxWidth: '18ch', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(2.3rem, 1.2rem + 4.2vw, 4.2rem)', lineHeight: 1, letterSpacing: '-.028em', textWrap: 'balance' }}>
            This page never got <em style={{ fontStyle: 'normal', color: '#FEA12D' }}>poured.</em>
          </h1>
          <p style={{ margin: 0, maxWidth: '52ch', fontSize: '1.05rem', lineHeight: 1.55, color: '#B8B3AA' }}>
            The address is wrong or the page has moved. Everything worth finding is one step from the home page, or one call away.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 20px', marginTop: 'clamp(24px,3vw,34px)' }}>
            <Link className="cta-or-w" href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.02rem', padding: '16px 24px', borderRadius: 3 }}>
              Back to the home page
            </Link>
            <a href={business.phoneHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.95rem', color: '#FD9516' }}>
              <I id="phone" size={17} />
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
