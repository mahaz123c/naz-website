import { SITE_NAME } from '@/lib/constants';

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
            Specialist High Specification Used Car Dealer
          </h2>
          <div className="space-y-4 text-secondary text-sm leading-relaxed">
            <p>
              At {SITE_NAME}, we take pride in providing a seamless and trusted car
              buying experience. With a wide range of vehicles in stock, we offer
              an exceptional selection of high-quality cars to suit every taste and preference.
              Whether you&apos;re seeking performance, luxury, or practicality, we&apos;ve got you covered.
            </p>
            <p>
              Embrace the convenience of modern car buying with our easy-to-use online
              platform. Browse our extensive inventory, apply for financing, and make your
              purchase from anywhere, anytime. If you prefer a more personal touch, we invite you
              to visit our dealership and experience our unparalleled customer service firsthand.
            </p>
            <p>
              We believe in making the car buying process as smooth
              and enjoyable as possible. Join the thousands of satisfied customers who have found
              their perfect car with us.
            </p>
            <p className="text-white text-base font-light italic">
              Discover your next dream car today and don&apos;t hesitate to give one of
              our friendly team a call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
