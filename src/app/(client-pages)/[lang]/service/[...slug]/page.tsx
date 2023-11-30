'use client';

import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { getServiceMetaInfo } from '@/app/services/apiService/serviceMetaInfo';
import LoadingUI from '@/components/LoadingUI';
import { ServicePageComponent } from '@/components/ServicePage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const ServicePageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getServicePageContent(params.slug.split('/')[0]);
    },
  });

  const { data: metaData = [] } = useClientAPI({
    apiFn: () => {
      return getServiceMetaInfo(params.slug.split('/')[0]);
    },
  });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/service/${metaData![0]?.attributes?.unique_identifier_name}`;
  useSetMetaInfo(metaData![0]?.attributes?.meta_title ?? '', metaData![0]?.attributes?.meta_description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && (
        <ServicePageComponent
          isBookAppointment={Boolean(params.slug.split('/')[1])}
          response={data as IServicePageContent}
        />
      )}
    </>
  );
};

export default ServicePageCSR;
