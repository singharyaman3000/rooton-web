'use client';

import CoachingPage from '@/components/CoachingPage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { getCoachingPageContents } from '@/app/services/apiService/CoachingAPI';

export default function CoachingPageClient() {
  const { data, loading } = useClientAPI({ apiFn: getCoachingPageContents });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && <CoachingPage coachingPageConfig={data[0]} />}
    </>
  );
}
