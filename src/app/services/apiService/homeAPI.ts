import { getFetch } from '@/utils/apiUtils';
import { ICoreServices } from '@/components/HomePage/ServicesListing/interafces';
import { IHonesty, IJsonContent } from '@/components/HomePage/Honesty';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';
import { IBlogCard } from '@/components/HomePage/BlogListings';
import { IChallenges } from '@/components/HomePage/IChallengesListing';
import { HOME_API } from './apiUrl/homePage';
import { IMediaUrlData, MediaUrl } from './interfaces';

export const CONTENT_TYPES = {
  SERVICES: 'services',
  CREDIBILITY: 'credibility',
  WHY_ROOT_ON: 'why_rooton',
  OUR_PROCESSES: 'processes',
  BLOG: 'blogs',
  CHALLENGES: 'challenges',
};

type TContentTypes = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

export interface Attributes2 {
  title: string;
  sub_title: string;
  description?: string | null;
  CTA_text?: null;
  CTA_link?: null;
  content_position: number;
  content_name?: TContentTypes | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  json_content: IHonesty | IOurProcessData | IJsonContent | IChallenges;
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

export interface Data {
  id: number;
  attributes: IAttributes;
}
export interface IHomePageData {
  data: Data;
  footers :{data:{
    attributes :{
      name:string;
      location:string;
      phone : string;
    }
    media_url:IMediaUrlData
  }[]}
  // meta: Meta;
}

export const getHomePageContents = async () => {
  const apiRes = await getFetch<IHomePageData>(HOME_API, { next: { revalidate: 1200 } });
  return apiRes.data;
};

// export interface MediaUrl {
//   data?: (DataEntity)[] | null;
// }
// export interface DataEntity {
//   id: number;
//   attributes: Attributes1;
// }
// export interface Attributes1 {
//   name: string;
//   alternativeText?: null;
//   caption?: null;
//   width: number;
//   height: number;
//   formats: Formats;
//   hash: string;
//   ext: string;
//   mime: string;
//   size: number;
//   url: string;
//   previewUrl?: null;
//   provider: string;
//   provider_metadata?: null;
//   createdAt: string;
//   updatedAt: string;
// }
// export interface Formats {
//   thumbnail: Thumbnail;
// }
// export interface Thumbnail {
//   ext: string;
//   url: string;
//   hash: string;
//   mime: string;
//   name: string;
//   path?: null;
//   size: number;
//   width: number;
//   height: number;
// }
