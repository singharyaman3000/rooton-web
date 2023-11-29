import { getFetch } from '@/utils/apiUtils';
import { getServiceMetaInfoUrl } from './apiUrl/servicePage';
import { IPageMeta } from './interfaces';

interface IServiceMetaAttributes {
  meta_description: string;
  meta_title: string;
  unique_identifier_name: string;
}

interface IServiceMetaData {
  id: number;
  attributes: IServiceMetaAttributes;
}

export interface IServiceMetaInfo {
  data: IServiceMetaData[];
  meta: IPageMeta;
}

export const getServiceMetaInfo = async (serviceId: string) => {
  const apiRes = await getFetch<IServiceMetaInfo>(getServiceMetaInfoUrl(serviceId));
  return apiRes?.data;
};
