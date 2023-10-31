'use client';

import RTONBanner from '@/components/RTONBanner';
import Description from '@/components/UIElements/Description';
import HonestyCard from '@/components/HomePage/Honesty/honestyCard';
import WelcomeSection from '@/components/AboutUsPage/WelcomeSection';
import CalenderIconYellow from '@/components/Icons/CalendarIconYellow';
import RootOnCTAWrapper from '@/components/ServicePage/RootOnCTAWrapper';
import BookAnAppointment from '@/components/UIElements/BookAnAppointment';
import PersonInfoSection from '@/components/AboutUsPage/PersonInfoSection';
import TeamProfileSlider from '@/components/AboutUsPage/TeamProfileSlider';
import SubSectionTitle from '@/components/UIElements/SectionHeadings/SubSectiontitle';
import { COMPANY_CEO_INFO, COMPANY_MEMBERS, COMPANY_VALUES, WELCOME_SECTION_DATA } from '@/constants/aboutUsContent';

const companyStatValues = [
  { statValue: 3, statText: WELCOME_SECTION_DATA.experienceYearsText },
  { statValue: 500, statText: WELCOME_SECTION_DATA.clientsCountText },
];

const AboutUsPage = () => {
  return (
    <>
      {/* About Us Banner Section */}
      <RTONBanner
        breadCrumbData={[
          {
            title: 'Home',
            path: '/',
          },
          {
            title: 'About Us',
            path: '',
          },
        ]}
        addGradient={false}
        backgroundImageUrl="/images/aboutUs/about-us-banner.png"
        heroText="<span>About Root On</span>"
        description={
          '<span>Personalized immigration guidance from a licensed professional.</span><br>' +
          '<span>Discover the best pathway for your Canadian dream.</span>'
        }
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
          buttonAriaLabel={'Book a Consultation with Ronak'}
          buttonText={'Book a Consultation with Ronak'}
          buttonIcon={<CalenderIconYellow />}
          onClick={() => {
            console.log('Button Clicked');
          }}
          imageSrc={'/images/servicePage/my-project-44@3x.png'}
          imageAlt={'Company employee'}
          imageTitle={'Company employee'}
          heading={
            <>
              {'No wasted time and money.'} <br /> {'No empty promises.'}
            </>
          }
        />
      </section>

      {/* About the CEO section */}
      <PersonInfoSection contentHeading="About the CEO" personInfo={COMPANY_CEO_INFO} />

      {/* Who we are Section */}
      <TeamProfileSlider contentHeading="Who we are" teamData={COMPANY_MEMBERS} />

      {/* What We Value Section */}
      <section className="my-20 m-auto max-w-screen-2k px-6 md:px-10 lg:px-20">
        <SubSectionTitle cssClass="mb-5" title="What we value" />
        <Description
          cssClass="!text-black mb-3"
          description={
            'Our mission is to inspire, challenge, and guide clients in finding their true immigration needs, offering customer-centric, goal-based solutions. We aim to be the most valued immigration firm for our customers, providing unwavering support in their journey towards a better future.'
          }
        />
        <div className="mb-6  lg:mb-[69px]">
          <div className="honestyBackground honestycard grid grid-cols-1 border-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px]">
            {COMPANY_VALUES.map(({ key, value, iconComponent, position }) => {
              return (
                <HonestyCard key={key} title={key} value={value} iconComponent={iconComponent} position={position} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Book an appointment Section */}
      <section className="mt-20 mb-20 m-auto max-w-screen-2k">
        <BookAnAppointment appointmentBtnLabel="Book an appointment with Ronak" onClick={() => {}} />
      </section>
    </>
  );
};

export default AboutUsPage;
