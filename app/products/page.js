import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Corporate Gifts: Backpacks, Trolleys, Polos, Flasks & Mugs',
  description: 'Browse custom-branded corporate gifts: laptop backpacks, hard-shell trolley bags, polo T-shirts, flasks and coffee mugs. Request a bulk quote.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/60"><Link href="/" className="hover:text-gold-700">Home</Link> <span aria-hidden="true">/</span> Products</nav>
        <div className="mt-6 max-w-2xl">
          <p className="eyebrow">Our gifting range</p>
          <h1 className="section-title mt-3 !text-[2.6rem] sm:!text-6xl">Corporate gifts, branded your way.</h1>
          <p className="mt-4 text-lg text-ink/70">Choose a product to see customisation options, then add it to your enquiry to get a quote for your quantity.</p>
        </div>
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (<ProductCard key={p.slug} product={p} priority={i < 3} />))}
        </div>
      </div>
    </div>
  );
}
