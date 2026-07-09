import PageHeader from '@/components/PageHeader';
import ServiceCTA from '@/components/ServiceCTA';
import Reveal from '@/components/Reveal';
import { Percent, BadgePoundSterling, ShieldCheck } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Sale or Return',
  description: `Let ${SITE_NAME} sell your car for you. We prepare, market and sell your car from our forecourt — you only pay when it sells.`,
};

const highlights = [
  {
    Icon: Percent,
    title: 'Simple commission',
    desc: 'One agreed commission when your car sells — no surprises, no hidden extras.',
  },
  {
    Icon: BadgePoundSterling,
    title: 'Zero setup fees',
    desc: 'Preparation, photography and advertising are all on us while the car is with us.',
  },
  {
    Icon: ShieldCheck,
    title: 'No sale, no fee',
    desc: "If we don't sell your car, you don't pay a penny. It's that simple.",
  },
];

const steps = [
  {
    step: '1',
    title: 'Valuation & agreement',
    desc: 'We agree a realistic selling price and our commission with you up front, in writing.',
  },
  {
    step: '2',
    title: 'Showroom-ready preparation',
    desc: 'Your car is inspected, valeted and photographed to the same standard as our own stock.',
  },
  {
    step: '3',
    title: 'Premium marketing',
    desc: 'Listed on our website and the major marketplaces, with enquiries handled by our team.',
  },
  {
    step: '4',
    title: 'Dealer perks for the buyer',
    desc: 'Buyers get a warranty and finance options through us — which helps your car sell faster and for more.',
  },
  {
    step: '5',
    title: 'Handover & instant payment',
    desc: 'Once sold, we handle the paperwork and transfer your money straight away.',
  },
];

export default function SaleOrReturnPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHeader
        eyebrow="Sale or return"
        title={<>Maximise your car&apos;s value, hassle-free</>}
        subtitle="Private-sale money without the private-sale headache. We prepare, market and sell your car from our forecourt — you only pay when it sells."
      />

      {/* Highlights */}
      <div className="container-px py-14">
        <div className="grid gap-7 sm:grid-cols-3">
          {highlights.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={Math.min(i * 60, 400)}>
              <div className="card rounded-2xl p-6 h-full">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-50">
                  <Icon size={20} className="text-brand-600" />
                </span>
                <h3 className="font-display text-base font-semibold text-ink-950 mb-1.5">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="container-px pb-16 lg:pb-24">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 mb-10 text-3xl md:text-4xl font-semibold text-ink-950 tracking-tight">
            Five steps to a smarter sale
          </h2>
        </Reveal>
        <div className="space-y-4 max-w-3xl">
          {steps.map(({ step, title, desc }, i) => (
            <Reveal key={step} delay={Math.min(i * 60, 400)}>
              <div className="card flex gap-5 rounded-2xl p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-base font-semibold text-white">
                  {step}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-950 mb-1">{title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ServiceCTA
        heading="Ready to sell smarter?"
        text="Tell us about your car and we'll talk you through the numbers — commission, timescales and what we think it will sell for."
      />
    </div>
  );
}
