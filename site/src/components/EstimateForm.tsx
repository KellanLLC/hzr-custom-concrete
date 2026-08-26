'use client';

import { useState } from 'react';
import { business } from '@/config/business';
import { FORM_OPTIONS } from '@/config/services';
import { I, SelectChev } from './Icons';

const label: React.CSSProperties = { fontSize: '.79rem', fontWeight: 600, color: 'var(--dark-3)' };
const fld: React.CSSProperties = { display: 'grid', gap: 6, marginBottom: 14 };

/**
 * The estimate form, exactly as shipped — name, phone, property, service,
 * city, details — now wired to POST /api/quote, where it lands in D1, shows
 * up in the panel at /admin, and texts Anthony. Client-side it still marks
 * empty required fields and swaps to the thank-you, and if the network eats
 * the submission the error says to call instead: a lead is never lost
 * silently.
 */
export function EstimateForm({
  idPrefix,
  source,
  defaultService,
  defaultArea,
  buttonLabel = 'Get my free estimate',
  extraOptions = [],
  compact = false,
}: {
  idPrefix: string;
  source: 'estimate' | 'contact' | 'service';
  defaultService?: string;
  defaultArea?: string;
  buttonLabel?: string;
  /** Extra rows for the service select (the contact page adds a bait option). */
  extraOptions?: string[];
  compact?: boolean;
}) {
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const f = new FormData(form);
    const get = (k: string) => String(f.get(k) ?? '').trim();

    const nextBad: Record<string, boolean> = { name: !get('name'), phone: !get('phone') };
    setBad(nextBad);
    if (nextBad.name || nextBad.phone) {
      const first = nextBad.name ? 'name' : 'phone';
      (form.querySelector(`[name="${first}"]`) as HTMLInputElement | null)?.focus();
      return;
    }

    const payload = {
      product: get('service'),
      spec: [{ key: 'Property', value: get('property') }],
      price: '',
      name: get('name'),
      phone: get('phone'),
      email: '',
      where: get('area'),
      notes: get('details'),
      source,
      website: get('website'),
    };

    setBusy(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || `Server said ${res.status}`);
      setDone(true);
    } catch (err) {
      const msg = err instanceof Error && !/Server said|fetch/i.test(err.message) ? err.message : '';
      setError(msg || `Something went wrong sending that. Call or text ${business.phone} and Anthony will pick it up from there.`);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center', padding: compact ? '18px 0 10px' : '24px 0 10px' }}>
        <I id="check" size={44} fill="var(--burnt)" style={{ margin: '0 auto 12px' }} />
        <p style={{ margin: '0 0 6px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.3rem', color: 'var(--dark)' }}>Got it, thank you.</p>
        <p style={{ margin: '0 auto 14px', maxWidth: '38ch', color: 'var(--dark-3)', fontSize: '.92rem' }}>
          Anthony will reach out to set up a walk-through. In a hurry, call or text{' '}
          <a href={business.phoneHref} style={{ color: 'var(--burnt)', fontWeight: 600 }}>
            {business.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setBad({});
          }}
          style={{ background: 'none', border: 0, padding: 0, color: 'var(--dark-3)', textDecoration: 'underline', cursor: 'pointer', fontSize: '.86rem' }}
        >
          Send another
        </button>
      </div>
    );
  }

  const cols = compact ? 'repeat(auto-fit,minmax(min(160px,100%),1fr))' : 'repeat(auto-fit,minmax(min(180px,100%),1fr))';
  const clearBad = (k: string) => setBad((b) => (b[k] ? { ...b, [k]: false } : b));

  return (
    <form onSubmit={submit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14 }}>
        <label className={`fld${bad.name ? ' is-bad' : ''}`} style={fld}>
          <span style={label}>Name</span>
          <input type="text" name="name" required autoComplete="name" placeholder="Your name" onInput={() => clearBad('name')} />
        </label>
        <label className={`fld${bad.phone ? ' is-bad' : ''}`} style={fld}>
          <span style={label}>Phone</span>
          <input type="tel" name="phone" required autoComplete="tel" placeholder="805.555.0134" onInput={() => clearBad('phone')} />
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14 }}>
        <label className="fld" style={fld}>
          <span style={label}>Property</span>
          <span style={{ position: 'relative', display: 'block' }}>
            <select name="property" defaultValue="Residential">
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <SelectChev />
          </span>
        </label>
        <label className="fld" style={fld}>
          <span style={label}>What do you need?</span>
          <span style={{ position: 'relative', display: 'block' }}>
            <select name="service" defaultValue={defaultService || FORM_OPTIONS[0]}>
              {[...FORM_OPTIONS, ...extraOptions].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <SelectChev />
          </span>
        </label>
      </div>
      <label className="fld" style={fld}>
        <span style={label}>Address or city</span>
        <input type="text" name="area" autoComplete="address-level2" placeholder="Ventura" defaultValue={defaultArea} />
      </label>
      <label className="fld" style={{ ...fld, marginBottom: compact ? 18 : 20 }}>
        <span style={label}>Anything else</span>
        <textarea name="details" rows={3} placeholder="Rough size, what is there now, and whether it needs breaking out" style={{ minHeight: compact ? 82 : 86 }} />
      </label>

      {/* Honeypot: a person never sees this, a bot fills everything. */}
      <div className="sr" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p role="alert" style={{ margin: '0 0 12px', fontSize: '.88rem', color: '#b23a1e' }}>
          {error}
        </p>
      ) : null}

      <button
        className="cta-or-d"
        type="submit"
        disabled={busy}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: compact ? '1.06rem' : '1.04rem', border: 0, borderRadius: 3, padding: 17, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.7 : 1 }}
      >
        <I id="check" size={compact ? 20 : 19} />
        {busy ? 'Sending…' : buttonLabel}
      </button>
      <p style={{ margin: compact ? '11px 0 0' : '12px 0 0', fontSize: compact ? '.79rem' : '.77rem', color: 'var(--dark-3)', textAlign: 'center' }}>
        We only use this to get back to you about the work.
      </p>
    </form>
  );
}
