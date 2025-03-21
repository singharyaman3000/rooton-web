import { getFetch } from '@/utils/apiUtils';
import { getToolsAPIUrl } from './apiUrl/servicePage';
import { IMediaUrlData } from './interfaces';
import { IBlogCardData } from '@/components/UIElements/Cards/BlogCard';
import { IProcess } from '@/components/HomePage/OurProcess/interfaces';

type IEligibility = {
  key: string;
  title: string;
  position: string;
  description: string | string[];
};

export type ILeadForm = {
  type?: 'form' | 'meeting';
  region?: string;
  portalId?: string;
  formId?: string;
  url?: string;
};

export type IFaq = {
  title: string;
  position: number;
  description: string;
};

type TrainingType = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  image: string;
  json_content: {
    trainingDetails: {};
  };
};

export type pricingPlansDetails = {
  planName?: string;
  price: number;
  yearly: boolean;
  popular?: boolean;
  features: string[][];
  validity: string;
  planDescription: string;
  lead_forms?: ILeadForm[];
  url: string;
  ctapurchase: string;
}

export type pricingPlans = {
  pricingPlans: pricingPlansDetails[];
}

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

export type IToolsServicesContent = {
  id: number;
  attributes: ISubServiceAttributes;
};

type IToolsServiceSContents = {
  data: IToolsServicesContent[];
};

// Pricing

export type IpricingDetails = {
  pricingDetails: pricingPlans[];
}

export type IPricing = {
  title: string;
  description: string | null;
  position: number;
  json_content: IpricingDetails;
};

type ITrainingDetail = {
  title: string;
  position: number;
  description: string;
  image: string;
};

export type ITraining = {
  title: string;
  description: string | null;
  position: number;
  image: string;
  json_content: {
    trainingDetails: {
      [key: string]: ITrainingDetail[];
    };
  };
};

type IAttributes = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  CTA_Text: string;
  CTA_link: string;
  sub_title: string;
  unique_identifier_name: string;
  media_url: {
    data: IMediaUrlData[];
  };
  tools_contents: IToolsServiceSContents;
  training: ITraining;
  our_plans: IPricing;
  blogs: {
    data: IBlogCardData[]
  };
};

export type IToolServicePageContentResponse = {
  id: number;
  attributes: IAttributes;
};

export type IToolServicePageContent = {
  data: IToolServicePageContentResponse;
};

export const getToolServicePageContent = async (toolsId: string) => {
  try {
    const res = await getFetch<IToolServicePageContent>
    (getToolsAPIUrl(toolsId), { next: { revalidate: 10 } });
    return res;
  } catch (error) {
    return { error };
  }
};
