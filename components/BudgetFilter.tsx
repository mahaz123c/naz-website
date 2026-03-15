import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BUDGET_OPTIONS } from '@/lib/constants';

export default function BudgetFilter() {
  return (
    <section className="bg-background py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
        {/* Left label */}
        <div className="flex items-center gap-3 shrink-0">
          <ArrowRight size={20} className="text-white" />
          <div>
            <p className="text-sm text-secondary">Find something within</p>
            <p className="text-lg font-semibold text-white">Your Monthly Budget</p>
          </div>
        </div>

        {/* Pill buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {BUDGET_OPTIONS.map((opt) => (
            <Link
              key={opt.label}
              href={`/stock?max_monthly=${opt.max}`}
              className="border border-white/20 text-white text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
            >
              {opt.label}
            </Link>
          ))}
          <Link
            href="/stock"
            className="text-sm font-medium text-white underline underline-offset-4 hover:text-accent transition-colors ml-2"
          >
            View all stock
          </Link>
        </div>
      </div>
    </section>
  );
}
