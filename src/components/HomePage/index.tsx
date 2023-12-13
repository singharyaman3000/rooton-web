'use client';

import React, { useEffect } from 'react';
import Credibility from '@/components/HomePage/Credibility';
import Honesty, { IJsonContent } from '@/components/HomePage/Honesty';
import PartnerShip from '@/components/HomePage/Partnership';
import ServicesListing from '@/components/HomePage/ServicesListing';
import OurProcess from '@/components/HomePage/OurProcess';
import { Attributes2, CONTENT_TYPES, IHomePageData } from '@/app/services/apiService/homeAPI';
import { appendAssetUrl, isVideo, scrollIntoView } from '@/utils';
import ChallengesListing, { IChallenges } from './ChallengesListing';
import { IOurProcessData } from './OurProcess/interfaces';
import RootOnBanner from './RootOnBanner';
import RootOnBarBtn from './RootOnBanner/RootOnBarBtn';
import FlightIcon from '../Icons/FlightIcon';
import NewsLetter from './NewsLetter';
import Testimonials from './Testimonials';
import FaqListing, { IFaqData } from './FaqListings';
import BookAnAppointmentSection from './BookAppointment';
import { TESTIMONIAL_TITLE } from '@/app/constants/textConstants';
import BlogSection from '../ServicePage/PageSections/BlogSection';
import { TESTIMONIAL_API } from '@/app/services/apiService/apiUrl/homePage';
import { SOURCE_PAGE } from '../BlogsListPage/constants';
import { useSearchParams } from 'next/navigation';

const HomePage = ({ homePageConfig }: { homePageConfig: IHomePageData }) => {
  const homePageContents = homePageConfig?.attributes?.home_page_contents ?? [];

  const sortedContents = homePageContents?.data?.sort((a, b) => {
    return a.attributes.content_position - b.attributes.content_position;
  });

  const generateContentSections = (attributes: Attributes2) => {
    if (!attributes) return null;
    const { title, sub_title, description } = attributes;

    switch (attributes.unique_identifier_name) {
    case CONTENT_TYPES.SERVICES:
      return <ServicesListing title={title} sub_title={sub_title} core_services={attributes.core_services || []} />;
    case CONTENT_TYPES.CREDIBILITY:
      return (
        <Credibility
          description={description ?? ''}
          title={title}
          sub_title={sub_title}
          media_url={attributes.media_url}
        />
      );
    case CONTENT_TYPES.WHY_ROOT_ON:
      return (
        <Honesty
          title={title}
          description={description ?? ''}
          sub_title={sub_title}
          json_content={attributes.json_content as IJsonContent}
        />
      );
    case CONTENT_TYPES.OUR_PROCESSES:
      return (
        <div className=" mb-20">
          <OurProcess title={title} sub_title={sub_title} json_content={attributes.json_content as IOurProcessData} />
        </div>
      );
    case CONTENT_TYPES.CHALLENGES:
      return (
        <ChallengesListing
          description={description ?? ''}
          sub_title={sub_title}
          title={title}
          json_content={attributes.json_content as IChallenges}
          media_url={attributes.media_url}
        />
      );
    case CONTENT_TYPES.PARTNERSHIPS:
      return <PartnerShip sub_title={sub_title} title={title} data={attributes.media_url.data} />;
    case CONTENT_TYPES.BLOG:
      return <BlogSection sourcePage={SOURCE_PAGE.HOME} title={title} subtitle={sub_title} />;
    case CONTENT_TYPES.QUESTIONS:
      return (
        <FaqListing
          sub_title={attributes?.sub_title}
          title={attributes?.title}
          json_content={attributes?.json_content as IFaqData}
        />
      );
    case CONTENT_TYPES.TESTIMONIALS:
      return (
        <div className=" pb-10 md:pb-[80px] max-w-screen-2k mx-auto">
          <Testimonials
            apiUrl={TESTIMONIAL_API}
            title={TESTIMONIAL_TITLE.title}
            subTitle={TESTIMONIAL_TITLE.subTitle}
          />
        </div>
      );
    case CONTENT_TYPES.APPOINTMENT:
      return (
        <div className="mb-[100px] max-w-screen-2k mx-auto">
          <BookAnAppointmentSection />
        </div>
      );
    default:
      return null;
    }
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('section') === 'services') scrollIntoView('servicesHomePage');
  });

  return (
    <>
      <RootOnBanner
        isVideoBanner={isVideo(homePageConfig.attributes.media_url.data[0].attributes.mime)}
        backgroundImageUrl={appendAssetUrl(homePageConfig?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={homePageConfig?.attributes?.title}
        description={homePageConfig?.attributes?.sub_title}
        button={
          <RootOnBarBtn
            icon={<FlightIcon />}
            label={homePageConfig?.attributes?.CTA_text}
            url={homePageConfig?.attributes?.CTA_link}
            arialLabel={homePageConfig?.attributes?.CTA_link}
          />
        }
      />
      {sortedContents?.map((content) => {
        return generateContentSections(content.attributes);
      })}
      <NewsLetter />
    </>
  );
};

export default HomePage;
