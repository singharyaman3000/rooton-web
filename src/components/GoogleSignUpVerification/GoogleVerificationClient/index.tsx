'use client';

import React from 'react';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import GoogleVerification from '@/components/GoogleSignUpVerification';

export default function GoogleVerificationClient() {
  const { loader } = useTranslationLoader();

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      { <GoogleVerification/>}
    </>
  );
}
