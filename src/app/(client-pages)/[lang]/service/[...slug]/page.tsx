'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { getServiceMetaInfo } from '@/app/services/apiService/serviceMetaInfo';
import LoadingUI from '@/components/LoadingUI';
import { ServicePageComponent } from '@/components/ServicePage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { BOOK_AN_APPOINTMENT_QUERY } from '@/constants/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

const ServicePageCSR = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const scrollToForms = Boolean(searchParams.get(BOOK_AN_APPOINTMENT_QUERY) === 'true');

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
    <div>
      {(loader || loading) && <LoadingUI />}
      {data && <ServicePageComponent isBookAppointment={scrollToForms} response={data as IServicePageContent} />}
    </div>
  );
};

export default ServicePageCSR;
