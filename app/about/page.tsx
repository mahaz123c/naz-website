import { SITE_PHONE } from '@/lib/constants';

export const metadata = {
  title: 'About Us',
  description: 'KY Automotive - Family-run car dealership near Heathrow, London. Over 10 years of experience offering affordable luxury and sporty vehicles with 150-point inspection and 6-month warranty.',
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div
        className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
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
          <p>
            We offer flexible finance options to make purchasing your next vehicle easier, and we also
            welcome part exchange if you&apos;re looking to trade in your current car. Whether you&apos;re
            visiting us locally or purchasing from further afield, we provide nationwide delivery,
            bringing your new vehicle straight to your door.
          </p>
          <p>
            Customers are welcome to book appointments and test drives, and our team is always happy
            to help you find the perfect car to suit your needs and budget.
          </p>
        </div>

        {/* Why choose us */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: '150-Point Inspection', desc: 'Every car undergoes a detailed 150-point mechanical and safety inspection.' },
            { title: '6-Month Warranty', desc: 'Every car comes with a 6-month warranty as standard. Main dealer warranty also available.' },
            { title: 'Nationwide Delivery', desc: 'Based near Heathrow, London — we deliver vehicles nationwide across the UK.' },
            { title: 'Flexible Finance', desc: 'We work with Zuto, Close Brothers, and Motonova to find competitive finance rates.' },
          ].map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white text-lg mb-2 font-light italic">
            At KY Automotive, our goal is simple: quality vehicles, fair prices, and customers who drive away happy.
          </p>
          <p className="text-secondary text-sm mb-6">
            Discover your next dream car today and don&apos;t hesitate to give one of our friendly team a call.
          </p>
          <a
            href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-accent text-black px-8 py-3 font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            Call Us: {SITE_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
