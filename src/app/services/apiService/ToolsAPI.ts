import { getFetch } from '@/utils/apiUtils';
import { IHonesty, IJsonContent } from '@/components/ToolsPage/Honesty';
import { TOOLS_API } from './apiUrl/homePage';
import { IMediaUrlData, MediaUrl } from './interfaces';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';
import { IChallenges } from '@/components/HomePage/ChallengesListing';
import { IFaqData } from '@/components/HomePage/FaqListings';
import { IBlogCard } from '@/components/HomePage/BlogListings';

export const CONTENT_TYPES = {
  SERVICES: 'coaching_services',
  WHY_ROOT_ON: 'why_rooton_tools',
  OUR_PROCESSES:'tools_processes',
  CHALLENGES: 'challenges',
  PARTNERSHIPS: 'partnerships',
  QUESTIONS: 'tools_questions',
};

type TContentTypes = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

export interface ToolsPage_Contents_Attributes {
  title: string;
  sub_title: string;
  description?: string | null;
  CTA_text?: string | null;
  CTA_link?: string | null;
  content_position: number;
  unique_identifier_name?: TContentTypes | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  json_content: IHonesty | IOurProcessData | IJsonContent | IChallenges | IFaqData;
  blogs: IBlogCard;
  media_url: MediaUrl;
}
export interface ToolsPage_Contents_data {
  id: number;
  attributes: ToolsPage_Contents_Attributes;
}
export interface ToolsPage_Contents {
  data?: ToolsPage_Contents_data[] | null;
}

export interface IAttributes {
  title: string;
  sub_title: string;
  CTA_text: string;
  CTA_link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  media_url: MediaUrl;
  tools_page_contents: ToolsPage_Contents;
}

export interface IToolsPage_Data {
  id: number;
  attributes: IAttributes;
}
export interface IToolsPageDataRes {
  data: IToolsPage_Data[];
  footers: {
    data: {
      attributes: {
        name: string;
        location: string;
        phone: string;
      };
      media_url: IMediaUrlData;
    }[];
  };
}

export const getToolsPageContents = async () => {
  const apiRes = await getFetch<IToolsPageDataRes>(TOOLS_API, { next: { revalidate: 1200 } });
  return apiRes.data;
};

interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: Array<{ value: string; label: string }>;
}

interface Builder {
  title: string;
  fields: FormField[];
}

export interface FormSection{
  prompt: string;
  builder: Builder[];
  userPrompt: string;
  builderTitle: string;
  builderSubTitle: string;
}
export interface FormProps {
  // eslint-disable-next-line no-unused-vars
  onFormSubmit: (formData: Record<string, string>) => void;
  formFields: FormSection[];
}