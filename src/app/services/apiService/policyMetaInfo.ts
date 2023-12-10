import { getFetch } from '@/utils/apiUtils';
import { getPolicyMetaInfoUrl } from './apiUrl/servicePage';
import { IPageMeta } from './interfaces';

interface IServiceMetaAttributes {
  meta_description: string;
  meta_title: string;
  unique_identifier_name: string;
}

export interface IServiceMetaData {
  id: number;
  attributes: IServiceMetaAttributes;
}

export interface IPOlicyMetaInfo {
  data: IServiceMetaData[];
  meta: IPageMeta;
}

export const getPolicyMetaInfo = async (policyId: string) => {
  const apiRes = await getFetch<IPOlicyMetaInfo>(getPolicyMetaInfoUrl(policyId));
  return apiRes?.data;
};
