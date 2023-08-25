'use client';

import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import LoadingUI from '@/components/LoadingUI';
import { ServicePageComponent } from '@/components/ServicePage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const ServicePageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getServicePageContent(params.slug.split('#')[0]);
    },
  });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && (
        <ServicePageComponent
          isBookAppointment={Boolean(params.slug.split('#')[1])}
          response={data as IServicePageContent}
        />
      )}
    </>
  );
};

export default ServicePageCSR;
