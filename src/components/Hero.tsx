import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUpRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="hero" className="relative overflow-hidden bg-[#F8F4EB] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E9DFCF]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Quiet metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C5A36A] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#352A22] leading-[1.12] mb-6 tracking-tight text-balance">
              {t.hero.headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#352A22]/80 leading-relaxed font-light mb-8 max-w-xl">
              {t.hero.supporting}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-md group rounded-none"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#352A22]/40 text-[#352A22] hover:border-[#C5A36A] hover:text-[#C5A36A] bg-[#FFFDF8]/60 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 rounded-none"
              >
                <span>{t.hero.contactBtn}</span>
              </a>
            </div>

            {/* Trust Badges - Unboxed quiet metadata */}
            <div className="pt-6 border-t border-[#E9DFCF] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#352A22]/75">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A36A] shrink-0" />
                <span className="font-medium">{t.hero.trustOriginal}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A36A] shrink-0" />
                <span className="font-medium">{t.hero.trustBoutique}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A36A] font-serif font-bold text-sm">ET</span>
                <span className="font-medium">{t.hero.trustDelivery}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Fragrance Imagery on Travertine */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle background framing */}
              <div className="absolute -inset-3 bg-[#E9DFCF]/50 rounded-2xl -rotate-1 transition-transform" />
              
              {/* Main image container */}
              <div className="relative rounded-xl overflow-hidden border border-[#E9DFCF] bg-[#FFFDF8] shadow-xl aspect-16/10 sm:aspect-16/11 lg:aspect-4/3">
                <img
                  src={IMAGES.heroLuxuryPerfume}
                  alt="TERU PERFUME luxury flacon on warm cream travertine"
                  className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#352A22]/20 via-transparent to-transparent pointer-events-none" />

                {/* Micro overlay card */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs bg-[#FFFDF8]/90 backdrop-blur-md p-3.5 border border-[#E9DFCF] rounded shadow-sm">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#C5A36A] font-semibold mb-1">
                    <span>Signature Showcase</span>
                    <span>100% Authentic</span>
                  </div>
                  <p className="text-xs font-serif font-bold text-[#352A22]">
                    Fine Perfumery · Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
