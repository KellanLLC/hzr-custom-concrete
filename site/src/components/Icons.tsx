import type { CSSProperties } from 'react';

/**
 * The site's six glyphs, exactly as shipped on the static page: Material
 * Symbols paths on a 960 grid, referenced with <use> from one hidden sheet so
 * each path exists once per document. <IconDefs> is rendered once per layout.
 */
export function IconDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <symbol id="i-phone" viewBox="0 0 960 960"><g transform="translate(0,960)"><path d="M795-120q-116 0-236.5-56T335-335Q232-438 176-558.5T120-795q0-19.29 12.86-32.14Q145.71-840 165-840h140q14 0 24 10t14 25l26.93 125.64Q372-665 369.5-653.5t-10.73 19.73L259-533q26 44 55 82t64 72q37 38 78 69.5t86 55.5l95-98q10-11 23.15-15 13.15-4 25.85-2l119 26q15 4 25 16.04 10 12.05 10 26.96v135q0 19.29-12.86 32.14Q814.29-120 795-120ZM229-588l81-82-23-110H180q2 42 13.5 88.5T229-588Zm369 363q41 19 89 31t93 14v-107l-103-21-79 83ZM229-588Zm369 363Z" /></g></symbol>
      <symbol id="i-chev" viewBox="0 0 960 960"><g transform="translate(0,960)"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z" /></g></symbol>
      <symbol id="i-check" viewBox="0 0 960 960"><g transform="translate(0,960)"><path d="m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" /></g></symbol>
      <symbol id="i-star" viewBox="0 0 960 960"><g transform="translate(0,960)"><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" /></g></symbol>
      <symbol id="i-pin" viewBox="0 0 960 960"><g transform="translate(0,960)"><path d="M529.5-510.5Q550-531 550-560t-20.5-49.5Q509-630 480-630t-49.5 20.5Q410-589 410-560t20.5 49.5Q451-490 480-490t49.5-20.5ZM480-159q133-121 196.5-219.5T740-552q0-118-75.5-193T480-820q-109 0-184.5 75T220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></g></symbol>
      <symbol id="i-out" viewBox="0 0 960 960"><g transform="translate(0,960)"><path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z" /></g></symbol>
      <symbol id="i-truck" viewBox="0 0 960 960"><g transform="translate(0,960)"><path d="M140.5-195.42Q106-229.83 106-279H40v-461q0-24 18-42t42-18h579v167h105l136 181v173h-71q0 49.17-34.38 83.58Q780.24-161 731.12-161t-83.62-34.42Q613-229.83 613-279H342q0 49-34.38 83.5t-83.5 34.5q-49.12 0-83.62-34.42ZM265-238q17-17 17-41t-17-41q-17-17-41-17t-41 17q-17 17-17 41t17 41q17 17 41 17t41-17ZM100-339h22q17-27 43.04-43t58-16q31.96 0 58.46 16.5T325-339h294v-401H100v401Zm672 101q17-17 17-41t-17-41q-17-17-41-17t-41 17q-17 17-17 41t17 41q17 17 41 17t41-17Zm-93-187h186L754-573h-75v148ZM360-529Z" /></g></symbol>
    </svg>
  );
}

/** One glyph off the sheet. Size in px; colour comes from `fill` or currentColor. */
export function I({
  id,
  size = 18,
  fill = 'currentColor',
  style,
}: {
  id: 'phone' | 'chev' | 'check' | 'star' | 'pin' | 'out' | 'truck';
  size?: number;
  fill?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 960 960" aria-hidden="true" style={{ width: size, height: size, fill, flex: 'none', ...style }}>
      <use href={`#i-${id}`} />
    </svg>
  );
}

/** The select's dropdown chevron, positioned exactly as on the live page. */
export function SelectChev() {
  return (
    <svg
      viewBox="0 0 960 960"
      aria-hidden="true"
      style={{ position: 'absolute', right: 11, top: '50%', width: 18, height: 18, fill: 'var(--dark-3)', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }}
    >
      <use href="#i-chev" />
    </svg>
  );
}
