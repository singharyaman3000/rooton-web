import { getFetch } from '@/utils/apiUtils';
import { getServiceMetaInfoUrl } from './apiUrl/servicePage';
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

export const getBlogMetaInfo = async (serviceId: string) => {
  const apiRes = await getFetch<IBlogMetaInfo>(getServiceMetaInfoUrl(serviceId));
  return apiRes?.data;
};
