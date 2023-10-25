'use client';

import { ICoachingServicePageContent, ICoachingServicesContent } from '@/app/services/apiService/coaching_contentsAPI';
import { useRef, useState } from 'react';
import Testimonials from '../HomePage/Testimonials';
import BookAnAppointmentButton from './BookAnAppointmentButton';
import { CoachingPageWrapper } from './Wrapper';
import RootOnBanner from '../HomePage/RootOnBanner';
import { appendAssetUrl, isVideo } from '@/utils';
import { SERVICES_TITLE } from '@/app/constants/textConstants';
import { Breadcrumbs } from '../Breadcrumbs';
import BookAnAppointment from '../UIElements/BookAnAppointment';
import WhyChooseRootonSection from './PageSections/WhyChooseRootonSection';
import EligibilitySection from './PageSections/EligibilitySection';
import ProcessSection from './PageSections/ProcessSection';
import LeadFormSection from './PageSections/LeadFormSection';
import CTAWrapperSection from './PageSections/CTAWrapperSection';
import FAQSection from './PageSections/FAQSection';
import BlogSection from './PageSections/BlogSection';
import { GET_BLOGS_COACHING_SERVICE } from '@/app/services/apiService/apiUrl/servicePage';
import { CoachingDescription } from './Description';
import { TESTIMONIAL_API_SERVICE } from '@/app/services/apiService/apiUrl/homePage';
import TrainingCard from './Training';
import SectionHeadings from '@/components/UIElements/SectionHeadings';

type CoachingServicePageProps = {
  response: ICoachingServicePageContent;
  isBookAppointment: boolean;
  subTitle: string;
};

export const CoachingServicePageComponent = ({ response, isBookAppointment }: CoachingServicePageProps) => {
  const [showBookAnAppointment, setShowBookAnAppointment] = useState(false);
  // const [activeTrainingType, setActiveTrainingType] = useState<'General Training' | 'Academic Training'>('General Training');
  const leadFormRef = useRef<HTMLDivElement>(null);

  const whyChooseOpen = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-reason';
  });

  const eligibility = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-eligibility';
  });

  const process = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'coaching-service-process';
  });

  const ctaBanner1 = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-CTA-banner-1';
  });

  const leadForm = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-lead-form';
  });

  const ctaBanner2 = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-CTA-banner-2';
  });

  const insights = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-insights';
  });

  const trainings = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'training';
  });

  const trainingTitle = trainings?.attributes?.title;

  const trainingTypes = Object.keys(trainings?.attributes?.json_content?.trainingDetails || {});

  const [activeTrainingType, setActiveTrainingType] = useState(trainingTypes[0] || '');

  const filteredTrainings = trainings?.attributes?.json_content?.trainingDetails[activeTrainingType] || [];

  const testimonials = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'coaching-service-testimonial';
  });

  const faqs = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'coaching-service-faq';
  });

  const blogs = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'blogs';
  });

  const sectionsByPosition = [
    whyChooseOpen,
    eligibility,
    process,
    leadForm,
    ctaBanner2,
    insights,
    trainings,
    testimonials,
    ctaBanner1,
    faqs,
    blogs,
  ];

  sectionsByPosition.sort((first, second) => {
    return (first?.attributes?.position ?? 0) - (second?.attributes?.position ?? 0);
  });
  console.log(response.data?.attributes);
  const handleCTAButtonClick = () => {
    setShowBookAnAppointment(true);
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };

  const getSection = (identifier: string, data?: ICoachingServicesContent) => {
    switch (identifier) {
    case 'service-reason':
      return (
        <CoachingPageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <WhyChooseRootonSection whyChooseOpen={data} handleCTAButtonClick={handleCTAButtonClick} />
        </CoachingPageWrapper>
      );
    case 'service-eligibility':
      return (
        <CoachingPageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <EligibilitySection eligibility={eligibility} handleCTAButtonClick={handleCTAButtonClick} />
        </CoachingPageWrapper>
      );
    case 'coaching-service-process':
      return <ProcessSection process={process} />;
    case 'service-lead-form':
      if (leadForm) {
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
              isBookAppointment={isBookAppointment}
            />
          </CoachingPageWrapper>
        );
      }

      return null;
    case 'service-CTA-banner-1':
      return <CTAWrapperSection handleCTAButtonClick={handleCTAButtonClick} />;
    case 'service-CTA-banner-2':
      return (
        <CoachingPageWrapper className=" mt-20 m-auto max-w-screen-2k pb-0">
          <BookAnAppointment onClick={handleCTAButtonClick} />
        </CoachingPageWrapper>
      );
      case 'training':
  return (
    <>
      <style jsx>{`
      .scrollable-container {
        display: flex;
        overflow-x: auto;
      }
      .scrollable-container::-webkit-scrollbar {
        display: none; 
      }
      .scrollable-container{
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .active-button {
        background-color: #000;
        color: #fff;
        padding: 10px;
      }
      #button-heading {
        margin-top: 10px;
      }
      .normal-button {
        flex: 1;
        transition: all 0.3s ease;
        position: relative;
        border: none; // Removing border from individual buttons
        border-right: 1px solid lightgray; // Adding vertical line between buttons
        border-radius: 0; // No border-radius
        padding: 10px;
      }
      `}</style>
     
    <div className="mt-20 m-auto max-w-screen-2k ">
      <div className="px-[24px] md:px-[48px] lg:px-[80px]   !py-0 pt-10 md:pt-[100px] fgx">
      <div className="md:max-w-[70%] lg:max-w-none">
    <SectionHeadings title={""} subTitle={trainingTitle} />
    </div>
    {trainingTypes.map((type) => (
  <button 
    key={type} 
    id='button-heading'
    onClick={() => setActiveTrainingType(type)}
    className={`${ type === activeTrainingType ? 'active-button' : 'normal-button'}`}
  >
    {type}
  </button>
))}
      
      {filteredTrainings.map((training, index) => {
        if (index === 0) {
          return <TrainingCard key={training.id} training={training} isFirst={index === 0} index={index} />;
        }
        return null;
      })}

      <div className="scrollable-container">
        {filteredTrainings.map((training, index) => {
          if (index !== 0) {
            return <TrainingCard key={training.id} training={training} />;
          }
          return null;
        })}
      </div>
      </div>
    </div>
    </>
  );


    case 'coaching-service-testimonial':
      return (
        <div className="m-auto max-w-screen-2k">
          <Testimonials
            apiUrl={TESTIMONIAL_API_SERVICE.replace('<service_type>', response?.data.attributes.unique_identifier_name)}
            title={SERVICES_TITLE.testimonial.title}
            subTitle={SERVICES_TITLE.testimonial.subtitle}
          />
        </div>
      );
    case 'coaching-service-faq':
      return <FAQSection faqs={faqs?.attributes.json_content.faq} />;
    case 'blogs':
      return (
        <div className=" mt-[74px] bg-secondary-grey">
          <BlogSection
            title=""
            subtitle={blogs?.attributes.title ?? ''}
            url={GET_BLOGS_COACHING_SERVICE.replace('<service-type>', response?.data.attributes.unique_identifier_name)}
          />
        </div>
      );
    default:
      return null;
    }
  };

  return (
    <div className=" relative pb-20">
      <Breadcrumbs
        className=" z-50 hidden lg:flex"
        data={[
          {
            title: 'Home',
            path: '/',
          },
          {
            title: 'Coaching',
            path: '/coaching',
          },
          {
            title: response.data?.attributes?.title,
            path: '',
          },
        ]}
      />
      <RootOnBanner
        isVideoBanner={isVideo(response.data?.attributes.media_url?.data?.[0].attributes.mime)}
        backgroundImageUrl={appendAssetUrl(response.data?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={response.data?.attributes?.title}
        description={response.data?.attributes?.sub_title}
        button={<BookAnAppointmentButton text={response.data?.attributes?.CTA_text} onClick={handleCTAButtonClick} />}
      />
      <CoachingPageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
        <CoachingDescription text={response.data?.attributes?.description} />
      </CoachingPageWrapper>
      {sectionsByPosition.map((section) => {
        return getSection(section?.attributes.unique_identifier_name ?? '', section);
      })}
    </div>
  );
};
