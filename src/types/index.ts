export type FragranceCategory = 'all' | 'designer' | 'niche' | 'arabic' | 'luxury';

export type Language = 'en' | 'am';

export interface FragranceProduct {
  id: string;
  name: string;
  nameAm?: string;
  brand: string;
  category: 'designer' | 'niche' | 'arabic' | 'luxury';
  bottleSize: string;
  priceETB: number;
  image: string;
  fallbackImage?: string;
  description: string;
  descriptionAm?: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  isFeatured?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  product: FragranceProduct;
  quantity: number;
}

export type WhatsAppNumberOption = '+251912351222' | '+251922876830';
