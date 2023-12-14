import { getFetch } from '@/utils/apiUtils';
import { IBlogDetailsResponse } from './blogDetailAPI';
import { getNewsAlertDataApi } from './apiUrl/homePage';

export const getNewsAlertContent = async () => {
  const res = await getFetch<IBlogDetailsResponse>(getNewsAlertDataApi(), { next: { revalidate: 60 } });
  return res;
};
