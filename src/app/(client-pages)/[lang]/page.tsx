'use client';

import HomePage from '@/components/HomePage';
import { getHomePageContents } from '../../services/apiService/homeAPI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

export default function Home() {
  const { data, loading } = useClientAPI({ apiFn: getHomePageContents });
  const { loader } = useTranslationLoader();

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && <HomePage homePageConfig={data[0]} />}
    </>
  );
}
