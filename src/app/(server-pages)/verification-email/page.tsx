import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import EmailVerification from '@/components/EmailVerification';

export const metadata: Metadata = {
  title: metaInfo.email.title,
  description: metaInfo.email.description,
  alternates: { canonical: 'https://rooton.ca/verification-email' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function EmailVerificationPage() {
  return <EmailVerification />;
}
