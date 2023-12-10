import { Metadata } from 'next';
import Coaching from '@/components/CoachingPage';
import { getCoachingPageContents } from '@/app/services/apiService/CoachingAPI';
import { metaInfo } from '@/app/constants/pageMetaInfo';

// export const metadata: Metadata = {
//   title: metaInfo.contactUs.title,
//   description: 'Root On',
//   openGraph: {
//     url: `${process.env.NEXT_APP_BASE_URL}`,
//     title: 'Root On',
//     images: `${process.env.NEXT_APP_BASE_URL}/images/og-image.png`,
//     description: 'What seems impossible to others has been made possible by Root On.',
//     type: 'article',
//   },
//   twitter: {
//     title: 'ROOT ON',
//     description: 'Root On',
//     card: 'summary_large_image',
//   },
// };

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
