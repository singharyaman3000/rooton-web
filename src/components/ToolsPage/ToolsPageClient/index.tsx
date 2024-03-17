'use client';

import ToolsPage from '@/components/ToolsPage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { getToolsPageContents } from '@/app/services/apiService/ToolsAPI';
import { useParams } from 'next/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { metaInfo } from '@/app/constants/pageMetaInfo';

export default function ToolsPageClient() {
  const params = useParams();
  const { data, loading } = useClientAPI({ apiFn: getToolsPageContents });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params?.lang}/tools`;
  useSetMetaInfo(metaInfo.tools.title, metaInfo.tools.description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && <ToolsPage toolsPageConfig={data[0]} />}
    </>
  );
}
