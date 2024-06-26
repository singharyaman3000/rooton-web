import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import ErrorPage from '@/components/PaymentStatusPages/ErrorPage';

export const metadata: Metadata = {
  title: metaInfo.payment_error.title,
  description: metaInfo.payment_error.description,
  alternates: { canonical: 'https://rooton.ca/payment-error' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function PaymentErrorPage() {
  return (
    <ErrorPage/>
  );
}

