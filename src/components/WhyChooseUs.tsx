import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, HeartHandshake, Truck, Headphones } from 'lucide-react';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = translations[lang];

  const benefits = [
    {
      num: '01',
      title: t.whyChoose.card1Title,
      description: t.whyChoose.card1Desc,
      icon: ShieldCheck,
    },
    {
      num: '02',
      title: t.whyChoose.card2Title,
      description: t.whyChoose.card2Desc,
      icon: HeartHandshake,
    },
    {
      num: '03',
      title: t.whyChoose.card3Title,
      description: t.whyChoose.card3Desc,
      icon: Truck,
    },
    {
      num: '04',
      title: t.whyChoose.card4Title,
      description: t.whyChoose.card4Desc,
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F4EB] border-b border-[#E9DFCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-2">
            The TERU Standard
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#352A22] tracking-tight">
            {t.whyChoose.heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#352A22]/70 font-light">
            {t.whyChoose.subheading}
          </p>
        </div>

        {/* 4 Minimalist Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-[#FFFDF8] border border-[#E9DFCF] rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-[#C5A36A]/50 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-light text-[#C5A36A]">
                      {item.num}
                    </span>
                    <div className="p-2.5 rounded-full bg-[#F8F4EB] border border-[#E9DFCF]/60 text-[#352A22] group-hover:text-[#C5A36A] group-hover:bg-[#FFFDF8] transition-colors">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#352A22] mb-3 group-hover:text-[#C5A36A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#352A22]/75 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E9DFCF]/50 text-[10px] uppercase tracking-widest text-[#C5A36A] font-semibold">
                  Guaranteed Quality
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
