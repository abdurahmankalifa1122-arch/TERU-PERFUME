import React, { useState, useMemo } from 'react';
import { FragranceCategory, FragranceProduct, Language, WhatsAppNumberOption } from '../types';
import { translations } from '../data/translations';
import { formatETB, generateWhatsAppSingleProductUrl } from '../utils/cart';
import { ProductDetailModal } from './ProductDetailModal';
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  MessageSquare,
  Eye,
  Check,
  Plus,
  Trash2,
  Edit2,
  X,
} from 'lucide-react';
import { IMAGES, resolveFragranceImage } from '../assets/images';

interface FeaturedProductsProps {
  products: FragranceProduct[];
  onUpdateProducts: (products: FragranceProduct[]) => void;
  lang: Language;
  selectedCategory: FragranceCategory;
  onSelectCategory: (category: FragranceCategory) => void;
  onAddToCart: (product: FragranceProduct) => void;
  selectedNumber: WhatsAppNumberOption;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onUpdateProducts,
  lang,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  selectedNumber,
  searchQuery,
  onSearchChange,
}) => {
  const t = translations[lang];
  const [selectedProduct, setSelectedProduct] = useState<FragranceProduct | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'name'>('featured');
  
  // Business owner modal state
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<FragranceProduct> | null>(null);

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery =
        p.name.toLowerCase().includes(q) ||
        (p.nameAm && p.nameAm.includes(q)) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.topNotes.some((n) => n.toLowerCase().includes(q)) ||
        p.heartNotes.some((n) => n.toLowerCase().includes(q)) ||
        p.baseNotes.some((n) => n.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.priceETB - b.priceETB);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.priceETB - a.priceETB);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: FragranceProduct) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);
  };

  const handleQuickWhatsApp = (product: FragranceProduct) => {
    const url = generateWhatsAppSingleProductUrl({
      product,
      selectedNumber,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.priceETB) return;

    if (editingProduct.id) {
      // update existing
      onUpdateProducts(
        products.map((p) => (p.id === editingProduct.id ? ({ ...p, ...editingProduct } as FragranceProduct) : p))
      );
    } else {
      // create new
      const newProduct: FragranceProduct = {
        id: `custom-${Date.now()}`,
        name: editingProduct.name,
        brand: editingProduct.brand || 'Boutique Collection',
        category: editingProduct.category || 'luxury',
        bottleSize: editingProduct.bottleSize || '100ml',
        priceETB: Number(editingProduct.priceETB),
        image: editingProduct.image || IMAGES.heroLuxuryPerfume,
        description: editingProduct.description || 'Exclusive luxury perfume available at TERU PERFUME.',
        topNotes: editingProduct.topNotes || ['Bergamot', 'Citrus'],
        heartNotes: editingProduct.heartNotes || ['Floral Notes', 'Cedar'],
        baseNotes: editingProduct.baseNotes || ['Amber', 'Musk'],
        inStock: true,
      };
      onUpdateProducts([newProduct, ...products]);
    }

    setIsOwnerModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this perfume from the catalog?')) {
      onUpdateProducts(products.filter((p) => p.id !== id));
    }
  };

  const categoryFilters: { id: FragranceCategory; label: string }[] = [
    { id: 'all', label: t.featured.filterAll },
    { id: 'designer', label: t.featured.filterDesigner },
    { id: 'niche', label: t.featured.filterNiche },
    { id: 'arabic', label: t.featured.filterArabic },
    { id: 'luxury', label: t.featured.filterLuxury },
  ];

  return (
    <section id="shop" className="py-16 sm:py-24 bg-[#F8F4EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A36A] font-semibold mb-2">
              Addis Ababa Exclusive Boutique
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#352A22] tracking-tight">
              {t.featured.heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#352A22]/70 font-light max-w-xl">
              {t.featured.subheading}
            </p>
          </div>

          {/* Business Owner Quick Tool Toggle */}
          <button
            onClick={() => {
              setEditingProduct({
                name: '',
                brand: '',
                category: 'designer',
                bottleSize: '100ml',
                priceETB: 12000,
                image: IMAGES.collectionDesigner,
                description: '',
                topNotes: [],
                heartNotes: [],
                baseNotes: [],
              });
              setIsOwnerModalOpen(true);
            }}
            type="button"
            className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-[#352A22] bg-[#E9DFCF]/60 hover:bg-[#E9DFCF] border border-[#C5A36A]/50 rounded transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A36A]" />
            <span>Add / Manage Products</span>
          </button>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E9DFCF]">
          
          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categoryFilters.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  type="button"
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#352A22] text-[#FFFDF8] shadow-xs'
                      : 'bg-[#FFFDF8] text-[#352A22]/80 hover:text-[#352A22] border border-[#E9DFCF]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#352A22]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.featured.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 bg-[#FFFDF8] border border-[#E9DFCF] rounded text-xs text-[#352A22] placeholder:text-[#352A22]/40 focus:outline-none focus:border-[#C5A36A]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#352A22]/50 hover:text-[#352A22]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 bg-[#FFFDF8] border border-[#E9DFCF] rounded px-2.5 py-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A36A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-transparent text-xs text-[#352A22] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">{t.featured.sortFeatured}</option>
                <option value="priceAsc">{t.featured.sortPriceAsc}</option>
                <option value="priceDesc">{t.featured.sortPriceDesc}</option>
                <option value="name">{t.featured.sortName}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#FFFDF8] border border-[#E9DFCF] rounded-xl p-8 max-w-lg mx-auto">
            <p className="text-base font-serif text-[#352A22] mb-3">
              {t.featured.noProductsFound}
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
              }}
              className="text-xs uppercase tracking-wider font-semibold text-[#C5A36A] hover:underline"
            >
              {t.featured.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => {
              const name = lang === 'am' && product.nameAm ? product.nameAm : product.name;
              const isAdded = recentlyAddedId === product.id;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between bg-[#FFFDF8] border border-[#E9DFCF] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
                >
                  {/* Top Image Frame */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#F8F4EB]">
                    <img
                      src={resolveFragranceImage(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Category Label */}
                    <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-semibold text-[#352A22] bg-[#FFFDF8]/90 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-[#E9DFCF]">
                      {product.category}
                    </span>

                    {/* Stock Status */}
                    <span className="absolute top-3 right-3 text-[10px] tracking-wider uppercase font-semibold text-[#352A22]/70 bg-[#F8F4EB]/90 px-2 py-0.5 rounded-xs">
                      {product.bottleSize}
                    </span>

                    {/* Overlay Action Button on Hover */}
                    <div className="absolute inset-0 bg-[#352A22]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        type="button"
                        aria-label={`View details for ${product.name}`}
                        className="p-2.5 bg-[#FFFDF8] text-[#352A22] hover:bg-[#C5A36A] hover:text-white rounded-full shadow-md transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Metadata & Info */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Quiet Brand & Size Metadata (Zero-pill) */}
                      <div className="flex items-center gap-1.5 text-xs text-[#C5A36A] font-semibold uppercase tracking-wider mb-1">
                        <span>{product.brand}</span>
                        <span>·</span>
                        <span className="text-[#352A22]/60 lowercase">{product.bottleSize}</span>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-lg font-serif font-bold text-[#352A22] group-hover:text-[#C5A36A] transition-colors cursor-pointer leading-snug line-clamp-1 mb-2"
                      >
                        {name}
                      </h3>

                      {/* Olfactory Notes Preview (Unboxed Text) */}
                      <p className="text-[11px] text-[#352A22]/60 line-clamp-1 mb-3">
                        {product.topNotes.slice(0, 2).join(', ')} · {product.baseNotes[0]}
                      </p>
                    </div>

                    <div>
                      {/* Price in Ethiopian Birr with Tabular Numerals */}
                      <div className="pt-3 border-t border-[#E9DFCF]/80 flex items-center justify-between mb-4">
                        <span className="text-base font-bold font-mono tabular-nums text-[#352A22]">
                          {formatETB(product.priceETB)}
                        </span>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          type="button"
                          className="text-xs text-[#352A22]/70 hover:text-[#C5A36A] font-medium underline underline-offset-2"
                        >
                          {t.featured.viewDetails}
                        </button>
                      </div>

                      {/* Card Action Buttons: Add to Bag & WhatsApp Quick Order */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          type="button"
                          aria-label={`Add ${product.name} to Bag`}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-[11px] uppercase tracking-wider font-semibold rounded transition-colors ${
                            isAdded
                              ? 'bg-emerald-800 text-white'
                              : 'bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.featured.addedToBag}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>{t.featured.addToBag}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleQuickWhatsApp(product)}
                          type="button"
                          aria-label={`Order ${product.name} on WhatsApp`}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-2 text-[11px] uppercase tracking-wider font-semibold border border-[#C5A36A] text-[#352A22] hover:bg-[#C5A36A] hover:text-white bg-[#FFFDF8] rounded transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#C5A36A] group-hover:text-white" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        lang={lang}
        onAddToCart={handleAddToCart}
        selectedNumber={selectedNumber}
      />

      {/* Business Owner Product Manager Drawer / Modal */}
      {isOwnerModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative w-full max-w-xl bg-[#FFFDF8] border border-[#E9DFCF] rounded-xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DFCF] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#352A22]">
                {editingProduct?.id ? 'Edit Fragrance' : 'Add New Fragrance to Catalog'}
              </h3>
              <button
                onClick={() => {
                  setIsOwnerModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 text-[#352A22]/70 hover:text-[#352A22] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#352A22] mb-1">
                  Perfume Name (Required)
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct?.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Creed Aventus or Lattafa Khamrah"
                  className="w-full px-3 py-2 bg-[#F8F4EB] border border-[#E9DFCF] rounded text-xs text-[#352A22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#352A22] mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={editingProduct?.brand || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    placeholder="e.g. Dior, Tom Ford, Lattafa"
                    className="w-full px-3 py-2 bg-[#F8F4EB] border border-[#E9DFCF] rounded text-xs text-[#352A22]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#352A22] mb-1">Category</label>
                  <select
                    value={editingProduct?.category || 'designer'}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#F8F4EB] border border-[#E9DFCF] rounded text-xs text-[#352A22]"
                  >
                    <option value="designer">Designer Perfumes</option>
                    <option value="niche">Niche Perfumes</option>
                    <option value="arabic">Arabic Perfumes</option>
                    <option value="luxury">Luxury Fragrances</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#352A22] mb-1">Bottle Size</label>
                  <input
                    type="text"
                    value={editingProduct?.bottleSize || '100ml'}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, bottleSize: e.target.value })
                    }
                    placeholder="e.g. 50ml, 100ml"
                    className="w-full px-3 py-2 bg-[#F8F4EB] border border-[#E9DFCF] rounded text-xs text-[#352A22]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#352A22] mb-1">
                    Price in ETB (Required)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingProduct?.priceETB || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        priceETB: Number(e.target.value),
                      })
                    }
                    placeholder="e.g. 18500"
                    className="w-full px-3 py-2 bg-[#F8F4EB] border border-[#E9DFCF] rounded text-xs text-[#352A22]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#352A22] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct?.description || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  placeholder="Fragrance profile and scent notes..."
                  className="w-full px-3 py-2 bg-[#F8F4EB] border border-[#E9DFCF] rounded text-xs text-[#352A22]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E9DFCF]">
                {editingProduct?.id && (
                  <button
                    type="button"
                    onClick={() => {
                      if (editingProduct.id) handleDeleteProduct(editingProduct.id);
                      setIsOwnerModalOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 text-rose-700 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setIsOwnerModalOpen(false)}
                    className="px-4 py-2 border border-[#E9DFCF] text-[#352A22] rounded hover:bg-[#E9DFCF]/40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#352A22] text-[#FFFDF8] hover:bg-[#C5A36A] rounded font-semibold tracking-wider uppercase"
                  >
                    Save Fragrance
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
