'use client';

import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { IToolServicePageContent, getToolServicePageContent } from '@/app/services/apiService/toolsContentsAPI';
import { getToolsServiceMetaInfo } from '@/app/services/apiService/toolsContentsAPIMetaInfo';
import { ToolsServicePageComponent } from '@/components/ToolsPage-Services';

const ToolServicePageCSR = () => {
  const params = useParams();

  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getToolServicePageContent(params.slug.split('/')[0]);
    },
  });

  const { data: metaData = [] } = useClientAPI({
    apiFn: () => {
      return getToolsServiceMetaInfo(params.slug.split('/')[0]);
    },
  });
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/${metaData![0]?.attributes?.unique_identifier_name}`;
  useSetMetaInfo(metaData![0]?.attributes?.meta_title ?? '', metaData![0]?.attributes?.meta_description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <>
      {(loader || loading) && <LoadingUI />}
      {data && (
        <ToolsServicePageComponent
          response={data as IToolServicePageContent}
        />
      )}
    </>
  );
};

export default ToolServicePageCSR;