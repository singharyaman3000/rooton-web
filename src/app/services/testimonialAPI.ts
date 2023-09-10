import { getFetch } from '@/utils/apiUtils';
import { ITestimonialData } from '@/components/UIElements/Cards/TestimonialCard';

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

export const getTestimonials = async (url: string) => {
  const apiRes = await getFetch<ITestimonialPageData>(url, { next: { revalidate: 1200 } });
  return apiRes.data;
};
