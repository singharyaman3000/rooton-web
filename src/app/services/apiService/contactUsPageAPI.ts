import { getFetch } from '@/utils/apiUtils';
import { GET_CONTACT_US_CONTENTS } from './apiUrl/contactUsPage';
import { MediaUrl, IPageMeta, IMediaUrlData } from './interfaces';
import { IMeetingData } from './serviceAPI';

export type LeadFormType = [
  {
    formId: string;
    portalId: string;
    region: string;
    type: string;
  },
  {
    service: string;
    type: string;
    url: IMeetingData;
  },
];

interface IJSONContent {
  lead_forms: LeadFormType;
}

type ContactUsAttributesType = {
  CTA_icon: MediaUrl;
  CTA_link: string;
  CTA_text: string;
  createdAt: string;
  media_url: { data: IMediaUrlData };
  publishedAt: string;
  sub_title: string;
  title: string;
  title_description: string;
  updatedAt: string;
  json_content: IJSONContent;
  unique_identifier_name: string;
  description: string;
};

export interface IContactUsContents {
  data: { id: number; attributes: ContactUsAttributesType }[];
}

export interface ContactUsResponseData {
  id: number;
  attributes: ContactUsAttributesType & { contact_us_contents: IContactUsContents };
}

interface IContactUsContentResponse {
  data: ContactUsResponseData[];
  meta: IPageMeta;
}

export const getContactUsContents = async () => {
  const res = await getFetch<IContactUsContentResponse>(GET_CONTACT_US_CONTENTS, { next: { revalidate: 60 } });
  return res;
};
