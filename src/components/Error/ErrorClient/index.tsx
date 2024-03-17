'use client';

import React from 'react';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import LoginError from '@/components/Error/index';
import { useParams } from 'next/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { metaInfo } from '@/app/constants/pageMetaInfo';

export default function ErrorClient() {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params?.lang}/login/error`;
  useSetMetaInfo(metaInfo.error.title, metaInfo.error.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      {<LoginError/>}
    </>
  );
}
