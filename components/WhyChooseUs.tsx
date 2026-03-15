'use client';

import { useState } from 'react';
import { ShieldCheck, Truck, Search, Wrench, PoundSterling, Clock, Award, Handshake } from 'lucide-react';

const tabs = [
  {
    label: 'Why buy from us?',
    features: [
      {
        Icon: ShieldCheck,
        title: 'Extended Warranty',
        description:
          'Rest easy knowing that your dream car comes with a comprehensive warranty, ensuring peace of mind on the road. As an extra perk, we cover the MOT costs for the lifetime of your vehicle.',
      },
      {
        Icon: Truck,
        title: 'Nationwide Delivery',
        description:
          'Choose convenience with our online buying option. Buy your desired car from the comfort of your home, and we\'ll deliver it right to your doorstep, anywhere in the UK.',
      },
      {
        Icon: Search,
        title: 'Meticulous Pre-Delivery Inspection',
        description:
          'Every car in our showroom undergoes a rigorous pre-delivery inspection by our expert technicians. This ensures that your chosen vehicle is in top-notch condition before you take ownership.',
      },
      {
        Icon: Wrench,
        title: 'Service Plans',
        description:
          'We believe in taking care of our customers even after the purchase. Our service plans offer hassle-free maintenance to keep your car in top condition throughout its life.',
      },
    ],
  },
  {
    label: 'Why sell to us?',
    features: [
      {
        Icon: PoundSterling,
        title: 'Competitive Valuations',
        description:
          'We offer fair and competitive prices for your vehicle. Get an instant online valuation or bring your car to us for an in-person assessment.',
      },
      {
        Icon: Clock,
        title: 'Quick & Easy Process',
        description:
          'Sell your car in as little as 30 minutes. Our streamlined process means less hassle and faster payment directly to your bank account.',
      },
      {
        Icon: Handshake,
        title: 'No Obligation',
        description:
          'Get a free valuation with absolutely no obligation to sell. We\'ll give you an honest assessment of your vehicle\'s worth.',
      },
      {
        Icon: Award,
        title: 'Trusted Dealer',
        description:
          'With thousands of satisfied customers and top ratings across all major review platforms, you can trust us to give you the best deal.',
      },
    ],
  },
  {
    label: 'Why finance with us?',
    features: [
      {
        Icon: ShieldCheck,
        title: 'FCA Regulated',
        description:
          'We are authorised and regulated by the Financial Conduct Authority, ensuring your finance application is handled professionally and responsibly.',
      },
      {
        Icon: PoundSterling,
        title: 'Competitive Rates',
        description:
          'We work with a panel of trusted lenders to find you the most competitive finance rates available, tailored to your budget.',
      },
      {
        Icon: Clock,
        title: 'Quick Decisions',
        description:
          'Apply online and receive a decision in minutes. Our soft credit check won\'t affect your credit score.',
      },
      {
        Icon: Handshake,
        title: 'Flexible Terms',
        description:
          'Choose from a range of flexible finance options including PCP, HP, and personal loans to suit your individual needs.',
      },
    ],
  },
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeatures = tabs[activeTab].features;

  return (
    <section className="bg-background py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
                i === activeTab
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white border border-white/20 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Features list */}
          <div className="lg:col-span-3 space-y-8">
            {activeFeatures.map(({ Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Icon size={24} className="text-white/60" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Atmospheric image */}
          <div className="lg:col-span-2 hidden lg:block">
            <div
              className="w-full h-full min-h-[400px] rounded-lg bg-cover bg-center"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=800&q=80)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
