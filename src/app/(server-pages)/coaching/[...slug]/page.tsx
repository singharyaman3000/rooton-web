/* eslint-disable react/destructuring-assignment */

import { Metadata } from 'next';

import { ICoachingServicePageContent, getCoachingServicePageContent } from '@/app/services/apiService/coachingContentsAPI';
import { getCoachingServiceMetaInfo } from '@/app/services/apiService/coachingContentsAPIMetaInfo';
import { CoachingServicePageComponent } from '@/components/CoachingPage-Services';
import { BOOK_AN_APPOINTMENT_QUERY } from '@/constants/navigation';

type CoachingPageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [x: string]: string };
};

export async function generateMetadata(metaProps: CoachingPageProps): Promise<Metadata> {
  const res = await getCoachingServiceMetaInfo(metaProps.params.slug[0]);
  return {
    title: res[0]?.attributes.meta_title,
    description: res[0]?.attributes?.meta_description,
    alternates: { canonical: `https://rooton.ca/${res[0]?.attributes?.unique_identifier_name}` },
    robots: {
      index:  process.env.NEXT_APP_ENVIRONMENT === 'production',
    },
  };
}

export default async function CoachingServicePage(props: CoachingPageProps) {
  const response = (await getCoachingServicePageContent(props.params.slug[0])) as ICoachingServicePageContent;

  const scrollToForm = Boolean(props.searchParams && props.searchParams[BOOK_AN_APPOINTMENT_QUERY] === 'true');

  return <CoachingServicePageComponent response={response} isBookAppointment={scrollToForm} />;
}