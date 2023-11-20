'use client';

import LoadingUI from '@/components/LoadingUI';
import AboutUsPage from '@/app/(server-pages)/about-us/AboutUsPage';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { IAboutUsContent, getAboutUsContent } from '@/app/services/apiService/aboutUsPageAPI';
import { resolveAboutUsApiIssues } from '@/app/(server-pages)/about-us/config/aboutUsApiHandler';

const AboutUsPageCSR = () => {
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getAboutUsContent();
    },
  });
  const { loader } = useTranslationLoader();
  const companyStatValuesApi = resolveAboutUsApiIssues(data as IAboutUsContent);

  if (loader || loading) return <LoadingUI />;

  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      {data && <AboutUsPage companyStatValues={companyStatValuesApi} />};
    </div>
  );
};

export default AboutUsPageCSR;
