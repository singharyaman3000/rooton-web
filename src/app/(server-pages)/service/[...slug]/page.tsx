import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { ServicePageComponent } from '@/components/ServicePage';

type ServicePageProps = {
  params: {
    slug: string;
  },
}

export default async function ServicePage(props: ServicePageProps) {
  const response = (await getServicePageContent(props.params.slug[0])) as IServicePageContent;

  return <ServicePageComponent response={response} isBookAppointment={Boolean(props.params.slug[1])} />;
}
