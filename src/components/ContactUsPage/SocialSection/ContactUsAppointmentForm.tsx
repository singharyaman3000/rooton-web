import { useState } from 'react';

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
            gap-[34px]
            shadow-hubspot-form-shadow
            border
            border-golden-yellow
            justify-between
            relative
            overflow-hidden
            bg-pale-sandal
            xl:min-h-[739px]
          "
    >
      <div className="absolute top-0 left-0 h-1 bg-golden-yellow" style={{ width: `${formStepperProgress}%` }} />
      <div className="p-4 lg:px-[60px] w-full py-12 lg:pb-16 sm:p-12">
        <h3 className=' text-2xl font-bold lg:text-[32px]'>{leadForm.formHeading ?? ''}</h3>
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

    </div>
  );
};

export default ContactUsAppointmentForm;
