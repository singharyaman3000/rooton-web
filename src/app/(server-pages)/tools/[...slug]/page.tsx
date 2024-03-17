/* eslint-disable react/destructuring-assignment */

import { Metadata } from 'next';
import { ToolsServicePageComponent } from '@/components/ToolsPage-Services';
import { IToolServicePageContent, getToolServicePageContent } from '@/app/services/apiService/toolsContentsAPI';
import { getToolsServiceMetaInfo } from '@/app/services/apiService/toolsContentsAPIMetaInfo';

type ToolsPageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [x: string]: string };
};

export async function generateMetadata(metaProps: ToolsPageProps): Promise<Metadata> {
  const res = await getToolsServiceMetaInfo(metaProps.params.slug[0]);
  return {
    title: res[0]?.attributes.meta_title,
    description: res[0]?.attributes?.meta_description,
    alternates: { canonical: `https://rooton.ca/${res[0]?.attributes?.unique_identifier_name}` },
    robots: {
      index:  process.env.NEXT_APP_ENVIRONMENT === 'production',
    },
  };
}

export default async function ToolsServicePage(props: ToolsPageProps) {
  const response = (await getToolServicePageContent(props.params.slug[0])) as IToolServicePageContent;

  return <ToolsServicePageComponent response={response} />;
}