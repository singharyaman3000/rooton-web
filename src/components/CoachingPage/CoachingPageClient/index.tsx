'use client';

import CoachingPage from '@/components/CoachingPage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { getCoachingPageContents } from '@/app/services/apiService/CoachingAPI';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import { useParams } from 'next/navigation';

export default function CoachingPageClient() {
  const params = useParams();
  const { data, loading } = useClientAPI({ apiFn: getCoachingPageContents });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params?.lang}/coaching`;
  useSetMetaInfo(metaInfo.coaching.title, metaInfo.coaching.description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && <CoachingPage coachingPageConfig={data[0]} />}
    </>
  );
}
