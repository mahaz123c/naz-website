import Link from 'next/link';
import { ShieldCheck, Check, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const bullets = [
  { title: 'Comprehensive cover', desc: '6-month warranty included as standard with every car we sell.' },
  { title: 'Fully inspected first', desc: 'Every vehicle passes a 150-point mechanical and safety check before listing.' },
  { title: 'Claims made simple', desc: 'A problem? One call to us and we\'ll get it sorted with minimum fuss.' },
];

export default function WarrantySection() {
  return (
    <section className="relative bg-ink-950 grain py-16 lg:py-28 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] rounded-full bg-brand-500/10 blur-3xl" />

      <div className="container-px relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Badge visual */}
        <Reveal direction="right">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-12 md:p-16 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-brand-500/15 flex items-center justify-center mb-6 animate-float">
              <ShieldCheck size={48} className="text-brand-400" />
            </div>
            <p className="font-display text-4xl md:text-5xl font-semibold text-white mb-2">6-Month</p>
            <p className="text-white/60 uppercase text-xs tracking-luxe">Warranty as standard</p>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal>
          <p className="eyebrow eyebrow-light">Peace of mind</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-white tracking-tight">
            Every car protected, before you drive it away
          </h2>
          <div className="mt-8 space-y-5">
            {bullets.map(({ title, desc }) => (
              <div key={title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20">
                  <Check size={14} className="text-brand-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/warranty"
            className="group mt-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            Explore warranty cover
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
