import React from 'react';
import { Language, WhatsAppNumberOption } from '../types';
import { translations } from '../data/translations';
import { generateDeliveryInquiryWhatsAppUrl } from '../utils/cart';
import { Truck, MapPin, Shield, MessageSquare, Phone } from 'lucide-react';

interface DeliverySectionProps {
  lang: Language;
  selectedNumber: WhatsAppNumberOption;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  lang,
  selectedNumber,
}) => {
  const t = translations[lang];

  const handleInquiry = () => {
    const url = generateDeliveryInquiryWhatsAppUrl(selectedNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8F4EB] border-b border-[#E9DFCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF8] border border-[#E9DFCF] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-3">
                <Truck className="w-4 h-4" />
                <span>Nationwide Reach</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#352A22] leading-tight mb-4 tracking-tight">
                {t.delivery.heading}
              </h2>

              <p className="text-sm sm:text-base text-[#352A22]/80 leading-relaxed font-light mb-8 max-w-xl">
                {t.delivery.desc}
              </p>

              {/* Delivery Feature Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF]/80">
                  <MapPin className="w-4 h-4 text-[#C5A36A] mb-2" />
                  <h4 className="text-xs font-semibold text-[#352A22] mb-1">
                    {t.delivery.feature1Title}
                  </h4>
                  <p className="text-[11px] text-[#352A22]/70 leading-relaxed font-light">
                    {t.delivery.feature1Desc}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF]/80">
                  <Truck className="w-4 h-4 text-[#C5A36A] mb-2" />
                  <h4 className="text-xs font-semibold text-[#352A22] mb-1">
                    {t.delivery.feature2Title}
                  </h4>
                  <p className="text-[11px] text-[#352A22]/70 leading-relaxed font-light">
                    {t.delivery.feature2Desc}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF]/80">
                  <Shield className="w-4 h-4 text-[#C5A36A] mb-2" />
                  <h4 className="text-xs font-semibold text-[#352A22] mb-1">
                    {t.delivery.feature3Title}
                  </h4>
                  <p className="text-[11px] text-[#352A22]/70 leading-relaxed font-light">
                    {t.delivery.feature3Desc}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleInquiry}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-[0.18em] transition-colors rounded shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.delivery.inquiryBtn}</span>
                </button>

                <a
                  href="tel:+251912351222"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#E9DFCF] text-[#352A22] hover:border-[#C5A36A] hover:text-[#C5A36A] bg-[#FFFDF8] text-xs font-semibold uppercase tracking-[0.18em] transition-colors rounded"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A36A]" />
                  <span>Call: 0912 351 222</span>
                </a>
              </div>
            </div>

            {/* Right Visual Badge Card */}
            <div className="lg:col-span-5 bg-[#F8F4EB] border border-[#E9DFCF] rounded-xl p-6 sm:p-8 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FFFDF8] border border-[#C5A36A]/50 flex items-center justify-center text-[#C5A36A] mb-4 shadow-xs">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#352A22] mb-2">
                Every Fragrance Handled with Care
              </h3>
              <p className="text-xs text-[#352A22]/70 leading-relaxed font-light mb-6">
                All perfume bottles are securely cushioned in luxury packaging to ensure safe transit whether to Bole, Kazanchis, CMC, or regional capitals across Ethiopia.
              </p>
              <div className="pt-4 border-t border-[#E9DFCF] flex items-center justify-around text-xs font-medium text-[#352A22]/80">
                <span>0912 351 222</span>
                <span className="text-[#C5A36A]">·</span>
                <span>0922 876 830</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
