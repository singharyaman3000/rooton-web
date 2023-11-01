import { COMPANY_STAT_VALUES_DEFAULT } from './aboutUsContent';
import { IAboutUsContent } from '@/app/services/apiService/aboutUsPageAPI';

// Function to handle About us Api failure and basic data integrity
export const resolveAboutUsApiIssues = (apiResponse: IAboutUsContent) => {
  let companyStatValuesApi;

  try {
    companyStatValuesApi = [
      {
        statValue:
          typeof apiResponse.data.company_experience === 'number'
            ? Math.max(apiResponse.data.company_experience, COMPANY_STAT_VALUES_DEFAULT[0].statValue)
            : COMPANY_STAT_VALUES_DEFAULT[0].statValue,
        statText: COMPANY_STAT_VALUES_DEFAULT[0].statText,
      },
      {
        statValue:
          typeof apiResponse.data.client_count === 'number'
            ? Math.max(apiResponse.data.client_count, COMPANY_STAT_VALUES_DEFAULT[1].statValue)
            : COMPANY_STAT_VALUES_DEFAULT[1].statValue,
        statText: COMPANY_STAT_VALUES_DEFAULT[1].statText,
      },
    ];
  } catch (error) {
    companyStatValuesApi = COMPANY_STAT_VALUES_DEFAULT;
  }

  return companyStatValuesApi;
};
