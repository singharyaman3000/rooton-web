import { getFetch } from '@/utils/apiUtils';
import { HEADER_FOOTER_API } from './apiUrl/homePage';
import { IMediaUrlData } from './interfaces';
import { ILanguageData } from '@/components/Header/LanguageDropDown/FlagComponentWrapper';
import { ICoreServices } from '@/components/HomePage/ServicesListing/interafces';

export interface ILanguages {
  data?: ILanguageData[] | null;
}

export interface IAddressAttributes {
  name: string;
  location: string;
  phone_number: string;
  media_url: { data: IMediaUrlData };
}

export interface IAddressData {
  id: number;
  attributes: IAddressAttributes;
}

export interface IAddresses {
  data?: IAddressData[] | null;
}
export interface IAttributes {
  addresses: IAddresses;
  languages: ILanguages;
  core_services: ICoreServices;
}
export interface IHeaderFooterData {
  id: number;
  attributes: IAttributes;
}
export interface IHeaderFooterRes {
  data: IHeaderFooterData[];
}

export const getHeaderFooterData = async () => {
  const apiRes = await getFetch<IHeaderFooterRes>(HEADER_FOOTER_API, { next: { revalidate: 1200 } });
  console.log(apiRes);
  return apiRes.data;
};
