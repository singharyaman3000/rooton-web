'use client';

import { ICoachingServicePageContent, getCoachingServicePageContent } from '@/app/services/apiService/coachingContentsAPI';
import LoadingUI from '@/components/LoadingUI';
import { CoachingServicePageComponent } from '@/components/CoachingPage-Services';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams, useSearchParams } from 'next/navigation';
import { getCoachingServiceMetaInfo } from '@/app/services/apiService/coachingContentsAPIMetaInfo';
import { BOOK_AN_APPOINTMENT_QUERY } from '@/constants/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';

const ServicePageCSR = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const scrollToForms = Boolean(searchParams.get(BOOK_AN_APPOINTMENT_QUERY) === 'true');

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getCoachingServicePageContent(params.slug.split('/')[0]);
    },
  });

  const { data: metaData = [] } = useClientAPI({
    apiFn: () => {
      return getCoachingServiceMetaInfo(params.slug.split('/')[0]);
    },
  });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/coaching/${metaData![0]?.attributes?.unique_identifier_name}`;
  useSetMetaInfo(metaData![0]?.attributes?.meta_title ?? '', metaData![0]?.attributes?.meta_description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && (
        <CoachingServicePageComponent
          isBookAppointment={scrollToForms}
          response={data as ICoachingServicePageContent}
        />
      )}
    </>
  );
};

export default ServicePageCSR;
