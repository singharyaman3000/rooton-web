import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import SuccessPage from '@/components/PaymentStatusPages/SuccessPage';

export const metadata: Metadata = {
  title: metaInfo.payment_success.title,
  description: metaInfo.payment_success.description,
  alternates: { canonical: 'https://rooton.ca/payment-success' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function PaymentSuccessPage() {
  return <SuccessPage />;
}
