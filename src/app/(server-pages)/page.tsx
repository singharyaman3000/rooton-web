import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getHomePageContents } from '../services/apiService/homeAPI';

// import { CONTENT_TYPES, getHomePageContents } from '../services/apiService/homeAPI';

export const metadata: Metadata = {
  title: 'ROOT ON',
  description: 'Root On',
  openGraph: {
    url: `${process.env.NEXT_APP_BASE_URL}`,
    title: 'Root On',
    images: `${process.env.NEXT_APP_BASE_URL}/images/og-image.png`,
    description: 'What seems impossible to others has been made possible by Root On.',
    type: 'article',
  },
  twitter: {
    title: 'ROOT ON',
    description: 'Root On',
    card: 'summary_large_image',
  },
};

export default async function Home() {
  const apiRes = await getHomePageContents();
  return <HomePage homePageConfig={apiRes} />;
}
