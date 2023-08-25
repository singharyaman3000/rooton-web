'use client';

import { IServicePageContent } from '@/app/services/apiService/serviceAPI';
import { useRef, useState } from 'react';
import { H2 } from '../H2';
import Testimonials from '../HomePage/Testimonials';
import { Li } from '../Li';
import { Ul } from '../Ul';
import BookAnAppointmentButton from './BookAnAppointmentButton';
import { ServiceDescription } from './Description';
import { WhyChoose } from './WhyChoose';
import { WhyRooton } from './WhyRooton';
import { ServicePageWrapper } from './Wrapper';
import Accordion from '../UIElements/Accordions';
import ToggleIcon from '../HomePage/ChallengesListing/ToggleIcon';
import { AccordionBody, AccordionHeader } from '../HomePage/ChallengesListing/ChallengeListingElements';
import BlogListings from '../HomePage/BlogListings';
import NextImage from '../UIElements/NextImage';
import RootOnBanner from '../HomePage/RootOnBanner';
import { appendAssetUrl, isVideo } from '@/utils';
import CalenderIconYellow from '../Icons/CalendarIconYellow';
import { SERVICES_TITLE } from '@/app/constants/textConstants';
// eslint-disable-next-line import/no-named-as-default
import LeadFormStepper from './LeadFormStepper';
import RootOnCTAWrapper from './RootOnCTAWrapper';
import { Breadcrumbs } from '../Breadcrumbs';
import OurProcess from '../HomePage/OurProcess';
import { IOurProcessData } from '../HomePage/OurProcess/interfaces';
import RTONButtonBlackThemed from '../RTONButtonBlackThemed';

type ServicePageProps = {
  response: IServicePageContent;
  isBookAppointment: boolean;
};

export const ServicePageComponent = ({ response, isBookAppointment }: ServicePageProps) => {
  const [selectedAccordionId, setSelectedAccordionId] = useState<string | null>(null);
  const [formStepperProgress, setFormStepperProgress] = useState(0);
  const [showBookAnAppointment, setShowBookAnAppointment] = useState(false);

  const leadFormRef = useRef<HTMLDivElement>(null);

  const whyChooseOpen = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.position === 1;
  });

  const eligibility = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.position === 2;
  });

  const process = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.position === 3;
  });

  const leadForm = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.position === 5;
  });

  const faqs = response?.data?.attributes?.sub_services_contents?.data?.find((i) => {
    return i.attributes.position === 8;
  })?.attributes.json_content.faq;

  const blogs = response?.data?.attributes?.blogs ?? [];

  const handleCTAButtonClick = () => {
    setShowBookAnAppointment(true);
    setTimeout(() => {
      window.scrollTo({
        top: leadFormRef.current!.getBoundingClientRect().top - 150 + window.pageYOffset,
        behavior: 'smooth',
      });
    }, 0);
  };

  return (
    <div className=" relative">
      <Breadcrumbs
        className=" z-50 hidden lg:flex"
        data={[
          {
            title: 'Home',
            path: '/',
          },
          {
            title: 'Service',
            path: '',
          },
          {
            title: 'Open Work Permit',
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
      {(whyChooseOpen || eligibility) && (
        <ServicePageWrapper className="pt-20 pb-20 px-6 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <>
            <ServiceDescription text={response?.data?.attributes?.description} />
            {whyChooseOpen && (
              <WhyChoose
                onClickCTA={handleCTAButtonClick}
                title={whyChooseOpen?.attributes.title ?? ''}
                description={whyChooseOpen?.attributes.description ?? ''}
                imageAlt="A man with laptop"
                imageUrl="/group-14-copy@3x.png"
              />
            )}
            {eligibility && eligibility?.attributes?.json_content?.eligibility && (
              <>
                <WhyRooton
                  title={eligibility?.attributes.title ?? ''}
                  description={eligibility?.attributes.description ?? ''}
                />
                <Ul>
                  {(eligibility?.attributes.json_content.eligibility ?? []).map((e) => {
                    return (
                      <Li key={e.position + e.key}>
                        <>
                          <p className={`${e.description && ' font-bold'}`}>{e.title}</p>
                          {e.description &&
                            (e.description as string[]).map((des) => {
                              return (
                                <Li tabbed key={`${e.position + e.key + des}-child`}>
                                  {' '}
                                  {des}{' '}
                                </Li>
                              );
                            })}
                        </>
                      </Li>
                    );
                  })}
                </Ul>
                <div className=' mt-[47px] w-[232px]'>
                  <RTONButtonBlackThemed
                    onClick={handleCTAButtonClick}
                    ariaLabel="Get your queries solved"
                    text="Get your queries solved"
                    icon={<CalenderIconYellow />}
                    className=" w-full"
                  />
                </div>
              </>
            )}
          </>
        </ServicePageWrapper>
      )}
      {process && process?.attributes?.json_content && (
        <div className=" mt-20 m-auto max-w-screen-2k">
          <OurProcess
            className=" !py-0"
            title={''}
            sub_title={process?.attributes?.title ?? ''}
            json_content={process?.attributes?.json_content as IOurProcessData}
          />
        </div>
      )}
      {leadForm && (
        <ServicePageWrapper
          className={`${
            showBookAnAppointment ? 'block' : 'hidden'
          } p-5 lg:px-[80px] lg:pt-[84] m-auto max-w-screen-2k`}
        >
          <div
            ref={leadFormRef}
            className="
            flex
            gap-[34px]
            shadow-hubspot-form-shadow
            border
            border-golden-yellow
            justify-between
            relative
            overflow-hidden
            bg-pale-sandal
          "
          >
            <div className=" absolute top-0 left-0 h-1 bg-golden-yellow" style={{ width: `${formStepperProgress}%` }} />
            <div className="p-4 lg:pl-[60px] w-full lg:w-[83%] py-12 lg:pb-16 lg:pr-0 sm:p-12">
              <H2>{leadForm?.attributes.title ?? ''}</H2>
              <div className="" id="lead-form">
                <LeadFormStepper
                  initScroll={handleCTAButtonClick}
                  isBookAppointment={isBookAppointment}
                  onProgress={(progress) => {
                    setFormStepperProgress(progress);
                  }}
                  calenderLink={
                    (leadForm?.attributes.json_content.lead_forms &&
                      leadForm?.attributes.json_content.lead_forms.find((f) => {
                        return f.type === 'meeting';
                      })?.url) ??
                    ''
                  }
                  region={
                    (leadForm?.attributes.json_content.lead_forms &&
                      leadForm?.attributes.json_content.lead_forms.find((f) => {
                        return f.type === 'form';
                      })?.region) ??
                    ''
                  }
                  portalId={
                    (leadForm?.attributes.json_content.lead_forms &&
                      leadForm?.attributes.json_content.lead_forms[0].portalId) ??
                    ''
                  }
                  formId={
                    (leadForm?.attributes.json_content.lead_forms &&
                      leadForm?.attributes.json_content.lead_forms[0].formId) ??
                    ''
                  }
                  target="LeadForm"
                />
              </div>
            </div>
            <div className=" hidden lg:block w-[25%] relative">
              <NextImage
                classSelector=" object-right"
                src={'/images/my-project-46@3x.png'}
                style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
                altText="a man"
                sizes="100vw"
                fill
                title=""
              />
            </div>
          </div>
        </ServicePageWrapper>
      )}
      <div className=" mt-10 m-auto max-w-screen-2k">
        <Testimonials title={SERVICES_TITLE.testimonial.title} subTitle={SERVICES_TITLE.testimonial.subtitle} />
      </div>
      <ServicePageWrapper className="m-auto max-w-screen-2k px-6 lg:px-[80px]">
        <RootOnCTAWrapper
          buttonAriaLabel={SERVICES_TITLE.appointment1.title}
          buttonText={SERVICES_TITLE.appointment1.title}
          buttonIcon={<CalenderIconYellow />}
          onClick={handleCTAButtonClick}
          imageSrc={SERVICES_TITLE.appointment1.image}
          imageAlt={SERVICES_TITLE.appointment1.imageAlt}
          imageTitle={SERVICES_TITLE.appointment1.imageTitle}
          heading={
            <>
              {SERVICES_TITLE.appointment1.contentLine1} <br /> {SERVICES_TITLE.appointment1.contentLine2}
            </>
          }
        />
      </ServicePageWrapper>
      {faqs && (
        <ServicePageWrapper className="px-6 mt-10 xl:px-20 m-auto max-w-screen-2k lg:px-[80px]">
          <>
            <H2>{SERVICES_TITLE.faq.title}</H2>
            {faqs?.map((faq) => {
              return (
                <Accordion
                  openAccordion={faq.position.toString() === selectedAccordionId}
                  accordionId={faq.position.toString()}
                  handleOnClick={(id) => {
                    setSelectedAccordionId(id === selectedAccordionId ? null : id);
                  }}
                  customToggle={<ToggleIcon isOpen={faq.position.toString() === selectedAccordionId} />}
                  customSpacer={<span></span>}
                  cssClass="challenges-accordion border-b-[1px] border-b-sandal "
                  key={faq.position}
                  header={<AccordionHeader value={faq.title} />}
                  accordionBody={<AccordionBody containerWidth={'max-w-[100%]'} value={faq.description} />}
                />
              );
            })}
          </>
        </ServicePageWrapper>
      )}
      {blogs?.data?.length > 0 && (
        <div className=" w-full bg-secondary-grey">
          <div className=" mt-20 m-auto max-w-screen-2k">
            <BlogListings
              blogs={{
                data: blogs?.data ?? [],
              }}
              title={''}
              sub_title={SERVICES_TITLE.blogs.title}
            />
          </div>
        </div>
      )}
      <ServicePageWrapper className="m-auto mt-20 max-w-screen-2k pb-20 px-6 lg:px-[80px]">
        <RootOnCTAWrapper
          buttonAriaLabel={SERVICES_TITLE.appointment2.title}
          buttonText={SERVICES_TITLE.appointment2.title}
          buttonIcon={<CalenderIconYellow />}
          onClick={handleCTAButtonClick}
          imageSrc={SERVICES_TITLE.appointment2.image}
          imageAlt={SERVICES_TITLE.appointment2.imageAlt}
          imageTitle={SERVICES_TITLE.appointment2.imageTitle}
          heading={
            <>
              {SERVICES_TITLE.appointment2.contentLine1} <br /> {SERVICES_TITLE.appointment2.contentLine2}
            </>
          }
        />
      </ServicePageWrapper>
    </div>
  );
};
