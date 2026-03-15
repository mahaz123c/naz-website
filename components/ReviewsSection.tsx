import { Trophy, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const reviews = [
  {
    name: 'Alex B.',
    text: 'Fantastic experience from start to finish. The team were incredibly helpful and the car was in perfect condition when it arrived. Would highly recommend to anyone looking for a quality used car.',
  },
  {
    name: 'Sean M.',
    text: 'Picked up my car today and the whole process was absolutely outstanding. The whole team made me and my family feel really welcome from the moment we arrived.',
  },
  {
    name: 'David C.',
    text: 'This is the second car we have bought from here which is a testament to how good we thought they were first time. Very helpful with any questions and there wasn\'t any hassle.',
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-muted py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left: Trophy + ranking */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface mb-6">
            <Trophy size={40} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Ranked #1 of over<br />16,000 dealerships<br />in the UK
          </h2>
          <p className="text-secondary text-sm">Car Dealer Reviews</p>
        </div>

        {/* Right: Review cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.name} className="relative bg-white/[0.07] border border-white/10 rounded-lg p-6">
              {/* Decorative quote */}
              <span className="absolute top-3 left-4 text-4xl text-white/10 font-serif">&ldquo;</span>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-5">
                {review.text}
              </p>

              {/* Name */}
              <p className="text-sm font-semibold text-white">{review.name}</p>

              <span className="absolute bottom-3 right-4 text-4xl text-white/10 font-serif">&rdquo;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Read more link */}
      <div className="max-w-7xl mx-auto mt-8">
        <Link
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium text-white underline underline-offset-4 hover:text-accent transition-colors"
        >
          Read more reviews <ChevronRight size={14} />
        </Link>
      </div>
    </section>
  );
}
