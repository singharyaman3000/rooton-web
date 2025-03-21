import { getFetch } from '@/utils/apiUtils';
import { getBlogsListUrl } from './apiUrl/blogsPage';
import { IMediaUrlData, IPageMeta } from './interfaces';

export type ArticleCategoryType = 'news' | 'blog' | 'case-study' | 'coaching-tips';

export interface IBlogData {
  id: number;
  attributes: {
    author: string;
    author_profile_image: {
      data: IMediaUrlData;
    };
    blog_contents: {
      data: {}[];
    };
    category: ArticleCategoryType;
    createdAt: string;
    description: string;
    media_url: { data: IMediaUrlData[] };
    publishedAt: string;
    service_type: string;
    sub_title: string;
    title: string;
    updatedAt: string;
    views: number;
  };
}

export interface IBlogsListResponse {
  data: IBlogData[];
  meta: IPageMeta;
}

export const getBlogsList = async (
  articleType: ArticleCategoryType,
  pageNo: number,
  sourcePage: string,
  serviceType?: string,
  blogId?: string,
) => {
  try {
    const url = getBlogsListUrl(articleType, pageNo, sourcePage, serviceType || '', blogId);
    const res = await getFetch<IBlogsListResponse>(url, { cache: 'no-store' });
    return { status: 1, res };
  } catch (error) {
    return { status: 0, error };
  }
};
