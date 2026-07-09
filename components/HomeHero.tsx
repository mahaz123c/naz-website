import Link from 'next/link';
import { Search, Star } from 'lucide-react';
import Counter from './Counter';
import { MAKES } from '@/lib/constants';

const MAX_PRICES = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];
const FROM_YEARS = Array.from({ length: 16 }, (_, i) => new Date().getFullYear() - i);
const MAX_MILEAGES = [10000, 20000, 30000, 40000, 50000, 60000, 80000, 100000];

const selectClass =
  'input !rounded-full !bg-white/95 appearance-none cursor-pointer';

interface HomeHeroProps {
  stockCount: number;
}

export default function HomeHero({ stockCount }: HomeHeroProps) {
  return (
    <section className="relative min-h-[92svh] bg-ink-950 grain flex flex-col overflow-hidden">
      {/* Ken-burns background photo */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenburns"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&q=80)',
          }}
        />
        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/30 to-transparent" />
      </div>

      <div className="container-px relative z-10 flex-1 flex flex-col justify-center py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-light animate-fade-in">
            KY Automotive &middot; Family-run for 10+ years
          </p>
          <h1
            className="mt-5 font-semibold leading-[1.05] tracking-tight text-white animate-fade-in [animation-delay:80ms]"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 5.25rem)' }}
          >
            Drive luxury.
            <br />
            Pay{' '}
            <em className="text-brand-gradient animate-brand-sweep italic">less</em>.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed animate-fade-in [animation-delay:160ms]">
            A hand-picked collection of premium used cars near Heathrow, London — each one
            through a 150-point inspection, prepared to a high standard, and backed by a
            6-month warranty. Honest cars, honest prices, no pressure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-in [animation-delay:240ms]">
            <Link href="/stock" className="btn btn-primary">
              View current stock
            </Link>
            <Link href="/contact" className="btn btn-outline-light">
              Speak to us
            </Link>
          </div>
        </div>

        {/* Hero search */}
        <form
          action="/stock"
          method="get"
          className="mt-12 lg:mt-16 rounded-[20px] bg-white/95 backdrop-blur-xl shadow-luxe p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 animate-fade-in [animation-delay:320ms]"
        >
          <select name="make" defaultValue="" aria-label="Make" className={selectClass}>
            <option value="">Any make</option>
            {MAKES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            name="model"
            type="text"
            placeholder="Model"
            aria-label="Model"
            className="input !rounded-full !bg-white/95"
          />
          <select name="max_price" defaultValue="" aria-label="Max price" className={selectClass}>
            <option value="">Max price</option>
            {MAX_PRICES.map((p) => (
              <option key={p} value={p}>£{p.toLocaleString()}</option>
            ))}
          </select>
          <select name="min_year" defaultValue="" aria-label="From year" className={selectClass}>
            <option value="">From year</option>
            {FROM_YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select name="max_mileage" defaultValue="" aria-label="Max mileage" className={selectClass}>
            <option value="">Max mileage</option>
            {MAX_MILEAGES.map((m) => (
              <option key={m} value={m}>{m.toLocaleString()} mi</option>
            ))}
          </select>
          <button type="submit" className="btn btn-dark">
            <Search size={15} /> Search
          </button>
        </form>
      </div>

      {/* Stat ribbon */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container-px grid grid-cols-3 divide-x divide-white/10 py-6">
          <div className="text-center px-2">
            <p className="font-display text-2xl md:text-4xl font-semibold text-white">
              {stockCount > 0 ? <Counter to={stockCount} suffix="+" /> : '—'}
            </p>
            <p className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.14em] text-white/50">
              Cars in stock
            </p>
          </div>
          <div className="text-center px-2">
            <p className="font-display text-2xl md:text-4xl font-semibold text-white flex items-center justify-center gap-1.5">
              4.5 <Star size={20} className="text-amber-400 fill-amber-400" />
            </p>
            <p className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.14em] text-white/50">
              Customer rating
            </p>
          </div>
          <div className="text-center px-2">
            <p className="font-display text-2xl md:text-4xl font-semibold text-white">
              <Counter to={10} suffix="+" />
            </p>
            <p className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.14em] text-white/50">
              Years experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
