import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { ServicePageComponent } from '@/components/ServicePage';

export default async function ServicePage() {
  const response = (await getServicePageContent(1)) as IServicePageContent;

  return <ServicePageComponent response={response} />;
}
