/* eslint-disable react/destructuring-assignment */

import { Metadata } from 'next';
import { getPolicyContents,IPrivatePolicyPageContent } from '@/app/services/apiService/privatePolicyAPI';
import PrivatePolicy from '@/components/PrivatePolicyPage';
import { getPolicyMetaInfo } from '@/app/services/apiService/policyMetaInfo';

type PrivatePolicyPageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [x: string]: string };
};

export async function generateMetadata(metaProps: PrivatePolicyPageProps): Promise<Metadata> {
  const res = await getPolicyMetaInfo(metaProps.params.slug[0]);
  return {
    title: res[0]?.attributes.meta_title,
    description: res[0]?.attributes?.meta_description,
    alternates: { canonical: `https://rooton.ca/policy/${res[0]?.attributes?.unique_identifier_name}` },
    robots: {
      index: process.env.NEXT_APP_ENVIRONMENT === 'production',
    },
  };
}

export default async function PrivatePolicyPage(props: PrivatePolicyPageProps) {
  const response = (await getPolicyContents(props.params.slug[0])) as IPrivatePolicyPageContent;

  return <PrivatePolicy response={response}/>;
}

