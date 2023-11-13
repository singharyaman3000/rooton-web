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
  try {
    const res = await getFetch<ITestimonialPageData>(url, { next: { revalidate: 1200 } });
    return { status: 1, res };
  } catch (error) {
    return { status: 0, error };
  }
};
