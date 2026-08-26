import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { EstimateBand, PageHead, sectionPad, wrap } from '@/components/page/Page';
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
  title: 'Straight Answers About Concrete Work',
  description:
    'What a driveway costs, when you can drive on it, why concrete cracks, and how a free HZR estimate works. Straight answers from an owner-run Ventura County crew.',
  alternates: { canonical: '/faq' },
};

const QA: { q: string; a: string }[] = [
  {
    q: 'What does a new driveway or patio cost?',
    a: 'A real number needs a look at the job: the size, what has to be broken out, how the grade runs, and what finish you want all move it. That is why there is no price table on this website: a range wide enough to be true would be too wide to be useful. Anthony walks the job with you and quotes it on the spot, free, and the number he gives is for your job, not an average of other people’s.',
  },
  {
    q: 'Do you really not charge for estimates?',
    a: 'Really. Call, text a photo, or send the form; Anthony comes out, walks it with you, and you get a number before he leaves. No charge, no obligation, and no salesman following up three times a week; he is on a pour, not in an office.',
  },
  {
    q: 'How soon can I walk and drive on new concrete?',
    a: 'Walk on it in a day or two. Keep cars off it for about a week while it comes up to strength: concrete keeps hardening long after it looks done, and the first week decides a lot. We tell you exact timings for your pour before we leave the job.',
  },
  {
    q: 'Will it crack?',
    a: 'Concrete cracks; anyone who promises otherwise is selling something. What a good crew controls is where. Control joints are tooled on straight lines you are shown before the pour, so the slab cracks on our line instead of diagonally across your driveway. The rest of the protection is in the half you never see: a compacted base and a full mat of steel.',
  },
  {
    q: 'Why does the preparation matter so much?',
    a: 'Because every slab that fails, failed under the surface first; it just took four years to show. Grading and compaction decide whether the ground moves; steel decides what happens if it does; joints decide where the stress goes. That work is most of the job and all of the lifespan, which is why it is most of what we photograph.',
  },
  {
    q: 'Do you break out and haul off the old concrete?',
    a: 'Yes: most jobs start that way. Machine break-out, loading and haul-off are part of the quote, and where only part of a slab goes, the edge is saw-cut straight so the new work meets a clean line, not a shattered one.',
  },
  {
    q: 'Can a cracked slab be repaired instead of replaced?',
    a: 'Sometimes, and you will get a straight answer about which yours is. A settled corner or one bad panel can often be cut out and re-poured. A slab cracking because its base failed will crack any patch laid over it, and we say so rather than take money for a repair that will not hold.',
  },
  {
    q: 'What about permits and inspections?',
    a: 'Structural work, meaning footings, foundations and some walls, is built to the plans and poured after inspection, in that order. Trenches and steel are ready for sign-off before the truck is scheduled. For flatwork, requirements vary by city and by what you are pouring; it is part of the walk-through conversation.',
  },
  {
    q: 'What finishes can I choose?',
    a: 'Broom, smooth trowel, salt, stamped patterns, integral colour and sealer. Stamped and coloured work looks superb and wants resealing every few years, and you hear that before you choose it, not after. Around pools we will steer you away from slick finishes regardless of how they photograph.',
  },
  {
    q: 'Where do you work, and how do I pay?',
    a: 'All of Ventura County, out of Ventura; the drive never changes the price. Payment is cash, Zelle or cards, agreed before the work starts. And Anthony is ASL proficient: message him or sign on site, estimates work exactly the same.',
  },
];

export default function FAQ() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QA.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    })),
    url: `${SITE_URL}/faq`,
  };

  return (
    <>
      <Header />
      <PageHead
        kickerText="Straight answers"
        title={
          <>
            The questions everyone asks. <em style={{ fontStyle: 'normal', color: '#FEA12D' }}>Answered straight.</em>
          </>
        }
        lede="What it costs, when you can drive on it, why concrete cracks, and what actually decides whether a slab lasts forty years. If yours is not here, call and ask it."
      />

      <section style={{ background: '#fff', padding: sectionPad }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(420px,100%),1fr))', gap: 'clamp(26px,3.2vw,44px) clamp(34px,4vw,64px)' }}>
          {QA.map((x) => (
            <div key={x.q} style={{ borderLeft: '3px solid #FD9516', padding: '4px 0 4px 20px' }}>
              <h2 style={{ margin: '0 0 8px', fontFamily: 'Excon,sans-serif', fontWeight: 700, fontSize: '1.22rem', lineHeight: 1.2, letterSpacing: '-.014em', color: '#1E1D1B' }}>{x.q}</h2>
              <p style={{ margin: 0, fontSize: '.97rem', lineHeight: 1.62, color: '#4B4842' }}>{x.a}</p>
            </div>
          ))}
        </div>
      </section>

      <EstimateBand idPrefix="faq" source="estimate" title="Still got one? Ask it with the form." copy="Anything about your own slab is easiest answered standing on it. Send the form or call, and Anthony will come see it, free." />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
