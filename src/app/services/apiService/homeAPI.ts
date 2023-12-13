import { getFetch } from '@/utils/apiUtils';
import { ICoreServices } from '@/components/HomePage/ServicesListing/interafces';
import { IHonesty, IJsonContent } from '@/components/HomePage/Honesty';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';
import { IBlogCard } from '@/components/HomePage/BlogListings';
import { IChallenges } from '@/components/HomePage/ChallengesListing';
import { IFaqData } from '@/components/HomePage/FaqListings';
import { HOME_API } from './apiUrl/homePage';
import { IMediaUrlData, MediaUrl } from './interfaces';

export const CONTENT_TYPES = {
  SERVICES: 'services',
  CREDIBILITY: 'credibility',
  WHY_ROOT_ON: 'why_rooton',
  OUR_PROCESSES: 'processes',
  BLOG: 'blogs',
  CHALLENGES: 'challenges',
  PARTNERSHIPS: 'partnerships',
  QUESTIONS: 'questions',
  BLOGS: 'blogs',
  TESTIMONIALS: 'testimonials',
  APPOINTMENT: 'appointment',
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
export interface HomePageContents {
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
  home_page_contents: HomePageContents;
}

export interface IHomePageData {
  id: number;
  attributes: IAttributes;
}
export interface IHomePageDataRes {
  data: IHomePageData[];
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

export const getHomePageContents = async () => {
  const apiRes = await getFetch<IHomePageDataRes>(HOME_API, { next: { revalidate: 1200 } });
  return apiRes.data;
};
