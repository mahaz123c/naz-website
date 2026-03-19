export default function AboutSection() {
  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Image */}
        <div
          className="h-[400px] lg:h-auto bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80)',
          }}
        />

        {/* Right: Text */}
        <div className="px-6 md:px-12 lg:px-16 py-12 lg:py-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-tight">
            Affordable Luxury &amp; Performance Cars You Can Trust
          </h2>
          <div className="space-y-4 text-secondary text-sm leading-relaxed">
            <p>
              At KY Automotive, we are a family-run car dealership based near Heathrow, London,
              proudly serving customers across the UK for over 10 years. We specialise in offering
              affordable luxury and sporty vehicles, carefully selected to give our customers the
              perfect balance of performance, style, and value.
            </p>
            <p>
              Our reputation has been built on honesty, reliability, and outstanding customer service.
              As a family business, we treat every customer with the care and attention they deserve,
              ensuring the car buying process is simple, transparent, and enjoyable.
            </p>
            <p>
              Every vehicle at KY Automotive undergoes a comprehensive 150-point inspection to ensure
              it meets our high standards for safety, reliability, and overall condition. Because we are
              confident in the quality of our vehicles, every car comes with a 6-month warranty, giving
              you complete peace of mind.
            </p>
            <p className="text-white text-base font-light italic">
              At KY Automotive, our goal is simple: quality vehicles, fair prices, and customers who
              drive away happy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
