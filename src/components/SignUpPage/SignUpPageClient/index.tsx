'use client';

import LoadingUI from '@/components/LoadingUI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import SignUpModalComponent from '@/components/SignUpPage';

export default function SignUpPageClient() {
  const { loader } = useTranslationLoader();

  if (loader) return <LoadingUI />;

  return (
    <>
      {loader && <LoadingUI />}
      {<SignUpModalComponent />}
    </>
  );
}
