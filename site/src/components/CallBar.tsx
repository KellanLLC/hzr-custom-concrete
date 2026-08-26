'use client';

import { useEffect, useState } from 'react';
import { business } from '@/config/business';
import { I } from './Icons';

/**
 * The sticky call bar, exactly as shipped: it stays up the whole way down and
 * steps aside for any section marked data-cta-zone (the hero and the estimate
 * form, which carry their own calls to action). It reads the scroll position
 * directly rather than through an observer, so it can never be left offstage
 * by an event that never fires, and it goes visibility:hidden when away so it
 * leaves the tab order with it.
 */
const BAR_H = 86;

export function CallBar() {
  const [here, setHere] = useState(false);

  useEffect(() => {
    const fills = (el: Element, room: number) => {
      const r = el.getBoundingClientRect();
      return Math.min(r.bottom, room) - Math.max(r.top, 0) >= room * 0.6;
    };
    const sync = () => {
      const room = Math.max((window.innerHeight || 0) - BAR_H, 1);
      const zones = document.querySelectorAll('[data-cta-zone]');
      let covered = false;
      zones.forEach((z) => {
        if (fills(z, room)) covered = true;
      });
      setHere(!covered);
    };
    sync();
    addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync, { passive: true });
    return () => {
      removeEventListener('scroll', sync);
      removeEventListener('resize', sync);
    };
  }, []);

  return (
    <>
      <div className="callbar__pad" aria-hidden="true" />
      <div className={`callbar${here ? ' is-here' : ''}`}>
        <a className="cta-or-w" href={business.phoneHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 56, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.02rem', borderRadius: 3 }}>
          <I id="phone" size={19} />
          Call now
        </a>
        <a className="ghost ghost--solid" href="#estimate" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 56, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.02rem', borderRadius: 3 }}>
          <I id="check" size={18} />
          Get my free estimate
        </a>
      </div>
    </>
  );
}
