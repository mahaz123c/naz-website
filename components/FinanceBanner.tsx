import { Scale, ChevronRight, ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';

const checkpoints = [
  'Flexible finance options',
  'Working with reputable lenders',
  'Free finance check',
  'Get instant results',
];

export default function FinanceBanner() {
  return (
    <section className="bg-muted py-10 px-4 md:px-8">
      {/* 3-step flow */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8">
        <div className="hidden md:block">
          <Scale size={48} className="text-white" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center border border-white/30 text-xs text-white rounded-sm">1</span>
            <Link href="/finance" className="text-lg md:text-xl font-medium text-white underline decoration-accent underline-offset-4 hover:text-accent transition-colors">
              Looking to finance?
            </Link>
          </div>
          <ChevronRight size={20} className="text-white/40 hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center border border-white/30 text-xs text-white rounded-sm">2</span>
            <span className="text-lg md:text-xl font-medium text-white">Am I eligible?</span>
          </div>
          <ChevronRight size={20} className="text-white/40 hidden md:block" />
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center bg-accent text-black text-xs font-bold rounded-sm">3</span>
            <Link href="/finance" className="text-lg md:text-xl font-bold text-accent hover:text-accent-hover transition-colors">
              Apply now
            </Link>
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-accent text-accent">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Checkmarks */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
        {checkpoints.map((text) => (
          <div key={text} className="flex items-center gap-2 text-sm text-secondary">
            <Check size={16} className="text-white" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
