import { getFetch } from '@/utils/apiUtils';
import { getServiceAPIUrl } from './apiUrl/servicePage';
import { IMediaUrlData } from './interfaces';
import { IBlogCardData } from '@/components/UIElements/Cards/BlogCard';
import { IProcess } from '@/components/HomePage/OurProcess/interfaces';
import { TrainingType, pricingPlansDetails } from './coachingContentsAPI';

type IEligibility = {
  key: string;
  title: string;
  position: string;
  description: string | string[];
};

export type IMeetingData = {
  free?: string;
  paid?: string;
}

export type ILeadForm = {
  type?: 'form' | 'meeting';
  region?: string;
  portalId?: string;
  formId?: string;
  url?: IMeetingData;
  isHubSpotForm: boolean;
};

export type IFaq = {
  title: string;
  position: number;
  description: string;
};

export type ISubServiceJSONContent = {
  eligibility?: IEligibility[];
  process?: IProcess[];
  lead_forms?: ILeadForm[];
  faq?: IFaq[];
  trainingDetails?: {
    [key: string]: TrainingType[];
  };
  pricingDetails: {
    [key: string]: pricingPlansDetails[];
  };
};

type ISubServiceAttributes = {
  title: string;
  description: string;
  position: number;
  unique_identifier_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  json_content: ISubServiceJSONContent;
};

export type ISubServicesContent = {
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
  unique_identifier_name: string;
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
    const res = await getFetch<IServicePageContent>(getServiceAPIUrl(serviceId), { cache: 'no-store' });
    return res;
  } catch (error) {
    return { error };
  }
};
