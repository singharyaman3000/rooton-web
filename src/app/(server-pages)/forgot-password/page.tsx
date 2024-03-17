import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import ForgotPassword from '@/components/ForgotPassowrd';

export const metadata: Metadata = {
  title: metaInfo.forgot_password.title,
  description: metaInfo.forgot_password.description,
  alternates: { canonical: 'https://rooton.ca/forgot-password' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function ForgotPasswordPage() {
  return <ForgotPassword />;
}
