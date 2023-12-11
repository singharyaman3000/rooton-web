import { IHeaderFooterData } from '@/app/services/apiService/headerFooterAPI';
import { IHomePageData } from '@/app/services/apiService/homeAPI';
import { ICoachingPage_Data } from '@/app/services/apiService/CoachingAPI';

export const getAssetUrl = (url = '') => {
  const basePath = process.env.NEXT_ASSETS_BASEURL;
  return url.startsWith('/') || url.startsWith(process.env.NEXT_ASSETS_BASEURL as string) ? url : basePath + url;
};

export const appendAssetUrl = (url: string) => { return url ? process.env.NEXT_ASSETS_BASEURL + url : ''; };

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear().toString();

  return `${day}  ${month}  ${year}`;
};

export const isVideo = (url: string): boolean => { return url?.includes('video'); };

export const getSectionData = (data: IHomePageData, unique_identifier_name: string) => {
  return data.attributes.home_page_contents.data?.find((contents) => {
    return contents.attributes.unique_identifier_name === unique_identifier_name;
  });
};

export const getSectionCoachingData = (data: ICoachingPage_Data, unique_identifier_name: string) => {
  return data.attributes.coaching_page_contents.data?.find((contents) => {
    return contents.attributes.unique_identifier_name === unique_identifier_name;
  });
};

export const getDetraslatedURL = (url: string, lang: string) => {
  const modifiedUrl = url.replace(`/${lang}`, '');
  return process.env.NEXT_APP_BASE_URL + (modifiedUrl.startsWith('/') ? modifiedUrl.replace('/', '') : modifiedUrl);
};

export const getFlagUrl = (flagData: IHeaderFooterData[] | undefined, langcode = 'en') => {
  return flagData && flagData[0]?.attributes.languages.data?.find(({ attributes }) => { return attributes.code === langcode; });
};

export const scrollIntoView = (id: string) => {
  const element = document?.getElementById(id);
  if (element) {
    element?.scrollIntoView();
  }
};

export const getTranslatedURL = (url: string, lang?: string) => {
  if (lang) {
    return `${lang}${url.startsWith('/') ? url : `/${url}`}`;
  }
  return url;
};

export const getServicePageURL = (id: string | number) => { return `/service/${id}`; };

export const convertToHtmlId = (input: string) => {
  let id = input.toLowerCase();
  id = id.replace(/\s+/g, '-'); // replace spaces with hyphens
  id = id.replace(/[^a-z0-9-]/g, ''); // remove special characters except hyphen
  return id;
};

export const convertFormDataToArray = (formData: Record<string,string>) => {
  return Object.entries(formData).map(([name, value]) => {
    return {
      name,
      value,
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertFormDataToArray1 = (formData: { [x: string]: any; }) => {
  return Object.keys(formData).map((key) => {
    if (Array.isArray(formData[key])) {
      return { name: key, value: formData[key].join(', ') };
    }
    return { name: key, value: formData[key] };

  });
};

export const addIndexToKeys = (data: Record<string, string>[]): Record<string, string> => {
  const outputObject: Record<string, string> = {};
  data.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      outputObject[`${key}_${index + 1}`] = item[key];
    });
  });
  return outputObject;
};

export const truncateText = (text: string, limit: number = 150) => {
  if (text.length > limit) {
    const truncatedText = text.slice(0, limit);
    return `${truncatedText}...`;
  }
  return text;
};
