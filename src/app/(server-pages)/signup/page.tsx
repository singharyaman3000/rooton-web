import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import SignUpModalComponent from '@/components/SignUpPage';

export const metadata: Metadata = {
  title: metaInfo.signUp.title,
  description: metaInfo.signUp.description,
  alternates: { canonical: 'https://rooton.ca/signup' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function SignUpPage() {
  return <SignUpModalComponent />;
}
