// export interface IService {
//   service: string;
//   icon: string;
//   sub_services: [];
// }
// export interface IServiceData {
//   serviceData: IService[];
// }

export interface ITitleAttributes {
  title: string;
  sub_title: string;
  CTA_text?:string;
  CTA_link? :string;
  description?:string;
}

export interface IService extends ITitleAttributes {
  core_services: ICoreServices;
}
export interface ICoreServices {
  data?: IServiceData[] | null;
}
export interface IServiceData {
  id: number;
  attributes: IAttributes;
}
export interface IAttributes {
  title: string;
  sub_title?: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sub_services: ISubServices;
}
export interface ISubServices {
  data?: ISubServiceData[] | null;
}
export interface ISubServiceData {
  id: number;
  attributes: ISubServiceAttribute;
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
}
