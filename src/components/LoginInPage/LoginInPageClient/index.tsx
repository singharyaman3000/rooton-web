'use client';

import React from 'react';
import LoginModalComponent from '@/components/LoginInPage';
import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';

export default function LoginPageClient() {
  const { loader } = useTranslationLoader();

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      {<LoginModalComponent />}
    </>
  );
}
