import { IHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { IHomePageData } from '@/app/services/apiService/homeAPI';
import { ICoachingPage_Data } from '@/app/services/apiService/CoachingAPI';

export const getAssetUrl = (url = '') => {
  const basePath = process.env.NEXT_ASSETS_BASEURL;
  return url.startsWith('/') || url.startsWith(process.env.NEXT_ASSETS_BASEURL as string) ? url : basePath + url;
};

export const appendAssetUrl = (url: string) => {return url ? process.env.NEXT_ASSETS_BASEURL + url : '';};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear().toString();

  return `${day}  ${month}  ${year}`;
};

export const isVideo = (url: string): boolean => {return url?.includes('video');};

export const getSectionData = (data: IHomePageData, unique_identifier_name: string) => {
  return data.attributes.home_page_contents.data?.find((contents) => {
    return contents.attributes.unique_identifier_name === unique_identifier_name;
  });
};

export const getSectionData1 = (data: ICoachingPage_Data, unique_identifier_name: string) => {
  return data.attributes.coaching_page_contents.data?.find((contents) => {
    return contents.attributes.unique_identifier_name === unique_identifier_name;
  });
};

export const getDetraslatedURL = (url: string, lang: string) => {
  const modifiedUrl = url.replace(`/${lang}`, '');
  return process.env.NEXT_APP_BASE_URL + (modifiedUrl.startsWith('/') ? modifiedUrl.replace('/',''):modifiedUrl) ;
};

export const getFlagUrl = (flagData: IHeaderFooterData[] | undefined, langcode = 'en') => {
  return flagData && flagData[0]?.attributes.languages.data?.find(({ attributes }) => {return attributes.code === langcode;});
};

export const scrollIntoView = (id:string) => {
  const element = document?.getElementById(id);
  if(element){
    element?.scrollIntoView();
  }
};

export const getTranslatedURL = (url: string, lang?: string) => {
  if (lang) {
    return `${lang}${url.startsWith('/') ? url : `/${url}`}`;
  }
  return url;
};

export const getServicePageURL = (id: string | number) => {return `/service/${id}`;};

export const convertToHtmlId = (input: string) => {
  let id = input.toLowerCase();
  id = id.replace(/\s+/g, '-'); // replace spaces with hyphens
  id = id.replace(/[^a-z0-9-]/g, ''); // remove special characters except hyphen
  return id;
};
