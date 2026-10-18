// Product catalogue. Add a product by adding an object here and dropping its image in
// /public/images/products/. Pages, sitemap and enquiry basket update automatically.
// NOTE: please confirm every spec / customisation claim below against your supplier's details.

export const products = [
  {
    slug: 'laptop-backpacks',
    name: 'Customized Laptop Backpacks',
    short: 'Roomy, professional backpacks branded with your logo.',
    image: '/images/products/laptop-backpacks.jpg',
    alt: 'Black laptop backpack with the SK Corporate Gifting logo embroidered on the front panel',
    description:
      'A clean, office-ready backpack that employees will actually use every day. The generous front panel is made for your logo, so the gift keeps working for your brand long after the event.',
    features: [
      '15.6" padded laptop compartment',
      'USB charging port',
      'Water-resistant fabric',
      'Organised internal storage',
      'Lightweight, comfortable straps',
      'Side mesh pockets for bottles',
    ],
    customization: ['Embroidered logo', 'Printed logo', 'Rubber / PU patch'],
    bestFor: ['Employee onboarding', 'Conferences & events', 'Annual rewards'],
  },
  {
    slug: 'hard-shell-trolleys',
    name: 'Hard-Shell Trolley Bags',
    short: 'Premium cabin and check-in trolleys from leading travel brands.',
    image: '/images/products/hard-shell-trolleys.jpg',
    alt: 'Black hard-shell trolley suitcase with spinner wheels and a branded logo plate',
    description:
      'Our most premium gift for top performers, leadership and key clients. Tough hard-shell trolleys with smooth spinner wheels, available from leading travel brands including Samsonite and American Tourister, and as branded alternatives.',
    features: [
      'Impact-resistant ABS shell',
      '360° spinner wheels',
      'TSA-approved lock',
      'Adjustable aluminium handle',
      'Organised interior with cross straps and zipper divider',
      'Lightweight and water resistant',
    ],
    customization: ['Metal or PU logo plate', 'Luggage tag with logo', 'Gift-boxed packaging'],
    bestFor: ['Sales incentives', 'Leadership gifting', 'Client appreciation'],
  },
  {
    slug: 'custom-polo-tshirts',
    name: 'Customized Polo T-Shirts',
    short: 'Performance polos with a left-chest logo and a full back print.',
    image: '/images/products/custom-polo-tshirts.jpg',
    alt: 'Black polo T-shirts with a left-chest logo and a large back print in the SK Corporate Gifting logo',
    description:
      'Team-ready polos that look sharp at events, offsites and on the shop floor. Add your logo on the left chest, a bigger design across the back, or both.',
    features: [
      'Collared polo cut',
      'Left-chest logo placement',
      'Large back-print area',
      'Colour and size range confirmed with your quote',
    ],
    customization: ['Embroidery', 'Screen print / heat transfer', 'Name or department on sleeve'],
    bestFor: ['Team uniforms', 'Events & exhibitions', 'Company anniversaries'],
  },
  {
    slug: 'custom-flasks',
    name: 'Customized Flasks & Bottles',
    short: 'Matte steel flasks with a carry strap, branded with your logo.',
    image: '/images/products/custom-flasks.jpg',
    alt: 'Matte black flask with a carry strap and the SK Corporate Gifting logo on the body',
    description:
      'A sleek flask that people take to the office, gym and on every trip. The smooth matte body gives your logo a bold, premium finish.',
    features: ['Matte black finish', 'Convenient carry strap', 'Screw cap with steel ring', 'Large logo area on the body'],
    customization: ['Laser engraving', 'Printed logo', 'Custom gift box'],
    bestFor: ['Festive gifting', 'Wellness programmes', 'Employee welcome kits'],
  },
  {
    slug: 'custom-coffee-mugs',
    name: 'Customized Coffee Mugs',
    short: 'Glossy ceramic mugs with a big, bold logo print.',
    image: '/images/products/custom-coffee-mugs.jpg',
    alt: 'Glossy black ceramic coffee mug printed with the SK Corporate Gifting logo',
    description:
      'An everyday desk favourite with a large wrap-around print area, perfect for logos, taglines or a custom design. An affordable add-on for any gift hamper.',
    features: ['Glossy black ceramic', 'Comfortable handle', 'Large print area', 'Easy to combine with other gifts'],
    customization: ['Full-colour print', 'Single-colour logo', 'Gift-box packaging'],
    bestFor: ['Gift hampers', 'Desk gifts', 'Customer thank-yous'],
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
