/**
 * The eight things HZR pours, one page each. Copy stays inside what the live
 * site already claims: no licensing line, no job counts, no invented specs.
 * Photos are Anthony's own, the same files the home page uses.
 */

export type Service = {
  slug: string;
  /** Page + card title, e.g. "Driveways & Aprons". */
  name: string;
  /** The matching option in the estimate form's "What do you need?" select. */
  formOption: string;
  /** Singular noun for running copy: 'driveway', 'retaining wall'… */
  noun: string;
  /** The one-liner from the home page card. */
  card: string;
  img: string;
  alt: string;
  /** H1, held to one or two lines. */
  h1: string;
  lede: string;
  body: [string, string, string];
  facts: { key: string; val: string; note: string }[];
  /** Slugs of the three services most often asked about alongside this one. */
  related: [string, string, string];
};

export const services: Service[] = [
  {
    slug: 'driveways',
    name: 'Driveways & Aprons',
    noun: 'driveway',
    formOption: 'Driveway or apron',
    card: 'Broken out, regraded, formed and poured on a compacted base, then jointed so it cracks on our line and not its own.',
    img: '/images/svc-drive-620.webp',
    alt: 'A finished concrete driveway running clean up to a garage between a stone wall and a fence',
    h1: 'Driveways that outlast the cars parked on them.',
    lede: 'The old slab broken out and hauled off, the base regraded and compacted, a full mat of steel, and a pour finished by the man who quoted it.',
    body: [
      'A driveway is the hardest-working slab on the property: it carries cars daily, it bakes in the sun, and everyone who visits walks up it first. Most driveway failures are not concrete failures at all: they are base failures. So the job starts under the surface: break-out and haul-off of what is there, regrading so water runs away from the garage, and compaction before a single form goes down.',
      'Then steel, tied out across the whole pad rather than one strip down the middle, and a pour screeded, floated and finished in one continuous operation. Control joints are tooled on straight lines you were shown before the pour, so when the slab does what concrete does, it cracks where we told it to.',
      'Finish is your call: a clean broom pass for grip, smooth trowel, integral colour, or a stamped pattern with sealer. The apron at the street gets formed to the kerb line and matched to the public sidewalk grade, cones out until it cures.',
    ],
    facts: [
      { key: 'Includes', val: 'Demo to broom pass', note: 'Break-out, haul-off, grading, base, forms, steel, pour and finish, one crew end to end.' },
      { key: 'Steel', val: 'A full mat, tied', note: 'The cheapest part of the job and the only one you cannot add later.' },
      { key: 'Back on it', val: 'Walk in 1–2 days', note: 'Keep the cars off for a week while it comes up to strength.' },
      { key: 'Quoted', val: 'On site, free', note: 'Anthony walks it with you and gives you a real number on the spot.' },
    ],
    related: ['patios', 'walkways', 'demolition-repair'],
  },
  {
    slug: 'patios',
    name: 'Patios & Back Yards',
    noun: 'patio or yard',
    formOption: 'Patio or back yard',
    card: 'Whole yards taken from dirt to a finished slab, scored on a grid and pitched so the water leaves the house.',
    img: '/images/svc-patio-620.webp',
    alt: 'A large back yard slab scored into a regular grid of squares',
    h1: 'From dirt yard to a slab you live on.',
    lede: 'Patios, whole back yards and side runs, graded and pitched so water leaves the house, scored on a grid that was drawn before the truck came.',
    body: [
      'A back yard pour is where layout matters most, because you look at it every day from the kitchen window. The scoring grid is set out on paper first: squares sized to the space, lines that land where the eye expects them. The whole slab is pitched away from the house so winter rain drains to the yard, not the door sill.',
      'The prep is the same discipline as a driveway: grade, compacted base, forms, and steel across the full pad. On a yard that has never had concrete, that usually means cutting high spots and building up low ones until the fall is right, which is exactly the part you cannot see in the finished photograph and exactly the part that decides whether it puddles.',
      'Finishes run from a fine broom to smooth trowel to stamped and coloured work. Side yards get poured wall-to-fence and cut to the line on both sides, so the strip that used to be mud is the cleanest walk on the property.',
    ],
    facts: [
      { key: 'Includes', val: 'Grade to finish', note: 'Excavation and grading, base, forms, steel, pour, scoring and sealer where wanted.' },
      { key: 'Drainage', val: 'Pitched to plan', note: 'The fall is set at the grading stage, before any concrete arrives.' },
      { key: 'Layout', val: 'Scored on a grid', note: 'Shown to you before the pour, not improvised behind the truck.' },
      { key: 'Quoted', val: 'On site, free', note: 'A rough size and a photo is enough to start; the number comes from the walk-through.' },
    ],
    related: ['custom-stamped', 'steps-pool-decks', 'walkways'],
  },
  {
    slug: 'walkways',
    name: 'Walkways & Sidewalks',
    noun: 'walkway',
    formOption: 'Walkway or sidewalk',
    card: 'Paths and public sidewalk cut to the curve of the bed, formed in place and finished to match what is already there.',
    img: '/images/svc-walk-560.webp',
    alt: 'A curving front walkway stamped and coloured to look like irregular flagstone',
    h1: 'Walkways cut to the curve of the yard.',
    lede: 'Front paths, garden walks and public sidewalk, formed in place to the line of the bed and finished to match what is already on the street.',
    body: [
      'A walkway is a small pour with no room to hide anything: every edge is at eye level and both sides are on show. Curves are formed in place with flexible forms that follow the bed, widths are held constant around the bend, and the surface is finished to match its neighbours: broom to match the city sidewalk, or stamped flagstone where the path is the feature.',
      'Public sidewalk repair is its own discipline: matching the existing grade and joint spacing, forming to the kerb, and keeping the panel square so the new work reads as part of the street rather than a patch. Tree-root heaves get the root barrier conversation before the pour, not after.',
      'Steps in a walkway are cast with the run, risers even to the fraction, because an uneven step is the one everyone trips on. Where a path meets the driveway or the porch, the joint is tooled, not left to chance.',
    ],
    facts: [
      { key: 'Formed', val: 'In place, to the curve', note: 'Flexible forms follow the bed line; widths hold constant through the bend.' },
      { key: 'Matching', val: 'Grade and finish', note: 'New panels read as part of the street, not a patch on it.' },
      { key: 'Steps', val: 'Cast with the run', note: 'Even risers, tooled nosings, no surprises underfoot.' },
      { key: 'Quoted', val: 'On site, free', note: 'Measure nothing; Anthony brings the tape.' },
    ],
    related: ['driveways', 'steps-pool-decks', 'custom-stamped'],
  },
  {
    slug: 'steps-pool-decks',
    name: 'Steps & Pool Decks',
    noun: 'steps or pool deck',
    formOption: 'Steps or pool deck',
    card: 'Risers cast in one pour with the edges run straight, and deck surfaces finished for wet feet rather than for a photo.',
    img: '/images/svc-steps-620.webp',
    alt: 'Poured concrete steps curving down into a pool shell with the forms still standing',
    h1: 'Steps cast in one pour, decks finished for wet feet.',
    lede: 'Entry steps, garden stairs and pool surrounds: risers even, arrises straight off the edger, and surfaces textured for bare feet, not for a photo.',
    body: [
      'Steps are the least forgiving thing on this list. Risers have to be even to the eye and the foot, because a half-inch difference between two steps is the one everyone stumbles on. So they are formed as a set and cast in one pour, edges run straight with the edger while the concrete is still workable. No cold joints between treads, no patched noses.',
      'Pool decks are a different problem: the surface lives wet. The finish has to grip a bare foot without grating it, drain away from the water without a visible tilt, and take sun and pool chemistry without powdering. A fine broom, a salt finish or a light texture does that; a hard steel trowel, glassy when wet, does not, so we will talk you out of it.',
      'Curved steps into a pool shell, cantilevered coping, and decks poured around existing equipment pads are all formed and poured to the shape that is there. The forms come off when the concrete says so, not when the schedule does.',
    ],
    facts: [
      { key: 'Risers', val: 'Even, cast as a set', note: 'One pour, edges run while workable, no patched noses.' },
      { key: 'Deck surface', val: 'Textured for grip', note: 'Broom, salt or light texture; never glassy trowel around water.' },
      { key: 'Drainage', val: 'Away from the pool', note: 'Pitched in the forms, invisible in the finish.' },
      { key: 'Quoted', val: 'On site, free', note: 'Photos of the existing steps or shell are a good start.' },
    ],
    related: ['patios', 'custom-stamped', 'walkways'],
  },
  {
    slug: 'retaining-walls',
    name: 'Retaining Walls',
    noun: 'retaining wall',
    formOption: 'Retaining wall',
    card: 'Formed, braced and tied out in steel before anything is poured, because a wall that moves takes the yard with it.',
    img: '/images/svc-wall-620.webp',
    alt: 'Braced timber formwork with snap ties standing ready to pour a concrete wall',
    h1: 'Walls that hold the hill where it is.',
    lede: 'Poured-in-place retaining walls, formed and braced in timber, tied out in steel, and poured against ground that is not going anywhere afterwards.',
    body: [
      'A retaining wall is structure, not landscaping. It carries the weight of the earth behind it every day it stands, which is why the visible pour is the last and quickest part of the job. Before it: footing trenched to depth, steel tied from the footing up through the wall, forms braced against the pressure of wet concrete, and snap ties holding the faces parallel.',
      'Drainage is what separates a wall that lasts from a wall that leans. Water trapped behind a wall pushes harder than the soil does, so gravel backfill and drainage at the heel go in as part of the job: the part nobody sees and the reason the wall stays plumb through the wet winters this county actually gets.',
      'Garden terraces, driveway cuts and yard-levelling walls are all the same discipline at different heights. Where a wall needs engineering, we say so before quoting rather than pouring something we would not stand behind.',
    ],
    facts: [
      { key: 'Structure', val: 'Footing + tied steel', note: 'Steel runs from the footing up through the wall, not dropped in after.' },
      { key: 'Forms', val: 'Braced both faces', note: 'Wet concrete pushes hard; the forms are built for it.' },
      { key: 'Drainage', val: 'Built in at the heel', note: 'Water pressure, not soil, is what moves a bad wall.' },
      { key: 'Quoted', val: 'On site, free', note: 'Height and length is enough to talk; the walk-through settles it.' },
    ],
    related: ['footings-foundations', 'demolition-repair', 'driveways'],
  },
  {
    slug: 'footings-foundations',
    name: 'Footings & Foundations',
    noun: 'footings or foundation',
    formOption: 'Footings or foundation',
    card: 'Trenches dug to depth, formed and tied for additions, garages and new structures. The part nobody sees again.',
    img: '/images/svc-footing-620.webp',
    alt: 'Formed and steeled footing trenches dug around a framed structure',
    h1: 'The part of the building nobody sees again.',
    lede: 'Footings and slab foundations for additions, garages, ADUs and new structures: trenched to depth, formed square, steel tied to the plan, poured to inspection.',
    body: [
      'Everything above the ground stands on this work, and once it is poured it is never seen again, which is exactly why it is done in the open, to the plan, with the steel tied and visible before the truck is called. Trenches go to the depth the drawings and the soil call for, forms are set square and to elevation, and anchor bolts land where the framer needs them.',
      'This is the trade where working with inspectors is simply part of the sequence: trenches and steel are ready for sign-off before the pour is scheduled, and the pour happens after it. A footing poured before its inspection is a footing dug out again, so the sequence is respected.',
      'Garage slabs, addition footings, porch foundations and equipment pads all come through here. On sloped lots the footing steps down the grade in the forms, which is carpentry as much as concrete, and it is the difference between a level structure and a compromised one.',
    ],
    facts: [
      { key: 'To the plan', val: 'Depth, steel, bolts', note: 'Trenched and tied to the drawings, anchor bolts set for the framer.' },
      { key: 'Inspection', val: 'Before the pour', note: 'Steel is signed off in the open; the truck comes after.' },
      { key: 'For', val: 'Additions, garages, ADUs', note: 'Residential and commercial structures across the county.' },
      { key: 'Quoted', val: 'From the plans, free', note: 'Send the drawings or have Anthony walk the site.' },
    ],
    related: ['retaining-walls', 'driveways', 'demolition-repair'],
  },
  {
    slug: 'custom-stamped',
    name: 'Custom & Stamped Finishes',
    noun: 'custom finish',
    formOption: 'Custom or stamped finish',
    card: 'Broom, smooth trowel, salt, stamped flagstone, integral colour and sealer. The finish is what you look at for years.',
    img: '/images/svc-finish-620.webp',
    alt: 'A wide driveway finished in a deep terracotta colour and sealed to a wet gloss',
    h1: 'The surface is what you look at for forty years.',
    lede: 'Stamped flagstone, integral colour, salt and trowel finishes, and sealer that brings the colour up: the visible one percent of the job, done properly.',
    body: [
      'Two identical slabs part ways in the last hour of the pour. The finish is a timing trade: every pass (float, trowel, broom, stamp) has a window, and the window is read off the concrete, not off a watch. That is why the finisher who quotes the job is the one standing on it when that hour comes.',
      'Stamped work is flagstone, slate or stone textures pressed into the surface with colour released into the joints, then sealed so the colour reads wet. Integral colour goes into the mix at the plant, so the colour runs the full depth of the slab, so a chip shows the same colour, not grey. Between those sit the quiet finishes: a fine broom laid in one direction, a salt finish for a soft mottled texture, smooth steel trowel where grip is not a concern.',
      'Sealer is the maintenance conversation nobody has until the gloss goes: stamped and coloured work wants resealing every few years, and we tell you that before you choose it, because the right finish is the one you will still be glad of when the sealer is due.',
    ],
    facts: [
      { key: 'Stamped', val: 'Flagstone, slate, stone', note: 'Colour in the mix, release in the joints, sealer over the top.' },
      { key: 'Integral colour', val: 'Full-depth', note: 'Batched at the plant, so a chip shows colour rather than grey.' },
      { key: 'Quiet options', val: 'Broom, salt, trowel', note: 'One direction, one texture, edges run clean.' },
      { key: 'Honest advice', val: 'Included', note: 'If a finish is wrong for the spot (a slick trowel around a pool, say), we say so.' },
    ],
    related: ['patios', 'driveways', 'steps-pool-decks'],
  },
  {
    slug: 'demolition-repair',
    name: 'Demolition & Repair',
    noun: 'demo or repair',
    formOption: 'Demolition or repair',
    card: 'Old slab broken out and hauled off, or patched where a patch will genuinely hold. We will tell you which one it is.',
    img: '/images/svc-repair-620.webp',
    alt: 'A mini excavator breaking out an old driveway beside a stone retaining wall',
    h1: 'Broken out and hauled off, or honestly repaired.',
    lede: 'Slab demolition with the machine and the truck to remove it, and repair work where a repair will genuinely hold, with a straight answer about which one your slab needs.',
    body: [
      'Most concrete jobs in this county start with old concrete in the way. Break-out is machine work: a breaker on the excavator, the slab lifted in pieces, loaded and hauled off, and the grade left ready for whatever comes next. Saw-cutting keeps the demolition edge straight where part of a slab stays: a clean cut against the neighbour panel instead of a shattered seam.',
      'Repair is the honest conversation. A spalled surface, a lifted panel, a cracked corner: some of these can be cut out and re-poured as a panel that matches, and some are symptoms of a base failure that will crack any patch laid over it. The difference is visible on a walk-through, and you get told which yours is, even when the answer is the cheaper one.',
      'Trip hazards on walks, driveway panels heaved by roots, and slabs left behind by removed spas and sheds are the everyday version of this work. Small jobs are still jobs; the same crew comes.',
    ],
    facts: [
      { key: 'Break-out', val: 'Machine + haul-off', note: 'Broken, loaded and gone, grade left ready for the next pour.' },
      { key: 'Saw-cutting', val: 'Clean panel edges', note: 'Where part of the slab stays, the joint is cut straight, not smashed.' },
      { key: 'Repairs', val: 'Only where they hold', note: 'A patch over a base failure is money down the drain; we say so.' },
      { key: 'Quoted', val: 'On site, free', note: 'A photo of the damage is usually enough to start the conversation.' },
    ],
    related: ['driveways', 'patios', 'retaining-walls'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** The estimate form's "What do you need?" options, in the live site's order. */
export const FORM_OPTIONS = [...services.map((s) => s.formOption), 'Not sure yet'];
