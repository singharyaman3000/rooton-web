import React from 'react';
import Credibility from '@/components/HomePage/Credibility';
import Honesty, { IJsonContent } from '@/components/HomePage/Honesty';
import PartnerShip from '@/components/HomePage/Partnership';
import ServicesListing from '@/components/HomePage/ServicesListing';
import OurProcess from '@/components/HomePage/OurProcess';
import { CONTENT_TYPES, IHomePageData } from '@/app/services/apiService/homeAPI';
import { appendAssetUrl, getSectionData, isVideo } from '@/utils';
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
import { GET_BLOGS_HOME } from '@/app/services/apiService/apiUrl/servicePage';
import { TESTIMONIAL_API } from '@/app/services/apiService/apiUrl/homePage';

const HomePage = ({ homePageConfig }: { homePageConfig: IHomePageData }) => {
  const getComponentsAboveBookAppointments = () => {
    return homePageConfig?.attributes?.home_page_contents?.data?.map((contents) => {
      const { title, sub_title, description } = contents.attributes;
      switch (contents.attributes.unique_identifier_name) {
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
          <div className=' mb-20'>
            <OurProcess
              title={title}
              sub_title={sub_title}
              json_content={contents.attributes.json_content as IOurProcessData}
            />
          </div>
        );
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
      default:
        return null;
      }
    });
  };

  const getComponentsAfterBookAppointments = () => {
    return homePageConfig?.attributes?.home_page_contents?.data?.map((contents) => {
      const { title, sub_title } = contents.attributes;
      switch (contents.attributes.unique_identifier_name) {
      case CONTENT_TYPES.PARTNERSHIPS:
        return <PartnerShip sub_title={sub_title} title={title} data={contents.attributes.media_url.data} />;
      case CONTENT_TYPES.BLOG:
        return <BlogSection title={title} subtitle={sub_title} url={GET_BLOGS_HOME} />;
      default:
        return null;
      }
    });
  };

  const faqData = getSectionData(homePageConfig, CONTENT_TYPES.QUESTIONS);

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
      {getComponentsAboveBookAppointments()}
      <div className='mb-[100px]'>
        <BookAnAppointmentSection/>
      </div>
      {getComponentsAfterBookAppointments()}
      <div className=' pb-10 md:pb-[80px]'>
        <Testimonials apiUrl={TESTIMONIAL_API} title={TESTIMONIAL_TITLE.title} subTitle={TESTIMONIAL_TITLE.subTitle}/>
      </div>
      {faqData && (
        <FaqListing
          sub_title={faqData?.attributes?.sub_title}
          title={faqData?.attributes?.title}
          json_content={faqData?.attributes?.json_content as IFaqData}
        />
      )}
      <NewsLetter />
    </>
  );
};

export default HomePage;
