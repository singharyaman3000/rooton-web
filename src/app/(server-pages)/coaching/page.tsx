import { Metadata } from 'next';
import Coaching from '@/components/CoachingPage';
import { getCoachingPageContents } from '@/app/services/apiService/CoachingAPI';
import { metaInfo } from '@/app/constants/pageMetaInfo';

export const metadata: Metadata = {
  title: metaInfo.coaching.title,
  description: metaInfo.coaching.description,
  alternates: { canonical: 'https://rooton.ca/coaching' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function Home() {
  const apiRes = await getCoachingPageContents();
  return apiRes?.length > 0 && <Coaching coachingPageConfig={apiRes[0]} />;
}
