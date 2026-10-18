'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { products } from '@/data/products';
import { waLink } from '@/config/site';
import { useEnquiry } from './EnquiryProvider';

const occasionsList = ['Employee onboarding', 'Festive gifting', 'Client appreciation', 'Events & conferences', 'Awards & milestones', 'Other'];

export default function EnquiryForm() {
  const { items, ready, setQty, remove, clear, add } = useEnquiry();
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', occasion: '', deadline: '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  // Allow links like /enquiry?occasion=Festive%20gifting to preselect the occasion.
  useEffect(() => {
    const o = new URLSearchParams(window.location.search).get('occasion');
    if (o) setForm((f) => ({ ...f, occasion: o }));
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const lines = items.map((i) => ({ ...i, product: products.find((p) => p.slug === i.slug) })).filter((l) => l.product);
  const unused = products.filter((p) => !items.some((i) => i.slug === p.slug));

  async function submit(e) {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: lines.map((l) => ({ slug: l.slug, qty: l.qty })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again or message us on WhatsApp.');
      clear();
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-card">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/15 text-gold-700">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </span>
        <h2 className="mt-5 text-4xl">Thank you, we have your enquiry.</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">Our team will review it and get back to you with a quote. To speed things up, send your logo (vector or high-resolution PNG) on WhatsApp or email.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a className="btn-gold" href={waLink('Hi, I just submitted an enquiry on your website and would like to share my logo.')} target="_blank" rel="noopener noreferrer">Send logo on WhatsApp</a>
          <Link href="/products" className="btn-outline">Keep browsing</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-12" noValidate={false}>
      {/* Basket */}
      <div className="lg:col-span-5">
        <h2 className="text-3xl">Your enquiry</h2>
        <div className="mt-5 space-y-3">
          {!ready ? null : lines.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-navy-900/20 bg-white p-6 text-sm text-ink/70">Nothing added yet. Add products below, or just describe what you need in the message box.</p>
          ) : (
            lines.map((l) => (
              <div key={l.slug} className="flex items-center gap-4 rounded-2xl bg-white p-3 pr-4 shadow-card">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-sand"><Image src={l.product.image} alt="" fill sizes="64px" className="object-cover" /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900">{l.product.name}</p>
                  <label className="mt-1 flex items-center gap-2 text-xs text-ink/60">Qty
                    <input type="number" min="1" inputMode="numeric" value={l.qty} onChange={(e) => setQty(l.slug, e.target.value)} className="field !w-24 !py-1.5" aria-label={`Quantity for ${l.product.name}`} />
                  </label>
                </div>
                <button type="button" onClick={() => remove(l.slug)} className="text-xs font-semibold text-ink/50 hover:text-red-700" aria-label={`Remove ${l.product.name}`}>Remove</button>
              </div>
            ))
          )}
        </div>
        {ready && unused.length > 0 && (
          <div className="mt-5">
            <p className="label">Add more</p>
            <div className="flex flex-wrap gap-2">
              {unused.map((p) => (
                <button key={p.slug} type="button" onClick={() => add(p.slug, 50)} className="rounded-full border border-navy-900/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-900 transition hover:border-gold-500 hover:bg-gold-500/10">+ {p.name.replace('Customized ', '')}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8 lg:col-span-7">
        <h2 className="text-3xl">Your details</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div><label className="label" htmlFor="name">Name *</label><input id="name" required minLength={2} autoComplete="name" className="field" value={form.name} onChange={set('name')} /></div>
          <div><label className="label" htmlFor="company">Company</label><input id="company" autoComplete="organization" className="field" value={form.company} onChange={set('company')} /></div>
          <div><label className="label" htmlFor="phone">Phone / WhatsApp *</label><input id="phone" type="tel" required autoComplete="tel" className="field" value={form.phone} onChange={set('phone')} /></div>
          <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" className="field" value={form.email} onChange={set('email')} /></div>
          <div>
            <label className="label" htmlFor="occasion">Occasion</label>
            <select id="occasion" className="field" value={form.occasion} onChange={set('occasion')}>
              <option value="">Select (optional)</option>
              {occasionsList.map((o) => (<option key={o}>{o}</option>))}
              {form.occasion && !occasionsList.includes(form.occasion) && <option>{form.occasion}</option>}
            </select>
          </div>
          <div><label className="label" htmlFor="deadline">Needed by</label><input id="deadline" type="date" className="field" value={form.deadline} onChange={set('deadline')} /></div>
          <div className="sm:col-span-2"><label className="label" htmlFor="message">Tell us more</label><textarea id="message" rows={4} className="field" placeholder="Budget per gift, delivery locations, branding ideas…" value={form.message} onChange={set('message')} /></div>
          {/* Honeypot: real visitors never see or fill this */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label></div>
        </div>

        {status === 'error' && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error} <a className="font-semibold underline" href={waLink('Hi, I tried to send an enquiry on your website but it did not go through.')} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>
        )}
        <button type="submit" disabled={status === 'sending'} className="btn-gold mt-7 w-full sm:w-auto">{status === 'sending' ? 'Sending…' : 'Request quote'}</button>
        <p className="mt-4 text-xs text-ink/55">We only use your details to respond to this enquiry. See our <Link href="/privacy" className="underline">privacy policy</Link>.</p>
      </div>
    </form>
  );
}
