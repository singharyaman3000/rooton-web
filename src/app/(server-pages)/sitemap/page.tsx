import SiteMap from '@/components/SiteMapPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'sitemap',
  alternates: { canonical: 'https://rooton.ca/sitemap' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function SiteMapPage() {
  return <SiteMap/>;
}
