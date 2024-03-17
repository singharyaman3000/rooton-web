import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import GoogleVerification from '@/components/GoogleSignUpVerification';

export const metadata: Metadata = {
  title: metaInfo.google_auth.title,
  description: metaInfo.google_auth.description,
  alternates: { canonical: 'https://rooton.ca/googleauth' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function GoogleAuthPage() {
  return <GoogleVerification />;
}
