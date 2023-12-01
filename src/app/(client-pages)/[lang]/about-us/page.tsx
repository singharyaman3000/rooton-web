'use client';

import { useParams } from 'next/navigation';

import LoadingUI from '@/components/LoadingUI';
import AboutUsPage from '@/components/AboutUsPage';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { IAboutUsContent, getAboutUsContent } from '@/app/services/apiService/aboutUsPageAPI';
import { resolveAboutUsApiIssues } from '@/components/AboutUsPage/config/aboutUsApiHandler';

const AboutUsPageCSR = () => {
  const params = useParams();
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getAboutUsContent();
    },
  });
  const canonicalUrl = `https://rooton.ca/${params.lang}/about-us`;
  useSetMetaInfo(metaInfo.aboutUs.title, metaInfo.aboutUs.description, canonicalUrl);

  const { loader } = useTranslationLoader();
  const companyStatValuesApi = resolveAboutUsApiIssues(data as IAboutUsContent);

  if (loader || loading) return <LoadingUI />;

  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      {data && <AboutUsPage companyStatValues={companyStatValuesApi} />}
    </div>
  );
};

export default AboutUsPageCSR;
