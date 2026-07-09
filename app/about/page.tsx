import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'About Us | The KY Story',
  description: 'KY Automotive - Family-run car dealership near Heathrow, London. Over 10 years of experience offering affordable luxury and sporty vehicles with 150-point inspection and 6-month warranty.',
};

// [PLACEHOLDER: swap names, roles and bios for the real team]
const directors = [
  {
    initials: 'KR',
    name: '[PLACEHOLDER: Director name]',
    role: 'Founder & Director',
    bio: '[PLACEHOLDER: short bio — background in the motor trade, what they look after day to day.]',
  },
  {
    initials: 'KY',
    name: '[PLACEHOLDER: Director name]',
    role: 'Sales Director',
    bio: '[PLACEHOLDER: short bio — customer experience, valuations and handovers.]',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHeader
        eyebrow="About us"
        title={<>The KY Story</>}
        subtitle="A family-run dealership near Heathrow, built on a simple idea: quality vehicles, fair prices, and customers who drive away happy."
      />

      {/* Story */}
      <div className="container-px py-14 lg:py-20 max-w-3xl">
        <Reveal>
          <div className="space-y-5 text-sm md:text-base text-ink-600 leading-relaxed">
            <p>
              At KY Automotive, we are a family-run car dealership based near Heathrow, London,
              proudly serving customers across the UK for over 10 years. We specialise in
              affordable luxury and sporty vehicles, carefully selected to give our customers the
              perfect balance of performance, style, and value.
            </p>
            <p>
              Our reputation has been built on honesty, reliability, and outstanding customer
              service. As a family business, we treat every customer with the care and attention
              they deserve, ensuring the car buying process is simple, transparent, and enjoyable.
            </p>
            <p>
              Every vehicle undergoes a comprehensive 150-point inspection before it goes on
              sale, and every car leaves with a 6-month warranty. We offer flexible finance,
              welcome part exchange, and deliver nationwide — whether you&apos;re around the
              corner in West London or at the other end of the country.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Directors */}
      <div className="bg-cream-100 border-y border-ink-100 py-14 lg:py-20">
        <div className="container-px">
          <Reveal>
            <p className="eyebrow">Meet the directors</p>
            <h2 className="mt-3 mb-10 text-3xl md:text-4xl font-semibold text-ink-950 tracking-tight">
              The people behind KY
            </h2>
          </Reveal>
          <div className="grid gap-7 sm:grid-cols-2 max-w-3xl">
            {directors.map(({ initials, name, role, bio }, i) => (
              <Reveal key={initials} delay={Math.min(i * 80, 400)}>
                <div className="card rounded-2xl p-7 h-full">
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-950 font-display text-xl font-semibold text-white">
                    {initials}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink-950">{name}</h3>
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-600 mt-1 mb-3">{role}</p>
                  <p className="text-sm text-ink-500 leading-relaxed">{bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* The KY Promise */}
      <div className="container-px py-14 lg:py-20 max-w-3xl">
        <Reveal>
          <p className="eyebrow">The KY promise</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-ink-950 tracking-tight">
            If we wouldn&apos;t drive it, we won&apos;t sell it
          </h2>
          <div className="mt-6 space-y-5 text-sm md:text-base text-ink-600 leading-relaxed">
            <p>
              Every car on our forecourt is one we&apos;d be happy to hand to our own family —
              inspected to 150 points, honestly described, and priced fairly against the market.
              No pressure on the phone, no games on the forecourt, and no surprises after handover.
            </p>
            <p>
              And because buying the car is only half the story, we stay on the other end of the
              phone afterwards — with a 6-month warranty as standard and a team that actually
              picks up.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/stock" className="btn btn-primary">Browse the collection</Link>
            <Link href="/contact" className="btn btn-outline">Get in touch</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
