import { getFetch } from '@/utils/apiUtils';
import { HEADER_FOOTER_API } from './apiUrl/homePage';
import { IMediaUrlData, MediaUrl } from './interfaces';
import { ILanguageData } from '@/components/Header/LanguageDropDown/FlagComponentWrapper';

export interface IHeaderFooterRes {
  data: IHeaderFooterData;
}
export interface IHeaderFooterData {
  id: number;
  attributes: Attributes;
}
export interface Attributes {
  addresses: Addresses;
  languages: Languages;
}
export interface Addresses {
  data?: DataEntity[] | null;
}
export interface DataEntity {
  id: number;
  attributes: Attributes1;
}
export interface Attributes1 {
  name: string;
  location: string;
  phone_number: string;
  media_url: {data:IMediaUrlData};
}

export interface Languages {
  data?: ILanguageData[] | null;
}

export const getHeaderFooterData = async () => {
  const apiRes = await getFetch<IHeaderFooterRes>(HEADER_FOOTER_API, { next: { revalidate: 1200 } });
  return apiRes.data;
};
