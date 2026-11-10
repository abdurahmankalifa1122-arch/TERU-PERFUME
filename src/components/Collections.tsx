import React from 'react';
import { FragranceCategory, Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';

interface CollectionsProps {
  lang: Language;
  onSelectCategory: (category: FragranceCategory) => void;
}

export const Collections: React.FC<CollectionsProps> = ({ lang, onSelectCategory }) => {
  const t = translations[lang];

  const categories = [
    {
      id: 'designer' as FragranceCategory,
      title: t.collections.designer,
      description: t.collections.designerDesc,
      image: IMAGES.collectionDesigner,
      badge: 'Iconic Houses',
    },
    {
      id: 'niche' as FragranceCategory,
      title: t.collections.niche,
      description: t.collections.nicheDesc,
      image: IMAGES.collectionNiche,
      badge: 'Artisanal & Rare',
    },
    {
      id: 'arabic' as FragranceCategory,
      title: t.collections.arabic,
      description: t.collections.arabicDesc,
      image: IMAGES.collectionArabic,
      badge: 'Oud & Amber',
    },
    {
      id: 'luxury' as FragranceCategory,
      title: t.collections.luxury,
      description: t.collections.luxuryDesc,
      image: IMAGES.editorialCraft,
      badge: 'Extraits & Elixirs',
    },
  ];

  const handleCardClick = (catId: FragranceCategory) => {
    onSelectCategory(catId);
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-16 sm:py-20 bg-[#FFFDF8] border-b border-[#E9DFCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-2">
            Curated Olfactive Categories
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#352A22] tracking-tight">
            {t.collections.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#352A22]/70 font-light">
            {t.collections.subheading}
          </p>
        </div>

        {/* 4 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.id)}
              className="group cursor-pointer flex flex-col bg-[#F8F4EB] border border-[#E9DFCF] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#E9DFCF]/30">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#352A22]/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase font-semibold text-[#FFFDF8] bg-[#352A22]/80 px-2 py-0.5 rounded-xs">
                  {cat.badge}
                </span>
              </div>

              {/* Text content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#352A22] group-hover:text-[#C5A36A] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#352A22]/70 leading-relaxed font-light line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E9DFCF]/60 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#352A22] group-hover:text-[#C5A36A] transition-colors">
                  <span>{t.collections.viewAll}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
