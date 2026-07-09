import PageHeader from '@/components/PageHeader';
import ServiceCTA from '@/components/ServiceCTA';
import Reveal from '@/components/Reveal';
import { ShieldCheck, Wrench, PhoneCall, SlidersHorizontal, Award, HeartHandshake } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Warranty',
  description: `Every car from ${SITE_NAME} comes with a 6-month warranty as standard, with extended and main dealer options available.`,
};

const benefits = [
  {
    Icon: ShieldCheck,
    title: 'Comprehensive protection',
    desc: 'A 6-month warranty is included as standard with every car we sell — no extra cost.',
  },
  {
    Icon: Wrench,
    title: 'Repairs sorted',
    desc: 'Covered faults are repaired by trusted garages using proper parts, without drama.',
  },
  {
    Icon: PhoneCall,
    title: 'Claims made simple',
    desc: 'One call to us starts the process. We deal with the paperwork so you don\'t have to.',
  },
  {
    Icon: SlidersHorizontal,
    title: 'Flexible plans',
    desc: 'Want longer cover? Extended and main dealer warranty packages are available on request.',
  },
  {
    Icon: Award,
    title: 'Inspected first',
    desc: 'Warranties mean little without preparation — every car passes a 150-point check before sale.',
  },
  {
    Icon: HeartHandshake,
    title: 'Added peace of mind',
    desc: 'A family business that answers the phone after you\'ve bought the car, not just before.',
  },
];

const steps = [
  { step: '1', title: 'Choose your car', desc: 'Every car on our forecourt already includes 6 months of cover.' },
  { step: '2', title: 'Pick your cover', desc: 'Stick with the standard warranty or extend it for longer protection.' },
  { step: '3', title: 'Drive protected', desc: 'Enjoy the car. If anything covered goes wrong, one call sorts it.' },
];

export default function WarrantyPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHeader
        eyebrow="Warranty"
        title={
          <>
            Drive with total{' '}
            <em className="text-brand-gradient animate-brand-sweep italic">peace of mind</em>
          </>
        }
        subtitle="Every KY Automotive car includes a 6-month warranty as standard — because we prepare our cars properly and stand behind them after handover."
      />

      {/* Benefits */}
      <div className="container-px py-14">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ Icon, title, desc }, i) => (
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

      {/* 3 steps */}
      <div className="container-px pb-16 lg:pb-24">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 mb-10 text-3xl md:text-4xl font-semibold text-ink-950 tracking-tight">
            Covered in three steps
          </h2>
        </Reveal>
        <div className="grid gap-7 sm:grid-cols-3 max-w-4xl">
          {steps.map(({ step, title, desc }, i) => (
            <Reveal key={step} delay={Math.min(i * 60, 400)}>
              <div className="text-center sm:text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 font-display text-lg font-semibold text-white mb-4">
                  {step}
                </span>
                <h3 className="font-display text-base font-semibold text-ink-950 mb-1.5">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-xs text-ink-400 leading-relaxed">
          Warranty cover is subject to the plan terms and conditions, which are provided in
          writing at the point of sale. Wear-and-tear items and routine servicing are not covered.
        </p>
      </div>

      <ServiceCTA
        heading="Ask us about warranty cover"
        text="Want the full terms, or a quote for extended cover on a car you're looking at? Get in touch and we'll walk you through it."
      />
    </div>
  );
}
