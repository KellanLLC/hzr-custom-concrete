import type { MetadataRoute } from 'next';
import { SITE_URL as SITE } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/r/'] },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
