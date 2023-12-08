import { RefObject } from 'react';

import { convertToHtmlId } from '@/utils';
import NextImage from '@/components/UIElements/NextImage';
import LeadFormStepper from '@/components/ServicePage/LeadFormStepper';
import { IMeetingData } from '@/app/services/apiService/serviceAPI';

interface BookAppointmentFormProps {
  ctaClickSource: string;
  formHeading?: string;
  sectionRef?: RefObject<HTMLElement>;
  displayBookAppointment?: boolean;
  scrollToLeadForm: () => void;
  imageUrl?: string;
  formData: {
    region: string;
    portalId: string;
    formId: string;
    calendarLink: IMeetingData | undefined;
  };
  formHeadingCss?: string;
  formContainerCss?: string;
}

const BookAppointmentForm = ({
  formHeading,
  displayBookAppointment = true,
  sectionRef,
  scrollToLeadForm,
  imageUrl,
  formData,
  ctaClickSource,
  formHeadingCss,
  formContainerCss,
}: BookAppointmentFormProps) => {
  const { region, portalId, formId, calendarLink } = formData;

  return (
    <section
      ref={sectionRef}
      className={
        displayBookAppointment ? 'visible h-auto p-5 pb-0 lg:px-[80px] mt-20 m-auto max-w-screen-2k' : 'invisible h-0'
      }
    >
      <div className="flex gap-[34px] shadow-hubspot-form-shadow border border-golden-yellow justify-between relative overflow-hidden bg-pale-sandal">
        <div
          className={`${formContainerCss} p-4 lg:pl-[60px] w-full lg:w-[83%] pt-12 pb-[100px] sm:pb-[100px] lg:pb-[118px] lg:pr-0 sm:p-12`}
        >
          {formHeading ? (
            <span
              className={`block font-extrabold text-[28px] leading-heading lg:text-2xl xl:text-5xl lg:leading-heading-lg xl:leading-heading-lg ${formHeadingCss}`}
            >
              {formHeading}
            </span>
          ) : null}
          <LeadFormStepper
            scrollToTop={scrollToLeadForm}
            region={region}
            portalId={portalId}
            formId={formId}
            target={convertToHtmlId(formHeading || formId)}
            calenderLink={calendarLink}
            isBookAppointment={false}
            singlePageForm
            ctaClickSource={ctaClickSource}
          />
        </div>
        {imageUrl ? (
          <div className="hidden lg:block w-[25%] relative">
            <NextImage
              classSelector="object-right"
              src={imageUrl}
              style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
              altText="Fill appointment form"
              sizes="100vw"
              fill
              title="Fill appointment form"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BookAppointmentForm;
