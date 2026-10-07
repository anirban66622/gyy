import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Advanced Strength & Cardio Equipment',
    description:
      'Industry-grade machines and free weights for effective, safe, and performance-focused training.',
  },
  {
    number: '02',
    name: 'Certified Fitness Coaches',
    description:
      'Qualified trainers providing expert guidance, personalised workout plans, and technique correction.',
  },
  {
    number: '03',
    name: 'Supportive Training Environment',
    description:
      'A positive, motivating fitness community that encourages consistency, discipline, and progress.',
  },
  {
    number: '04',
    name: 'Premium Hydration Facilities',
    description:
      'Access to clean, purified drinking water to keep you hydrated throughout every workout.',
  },
  {
    number: '05',
    name: 'Professional Content Creation Space',
    description:
      'Dedicated aesthetic workout areas with optimal lighting and mirrors for creating high-quality fitness content.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2 className="font-black uppercase tracking-tight leading-none text-[#0C0C0C] text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
            Services
          </h2>
        </FadeIn>

        {/* Vertical List of Services */}
        <div className="flex flex-col w-full border-t border-[#0C0C0C]/15">
          {SERVICES_DATA.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={30}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 sm:gap-8 py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15">
                {/* Number */}
                <div className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none shrink-0 sm:w-[180px] md:w-[240px]">
                  {service.number}
                </div>

                {/* Name & Description Stacked Vertically */}
                <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                  <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
