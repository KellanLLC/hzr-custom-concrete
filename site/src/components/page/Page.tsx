import type { CSSProperties, ReactNode } from 'react';
import { EstimateForm } from '@/components/EstimateForm';
import { I } from '@/components/Icons';
import { business } from '@/config/business';
import type { Service } from '@/config/services';

/**
 * The furniture every inner page is built from, in the shipped site's own
 * vocabulary: the dark opening band the fixed header sits over, the orange
 * top-border fact rows, the photo-card grid, and the estimate band that gives
 * every page its own form.
 */

export const kicker: CSSProperties = { margin: '0 0 12px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.74rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#FD9516' };
export const kickerDk: CSSProperties = { ...kicker, color: '#8F4A02' };
export const h2: CSSProperties = { margin: 0, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 1.3rem + 2.6vw, 3.2rem)', lineHeight: 1.02, letterSpacing: '-.024em', textWrap: 'balance' };
export const sectionPad = 'clamp(60px,7vw,104px) clamp(20px,5vw,56px)';
export const wrap: CSSProperties = { maxWidth: 1180, marginInline: 'auto' };
const cardGrad = 'linear-gradient(0deg,rgba(20,19,17,.95) 4%,rgba(20,19,17,.68) 40%,rgba(20,19,17,.14) 72%,rgba(20,19,17,.02) 100%)';

/** The dark band a page opens with: the fixed header sits over it like the
    hero, so every page owns its first screen. */
export function PageHead({
  kickerText,
  title,
  lede,
  crumb,
  children,
}: {
  kickerText: string;
  title: ReactNode;
  lede: string;
  crumb?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section data-cta-zone style={{ background: '#1E1D1B', color: '#F7F6F3', padding: 'clamp(148px,20vh,224px) clamp(20px,5vw,56px) clamp(54px,6vw,84px)' }}>
      <div style={wrap}>
        {crumb ? (
          <a href={crumb.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18, fontSize: '.88rem', color: '#B8B3AA' }} className="ft-a">
            <I id="chev" size={14} fill="currentColor" style={{ transform: 'rotate(180deg)' }} />
            {crumb.label}
          </a>
        ) : null}
        <p style={kicker}>{kickerText}</p>
        <h1 style={{ margin: '0 0 16px', maxWidth: '19ch', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(2.3rem, 1.2rem + 4.2vw, 4.2rem)', lineHeight: 1, letterSpacing: '-.028em', color: '#F7F6F3', textWrap: 'balance' }}>{title}</h1>
        <p style={{ margin: 0, maxWidth: '56ch', fontSize: 'clamp(1rem, .95rem + .3vw, 1.12rem)', lineHeight: 1.55, color: '#B8B3AA' }}>{lede}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 20px', marginTop: 'clamp(24px,3vw,34px)' }}>
          <a className="cta-or-w" href={business.phoneHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.02rem', padding: '16px 24px', borderRadius: 3 }}>
            <I id="phone" size={19} />
            Call {business.phone}
          </a>
          <a href="#estimate" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.95rem', color: '#FD9516' }}>
            <I id="check" size={17} />
            Or request it in writing
          </a>
        </div>
        {children}
      </div>
    </section>
  );
}

/** The orange top-border fact rows, same construction as the home page's
    process steps. */
export function Facts({ items, dark = false }: { items: { key: string; val: string; note: string }[]; dark?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(230px,100%),1fr))', gap: 'clamp(22px,2.8vw,38px)' }}>
      {items.map((f) => (
        <div key={f.key} style={{ borderTop: '3px solid #FD9516', paddingTop: 16 }}>
          <p style={{ margin: '0 0 4px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', color: dark ? '#FD9516' : '#8F4A02' }}>{f.key}</p>
          <p style={{ margin: '0 0 6px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.18rem', letterSpacing: '-.012em', color: dark ? '#F7F6F3' : '#1E1D1B' }}>{f.val}</p>
          <p style={{ margin: 0, fontSize: '.9rem', lineHeight: 1.55, color: dark ? '#B8B3AA' : '#67635C' }}>{f.note}</p>
        </div>
      ))}
    </div>
  );
}

/** The photo card the home page's services grid uses, reusable anywhere. */
export function ServiceCard({ s }: { s: Service }) {
  return (
    <a href={`/services/${s.slug}`} aria-label={`${s.name}: more about this service`} style={{ display: 'block' }}>
      <article style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 3, overflow: 'hidden', background: '#2B2A27' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt={s.alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: cardGrad }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(13px,1.5vw,20px)', color: '#fff' }}>
          <h3 style={{ margin: '0 0 6px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(1rem, .86rem + .5vw, 1.2rem)', letterSpacing: '-.012em', lineHeight: 1.14 }}>{s.name}</h3>
          <p className="svc__d" style={{ margin: 0, fontSize: '.87rem', lineHeight: 1.5, color: 'rgba(255,255,255,.85)' }}>{s.card}</p>
        </div>
      </article>
    </a>
  );
}

/** The estimate band every inner page closes with: the form on the left, the
    call card on the right, both in the shipped design. */
export function EstimateBand({
  idPrefix,
  source,
  defaultService,
  defaultArea,
  title = 'Tell him about the job. He’ll take it from there.',
  copy = 'A rough size and what is there now is enough to start. Anthony reads it, calls you back and walks the job with you: free, on site, quoted on the spot.',
  extraOptions,
}: {
  idPrefix: string;
  source: 'estimate' | 'contact' | 'service';
  defaultService?: string;
  defaultArea?: string;
  title?: string;
  copy?: string;
  extraOptions?: string[];
}) {
  return (
    <section id="estimate" data-cta-zone style={{ background: '#F2F1EE', padding: sectionPad }}>
      <div style={wrap}>
        <div style={{ marginBottom: 'clamp(28px,3.4vw,44px)' }}>
          <p style={kickerDk}>Free estimate</p>
          <h2 style={{ ...h2, margin: '0 0 14px', maxWidth: '26ch' }}>{title}</h2>
          <p style={{ margin: 0, maxWidth: '62ch', color: '#4B4842', fontSize: '1.02rem' }}>{copy}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(400px,100%),1fr))', gap: 'clamp(16px,2vw,26px)', alignItems: 'start' }}>
          <div style={{ background: '#fff', borderRadius: 3, padding: 'clamp(22px,2.6vw,34px)', border: '1px solid rgba(30,29,27,.09)' }}>
            <EstimateForm idPrefix={idPrefix} source={source} defaultService={defaultService} defaultArea={defaultArea} buttonLabel="Request my free estimate" extraOptions={extraOptions} />
          </div>

          <aside style={{ background: '#2B2A27', color: '#F7F6F3', borderRadius: 3, padding: 'clamp(22px,2.6vw,34px)', position: 'relative', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-512.png" alt="" aria-hidden="true" loading="lazy" style={{ position: 'absolute', right: -40, top: -30, width: 210, height: 'auto', opacity: 0.1, pointerEvents: 'none' }} />
            <p style={{ margin: '0 0 4px', position: 'relative', display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.76rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#FD9516' }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: '#5AA855' }} />
              Taking calls now
            </p>
            <a className="tel-big" href={business.phoneHref} style={{ display: 'inline-block', position: 'relative', margin: '8px 0 4px', fontFamily: 'var(--font-body)', fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontSize: 'clamp(1.7rem, 1.15rem + 1.7vw, 2.5rem)', letterSpacing: '-.02em' }}>
              {business.phone}
            </a>
            <p style={{ margin: '0 0 20px', position: 'relative', fontSize: '.9rem', color: '#B8B3AA' }}>It rings his phone. Fastest way onto the schedule.</p>
            <div style={{ display: 'grid', gap: 10, position: 'relative' }}>
              <a className="cta-or-w" href={business.phoneHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.03rem', padding: 16, borderRadius: 3 }}>
                <I id="phone" size={19} />
                Call Anthony
              </a>
              <a className="ghost" href={business.smsHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.03rem', padding: 16, borderRadius: 3 }}>
                Text a photo of the job
              </a>
            </div>
            <dl style={{ margin: '22px 0 0', display: 'grid', position: 'relative', borderBottom: '1px solid rgba(247,246,243,.17)' }}>
              {[
                { k: 'Service area', v: 'Ventura County, California' },
                { k: 'Hours', v: 'Mon–Thu 7–6, Fri–Sat 7–3' },
                { k: 'Estimates', v: 'Always free' },
                { k: 'Payment', v: 'Cash, Zelle and cards' },
              ].map((f) => (
                <div key={f.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,112px) minmax(0,1fr)', gap: '8px 16px', padding: '11px 0', borderTop: '1px solid rgba(247,246,243,.17)', fontSize: '.87rem' }}>
                  <dt style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, color: '#FD9516' }}>{f.k}</dt>
                  <dd style={{ margin: 0, color: '#B8B3AA' }}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
