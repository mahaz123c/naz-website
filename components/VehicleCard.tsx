import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Settings, Gauge, Fuel } from 'lucide-react';
import { formatPrice, formatMonthly, formatMileage } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const imageUrl = vehicle.images[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80';

  return (
    <Link
      href={`/stock/${vehicle.slug}`}
      className="group block bg-surface rounded-lg overflow-hidden border border-border hover:border-white/20 transition-colors"
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {vehicle.status === 'sold' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-wider uppercase">Sold</span>
          </div>
        )}
        {vehicle.status === 'reserved' && (
          <div className="absolute top-3 right-3 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full">
            Reserved
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors">
            {vehicle.make} {vehicle.model}
          </h3>
          <div className="text-right shrink-0 ml-2">
            {vehicle.monthly_price && (
              <p className="text-xs text-accent font-medium">
                {formatMonthly(vehicle.monthly_price)}/mo
              </p>
            )}
            <p className="text-lg font-bold text-white">{formatPrice(vehicle.price)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-secondary">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Settings size={12} /> {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Gauge size={12} /> {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={12} /> {vehicle.fuel_type}
          </span>
        </div>

        <div className="flex gap-4 mt-3 text-xs">
          <span className="font-medium text-white underline underline-offset-2">View details</span>
          <span className="font-medium text-accent underline underline-offset-2">Apply for finance</span>
        </div>
      </div>
    </Link>
  );
}
