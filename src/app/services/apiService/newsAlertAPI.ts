import { getFetch } from '@/utils/apiUtils';
import { IBlogDetailsResponse } from './blogDetailAPI';
import { NEWS_ALERT_DATA_API } from './apiUrl/homePage';

export const getNewsAlertContent = async () => {
  const res = await getFetch<IBlogDetailsResponse>(NEWS_ALERT_DATA_API, { next: { revalidate: 60 } });
  return res;
};
