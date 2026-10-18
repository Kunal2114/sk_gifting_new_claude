import Link from 'next/link';
import { site, waLink } from '@/config/site';

export const metadata = {
  title: 'Contact Us',
  description: `Reach ${site.name} in Bengaluru by phone, WhatsApp or email, or visit our office in Indiranagar.`,
  alternates: { canonical: '/contact' },
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.join(', '))}`;

export default function ContactPage() {
  const cards = [
    { t: 'WhatsApp', d: 'Fastest way to share your logo and requirements.', cta: 'Open chat', href: waLink(), ext: true },
    { t: 'Call us', d: site.hours, cta: site.phoneDisplay, href: `tel:${site.phoneTel}` },
    { t: 'Email', d: 'For detailed briefs and attachments.', cta: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <div className="py-14 lg:py-20">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/60"><Link href="/" className="hover:text-gold-700">Home</Link> <span aria-hidden="true">/</span> Contact</nav>
        <div className="mt-6 max-w-2xl">
          <p className="eyebrow">We would love to help</p>
          <h1 className="mt-3 text-[2.6rem] leading-[1.02] sm:text-6xl">Let us talk gifting.</h1>
          <p className="mt-4 text-lg text-ink/70">Reach out however you prefer. Or <Link href="/enquiry" className="font-semibold text-gold-700 underline">send a structured enquiry</Link> and get a written quote.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <a key={c.t} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group rounded-2xl bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <h2 className="text-3xl">{c.t}</h2>
              <p className="mt-2 text-sm text-ink/65">{c.d}</p>
              <p className="mt-5 break-all text-sm font-semibold text-gold-700">{c.cta} →</p>
            </a>
          ))}
        </div>

        <div className="mt-6 grid gap-6 rounded-2xl bg-navy-900 p-8 text-white md:grid-cols-2">
          <div>
            <h2 className="!text-white text-3xl">Visit our office</h2>
            <address className="mt-3 space-y-1 not-italic text-white/75">{site.address.map((l) => (<p key={l}>{l}</p>))}</address>
            <p className="mt-3 text-sm text-white/55">{site.hours} · Please call ahead to schedule a visit.</p>
          </div>
          <div className="flex items-end md:justify-end">
            <a className="btn-gold" href={mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  );
}
