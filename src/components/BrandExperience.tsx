import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight } from 'lucide-react';

interface BrandExperienceProps {
  lang: Language;
}

export const BrandExperience: React.FC<BrandExperienceProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-20 sm:py-28 bg-[#FFFDF8] border-b border-[#E9DFCF]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Editorial Image Frame */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#E9DFCF] bg-[#F8F4EB] shadow-xl aspect-16/10 sm:aspect-16/11">
              <img
                src="/src/assets/images/editorial_craft_1794041957745.jpg"
                alt="Art of fine fragrance crafting with oud wood, petals, and crystal flacon"
                className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#352A22]/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle floating quote block */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 max-w-sm bg-[#F8F4EB] border border-[#C5A36A]/40 p-5 rounded-lg shadow-lg">
              <p className="text-xs font-serif italic text-[#352A22] leading-relaxed">
                {t.editorial.quote}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-[#C5A36A]">
                TERU PERFUME · Bole Addis Ababa
              </p>
            </div>
          </div>

          {/* Text & Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-3">
              The Boutique Philosophy
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#352A22] leading-tight mb-6 text-balance">
              {t.editorial.headline}
            </h2>

            <p className="text-sm sm:text-base text-[#352A22]/80 leading-relaxed font-light mb-8">
              {t.editorial.supporting}
            </p>

            <div>
              <a
                href="#shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-md group rounded-none"
              >
                <span>{t.editorial.discoverBtn}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
