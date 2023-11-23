import { RefObject, useRef } from 'react';
import BookAppointmentForm from '@/components/AboutUsPage/BookAppointmentForm';
import { IContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import NextImage from '@/components/UIElements/NextImage';
import { appendAssetUrl } from '@/utils';
import { SocialMediaInterfaceType } from '@/app/services/apiService/headerFooterAPI';
import SocialMediaLinks from '../SocialMediaLinks';

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
  const bookRef = useRef<HTMLElement>(null);
  const socialData = formData?.data?.find((a) => {
    return a.attributes.unique_identifier_name === 'social_and_lead_form';
  });

  const formMeta = socialData?.attributes?.json_content?.lead_forms ?? [];
  const appoinmentForm = {
    formHeading: 'Contact form',
    imageUrl: '/images/my-project-46@3x.png',
    formData: {
      region: formMeta[0]?.region ?? '',
      portalId: formMeta[0]?.portalId ?? '',
      formId: formMeta[0]?.formId ?? '',
      calendarLink: formMeta[1]?.url ?? undefined,
    },
  };

  return (
    <section ref={sectionRef} className="flex flex-col lg:flex-row w-full">
      <div className="text-sm px-6 lg:w-[50%] lg:text-base pb-[51px] pt-[68px] lg:pb-0 lg:pt-0 flex flex-col justify-center lg:w-1/2">
        <h2 className="text-[28px] lg:text-[40px] mb-10 font-extrabold">{socialData?.attributes?.title}</h2>
        <div className="relative h-[52px] lg:h-[68px] w-[174px] lg:w-[226px] mb-5">
          <NextImage
            sizes="100vw"
            priority
            src={appendAssetUrl(socialData?.attributes?.media_url?.data?.attributes?.url ?? '')}
            fill
            style={{ objectFit: 'cover' }}
            altText="rooton_logo"
            title="Logo Image"
          />
        </div>
        <p className="max-w-[469px]">{socialData?.attributes?.description}</p>
        <SocialMediaLinks socialData={socialMeta} wrapperClass="mt-6 lg:mt-10" />
      </div>
      {/* Form section */}
      <div id="contact-us-form-container" className="px-6 lg:px-0 lg:w-1/2 lg:min-w-[680px]">
        <BookAppointmentForm
          sectionRef={bookRef}
          scrollToLeadForm={scrollToLeadForm}
          displayBookAppointment
          formData={appoinmentForm.formData}
          formHeading={appoinmentForm.formHeading}
          imageUrl={appoinmentForm.imageUrl}
          ctaClickSource={ctaClickSource}
        />
      </div>
    </section>
  );
};

export default SocialSection;
