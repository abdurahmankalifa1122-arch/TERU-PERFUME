import React, { useState } from 'react';
import { CartItem, Language, WhatsAppNumberOption } from '../types';
import { translations } from '../data/translations';
import {
  calculateCartSubtotal,
  calculateTotalItemCount,
  formatETB,
  generateWhatsAppOrderUrl,
} from '../utils/cart';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  lang: Language;
  selectedNumber: WhatsAppNumberOption;
  onSelectNumber: (num: WhatsAppNumberOption) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
  selectedNumber,
  onSelectNumber,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const subtotal = calculateCartSubtotal(items);
  const totalCount = calculateTotalItemCount(items);

  // WhatsApp order form inputs
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formError, setFormError] = useState('');

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!deliveryLocation.trim()) {
      setFormError('Please enter your delivery location (e.g., Bole, Addis Ababa).');
      return;
    }

    setFormError('');
    const url = generateWhatsAppOrderUrl({
      items,
      customerName,
      location: deliveryLocation,
      note: orderNote,
      selectedNumber,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-2xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] border-l border-[#E9DFCF] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E9DFCF] flex items-center justify-between bg-[#F8F4EB]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5A36A]" />
              <h3 className="font-serif text-xl font-bold text-[#352A22]">
                {t.cart.title}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E9DFCF] text-[#352A22] tabular-nums">
                {totalCount}
              </span>
            </div>

            <button
              onClick={onClose}
              type="button"
              aria-label="Close bag"
              className="p-1.5 rounded-full text-[#352A22]/70 hover:text-[#352A22] hover:bg-[#E9DFCF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F8F4EB] border border-[#E9DFCF] flex items-center justify-center text-[#C5A36A]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#352A22]">
                  {t.cart.emptyTitle}
                </h4>
                <p className="text-xs text-[#352A22]/70 max-w-xs mx-auto font-light">
                  {t.cart.emptyDesc}
                </p>
                <button
                  onClick={onClose}
                  type="button"
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  <span>{t.cart.startShopping}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const name =
                      lang === 'am' && item.product.nameAm
                        ? item.product.nameAm
                        : item.product.name;
                    const itemTotal = item.product.priceETB * item.quantity;

                    return (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-lg bg-[#F8F4EB] border border-[#E9DFCF] flex gap-3.5 items-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded bg-[#FFFDF8] shrink-0 border border-[#E9DFCF]"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-[#C5A36A] font-semibold truncate">
                            {item.product.brand} · {item.product.bottleSize}
                          </p>
                          <h4 className="text-sm font-serif font-bold text-[#352A22] truncate">
                            {name}
                          </h4>
                          <p className="text-xs font-mono font-bold text-[#352A22] mt-0.5 tabular-nums">
                            {formatETB(itemTotal)}
                          </p>

                          {/* Stepper */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-[#E9DFCF] rounded bg-[#FFFDF8]">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                className="p-1 hover:bg-[#E9DFCF]/50 text-[#352A22]"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold font-mono text-[#352A22] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity + 1)
                                }
                                aria-label="Increase quantity"
                                className="p-1 hover:bg-[#E9DFCF]/50 text-[#352A22]"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="text-xs text-rose-700/80 hover:text-rose-900 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal Box */}
                <div className="pt-4 border-t border-[#E9DFCF] space-y-2 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-[#352A22]/80">{t.cart.subtotal}:</span>
                    <span className="text-xl font-bold font-mono text-[#352A22] tabular-nums">
                      {formatETB(subtotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#352A22]/60 italic">
                    {t.cart.deliveryNote}
                  </p>
                </div>

                {/* WhatsApp Order Form Toggle / Details */}
                <div className="mt-4 pt-4 border-t border-[#E9DFCF]">
                  {!showOrderForm ? (
                    <button
                      onClick={() => setShowOrderForm(true)}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-[#C5A36A] group-hover:text-white" />
                      <span>{t.cart.proceedTitle}</span>
                    </button>
                  ) : (
                    <form onSubmit={handleWhatsAppCheckout} className="space-y-3 bg-[#F8F4EB] p-4 rounded-lg border border-[#E9DFCF]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#352A22] flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#C5A36A]" />
                        <span>{t.cart.proceedTitle}</span>
                      </h4>

                      {formError && (
                        <p className="text-[11px] text-rose-700 font-medium">
                          {formError}
                        </p>
                      )}

                      <div>
                        <label className="block text-[11px] font-semibold text-[#352A22] mb-1">
                          {t.cart.customerName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={t.cart.customerNamePlaceholder}
                          className="w-full px-3 py-1.5 bg-[#FFFDF8] border border-[#E9DFCF] rounded text-xs text-[#352A22] focus:outline-none focus:border-[#C5A36A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#352A22] mb-1">
                          {t.cart.deliveryLocation} *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryLocation}
                          onChange={(e) => setDeliveryLocation(e.target.value)}
                          placeholder={t.cart.locationPlaceholder}
                          className="w-full px-3 py-1.5 bg-[#FFFDF8] border border-[#E9DFCF] rounded text-xs text-[#352A22] focus:outline-none focus:border-[#C5A36A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#352A22] mb-1">
                          {t.cart.chooseNumber}
                        </label>
                        <div className="space-y-1.5 text-xs">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="whatsappNumber"
                              checked={selectedNumber === '+251912351222'}
                              onChange={() => onSelectNumber('+251912351222')}
                              className="accent-[#352A22]"
                            />
                            <span>{t.cart.number1}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="whatsappNumber"
                              checked={selectedNumber === '+251922876830'}
                              onChange={() => onSelectNumber('+251922876830')}
                              className="accent-[#352A22]"
                            />
                            <span>{t.cart.number2}</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                          placeholder={t.cart.notesPlaceholder}
                          className="w-full px-3 py-1.5 bg-[#FFFDF8] border border-[#E9DFCF] rounded text-xs text-[#352A22] focus:outline-none focus:border-[#C5A36A]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-md"
                      >
                        <MessageSquare className="w-4 h-4 text-[#C5A36A]" />
                        <span>{t.cart.completeOrder}</span>
                      </button>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Action */}
          {items.length > 0 && (
            <div className="p-4 border-t border-[#E9DFCF] bg-[#F8F4EB] flex items-center justify-between text-xs">
              <button
                onClick={onClearCart}
                type="button"
                className="text-[#352A22]/70 hover:text-rose-800 transition-colors"
              >
                {t.cart.clearCart}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="font-semibold text-[#352A22] hover:text-[#C5A36A] transition-colors"
              >
                {t.cart.continueShopping}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
