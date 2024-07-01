'use client';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import LoadingUI from '@/components/LoadingUI';
import SuccessPage from '@/components/PaymentStatusPages/SuccessPage';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const PaymentSuccessPageCSR = () => {
  const params = useParams();

  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/payment-success`;
  useSetMetaInfo(metaInfo.payment_success.title, metaInfo.payment_success.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <div>
      {loader && <LoadingUI />}
      {<SuccessPage />}
    </div>
  );
};

export default PaymentSuccessPageCSR;
