import { getFetch } from '@/utils/apiUtils';
import { getServiceAPIUrl } from './apiUrl/servicePage';

type IEligibility = {
  key: string;
  value: string;
  position: string;
};

export type ILeadForm = {
  type: 'form' | 'calendly';
  region: string;
  portalId: string;
  formId: string;
};

type IProcess = {
  key: string;
  value: string;
  position: string;
};

type ISubServiceJSONContent = {
  eligibility?: IEligibility[];
  process?: IProcess[];
  lead_forms?: ILeadForm[];
};

type ISubServiceAttributes = {
  title: string;
  description: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  json_content: ISubServiceJSONContent;
};

type ISubServicesContent = {
  id: number;
  attributes: ISubServiceAttributes;
};

type ISubServiceSContents = {
  data: ISubServicesContent[];
};

type IAttributes = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  CTA_text: string;
  CTA_link: string;
  sub_title: string;
  media_url: {
    data: null;
  };
  sub_services_contents: ISubServiceSContents;
};

type IServicePageContentResponse = {
  id: number;
  attributes: IAttributes;
};

export type IServicePageContent = {
  data: IServicePageContentResponse;
};

export const getServicePageContent = async (serviceId: number) => {
  try {
    const res = await getFetch<IServicePageContent>(getServiceAPIUrl(serviceId), { next: { revalidate: 10 } });
    return res;
  } catch (error) {
    return { error };
  }
};
