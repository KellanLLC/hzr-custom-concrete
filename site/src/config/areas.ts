/**
 * The towns HZR works, with what each one usually needs from a concrete
 * crew. Drive times are from Ventura and are rounded, not promised. Nothing
 * here claims a job that was not done: each page says what the crew pours
 * and why it suits the place, then hands over to the phone.
 */

export type Area = {
  slug: string;
  name: string;
  /** Minutes from Ventura, rounded. 0 = home ground. */
  minutes: number;
  /** One line for the hub list. */
  line: string;
  /** Two short paragraphs for the town page, in the house voice. */
  body: [string, string];
  /** Which three services to put first on that page (slugs from services.ts). */
  focus: [string, string, string];
};

export const areas: Area[] = [
  {
    slug: 'ventura',
    name: 'Ventura',
    minutes: 0,
    line: 'Home ground. Hillside lots, beach streets, and everything between.',
    body: [
      'Ventura is where Anthony lives and works out of, so a walk-through here is a short drive rather than an appointment. The town runs from the hillside avenues above Main Street, with their sloped drives, steps and retaining walls holding the grade, down to the flat beach-side streets where salt air and sandy soil do their slow work on old slabs.',
      'The everyday work in town is driveways on the older lots, back yards taken from packed dirt to a scored slab, and public-sidewalk panels heaved by street trees. All of it is quoted on the spot, on site, free.',
    ],
    focus: ['driveways', 'retaining-walls', 'walkways'],
  },
  {
    slug: 'oxnard',
    name: 'Oxnard',
    minutes: 15,
    line: 'The biggest city in the county. Driveways, patios, and commercial pads.',
    body: [
      'Oxnard is the county’s biggest city and its flattest, which makes it straightforward pouring: long ranch-style driveways in the older neighbourhoods, patio slabs behind the post-war housing stock, and equipment pads and aprons for the commercial yards around the harbour and the industrial streets.',
      'Flat ground still needs fall. The grading conversation on an Oxnard job is about getting water to leave a yard that has nowhere obvious to send it, and that is decided at the base stage, before any concrete arrives.',
    ],
    focus: ['driveways', 'patios', 'demolition-repair'],
  },
  {
    slug: 'camarillo',
    name: 'Camarillo',
    minutes: 25,
    line: 'Established neighbourhoods and new builds off the 101.',
    body: [
      'Camarillo splits between established neighbourhoods where the original forty-year-old driveways are reaching the end of their life, and newer builds toward the outlets where the yard is still dirt behind a finished house. The first wants break-out and a proper re-pour; the second wants a patio, walkways and a side run, poured once and poured right.',
      'Stamped and coloured work does well here: front walks in flagstone patterns, coloured driveways sealed to a soft gloss. The finish options are all on the table at the walk-through.',
    ],
    focus: ['driveways', 'patios', 'custom-stamped'],
  },
  {
    slug: 'thousand-oaks',
    name: 'Thousand Oaks',
    minutes: 40,
    line: 'The east county. Bigger lots, slopes, and pool decks.',
    body: [
      'Thousand Oaks and its neighbourhoods sit on rolling ground, which means the work leans structural: retaining walls holding a usable flat out of a sloped yard, steps running down a grade, and driveways with real fall on them. Pool decks are the other constant: surrounds re-poured with a texture that grips a wet foot.',
      'It is a longer drive from Ventura and the estimate is still free. A photo of the slope and a rough size is a good way to start the conversation before anyone is on the road.',
    ],
    focus: ['retaining-walls', 'steps-pool-decks', 'driveways'],
  },
  {
    slug: 'simi-valley',
    name: 'Simi Valley',
    minutes: 45,
    line: 'The far end of the run. Same prices, longer drive.',
    body: [
      'Simi Valley is the far end of the regular run, and the work is the county’s usual mix: driveways due for replacement in the seventies-built neighbourhoods, back yard slabs and patio extensions, and RV pads beside the house, a Simi speciality, poured thick enough for what actually parks on them.',
      'The drive is longer; the prices are not different. Anthony walks the job once, quotes it on the spot, and the crew that quoted it is the crew that pours it.',
    ],
    focus: ['driveways', 'patios', 'footings-foundations'],
  },
  {
    slug: 'santa-paula',
    name: 'Santa Paula',
    minutes: 15,
    line: 'Older housing stock up the valley. Repairs and re-pours.',
    body: [
      'Santa Paula has some of the oldest housing stock in the county, and old houses mean old concrete: cracked walks, driveways poured thin decades ago, and porches and steps that have settled away from the house. Much of the work here starts with the honest question, repair it or replace it, and you get a straight answer on the walk-through.',
      'Up-valley lots also bring footings for additions and garage conversions, trenched and tied to plan and poured after inspection, the way that work has to go.',
    ],
    focus: ['demolition-repair', 'driveways', 'footings-foundations'],
  },
  {
    slug: 'ojai',
    name: 'Ojai',
    minutes: 20,
    line: 'Up the valley. Finishes that suit the place.',
    body: [
      'Ojai jobs care about how the concrete looks in a way the rest of the county mostly does not. Smooth-trowelled patios, salt finishes, integral colour in warm tones, and stamped stone textures all belong up here, where the slab is part of a garden rather than just a surface to park on.',
      'The valley’s oaks are the other consideration: pours are laid out to keep compaction and cuts away from root zones where the tree matters more than the straight line, and that is a conversation had at the walk-through, not after the saw is out.',
    ],
    focus: ['custom-stamped', 'patios', 'walkways'],
  },
  {
    slug: 'port-hueneme',
    name: 'Port Hueneme',
    minutes: 20,
    line: 'Beach-side streets and salt air. Compact lots, clean slabs.',
    body: [
      'Port Hueneme is compact lots on flat ground by the water, where the enemy is salt air and time rather than slope. Driveways and walks here are small, visible pours (short aprons, side runs, patio pads) where the edges and joints are most of what you see, so they are tooled straight and clean.',
      'Small jobs are still jobs. A single driveway panel or a back walk gets the same base, steel and finish sequence as a whole yard, and the same free quote.',
    ],
    focus: ['driveways', 'walkways', 'patios'],
  },
  {
    slug: 'fillmore',
    name: 'Fillmore',
    minutes: 30,
    line: 'Up the Santa Clara valley. Ranch work and new yards.',
    body: [
      'Fillmore is up the Santa Clara River valley, where lots run bigger and the work runs practical: long gravel drives finally poured in concrete, equipment and barn pads, and new subdivisions on the edge of town with bare-dirt yards waiting for a patio and a walk.',
      'Long rural driveways are their own kind of job: more yards of concrete, real grading, and joints laid out over the full run. Priced by the walk-through like everything else, free.',
    ],
    focus: ['driveways', 'patios', 'footings-foundations'],
  },
  {
    slug: 'moorpark',
    name: 'Moorpark',
    minutes: 35,
    line: 'East county hills. Slopes, walls, and driveways with fall.',
    body: [
      'Moorpark climbs in and out of little valleys, so the concrete does too: driveways with genuine fall on them, steps between levels of a yard, and retaining walls that turn a slope into something usable. Formed, braced and tied in steel before anything is poured, because a wall that moves takes the yard with it.',
      'The newer neighbourhoods bring the flat work, patios, walkways and pool surrounds, and the same crew covers both ends of it.',
    ],
    focus: ['retaining-walls', 'driveways', 'steps-pool-decks'],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
