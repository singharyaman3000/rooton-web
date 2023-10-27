import { getFetch } from '@/utils/apiUtils';
import { GET_BLOGS_HEADER_CONTENT } from './apiUrl/blogsPage';
import { IPageMeta, MediaUrl } from './interfaces';

export interface IBlogsHomeAttributes {
  title: string;
  sub_title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  media_url: MediaUrl;
}

export interface IBlogsHomeContent {
  data: { id: number; attributes: IBlogsHomeAttributes }[];
  meta: IPageMeta;
}

export const getBlogsHomeContent = async () => {
  try {
    const res = await getFetch<IBlogsHomeContent>(GET_BLOGS_HEADER_CONTENT, { next: { revalidate: 0 } });
    return res;
  } catch (error) {
    return { error };
  }
};
