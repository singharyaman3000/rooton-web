import { COMPANY_STAT_VALUES_DEFAULT } from './aboutUsContent';
import { IAboutUsContent } from '@/app/services/apiService/aboutUsPageAPI';

// Function to handle About us Api failure and basic data integrity
export const resolveAboutUsApiIssues = (apiResponse: IAboutUsContent) => {
  let companyStatValuesApi;

  const { statValue: companyExperienceDefault, statText: companyExperienceText } = COMPANY_STAT_VALUES_DEFAULT[0];
  const { statValue: clientCountDefault, statText: clientCountDefaultText } = COMPANY_STAT_VALUES_DEFAULT[1];

  try {
    const { company_experience: companyExperienceApi, client_count: clientCountApi } = apiResponse.data[0].attributes;
    companyStatValuesApi = [
      {
        statValue: typeof companyExperienceApi === 'number' ? companyExperienceApi : companyExperienceDefault,
        statText: companyExperienceText,
      },
      {
        statValue: typeof clientCountApi === 'number' ? clientCountApi : clientCountDefault,
        statText: clientCountDefaultText,
      },
    ];
  } catch (error) {
    companyStatValuesApi = COMPANY_STAT_VALUES_DEFAULT;
  }

  return companyStatValuesApi;
};
