import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartSubtotal,
  calculateTotalItemCount,
  formatETB,
  buildWhatsAppOrderMessage,
  generateWhatsAppOrderUrl,
} from './cart';
import { CartItem } from '../types';

const sampleItems: CartItem[] = [
  {
    product: {
      id: 'rouge-540',
      name: 'Baccarat Rouge 540 Extrait',
      brand: 'Maison Francis Kurkdjian',
      category: 'luxury',
      bottleSize: '70ml',
      priceETB: 28500,
      image: '/src/assets/images/perfume_rouge_crystal_1794041988691.jpg',
      description: 'Amber floral fragrance.',
      topNotes: ['Bitter Almond', 'Saffron'],
      heartNotes: ['Egyptian Jasmine', 'Cedar'],
      baseNotes: ['Ambergris', 'Woody Notes', 'Musk'],
    },
    quantity: 2,
  },
  {
    product: {
      id: 'khamrah',
      name: 'Khamrah',
      brand: 'Lattafa Perfumes',
      category: 'arabic',
      bottleSize: '100ml',
      priceETB: 7800,
      image: '/src/assets/images/perfume_arabic_khamrah_1794041989513.jpg',
      description: 'Warm oriental spicy fragrance.',
      topNotes: ['Cinnamon', 'Nutmeg', 'Bergamot'],
      heartNotes: ['Dates', 'Praline', 'Tuberose'],
      baseNotes: ['Vanilla', 'Tonka Bean', 'Amberwood'],
    },
    quantity: 1,
  },
];

test('calculateCartSubtotal calculates accurate total in ETB', () => {
  const expected = 28500 * 2 + 7800 * 1; // 57,000 + 7,800 = 64,800
  assert.equal(calculateCartSubtotal(sampleItems), expected);
});

test('calculateTotalItemCount sums quantities', () => {
  assert.equal(calculateTotalItemCount(sampleItems), 3);
});

test('formatETB formats currency with comma separation', () => {
  assert.equal(formatETB(64800), '64,800 ETB');
  assert.equal(formatETB(0), '0 ETB');
});

test('buildWhatsAppOrderMessage includes customer info, products, and total', () => {
  const msg = buildWhatsAppOrderMessage({
    items: sampleItems,
    customerName: 'Abebe Kebede',
    location: 'Bole, Addis Ababa',
    note: 'Please deliver after 2 PM',
    selectedNumber: '+251912351222',
  });

  assert.ok(msg.includes('TERU PERFUME — NEW ORDER REQUEST'));
  assert.ok(msg.includes('Abebe Kebede'));
  assert.ok(msg.includes('Bole, Addis Ababa'));
  assert.ok(msg.includes('Baccarat Rouge 540 Extrait'));
  assert.ok(msg.includes('Khamrah'));
  assert.ok(msg.includes('64,800 ETB'));
  assert.ok(msg.includes('Please deliver after 2 PM'));
});

test('generateWhatsAppOrderUrl builds valid wa.me link with chosen number', () => {
  const url1 = generateWhatsAppOrderUrl({
    items: sampleItems,
    customerName: 'Abebe',
    location: 'Addis Ababa',
    selectedNumber: '+251912351222',
  });

  const url2 = generateWhatsAppOrderUrl({
    items: sampleItems,
    customerName: 'Abebe',
    location: 'Addis Ababa',
    selectedNumber: '+251922876830',
  });

  assert.ok(url1.startsWith('https://wa.me/251912351222?text='));
  assert.ok(url2.startsWith('https://wa.me/251922876830?text='));
});
