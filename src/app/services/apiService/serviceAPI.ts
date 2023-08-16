import { getFetch } from '@/utils/apiUtils';
import { getServiceAPIUrl } from './apiUrl/servicePage';
import { IMediaUrlData } from './interfaces';
import { IBlogCardData } from '@/components/UIElements/Cards/BlogCard';

type IEligibility = {
  key: string;
  value: string;
  position: string;
};

export type ILeadForm = {
  type?: 'form' | 'calendly';
  region?: string;
  portalId?: string;
  formId?: string;
  url?: string;
};

type IProcess = {
  key: string;
  value: string;
  position: string;
};

type IFaq = {
  title: string;
  position: number;
  description: string;
};

type ISubServiceJSONContent = {
  eligibility?: IEligibility[];
  process?: IProcess[];
  lead_forms?: ILeadForm[];
  faq?: IFaq[];
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
    data: IMediaUrlData[];
  };
  sub_services_contents: ISubServiceSContents;
  blogs: { data: IBlogCardData[] };
};

type IServicePageContentResponse = {
  id: number;
  attributes: IAttributes;
};

export type IServicePageContent = {
  data: IServicePageContentResponse;
};

export const getServicePageContent = async (serviceId: string) => {
  try {
    const res = await getFetch<IServicePageContent>(getServiceAPIUrl(serviceId), { next: { revalidate: 10 } });
    return res;
  } catch (error) {
    return { error };
  }
};
