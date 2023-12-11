import { RefObject } from 'react';
import { useParams } from 'next/navigation';
import { IContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import NextImage from '@/components/UIElements/NextImage';
import { SocialMediaInterfaceType } from '@/app/services/apiService/headerFooterAPI';
import SocialMediaLinks from '../SocialMediaLinks';
import { useTheme } from 'next-themes';
import HtmlParser from 'react-html-parser';
import ContactUsAppointmentForm from './ContactUsAppointmentForm';

const SocialSection = ({
  formData,
  scrollToLeadForm,
  sectionRef,
  socialMeta,
  ctaClickSource,
}: {
  formData: IContactUsContents;
  scrollToLeadForm: () => void;
  sectionRef: RefObject<HTMLElement>;
  socialMeta: SocialMediaInterfaceType[];
  ctaClickSource: string;
}) => {
  const params = useParams();
  const socialData = formData?.data?.find((a) => {
    return a.attributes.unique_identifier_name === 'social_and_lead_form';
  });

  const formMeta = socialData?.attributes?.json_content?.lead_forms ?? [];
  const appointmentForm = {
    formHeading: 'Contact form',
    imageUrl: '/images/my-project-46@3x.png',
    formData: {
      region: formMeta[0]?.region ?? '',
      portalId: formMeta[0]?.portalId ?? '',
      formId: formMeta[0]?.formId ?? '',
      calendarLink: formMeta[1]?.url ?? undefined,
    },
  };

  const { theme } = useTheme();

  return (
    <section ref={sectionRef} className="flex flex-col items-center lg:flex-row w-full">
      <div className="text-sm px-6 md:px-12 lg:px-0 xl:pl-0 lg:w-[47%] xl:text-base pb-[51px] pt-[68px] xl:pb-0 xl:pt-0 flex flex-col justify-center">
        <h2
          className={`${
            params.lang && 'xl:!text-[38px]'
          } max-w-[300px] lg:max-w-none text-[28px] xl:text-[40px] mb-10 font-extrabold leading-6 lg:leading-9`}
        >
          {socialData?.attributes?.title}
        </h2>
        <div className="relative h-[52px] xl:h-[68px] w-[174px] xl:w-[226px] mb-5">
          <NextImage
            sizes="100vw"
            priority
            src={theme === 'light' ? '/root-on-logo-black.svg' : '/root-on-logo-svg.svg'}
            fill
            style={{ objectFit: 'cover' }}
            altText="rooton_logo"
            title="Logo Image"
          />
        </div>
        <p className="max-w-[469px]" id="contact-us-social-description">
          {HtmlParser(socialData?.attributes?.description ?? '')}
        </p>
        <SocialMediaLinks socialData={socialMeta} wrapperClass="mt-6 xl:mt-10" />
      </div>
      {/* Form section */}
      <div id="contact-us-form-container" className="px-6 md:px-12 lg:px-0 w-full lg:w-[53%]">
        <ContactUsAppointmentForm
          leadForm={appointmentForm}
          ctaClickSource={ctaClickSource}
          scrollToTop={scrollToLeadForm}
          handleCTAButtonClick={scrollToLeadForm}
          isBookAppointment={false}
        />
      </div>
    </section>
  );
};

export default SocialSection;
