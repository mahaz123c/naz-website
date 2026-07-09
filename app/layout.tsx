import type { Metadata } from 'next';
import { Manrope, Fraunces, Montserrat } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import { SITE_NAME } from '@/lib/constants';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Affordable Luxury & Performance Cars | Heathrow, London`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'KY Automotive - Family-run car dealership near Heathrow, London. Affordable luxury and sporty vehicles with 150-point inspection, 6-month warranty, flexible finance, and nationwide delivery.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
