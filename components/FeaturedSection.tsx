import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import VehicleCard from './VehicleCard';
import Reveal from './Reveal';
import type { Vehicle } from '@/lib/types';

interface FeaturedSectionProps {
  vehicles?: Vehicle[];
}

export default function FeaturedSection({ vehicles }: FeaturedSectionProps) {
  const cars = (vehicles || []).slice(0, 6);

  return (
    <section className="bg-cream-50 py-16 lg:py-28">
      <div className="container-px">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <p className="eyebrow">Featured stock</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-ink-950 tracking-tight">
                On the forecourt now
              </h2>
              <p className="mt-3 text-ink-500 text-sm md:text-base max-w-xl">
                A glimpse of what&apos;s in right now — every car hand-picked, inspected and
                ready to drive away.
              </p>
            </div>
            <Link
              href="/stock"
              className="group inline-flex items-center gap-1 shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View full showroom
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {cars.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car, i) => (
              <Reveal key={car.id} delay={Math.min(i * 60, 400)}>
                <VehicleCard vehicle={car} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="card rounded-2xl py-16 text-center">
              <p className="font-display text-xl text-ink-800 mb-2">No cars in stock just yet</p>
              <p className="text-sm text-ink-500 mb-6">Check back soon, or get in touch and tell us what you&apos;re after.</p>
              <Link href="/contact" className="btn btn-primary">Get in touch</Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
