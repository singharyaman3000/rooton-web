import { getFetch } from '@/utils/apiUtils';
import { getToolsMetaInfoUrl } from './apiUrl/servicePage';
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

export interface IToolsServiceMetaInfo {
  data: IServiceMetaData[];
  meta: IPageMeta;
}

export const getToolsServiceMetaInfo = async (toolsId: string) => {
  const apiRes = await getFetch<IToolsServiceMetaInfo>(getToolsMetaInfoUrl(toolsId));
  return apiRes?.data;
};
