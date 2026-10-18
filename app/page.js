import Image from 'next/image';
import Link from 'next/link';
import { site, waLink, clients, testimonials } from '@/config/site';
import { products } from '@/data/products';
import { steps, occasions, reasons, faqs } from '@/data/content';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';

const trust = [
  { t: 'Custom branding', d: 'Your logo on every item', icon: <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7.5 7.5h.01" /> },
  { t: 'Bulk-friendly pricing', d: 'Quotes built around your quantity', icon: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17.5 12 22l9-4.5" /> },
  { t: 'GST invoices', d: 'Clean, compliant paperwork', icon: <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6M9 12h6" /> },
  { t: 'Bengaluru based', d: 'Local team, easy to reach', icon: <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Zm0-8.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /> },
];

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_30%,rgba(74,120,181,.28),transparent),radial-gradient(40%_50%_at_10%_100%,rgba(217,168,0,.12),transparent)]" />
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow !text-gold-400">Corporate gifting · Bengaluru</p>
            <h1 className="mt-5 text-[2.9rem] leading-[1] !text-white sm:text-6xl lg:text-[4.6rem]">
              Branded gifts your people will <span className="text-gold-400">actually keep.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Laptop backpacks, trolley bags, polos, flasks and mugs, customised with your logo and delivered in bulk. One partner for onboarding kits, festive gifting and client thank-yous.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/enquiry" className="btn-gold">Request a quote</Link>
              <Link href="/products" className="btn-outline-light">Browse products</Link>
            </div>
            <p className="mt-6 text-sm text-white/55">Prefer to talk? <a className="font-semibold text-gold-300 hover:underline" href={waLink()} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> or call <a className="font-semibold text-gold-300 hover:underline" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>.</p>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/10">
                <Image src={products[0].image} alt={products[0].alt} fill priority sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/10">
                <Image src={products[1].image} alt={products[1].alt} fill priority sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
              </div>
              <div className="relative -mt-6 aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/10 sm:-mt-10">
                <Image src={products[3].image} alt={products[3].alt} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
              </div>
              <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/10 sm:mt-0">
                <Image src={products[4].image} alt={products[4].alt} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-navy-900/10 bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {trust.map((x) => (
            <div key={x.t} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{x.icon}</svg>
              </span>
              <div><p className="text-sm font-semibold text-navy-900">{x.t}</p><p className="text-xs text-ink/60">{x.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Our gifting range</p>
            <h2 className="section-title mt-3">Gifts that carry your brand, every day.</h2>
            <p className="mt-4 text-lg text-ink/70">Practical, premium products people use daily, so your logo stays in sight long after the event.</p>
          </div>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (<ProductCard key={p.slug} product={p} />))}
            <Link href="/enquiry" className="group flex flex-col justify-between rounded-2xl border-2 border-dashed border-gold-500/50 bg-gold-500/[0.06] p-8 transition hover:border-gold-500 hover:bg-gold-500/10">
              <div>
                <p className="eyebrow">Something else in mind?</p>
                <h3 className="mt-3 text-[1.9rem] leading-tight">Custom gift hampers &amp; more</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">Tell us your budget, quantity and occasion. We will put together options, from single items to full gift sets.</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-all group-hover:gap-3">Tell us what you need <span aria-hidden="true">→</span></span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-navy-900 py-20 text-white lg:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow !text-gold-400">How it works</p>
            <h2 className="section-title mt-3 !text-white">From idea to delivered, in four steps.</h2>
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative border-t border-white/15 pt-6">
                <span className="font-serif text-6xl font-bold leading-none text-gold-500/90">{i + 1}</span>
                <h3 className="mt-4 text-2xl !text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OCCASIONS */}
      <section id="occasions" className="bg-sand py-20 lg:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Occasions</p>
            <h2 className="section-title mt-3">Gifting for every moment that matters.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {occasions.map((o) => (
              <Link key={o.title} href={`/enquiry?occasion=${encodeURIComponent(o.occasion)}`} className="group flex flex-col rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                <h3 className="text-[1.5rem] leading-tight">{o.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{o.text}</p>
                <span className="mt-5 text-sm font-semibold text-gold-700">Plan this →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Why {site.name}</p>
            <h2 className="section-title mt-3">A gifting partner that sweats the details.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">Corporate gifting should be effortless for you and impressive for the person receiving it. We handle sourcing, branding and delivery so you do not have to chase vendors.</p>
            <Link href="/contact" className="btn-navy mt-8">Talk to our team</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border border-navy-900/10 bg-white p-7">
                <span className="block h-1 w-10 rounded-full bg-gold-500" />
                <h3 className="mt-5 text-[1.55rem] leading-tight">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS (hidden until you add some in config/site.js) */}
      {clients.length > 0 && (
        <section className="border-y border-navy-900/10 bg-white py-14">
          <div className="container-x">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Trusted by teams at</p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {clients.map((c) => (<li key={c.name}><Image src={c.logo} alt={c.name} width={140} height={48} className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" /></li>))}
            </ul>
          </div>
        </section>
      )}
      {testimonials.length > 0 && (
        <section className="bg-sand py-20">
          <div className="container-x grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-white p-8 shadow-card">
                <blockquote className="font-serif text-2xl font-semibold leading-snug text-navy-900">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm"><strong>{t.name}</strong><span className="block text-ink/60">{t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="bg-sand py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-3">Questions, answered.</h2>
            <p className="mt-4 text-ink/70">Can not find what you are looking for? <a className="font-semibold text-gold-700 underline" href={waLink('Hi, I have a question about corporate gifting.')} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>.</p>
          </div>
          <div className="divide-y divide-navy-900/10 rounded-2xl bg-white px-6 shadow-card lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700 transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 pr-10 leading-relaxed text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-center text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_90%_at_50%_0%,rgba(217,168,0,.18),transparent)]" />
        <div className="container-x relative">
          <h2 className="mx-auto max-w-3xl text-4xl !text-white sm:text-5xl">Planning a gifting order? Let us make it easy.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">Share what you have in mind and we will come back with a clear written quote.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/enquiry" className="btn-gold">Request a quote</Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      <JsonLd data={faqSchema} />
    </>
  );
}
