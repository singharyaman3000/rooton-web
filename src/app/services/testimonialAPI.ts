import { getFetch } from '@/utils/apiUtils';
import { ITestimonialData } from '@/components/UIElements/Cards/TestimonialCard';
import { TESTIMONIAL_API } from './apiService/apiUrl/homePage';

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface ITestimonialPageData {
  data: ITestimonialData[];
  meta: Meta;
}

export const getTestimonials = async () => {
  const apiRes = await getFetch<ITestimonialPageData>(TESTIMONIAL_API, { next: { revalidate: 1200 } });
  return apiRes.data;
};
