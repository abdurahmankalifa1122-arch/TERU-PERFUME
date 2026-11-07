import React, { useState } from 'react';
import { Language, WhatsAppNumberOption } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, MessageSquare, Send, CheckCircle2, Navigation } from 'lucide-react';

interface StoreLocationContactProps {
  lang: Language;
  selectedNumber: WhatsAppNumberOption;
  onSelectNumber: (num: WhatsAppNumberOption) => void;
}

export const StoreLocationContact: React.FC<StoreLocationContactProps> = ({
  lang,
  selectedNumber,
  onSelectNumber,
}) => {
  const t = translations[lang];

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    // Simulate sending message to boutique team / WhatsApp fallback
    setIsSubmitted(true);
    setTimeout(() => {
      // Optional option to send via WhatsApp too
    }, 1000);
  };

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent('Bole Brass, Addis Ababa, Ethiopia');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#E9DFCF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-2">
            Store & Assistance
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#352A22] tracking-tight">
            {t.location.heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#352A22]/70 font-light">
            {t.location.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Physical Store Address & Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Address Card */}
              <div className="p-6 rounded-xl bg-[#F8F4EB] border border-[#E9DFCF] mb-6">
                <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-semibold text-[#C5A36A] mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{t.location.addressHeader}</span>
                </div>

                <div className="text-sm text-[#352A22] space-y-1 font-serif text-lg">
                  <p className="font-bold text-[#352A22]">{t.location.addressLine1}</p>
                  <p className="text-base text-[#352A22]/85">{t.location.addressLine2}</p>
                  <p className="text-sm text-[#352A22]/75 font-sans uppercase tracking-widest mt-2">
                    {t.location.addressLine3}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E9DFCF] flex items-center gap-3">
                  <button
                    onClick={handleOpenGoogleMaps}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#352A22] hover:text-[#C5A36A] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#C5A36A]" />
                    <span>{t.location.getDirections}</span>
                  </button>
                </div>
              </div>

              {/* Phone Lines Card */}
              <div className="p-6 rounded-xl bg-[#F8F4EB] border border-[#E9DFCF] mb-6">
                <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-semibold text-[#C5A36A] mb-3">
                  <Phone className="w-4 h-4" />
                  <span>{t.location.phonesHeader}</span>
                </div>

                <div className="space-y-4">
                  {/* Phone 1 */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#FFFDF8] border border-[#E9DFCF]">
                    <div>
                      <p className="text-xs text-[#352A22]/60 uppercase tracking-wider">Primary Line</p>
                      <p className="font-mono text-base font-bold text-[#352A22]">0912 351 222</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:+251912351222"
                        className="px-3 py-1.5 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-medium rounded transition-colors"
                      >
                        {t.location.callNow}
                      </a>
                      <a
                        href="https://wa.me/251912351222"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 border border-[#C5A36A] text-[#C5A36A] hover:bg-[#C5A36A] hover:text-white rounded transition-colors"
                        aria-label="WhatsApp 0912 351 222"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Phone 2 */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#FFFDF8] border border-[#E9DFCF]">
                    <div>
                      <p className="text-xs text-[#352A22]/60 uppercase tracking-wider">Boutique Line</p>
                      <p className="font-mono text-base font-bold text-[#352A22]">0922 876 830</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:+251922876830"
                        className="px-3 py-1.5 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-medium rounded transition-colors"
                      >
                        {t.location.callNow}
                      </a>
                      <a
                        href="https://wa.me/251922876830"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 border border-[#C5A36A] text-[#C5A36A] hover:bg-[#C5A36A] hover:text-white rounded transition-colors"
                        aria-label="WhatsApp 0922 876 830"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <p className="text-xs text-[#352A22]/60 italic font-serif">
              “Visit our boutique to experience each fragrance on sample test strips before making your selection.”
            </p>
          </div>

          {/* Right Column: Interactive Google Map & Contact Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Interactive Map Container */}
            <div className="relative rounded-xl overflow-hidden border border-[#E9DFCF] bg-[#F8F4EB] shadow-sm">
              <div className="h-64 sm:h-72 w-full relative">
                {/* Embedded OpenStreetMap / Google Maps View of Bole Brass, Addis Ababa */}
                <iframe
                  title="TERU PERFUME Store Location Bole Addis Ababa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Bole+Brass+Addis+Ababa+Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="filter grayscale contrast-125 opacity-90"
                />

                {/* Boutique Map Overlay Card */}
                <div className="absolute top-3 left-3 bg-[#FFFDF8]/95 backdrop-blur-md p-3 rounded-lg border border-[#E9DFCF] shadow-md max-w-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#352A22]">
                    <span className="w-2 h-2 rounded-full bg-[#C5A36A]" />
                    <span>TERU PERFUME BOUTIQUE</span>
                  </div>
                  <p className="text-[10px] text-[#352A22]/70 mt-0.5">
                    KKR Building · Ground Floor Room 9 · Bole Brass
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#F8F4EB] border border-[#E9DFCF]">
              <h3 className="text-xl font-serif font-bold text-[#352A22] mb-1">
                {t.location.contactFormTitle}
              </h3>
              <p className="text-xs text-[#352A22]/70 mb-5 font-light">
                Have a question about fragrance availability, notes, or orders? Let us know.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-lg bg-[#FFFDF8] border border-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <p className="text-sm font-semibold text-[#352A22]">{t.location.formSuccess}</p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', message: '' });
                    }}
                    type="button"
                    className="text-xs text-[#C5A36A] underline font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#352A22] mb-1">
                        {t.location.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Abebe"
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#E9DFCF] rounded text-xs text-[#352A22] placeholder:text-[#352A22]/40 focus:outline-none focus:border-[#C5A36A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#352A22] mb-1">
                        {t.location.phoneLabel} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0912..."
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#E9DFCF] rounded text-xs text-[#352A22] placeholder:text-[#352A22]/40 focus:outline-none focus:border-[#C5A36A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#352A22] mb-1">
                      {t.location.messageLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ask about prices, bottle sizes, scent recommendations..."
                      className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#E9DFCF] rounded text-xs text-[#352A22] placeholder:text-[#352A22]/40 focus:outline-none focus:border-[#C5A36A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-wider transition-colors rounded shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.location.sendBtn}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
