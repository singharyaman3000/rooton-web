import { metaInfo } from '@/app/constants/pageMetaInfo';
import LoginError from '@/components/Error';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: metaInfo.error.title,
  description: metaInfo.error.description,
  alternates: { canonical: 'https://rooton.ca/login/error' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function LoginErrorPage() {
  return <LoginError />;
}
