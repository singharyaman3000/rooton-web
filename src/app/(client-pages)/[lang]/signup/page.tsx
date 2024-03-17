'use client';

import SignUpPageClient from '@/components/SignUpPage/SignUpPageClient';
import RSCSeoWrapper from '@/components/Containers/RSCSeoWrapper';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import { useParams } from 'next/navigation';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import LoadingUI from '@/components/LoadingUI';

const SignUpPageCSR = () => {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/signup`;
  useSetMetaInfo(metaInfo.signUp.title, metaInfo.signUp.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <div>
      {loader && <LoadingUI />}
      {
        <RSCSeoWrapper>
          <SignUpPageClient />
        </RSCSeoWrapper>
      }
    </div>
  );
};

export default SignUpPageCSR;
