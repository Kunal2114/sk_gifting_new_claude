import Image from 'next/image';
import Link from 'next/link';
import { site, nav, waLink } from '@/config/site';
import { products } from '@/data/products';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Image src="/images/logo-full.png" alt={`${site.name} - ${site.tagline}`} width={628} height={332} className="h-28 w-auto -ml-2" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">Branded corporate gifts, made simple. From a single idea to a delivered order, we take care of the details.</p>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">Products</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {products.map((p) => (
              <li key={p.slug}><Link href={`/products/${p.slug}`} className="hover:text-gold-300">{p.name.replace('Customized ', '')}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (<li key={n.href}><Link href={n.href} className="hover:text-gold-300">{n.label}</Link></li>))}
            <li><Link href="/privacy" className="hover:text-gold-300">Privacy policy</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">Get in touch</h2>
          <address className="mt-4 space-y-2.5 text-sm not-italic">
            <p>{site.address.map((l) => (<span key={l} className="block">{l}</span>))}</p>
            <p><a href={`tel:${site.phoneTel}`} className="hover:text-gold-300">{site.phoneDisplay}</a></p>
            <p><a href={`mailto:${site.email}`} className="hover:text-gold-300">{site.email}</a></p>
            <p><a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-gold-300 hover:underline">Chat on WhatsApp →</a></p>
            <p className="text-white/50">{site.hours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>GSTIN: {site.gstin}</p>
        </div>
      </div>
    </footer>
  );
}
