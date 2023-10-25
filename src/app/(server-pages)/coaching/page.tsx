import { Metadata } from 'next';
import Coaching from '@/components/CoachingPage';
import { getCoachingPageContents } from '@/app/services/apiService/CoachingAPI';

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
  const apiRes = await getCoachingPageContents();
  return apiRes?.length > 0 && <Coaching coachingPageConfig={apiRes[0]} />;
}
