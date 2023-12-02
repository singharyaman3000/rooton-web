import { Metadata } from 'next';

import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { getServiceMetaInfo } from '@/app/services/apiService/serviceMetaInfo';
import { ServicePageComponent } from '@/components/ServicePage';
import { BOOK_AN_APPOINTMENT_QUERY } from '@/constants/navigation';

type ServicePageProps = {
  params: {
    slug: string[];
  };
  searchParams?: { [x: string]: string };
};

export async function generateMetadata(metaProps: ServicePageProps): Promise<Metadata> {
  const res = await getServiceMetaInfo(metaProps.params.slug[0]);
  return {
    title: res[0]?.attributes.meta_title,
    description: res[0]?.attributes?.meta_description,
    alternates: { canonical: `https://rooton.ca/service/${res[0]?.attributes?.unique_identifier_name}` },
  };
}

export default async function ServicePage(props: ServicePageProps) {
  const response = (await getServicePageContent(props.params.slug[0])) as IServicePageContent;

  const scrollToForm = Boolean(props.searchParams && props.searchParams[BOOK_AN_APPOINTMENT_QUERY] === 'true');

  return <ServicePageComponent response={response} isBookAppointment={scrollToForm} />;
}
