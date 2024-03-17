'use client';

import LoginPageClient from '@/components/LoginInPage/LoginInPageClient';
import RSCSeoWrapper from '@/components/Containers/RSCSeoWrapper';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import { useParams } from 'next/navigation';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import LoadingUI from '@/components/LoadingUI';

const LoginPageCSR = () => {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/login`;
  useSetMetaInfo(metaInfo.login.title, metaInfo.login.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <div>
      {loader && <LoadingUI />}
      {
        <RSCSeoWrapper>
          <LoginPageClient />
        </RSCSeoWrapper>
      }
    </div>
  );
};

export default LoginPageCSR;
