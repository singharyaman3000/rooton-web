'use client';

import React from 'react';
import EmailVerification from '@/components/EmailVerification';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { useParams } from 'next/navigation';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { metaInfo } from '@/app/constants/pageMetaInfo';

export default function EmailVerificationClient() {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params?.lang}/verification-email`;
  useSetMetaInfo(metaInfo.email.title, metaInfo.email.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      {<EmailVerification/>}
    </>
  );
}
