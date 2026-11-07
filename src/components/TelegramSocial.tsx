import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Send, MessageSquare } from 'lucide-react';

interface TelegramSocialProps {
  lang: Language;
}

export const TelegramSocial: React.FC<TelegramSocialProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-16 sm:py-20 bg-[#F8F4EB] border-b border-[#E9DFCF]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFDF8] border border-[#E9DFCF] shadow-xs">
          
          <div className="w-12 h-12 mx-auto rounded-full bg-[#F8F4EB] border border-[#C5A36A]/50 flex items-center justify-center text-[#C5A36A] mb-4">
            <Send className="w-5 h-5 -rotate-12 translate-x-0.5" />
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-2">
            Official Community
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#352A22] mb-3">
            {t.social.heading}
          </h2>

          <p className="text-sm text-[#352A22]/70 max-w-lg mx-auto mb-8 font-light">
            {t.social.subheading}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Telegram Official Button */}
            <a
              href="https://t.me/teruperfume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs"
            >
              <Send className="w-4 h-4 text-[#C5A36A] group-hover:text-white" />
              <span>{t.social.telegramBtn}</span>
            </a>

            {/* WhatsApp Official Button */}
            <a
              href="https://wa.me/251912351222"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#C5A36A] text-[#352A22] hover:bg-[#C5A36A] hover:text-white bg-[#FFFDF8] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#C5A36A]" />
              <span>{t.social.whatsappBtn}</span>
            </a>
          </div>

          <p className="text-[11px] text-[#352A22]/50 mt-6 font-mono">
            t.me/teruperfume · Official Telegram Channel
          </p>
        </div>
      </div>
    </section>
  );
};
