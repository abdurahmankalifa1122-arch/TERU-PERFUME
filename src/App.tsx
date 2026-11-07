import React, { useState, useEffect } from 'react';
import { initialProducts } from './data/products';
import {
  CartItem,
  FragranceCategory,
  FragranceProduct,
  Language,
  WhatsAppNumberOption,
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BrandExperience } from './components/BrandExperience';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { DeliverySection } from './components/DeliverySection';
import { StoreLocationContact } from './components/StoreLocationContact';
import { TelegramSocial } from './components/TelegramSocial';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { calculateTotalItemCount } from './utils/cart';

export default function App() {
  // Application State
  const [lang, setLang] = useState<Language>('en');
  const [products, setProducts] = useState<FragranceProduct[]>(() => {
    try {
      const saved = localStorage.getItem('teru_perfume_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return initialProducts;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('teru_perfume_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FragranceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNumber, setSelectedNumber] = useState<WhatsAppNumberOption>('+251912351222');

  // Persist products if modified by business owner
  useEffect(() => {
    try {
      localStorage.setItem('teru_perfume_products', JSON.stringify(products));
    } catch (e) {
      // ignore
    }
  }, [products]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('teru_perfume_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'am' : 'en'));
  };

  const handleAddToCart = (product: FragranceProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenSearch = () => {
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
    const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  const totalCartCount = calculateTotalItemCount(cartItems);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EB] text-[#352A22] selection:bg-[#C5A36A]/20">
      {/* Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero lang={lang} />

        {/* 2. Shop By Collection */}
        <Collections
          lang={lang}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 3. Featured Products Grid & Search */}
        <FeaturedProducts
          products={products}
          onUpdateProducts={setProducts}
          lang={lang}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          selectedNumber={selectedNumber}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 4. Editorial Brand Experience */}
        <BrandExperience lang={lang} />

        {/* 5. Why Choose TERU PERFUME */}
        <WhyChooseUs lang={lang} />

        {/* 6. About TERU PERFUME */}
        <AboutSection lang={lang} />

        {/* 7. Nationwide Delivery */}
        <DeliverySection
          lang={lang}
          selectedNumber={selectedNumber}
        />

        {/* 8. Store Location & Contact */}
        <StoreLocationContact
          lang={lang}
          selectedNumber={selectedNumber}
          onSelectNumber={setSelectedNumber}
        />

        {/* 9. Telegram & Social Media Community */}
        <TelegramSocial lang={lang} />
      </main>

      {/* 10. Footer */}
      <Footer lang={lang} />

      {/* Sliding Cart & WhatsApp Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
        selectedNumber={selectedNumber}
        onSelectNumber={setSelectedNumber}
      />
    </div>
  );
}
