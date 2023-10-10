import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { IELTSPageComponent } from '@/components/IELTS';

// For IELTS

type CoachingPageProps = {
  params: {
    slug: string;
  };
};

export default async function ServicePage(props: CoachingPageProps) {
  console.log('slug:', props.params.slug[0]);
  const response = (await getServicePageContent(props.params.slug[0])) as IServicePageContent;

  return <IELTSPageComponent response={response} isBookAppointment={Boolean(props.params.slug[1])} />;
}
