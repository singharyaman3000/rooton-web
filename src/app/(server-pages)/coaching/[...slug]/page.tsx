import { ICoachingServicePageContent, getCoachingServicePageContent } from '@/app/services/apiService/coaching_contentsAPI';
import { CoachingServicePageComponent } from '@/components/IELTS';

// For IELTS

type CoachingPageProps = {
  params: {
    slug: string;
  };
};

export default async function CoachingServicePage(props: CoachingPageProps) {
  console.log('slug:', props.params.slug[0]);
  const response = (await getCoachingServicePageContent(props.params.slug[0])) as ICoachingServicePageContent;

  return <CoachingServicePageComponent response={response} isBookAppointment={Boolean(props.params.slug[1])} />;
}
