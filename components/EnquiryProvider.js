'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const Ctx = createContext(null);
const KEY = 'sk-enquiry-v1';

// Holds the "enquiry basket" (products the visitor wants a quote for) and remembers it
// in the browser, so it survives page changes and refreshes.
export function EnquiryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.filter((i) => i && typeof i.slug === 'string'));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = useCallback((slug, qty) => {
    const q = Math.max(1, parseInt(qty, 10) || 1);
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === slug);
      if (i >= 0) { const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + q }; return next; }
      return [...prev, { slug, qty: q }];
    });
  }, []);
  const setQty = useCallback((slug, qty) => {
    const q = Math.max(1, parseInt(qty, 10) || 1);
    setItems((prev) => prev.map((x) => (x.slug === slug ? { ...x, qty: q } : x)));
  }, []);
  const remove = useCallback((slug) => setItems((prev) => prev.filter((x) => x.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, ready, count: items.length, add, setQty, remove, clear }),
    [items, ready, add, setQty, remove, clear]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useEnquiry = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return ctx;
};
