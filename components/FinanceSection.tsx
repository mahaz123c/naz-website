import Link from 'next/link';
import { ArrowUpRight, Check, PoundSterling } from 'lucide-react';
import Reveal from './Reveal';
import { FINANCE_PARTNERS } from '@/lib/constants';

const points = [
  { title: 'Soft credit check', desc: 'See your eligibility in minutes without affecting your credit score.' },
  { title: 'Flexible options', desc: 'PCP, HP and personal loans through Zuto, Close Brothers and Motonova.' },
  { title: 'Quick decisions', desc: 'Apply online and get an answer fast, with our team on hand throughout.' },
];

export default function FinanceSection() {
  return (
    <section className="bg-cream-50 py-16 lg:py-28">
      <div className="container-px grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <Reveal>
          <p className="eyebrow">Car finance</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-ink-950 tracking-tight">
            Spread the cost,{' '}
            <em className="text-brand-gradient animate-brand-sweep italic">simply</em>
          </h2>
          <div className="mt-8 space-y-5">
            {points.map(({ title, desc }) => (
              <div key={title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <Check size={14} className="text-brand-600" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-950">{title}</p>
                  <p className="text-sm text-ink-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/finance" className="btn btn-primary mt-8">
            Explore finance options <ArrowUpRight size={15} />
          </Link>
          <p className="mt-6 max-w-md text-xs leading-relaxed text-ink-400">
            We are a credit broker, not a lender. Finance is subject to status and income.
            Representative APR 9.9%. Written quotation on request.
          </p>
        </Reveal>

        {/* Partner cards */}
        <Reveal direction="right">
          <div className="space-y-5">
            {FINANCE_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="card rounded-2xl p-7 flex items-start gap-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <PoundSterling size={22} className="text-brand-600" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-950 mb-1">{partner.name}</h3>
                  <p className="text-sm text-ink-500 mb-3 leading-relaxed">{partner.description}</p>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    {partner.cta} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
