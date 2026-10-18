import { site } from '@/config/site';
import { products } from '@/data/products';

export default function sitemap() {
  const now = new Date();
  const pages = ['', '/products', '/enquiry', '/contact', '/privacy'].map((p) => ({
    url: `${site.url}${p}`, lastModified: now, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7,
  }));
  const items = products.map((p) => ({ url: `${site.url}/products/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 }));
  return [...pages, ...items];
}
