import { MediaUrl } from '@/app/services/apiService/interfaces';

export interface ITitleAttributes {
  title: string;
  sub_title: string;
  CTA_text?: string;
  CTA_link?: string;
  description?: string;
}

export interface ISubServiceAttribute {
  title: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  CTA_text?: string | null;
  CTA_link?: string | null;
  sub_title?: string | null;
  unique_identifier_name?: string;
}

export interface ISubServiceData {
  id: number;
  attributes: ISubServiceAttribute;
}

export interface ISubServices {
  data?: ISubServiceData[] | null;
}

export interface IAttributes {
  title: string;
  sub_title?: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sub_services: ISubServices;
  media_url: MediaUrl;
}
export interface IServiceData {
  id: number;
  attributes: IAttributes;
}
export interface ICoreServices {
  data?: IServiceData[] | null;
}
export interface IService extends ITitleAttributes {
  core_services: ICoreServices;
}
