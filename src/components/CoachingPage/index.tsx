'use client';

import { useRef, useState } from 'react';
import Credibility from '@/components/CoachingPage/Credibility';
import Honesty, { IJsonContent } from '@/components/CoachingPage/Honesty';
import PartnerShip from '@/components/CoachingPage/Partnership';
import OurProcess from '@/components/CoachingPage/OurProcess';
import { CONTENT_TYPES, ICoachingPage_Data, DataEntity1 } from '@/app/services/apiService/CoachingAPI';
import { appendAssetUrl, getSectionData1, isVideo } from '@/utils';
import ChallengesListing, { IChallenges } from './ChallengesListing';
import { IOurProcessData } from './OurProcess/interfaces';
import RootOnBanner from './RootOnBanner';
import Testimonials from './Testimonials';
import FaqListing, { IFaqData } from './FaqListings';
import { TESTIMONIAL_TITLE } from '@/app/constants/textConstants';
import { TESTIMONIAL_COACHING_API } from '@/app/services/apiService/apiUrl/homePage';
import BookAnAppointmentButton from './BookAnAppointmentButton';
import { CoachingPageWrapper } from '../CoachingPage-Services/Wrapper';
import LeadFormSection from './BookAnAppointmentButton/LeadFormSection';
import BookAnAppointment from '../UIElements/BookAnAppointment';

type CoachingServicePageProps = {
  coachingPageConfig: ICoachingPage_Data;
  leadForm?: DataEntity1;
  isBookAppointment?: boolean;
};

const CoachingPageComponent = ({ coachingPageConfig, isBookAppointment }: CoachingServicePageProps) => {
  const [showBookAnAppointment, setShowBookAnAppointment] = useState(false);
  const leadFormRef = useRef<HTMLDivElement>(null);
  const handleCTAButtonClick = () => {
    setShowBookAnAppointment(true);
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };
  const data = coachingPageConfig?.attributes?.coaching_page_contents?.data || [];
  const leadForm: DataEntity1 | undefined =
    data.find((i) => i.attributes.unique_identifier_name === 'coaching-lead-form') || undefined;

  const getComponentsAboveBookAppointments = () => {
    return data?.map((contents) => {
      const { title, sub_title, description } = contents.attributes;
      switch (contents.attributes.unique_identifier_name) {
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
          <div className=" mb-20">
            <OurProcess
              title={title}
              sub_title={sub_title}
              json_content={contents.attributes.json_content as IOurProcessData}
            />
          </div>
        );
      case CONTENT_TYPES.LEAD_FORM:
        return (
          <CoachingPageWrapper
            className={`${
              showBookAnAppointment ? 'block' : 'hidden'
            } p-5 lg:px-[80px] lg:pt-[84] mt-20 m-auto max-w-screen-2k`}
          >
            <LeadFormSection
              leadForm={leadForm}
              leadFormRef={leadFormRef}
              handleCTAButtonClick={handleCTAButtonClick}
              isBookAppointment={isBookAppointment ?? false}
            />
          </CoachingPageWrapper>
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
    return data?.map((contents) => {
      const { title, sub_title } = contents.attributes;
      switch (contents.attributes.unique_identifier_name) {
      case CONTENT_TYPES.PARTNERSHIPS:
        return <PartnerShip sub_title={sub_title} title={title} data={contents.attributes.media_url.data} />;

      default:
        return null;
      }
    });
  };

  const faqData = getSectionData1(coachingPageConfig, CONTENT_TYPES.QUESTIONS);

  return (
    <>
      <RootOnBanner
        isVideoBanner={isVideo(coachingPageConfig.attributes.media_url.data[0].attributes.mime)}
        backgroundImageUrl={appendAssetUrl(coachingPageConfig?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={coachingPageConfig?.attributes?.title}
        description={coachingPageConfig?.attributes?.sub_title}
        button={<BookAnAppointmentButton text={data[4]?.attributes?.CTA_text || ''} onClick={handleCTAButtonClick} />}
      />
      {getComponentsAboveBookAppointments()}

      {getComponentsAfterBookAppointments()}
      <div className="pb-10 md:pb-[80px]">
        <Testimonials apiUrl={TESTIMONIAL_COACHING_API} title={TESTIMONIAL_TITLE.title} subTitle={TESTIMONIAL_TITLE.subTitle} />
      </div>
      <div className="mb-[100px]">
        <BookAnAppointment onClick={handleCTAButtonClick} />
      </div>
      {faqData && (
        <FaqListing
          sub_title={faqData?.attributes?.sub_title}
          title={faqData?.attributes?.title}
          json_content={faqData?.attributes?.json_content as IFaqData}
        />
      )}
    </>
  );
};

export default CoachingPageComponent;
