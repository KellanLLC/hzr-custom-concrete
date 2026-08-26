import type { Metadata } from 'next';
import { CSSProperties } from 'react';
import { EstimateForm } from '@/components/EstimateForm';
import { Header } from '@/components/Header';
import { I } from '@/components/Icons';
import { areas } from '@/config/areas';
import { business, licensing } from '@/config/business';
import { services } from '@/config/services';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/* ── the shipped page's data, lifted out of the markup ─────────────────── */

const MARQUEE = ['Ventura County', 'Residential & commercial', 'Free estimates', 'Owner on every pour', '5.0 on Yelp', 'ASL proficient'];

const TRUST: { t: string; d: string }[] = [
  { t: licensing.trustTitle, d: licensing.trustDetail },
  { t: 'Owner on every pour', d: 'The crew that quotes it is the crew that pours it' },
  { t: '5.0 on Yelp', d: 'Every review he has, three of three' },
  { t: 'Ventura County', d: 'Based in Ventura, working the whole county' },
];

const CRAFT = [
  { img: '/images/w-grade-620.webp', alt: 'A graded and compacted dirt driveway pad, formed at the edges and ready for steel', t: 'Grade and base', d: 'Broken out, regraded and compacted before a single form goes down. Every slab that fails, failed here first; it just took four years to show.' },
  { img: '/images/w-steel-620.webp', alt: 'A driveway formed and tied out with a full grid of reinforcing steel', t: 'A full mat of steel', d: 'Tied out across the whole pad, not one strip down the middle. It is among the cheapest parts of the job and the only one you cannot add later.' },
  { img: '/images/w-trowel-620.webp', alt: 'A smooth trowelled concrete surface with a single tooled control joint running across it', t: 'Joints on our line', d: 'Concrete cracks. Ours cracks where we tooled it to, on a straight line you were shown before the pour, instead of diagonally across your driveway.' },
];

const WORK = [
  { img: '/images/w-broom-620.webp', alt: 'A finisher in a straw hat pulling a broom across a wet slab', t: 'The broom pass', d: 'One pass, one direction' },
  { img: '/images/w-sealed-620.webp', alt: 'A wide driveway finished in a deep terracotta colour and sealed to a wet gloss', t: 'Integral colour, sealed', d: 'That gloss is the sealer still wet' },
  { img: '/images/w-risers-620.webp', alt: 'Three poured concrete steps with crisp square edges, forms still standing', t: 'Three risers, one pour', d: 'Arrises straight off the edger' },
  { img: '/images/w-steel-620.webp', alt: 'A driveway formed and tied out with a full grid of reinforcing steel', t: 'A full mat of steel', d: 'Not one strip down the middle' },
  { img: '/images/w-trowel-620.webp', alt: 'A close view of a smooth trowelled concrete surface with a tooled control joint', t: 'Trowelled smooth', d: 'One tooled joint' },
  { img: '/images/w-side-620.webp', alt: 'A narrow side yard poured as a clean concrete walkway between wall and fence', t: 'Side yard, wall to fence', d: 'Cut to the line both sides' },
  { img: '/images/w-forms-620.webp', alt: 'Timber formwork and reinforcing steel set up along a street kerb line', t: 'Formed to the street', d: 'Cones out, kerb line held' },
  { img: '/images/w-fresh-620.webp', alt: 'A freshly poured pale slab running up to a garage, edged against a stone wall', t: 'Poured and floated', d: 'Protected while it cures' },
  { img: '/images/w-grade-620.webp', alt: 'A graded and compacted dirt driveway pad, formed at the edges', t: 'Graded and compacted', d: 'The half nobody photographs' },
  { img: '/images/w-colour-620.webp', alt: 'A coloured and sealed driveway at dusk with palms and the coastal range behind', t: 'Colour at dusk', d: 'Ventura County' },
];

const STEPS = [
  { t: 'Call, text or send a photo', d: 'A picture and a rough size is plenty. Anthony reads it himself and rings you back.' },
  { t: 'He walks it and quotes it', d: 'On site, on the spot, free. A real number for your job, not a range off a website.' },
  { t: 'Prep and form', d: 'Break-out, grading, base, forms and steel. A slab is decided before the truck ever arrives.' },
  { t: 'Pour, joint and cure', d: 'Placed, screeded and finished in one go, joints cut on our line. Walk it in a day or two; keep the cars off for a week.' },
];

const REVIEWS = [
  { q: 'We were more than happy with Anthony and his crew. They demolished our driveway and put in a new one. They did a great job and were very professional. Anthony was always available for questions.', by: 'Mary H.', at: 'Yelp, Sept 2024' },
  { q: 'Their work is incredible and they are great people. Their professionalism is top notch.', by: 'Josias N.', at: 'Yelp, July 2024' },
  { q: 'Great service and professional work. Will highly recommend them to anyone that needs concrete work done.', by: 'Jerry R.', at: 'Yelp, Oct 2024' },
];

const AREA_TOWNS = ['ventura', 'oxnard', 'camarillo', 'thousand-oaks', 'simi-valley', 'santa-paula', 'ojai'];

const ABOUT_FACTS = [
  { k: 'Owner on site', v: 'Anthony quotes and works every job' },
  { k: 'Licensing', v: licensing.aboutFact },
  { k: 'Pouring since', v: 'May 2024, out of Ventura' },
  { k: 'Properties', v: 'Residential and commercial' },
  { k: 'Accessibility', v: 'ASL proficient. Message him or sign on site' },
  { k: 'Payment', v: 'Cash, Zelle and cards' },
];

const ASIDE_FACTS = [
  { k: 'Service area', v: 'Ventura County, California' },
  { k: 'Hours', v: 'Mon–Thu 7–6, Fri–Sat 7–3' },
  { k: 'Estimates', v: 'Always free' },
  { k: 'Payment', v: 'Cash, Zelle and cards' },
  { k: 'Accessibility', v: 'ASL proficient' },
];

/* ── shared inline pieces, exactly as the static page set them ─────────── */

const kicker: CSSProperties = { margin: '0 0 12px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.74rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#8F4A02' };
const kickerLt: CSSProperties = { ...kicker, color: '#FD9516' };
const h2: CSSProperties = { margin: 0, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 1.3rem + 2.6vw, 3.2rem)', lineHeight: 1.02, letterSpacing: '-.024em', textWrap: 'balance' };
const sectionPad = 'clamp(60px,7vw,104px) clamp(20px,5vw,56px)';
const tileGrad = 'linear-gradient(0deg,rgba(20,19,17,.9) 0%,rgba(20,19,17,.46) 34%,rgba(20,19,17,0) 58%)';
const cardGrad = 'linear-gradient(0deg,rgba(20,19,17,.95) 4%,rgba(20,19,17,.68) 40%,rgba(20,19,17,.14) 72%,rgba(20,19,17,.02) 100%)';

function MarqueeRun() {
  return (
    <>
      {MARQUEE.map((m) => (
        <span key={m} style={{ display: 'contents' }}>
          <span style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.83rem', letterSpacing: '.13em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{m}</span>
          <span style={{ display: 'inline-flex', width: 20, height: 20, margin: '0 clamp(20px,3vw,40px)', flex: 'none' }}>
            <I id="truck" size={20} style={{ width: '100%', height: '100%', opacity: 0.55 }} />
          </span>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Header home />

      {/* ── hero ── */}
      <section id="top" data-cta-zone style={{ position: 'relative', background: '#151412', isolation: 'isolate', overflow: 'hidden', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-2000.webp" alt="Two finishers screeding a fresh driveway pour at last light, raw concrete in the foreground running out to a smooth flat slab" fetchPriority="high" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '52% 56%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(15,14,12,.9) 0%,rgba(15,14,12,.46) 20%,rgba(15,14,12,.34) 42%,rgba(15,14,12,.74) 76%,rgba(15,14,12,.96) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(15,14,12,.8) 0%,rgba(15,14,12,.44) 44%,rgba(15,14,12,.02) 82%)' }} />

        <div style={{ position: 'relative', paddingInline: 'clamp(20px,5vw,56px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ maxWidth: 1300, marginInline: 'auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(430px,100%),1fr))', gap: 'clamp(34px,4vw,72px)', alignItems: 'end', alignContent: 'center', flex: 1, padding: 'clamp(104px,20vh,240px) 0 clamp(40px,6vh,72px)' }}>
              <div>
                <h1 style={{ margin: '0 0 clamp(18px,2.4vh,26px)', maxWidth: '16ch', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(2.7rem, 1.1rem + 6vw, 5.5rem)', lineHeight: 0.98, letterSpacing: '-.032em', color: '#fff', textWrap: 'balance', textShadow: '0 2px 30px rgba(15,14,12,.45)' }}>
                  A slab gets finished <em style={{ fontStyle: 'normal', color: '#FEA12D' }}>exactly once.</em>
                </h1>
                <p style={{ margin: '0 0 clamp(30px,4.4vh,50px)', maxWidth: '46ch', fontSize: 'clamp(1rem, 0.94rem + 0.3vw, 1.12rem)', lineHeight: 1.55, color: 'rgba(255,255,255,.9)', textShadow: '0 1px 3px rgba(12,11,10,.7)' }}>
                  Which is why Anthony is standing on it, and not on the phone. Driveways, patios, retaining walls and foundations, poured and finished right across Ventura County.
                </p>

                <p style={{ margin: '0 0 8px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#FD9516' }}>Free estimate: call or text Anthony</p>
                <a className="cta-or-w" href={business.phoneHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 11, borderRadius: 3, padding: '17px clamp(19px,2.2vw,26px)', fontFamily: 'var(--font-body)', fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontSize: 'clamp(1.12rem, 0.98rem + 0.5vw, 1.38rem)', lineHeight: 1, letterSpacing: '-.01em', boxShadow: '0 10px 28px rgba(10,9,8,.34)' }}>
                  <I id="phone" size={21} />
                  Call or text {business.phone}
                </a>
                <a className="hero__ghost ghost ghost--tint" href="#estimate" style={{ alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 11, maxWidth: 340, height: 56, borderRadius: 3, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.06rem', backdropFilter: 'blur(2px)' }}>
                  <I id="check" size={19} />
                  Get my free quote
                </a>
                <p style={{ margin: '16px 0 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, fontSize: '.9rem', color: 'rgba(255,255,255,.84)', textShadow: '0 1px 3px rgba(12,11,10,.8)' }}>
                  Owner answers the phone
                  <span style={{ width: 5, height: 5, borderRadius: 99, background: '#FD9516' }} />
                  Free walk-through
                  <span style={{ width: 5, height: 5, borderRadius: 99, background: '#FD9516' }} />
                  Quoted on the spot
                </p>
              </div>

              <aside className="hero__card" aria-label="Quick estimate request" style={{ background: '#fff', borderRadius: 3, boxShadow: '0 26px 60px rgba(10,9,8,.5)', overflow: 'hidden', maxWidth: 470, width: '100%', justifySelf: 'end' }}>
                <div style={{ padding: 24 }}>
                  <EstimateForm idPrefix="hero" source="estimate" compact />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ── trust bar ── */}
      <div style={{ position: 'relative', background: '#2B2A27', padding: 'clamp(24px,3vw,32px) clamp(20px,5vw,56px)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: 1, transform: 'translate(-50%,-100%)', width: 'clamp(104px,10vw,140px)', height: 'clamp(38px,4vw,54px)', background: '#2B2A27', clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} />
        <div style={{ maxWidth: 1180, marginInline: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(230px,100%),1fr))', gap: 'clamp(20px,2.6vw,36px)' }}>
          {TRUST.map((x) => (
            <div key={x.t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <I id="check" size={20} fill="#FD9516" style={{ marginTop: 3 }} />
              <div>
                <p style={{ margin: 0, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.98rem', color: '#F7F6F3', lineHeight: 1.2 }}>{x.t}</p>
                <p style={{ margin: '3px 0 0', fontSize: '.82rem', color: '#B8B3AA', lineHeight: 1.45 }}>{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── marquee ── */}
      <div aria-hidden="true" style={{ background: '#FD9516', color: '#1E1D1B', overflow: 'hidden', padding: '12px 0' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'hzr-mq 34s linear infinite' }}>
          {/* one set, twice, so the -50% loop is seamless */}
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>

      {/* ── services ── */}
      <section id="services" style={{ background: '#F2F1EE', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: '24px clamp(34px,4vw,64px)', alignItems: 'end', marginBottom: 'clamp(30px,3.6vw,46px)' }}>
            <div>
              <p style={kicker}>What we pour</p>
              <h2 style={h2}>Eight things we do, and do properly.</h2>
            </div>
            <p style={{ margin: 0, color: '#4B4842', fontSize: '1.02rem' }}>
              Residential and commercial. Every photograph below is one of our own jobs in Ventura County, with no stock photography anywhere on this page. The crew that quotes your job is the crew that pours it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(258px,47%),1fr))', gap: 'clamp(10px,1.4vw,18px)' }}>
            {services.map((s) => (
              <a key={s.slug} href={`/services/${s.slug}`} aria-label={`${s.name}: more about this service`} style={{ display: 'block' }}>
                <article style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 3, overflow: 'hidden', background: '#2B2A27' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: cardGrad }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(13px,1.5vw,20px) clamp(13px,1.5vw,20px) clamp(14px,1.6vw,22px)', color: '#fff' }}>
                    <h3 style={{ margin: '0 0 6px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: 'clamp(1rem, .86rem + .5vw, 1.2rem)', letterSpacing: '-.012em', lineHeight: 1.14 }}>{s.name}</h3>
                    <p className="svc__d" style={{ margin: 0, fontSize: '.87rem', lineHeight: 1.5, color: 'rgba(255,255,255,.85)' }}>{s.card}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 24px', marginTop: 'clamp(26px,3vw,38px)' }}>
            <a className="cta-or-d" href="#estimate" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.02rem', padding: '16px 26px', borderRadius: 3 }}>
              <I id="check" size={19} />
              Get a free estimate
            </a>
            <p style={{ margin: 0, fontSize: '.95rem', color: '#4B4842' }}>
              Not sure which one you need?{' '}
              <a href={business.phoneHref} style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, color: '#8F4A02' }}>
                Call {business.phone}
              </a>{' '}
              and describe it.
            </p>
          </div>
        </div>
      </section>

      {/* ── the forty-year decision ── */}
      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto' }}>
          <div style={{ maxWidth: '62ch', marginBottom: 'clamp(30px,3.6vw,46px)' }}>
            <p style={kicker}>The forty-year decision</p>
            <h2 style={{ ...h2, margin: '0 0 14px' }}>Everything that matters happens before the truck arrives.</h2>
            <p style={{ margin: 0, color: '#67635C', fontSize: '1.02rem' }}>
              A finished slab hides its own workmanship, so here is the half you would never see. Anyone can pour concrete. This is the difference between forty years and four.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(290px,100%),1fr))', gap: 'clamp(20px,2.4vw,30px)' }}>
            {CRAFT.map((c) => (
              <div key={c.t}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.alt} loading="lazy" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 3, marginBottom: 16 }} />
                <h3 style={{ margin: '0 0 7px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.28rem', letterSpacing: '-.014em' }}>{c.t}</h3>
                <p style={{ margin: 0, fontSize: '.95rem', color: '#67635C', lineHeight: 1.58 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── our work ── */}
      <section id="work" style={{ background: '#F2F1EE', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: '20px clamp(34px,4vw,64px)', alignItems: 'end', marginBottom: 'clamp(28px,3.4vw,42px)' }}>
            <div>
              <p style={kicker}>Our work</p>
              <h2 style={h2}>Recent pours.</h2>
            </div>
            <div>
              <p style={{ margin: '0 0 16px', color: '#4B4842', fontSize: '1.02rem' }}>
                The demo, the grade, the steel, the pour, and the finish it wears for the next forty years. All of it his own crew, all of it in this county.
              </p>
              <a className="lnk-ig" href={business.social.instagram} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.94rem', paddingBottom: 3 }}>
                See more on Instagram
                <I id="out" size={17} />
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(206px,46%),1fr))', gap: 'clamp(10px,1.2vw,16px)' }}>
            {WORK.map((w) => (
              <div key={w.t} style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 3, overflow: 'hidden', background: '#2B2A27' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.img} alt={w.alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: tileGrad }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '13px 14px 12px' }}>
                  <p style={{ margin: 0, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.92rem', lineHeight: 1.24, color: '#fff' }}>{w.t}</p>
                  <p style={{ margin: '1px 0 0', fontSize: '.76rem', color: 'rgba(255,255,255,.82)' }}>{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── how it goes ── */}
      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto' }}>
          <div style={{ marginBottom: 'clamp(30px,3.6vw,46px)' }}>
            <p style={kicker}>How it goes</p>
            <h2 style={{ ...h2, maxWidth: '24ch' }}>From first call to final cure.</h2>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: 'clamp(22px,2.8vw,38px)' }}>
            {STEPS.map((s, i) => (
              <li key={s.t} style={{ borderTop: '3px solid #FD9516', paddingTop: 18 }}>
                <p aria-hidden="true" style={{ margin: '0 0 8px', fontFamily: 'Excon,sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 1.6rem + 1.4vw, 3rem)', lineHeight: 1, color: 'rgba(30,29,27,.15)' }}>{`0${i + 1}`}</p>
                <h3 style={{ margin: '0 0 7px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.16rem', lineHeight: 1.2, letterSpacing: '-.012em' }}>{s.t}</h3>
                <p style={{ margin: 0, fontSize: '.93rem', lineHeight: 1.56, color: '#67635C' }}>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── about anthony ── */}
      <section id="anthony" style={{ background: '#2B2A27', color: '#F7F6F3', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(380px,100%),1fr))', gap: 'clamp(30px,4vw,72px)', alignItems: 'start' }}>
          <figure style={{ margin: 0, position: 'relative', borderRadius: 3, overflow: 'hidden', maxWidth: 460 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about-700.webp" alt="A finisher pulling a broom across a wet slab in the sun" loading="lazy" style={{ width: '100%', aspectRatio: '5/6', objectFit: 'cover' }} />
            <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '48px 22px 20px', color: '#fff', background: 'linear-gradient(0deg,rgba(20,19,17,.92),rgba(20,19,17,0))', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.02rem' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.66rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#FD9516', marginBottom: 4 }}>Owner, HZR Custom Concrete</span>
              Anthony Huizar, Ventura
            </figcaption>
          </figure>

          <div>
            <p style={kickerLt}>About HZR</p>
            <h2 style={{ ...h2, margin: '0 0 16px', color: '#F7F6F3' }}>
              He answers <em style={{ fontStyle: 'normal', color: '#FD9516' }}>his own phone.</em>
            </h2>
            <p style={{ margin: '0 0 14px', color: '#C8C3BA', maxWidth: '58ch', fontSize: '1.02rem' }}>
              No call centre, no dispatcher, no salesman who never touches a float. Anthony Huizar quotes the job, forms the job and is standing on the slab while it is finished, because a slab gets finished exactly once.
            </p>
            <p style={{ margin: '0 0 14px', color: '#C8C3BA', maxWidth: '58ch', fontSize: '1.02rem' }}>
              He started HZR in May 2024 and works out of Ventura, across the county. Residential and commercial, and every estimate free.
            </p>
            <dl style={{ margin: 'clamp(22px,3vw,30px) 0 0', display: 'grid', borderBottom: '1px solid rgba(247,246,243,.17)' }}>
              {ABOUT_FACTS.map((f) => (
                <div key={f.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,168px) minmax(0,1fr)', gap: '8px 20px', padding: '12px 0', borderTop: '1px solid rgba(247,246,243,.17)' }}>
                  <dt style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.86rem', color: '#FD9516' }}>{f.k}</dt>
                  <dd style={{ margin: 0, fontSize: '.93rem', color: '#B8B3AA' }}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── reviews ── */}
      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: '20px clamp(34px,4vw,64px)', alignItems: 'end', marginBottom: 'clamp(26px,3.2vw,40px)' }}>
            <div>
              <p style={kicker}>What people say</p>
              <h2 style={h2}>Every review he has, as written.</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifySelf: 'start' }}>
              <div style={{ display: 'flex', gap: 2 }} aria-label="Rated 5 out of 5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <I key={i} id="star" size={20} fill="#FD9516" />
                ))}
              </div>
              <p style={{ margin: 0, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.06rem' }}>
                5.0 <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '.9rem', color: '#67635C' }}>/ 3 reviews on Yelp</span>
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(290px,100%),1fr))', gap: 'clamp(18px,2.2vw,28px)' }}>
            {REVIEWS.map((r) => (
              <blockquote key={r.by} style={{ margin: 0, display: 'flex', flexDirection: 'column', borderLeft: '3px solid #FD9516', padding: '4px 0 4px 20px' }}>
                <p style={{ margin: '0 0 14px', flex: 1, fontSize: '1rem', lineHeight: 1.6, color: '#1E1D1B' }}>{r.q}</p>
                <footer style={{ fontSize: '.84rem' }}>
                  <b style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, color: '#1E1D1B' }}>{r.by}</b>
                  <span style={{ color: '#67635C' }}> · {r.at}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── service area ── */}
      <section id="area" style={{ background: '#2B2A27', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(420px,100%),1fr))', gap: 'clamp(30px,4vw,64px)', alignItems: 'center' }}>
          <div>
            <p style={{ ...kickerLt, display: 'flex', alignItems: 'center', gap: 9 }}>
              <I id="pin" size={15} fill="#FD9516" />
              Where we pour
            </p>
            <h2 style={{ ...h2, margin: '0 0 16px', color: '#F7F6F3' }}>If it&rsquo;s in Ventura County, he pours in it.</h2>
            <p style={{ margin: '0 0 clamp(22px,2.6vw,30px)', maxWidth: '44ch', fontSize: '1.02rem', color: '#B8B3AA' }}>
              Based in Ventura, working the whole county, coast to the valleys. Not sure whether you&rsquo;re in range? Call and he&rsquo;ll tell you straight.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '2px clamp(14px,1.8vw,22px)', borderTop: '1px solid rgba(247,246,243,.17)', borderBottom: '1px solid rgba(247,246,243,.17)', padding: 'clamp(18px,2.2vw,24px) 0' }}>
              {AREA_TOWNS.map((slug) => {
                const t = areas.find((a) => a.slug === slug)!;
                return (
                  <p key={slug} style={{ margin: 0 }}>
                    <a href={`/service-area/${slug}`} style={{ fontFamily: 'Excon,sans-serif', fontWeight: 900, fontSize: 'clamp(1.35rem, 0.9rem + 1vw, 1.95rem)', lineHeight: 1.24, letterSpacing: '-.024em', color: '#F7F6F3' }}>
                      {t.name}
                      <span style={{ color: '#FD9516' }}>.</span>
                    </a>
                  </p>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 20px', marginTop: 'clamp(22px,2.6vw,30px)' }}>
              <a className="cta-or-w" href={business.phoneHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.02rem', padding: '16px 24px', borderRadius: 3 }}>
                <I id="phone" size={19} />
                Call {business.phone}
              </a>
              <p style={{ margin: 0, fontSize: '.92rem', color: '#B8B3AA' }}>Free estimates anywhere in the county.</p>
            </div>
          </div>

          <figure style={{ margin: 0, borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(247,246,243,.2)', background: '#1E1D1B' }}>
            <iframe
              title="Map of HZR Custom Concrete's service area, Ventura County, California"
              src="https://www.google.com/maps?q=Ventura+County,+California&z=9&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ display: 'block', width: '100%', aspectRatio: '4/3', minHeight: 340, border: 0, filter: 'saturate(.9) contrast(1.02)' }}
            />
            <figcaption style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px', padding: '14px 16px', borderTop: '1px solid rgba(247,246,243,.2)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '.86rem', color: '#F7F6F3' }}>
                <I id="pin" size={15} fill="#FD9516" />
                Based in Ventura, CA
              </span>
              <span style={{ fontSize: '.84rem', color: '#B8B3AA' }}>Serving all of Ventura County · Residential &amp; commercial</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── estimate ── */}
      <section id="estimate" data-cta-zone style={{ background: '#F2F1EE', padding: sectionPad }}>
        <div style={{ maxWidth: 1180, marginInline: 'auto' }}>
          <div style={{ marginBottom: 'clamp(28px,3.4vw,44px)' }}>
            <p style={kicker}>Free estimate</p>
            <h2 style={{ ...h2, margin: '0 0 14px', maxWidth: '26ch' }}>Tell him about the job. He&rsquo;ll take it from there.</h2>
            <p style={{ margin: 0, maxWidth: '62ch', color: '#4B4842', fontSize: '1.02rem' }}>
              A rough size and what is there now is enough to start. Anthony reads it, calls you back and walks the job with you: free, on site, quoted on the spot.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(400px,100%),1fr))', gap: 'clamp(16px,2vw,26px)', alignItems: 'start' }}>
            <div style={{ background: '#fff', borderRadius: 3, padding: 'clamp(22px,2.6vw,34px)', border: '1px solid rgba(30,29,27,.09)' }}>
              <EstimateForm idPrefix="est" source="estimate" buttonLabel="Request my free estimate" />
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
              <div style={{ display: 'grid', gap: 10, marginBottom: 22, position: 'relative' }}>
                <a className="cta-or-w" href={business.phoneHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.03rem', padding: 16, borderRadius: 3 }}>
                  <I id="phone" size={19} />
                  Call Anthony
                </a>
                <a className="ghost" href={business.smsHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.03rem', padding: 16, borderRadius: 3 }}>
                  Text a photo of the job
                </a>
              </div>
              <dl style={{ margin: 0, display: 'grid', position: 'relative', borderBottom: '1px solid rgba(247,246,243,.17)' }}>
                {ASIDE_FACTS.map((f) => (
                  <div key={f.k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,112px) minmax(0,1fr)', gap: '8px 16px', padding: '11px 0', borderTop: '1px solid rgba(247,246,243,.17)', fontSize: '.87rem' }}>
                    <dt style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, color: '#FD9516' }}>{f.k}</dt>
                    <dd style={{ margin: 0, color: '#B8B3AA' }}>{f.v}</dd>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,112px) minmax(0,1fr)', gap: '8px 16px', padding: '11px 0', borderTop: '1px solid rgba(247,246,243,.17)', fontSize: '.87rem' }}>
                  <dt style={{ fontFamily: 'Excon,sans-serif', fontWeight: 700, color: '#FD9516' }}>Instagram</dt>
                  <dd style={{ margin: 0, color: '#B8B3AA' }}>
                    <a className="ft-a" href={business.social.instagram} target="_blank" rel="noopener">
                      {business.social.instagramHandle}
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
