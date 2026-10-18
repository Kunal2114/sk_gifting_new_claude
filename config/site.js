// Single place for business details used across the site. Edit here, not in components.
export const site = {
  name: 'SK Corporate Gifting',
  tagline: 'Gifts for every journey',
  url: 'https://skgiftsco.in',
  description:
    'Custom-branded corporate gifts in bulk: laptop backpacks, trolley bags, polo T-shirts, flasks and coffee mugs, with your logo. Based in Bengaluru.',
  email: 'info@skgiftsco.in',
  phoneDisplay: '+91 85838 03203',
  phoneTel: '+918583803203',
  whatsapp: '918583803203', // country code + number, no "+"
  address: ['Om Chambers, 648/A, 4th Floor', 'Binnamangala 1st Stage, Indiranagar', 'Bengaluru, Karnataka 560038'],
  gstin: '29AEOPK3990D1Z4',
  hours: 'Mon–Sat, 10:00 am – 6:30 pm',
};

export const waLink = (text = 'Hi SK Corporate Gifting, I would like to discuss a corporate gifting order.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: '/products', label: 'Products' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#occasions', label: 'Occasions' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

// Client logos / testimonials: leave empty until you have permission to show them.
// The sections stay hidden while these arrays are empty.
export const clients = []; // e.g. [{ name: 'Acme Ltd', logo: '/images/clients/acme.png' }]
export const testimonials = []; // e.g. [{ quote: '…', name: 'Priya S.', role: 'HR Manager, Acme Ltd' }]
