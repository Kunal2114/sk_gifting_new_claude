import '@fontsource-variable/inter';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { site } from '@/config/site';
import { EnquiryProvider } from '@/components/EnquiryProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Custom-Branded Corporate Gifts in Bengaluru`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website', locale: 'en_IN', siteName: site.name, url: site.url,
    title: `${site.name} | Custom-Branded Corporate Gifts`, description: site.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description, images: ['/og.jpg'] },
  alternates: { canonical: '/' },
};

export const viewport = { themeColor: '#0B1626' };

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/logo-full.png`,
  image: `${site.url}/og.jpg`,
  email: site.email,
  telephone: site.phoneTel,
  description: site.description,
  address: { '@type': 'PostalAddress', streetAddress: site.address.slice(0, 2).join(', '), addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560038', addressCountry: 'IN' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-semibold">Skip to content</a>
        <EnquiryProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </EnquiryProvider>
        <JsonLd data={orgSchema} />
        <Analytics />
      </body>
    </html>
  );
}
