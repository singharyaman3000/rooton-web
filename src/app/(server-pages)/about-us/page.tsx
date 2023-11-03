import AboutUsPage from './AboutUsPage';
import { resolveAboutUsApiIssues } from './config/aboutUsApiHandler';
import { IAboutUsContent, getAboutUsContent } from '@/app/services/apiService/aboutUsPageAPI';

export default async function AboutUs() {
  const apiRes = (await getAboutUsContent()) as IAboutUsContent;
  const companyStatValuesApi = resolveAboutUsApiIssues(apiRes);

  return <AboutUsPage companyStatValues={companyStatValuesApi} />;
}
