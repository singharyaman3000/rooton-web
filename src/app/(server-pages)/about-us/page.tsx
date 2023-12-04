import { Metadata } from 'next';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import AboutUsPage from '../../../components/AboutUsPage';
import { resolveAboutUsApiIssues } from '@/components/AboutUsPage/config/aboutUsApiHandler';
import { IAboutUsContent, getAboutUsContent } from '@/app/services/apiService/aboutUsPageAPI';

export const metadata: Metadata = {
  title: metaInfo.aboutUs.title,
  description: metaInfo.aboutUs.description,
  alternates: { canonical: 'https://rooton.ca/about-us' },
  // to be removed in production
  robots: {
    index: false,
  },
};

export default async function AboutUs() {
  const apiRes = (await getAboutUsContent()) as IAboutUsContent;
  const companyStatValuesApi = resolveAboutUsApiIssues(apiRes);

  return <AboutUsPage companyStatValues={companyStatValuesApi} />;
}
