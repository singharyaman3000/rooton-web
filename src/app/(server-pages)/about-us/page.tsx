'use client';

import RTONBanner from '@/components/RTONBanner';
import WelcomeSection from '@/components/AboutUsPage/WelcomeSection';
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import RootOnCTAWrapper from '@/components/ServicePage/RootOnCTAWrapper';
import BookAnAppointment from '@/components/UIElements/BookAnAppointment';
import PersonInfoSection from '@/components/AboutUsPage/PersonInfoSection';
import TeamProfileSlider from '@/components/AboutUsPage/TeamProfileSlider';
import ValuesDisplaySection from '@/components/AboutUsPage/ValuesDisplaySection';
import {
  COMPANY_CEO_INFO,
  WELCOME_SECTION_DATA,
  WHAT_WE_VALUE_SECTION,
  BANNER_SECTION_CONTENT,
  COMPANY_MEMBERS_SECTION,
  BOOK_CONSULTATION_CONTENT,
} from '@/app/(server-pages)/about-us/config/aboutUsContent';

const companyStatValues = [
  { statValue: 3, statText: WELCOME_SECTION_DATA.experienceYearsText },
  { statValue: 500, statText: WELCOME_SECTION_DATA.clientsCountText },
];

const AboutUsPage = () => {
  return (
    <>
      {/* About Us Banner Section */}
      <RTONBanner
        breadCrumbData={BANNER_SECTION_CONTENT.pagePath}
        addGradient={false}
        backgroundImageUrl={BANNER_SECTION_CONTENT.bannerImageUrl}
        heroText={BANNER_SECTION_CONTENT.bannerHeading}
        description={BANNER_SECTION_CONTENT.bannerDescription}
      />

      {/* About Us Description Section */}
      <WelcomeSection
        companyDescription={WELCOME_SECTION_DATA.companyDescription}
        companyMission={WELCOME_SECTION_DATA.companyMission}
        imageUrl={WELCOME_SECTION_DATA.welcomeImageUrl}
        companyStatList={companyStatValues}
      />

      {/* Book a Consultation Section */}
      <section className="my-20 m-auto max-w-screen-2k px-6 md:px-12 lg:px-20">
        <RootOnCTAWrapper
          buttonAriaLabel={BOOK_CONSULTATION_CONTENT.btnText}
          buttonText={BOOK_CONSULTATION_CONTENT.btnText}
          buttonIcon={<CalenderIconYellow />}
          onClick={() => {
            console.log('Button Clicked');
          }}
          imageSrc={BOOK_CONSULTATION_CONTENT.imageUrl}
          imageAlt={BOOK_CONSULTATION_CONTENT.imageAltText}
          imageTitle={BOOK_CONSULTATION_CONTENT.imageAltText}
          heading={
            <>
              {BOOK_CONSULTATION_CONTENT.contentText.firstLine} <br />{' '}
              {BOOK_CONSULTATION_CONTENT.contentText.secondLine}
            </>
          }
        />
      </section>

      {/* About the CEO section */}
      <PersonInfoSection contentHeading={COMPANY_CEO_INFO.sectionHeading} personInfo={COMPANY_CEO_INFO} />

      {/* Who we are Section */}
      <TeamProfileSlider
        contentHeading={COMPANY_MEMBERS_SECTION.sectionHeading}
        teamData={COMPANY_MEMBERS_SECTION.companyMembers}
      />

      {/* What We Value Section */}
      <ValuesDisplaySection
        heading={WHAT_WE_VALUE_SECTION.ourValuesHeading}
        description={WHAT_WE_VALUE_SECTION.ourValuesDescription}
        valuesList={WHAT_WE_VALUE_SECTION.companyValues}
      />

      {/* Book an appointment Section */}
      <section className="mt-20 mb-20 m-auto max-w-screen-2k">
        <BookAnAppointment appointmentBtnLabel="Book an appointment with Ronak" onClick={() => {}} />
      </section>

    </>
  );
};

export default AboutUsPage;
