import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { getServiceMetaInfo } from '@/app/services/apiService/serviceMetaInfo';
import { ServicePageComponent } from '@/components/ServicePage';
import { Metadata } from 'next';

type ServicePageProps = {
  params: {
    slug: string;
  };
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

  return <ServicePageComponent response={response} isBookAppointment={Boolean(props.params.slug[1])} />;
}
