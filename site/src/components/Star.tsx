/** The site's star glyph, self-contained so it works without the icon sheet
    (the panel and the rating page render outside the public layout). */
export function Star({ size = 16, className }: { size?: number | string; className?: string }) {
  return (
    <svg viewBox="0 0 960 960" width={size} height={size} className={className} aria-hidden="true" focusable="false" style={{ fill: 'currentColor' }}>
      <g transform="translate(0,960)">
        <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
      </g>
    </svg>
  );
}
