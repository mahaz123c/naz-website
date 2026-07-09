import { Star } from 'lucide-react';
import Reveal from './Reveal';

const reviews = [
  {
    name: 'James W.',
    detail: 'Bought a BMW 4 Series',
    text: 'Fantastic experience from start to finish. The team were incredibly helpful and the car was in perfect condition when it arrived. Would highly recommend to anyone looking for a quality used car.',
  },
  {
    name: 'Sophie H.',
    detail: 'Bought a Mercedes A-Class',
    text: 'Picked up my car today and the whole process was absolutely outstanding. The whole team made me and my family feel really welcome from the moment we arrived.',
  },
  {
    name: 'Adeel K.',
    detail: 'Repeat customer',
    text: 'This is the second car we have bought from here which is a testament to how good we thought they were first time. Very helpful with any questions and there was no hassle at all.',
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-cream-100 border-y border-ink-100 py-16 lg:py-28">
      <div className="container-px">
        <Reveal>
          <div className="text-center mb-14">
            <p className="eyebrow eyebrow-center justify-center">Rated excellent</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-ink-950 tracking-tight">
              Trusted by happy drivers
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={i} delay={Math.min(i * 80, 400)}>
              <figure className="card h-full rounded-2xl p-7 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe">
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm text-ink-600 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <p className="text-sm font-semibold text-ink-950">{review.name}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{review.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Platform ratings */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { name: 'AutoTrader', rating: '4.5' },
              { name: 'Google', rating: '4.5' },
              { name: 'Car Dealer Reviews', rating: '5.0' },
              { name: 'Trustpilot', rating: '4.4' },
            ].map(({ name, rating }) => (
              <p key={name} className="flex items-center gap-2 text-sm text-ink-500">
                <span className="font-display font-semibold text-ink-900">{name}</span>
                <span className="flex items-center gap-1 font-semibold text-ink-900">
                  {rating} <Star size={13} className="text-amber-400 fill-amber-400" />
                </span>
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
