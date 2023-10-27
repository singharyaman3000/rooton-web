import { MediaUrl } from '@/app/services/apiService/interfaces';

export interface ITitleAttributes {
  title: string;
  sub_title: string;
  CTA_text?: string;
  CTA_link?: string;
  description?: string;
}

export interface Iwhy_rooton {
  id: string;
  key?: string;
  icon?: string | null;
  position?: string | null;
}

export interface IHonesty {
  [key: string]: Iwhy_rooton[];
}

export interface IAttributes {
  title: string;
  sub_title: string;
  description?: string | null;
  CTA_text?: null;
  CTA_link?: null;
  content_position: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  json_content: IHonesty;
  media_url: MediaUrl;
}
export interface IServiceData {
  id: number;
  attributes: IAttributes;
}
export interface CoachingPage_Contents {
  data?: IServiceData[] | null;
}
export interface IService extends ITitleAttributes {
  coaching_page_contents: CoachingPage_Contents;
}
