import { getFetch } from '@/utils/apiUtils';
import { getBlogDetailsUrl } from './apiUrl/blogDetails';
import { IMediaUrlData, IPageMeta, MediaUrl } from './interfaces';

interface IBlogContentAttributes {
  CTA_link: string;
  CTA_test: string;
  body_content: string;
  createdAt: string;
  description: string;
  json_content: string;
  media_url: MediaUrl;
  position: number;
  publishedAt: string;
  sub_title: string;
  title: string;
  unique_identifier_name: string;
  updatedAt: string;
}

export interface IBlogContentData {
  id: number;
  attributes: IBlogContentAttributes;
}

interface IBlogContents {
  data: Array<IBlogContentData>;
}

interface ISubService {
  data: {
    id: number;
    attributes: {
      CTA_text: string;
      CTA_link: string;
      createdAt: string;
      description: string;
      publishedAt: string;
      sub_title: string;
      title: string;
      unique_identifier_name: string;
      updatedAt: string;
    };
  };
}

interface IBlogAttributes {
  author: string;
  category: string;
  createdAt: string;
  description: string;
  publishedAt: string;
  service_type: string;
  sub_title: string;
  title: string;
  updatedAt: string;
  views: string;
  author_profile_image: { data: IMediaUrlData };
  media_url: MediaUrl;
  blog_contents: IBlogContents;
  sub_service: ISubService;
  word_count: number;
}

export interface IBlogDetails {
  id: number;
  attributes: IBlogAttributes;
}

export interface IBlogDetailsResponse {
  data: IBlogDetails[];
  meta: IPageMeta;
}

export const getBlogDetails = async (blogId: string) => {
  const res = await getFetch<IBlogDetailsResponse>(getBlogDetailsUrl(blogId), { next: { revalidate: 60 } });
  return res;
};
