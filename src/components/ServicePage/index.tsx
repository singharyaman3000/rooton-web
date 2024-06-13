'use client';

import { IServicePageContent, ISubServicesContent } from '@/app/services/apiService/serviceAPI';
import { useEffect, useRef, useState } from 'react';
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
import { CONSULTATION_TYPES } from './LeadFormStepper';
import FSWForm from '../Forms/FSWForm';
import FSTPForm from '../Forms/FSTPForm';
import QSWPForm from '../Forms/QSWPForm';
import CECForm from '../Forms/CECForm';
import PNPForm from '../Forms/PNPForm';
import PGPorm from '../Forms/PGPForm';
import SSForm from '../Forms/SSForm';
import PlanCard from './PageSections/PlanCard';
import PricingLeadFormSection from './PageSections/PricingLeadFormSection';

type ServicePageProps = {
  response: IServicePageContent;
  isBookAppointment: boolean;
};

export const ServicePageComponent = ({ response, isBookAppointment }: ServicePageProps) => {
  const [showBookAnAppointment, setShowBookAnAppointment] = useState(false);
  const [ctaClickSource, setCtaClickSource] = useState(CONSULTATION_TYPES.FREE);
  const [showPricingLeadForm, setShowPricingLeadForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const leadFormRef = useRef<HTMLDivElement>(null);
  const pricingFormRef = useRef<HTMLDivElement>(null);

  const handleGetDomain = () => {
    setCurrentDomain(window.location.origin);
  };

  useEffect(() => {
    handleGetDomain();
  }, []);

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

  const pricings = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'our_plans';
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

  const pricingTypes = Object.keys(pricings?.attributes?.json_content?.pricingDetails || []);

  const [activepType] = useState(pricingTypes[0] || '');

  const pricingDetails = pricings?.attributes?.json_content?.pricingDetails;
  const filteredPricings = pricingDetails?.[activepType] || [];
  const pricingLeadForms = pricings?.attributes?.json_content?.pricingDetails?.pricingPlans;

  const sectionsByPosition = [
    whyChooseOpen,
    eligibility,
    process,
    leadForm,
    ctaBanner2,
    insights,
    pricings,
    testimonials,
    ctaBanner1,
    faqs,
    blogs,
  ];

  sectionsByPosition.sort((first, second) => {
    return (first?.attributes?.position ?? 0) - (second?.attributes?.position ?? 0);
  });

  const scrollToLeadForm = (timeoutDuration = 0) => {
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, timeoutDuration);
  };

  const scrollToPricingLeadForm = (timeoutDuration = 0) => {
    setTimeout(() => {
      window.scrollTo({
        top: pricingFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, timeoutDuration);
  };
  const handleCTAButtonClick = (source: string, delayDuration = 0) => {
    setCtaClickSource(source);
    setShowPricingLeadForm(false);
    setShowBookAnAppointment(true);
    scrollToLeadForm(delayDuration);
  };

  const handlePricingCTAButtonClick = (index: number, delayDuration = 0) => {
    setShowPricingLeadForm(true);
    setShowBookAnAppointment(false);
    setSelectedPlan(index);
    scrollToPricingLeadForm(delayDuration);
  };

  const nonHubSpotFormSelector = (
    formIdentifier: string,
    formId: string,
    meetingLink: Record<string, string>,
    formTitle: string,
  ) => {
    switch (formIdentifier) {
    case 'federal-skilled-worker-program':
      return (
        <FSWForm
          leadFormRef={leadFormRef}
          formId={formId}
          meetingLink={meetingLink}
          title={formTitle}
          isBookAppointment={isBookAppointment}
          initScroll={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
          scrollToTop={scrollToLeadForm}
        />
      );
    case 'federal-skilled-trades':
      return (
        <FSTPForm
          leadFormRef={leadFormRef}
          formId={formId}
          meetingLink={meetingLink}
          title={formTitle}
          isBookAppointment={isBookAppointment}
          initScroll={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
          scrollToTop={scrollToLeadForm}
        />
      );
    case 'quebec-immigration':
      return (
        <QSWPForm
          leadFormRef={leadFormRef}
          formId={formId}
          meetingLink={meetingLink}
          title={formTitle}
          isBookAppointment={isBookAppointment}
          initScroll={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
          scrollToTop={scrollToLeadForm}
        />
      );
    case 'canadian-experience-class':
      return (
        <CECForm
          leadFormRef={leadFormRef}
          formId={formId}
          meetingLink={meetingLink}
          title={formTitle}
          isBookAppointment={isBookAppointment}
          initScroll={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
          scrollToTop={scrollToLeadForm}
        />
      );
    case 'provincial-nominee-program':
      return (
        <PNPForm
          leadFormRef={leadFormRef}
          formId={formId}
          meetingLink={meetingLink}
          title={formTitle}
          isBookAppointment={isBookAppointment}
          initScroll={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
          scrollToTop={scrollToLeadForm}
        />
      );
    case 'parents-and-grandparents-sponsorship':
      return (
        <PGPorm
          leadFormRef={leadFormRef}
          formId={formId}
          meetingLink={meetingLink}
          title={formTitle}
          isBookAppointment={isBookAppointment}
          initScroll={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
          scrollToTop={scrollToLeadForm}
        />
      );
    case 'spouse-visa-canada':
      return (
        <SSForm
          leadFormRef={leadFormRef}
          formId={formId}
          meetingLink={meetingLink}
          title={formTitle}
          isBookAppointment={isBookAppointment}
          initScroll={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
          scrollToTop={scrollToLeadForm}
        />
      );
    default:
      return <div></div>;
    }
  };

  const getSection = (identifier: string, data?: ISubServicesContent) => {
    switch (identifier) {
    case 'service-reason':
      return (
        <ServicePageWrapper key="why-rooton" className="pt-[40px] px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <WhyChooseRootonSection
            whyChooseOpen={data}
            handleCTAButtonClick={() => {
              return handleCTAButtonClick(CONSULTATION_TYPES.PAID);
            }}
          />
        </ServicePageWrapper>
      );
    case 'service-eligibility':
      return (
        <ServicePageWrapper key="eligibility" className="pt-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <EligibilitySection
            eligibility={eligibility}
            handleCTAButtonClick={() => {
              return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
            }}
          />
        </ServicePageWrapper>
      );
    case 'service-process':
      return <ProcessSection key="process" process={process} />;
    case 'our_plans':
      return (
        <div className=" mt-20 !py-0 pt-10 md:pt-[100px] m-auto max-w-screen-2k">
          {pricingLeadForms?.[selectedPlan] && (
            <ServicePageWrapper
              className={`${
                showPricingLeadForm ? 'block' : 'hidden'
              } p-5 lg:px-[80px] lg:pt-[84] mt-20 m-auto max-w-screen-2k `}
            >
              <PricingLeadFormSection
                PricingleadForm={pricingLeadForms?.[selectedPlan]}
                PricingleadFormRef={pricingFormRef}
                scrollToTop={scrollToPricingLeadForm}
                onPricingCTAButtonClick={() => {
                  return handlePricingCTAButtonClick(selectedPlan);
                }}
                isBookAppointment={false}
              />
            </ServicePageWrapper>
          )}
          <div className="px-[24px] md:px-[48px] lg:px-[80px] ">
            <h2
              className={
                'max-w-[340px] md:max-w-none md:text-5xl gradient-text text-primary-text font-extrabold not-italic !leading-[1.42] tracking-[normal] text-[1.75rem]'
              }
            >
              Our Plans
            </h2>
            {currentDomain.length !== 0 && (
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${filteredPricings?.length > 3 ? 'xl2:grid-cols-4 gap-5' : 'lg:gap-16'} mx-auto w-full`}
              >
                {Array.isArray(filteredPricings) &&
                  filteredPricings.map((pricing, index) => {
                    return (
                      <PlanCard
                        key={`${index.toString()}`}
                        our_plans={pricing}
                        redirectUrl={pricing.url}
                        domain={currentDomain}
                        onPricingCTAButtonClick={() => {
                          return handlePricingCTAButtonClick(index);
                        }}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      );
    case 'service-lead-form':
      if (leadForm) {
        return (
          <ServicePageWrapper
            className={`${
              showBookAnAppointment ? 'block' : 'hidden'
            } p-5 lg:px-[80px] lg:pt-[84] mt-20 m-auto max-w-screen-2k`}
            key="lead-form"
          >
            {leadForm?.attributes?.json_content?.lead_forms![0]?.isHubSpotForm ? (
              <LeadFormSection
                ctaClickSource={ctaClickSource}
                leadForm={leadForm}
                leadFormRef={leadFormRef}
                scrollToTop={scrollToLeadForm}
                handleCTAButtonClick={() => {
                  return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
                }}
                isBookAppointment={isBookAppointment}
              />
            ) :
              nonHubSpotFormSelector(
                response?.data?.attributes?.unique_identifier_name ?? '',
                  leadForm?.attributes?.json_content?.lead_forms![0]?.formId ?? '',
                  leadForm?.attributes?.json_content.lead_forms![1]?.url ?? {},
                  leadForm?.attributes?.title ?? 'Tell us more about yourself',
              )
            }
          </ServicePageWrapper>
        );
      }

      return null;
    case 'service-CTA-banner-1':
      return (
        <CTAWrapperSection
          key="cta-btn"
          handleCTAButtonClick={() => {
            return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
          }}
        />
      );
    case 'service-CTA-banner-2':
      return (
        <ServicePageWrapper key="book-appoinment" className=" mt-20 m-auto max-w-screen-2k pb-0">
          <BookAnAppointment
            onClick={() => {
              return handleCTAButtonClick(CONSULTATION_TYPES.FREE);
            }}
          />
        </ServicePageWrapper>
      );
    case 'service-testimonial':
      return (
        <div key="testimonials" className="m-auto max-w-screen-2k">
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
      return <FAQSection key="faq" faqs={faqs?.attributes?.json_content?.faq} />;
    case 'blogs':
      return (
        <div key="blogs" className=" mt-[40px] bg-secondary-grey">
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
            path: '/?section=services',
          },
          {
            title: response.data?.attributes?.title,
            path: '',
          },
        ]}
      />
      <RootOnBanner
        sourcePage={SOURCE_PAGE.SERVICE}
        isVideoBanner={isVideo(response.data?.attributes.media_url?.data?.[0].attributes.mime)}
        backgroundImageUrl={appendAssetUrl(response.data?.attributes?.media_url?.data?.[0]?.attributes.url ?? '')}
        heroText={response.data?.attributes?.title}
        description={response.data?.attributes?.sub_title}
        button={
          <BookAnAppointmentButton
            text={response.data?.attributes?.CTA_text}
            onClick={() => {
              return handleCTAButtonClick(CONSULTATION_TYPES.PAID);
            }}
          />
        }
      />
      <ServicePageWrapper className="pt-[40px] px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
        <ServiceDescription text={response.data?.attributes?.description} />
      </ServicePageWrapper>
      {sectionsByPosition.map((section) => {
        return getSection(section?.attributes.unique_identifier_name ?? '', section);
      })}
    </div>
  );
};
