import type { MetadataRoute } from 'next';
import { areas } from '@/config/areas';
import { services } from '@/config/services';
import { SITE_URL as SITE } from '@/config/site';

const routes: [string, number][] = [
  ['', 1],
  ['/contact', 0.8],
  ['/service-area', 0.7],
  ['/faq', 0.6],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-26');
  const fixed: MetadataRoute.Sitemap = routes.map(([path, priority]) => ({
    url: SITE + path,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
  const svc: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  const towns: MetadataRoute.Sitemap = areas.map((t) => ({
    url: `${SITE}/service-area/${t.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...fixed, ...svc, ...towns];
}
