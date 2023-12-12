'use client';

import { getPolicyContents,IPrivatePolicyPageContent } from '@/app/services/apiService/privatePolicyAPI';
import PrivatePolicy from '@/components/PrivatePolicyPage';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { getPolicyMetaInfo } from '@/app/services/apiService/policyMetaInfo';

const PolicyPageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getPolicyContents(params.slug.split('/')[0]);
    },
  });

  const { data: metaData = [] } = useClientAPI({
    apiFn: () => {
      return getPolicyMetaInfo(params.slug.split('/')[0]);
    },
  });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/policy/${metaData![0]?.attributes?.unique_identifier_name}`;
  useSetMetaInfo(metaData![0]?.attributes?.meta_title ?? '', metaData![0]?.attributes?.meta_description, canonicalUrl);

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
