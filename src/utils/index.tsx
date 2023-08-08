import { IHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { IHomePageData } from '@/app/services/apiService/homeAPI';

export const getAssetUrl = (url = '') => {
  const basePath = process.env.NEXT_ASSETS_BASEURL;
  return url.startsWith('/') || url.startsWith(process.env.NEXT_ASSETS_BASEURL as string) ? url : basePath + url;
};

export const appendAssetUrl = (url: string) => (url ? process.env.NEXT_ASSETS_BASEURL + url : '');

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear().toString();

  return `${day}  ${month}  ${year}`;
};

export const isVideo = (url: string): boolean => url?.includes('video');

export const getSectionData = (data: IHomePageData, content_name: string) => {
  return data.attributes.home_page_contents.data?.find((contents) => {
    return contents.attributes.content_name === content_name;
  });
};

export const getDetraslatedURL = (url: string, lang: string) => {
  const modifiedUrl = url.replace(`/${lang}`, '');
  return process.env.NEXT_APP_BASE_URL + modifiedUrl;
};

export const getFlagUrl = (flagData: IHeaderFooterData | undefined, langcode = 'en') => {
  return flagData?.attributes.languages.data?.find(({ attributes }) => attributes.code === langcode);
};
