import { getFetch } from '@/utils/apiUtils';
import { getBlogsMetaInfoUrl } from './apiUrl/servicePage';
import { IPageMeta } from './interfaces';

interface IBlogMetaAttributes {
  meta_description: string;
  meta_title: string;
}

interface IBlogMetaData {
  id: number;
  attributes: IBlogMetaAttributes;
}

export interface IBlogMetaInfo {
  data: IBlogMetaData[];
  meta: IPageMeta;
}

export const getBlogMetaInfo = async (blogId: string) => {
  const apiRes = await getFetch<IBlogMetaInfo>(getBlogsMetaInfoUrl(blogId));
  return apiRes?.data;
};
