import { getFetch } from '@/utils/apiUtils';
import { ABOUT_US_API_PATH } from './apiUrl/aboutUsPage';

export interface IAboutUsContent {
  data: {
    client_count: number;
    company_experience: number;
  };
}

export const getAboutUsContent = async () => {
  try {
    // Page made to refresh every day (60 * 60 * 24)
    const res = await getFetch<IAboutUsContent>(ABOUT_US_API_PATH, { next: { revalidate: 60 * 60 * 24 } });
    return res;
  } catch (error) {
    return { error };
  }
};
