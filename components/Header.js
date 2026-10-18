'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { nav, site, waLink } from '@/config/site';
import { useEnquiry } from './EnquiryProvider';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count, ready } = useEnquiry();
  const badge = ready && count > 0 ? count : null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 backdrop-blur">
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Image src="/images/logo-icon.png" alt="" width={36} height={38} priority className="h-9 w-auto" />
          <span className="leading-none">
            <span className="block font-serif text-[1.35rem] font-bold text-gold-400">SK Corporate Gifting</span>
            <span className="mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/60 sm:block">{site.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-white/80 transition hover:text-gold-300">{n.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light hidden !px-4 !py-2 md:inline-flex">WhatsApp</a>
          <Link href="/enquiry" className="btn-gold !px-5 !py-2.5" onClick={() => setOpen(false)}>
            Get a quote
            {badge && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-navy-900 px-1 text-[0.7rem] font-bold text-gold-300">{badge}</span>}
          </Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 text-white lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-white/10 bg-navy-900 lg:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-white/5 py-3.5 text-base font-medium text-white/90">{n.label}</Link>
            ))}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="py-3.5 text-base font-medium text-gold-300">Chat on WhatsApp</a>
          </div>
        </nav>
      )}
    </header>
  );
}
