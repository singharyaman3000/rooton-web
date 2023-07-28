import { getFetch } from '@/utils/apiUtils';
import { HOME_API } from './apiUrl/homePage';

export const getHomePageContents = async () => {
  const apiRes = await getFetch(HOME_API, { next: { revalidate: 1200 } });
  return apiRes.data;
};
