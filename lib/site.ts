export const site = {
  name: 'FJ Cab Services',
  tagline: 'Executive Car Rental & Mobility in Nigeria',
  phone: process.env.NEXT_PUBLIC_PHONE || '07026766769',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '23497026766769',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@fjcabservices.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fjcabservices.com',
  address: 'Lagos, Nigeria',
  socials: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
};

export const categories = [
  'Sedans',
  'SUVs',
  'Buses & Vans',
  'Luxury/Executive',
] as const;

export function naira(n: number) {
  return '₦' + n.toLocaleString('en-NG');
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookMessage(name: string, daily: number) {
  return `Hello FJ Cab Services, I'd like to book the ${name} (${naira(daily)}/day).\n\nPickup date:\nNumber of days:\nPickup location:\nMy name:`;
}
