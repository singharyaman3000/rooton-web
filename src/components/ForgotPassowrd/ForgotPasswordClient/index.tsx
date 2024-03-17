'use client';

import React from 'react';
import ForgotPassword from '@/components/ForgotPassowrd';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { metaInfo } from '@/app/constants/pageMetaInfo';

export default function ForgotPasswordClient() {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params?.lang}/forgot-password`;
  useSetMetaInfo(metaInfo.forgot_password.title, metaInfo.forgot_password.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      {<ForgotPassword/>}
    </>
  );
}
