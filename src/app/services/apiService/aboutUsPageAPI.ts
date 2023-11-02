import { IPageMeta } from './interfaces';
import { getFetch } from '@/utils/apiUtils';
import { ABOUT_US_API_PATH } from './apiUrl/aboutUsPage';

export interface IAboutUsAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  client_count: number;
  company_experience: number;
}

export interface IAboutUsContent {
  data: { id: number; attributes: IAboutUsAttributes }[];
  meta: IPageMeta;
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
