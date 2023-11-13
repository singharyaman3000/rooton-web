'use client';

import { ICoachingServicePageContent, getCoachingServicePageContent } from '@/app/services/apiService/coachingContentsAPI';
import LoadingUI from '@/components/LoadingUI';
import { CoachingServicePageComponent } from '@/components/CoachingPage-Services';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';

const ServicePageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getCoachingServicePageContent(params.slug.split('/')[0]);
    },
  });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && (
        <CoachingServicePageComponent
          isBookAppointment={Boolean(params.slug.split('/')[1])}
          response={data as ICoachingServicePageContent}
        />
      )}
    </>
  );
};

export default ServicePageCSR;
