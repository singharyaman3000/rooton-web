import { getFetch } from '@/utils/apiUtils';
import { IAttributes } from './interfaces';

interface IBlogCardData {
  id: number;
  attributes: IAttributes;
}

interface Response {
  data: IBlogCardData[];
}

export const getBlogs = async (url: string) => {
  const res = await getFetch<Response>(url, { next: { revalidate: 60 } });
  return res.data;
};
