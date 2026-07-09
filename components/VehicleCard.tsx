import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';
import { formatPrice, formatMileage } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const imageUrl = vehicle.images[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80';
  const sold = vehicle.status === 'sold';

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[20px] border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-luxe">
      {/* Image */}
      <Link href={`/stock/${vehicle.slug}`} className="relative block aspect-[3/2] overflow-hidden bg-ink-100">
        <Image
          src={imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-[1100ms] group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />

        {/* Price overlay */}
        <div className="absolute bottom-3 left-4">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Price</p>
          <p className="font-display text-xl font-semibold text-white">{formatPrice(vehicle.price)}</p>
        </div>

        {/* Hover arrow badge */}
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight size={16} />
        </span>

        {/* Badges */}
        {vehicle.featured && !sold && vehicle.status !== 'reserved' && (
          <span className="badge absolute top-3 left-3 bg-brand-500 text-white">
            <Star size={11} className="fill-white" /> Featured
          </span>
        )}
        {vehicle.status === 'reserved' && (
          <span className="badge absolute top-3 left-3 bg-amber-400 text-ink-950">Reserved</span>
        )}
        {sold && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="-rotate-12 rounded-md border-2 border-white/90 px-6 py-1.5 font-display text-2xl font-bold uppercase tracking-[0.2em] text-white/90">
              Sold
            </span>
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/stock/${vehicle.slug}`}>
          <h3 className="font-display text-lg font-semibold text-ink-950 transition-colors hover:text-brand-700">
            {vehicle.make} {vehicle.model}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-ink-400">
          {vehicle.colour ? `${vehicle.colour} · ` : ''}{vehicle.body_type} · Premium specification
        </p>

        {/* 2×2 spec grid */}
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink-100 text-center">
          {[
            { label: 'Year', value: String(vehicle.year) },
            { label: 'Mileage', value: formatMileage(vehicle.mileage) },
            { label: 'Fuel', value: vehicle.fuel_type },
            { label: 'Gearbox', value: vehicle.transmission },
          ].map(({ label, value }) => (
            <div key={label} className="bg-cream-100 px-2 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-ink-400">{label}</p>
              <p className="text-xs font-semibold text-ink-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Feature chips */}
        {vehicle.features && vehicle.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vehicle.features.slice(0, 3).map((f) => (
              <span key={f} className="rounded-full border border-ink-100 px-2 py-0.5 text-[11px] text-ink-500">
                {f}
              </span>
            ))}
            {vehicle.features.length > 3 && (
              <span className="px-1 py-0.5 text-[11px] text-ink-400">
                +{vehicle.features.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex gap-2 pt-1">
          <Link href={`/stock/${vehicle.slug}`} className="btn btn-dark flex-1 !px-4 !py-2.5 !text-xs">
            View car
          </Link>
          <Link
            href={`/stock/${vehicle.slug}#enquire`}
            className="btn btn-outline flex-1 !px-4 !py-2.5 !text-xs"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}
