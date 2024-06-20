import { Metadata } from 'next';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import Checkout from '@/components/CheckoutPage';

export const metadata: Metadata = {
  title: metaInfo.checkout.title,
  description: metaInfo.checkout.description,
  alternates: { canonical: 'https://rooton.ca/checkout' },
  robots: {
    index: process.env.NEXT_APP_ENVIRONMENT === 'production',
  },
};

export default async function CheckoutPage({ searchParams }: {searchParams: { planName: string, planPrice: number }}) {
  return (
    <Checkout planDetails={searchParams}/>
  );
}
