import { SITE_NAME, SITE_PHONE } from '@/lib/constants';

export const metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_NAME} - a family-run independent dealership specialising in high specification used cars.`,
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
          Specialist High Specification Used Car Dealer
        </h2>

        <div className="space-y-4 text-secondary text-sm leading-relaxed">
          <p>
            At {SITE_NAME}, we take pride in providing a seamless and trusted car buying experience.
            With a wide range of vehicles in stock, we offer an exceptional selection of high-quality
            cars to suit every taste and preference. Whether you&apos;re seeking performance, luxury,
            or practicality, we&apos;ve got you covered.
          </p>
          <p>
            Embrace the convenience of modern car buying with our easy-to-use online platform.
            Browse our extensive inventory, apply for financing, and make your purchase from anywhere, anytime.
            If you prefer a more personal touch, we invite you to visit our dealership and experience
            our unparalleled customer service firsthand.
          </p>
          <p>
            We believe in making the car buying process as smooth and enjoyable as possible.
            Join the thousands of satisfied customers who have found their perfect car with us.
          </p>
        </div>

        {/* Why choose us */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Extended Warranty', desc: 'Every vehicle comes with a comprehensive warranty for peace of mind.' },
            { title: 'Nationwide Delivery', desc: 'Free delivery anywhere in the UK, straight to your doorstep.' },
            { title: 'Pre-Delivery Inspection', desc: 'Every car undergoes a rigorous multi-point inspection before handover.' },
            { title: 'Finance Available', desc: 'Flexible finance options with competitive rates from trusted lenders.' },
          ].map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white text-lg mb-4">
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
