import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import LoginModalComponent from '@/components/LoginInPage';

export const metadata: Metadata = {
  title: metaInfo.login.title,
  description: metaInfo.login.description,
  alternates: { canonical: 'https://rooton.ca/login' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function LoginPage() {
  return <LoginModalComponent />;
}
