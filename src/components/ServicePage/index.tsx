'use client';

import { IServicePageContent } from '@/app/services/apiService/serviceAPI';
import { useState } from 'react';
import { H2 } from '../H2';
import OurProcess from '../HomePage/OurProcess';
import { IOurProcessData } from '../HomePage/OurProcess/interfaces';
import Testimonials from '../HomePage/Testimonials';
import { Li } from '../Li';
import RTONBanner from '../RTONBanner';
import { Ul } from '../Ul';
import BookAnAppointmentButton from './BookAnAppointmentButton';
import { ServiceDescription } from './Description';
import LeadFormSection from './LeadFormSection';
import { WhyChoose } from './WhyChoose';
import { WhyRooton } from './WhyRooton';
import { ServicePageWrapper } from './Wrapper';
import Accordion from '../UIElements/Accordions';
import ToggleIcon from '../HomePage/ChallengesListing/ToggleIcon';
import { AccordionBody, AccordionHeader } from '../HomePage/ChallengesListing/ChallengeListingElements';
import BlogListings from '../HomePage/BlogListings';
import NextImage from '../UIElements/NextImage';

const FAQS = [
  {
    id: '1',
    question: 'Can I know more about Root On Immigration Consultants?',
    answer:
      'Root On Immigration Consultants is a licensed immigration firm based in Montreal, Quebec and in Surat, India. You can get more details at our Instagram handle @rootonofficial.i',
  },
  {
    id: '2',
    question: 'Why should I get the Curated Programs List?',
    answer:
      'Root On Immigration Consultants is a licensed immigration firm based in Montreal, Quebec and in Surat, India. You can get more details at our Instagram handle @rootonofficial.i',
  },
  {
    id: '3',
    question: 'Where will I get the my programs list?',
    answer:
      'Root On Immigration Consultants is a licensed immigration firm based in Montreal, Quebec and in Surat, India. You can get more details at our Instagram handle @rootonofficial.i',
  },
  {
    id: '4',
    question: 'Who will select programs for me?',
    answer:
      'Root On Immigration Consultants is a licensed immigration firm based in Montreal, Quebec and in Surat, India. You can get more details at our Instagram handle @rootonofficial.i',
  },
  {
    id: '5',
    question: 'I need to discuss my profile with me. Can I?',
    answer:
      'Root On Immigration Consultants is a licensed immigration firm based in Montreal, Quebec and in Surat, India. You can get more details at our Instagram handle @rootonofficial.i',
  },
  {
    id: '6',
    question: 'Can I book a counselling session?',
    answer:
      'Root On Immigration Consultants is a licensed immigration firm based in Montreal, Quebec and in Surat, India. You can get more details at our Instagram handle @rootonofficial.i',
  },
];

type ServicePageProps = {
  response: IServicePageContent;
};

export const ServicePageComponent = ({ response }: ServicePageProps) => {
  const [selectedAccordionId, setSelectedAccordionId] = useState<string | null>(null);

  const whyChooseOpen = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 1;
  });

  const eligibility = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 2;
  });

  const leadForm = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 4;
  });

  const process = response.data.attributes.sub_services_contents.data.find((i) => {
    return i.attributes.position === 3;
  });
  return (
    <div>
      <RTONBanner
        backgroundImageUrl={response.data.attributes.media_url.data ?? ''}
        addGradient
        heroText={response.data.attributes.title}
        description={response.data.attributes.sub_title}
        button={<BookAnAppointmentButton />}
      />
      <ServicePageWrapper className="pt-10 px-6 xl:px-20 m-auto max-w-screen-2k">
        <>
          <ServiceDescription text={response.data.attributes.description} />
          <WhyChoose
            title={whyChooseOpen?.attributes.title ?? ''}
            description={whyChooseOpen?.attributes.description ?? ''}
            imageAlt="A man with laptop"
            imageUrl="/group-14-copy@3x.png"
          />
          <WhyRooton
            title={eligibility?.attributes.title ?? ''}
            description={eligibility?.attributes.description ?? ''}
          />
          <Ul>
            {(eligibility?.attributes.json_content.eligibility ?? []).map((e) => {
              return <Li key={e.position + e.key}> {e.value} </Li>;
            })}
          </Ul>
        </>
      </ServicePageWrapper>
      <div className=" mt-20 m-auto max-w-screen-2k">
        <OurProcess
          title={''}
          sub_title={process?.attributes.title ?? ''}
          json_content={process?.attributes.json_content as IOurProcessData}
        />
      </div>
      <ServicePageWrapper className="p-5 lg:px-[80px] lg:pt-[84] lg:pb-[80px] m-auto max-w-[1440px]">
        <div
          className="
            flex gap-[34px] shadow-hubspot-form-shadow border border-golden-yellow justify-between
          "
        >
          <div className='lg:pl-[60px] w-[75%] lg:pt-12 lg:pb-16'>
            <H2>{leadForm?.attributes.title ?? ''}</H2>
            <div className="">
              <LeadFormSection forms={leadForm?.attributes.json_content.lead_forms ?? []} />
            </div>
          </div>
          <div className=" hidden lg:block w-[25%] h-[714px] relative">
            <NextImage
              classSelector=' object-right'
              src={'/images/my-project-46@3x.png'}
              style={{ objectFit: 'contain' }}
              altText="a man"
              sizes="100vw"
              fill
              title=""
            />
          </div>
        </div>
      </ServicePageWrapper>
      <div className=" m-auto max-w-screen-2k">
        <Testimonials />
      </div>
      <ServicePageWrapper className="px-6 mt-10 xl:px-20 m-auto max-w-screen-2k">
        <>
          <H2>{'FAQs'}</H2>
          {FAQS.map((faq) => {
            return (
              <Accordion
                openAccordion={faq.id === selectedAccordionId}
                accordionId={faq.id}
                handleOnClick={(id) => {
                  setSelectedAccordionId(id === selectedAccordionId ? null : id);
                }}
                customToggle={<ToggleIcon isOpen={faq.id === selectedAccordionId} />}
                customSpacer={<span></span>}
                cssClass="challenges-accordion border-b-[1px] border-b-sandal "
                key={faq.id}
                header={<AccordionHeader value={faq.question} />}
                accordionBody={<AccordionBody value={faq.answer} />}
              />
            );
          })}
        </>
      </ServicePageWrapper>
      <div className=" w-full bg-secondary-grey">
        <div className=" mt-20 m-auto max-w-screen-2k">
          <BlogListings
            blogs={{
              data: [],
            }}
            title={''}
            sub_title={'Immigration'}
          />
        </div>
      </div>
      ;
    </div>
  );
};
