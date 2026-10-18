import Link from 'next/link';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata = {
  title: 'Request a Quote',
  description: 'Tell us what you need and get a written quote for custom-branded corporate gifts.',
  alternates: { canonical: '/enquiry' },
};

export default function EnquiryPage() {
  return (
    <div className="py-14 lg:py-20">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/60"><Link href="/" className="hover:text-gold-700">Home</Link> <span aria-hidden="true">/</span> Request a quote</nav>
        <div className="mb-10 mt-6 max-w-2xl">
          <p className="eyebrow">No obligation</p>
          <h1 className="mt-3 text-[2.6rem] leading-[1.02] sm:text-6xl">Request a quote</h1>
          <p className="mt-4 text-lg text-ink/70">Add the products you are interested in, tell us about your occasion, and we will come back with a quote for your quantity.</p>
        </div>
        <EnquiryForm />
      </div>
    </div>
  );
}
