'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useEnquiry } from './EnquiryProvider';

export default function AddToEnquiry({ slug, name }) {
  const { add } = useEnquiry();
  const [qty, setQty] = useState(50);
  const [added, setAdded] = useState(false);

  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-5 shadow-card">
      <label htmlFor="qty" className="label">Approximate quantity</label>
      <div className="flex flex-wrap items-center gap-3">
        <input id="qty" type="number" min="1" inputMode="numeric" value={qty} onChange={(e) => { setQty(e.target.value); setAdded(false); }} className="field !w-28" />
        <button type="button" className="btn-gold flex-1 sm:flex-none" onClick={() => { add(slug, qty); setAdded(true); }}>
          {added ? 'Added ✓' : 'Add to enquiry'}
        </button>
      </div>
      <p className="mt-3 text-xs text-ink/60" aria-live="polite">
        {added ? (<><strong>{name}</strong> is in your enquiry. <Link href="/enquiry" className="font-semibold text-gold-700 underline">Review & request quote →</Link></>) : 'Pricing depends on quantity and branding. You will receive a written quote, no obligation.'}
      </p>
    </div>
  );
}
