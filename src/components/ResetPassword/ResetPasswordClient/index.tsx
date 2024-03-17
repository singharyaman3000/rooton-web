'use client';

import React from 'react';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import ResetPassword from '..';

export default function ResetPasswordClient() {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params?.lang}/reset-password`;
  useSetMetaInfo(metaInfo.reset_password.title, metaInfo.reset_password.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      {<ResetPassword/>}
    </>
  );
}
