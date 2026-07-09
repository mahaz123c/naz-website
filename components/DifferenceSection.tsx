import { Search, Sparkles, Eye, Handshake, Star } from 'lucide-react';
import Reveal from './Reveal';
import Counter from './Counter';

const tiles = [
  {
    Icon: Sparkles,
    title: 'Hand-selected',
    desc: 'Only cars we\'d happily drive ourselves make it onto the forecourt.',
  },
  {
    Icon: Search,
    title: 'Fully prepared',
    desc: 'Inspected to 150 points, serviced and detailed before listing.',
  },
  {
    Icon: Eye,
    title: 'Total transparency',
    desc: 'Full history, honest condition notes and straight answers.',
  },
  {
    Icon: Handshake,
    title: 'Dealer services',
    desc: 'Part exchange, finance support and warranty packages available.',
  },
];

interface DifferenceSectionProps {
  stockCount: number;
}

export default function DifferenceSection({ stockCount }: DifferenceSectionProps) {
  return (
    <section className="bg-cream-50 py-16 lg:py-28">
      <div className="container-px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: heading + tiles */}
          <div>
            <Reveal>
              <p className="eyebrow">The KY difference</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-ink-950 tracking-tight">
                Buying a car,{' '}
                <em className="text-brand-gradient animate-brand-sweep italic">elevated</em>
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tiles.map(({ Icon, title, desc }, i) => (
                <Reveal key={title} delay={Math.min(i * 60, 400)}>
                  <div className="card rounded-2xl p-6 h-full">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-50">
                      <Icon size={20} className="text-brand-600" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-ink-950 mb-1.5">{title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=1200&q=80)',
                }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink-950/10 rounded-3xl" />
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink-950 grain">
            <div className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 px-8 md:px-14 text-center">
              <div>
                <p className="font-display text-4xl md:text-5xl font-semibold text-white">
                  <Counter to={10} suffix="+" />
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-luxe text-brand-300">
                  Years in the trade
                </p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-semibold text-white">
                  {stockCount > 0 ? <Counter to={stockCount} /> : '—'}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-luxe text-brand-300">
                  Cars in stock now
                </p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl font-semibold text-white flex items-center justify-center gap-2">
                  4.5 <Star size={28} className="text-amber-400 fill-amber-400" />
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-luxe text-brand-300">
                  Average review score
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
