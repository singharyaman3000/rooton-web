import { useState } from 'react';

import NextImage from '@/components/UIElements/NextImage';
import { IMeetingData } from '@/app/services/apiService/serviceAPI';
import LeadFormStepper from '@/components/ServicePage/LeadFormStepper';

interface ContactUsAppointmentFormProps {
  leadForm: {
    formHeading: string;
    imageUrl: string;
    formData: {
      region: string;
      portalId: string;
      formId: string;
      calendarLink: IMeetingData | undefined;
    };
  };
  scrollToTop: () => void;
  handleCTAButtonClick: () => void;
  isBookAppointment: boolean;
  ctaClickSource: string;
}

const ContactUsAppointmentForm = ({
  leadForm,
  ctaClickSource,
  scrollToTop,
  handleCTAButtonClick,
  isBookAppointment,
}: ContactUsAppointmentFormProps) => {
  const [formStepperProgress, setFormStepperProgress] = useState(0);

  return (
    <div
      className="
            flex
            gap-0
            shadow-hubspot-form-shadow
            border
            border-golden-yellow
            justify-between
            relative
            overflow-hidden
            bg-pale-sandal
          "
    >
      <div className="absolute top-0 left-0 h-1 bg-golden-yellow" style={{ width: `${formStepperProgress}%` }} />
      <div className="p-4 lg:p-10 xl:pr-0 w-full sm:p-12">
        <h3 className="text-2xl font-bold lg:text-[32px]">{leadForm.formHeading ?? ''}</h3>
        <div id="lead-form">
          <LeadFormStepper
            ctaClickSource={ctaClickSource}
            scrollToTop={scrollToTop}
            initScroll={handleCTAButtonClick}
            isBookAppointment={isBookAppointment}
            onProgress={(progress) => {
              setFormStepperProgress(progress);
            }}
            calenderLink={leadForm.formData.calendarLink}
            region={leadForm.formData.region}
            portalId={leadForm.formData.portalId}
            formId={leadForm.formData.formId}
            target="LeadForm"
          />
        </div>
      </div>
      <div className="hidden xl:block w-[87px] hd:w-[214px] 2k:w-[281px] relative">
        <NextImage
          classSelector="object-right"
          src={'/images/my-project-46@3x.png'}
          style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
          altText="Please fill out the appointment form"
          sizes="100vw"
          fill
          title="Please fill out the appointment form"
        />
      </div>
    </div>
  );
};

export default ContactUsAppointmentForm;
