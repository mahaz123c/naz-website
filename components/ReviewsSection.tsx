import { Trophy, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const reviews = [
  {
    name: 'Customer',
    text: 'Fantastic experience from start to finish. The team were incredibly helpful and the car was in perfect condition when it arrived. Would highly recommend to anyone looking for a quality used car.',
  },
  {
    name: 'Customer',
    text: 'Picked up my car today and the whole process was absolutely outstanding. The whole team made me and my family feel really welcome from the moment we arrived.',
  },
  {
    name: 'Customer',
    text: 'This is the second car we have bought from here which is a testament to how good we thought they were first time. Very helpful with any questions and there was no hassle at all.',
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-muted py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left: Trophy + info */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface mb-6">
            <Trophy size={40} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            10+ Years of<br />Trusted Service
          </h2>
          <p className="text-secondary text-sm">Family-run dealership near Heathrow, London</p>
        </div>

        {/* Right: Review cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="relative bg-white/[0.07] border border-white/10 rounded-lg p-6">
              <span className="absolute top-3 left-4 text-4xl text-white/10 font-serif">&ldquo;</span>

              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="text-accent fill-accent" />
                ))}
              </div>

              <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-5">
                {review.text}
              </p>

              <p className="text-sm font-semibold text-white">{review.name}</p>

              <span className="absolute bottom-3 right-4 text-4xl text-white/10 font-serif">&rdquo;</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 text-sm font-medium text-white underline underline-offset-4 hover:text-accent transition-colors"
        >
          Get in touch <ChevronRight size={14} />
        </Link>
      </div>
    </section>
  );
}
