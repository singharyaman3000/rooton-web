import { getFetch } from '@/utils/apiUtils';
import { HEADER_FOOTER_API } from './apiUrl/homePage';
import { IMediaUrlData } from './interfaces';
import { ILanguageData } from '@/components/Header/LanguageDropDown/FlagComponentWrapper';
import { ICoreServices } from '@/components/HomePage/ServicesListing/interafces';

export const CONTENT_TYPES = {
  WHATSAPP: 'whatsapp',
};

export interface ILanguages {
  data?: ILanguageData[] | null;
}

type OperatingHoursType = { day: string; workingHours: string };

export interface IAddressAttributes {
  name: string;
  location: string;
  phone_number: string;
  media_url: { data: IMediaUrlData };
  latitude: number;
  longitude: number;
  operating_hours: { operatingHours: OperatingHoursType[] };
}

export interface IAddressData {
  id: number;
  attributes: IAddressAttributes;
}

export interface IAddresses {
  data?: IAddressData[] | null;
}
export interface IProfileImageAttributes {
  name: string;
  url: string;
}
export interface IProfileImageData {
  id: number;
  attributes: IProfileImageAttributes;
}
export interface IProfileImage {
  data?: IProfileImageData[] | null;
}

export interface IWhatsAppAttributes {
  contactname: string;
  defaultmessage: string;
  welcomeText: string;
  whatsappnumber: string;
  status: string;
  unique_identifire_name: string;
  profile_image: IProfileImage;
}

export interface IWhatsAppData {
  id: number;
  attributes: IWhatsAppAttributes;
}

export interface IWhatsApp {
  data?: IWhatsAppData;
}

type SocialMediaTypes = 'facebook' | 'twitter' | 'linkedIn' | 'youTube' | 'instagram';

export type SocialMediaInterfaceType = {
  // eslint-disable-next-line no-unused-vars
  [key in SocialMediaTypes]: { url: string; logo: string; alternativeText: string };
};

interface IOrganizationData {
  addresses: { name: string; address: string; country: string; phoneNumber: string; postalCode: string }[];
  companyDescription: string;
  companyEmail: string;
  founderDetails: { name: string; gender: string; profileUrl: string };
  companyLogo: string;
  startedYear: string;
}

export interface ICountryInfo {
  name: string;
  [key: string]: string;
  currency: string;
  phoneCode: string;
}
export interface IOccupationInfo {
  occupation: string;
  [key: string]: string;
}

interface ILeadFormData {
  countryInfos: ICountryInfo[];
  occupationList: IOccupationInfo[];
}

interface IJsonContent {
  socialMediaIcons: SocialMediaInterfaceType[];
  organizationDetails: IOrganizationData;
  leadFormDatas: ILeadFormData;
}

export interface IAttributes {
  addresses: IAddresses;
  languages: ILanguages;
  core_services: ICoreServices;
  whats_app: IWhatsApp;
  json_content: IJsonContent;
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
  return apiRes.data;
};
