const brands = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Porsche', 'Range Rover',
  'Tesla', 'Volkswagen', 'Jaguar', 'Lexus', 'Land Rover',
];

export default function BrandMarquee() {
  return (
    <section className="bg-cream-50 border-b border-ink-100 py-10 overflow-hidden">
      <p className="text-center text-[11px] font-semibold text-ink-400 uppercase tracking-luxe mb-7">
        Specialists in the marques you love
      </p>
      <div className="mask-fade-x">
        <div className="flex w-max animate-marquee gap-16 pr-16">
          {/* List rendered twice for a seamless loop */}
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-xl md:text-2xl font-medium text-ink-400 hover:text-ink-900 transition-colors whitespace-nowrap select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
