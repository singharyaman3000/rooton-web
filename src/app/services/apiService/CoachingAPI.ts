import { getFetch } from '@/utils/apiUtils';
import { IHonesty, IJsonContent } from '@/components/CoachingPage/Honesty';
import { COACHING_API } from './apiUrl/homePage';
import { IMediaUrlData, MediaUrl } from './interfaces';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';
import { IChallenges } from '@/components/HomePage/ChallengesListing';
import { IFaqData } from '@/components/HomePage/FaqListings';
import { IBlogCard } from '@/components/HomePage/BlogListings';

export const CONTENT_TYPES = {
  SERVICES: 'coaching_services',
  CREDIBILITY: 'credibility',
  WHY_ROOT_ON: 'why_rooton_coaching',
  OUR_PROCESSES:'coaching_processes',
  BLOG: 'coaching_blogs',
  CHALLENGES: 'challenges',
  PARTNERSHIPS: 'partnerships',
  QUESTIONS: 'coaching_questions',
  LEAD_FORM: 'coaching-lead-form',
};

type TContentTypes = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

export type ILeadFormData = {
  type?: 'form' | 'meeting';
  region?: string;
  portalId?: string;
  formId?: string;
  url?: string;
};

export type ILeadForm = {
  lead_forms?: ILeadFormData[];
};

export interface Attributes2 {
  title: string;
  sub_title: string;
  description?: string | null;
  CTA_text?: string | null;
  CTA_link?: string | null;
  content_position: number;
  unique_identifier_name?: TContentTypes | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  json_content: IHonesty | IOurProcessData | IJsonContent | IChallenges | IFaqData | ILeadForm;
  blogs: IBlogCard;
  media_url: MediaUrl;
}
export interface DataEntity1 {
  id: number;
  attributes: Attributes2;
}
export interface CoachingPage_Contents {
  data?: DataEntity1[] | null;
}

export interface IAttributes {
  title: string;
  sub_title: string;
  CTA_text: string;
  CTA_link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  media_url: MediaUrl;
  coaching_page_contents: CoachingPage_Contents;
}

export interface ICoachingPage_Data {
  id: number;
  attributes: IAttributes;
}
export interface ICoachingPageDataRes {
  data: ICoachingPage_Data[];
  footers: {
    data: {
      attributes: {
        name: string;
        location: string;
        phone: string;
      };
      media_url: IMediaUrlData;
    }[];
  };
}

export const getCoachingPageContents = async () => {
  const apiRes = await getFetch<ICoachingPageDataRes>(COACHING_API, { next: { revalidate: 1200 } });
  return apiRes.data;
};
