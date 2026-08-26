import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Concrete Contractor Ventura County, CA | HZR Custom Concrete',
    template: '%s | HZR Custom Concrete',
  },
  description:
    'Owner-run concrete contractor in Ventura County. Driveways, patios, walkways, retaining walls and foundations. Free estimates. Call or text 805-589-7879.',
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'HZR Custom Concrete',
    title: 'Driveways, patios & foundations, poured right.',
    description:
      'Driveways, patios, retaining walls and footings across Ventura County. Free estimates. Call or text 805.589.7879.',
    images: [
      {
        url: '/images/og-a.jpg',
        width: 1200,
        height: 630,
        alt: 'HZR Custom Concrete: finishers on a fresh driveway pour, with the HZR logo and phone number 805.589.7879',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driveways, patios & foundations, poured right.',
    description:
      'Driveways, patios, retaining walls and foundations across Ventura County. Free estimates. Call or text 805.589.7879.',
    images: {
      url: '/images/og-b.jpg',
      alt: 'HZR Custom Concrete: a finisher brooming a fresh slab, with the phone number 805.589.7879',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#151412',
};

/**
 * The bare document. The `js` class lands on <html> before paint, exactly as
 * the static page did it, so the no-JS fallbacks (nav links out in the bar,
 * the call bar simply present) hold whenever the script never runs.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the js-flag script below stamps class="js" on
    // <html> before React hydrates — deliberate, and only on this element.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="js-flag" strategy="beforeInteractive">{`document.documentElement.classList.add('js')`}</Script>
        <link rel="preload" href="/fonts/excon-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/excon-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {children}
      </body>
    </html>
  );
}
