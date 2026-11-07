import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, Send, MessageSquare } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#352A22] text-[#F8F4EB] pt-16 pb-12 border-t border-[#C5A36A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#F8F4EB]/10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <Logo variant="footer" showSubtitle={true} />
            </div>
            <p className="text-xs sm:text-sm text-[#F8F4EB]/70 leading-relaxed font-light max-w-sm mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/teruperfume"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram Channel"
                className="w-9 h-9 rounded-full bg-[#F8F4EB]/10 hover:bg-[#C5A36A] text-[#F8F4EB] hover:text-[#352A22] flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/251912351222"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Order Line 1"
                className="w-9 h-9 rounded-full bg-[#F8F4EB]/10 hover:bg-[#C5A36A] text-[#F8F4EB] hover:text-[#352A22] flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A36A] mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F4EB]/80 font-light">
              <li>
                <a href="#hero" className="hover:text-[#C5A36A] transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#C5A36A] transition-colors">
                  {t.nav.shop}
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#C5A36A] transition-colors">
                  {t.nav.collections}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C5A36A] transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C5A36A] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Fragrance Collections */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A36A] mb-4">
              {t.footer.collections}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F4EB]/80 font-light">
              <li>
                <a href="#shop" className="hover:text-[#C5A36A] transition-colors">
                  Designer Perfumes
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#C5A36A] transition-colors">
                  Niche Fragrances
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#C5A36A] transition-colors">
                  Arabic Oud & Amber
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#C5A36A] transition-colors">
                  Luxury Extraits
                </a>
              </li>
            </ul>
          </div>

          {/* Store Location & Phone Numbers */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A36A] mb-4">
              {t.footer.contactUs}
            </h4>
            <div className="space-y-3 text-xs text-[#F8F4EB]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A36A] shrink-0 mt-0.5" />
                <p>
                  Bole Brass, KKR Building,<br />
                  Ground Floor, Room No. 9,<br />
                  Addis Ababa, Ethiopia
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#C5A36A] shrink-0" />
                <div className="font-mono">
                  <a href="tel:+251912351222" className="hover:text-[#C5A36A] transition-colors">0912 351 222</a>
                  <span className="mx-1.5 text-[#C5A36A]">/</span>
                  <a href="tel:+251922876830" className="hover:text-[#C5A36A] transition-colors">0922 876 830</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Send className="w-4 h-4 text-[#C5A36A] shrink-0" />
                <a
                  href="https://t.me/teruperfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A36A] transition-colors"
                >
                  t.me/teruperfume
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F4EB]/60 gap-4">
          <p>{t.footer.rights}</p>
          <p className="text-[11px] text-[#C5A36A]">
            100% Original Designer, Niche & Arabic Fragrances · Addis Ababa
          </p>
        </div>

      </div>
    </footer>
  );
};
