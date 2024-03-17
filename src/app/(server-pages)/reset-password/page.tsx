import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import ResetPassword from '@/components/ResetPassword';

export const metadata: Metadata = {
  title: metaInfo.reset_password.title,
  description: metaInfo.reset_password.description,
  alternates: { canonical: 'https://rooton.ca/reset-password' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function ResetPasswordPage() {
  return <ResetPassword />;
}
