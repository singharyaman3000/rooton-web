import { IServicePageContent, getServicePageContent } from '@/app/services/apiService/serviceAPI';
import { H2 } from '@/components/H2';
import OurProcess from '@/components/HomePage/OurProcess';
import { IOurProcessData } from '@/components/HomePage/OurProcess/interfaces';
import Testimonials from '@/components/HomePage/Testimonials';
import { Li } from '@/components/Li';
import RTONBanner from '@/components/RTONBanner';
import BookAnAppointmentButton from '@/components/ServicePage/BookAnAppointmentButton';
import { ServiceDescription } from '@/components/ServicePage/Description';
import LeadFormSection from '@/components/ServicePage/LeadFormSection';
import { WhyChoose } from '@/components/ServicePage/WhyChoose';
import { WhyRooton } from '@/components/ServicePage/WhyRooton';
import { ServicePageWrapper } from '@/components/ServicePage/Wrapper';
import { Ul } from '@/components/Ul';

export default async function ServicePage() {
  const response = (await getServicePageContent(1)) as IServicePageContent;

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
    <>
      <RTONBanner
        backgroundImageUrl={response.data.attributes.CTA_link}
        addGradient
        heroText={response.data.attributes.title}
        description={response.data.attributes.sub_title}
        button={<BookAnAppointmentButton />}
      />
      <ServicePageWrapper>
        <>
          <ServiceDescription text={response.data.attributes.description} />
          <WhyChoose
            title={whyChooseOpen?.attributes.title ?? ''}
            description={whyChooseOpen?.attributes.description ?? ''}
            imageAlt="A man with laptop"
            imageUrl="/root-on-logo-black.svg"
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
          <div className=' mt-20'>
            <OurProcess
              title={''}
              sub_title={process?.attributes.title ?? ''}
              json_content={process?.attributes.json_content as IOurProcessData}
            />
          </div>
          <div className=" mt-20">
            <H2>{leadForm?.attributes.title ?? ''}</H2>
            <div className=" mt-8">
              <LeadFormSection forms={leadForm?.attributes.json_content.lead_forms ?? []} />
            </div>
          </div>
          <Testimonials />
        </>
      </ServicePageWrapper>
    </>
  );
}
