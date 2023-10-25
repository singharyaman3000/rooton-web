import { getFetch } from '@/utils/apiUtils';
import { ICoreServices } from '@/components/CoachingPage/ServicesListing/interafces';
import { IHonesty, IJsonContent } from '@/components/CoachingPage/Honesty';
import { IOurProcessData } from '@/components/CoachingPage/OurProcess/interfaces';
import { IBlogCard } from '@/components/CoachingPage/BlogListings';
import { IChallenges } from '@/components/CoachingPage/ChallengesListing';
import { IFaqData } from '@/components/CoachingPage/FaqListings';
import { COACHING_API } from './apiUrl/homePage';
import { IMediaUrlData, MediaUrl } from './interfaces';

export const CONTENT_TYPES = {
  SERVICES: 'coaching_services',
  CREDIBILITY: 'credibility',
  WHY_ROOT_ON: 'why_rooton_coaching',
  OUR_PROCESSES: 'coaching_processes', 
  BLOG: 'blogs',
  CHALLENGES: 'challenges',
  PARTNERSHIPS: 'partnerships',
  QUESTIONS: 'coaching_questions',
};

type TContentTypes = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

export interface Attributes2 {
  title: string;
  sub_title: string;
  description?: string | null;
  CTA_text?: null;
  CTA_link?: null;
  content_position: number;
  unique_identifier_name?: TContentTypes | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  json_content: IHonesty | IOurProcessData | IJsonContent | IChallenges | IFaqData;
  blogs: IBlogCard;
  core_services: ICoreServices;
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
