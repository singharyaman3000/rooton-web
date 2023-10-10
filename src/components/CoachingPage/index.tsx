'use client';

import { IServicePageContent, ISubServicesContent } from '@/app/services/apiService/serviceAPI';
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
import { GET_BLOGS_SERVICE } from '@/app/services/apiService/apiUrl/servicePage';
import { CoachingDescription } from './Description';
import { TESTIMONIAL_API_SERVICE } from '@/app/services/apiService/apiUrl/homePage';

type CoachingPageProps = {
  response: IServicePageContent;
  isBookAppointment: boolean;
};

export const CoachingPageComponent = ({ response, isBookAppointment }: CoachingPageProps) => {
  const [showBookAnAppointment, setShowBookAnAppointment] = useState(false);

  const leadFormRef = useRef<HTMLDivElement>(null);

  const whyChooseOpen = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-reason';
  });

  const eligibility = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-eligibility';
  });

  const process = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-process';
  });

  const ctaBanner1 = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-CTA-banner-1';
  });

  const leadForm = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-lead-form';
  });

  const ctaBanner2 = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-CTA-banner-2';
  });

  const insights = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-insights';
  });

  const testimonials = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-testimonial';
  });

  const faqs = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'service-faq';
  });

  const blogs = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'blogs';
  });
  console.log('sub_title:', response.data?.attributes?.sub_title);
  const sectionsByPosition = [
    whyChooseOpen,
    eligibility,
    process,
    leadForm,
    ctaBanner2,
    insights,
    testimonials,
    ctaBanner1,
    faqs,
    blogs,
  ];

  sectionsByPosition.sort((first, second) => {
    return (first?.attributes?.position ?? 0) - (second?.attributes?.position ?? 0);
  });

  const handleCTAButtonClick = () => {
    setShowBookAnAppointment(true);
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };

  const getSection = (identifier: string, data?: ISubServicesContent) => {
    switch (identifier) {
      case 'service-reason':
        return (
          <></>
          // <CoachingPageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          //   <WhyChooseRootonSection whyChooseOpen={data} handleCTAButtonClick={handleCTAButtonClick} />
          // </CoachingPageWrapper>
        );
      case 'service-eligibility':
        return (
          <CoachingPageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
            <EligibilitySection eligibility={eligibility} handleCTAButtonClick={handleCTAButtonClick} />
          </CoachingPageWrapper>
        );
      case 'service-process':
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
      case 'service-testimonial':
        return (
          <div className="m-auto max-w-screen-2k">
            <Testimonials
              apiUrl={TESTIMONIAL_API_SERVICE.replace(
                '<service_type>',
                response?.data.attributes.unique_identifier_name,
              )}
              title={SERVICES_TITLE.testimonial.title}
              subTitle={SERVICES_TITLE.testimonial.subtitle}
            />
          </div>
        );
      case 'service-faq':
        return <FAQSection faqs={faqs?.attributes.json_content.faq} />;
      case 'blogs':
        return (
          <div className=" mt-[74px] bg-secondary-grey">
            <BlogSection
              title=""
              subtitle={blogs?.attributes.title ?? ''}
              url={GET_BLOGS_SERVICE.replace('<service-type>', response?.data.attributes.unique_identifier_name)}
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
        // data={[
        //   {
        //     title: 'Home',
        //     path: '/',
        //   },
        //   {
        //     title: 'Coaching',
        //     path: 'coaching/26',
        //   },
        //   {
        //     title: "IELTS",
        //     path: '',
        //   },
        // ]}
        data={[
          {
            title: '',
            path: '',
          },
        ]}
      />
      <RootOnBanner
        isVideoBanner={isVideo(response.data?.attributes.media_url?.data?.[0].attributes.mime)}
        backgroundImageUrl={appendAssetUrl(response.data?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={'<span>Coaching</span>'}
        description={
          'Root On Immigration Pvt. Ltd.: Comprehensive coaching for Canada-bound aspirants.<br>From IELTS to PTE and beyond,<br>we provide tailored strategies to ensure your success.'
        }
        button={<></>}
        // button={<BookAnAppointmentButton text={response.data?.attributes?.CTA_text} onClick={handleCTAButtonClick} />}
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
