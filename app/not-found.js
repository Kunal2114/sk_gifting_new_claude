import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-x py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-6xl">We could not find that page.</h1>
      <p className="mx-auto mt-4 max-w-md text-ink/70">The link may be outdated. Try our products or head back home.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/" className="btn-gold">Home</Link><Link href="/products" className="btn-outline">Products</Link></div>
    </div>
  );
}
