import { getFetch } from '@/utils/apiUtils';
import { IBlogDetailsResponse } from './blogDetailAPI';
import { getNewsAlertDataApi } from './apiUrl/homePage';

export const getNewsAlertContent = async () => {
  const res = await getFetch<IBlogDetailsResponse>(getNewsAlertDataApi(), { cache: 'no-store' });
  return res;
};
