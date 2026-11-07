import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Clock, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#E9DFCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Brand Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-2">
              About TERU PERFUME
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#352A22] leading-tight mb-6 tracking-tight">
              {t.about.heading}
            </h2>

            <p className="text-base sm:text-lg text-[#352A22]/80 leading-relaxed font-light mb-8">
              {t.about.desc}
            </p>

            {/* Boutique Highlights */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF] flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#C5A36A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#352A22]">
                    {t.about.addressTitle}
                  </h4>
                  <p className="text-xs text-[#352A22]/75 mt-0.5 font-light">
                    {t.about.addressLine}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF] flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#C5A36A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#352A22]">
                    {t.about.timingTitle}
                  </h4>
                  <p className="text-xs text-[#352A22]/75 mt-0.5 font-light">
                    {t.about.timingDesc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF] flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-[#C5A36A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#352A22]">
                    {t.about.consultation}
                  </h4>
                  <p className="text-xs text-[#352A22]/75 mt-0.5 font-light">
                    {t.about.consultationDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Boutique & Scent Imagery */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="rounded-xl overflow-hidden border border-[#E9DFCF] bg-[#F8F4EB] shadow-lg aspect-4/3">
                <img
                  src="/src/assets/images/collection_niche_1794041958178.jpg"
                  alt="TERU PERFUME boutique showcase in Bole Addis Ababa"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Accent Info Badge */}
              <div className="mt-4 p-4 bg-[#F8F4EB] border border-[#E9DFCF] rounded-lg text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C5A36A] font-semibold">
                  Bole Brass · KKR Building · Ground Floor Room 9
                </p>
                <p className="text-xs text-[#352A22]/70 mt-1">
                  Welcoming fragrance enthusiasts across Addis Ababa
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
