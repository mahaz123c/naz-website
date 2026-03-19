import Link from 'next/link';
import { Play, ShieldCheck } from 'lucide-react';

export default function CTABanners() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Warranty */}
      <div className="bg-surface py-12 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={20} className="text-accent" />
            <h3 className="text-2xl font-semibold text-white">6-Month Warranty</h3>
          </div>
          <p className="text-sm text-secondary">Included as standard. Main dealer warranty also available.</p>
          <Link
            href="#"
            className="text-sm text-white underline underline-offset-4 hover:text-accent transition-colors mt-1 inline-block"
          >
            See T&apos;s and C&apos;s
          </Link>
        </div>
        <Link href="/contact" className="flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
          <Play size={14} fill="black" /> Learn More
        </Link>
      </div>

      {/* Sell Your Car */}
      <div className="bg-muted py-12 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-1">Sell Your Car</h3>
          <Link
            href="/sell-your-car"
            className="text-sm text-white underline underline-offset-4 hover:text-accent transition-colors"
          >
            Receive your valuation
          </Link>
        </div>
        <Link
          href="/sell-your-car"
          className="flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
        >
          <Play size={14} fill="black" /> Our Process
        </Link>
      </div>
    </section>
  );
}
