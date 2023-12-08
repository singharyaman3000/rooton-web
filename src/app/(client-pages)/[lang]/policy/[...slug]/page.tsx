'use client';

import { getPrivatePolicyContents,IPrivatePolicyPageContent } from '@/app/services/apiService/privatePolicyAPI';
import PrivatePolicy from '@/components/PrivatePolicyPage';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const PolicyPageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getPrivatePolicyContents(params.slug.split('/')[0]);
    },
  });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && (
        <PrivatePolicy
          response={data as IPrivatePolicyPageContent}
        />
      )}
    </>
  );
};

export default PolicyPageCSR;
