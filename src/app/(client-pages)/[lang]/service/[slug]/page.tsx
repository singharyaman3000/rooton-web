'use client';

import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import LoadingUI from '@/components/LoadingUI';
import { ServicePageComponent } from '@/components/ServicePage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

const ServicePageCSR = () => {
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getServicePageContent(1);
    },
  });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && <ServicePageComponent response={data as IServicePageContent} />}
    </>
  );
};

export default ServicePageCSR;
