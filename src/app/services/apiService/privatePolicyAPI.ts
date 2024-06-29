import { getFetch } from '@/utils/apiUtils';
import { getPrivatePolicyAPIUrl } from './apiUrl/privatePolicyPage';
import { IPageMeta, IMediaUrlData } from './interfaces';
import { IMeetingData } from './serviceAPI';

export type LeadFormType = [
  {
    formId: string;
    portalId: string;
    region: string;
    type: string;
  },
  {
    service: string;
    type: string;
    url: IMeetingData;
  },
];

type IPolicyData = {
  title: string;
  position: number;
  description: string;
}

export interface IJSONContent {
  Policy: IPolicyData[];
}

export type PrivatePolicyAttributesType = {
  createdAt: string;
  media_url: { data: IMediaUrlData[] };
  publishedAt: string;
  sub_title: string;
  title: string;
  title_description: string;
  updatedAt: string;
  json_content: IJSONContent[];
  unique_identifier_name: string;
  description: string;
};
export interface PrivatePolicyResponseData {
  id: number;
  attributes: PrivatePolicyAttributesType;
}

export interface IPrivatePolicyPageContent {
  data: PrivatePolicyResponseData;
  meta: IPageMeta;
}

export const getPolicyContents = async (privatePolicyId: string) => {
  try {
    const res = await getFetch<IPrivatePolicyPageContent>(getPrivatePolicyAPIUrl(privatePolicyId), {
      next: { revalidate: 86400 },
    });
    return res;
  } catch (error) {
    return { error };
  }
};
