import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { CoachingPageComponent } from '@/components/CoachingPage';

type CoachingPageProps = {
  params: {
    slug: string;
  };
};

export default async function ServicePage(props: CoachingPageProps) {
  const response = (await getServicePageContent("26")) as IServicePageContent;

  return <CoachingPageComponent response={response} isBookAppointment={Boolean("26")} />;
}
