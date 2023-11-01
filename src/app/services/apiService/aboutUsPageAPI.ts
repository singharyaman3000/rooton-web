import { getFetch } from '@/utils/apiUtils';

export interface IAboutUsContent {
  data: {
    client_count: number;
    company_experience: number;
  };
}

export const getAboutUsContent = async () => {
  try {
    const res = await getFetch<IAboutUsContent>('api/commons', { next: { revalidate: 60 * 60 * 24 } });
    return res;
  } catch (error) {
    return { error };
  }
};
