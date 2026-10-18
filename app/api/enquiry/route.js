import { NextResponse } from 'next/server';
import { products } from '@/data/products';
import { site } from '@/config/site';

export const runtime = 'nodejs';

// Best-effort rate limit (per serverless instance). Real protection is the honeypot + validation.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });

  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  // Honeypot: bots fill hidden fields. Pretend success so they move on.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 30);
  const occasion = clean(body.occasion, 80);
  const deadline = clean(body.deadline, 20);
  const message = clean(body.message, 2000);

  if (name.length < 2) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (phone.replace(/\D/g, '').length < 8) return NextResponse.json({ error: 'Please enter a valid phone / WhatsApp number.' }, { status: 400 });

  // Resolve product names on the server so clients cannot inject arbitrary text.
  const items = (Array.isArray(body.items) ? body.items : []).slice(0, 20).flatMap((i) => {
    const p = products.find((x) => x.slug === i?.slug);
    const qty = Math.min(1000000, Math.max(1, parseInt(i?.qty, 10) || 1));
    return p ? [{ slug: p.slug, name: p.name, qty }] : [];
  });
  if (items.length === 0 && message.length < 5) {
    return NextResponse.json({ error: 'Please add a product or tell us what you need in the message.' }, { status: 400 });
  }

  const row = { name, company, email, phone, occasion, deadline, message, items };
  const results = [];

  // Option A: Supabase
  const sbUrl = process.env.SUPABASE_URL, sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (sbUrl && sbKey) {
    results.push(
      fetch(`${sbUrl.replace(/\/$/, '')}/rest/v1/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: sbKey, Authorization: `Bearer ${sbKey}`, Prefer: 'return=minimal' },
        body: JSON.stringify(row),
      }).then((r) => r.ok).catch(() => false)
    );
  }

  // Option B: email via Resend (plain text only)
  const rKey = process.env.RESEND_API_KEY, to = process.env.ENQUIRY_TO_EMAIL, from = process.env.ENQUIRY_FROM_EMAIL;
  if (rKey && to && from) {
    const text = [
      `New enquiry from ${name}${company ? ` (${company})` : ''}`,
      '',
      `Phone: ${phone}`, `Email: ${email || '-'}`, `Occasion: ${occasion || '-'}`, `Needed by: ${deadline || '-'}`,
      '', 'Products:', ...(items.length ? items.map((i) => `- ${i.name} x ${i.qty}`) : ['- (none selected)']),
      '', 'Message:', message || '-',
    ].join('\n');
    results.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${rKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], reply_to: email || undefined, subject: `New enquiry: ${name}${company ? ` - ${company}` : ''} (${site.name} website)`, text }),
      }).then((r) => r.ok).catch(() => false)
    );
  }

  // Never silently drop an enquiry: if nothing is configured, say so.
  if (results.length === 0) {
    console.error('Enquiry received but no delivery method configured (set Supabase or Resend env vars).');
    return NextResponse.json({ error: 'Our enquiry form is temporarily unavailable.' }, { status: 503 });
  }
  const ok = (await Promise.all(results)).some(Boolean);
  if (!ok) return NextResponse.json({ error: 'We could not save your enquiry right now.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
