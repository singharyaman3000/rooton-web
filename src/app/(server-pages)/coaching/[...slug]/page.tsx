import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { CoachingPageComponent } from '@/components/CoachingPage';

type CoachingPageProps = {
  params: {
    slug: string;
  };
};

export default async function ServicePage(props: CoachingPageProps) {
  const response = (await getServicePageContent(props.params.slug[0])) as IServicePageContent;

  return <CoachingPageComponent response={response} isBookAppointment={Boolean(props.params.slug[1])} />;
}
