'use client';

import { ICoachingServicePageContent, ICoachingServicesContent } from '@/app/services/apiService/coachingContentsAPI';
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { CoachingDescription } from './Description';
import { TESTIMONIAL_API_SERVICE } from '@/app/services/apiService/apiUrl/homePage';
import TrainingCard from './Training';
import SectionHeadings from '@/components/UIElements/SectionHeadings';
import PricingSection from './PricingSection';
import { SOURCE_PAGE } from '../BlogsListPage/constants';
import PricingLeadFormSection from './PricingSection/LeadFormSection';
import SliderNav from '@/components/UIElements/Slider/sliderNav';
import { trackEvent } from '../../../gtag';

type CoachingServicePageProps = {
  response: ICoachingServicePageContent;
  isBookAppointment: boolean;
};

export const CoachingServicePageComponent = ({ response, isBookAppointment }: CoachingServicePageProps) => {
  const [showBookAnAppointment, setShowBookAnAppointment] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const leadFormRef = useRef<HTMLDivElement>(null);
  const PricingleadFormRef = useRef<HTMLDivElement>(null);
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

  const pricings = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'our_plans';
  });

  const trainings = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'training';
  });

  const trainingTitle = trainings?.attributes?.title;

  const pricingTitle = pricings?.attributes?.title;

  const trainingTypes = Object.keys(trainings?.attributes?.json_content?.trainingDetails || {});

  const [activeTrainingType, setActiveTrainingType] = useState(trainingTypes[0] || '');

  const pricingTypes = Object.keys(pricings?.attributes?.json_content?.pricingDetails || []);

  const [activepType] = useState(pricingTypes[0] || '');

  const trainingDetails = trainings?.attributes?.json_content?.trainingDetails;
  const filteredTrainings = trainingDetails?.[activeTrainingType] || [];

  const pricingDetails = pricings?.attributes?.json_content?.pricingDetails;
  const filteredPricings = pricingDetails?.[activepType] || [];
  const pricingLeadForms = pricings?.attributes?.json_content?.pricingDetails?.pricingPlans;
  const [activeCard, setActiveCard] = useState(0);
  const [activeCardT, setActiveCardT] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement>(null);

  const testimonials = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'coaching-service-testimonial';
  });

  const faqs = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'coaching-service-faq';
  });

  const blogs = response?.data?.attributes?.coaching_service_contents?.data?.find((i) => {
    return i.attributes.unique_identifier_name === 'blogs';
  });

  const textContent = new DOMParser().parseFromString(response.data?.attributes?.title, 'text/html').body.textContent || '';

  const sectionsByPosition = [
    whyChooseOpen,
    eligibility,
    process,
    leadForm,
    ctaBanner2,
    insights,
    pricings,
    trainings,
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
    setShowLeadForm(false);
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };
  const scrollToLeadForm = (timeoutDuration = 0) => {
    setTimeout(() => {
      window.scrollTo({
        top: PricingleadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, timeoutDuration);
  };
  const handlePricingCTAButtonClick = (index: number, delayDuration = 0) => {
    setShowLeadForm(true);
    setShowBookAnAppointment(false);
    setSelectedPlan(index);
    scrollToLeadForm(delayDuration);
  };

  const [isLeftNavDisabled, setIsLeftNavDisabled] = useState(false);
  const [isRightNavDisabled, setIsRightNavDisabled] = useState(false);

  const [isLeftNavDisabledT, setIsLeftNavDisabledT] = useState(false);
  const [isRightNavDisabledT, setIsRightNavDisabledT] = useState(false);

  const checkNavigationArrows = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      const isScrollAtStart = scrollLeft === 0;
      const isScrollAtEnd = scrollLeft >= scrollWidth - clientWidth;

      setIsLeftNavDisabled(isScrollAtStart);
      setIsRightNavDisabled(isScrollAtEnd);
    }

    if (scrollContainerRef2.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef2.current;
      const isScrollAtStart = scrollLeft === 0;
      const isScrollAtEnd = scrollLeft >= scrollWidth - clientWidth;

      setIsLeftNavDisabledT(isScrollAtStart);
      setIsRightNavDisabledT(isScrollAtEnd);
    }
  }, []);

  const SCROLL_DISTANCE = 400;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
      setTimeout(checkNavigationArrows, 200);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
      setTimeout(checkNavigationArrows, 200);
    }
  };

  const scrollLeftT = () => {
    if (scrollContainerRef2.current) {
      scrollContainerRef2.current.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
      setTimeout(checkNavigationArrows, 200);
    }
  };

  const scrollRightT = () => {
    if (scrollContainerRef2.current) {
      scrollContainerRef2.current.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
      setTimeout(checkNavigationArrows, 200);
    }
  };

  useEffect(() => {
    checkNavigationArrows();
    window.addEventListener('resize', checkNavigationArrows);

    return () => {
      window.removeEventListener('resize', checkNavigationArrows);
    };
  }, [checkNavigationArrows]);

  const handleScroll = () => {
    const scrollPosition = scrollContainerRef.current?.scrollLeft ?? 0;
    const cardWidth = 400;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveCard(newIndex);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollT = () => {
    const scrollPosition = scrollContainerRef2.current?.scrollLeft ?? 0;
    const cardWidth = 350;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveCardT(newIndex);
  };

  useEffect(() => {
    const scrollContainer2 = scrollContainerRef2.current;
    scrollContainer2?.addEventListener('scroll', handleScrollT);

    return () => {
      scrollContainer2?.removeEventListener('scroll', handleScrollT);
    };
  }, []);

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

    case 'our_plans':
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
              .scrollable-container {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
            `}</style>
          {pricingLeadForms?.[selectedPlan] && (
            <CoachingPageWrapper
              className={`${
                showLeadForm ? 'block' : 'hidden'
              } p-5 lg:px-[80px] lg:pt-[84] mt-20 m-auto max-w-screen-2k `}
            >
              <PricingLeadFormSection
                PricingleadForm={pricingLeadForms?.[selectedPlan]}
                PricingleadFormRef={PricingleadFormRef}
                scrollToTop={scrollToLeadForm}
                onPricingCTAButtonClick={() => {
                  return handlePricingCTAButtonClick(selectedPlan);
                }}
                isBookAppointment={isBookAppointment}
              />
            </CoachingPageWrapper>
          )}
          <div className="mt-20 m-auto max-w-screen-2k ">
            <div className="flex items-end justify-between md:pr-[48px] lg:pr-[80px]">
              <div className="md:max-w-[70%] xl:max-w-none px-[24px] md:px-[48px] lg:px-[80px]">
                <SectionHeadings title={''} subTitle={pricingTitle || ''} />
              </div>
              <div className="items-center hidden md:flex md:mb-[8px]">
                <div>
                  <SliderNav
                    handleOnClick={scrollLeft}
                    cssClass="mr-[16px] bg-[#f3f3f3]"
                    leftNav
                    disable={isLeftNavDisabled}
                  />
                  <SliderNav handleOnClick={scrollRight} cssClass="bg-[#f3f3f3] " disable={isRightNavDisabled} />
                </div>
              </div>
            </div>
            <div className="px-[24px] md:px-[48px] lg:px-[80px]   !py-0 pt-10 md:pt-[100px] fgx">
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                ref={scrollContainerRef}
                className="scrollable-container"
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft') {
                    scrollLeft();
                  } else if (event.key === 'ArrowRight') {
                    scrollRight();
                  }
                }}
              >
                {Array.isArray(filteredPricings) &&
                    filteredPricings.map((pricing, index) => {
                      // Check if lead_forms are present, otherwise use the URL
                      const leadFormsPresent = pricing.lead_forms && pricing.lead_forms.length > 0;
                      const redirectUrl = !leadFormsPresent ? pricing.url : undefined;
                      return (
                        <PricingSection
                          key={''}
                          our_plans={pricing}
                          onPricingCTAButtonClick={() => {
                            return handlePricingCTAButtonClick(index);
                          }}
                          redirectUrl={redirectUrl}
                        />
                      );
                    })}
              </div>
              <div className="carousel-dots">
                {Array.isArray(filteredPricings) &&
                    filteredPricings.map((_, index) => {
                      return <span key={''} className={`dot ${index === activeCard ? 'active' : ''}`} />;
                    })}
              </div>
            </div>
          </div>
        </>
      );

    case 'training':
      return (
        <>
          <style jsx>{`
              .training-section {
                padding: 1px 0px 62px;
              }
              .scrollable-container {
                display: flex;
                overflow-x: auto;
              }
              .scrollable-container::-webkit-scrollbar {
                display: none;
              }
              .scrollable-container {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .active-button {
                padding: 10px;
                border-bottom: 3px solid rgb(255, 201, 109);
                font-weight: bold;
              }

              #button-heading {
                margin-top: 10px;
                max-width: 200px;
                width: 100%;
              }
              @media only screen and (max-width: 500px) {
                #button-heading {
                  max-width: 130px;
                  width: 100%;
                }
              }
              .normal-button {
                flex: 1;
                transition: all 0.3s ease;
                position: relative;
                border: none;
                padding: 10px;
              }
              .normal-button:hover {
                font-weight: bold;
              }
            `}</style>
          <div className="training-section blogs-listing  mt-20">
            <div className="mt-20 m-auto max-w-screen-2k ">
              <div className="flex items-end justify-between md:pr-[48px] lg:pr-[80px]">
                <div className="md:max-w-[70%] xl:max-w-none px-[24px] md:px-[48px] lg:px-[80px]">
                  <SectionHeadings title={''} subTitle={trainingTitle || ''} />
                </div>
                <div className="items-center hidden md:flex md:mb-[8px]">
                  <div>
                    <SliderNav
                      handleOnClick={scrollLeftT}
                      cssClass="mr-[16px] bg-[#f3f3f3]"
                      leftNav
                      disable={isLeftNavDisabledT}
                    />
                    <SliderNav handleOnClick={scrollRightT} cssClass="bg-[#f3f3f3] " disable={isRightNavDisabledT} />
                  </div>
                </div>
              </div>
              <div className="md:px-[48px] lg:px-[80px]   !py-0 pt-10 md:pt-[100px] ">
                <div className="px-[24px]">
                  {trainingTypes?.length > 1 &&
                      trainingTypes
                        .filter((type) => {
                          return type && type.trim() !== '';
                        })
                        .map((type) => {
                          return (
                            <button
                              type="button"
                              key={type}
                              id="button-heading"
                              onClick={() => {
                                setActiveTrainingType(type);
                                scrollContainerRef2.current?.scrollTo({ left: 0, behavior: 'smooth' });
                              }}
                              className={`${type === activeTrainingType ? 'active-button' : 'normal-button '}`}
                            >
                              {' '}
                              {type}
                            </button>
                          );
                        })}
                </div>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                  ref={scrollContainerRef2}
                  className="scrollable-container px-[8px]"
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowLeft') {
                      scrollLeftT();
                    } else if (event.key === 'ArrowRight') {
                      scrollRightT();
                    }
                  }}
                >
                  {filteredTrainings.map((training, index) => {
                    if (index > 0) {
                      return <TrainingCard key={training.id} training={training} />;
                    }
                    return null;
                  })}
                </div>
                <div className="carousel-dots">
                  {Array.isArray(filteredTrainings) &&
                      filteredTrainings.slice(0, -1).map((_, index) => {
                        return <span key={''} className={`dot ${index === activeCardT ? 'active' : ''}`} />;
                      })}
                </div>
              </div>
            </div>
          </div>
        </>
      );

    case 'coaching-service-testimonial':
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
    case 'coaching-service-faq':
      return <FAQSection faqs={faqs?.attributes.json_content.faq} />;
    case 'blogs':
      return (
        <div className="py-[11px] mt-[74px]">
          <BlogSection
            title=""
            sourcePage={SOURCE_PAGE.COACHING}
            serviceType={response?.data?.attributes?.unique_identifier_name}
            subtitle={blogs?.attributes.title ?? ''}
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
        button={<BookAnAppointmentButton text={response.data?.attributes?.CTA_Text} onClick={() => {
          handleCTAButtonClick();
          trackEvent({
            action: `${textContent} Banner CTA`,
            category: 'Coaching Service',
            label: response.data?.attributes?.CTA_Text,
          });
        }} />}
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
