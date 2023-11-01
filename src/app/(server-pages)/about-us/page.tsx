import AboutUsPage from './AboutUsPage';
import { IAboutUsContent, getAboutUsContent } from '@/app/services/apiService/aboutUsPageAPI';
import { COMPANY_STAT_VALUES_DEFAULT, WELCOME_SECTION_DATA } from './config/aboutUsContent';

export default async function AboutUs() {
  let companyStatValuesApi;
  const apiRes = (await getAboutUsContent()) as IAboutUsContent;

  try {
    companyStatValuesApi = [
      {
        statValue:
          typeof apiRes.data.company_experience === 'number'
            ? Math.max(apiRes.data.company_experience, COMPANY_STAT_VALUES_DEFAULT[0].statValue)
            : COMPANY_STAT_VALUES_DEFAULT[0].statValue,
        statText: WELCOME_SECTION_DATA.experienceYearsText,
      },
      {
        statValue:
          typeof apiRes.data.client_count === 'number'
            ? Math.max(apiRes.data.client_count, COMPANY_STAT_VALUES_DEFAULT[1].statValue)
            : COMPANY_STAT_VALUES_DEFAULT[1].statValue,
        statText: WELCOME_SECTION_DATA.clientsCountText,
      },
    ];
  } catch (error) {
    companyStatValuesApi = COMPANY_STAT_VALUES_DEFAULT;
  }

  return <AboutUsPage companyStatValues={companyStatValuesApi} />;
}
