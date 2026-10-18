import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site, waLink } from '@/config/site';
import { products, getProduct } from '@/data/products';
import AddToEnquiry from '@/components/AddToEnquiry';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.short} ${p.description}`.slice(0, 158),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | ${site.name}`, description: p.short, images: [{ url: p.image, width: 1000, height: 1250, alt: p.alt }] },
  };
}

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);

export default function ProductPage({ params }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.name, description: p.description, image: `${site.url}${p.image}`,
    brand: { '@type': 'Brand', name: site.name }, url: `${site.url}/products/${p.slug}`,
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
          <Link href="/" className="hover:text-gold-700">Home</Link> <span aria-hidden="true">/</span> <Link href="/products" className="hover:text-gold-700">Products</Link> <span aria-hidden="true">/</span> <span className="text-ink">{p.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand shadow-lift lg:sticky lg:top-28">
              <Image src={p.image} alt={p.alt} fill priority sizes="(min-width:1024px) 40vw, 92vw" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow">Custom-branded</p>
            <h1 className="mt-3 text-[2.5rem] leading-[1.02] sm:text-6xl">{p.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">{p.description}</p>

            <div className="mt-8"><AddToEnquiry slug={p.slug} name={p.name} /></div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">Highlights</h2>
                <ul className="mt-4 space-y-3 text-[0.95rem] text-ink/80">
                  {p.features.map((f) => (<li key={f} className="flex gap-3"><Check />{f}</li>))}
                </ul>
              </div>
              <div>
                <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">Branding options</h2>
                <ul className="mt-4 space-y-3 text-[0.95rem] text-ink/80">
                  {p.customization.map((f) => (<li key={f} className="flex gap-3"><Check />{f}</li>))}
                </ul>
                <h2 className="mt-8 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">Great for</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.bestFor.map((b) => (<span key={b} className="rounded-full bg-gold-500/15 px-3.5 py-1.5 text-xs font-semibold text-gold-700">{b}</span>))}
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl bg-navy-900 p-6 text-white">
              <p className="font-serif text-2xl font-bold text-gold-300">Questions about this product?</p>
              <p className="mt-1 text-sm text-white/70">Ask about colours, sizes, branding methods or samples.</p>
              <a className="btn-gold mt-4" href={waLink(`Hi, I am interested in: ${p.name}. Could you share details and a quote?`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
            </div>
          </div>
        </div>

        <section className="mt-24" aria-labelledby="related">
          <h2 id="related" className="text-4xl">You might also like</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (<ProductCard key={r.slug} product={r} />))}
          </div>
        </section>
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
