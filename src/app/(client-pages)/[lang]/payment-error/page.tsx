'use client';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import LoadingUI from '@/components/LoadingUI';
import ErrorPage from '@/components/PaymentStatusPages/ErrorPage';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const PaymentErrorPageCSR = () => {
  const params = useParams();

  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/payment-error`;
  useSetMetaInfo(metaInfo.payment_error.title, metaInfo.payment_error.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <div>
      {loader && <LoadingUI />}
      {<ErrorPage />}
    </div>
  );
};

export default PaymentErrorPageCSR;
