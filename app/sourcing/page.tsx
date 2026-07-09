import PageHeader from '@/components/PageHeader';
import ServiceCTA from '@/components/ServiceCTA';
import Reveal from '@/components/Reveal';
import { ListChecks, Compass, ShieldCheck } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Vehicle Sourcing',
  description: `Can't find the exact car you want? ${SITE_NAME} will source it for you — inspected, history-checked and delivered with a warranty.`,
};

const highlights = [
  {
    Icon: ListChecks,
    title: 'You set the wishlist',
    desc: 'Make, model, spec, colour, budget — as precise or as open as you like.',
  },
  {
    Icon: Compass,
    title: 'Trade-only access',
    desc: 'We search auctions and trade channels the public never sees, not just the classifieds.',
  },
  {
    Icon: ShieldCheck,
    title: 'Inspected & warrantied',
    desc: 'Every sourced car is history-checked, inspected and handed over with a warranty.',
  },
];

const steps = [
  {
    step: '1',
    title: 'The wishlist',
    desc: 'We sit down with you (or hop on a call) and pin down exactly what you\'re after — and what you\'d happily compromise on.',
  },
  {
    step: '2',
    title: 'The hunt',
    desc: 'We search trade sources, auctions and our dealer network, and keep you posted with honest updates. Our sourcing fee is agreed with you before we start.',
  },
  {
    step: '3',
    title: 'Inspection & verification',
    desc: 'Any candidate car gets a full HPI history check and a hands-on inspection by our technician before you commit.',
  },
  {
    step: '4',
    title: 'Handover & warranty',
    desc: 'We prepare the car to our showroom standard and hand it over with a warranty — delivered nationwide if needed.',
  },
];

export default function SourcingPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHeader
        eyebrow="Vehicle sourcing"
        title={<>Your perfect car, sourced by experts</>}
        subtitle="Can't find the exact spec you want? Tell us what you're after and we'll track it down, inspect it and deliver it — with the same care as our own stock."
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
            From wishlist to driveway
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
        heading="Let us find your next vehicle"
        text="Send us your wishlist — make, spec, budget — and we'll tell you honestly how quickly we can find it."
      />
    </div>
  );
}
