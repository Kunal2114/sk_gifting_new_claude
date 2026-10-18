import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, priority = false }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image src={product.image} alt={product.alt} fill priority={priority} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="p-6">
        <h3 className="text-[1.65rem] leading-tight">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{product.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 group-hover:gap-2.5 transition-all">View details <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
