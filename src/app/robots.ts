import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // allow: '/',
      disallow: '/',
    },
    sitemap: `${process.env.NEXT_APP_BASE_URL}/sitemap.xml`,
  };
}
