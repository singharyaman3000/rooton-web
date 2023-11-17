'use client';

import { IServicePageContent, ISubServicesContent } from '@/app/services/apiService/serviceAPI';
import { useRef, useState } from 'react';
import Testimonials from '../HomePage/Testimonials';
import BookAnAppointmentButton from './BookAnAppointmentButton';
import { ServicePageWrapper } from './Wrapper';
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
import { ServiceDescription } from './Description';
import { TESTIMONIAL_API_SERVICE } from '@/app/services/apiService/apiUrl/homePage';
import { SOURCE_PAGE } from '../BlogsListPage/constants';

type ServicePageProps = {
  response: IServicePageContent;
  isBookAppointment: boolean;
};

export const ServicePageComponent = ({ response, isBookAppointment }: ServicePageProps) => {
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

  const scrollToLeadForm = () => {
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };

  const handleCTAButtonClick = () => {
    setShowBookAnAppointment(true);
    scrollToLeadForm();
  };

  const getSection = (identifier: string, data?: ISubServicesContent) => {
    switch (identifier) {
    case 'service-reason':
      return (
        <ServicePageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <WhyChooseRootonSection whyChooseOpen={data} handleCTAButtonClick={handleCTAButtonClick} />
        </ServicePageWrapper>
      );
    case 'service-eligibility':
      return (
        <ServicePageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <EligibilitySection eligibility={eligibility} handleCTAButtonClick={handleCTAButtonClick} />
        </ServicePageWrapper>
      );
    case 'service-process':
      return <ProcessSection process={process} />;
    case 'service-lead-form':
      if (leadForm) {
        return (
          <ServicePageWrapper
            className={`${
              showBookAnAppointment ? 'block' : 'hidden'
            } p-5 lg:px-[80px] lg:pt-[84] mt-20 m-auto max-w-screen-2k`}
          >
            <LeadFormSection
              leadForm={leadForm}
              leadFormRef={leadFormRef}
              scrollToTop={scrollToLeadForm}
              handleCTAButtonClick={handleCTAButtonClick}
              isBookAppointment={isBookAppointment}
            />
          </ServicePageWrapper>
        );
      }

      return null;
    case 'service-CTA-banner-1':
      return <CTAWrapperSection handleCTAButtonClick={handleCTAButtonClick} />;
    case 'service-CTA-banner-2':
      return (
        <ServicePageWrapper className=" mt-20 m-auto max-w-screen-2k pb-0">
          <BookAnAppointment onClick={handleCTAButtonClick} />
        </ServicePageWrapper>
      );
    case 'service-testimonial':
      return (
        <div className="m-auto max-w-screen-2k">
          <Testimonials
            apiUrl={TESTIMONIAL_API_SERVICE.replace('<service_type>', response?.data.attributes.unique_identifier_name)}
            title={SERVICES_TITLE.testimonial.title}
            subTitle={SERVICES_TITLE.testimonial.subtitle}
          />
        </div>
      );
    case 'service-faq':
      return <FAQSection faqs={faqs?.attributes?.json_content?.faq} />;
    case 'blogs':
      return (
        <div className=" mt-[74px] bg-secondary-grey">
          <BlogSection
            title=""
            subtitle={blogs?.attributes.title ?? ''}
            serviceType={response?.data.attributes.unique_identifier_name}
            sourcePage={SOURCE_PAGE.SERVICE}
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
            title: 'Service',
            path: '/',
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
      <ServicePageWrapper className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
        <ServiceDescription text={response.data?.attributes?.description} />
      </ServicePageWrapper>
      {sectionsByPosition.map((section) => {
        return getSection(section?.attributes.unique_identifier_name ?? '', section);
      })}
    </div>
  );
};
