/** The HZR badge, for the panel and the rating page. `detail` just asks for
    the larger source file. */
export function Mark({ size = 40, detail = false, className }: { size?: number; detail?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={detail ? '/images/logo-512.png' : '/images/logo-256.png'}
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', width: size, height: size, objectFit: 'contain' }}
    />
  );
}
