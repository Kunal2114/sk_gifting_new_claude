import { site } from '@/config/site';

export const metadata = { title: 'Privacy Policy', description: `How ${site.name} handles the information you share with us.`, alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <div className="py-14 lg:py-20">
      <div className="container-x max-w-3xl">
        <h1 className="text-5xl">Privacy policy</h1>
        <p className="mt-3 text-sm text-ink/55">Last updated: October 2026</p>
        <div className="mt-8 space-y-6 leading-relaxed text-ink/80 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-3xl">
          <p>{site.name} ("we", "us") respects your privacy. This page explains what we collect through this website and how we use it.</p>
          <h2>What we collect</h2>
          <p>When you submit the quote form we collect the details you enter: your name, company, phone number, email, occasion, deadline, message and the products you selected. We also collect basic, anonymous site usage statistics to understand how the site is used.</p>
          <h2>How we use it</h2>
          <p>We use your details only to respond to your enquiry, prepare quotes, and fulfil orders. We do not sell your information.</p>
          <h2>Who can see it</h2>
          <p>Your enquiry is stored with our service providers (for example our database and email providers) solely so we can handle it. We may share information when required by law.</p>
          <h2>Your choices</h2>
          <p>You can ask us to access, correct or delete your information at any time by emailing <a className="font-semibold text-gold-700 underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <h2>Contact</h2>
          <p>{site.name}, {site.address.join(', ')}.</p>
        </div>
      </div>
    </div>
  );
}
