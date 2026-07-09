import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ServiceCTA from '@/components/ServiceCTA';
import Reveal from '@/components/Reveal';
import { Check, ShieldCheck, Clock, PoundSterling, Handshake, ArrowUpRight } from 'lucide-react';
import { FINANCE_PARTNERS } from '@/lib/constants';

export const metadata = {
  title: 'Car Finance',
  description: 'Apply for car finance with KY Automotive. We work with Zuto, Close Brothers, and Motonova to find flexible finance options with competitive rates.',
};

const benefits = [
  { Icon: PoundSterling, title: 'Competitive rates', desc: 'We work with Zuto, Close Brothers, and Motonova to find you the best rates available.' },
  { Icon: Clock, title: 'Quick decisions', desc: 'Apply and receive a decision quickly. A soft credit check won\'t affect your credit score.' },
  { Icon: Handshake, title: 'Flexible terms', desc: 'Choose from PCP, HP, and personal loan options to suit your needs and budget.' },
  { Icon: ShieldCheck, title: 'Transparent process', desc: 'No hidden fees or surprises. We walk you through every step with full transparency.' },
];

const steps = [
  { step: '1', title: 'Choose your car', desc: 'Browse our stock and find the perfect vehicle for you.' },
  { step: '2', title: 'Check your eligibility', desc: 'Apply with Zuto or MotoNovo below. A soft check won\'t affect your credit score.' },
  { step: '3', title: 'Drive away', desc: 'Once approved, we\'ll arrange everything so you can drive away happy.' },
];

export default function FinancePage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHeader
        eyebrow="Car finance"
        title={
          <>
            Spread the cost,{' '}
            <em className="text-brand-gradient animate-brand-sweep italic">simply</em>
          </>
        }
        subtitle="Flexible finance to get you behind the wheel — checked in minutes with a soft search, arranged through trusted UK lenders."
      />

      <div className="container-px py-14 lg:py-20">
        {/* Partner cards */}
        <Reveal>
          <p className="eyebrow">Check your eligibility</p>
          <h2 className="mt-3 mb-4 text-3xl md:text-4xl font-semibold text-ink-950 tracking-tight">
            Trusted finance partners
          </h2>
          <p className="mb-10 max-w-2xl text-sm md:text-base text-ink-500">
            Click below to check your eligibility — it only takes a few minutes and won&apos;t
            affect your credit score.
          </p>
        </Reveal>
        <div className="grid gap-7 md:grid-cols-2 mb-16">
          {FINANCE_PARTNERS.map((partner, i) => (
            <Reveal key={partner.name} delay={Math.min(i * 80, 400)}>
              <div className="card rounded-2xl p-8 h-full flex flex-col items-start transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe">
                <h3 className="font-display text-xl font-semibold text-ink-950 mb-2">{partner.name}</h3>
                <p className="text-sm text-ink-500 mb-6 leading-relaxed flex-1">{partner.description}</p>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !text-xs"
                >
                  {partner.cta} <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid gap-7 sm:grid-cols-2 mb-16">
          {benefits.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={Math.min(i * 60, 400)}>
              <div className="card rounded-2xl p-6 flex gap-4 h-full">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <Icon size={20} className="text-brand-600" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-950 mb-1.5">{title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* How it works */}
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 mb-10 text-3xl md:text-4xl font-semibold text-ink-950 tracking-tight">
            Approved in three steps
          </h2>
        </Reveal>
        <div className="grid gap-7 sm:grid-cols-3 max-w-4xl mb-14">
          {steps.map(({ step, title, desc }, i) => (
            <Reveal key={step} delay={Math.min(i * 60, 400)}>
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 font-display text-lg font-semibold text-white mb-4">
                  {step}
                </span>
                <h3 className="font-display text-base font-semibold text-ink-950 mb-1.5">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10">
            {['Soft credit check', 'PCP · HP · Personal loans', 'Zuto, Close Brothers & Motonova', 'Quick decisions'].map((text) => (
              <p key={text} className="flex items-center gap-2 text-sm text-ink-600">
                <Check size={15} className="text-brand-600" /> {text}
              </p>
            ))}
          </div>
          <p className="max-w-3xl text-xs text-ink-400 leading-relaxed">
            We are a credit broker, not a lender. Finance is subject to status and income.
            Written quotation on request. Representative example: a fixed interest rate of 5.19%
            applied to the total credit amount over 60 months; a deposit is required; the
            Representative APR of 9.9% reflects the overall cost of borrowing including any
            additional charges. We work with Zuto, Close Brothers, and Motonova who may be able
            to offer you finance for your purchase.
          </p>
          <div className="mt-8">
            <Link href="/stock" className="btn btn-dark">Browse stock</Link>
          </div>
        </Reveal>
      </div>

      <ServiceCTA
        heading="Need help with finance?"
        text="Not sure which option fits? Call us and we'll help you find the right deal for your budget — no jargon, no pressure."
      />
    </div>
  );
}
