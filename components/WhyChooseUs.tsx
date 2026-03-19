'use client';

import { useState } from 'react';
import { ShieldCheck, Truck, Search, PoundSterling, Clock, Handshake, Car, Award } from 'lucide-react';

const tabs = [
  {
    label: 'Why buy from us?',
    features: [
      {
        Icon: Search,
        title: '150-Point Vehicle Inspection',
        description:
          'Every car undergoes a detailed 150-point mechanical and safety inspection to ensure it meets our strict quality standards.',
      },
      {
        Icon: ShieldCheck,
        title: '6-Month Warranty Included',
        description:
          'We are confident in our vehicles, which is why every car comes with a 6-month warranty for your peace of mind.',
      },
      {
        Icon: Car,
        title: 'Affordable Luxury & Sporty Vehicles',
        description:
          'We specialise in stylish, performance-driven cars at competitive prices, giving you premium vehicles without the premium price tag.',
      },
      {
        Icon: PoundSterling,
        title: 'Flexible Finance Available',
        description:
          'We work with finance providers including Zuto, Close Brothers, and Motonova to help you find flexible payment options that suit your budget.',
      },
      {
        Icon: Handshake,
        title: 'Part Exchange Welcome',
        description:
          'Looking to upgrade? We offer competitive part exchange valuations on your current vehicle.',
      },
      {
        Icon: Truck,
        title: 'Nationwide Delivery',
        description:
          'Based near Heathrow, London, but we deliver vehicles nationwide, making it easy to buy from anywhere in the UK.',
      },
      {
        Icon: Award,
        title: 'Family-Run & Customer Focused',
        description:
          'With over 10 years of experience, we pride ourselves on honest advice, transparency, and excellent customer service.',
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
          'We offer fair and competitive prices for your vehicle. Get a valuation or bring your car to us for an in-person assessment.',
      },
      {
        Icon: Clock,
        title: 'Quick & Easy Process',
        description:
          'Our streamlined process means less hassle and faster payment directly to your bank account.',
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
          'With over 10 years of experience and countless satisfied customers, you can trust us to give you the best deal.',
      },
    ],
  },
  {
    label: 'Why finance with us?',
    features: [
      {
        Icon: PoundSterling,
        title: 'Competitive Rates',
        description:
          'We work with Zuto, Close Brothers, and Motonova to find you the most competitive finance rates available.',
      },
      {
        Icon: Clock,
        title: 'Quick Decisions',
        description:
          'Apply and receive a decision quickly. Our soft credit check won\'t affect your credit score.',
      },
      {
        Icon: Handshake,
        title: 'Flexible Terms',
        description:
          'Choose from a range of flexible finance options including PCP, HP, and personal loans to suit your individual needs.',
      },
      {
        Icon: ShieldCheck,
        title: 'Transparent Process',
        description:
          'No hidden fees or surprises. We walk you through every step of the finance process with full transparency.',
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
