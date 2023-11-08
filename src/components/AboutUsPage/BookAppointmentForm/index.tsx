import { RefObject } from 'react';

import { convertToHtmlId } from '@/utils';
import NextImage from '@/components/UIElements/NextImage';
import LeadFormStepper from '@/components/ServicePage/LeadFormStepper';

interface BookAppointmentFormProps {
  formHeading?: string;
  sectionRef?: RefObject<HTMLElement>;
  displayBookAppointment?: boolean;
  imageUrl?: string;
  formData: {
    region: string;
    portalId: string;
    formId: string;
    calendarLink: string;
  };
}

const BookAppointmentForm = ({
  formHeading,
  displayBookAppointment = true,
  sectionRef,
  imageUrl,
  formData,
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
          className="
        p-4 lg:pl-[60px] w-full lg:w-[83%] pt-12 pb-[100px] sm:pb-[100px] lg:pb-[118px] lg:pr-0 sm:p-12
        "
        >
          {formHeading ? (
            <h5
              className="
          font-extrabold text-[28px] leading-heading lg:text-2xl xl:text-5xl lg:leading-heading-lg xl:leading-heading-lg
          "
            >
              {formHeading}
            </h5>
          ) : null}
          <LeadFormStepper
            region={region}
            portalId={portalId}
            formId={formId}
            target={convertToHtmlId(formHeading || formId)}
            calenderLink={calendarLink}
            isBookAppointment={false}
            singlePageForm
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
