import { getFetch } from '@/utils/apiUtils';
import { GET_PAGE_UPDATE_DATA } from './apiUrl/seoMetaData';
import { IPageMeta } from './interfaces';

interface IPageData {
  data: { id: number; attributes: { updatedAt: string } };
}

export interface IPageMetaAttributes {
  coaching_page: IPageData;
  contact_us: IPageData;
  home_page: IPageData;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface IPageMetaData {
  id: number;
  attributes: IPageMetaAttributes;
}

export interface IPageSEOMetaDataResponse {
  data: IPageMetaData[];
  meta: IPageMeta;
}

export const getPagesSEOMetaData = async () => {
  const apiRes = await getFetch<IPageSEOMetaDataResponse>(GET_PAGE_UPDATE_DATA, { next: { revalidate: 60 } });
  return apiRes.data;
};
