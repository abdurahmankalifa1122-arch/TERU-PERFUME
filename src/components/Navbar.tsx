import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShoppingBag, Search, Menu, X, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.shop, href: '#shop' },
    { label: t.nav.collections, href: '#collections' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F4EB]/95 backdrop-blur-md border-b border-[#E9DFCF]/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
          {/* Zone 1: Brand Wordmark & Emblem */}
          <a
            href="#hero"
            aria-label="TERU PERFUME Home"
            className="group flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A36A]"
          >
            <Logo variant="light" />
          </a>

          {/* Zone 2: Desktop Navigation Links (Clean typography, no pills) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9 text-xs uppercase tracking-[0.2em] font-medium text-[#352A22]/80"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#352A22] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A36A] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Search, Language Switcher, Cart, WhatsApp Button) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              type="button"
              aria-label={lang === 'en' ? 'Switch to Amharic' : 'Switch to English'}
              className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-semibold tracking-wider text-[#352A22] hover:text-[#C5A36A] border border-[#E9DFCF] rounded bg-[#FFFDF8] hover:border-[#C5A36A]/50 transition-colors whitespace-nowrap"
            >
              <span className={lang === 'en' ? 'text-[#352A22] font-bold' : 'text-[#352A22]/50'}>EN</span>
              <span className="text-[#C5A36A]/60">|</span>
              <span className={lang === 'am' ? 'text-[#352A22] font-bold' : 'text-[#352A22]/50'}>አማ</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              type="button"
              aria-label="Search fragrances"
              className="p-1.5 sm:p-2 text-[#352A22]/80 hover:text-[#352A22] hover:bg-[#E9DFCF]/40 rounded-full transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              type="button"
              aria-label={`Open shopping bag with ${cartCount} items`}
              className="relative p-1.5 sm:p-2 text-[#352A22]/80 hover:text-[#352A22] hover:bg-[#E9DFCF]/40 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#352A22] text-[#FFFDF8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Quick Order Button (Desktop) */}
            <a
              href="https://wa.me/251912351222"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#352A22] bg-[#E9DFCF]/60 hover:bg-[#C5A36A] hover:text-white border border-[#C5A36A]/40 rounded transition-all duration-200 shadow-2xs whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C5A36A] group-hover:text-white" />
              <span>{t.nav.whatsappOrder}</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-1.5 text-[#352A22] hover:bg-[#E9DFCF]/50 rounded transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Full Width) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E9DFCF] bg-[#FFFDF8] shadow-xl w-full">
          <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-4">
            <nav className="flex flex-col divide-y divide-[#E9DFCF]/50">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold tracking-widest uppercase text-[#352A22] hover:text-[#C5A36A] py-3 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="https://wa.me/251912351222"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#352A22] bg-[#E9DFCF] hover:bg-[#C5A36A] hover:text-white rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A36A]" />
                <span>{t.nav.whatsappOrder} (0912 351 222)</span>
              </a>

              <a
                href="tel:+251912351222"
                className="flex items-center justify-center gap-2 w-full py-2 px-4 text-xs font-medium tracking-wider text-[#352A22]/80 border border-[#E9DFCF] rounded bg-white"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A36A]" />
                <span>Call Store: 0912 351 222</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
