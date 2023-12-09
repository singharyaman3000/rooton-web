import { getFetch } from '@/utils/apiUtils';
import { getCoachingMetaInfoUrl } from './apiUrl/servicePage';
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

export interface ICoachingServiceMetaInfo {
  data: IServiceMetaData[];
  meta: IPageMeta;
}

export const getCoachingServiceMetaInfo = async (coachingId: string) => {
  const apiRes = await getFetch<ICoachingServiceMetaInfo>(getCoachingMetaInfoUrl(coachingId));
  return apiRes?.data;
};
