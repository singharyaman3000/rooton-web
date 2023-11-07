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
  title: string | any;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  CTA_text?: string | null;
  CTA_link?: string | null;
  sub_title?: string | null;
}

export interface IServiceData {
  id: number;
  attributes: IAttributes;
}

export interface ICoachingServices {
  data?: IServiceData[] | null;
}

export interface IService extends ITitleAttributes {
  coaching_services: ICoachingServices
}

