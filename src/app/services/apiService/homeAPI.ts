import { getFetch } from '@/utils/apiUtils';
import { HOME_API } from './apiUrl/homePage';
import { ICoreServices } from '@/components/HomePage/ServicesListing/interafces';
import { IHonesty } from '@/components/HomePage/Honesty';
import { IOurProcess, IOurProcessData } from '@/components/HomePage/OurProcess';


export const CONTENT_TYPES = {
    SERVICES  : 'services',
    CREDIBILITY :'credibility',
    WHY_ROOT_ON :'why_rooton',
    OUR_PROCESSES : 'processes'
}

// { next: { revalidate: 1200 }


export const getHomePageContents = async () => {
  const apiRes = await getFetch<IHomePageData>(HOME_API );
  console.log(apiRes.data , "--------------------------")
  return apiRes.data
};





export interface IHomePageData {
    data: Data;
    meta: Meta;
  }
  export interface Data {
    id: number;
    attributes: IAttributes;
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
  export interface MediaUrl {
    data?: (DataEntity)[] | null;
  }
  export interface DataEntity {
    id: number;
    attributes: Attributes1;
  }
  export interface Attributes1 {
    name: string;
    alternativeText?: null;
    caption?: null;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: null;
    provider: string;
    provider_metadata?: null;
    createdAt: string;
    updatedAt: string;
  }
  export interface Formats {
    thumbnail: Thumbnail;
  }
  export interface Thumbnail {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path?: null;
    size: number;
    width: number;
    height: number;
  }
  export interface HomePageContents {
    data?: (DataEntity1)[] | null;
  }
  export interface DataEntity1 {
    id: number;
    attributes: Attributes2;
  }
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
    json_content: IHonesty | IOurProcessData;
    blogs: Blogs;
    core_services: ICoreServices;
    media_url: MediaUrl;
  }
//   export interface JsonContent {
//     why-rooton?: (Why-rootonEntityOrChallengesEntityOrProcessEntity)[] | null;
//     challenges?: (Why-rootonEntityOrChallengesEntityOrProcessEntity)[] | null;
//     process?: (Why-rootonEntityOrChallengesEntityOrProcessEntity)[] | null;
//   }
//   export interface Why-rootonEntityOrChallengesEntityOrProcessEntity {
//     key: string;
//     value: string;
//     position: number;
//   }
  export interface Blogs {
    data?: (DataEntity2 | null)[] | null;
  }
  export interface DataEntity2 {
    id: number;
    attributes: Attributes3;
  }
  export interface Attributes3 {
    title: string;
    counter: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description?: null;
    category?: null;
    service_type?: null;
    media_url: MediaUrl1;
  }
  export interface MediaUrl1 {
    data?: null;
  }
  export interface CoreServices {
    data?: (DataEntity3 | null)[] | null;
  }
  export interface DataEntity3 {
    id: number;
    attributes: Attributes4;
  }
  export interface Attributes4 {
    title: string;
    sub_title?: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sub_services: SubServices;
  }
  export interface SubServices {
    data?: (DataEntity4)[] | null;
  }
  export interface DataEntity4 {
    id: number;
    attributes: Attributes5;
  }
  export interface Attributes5 {
    title: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    CTA_text?: string | null;
    CTA_link?: string | null;
    sub_title?: string | null;
  }
  export interface Meta {
  }
  

  type TContentTypes = typeof CONTENT_TYPES[keyof typeof CONTENT_TYPES];