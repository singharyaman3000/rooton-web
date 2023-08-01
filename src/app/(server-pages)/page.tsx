import Credibility from '@/components/HomePage/Credibility';
import BlogListings from '@/components/HomePage/BlogListings';
import Honesty, { IJsonContent } from '@/components/HomePage/Honesty';
import PartnerShip from '@/components/HomePage/Partnership';
import ServicesListing from '@/components/HomePage/ServicesListing';
import OurProcess from '@/components/HomePage/OurProcess';
import RootOnBanner from '@/components/HomePage/RootOnBanner';
import { appendAssetUrl } from '@/utils';
import RootOnBarBtn from '@/components/HomePage/RootOnBanner/RootOnBarBtn';
import FlightIcon from '@/components/Icons/FlightIcon';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';
import Testimonials from '@/components/HomePage/Testimonials';
import ChallengesListing, { IChallenges } from '@/components/HomePage/IChallengesListing';
import { Metadata } from 'next';
import { CONTENT_TYPES, getHomePageContents } from '../services/apiService/homeAPI';
import NewsLetter from '@/components/HomePage/NewsLetter';

export const metadata: Metadata = {
  title: 'ROOT ON',
  description: 'Root On',
  openGraph: {
    url: `${process.env.NEXT_APP_BASE_URL}`,
    title: 'Root On',
    images: `${process.env.NEXT_APP_BASE_URL}/images/og-image.png`,
    description: 'What seems impossible to others has been made possible by Root On.',
    type: 'article',
  },
  twitter: {
    title: 'ROOT ON',
    description: 'Root On',
    card: 'summary_large_image',
  },
};

export default async function Home() {
  const apiRes = await getHomePageContents();
  const getComponents = () => {
    return apiRes?.attributes?.home_page_contents?.data?.map((contents) => {
      const { title, sub_title, description } = contents.attributes;
      switch (contents.attributes.content_name) {
      case CONTENT_TYPES.SERVICES:
        return (
          <ServicesListing
            title={title}
            sub_title={sub_title}
            core_services={contents.attributes.core_services || []}
          />
        );
      case CONTENT_TYPES.CREDIBILITY:
        return (
          <Credibility
            description={description ?? ''}
            title={title}
            sub_title={sub_title}
            media_url={contents.attributes.media_url}
          />
        );
      case CONTENT_TYPES.WHY_ROOT_ON:
        return (
          <Honesty
            title={title}
            description={description ?? ''}
            sub_title={sub_title}
            json_content={contents.attributes.json_content as IJsonContent}
          />
        );
      case CONTENT_TYPES.OUR_PROCESSES:
        return (
          <OurProcess
            title={title}
            sub_title={sub_title}
            json_content={contents.attributes.json_content as IOurProcessData}
          />
        );
      case CONTENT_TYPES.BLOG:
        return <BlogListings blogs={contents.attributes.blogs} title={title} sub_title={sub_title} />;
      case CONTENT_TYPES.CHALLENGES:
        return (
          <ChallengesListing
            description={description ?? ''}
            sub_title={sub_title}
            title={title}
            json_content={contents.attributes.json_content as IChallenges}
            media_url={contents.attributes.media_url}
          />
        );
      case CONTENT_TYPES.PARTNERSHIPS:
        return <PartnerShip sub_title={sub_title} title={title} data={contents.attributes.media_url.data} />;
      default:
        return null;
      }
    });
  };

  return (
    <>
      <RootOnBanner
        backgroundImageUrl={appendAssetUrl(apiRes?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={apiRes?.attributes?.title}
        description={apiRes?.attributes?.sub_title}
        button={
          <RootOnBarBtn
            icon={<FlightIcon />}
            label={apiRes?.attributes?.CTA_text}
            url={apiRes?.attributes?.CTA_link}
            arialLabel={apiRes?.attributes?.CTA_link}
          />
        }
      />
      {getComponents()}
      <Testimonials />
      <NewsLetter/>
    </>
  );
}
