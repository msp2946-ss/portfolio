import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://your-domain.com'
  return [{ url: base, lastModified: new Date() }]
}
