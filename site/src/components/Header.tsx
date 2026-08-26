'use client';

import { useEffect, useRef, useState } from 'react';
import { business } from '@/config/business';
import { I } from './Icons';

/**
 * The shipped header, behaviour and all: transparent over the page's dark
 * opening, a solid bar past 60px of scroll, the lockup shrinking as it goes,
 * and below 1041px the nav folding into the menu behind the burger. The
 * burger only renders once JavaScript has run (the `js` class on <html>), so
 * with no JS the links simply stay out in the bar.
 *
 * On the home page the links are in-page anchors; everywhere else they point
 * back at the same sections with a leading slash, plus the pages that only
 * exist now there is more than one page.
 */
export function Header({ home = false }: { home?: boolean }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const hdrRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sync = () => setStuck(window.scrollY > 60);
    sync();
    addEventListener('scroll', sync, { passive: true });
    return () => removeEventListener('scroll', sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    addEventListener('keydown', onKey);
    const wide = matchMedia('(min-width: 1041px)');
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener('change', onWide);
    return () => {
      removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  const p = home ? '' : '/';
  const links = [
    { href: `${p}#services`, label: 'Services' },
    { href: `${p}#work`, label: 'Our Work' },
    { href: `${p}#anthony`, label: 'About' },
    { href: home ? '#area' : '/service-area', label: 'Service Area' },
    { href: '#estimate', label: 'Free Estimate' },
  ];
  const menuLinks = [
    { href: `${p}#services`, label: 'Services' },
    { href: `${p}#work`, label: 'Our Work' },
    { href: `${p}#anthony`, label: 'About Anthony' },
    { href: home ? '#area' : '/service-area', label: 'Service Area' },
    { href: '/contact', label: 'Contact' },
    { href: '#estimate', label: 'Free Estimate' },
  ];

  return (
    <header ref={hdrRef} className={`hdr${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}>
      <div className="hdr__scrim" aria-hidden="true" />
      <div style={{ position: 'relative', paddingInline: 'clamp(20px,5vw,56px)' }}>
        <div className="hdr__row">
          <a href={home ? '#top' : '/'} aria-label="HZR Custom Concrete — home" style={{ display: 'flex', alignItems: 'center', gap: 11, flex: 'none' }}>
            <span className="hdr__badge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-256.png" alt="" width={256} height={256} />
            </span>
            <span style={{ display: 'grid', lineHeight: 1 }}>
              <b className="hdr__word">HZR</b>
              <i className="hdr__sub">Custom Concrete</i>
            </span>
          </a>
          <nav className="hdr__nav" aria-label="Primary" style={{ marginLeft: 'auto', display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap', gap: 'clamp(13px,1.6vw,26px)' }}>
            {links.map((l) => (
              <a key={l.label} className="nav-a" href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a
            className="hdr__tel cta-or-w"
            href={business.phoneHref}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flex: 'none', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.93rem', padding: '11px 17px', borderRadius: 3 }}
          >
            <I id="phone" size={18} />
            <span>{business.phone}</span>
          </a>

          <div className="hdr__burger">
            <a className="cta-or-w" href={business.phoneHref} aria-label={`Call ${business.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, flex: 'none', borderRadius: 3 }}>
              <I id="phone" size={21} />
            </a>
            <button className="hdr__menu" type="button" aria-label="Menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
              <span className="hdr__bar hdr__bar--a" />
              <span className="hdr__bar hdr__bar--m" />
              <span className="hdr__bar hdr__bar--b" />
            </button>
          </div>
        </div>
      </div>

      <nav className="hdr__panel" id="menu" aria-label="Site menu">
        <div style={{ maxWidth: 1300, marginInline: 'auto', display: 'grid' }}>
          {menuLinks.map((l) => (
            <a key={l.label} className="menu-a" href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <I id="chev" size={17} fill="var(--tan)" />
            </a>
          ))}
          <div style={{ display: 'grid', gap: 9, marginTop: 14 }}>
            <a className="cta-or-w" href={business.phoneHref} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: 54, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.04rem', borderRadius: 3 }}>
              <I id="phone" size={19} />
              Call {business.phone}
            </a>
            <a className="ghost" href="#estimate" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: 54, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.04rem', borderRadius: 3 }}>
              <I id="check" size={19} />
              Get my free estimate
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
