import ValuationForm from '@/components/ValuationForm';
import PageHeader from '@/components/PageHeader';
import ServiceCTA from '@/components/ServiceCTA';
import Reveal from '@/components/Reveal';
import { Scale, Zap, Repeat } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Part Exchange | Sell Your Car',
  description: `Trade in or sell your car to ${SITE_NAME}. Fair valuations, a quick process and payment without the hassle.`,
};

const highlights = [
  {
    Icon: Scale,
    title: 'Fair valuations',
    desc: 'Priced against the live retail market — honest numbers, no lowball offers.',
  },
  {
    Icon: Zap,
    title: 'Hassle-free',
    desc: 'One form, one quick call, and your valuation is sorted within 24 hours.',
  },
  {
    Icon: Repeat,
    title: 'Offset or sell',
    desc: 'Put the value towards your next car from us, or simply sell it outright.',
  },
];

export default function SellYourCarPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHeader
        eyebrow="Part exchange"
        title={<>Trade in your car, the easy way</>}
        subtitle="Get a competitive valuation on your current car and put it towards your next one — or sell it to us outright. Free, fast and with no obligation."
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

      {/* Split: copy + form */}
      <div className="container-px pb-16 lg:pb-24 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <Reveal className="lg:col-span-2">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-ink-950 tracking-tight">
            A fair price, zero hassle
          </h2>
          <div className="mt-6 space-y-4 text-sm md:text-base text-ink-600 leading-relaxed">
            <p>
              Tell us about your car using the form — registration, mileage and a few details
              are all we need. We&apos;ll value it against the live retail market and come back
              to you within 24 hours.
            </p>
            <p>
              Happy with the number? Use it as a deposit against any car on our forecourt, or
              take the payment straight to your bank. No haggling on the doorstep, no last-minute
              deductions — the price we quote is the price we mean, subject only to the car
              matching its description.
            </p>
            <p>
              Outstanding finance? No problem — we can settle it as part of the deal and pay
              you the difference.
            </p>
          </div>
        </Reveal>
        <Reveal direction="right" className="lg:col-span-3">
          <div className="card rounded-2xl p-6 md:p-8">
            <ValuationForm />
          </div>
        </Reveal>
      </div>

      <ServiceCTA
        heading="Rather talk it through?"
        text="Call or message us with your reg and mileage and we'll get a valuation moving straight away."
      />
    </div>
  );
}
