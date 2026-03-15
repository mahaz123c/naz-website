import { Check, Star, StarHalf } from 'lucide-react';

const checkpoints = [
  'Family-run dealership',
  'History in the motor trade',
  'All work done in-house',
  'Friendly atmosphere',
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={16} className="text-accent fill-accent" />
      ))}
      {hasHalf && <StarHalf size={16} className="text-accent fill-accent" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} size={16} className="text-accent" />
      ))}
    </div>
  );
}

const badges = [
  { name: 'AutoTrader', rating: 4.5 },
  { name: 'Google', rating: 4.5 },
  { name: 'Car Dealer Reviews', rating: 5.0 },
  { name: 'Trustpilot', rating: 4.4 },
];

export default function TrustBadges() {
  return (
    <section className="bg-muted">
      {/* Checkmark row */}
      <div className="border-b border-border py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
          {checkpoints.map((text) => (
            <div key={text} className="flex items-center gap-2 text-sm text-secondary">
              <Check size={16} className="text-white" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating logos */}
      <div className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div key={badge.name} className="text-center">
              <p className="text-lg font-semibold text-white mb-2">{badge.name}</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-white font-semibold">{badge.rating}</span>
                <Stars rating={badge.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
