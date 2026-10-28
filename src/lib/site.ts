// Bookings are sent to this WhatsApp number. Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env
// in international format (e.g. 94771234567). If it is empty, WhatsApp opens with the
// message ready and asks the customer to pick a chat.
export const site = {
  name: 'FixNow',
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
};

export function whatsappLink(text?: string) {
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${site.whatsappNumber}${query}`;
}

export function unsplash(id: string, width: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;
}

export const photos = {
  technician: '1621905252507-b35492cc74b4',
  electrician: '1621905251918-48416bd8575a',
  tap: '1585704032915-c3400ca199e7',
  roller: '1562259949-e8e7689d7828',
  cleaning: '1581578731548-c64695cc6952',
  pipes: '1607472586893-edb57bdc0e39',
  drill: '1504148455328-c376907d081c',
  painters: '1574359411659-15573a27fd0c',
};
