import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialSidebar from '@/components/SocialSidebar';
import { SITE_NAME } from '@/lib/constants';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Premium Used Cars`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_NAME} - Specialist high specification used car dealer. Browse our extensive range of premium vehicles, apply for finance, or sell your car.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SocialSidebar />
      </body>
    </html>
  );
}
