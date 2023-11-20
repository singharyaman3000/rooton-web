'use client';

import { useRef, useState } from 'react';

import WelcomeSection from '@/components/AboutUsPage/WelcomeSection';
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import RootOnCTAWrapper from '@/components/ServicePage/RootOnCTAWrapper';
import BookAnAppointment from '@/components/UIElements/BookAnAppointment';
import PersonInfoSection from '@/components/AboutUsPage/PersonInfoSection';
import TeamProfileSlider from '@/components/AboutUsPage/TeamProfileSlider';
import BookAppointmentForm from '@/components/AboutUsPage/BookAppointmentForm';
import ValuesDisplaySection from '@/components/AboutUsPage/ValuesDisplaySection';
import DynamicBannerSection from '@/components/AboutUsPage/DynamicBannerSection';
import {
  COMPANY_CEO_INFO,
  WELCOME_SECTION_DATA,
  WHAT_WE_VALUE_SECTION,
  BOOK_APPOINTMENT_FORM,
  BANNER_SECTION_CONTENT,
  COMPANY_MEMBERS_SECTION,
  BOOK_APPOINTMENT_CONTENT,
  BOOK_CONSULTATION_CONTENT,
  COMPANY_STAT_VALUES_DEFAULT,
} from '@/app/(server-pages)/about-us/config/aboutUsContent';

interface AboutUsPageProps {
  companyStatValues: typeof COMPANY_STAT_VALUES_DEFAULT;
}

const AboutUsPage = ({ companyStatValues }: AboutUsPageProps) => {
  const bookAppointmentRef = useRef<HTMLElement>(null);
  const [displayBookAppointment, setDisplayBookAppointment] = useState(false);

  const scrollToLeadForm = () => {
    setTimeout(() => {
      window.scrollTo({
        top: bookAppointmentRef.current ? bookAppointmentRef.current.offsetTop - 10 : 0,
        behavior: 'smooth',
      });
    }, 0);
  };

  const bookAppointmentHandler = () => {
    if (!displayBookAppointment) {
      setDisplayBookAppointment(true);
    }

    scrollToLeadForm();
  };

  return (
    <>
      {/* About Us Banner Section */}
      <DynamicBannerSection
        bannerHeightTailwind='!h-[531px] !max-h-[531px] sm:!max-h-[400px] sm:!h-[400px] 2k:!h-[531px] 2k:!max-h-[531px]'
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
      <section className="mt-10 m-auto max-w-screen-2k px-6 md:px-12 lg:px-20">
        <RootOnCTAWrapper
          containerClass='!px-4 sm:!px-6'
          btnClass='!px-[17px] !gap-[11px] sm:!px-6 sm:!gap-[15px]'
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

      {/* Book Appointment Form Section */}
      <BookAppointmentForm
        scrollToLeadForm={scrollToLeadForm}
        sectionRef={bookAppointmentRef}
        displayBookAppointment={displayBookAppointment}
        formData={BOOK_APPOINTMENT_FORM.formData}
        formHeading={BOOK_APPOINTMENT_FORM.formHeading}
        imageUrl={BOOK_APPOINTMENT_FORM.imageUrl}
      />

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
          containerClass='!px-4 sm:!px-6 md:!px-0'
          appointmentBtnLabel={BOOK_APPOINTMENT_CONTENT.contentText}
          onClick={bookAppointmentHandler}
        />
      </section>
    </>
  );
};

export default AboutUsPage;
