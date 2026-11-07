import React from 'react';
import { FragranceProduct, Language, WhatsAppNumberOption } from '../types';
import { translations } from '../data/translations';
import { formatETB, generateWhatsAppSingleProductUrl } from '../utils/cart';
import { X, MessageSquare, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: FragranceProduct | null;
  onClose: () => void;
  lang: Language;
  onAddToCart: (product: FragranceProduct) => void;
  selectedNumber: WhatsAppNumberOption;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  lang,
  onAddToCart,
  selectedNumber,
}) => {
  if (!product) return null;

  const t = translations[lang];
  const name = lang === 'am' && product.nameAm ? product.nameAm : product.name;
  const description =
    lang === 'am' && product.descriptionAm ? product.descriptionAm : product.description;

  const handleWhatsAppOrder = () => {
    const url = generateWhatsAppSingleProductUrl({
      product,
      selectedNumber,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-3xl bg-[#FFFDF8] border border-[#E9DFCF] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label={t.pdp.close}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#F8F4EB] text-[#352A22]/70 hover:text-[#352A22] hover:bg-[#E9DFCF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-[#F8F4EB] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#352A22]/85 text-[#FFFDF8] text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-xs">
              {product.category}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A36A] font-semibold mb-1">
                <span>{product.brand}</span>
                <span>·</span>
                <span>{product.bottleSize}</span>
              </div>

              <h3
                id="modal-product-title"
                className="text-2xl sm:text-3xl font-serif font-bold text-[#352A22] mb-3 leading-tight"
              >
                {name}
              </h3>

              <div className="text-xl font-bold font-mono tabular-nums text-[#352A22] mb-4">
                {formatETB(product.priceETB)}
              </div>

              <p className="text-sm text-[#352A22]/80 leading-relaxed font-light mb-6">
                {description}
              </p>

              {/* Olfactory Notes Breakdown */}
              <div className="mb-6 p-4 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF]/80">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#352A22] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A36A]" />
                  <span>{t.pdp.olfactoryPyramid}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-[#352A22]">{t.pdp.topNotes}: </span>
                    <span className="text-[#352A22]/80">{product.topNotes.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#352A22]">{t.pdp.heartNotes}: </span>
                    <span className="text-[#352A22]/80">{product.heartNotes.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#352A22]">{t.pdp.baseNotes}: </span>
                    <span className="text-[#352A22]/80">{product.baseNotes.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Authenticity Guarantee */}
              <div className="flex items-center gap-2 text-xs text-[#352A22]/70 mb-6">
                <ShieldCheck className="w-4 h-4 text-[#C5A36A]" />
                <span>100% Original Guaranteed · Sourced for Addis Ababa</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E9DFCF]">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-wider transition-colors rounded"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.featured.addToBag}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#C5A36A] text-[#352A22] hover:bg-[#C5A36A] hover:text-[#FFFDF8] bg-[#FFFDF8] text-xs font-semibold uppercase tracking-wider transition-colors rounded"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A36A] group-hover:text-white" />
                <span>{t.featured.whatsappQuick}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
