import { CartItem, FragranceProduct, WhatsAppNumberOption } from '../types';

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.priceETB * item.quantity, 0);
}

export function calculateTotalItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function formatETB(amount: number): string {
  return `${amount.toLocaleString('en-US')} ETB`;
}

export interface WhatsAppOrderParams {
  items: CartItem[];
  customerName: string;
  location: string;
  note?: string;
  selectedNumber: WhatsAppNumberOption;
}

export function buildWhatsAppOrderMessage(params: WhatsAppOrderParams): string {
  const { items, customerName, location, note } = params;
  const subtotal = calculateCartSubtotal(items);

  let message = `*TERU PERFUME — NEW ORDER REQUEST*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Customer:* ${customerName.trim() || 'Valued Customer'}\n`;
  message += `*Delivery Location:* ${location.trim() || 'Addis Ababa'}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Ordered Fragrances:*\n`;

  items.forEach((item, index) => {
    const itemTotal = item.product.priceETB * item.quantity;
    message += `${index + 1}. *${item.product.name}* (${item.product.brand})\n`;
    message += `   Size: ${item.product.bottleSize} | Qty: ${item.quantity}\n`;
    message += `   Price: ${formatETB(item.product.priceETB)} each (Subtotal: ${formatETB(itemTotal)})\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*TOTAL AMOUNT:* ${formatETB(subtotal)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;

  if (note && note.trim()) {
    message += `*Customer Note:* ${note.trim()}\n`;
  }

  message += `\nHello TERU PERFUME team, I would like to place this fragrance order. Please confirm availability and delivery arrangements. Thank you!`;

  return message;
}

export function generateWhatsAppOrderUrl(params: WhatsAppOrderParams): string {
  const cleanPhone = params.selectedNumber.replace(/[^0-9]/g, '');
  const message = buildWhatsAppOrderMessage(params);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppSingleProductUrl(params: {
  product: FragranceProduct;
  selectedNumber: WhatsAppNumberOption;
}): string {
  const cleanPhone = params.selectedNumber.replace(/[^0-9]/g, '');
  const message = `Hello TERU PERFUME! I am interested in ordering:\n\n*${params.product.name}* by *${params.product.brand}*\nBottle Size: ${params.product.bottleSize}\nPrice: ${formatETB(params.product.priceETB)}\n\nPlease let me know if this fragrance is currently available at your Bole store or for delivery. Thank you!`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateDeliveryInquiryWhatsAppUrl(selectedNumber: WhatsAppNumberOption): string {
  const cleanPhone = selectedNumber.replace(/[^0-9]/g, '');
  const message = `Hello TERU PERFUME! I would like to inquire about your nationwide delivery service across Ethiopia for fragrances.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
