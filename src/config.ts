import type { ImageMetadata } from 'astro';
import algiersBus from './assets/cities/algiers-bus.webp';
// Site-wide constants. The only placeholder allowed in shipped pages is FORM_ENDPOINT (SITE_V2_PROMPT §3.5, §4).

/**
 * Where the rider waitlist and the operator/city contact forms POST their JSON.
 * Empty until the founder connects a form backend (HANDOFF.md, founder TODOs).
 * While empty, the forms validate and then say plainly that nothing was sent.
 */
export const FORM_ENDPOINT = '';

export const SITE = {
  name: 'Tariq',
  company: 'Tariq Technologies',
  year: 2026,
};

/** Required next to anything showing terminal renders, terminal screens or the film. */
export const SMALL_PRINT = 'Renders of a design in development. Example fares.';

export const NAV = [
  { href: '/app', label: 'The app' },
  { href: '/terminal', label: 'The terminal' },
  { href: '/operators', label: 'For operators' },
];


/**
 * The cities marquee (CityMarquee), adapted from the founder's reference (community-section (10).html): seven cities with a status badge,
 * the transit modes and one line of description. Founder decisions (2026-09-15, BUILD_LOG D-88): all seven reference cities, the reference's
 * badges exactly (Algiers "Live", Oran and Constantine "Coming soon", the rest "Planned"), and a transit card with no chip or number.
 * Images: a city without one shows its city tint. Algiers uses a founder-supplied AI-generated illustration (D-90), described as an illustration in its alt text.
 * To add one, put the cropped master (card aspect 320:210, ≥ 900 px wide) in src/assets/cities/, import it and set `photo`
 * (landscape, 1600 px+, the city seen from inside a vehicle; licensed; no faces).
 * `accent` tints the transit card and the sign-up panel; `tile` is the card's resting gradient; `pass` is the transit card's body.
 */
export type CityStatus = 'live' | 'soon' | 'planned';
export type CityScene = {
  id: string; en: string; ar: string; status: CityStatus; modes: string[]; desc: string; alt: string; photo: ImageMetadata | null;
  /** object-position for the photo when the card is narrower than the image (phones); keeps the landmark in frame */
  photoPosition?: string;
  accent: string; tile: string; pass: string;
};
/** Badge text, the card's action (visible label and its accessible name before the city) and the sign-up panel's title before the city. */
export const CITY_STATUS: Record<CityStatus, { badge: string; action: string; aria: string; title: string }> = {
  live: { badge: 'Live', action: 'Join the waitlist', aria: 'Join the waitlist for', title: 'Waitlist for' },
  soon: { badge: 'Coming soon', action: 'Notify me', aria: 'Notify me about', title: 'Notify me about' },
  planned: { badge: 'Planned', action: 'Stay tuned', aria: 'Stay tuned for', title: 'Stay tuned for' },
};

export const CITY_SCENES: CityScene[] = [
  { id: 'algiers', en: 'Algiers', ar: 'الجزائر', status: 'live', modes: ['Metro', 'Bus', 'Tram', 'Cable car'],
    desc: 'The capital’s full network, from the metro to the cable cars above the bay.',
    // founder-supplied AI-generated illustration (D-90): cropped to the card, so it is described as an illustration, not a photo
    alt: 'Illustration: Maqam Echahid above Algiers at dusk, seen through a bus window', photo: algiersBus, photoPosition: '72% 50%',
    accent: '#c8a060', tile: 'linear-gradient(160deg, #6a4a22 0%, #3a2810 55%, #1e1508 100%)', pass: 'linear-gradient(140deg, #2a1e08 0%, #3e2c0e 50%, #1e1406 100%)' },
  { id: 'oran', en: 'Oran', ar: 'وهران', status: 'soon', modes: ['Bus', 'Tram'],
    desc: 'Algeria’s second city: its buses and tram, coming soon to Tariq.', alt: 'Oran seen from inside a tram', photo: null,
    accent: '#5ba3b0', tile: 'linear-gradient(160deg, #1e3f52 0%, #12283a 55%, #0b1620 100%)', pass: 'linear-gradient(140deg, #0e1a28 0%, #162438 50%, #0a1018 100%)' },
  { id: 'constantine', en: 'Constantine', ar: 'قسنطينة', status: 'soon', modes: ['Bus', 'Cable car'],
    desc: 'Bus and cable car across the Rhumel gorge, in the city of bridges.', alt: 'Constantine seen from inside a cable car', photo: null,
    accent: '#c98a7c', tile: 'linear-gradient(160deg, #4a2436 0%, #2a1422 55%, #160a12 100%)', pass: 'linear-gradient(140deg, #1c0e1e 0%, #2c1628 50%, #120812 100%)' },
  { id: 'cairo', en: 'Cairo', ar: 'القاهرة', status: 'planned', modes: ['Metro', 'Bus', 'Microbus'],
    desc: 'The city that never sleeps: Cairo’s vast network, all on one Tariq card.', alt: 'Cairo seen from inside a bus', photo: null,
    accent: '#d2b474', tile: 'linear-gradient(160deg, #66573a 0%, #3b3222 55%, #1c170f 100%)', pass: 'linear-gradient(140deg, #1d1609 0%, #30250f 50%, #140f05 100%)' },
  { id: 'lagos', en: 'Lagos', ar: 'لاغوس', status: 'planned', modes: ['BRT', 'Ferry', 'Rail'],
    desc: 'Africa’s largest city: bus rapid transit, ferries and rail on one card.', alt: 'Lagos seen from inside a ferry', photo: null,
    accent: '#5fae84', tile: 'linear-gradient(160deg, #1f4a38 0%, #12301f 55%, #08180f 100%)', pass: 'linear-gradient(140deg, #04190f 0%, #0a2a19 50%, #03110a 100%)' },
  { id: 'kinshasa', en: 'Kinshasa', ar: 'كينشاسا', status: 'planned', modes: ['Bus', 'Minibus', 'Rail'],
    desc: 'The Congo’s beating heart: Kinshasa’s sprawling network, one tap away.', alt: 'Kinshasa seen from inside a minibus', photo: null,
    accent: '#d98556', tile: 'linear-gradient(160deg, #5a2e1a 0%, #361a0c 55%, #1a0c05 100%)', pass: 'linear-gradient(140deg, #1c0b03 0%, #2e1407 50%, #130702 100%)' },
  { id: 'luanda', en: 'Luanda', ar: 'لواندا', status: 'planned', modes: ['Bus', 'BRT', 'Ferry'],
    desc: 'Angola’s coastal capital: buses, rapid transit and bay ferries on one card.', alt: 'Luanda seen from inside a bus', photo: null,
    accent: '#6aa3d6', tile: 'linear-gradient(160deg, #1b3a55 0%, #0f2438 55%, #08131f 100%)', pass: 'linear-gradient(140deg, #03101d 0%, #08192c 50%, #020b15 100%)' },
];

/** City choices for the waitlist form's select (/app) and the marquee's hidden city field. */
export const CITIES = CITY_SCENES.map(({ en, ar }) => ({ en, ar }));
