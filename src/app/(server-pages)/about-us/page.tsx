'use client';

import { useState } from 'react';

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
  BOOK_APPOINTMENT_CONTENT,
  BOOK_CONSULTATION_CONTENT,
} from '@/app/(server-pages)/about-us/config/aboutUsContent';
import LeadFormStepper from '@/components/ServicePage/LeadFormStepper';
import NextImage from '@/components/UIElements/NextImage';

const companyStatValues = [
  { statValue: 3, statText: WELCOME_SECTION_DATA.experienceYearsText },
  { statValue: 500, statText: WELCOME_SECTION_DATA.clientsCountText },
];

const AboutUsPage = () => {
  const [displayBookAppointment, setDisplayBookAppointment] = useState(false);
  const bookAppointmentHandler = () => {
    console.log('Hey');
    setDisplayBookAppointment(true);
  };

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
          onClick={bookAppointmentHandler}
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

      {/* Book Appointment Section */}
      <section
        className={`${displayBookAppointment ? 'block' : 'hidden'} p-5 pb-0 lg:px-[80px] mt-20 m-auto max-w-screen-2k`}
      >
        <div className="flex gap-[34px] shadow-hubspot-form-shadow border border-golden-yellow justify-between relative overflow-hidden bg-pale-sandal">
          <div className="p-4 lg:pl-[60px] w-full lg:w-[83%] py-12 lg:pb-16 lg:pr-0 sm:p-12">
            <h5
              className="
          font-extrabold text-[28px] leading-heading lg:text-2xl xl:text-5xl lg:leading-heading-lg xl:leading-heading-lg
          "
            >
              Tell us more about yourself
            </h5>
            <LeadFormStepper
              region="na1"
              portalId="7535538"
              formId="320378e8-3aad-4c62-ab88-43c8b001e190"
              target="hfhfdhfahfrhhf"
              calenderLink="https://meetings.hubspot.com/unnikrishnan"
              isBookAppointment={false}
            />
          </div>
          <div className=" hidden lg:block w-[25%] relative">
            <NextImage
              classSelector="object-right"
              src={'/images/my-project-46@3x.png'}
              style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
              altText="Employee Image"
              sizes="100vw"
              fill
              title="Employee Image"
            />
          </div>
        </div>
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
        <BookAnAppointment
          appointmentBtnLabel={BOOK_APPOINTMENT_CONTENT.contentText}
          onClick={bookAppointmentHandler}
        />
      </section>
    </>
  );
};

export default AboutUsPage;
